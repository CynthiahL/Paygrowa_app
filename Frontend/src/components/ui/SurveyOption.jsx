import React from 'react';

const SurveyOption = ({ label, value, selectedValue, onChange }) => {
  const isSelected = selectedValue === value;

  return (
    <label 
      className={`relative flex items-center p-md border rounded-xl cursor-pointer transition-all duration-200 group ${
        isSelected 
          ? 'bg-secondary-container/10 border-secondary' 
          : 'bg-white border-[#E2E8F0] hover:bg-surface-container-low'
      }`}
    >
      <input 
        type="radio" 
        name="survey_option" 
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only" 
      />
      
      <div className="flex-1">
        <span className="font-body-lg font-medium text-on-surface">{label}</span>
      </div>
      
      {/* Custom Radio Circle */}
      <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center transition-colors ${
        isSelected ? 'border-secondary bg-secondary' : 'border-outline-variant'
      }`}>
        <div className={`w-2.5 h-2.5 bg-white rounded-full transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    </label>
  );
};

export default SurveyOption;