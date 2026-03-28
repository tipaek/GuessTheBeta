package com.guessthebeta.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "user_climb_history")
public class UserClimbHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    @Column(name = "viewed_at")
    private OffsetDateTime viewedAt;

    @Column(name = "watched_beta")
    private boolean watchedBeta;

    public UserClimbHistory() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Route getRoute() { return route; }
    public void setRoute(Route route) { this.route = route; }

    public OffsetDateTime getViewedAt() { return viewedAt; }
    public void setViewedAt(OffsetDateTime viewedAt) { this.viewedAt = viewedAt; }

    public boolean isWatchedBeta() { return watchedBeta; }
    public void setWatchedBeta(boolean watchedBeta) { this.watchedBeta = watchedBeta; }
}
