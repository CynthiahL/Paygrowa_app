import React from 'react';
import { useNavigate } from 'react-router-dom';

const WealthInsightsHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 fixed top-0 w-full z-50 h-16 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="active:opacity-70 transition-opacity text-[#1A365D] dark:text-blue-400 p-1"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-['Inter'] font-semibold text-lg text-[#1A365D] dark:text-white">
          WealthInsights
        </span>
      </div>
      <div className="flex items-center">
        <span 
          className="material-symbols-outlined text-[#1A365D] dark:text-blue-400" 
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          shield
        </span>
      </div>
    </header>
  );
};

export default WealthInsightsHeader;