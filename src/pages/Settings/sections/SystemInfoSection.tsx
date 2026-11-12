import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const SystemInfoSection: React.FC = () => (
  <div className="border-2 border-ink-black rounded-3xl bg-pure-white p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-ink-black">
      <CheckCircle2 className="h-5 w-5 text-ink-black" />
      <h2 className="font-headline-sm font-normal [font-synthesis:none] text-2xl uppercase tracking-tight text-ink-black m-0">
        System Information
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface border border-ink-black rounded-2xl p-5">
        <h3 className="font-title-md text-sm uppercase font-bold text-ink-black mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary-container"></span>
          Application
        </h3>
        <div className="space-y-3 font-body-md text-xs text-ink-black">
          <div className="flex justify-between items-center">
            <span className="font-label-sm uppercase tracking-wider text-secondary">Version</span>
            <span className="font-bold px-2 py-0.5 rounded-full border border-ink-black bg-pure-white">v1.2.0</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
            <span className="font-label-sm uppercase tracking-wider text-secondary">Build</span>
            <span className="font-bold">React + TypeScript</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
            <span className="font-label-sm uppercase tracking-wider text-secondary">Last Updated</span>
            <span className="font-bold">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-ink-black rounded-2xl p-5">
        <h3 className="font-title-md text-sm uppercase font-bold text-ink-black mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-ink-black"></span>
          Backend
        </h3>
        <div className="space-y-3 font-body-md text-xs text-ink-black">
          <div className="flex justify-between items-center">
            <span className="font-label-sm uppercase tracking-wider text-secondary">Database</span>
            <span className="font-bold">Firebase Firestore</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
            <span className="font-label-sm uppercase tracking-wider text-secondary">Hosting</span>
            <span className="font-bold">Vercel</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-ink-black/15">
            <span className="font-label-sm uppercase tracking-wider text-secondary">Status</span>
            <span className="font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SystemInfoSection;
