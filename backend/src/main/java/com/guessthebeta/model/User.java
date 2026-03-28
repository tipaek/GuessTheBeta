package com.guessthebeta.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "google_id", nullable = false, unique = true)
    private String googleId;

    @Column(nullable = false)
    private String email;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "preferred_gym")
    private Long preferredGym;

    @Column(name = "min_grade")
    private int minGrade = 0;

    @Column(name = "max_grade")
    private int maxGrade = 17;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    public User() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getGoogleId() { return googleId; }
    public void setGoogleId(String googleId) { this.googleId = googleId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }

    public Long getPreferredGym() { return preferredGym; }
    public void setPreferredGym(Long preferredGym) { this.preferredGym = preferredGym; }

    public int getMinGrade() { return minGrade; }
    public void setMinGrade(int minGrade) { this.minGrade = minGrade; }

    public int getMaxGrade() { return maxGrade; }
    public void setMaxGrade(int maxGrade) { this.maxGrade = maxGrade; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
