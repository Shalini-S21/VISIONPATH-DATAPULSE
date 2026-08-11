import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Video, Mic, MicOff, VideoOff, PhoneOff, Users, MessageSquare, Settings, Monitor, ScreenShare } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export const VideoSessions = () => {
  const { sessions } = useSelector((s) => s.counselor);
  const [activeSession, setActiveSession] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  if (activeSession) {
    return (
      <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col">
        {/* Video area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Student"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80" />
          </div>

          {/* Self view */}
          <div className="absolute top-4 right-4 w-32 h-20 rounded-xl overflow-hidden border-2 border-emerald-500 bg-slate-800">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="You" className="w-full h-full object-cover" />
            <span className="absolute bottom-1 left-1 text-[10px] text-white bg-black/50 px-1 rounded">You</span>
          </div>

          {/* Session info overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge variant="danger" dot>LIVE</Badge>
            <span className="text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded-lg">
              {activeSession.studentName} · {activeSession.topic}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-900 border-t border-slate-800 px-6 py-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-red-500' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={() => setIsSharing(!isSharing)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isSharing ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            <ScreenShare className="w-5 h-5 text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setActiveSession(null)}
            className="w-14 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg transition-colors"
          >
            <PhoneOff className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Video Sessions</h1>
        <p className="text-sm text-slate-500 mt-0.5">Upcoming and past counseling video sessions</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sessions.map((sess) => (
          <div key={sess.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                <Video className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{sess.topic}</p>
                <p className="text-xs text-emerald-600 font-semibold">{sess.studentName}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{sess.date} at {sess.time} · {sess.duration}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant={sess.status === 'Upcoming' ? 'info' : 'success'}>{sess.status}</Badge>
              <Button
                variant="primary"
                size="sm"
                icon={Video}
                onClick={() => setActiveSession(sess)}
              >
                Join Session
              </Button>
            </div>
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <Video className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No video sessions scheduled</p>
        </div>
      )}
    </div>
  );
};

export default VideoSessions;
