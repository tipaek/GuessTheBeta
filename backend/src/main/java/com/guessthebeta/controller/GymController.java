package com.guessthebeta.controller;

import com.guessthebeta.dto.GymResponse;
import com.guessthebeta.service.GymService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gyms")
public class GymController {

    private final GymService gymService;

    public GymController(GymService gymService) {
        this.gymService = gymService;
    }

    @GetMapping
    public ResponseEntity<List<GymResponse>> getGyms(@RequestParam(required = false) Boolean board) {
        if (Boolean.TRUE.equals(board)) {
            return ResponseEntity.ok(gymService.getBoardGyms());
        }
        return ResponseEntity.ok(gymService.getAllGyms());
    }
}
