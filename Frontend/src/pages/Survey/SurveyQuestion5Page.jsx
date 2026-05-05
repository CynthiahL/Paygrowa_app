import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import WealthInsightsHeader from '../../components/layout/WealthInsightsHeader';
import FixedBottomActions from '../../components/layout/FixedBottomActions';
import ProgressBar from '../../components/ui/ProgressBar';
import TextAreaField from '../../components/ui/TextAreaField';
import SimpleInfoCard from '../../components/ui/SimpleInfoCard';

const SurveyQuestion5Page = () => {
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    if (answer.trim().length === 0) {
      alert("Please enter a response before continuing, or click Skip.");
      return;
    }
    navigate('/survey/attention-check'); // <-- Route to Attention Check
  };

  const handleSkip = () => {
    navigate('/survey/attention-check'); // <-- Route to Attention Check
  };

  return (
    <AppLayout 
      hideMobileBottomNav={true} 
      mobileHeader={<WealthInsightsHeader />}
    >
      <div className="max-w-xl mx-auto w-full flex flex-col pt-8">
        
        <ProgressBar 
          currentStep={5} 
          totalSteps={6} 
          percentage={83} 
          colorClass="bg-primary-container"
          textClass="text-primary"
        />

        <section className="mb-8 flex-grow">
          <div className="mb-8">
            <h1 className="font-h2 text-on-surface mb-2 leading-tight">
              Please describe your biggest daily expense and why?
            </h1>
            <p className="font-body-sm text-on-surface-variant">
              Your detailed answer helps us provide more accurate financial insights tailored to your lifestyle.
            </p>
          </div>

          <TextAreaField 
            id="expense_description"
            label="Response"
            placeholder="e.g., My biggest daily expense is transportation because I commute two hours to the city center for work every day..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            maxLength={500}
            rows={8}
          />

          <div className="mt-8">
            <SimpleInfoCard 
              icon="verified_user"
              iconColorClass="text-secondary" // Green icon
              title="Secure & Confidential"
              text="Your responses are encrypted and used only for anonymous demographic research."
            />
          </div>
        </section>

      </div>

      <FixedBottomActions>
        {/* Next Button */}
        <button 
          onClick={handleNext}
          className="w-full h-[48px] bg-primary text-white font-label-md rounded-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm hover:opacity-90"
        >
          Next
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
        
        {/* Skip Button */}
        <button 
          onClick={handleSkip}
          className="w-full py-2 font-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-lg"
        >
          Skip for now
        </button>
      </FixedBottomActions>
    </AppLayout>
  );
};

export default SurveyQuestion5Page;