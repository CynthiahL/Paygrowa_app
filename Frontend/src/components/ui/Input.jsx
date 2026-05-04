import React, { useState } from 'react';

const Input = ({ label, id, type = "text", placeholder, value, onChange, rightLabel, rightLabelHref }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col gap-xs w-full">
      <div className="flex justify-between items-center px-xs">
        <label className="font-label-md text-label-md text-on-surface-variant" htmlFor={id}>
          {label}
        </label>
        {rightLabel && (
          <a className="font-label-sm text-label-sm text-on-primary-container hover:underline" href={rightLabelHref || "#"}>
            {rightLabel}
          </a>
        )}
      </div>
      
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-12 px-md rounded border border-outline focus:border-primary focus:ring-0 transition-all font-body-md text-body-md bg-transparent ${isPassword ? 'pr-xl' : ''}`}
        />
        {isPassword && (
          <button 
            type="button"
            onClick={togglePassword}
            className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;