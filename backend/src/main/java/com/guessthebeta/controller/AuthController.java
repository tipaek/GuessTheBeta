package com.guessthebeta.controller;

import com.guessthebeta.dto.AuthRequest;
import com.guessthebeta.dto.AuthResponse;
import com.guessthebeta.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> loginWithGoogle(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticateWithGoogle(request.idToken()));
    }
}
