import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import Checkup from "./pages/Checkup";
import Quiz from "./pages/Quiz";
import ThankYou from "./pages/ThankYou";
import Examples from "./pages/Examples";
import AgentDemo from "./pages/AgentDemo";
import NotFound from "./pages/NotFound";

function DemoWrapper() {
  const { agentId } = useParams();
  return <AgentDemo agentId={agentId} />;
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/checkup" element={<Checkup />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/examples" element={<Examples />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
