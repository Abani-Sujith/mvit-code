import React from 'react';
import { CheckCircle, FileText, Upload } from 'lucide-react';

interface KnowledgeIngestionSectionProps {
  file: File | null;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
}

const KnowledgeIngestionSection: React.FC<KnowledgeIngestionSectionProps> = ({
  file,
  isUploading,
  onFileChange,
  onUpload,
}) => (
  <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full">
    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
      <FileText className="text-blue-500 h-5 w-5" />
      Knowledge Base Ingestion
    </h2>
    <p className="text-sm text-textMuted mb-6">
      Upload campus circulars, hackathon PDFs, or schedules. The agent will read, vectorize, and remember this info for future chat resolution.
    </p>

    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {file ? file.name : "Drag and drop or click to select a PDF"}
      </p>
      <input 
        type="file" 
        accept=".pdf" 
        hidden 
        id="file-upload" 
        onChange={onFileChange} 
      />
      <label 
        htmlFor="file-upload"
        className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-lg cursor-pointer font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
      >
        Browse Files
      </label>
    </div>

    <button
      onClick={onUpload}
      disabled={!file || isUploading}
      className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
    >
      {isUploading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          Processing...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" /> Ingest into Agent DB
        </span>
      )}
    </button>
  </div>
);

export default KnowledgeIngestionSection;
