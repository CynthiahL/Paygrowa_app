import React from 'react';

const SimpleIconSurveyOption = ({ icon, label, value, selectedValue, onChange }) => {
  const isSelected = selectedValue === value;

  return (
    <label className="group cursor-pointer block w-full">
      <input 
        type="radio" 
        name="spending_category" 
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="hidden peer" 
      />
      <div className={`flex items-center p-md bg-white rounded-xl transition-all active:scale-[0.98] ${
        isSelected 
          ? 'border-2 border-primary-container shadow-sm' 
          : 'border border-[#E2E8F0] hover:bg-slate-50'
      }`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-md transition-colors ${
          isSelected 
            ? 'bg-primary-fixed text-primary-container' 
            : 'bg-surface-container text-primary-container group-hover:bg-primary-fixed'
        }`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        
        <div className="flex-grow text-left">
          <span className="font-h3 text-h3 text-on-surface">{label}</span>
        </div>
        
        <span 
          className={`material-symbols-outlined transition-colors ${
            isSelected ? 'text-primary-container' : 'text-outline'
          }`}
          style={isSelected ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {isSelected ? 'check_circle' : 'radio_button_unchecked'}
        </span>
      </div>
    </label>
  );
};

export default SimpleIconSurveyOption;