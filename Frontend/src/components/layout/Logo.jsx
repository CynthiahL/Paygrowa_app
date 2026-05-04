import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-xs">
      <span 
        className="material-symbols-outlined text-blue-900" 
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        shield
      </span>
      <span className="text-lg font-bold tracking-tight text-blue-900">
        PayGrowa
      </span>
    </div>
  );
};

export default Logo;