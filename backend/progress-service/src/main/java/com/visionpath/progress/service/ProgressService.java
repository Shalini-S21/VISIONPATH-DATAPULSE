package com.visionpath.progress.service;

import com.visionpath.progress.entity.Progress;
import com.visionpath.progress.repository.ProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public Progress getProgress(Long userId) {
        return progressRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Progress p = new Progress();
                    p.setUserId(userId);
                    p.setLastActivityDate(LocalDate.now());
                    return progressRepository.save(p);
                });
    }

    public Progress incrementAssessments(Long userId) {
        Progress p = getProgress(userId);
        p.setAssessmentsTaken(p.getAssessmentsTaken() + 1);
        p.setLastActivityDate(LocalDate.now());
        recalculate(p);
        return progressRepository.save(p);
    }

    public Progress incrementJobsApplied(Long userId) {
        Progress p = getProgress(userId);
        p.setJobsApplied(p.getJobsApplied() + 1);
        p.setLastActivityDate(LocalDate.now());
        recalculate(p);
        return progressRepository.save(p);
    }

    public Progress incrementStudyPlans(Long userId) {
        Progress p = getProgress(userId);
        p.setStudyPlansCompleted(p.getStudyPlansCompleted() + 1);
        p.setLastActivityDate(LocalDate.now());
        recalculate(p);
        return progressRepository.save(p);
    }

    private void recalculate(Progress p) {
        // Simple metric for demo: max out at 100 based on activity
        int totalScore = (p.getAssessmentsTaken() * 10) + (p.getJobsApplied() * 5) + (p.getStudyPlansCompleted() * 20);
        p.setOverallCompletion(Math.min(100, totalScore));
    }
}
