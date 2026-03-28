package com.guessthebeta.service;

import com.guessthebeta.dto.BetaVideoResponse;
import com.guessthebeta.repository.BetaVideoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BetaVideoService {

    private final BetaVideoRepository betaVideoRepository;

    public BetaVideoService(BetaVideoRepository betaVideoRepository) {
        this.betaVideoRepository = betaVideoRepository;
    }

    public List<BetaVideoResponse> getVideosForRoute(Long routeId) {
        return betaVideoRepository.findByRouteIdOrderBySortOrderAsc(routeId).stream()
            .map(BetaVideoResponse::from)
            .toList();
    }
}
