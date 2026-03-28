package com.guessthebeta.controller;

import com.guessthebeta.dto.*;
import com.guessthebeta.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @PutMapping("/me/preferences")
    public ResponseEntity<UserResponse> updatePreferences(Authentication auth,
                                                           @Valid @RequestBody PreferencesRequest request) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(userService.updatePreferences(userId, request));
    }

    @GetMapping("/me/history")
    public ResponseEntity<List<ClimbHistoryResponse>> getHistory(Authentication auth) {
        Long userId = (Long) auth.getPrincipal();
        return ResponseEntity.ok(userService.getHistory(userId));
    }

    @PostMapping("/me/history")
    public ResponseEntity<Void> recordHistory(Authentication auth,
                                               @Valid @RequestBody HistoryRequest request) {
        Long userId = (Long) auth.getPrincipal();
        userService.recordHistory(userId, request);
        return ResponseEntity.ok().build();
    }
}
