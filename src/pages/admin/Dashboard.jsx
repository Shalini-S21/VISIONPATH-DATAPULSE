import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import ComingSoon from '../shared/ComingSoon';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await adminService.getAnalytics();
        setAnalytics(res.data || res);
      } catch (err) {
        console.warn('Backend getAnalytics notice:', err?.message || err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <ComingSoon
      title="Admin Dashboard"
      description="Manage platform activity, system health, and governance operations from a central view."
      badge="Admin control"
    />
  );
};

export default Dashboard;
