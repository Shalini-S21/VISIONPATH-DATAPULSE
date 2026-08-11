package com.visionpath.auth.service;

import com.visionpath.auth.dto.*;
import com.visionpath.auth.entity.User;
import com.visionpath.auth.entity.User.Role;
import com.visionpath.auth.repository.UserRepository;
import com.visionpath.auth.security.JwtTokenProvider;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    // Seed default users on startup
    @PostConstruct
    public void seedDefaultUsers() {
        createIfAbsent("Admin User", "admin@visionpath.com", "admin123", "9000000001", Role.ADMIN);
        createIfAbsent("John Student", "student@visionpath.com", "password123", "9000000002", Role.STUDENT);
        createIfAbsent("Dr. Sarah Counselor", "counselor@visionpath.com", "password123", "9000000003", Role.COUNSELOR);
        log.info("Default users seeded.");
    }

    private void createIfAbsent(String name, String email, String rawPassword, String phone, Role role) {
        if (!userRepository.existsByEmail(email)) {
            User user = new User(name, email, passwordEncoder.encode(rawPassword), phone, role);
            userRepository.save(user);
        }
    }

    public AuthDataResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered: " + request.getEmail());
        }

        Role role = Role.STUDENT;
        if (request.getRole() != null && !request.getRole().isBlank()) {
            try {
                role = Role.valueOf(request.getRole().toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role. Use: STUDENT, COUNSELOR, or ADMIN");
            }
        }

        User user = new User(
            request.getName(),
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getPhone(),
            role
        );
        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return buildResponse(token, user);
    }

    public AuthDataResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account is disabled. Please contact admin.");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return buildResponse(token, user);
    }

    public User getMe(String token) {
        String email = jwtTokenProvider.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(null); // Never return password
        return user;
    }

    public void changePassword(String token, ChangePasswordRequest request) {
        String email = jwtTokenProvider.getEmailFromToken(token);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private AuthDataResponse buildResponse(String token, User user) {
        return new AuthDataResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    }
}
