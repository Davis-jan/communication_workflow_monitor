export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  icon: string;
  color: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

export interface WorkflowConnection {
  from: string;
  to: string;
  label?: string;
}

export const workflowNodes: WorkflowNode[] = [
  {
    id: "schedule-trigger",
    name: "Schedule Trigger",
    type: "trigger",
    icon: "fa-clock",
    color: "#FF6D5A",
    description: "Runs the workflow continuously (every 5 minutes) to collect data, but only sends notifications at 06:00 AM",
    config: {
      rule: "everyX",
      interval: 5,
      unit: "minutes",
      note: "Continuous data collection - silent mode until 06:00"
    },
    position: { x: 50, y: 200 }
  },
  {
    id: "email-check",
    name: "Check Emails",
    type: "action",
    icon: "fa-envelope",
    color: "#4A90D9",
    description: "Fetches unread emails from the last 6 hours using Gmail/IMAP node",
    config: {
      node: "Gmail / IMAP",
      operation: "getAll",
      filters: {
        read: false,
        receivedAfter: "={{ $now.minus(6, 'hours') }}"
      },
      credentials: "Gmail OAuth2 or IMAP"
    },
    position: { x: 280, y: 80 }
  },
  {
    id: "whatsapp-check",
    name: "Check WhatsApp",
    type: "action",
    icon: "fa-whatsapp",
    color: "#25D366",
    description: "Retrieves WhatsApp messages from the last 6 hours using WhatsApp Business API",
    config: {
      node: "HTTP Request / WhatsApp Business API",
      operation: "getMessages",
      filters: {
        timeRange: "last 6 hours",
        status: "unread"
      },
      credentials: "WhatsApp Business API Token"
    },
    position: { x: 280, y: 200 }
  },
  {
    id: "calllog-check",
    name: "Check Call Logs",
    type: "action",
    icon: "fa-phone",
    color: "#9B59B6",
    description: "Checks missed calls from the last 6 hours via phone integration or CRM",
    config: {
      node: "HTTP Request / CRM Integration",
      operation: "getMissedCalls",
      filters: {
        status: "missed",
        timeRange: "last 6 hours"
      },
      credentials: "Phone System API / CRM API"
    },
    position: { x: 280, y: 320 }
  },
  {
    id: "merge-data",
    name: "Merge All Data",
    type: "action",
    icon: "fa-code-branch",
    color: "#F39C12",
    description: "Combines emails, WhatsApp messages, and call logs into a single dataset",
    config: {
      node: "Merge",
      mode: "combine",
      options: {
        mergeByPosition: true
      }
    },
    position: { x: 510, y: 200 }
  },
  {
    id: "ai-analysis",
    name: "AI Analysis",
    type: "action",
    icon: "fa-brain",
    color: "#E74C3C",
    description: "Uses OpenAI/GPT to analyze messages for unfinished commitments, promises, and follow-ups needed",
    config: {
      node: "OpenAI",
      model: "gpt-4",
      prompt: `Analyze these communications and identify:
1. Unfinished commitments (things promised but not delivered)
2. Missed follow-ups (conversations that need a response)
3. Action items with deadlines
4. Priority level (High/Medium/Low)

Format as structured JSON with categories.`,
      temperature: 0.3
    },
    position: { x: 740, y: 200 }
  },
  {
    id: "time-check",
    name: "Time Gate (06:00)",
    type: "filter",
    icon: "fa-filter",
    color: "#1ABC9C",
    description: "Only allows the workflow to proceed to notification at 06:00 AM. Data is collected continuously but notifications only go out in the morning.",
    config: {
      node: "IF / Code",
      condition: "={{ $now.hour === 6 && $now.minute < 5 }}",
      note: "Only triggers notification between 06:00-06:05"
    },
    position: { x: 970, y: 200 }
  },
  {
    id: "format-notification",
    name: "Format Summary",
    type: "action",
    icon: "fa-file-alt",
    color: "#3498DB",
    description: "Formats the AI analysis into a clean, readable notification with categories and priorities",
    config: {
      node: "Code",
      language: "javascript",
      code: `// Format the notification summary
const items = $input.all();
const summary = {
  missedFollowUps: items.filter(i => i.json.type === 'follow_up'),
  unfinishedCommitments: items.filter(i => i.json.type === 'commitment'),
  missedCalls: items.filter(i => i.json.type === 'missed_call'),
  urgentItems: items.filter(i => i.json.priority === 'high')
};
return [{ json: { summary, timestamp: new Date().toISOString() } }];`
    },
    position: { x: 1200, y: 120 }
  },
  {
    id: "send-notification",
    name: "Send Notification",
    type: "action",
    icon: "fa-bell",
    color: "#E67E22",
    description: "Sends the morning summary via Telegram, Slack, Email, or SMS",
    config: {
      node: "Telegram / Slack / Email",
      operation: "sendMessage",
      channels: ["Telegram", "Slack", "Email"],
      template: `🌅 Morning Follow-Up Report (06:00)
━━━━━━━━━━━━━━━━━━━━
📧 Emails needing response: {{count}}
💬 WhatsApp pending: {{count}}
📞 Missed calls: {{count}}
⚠️ Urgent items: {{count}}
━━━━━━━━━━━━━━━━━━━━
Details below...`
    },
    position: { x: 1430, y: 120 }
  },
  {
    id: "store-data",
    name: "Store for Tracking",
    type: "action",
    icon: "fa-database",
    color: "#2C3E50",
    description: "Stores collected data in Google Sheets/Airtable for tracking follow-up completion over time",
    config: {
      node: "Google Sheets / Airtable",
      operation: "append",
      fields: ["date", "type", "contact", "message", "status", "followed_up"],
      note: "Runs on every cycle to maintain history"
    },
    position: { x: 1200, y: 300 }
  }
];

export const workflowConnections: WorkflowConnection[] = [
  { from: "schedule-trigger", to: "email-check" },
  { from: "schedule-trigger", to: "whatsapp-check" },
  { from: "schedule-trigger", to: "calllog-check" },
  { from: "email-check", to: "merge-data" },
  { from: "whatsapp-check", to: "merge-data" },
  { from: "calllog-check", to: "merge-data" },
  { from: "merge-data", to: "ai-analysis" },
  { from: "ai-analysis", to: "time-check" },
  { from: "time-check", to: "format-notification", label: "06:00 AM ✓" },
  { from: "time-check", to: "store-data", label: "Always store" },
  { from: "format-notification", to: "send-notification" }
];

export const n8nWorkflowJSON = {
  name: "Follow-Up Checker - 6hr Collection + Morning Notification",
  nodes: [
    {
      parameters: {
        rule: {
          interval: [
            {
              field: "minutes",
              minutesInterval: 5
            }
          ]
        }
      },
      id: "schedule-trigger",
      name: "Schedule Trigger (Every 5 min)",
      type: "n8n-nodes-base.scheduleTrigger",
      typeVersion: 1.1,
      position: [220, 300]
    },
    {
      parameters: {
        operation: "getAll",
        filters: {
          readStatus: false,
          receivedAfter: "={{ $now.minus(6, 'hours').toISO() }}"
        },
        returnAll: true
      },
      id: "email-node",
      name: "Fetch Unread Emails (6hrs)",
      type: "n8n-nodes-base.gmail",
      typeVersion: 2.1,
      position: [460, 100],
      credentials: {
        gmailOAuth2: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "Gmail OAuth2"
        }
      }
    },
    {
      parameters: {
        method: "GET",
        url: "https://graph.facebook.com/v18.0/{{ $json.phoneNumberId }}/messages",
        authentication: "genericCredentialType",
        genericAuthType: "httpHeaderAuth",
        sendQuery: true,
        queryParameters: {
          parameters: [
            { name: "fields", value: "messages{from,message,timestamp}" },
            { name: "limit", value: "100" }
          ]
        }
      },
      id: "whatsapp-node",
      name: "Fetch WhatsApp Messages (6hrs)",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [460, 300],
      credentials: {
        httpHeaderAuth: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "WhatsApp Business API"
        }
      }
    },
    {
      parameters: {
        method: "GET",
        url: "https://api.your-phone-system.com/v1/calls",
        authentication: "genericCredentialType",
        genericAuthType: "httpHeaderAuth",
        sendQuery: true,
        queryParameters: {
          parameters: [
            { name: "status", value: "missed" },
            { name: "since", value: "={{ $now.minus(6, 'hours').toISO() }}" }
          ]
        }
      },
      id: "calllog-node",
      name: "Fetch Missed Calls (6hrs)",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 4.2,
      position: [460, 500],
      credentials: {
        httpHeaderAuth: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "Phone System API"
        }
      }
    },
    {
      parameters: {
        mode: "combine",
        combineBy: "combineAll"
      },
      id: "merge-node",
      name: "Merge All Data",
      type: "n8n-nodes-base.merge",
      typeVersion: 3,
      position: [700, 300]
    },
    {
      parameters: {
        resource: "chat",
        modelId: {
          __rl: true,
          value: "gpt-4",
          mode: "list"
        },
        messages: {
          values: [
            {
              role: "system",
              content: "You are a personal assistant that analyzes communications to find unfinished commitments, missed follow-ups, and action items. Return structured JSON."
            },
            {
              role: "user",
              content: "Analyze these communications from the last 6 hours and identify:\n1. Unfinished commitments (things promised but not delivered)\n2. Missed follow-ups (conversations that need a response)\n3. Missed calls that need callbacks\n4. Action items with deadlines\n5. Priority level for each (High/Medium/Low)\n\nReturn as JSON array with fields: type, contact, summary, priority, deadline, action_needed\n\nData: {{ $json }}"
            }
          ]
        },
        options: {
          temperature: 0.3,
          responseFormat: "json_object"
        }
      },
      id: "ai-node",
      name: "AI Analysis - Find Follow-ups",
      type: "@n8n/n8n-nodes-langchain.openAi",
      typeVersion: 1.5,
      position: [940, 300],
      credentials: {
        openAiApi: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "OpenAI API"
        }
      }
    },
    {
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            typeValidation: "strict"
          },
          conditions: [
            {
              id: "time-condition",
              leftValue: "={{ $now.hour }}",
              rightValue: "6",
              operator: {
                type: "number",
                operation: "equals"
              }
            },
            {
              id: "minute-condition",
              leftValue: "={{ $now.minute }}",
              rightValue: "5",
              operator: {
                type: "number",
                operation: "lt"
              }
            }
          ],
          combinator: "and"
        }
      },
      id: "time-gate",
      name: "Time Gate - Only at 06:00",
      type: "n8n-nodes-base.if",
      typeVersion: 2,
      position: [1180, 300]
    },
    {
      parameters: {
        jsCode: `// Format the morning notification summary
const aiResults = $input.first().json;
const items = JSON.parse(aiResults.choices?.[0]?.message?.content || '[]');

const missedFollowUps = items.filter(i => i.type === 'follow_up');
const commitments = items.filter(i => i.type === 'commitment');
const missedCalls = items.filter(i => i.type === 'missed_call');
const urgent = items.filter(i => i.priority === 'High');

let message = '🌅 *Morning Follow-Up Report*\\n';
message += '━━━━━━━━━━━━━━━━━━━━\\n\\n';

if (urgent.length > 0) {
  message += '🚨 *URGENT ITEMS*\\n';
  urgent.forEach(item => {
    message += \`  • \${item.contact}: \${item.summary}\\n\`;
  });
  message += '\\n';
}

if (missedFollowUps.length > 0) {
  message += '📋 *Missed Follow-Ups*\\n';
  missedFollowUps.forEach(item => {
    message += \`  • \${item.contact}: \${item.summary} [\${item.priority}]\\n\`;
  });
  message += '\\n';
}

if (commitments.length > 0) {
  message += '🤝 *Unfinished Commitments*\\n';
  commitments.forEach(item => {
    message += \`  • \${item.contact}: \${item.summary}\\n\`;
  });
  message += '\\n';
}

if (missedCalls.length > 0) {
  message += '📞 *Missed Calls*\\n';
  missedCalls.forEach(item => {
    message += \`  • \${item.contact} - \${item.summary}\\n\`;
  });
  message += '\\n';
}

message += '━━━━━━━━━━━━━━━━━━━━\\n';
message += \`Total items: \${items.length} | Urgent: \${urgent.length}\\n\`;
message += \`Generated at: \${new Date().toLocaleString()}\\n\`;

return [{ json: { message, itemCount: items.length, urgentCount: urgent.length } }];`
      },
      id: "format-node",
      name: "Format Morning Summary",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [1420, 180]
    },
    {
      parameters: {
        chatId: "REPLACE_WITH_YOUR_CHAT_ID",
        text: "={{ $json.message }}",
        additionalFields: {
          parse_mode: "Markdown"
        }
      },
      id: "telegram-node",
      name: "Send to Telegram",
      type: "n8n-nodes-base.telegram",
      typeVersion: 1.2,
      position: [1660, 100],
      credentials: {
        telegramApi: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "Telegram Bot"
        }
      }
    },
    {
      parameters: {
        chatId: "REPLACE_WITH_YOUR_CHAT_ID",
        text: "={{ $json.message }}",
        additionalFields: {
          parse_mode: "Markdown"
        }
      },
      id: "slack-node",
      name: "Send to Slack",
      type: "n8n-nodes-base.slack",
      typeVersion: 2.2,
      position: [1660, 260],
      credentials: {
        slackApi: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "Slack"
        }
      }
    },
    {
      parameters: {
        operation: "append",
        documentId: "REPLACE_WITH_SHEET_ID",
        sheetName: "FollowUpTracker",
        columns: {
          mappingMode: "defineBelow",
          value: {
            date: "={{ $now.toISO() }}",
            type: "={{ $json.type }}",
            contact: "={{ $json.contact }}",
            summary: "={{ $json.summary }}",
            priority: "={{ $json.priority }}",
            followed_up: "No"
          }
        }
      },
      id: "sheets-node",
      name: "Store in Google Sheets",
      type: "n8n-nodes-base.googleSheets",
      typeVersion: 4.4,
      position: [1420, 420],
      credentials: {
        googleSheetsOAuth2Api: {
          id: "REPLACE_WITH_YOUR_CREDENTIAL_ID",
          name: "Google Sheets"
        }
      }
    }
  ],
  connections: {
    "Schedule Trigger (Every 5 min)": {
      main: [
        [
          { node: "Fetch Unread Emails (6hrs)", type: "main", index: 0 },
          { node: "Fetch WhatsApp Messages (6hrs)", type: "main", index: 0 },
          { node: "Fetch Missed Calls (6hrs)", type: "main", index: 0 }
        ]
      ]
    },
    "Fetch Unread Emails (6hrs)": {
      main: [[{ node: "Merge All Data", type: "main", index: 0 }]]
    },
    "Fetch WhatsApp Messages (6hrs)": {
      main: [[{ node: "Merge All Data", type: "main", index: 1 }]]
    },
    "Fetch Missed Calls (6hrs)": {
      main: [[{ node: "Merge All Data", type: "main", index: 2 }]]
    },
    "Merge All Data": {
      main: [[{ node: "AI Analysis - Find Follow-ups", type: "main", index: 0 }]]
    },
    "AI Analysis - Find Follow-ups": {
      main: [[{ node: "Time Gate - Only at 06:00", type: "main", index: 0 }]]
    },
    "Time Gate - Only at 06:00": {
      main: [
        [
          { node: "Format Morning Summary", type: "main", index: 0 },
          { node: "Send to Telegram", type: "main", index: 0 },
          { node: "Send to Slack", type: "main", index: 0 }
        ],
        [{ node: "Store in Google Sheets", type: "main", index: 0 }]
      ]
    }
  },
  settings: {
    executionOrder: "v1"
  },
  staticData: null,
  tags: [],
  triggerCount: 0
};
