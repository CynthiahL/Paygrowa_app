import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import SurveyHeader from '../../components/layout/SurveyHeader';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import ProgressBar from '../../components/ui/ProgressBar';
import SurveyOption from '../../components/ui/SurveyOption';
import ContextCard from '../../components/ui/ContextCard';

const SurveyQuestion1Page = () => {
  const navigate = useNavigate();
  // State to hold the user's selected answer. Defaulting to 'twice' based on the design mock.
  const [answer, setAnswer] = useState('twice');

  const handleNext = () => {
    console.log("Selected answer:", answer);
    if (!answer) return;
    navigate('/survey/2');
  };

  return (
    <AppLayout 
      hideMobileBottomNav={true} 
      mobileHeader={<SurveyHeader onBack={() => navigate(-1)} />}
    >
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8">
        
        <ProgressBar currentStep={1} totalSteps={6} percentage={16} />

        <section className="mb-xl">
          <h1 className="font-h2 text-h2 text-on-surface mb-lg">
            How often do you spend money on food daily?
          </h1>
          
          <div className="space-y-md">
            <SurveyOption 
              label="Once" 
              value="once" 
              selectedValue={answer} 
              onChange={setAnswer} 
            />
            <SurveyOption 
              label="Twice" 
              value="twice" 
              selectedValue={answer} 
              onChange={setAnswer} 
            />
            <SurveyOption 
              label="More than twice" 
              value="more" 
              selectedValue={answer} 
              onChange={setAnswer} 
            />
          </div>
        </section>

        <ContextCard 
          title="Why we ask"
          description="This helps us tailor the most effective savings goals for your daily budget profile."
        />

      </div>

      <FixedBottomActions>
        <button 
          onClick={handleNext}
          className="w-full bg-primary-container text-white py-4 rounded-xl font-h3 flex items-center justify-center gap-sm active:scale-[0.98] transition-transform duration-100 shadow-sm hover:opacity-90"
        >
          Next
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default SurveyQuestion1Page;