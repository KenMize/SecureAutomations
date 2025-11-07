import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

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
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold text-cyan-300 mb-4">
              404
            </h1>
            <p className="text-2xl font-semibold mb-2">Page not found</p>
            <p className="text-slate-400">
              The page you're looking for doesn't exist.
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-950 px-6 py-3 text-sm shadow hover:bg-slate-100 transition-colors font-medium"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
