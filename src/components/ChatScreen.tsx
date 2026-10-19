/**
 * ============================================================================
 * PREPARED SAMPLE ANSWERS HELPER FOR QUICK DEMO TESTING
 * (Copy and paste any of these directly into the chat input or use the in-app helper)
 * ============================================================================
 *
 * 1. JOB INTERVIEW (Software Engineer / Entry-Level)
 * --------------------------------------------------
 * Answer #1 (Self Intro & Foundation):
 * "I recently graduated with a BS in Computer Science from FAST-NUCES. During my final year, I built an end-to-end MERN stack e-commerce web application with role-based authentication and unit tests in Jest. I am eager to apply my technical problem-solving skills to your engineering team as an Associate Software Engineer."
 *
 * Answer #2 (Handling Work Pressure & Deadlines):
 * "When our final semester demo deadline was unexpectedly moved up by two weeks, I broke our team backlog into critical path tickets, initiated daily 15-minute standups, and personally solved the Redis session bottleneck so our team delivered on time without compromising code quality."
 *
 * Answer #3 (Teamwork & Technical Disagreements):
 * "In our database course project, a teammate and I differed on whether to use MongoDB or PostgreSQL. Instead of debating abstractly, I benchmarked our write vs read workloads and demonstrated PostgreSQL's relational schema and ACID guarantees fit our financial module better, which won team agreement."
 *
 * Answer #4 (Career Vision & Growth):
 * "Over the next 2-3 years, I want to master scalable system design, contribute to high-concurrency microservices, and mentor incoming engineering interns."
 *
 * Answer #5 (Salary & Closing):
 * "Based on market benchmarks for fresh CS graduates in Lahore and my hands-on full-stack projects, I am targeting PKR 100,000 to 120,000 per month, though I am enthusiastic about the overall growth opportunity and mentorship here."
 *
 *
 * 2. INTERNSHIP INTERVIEW (Students & Early Grads)
 * -------------------------------------------------
 * Answer #1 (Motivation & Coursework):
 * "I am currently in my 6th semester studying Software Engineering at NUST. I have closely followed your company's logistics software products and want this summer internship to apply my React and TypeScript skills to real production features."
 *
 * Answer #2 (Independent Learning & Practical Projects):
 * "Outside coursework, I built an expense tracking mobile app using React Native and SQLite, which helped me understand offline state synchronization, responsive UI design, and debugging third-party libraries."
 *
 * Answer #3 (Availability & Learning Goals):
 * "I am available full-time for 8 to 10 weeks over the summer. My main goal is to learn your CI/CD deployment pipelines and receive direct code review feedback from senior engineers."
 *
 *
 * 3. SALARY / OFFER NEGOTIATION (HR Discussion)
 * ----------------------------------------------
 * Answer #1 (Validating Offer & Countering Constructively):
 * "Thank you so much for the offer letter of PKR 110,000. I am thrilled about the opportunity to join the engineering team. Given my hands-on production experience during my final year project and market rates for full-stack developers in Karachi, I was hoping for PKR 135,000. Is there flexibility within your compensation band?"
 *
 * Answer #2 (Collaborative Compromise & Non-Monetary Perks):
 * "I understand company budget constraints. If a base of 135,000 isn't feasible right now, could we agree on PKR 125,000 with a performance review in six months, or include health coverage and flexible hybrid work days?"
 *
 *
 * 4. SCHOLARSHIP INTERVIEW (Academic & Panel Review)
 * ---------------------------------------------------
 * Answer #1 (Academic Background & Research Intent):
 * "I completed my Bachelor's in Environmental Sciences with a 3.85 CGPA. My research focused on groundwater contamination in rural Sindh. This scholarship will enable me to pursue a Master's in Water Resource Management to design affordable solar-powered filtration units."
 *
 * Answer #2 (Leadership & Giveback to Pakistan):
 * "During college, I founded a clean-water student drive that installed five community filtration units serving 1,200 households. Upon completing my master's degree, I intend to return to Pakistan to work with the Ministry of Climate Change and local NGOs on scalable water conservation systems."
 *
 *
 * 5. VISA INTERVIEW (Consular Officer)
 * ------------------------------------
 * Answer #1 (Direct Purpose of Travel):
 * "I am traveling to the United States on an F-1 student visa to pursue a Master of Science in Computer Science at Purdue University starting Fall 2026."
 *
 * Answer #2 (Proof of Funding & Ties to Home Country):
 * "My program is funded through a combination of a 50% departmental graduate research assistantship and my parents' savings, as documented in my I-20 and bank statements. My family lives in Lahore, where my father runs an engineering consultancy, and I will return to Pakistan to join our university faculty and local industry upon completing my degree."
 *
 *
 * 6. ROMAN URDU DEMO ANSWERS (For testing Roman Urdu & voice mode)
 * -----------------------------------------------------------------
 * Roman Urdu Answer #1:
 * "Mera naam Ali hai aur maine FAST university se Computer Science mein degree complete ki hai. Mujhe aapki company ke software solutions bohot pasand aye aur main Junior Developer role ke liye apply kar raha hoon."
 *
 * Roman Urdu Answer #2:
 * "Job pressure ke waqt main kaam ko priorities mein divide karta hoon aur team ke sath clear communication rakhta hoon taake deadlines time par meet ho sakein."
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Clock,
  Loader2,
  ChevronLeft,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  BookOpen,
  Copy,
  Check,
} from 'lucide-react';
import { ScenarioId, DifficultyLevel, SessionMode, ChatMessage } from '../types.js';
import { urduToRomanUrdu } from '../utils/transliterate.js';
import { SAMPLE_ANSWERS_BY_SCENARIO } from '../utils/sampleAnswers.js';

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
}

const SpeechRecognitionConstructor =
  typeof window !== 'undefined'
    ? (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition
    : null;

interface ChatScreenProps {
  scenarioId: ScenarioId;
  scenarioTitle: string;
  mode: SessionMode;
  level: DifficultyLevel;
  context: string;
  onExit: () => void;
  onRequestFeedback: (messages: ChatMessage[]) => void;
  isFeedbackLoading: boolean;
}

export type SpeechMode = 'en-US' | 'ur-Roman' | 'ur-PK';

export const ChatScreen: React.FC<ChatScreenProps> = ({
  scenarioId,
  scenarioTitle,
  mode,
  level,
  context,
  onExit,
  onRequestFeedback,
  isFeedbackLoading,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isStillWorking, setIsStillWorking] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Web Speech API state
  const [isListening, setIsListening] = useState(false);
  const isListeningRef = useRef(false);
  const [speechLanguage, setSpeechLanguage] = useState<SpeechMode>('en-US');
  const speechLanguageRef = useRef<SpeechMode>('en-US');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const persistentTranscriptBufferRef = useRef<string>('');
  const currentSessionSpeechRef = useRef<string>('');
  const inputTextRef = useRef<string>('');

  useEffect(() => {
    speechLanguageRef.current = speechLanguage;
  }, [speechLanguage]);

  useEffect(() => {
    inputTextRef.current = inputText;
  }, [inputText]);

  // Text-To-Speech (SpeechSynthesis) state
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  // Sample Answers drawer state
  const [showSampleAnswers, setShowSampleAnswers] = useState(false);
  const [copiedSampleIdx, setCopiedSampleIdx] = useState<number | null>(null);
  const scenarioSampleAnswers = SAMPLE_ANSWERS_BY_SCENARIO[scenarioId] || [];

  const handleSelectSampleAnswer = (text: string) => {
    setInputText(text);
    inputTextRef.current = text;
    if (isListeningRef.current) {
      persistentTranscriptBufferRef.current = text.trim();
      currentSessionSpeechRef.current = '';
    }
    if (inputError) setInputError(null);
    setShowSampleAnswers(false);
  };

  const handleCopySampleAnswer = (text: string, idx: number) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSampleIdx(idx);
      setTimeout(() => setCopiedSampleIdx(null), 2000);
    }
  };

  // Auto-feedback countdown when interview concludes
  const [autoFeedbackCountdown, setAutoFeedbackCountdown] = useState<number | null>(null);
  const [isAutoFeedbackCancelled, setIsAutoFeedbackCancelled] = useState(false);
  const autoFeedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live Session Timer
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    if (isDone) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isDone]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Real user answers count
  const realUserCount = messages.filter((m) => m.role === 'user').length;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping, isStillWorking, isListening]);

  // Handle Speech Recognition cleanup on unmount
  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
      if (autoFeedbackTimerRef.current) {
        clearInterval(autoFeedbackTimerRef.current);
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-to-speech for Interviewer message
  const handleToggleSpeak = (text: string, index: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    setSpeakingIndex(index);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
      voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setSpeakingIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Initial call to get the interviewer's opening greeting and first question
  useEffect(() => {
    let isSubscribed = true;

    async function initConversation() {
      setIsAiTyping(true);
      setErrorMessage(null);
      setIsStillWorking(false);

      // Start 8-second "Still working..." timer
      timerRef.current = setTimeout(() => {
        if (isSubscribed) setIsStillWorking(true);
      }, 8000);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scenario: scenarioId,
            level,
            maxTurns: mode,
            context,
            messages: [],
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || 'The interviewer is having trouble. Please try again.');
        }

        const data = await response.json();
        if (isSubscribed) {
          setMessages([{ role: 'assistant', content: data.reply }]);
          setIsDone(Boolean(data.done));
        }
      } catch (err: unknown) {
        if (isSubscribed) {
          const msg = (err as Error).message || 'The interviewer is having trouble. Please try again.';
          setErrorMessage(msg);
        }
      } finally {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (isSubscribed) {
          setIsAiTyping(false);
          setIsStillWorking(false);
        }
      }
    }

    initConversation();

    return () => {
      isSubscribed = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scenarioId, level, mode, context]);

  // Auto-trigger feedback countdown when session is complete
  useEffect(() => {
    if (isDone && !isAutoFeedbackCancelled && !isFeedbackLoading && messages.length > 0) {
      setAutoFeedbackCountdown(5);
    }
  }, [isDone, isAutoFeedbackCancelled, isFeedbackLoading, messages.length]);

  useEffect(() => {
    if (autoFeedbackCountdown === null || isAutoFeedbackCancelled) return;

    if (autoFeedbackCountdown <= 0) {
      onRequestFeedback(messages);
      setAutoFeedbackCountdown(null);
      return;
    }

    autoFeedbackTimerRef.current = setTimeout(() => {
      setAutoFeedbackCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => {
      if (autoFeedbackTimerRef.current) clearTimeout(autoFeedbackTimerRef.current);
    };
  }, [autoFeedbackCountdown, isAutoFeedbackCancelled, messages, onRequestFeedback]);

  // Start or restart speech recognition instance
  const startRecognition = () => {
    if (!SpeechRecognitionConstructor || !isListeningRef.current) return;

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionConstructor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = speechLanguageRef.current === 'ur-Roman' ? 'ur-PK' : speechLanguageRef.current;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let sessionFinal = '';
        let sessionInterim = '';

        for (let i = 0; i < event.results.length; ++i) {
          const res = event.results[i];
          const transcript = res[0].transcript;
          if (res.isFinal) {
            sessionFinal += transcript + ' ';
          } else {
            sessionInterim += transcript;
          }
        }

        let processedFinal = sessionFinal.trim();
        let processedInterim = sessionInterim.trim();

        if (speechLanguageRef.current === 'ur-Roman') {
          if (processedFinal) processedFinal = urduToRomanUrdu(processedFinal);
          if (processedInterim) processedInterim = urduToRomanUrdu(processedInterim);
        }

        const currentSpeech = [processedFinal, processedInterim].filter(Boolean).join(' ');
        currentSessionSpeechRef.current = currentSpeech;

        // Append new speech recognition results to persistent transcript buffer
        const buffer = persistentTranscriptBufferRef.current.trim();
        const combined = buffer
          ? (currentSpeech ? `${buffer} ${currentSpeech}` : buffer)
          : currentSpeech;

        const bounded = combined.slice(0, 1200);
        setInputText(bounded);
        inputTextRef.current = bounded;
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          isListeningRef.current = false;
          setIsListening(false);
          setSpeechError('Microphone access was denied. Please allow microphone permissions in your browser.');
        } else if (event.error === 'no-speech' || event.error === 'aborted') {
          // Normal pause in speech or intentional restart - keep listening smoothly
        } else if (event.error === 'audio-capture') {
          isListeningRef.current = false;
          setIsListening(false);
          setSpeechError('No microphone detected. Please check your audio input device.');
        } else {
          if (!isListeningRef.current) {
            setSpeechError(`Speech recognition message (${event.error}). You can continue speaking or typing.`);
          }
        }
      };

      recognition.onend = () => {
        if (isListeningRef.current) {
          // A pause or stream timeout occurred — commit the current session speech into the persistent transcript buffer
          if (currentSessionSpeechRef.current.trim()) {
            const buffer = persistentTranscriptBufferRef.current.trim();
            const newSpeech = currentSessionSpeechRef.current.trim();
            persistentTranscriptBufferRef.current = buffer ? `${buffer} ${newSpeech}` : newSpeech;
            currentSessionSpeechRef.current = '';
          }

          if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (isListeningRef.current) {
              startRecognition();
            }
          }, 150);
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      if (isListeningRef.current) {
        setIsListening(false);
        isListeningRef.current = false;
        setSpeechError('Could not start microphone speech recognition.');
      }
    }
  };

  // Toggle microphone recording via Web Speech API
  const handleToggleListening = async () => {
    if (!SpeechRecognitionConstructor) {
      setSpeechError('Microphone speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListeningRef.current) {
      isListeningRef.current = false;
      setIsListening(false);
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      // Commit active speech into persistent buffer
      if (currentSessionSpeechRef.current.trim()) {
        const buffer = persistentTranscriptBufferRef.current.trim();
        const newSpeech = currentSessionSpeechRef.current.trim();
        persistentTranscriptBufferRef.current = buffer ? `${buffer} ${newSpeech}` : newSpeech;
        currentSessionSpeechRef.current = '';
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      return;
    }

    try {
      setSpeechError(null);

      if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
        } catch (mediaErr: unknown) {
          const err = mediaErr as Error;
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setSpeechError('Microphone access was denied. Please allow microphone permissions in your browser.');
            return;
          }
        }
      }

      // Initialize persistent buffer with existing text
      const currentVal = (inputTextRef.current || inputText || '').trim();
      persistentTranscriptBufferRef.current = currentVal;
      currentSessionSpeechRef.current = '';

      isListeningRef.current = true;
      setIsListening(true);
      startRecognition();
    } catch {
      setSpeechError('Could not start microphone. Please check permissions.');
      isListeningRef.current = false;
      setIsListening(false);
    }
  };

  const handleChangeLanguage = (newLang: SpeechMode) => {
    setSpeechLanguage(newLang);
    speechLanguageRef.current = newLang;
    if (isListeningRef.current && recognitionRef.current) {
      if (currentSessionSpeechRef.current.trim()) {
        const buffer = persistentTranscriptBufferRef.current.trim();
        const newSpeech = currentSessionSpeechRef.current.trim();
        persistentTranscriptBufferRef.current = buffer ? `${buffer} ${newSpeech}` : newSpeech;
        currentSessionSpeechRef.current = '';
      }
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
      setTimeout(() => {
        if (isListeningRef.current) {
          startRecognition();
        }
      }, 100);
    }
  };

  // Submit candidate answer
  const handleSendMessage = async () => {
    if (isAiTyping || isFeedbackLoading || isDone) return;

    if (isListeningRef.current) {
      isListeningRef.current = false;
      setIsListening(false);
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = null;
      }
      if (currentSessionSpeechRef.current.trim()) {
        const buffer = persistentTranscriptBufferRef.current.trim();
        const newSpeech = currentSessionSpeechRef.current.trim();
        persistentTranscriptBufferRef.current = buffer ? `${buffer} ${newSpeech}` : newSpeech;
        currentSessionSpeechRef.current = '';
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    }

    const trimmed = inputText.trim();
    if (!trimmed) {
      setInputError('Please enter a response before sending.');
      return;
    }

    if (trimmed.length > 1200) {
      setInputError('Answer cannot exceed 1200 characters.');
      return;
    }

    setInputError(null);
    setInputText('');

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ];
    setMessages(newMessages);

    setIsAiTyping(true);
    setErrorMessage(null);
    setIsStillWorking(false);

    timerRef.current = setTimeout(() => {
      setIsStillWorking(true);
    }, 8000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: scenarioId,
          level,
          maxTurns: mode,
          context,
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'The interviewer is having trouble. Please try again.');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      setIsDone(Boolean(data.done));
    } catch (err: unknown) {
      const msg = (err as Error).message || 'The interviewer is having trouble. Please try again.';
      setErrorMessage(msg);
    } finally {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsAiTyping(false);
      setIsStillWorking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetry = () => {
    setErrorMessage(null);
    handleSendMessage();
  };

  const speechSupported = Boolean(SpeechRecognitionConstructor);

  return (
    <div className="h-[100dvh] flex flex-col justify-between max-w-[720px] mx-auto w-full bg-[#F8FAFC]">
      {/* Sticky Header with scenario name, "Answer X of Y", and "Get my feedback" button */}
      <header className="sticky top-0 z-20 bg-white border-b border-[#E2E8F0] px-4 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={onExit}
              className="min-h-[44px] min-w-[44px] -ml-2 text-[#475569] hover:text-[#0F172A] rounded-[12px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer shrink-0"
              aria-label="Exit interview session"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#0F172A] truncate leading-tight">
                {scenarioTitle}
              </h2>
              <p className="text-xs text-[#475569]">
                Answer {realUserCount} of {mode}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              disabled={realUserCount === 0 || isFeedbackLoading || isAiTyping}
              onClick={() => onRequestFeedback(messages)}
              className={`min-h-[44px] px-3.5 py-2 rounded-[12px] text-xs font-semibold transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer ${
                realUserCount === 0
                  ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed border border-[#E2E8F0]'
                  : 'bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white shadow-xs'
              }`}
            >
              {isFeedbackLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reviewing your answers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Get my feedback</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Auto-Feedback 5-second countdown notice */}
      {isDone && autoFeedbackCountdown !== null && (
        <div className="bg-[#F1F5F9] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-[#0F172A]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0F766E] shrink-0" />
            <span>
              Session complete. Auto-loading feedback in <strong>{autoFeedbackCountdown}s</strong>...
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRequestFeedback(messages)}
              className="font-bold text-[#0F766E] hover:underline cursor-pointer"
            >
              View Now
            </button>
            <button
              type="button"
              onClick={() => {
                if (autoFeedbackTimerRef.current) clearTimeout(autoFeedbackTimerRef.current);
                setAutoFeedbackCountdown(null);
                setIsAutoFeedbackCancelled(true);
              }}
              className="text-[#475569] hover:text-[#0F172A] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages Scroll Container */}
      <main
        className="flex-1 overflow-y-auto px-4 py-5 space-y-5"
        aria-live="polite"
        role="log"
        aria-label="Interview conversation"
      >
        {messages.map((msg, index) => {
          const isInterviewer = msg.role === 'assistant';
          const isSpeaking = speakingIndex === index;

          return (
            <div
              key={index}
              className={`flex flex-col message-fade ${isInterviewer ? 'items-start' : 'items-end'}`}
            >
              {/* Role Label & Text-To-Speech Listen Button */}
              <div className={`text-xs font-semibold text-[#475569] mb-1 flex items-center gap-2 ${isInterviewer ? 'pl-2' : 'pr-2'}`}>
                <span>{isInterviewer ? 'Interviewer' : 'You'}</span>
                {isInterviewer && (
                  <button
                    type="button"
                    onClick={() => handleToggleSpeak(msg.content, index)}
                    title={isSpeaking ? 'Click to stop reading question' : 'Click to read question aloud'}
                    className={`min-h-[30px] px-2 py-0.5 rounded-[8px] text-[11px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none ${
                      isSpeaking
                        ? 'bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]'
                        : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F766E] hover:text-[#115E59] border border-[#E2E8F0]'
                    }`}
                    aria-label={isSpeaking ? 'Stop reading question aloud' : 'Read question aloud'}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-[#B91C1C]" />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-[#0F766E]" />
                        <span>Read aloud</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Chat Bubble: rounded 24px */}
              <div
                dir="auto"
                className={`p-4 rounded-[24px] text-base leading-relaxed break-words max-w-[85%] sm:max-w-[80%] ${
                  isInterviewer
                    ? 'bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]'
                    : 'bg-[#0F766E] text-white'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}

        {/* Three-Dot Typing Indicator */}
        {isAiTyping && (
          <div className="flex flex-col items-start message-fade">
            <span className="text-xs font-semibold text-[#475569] mb-1 pl-2">
              Interviewer
            </span>
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-[24px] px-5 py-3.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce" />
            </div>
          </div>
        )}

        {/* Still working after 8s */}
        {isStillWorking && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#475569] py-1">
            <Clock className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Still working on your reply...</span>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] text-xs text-[#B91C1C] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="font-bold underline text-[#B91C1C] hover:text-[#991B1B] cursor-pointer min-h-[44px] flex items-center"
            >
              Retry
            </button>
          </div>
        )}

        {/* Interview Complete Divider */}
        {isDone && (
          <div className="py-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <div className="relative bg-[#F8FAFC] px-4 text-xs font-semibold uppercase tracking-wider text-[#475569]">
                Interview complete
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Full-width primary Get my feedback button when session is done */}
      {isDone && (
        <div className="p-4 bg-white border-t border-[#E2E8F0] z-10">
          <button
            type="button"
            disabled={isFeedbackLoading}
            onClick={() => onRequestFeedback(messages)}
            className="w-full min-h-[48px] py-3.5 px-6 rounded-[12px] bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:outline-none cursor-pointer"
          >
            {isFeedbackLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Reviewing your answers...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Get my feedback</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Fixed Bottom Input Area (kept above phone keyboard via 100dvh) */}
      <footer className="bg-white border-t border-[#E2E8F0] p-3 sm:p-4 space-y-2 z-10">
        {inputError && (
          <p className="text-xs text-[#B91C1C] px-1">
            {inputError}
          </p>
        )}

        {speechError && (
          <div className="p-2.5 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] text-xs text-[#B91C1C] flex items-center justify-between gap-2">
            <span>{speechError}</span>
            <button
              type="button"
              onClick={() => setSpeechError(null)}
              className="font-bold underline text-[#B91C1C] cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Listening Active Banner */}
        {isListening && (
          <div className="p-2 bg-[#F0FDFA] border border-[#99F6E4] rounded-[12px] flex items-center justify-between text-xs text-[#0F766E]">
            <span className="font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-ping" />
              Listening ({speechLanguage === 'en-US' ? 'English' : speechLanguage === 'ur-Roman' ? 'Roman Urdu' : 'Urdu'})...
            </span>
            <button
              type="button"
              onClick={handleToggleListening}
              className="font-bold underline text-[#0F766E] cursor-pointer"
            >
              Stop
            </button>
          </div>
        )}

        {/* Prepared Demo Answers Drawer */}
        {showSampleAnswers && (
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-3 space-y-2 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#0F766E]" />
                Sample Demo Answers
              </span>
              <button
                type="button"
                onClick={() => setShowSampleAnswers(false)}
                className="text-xs text-[#475569] hover:text-[#0F172A] cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="space-y-1.5">
              {scenarioSampleAnswers.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white border border-[#E2E8F0] rounded-[8px] flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <span className="font-medium text-[#0F172A] block truncate">{item.label}</span>
                    <span className="text-[#475569] line-clamp-1 italic">{item.answer}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopySampleAnswer(item.answer, idx)}
                      className="p-1.5 rounded hover:bg-[#F1F5F9] text-[#475569] cursor-pointer"
                      title="Copy answer"
                    >
                      {copiedSampleIdx === idx ? <Check className="w-3.5 h-3.5 text-[#0F766E]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      disabled={isAiTyping || isFeedbackLoading || isDone}
                      onClick={() => handleSelectSampleAnswer(item.answer)}
                      className="px-2 py-1 rounded bg-[#0F766E] hover:bg-[#115E59] text-white text-[11px] font-semibold cursor-pointer"
                    >
                      Insert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="relative flex items-end gap-2">
          <label htmlFor="chat-user-input" className="sr-only">
            Your answer
          </label>
          <textarea
            id="chat-user-input"
            dir="auto"
            rows={2}
            value={inputText}
            maxLength={1200}
            disabled={isAiTyping || isFeedbackLoading || isDone}
            onChange={(e) => {
              const val = e.target.value;
              setInputText(val);
              inputTextRef.current = val;
              if (isListeningRef.current) {
                persistentTranscriptBufferRef.current = val.trim();
                currentSessionSpeechRef.current = '';
              }
              if (inputError) setInputError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              isDone
                ? 'Interview complete. Click Get my feedback above.'
                : isListening
                ? 'Listening to microphone... speak naturally...'
                : 'Type your answer or speak using the microphone...'
            }
            className="flex-1 text-base p-3 rounded-[12px] border border-[#E2E8F0] bg-white placeholder-[#94A3B8] text-[#0F172A] focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-colors resize-none leading-relaxed min-h-[52px] disabled:bg-[#F1F5F9] disabled:text-[#94A3B8]"
          />

          {/* Action Buttons: Mic & Send */}
          <div className="flex items-center gap-1.5 shrink-0 mb-1">
            {speechSupported && (
              <button
                type="button"
                disabled={isAiTyping || isFeedbackLoading || isDone}
                onClick={handleToggleListening}
                className={`min-h-[44px] min-w-[44px] rounded-[12px] flex items-center justify-center transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-[#B91C1C] text-white'
                    : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F766E] disabled:opacity-50'
                }`}
                aria-label={isListening ? 'Stop microphone' : 'Start microphone speech input'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}

            <button
              type="button"
              disabled={!inputText.trim() || isAiTyping || isFeedbackLoading || isDone}
              onClick={() => handleSendMessage()}
              className="min-h-[44px] min-w-[44px] rounded-[12px] bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] disabled:bg-[#E2E8F0] text-white disabled:text-[#94A3B8] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Send your response"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-bar: Character count near limit, Language switch, Demo Answers button */}
        <div className="flex items-center justify-between text-xs text-[#475569] pt-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isAiTyping || isFeedbackLoading || isDone}
              onClick={() => setShowSampleAnswers((prev) => !prev)}
              className="min-h-[44px] px-2 py-1 text-xs font-semibold text-[#0F766E] hover:text-[#115E59] flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Demo Answers</span>
            </button>

            {speechSupported && (
              <div className="inline-flex items-center gap-1 p-0.5 bg-[#F1F5F9] rounded-[8px] border border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => handleChangeLanguage('en-US')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    speechLanguage === 'en-US' ? 'bg-white text-[#0F766E] font-semibold shadow-xs' : 'text-[#475569]'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleChangeLanguage('ur-Roman')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    speechLanguage === 'ur-Roman' ? 'bg-white text-[#0F766E] font-semibold shadow-xs' : 'text-[#475569]'
                  }`}
                >
                  Roman Urdu
                </button>
                <button
                  type="button"
                  onClick={() => handleChangeLanguage('ur-PK')}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    speechLanguage === 'ur-PK' ? 'bg-white text-[#0F766E] font-semibold shadow-xs' : 'text-[#475569]'
                  }`}
                >
                  اردو
                </button>
              </div>
            )}
          </div>

          <div>
            {inputText.length > 1000 && (
              <span className={`font-mono text-xs ${inputText.length > 1150 ? 'text-[#B91C1C] font-bold' : 'text-[#94A3B8]'}`}>
                {inputText.length}/1200
              </span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
