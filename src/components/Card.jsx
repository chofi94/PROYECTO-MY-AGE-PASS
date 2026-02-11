
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  const Component = hover ? motion.div : 'div';
  
  return (
    <Component
      whileHover={hover ? { y: -5 } : undefined}
      transition={hover ? { duration: 0.2 } : undefined}
      className={cn(
        'bg-slate-800/50 backdrop-blur-sm rounded-xl p-6',
        'border border-slate-700 shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
