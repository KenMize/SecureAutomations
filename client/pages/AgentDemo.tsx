import React, { useState, useMemo } from "react";
import { Send, MessageSquare, Clock, BarChart3 } from "lucide-react";

interface Message {
  type: "user" | "agent";
  text: string;
}

interface DemoData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  responses: Record<string, string[]>;
}

const DEMO_CONFIGS: Record<string, DemoData> = {
  support: {
    id: "support",
    title: "Customer Support Chatbot",
    icon: <MessageSquare className="h-8 w-8" />,
    description:
      "24/7 AI agent that answers FAQs, handles common requests, and escalates complex issues to your team.",
    responses: {
      "password|login|account": [
        "I understand you're having trouble logging in. This is actually a common issue. Have you tried resetting your password? I can send you a reset link.",
        "Sometimes clearing your browser cache and cookies can help. Would you like step-by-step instructions?",
        "I can connect you with our support team who can verify your account details securely.",
      ],
      "billing|invoice|payment": [
        "I'd be happy to help with your billing question. Which invoice are you asking about?",
        "For security, I'll connect you with our billing specialist who can access your account.",
      ],
      "feature|how to|guide": [
        "Great question! Let me walk you through that feature. Here's a quick overview.",
        "1. Navigate to your dashboard\n2. Click on the feature\n3. Follow the setup wizard",
      ],
      "error|bug|broken": [
        "I'm sorry you're experiencing an issue. What error message are you seeing?",
        "Thanks for that information. I'm escalating this to our technical team now.",
      ],
      default: [
        "Thanks for your question! I've captured that information.",
        "I'm connecting you with a specialist who can help with that.",
      ],
    },
  },
  scheduler: {
    id: "scheduler",
    title: "Appointment Scheduler Agent",
    icon: <Clock className="h-8 w-8" />,
    description:
      "Intelligent agent that books appointments, sends confirmations, and reminds customers automatically.",
    responses: {
      "appointment|schedule|meeting": [
        "Great! I'd love to help you schedule an appointment. Let me check our availability.",
        "We have slots available this week. Would you prefer morning or afternoon?",
        "Perfect! Here are available times:\n• Tuesday, 10:00 AM\n• Wednesday, 2:00 PM\n• Thursday, 3:30 PM",
        "Excellent! I've scheduled your appointment. You'll receive a calendar invite and reminder.",
      ],
      "demo|trial|free": [
        "Absolutely! We offer a 30-minute demo consultation. What topic would be helpful?",
        "I can connect you with our product specialist. Do you have a preferred time?",
      ],
      "cancel|reschedule": [
        "I can help you reschedule. When would you like to meet instead?",
        "No problem! I've updated your appointment and you'll receive a new calendar invite.",
      ],
      default: [
        "What day and time would work best for you?",
        "Perfect! Let me get that on the calendar.",
      ],
    },
  },
  lead: {
    id: "lead",
    title: "Lead Qualifier Agent",
    icon: <BarChart3 className="h-8 w-8" />,
    description:
      "AI agent that qualifies inbound leads, asks qualifying questions, and routes to the right sales person.",
    responses: {
      "interested|learn|platform": [
        "Fantastic! To make sure I connect you with the right person, I have a few quick questions.",
        "First, what's the primary use case? Customer-facing automation, internal workflows, or compliance?",
        "Got it! How many people would this solution impact at your company?",
        "Perfect! What's your timeline for implementation?",
        "Great! I'm connecting you with our sales specialist. They'll reach out within 2 hours.",
      ],
      "budget|pricing|cost": [
        "Great question! Pricing depends on your specific needs. Let me collect some information.",
        "How many users or transactions per month are we talking about?",
        "What's your monthly automation volume approximately?",
        "Our pricing ranges from $5K-$50K+ per month. Our sales team will provide an exact quote.",
      ],
      "integration|system|api": [
        "That's important! Which platforms are you currently using?",
        "Perfect! We have certified connectors for those. Our integration team can connect you within 2 weeks.",
      ],
      default: [
        "That's helpful to know. Let me gather some more information.",
        "Excellent! I'm getting you set up with our team.",
      ],
    },
  },
};

interface AgentDemoPageProps {
  agentId?: string;
}

export default function AgentDemoPage({
  agentId = "support",
}: AgentDemoPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "agent",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const demo = useMemo(() => {
    return DEMO_CONFIGS[agentId] || DEMO_CONFIGS.support;
  }, [agentId]);

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    for (const [keyword, responses] of Object.entries(demo.responses)) {
      if (keyword === "default") continue;
      const keywords = keyword.split("|");
      if (keywords.some((kw) => lowerInput.includes(kw))) {
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        return randomResponse;
      }
    }

    const defaultResponses = demo.responses.default;
    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const handleSendMessage = (): void => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    const newMessages: Message[] = [
      ...messages,
      { type: "user", text: inputValue },
    ];
    setMessages(newMessages);
    setInputValue("");

    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages([...newMessages, { type: "agent", text: response }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = (): void => {
    setMessages([{ type: "agent", text: "Hello! How can I help you today?" }]);
    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a
            href="/examples"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/logo.svg" alt="Secure Automations" className="h-8 w-8" />
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
          </a>
          <a
            href="/examples"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Back to Examples
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-xl bg-cyan-300/20 text-cyan-300 flex-shrink-0">
              {demo.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{demo.title}</h1>
              <p className="text-slate-300 max-w-2xl">{demo.description}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 overflow-hidden flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-3 ${
                    msg.type === "user"
                      ? "bg-cyan-300/20 text-white border border-cyan-300/30"
                      : "bg-slate-800/60 text-slate-200 border border-white/10"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/60 text-slate-200 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-slate-950/40 p-4 space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="rounded-2xl bg-cyan-300 text-slate-950 p-3 font-semibold hover:bg-cyan-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 hover:bg-slate-900/80 hover:text-white transition-colors"
              >
                Reset Demo
              </button>
              <a
                href="/examples"
                className="flex-1 rounded-xl bg-white text-slate-950 px-4 py-2 text-sm font-medium hover:bg-slate-100 transition-colors text-center"
              >
                Back to Examples
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl border border-white/10 bg-slate-900/40">
          <p className="text-sm text-slate-400">
            <strong>Demo Note:</strong> This is an interactive demonstration of
            how our {demo.title} works. Try asking the agent different questions
            to see how it responds. In production, this agent would be connected
            to your systems and data sources.
          </p>
        </div>
      </div>
    </div>
  );
}
