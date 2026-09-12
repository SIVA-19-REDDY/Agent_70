import express from 'express';
import { INSTITUTIONAL_DATA } from '../data/institutionalData.js';
import { MOCK_AI_RESPONSES } from '../data/mockAIResponses.js';

const router = express.Router();

// Priorities Endpoint (Section 23)
// Show AI-generated ranked findings: Rank, Course/Issue, Impact, Actionability, Priority, Reason, Confidence, Recommended next step
router.get('/priorities', (req, res) => {
  const ranked = [
    {
      rank: 1,
      course_or_issue: "Data Structures (CS201)",
      department: "CSE",
      impact: "High",
      actionability: "High",
      priority_score: 91,
      reason: "Significant decline (-13 pp vs historical norm), 14% syllabus delay in tree recursion.",
      confidence: 88,
      recommended_next_step: "Deploy 4-week targeted weekend remedial clinic for weakest 20 students.",
      students_affected: 240,
      current_pass_pct: 61,
      historical_pass_pct: 74,
      deviation: -13,
      query: "Which courses require immediate intervention this semester?"
    },
    {
      rank: 2,
      course_or_issue: "Digital Signal Processing (EC201)",
      department: "ECE",
      impact: "High",
      actionability: "Medium",
      priority_score: 89,
      reason: "High mathematical rigor, 17% syllabus delay, and faculty contact hour overload (19 hrs/wk).",
      confidence: 86,
      recommended_next_step: "Allocate M.Tech teaching assistant for lab evaluations and schedule DSP bridge clinic.",
      students_affected: 180,
      current_pass_pct: 59,
      historical_pass_pct: 73,
      deviation: -14,
      query: "Which courses require immediate intervention this semester?"
    },
    {
      rank: 3,
      course_or_issue: "Database Management Systems (CS202)",
      department: "CSE",
      impact: "High",
      actionability: "High",
      priority_score: 84,
      reason: "Assessment gap in SQL normalization quiz and post-midterm attendance drop in Section C (59%).",
      confidence: 84,
      recommended_next_step: "Implement interactive SQL query clinics and peer-assisted lab practice.",
      students_affected: 240,
      current_pass_pct: 65,
      historical_pass_pct: 76,
      deviation: -11,
      query: "Which courses require immediate intervention this semester?"
    },
    {
      rank: 4,
      course_or_issue: "CSE Year 2 Section B Friday Lab",
      department: "CSE",
      impact: "High",
      actionability: "High",
      priority_score: 82,
      reason: "Attendance plunge to 58% due to late-afternoon Friday scheduling fatigue.",
      confidence: 92,
      recommended_next_step: "Reschedule Friday 3:30-5:30 PM lab to Wednesday morning.",
      students_affected: 60,
      current_pass_pct: 54,
      historical_pass_pct: 72,
      deviation: -18,
      query: "Which sections show declining performance compared to last semester?"
    },
    {
      rank: 5,
      course_or_issue: "Operating Systems (CS301)",
      department: "CSE",
      impact: "High",
      actionability: "Medium",
      priority_score: 78,
      reason: "Cognitive difficulty spike in midterm paper on concurrency & semaphores.",
      confidence: 81,
      recommended_next_step: "Recalibrate item difficulty on question paper and provide synchronization tutorial sheets.",
      students_affected: 230,
      current_pass_pct: 69,
      historical_pass_pct: 78,
      deviation: -9,
      query: "Which courses require immediate intervention this semester?"
    }
  ];

  res.json({
    total: ranked.length,
    priorities: ranked
  });
});

// All courses metadata for reference
router.get('/courses', (req, res) => {
  res.json({
    total: INSTITUTIONAL_DATA.courses.length,
    courses: INSTITUTIONAL_DATA.courses
  });
});

// Single course detail diagnostic endpoint
router.get('/courses/:id', (req, res) => {
  const courseId = req.params.id.toLowerCase();
  const course = INSTITUTIONAL_DATA.courses.find(c => c.id.toLowerCase() === courseId || c.code.toLowerCase() === courseId) || INSTITUTIONAL_DATA.courses[0];
  
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.json({
    course,
    sections: course.sections || [],
    historical_trend: course.historical_trend || [
      { semester: "2024 Sem 1", pass_pct: 75 },
      { semester: "2024 Sem 2", pass_pct: 74 },
      { semester: "2025 Sem 1", pass_pct: 76 },
      { semester: "2025 Sem 2", pass_pct: 73 },
      { semester: "2026 Sem 1 (Current)", pass_pct: course.current_pass_pct || 61 }
    ],
    diagnostic_drivers: [
      { name: "Exam Paper Difficulty", score: 85, benchmark: 60, status: "Critical Spike" },
      { name: "Instructional Delay", score: 68, benchmark: 50, status: "14% Delay in Module 3" },
      { name: "Attendance Friction", score: 62, benchmark: 75, status: "Section B Dropped to 58%" },
      { name: "Lab Completion Gap", score: 55, benchmark: 70, status: "Pointer Lab Incomplete" }
    ],
    recommended_options: [
      {
        option: "Option A: 4-Week Targeted Weekend Clinic",
        action: "Deploy targeted remedial clinics for weakest 20 students focused on tree recursion and dynamic memory.",
        expected_effect: "+14 percentage points pass rate recovery (to 75%)",
        lead_time: "Immediate (Week 11)",
        confidence: "88%"
      },
      {
        option: "Option B: Teaching Assistant Lab Allocation",
        action: "Assign 2 M.Tech TAs to Section B lab sessions for 1-on-1 code debugging support.",
        expected_effect: "+8 pp pass rate; restores attendance to ~72%",
        lead_time: "3 days",
        confidence: "84%"
      }
    ]
  });
});

// Faculty support diagnostics
router.get('/faculty', (req, res) => {
  res.json({
    faculty: [
      {
        name: "Prof. R. Venkatraman",
        department: "CSE",
        courses: ["CS201 Data Structures", "CS304 Operating Systems"],
        contact_hours_per_week: 19.5,
        norm_hours: 14.0,
        overload: "+5.5 hrs/wk",
        status: "Contact Hour Overload",
        support_recommendation: "Assign 2 M.Tech Teaching Assistants for lab evaluation; rebalance tutorial sections."
      },
      {
        name: "Dr. Sunita Kulkarni",
        department: "CSE",
        courses: ["CS202 Database Systems"],
        contact_hours_per_week: 14.0,
        norm_hours: 14.0,
        overload: "Balanced",
        status: "Lab Coordination Assistance",
        support_recommendation: "Provide dedicated database server lab instructor to assist with post-midterm SQL indexing labs."
      }
    ]
  });
});

// Historical outcome tracking
router.get('/outcomes', (req, res) => {
  const outcomes = INSTITUTIONAL_DATA.outcome_tracking || INSTITUTIONAL_DATA.historical_interventions || [];
  res.json({
    outcomes
  });
});

// Record Post-Intervention Outcome (Section 22, 37 Continuous Learning)
router.post('/outcomes', (req, res) => {
  const {
    title,
    intervention,
    target_population = "Enrolled Academic Cohort",
    baseline_pass_rate,
    expected_pass_rate,
    actual_pass_rate,
    what_did_we_learn,
    reviewed_by = "HoD CSE / Academic Council"
  } = req.body;

  const baseline = Number(baseline_pass_rate) || 55;
  const expected = Number(expected_pass_rate) || 70;
  const actual = Number(actual_pass_rate) || 74;
  const expectedImprovement = expected - baseline;
  const actualImprovement = actual - baseline;
  const diff = actual - expected;

  let varianceAssessment = "Met Target exactly";
  if (diff > 0) {
    varianceAssessment = `Better than Expected (+${diff}% over target)`;
  } else if (diff < 0) {
    varianceAssessment = `Below Expected (${diff}% under target)`;
  }

  const newOutcome = {
    id: `out_${Date.now()}`,
    decision_id: `dec_${Date.now()}`,
    title: title || "Remedial Post-Intervention Clinic",
    intervention: intervention || "Targeted Weekend Problem-Solving",
    target_population,
    baseline_pass_rate: baseline,
    expected_pass_rate: expected,
    actual_pass_rate: actual,
    expected_improvement: expectedImprovement,
    actual_improvement: actualImprovement,
    expected_attendance: 78,
    actual_attendance: 82,
    variance_assessment: varianceAssessment,
    what_did_we_learn: what_did_we_learn || "Documented pedagogical insight incorporated into institutional memory.",
    closed_date: new Date().toISOString().split('T')[0],
    reviewed_by
  };

  if (!Array.isArray(INSTITUTIONAL_DATA.outcome_tracking)) {
    INSTITUTIONAL_DATA.outcome_tracking = [];
  }
  INSTITUTIONAL_DATA.outcome_tracking.unshift(newOutcome);

  res.status(201).json({
    success: true,
    message: 'Post-intervention outcome successfully recorded in institutional memory.',
    outcome: newOutcome
  });
});

// Evidence sources
router.get('/evidence', (req, res) => {
  const totalOutcomes = (INSTITUTIONAL_DATA.outcome_tracking || []).length;
  res.json({
    total_agents: INSTITUTIONAL_DATA.source_agents.length,
    agents: INSTITUTIONAL_DATA.source_agents,
    total_historical_records: totalOutcomes
  });
});

export default router;
