package com.visionpath.education.controller;

import com.visionpath.education.entity.College;
import com.visionpath.education.entity.Course;
import com.visionpath.education.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    // ── Colleges ────────────────────────────────────────

    @GetMapping("/colleges")
    public ResponseEntity<Map<String, Object>> getAllColleges() {
        return ok("Colleges retrieved", educationService.getAllColleges());
    }

    @GetMapping("/colleges/{id}")
    public ResponseEntity<Map<String, Object>> getCollege(@PathVariable Long id) {
        return ok("College found", educationService.getCollegeById(id));
    }

    @PostMapping("/colleges")
    public ResponseEntity<Map<String, Object>> createCollege(@RequestBody College college) {
        return ok("College created", educationService.createCollege(college));
    }

    @PutMapping("/colleges/{id}")
    public ResponseEntity<Map<String, Object>> updateCollege(@PathVariable Long id, @RequestBody College college) {
        return ok("College updated", educationService.updateCollege(id, college));
    }

    @DeleteMapping("/colleges/{id}")
    public ResponseEntity<Map<String, Object>> deleteCollege(@PathVariable Long id) {
        educationService.deleteCollege(id);
        return ok("College deleted", null);
    }

    // ── Courses ─────────────────────────────────────────

    @GetMapping("/courses")
    public ResponseEntity<Map<String, Object>> getAllCourses() {
        return ok("Courses retrieved", educationService.getAllCourses());
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<Map<String, Object>> getCourse(@PathVariable Long id) {
        return ok("Course found", educationService.getCourseById(id));
    }

    @PostMapping("/courses")
    public ResponseEntity<Map<String, Object>> createCourse(@RequestBody Course course) {
        return ok("Course created", educationService.createCourse(course));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Map<String, Object>> deleteCourse(@PathVariable Long id) {
        educationService.deleteCourse(id);
        return ok("Course deleted", null);
    }

    // ── Search ──────────────────────────────────────────

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String keyword) {
        Map<String, Object> results = new HashMap<>();
        results.put("colleges", educationService.searchColleges(keyword));
        results.put("courses", educationService.searchCourses(keyword));
        return ok("Search results", results);
    }

    // GET /api/education/recommendations/{studentId}
    @GetMapping("/recommendations/{studentId}")
    public ResponseEntity<Map<String, Object>> recommendations(@PathVariable Long studentId) {
        // Simple: return all courses as recommendations
        return ok("Recommended courses for student " + studentId, educationService.getAllCourses());
    }

    private ResponseEntity<Map<String, Object>> ok(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("data", data);
        return ResponseEntity.ok(response);
    }
}
