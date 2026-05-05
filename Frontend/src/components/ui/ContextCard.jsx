import React from 'react';

const ContextCard = ({ title, description, icon = "lightbulb" }) => {
  return (
    <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant flex gap-md items-start">
      <div className="bg-secondary-container p-xs rounded-lg flex-shrink-0">
        <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      </div>
      <div className="space-y-xs">
        <p className="font-label-md text-on-surface">{title}</p>
        <p className="font-body-sm text-on-surface-variant leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ContextCard;