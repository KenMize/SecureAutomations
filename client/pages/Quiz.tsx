import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface QuizAnswer {
  questionId: string;
  answer: string | number;
}

interface RecommendedSolution {
  name: string;
  description: string;
  benefits: string[];
}

interface QuizResult {
  email: string;
  name: string;
  company: string;
  recommendations: RecommendedSolution[];
  details: Record<string, string | number>;
  timestamp: string;
}

const QUIZ_QUESTIONS = [
  {
    id: "pain-points",
    question: "What's your biggest current pain point?",
    type: "select",
    options: [
      "Manual data entry and repetitive tasks",
      "Customer support and response delays",
      "Appointment booking and scheduling",
      "Invoice processing and financial workflows",
      "Lead qualification and sales follow-ups",
      "Report generation and analytics",
    ],
  },
  {
    id: "task-frequency",
    question: "How often do these repetitive tasks occur?",
    type: "select",
    options: [
      "Daily",
      "Multiple times per week",
      "Weekly",
      "Monthly",
      "Varies",
    ],
  },
  {
    id: "complexity-level",
    question: "How complex are these tasks?",
    type: "select",
    options: [
      "Simple and rule-based (if X then Y)",
      "Mostly routine with occasional exceptions",
      "Requires judgment and decision-making",
      "Involves learning from patterns",
    ],
  },
  {
    id: "human-oversight",
    question:
      "Do these tasks need human review, or can they be fully autonomous?",
    type: "select",
    options: [
      "Must always have human oversight",
      "Mostly autonomous with occasional review",
      "Fully autonomous is acceptable",
    ],
  },
  {
    id: "primary-goal",
    question: "What's your primary goal?",
    type: "select",
    options: [
      "Save time and reduce manual work",
      "Improve customer experience",
      "Reduce errors",
      "Scale operations without hiring",
      "Improve data accessibility",
    ],
  },
  {
    id: "data-readiness",
    question: "How ready is your data for automation?",
    type: "scale",
    label: "My data is clean, accessible, and ready",
  },
  {
    id: "systems-integration",
    question: "How integrated are your current systems?",
    type: "select",
    options: [
      "Mostly siloed (separate systems)",
      "Partially connected",
      "Well integrated and connected",
    ],
  },
  {
    id: "volume-scale",
    question: "What's the volume of these tasks?",
    type: "select",
    options: [
      "Low (< 10 per day)",
      "Medium (10-100 per day)",
      "High (100-1000 per day)",
      "Very high (1000+ per day)",
    ],
  },
  {
    id: "timeline",
    question: "What's your implementation timeline?",
    type: "select",
    options: [
      "ASAP (within 1 month)",
      "Short-term (1-3 months)",
      "Medium-term (3-6 months)",
      "Long-term (6+ months)",
    ],
  },
  {
    id: "team-readiness",
    question: "How ready is your team for change?",
    type: "select",
    options: [
      "Very resistant to change",
      "Neutral / cautious",
      "Open and supportive",
      "Eager to adopt new tools",
    ],
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    company: "",
  });
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (answer: string | number) => {
    const newAnswers = answers.filter((a) => a.questionId !== currentQ.id);
    setAnswers([...newAnswers, { questionId: currentQ.id, answer }]);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowUserForm(true);
    }
  };

  const generateRecommendations = (): RecommendedSolution[] => {
    const answerMap = Object.fromEntries(
      answers.map((a) => [a.questionId, a.answer]),
    );

    const recommendations: RecommendedSolution[] = [];

    // Map pain points to specific solutions
    const painPoint = answerMap["pain-points"];
    const frequency = answerMap["task-frequency"];
    const complexity = answerMap["complexity-level"];
    const volume = answerMap["volume-scale"];
    const goal = answerMap["primary-goal"];

    // Manual data entry and repetitive tasks
    if (painPoint === "Manual data entry and repetitive tasks") {
      recommendations.push({
        name: "Data Entry & Processing Workflow",
        description: "Automated extraction and validation of data across systems",
        benefits: [
          "Eliminates manual keyboard entry",
          "Real-time data synchronization",
          "Built-in error detection and corrections",
        ],
      });
    }

    // Customer support and response delays
    if (painPoint === "Customer support and response delays") {
      recommendations.push({
        name: "Customer Support AI Agent",
        description: "Intelligent agent that handles inquiries, routes tickets, and learns from responses",
        benefits: [
          "24/7 instant response to common questions",
          "Automatic ticket routing and prioritization",
          "Learns from human responses to improve over time",
        ],
      });
    }

    // Appointment booking and scheduling
    if (painPoint === "Appointment booking and scheduling") {
      recommendations.push({
        name: "Smart Scheduling Agent",
        description: "Autonomous scheduling that coordinates calendars and handles confirmations",
        benefits: [
          "Reduces back-and-forth emails",
          "Prevents double-bookings",
          "Sends automatic reminders to attendees",
        ],
      });
    }

    // Invoice processing and financial workflows
    if (painPoint === "Invoice processing and financial workflows") {
      recommendations.push({
        name: "Invoice Processing Automation",
        description: "Extract, validate, and route invoices to appropriate departments",
        benefits: [
          "90% reduction in processing time",
          "Automatic GL code assignment",
          "Fraud detection and validation",
        ],
      });
    }

    // Lead qualification and sales follow-ups
    if (painPoint === "Lead qualification and sales follow-ups") {
      recommendations.push({
        name: "Lead Qualification & Nurture Agent",
        description: "AI-driven lead scoring and automated follow-up sequences",
        benefits: [
          "Identifies high-value leads automatically",
          "Sends personalized follow-ups at optimal times",
          "Learns which leads convert best",
        ],
      });
    }

    // Report generation and analytics
    if (painPoint === "Report generation and analytics") {
      recommendations.push({
        name: "Automated Reporting Workflow",
        description: "Generate, format, and distribute reports on a schedule",
        benefits: [
          "Real-time data aggregation",
          "Customizable report formats",
          "Automatic distribution to stakeholders",
        ],
      });
    }

    // Add a second recommendation based on complexity and volume
    if (
      (complexity === "Requires judgment and decision-making" ||
        complexity === "Involves learning from patterns") &&
      (volume === "High (100-1000 per day)" || volume === "Very high (1000+ per day)")
    ) {
      // Check if we haven't already added an AI agent
      if (!recommendations.some((r) => r.name.includes("Agent"))) {
        recommendations.push({
          name: "Advanced AI Agent Platform",
          description: "Full-featured autonomous agent for complex, high-volume operations",
          benefits: [
            "Handles complex decision logic",
            "Learns and adapts from patterns",
            "Scales to thousands of transactions daily",
          ],
        });
      }
    }

    // Add integration/workflow recommendation for siloed systems
    if (
      answerMap["systems-integration"] === "Mostly siloed (separate systems)" &&
      !recommendations.some((r) => r.name.includes("Workflow"))
    ) {
      recommendations.push({
        name: "System Integration Workflow",
        description: "Connect disparate systems and synchronize data across platforms",
        benefits: [
          "Single source of truth across systems",
          "Real-time data synchronization",
          "Reduces duplicate data entry",
        ],
      });
    }

    // Ensure we have at least one recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        name: "Foundational Automation Workflow",
        description: "Start with core automation to identify quick wins and build momentum",
        benefits: [
          "Easy to implement and monitor",
          "Quick ROI to build internal support",
          "Foundation for future AI agents",
        ],
      });
    }

    return recommendations.slice(0, 3); // Return up to 3 recommendations
  };

  const handleSubmitUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.name || !userInfo.company) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const recommendations = generateRecommendations();
      const answerMap = Object.fromEntries(
        answers.map((a) => [a.questionId, a.answer]),
      );

      const resultData: QuizResult = {
        email: userInfo.email,
        name: userInfo.name,
        company: userInfo.company,
        recommendations,
        details: answerMap,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/submit-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });

      if (response.ok) {
        setResult(resultData);
        setShowRecommendationModal(true);
      } else {
        let errorMessage = "Failed to submit quiz. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Quiz submission error:", error);
      alert(
        "An error occurred. Please check your internet connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showRecommendationModal && result) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <a
              href="/"
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
              href="/"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              ✕ Close
            </a>
          </div>
        </header>

        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/95 p-8 md:p-12 max-w-2xl w-full shadow-2xl my-8">
              <div className="text-center mb-8">
                <div className="inline-block mb-6 p-3 rounded-full bg-cyan-300/20 border border-cyan-300/50">
                  <svg className="w-8 h-8 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Recommended Solutions for {result.company}
                </h2>
                <p className="text-slate-300 text-sm">
                  Based on your responses, here's what we recommend
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {result.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-cyan-300/30 bg-gradient-to-br from-cyan-300/10 to-cyan-300/5 p-5"
                  >
                    <div className="flex gap-3 mb-3">
                      <div className="text-cyan-300 font-bold text-lg flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">
                          {rec.name}
                        </h3>
                        <p className="text-sm text-slate-300 mb-3">
                          {rec.description}
                        </p>
                        <div className="space-y-1">
                          {rec.benefits.map((benefit, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex gap-2 text-xs text-slate-300"
                            >
                              <span className="text-cyan-300">✓</span>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950/40 border border-white/10 mb-6">
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">
                  Your Assessment
                </h4>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Need:</span>
                    <span className="font-medium">{result.details["pain-points"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frequency:</span>
                    <span className="font-medium">{result.details["task-frequency"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Complexity:</span>
                    <span className="font-medium">{result.details["complexity-level"]}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 text-center mb-6">
                These recommendations have been sent to <span className="font-medium text-slate-300">{result.email}</span>.
                A specialist will contact you within 2 hours to discuss implementation.
              </p>

              <button
                onClick={() => setShowResults(true)}
                className="w-full rounded-2xl bg-white text-slate-950 px-4 py-3 font-medium hover:bg-slate-100 transition-colors"
              >
                View Full Assessment Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && result) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <a
              href="/"
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
              href="/"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              ✕ Close
            </a>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/80 p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Your Automation Readiness Assessment
              </h1>
              <p className="text-slate-300">
                Based on your responses, here's our personalized recommendation.
              </p>
            </div>

            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="8"
                    strokeDasharray={`${(result.score / 100) * 339.3} 339.3`}
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "50% 50%",
                    }}
                  />
                  <text
                    x="60"
                    y="60"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-3xl font-bold fill-cyan-300"
                  >
                    {result.score}%
                  </text>
                </svg>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {result.recommendation}
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  {result.recommendation ===
                  "Full AI Agent Platform (with Learning & Autonomy)" ? (
                    <>
                      You're a strong candidate for autonomous AI agents. Your
                      workflows are complex, high-volume, and have clear ROI
                      potential. You can deploy intelligent agents that learn
                      and adapt with minimal human oversight.
                    </>
                  ) : result.recommendation ===
                    "Hybrid AI Agent + Workflow Automation" ? (
                    <>
                      A combined approach works best for you. Deploy AI agents
                      for customer engagement while using workflow automations
                      for back-office operations. This maximizes ROI and covers
                      both internal and external processes.
                    </>
                  ) : (
                    <>
                      Start with focused RPA or simple automation to build
                      momentum. Once you see quick wins, you can expand to more
                      sophisticated AI agents and workflows. Quick wins build
                      internal support for larger initiatives.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-slate-950/40 p-6 border border-white/10">
                <h3 className="font-semibold text-cyan-300 mb-4">
                  Your Assessment
                </h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div>
                    <span className="text-slate-400">Primary Pain Point:</span>
                    <p className="font-medium">
                      {result.details["pain-points"]}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Complexity Level:</span>
                    <p className="font-medium">
                      {result.details["complexity-level"]}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Volume:</span>
                    <p className="font-medium">
                      {result.details["volume-scale"]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/40 p-6 border border-white/10">
                <h3 className="font-semibold text-cyan-300 mb-4">Next Steps</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>A specialist will contact you within 2 hours</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>We'll review your specific workflows</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>Create a custom deployment plan</span>
                  </li>
                  <li className="flex gap-2">
                    <ChevronRight className="h-4 w-4 text-cyan-300 flex-shrink-0 mt-0.5" />
                    <span>Start with a proof-of-concept</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400 mb-6">
                Your results have been sent to {result.email} and our Sales
                team. We'll be in touch shortly!
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showUserForm) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
            <a
              href="/"
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
              href="/"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              ✕ Close
            </a>
          </div>
        </header>

        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
            <p className="text-slate-300 mb-8">
              Just need a few details to send you your personalized
              recommendations.
            </p>

            <form onSubmit={handleSubmitUserInfo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userInfo.name ?? ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Work Email
                </label>
                <input
                  type="email"
                  value={userInfo.email ?? ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                  placeholder="your@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={userInfo.company ?? ""}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, company: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                  placeholder="Your company"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 rounded-2xl bg-white text-slate-950 px-4 py-3 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Get My Results"}
              </button>
            </form>

            <p className="text-xs text-slate-500 mt-6">
              We'll never share your data. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src="/logo.svg" alt="Secure Automations" className="h-8 w-8" />
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
          </a>
          <a
            href="/"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            ✕ Close
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Find Your Automation Path
            </h1>
            <span className="text-sm text-slate-400">
              {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-2">
            <div
              className="bg-cyan-300 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12">
          <h2 className="text-2xl font-semibold mb-8 text-white">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.type === "select" ? (
              (currentQ.options || []).map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 hover:border-cyan-300/50 transition-all text-slate-200 hover:text-white"
                >
                  {option}
                </button>
              ))
            ) : currentQ.type === "scale" ? (
              <div className="py-8">
                <div className="flex justify-between mb-6">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleAnswer(num)}
                      className={`w-12 h-12 rounded-full font-semibold transition-all ${
                        answers.find((a) => a.questionId === currentQ.id)
                          ?.answer === num
                          ? "bg-cyan-300 text-slate-950"
                          : "bg-slate-800 text-white hover:bg-slate-700"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Not at all</span>
                  <span>Completely</span>
                </div>
              </div>
            ) : null}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              className="mt-8 text-sm text-slate-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
