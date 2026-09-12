import express from 'express';
import { AIService } from '../ai/AIService.js';

const router = express.Router();
const aiService = new AIService();

// AI Engine Status
router.get('/status', (req, res) => {
  try {
    const status = aiService.getProviderStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Primary AI Chat & Decision Pipeline
router.post('/chat', async (req, res) => {
  try {
    const { question, context = {}, provider = 'gemini', options = {} } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'A valid question string is required.' });
    }

    const result = await aiService.analyzeQuery(question, context, provider, options);
    res.json(result);
  } catch (err) {
    console.error('AI chat endpoint error:', err);
    res.status(500).json({
      error: 'Unable to complete AI academic analysis.',
      details: err.message
    });
  }
});

// Scenario Simulation endpoint
router.post('/scenario', (req, res) => {
  try {
    const result = aiService.simulateIntervention(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
