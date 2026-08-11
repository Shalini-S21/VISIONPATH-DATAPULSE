package com.visionpath.education.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "course_enrollments")
public class CourseEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String studentId;
    private String courseId;
    private Integer progressPercentage;
    private Integer completedLessons;
    private Integer totalLessons;

    private LocalDateTime enrolledAt;

    public CourseEnrollment() {
    }

    public CourseEnrollment(String id, String studentId, String courseId, Integer progressPercentage, Integer completedLessons, Integer totalLessons, LocalDateTime enrolledAt) {
        this.id = id;
        this.studentId = studentId;
        this.courseId = courseId;
        this.progressPercentage = progressPercentage;
        this.completedLessons = completedLessons;
        this.totalLessons = totalLessons;
        this.enrolledAt = enrolledAt;
    }

    @PrePersist
    protected void onCreate() {
        this.enrolledAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Integer getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(Integer progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public Integer getCompletedLessons() {
        return completedLessons;
    }

    public void setCompletedLessons(Integer completedLessons) {
        this.completedLessons = completedLessons;
    }

    public Integer getTotalLessons() {
        return totalLessons;
    }

    public void setTotalLessons(Integer totalLessons) {
        this.totalLessons = totalLessons;
    }

    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }

    public static CourseEnrollmentBuilder builder() {
        return new CourseEnrollmentBuilder();
    }

    public static class CourseEnrollmentBuilder {
        private String id;
        private String studentId;
        private String courseId;
        private Integer progressPercentage;
        private Integer completedLessons;
        private Integer totalLessons;
        private LocalDateTime enrolledAt;

        public CourseEnrollmentBuilder id(String id) {
            this.id = id;
            return this;
        }

        public CourseEnrollmentBuilder studentId(String studentId) {
            this.studentId = studentId;
            return this;
        }

        public CourseEnrollmentBuilder courseId(String courseId) {
            this.courseId = courseId;
            return this;
        }

        public CourseEnrollmentBuilder progressPercentage(Integer progressPercentage) {
            this.progressPercentage = progressPercentage;
            return this;
        }

        public CourseEnrollmentBuilder completedLessons(Integer completedLessons) {
            this.completedLessons = completedLessons;
            return this;
        }

        public CourseEnrollmentBuilder totalLessons(Integer totalLessons) {
            this.totalLessons = totalLessons;
            return this;
        }

        public CourseEnrollmentBuilder enrolledAt(LocalDateTime enrolledAt) {
            this.enrolledAt = enrolledAt;
            return this;
        }

        public CourseEnrollment build() {
            return new CourseEnrollment(id, studentId, courseId, progressPercentage, completedLessons, totalLessons, enrolledAt);
        }
    }
}
