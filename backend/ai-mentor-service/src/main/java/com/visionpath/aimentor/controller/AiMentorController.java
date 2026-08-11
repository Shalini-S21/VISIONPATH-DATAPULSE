package com.visionpath.aimentor.controller;

import com.visionpath.aimentor.service.AiMentorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiMentorController {

    private final AiMentorService aiMentorService;

    public AiMentorController(AiMentorService aiMentorService) {
        this.aiMentorService = aiMentorService;
    }

    // POST /api/ai/ask
    // Body: { "question": "How to improve my resume?", "context": "Student looking for first job" }
    @PostMapping("/ask")
    public ResponseEntity<Map<String, Object>> askMentor(@RequestBody Map<String, String> request) {
        String question = request.getOrDefault("question", "");
        String context = request.getOrDefault("context", "General user");

        String answer = aiMentorService.getAdvice(question, context);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "AI response generated");
        response.put("data", Map.of(
            "question", question,
            "answer", answer
        ));

        return ResponseEntity.ok(response);
    }
}
