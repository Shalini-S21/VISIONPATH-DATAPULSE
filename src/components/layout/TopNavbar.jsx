import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Compass } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import NotificationDropdown from '../common/NotificationDropdown';
import ThemeToggle from '../common/ThemeToggle';
import ProfileDropdown from '../common/ProfileDropdown';

export const TopNavbar = ({ onToggleMobileSidebar, searchValue, setSearchValue }) => {
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="p-1.5 rounded-xl bg-emerald-600 text-white shadow-emerald-500/20 shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
              Vision<span className="text-emerald-600">Path</span>
            </span>
          </Link>

          {/* Search Bar on Desktop */}
          <div className="hidden md:block w-72 lg:w-96">
            <SearchBar value={searchValue} onChange={setSearchValue} />
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <NotificationDropdown />
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-800 mx-1" />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
