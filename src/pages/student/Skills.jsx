import React, { useState } from 'react';
import { Award, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

export const Skills = () => {
  const [skills, setSkills] = useState([
    { name: 'React 19 & Redux Toolkit', category: 'Frontend', level: 'Advanced', confidence: 92 },
    { name: 'Node.js & Express API', category: 'Backend', level: 'Intermediate', confidence: 84 },
    { name: 'Tailwind CSS & Glassmorphism UI', category: 'Design', level: 'Expert', confidence: 96 },
    { name: 'Python & LangChain AI RAG', category: 'Artificial Intelligence', level: 'Intermediate', confidence: 78 },
    { name: 'PostgreSQL & Prisma ORM', category: 'Database', level: 'Intermediate', confidence: 82 },
    { name: 'Docker & AWS ECS Deployment', category: 'DevOps', level: 'Beginner', confidence: 64 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [level, setLevel] = useState('Intermediate');

  const handleAddSkill = (e) => {
    e.preventDefault();
    setSkills([
      ...skills,
      { name: skillName, category, level, confidence: 80 }
    ]);
    toast.success(`Skill '${skillName}' added to profile matrix!`);
    setIsModalOpen(false);
    setSkillName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Skill Matrix</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Verified skills validated by VisionPath assessment tests & project submissions
          </p>
        </div>
        <Button variant="primary" size="md" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                {skill.category}
              </span>
              <Badge variant="success">{skill.level}</Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{skill.name}</h3>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-[11px] font-semibold text-gray-500">
                  <span>Assessed Proficiency</span>
                  <span className="text-emerald-600 font-bold">{skill.confidence}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${skill.confidence}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Technical Skill">
        <form onSubmit={handleAddSkill} className="space-y-4">
          <Input label="Skill Name" value={skillName} onChange={(e) => setSkillName(e.target.value)} required placeholder="e.g. GraphQL Caching" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="DevOps">DevOps</option>
              <option value="Database">Database</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Skill</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Skills;
