import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import DetailTopBar from '../../components/layout/DetailTopBar';
import FixedBottomActions from '../../components/layout/FixedBottomActions';

const TaskDetailPage = () => {
  const navigate = useNavigate();

  const handleStartTask = () => {
    // Navigate to the first survey question
    navigate('/survey/1'); 
  };

  const mockTaskData = {
    id: 'tsk_123',
    title: 'Student Spending Habits Survey',
    category: 'High Reward',
    isVerifiedPartner: true,
    reward: '₦1,000',
    estimatedTime: '5–10 minutes',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6OjPdrQMyZY2zCsFChJYQtI94j_qxh_7Rcmrqkc8wqmA7tXRe8udKDfrXB-Hl8M0AfroPr34kqWPksLjbosprQ-cTfTnHcgMGG7RFaKvuoJjsLTn_zf87CDouaR4iarjgpHB08x5iRyk7lUA2k2iYOBqDylRkUY7q6s5tj8UKHBckDsK-KxzZUiSFBscQaIY1dr0rYHw2iq2wLuS5meXPknUlITvLKMxp_e8iIZt-ot0Zm3bVMCS3fxF1Buxm1M4nVxBED7PHI6Y',
    description: 'Answer a short survey about your daily spending habits. Your responses will help improve financial services for students. We are looking for authentic insights into how you manage your monthly budget.',
    goodResponseGuide: 'Provide honest and accurate answers based on your real daily behavior. Detailed comments in open-ended questions are highly valued.',
    requirements: [
      'Answer all questions carefully',
      'Do not rush through the survey',
      'One submission per user'
    ]
  };

  return (
    <AppLayout 
      hideMobileBottomNav={true} // <-- We hide the tabs so our Action Footer has room!
      mobileHeader={
        <DetailTopBar 
          onBack={() => navigate(-1)} 
          onMenuClick={() => console.log('Menu clicked')} 
        />
      }
    >
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Web App Hero Banner (Rounded instead of full-bleed) */}
        <div className="w-full h-48 md:h-64 relative bg-surface-container overflow-hidden rounded-xl shadow-sm">
          <img 
            src={mockTaskData.heroImage} 
            alt="Task context" 
            className="w-full h-full object-cover mix-blend-overlay opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
        </div>

        {/* Task Info Card */}
        <div className="bg-surface-container-lowest border border-[#E2E8F0] p-lg rounded-xl shadow-sm">
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-start">
              <span className="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-full font-label-sm text-[10px] uppercase tracking-wider">
                {mockTaskData.category}
              </span>
              {mockTaskData.isVerifiedPartner && (
                <div className="flex items-center gap-xs text-secondary font-label-md">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span>Verified Partner</span>
                </div>
              )}
            </div>

            <h2 className="font-h2 text-h2 text-on-background mt-xs">{mockTaskData.title}</h2>

            <div className="flex flex-wrap gap-md mt-sm">
              <div className="flex items-center gap-xs text-on-secondary-container bg-secondary-container/30 px-3 py-1.5 rounded-lg border border-secondary-container">
                <span className="material-symbols-outlined text-lg">payments</span>
                <span className="font-h3 text-h3">Earn {mockTaskData.reward}</span>
              </div>
              <div className="flex items-center gap-xs text-outline">
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span className="font-body-sm">Estimated time: {mockTaskData.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details Sections */}
        <section className="space-y-lg">
          <div>
            <h3 className="font-h3 text-h3 mb-sm flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">description</span>
              Description
            </h3>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              {mockTaskData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-tertiary-container/5 border border-on-tertiary-container/20 p-md rounded-xl">
              <h3 className="font-label-md text-on-tertiary-fixed-variant mb-xs flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
                What a good response looks like
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                {mockTaskData.goodResponseGuide}
              </p>
            </div>

            <div className="bg-surface-container p-md rounded-xl border border-outline-variant/30">
              <h3 className="font-label-md text-on-surface mb-xs flex items-center gap-xs">
                <span className="material-symbols-outlined text-sm">list_alt</span>
                Requirements
              </h3>
              <ul className="space-y-xs">
                {mockTaskData.requirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-xs text-body-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-md border border-primary/10">
            <div className="flex gap-md items-center">
              <div className="p-sm bg-primary-fixed rounded-lg flex-shrink-0">
                <span className="material-symbols-outlined text-primary">security</span>
              </div>
              <div>
                <h4 className="font-label-md text-primary">Privacy & Security</h4>
                <p className="font-body-sm text-on-surface-variant">
                  Your data is anonymized and used only for research purposes. No personal identity is shared.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fixed Action Footer */}
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