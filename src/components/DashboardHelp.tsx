import React from 'react';
import { Mail, FileQuestion } from 'lucide-react';

export const DashboardHelp: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] text-gray-500 dark:text-gray-400 py-12 text-center">
        <FileQuestion size={48} className="mb-4 opacity-50" />
        <h3 className="text-xl font-bold mb-2 text-gray-700 dark:text-gray-300">Under Development</h3>
        <p className="max-w-xs">The Help & Information for MathDiskarte dashboard is currently being written.</p>
      </div>

      <div className="w-full lg:w-72 shrink-0">
        <div className="bg-emerald-50 dark:bg-[#141417] border border-emerald-100 dark:border-white/10 rounded-2xl p-6 sticky top-0">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mail size={18} className="text-emerald-500 dark:text-teal-400" />
            Contact Info
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            Have questions, issues, or suggestions? Reach out to us directly via email.
          </p>
          <div className="bg-white dark:bg-black/40 rounded-xl p-3 border border-black/5 dark:border-white/5 mb-6">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Developer Email</div>
            <a href="mailto:christianelle_cabello@dlsu.edu.ph" className="text-sm font-medium text-emerald-600 dark:text-teal-400 break-all select-all hover:underline">
              christianelle_cabello@dlsu.edu.ph
            </a>
          </div>
          
          <div className="pt-6 border-t border-black/5 dark:border-white/10">
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Developer</div>
            <p className="font-medium text-gray-800 dark:text-gray-200 mb-4">Christianelle Cabello</p>
            
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2">Group Members</div>
            <ul className="text-sm text-gray-800 dark:text-gray-200 mb-6 space-y-1">
              <li>Amos John Del Rosario</li>
              <li>Lindsay Adrienne Dy</li>
              <li>Andre Miguel Palaca</li>
              <li>Gabriel Oscar Torres</li>
            </ul>
            
            <p className="text-sm text-emerald-600 dark:text-teal-400 font-bold mt-1">GEMATMW Z19 - Group 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};
