import React from 'react';

const IconSurveyOption = ({ icon, label, value, selectedValue, onChange }) => {
  const isSelected = selectedValue === value;

  return (
    <label className="group cursor-pointer block w-full">
      <input 
        type="radio" 
        name="spending" 
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="hidden peer" 
      />
      <div className={`flex items-center justify-between p-md border rounded-xl transition-all duration-200 ${
        isSelected 
          ? 'bg-primary-fixed border-primary-container' 
          : 'bg-surface-container-lowest border-outline-variant hover:bg-surface-container'
      }`}>
        <div className="flex items-center gap-md">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isSelected 
              ? 'bg-primary-fixed text-primary-container' 
              : 'bg-surface-container-high text-primary-container group-hover:bg-primary-fixed'
          }`}>
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <span className="font-body-lg text-body-lg text-on-surface">{label}</span>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'border-primary-container' : 'border-outline-variant'
        }`}>
          <div className={`w-3 h-3 bg-primary-container rounded-full transition-opacity ${
            isSelected ? 'opacity-100' : 'opacity-0'
          }`}></div>
        </div>
      </div>
    </label>
  );
};

export default IconSurveyOption;