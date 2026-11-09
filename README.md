# n8n Follow-Up Checker Workflow

> 🤖 An automated n8n workflow that continuously collects emails, WhatsApp messages, and call logs — then sends you a smart morning summary at 06:00 AM with all unfinished commitments, missed follow-ups, and missed calls.

![n8n](https://img.shields.io/badge/n8n-Workflow_Editor-FF6D5A?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🔄 **Continuous Data Collection** — Runs every 5 minutes, 24/7
- 📧 **Email Monitoring** — Checks unread emails from the last 6 hours
- 💬 **WhatsApp Tracking** — Monitors WhatsApp messages for pending conversations
- 📞 **Missed Call Detection** — Logs all missed calls for callback reminders
- 🧠 **AI-Powered Analysis** — Uses GPT-4 to identify unfinished commitments & follow-ups
- 🔔 **Smart Notifications** — Morning summary at 06:00 AM via Telegram/Slack/Email
- 📊 **History Tracking** — Stores all data in Google Sheets for long-term tracking
- 🎯 **Priority System** — Categorizes items as High/Medium/Low urgency

## 🏗️ How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                    Schedule Trigger (5 min)                      │
└──────────────┬──────────────────┬──────────────────┬────────────┘
               │                  │                  │
        ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
        │   Emails    │   │  WhatsApp   │   │ Call Logs   │
        │  (6hr look) │   │  (6hr look) │   │  (6hr look) │
        └──────┬──────┘   └──────┬──────┘   └──────┬──────┘
               │                  │                  │
               └──────────────────┼──────────────────┘
                                  │
                          ┌───────▼───────┐
                          │  Merge Data   │
                          └───────┬───────┘
                                  │
                          ┌───────▼───────┐
                          │  AI Analysis  │
                          │   (GPT-4)     │
                          └───────┬───────┘
                                  │
                          ┌───────▼───────┐
                          │  Time Gate    │
                          │  (06:00 AM)   │
                          └───┬───────┬───┘
                              │       │
                    ┌─────────▼─┐   ┌─▼──────────┐
                    │  Notify   │   │   Store     │
                    │ Telegram/ │   │   Google    │
                    │  Slack    │   │   Sheets    │
                    └───────────┘   └────────────┘
```

### The Two-Phase Approach

| Phase | Frequency | Purpose |
|-------|-----------|---------|
| **Data Collection** | Every 5 minutes | Silently collects emails, WhatsApp, calls |
| **Notification** | Once daily at 06:00 AM | Sends smart morning summary |

## 🚀 Quick Start

### Prerequisites

- [n8n](https://n8n.io) instance (self-hosted or cloud)
- Gmail account with OAuth2 or IMAP access
- WhatsApp Business API or Twilio account
- OpenAI API key
- Telegram Bot (for notifications)
- Google account (for Sheets integration)

### Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/n8n-followup-checker.git
   cd n8n-followup-checker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the workflow builder UI:**
   ```bash
   npm run dev
   ```

4. **Import the workflow into n8n:**
   - Open the web UI → Go to "Import JSON" tab
   - Download the JSON file or copy the code
   - In n8n: Workflows → Import from File
   - Replace credential IDs with your own

## 📋 Setup Guide

### Step 1: Configure n8n

```bash
# Docker (recommended)
docker run -d --name n8n -p 5678:5678 \
  -e GENERIC_TIMEZONE="Your/Timezone" \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n

# Or use npx
npx n8n
```

### Step 2: Set Up Credentials

| Service | Purpose | Setup Guide |
|---------|---------|-------------|
| Gmail OAuth2 | Read emails | [Google Cloud Console](https://console.cloud.google.com) |
| WhatsApp Business API | Read messages | [Meta Business](https://business.facebook.com) |
| Phone System API | Missed calls | Twilio / Google Voice / CRM |
| OpenAI API | AI analysis | [platform.openai.com](https://platform.openai.com) |
| Telegram Bot | Notifications | Message @BotFather on Telegram |
| Google Sheets | Data storage | [Google Sheets API](https://developers.google.com/sheets) |

### Step 3: Import & Activate

1. Download `follow-up-checker-workflow.json` from the web UI
2. Import into n8n
3. Connect all credentials
4. Test each node individually
5. Activate the workflow

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Vite | Build tool |
| Font Awesome | Icons |

## 📁 Project Structure

```
n8n-followup-checker/
├── src/
│   ├── App.tsx                    # Main application
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── WorkflowDiagram.tsx    # Visual workflow diagram
│   │   ├── NodeDetails.tsx        # Node configuration details
│   │   ├── WorkflowJSON.tsx       # Importable JSON viewer
│   │   └── SetupGuide.tsx         # Step-by-step setup guide
│   └── data/
│       └── workflowData.ts        # Workflow nodes & JSON config
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
├── .gitignore
├── LICENSE
└── README.md
```

## ⚙️ Configuration

### Changing the Notification Time

Edit the Time Gate node condition in the workflow JSON:

```javascript
// Default: 06:00 AM
{{ $now.hour === 6 && $now.minute < 5 }}

// Change to 08:00 AM:
{{ $now.hour === 8 && $now.minute < 5 }}

// Multiple times (06:00 and 18:00):
{{ ($now.hour === 6 || $now.hour === 18) && $now.minute < 5 }}
```

### Changing the Collection Interval

Edit the Schedule Trigger node:

```javascript
// Default: Every 5 minutes
interval: 5, unit: "minutes"

// Change to every 15 minutes:
interval: 15, unit: "minutes"

// Change to every hour:
interval: 1, unit: "hours"
```

### Cost Optimization

| Approach | Savings | Trade-off |
|----------|---------|-----------|
| Move AI after Time Gate | ~95% cost reduction | AI only runs at 06:00 |
| Use GPT-3.5-turbo | ~90% cost reduction | Slightly less accurate |
| Increase interval to 30min | ~83% fewer API calls | Less granular data |

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [n8n](https://n8n.io) — The amazing workflow automation platform
- [OpenAI](https://openai.com) — For GPT-4 API
- [Font Awesome](https://fontawesome.com) — For the icons

## 📞 Support

- 🐛 Found a bug? [Open an issue](https://github.com/YOUR_USERNAME/n8n-followup-checker/issues)
- 💡 Have a feature idea? [Start a discussion](https://github.com/YOUR_USERNAME/n8n-followup-checker/discussions)
- 📖 Need help? Check the [Setup Guide](#-setup-guide) above

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!**

Made with ❤️ for productivity enthusiasts

</div>
