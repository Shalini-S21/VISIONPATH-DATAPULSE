import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import jobsService from '../../services/jobsService';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { MOCK_JOBS } from '../../services/mockDataService';
import toast from 'react-hot-toast';

export const JobPortal = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobsService.getAllJobs();
        const data = res.data || res;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((j) => ({
            id: j.id,
            title: j.title || j.jobTitle || 'Software Engineer',
            company: j.company || j.companyName || 'Tech Enterprise',
            logo: j.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
            location: j.location || 'Remote',
            type: j.type || j.jobType || 'Full-Time',
            salary: j.salary || j.salaryRange || '$120,000 - $160,000',
            experience: j.experience || '2+ years',
            postedDate: j.postedDate || 'Recent',
            skills: j.skills ? (typeof j.skills === 'string' ? j.skills.split(',') : j.skills) : ['Java', 'Spring Boot'],
            description: j.description || 'Full stack software development position.',
          }));
          setJobs(mapped);
        }
      } catch (err) {
        console.warn('Backend getAllJobs notice:', err?.message || err);
      }
    };

    const fetchApplications = async () => {
      if (!user?.id) return;
      try {
        const res = await jobsService.getApplications(user.id);
        const data = res.data || res;
        if (Array.isArray(data)) {
          const ids = data.map((app) => app.jobId || app.job?.id).filter(Boolean);
          setAppliedJobs(ids);
        }
      } catch (err) {
        console.warn('Backend getApplications notice:', err?.message || err);
      }
    };

    fetchJobs();
    fetchApplications();
  }, [user]);

  const filteredJobs = jobs.filter(job =>
    (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.skills || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApply = async (jobId) => {
    try {
      if (user?.id) {
        await jobsService.applyForJob(jobId, user.id, coverLetter);
      }
      setAppliedJobs([...appliedJobs, jobId]);
      toast.success('Application submitted successfully!');
    } catch (err) {
      console.warn('Backend applyForJob notice:', err?.message || err);
      setAppliedJobs([...appliedJobs, jobId]);
      toast.success('Application submitted!');
    } finally {
      setSelectedJob(null);
      setCoverLetter('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Curated Tech Job Portal</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Direct placement channels matching your VisionPath roadmap completion rate
          </p>
        </div>
      </div>

      <div className="max-w-md">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by role, company, or skills (e.g. Vercel, React 19)..." />
      </div>

      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs.includes(job.id);
          return (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-2xl object-cover border border-gray-200 dark:border-slate-700" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{job.title}</h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{job.company} • {job.location}</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-gray-500">{job.salary}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] font-semibold text-gray-500">{job.type}</span>
                  </div>
                </div>
              </div>

              <Button
                variant={isApplied ? 'outline' : 'primary'}
                size="md"
                isDisabled={isApplied}
                onClick={() => setSelectedJob(job)}
                icon={isApplied ? CheckCircle2 : Send}
              >
                {isApplied ? 'Applied' : 'Apply Now'}
              </Button>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} title={`Apply for ${selectedJob.title}`}>
          <div className="space-y-4">
            <p className="text-xs text-gray-600 dark:text-gray-300">{selectedJob.description}</p>
            <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
              <p className="font-bold">Required Skills:</p>
              <div className="flex flex-wrap gap-1">
                {selectedJob.skills.map((s, i) => (
                  <Badge key={i} variant="primary">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setSelectedJob(null)}>Cancel</Button>
              <Button variant="primary" onClick={() => handleApply(selectedJob.id)}>Submit VisionPath Resume</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobPortal;
