import React from 'react';

const SurveyHeader = ({ onBack }) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-[#E2E8F0] dark:border-gray-800 flex items-center justify-between px-4 h-14 w-full sticky top-0 z-50">
      <button 
        onClick={onBack}
        className="flex items-center gap-sm transition-all duration-200 active:opacity-70 p-1"
        aria-label="Go back"
      >
        <span className="material-symbols-outlined text-[#1A365D] dark:text-blue-400">arrow_back</span>
      </button>
      
      <div className="font-['Inter'] font-black text-xl tracking-tight text-[#1A365D] dark:text-blue-400">
        Pay<span className="text-secondary">Growa</span>
      </div>
      
      {/* Invisible spacer to perfectly center the logo using flex-between */}
      <div className="w-8"></div>
    </header>
  );
};

export default SurveyHeader;