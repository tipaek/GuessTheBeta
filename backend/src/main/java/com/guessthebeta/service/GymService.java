package com.guessthebeta.service;

import com.guessthebeta.dto.GymResponse;
import com.guessthebeta.repository.GymRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GymService {

    private final GymRepository gymRepository;

    public GymService(GymRepository gymRepository) {
        this.gymRepository = gymRepository;
    }

    public List<GymResponse> getAllGyms() {
        return gymRepository.findAll().stream()
            .map(GymResponse::from)
            .toList();
    }

    public List<GymResponse> getBoardGyms() {
        return gymRepository.findByIsBoardTrue().stream()
            .map(GymResponse::from)
            .toList();
    }
}
