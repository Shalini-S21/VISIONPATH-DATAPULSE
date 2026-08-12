package com.visionpath.resumeanalyzer.controller;

import com.visionpath.resumeanalyzer.dto.ApiResponse;
import com.visionpath.resumeanalyzer.dto.AtsAnalysisResult;
import com.visionpath.resumeanalyzer.service.ResumeAnalyzerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resumes")
public class ResumeAnalyzerController {

    private final ResumeAnalyzerService resumeAnalyzerService;

    public ResumeAnalyzerController(ResumeAnalyzerService resumeAnalyzerService) {
        this.resumeAnalyzerService = resumeAnalyzerService;
    }

    // POST /api/resumes/analyze — accepts multipart/form-data with file and optional jobDescription
    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse<AtsAnalysisResult>> analyzeResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "jobDescription", required = false) String jobDescription) {
        AtsAnalysisResult result = resumeAnalyzerService.analyzeResume(file, jobDescription);
        return ResponseEntity.ok(ApiResponse.success("Resume analyzed successfully", result));
    }
}
