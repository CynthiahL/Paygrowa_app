import React from 'react';

const DetailedSurveyOption = ({ icon, title, subtitle, value, selectedValue, onChange }) => {
  const isSelected = selectedValue === value;

  return (
    <label className={`group cursor-pointer relative flex items-center justify-between p-6 bg-white border rounded-xl transition-all active:scale-[0.98] ${
      isSelected ? 'border-primary-container bg-primary-fixed/5' : 'border-[#E2E8F0] hover:border-primary-container'
    }`}>
      <input 
        type="radio" 
        name="survey_detailed_option" 
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="hidden peer" 
      />
      
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
          isSelected 
            ? 'bg-primary-container text-white' 
            : 'bg-surface-container text-primary-container group-hover:bg-primary-container group-hover:text-white'
        }`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="text-left">
          <span className="block font-h3 text-primary">{title}</span>
          <span className="block font-body-sm text-on-surface-variant">{subtitle}</span>
        </div>
      </div>

      {/* Radio Circle */}
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
        isSelected ? 'border-primary-container' : 'border-outline-variant group-hover:border-primary-container'
      }`}>
        <div className={`w-3 h-3 rounded-full bg-primary-container transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    </label>
  );
};

export default DetailedSurveyOption;