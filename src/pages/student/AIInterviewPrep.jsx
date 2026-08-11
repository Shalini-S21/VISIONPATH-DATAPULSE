import React, { useState } from 'react';
import { Video, Mic, Sparkles, CheckCircle2, Award, Play } from 'lucide-react';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const AIInterviewPrep = () => {
  const [activeSession, setActiveSession] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const questions = [
    'How do React 19 Server Components optimize initial page load performance?',
    'Describe your process for designing a scalable micro-frontend architecture.',
    'Explain how vector embeddings work in RAG AI pipelines.'
  ];

  const handleStart = () => {
    setActiveSession(true);
    toast.success('Live AI Interview session started!');
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setActiveSession(false);
      toast.success('Interview Session Completed! Communication Score: 94/100.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Video className="w-6 h-6 text-emerald-600" />
          AI Mock Interview Simulator
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Practice interactive technical & behavioral interview scenarios with live feedback
        </p>
      </div>

      {!activeSession ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-center space-y-6 shadow-sm max-w-2xl mx-auto">
          <div className="p-4 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit mx-auto">
            <Mic className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Start Technical Interview Practice</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Simulate a 3-question FAANG engineering interview with instant voice & answer evaluation.
            </p>
          </div>
          <Button variant="primary" size="lg" icon={Play} onClick={handleStart}>
            Begin Mock Interview Session
          </Button>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-emerald-400">
            <span>Live Session in Progress</span>
            <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h3 className="text-lg font-bold text-white">{questions[currentQuestionIdx]}</h3>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-center space-y-3">
            <Mic className="w-8 h-8 text-emerald-400 mx-auto animate-pulse" />
            <p className="text-xs text-emerald-200">Listening to candidate answer... (Speak into microphone)</p>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" onClick={handleNextQuestion}>
              Submit & Next Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterviewPrep;
