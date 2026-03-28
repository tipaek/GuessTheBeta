package com.guessthebeta.dto;

import com.guessthebeta.model.Route;

public record RouteResponse(
    Long id,
    Long gymId,
    String gymName,
    String name,
    String grade,
    int gradeSort,
    String photoUrl,
    String boardLayoutId,
    String setter,
    String color,
    int videoCount
) {
    public static RouteResponse from(Route route, int videoCount) {
        return new RouteResponse(
            route.getId(),
            route.getGym().getId(),
            route.getGym().getName(),
            route.getName(),
            route.getGrade(),
            route.getGradeSort(),
            route.getPhotoUrl(),
            route.getBoardLayoutId(),
            route.getSetter(),
            route.getColor(),
            videoCount
        );
    }
}
