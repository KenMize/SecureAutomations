import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface QuizAnswer {
  questionId: string;
  answer: string | number;
}

interface QuizResult {
  email: string;
  name: string;
  company: string;
  score: number;
  recommendation: string;
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
    options: ["Daily", "Multiple times per week", "Weekly", "Monthly", "Varies"],
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
    question: "Do these tasks need human review, or can they be fully autonomous?",
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
  const [userInfo, setUserInfo] = useState({ email: "", name: "", company: "" });
  const [showUserForm, setShowUserForm] = useState(false);

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

  const calculateScore = (): { score: number; recommendation: string } => {
    let score = 0;
    const answerMap = Object.fromEntries(
      answers.map((a) => [a.questionId, a.answer])
    );

    if (
      answerMap["pain-points"] ===
        "Manual data entry and repetitive tasks" ||
      answerMap["pain-points"] === "Invoice processing and financial workflows"
    ) {
      score += 20;
    } else if (
      answerMap["pain-points"] === "Appointment booking and scheduling" ||
      answerMap["pain-points"] === "Lead qualification and sales follow-ups"
    ) {
      score += 15;
    } else {
      score += 10;
    }

    if (answerMap["task-frequency"] === "Daily") {
      score += 25;
    } else if (answerMap["task-frequency"] === "Multiple times per week") {
      score += 20;
    } else if (answerMap["task-frequency"] === "Weekly") {
      score += 15;
    } else {
      score += 10;
    }

    if (answerMap["complexity-level"] === "Simple and rule-based (if X then Y)") {
      score += 15;
    } else if (
      answerMap["complexity-level"] === "Mostly routine with occasional exceptions"
    ) {
      score += 20;
    } else {
      score += 25;
    }

    if (answerMap["volume-scale"] === "Very high (1000+ per day)") {
      score += 20;
    } else if (answerMap["volume-scale"] === "High (100-1000 per day)") {
      score += 15;
    } else {
      score += 10;
    }

    if (answerMap["data-readiness"] >= 4) {
      score += 5;
    }
    if (answerMap["systems-integration"] === "Well integrated and connected") {
      score += 5;
    }
    if (answerMap["team-readiness"] === "Eager to adopt new tools") {
      score += 5;
    }

    let recommendation = "Quick-Start RPA or Simple Automation";
    if (score >= 85) {
      recommendation = "Full AI Agent Platform (with Learning & Autonomy)";
    } else if (score >= 65) {
      recommendation = "Hybrid AI Agent + Workflow Automation";
    }

    return { score: Math.min(100, score), recommendation };
  };

  const handleSubmitUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.name || !userInfo.company) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { score, recommendation } = calculateScore();
      const answerMap = Object.fromEntries(
        answers.map((a) => [a.questionId, a.answer])
      );

      const resultData: QuizResult = {
        email: userInfo.email,
        name: userInfo.name,
        company: userInfo.company,
        score,
        recommendation,
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
        setShowResults(true);
      } else {
        alert("Failed to submit quiz. Please try again.");
      }
    } catch (error) {
      console.error("Quiz submission error:", error);
      alert(
        "An error occurred. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showResults && result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
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
                  {result.recommendation === "Full AI Agent Platform (with Learning & Autonomy)" ? (
                    <>
                      You're a strong candidate for autonomous AI agents. Your workflows are
                      complex, high-volume, and have clear ROI potential. You can deploy
                      intelligent agents that learn and adapt with minimal human oversight.
                    </>
                  ) : result.recommendation === "Hybrid AI Agent + Workflow Automation" ? (
                    <>
                      A combined approach works best for you. Deploy AI agents for customer
                      engagement while using workflow automations for back-office operations. This
                      maximizes ROI and covers both internal and external processes.
                    </>
                  ) : (
                    <>
                      Start with focused RPA or simple automation to build momentum. Once you see
                      quick wins, you can expand to more sophisticated AI agents and workflows.
                      Quick wins build internal support for larger initiatives.
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-slate-950/40 p-6 border border-white/10">
                <h3 className="font-semibold text-cyan-300 mb-4">Your Assessment</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div>
                    <span className="text-slate-400">Primary Pain Point:</span>
                    <p className="font-medium">{result.details["pain-points"]}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Complexity Level:</span>
                    <p className="font-medium">{result.details["complexity-level"]}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Volume:</span>
                    <p className="font-medium">{result.details["volume-scale"]}</p>
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
                Your results have been sent to {result.email} and our Sales team. We'll be in
                touch shortly!
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
            <p className="text-slate-300 mb-8">
              Just need a few details to send you your personalized recommendations.
            </p>

            <form onSubmit={handleSubmitUserInfo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={userInfo.name}
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
                  value={userInfo.email}
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
                  value={userInfo.company}
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
