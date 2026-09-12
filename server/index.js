import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import decisionRoutes from './routes/decisionRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', academicRoutes);
app.use('/api', decisionRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Operational',
    system: 'Agent 70 - Academic Decision Support Agent (AURA)',
    platform: '72-Agent Institutional Academic Management Platform',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Academic Decision Support Agent (Agent 70) - Backend`);
  console.log(` AURA Decision Intelligence Platform running on :${PORT}`);
  console.log(` API Health: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
