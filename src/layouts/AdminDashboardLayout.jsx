import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/layout/LeftSidebar';
import TopNavbar from '../components/layout/TopNavbar';
import Breadcrumb from '../components/common/Breadcrumb';
import Footer from '../components/layout/Footer';

export const AdminDashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 flex transition-colors">
      <LeftSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <TopNavbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Breadcrumb />
          <Outlet context={{ searchValue }} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
