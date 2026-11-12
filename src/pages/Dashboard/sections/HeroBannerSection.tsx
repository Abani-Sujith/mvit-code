import React from 'react';
import { Zap } from 'lucide-react';

interface HeroBannerSectionProps {
  selectedDept?: string;
  latestDate?: string | null;
}

export const HeroBannerSection: React.FC<HeroBannerSectionProps> = ({ selectedDept, latestDate }) => {
  return (
    <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-10 relative overflow-hidden select-none">
      {/* Top Overline */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-4 border-b border-ink-black/15">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-ink-black rounded-full"></span>
          <span className="font-label-lg text-xs text-ink-black font-bold">
            Department activity
          </span>
        </div>
      </div>

      {/* Massive Headline with Interlocking Tilted Sticker Tags */}
      <div className="py-6 sm:py-8 my-2">
        <div className="relative inline-block max-w-full">
          {/* Sticker 1: Tilted Left */}
          <div className="absolute -top-4 sm:-top-5 left-2 sm:left-4 z-20 transform -rotate-3 pointer-events-none">
            <span className="rounded-full bg-ink-black text-pure-white px-3.5 sm:px-4 py-1 sm:py-1.5 font-label-sm text-[11px] inline-flex items-center gap-1.5 border border-ink-black">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              {selectedDept ? `${selectedDept} dept` : 'System wide'}
            </span>
          </div>

          {/* Giant Condensed Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-primary-container leading-none tracking-tight m-0 select-none break-words">
            WHO NEEDS A NUDGE TODAY
          </h1>

          {/* Sticker 2: Tilted Right */}
          <div className="absolute -bottom-3 sm:-bottom-4 right-4 sm:right-12 z-20 transform rotate-3 pointer-events-none">
            <span className="rounded-full bg-ink-black text-pure-white px-3.5 sm:px-4 py-1 sm:py-1.5 font-label-sm text-[11px] inline-flex items-center gap-1.5 border border-ink-black">
              <Zap className="w-3.5 h-3.5 text-primary-container" />
              {latestDate ? `Updated ${latestDate}` : 'Latest data'}
            </span>
          </div>
        </div>
      </div>

      {/* Sub-bar footer */}
      <div className="flex items-center justify-between flex-wrap gap-4 pt-4 mt-4 border-t border-ink-black/15">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-title-md text-ink-black font-bold tracking-tight">Action needed:</span>
          <span className="font-body-md text-secondary">Follow up with students who have stalled or need support.</span>
        </div>
      </div>
    </div>
  );
};

export default HeroBannerSection;
