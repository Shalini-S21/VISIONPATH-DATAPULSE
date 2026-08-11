package com.visionpath.auth.controller;

import com.visionpath.auth.dto.*;
import com.visionpath.auth.entity.User;
import com.visionpath.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthDataResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthDataResponse data = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", data));
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDataResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthDataResponse data = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", data));
    }

    // GET /api/auth/me  — requires Authorization: Bearer <token>
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getMe(@RequestHeader("Authorization") String authHeader) {
        String token = extractToken(authHeader);
        User user = authService.getMe(token);
        return ResponseEntity.ok(ApiResponse.success("User retrieved", user));
    }

    // POST /api/auth/change-password
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ChangePasswordRequest request) {
        String token = extractToken(authHeader);
        authService.changePassword(token, request);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully", null));
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Authorization header missing or invalid");
        }
        return authHeader.substring(7);
    }
}
