import React from 'react';
import { Link } from 'react-router-dom'; 

const NavItem = ({ icon, label, isActive, to }) => {
  const baseClasses = "flex flex-col items-center justify-center py-1 px-3 active:scale-95 transition-transform duration-150 rounded-lg";
  const activeClasses = "text-blue-700 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20";
  const inactiveClasses = "text-slate-500 dark:text-slate-500 hover:text-blue-800 dark:hover:text-blue-300";

  return (
    <Link to={to} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
        {icon}
      </span>
      <span className="text-[11px] font-medium font-inter">{label}</span>
    </Link>
  );
};

const BottomNavBar = ({ activeTab = "Home" }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <NavItem to="/dashboard" icon="home" label="Home" isActive={activeTab === "Home"} />
      <NavItem to="/tasks" icon="task" label="Tasks" isActive={activeTab === "Tasks"} />
      <NavItem to="/wallet" icon="wallet" label="Wallet" isActive={activeTab === "Wallet"} />
      <NavItem to="/savings" icon="savings" label="Savings" isActive={activeTab === "Savings"} />
      <NavItem to="/profile" icon="person" label="Profile" isActive={activeTab === "Profile"} />
    </nav>
  );
};

export default BottomNavBar;