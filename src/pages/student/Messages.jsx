import React, { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import Button from '../../components/ui/Button';

export const Messages = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Sarah Jenkins', text: 'Hi Alex! I reviewed your system design diagram. Great job on the distributed caching layer.', time: '10:14 AM' },
    { id: 2, sender: 'You', text: 'Thank you Dr. Sarah! Should I include Redis Sentinel failover strategy for the next session?', time: '10:18 AM' }
  ]);
  const [text, setText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'You', text, time: 'Just now' }]);
    setText('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
          alt="Counselor"
          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
        />
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Dr. Sarah Jenkins</h2>
          <p className="text-[10px] text-emerald-600 font-semibold">Active Mentor • Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-md p-3.5 rounded-2xl text-xs ${
                m.sender === 'You'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-gray-400 mt-1">{m.time}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-100 dark:border-slate-800 flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message to counselor..."
          className="flex-1 px-4 py-2 text-xs rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
        />
        <Button type="submit" variant="primary" size="md" icon={Send}>Send</Button>
      </form>
    </div>
  );
};

export default Messages;
