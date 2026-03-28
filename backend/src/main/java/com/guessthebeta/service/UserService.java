package com.guessthebeta.service;

import com.guessthebeta.dto.*;
import com.guessthebeta.model.Route;
import com.guessthebeta.model.User;
import com.guessthebeta.model.UserClimbHistory;
import com.guessthebeta.repository.BetaVideoRepository;
import com.guessthebeta.repository.RouteRepository;
import com.guessthebeta.repository.UserClimbHistoryRepository;
import com.guessthebeta.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserClimbHistoryRepository historyRepository;
    private final RouteRepository routeRepository;
    private final BetaVideoRepository betaVideoRepository;

    public UserService(UserRepository userRepository, UserClimbHistoryRepository historyRepository,
                       RouteRepository routeRepository, BetaVideoRepository betaVideoRepository) {
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
        this.routeRepository = routeRepository;
        this.betaVideoRepository = betaVideoRepository;
    }

    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return UserResponse.from(user);
    }

    public UserResponse updatePreferences(Long userId, PreferencesRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.preferredGym() != null) user.setPreferredGym(request.preferredGym());
        if (request.minGrade() != null) user.setMinGrade(request.minGrade());
        if (request.maxGrade() != null) user.setMaxGrade(request.maxGrade());

        return UserResponse.from(userRepository.save(user));
    }

    public List<ClimbHistoryResponse> getHistory(Long userId) {
        return historyRepository.findByUserIdOrderByViewedAtDesc(userId).stream()
            .map(h -> ClimbHistoryResponse.from(h, betaVideoRepository.countByRouteId(h.getRoute().getId())))
            .toList();
    }

    public void recordHistory(Long userId, HistoryRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Route route = routeRepository.findById(request.routeId())
            .orElseThrow(() -> new RuntimeException("Route not found"));

        UserClimbHistory history = historyRepository.findByUserIdAndRouteId(userId, request.routeId())
            .orElseGet(() -> {
                UserClimbHistory h = new UserClimbHistory();
                h.setUser(user);
                h.setRoute(route);
                return h;
            });

        history.setViewedAt(OffsetDateTime.now());
        if (request.watchedBeta()) {
            history.setWatchedBeta(true);
        }
        historyRepository.save(history);
    }
}
