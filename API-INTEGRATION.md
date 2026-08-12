# VisionPath API Integration Matrix — Frontend ↔ Gateway ↔ Microservices

This document maps every frontend page and feature component to its corresponding service module, API Gateway path, backend microservice, HTTP method, request/response structures, and Bearer JWT authentication requirement.

---

## Central Gateway Configuration
- **API Gateway URL**: `http://localhost:8080/api`
- **Central Interceptor**: [axiosInstance.js](file:///C:/Users/S.shalini/Documents/FSJ/SRS%20project/VISIONPATH-FULL/Vision-path-complete-main/Vision-path-complete-main/src/api/axiosInstance.js)
- **Token Storage**: `localStorage.getItem('vp_token')`
- **Authorization Header**: `Authorization: Bearer <JWT_TOKEN>` (Automatically attached)
- **401 Unauthorized Action**: Clears `vp_token`, `vp_user`, resets Redux auth state, and redirects to `/login`.

---

## 1. Auth Service (`auth-service` - Port 8081)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Login.jsx` | `authService.login()` | `POST` | `/api/auth/login` | `AuthController.login()` | Public |
| `Register.jsx` | `authService.register()` | `POST` | `/api/auth/register` | `AuthController.register()` | Public |
| Auth Check / Refresh | `authService.getMe()` | `GET` | `/api/auth/me` | `AuthController.getMe()` | Bearer |
| `Settings.jsx` | `authService.changePassword()` | `POST` | `/api/auth/change-password` | `AuthController.changePassword()` | Bearer |
| `ForgotPassword.jsx` | `authService.forgotPassword()` | `POST` | `/api/auth/forgot-password` | `AuthController.forgotPassword()` | Public |
| `ResetPassword.jsx` | `authService.resetPassword()` | `POST` | `/api/auth/reset-password` | `AuthController.resetPassword()` | Public |

- **Forgot Password Request**: `{"email": "alex.rivera@visionpath.edu"}`
- **Reset Password Request**: `{"token": "uuid-token-string", "newPassword": "newPassword123"}`

---

## 2. Student Profile Service (`student-service` - Port 8082)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `MyProfile.jsx` | `studentService.getProfile()` | `GET` | `/api/students/profile` | `StudentController.getProfile()` | Bearer |
| `EditProfile.jsx` | `studentService.updateProfile()` | `PUT` | `/api/students/profile` | `StudentController.updateProfile()` | Bearer |
| `Skills.jsx` | `studentService.getSkills()` | `GET` | `/api/students/skills` | `StudentController.getSkills()` | Bearer |
| `Skills.jsx` | `studentService.addSkill()` | `POST` | `/api/students/skills` | `StudentController.addSkill()` | Bearer |
| `Skills.jsx` | `studentService.deleteSkill()` | `DELETE` | `/api/students/skills/{id}` | `StudentController.deleteSkill()` | Bearer |

---

## 3. Education Service (`education-service` - Port 8084)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Education.jsx` | `educationService.getAllColleges()` | `GET` | `/api/education/colleges` | `EducationController.getAllColleges()` | Bearer |
| `Education.jsx` | `educationService.createCollege()` | `POST` | `/api/education/colleges` | `EducationController.createCollege()` | Bearer |
| `Courses.jsx` | `educationService.getAllCourses()` | `GET` | `/api/education/courses` | `EducationController.getAllCourses()` | Bearer |
| `Courses.jsx` | `educationService.createCourse()` | `POST` | `/api/education/courses` | `EducationController.createCourse()` | Bearer |

---

## 4. Jobs Service (`jobs-service` - Port 8085)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `JobPortal.jsx` | `jobsService.getAllJobs()` | `GET` | `/api/jobs` | `JobController.getAllJobs()` | Bearer |
| `JobPortal.jsx` | `jobsService.applyForJob()` | `POST` | `/api/jobs/{id}/apply` | `JobController.applyForJob()` | Bearer |
| `JobPortal.jsx` | `jobsService.saveJob()` | `POST` | `/api/jobs/{id}/save` | `JobController.saveJob()` | Bearer |
| `JobPortal.jsx` | `jobsService.getApplications()`| `GET` | `/api/jobs/applications` | `JobController.getApplications()` | Bearer |

---

## 5. Career Service (`career-service` - Port 8083)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CareerRecommendation.jsx` | `careerService.getRecommendations()` | `GET` | `/api/careers/recommendations/{studentId}` | `CareerController.getRecommendations()` | Bearer |
| `CareerRecommendation.jsx` | `careerService.getAllCareers()` | `GET` | `/api/careers` | `CareerController.getAllCareers()` | Bearer |

---

## 6. Assessment Service (`assessment-service` - Port 8086)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CareerAssessment.jsx` | `assessmentService.getAllAssessments()` | `GET` | `/api/assessments` | `AssessmentController.getAllAssessments()` | Bearer |
| `CareerAssessment.jsx` | `assessmentService.submitAssessment()` | `POST` | `/api/assessments/{id}/submit` | `AssessmentController.submitAssessment()` | Bearer |
| `AssessmentHistory.jsx` | `assessmentService.getResults()` | `GET` | `/api/assessments/results` | `AssessmentController.getResults()` | Bearer |

---

## 7. AI Mentor Service (`ai-mentor-service` - Port 8087)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AICareerAssistant.jsx` | `aiMentorService.ask()` | `POST` | `/api/ai/ask` | `AiMentorController.ask()` | Bearer |

- **Request**: `{"prompt": "How do I transition to AI engineering?", "context": "Student Career Assistant"}`
- **Backend AI Provider**: Directly executes real HTTP POST to OpenAI API (`https://api.openai.com/v1/chat/completions`) using backend `OPENAI_API_KEY`.

---

## 8. Study Plan Service (`study-plan-service` - Port 8088)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CareerRoadmap.jsx` | `studyPlanService.getPlansByUser()` | `GET` | `/api/study-plans` | `StudyPlanController.getPlansByUser()` | Bearer |
| `CareerRoadmap.jsx` | `studyPlanService.updateTask()` | `PUT` | `/api/study-plans/tasks/{taskId}` | `StudyPlanController.updateTask()` | Bearer |

---

## 9. Progress Service (`progress-service` - Port 8089)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Dashboard.jsx` | `progressService.getProgress()` | `GET` | `/api/progress` | `ProgressController.getProgress()` | Bearer |
| `CareerAssessment.jsx` | `progressService.incrementAssessment()` | `POST` | `/api/progress/increment-assessment` | `ProgressController.incrementAssessment()` | Bearer |

---

## 10. Counselor Service (`counselor-service` - Port 8090)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CounselorBooking.jsx` | `counselorService.getAllCounselors()` | `GET` | `/api/counselors` | `CounselorController.getAllCounselors()` | Bearer |
| `CounselorBooking.jsx` | `counselorService.bookAppointment()` | `POST` | `/api/counselors/appointments` | `CounselorController.bookAppointment()` | Bearer |

---

## 11. Notification Service (`notification-service` - Port 8091)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Notifications.jsx` | `notificationService.getUserNotifications()` | `GET` | `/api/notifications` | `NotificationController.getUserNotifications()` | Bearer |
| `Notifications.jsx` | `notificationService.markAsRead()` | `PUT` | `/api/notifications/{id}/read` | `NotificationController.markAsRead()` | Bearer |

---

## 12. Admin Service (`admin-service` - Port 8092)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `admin/Dashboard.jsx` | `adminService.getAnalytics()` | `GET` | `/api/admin/analytics` | `AdminController.getAnalytics()` | Bearer |

---

## 13. Resume Analyzer Service (`resume-analyzer-service` - Port 8093)

| Frontend Page | Frontend Service | HTTP Method | Gateway Endpoint | Backend Controller | Auth Req |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AIResumeAnalyzer.jsx` | `resumeAnalyzerService.analyzeResume()` | `POST` | `/api/resumes/analyze` | `ResumeAnalyzerController.analyzeResume()` | Bearer |

- **Content-Type**: `multipart/form-data`
- **Request**: `file` (PDF file binary) + `jobDescription` (optional string)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Resume analyzed successfully",
    "data": {
      "atsScore": 88,
      "atsFeedback": "Strong technical alignment...",
      "strengths": ["Clear section headings"],
      "weaknesses": ["Lack of quantified metric achievements"],
      "missingKeywords": ["Docker", "Kubernetes"],
      "missingSkills": ["Cloud Architecture"],
      "formattingIssues": ["Single column format parsed cleanly"],
      "recommendations": ["Add metric outcomes to bullet points"]
    }
  }
  ```
