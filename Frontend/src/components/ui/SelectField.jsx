import React from 'react';

const SelectField = ({ label, id, value, onChange, options }) => {
  return (
    <div className="space-y-1.5 w-full">
      <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <select 
          id={id}
          value={value}
          onChange={onChange}
          className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md text-body-md transition-all appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
          expand_more
        </span>
      </div>
    </div>
  );
};

export default SelectField;