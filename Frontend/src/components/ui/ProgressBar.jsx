import React from 'react';

const ProgressBar = ({ 
  currentStep, 
  totalSteps, 
  percentage, 
  colorClass = "bg-secondary", 
  textClass = "text-secondary" 
}) => {
  return (
    <div className="mb-xl w-full">
      <div className="flex justify-between items-end mb-sm">
        <span className="font-label-md text-label-md text-on-surface-variant">
          Step {currentStep} of {totalSteps}
        </span>
        <span className={`font-label-md text-label-md font-bold ${textClass}`}>
          {percentage}% Complete
        </span>
      </div>
      <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;