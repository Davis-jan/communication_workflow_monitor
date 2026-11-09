import { workflowNodes, workflowConnections } from '../data/workflowData';

interface Props {
  selectedNode: string | null;
  onNodeSelect: (id: string | null) => void;
}

export default function WorkflowDiagram({ selectedNode, onNodeSelect }: Props) {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-lightbulb text-orange-400 text-lg mt-0.5"></i>
          <div>
            <h3 className="font-semibold text-orange-300">How This Workflow Works</h3>
            <p className="text-sm text-slate-300 mt-1">
              The workflow runs <strong>continuously every 5 minutes</strong> to collect emails, WhatsApp messages, and call logs.
              All data is stored silently. At <strong>06:00 AM</strong>, it sends you a consolidated morning summary with all
              unfinished commitments, missed follow-ups, and missed calls from the past 6 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Workflow */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 overflow-x-auto">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <i className="fa-solid fa-sitemap text-orange-400"></i>
          Workflow Visual Flow
        </h2>

        {/* Flow Diagram */}
        <div className="min-w-[900px]">
          {/* Row 1: Trigger */}
          <div className="flex items-center justify-center mb-8">
            <NodeCard
              node={workflowNodes[0]}
              isSelected={selectedNode === workflowNodes[0].id}
              onClick={() => onNodeSelect(workflowNodes[0].id)}
            />
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-8 bg-slate-600"></div>
          </div>
          <div className="flex justify-center mb-2">
            <i className="fa-solid fa-arrow-down text-slate-500 text-xs"></i>
          </div>
          <p className="text-center text-xs text-slate-500 mb-4">Parallel data collection (every 5 min)</p>

          {/* Row 2: Data Collection (3 parallel) */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <NodeCard
              node={workflowNodes[1]}
              isSelected={selectedNode === workflowNodes[1].id}
              onClick={() => onNodeSelect(workflowNodes[1].id)}
            />
            <NodeCard
              node={workflowNodes[2]}
              isSelected={selectedNode === workflowNodes[2].id}
              onClick={() => onNodeSelect(workflowNodes[2].id)}
            />
            <NodeCard
              node={workflowNodes[3]}
              isSelected={selectedNode === workflowNodes[3].id}
              onClick={() => onNodeSelect(workflowNodes[3].id)}
            />
          </div>

          {/* Merge arrows */}
          <div className="flex justify-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-32 h-0.5 bg-slate-600"></div>
              <i className="fa-solid fa-code-branch text-yellow-500"></i>
              <div className="w-32 h-0.5 bg-slate-600"></div>
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-6 bg-slate-600"></div>
          </div>

          {/* Row 3: Merge */}
          <div className="flex items-center justify-center mb-4">
            <NodeCard
              node={workflowNodes[4]}
              isSelected={selectedNode === workflowNodes[4].id}
              onClick={() => onNodeSelect(workflowNodes[4].id)}
            />
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-6 bg-slate-600"></div>
          </div>

          {/* Row 4: AI Analysis */}
          <div className="flex items-center justify-center mb-4">
            <NodeCard
              node={workflowNodes[5]}
              isSelected={selectedNode === workflowNodes[5].id}
              onClick={() => onNodeSelect(workflowNodes[5].id)}
            />
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-6 bg-slate-600"></div>
          </div>

          {/* Row 5: Time Gate */}
          <div className="flex items-center justify-center mb-4">
            <NodeCard
              node={workflowNodes[6]}
              isSelected={selectedNode === workflowNodes[6].id}
              onClick={() => onNodeSelect(workflowNodes[6].id)}
            />
          </div>

          {/* Split into two paths */}
          <div className="flex justify-center mb-2">
            <div className="flex items-center">
              <div className="w-48 h-0.5 bg-green-500/50"></div>
              <span className="px-2 text-xs text-green-400">06:00 ✓</span>
              <div className="w-48 h-0.5 bg-slate-600"></div>
              <span className="px-2 text-xs text-slate-500">Always</span>
            </div>
          </div>

          {/* Row 6: Notification + Storage */}
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <p className="text-xs text-center text-green-400 font-medium">→ Send Notification</p>
              <NodeCard
                node={workflowNodes[7]}
                isSelected={selectedNode === workflowNodes[7].id}
                onClick={() => onNodeSelect(workflowNodes[7].id)}
              />
              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-slate-600"></div>
              </div>
              <NodeCard
                node={workflowNodes[8]}
                isSelected={selectedNode === workflowNodes[8].id}
                onClick={() => onNodeSelect(workflowNodes[8].id)}
              />
            </div>
            <div className="space-y-4">
              <p className="text-xs text-center text-slate-400 font-medium">→ Store Data (every cycle)</p>
              <div className="pt-6">
                <NodeCard
                  node={workflowNodes[9]}
                  isSelected={selectedNode === workflowNodes[9].id}
                  onClick={() => onNodeSelect(workflowNodes[9].id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-slate-400">Trigger</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-400">Data Source</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-400">Filter/Gate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-slate-400">AI Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-slate-400">Merge/Transform</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NodeCard({ node, isSelected, onClick }: { node: any; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border transition-all text-left ${
        isSelected
          ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
          : 'border-slate-600 bg-slate-800/80 hover:border-slate-500 hover:bg-slate-700/80'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${node.color}20`, border: `1px solid ${node.color}40` }}
        >
          <i className={`fa-solid ${node.icon}`} style={{ color: node.color }}></i>
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-white truncate">{node.name}</h4>
          <p className="text-xs text-slate-400 truncate">{node.description}</p>
        </div>
      </div>
    </button>
  );
}
