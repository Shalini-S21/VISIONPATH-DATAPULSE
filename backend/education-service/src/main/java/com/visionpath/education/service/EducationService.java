package com.visionpath.education.service;

import com.visionpath.education.entity.College;
import com.visionpath.education.entity.Course;
import com.visionpath.education.repository.CollegeRepository;
import com.visionpath.education.repository.CourseRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class EducationService {

    private static final Logger log = LoggerFactory.getLogger(EducationService.class);

    private final CollegeRepository collegeRepository;
    private final CourseRepository courseRepository;

    public EducationService(CollegeRepository collegeRepository, CourseRepository courseRepository) {
        this.collegeRepository = collegeRepository;
        this.courseRepository = courseRepository;
    }

    @PostConstruct
    public void seedData() {
        if (collegeRepository.count() == 0) {
            College iit = new College();
            iit.setName("IIT Bombay");
            iit.setLocation("Mumbai");
            iit.setState("Maharashtra");
            iit.setWebsite("https://www.iitb.ac.in");
            iit.setDescription("Premier technical institute in India");
            iit.setRanking(1);
            iit.setAccreditation("NAAC A++");

            College nit = new College();
            nit.setName("NIT Trichy");
            nit.setLocation("Tiruchirappalli");
            nit.setState("Tamil Nadu");
            nit.setWebsite("https://www.nitt.edu");
            nit.setDescription("Top National Institute of Technology");
            nit.setRanking(10);
            nit.setAccreditation("NAAC A");

            College vit = new College();
            vit.setName("VIT Vellore");
            vit.setLocation("Vellore");
            vit.setState("Tamil Nadu");
            vit.setWebsite("https://vit.ac.in");
            vit.setDescription("Deemed to be University with strong industry connections");
            vit.setRanking(15);
            vit.setAccreditation("NAAC A++");

            collegeRepository.saveAll(Arrays.asList(iit, nit, vit));
            log.info("College seed data loaded.");
        }

        if (courseRepository.count() == 0) {
            Course btech = new Course();
            btech.setName("B.Tech Computer Science Engineering");
            btech.setDegree("B.Tech");
            btech.setDuration("4 years");
            btech.setEligibility("10+2 with PCM, JEE score");
            btech.setFees("₹1.5L - ₹12L per year");
            btech.setDescription("Undergraduate engineering in computer science");
            btech.setCategory("Engineering");

            Course mca = new Course();
            mca.setName("MCA - Master of Computer Applications");
            mca.setDegree("MCA");
            mca.setDuration("2 years");
            mca.setEligibility("BCA or B.Sc. with Mathematics");
            mca.setFees("₹80K - ₹3L per year");
            mca.setDescription("Postgraduate program in computer applications");
            mca.setCategory("Science");

            Course mba = new Course();
            mba.setName("MBA - Business Administration");
            mba.setDegree("MBA");
            mba.setDuration("2 years");
            mba.setEligibility("Any Bachelor's degree + CAT/MAT");
            mba.setFees("₹2L - ₹25L per year");
            mba.setDescription("Master's in Business Administration");
            mba.setCategory("Commerce");

            courseRepository.saveAll(Arrays.asList(btech, mca, mba));
            log.info("Course seed data loaded.");
        }
    }

    // Colleges
    public List<College> getAllColleges() { return collegeRepository.findAll(); }

    public College getCollegeById(Long id) {
        return collegeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("College not found with id: " + id));
    }

    public College createCollege(College college) { return collegeRepository.save(college); }

    public College updateCollege(Long id, College college) {
        College existing = getCollegeById(id);
        if (college.getName() != null) existing.setName(college.getName());
        if (college.getLocation() != null) existing.setLocation(college.getLocation());
        if (college.getState() != null) existing.setState(college.getState());
        if (college.getRanking() != null) existing.setRanking(college.getRanking());
        return collegeRepository.save(existing);
    }

    public void deleteCollege(Long id) { collegeRepository.deleteById(id); }

    // Courses
    public List<Course> getAllCourses() { return courseRepository.findAll(); }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));
    }

    public Course createCourse(Course course) { return courseRepository.save(course); }

    public void deleteCourse(Long id) { courseRepository.deleteById(id); }

    // Search across colleges and courses
    public List<College> searchColleges(String keyword) {
        return collegeRepository.findByNameContainingIgnoreCaseOrLocationContainingIgnoreCase(keyword, keyword);
    }

    public List<Course> searchCourses(String keyword) {
        return courseRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }
}
