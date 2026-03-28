package com.guessthebeta.dto;

import com.guessthebeta.model.User;

public record UserResponse(
    Long id,
    String email,
    String displayName,
    String avatarUrl,
    Long preferredGym,
    int minGrade,
    int maxGrade
) {
    public static UserResponse from(User user) {
        return new UserResponse(
            user.getId(), user.getEmail(), user.getDisplayName(),
            user.getAvatarUrl(), user.getPreferredGym(),
            user.getMinGrade(), user.getMaxGrade()
        );
    }
}
