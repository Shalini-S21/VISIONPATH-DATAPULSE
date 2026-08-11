package com.visionpath.student.controller;

import com.visionpath.student.dto.ApiResponse;
import com.visionpath.student.dto.StudentProfileRequest;
import com.visionpath.student.entity.StudentInterest;
import com.visionpath.student.entity.StudentProfile;
import com.visionpath.student.entity.StudentSkill;
import com.visionpath.student.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // GET /api/students/profile?userId=1
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfile>> getProfile(@RequestParam Long userId) {
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved", studentService.getProfile(userId)));
    }

    // PUT /api/students/profile?userId=1
    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfile>> updateProfile(
            @RequestParam Long userId,
            @RequestBody StudentProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Profile updated", studentService.updateProfile(userId, request)));
    }

    // GET /api/students/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StudentProfile>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Student found", studentService.getById(id)));
    }

    // DELETE /api/students/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        studentService.deleteProfile(id);
        return ResponseEntity.ok(ApiResponse.success("Student deleted", null));
    }

    // ── Skills ──────────────────────────────────────────

    // POST /api/students/skills?userId=1
    @PostMapping("/skills")
    public ResponseEntity<ApiResponse<StudentSkill>> addSkill(
            @RequestParam Long userId,
            @RequestBody Map<String, String> body) {
        StudentSkill skill = studentService.addSkill(userId, body.get("skillName"), body.get("proficiency"));
        return ResponseEntity.ok(ApiResponse.success("Skill added", skill));
    }

    // GET /api/students/skills?userId=1
    @GetMapping("/skills")
    public ResponseEntity<ApiResponse<List<StudentSkill>>> getSkills(@RequestParam Long userId) {
        return ResponseEntity.ok(ApiResponse.success("Skills retrieved", studentService.getSkills(userId)));
    }

    // DELETE /api/students/skills/{id}?userId=1
    @DeleteMapping("/skills/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Long id, @RequestParam Long userId) {
        studentService.deleteSkill(id, userId);
        return ResponseEntity.ok(ApiResponse.success("Skill deleted", null));
    }

    // ── Interests ───────────────────────────────────────

    // POST /api/students/interests?userId=1
    @PostMapping("/interests")
    public ResponseEntity<ApiResponse<StudentInterest>> addInterest(
            @RequestParam Long userId,
            @RequestBody Map<String, String> body) {
        StudentInterest interest = studentService.addInterest(userId, body.get("interest"));
        return ResponseEntity.ok(ApiResponse.success("Interest added", interest));
    }

    // GET /api/students/interests?userId=1
    @GetMapping("/interests")
    public ResponseEntity<ApiResponse<List<StudentInterest>>> getInterests(@RequestParam Long userId) {
        return ResponseEntity.ok(ApiResponse.success("Interests retrieved", studentService.getInterests(userId)));
    }

    // DELETE /api/students/interests/{id}?userId=1
    @DeleteMapping("/interests/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteInterest(@PathVariable Long id, @RequestParam Long userId) {
        studentService.deleteInterest(id, userId);
        return ResponseEntity.ok(ApiResponse.success("Interest deleted", null));
    }
}
