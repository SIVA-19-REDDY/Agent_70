import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { AppShell } from './components/layout/AppShell';

// Focused & Specialized Views
import { LoginView } from './views/LoginView';
import { AICopilotView } from './views/AICopilotView';
import { PrioritiesView } from './views/PrioritiesView';
import { DecisionsView } from './views/DecisionsView';
import { CourseDiagnosticsView } from './views/CourseDiagnosticsView';
import { ScenarioExplorerView } from './views/ScenarioExplorerView';
import { EvidenceExplorerView } from './views/EvidenceExplorerView';
import { FacultySupportView } from './views/FacultySupportView';
import { OutcomeTrackingView } from './views/OutcomeTrackingView';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />

      {/* Main Protected Shell: Pure White Theme Institutional Decision Workspace */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<AICopilotView />} />
        <Route path="priorities" element={<PrioritiesView />} />
        <Route path="diagnostics" element={<CourseDiagnosticsView />} />
        <Route path="scenarios" element={<ScenarioExplorerView />} />
        <Route path="decisions" element={<DecisionsView />} />
        <Route path="evidence" element={<EvidenceExplorerView />} />
        <Route path="faculty" element={<FacultySupportView />} />
        <Route path="outcomes" element={<OutcomeTrackingView />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
