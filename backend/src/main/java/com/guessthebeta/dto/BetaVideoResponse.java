package com.guessthebeta.dto;

import com.guessthebeta.model.BetaVideo;

public record BetaVideoResponse(
    Long id,
    Long routeId,
    String videoUrl,
    String source,
    String climber,
    String thumbnail,
    Integer durationSeconds,
    int sortOrder
) {
    public static BetaVideoResponse from(BetaVideo video) {
        return new BetaVideoResponse(
            video.getId(), video.getRoute().getId(),
            video.getVideoUrl(), video.getSource(),
            video.getClimber(), video.getThumbnail(),
            video.getDurationSeconds(), video.getSortOrder()
        );
    }
}
