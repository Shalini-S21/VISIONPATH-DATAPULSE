package com.visionpath.education.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_resources")
public class LearningResource {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;
    private String category;
    private String authorCounselorId;
    private String authorName;
    private String fileUrl;
    private String fileType; // PDF, VIDEO, SLIDES

    private LocalDateTime uploadedAt;

    public LearningResource() {
    }

    public LearningResource(String id, String title, String category, String authorCounselorId, String authorName, String fileUrl, String fileType, LocalDateTime uploadedAt) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.authorCounselorId = authorCounselorId;
        this.authorName = authorName;
        this.fileUrl = fileUrl;
        this.fileType = fileType;
        this.uploadedAt = uploadedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.uploadedAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorCounselorId() {
        return authorCounselorId;
    }

    public void setAuthorCounselorId(String authorCounselorId) {
        this.authorCounselorId = authorCounselorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public static LearningResourceBuilder builder() {
        return new LearningResourceBuilder();
    }

    public static class LearningResourceBuilder {
        private String id;
        private String title;
        private String category;
        private String authorCounselorId;
        private String authorName;
        private String fileUrl;
        private String fileType;
        private LocalDateTime uploadedAt;

        public LearningResourceBuilder id(String id) {
            this.id = id;
            return this;
        }

        public LearningResourceBuilder title(String title) {
            this.title = title;
            return this;
        }

        public LearningResourceBuilder category(String category) {
            this.category = category;
            return this;
        }

        public LearningResourceBuilder authorCounselorId(String authorCounselorId) {
            this.authorCounselorId = authorCounselorId;
            return this;
        }

        public LearningResourceBuilder authorName(String authorName) {
            this.authorName = authorName;
            return this;
        }

        public LearningResourceBuilder fileUrl(String fileUrl) {
            this.fileUrl = fileUrl;
            return this;
        }

        public LearningResourceBuilder fileType(String fileType) {
            this.fileType = fileType;
            return this;
        }

        public LearningResourceBuilder uploadedAt(LocalDateTime uploadedAt) {
            this.uploadedAt = uploadedAt;
            return this;
        }

        public LearningResource build() {
            return new LearningResource(id, title, category, authorCounselorId, authorName, fileUrl, fileType, uploadedAt);
        }
    }
}
