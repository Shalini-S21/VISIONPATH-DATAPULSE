package com.visionpath.jobs.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "job_listings")
public class JobListing {

    @Id
    private String id; // job_1

    private String title;
    private String company;
    private String logo;
    private String location;
    private String type; // Full-Time, Part-Time, Remote
    private String salary;
    private String experience;
    private String postedDate;

    @Column(length = 1000)
    private String description;

    @ElementCollection
    private List<String> skills;

    public JobListing() {
    }

    public JobListing(String id, String title, String company, String logo, String location, String type, String salary, String experience, String postedDate, String description, List<String> skills) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.logo = logo;
        this.location = location;
        this.type = type;
        this.salary = salary;
        this.experience = experience;
        this.postedDate = postedDate;
        this.description = description;
        this.skills = skills;
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public static JobListingBuilder builder() {
        return new JobListingBuilder();
    }

    public static class JobListingBuilder {
        private String id;
        private String title;
        private String company;
        private String logo;
        private String location;
        private String type;
        private String salary;
        private String experience;
        private String postedDate;
        private String description;
        private List<String> skills;

        public JobListingBuilder id(String id) {
            this.id = id;
            return this;
        }

        public JobListingBuilder title(String title) {
            this.title = title;
            return this;
        }

        public JobListingBuilder company(String company) {
            this.company = company;
            return this;
        }

        public JobListingBuilder logo(String logo) {
            this.logo = logo;
            return this;
        }

        public JobListingBuilder location(String location) {
            this.location = location;
            return this;
        }

        public JobListingBuilder type(String type) {
            this.type = type;
            return this;
        }

        public JobListingBuilder salary(String salary) {
            this.salary = salary;
            return this;
        }

        public JobListingBuilder experience(String experience) {
            this.experience = experience;
            return this;
        }

        public JobListingBuilder postedDate(String postedDate) {
            this.postedDate = postedDate;
            return this;
        }

        public JobListingBuilder description(String description) {
            this.description = description;
            return this;
        }

        public JobListingBuilder skills(List<String> skills) {
            this.skills = skills;
            return this;
        }

        public JobListing build() {
            return new JobListing(id, title, company, logo, location, type, salary, experience, postedDate, description, skills);
        }
    }
}
