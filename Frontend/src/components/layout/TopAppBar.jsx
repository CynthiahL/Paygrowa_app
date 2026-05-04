import React from 'react';

const TopAppBar = ({ title = "Profile", avatarUrl, onBack }) => {
  return (
    <header className="bg-white dark:bg-slate-950 text-blue-900 dark:text-blue-400 font-inter antialiased fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-4 h-16">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="material-symbols-outlined active:opacity-80 transition-opacity duration-150 p-2" 
          aria-label="Go back"
        >
          arrow_back
        </button>
        <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">{title}</h1>
      </div>
      
      {avatarUrl && (
        <div className="h-10 w-10 rounded-full overflow-hidden border border-surface-variant">
          <img 
            alt="User Avatar" 
            className="h-full w-full object-cover" 
            src={avatarUrl} 
          />
        </div>
      )}
    </header>
  );
};

export default TopAppBar;