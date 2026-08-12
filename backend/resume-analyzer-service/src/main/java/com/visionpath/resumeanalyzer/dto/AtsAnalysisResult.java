package com.visionpath.resumeanalyzer.dto;

import java.util.List;

public class AtsAnalysisResult {

    private int atsScore;
    private String atsFeedback;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> missingKeywords;
    private List<String> missingSkills;
    private List<String> formattingIssues;
    private List<String> recommendations;
    private String summary;

    public AtsAnalysisResult() {}

    public AtsAnalysisResult(int atsScore, String atsFeedback, List<String> strengths,
                             List<String> weaknesses, List<String> missingKeywords,
                             List<String> missingSkills, List<String> formattingIssues,
                             List<String> recommendations, String summary) {
        this.atsScore = atsScore;
        this.atsFeedback = atsFeedback;
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.missingKeywords = missingKeywords;
        this.missingSkills = missingSkills;
        this.formattingIssues = formattingIssues;
        this.recommendations = recommendations;
        this.summary = summary;
    }

    public int getAtsScore() { return atsScore; }
    public void setAtsScore(int atsScore) { this.atsScore = atsScore; }

    public String getAtsFeedback() { return atsFeedback; }
    public void setAtsFeedback(String atsFeedback) { this.atsFeedback = atsFeedback; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getWeaknesses() { return weaknesses; }
    public void setWeaknesses(List<String> weaknesses) { this.weaknesses = weaknesses; }

    public List<String> getMissingKeywords() { return missingKeywords; }
    public void setMissingKeywords(List<String> missingKeywords) { this.missingKeywords = missingKeywords; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public List<String> getFormattingIssues() { return formattingIssues; }
    public void setFormattingIssues(List<String> formattingIssues) { this.formattingIssues = formattingIssues; }

    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
