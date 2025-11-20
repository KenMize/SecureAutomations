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
  initialPrompt: string;
  responses: Record<string, string[]>;
}

const DEMO_CONFIGS: Record<string, DemoData> = {
  support: {
    id: "support",
    title: "Customer Support Chatbot",
    icon: <MessageSquare className="h-8 w-8" />,
    description:
      "24/7 AI agent that answers FAQs, handles common requests, and escalates complex issues to your team.",
    initialPrompt:
      "I'm having trouble logging into my account. It keeps saying my password is incorrect even though I'm sure it's right.",
    responses: {
      "password|login|account": [
        "I understand you're having trouble logging in. This is actually a common issue that we can usually resolve quickly. Have you tried resetting your password? I can send you a reset link right away.",
        "Sometimes clearing your browser cache and cookies can help too. Would you like me to send you step-by-step instructions for that as well?",
        "If you'd prefer, I can connect you with our support team who can verify your account details securely. What would work best for you?",
      ],
      "billing|invoice|payment|charge": [
        "I'd be happy to help with your billing question. Let me look into that for you. Can you tell me which invoice you're asking about?",
        "For security reasons, I'll need to verify some information. Let me connect you with our billing specialist who can access your account.",
      ],
      "feature|how to|guide": [
        "Great question! I can walk you through that feature. Here's a quick overview:",
        "1. Navigate to your dashboard\n2. Click on the feature you're interested in\n3. Follow the setup wizard\n\nWould you like more detailed instructions?",
      ],
      "error|bug|broken": [
        "I'm sorry you're experiencing an issue. Let's troubleshoot this together. Can you tell me exactly what error message you're seeing?",
        "Thanks for that information. This sounds like something our technical team should look into. I'm going to escalate this to them right now and they'll be in touch within 1 hour.",
      ],
      "default": [
        "Thanks for your question! I've captured that and will get you the right answer. Is there anything else I can help with in the meantime?",
        "I'm connecting you with a specialist who can help with that. They'll be with you shortly.",
      ],
    },
  },
  scheduler: {
    id: "scheduler",
    title: "Appointment Scheduler Agent",
    icon: <Clock className="h-8 w-8" />,
    description:
      "Intelligent agent that books appointments, sends confirmations, and reminds customers automatically.",
    initialPrompt: "I'd like to schedule an appointment with a consultant.",
    responses: {
      "appointment|schedule|meeting": [
        "Great! I'd love to help you schedule an appointment. Let me check our availability.",
        "We have slots available this week. Would you prefer morning or afternoon?",
        "Perfect! Here are the available times:\n• Tuesday, 10:00 AM\n• Wednesday, 2:00 PM\n• Thursday, 3:30 PM\n\nWhich time works best for you?",
        "Excellent! I've scheduled your appointment for [selected time]. You'll receive a calendar invite and a reminder 24 hours before.",
      ],
      "demo|trial|free": [
        "Absolutely! We offer a 30-minute demo consultation. What topic would be most helpful?",
        "I can connect you with our product specialist. Do you have a preferred time this week?",
      ],
      "cancel|reschedule|change": [
        "I can help you reschedule that. When would you like to meet instead?",
        "No problem! I've updated your appointment and you'll receive a new calendar invite.",
      ],
      "default": [
        "What day and time would work best for you?",
        "Perfect, I've noted that. Let me get that on the calendar.",
      ],
    },
  },
  lead: {
    id: "lead",
    title: "Lead Qualifier Agent",
    icon: <BarChart3 className="h-8 w-8" />,
    description:
      "AI agent that qualifies inbound leads, asks qualifying questions, and routes to the right sales person.",
    initialPrompt: "Hi, I'm interested in learning more about your automation platform.",
    responses: {
      "interested|learn|platform|product": [
        "Fantastic! I'm excited to help. To make sure I connect you with the right person, I have a few quick questions.",
        "First, what's the primary use case you're interested in? Are you looking for customer-facing automation, internal workflows, or compliance automation?",
        "Got it! And roughly how many people would this solution impact at your company?",
        "Perfect! And what's your timeline for implementation?",
        "Great information! I'm connecting you with our sales specialist who focuses on companies like yours. They'll reach out within 2 hours with a tailored demo.",
      ],
      "budget|pricing|cost|price": [
        "Great question! Pricing depends on your specific needs and scale. Let me collect some information so I can get you an accurate quote.",
        "How many users or transactions per month are we talking about?",
        "And what's your monthly automation volume approximately?",
        "I've got all the details. Our pricing ranges from $5K-$50K+ per month depending on complexity. Our sales team will provide an exact quote based on your needs.",
      ],
      "integration|system|api|connect": [
        "That's important! We integrate with most major systems. Which platforms are you currently using?",
        "Perfect, we have certified connectors for all of those. Our integration team can usually get you connected within 2 weeks.",
      ],
      "default": [
        "That's helpful to know. Let me gather some more information to ensure you talk with the right specialist.",
        "Excellent! I'm getting you set up with our team.",
      ],
    },
  },
};

export default function AgentDemoPage({
  agentId = "support",
}: {
  agentId?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "agent",
      text: "Hello! How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const demo = useMemo(() => {
    const config = DEMO_CONFIGS[agentId] || DEMO_CONFIGS.support;
    return config;
  }, [agentId]);

  const generateResponse = (userInput: string) => {
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
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { type: "user" as const, text: inputValue }];
    setMessages(newMessages);
    setInputValue("");

    // Simulate agent thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages([...newMessages, { type: "agent" as const, text: response }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
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
            <img
              src="/logo.svg"
              alt="Secure Automations"
              className="h-8 w-8"
            />
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
          {/* Chat Messages */}
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
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
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
            <strong>Demo Note:</strong> This is an interactive demonstration of how our{" "}
            {demo.title} works. Try asking the agent different questions to see how it
            responds. In production, this agent would be connected to your systems and
            data sources.
          </p>
        </div>
      </div>
    </div>
  );
}
