import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white text-slate-950 font-black flex items-center justify-center">
              SA
            </div>
            <span className="font-semibold tracking-tight">
              Secure Automations
            </span>
          </div>
          <a
            href="/"
            className="text-sm text-slate-300 hover:text-white transition-colors"
          >
            Back to Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-cyan-300" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Assessment Received
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Thank you for completing the Secure Automations AI Security Checkup.
          </p>

          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mt-8">
            <p className="text-slate-300 text-lg leading-relaxed">
              Your personalized readiness report will arrive in your inbox
              within 2 business days. Our compliance team will review your
              responses and provide actionable recommendations tailored to your
              organization.
            </p>
          </div>

          <div className="pt-8">
            <p className="text-slate-300 mb-6 text-lg font-medium">
              Want to talk sooner?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow inline-flex items-center justify-center hover:bg-slate-100 transition-colors font-medium"
              >
                Book a consultation
              </a>
              <a
                href="/examples"
                className="rounded-2xl border border-white/20 px-6 py-3 text-sm inline-flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-colors font-medium"
              >
                Explore compliance & Zero Trust
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">Next Steps</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>Check your email for your readiness report</li>
              <li>Review the compliance recommendations</li>
              <li>Schedule a follow-up consultation</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">Questions?</h3>
            <p className="text-sm text-slate-300 mb-4">
              Our team is here to help. Reach out anytime.
            </p>
            <a
              href="mailto:sales@secureautomations.ai"
              className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors font-medium"
            >
              sales@secureautomations.ai
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-cyan-300 mb-3">Resources</h3>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Back to home
                </a>
              </li>
              <li>
                <a
                  href="/examples"
                  className="hover:text-white transition-colors"
                >
                  Example workflows
                </a>
              </li>
              <li>
                <a
                  href="/#solutions"
                  className="hover:text-white transition-colors"
                >
                  Our solutions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Secure Automations</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Responsible AI
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
