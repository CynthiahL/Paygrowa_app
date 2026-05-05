import React from 'react';

const StatCard = ({ title, value, icon, variant = "default", trend, trendIcon }) => {
  const isSuccess = variant === "success";

  return (
    <div className={`p-md rounded-xl flex flex-col justify-between border ${
      isSuccess 
        ? "bg-secondary-container/30 border-secondary/20" 
        : "bg-surface-container border-[#E2E8F0]"
    }`}>
      <span className={`material-symbols-outlined mb-sm ${isSuccess ? 'text-secondary' : 'text-primary'}`}>
        {icon}
      </span>
      <div>
        <p className={`font-label-sm text-label-sm ${isSuccess ? 'text-on-secondary-container' : 'text-outline'}`}>
          {title}
        </p>
        <div className="flex items-center gap-xs">
          <p className={`font-h3 text-h3 ${isSuccess ? 'text-secondary' : 'text-primary'}`}>
            {value}
          </p>
          {trendIcon && (
            <span className={`material-symbols-outlined text-[16px] ${isSuccess ? 'text-secondary' : 'text-primary'}`}>
              {trendIcon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;