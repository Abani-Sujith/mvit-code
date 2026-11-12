import React from 'react';
import { API_BASE_URL } from '../../lib/apiConfig';
import { useAgentAdmin } from './useAgentAdmin';
import AgentCoreSection from './sections/AgentCoreSection';
import AgentMetricsSection from './sections/AgentMetricsSection';
import KnowledgeIngestionSection from './sections/KnowledgeIngestionSection';
import LiveTerminalSection from './sections/LiveTerminalSection';
import ProactiveActionsSection from './sections/ProactiveActionsSection';
import TaskControlPanelSection from './sections/TaskControlPanelSection';

const AgentAdmin = () => {
  const {
    file,
    setFile,
    isUploading,
    setIsUploading,
    isLoopTriggered,
    setIsLoopTriggered,
    logs,
    setLogs,
    proactiveActions,
    allTasks,
    expandedTrace,
    setExpandedTrace,
    expandedTask,
    setExpandedTask,
    addToast,
    logEndRef,
    logContainerRef,
  } = useAgentAdmin();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      addToast({ title: 'Please select a PDF file — campus circular or notice.', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/ingest`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        addToast({ title: data.message || 'File ingested by the AI agent knowledge base.', type: 'success' });
        setFile(null);
      } else {
        addToast({ title: data.detail || 'Failed to ingest file.', type: 'error' });
      }
    } catch (err) {
      addToast({ title: 'Backend connection error. Ensure FastAPI is running.', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AgentCoreSection
        isLoopTriggered={isLoopTriggered}
        onTriggerLoop={async () => {
          try {
            const res = await fetch(`${API_BASE_URL}/trigger_loop`, { method: 'POST' });
            if (res.ok) {
                addToast({ title: 'Initiating Global Intervention Loop...', type: 'success' });
                setIsLoopTriggered(true);
                setLogs(["[SYSTEM] Firing Trigger Engine... establishing secure connection to Firebase."]);
            }
          } catch (e) {
            addToast({ title: 'Agent Core Offline. Code 500.', type: 'error' });
          }
        }}
      />
      <AgentMetricsSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <KnowledgeIngestionSection
          file={file}
          isUploading={isUploading}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
        />
        <LiveTerminalSection
          logs={logs}
          isLoopTriggered={isLoopTriggered}
          logEndRef={logEndRef}
          logContainerRef={logContainerRef}
        />
      </div>

      <ProactiveActionsSection
        proactiveActions={proactiveActions}
        expandedTrace={expandedTrace}
        setExpandedTrace={setExpandedTrace}
      />
      <TaskControlPanelSection
        allTasks={allTasks}
        expandedTask={expandedTask}
        setExpandedTask={setExpandedTask}
      />
    </div>
  );
};

export default AgentAdmin;
