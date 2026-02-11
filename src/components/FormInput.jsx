
import React from 'react';
import { cn } from '@/lib/utils';

const FormInput = ({ 
  label, 
  error, 
  type = 'text', 
  className = '',
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-200">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          'w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700',
          'text-white placeholder-slate-400',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-all duration-200',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
