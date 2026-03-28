package com.guessthebeta.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
    @NotBlank String idToken
) {}
