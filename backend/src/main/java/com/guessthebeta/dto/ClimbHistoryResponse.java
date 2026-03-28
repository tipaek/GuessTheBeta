package com.guessthebeta.dto;

import com.guessthebeta.model.UserClimbHistory;

import java.time.OffsetDateTime;

public record ClimbHistoryResponse(
    Long id,
    RouteResponse route,
    OffsetDateTime viewedAt,
    boolean watchedBeta
) {
    public static ClimbHistoryResponse from(UserClimbHistory history, int videoCount) {
        return new ClimbHistoryResponse(
            history.getId(),
            RouteResponse.from(history.getRoute(), videoCount),
            history.getViewedAt(),
            history.isWatchedBeta()
        );
    }
}
