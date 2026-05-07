import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
  
  // Only allow clicking if the task is actually available
  const isAvailable = task.status === 'Available';

  const handleClick = () => {
    if (isAvailable) {
      navigate(`/task/${task.id}`);
    }
  };

  // Status badge styling logic
  const getStatusStyles = (status) => {
    switch(status) {
      case 'Available': return 'bg-primary-fixed text-primary-container';
      case 'Pending': return 'bg-surface-container-high text-on-surface-variant';
      case 'Done': return 'bg-secondary-container text-on-secondary-container';
      default: return 'bg-surface-container text-outline';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`p-md border rounded-xl transition-all duration-200 ${
        isAvailable 
          ? 'bg-white border-[#E2E8F0] hover:border-primary-container cursor-pointer active:scale-[0.98] shadow-sm' 
          : 'bg-surface-container-lowest border-outline-variant/30 cursor-not-allowed opacity-80'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className={`px-2 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider ${getStatusStyles(task.status)}`}>
            {task.category}
          </span>
          <h3 className="font-h3 text-on-surface leading-tight mt-1">{task.title}</h3>
          
          <div className="flex items-center gap-xs mt-2">
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-secondary' : 'bg-outline-variant'}`}></span>
            <span className="font-label-sm text-outline">{task.status}</span>
          </div>
        </div>
        
        <div className="text-right">
          <p className={`font-h3 ${isAvailable ? 'text-primary' : 'text-outline'}`}>{task.reward}</p>
          <p className="font-body-sm text-outline">{task.estimatedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;