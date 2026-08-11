import React, { useState } from 'react';
import { GraduationCap, Calendar, Plus, Award, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

export const Education = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: 'B.S. in Computer Science & Artificial Intelligence',
      institution: 'Stanford University',
      duration: '2022 - 2026 (Expected)',
      gpa: '3.92 / 4.0',
      description: 'Coursework in Data Structures, Machine Learning, Operating Systems, and Modern Frontend Architecture.'
    },
    {
      id: 2,
      degree: 'High School Honors Diploma',
      institution: 'Palo Alto Science Academy',
      duration: '2018 - 2022',
      gpa: '4.0',
      description: 'AP Computer Science A (5/5), AP Calculus BC (5/5).'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [duration, setDuration] = useState('');
  const [gpa, setGpa] = useState('');

  const handleAddEducation = (e) => {
    e.preventDefault();
    setEducations([
      ...educations,
      { id: Date.now(), degree, institution, duration, gpa, description: 'Newly added academic record.' }
    ]);
    toast.success('Education record added successfully!');
    setIsModalOpen(false);
    setDegree('');
    setInstitution('');
    setDuration('');
    setGpa('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Education & Credentials</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Manage your degrees, academic achievements, and university transcript records
          </p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {educations.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{edu.institution}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-1">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {edu.duration}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">GPA: {edu.gpa}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{edu.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Educational Degree">
        <form onSubmit={handleAddEducation} className="space-y-4">
          <Input label="Degree Title" value={degree} onChange={(e) => setDegree(e.target.value)} required placeholder="e.g. B.S. Software Engineering" />
          <Input label="Institution" value={institution} onChange={(e) => setInstitution(e.target.value)} required placeholder="e.g. MIT" />
          <Input label="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required placeholder="e.g. 2022 - 2026" />
          <Input label="GPA (Optional)" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="e.g. 3.9" />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Add Degree Record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Education;
