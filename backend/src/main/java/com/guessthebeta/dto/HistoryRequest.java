package com.guessthebeta.dto;

import jakarta.validation.constraints.NotNull;

public record HistoryRequest(
    @NotNull Long routeId,
    boolean watchedBeta
) {}
