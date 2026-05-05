import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import DetailTopBar from '../../components/layout/DetailTopBar';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import ProgressBar from '../../components/ui/ProgressBar';
import SimpleIconSurveyOption from '../../components/ui/SimpleIconSurveyOption';
import AlertBanner from '../../components/ui/AlertBanner';

const SurveyAttentionCheckPage = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    if (!answer) {
      alert("Please select an option to continue.");
      return;
    }
    
    if (answer !== 'airplane') {
      alert("Oops! That's not the right answer for the attention check.");
      return;
    }

    // Success! Route to the final success page.
    navigate('/task-success');
  };

  return (
    <AppLayout 
      hideMobileBottomNav={true} 
      mobileHeader={
        <DetailTopBar 
          onBack={() => navigate(-1)} 
          onMenuClick={() => console.log("Menu clicked")} 
        />
      }
    >
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8">
        
        {/* Progress Bar (Green Theme) */}
        <ProgressBar 
          currentStep={5} 
          totalSteps={6} 
          percentage={83} 
          colorClass="bg-secondary"
          textClass="text-secondary"
        />

        <div className="w-full flex flex-col gap-xl mb-8">
          
          <AlertBanner 
            icon="verified_user"
            text="Attention Check: Please select the correct answer to continue earning."
          />

          <div className="space-y-sm">
            <h1 className="font-h2 text-h2 text-primary leading-tight">
              Which of the following is NOT a common daily expense for students?
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Please select one option below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-md">
            <SimpleIconSurveyOption 
              icon="lunch_dining" label="Food" value="food" 
              selectedValue={answer} onChange={setAnswer} 
              activeStyle="solid"
            />
            <SimpleIconSurveyOption 
              icon="directions_bus" label="Transport" value="transport" 
              selectedValue={answer} onChange={setAnswer} 
              activeStyle="solid"
            />
            <SimpleIconSurveyOption 
              icon="cell_tower" label="Data" value="data" 
              selectedValue={answer} onChange={setAnswer} 
              activeStyle="solid"
            />
            <SimpleIconSurveyOption 
              icon="flight" label="Airplane tickets" value="airplane" 
              selectedValue={answer} onChange={setAnswer} 
              activeStyle="solid"
            />
          </div>
        </div>

        {/* Verification Badge */}
        <div className="mt-xl text-center pb-8">
          <div className="inline-flex items-center gap-xs text-on-surface-variant opacity-60">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="font-label-sm text-label-sm">Secured by PayGrowa Financial Protocol</span>
          </div>
        </div>

      </div>

      <FixedBottomActions>
        <button 
          onClick={handleNext}
          className="w-full h-12 bg-primary text-on-primary font-label-md text-h3 rounded-lg flex items-center justify-center gap-sm active:scale-[0.97] transition-transform shadow-lg hover:opacity-90"
        >
          Next
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default SurveyAttentionCheckPage;