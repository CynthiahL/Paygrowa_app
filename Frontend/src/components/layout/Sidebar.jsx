import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutContext } from './AppLayout'; // Import our context

const SidebarItem = ({ icon, label, to, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  const baseClasses = "flex items-center rounded-xl transition-all duration-200 font-inter font-medium overflow-hidden";
  const activeClasses = "bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-bold";
  const inactiveClasses = "text-slate-500 hover:bg-surface hover:text-blue-800";
  
  // Adjust padding and alignment based on state
  const paddingClasses = isCollapsed ? "justify-center p-3 mx-auto w-12" : "gap-3 px-4 py-3 w-full";

  return (
    <Link to={to} className={`${baseClasses} ${paddingClasses} ${isActive ? activeClasses : inactiveClasses}`} title={isCollapsed ? label : ""}>
      <span className="material-symbols-outlined flex-shrink-0" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
        {icon}
      </span>
      {/* Hide text smoothly */}
      <span className={`text-sm whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
        {label}
      </span>
    </Link>
  );
};

const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useContext(LayoutContext);

  return (
    <aside className={`hidden md:flex flex-col h-screen bg-white border-r border-outline-variant fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-[80px]' : 'w-64'
    }`}>
      
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-outline-variant text-outline rounded-full p-1 z-50 hover:text-primary hover:border-primary transition-colors shadow-sm flex items-center justify-center"
      >
        <span className="material-symbols-outlined text-[18px]">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      {/* Logo */}
      <div className={`h-20 flex items-center border-b border-outline-variant transition-all duration-300 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
        <span className={`material-symbols-outlined text-blue-900 text-2xl flex-shrink-0 ${isCollapsed ? '' : 'mr-2'}`} style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
        <h1 className={`text-2xl font-bold text-blue-900 font-inter tracking-tight transition-all duration-300 overflow-hidden whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0 hidden' : 'opacity-100'}`}>
          Pay<span className="text-secondary">Growa</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-6 space-y-2 flex flex-col ${isCollapsed ? 'px-2 items-center' : 'px-4'}`}>
        <SidebarItem to="/dashboard" icon="home" label="Home" isCollapsed={isCollapsed} />
        <SidebarItem to="/tasks" icon="task" label="Tasks" isCollapsed={isCollapsed} />
        <SidebarItem to="/wallet" icon="wallet" label="Wallet" isCollapsed={isCollapsed} />
        <SidebarItem to="/savings" icon="savings" label="Savings" isCollapsed={isCollapsed} />
        <SidebarItem to="/profile" icon="person" label="Profile" isCollapsed={isCollapsed} />
      </nav>

      {/* Desktop Widget: Wallet Balance */}
      <div className={`p-4 border-t border-outline-variant transition-all duration-300 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="bg-surface-container rounded-xl p-4 flex flex-col items-center">
          <span className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Wallet Balance</span>
          <span className="text-xl font-bold text-primary">₦10,000.00</span>
        </div>
      </div>

      {/* Collapsed view wallet icon (optional) */}
      {isCollapsed && (
        <div className="p-4 border-t border-outline-variant flex justify-center">
           <span className="material-symbols-outlined text-primary" title="Balance: ₦10,000.00">account_balance_wallet</span>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;