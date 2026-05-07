import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import DetailTopBar from '../../components/layout/DetailTopBar';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import { mockTasks } from '../../data/mockTasks'; // 1. IMPORT DATA

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 2. GET ID FROM URL

  // 3. FIND THE SPECIFIC TASK
  const taskData = mockTasks.find(t => t.id === id);

  // Fallback if task isn't found
  if (!taskData) {
    return (
      <AppLayout hideMobileBottomNav={true} mobileHeader={<DetailTopBar onBack={() => navigate(-1)} />}>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <span className="material-symbols-outlined text-error text-[48px] mb-4">error</span>
          <h2 className="font-h2 text-primary">Task Not Found</h2>
          <p className="font-body-md text-on-surface-variant mt-2">This task may have expired or been removed.</p>
          <button onClick={() => navigate('/dashboard')} className="mt-8 text-primary font-label-md underline">Return to Dashboard</button>
        </div>
      </AppLayout>
    );
  }

  const handleStartTask = () => {
    navigate('/survey/1'); 
  };

  return (
    <AppLayout 
      hideMobileBottomNav={true}
      mobileHeader={<DetailTopBar onBack={() => navigate(-1)} onMenuClick={() => console.log('Menu')} />}
    >
      <div className="max-w-2xl mx-auto w-full space-y-6 pb-48">
        
        {/* Dynamic Hero Image (Only show if task has one) */}
        {taskData.heroImage && (
          <div className="w-full h-48 md:h-64 relative bg-surface-container overflow-hidden rounded-xl shadow-sm">
            <img src={taskData.heroImage} alt="Task context" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        )}

        {/* Dynamic Task Info Card */}
        <div className="bg-surface-container-lowest border border-[#E2E8F0] p-lg rounded-xl shadow-sm">
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm text-[10px] uppercase tracking-wider">
                {taskData.category}
              </span>
              {taskData.isVerifiedPartner && (
                <div className="flex items-center gap-xs text-secondary font-label-md">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span>Verified Partner</span>
                </div>
              )}
            </div>

            <h2 className="font-h2 text-primary mt-xs">{taskData.title}</h2>

            <div className="flex flex-wrap gap-md mt-sm">
              <div className="flex items-center gap-xs text-on-secondary-container bg-secondary-container/30 px-3 py-1.5 rounded-lg border border-secondary-container">
                <span className="material-symbols-outlined text-lg">payments</span>
                <span className="font-h3 text-h3">Earn {taskData.reward}</span>
              </div>
              <div className="flex items-center gap-xs text-outline">
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span className="font-body-sm">Est. time: {taskData.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Details */}
        <section className="space-y-lg">
          <div>
            <h3 className="font-h3 text-primary mb-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">description</span>
              Description
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {taskData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {taskData.goodResponseGuide && (
              <div className="bg-tertiary-container/5 border border-on-tertiary-container/20 p-md rounded-xl">
                <h3 className="font-label-md text-on-tertiary-fixed-variant mb-xs flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                  What a good response looks like
                </h3>
                <p className="font-body-sm text-on-surface-variant">
                  {taskData.goodResponseGuide}
                </p>
              </div>
            )}

            {taskData.requirements.length > 0 && (
              <div className="bg-surface-container p-md rounded-xl border border-outline-variant/30">
                <h3 className="font-label-md text-on-surface mb-xs flex items-center gap-xs">
                  <span className="material-symbols-outlined text-sm">list_alt</span>
                  Requirements
                </h3>
                <ul className="space-y-xs">
                  {taskData.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-xs text-body-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px] text-secondary mt-0.5">check_circle</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>

      <FixedBottomActions>
        <button onClick={handleStartTask} className="w-full bg-[#1A365D] text-white py-4 rounded-xl font-h3 active:scale-[0.98] hover:bg-primary transition-all flex items-center justify-center gap-sm shadow-sm">
          Start Task
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </button>
        <button onClick={() => navigate(-1)} className="w-full bg-white border border-[#E2E8F0] text-on-surface py-3 rounded-xl font-body-md hover:bg-gray-50 active:opacity-70 transition-all">
          Back
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default TaskDetailPage;