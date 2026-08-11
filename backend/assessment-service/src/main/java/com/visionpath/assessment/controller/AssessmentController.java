package com.visionpath.assessment.controller;

import com.visionpath.assessment.entity.Assessment;
import com.visionpath.assessment.entity.AssessmentResult;
import com.visionpath.assessment.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentService assessmentService;

    public AssessmentController(AssessmentService assessmentService) {
        this.assessmentService = assessmentService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        return ok("Assessments retrieved", assessmentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        return ok("Assessment found", assessmentService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Assessment assessment) {
        return ok("Assessment created", assessmentService.create(assessment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Assessment assessment) {
        return ok("Assessment updated", assessmentService.update(id, assessment));
    }

    // GET /api/assessments/{id}/questions — returns questions without correct answers
    @GetMapping("/{id}/questions")
    public ResponseEntity<Map<String, Object>> getQuestions(@PathVariable Long id) {
        return ok("Questions retrieved", assessmentService.getQuestionsForStudent(id));
    }

    // POST /api/assessments/{id}/start — just returns assessment details
    @PostMapping("/{id}/start")
    public ResponseEntity<Map<String, Object>> start(@PathVariable Long id) {
        return ok("Assessment started", assessmentService.getById(id));
    }

    // POST /api/assessments/{id}/submit
    // Body: { "userId": 1, "answers": { "1": "A", "2": "B", "3": "C" } }
    @PostMapping("/{id}/submit")
    public ResponseEntity<Map<String, Object>> submit(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody Map<Long, String> answers) {
        AssessmentResult result = assessmentService.submit(id, userId, answers);
        return ok("Assessment submitted. Score: " + result.getScore() + "/" + result.getTotalMarks(), result);
    }

    // GET /api/assessments/results?userId=1
    @GetMapping("/results")
    public ResponseEntity<Map<String, Object>> getResults(@RequestParam Long userId) {
        return ok("Results retrieved", assessmentService.getResults(userId));
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
