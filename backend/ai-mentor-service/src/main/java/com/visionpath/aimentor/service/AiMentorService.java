package com.visionpath.aimentor.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AiMentorService {

    private static final Logger log = LoggerFactory.getLogger(AiMentorService.class);

    @Value("${app.ai.api-key:}")
    private String apiKey;

    @Value("${app.ai.provider:fallback}")
    private String provider;

    public String getAdvice(String question, String context) {
        log.info("Received AI mentor request: provider={}, hasApiKey={}", provider, !apiKey.isBlank());

        if (apiKey == null || apiKey.isBlank() || "fallback".equalsIgnoreCase(provider)) {
            return generateFallbackAdvice(question, context);
        }

        // If an API key is provided in the future, you can implement the actual
        // HTTP call to OpenAI, Gemini, Claude, etc., here.
        // For this simple template, we use the fallback logic.
        return "AI Integration is ready but not fully implemented. " + generateFallbackAdvice(question, context);
    }

    private String generateFallbackAdvice(String question, String context) {
        String lowerQ = question.toLowerCase();

        if (lowerQ.contains("resume") || lowerQ.contains("cv")) {
            return "Make sure your resume highlights your key achievements and matches the keywords in the job description. Keep it concise, ideally one page.";
        } else if (lowerQ.contains("interview")) {
            return "For interviews, practice the STAR method (Situation, Task, Action, Result) for behavioral questions. Research the company beforehand.";
        } else if (lowerQ.contains("career") || lowerQ.contains("path")) {
            return "Explore our Career Service module to see demand levels and required skills. Start by identifying your core interests and strengths.";
        } else if (lowerQ.contains("study") || lowerQ.contains("learn")) {
            return "Consistency is key. Break down your study goals into small, manageable daily tasks. Check our Study Plan module to organize your timeline.";
        }

        return "That's a great question! Based on your context (" + context + "), I recommend focusing on continuous learning and building practical projects to demonstrate your skills.";
    }
}
