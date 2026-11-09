export default function SetupGuide() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <i className="fa-solid fa-rocket text-green-400 text-lg mt-0.5"></i>
          <div>
            <h3 className="font-semibold text-green-300">Complete Setup Guide</h3>
            <p className="text-sm text-slate-300 mt-1">
              Follow these steps to set up your automated follow-up checker that runs 24/7 but only notifies you at 06:00 AM.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step */}
      <div className="space-y-4">
        <StepCard
          number={1}
          title="Install & Configure n8n"
          icon="fa-server"
          color="#FF6D5A"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Set up n8n using one of these methods:</p>
            <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-xs">
              <p className="text-green-400"># Option 1: Docker (Recommended)</p>
              <p className="text-slate-400">docker run -d --name n8n -p 5678:5678 \</p>
              <p className="text-slate-400">&nbsp;&nbsp;-v n8n_data:/home/node/.n8n \</p>
              <p className="text-slate-400">&nbsp;&nbsp;n8nio/n8n</p>
              <p className="text-slate-400 mt-2"></p>
              <p className="text-green-400"># Option 2: npx (Quick start)</p>
              <p className="text-slate-400">npx n8n</p>
              <p className="text-slate-400 mt-2"></p>
              <p className="text-green-400"># Option 3: n8n Cloud</p>
              <p className="text-slate-400">Sign up at https://app.n8n.cloud</p>
            </div>
          </div>
        </StepCard>

        <StepCard
          number={2}
          title="Set Up Gmail Credentials"
          icon="fa-envelope"
          color="#4A90D9"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Configure Gmail to read your emails:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Go to Google Cloud Console → Create a project</li>
              <li>Enable Gmail API</li>
              <li>Create OAuth 2.0 credentials (Desktop App)</li>
              <li>Download the credentials JSON</li>
              <li>In n8n: Credentials → New → Gmail OAuth2</li>
              <li>Paste your Client ID and Client Secret</li>
              <li>Connect and authorize</li>
            </ol>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-yellow-300">
                <i className="fa-solid fa-triangle-exclamation mr-1"></i>
                <strong>Tip:</strong> If using a work email, you may need admin approval for the OAuth app.
                Alternatively, use IMAP credentials with an App Password.
              </p>
            </div>
          </div>
        </StepCard>

        <StepCard
          number={3}
          title="Set Up WhatsApp Integration"
          icon="fa-whatsapp"
          color="#25D366"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Choose one of these WhatsApp integration methods:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <h4 className="text-xs font-bold text-green-400 mb-2">Option A: WhatsApp Business API</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Register as Meta Business</li>
                  <li>• Create WhatsApp Business Account</li>
                  <li>• Get Phone Number ID & Token</li>
                  <li>• Use HTTP Request node in n8n</li>
                </ul>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <h4 className="text-xs font-bold text-green-400 mb-2">Option B: Twilio WhatsApp</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>• Sign up for Twilio</li>
                  <li>• Enable WhatsApp Sandbox</li>
                  <li>• Get Account SID & Auth Token</li>
                  <li>• Use Twilio node in n8n</li>
                </ul>
              </div>
            </div>
          </div>
        </StepCard>

        <StepCard
          number={4}
          title="Set Up Call Log Access"
          icon="fa-phone"
          color="#9B59B6"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Connect to your phone system for missed call tracking:</p>
            <div className="space-y-2 mt-2">
              <IntegrationOption name="Google Voice" description="Use Google Voice API or scrape via Google Sheets integration" />
              <IntegrationOption name="Twilio" description="Use Twilio REST API to fetch call logs with status='no-answer'" />
              <IntegrationOption name="HubSpot CRM" description="If calls are logged in HubSpot, use the CRM integration" />
              <IntegrationOption name="Custom Webhook" description="Set up a webhook from your phone system to push call data" />
            </div>
          </div>
        </StepCard>

        <StepCard
          number={5}
          title="Configure OpenAI for AI Analysis"
          icon="fa-brain"
          color="#E74C3C"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Set up AI-powered analysis of your communications:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Get an API key from <a href="https://platform.openai.com" className="text-blue-400 underline">platform.openai.com</a></li>
              <li>In n8n: Credentials → New → OpenAI API</li>
              <li>Paste your API key</li>
              <li>The workflow uses GPT-4 for best results (can use GPT-3.5-turbo to save costs)</li>
            </ol>
            <div className="bg-slate-900/50 rounded-lg p-3 mt-3">
              <p className="text-xs text-slate-400 font-mono">
                <span className="text-green-400">Estimated cost:</span> ~$0.01-0.05 per analysis cycle<br />
                <span className="text-green-400">Daily cost (288 cycles):</span> ~$3-15/day<br />
                <span className="text-green-400">Tip:</span> Use the time gate to only run AI at 06:00 to save costs!
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-orange-300">
                <i className="fa-solid fa-lightbulb mr-1"></i>
                <strong>Cost Optimization:</strong> Move the AI Analysis node AFTER the time gate so it only runs once per day at 06:00 instead of every 5 minutes. The raw data is already stored in Google Sheets from each cycle.
              </p>
            </div>
          </div>
        </StepCard>

        <StepCard
          number={6}
          title="Set Up Notification Channel"
          icon="fa-bell"
          color="#E67E22"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Choose where to receive your morning summary:</p>
            <div className="space-y-3 mt-2">
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <h4 className="text-sm font-bold text-blue-400 mb-2">
                  <i className="fa-brands fa-telegram mr-2"></i>
                  Telegram (Recommended)
                </h4>
                <ol className="text-xs text-slate-400 list-decimal list-inside space-y-1">
                  <li>Message @BotFather on Telegram</li>
                  <li>Create a new bot with /newbot</li>
                  <li>Save the bot token</li>
                  <li>Message your bot to get your Chat ID</li>
                  <li>In n8n: Add Telegram credentials with bot token</li>
                </ol>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <h4 className="text-sm font-bold text-purple-400 mb-2">
                  <i className="fa-brands fa-slack mr-2"></i>
                  Slack
                </h4>
                <ol className="text-xs text-slate-400 list-decimal list-inside space-y-1">
                  <li>Create a Slack App at api.slack.com</li>
                  <li>Add Bot Token Scopes: chat:write, channels:read</li>
                  <li>Install to your workspace</li>
                  <li>In n8n: Add Slack OAuth2 credentials</li>
                </ol>
              </div>
            </div>
          </div>
        </StepCard>

        <StepCard
          number={7}
          title="Configure the Time Gate (06:00 AM)"
          icon="fa-clock"
          color="#1ABC9C"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>The time gate ensures notifications only go out at 06:00 AM:</p>
            <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-xs mt-2">
              <p className="text-green-400">// IF Node Condition:</p>
              <p className="text-slate-400">Time: 06:00 - 06:05</p>
              <p className="text-slate-400 mt-2"></p>
              <p className="text-green-400">// Expression:</p>
              <p className="text-yellow-400">{"{{ $now.hour === 6 && $now.minute < 5 }}"}</p>
              <p className="text-slate-400 mt-2"></p>
              <p className="text-green-400">// This means:</p>
              <p className="text-slate-400">// - Data collection: Runs every 5 min (24/7)</p>
              <p className="text-slate-400">// - Storage: Runs every 5 min (24/7)</p>
              <p className="text-slate-400">// - Notification: Only at 06:00 AM</p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-blue-300">
                <i className="fa-solid fa-info-circle mr-1"></i>
                <strong>Timezone:</strong> Make sure your n8n instance timezone matches your local timezone.
                Set it in n8n Settings → Timezone, or in the workflow settings.
              </p>
            </div>
          </div>
        </StepCard>

        <StepCard
          number={8}
          title="Import & Activate the Workflow"
          icon="fa-play"
          color="#27AE60"
        >
          <div className="space-y-3 text-sm text-slate-300">
            <p>Final steps to get everything running:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-400">
              <li>Go to the "Import JSON" tab and download the workflow file</li>
              <li>In n8n: Workflows → Import from File</li>
              <li>Open each node and connect your credentials</li>
              <li>Replace all "REPLACE_WITH_YOUR_CREDENTIAL_ID" values</li>
              <li>Test each node individually (click "Execute Node")</li>
              <li>Run the full workflow once to verify</li>
              <li>Toggle the workflow to "Active" (top right switch)</li>
            </ol>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mt-3">
              <p className="text-xs text-green-300">
                <i className="fa-solid fa-check-circle mr-1"></i>
                <strong>Done!</strong> Your workflow will now collect data continuously and send you a morning summary at 06:00 AM every day.
              </p>
            </div>
          </div>
        </StepCard>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-diagram-project text-orange-400"></i>
          Architecture Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <i className="fa-solid fa-database text-blue-400 text-xl"></i>
            </div>
            <h4 className="font-semibold text-white text-sm">Data Layer</h4>
            <p className="text-xs text-slate-400 mt-1">Emails, WhatsApp, Calls collected every 5 min</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
              <i className="fa-solid fa-brain text-red-400 text-xl"></i>
            </div>
            <h4 className="font-semibold text-white text-sm">Intelligence Layer</h4>
            <p className="text-xs text-slate-400 mt-1">GPT-4 analyzes for commitments & follow-ups</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <i className="fa-solid fa-bell text-green-400 text-xl"></i>
            </div>
            <h4 className="font-semibold text-white text-sm">Notification Layer</h4>
            <p className="text-xs text-slate-400 mt-1">Morning summary at 06:00 via Telegram/Slack</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <i className="fa-solid fa-circle-question text-purple-400"></i>
          Common Questions
        </h3>
        <div className="space-y-4">
          <FAQItem
            question="Why collect data every 5 minutes if I only need a morning report?"
            answer="Collecting frequently ensures you don't miss any messages. The 6-hour lookback window means at 06:00 AM, you see everything from midnight to 6 AM. If you only need morning reports, you can simplify to run once at 06:00 with a 6-hour lookback."
          />
          <FAQItem
            question="Can I change the notification time?"
            answer="Yes! Simply modify the Time Gate condition. Change '$now.hour === 6' to your preferred hour (e.g., '$now.hour === 8' for 8 AM). You can also add multiple time gates for different notification times."
          />
          <FAQItem
            question="How do I handle different timezones?"
            answer="Set your n8n instance timezone in Settings → General → Timezone. The $now variable respects this setting. If you're using n8n cloud, set it in the workflow settings under 'Timezone'."
          />
          <FAQItem
            question="Can I add more data sources?"
            answer="Absolutely! You can add nodes for SMS (Twilio), calendar events (Google Calendar), task managers (Todoist, Notion), or any other communication channel. Just add them in parallel with the existing data sources."
          />
          <FAQItem
            question="What if I don't want to use AI?"
            answer="You can replace the AI Analysis node with simple filters. Use IF nodes to check for keywords like 'promise', 'will send', 'follow up', 'ASAP', etc. It won't be as smart but will work without API costs."
          />
        </div>
      </div>
    </div>
  );
}

function StepCard({ number, title, icon, color, children }: {
  number: number;
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b border-slate-700/50">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {number}
        </div>
        <i className={`fa-solid ${icon}`} style={{ color }}></i>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

function IntegrationOption({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-slate-900/30 rounded-lg">
      <i className="fa-solid fa-check-circle text-green-500 text-xs"></i>
      <div>
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-xs text-slate-400 ml-2">— {description}</span>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-slate-700/50 pb-4 last:border-0 last:pb-0">
      <h4 className="text-sm font-semibold text-slate-200 mb-1">
        <i className="fa-solid fa-chevron-right text-orange-400 text-xs mr-2"></i>
        {question}
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed pl-5">{answer}</p>
    </div>
  );
}
