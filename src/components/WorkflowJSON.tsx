import { useState } from 'react';
import { n8nWorkflowJSON } from '../data/workflowData';

export default function WorkflowJSON() {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(n8nWorkflowJSON, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'follow-up-checker-workflow.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-download text-blue-400 text-lg mt-0.5"></i>
          <div>
            <h3 className="font-semibold text-blue-300">How to Import This Workflow</h3>
            <ol className="text-sm text-slate-300 mt-2 space-y-1 list-decimal list-inside">
              <li>Download the JSON file or copy the code below</li>
              <li>Open your n8n instance → Workflows</li>
              <li>Click the three dots menu (⋮) → "Import from File" or "Import from URL"</li>
              <li>Select the downloaded JSON file</li>
              <li>Replace all credential IDs marked as "REPLACE_WITH_YOUR_CREDENTIAL_ID"</li>
              <li>Activate the workflow</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
            copied
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30'
          }`}
        >
          <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-lg font-medium text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-download"></i>
          Download JSON File
        </button>
      </div>

      {/* JSON Code */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs text-slate-400 font-mono">follow-up-checker-workflow.json</span>
          <span className="text-xs text-slate-500">{jsonString.length.toLocaleString()} characters</span>
        </div>
        <div className="p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
          <pre className="text-xs text-green-400 font-mono leading-relaxed">
            {jsonString}
          </pre>
        </div>
      </div>

      {/* Credentials Checklist */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-key text-yellow-400"></i>
          Credentials You'll Need to Configure
        </h3>
        <div className="space-y-3">
          <CredentialItem
            name="Gmail OAuth2"
            description="For fetching unread emails"
            icon="fa-envelope"
            color="#4A90D9"
            required
          />
          <CredentialItem
            name="WhatsApp Business API"
            description="For reading WhatsApp messages (or use Twilio WhatsApp API)"
            icon="fa-whatsapp"
            color="#25D366"
            required
          />
          <CredentialItem
            name="Phone System / CRM API"
            description="For accessing call logs (Google Voice, Twilio, HubSpot, etc.)"
            icon="fa-phone"
            color="#9B59B6"
            required
          />
          <CredentialItem
            name="OpenAI API"
            description="For AI analysis of messages and commitments"
            icon="fa-brain"
            color="#E74C3C"
            required
          />
          <CredentialItem
            name="Telegram Bot"
            description="For sending morning notifications"
            icon="fa-paper-plane"
            color="#0088cc"
            optional
          />
          <CredentialItem
            name="Slack API"
            description="Alternative notification channel"
            icon="fa-hashtag"
            color="#4A154B"
            optional
          />
          <CredentialItem
            name="Google Sheets"
            description="For storing and tracking follow-up history"
            icon="fa-table"
            color="#0F9D58"
            optional
          />
        </div>
      </div>
    </div>
  );
}

function CredentialItem({ name, description, icon, color, required, optional }: {
  name: string;
  description: string;
  icon: string;
  color: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <i className={`fa-solid ${icon} text-sm`} style={{ color }}></i>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      {required && (
        <span className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/30">
          Required
        </span>
      )}
      {optional && (
        <span className="px-2 py-0.5 rounded text-xs bg-slate-500/20 text-slate-400 border border-slate-500/30">
          Optional
        </span>
      )}
    </div>
  );
}
