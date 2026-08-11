package com.visionpath.progress.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "student_progress")
public class StudentProgress {

    @Id
    private String studentId; // usr_001

    private Integer overallCompletionRate;
    private Integer activeStreakDays;
    private Integer hoursSpentLearning;
    private Integer assessmentsPassed;
    private Integer coursesEnrolled;
    private Integer coursesCompleted;
    private String topSkill;

    public StudentProgress() {
    }

    public StudentProgress(String studentId, Integer overallCompletionRate, Integer activeStreakDays, Integer hoursSpentLearning, Integer assessmentsPassed, Integer coursesEnrolled, Integer coursesCompleted, String topSkill) {
        this.studentId = studentId;
        this.overallCompletionRate = overallCompletionRate;
        this.activeStreakDays = activeStreakDays;
        this.hoursSpentLearning = hoursSpentLearning;
        this.assessmentsPassed = assessmentsPassed;
        this.coursesEnrolled = coursesEnrolled;
        this.coursesCompleted = coursesCompleted;
        this.topSkill = topSkill;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public Integer getOverallCompletionRate() {
        return overallCompletionRate;
    }

    public void setOverallCompletionRate(Integer overallCompletionRate) {
        this.overallCompletionRate = overallCompletionRate;
    }

    public Integer getActiveStreakDays() {
        return activeStreakDays;
    }

    public void setActiveStreakDays(Integer activeStreakDays) {
        this.activeStreakDays = activeStreakDays;
    }

    public Integer getHoursSpentLearning() {
        return hoursSpentLearning;
    }

    public void setHoursSpentLearning(Integer hoursSpentLearning) {
        this.hoursSpentLearning = hoursSpentLearning;
    }

    public Integer getAssessmentsPassed() {
        return assessmentsPassed;
    }

    public void setAssessmentsPassed(Integer assessmentsPassed) {
        this.assessmentsPassed = assessmentsPassed;
    }

    public Integer getCoursesEnrolled() {
        return coursesEnrolled;
    }

    public void setCoursesEnrolled(Integer coursesEnrolled) {
        this.coursesEnrolled = coursesEnrolled;
    }

    public Integer getCoursesCompleted() {
        return coursesCompleted;
    }

    public void setCoursesCompleted(Integer coursesCompleted) {
        this.coursesCompleted = coursesCompleted;
    }

    public String getTopSkill() {
        return topSkill;
    }

    public void setTopSkill(String topSkill) {
        this.topSkill = topSkill;
    }

    public static StudentProgressBuilder builder() {
        return new StudentProgressBuilder();
    }

    public static class StudentProgressBuilder {
        private String studentId;
        private Integer overallCompletionRate;
        private Integer activeStreakDays;
        private Integer hoursSpentLearning;
        private Integer assessmentsPassed;
        private Integer coursesEnrolled;
        private Integer coursesCompleted;
        private String topSkill;

        public StudentProgressBuilder studentId(String studentId) {
            this.studentId = studentId;
            return this;
        }

        public StudentProgressBuilder overallCompletionRate(Integer overallCompletionRate) {
            this.overallCompletionRate = overallCompletionRate;
            return this;
        }

        public StudentProgressBuilder activeStreakDays(Integer activeStreakDays) {
            this.activeStreakDays = activeStreakDays;
            return this;
        }

        public StudentProgressBuilder hoursSpentLearning(Integer hoursSpentLearning) {
            this.hoursSpentLearning = hoursSpentLearning;
            return this;
        }

        public StudentProgressBuilder assessmentsPassed(Integer assessmentsPassed) {
            this.assessmentsPassed = assessmentsPassed;
            return this;
        }

        public StudentProgressBuilder coursesEnrolled(Integer coursesEnrolled) {
            this.coursesEnrolled = coursesEnrolled;
            return this;
        }

        public StudentProgressBuilder coursesCompleted(Integer coursesCompleted) {
            this.coursesCompleted = coursesCompleted;
            return this;
        }

        public StudentProgressBuilder topSkill(String topSkill) {
            this.topSkill = topSkill;
            return this;
        }

        public StudentProgress build() {
            return new StudentProgress(studentId, overallCompletionRate, activeStreakDays, hoursSpentLearning, assessmentsPassed, coursesEnrolled, coursesCompleted, topSkill);
        }
    }
}
