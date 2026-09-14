/**
 * Client API connector for Agent 70 - Academic Decision Support Agent
 * Connects to Express backend on /api with intelligent error handling.
 */

const BASE_URL = '/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth
  register: (userData) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getRoles: () => fetchApi('/auth/roles'),

  // AI Decision Engine
  getAIStatus: () => fetchApi('/ai/status'),
  askAIChat: (payload) => fetchApi('/ai/chat', { method: 'POST', body: JSON.stringify(payload) }),
  simulateScenario: (payload) => fetchApi('/ai/scenario', { method: 'POST', body: JSON.stringify(payload) }),

  // Priorities & Decisions
  getPriorities: () => fetchApi('/priorities'),
  getDecisions: () => fetchApi('/decisions'),
  createDecision: (decision) => fetchApi('/decisions', { method: 'POST', body: JSON.stringify(decision) }),
  recordOutcome: (decisionIdOrOutcome, maybeOutcome) => {
    if (maybeOutcome) {
      return fetchApi(`/decisions/${decisionIdOrOutcome}/outcome`, { method: 'POST', body: JSON.stringify(maybeOutcome) });
    }
    return fetchApi('/outcomes', { method: 'POST', body: JSON.stringify(decisionIdOrOutcome) });
  },
  recordPostInterventionOutcome: (outcome) => fetchApi('/outcomes', { method: 'POST', body: JSON.stringify(outcome) }),

  // Diagnostics & Support
  getCourses: () => fetchApi('/courses'),
  getCourseDetail: (id) => fetchApi(`/courses/${id}`),
  getFaculty: () => fetchApi('/faculty'),
  getOutcomes: () => fetchApi('/outcomes'),

  // Evidence & Multi-Agent Telemetry (PDF Specification)
  getEvidence: () => fetchApi('/evidence'),
  getAgentDetail: (agentId) => fetchApi(`/evidence/agents/${agentId}`),
  ingestAgentTelemetry: (agentId, payload, label) =>
    fetchApi(`/evidence/${agentId}/telemetry`, {
      method: 'POST',
      body: JSON.stringify({ payload, label })
    }),
  resetEvidenceTelemetry: () => fetchApi('/evidence/reset', { method: 'POST' }),

  // End-to-End 100-Entry Dataset & Sub-Agents Pipeline
  getAcademicDataset: () => fetchApi('/pipeline/dataset'),
  executePipeline: () => fetchApi('/pipeline/execute'),
  getSubAgents: () => fetchApi('/pipeline/subagents'),
  getSubAgentDetail: (id) => fetchApi(`/pipeline/subagents/${id}`),
  getAgent70DecisionSupport: () => fetchApi('/agent70/decision-support'),
  askAgent70DrillDown: (question) =>
    fetchApi('/agent70/query', {
      method: 'POST',
      body: JSON.stringify({ question })
    })
};
