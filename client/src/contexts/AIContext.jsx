import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AIContext = createContext();

export function AIProvider({ children }) {
  const [provider, setProvider] = useState('gemini');
  const [providerStatus, setProviderStatus] = useState({
    gemini: { configured: true, status: 'Available', model: 'gemini-flash-latest' },
    demo_mode_active: false
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState(null);

  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [decisionContext, setDecisionContext] = useState(null);

  const [isBriefModalOpen, setIsBriefModalOpen] = useState(false);
  const [briefData, setBriefData] = useState(null);

  const [quickQuestion, setQuickQuestion] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const status = await api.getAIStatus();
      setProviderStatus(status);
    } catch (err) {
      console.warn('Could not fetch AI status:', err.message);
      setProviderStatus({
        gemini: { configured: true, status: 'Available', model: 'gemini-flash-latest' },
        demo_mode_active: false
      });
    }
  };

  const openEvidenceDrawer = (evidenceData) => {
    setActiveEvidence(evidenceData);
    setIsDrawerOpen(true);
  };

  const closeEvidenceDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDecisionModal = (context = null) => {
    setDecisionContext(context);
    setIsDecisionModalOpen(true);
  };

  const closeDecisionModal = () => {
    setIsDecisionModalOpen(false);
    setDecisionContext(null);
  };

  const openBriefModal = (data = null) => {
    setBriefData(data);
    setIsBriefModalOpen(true);
  };

  const closeBriefModal = () => {
    setIsBriefModalOpen(false);
    setBriefData(null);
  };

  const triggerAskQuestion = (questionText) => {
    setQuickQuestion(questionText);
  };

  return (
    <AIContext.Provider value={{
      provider,
      setProvider,
      providerStatus,
      fetchStatus,
      isDrawerOpen,
      activeEvidence,
      openEvidenceDrawer,
      closeEvidenceDrawer,
      isDecisionModalOpen,
      decisionContext,
      openDecisionModal,
      closeDecisionModal,
      isBriefModalOpen,
      briefData,
      openBriefModal,
      closeBriefModal,
      quickQuestion,
      setQuickQuestion,
      triggerAskQuestion
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  return useContext(AIContext);
}
