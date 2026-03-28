package com.guessthebeta.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.guessthebeta.config.AppProperties;
import com.guessthebeta.dto.AuthResponse;
import com.guessthebeta.dto.UserResponse;
import com.guessthebeta.model.User;
import com.guessthebeta.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final GoogleIdTokenVerifier verifier;

    public AuthService(UserRepository userRepository, JwtService jwtService, AppProperties appProperties) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(), GsonFactory.getDefaultInstance())
            .setAudience(Collections.singletonList(appProperties.getGoogleClientId()))
            .build();
    }

    public AuthResponse authenticateWithGoogle(String idTokenString) {
        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                throw new RuntimeException("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            User user = userRepository.findByGoogleId(googleId)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setGoogleId(googleId);
                    newUser.setEmail(email);
                    newUser.setDisplayName(name);
                    newUser.setAvatarUrl(picture);
                    newUser.setCreatedAt(OffsetDateTime.now());
                    return userRepository.save(newUser);
                });

            String jwt = jwtService.generateToken(user.getId());
            return new AuthResponse(jwt, UserResponse.from(user));
        } catch (Exception e) {
            throw new RuntimeException("Google authentication failed: " + e.getMessage(), e);
        }
    }
}
