package com.guessthebeta.repository;

import com.guessthebeta.model.BetaVideo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BetaVideoRepository extends JpaRepository<BetaVideo, Long> {
    List<BetaVideo> findByRouteIdOrderBySortOrderAsc(Long routeId);
    int countByRouteId(Long routeId);
}
