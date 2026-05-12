import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
const ProtoSupreme = React.lazy(() => import("./pages/ProtoSupreme.tsx"));
const Precios = React.lazy(() => import("./pages/Precios.tsx"));
const Proto1 = React.lazy(() => import("./pages/Proto1.tsx"));
const Proto2 = React.lazy(() => import("./pages/Proto2.tsx"));
const Proto3 = React.lazy(() => import("./pages/Proto3.tsx"));
const About = React.lazy(() => import("./pages/About.tsx"));
const Terms = React.lazy(() => import("./pages/Terms.tsx"));
import { ParticleCanvas } from "./components/ui/particle-canvas.tsx";

import { SmoothScroll } from "./components/SmoothScroll.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SmoothScroll>
        <BrowserRouter basename="/tfcmunir2026">
          <div className="fixed inset-0 z-[-1] bg-brand-bg">
            <ParticleCanvas className="!fixed inset-0" />
          </div>
          <div className="relative z-0">
            <Suspense fallback={<div className="min-h-screen bg-brand-bg flex items-center justify-center"><span className="text-brand-primary font-mono text-sm animate-pulse">Cargando...</span></div>}>
              <Routes>
                <Route path="/" element={<ProtoSupreme />} />
                <Route path="/legacy" element={<Index />} />
                <Route path="/precios" element={<Precios />} />
                <Route path="/acerca-de" element={<About />} />
                <Route path="/terminos" element={<Terms />} />
                {/* Prototipos NeoFlow Calm */}
                <Route path="/proto1" element={<Proto1 />} />
                <Route path="/proto2" element={<Proto2 />} />
                <Route path="/proto3" element={<Proto3 />} />
                <Route path="/supreme" element={<ProtoSupreme />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </SmoothScroll>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
