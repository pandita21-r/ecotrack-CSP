package com.teamBangan.demo.repository;

import com.teamBangan.demo.model.ecotrackModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ecotrackRepository extends JpaRepository<ecotrackModel, Long> {

    // Custom query to find activities by category (e.g., "Waste", "Transport")
    List<ecotrackModel> findByCategory(String category);

    // Custom query to find activities with impact higher than a certain value
    List<ecotrackModel> findByImpactValueGreaterThan(Double value);
}