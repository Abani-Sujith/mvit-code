import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const CardRoot: React.FC<CardProps> = ({ hover = false, className = '', children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-pure-white border-2 border-ink-black rounded-3xl overflow-hidden',
        hover && 'transition-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 pt-6 pb-4 border-b border-ink-black', className)} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = '', children, ...props }) => (
  <h3 className={cn('font-title-md text-title-md text-ink-black font-bold tracking-tight', className)} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div className={cn('px-6 py-6', className)} {...props}>
    {children}
  </div>
);

const Card = Object.assign(CardRoot, { Header: CardHeader, Title: CardTitle, Content: CardContent });

export default Card;
