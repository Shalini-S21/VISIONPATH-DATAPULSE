import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bot, Send, User, Sparkles, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';
import { addAiMessage } from '../../redux/slices/studentSlice';

export const AICareerAssistant = () => {
  const dispatch = useDispatch();
  const { aiChatHistory } = useSelector((state) => state.student);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputText, time: 'Just now' };
    dispatch(addAiMessage(userMsg));
    const prompt = inputText;
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = `Great question regarding "${prompt}". Based on VisionPath hiring analytics, focusing on modern React 19 architecture, state management (Redux Toolkit), and system design gives candidates a 74% higher interview callback rate.`;
      
      if (prompt.toLowerCase().includes('salary')) {
        replyText = `Senior Full Stack AI Engineers in top US tech hubs earn an average base salary of $165,000 - $220,000 with additional equity.`;
      }
      
      dispatch(addAiMessage({ id: Date.now() + 1, sender: 'ai', text: replyText, time: 'Just now' }));
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-600 text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              VisionPath AI Career Advisor
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
            <p className="text-xs text-gray-500">Real-time career guidance & technical interview insights</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {aiChatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`p-2 rounded-xl text-white flex-shrink-0 ${
                msg.sender === 'user' ? 'bg-emerald-600' : 'bg-slate-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
            </div>
            <div
              className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/60 dark:border-slate-700'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-400 italic">
            <Bot className="w-4 h-4 text-emerald-500 animate-spin" /> VisionPath AI is generating response...
          </div>
        )}
      </div>

      {/* Prompt Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-slate-800 flex gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask VisionPath AI (e.g. What skills are needed for Senior Frontend Architect?)..."
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
        />
        <Button type="submit" variant="primary" size="md" icon={Send}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default AICareerAssistant;
