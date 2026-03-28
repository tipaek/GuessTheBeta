package com.guessthebeta.repository;

import com.guessthebeta.model.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GymRepository extends JpaRepository<Gym, Long> {
    Optional<Gym> findBySlug(String slug);
    List<Gym> findByIsBoardTrue();
    List<Gym> findByIsBoardFalse();
}
