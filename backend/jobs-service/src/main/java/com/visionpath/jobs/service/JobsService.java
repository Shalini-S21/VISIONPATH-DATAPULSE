package com.visionpath.jobs.service;

import com.visionpath.jobs.entity.Job;
import com.visionpath.jobs.entity.JobApplication;
import com.visionpath.jobs.entity.SavedJob;
import com.visionpath.jobs.repository.JobApplicationRepository;
import com.visionpath.jobs.repository.JobRepository;
import com.visionpath.jobs.repository.SavedJobRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class JobsService {

    private static final Logger log = LoggerFactory.getLogger(JobsService.class);

    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;
    private final SavedJobRepository savedJobRepository;

    public JobsService(JobRepository jobRepository,
                       JobApplicationRepository applicationRepository,
                       SavedJobRepository savedJobRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.savedJobRepository = savedJobRepository;
    }

    @PostConstruct
    public void seedJobs() {
        if (jobRepository.count() == 0) {
            List<Job> jobs = Arrays.asList(
                createJob("Java Backend Developer", "TechCorp Solutions", "Bangalore", "Full-time",
                    "Fresher", "₹6L - ₹10L per year", "Java,Spring Boot,MySQL,REST APIs",
                    "B.Tech CS/IT"),
                createJob("React Frontend Developer", "Innovate Labs", "Remote", "Full-time",
                    "Junior", "₹5L - ₹8L per year", "React,JavaScript,HTML,CSS,TypeScript",
                    "B.Tech or BCA"),
                createJob("Data Science Intern", "Analytics Hub", "Hyderabad", "Internship",
                    "Fresher", "₹15,000/month", "Python,Machine Learning,Pandas,NumPy",
                    "B.Tech CS with ML knowledge"),
                createJob("Cloud Engineer", "CloudBase Technologies", "Pune", "Full-time",
                    "Mid", "₹12L - ₹20L per year", "AWS,Docker,Kubernetes,Terraform",
                    "B.Tech with AWS certification"),
                createJob("Cybersecurity Analyst", "SecureTech", "Chennai", "Full-time",
                    "Junior", "₹7L - ₹12L per year", "Networking,SIEM,Python,Ethical Hacking",
                    "B.Tech CS or Security certifications")
            );
            jobRepository.saveAll(jobs);
            log.info("Job seed data loaded.");
        }
    }

    private Job createJob(String title, String company, String location, String type,
                          String level, String salary, String skills, String qual) {
        Job job = new Job();
        job.setTitle(title);
        job.setCompany(company);
        job.setLocation(location);
        job.setEmploymentType(type);
        job.setExperienceLevel(level);
        job.setSalary(salary);
        job.setRequiredSkills(skills);
        job.setQualifications(qual);
        job.setPostedDate(LocalDate.now());
        job.setDeadline(LocalDate.now().plusMonths(1));
        job.setDescription("Exciting opportunity at " + company + " as " + title);
        return job;
    }

    public List<Job> getAllJobs() { return jobRepository.findByActiveTrue(); }

    public Job getById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public Job create(Job job) {
        job.setPostedDate(LocalDate.now());
        return jobRepository.save(job);
    }

    public Job update(Long id, Job job) {
        Job existing = getById(id);
        if (job.getTitle() != null) existing.setTitle(job.getTitle());
        if (job.getSalary() != null) existing.setSalary(job.getSalary());
        if (job.getDescription() != null) existing.setDescription(job.getDescription());
        return jobRepository.save(existing);
    }

    public void delete(Long id) { jobRepository.deleteById(id); }

    public List<Job> search(String keyword) {
        return jobRepository.findByTitleContainingIgnoreCaseOrCompanyContainingIgnoreCase(keyword, keyword);
    }

    public List<Job> getRecommendations(String skills) {
        if (skills == null || skills.isBlank()) return getAllJobs();
        String[] skillArr = skills.toLowerCase().split(",");
        return getAllJobs().stream()
                .filter(job -> {
                    String req = job.getRequiredSkills() != null ? job.getRequiredSkills().toLowerCase() : "";
                    for (String s : skillArr) {
                        if (req.contains(s.trim())) return true;
                    }
                    return false;
                })
                .toList();
    }

    // Saved Jobs
    public SavedJob saveJob(Long userId, Long jobId) {
        if (savedJobRepository.findByUserIdAndJobId(userId, jobId).isPresent()) {
            throw new RuntimeException("Job already saved");
        }
        SavedJob saved = new SavedJob();
        saved.setUserId(userId);
        saved.setJobId(jobId);
        return savedJobRepository.save(saved);
    }

    @Transactional
    public void unsaveJob(Long userId, Long jobId) {
        savedJobRepository.deleteByUserIdAndJobId(userId, jobId);
    }

    public List<SavedJob> getSavedJobs(Long userId) {
        return savedJobRepository.findByUserId(userId);
    }

    // Applications
    public JobApplication apply(Long userId, Long jobId, String coverLetter) {
        if (applicationRepository.findByUserIdAndJobId(userId, jobId).isPresent()) {
            throw new RuntimeException("You have already applied to this job");
        }
        JobApplication app = new JobApplication();
        app.setUserId(userId);
        app.setJobId(jobId);
        app.setCoverLetter(coverLetter);
        return applicationRepository.save(app);
    }

    public List<JobApplication> getApplications(Long userId) {
        return applicationRepository.findByUserId(userId);
    }

    public JobApplication updateApplication(Long id, String status) {
        JobApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
