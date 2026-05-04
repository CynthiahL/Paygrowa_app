import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({id, category, title, status, price, duration }) => {
  // Configuration maps to dynamically assign styles based on the task data
  const navigate = useNavigate()
  const categoryConfig = {
    'Survey': 'text-on-tertiary-container bg-tertiary-fixed',
    'App Test': 'text-on-primary-fixed-variant bg-primary-fixed',
    'Data Entry': 'text-on-secondary-fixed-variant bg-secondary-fixed',
  };

  const statusDotConfig = {
    'Available': 'bg-secondary',
    'Pending': 'bg-primary-fixed-dim',
    'Done': 'bg-secondary',
  };

  // Fallbacks just in case the backend sends a new category we haven't styled yet
  const categoryStyle = categoryConfig[category] || 'text-on-surface-variant bg-surface-variant';
  const dotStyle = statusDotConfig[status] || 'bg-outline';
  
  // The design slightly dims pending tasks
  const opacityClass = status === 'Pending' ? 'opacity-75' : '';

  return (
    <div
     onClick={() => navigate(`/task/${id}`)}
     className={`bg-white border border-outline-variant rounded-xl p-4 flex justify-between items-center hover:border-primary transition-colors cursor-pointer ${opacityClass}`}>
      <div className="space-y-1">
        <span className={`font-label-sm text-label-sm px-2 py-0.5 rounded ${categoryStyle}`}>
          {category}
        </span>
        <h4 className="font-body-md text-body-md font-semibold text-primary">
          {title}
        </h4>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`}></span>
          <p className="font-label-sm text-label-sm text-on-surface-variant">{status}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-body-md text-body-md font-bold text-primary">{price}</p>
        <p className="font-label-sm text-label-sm text-on-surface-variant">{duration}</p>
      </div>
    </div>
  );
};

export default TaskCard;