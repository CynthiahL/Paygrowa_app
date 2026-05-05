import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import ProgressBar from '../../components/ui/ProgressBar';
import IconSurveyOption from '../../components/ui/IconSurveyOption';

const SurveyQuestion2Page = () => {
  const navigate = useNavigate();
  // Default to the first option based on the design
  const [answer, setAnswer] = useState('tier1'); 

  const handleNext = () => {
    console.log("Step 2 answer:", answer);
    if (!answer) return;
    navigate('/survey/3');
  };

  // Custom mobile header specifically for the WealthInsights survey flow
  const WealthInsightsHeader = (
    <header className="bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 fixed top-0 w-full z-50 h-16 flex justify-between items-center px-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="active:opacity-70 transition-opacity text-[#1A365D] dark:text-blue-400 p-1"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="font-['Inter'] font-semibold text-lg text-[#1A365D] dark:text-blue-400">WealthInsights</span>
      </div>
      <div className="flex items-center">
        <button className="active:opacity-70 transition-opacity text-[#1A365D] dark:text-blue-400 p-1">
          <span className="material-symbols-outlined">shield</span>
        </button>
      </div>
    </header>
  );

  return (
    <AppLayout 
      hideMobileBottomNav={true} 
      mobileHeader={WealthInsightsHeader}
    >
      {/* max-w-xl keeps the form readable on ultra-wide desktop monitors */}
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8">
        
        {/* Progress Bar with updated blue theme props */}
        <ProgressBar 
          currentStep={2} 
          totalSteps={6} 
          percentage={33} 
          colorClass="bg-primary-container"
          textClass="text-primary"
        />

        <section className="mb-xl">
          <h1 className="font-h2 text-h2 text-on-surface mb-xl">
            What is your average daily spending?
          </h1>
          
          <div className="grid grid-cols-1 gap-md">
            <IconSurveyOption 
              icon="payments"
              label="₦500 – ₦1,000" 
              value="tier1" 
              selectedValue={answer} 
              onChange={setAnswer} 
            />
            <IconSurveyOption 
              icon="savings"
              label="₦1,000 – ₦2,000" 
              value="tier2" 
              selectedValue={answer} 
              onChange={setAnswer} 
            />
            <IconSurveyOption 
              icon="trending_up"
              label="₦2,000+" 
              value="tier3" 
              selectedValue={answer} 
              onChange={setAnswer} 
            />
          </div>
        </section>

        {/* Trust Badge / Informational Card */}
        <div className="mt-xl p-lg bg-surface-container-low rounded-xl border border-outline-variant/30 flex gap-md items-start">
          <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
          <div>
            <h4 className="font-label-md text-label-md text-primary-container mb-xs">Privacy Guaranteed</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your responses are encrypted and anonymous. We use this data only to provide accurate financial insights.
            </p>
          </div>
        </div>

      </div>

      {/* Web-App style fixed footer action */}
      <FixedBottomActions>
        <button 
          onClick={handleNext}
          className="w-full h-[48px] bg-primary text-on-primary rounded-xl font-body-md font-semibold flex items-center justify-center gap-sm active:scale-95 transition-transform hover:opacity-90"
        >
          Next
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default SurveyQuestion2Page;