import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import ProgressBar from '../../components/ui/ProgressBar';
import DetailedSurveyOption from '../../components/ui/DetailedSurveyOption';
import SimpleInfoCard from '../../components/ui/SimpleInfoCard';

const SurveyQuestion3Page = () => {
  const navigate = useNavigate();
  // Defaulting to empty to force the user to make a choice
  const [answer, setAnswer] = useState(''); 

  const handleNext = () => {
    if (!answer) {
      alert("Please select an option to continue.");
      return;
    }
    console.log("Step 3 answer:", answer);
    if (!answer) return;
    navigate('/survey/4');
  };

  // Reusing the WealthInsights header configuration
  const WealthInsightsHeader = (
    <header className="bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 fixed top-0 w-full z-50 h-16 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="active:opacity-70 transition-opacity text-[#1A365D] dark:text-blue-400 p-1"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-['Inter'] font-semibold text-lg text-[#1A365D] dark:text-white">WealthInsights</span>
      </div>
      <div className="flex items-center">
        <span className="material-symbols-outlined text-[#1A365D] dark:text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
      </div>
    </header>
  );

  return (
    <AppLayout 
      hideMobileBottomNav={true} 
      mobileHeader={WealthInsightsHeader}
    >
      {/* Container keeps form centered and readable on desktop */}
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8">
        
        <ProgressBar 
          currentStep={3} 
          totalSteps={6} 
          percentage={50} 
          colorClass="bg-primary-container"
          textClass="text-primary"
        />

        <div className="space-y-8 mb-8">
          <div className="space-y-2">
            <h2 className="font-h2 text-primary leading-tight">
              Do you currently have a side income?
            </h2>
            <p className="font-body-md text-on-surface-variant">
              This helps us tailor financial opportunities specifically for your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <DetailedSurveyOption 
              icon="trending_up"
              title="Yes"
              subtitle="I have additional revenue streams"
              value="yes"
              selectedValue={answer}
              onChange={setAnswer}
            />
            <DetailedSurveyOption 
              icon="block"
              title="No"
              subtitle="I rely solely on my main income"
              value="no"
              selectedValue={answer}
              onChange={setAnswer}
            />
          </div>

          <SimpleInfoCard 
            icon="info"
            text="Your answers are encrypted and used only for verifying your eligibility for premium insights."
          />
        </div>

      </div>

      <FixedBottomActions>
        <button 
          onClick={handleNext}
          className="w-full h-12 bg-primary-container text-white font-body-md font-semibold rounded-lg shadow-[0_2px_0_0_#001b3c] active:shadow-none active:translate-y-0.5 transition-all flex items-center justify-center gap-2 hover:opacity-90"
        >
          Next
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default SurveyQuestion3Page;