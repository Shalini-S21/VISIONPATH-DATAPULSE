package com.visionpath.admin.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    public Map<String, Object> getAnalytics() {
        Map<String, Object> data = new HashMap<>();
        data.put("totalUsers", 1542);
        data.put("activeUsersToday", 320);
        data.put("assessmentsTaken", 4890);
        data.put("jobsApplied", 1230);
        data.put("counselingAppointments", 85);
        data.put("popularCareers", new String[]{"Software Engineer", "Data Scientist", "UI/UX Designer"});
        return data;
    }
}
