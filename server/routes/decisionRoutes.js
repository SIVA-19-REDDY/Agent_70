import express from 'express';
import { INSTITUTIONAL_DATA } from '../data/institutionalData.js';

const router = express.Router();

// Decisions Register (Section 24)
router.get('/decisions', (req, res) => {
  // Combine recorded decisions with their measured outcomes
  const decisionsWithOutcomes = INSTITUTIONAL_DATA.recorded_decisions.map(d => {
    const outcome = INSTITUTIONAL_DATA.outcome_tracking.find(o => o.decision_id === d.id);
    return {
      ...d,
      outcome: outcome || null
    };
  });

  res.json({
    total: decisionsWithOutcomes.length,
    decisions: decisionsWithOutcomes
  });
});

// Record Decision (Section 21)
router.post('/decisions', (req, res) => {
  const {
    issue,
    selected_option,
    expected_effect,
    owner = "HoD",
    review_date,
    notes = ""
  } = req.body;

  if (!issue || !selected_option) {
    return res.status(400).json({ error: 'Issue description and selected option are required.' });
  }

  const newDecision = {
    id: `dec_${Date.now()}`,
    title: selected_option,
    issue,
    chosen_action: selected_option,
    expected_outcome: expected_effect || "Target pass rate improvement",
    owner,
    start_date: new Date().toISOString().split('T')[0],
    target_review_date: review_date || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    status: "Active",
    notes,
    outcome: null
  };

  INSTITUTIONAL_DATA.recorded_decisions.unshift(newDecision);

  res.status(201).json({
    success: true,
    message: 'Academic decision formally recorded in institutional register.',
    decision: newDecision
  });
});

// Outcome Record (Section 22)
router.post('/decisions/:id/outcome', (req, res) => {
  const decisionId = req.params.id;
  const {
    expected_outcome = "72%",
    actual_outcome = "75%",
    expected_improvement = "+11%",
    actual_improvement = "+14%",
    variance = "Better than expected",
    lessons_learned = ""
  } = req.body;

  const decision = INSTITUTIONAL_DATA.recorded_decisions.find(d => d.id === decisionId);
  if (!decision) {
    return res.status(404).json({ error: 'Decision not found.' });
  }

  const outcomeRecord = {
    id: `out_${Date.now()}`,
    decision_id: decisionId,
    expected_outcome,
    actual_outcome,
    expected_improvement,
    actual_improvement,
    variance,
    lessons_learned: lessons_learned || "Documented positive feedback incorporated into historical intervention learning model.",
    recorded_date: new Date().toISOString().split('T')[0]
  };

  decision.status = "Completed";
  decision.outcome = outcomeRecord;

  // Add to outcome tracking historical library
  INSTITUTIONAL_DATA.outcome_tracking.unshift({
    id: outcomeRecord.id,
    decision_id: decisionId,
    title: decision.chosen_action,
    intervention: decision.chosen_action,
    target_population: decision.issue,
    baseline_pass_rate: 61,
    expected_pass_rate: parseInt(expected_outcome) || 72,
    actual_pass_rate: parseInt(actual_outcome) || 75,
    expected_improvement: parseInt(expected_improvement) || 11,
    actual_improvement: parseInt(actual_improvement) || 14,
    variance_assessment: variance,
    what_did_we_learn: outcomeRecord.lessons_learned,
    closed_date: outcomeRecord.recorded_date,
    reviewed_by: decision.owner
  });

  res.json({
    success: true,
    message: 'Outcome recorded and integrated into historical learning archive.',
    decision,
    outcome: outcomeRecord
  });
});

export default router;
