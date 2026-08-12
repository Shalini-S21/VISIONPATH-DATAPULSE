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

    @Value("${app.ai.model:${OPENAI_MODEL:gpt-3.5-turbo}}")
    private String model;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getAdvice(String question, String context) {
        log.info("Received AI mentor request for model={}, hasApiKey={}", model, !apiKey.isBlank());

        if (apiKey != null && !apiKey.isBlank()) {
            try {
                return callOpenAiApi(question, context);
            } catch (Exception e) {
                log.error("OpenAI API call failed: {}", e.getMessage());
                throw new RuntimeException("AI Mentor Service temporarily unavailable: " + e.getMessage(), e);
            }
        }

        // If OPENAI_API_KEY is not configured yet, return clear environment configuration status
        throw new RuntimeException("OpenAI API key is not configured on the backend. Please set the OPENAI_API_KEY environment variable.");
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
