import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User, Star, Award, DollarSign, Building } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <img src={user?.avatar} alt={user?.name} className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-500 shadow-md" />
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">{user?.name}</h1>
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{user?.title}</p>
          <p className="text-xs text-gray-500">{user?.institution}</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">Specialties & Bio</h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{user?.bio}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {user?.specialties?.map((s, idx) => (
            <Badge key={idx} variant="primary">{s}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
