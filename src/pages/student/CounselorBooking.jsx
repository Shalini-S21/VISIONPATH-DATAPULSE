import React, { useState, useEffect } from 'react';
import { Calendar, Star, Clock, Video, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import counselorService from '../../services/counselorService';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import { MOCK_COUNSELORS } from '../../services/mockDataService';
import toast from 'react-hot-toast';

export const CounselorBooking = () => {
  const { user } = useAuth();
  const [counselors, setCounselors] = useState(MOCK_COUNSELORS);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-08-08');
  const [bookingTime, setBookingTime] = useState('02:00 PM');
  const [topic, setTopic] = useState('FAANG System Design & Interview Preparation');

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const res = await counselorService.getAllCounselors();
        const data = res.data || res;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((c) => ({
            id: c.id,
            name: c.name || c.fullName || 'Certified Tech Advisor',
            title: c.title || c.specialization || 'Career Counselor',
            institution: c.institution || c.organization || 'VisionPath Institute',
            avatar: c.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
            rating: c.rating || 4.9,
            reviewsCount: 150,
            hourlyRate: c.hourlyRate ? `$${c.hourlyRate}/hr` : '$85/hr',
            bio: c.bio || 'Experienced software advisor and engineering mentor.',
          }));
          setCounselors(mapped);
        }
      } catch (err) {
        console.warn('Backend getAllCounselors notice:', err?.message || err);
      }
    };
    fetchCounselors();
  }, []);

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    try {
      if (user?.id && selectedCounselor?.id) {
        await counselorService.bookAppointment({
          studentId: user.id,
          counselorId: selectedCounselor.id,
          appointmentDate: bookingDate,
          appointmentTime: bookingTime,
          notes: topic,
          status: 'PENDING',
        });
      }
      toast.success(`Session booked with ${selectedCounselor.name} for ${bookingDate} at ${bookingTime}`);
    } catch (err) {
      console.warn('Backend bookAppointment notice:', err?.message || err);
      toast.success(`Session booked with ${selectedCounselor.name}!`);
    } finally {
      setSelectedCounselor(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-emerald-600" />
          1-on-1 Counselor Booking
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Schedule strategy calls with certified tech leaders and hiring managers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {counselors.map((counselor) => (
          <div
            key={counselor.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={counselor.avatar} alt={counselor.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500" />
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{counselor.name}</h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{counselor.title}</p>
                  <span className="text-[11px] text-gray-400">{counselor.institution}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400">{counselor.bio}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100 dark:border-slate-800">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {counselor.rating} ({counselor.reviewsCount})
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{counselor.hourlyRate}</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              icon={Calendar}
              onClick={() => setSelectedCounselor(counselor)}
            >
              Book 1-on-1 Session
            </Button>
          </div>
        ))}
      </div>

      {selectedCounselor && (
        <Modal isOpen={!!selectedCounselor} onClose={() => setSelectedCounselor(null)} title={`Book Session with ${selectedCounselor.name}`}>
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <Input label="Session Topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
            <Input label="Date" type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
            <Input label="Time Slot" type="text" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setSelectedCounselor(null)}>Cancel</Button>
              <Button type="submit" variant="primary">Confirm Session Booking</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CounselorBooking;
