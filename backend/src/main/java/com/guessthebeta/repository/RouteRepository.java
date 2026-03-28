package com.guessthebeta.repository;

import com.guessthebeta.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {

    @Query(value = """
        SELECT r.* FROM routes r
        WHERE r.gym_id = :gymId
          AND r.active = true
          AND r.grade_sort BETWEEN :minGrade AND :maxGrade
          AND r.id NOT IN (:excludeIds)
        ORDER BY RANDOM()
        LIMIT :limit
        """, nativeQuery = true)
    List<Route> findRandomRoutes(
        @Param("gymId") Long gymId,
        @Param("minGrade") int minGrade,
        @Param("maxGrade") int maxGrade,
        @Param("excludeIds") List<Long> excludeIds,
        @Param("limit") int limit
    );

    @Query(value = """
        SELECT r.* FROM routes r
        WHERE r.gym_id = :gymId
          AND r.active = true
          AND r.grade_sort BETWEEN :minGrade AND :maxGrade
        ORDER BY RANDOM()
        LIMIT :limit
        """, nativeQuery = true)
    List<Route> findRandomRoutesNoExclude(
        @Param("gymId") Long gymId,
        @Param("minGrade") int minGrade,
        @Param("maxGrade") int maxGrade,
        @Param("limit") int limit
    );

    List<Route> findByGymIdAndActiveTrue(Long gymId);
}
