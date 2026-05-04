package com.teamBangan.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "eco_tracking")
public class ecotrackModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String activityName;

    @Column(nullable = false)
    private Double impactValue; // e.g., carbon saved or waste reduced

    @Column(nullable = false)
    private String category; // e.g., "Transport", "Energy", "Waste"

    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Default Constructor
    public ecotrackModel() {}

    // Constructor with fields
    public ecotrackModel(String activityName, Double impactValue, String category, String description) {
        this.activityName = activityName;
        this.impactValue = impactValue;
        this.category = category;
        this.description = description;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getActivityName() { return activityName; }
    public void setActivityName(String activityName) { this.activityName = activityName; }

    public Double getImpactValue() { return impactValue; }
    public void setImpactValue(Double impactValue) { this.impactValue = impactValue; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}