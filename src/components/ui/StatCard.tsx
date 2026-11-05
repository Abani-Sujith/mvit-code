import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: number;
  trendLabel?: string;
  colorTheme?: 'blue' | 'green' | 'purple' | 'amber' | 'brand';
  highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendLabel,
}) => {
  return (
    <div className="border-2 border-ink-black p-6 bg-pure-white rounded-3xl relative flex flex-col justify-between min-h-[170px] select-none">
      {/* Tilted black sticker for trend */}
      {trend !== undefined && (
        <div className="absolute top-4 right-4 transform -rotate-2">
          <span className="rounded-full bg-ink-black text-pure-white px-3 py-1 font-label-sm text-[11px] tracking-wider inline-flex items-center border border-ink-black">
            {trend > 0 ? `+${trend}` : trend} {trendLabel || 'vs yesterday'}
          </span>
        </div>
      )}

      {/* Label & Number */}
      <div>
        <div className="font-label-lg text-sm text-ink-black font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ink-black shrink-0"></span>
          <span>{title}</span>
        </div>
        <div className="font-headline-lg text-5xl sm:text-6xl text-primary-container leading-none tracking-tight mt-4 tabular-numbers">
          {value}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
