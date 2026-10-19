# ReplyCoach 🇵🇰

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
