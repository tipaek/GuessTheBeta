package com.guessthebeta.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.guessthebeta.config.AppProperties;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class JwtService {

    private final Algorithm algorithm;

    public JwtService(AppProperties appProperties) {
        this.algorithm = Algorithm.HMAC256(appProperties.getJwtSecret());
    }

    public String generateToken(Long userId) {
        return JWT.create()
            .withSubject(userId.toString())
            .withIssuedAt(Instant.now())
            .withExpiresAt(Instant.now().plus(30, ChronoUnit.DAYS))
            .sign(algorithm);
    }

    public Long validateToken(String token) {
        try {
            var decodedJWT = JWT.require(algorithm).build().verify(token);
            return Long.parseLong(decodedJWT.getSubject());
        } catch (JWTVerificationException | NumberFormatException e) {
            return null;
        }
    }
}
