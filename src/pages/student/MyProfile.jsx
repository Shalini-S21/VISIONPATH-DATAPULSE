import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, Mail, Building, MapPin, Edit3, Award, GraduationCap, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Cover Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 to-slate-900 h-48 border border-emerald-900 shadow-sm">
        <div className="absolute inset-0 bg-emerald-500/10 blur-xl" />
      </div>

      <div className="relative -mt-20 px-6 max-w-5xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-28 h-28 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-lg -mt-16 sm:-mt-12"
            />
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">{user?.name}</h1>
              <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{user?.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1">
                <Building className="w-3.5 h-3.5" /> {user?.institution}
              </p>
            </div>
          </div>

          <Link to="/student/edit-profile">
            <Button variant="outline" size="sm" icon={Edit3}>
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* Bio & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Biography & Career Summary</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{user?.bio}</p>
            
            <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider pt-2">Verified Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user?.skills?.map((skill, idx) => (
                <Badge key={idx} variant="primary">{skill}</Badge>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Contact Info</h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Email</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Joined Date</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{user?.createdAt}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px] font-bold uppercase">Account Status</span>
                <Badge variant="success">Active Verified</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
