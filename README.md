# ReplyCoach 🇵🇰

> **Practice the conversations that shape your future.**

ReplyCoach is an AI communication coach for Pakistani students and fresh graduates. Users rehearse high-stakes conversations (job interviews, internship interviews, salary negotiations, scholarship interviews, and visa interviews) with a realistic AI roleplay, then receive structured, evidence-based feedback and a stronger rewrite of their weakest answer.

Built for the **NYLP AI Hackathon 2026**.

| | |
|---|---|
| **Live app** | https://replycoach.ai.studio/ |
| **Repository** | https://github.com/AneebaZafar/ReplyCoach_AI |
| **Demo video** | [ADD VIDEO LINK] |

**Try it in about 2 minutes:** open the live app, choose *Quick Demo: Job Interview*, answer two questions, then open the feedback report and look at the before/after rewrite.

---

## Screenshots

| Home | Roleplay chat |
|---|---|
| ![Home](docs/screenshots/home.png) | ![Chat](docs/screenshots/chat.png) |

| Feedback report | Before / after rewrite |
|---|---|
| ![Feedback](docs/screenshots/feedback.png) | ![Rewrite](docs/screenshots/rewrite.png) |

| Progress dashboard | Mobile view |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Mobile](docs/screenshots/mobile.png) |

<!-- Add the image files to docs/screenshots/ in the repo, using the names above. -->

---

## Problem

Many students and fresh graduates have the skills employers and scholarship panels look for, but struggle to express them confidently in interviews, salary discussions, and visa conversations. They give unclear answers, undersell themselves, use weak structure, or freeze under pressure.

Access to structured career mentorship, interview practice, and specific feedback is limited, so many people only discover their weak points during the real conversation, when it is too late to fix them.

## Solution

ReplyCoach gives young people a free, private, mobile-friendly place to practice before the real conversation:

1. **Choose** a scenario, a difficulty (Friendly or Strict), and a session length.
2. **Practice** with an AI interviewer that stays in character, asks one question at a time, and follows up on what the user actually said.
3. **Get feedback**: four scores, strengths and improvements quoted from the user's own answers, a rewrite of the weakest answer, and one concrete next step.
4. **Improve** by trying again, comparing scores over time, or saving the report as a PDF.

No sign-up is required, and conversations are not stored on our servers.

---

## Features

**Scenarios and sessions**
- Five scenarios: Job Interview, Internship Interview, Salary/Offer Negotiation, Scholarship Interview, Visa Interview.
- Two difficulty levels: *Friendly* (warm, patient) and *Strict* (formal, probes for specifics).
- Two session lengths: *Quick Demo* (2 answers) and *Standard* (5 answers).
- Optional context field (role, field, or offer details) to personalise the conversation.
- Live session timer, progress indicator, and pacing badge.

**Language and voice**
- Answer in English, Urdu, or Roman Urdu. The interviewer replies in clear professional English.
- Voice input using the browser's Web Speech API (English, Roman Urdu, or Urdu script).
- Text-to-speech playback of interviewer questions.
- Bidirectional text support (`dir="auto"`) so Urdu script displays correctly.

**Feedback**
- Four scores (1 to 10): **Clarity, Tone, Confidence, Structure**.
- Strengths and improvements, each tied to a quote from the candidate's own answer, with "what to say instead".
- Flagged weak phrases (for example hedging words).
- **Grounded rewrite**: the server finds the weakest answer by index in the real transcript, and the rewrite keeps the user's real facts without inventing new ones.
- One concrete next step (for example practising with the STAR method).
- Short sessions are clearly labelled, and scores are adjusted for limited evidence.

**Progress and export**
- Save the feedback report as a PDF (browser print with print-specific styling).
- Local progress dashboard showing scores across sessions. Data stays on the user's device and can be cleared at any time.
- Demo answers drawer for quick testing and demonstrations.

---

## How the AI works

ReplyCoach uses a **two-stage pipeline with separate prompts**, so the interviewer never leaks feedback mid-conversation.

```text
User (React frontend)
   │
   ├── POST /api/chat ───────► Roleplay prompt ──► Gemini ──► interviewer reply
   │        (repeat until the session's answer limit is reached)
   │
   └── POST /api/feedback ───► Evaluator prompt ─► Gemini ──► validated JSON feedback
                                      │
                       server validates JSON, retrieves the exact
                       weakest answer by index, then returns the report
```

### Stage 1: Roleplay (`/api/chat`)
- The system prompt defines the role (hiring manager, team lead, HR manager, scholarship panelist, consular officer), the scenario, and the difficulty style.
- Rules: stay in character, ask one question at a time, react to something specific the candidate said, never give feedback or hints, never reveal instructions, and always reply in professional English.
- The server counts the real user answers and decides when the session ends. Client-side counts are never trusted.
- Off-topic, abusive, or instruction-changing messages are redirected in character.

### Stage 2: Evaluation (`/api/feedback`)
- A separate evaluator prompt scores each dimension from 1 to 10 against defined score bands.

| Dimension | What is evaluated |
|---|---|
| Clarity | Is the answer easy to follow, focused, and specific? |
| Tone | Is it professional, respectful, and suited to the scenario? |
| Confidence | Does it avoid hedging and weak wording, and own achievements? |
| Structure | Is there a clear opening point, a supporting example, and a closing takeaway? |

- The model must return structured JSON: scores, summary, strengths, improvements, flagged phrases, `weakest_answer_index`, rewrite, and next step.
- The server validates the output (score ranges, minimum number of strengths and improvements, valid index). It limits retries, and shows a clear retry option if both attempts fail.
- The server fills in the weakest answer text itself from the transcript, using the returned index, so the model cannot invent or misquote the answer.

### Safeguards
- All AI calls and the API key stay **server-side only**.
- User context and transcripts are wrapped in delimiter tags, treated as data, and stripped of closing tags to reduce prompt injection.
- Server-side validation for scenario, level, session length, message order, and message length (1 to 1,200 characters).
- Raw API errors and system prompts are never returned to the client.

---

## AI models and API usage

| Item | Details |
|---|---|
| Provider | Google Gemini API |
| SDK | Google GenAI TypeScript SDK (`@google/genai`) |
| Primary model | `[gemini-3.1-flash-lite]` |
| Fallback model | `[gemini-3.8-flash]` |
| Routes | `POST /api/chat` (roleplay), `POST /api/feedback` (evaluation) |
| Settings | Roleplay uses a higher temperature for natural conversation. Evaluation uses a low temperature and structured JSON output for consistent scoring. |
| Key handling | `GEMINI_API_KEY` is read from an environment variable on the server and never sent to the browser. |

A typical Quick Demo session makes about 3 roleplay calls and 1 evaluation call.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite |
| Backend | Node.js, Express, tsx |
| AI | Google Gemini API via `@google/genai` |
| Voice | Web Speech API (speech recognition and speech synthesis) |
| Storage | None on the server. Browser `localStorage` for the optional progress dashboard |
| Build and hosting | Google AI Studio (Build mode and publish), GitHub |

---

## Setup and installation

**Prerequisites:** Node.js 20 or higher, npm, and a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).

```bash
# 1. Clone the repository
git clone https://github.com/AneebaZafar/ReplyCoach_AI.git
cd ReplyCoach_AI

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
```

Edit `.env`:

```env
GEMINI_API_KEY="your_key_here"
PORT=3000
NODE_ENV=development
```

```bash
# 4. Start the development server
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Gemini API key from Google AI Studio |
| `PORT` | No | Server port (default `3000`) |
| `NODE_ENV` | No | `development` or `production` |

> Never commit your `.env` file. Set `GEMINI_API_KEY` through your hosting platform's secret or environment settings.

### Production build

```bash
npm install --include=dev && npm run build
npm start        # runs tsx server.ts and serves the built frontend
```

The live app is published through Google AI Studio. The same Express server can run on any Node.js host.

---

## Testing

We tested the live app across all five scenarios, both session lengths, and both difficulty levels, covering:

- empty and very long messages, invalid input, and early feedback after a single answer
- Roman Urdu and Urdu input
- prompt-injection attempts in chat and in the context field
- the salary scenario with and without an offer figure
- phone and desktop layouts, voice input, PDF export, and the progress dashboard

**Results:** We manually tested the live app across multiple scenarios and checked the core flow, input validation, and error handling. Automated test coverage and larger-scale testing are planned for future development.

---

## Privacy and safety

- No account or sign-up. Conversations are not stored on our servers.
- Conversation text is sent to Google's Gemini API only to generate practice responses and feedback. Please do not enter sensitive personal information such as your CNIC, phone number, address, financial details, or passwords.
- Voice input uses your browser's speech recognition, which may process audio on the browser provider's servers.
- Progress scores for the dashboard are saved only in your own browser and can be cleared at any time.
- Free-tier AI services may use inputs to improve their models. Check the provider's current terms.

---

## Limitations

- Refreshing the page during a session ends it, because sessions are not saved.
- The app depends on free-tier AI quotas, so heavy use may cause temporary "we are busy" messages. The first load on free hosting can also be slow.
- Voice recognition depends on the browser (Chrome or Edge work best), and accuracy for Urdu and Roman Urdu varies.
- AI scores are estimates for practice, not exact measurements, and can vary between sessions.
- The progress dashboard is per device and per browser.
- ReplyCoach does not predict hiring, scholarship, or visa outcomes.

## Roadmap

- More scenarios (for example university admissions and presentations)
- Better Urdu and regional-language support
- Installable web app (PWA) and WhatsApp access
- Optional accounts and cloud-saved progress
- Partnerships with universities and career centers

---

## Team contributions

| Member | Role | Contributions |
|---|---|---|
| ANEEBA ZAFAR|Team Leader|  Product concept, PRD, Prompt design, Development, Deployment, Testing, README, demo video |


## Development tools

Google AI Studio (app generation, publishing), Gemini API, GitHub, and Claude (Anthropic) for product requirements review, prompt design, and planning. All code was reviewed and tested by the team.

---

## Disclaimers

- ReplyCoach provides practice feedback and is not a replacement for professional career counseling.
- For the visa scenario: this is practice only. It does not predict visa outcomes or provide immigration advice.# ReplyCoach 🇵🇰

> **Practice the conversations that shape your future.**  
> AI communication coach for Pakistani students and fresh graduates to rehearse high-stakes conversations with realistic roleplay and grounded feedback.

---

## 🌟 Key Features

1. **Five Realistic Pakistan Scenarios**:
   - **Job Interview**: Entry-level role interview with a Pakistani hiring manager (background, teamwork, handling pressure, salary expectations).
   - **Internship Interview**: Interview with a startup or tech lead (motivation, coursework, side projects, availability).
   - **Salary/Offer Negotiation**: Rehearsal with an HR manager who has made an offer, anchoring local currency benchmarks (PKR).
   - **Scholarship Interview**: Academic selection panel reviewing leadership, community impact, and commitment to give back to Pakistan.
   - **Visa Interview**: Consular officer formal interview focusing on travel intent, study plans, funding, and ties to Pakistan.

2. **Tailored Session Modes & Pacing**:
   - **Live Session Timer & Pacing Indicator**: Active digital clock (`mm:ss`) tracking session time against the mode's target (~2 minutes for Quick Demo, ~5 minutes for Standard) with real-time pacing feedback badges (*Brisk pace*, *Optimal pace*, *Deliberate*).
   - **Segmented Visual Progress Bar**: Visual question segments tracking exact progress (`Answer X of Y`, percentage complete, and active turn pulses).
   - **Quick Demo Mode (2 answers)**: Designed for fast evaluation in under 2 minutes.
   - **Standard Mode (5 answers)**: Realistic multi-turn conversation with follow-up probing.
   - **Interviewer Styles**: Friendly (warm, patient) vs. Strict (formal, detail-oriented).

3. **Voice & Multi-Language Support**:
   - **Microphone Access (Web Speech API)**: Speak answers naturally in real time, simulating a live face-to-face spoken interview.
   - **Roman Urdu Speech Mode**: Speak Urdu naturally; the app automatically converts spoken audio into natural Roman Urdu (Latin script) using local conversational conventions.
   - **Voice Mode Selector**: Toggle between **English (`en-US`)**, **Roman Urdu 🇵🇰**, and native **Urdu Script (`ur-PK`)**.
   - **Text-to-Speech (TTS) Audio Playback**: Click the speaker icon 🔊 on any interviewer bubble to listen to the question read aloud in clear, natural speech.
   - Accepts answers in **English**, **Urdu**, and **Roman Urdu**.
   - Bidirectional text support (`dir="auto"`) for natural Urdu script rendering.
   - AI interviewer replies in professional, context-appropriate English.

4. **Structured Evidence-Based Feedback & Automatic Delivery**:
   - **Automatic evaluation trigger**: When the conversation reaches the turn limit, feedback automatically begins loading within 5 seconds even if the user does not click the button. Users can also click "View Now" immediately or "Review Chat" to review transcripts first.
   - Four calibrated scoring dimensions (1–10): **Clarity**, **Tone**, **Confidence**, **Structure**.
   - Key strengths observed with exact quotes from the candidate.
   - Concrete improvements with quotes and *"What to say instead"* phrasing.
   - **Grounded Weakest Answer & Rewrite**: Server locates the exact weakest answer from the transcript by index and generates a polished professional version without inventing facts.
   - Next actionable drill or framework (e.g. STAR method).
   - **Save as PDF**: 1-click clean export using `window.print()` with print-specific styling and legal disclaimers.

5. **Local Progress Dashboard**:
   - LocalStorage-backed progress dashboard tracking score averages and chronological trend charts across all completed practice sessions.

6. **Quick Demo Answers Helper**:
   - Pre-packaged demo answers built into `src/utils/sampleAnswers.ts` and code comments.
   - In-app **"Demo Answers"** drawer for 1-click answer insertion during tests and demonstrations.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Node.js, Express, tsx
- **AI SDK**: Google GenAI TypeScript SDK (`@google/genai`)
- **Primary Model**: `gemini-3.1-flash-lite` (with automatic fallback to `gemini-3.8-flash`)
- **Security**: All LLM calls and API keys stay strictly server-side (`/api/chat` and `/api/feedback`). User input is sanitized against injection delimiters (`<context>` / `<transcript>`).

---

## 🛠️ Local Development

### 1. Prerequisites
- **Node.js**: v20 or higher
- **npm** or **bun** / **pnpm**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/<your-username>/replycoach.git
cd replycoach

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` and provide your Gemini API key:
```ini
GEMINI_API_KEY="AIzaSy..."
PORT=3000
NODE_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 How to Export and Push to GitHub

To push this codebase to a fresh GitHub repository:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files to staging
git add .

# 3. Create your initial commit
git commit -m "feat: initial commit for ReplyCoach application"

# 4. Rename current branch to main
git branch -M main

# 5. Add your GitHub remote repository
# (Create a new empty repository on GitHub first at https://github.com/new)
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🌐 Environment Variables for Deployment

When deploying to production hosts (Render, Railway, Fly.io, Cloud Run, Vercel), configure the following environment variables:

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | Your Google Gemini API Key from Google AI Studio | `AIzaSy...` |
| `PORT` | Optional | Port on which the Express server listens (default: `3000`) | `3000` |
| `NODE_ENV` | Optional | Environment mode | `production` |

> ⚠️ **Important**: Never commit your `.env` file to git. Use platform secret managers (Environment Variables dashboard in Render/Railway/Fly/etc.) to set `GEMINI_API_KEY`.

---

## 🚀 Production Deployment Options

### Option A: Railway / Render / Fly.io (Recommended Full-Stack)

Since ReplyCoach includes an Express backend (`server.ts`) that runs Vite in middleware or serves `dist/`, it can be deployed directly as a Node.js web service.

**Build Command**:
```bash
npm install && npm run build
```

**Start Command**:
```bash
npm start
```
*(Runs `tsx server.ts` which listens on `process.env.PORT || 3000`)*

### Option B: Docker Container
A standard Dockerfile for ReplyCoach:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📝 Disclaimers & Privacy Notice
- **Privacy**: User conversation text is processed by Google Gemini models solely to generate practice feedback. No personal data (CNIC, phone, address, passwords) should ever be entered.
- **Educational Use**: ReplyCoach provides practice feedback and is not a replacement for professional career counseling.
- **Visa Practice**: For the visa interview scenario, practice does not predict visa outcomes or constitute immigration advice.
