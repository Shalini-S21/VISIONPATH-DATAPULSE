package com.visionpath.education.repository;

import com.visionpath.education.entity.College;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CollegeRepository extends JpaRepository<College, Long> {
    List<College> findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(String name, String loc);
    List<College> findByState(String state);
}
