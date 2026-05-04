import React from 'react';

const RadioToggle = ({ label, name, options, selectedValue, onChange }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="font-label-md text-label-md text-on-surface-variant ml-1">
        {label}
      </label>
      <div className="flex gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex-1 relative cursor-pointer group">
            <input 
              type="radio" 
              name={name} 
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only peer" 
            />
            <div className="h-12 flex items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest peer-checked:border-primary peer-checked:bg-surface-container-low transition-all">
              <span className="font-body-md text-body-md peer-checked:text-primary">
                {option.label}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioToggle;