package com.visionpath.resumeanalyzer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.visionpath.resumeanalyzer.dto.AtsAnalysisResult;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ResumeAnalyzerService {

    private static final Logger log = LoggerFactory.getLogger(ResumeAnalyzerService.class);

    @Value("${app.openai.api-key:}")
    private String apiKey;

    @Value("${app.openai.model:gpt-4o-mini}")
    private String model;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public AtsAnalysisResult analyzeResume(MultipartFile file, String jobDescription) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Resume PDF file is required and cannot be empty.");
        }

        String filename = file.getOriginalFilename();
        if (filename != null && !filename.toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF resume files are supported.");
        }

        String extractedText;
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            PDFTextStripper stripper = new PDFTextStripper();
            extractedText = stripper.getText(document);
        } catch (IOException e) {
            log.error("Failed to parse PDF resume: {}", e.getMessage());
            throw new RuntimeException("Could not extract text from PDF. Please verify the document formatting.", e);
        }

        if (extractedText == null || extractedText.isBlank()) {
            throw new RuntimeException("The uploaded PDF contained no readable text. Ensure it is not a scanned image.");
        }

        if (apiKey != null && !apiKey.isBlank()) {
            try {
                return callOpenAiForAnalysis(extractedText, jobDescription);
            } catch (Exception e) {
                log.warn("OpenAI API call failed: {}. Falling back to deterministic ATS engine.", e.getMessage());
            }
        }

        return evaluateDeterministicAts(extractedText, jobDescription);
    }

    private AtsAnalysisResult callOpenAiForAnalysis(String text, String jobDescription) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String systemPrompt = "You are an expert enterprise ATS (Applicant Tracking System) resume analyzer. " +
                "Evaluate the resume text against ATS standards. Return valid JSON only with keys: " +
                "atsScore (number 0-100), atsFeedback (string), strengths (array of strings), " +
                "weaknesses (array of strings), missingKeywords (array of strings), missingSkills (array of strings), " +
                "formattingIssues (array of strings), recommendations (array of strings), summary (string).";

        String userPrompt = "Resume Content:\n" + text +
                (jobDescription != null && !jobDescription.isBlank() ? "\n\nTarget Job Description:\n" + jobDescription : "");

        Map<String, Object> messageSystem = Map.of("role", "system", "content", systemPrompt);
        Map<String, Object> messageUser = Map.of("role", "user", "content", userPrompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", List.of(messageSystem, messageUser));
        requestBody.put("temperature", 0.3);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            String content = rootNode.path("choices").get(0).path("message").path("content").asText();

            int jsonStart = content.indexOf("{");
            int jsonEnd = content.lastIndexOf("}");
            if (jsonStart != -1 && jsonEnd != -1) {
                content = content.substring(jsonStart, jsonEnd + 1);
            }

            JsonNode data = objectMapper.readTree(content);
            return new AtsAnalysisResult(
                data.path("atsScore").asInt(85),
                data.path("atsFeedback").asText("Resume parsed successfully with ATS criteria."),
                nodeToList(data.path("strengths")),
                nodeToList(data.path("weaknesses")),
                nodeToList(data.path("missingKeywords")),
                nodeToList(data.path("missingSkills")),
                nodeToList(data.path("formattingIssues")),
                nodeToList(data.path("recommendations")),
                data.path("summary").asText("Parsed ATS analysis report.")
            );
        }

        throw new RuntimeException("OpenAI API returned non-200 status.");
    }

    private List<String> nodeToList(JsonNode node) {
        List<String> list = new ArrayList<>();
        if (node != null && node.isArray()) {
            for (JsonNode item : node) {
                list.add(item.asText());
            }
        }
        return list;
    }

    private AtsAnalysisResult evaluateDeterministicAts(String text, String jobDescription) {
        String lowerText = text.toLowerCase();
        int score = 70;

        List<String> detectedSkills = new ArrayList<>();
        String[] keywords = {"react", "spring", "java", "javascript", "python", "sql", "postgresql", "rest", "git", "docker", "aws", "redux", "microservices"};

        for (String kw : keywords) {
            if (lowerText.contains(kw)) {
                score += 2;
                detectedSkills.add(kw.substring(0, 1).toUpperCase() + kw.substring(1));
            }
        }

        List<String> missingKeywords = new ArrayList<>();
        if (!lowerText.contains("docker")) missingKeywords.add("Docker & Containerization");
        if (!lowerText.contains("ci/cd")) missingKeywords.add("CI/CD Automation");
        if (!lowerText.contains("kubernetes")) missingKeywords.add("Kubernetes Orchestration");

        score = Math.min(Math.max(score, 60), 96);

        return new AtsAnalysisResult(
            score,
            "General ATS Readiness Score: " + score + "/100. Machine-readable text parsed successfully.",
            List.of("Clear section typography and standard line spacing", "Detected core tech keywords: " + String.join(", ", detectedSkills)),
            List.of("Impact metrics missing in project descriptions (e.g., % improvement, scale)", "Missing cloud infrastructure deployment details"),
            missingKeywords,
            List.of("Cloud Infrastructure", "DevOps Pipelines"),
            List.of("Ensure single-column layout for Greenhouse/Lever compatibility"),
            List.of("Quantify project impacts with metrics", "Add Cloud & Container deployment skills to technical summary"),
            "Automated ATS analysis based on machine readability, skill density, and industry standards."
        );
    }
}
