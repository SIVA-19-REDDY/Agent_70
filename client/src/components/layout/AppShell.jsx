import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Sparkles } from 'lucide-react';
import { InstitutionalOfficialHeader } from './InstitutionalOfficialHeader';
import { Sidebar } from './Sidebar';
import { DecisionModal } from '../common/DecisionModal';
import { EvidenceDrawer } from '../common/EvidenceDrawer';
import { AIRobotAvatar } from '../ai/AIRobotAvatar';
import { useAuth } from '../../contexts/AuthContext';

export function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamic titles based on route
  const getBannerDetails = () => {
    switch (location.pathname) {
      case '/priorities':
        return {
          title: "Agent 70 — Priority Interventions",
          subtitle: "Ranked academic problems ordered by institutional impact, actionability, and historical priority scores."
        };
      case '/diagnostics':
        return {
          title: "Agent 70 — Course Diagnostics",
          subtitle: "Deep-dive diagnostic analysis across course sections, historical baseline norms, and assessment papers."
        };
      case '/scenarios':
        return {
          title: "Agent 70 — Scenario Simulator",
          subtitle: "Simulate 'What-If' remedial interventions with live recalculation of projected pass rates and student rescues."
        };
      case '/decisions':
        return {
          title: "Agent 70 — Decisions Register",
          subtitle: "Formal institutional leadership docket tracking recorded actions, review milestones, and measured outcomes."
        };
      case '/evidence':
        return {
          title: "Agent 70 — Evidence Explorer",
          subtitle: "Audit-grade telemetry tracing cross-domain academic evidence ingested from Agents 6 through 69."
        };
      case '/faculty':
        return {
          title: "Agent 70 — Faculty Support",
          subtitle: "Targeted teaching allocation, lab coordination diagnostics, and faculty enhancement recommendations."
        };
      case '/outcomes':
        return {
          title: "Agent 70 — Outcome Tracking",
          subtitle: "Continuous feedback loop tracking historical interventions vs measured reality for institutional learning."
        };
      default:
        return {
          title: "Agent 70 — Academic Decision Support",
          subtitle: "Your professional institutional intelligence companion for diagnostic guidance, priority interventions, and multi-agent academic telemetry."
        };
    }
  };

  const banner = getBannerDetails();

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-800 font-sans">
      {/* 1. Official Institutional Header (Fixed Top) */}
      <InstitutionalOfficialHeader />

      {/* 2. Main Workspace Area (Clean & simple without top status/telemetry bar) */}
      <div className="flex-1 flex min-w-0 bg-[#F8FAFC]">
        {/* Fixed Left Sidebar Navigation */}
        {isSidebarOpen && (
          <div className="sticky top-[105px] h-[calc(100vh-105px)] shrink-0 z-30 bg-white">
            <Sidebar 
              onCollapse={() => setIsSidebarOpen(false)}
            />
          </div>
        )}

        {/* Floating Expand Sidebar Button when Navigation is Collapsed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 border border-blue-400/40 animate-fadeIn"
            title="Expand Sidebar Navigation"
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span>Show Navigation</span>
          </button>
        )}

        {/* Scrollable Content Container (Pure White Theme) */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto min-w-0">
          {/* Page Body View (Full Height & Elaborate Expansion) */}
          <main className="min-h-[500px] transition-all duration-300">
            <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
          </main>
        </div>
      </div>

      {/* Decision Recording Modal */}
      <DecisionModal />

      {/* Multi-Agent Telemetry & Evidence Verification Drawer */}
      <EvidenceDrawer />
    </div>
  );
}

export default AppShell;
