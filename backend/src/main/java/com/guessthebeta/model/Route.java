package com.guessthebeta.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gym_id", nullable = false)
    private Gym gym;

    private String name;

    @Column(nullable = false)
    private String grade;

    @Column(name = "grade_sort", nullable = false)
    private int gradeSort;

    @Column(name = "photo_url", nullable = false)
    private String photoUrl;

    @Column(name = "board_layout_id")
    private String boardLayoutId;

    private String setter;
    private String color;
    private boolean active = true;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    public Route() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Gym getGym() { return gym; }
    public void setGym(Gym gym) { this.gym = gym; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public int getGradeSort() { return gradeSort; }
    public void setGradeSort(int gradeSort) { this.gradeSort = gradeSort; }

    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }

    public String getBoardLayoutId() { return boardLayoutId; }
    public void setBoardLayoutId(String boardLayoutId) { this.boardLayoutId = boardLayoutId; }

    public String getSetter() { return setter; }
    public void setSetter(String setter) { this.setter = setter; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
}
