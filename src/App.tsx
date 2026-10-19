import React, { useState } from 'react';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomeScreen } from './components/HomeScreen.js';
import { SetupScreen } from './components/SetupScreen.js';
import { ChatScreen } from './components/ChatScreen.js';
import { FeedbackScreen } from './components/FeedbackScreen.js';
import { DashboardView } from './components/DashboardView.js';
import {
  ScenarioId,
  DifficultyLevel,
  SessionMode,
  ChatMessage,
  FeedbackData,
} from './types.js';

type ScreenState = 'home' | 'setup' | 'chat' | 'feedback' | 'dashboard';

const SCENARIO_NAMES: Record<ScenarioId, string> = {
  job_interview: 'Job Interview',
  internship_interview: 'Internship Interview',
  salary_negotiation: 'Salary/Offer Negotiation',
  scholarship_interview: 'Scholarship Interview',
  visa_interview: 'Visa Interview',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>('job_interview');
  const [sessionConfig, setSessionConfig] = useState<{
    mode: SessionMode;
    level: DifficultyLevel;
    context: string;
  }>({
    mode: 2, // Default to Quick Demo
    level: 'friendly',
    context: '',
  });

  const [activeChatMessages, setActiveChatMessages] = useState<ChatMessage[]>([]);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // Navigate to Scenario Setup
  const handleSelectScenario = (id: ScenarioId) => {
    setSelectedScenario(id);
    setCurrentScreen('setup');
  };

  // Start Session from Setup
  const handleStartSession = (config: {
    mode: SessionMode;
    level: DifficultyLevel;
    context: string;
  }) => {
    setSessionConfig(config);
    setActiveChatMessages([]);
    setFeedbackData(null);
    setFeedbackError(null);
    setCurrentScreen('chat');
  };

  // Request feedback from API
  const handleRequestFeedback = async (messages: ChatMessage[]) => {
    setActiveChatMessages(messages);
    setIsFeedbackLoading(true);
    setFeedbackError(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: selectedScenario,
          level: sessionConfig.level,
          context: sessionConfig.context,
          messages,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Feedback generation failed. Please try again.');
      }

      const data = await response.json();
      if (data && data.feedback) {
        setFeedbackData(data.feedback);
        setCurrentScreen('feedback');
      } else {
        throw new Error('Malformed feedback response.');
      }
    } catch (err: unknown) {
      setFeedbackError((err as Error).message || 'Feedback generation failed. Please try again.');
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  // Try again (same scenario restart)
  const handleRestartSameScenario = () => {
    setActiveChatMessages([]);
    setFeedbackData(null);
    setFeedbackError(null);
    setCurrentScreen('chat');
  };

  // Choose another scenario (back to home)
  const handleChooseAnotherScenario = () => {
    setActiveChatMessages([]);
    setFeedbackData(null);
    setFeedbackError(null);
    setCurrentScreen('home');
  };

  const isVisa = selectedScenario === 'visa_interview';

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans antialiased overflow-x-hidden selection:bg-[#0F766E] selection:text-white">
      {/* Header (shown on non-chat screens) */}
      {currentScreen !== 'chat' && (
        <Header
          showBack={currentScreen === 'setup' || currentScreen === 'dashboard'}
          onBack={() => setCurrentScreen('home')}
          onOpenDashboard={() => setCurrentScreen('dashboard')}
          isDashboard={currentScreen === 'dashboard'}
        />
      )}

      {/* Main Container: max-w-[720px] centered */}
      <main className={`flex-1 w-full max-w-[720px] mx-auto ${currentScreen === 'chat' ? 'p-0 h-[100dvh] overflow-hidden' : 'px-4 py-5 sm:py-7'}`}>
        {feedbackError && currentScreen === 'chat' && (
          <div className="mx-4 mt-3 p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-[12px] text-xs text-[#B91C1C] flex items-center justify-between gap-3">
            <span>{feedbackError}</span>
            <button
              type="button"
              onClick={() => handleRequestFeedback(activeChatMessages)}
              className="min-h-[44px] font-bold underline px-2 flex items-center text-[#B91C1C] hover:text-[#991B1B] cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            onSelectScenario={handleSelectScenario}
            onOpenDashboard={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardView
            onBack={() => setCurrentScreen('home')}
            onSelectScenario={(id) => {
              setSelectedScenario(id);
              setCurrentScreen('setup');
            }}
          />
        )}

        {currentScreen === 'setup' && (
          <SetupScreen
            scenarioId={selectedScenario}
            onBack={() => setCurrentScreen('home')}
            onStartSession={handleStartSession}
          />
        )}

        {currentScreen === 'chat' && (
          <ChatScreen
            scenarioId={selectedScenario}
            scenarioTitle={SCENARIO_NAMES[selectedScenario]}
            mode={sessionConfig.mode}
            level={sessionConfig.level}
            context={sessionConfig.context}
            onExit={handleChooseAnotherScenario}
            onRequestFeedback={handleRequestFeedback}
            isFeedbackLoading={isFeedbackLoading}
          />
        )}

        {currentScreen === 'feedback' && feedbackData && (
          <FeedbackScreen
            scenarioId={selectedScenario}
            scenarioTitle={SCENARIO_NAMES[selectedScenario]}
            feedback={feedbackData}
            isShortSession={activeChatMessages.filter((m) => m.role === 'user').length < 2}
            mode={sessionConfig.mode}
            level={sessionConfig.level}
            onRestartSameScenario={handleRestartSameScenario}
            onChooseAnotherScenario={handleChooseAnotherScenario}
          />
        )}
      </main>

      {/* Footer with legal disclaimers (shown on non-chat screens) */}
      {currentScreen !== 'chat' && (
        <Footer isVisaScenario={isVisa && currentScreen !== 'home'} />
      )}
    </div>
  );
}
