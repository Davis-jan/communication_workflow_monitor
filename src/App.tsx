import { useState } from 'react';
import WorkflowDiagram from './components/WorkflowDiagram';
import WorkflowJSON from './components/WorkflowJSON';
import SetupGuide from './components/SetupGuide';
import NodeDetails from './components/NodeDetails';
import { workflowNodes } from './data/workflowData';

type Tab = 'diagram' | 'json' | 'setup' | 'details';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('diagram');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'diagram', label: 'Workflow Diagram', icon: 'fa-sitemap' },
    { id: 'details', label: 'Node Details', icon: 'fa-info-circle' },
    { id: 'json', label: 'Import JSON', icon: 'fa-code' },
    { id: 'setup', label: 'Setup Guide', icon: 'fa-book' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <i className="fa-solid fa-robot text-white text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">n8n Follow-Up Checker</h1>
                <p className="text-xs text-slate-400">Automated 6hr Collection + Morning 06:00 Notification</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                <i className="fa-solid fa-circle text-[6px] mr-1 animate-pulse"></i>
                Always Running
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">
                <i className="fa-solid fa-bell mr-1"></i>
                Notify at 06:00
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                }`}
              >
                <i className={`fa-solid ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'diagram' && (
          <WorkflowDiagram
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
          />
        )}
        {activeTab === 'details' && (
          <NodeDetails
            nodes={workflowNodes}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
          />
        )}
        {activeTab === 'json' && <WorkflowJSON />}
        {activeTab === 'setup' && <SetupGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/80 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-slate-500">
          <p>Import the JSON into n8n → Workflows → Import from File. Replace credential IDs with your own.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
