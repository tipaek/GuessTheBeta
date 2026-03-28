package com.guessthebeta.repository;

import com.guessthebeta.model.UserClimbHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserClimbHistoryRepository extends JpaRepository<UserClimbHistory, Long> {
    List<UserClimbHistory> findByUserIdOrderByViewedAtDesc(Long userId);
    Optional<UserClimbHistory> findByUserIdAndRouteId(Long userId, Long routeId);
}
