package com.guessthebeta.service;

import com.guessthebeta.dto.RouteResponse;
import com.guessthebeta.model.Route;
import com.guessthebeta.repository.BetaVideoRepository;
import com.guessthebeta.repository.RouteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RouteService {

    private final RouteRepository routeRepository;
    private final BetaVideoRepository betaVideoRepository;

    public RouteService(RouteRepository routeRepository, BetaVideoRepository betaVideoRepository) {
        this.routeRepository = routeRepository;
        this.betaVideoRepository = betaVideoRepository;
    }

    public List<RouteResponse> getRandomRoutes(Long gymId, int minGrade, int maxGrade,
                                                List<Long> excludeIds, int limit) {
        List<Route> routes;
        if (excludeIds == null || excludeIds.isEmpty()) {
            routes = routeRepository.findRandomRoutesNoExclude(gymId, minGrade, maxGrade, limit);
        } else {
            routes = routeRepository.findRandomRoutes(gymId, minGrade, maxGrade, excludeIds, limit);
        }
        return routes.stream()
            .map(r -> RouteResponse.from(r, betaVideoRepository.countByRouteId(r.getId())))
            .toList();
    }

    public RouteResponse getRoute(Long routeId) {
        Route route = routeRepository.findById(routeId)
            .orElseThrow(() -> new RuntimeException("Route not found"));
        return RouteResponse.from(route, betaVideoRepository.countByRouteId(route.getId()));
    }
}
