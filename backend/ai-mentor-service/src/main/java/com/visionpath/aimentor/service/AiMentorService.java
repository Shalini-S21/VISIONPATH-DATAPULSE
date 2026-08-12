package com.visionpath.aimentor.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiMentorService {

    private static final Logger log = LoggerFactory.getLogger(AiMentorService.class);

    @Value("${app.ai.api-key:${OPENAI_API_KEY:}}")
    private String apiKey;

    @Value("${app.ai.model:${OPENAI_MODEL:gpt-4o-mini}}")
    private String model;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getAdvice(String question, String context) {
        log.info("Received AI mentor request for model={}, hasApiKey={}", model, !apiKey.isBlank());

        if (apiKey != null && !apiKey.isBlank()) {
            try {
                return callOpenAiApi(question, context);
            } catch (Exception e) {
                log.warn("OpenAI API call failed: {}. Falling back to deterministic AI mentor engine.", e.getMessage());
            }
        }

        return generateDeterministicAdvice(question, context);
    }

    private String generateDeterministicAdvice(String question, String context) {
        String qLower = question.toLowerCase();
        if (qLower.contains("resume") || qLower.contains("cv")) {
          return "📄 **Resume & ATS Optimization Guide**:\n\n1. Ensure single-column formatting with standard fonts (Inter, Arial, Roboto).\n2. Include quantifiable achievements (e.g., 'Optimized API endpoints reducing latency by 35%').\n3. Use exact keywords matching the target job description.";
        } else if (qLower.contains("interview") || qLower.contains("prep")) {
          return "🎯 **Interview Preparation Roadmap**:\n\n1. Practice STAR methodology (Situation, Task, Action, Result) for behavioral questions.\n2. Review Core Data Structures: Trees, Graphs, HashTables, and Dynamic Programming.\n3. Prepare a system design outline focusing on scalability, load balancers, and vector DBs.";
        } else if (qLower.contains("roadmap") || qLower.contains("career") || qLower.contains("full stack") || qLower.contains("frontend") || qLower.contains("backend")) {
          return "🚀 **Enterprise Tech Career Advice**:\n\n1. Master JavaScript/TypeScript, React 19, and Spring Boot 3.5.\n2. Build end-to-end microservices applications with Docker and PostgreSQL.\n3. Showcase system design knowledge and real-time AI integration on your GitHub profile.";
        }
        return "💡 **VisionPath AI Advisor Response**:\n\nRegarding your question: *\"" + question + "\"*\n\n1. **Focus on High-Impact Fundamentals**: Align your current technical learning with high-demand industry skills.\n2. **Hands-on Projects**: Implement production-grade microservices and modern frontend architectures.\n3. **Continuous Evaluation**: Regularly test your progress through VisionPath assessments and ATS resume scans.";
    }

    private String callOpenAiApi(String question, String context) throws Exception {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        String systemPrompt = "You are VisionPath AI Career Mentor, an enterprise career and technical skills advisor. " +
                "Provide personalized, structured, actionable advice based on the student's question and context.";

        String userPrompt = "Question: " + question + (context != null && !context.isBlank() ? "\nContext: " + context : "");

        Map<String, Object> messageSystem = Map.of("role", "system", "content", systemPrompt);
        Map<String, Object> messageUser = Map.of("role", "user", "content", userPrompt);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", model);
        requestBody.put("messages", List.of(messageSystem, messageUser));
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            return rootNode.path("choices").get(0).path("message").path("content").asText();
        }

        throw new RuntimeException("OpenAI API returned status code " + response.getStatusCode());
    }
}
