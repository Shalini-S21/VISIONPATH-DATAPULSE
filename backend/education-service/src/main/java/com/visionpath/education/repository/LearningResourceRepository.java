package com.visionpath.education.repository;

import com.visionpath.education.entity.LearningResource;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LearningResourceRepository extends JpaRepository<LearningResource, String> {
    List<LearningResource> findByAuthorCounselorId(String authorCounselorId);
}
