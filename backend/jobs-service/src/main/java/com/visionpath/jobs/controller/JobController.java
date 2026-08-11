package com.visionpath.jobs.controller;

import com.visionpath.jobs.entity.Job;
import com.visionpath.jobs.entity.JobApplication;
import com.visionpath.jobs.entity.SavedJob;
import com.visionpath.jobs.service.JobsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobsService jobsService;

    public JobController(JobsService jobsService) {
        this.jobsService = jobsService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAll() {
        return ok("Jobs retrieved", jobsService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getById(@PathVariable Long id) {
        return ok("Job found", jobsService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Job job) {
        return ok("Job created", jobsService.create(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Job job) {
        return ok("Job updated", jobsService.update(id, job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        jobsService.delete(id);
        return ok("Job deleted", null);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String keyword) {
        return ok("Search results", jobsService.search(keyword));
    }

    // GET /api/jobs/recommendations/{studentId}?skills=java,python
    @GetMapping("/recommendations/{studentId}")
    public ResponseEntity<Map<String, Object>> recommendations(
            @PathVariable Long studentId,
            @RequestParam(required = false) String skills) {
        return ok("Job recommendations", jobsService.getRecommendations(skills));
    }

    // ── Saved Jobs ──────────────────────────────────────

    @PostMapping("/{id}/save")
    public ResponseEntity<Map<String, Object>> saveJob(@PathVariable Long id, @RequestParam Long userId) {
        return ok("Job saved", jobsService.saveJob(userId, id));
    }

    @DeleteMapping("/{id}/save")
    public ResponseEntity<Map<String, Object>> unsaveJob(@PathVariable Long id, @RequestParam Long userId) {
        jobsService.unsaveJob(userId, id);
        return ok("Job unsaved", null);
    }

    @GetMapping("/saved")
    public ResponseEntity<Map<String, Object>> getSaved(@RequestParam Long userId) {
        return ok("Saved jobs", jobsService.getSavedJobs(userId));
    }

    // ── Applications ────────────────────────────────────

    @PostMapping("/{id}/apply")
    public ResponseEntity<Map<String, Object>> apply(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody(required = false) Map<String, String> body) {
        String coverLetter = body != null ? body.get("coverLetter") : null;
        JobApplication app = jobsService.apply(userId, id, coverLetter);
        return ok("Application submitted", app);
    }

    @GetMapping("/applications")
    public ResponseEntity<Map<String, Object>> getApplications(@RequestParam Long userId) {
        return ok("Applications retrieved", jobsService.getApplications(userId));
    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<Map<String, Object>> updateApplication(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        return ok("Application updated", jobsService.updateApplication(id, body.get("status")));
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
