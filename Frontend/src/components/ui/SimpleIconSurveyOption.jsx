import React from 'react';

const SimpleIconSurveyOption = ({ icon, label, value, selectedValue, onChange, activeStyle = "light" }) => {
  const isSelected = selectedValue === value;

  // Determine the color of the icon block when selected
  const activeIconColors = activeStyle === "solid" 
    ? "bg-primary-container text-white" 
    : "bg-primary-fixed text-primary-container";

  return (
    <label className="group cursor-pointer block w-full">
      <input 
        type="radio" 
        name="survey_category" 
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="hidden peer" 
      />
      <div className={`flex items-center p-md bg-white rounded-xl transition-all active:scale-[0.98] ${
        isSelected 
          ? 'border-2 border-primary-container shadow-sm bg-surface-container-low' 
          : 'border border-[#E2E8F0] hover:bg-slate-50 hover:border-primary-container'
      }`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-md transition-colors ${
          isSelected 
            ? activeIconColors
            : 'bg-surface-container text-primary-container group-hover:bg-primary-fixed'
        }`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        
        <div className="flex-grow text-left">
          <span className={`font-body-md text-body-md ${isSelected ? 'text-primary font-bold' : 'text-on-surface'}`}>
            {label}
          </span>
        </div>
        
        {/* Checkmark or empty circle */}
        {isSelected ? (
           <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center">
             <span className="material-symbols-outlined text-white text-[18px]">check</span>
           </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-outline flex items-center justify-center"></div>
        )}
      </div>
    </label>
  );
};

export default SimpleIconSurveyOption;