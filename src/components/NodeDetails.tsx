import { WorkflowNode } from '../data/workflowData';

interface Props {
  nodes: WorkflowNode[];
  selectedNode: string | null;
  onNodeSelect: (id: string | null) => void;
}

export default function NodeDetails({ nodes, selectedNode, onNodeSelect }: Props) {
  const activeNode = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Node List */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 sticky top-24">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="fa-solid fa-list text-orange-400"></i>
            Workflow Nodes
          </h2>
          <div className="space-y-2">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => onNodeSelect(node.id)}
                className={`w-full p-3 rounded-lg border transition-all text-left flex items-center gap-3 ${
                  selectedNode === node.id
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${node.color}20` }}
                >
                  <i className={`fa-solid ${node.icon} text-sm`} style={{ color: node.color }}></i>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{node.name}</p>
                  <p className="text-xs text-slate-500">{node.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Node Detail */}
      <div className="lg:col-span-2">
        {activeNode ? (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${activeNode.color}20`, border: `2px solid ${activeNode.color}40` }}
              >
                <i className={`fa-solid ${activeNode.icon} text-2xl`} style={{ color: activeNode.color }}></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{activeNode.name}</h2>
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-1"
                  style={{ backgroundColor: `${activeNode.color}20`, color: activeNode.color }}
                >
                  {activeNode.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Description</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{activeNode.description}</p>
            </div>

            {/* Configuration */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Configuration</h3>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <pre className="text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(activeNode.config, null, 2)}
                </pre>
              </div>
            </div>

            {/* Special Notes */}
            {activeNode.id === 'time-check' && (
              <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-green-400 mb-2">
                  <i className="fa-solid fa-clock mr-2"></i>
                  Time Gate Logic
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  This node checks if the current time is exactly 06:00 AM (between 06:00 and 06:05).
                  Only when this condition is true does the notification path execute.
                  Data collection and storage happen on every cycle regardless of time.
                </p>
                <div className="mt-3 bg-slate-900/50 rounded p-3">
                  <code className="text-xs text-yellow-400 font-mono">
                    Condition: $now.hour === 6 AND $now.minute &lt; 5
                  </code>
                </div>
              </div>
            )}

            {activeNode.id === 'ai-analysis' && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-red-400 mb-2">
                  <i className="fa-solid fa-brain mr-2"></i>
                  AI Prompt Details
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  The AI analyzes all collected communications and categorizes them into:
                </p>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• <strong className="text-slate-300">Unfinished Commitments</strong> - Things you promised to do</li>
                  <li>• <strong className="text-slate-300">Missed Follow-ups</strong> - Conversations needing your response</li>
                  <li>• <strong className="text-slate-300">Missed Calls</strong> - Calls you didn't answer</li>
                  <li>• <strong className="text-slate-300">Action Items</strong> - Tasks with deadlines</li>
                  <li>• <strong className="text-slate-300">Priority Levels</strong> - High/Medium/Low urgency</li>
                </ul>
              </div>
            )}

            {activeNode.id === 'send-notification' && (
              <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">
                  <i className="fa-solid fa-bell mr-2"></i>
                  Notification Channels
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Choose one or more channels to receive your morning summary:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-900/50 rounded p-2 flex items-center gap-2">
                    <i className="fa-brands fa-telegram text-blue-400"></i>
                    <span className="text-xs text-slate-300">Telegram</span>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2 flex items-center gap-2">
                    <i className="fa-brands fa-slack text-purple-400"></i>
                    <span className="text-xs text-slate-300">Slack</span>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2 flex items-center gap-2">
                    <i className="fa-solid fa-envelope text-green-400"></i>
                    <span className="text-xs text-slate-300">Email</span>
                  </div>
                  <div className="bg-slate-900/50 rounded p-2 flex items-center gap-2">
                    <i className="fa-solid fa-sms text-yellow-400"></i>
                    <span className="text-xs text-slate-300">SMS (Twilio)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-12 text-center">
            <i className="fa-solid fa-hand-pointer text-4xl text-slate-600 mb-4"></i>
            <h3 className="text-lg font-semibold text-slate-400 mb-2">Select a Node</h3>
            <p className="text-sm text-slate-500">Click on any node from the list to see its detailed configuration</p>
          </div>
        )}
      </div>
    </div>
  );
}
