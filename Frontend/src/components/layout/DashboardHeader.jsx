import React from 'react';

const DashboardHeader = ({ balance = "₦0.00" }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-4 h-14">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-blue-900 dark:text-blue-400">shield</span>
        <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100 font-inter tracking-tight">
          Pay<span className="text-on-tertiary-container">Grow</span>a
        </h1>
      </div>
      <div className="px-3 py-1 bg-surface-container rounded-full text-blue-900 dark:text-blue-400 font-bold text-base font-inter">
        {balance}
      </div>
    </header>
  );
};

export default DashboardHeader;