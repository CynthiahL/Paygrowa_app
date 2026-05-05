import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import WealthInsightsHeader from '../../components/layout/WealthInsightsHeader';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import ProgressBar from '../../components/ui/ProgressBar';
import SimpleIconSurveyOption from '../../components/ui/SimpleIconSurveyOption';
import SimpleInfoCard from '../../components/ui/SimpleInfoCard';

const SurveyQuestion4Page = () => {
  const navigate = useNavigate();
  // Default to "transport" as seen in the design mockup
  const [answer, setAnswer] = useState('transport');

  const handleNext = () => {
    if (!answer) {
      alert("Please select an option to continue.");
      return;
    }
    console.log("Step 4 answer:", answer);
    if (!answer) return;
    navigate('/survey/5');
  };

  return (
    <AppLayout 
      hideMobileBottomNav={true} 
      mobileHeader={<WealthInsightsHeader />}
    >
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8">
        
        <ProgressBar 
          currentStep={4} 
          totalSteps={6} 
          percentage={66} 
          colorClass="bg-primary-container"
          textClass="text-primary"
        />

        <section className="mb-8">
          <h1 className="font-h2 text-h2 text-primary mb-sm leading-tight">
            What do you spend the most on?
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">
            Select the primary category of your monthly expenses to help us refine your profile.
          </p>
          
          <div className="grid grid-cols-1 gap-md">
            <SimpleIconSurveyOption 
              icon="restaurant" label="Food" value="food" 
              selectedValue={answer} onChange={setAnswer} 
            />
            <SimpleIconSurveyOption 
              icon="directions_bus" label="Transport" value="transport" 
              selectedValue={answer} onChange={setAnswer} 
            />
            <SimpleIconSurveyOption 
              icon="cell_tower" label="Data" value="data" 
              selectedValue={answer} onChange={setAnswer} 
            />
            <SimpleIconSurveyOption 
              icon="more_horiz" label="Others" value="others" 
              selectedValue={answer} onChange={setAnswer} 
            />
          </div>
        </section>

        <SimpleInfoCard 
          icon="lightbulb"
          iconColorClass="text-on-tertiary-container" // Green icon for this step
          text="Understanding your spending helps us match you with higher-paying financial planning surveys."
        />

      </div>

      <FixedBottomActions>
        <button 
          onClick={handleNext}
          className="w-full h-12 bg-primary-container text-white font-h3 text-h3 rounded-lg flex items-center justify-center active:opacity-70 hover:opacity-90 transition-opacity"
        >
          Next
          <span className="material-symbols-outlined ml-xs">chevron_right</span>
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default SurveyQuestion4Page;