import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon, label, to }) => {
  const location = useLocation();
  // Check if current URL matches the link
  const isActive = location.pathname.includes(to);

  const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-inter font-medium";
  const activeClasses = "bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold";
  const inactiveClasses = "text-slate-500 hover:bg-surface hover:text-blue-800";

  return (
    <Link to={to} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    // Hidden on mobile, visible as a fixed 64-width column on desktop (md+)
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-outline-variant fixed left-0 top-0 z-40">
      
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-outline-variant">
        <span className="material-symbols-outlined text-blue-900 text-2xl mr-2">shield</span>
        <h1 className="text-2xl font-bold text-blue-900 font-inter tracking-tight">
          Pay<span className="text-secondary">Growa</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <SidebarItem to="/dashboard" icon="home" label="Home" />
        <SidebarItem to="/tasks" icon="task" label="Tasks" />
        <SidebarItem to="/wallet" icon="wallet" label="Wallet" />
        <SidebarItem to="/savings" icon="savings" label="Savings" />
        <SidebarItem to="/profile" icon="person" label="Profile" />
      </nav>

      {/* Desktop Widget: Wallet Balance */}
      <div className="p-4 border-t border-outline-variant">
        <div className="bg-surface-container rounded-xl p-4 flex flex-col items-center">
          <span className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Wallet Balance</span>
          <span className="text-xl font-bold text-primary">₦10,000.00</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;