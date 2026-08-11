package com.visionpath.education.repository;

import com.visionpath.education.entity.CourseEnrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, String> {
    List<CourseEnrollment> findByStudentId(String studentId);
    boolean existsByStudentIdAndCourseId(String studentId, String courseId);
}
