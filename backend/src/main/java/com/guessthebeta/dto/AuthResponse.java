package com.guessthebeta.dto;

public record AuthResponse(
    String token,
    UserResponse user
) {}
