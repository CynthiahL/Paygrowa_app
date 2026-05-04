import React from 'react';

const DetailTopBar = ({ onBack, onMenuClick }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-[#E2E8F0] dark:border-gray-800 flex items-center justify-between px-4 h-14 w-full sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="active:opacity-70 transition-all duration-200 text-[#1A365D] dark:text-blue-400 p-1"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-h1 font-black text-xl tracking-tight text-[#1A365D] dark:text-blue-400">
          Pay<span className="text-secondary">Growa</span>
        </h1>
      </div>
      <button 
        onClick={onMenuClick}
        className="flex items-center p-1 active:opacity-70 transition-all"
        aria-label="More options"
      >
        <span className="material-symbols-outlined text-outline">more_vert</span>
      </button>
    </header>
  );
};

export default DetailTopBar;