import React from 'react';

const SimpleInfoCard = ({ title, text, icon = "info", iconColorClass = "text-primary-container" }) => {
  return (
    <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex gap-3 items-start">
      <span 
        className={`material-symbols-outlined flex-shrink-0 mt-0.5 ${iconColorClass}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        {title && <p className="font-label-md text-on-surface">{title}</p>}
        <p className="font-body-sm text-on-surface-variant">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SimpleInfoCard;