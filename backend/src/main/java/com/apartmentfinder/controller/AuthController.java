package com.apartmentfinder.controller;

import com.apartmentfinder.entity.*;
import com.apartmentfinder.service.AuthService;
import com.apartmentfinder.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        // Determine user role and authenticate
        String role = authService.determineUserRole(email);
        if (role == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Object authenticatedUser = null;
        Long userId = null;
        String userName = null;

        switch (role) {
            case "admin":
                Optional<Admin> admin = authService.authenticateAdmin(email, password);
                if (admin.isPresent()) {
                    authenticatedUser = admin.get();
                    userId = admin.get().getId();
                    userName = admin.get().getName();
                } else {
                    return ResponseEntity.badRequest().body("Invalid credentials");
                }
                break;

            case "owner":
                Optional<Owner> owner = authService.authenticateOwner(email, password);
                if (owner.isPresent()) {
                    authenticatedUser = owner.get();
                    userId = owner.get().getId();
                    userName = owner.get().getName();
                } else {
                    return ResponseEntity.badRequest().body("Invalid credentials or account not approved");
                }
                break;

            case "employee":
                Optional<Employee> employee = authService.authenticateEmployee(email, password);
                if (employee.isPresent()) {
                    authenticatedUser = employee.get();
                    userId = employee.get().getId();
                    userName = employee.get().getName();
                } else {
                    return ResponseEntity.badRequest().body("Invalid credentials or account not active");
                }
                break;

            case "user":
                Optional<User> user = authService.authenticateUser(email, password);
                if (user.isPresent()) {
                    authenticatedUser = user.get();
                    userId = user.get().getId();
                    userName = user.get().getName();
                } else {
                    return ResponseEntity.badRequest().body("Invalid credentials or account not active");
                }
                break;

            default:
                return ResponseEntity.badRequest().body("Invalid user role");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(email, role, userId);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", Map.of(
                "id", userId,
                "name", userName,
                "email", email,
                "role", role
        ));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register/user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (authService.registerUser(user)) {
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } else {
            return ResponseEntity.badRequest().body("Email already exists");
        }
    }

    @PostMapping("/register/owner")
    public ResponseEntity<?> registerOwner(@RequestBody Owner owner) {
        if (authService.registerOwner(owner)) {
            return ResponseEntity.ok(Map.of("message", "Owner registration submitted for approval"));
        } else {
            return ResponseEntity.badRequest().body("Email already exists");
        }
    }

    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token) && !jwtUtil.isTokenExpired(token)) {
                String email = jwtUtil.getEmailFromToken(token);
                String role = jwtUtil.getRoleFromToken(token);
                Long userId = jwtUtil.getUserIdFromToken(token);

                return ResponseEntity.ok(Map.of(
                        "valid", true,
                        "email", email,
                        "role", role,
                        "userId", userId
                ));
            }
        }

        return ResponseEntity.ok(Map.of("valid", false));
    }
}
