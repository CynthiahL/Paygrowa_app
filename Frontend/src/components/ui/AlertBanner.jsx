import React from 'react';

const AlertBanner = ({ 
  icon = "info", 
  text, 
  containerClass = "bg-tertiary-fixed/30 border-tertiary-fixed", 
  textClass = "text-on-tertiary-fixed-variant" 
}) => {
  return (
    <div className={`flex items-center gap-sm p-md rounded-xl border ${containerClass}`}>
      <span 
        className={`material-symbols-outlined ${textClass}`} 
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <p className={`font-body-sm text-body-sm ${textClass}`}>
        {text}
      </p>
    </div>
  );
};

export default AlertBanner;