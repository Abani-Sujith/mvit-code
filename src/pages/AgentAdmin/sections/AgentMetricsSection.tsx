import React from 'react';
import { Bot, CheckCircle, Users } from 'lucide-react';

const AgentMetricsSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:shadow-md transition">
       <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
         <Bot className="h-6 w-6" />
       </div>
       <div>
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Interventions</p>
         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,048</h3>
       </div>
    </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:shadow-md transition">
       <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
         <CheckCircle className="h-6 w-6" />
       </div>
       <div>
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Verification Rate</p>
         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">94.2%</h3>
       </div>
    </div>
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 hover:shadow-md transition">
       <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
         <Users className="h-6 w-6" />
       </div>
       <div>
         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Logistic ELO</p>
         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,340</h3>
       </div>
    </div>
  </div>
);

export default AgentMetricsSection;
