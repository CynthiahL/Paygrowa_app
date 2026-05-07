import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';
import TopAppBar from '../../components/layout/TopAppBar';
import TextField from '../../components/ui/TextField';
import SelectField from '../../components/ui/SelectField';
import RadioToggle from '../../components/ui/RadioToggle';

const ProfilePage = () => {
  const navigate = useNavigate();

  const savedName = localStorage.getItem('userFirstName') || 'Emmanuel';
  
  const [profileData, setProfileData] = useState({
    firstName: savedName,
    gender: 'male',
    dob: '1995-05-12',
    state: 'lagos'
  });

  const stateOptions = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'abuja', label: 'Abuja (FCT)' },
    { value: 'rivers', label: 'Rivers' },
    { value: 'kano', label: 'Kano' },
    { value: 'enugu', label: 'Enugu' },
  ];

  const handleUpdateField = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. SAVE THE NEW NAME TO LOCAL STORAGE
    localStorage.setItem('userFirstName', profileData.firstName);
    
    // 3. SHOW SUCCESS MESSAGE & ROUTE TO DASHBOARD
    alert("Profile updated successfully!");
    navigate('/dashboard');
  };

  return (
    <AppLayout 
      mobileHeader={
        <TopAppBar 
          title="Profile" 
          avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDzML8WN11d4FaTRnytBGRzvjQpYC3x3thj4W1ohXLegCDJSg1PMjgMnltsW-yebhj2K0adrjeTDbkc0_3Hql-7y7LsUofQGfyOnnA3BNOzniVvritFJm5B6ZGkHSw9w6Bi0exxnMg7vQEtvRUWnVQMFAxT9MSMxpHO2PBYq-yYapoJARqDxORGG-Bs1B2bnhliQv4DjhivXVhZ-o92U0KtQzDOD8nU5po0VH1SGPbNzTPibwJ3h0QQanXv2Fq2Vnc3sGuDHl8nTgM" 
          onBack={() => navigate(-1)}
        />
      }
    >
      <div className="max-w-xl mx-auto w-full space-y-8">
        
        {/* Header & Avatar */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-sm mx-auto">
              <img 
                alt="User Avatar" 
                className="h-full w-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA8GAY9Q39vNkpX-lJxnWvBEbTtdFZ4Q7_gxOsN6b2TxAZb8wloygA7vkN1hZBMbSZg6lptH0kSED9MLet9w3AIJ27yu-L82zBU6IOtD5NW23JWrWgz51q_LM8J6SBDLQa6zRCxrHVQ7KkxkkBoLBpY9y2E0KZvM9mHFG7yLE6ekooS8Lq69ivtcuvC4WTKZdc4cvtrEjWWV9hhJ8Xp4yOYVbiNErfoWr6hyPDKxU2JhIplkDmllmggwG5cqkImOg-j3ttWuNIob8"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary-container text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center hover:bg-primary transition-colors">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <h2 className="mt-4 font-h2 text-h2 text-on-surface">Personal Information</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Keep your details up to date to ensure account security.</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField label="First Name" id="first_name" value={profileData.firstName} onChange={(e) => handleUpdateField('firstName', e.target.value)} />
          <TextField label="Last Name" id="last_name" value={profileData.lastName} onChange={(e) => handleUpdateField('lastName', e.target.value)} />
          
          <RadioToggle 
            label="Gender" name="gender" selectedValue={profileData.gender} onChange={(val) => handleUpdateField('gender', val)}
            options={[ { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' } ]}
          />

          <TextField label="Date of Birth" id="dob" type="date" icon="calendar_month" value={profileData.dob} onChange={(e) => handleUpdateField('dob', e.target.value)} />
          <SelectField label="State of Residence" id="state" options={stateOptions} value={profileData.state} onChange={(e) => handleUpdateField('state', e.target.value)} />

          <div className="pt-4">
            <button type="submit" className="w-full h-14 bg-primary text-on-primary font-body-lg text-body-lg font-bold rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:opacity-90">
              Save and Continue
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>

        {/* Trust Anchor */}
        <div className="p-4 bg-surface-container rounded-xl border border-surface-container-high flex items-start gap-3">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
          <div className="space-y-1">
            <h4 className="font-label-md text-label-md text-on-surface">Secure Identity</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Your personal data is encrypted and never shared with unauthorized third parties.</p>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default ProfilePage;