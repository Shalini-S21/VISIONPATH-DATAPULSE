package com.visionpath.jobs.repository;

import com.visionpath.jobs.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
    Optional<JobApplication> findByUserIdAndJobId(Long userId, Long jobId);
}
