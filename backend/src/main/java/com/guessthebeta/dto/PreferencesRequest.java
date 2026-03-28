package com.guessthebeta.dto;

public record PreferencesRequest(
    Long preferredGym,
    Integer minGrade,
    Integer maxGrade
) {}
