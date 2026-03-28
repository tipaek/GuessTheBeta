package com.guessthebeta.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "beta_videos")
public class BetaVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;

    @Column(name = "video_url", nullable = false)
    private String videoUrl;

    private String source;
    private String climber;
    private String thumbnail;

    @Column(name = "duration_s")
    private Integer durationSeconds;

    @Column(name = "sort_order")
    private int sortOrder;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    public BetaVideo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Route getRoute() { return route; }
    public void setRoute(Route route) { this.route = route; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getClimber() { return climber; }
    public void setClimber(String climber) { this.climber = climber; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public Integer getDurationSeconds() { return durationSeconds; }
    public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }

    public int getSortOrder() { return sortOrder; }
    public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
