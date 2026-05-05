import React from 'react';

const TimelineItem = ({ status, title, description, icon, isLast = false }) => {
  // Configuration maps for dynamic styling based on the status
  const config = {
    'done': {
      iconBg: 'bg-secondary text-white',
      lineBg: 'bg-secondary',
      badgeBg: 'bg-secondary-container',
      badgeText: 'text-on-secondary-container',
      titleColor: 'text-primary'
    },
    'in-progress': {
      iconBg: 'bg-primary text-white border-4 border-surface-container',
      lineBg: 'bg-surface-container',
      badgeBg: 'bg-surface-container',
      badgeText: 'text-on-surface-variant',
      titleColor: 'text-primary'
    },
    'pending': {
      iconBg: 'bg-surface-container text-outline-variant',
      lineBg: 'bg-transparent',
      badgeBg: 'bg-surface-container-low border border-outline-variant/20',
      badgeText: 'text-outline-variant',
      titleColor: 'text-outline'
    }
  };

  const style = config[status];

  return (
    <div className="flex items-start gap-md">
      <div className="flex flex-col items-center">
        <div className={`rounded-full p-1 flex items-center justify-center z-10 ${style.iconBg}`}>
          <span className="material-symbols-outlined text-[16px]" style={status === 'done' ? { fontVariationSettings: "'FILL' 1" } : {}}>
            {icon}
          </span>
        </div>
        {/* Only draw the line if it's not the last item */}
        {!isLast && <div className={`w-[2px] h-10 mt-1 ${style.lineBg}`}></div>}
      </div>
      
      <div className="flex-grow pb-4">
        <p className={`font-label-md text-label-md ${style.titleColor}`}>{title}</p>
        <p className="font-body-sm text-body-sm text-outline">{description}</p>
      </div>
      
      <div className={`px-sm py-1 rounded-full ${style.badgeBg}`}>
        <span className={`font-label-sm text-[10px] uppercase ${style.badgeText}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default TimelineItem;