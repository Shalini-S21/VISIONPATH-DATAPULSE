package com.visionpath.progress.controller;

import com.visionpath.progress.entity.Progress;
import com.visionpath.progress.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProgress(@RequestParam Long userId) {
        return ok("Progress retrieved", progressService.getProgress(userId));
    }

    @PostMapping("/increment-assessment")
    public ResponseEntity<Map<String, Object>> incrementAssessment(@RequestParam Long userId) {
        return ok("Progress updated", progressService.incrementAssessments(userId));
    }

    @PostMapping("/increment-job")
    public ResponseEntity<Map<String, Object>> incrementJob(@RequestParam Long userId) {
        return ok("Progress updated", progressService.incrementJobsApplied(userId));
    }

    @PostMapping("/increment-study-plan")
    public ResponseEntity<Map<String, Object>> incrementStudyPlan(@RequestParam Long userId) {
        return ok("Progress updated", progressService.incrementStudyPlans(userId));
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
