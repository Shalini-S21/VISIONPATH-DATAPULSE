package com.visionpath.progress.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    private Integer overallCompletion = 0;
    private Integer studyPlansCompleted = 0;
    private Integer assessmentsTaken = 0;
    private Integer jobsApplied = 0;

    private LocalDate lastActivityDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Integer getOverallCompletion() { return overallCompletion; }
    public void setOverallCompletion(Integer overallCompletion) { this.overallCompletion = overallCompletion; }
    public Integer getStudyPlansCompleted() { return studyPlansCompleted; }
    public void setStudyPlansCompleted(Integer studyPlansCompleted) { this.studyPlansCompleted = studyPlansCompleted; }
    public Integer getAssessmentsTaken() { return assessmentsTaken; }
    public void setAssessmentsTaken(Integer assessmentsTaken) { this.assessmentsTaken = assessmentsTaken; }
    public Integer getJobsApplied() { return jobsApplied; }
    public void setJobsApplied(Integer jobsApplied) { this.jobsApplied = jobsApplied; }
    public LocalDate getLastActivityDate() { return lastActivityDate; }
    public void setLastActivityDate(LocalDate lastActivityDate) { this.lastActivityDate = lastActivityDate; }
}
