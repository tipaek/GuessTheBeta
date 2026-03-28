package com.guessthebeta.dto;

import com.guessthebeta.model.Gym;

public record GymResponse(
    Long id,
    String name,
    String slug,
    String city,
    String state,
    String country,
    String logoUrl,
    boolean isBoard,
    String boardType
) {
    public static GymResponse from(Gym gym) {
        return new GymResponse(
            gym.getId(), gym.getName(), gym.getSlug(),
            gym.getCity(), gym.getState(), gym.getCountry(),
            gym.getLogoUrl(), gym.isBoard(), gym.getBoardType()
        );
    }
}
