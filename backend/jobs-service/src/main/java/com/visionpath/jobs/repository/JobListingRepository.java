package com.visionpath.jobs.repository;

import com.visionpath.jobs.entity.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobListingRepository extends JpaRepository<JobListing, String> {
}
