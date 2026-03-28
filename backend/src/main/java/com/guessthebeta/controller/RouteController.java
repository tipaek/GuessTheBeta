package com.guessthebeta.controller;

import com.guessthebeta.dto.BetaVideoResponse;
import com.guessthebeta.dto.RouteResponse;
import com.guessthebeta.service.BetaVideoService;
import com.guessthebeta.service.RouteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class RouteController {

    private final RouteService routeService;
    private final BetaVideoService betaVideoService;

    public RouteController(RouteService routeService, BetaVideoService betaVideoService) {
        this.routeService = routeService;
        this.betaVideoService = betaVideoService;
    }

    @GetMapping("/gyms/{gymId}/routes/random")
    public ResponseEntity<List<RouteResponse>> getRandomRoutes(
            @PathVariable Long gymId,
            @RequestParam(defaultValue = "0") int minGrade,
            @RequestParam(defaultValue = "17") int maxGrade,
            @RequestParam(required = false) List<Long> exclude,
            @RequestParam(defaultValue = "5") int limit) {
        return ResponseEntity.ok(routeService.getRandomRoutes(gymId, minGrade, maxGrade, exclude, limit));
    }

    @GetMapping("/routes/{routeId}")
    public ResponseEntity<RouteResponse> getRoute(@PathVariable Long routeId) {
        return ResponseEntity.ok(routeService.getRoute(routeId));
    }

    @GetMapping("/routes/{routeId}/videos")
    public ResponseEntity<List<BetaVideoResponse>> getVideos(@PathVariable Long routeId) {
        return ResponseEntity.ok(betaVideoService.getVideosForRoute(routeId));
    }
}
