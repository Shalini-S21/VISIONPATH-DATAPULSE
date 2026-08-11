package com.visionpath.progress.repository;

import com.visionpath.progress.entity.StudentProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentProgressRepository extends JpaRepository<StudentProgress, String> {
}
