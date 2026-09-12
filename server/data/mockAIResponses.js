/**
 * High-fidelity, deterministic mock AI responses for Agent 70 (AURA).
 * Tailored for Heads of Department (HoD) and Deans.
 * Conforms strictly to the structured answer format:
 * - Executive Answer
 * - Analysis Scope (Decomposition & Source Agents)
 * - Ranked Findings (with Impact, Actionability, Priority Score)
 * - Why these were prioritised
 * - Driver Diagnosis (Paper difficulty vs Teaching vs Preparedness)
 * - Evidence Used (with "How this evidence was used")
 * - Recommended Options (Action, Expected Effect, Resources, Lead Time, Confidence, Evidence Basis)
 * - Inline Scenario ("WHAT IF?")
 * - Confidence & Limitations
 * - Contextual Follow-up inquiries
 */

export const MOCK_AI_RESPONSES = {
  // Question 1: Which courses require immediate intervention this semester?
  "courses_intervention": {
    "executive_answer": "3 courses require immediate attention this semester based on cross-domain evidence: Data Structures (Priority 91), DBMS (Priority 84), and Operating Systems (Priority 78).",
    "analysis_scope": {
      "question": "Which courses require immediate intervention?",
      "checklist": [
        "Current failure rate",
        "Historical course norm",
        "Section entry ability",
        "Attendance",
        "Engagement",
        "Syllabus progress",
        "Forecast",
        "Historical interventions"
      ],
      "source_agents_consulted": [
        "Agent 34 — Result Analysis",
        "Agent 11 — Attendance",
        "Agent 7 — Teaching-Learning Analytics",
        "Agent 6 — Course Progress",
        "Agent 15 — Forecasting",
        "Historical Intervention Records"
      ]
    },
    "ranked_findings": [
      {
        "rank": 1,
        "course_or_issue": "Data Structures (CS201)",
        "department": "CSE",
        "impact": "High",
        "actionability": "High",
        "priority_score": 91,
        "main_reason": "Significant performance decline (-13 pp vs historical norm), 14% syllabus delay, and Section B/C attendance drop.",
        "current_pass": "61%",
        "historical_norm": "74%",
        "deviation": "-13 pp",
        "students_affected": 240,
        "confidence": 88,
        "recommended_next_step": "Deploy 4-week targeted weekend remedial clinic for weakest 20 students."
      },
      {
        "rank": 2,
        "course_or_issue": "DBMS (CS202)",
        "department": "CSE",
        "impact": "High",
        "actionability": "High",
        "priority_score": 84,
        "main_reason": "Failure spike in SQL normalization quiz and post-midterm attendance drop in Section C (59%).",
        "current_pass": "65%",
        "historical_norm": "76%",
        "deviation": "-11 pp",
        "students_affected": 240,
        "confidence": 84,
        "recommended_next_step": "Establish interactive SQL query clinics and peer-assisted lab practice."
      },
      {
        "rank": 3,
        "course_or_issue": "Operating Systems (CS301)",
        "department": "CSE",
        "impact": "High",
        "actionability": "Medium",
        "priority_score": 78,
        "main_reason": "Cognitive difficulty spike in midterm paper on concurrency & semaphores.",
        "current_pass": "69%",
        "historical_norm": "78%",
        "deviation": "-9 pp",
        "students_affected": 230,
        "confidence": 81,
        "recommended_next_step": "Conduct item difficulty recalibration on midterm questions and provide synchronization tutorial sheets."
      }
    ],
    "why_prioritised": [
      "Data Structures affects 240 second-year students; core prerequisite for third-year algorithms, electives, and placement clearance.",
      "The decline is concentrated in Sections B and C rather than uniform across the cohort, indicating targeted instructional and timetable bottlenecks.",
      "Empirical precedent from our 2025 archive proves that intervention before Week 11 produces high recovery rates (+17 pp observed)."
    ],
    "driver_diagnosis": {
      "primary_driver": "Likely Teaching / Coverage Issue + Section Timetable Bottleneck",
      "confidence": 82,
      "explanation": "Section A under lead faculty maintains 72% pass rate, while Section B drops to 54% due to a Friday late-afternoon lab schedule clashing with student fatigue and a 14% syllabus delivery lag in recursive tree algorithms."
    },
    "evidence_used": [
      {
        "source_agent": "Agent 34 — Result Analysis",
        "metric": "Course Pass Rate",
        "current": "61%",
        "previous": "74%",
        "change": "-13 percentage points",
        "population": "CSE Year 2 (240 students)",
        "period": "Semester 1, 2026–27",
        "how_used": "Current course performance was compared with the historical course norm to identify whether the decline is unusual."
      },
      {
        "source_agent": "Agent 11 — Attendance",
        "metric": "Cohort Average Attendance",
        "current": "68%",
        "previous": "78%",
        "change": "-10 percentage points",
        "population": "CS201 Enrolled",
        "period": "Weeks 1–10",
        "how_used": "Evaluated whether performance decline correlates with classroom presence or exists independently as an assessment issue."
      },
      {
        "source_agent": "Agent 6 — Course Progress",
        "metric": "Syllabus Milestone Completion",
        "current": "54%",
        "previous": "68%",
        "change": "-14 percentage points behind schedule",
        "population": "CS201 Syllabus",
        "period": "Week 10 Audit",
        "how_used": "Detected instructional pacing delays in Trees and Dynamic Programming modules."
      },
      {
        "source_agent": "Agent 15 — Forecasting",
        "metric": "Projected Final Pass Rate (Without Action)",
        "current": "58%",
        "previous": "74%",
        "change": "-16 percentage points",
        "population": "CS201 Cohort",
        "period": "End of Semester Forecast",
        "how_used": "Predicted cohort trajectory if no remedial interventions are deployed before Week 11."
      },
      {
        "source_agent": "Historical Intervention Records",
        "metric": "Fall 2025 Remedial Programme Precedent",
        "current": "+17 pp gain",
        "previous": "52% -> 69%",
        "change": "+17 percentage points",
        "population": "20 students (CS201 2025)",
        "period": "2025–26 Sem 1",
        "how_used": "Provided empirical ground truth on what interventions worked previously for this exact course."
      }
    ],
    "recommended_options": [
      {
        "option": "OPTION A: Targeted Remedial Programme",
        "action": "Launch 4-week weekend problem-solving sessions for the 20 weakest second-year students.",
        "expected_effect": "+10 to +16 percentage points pass rate recovery (61% -> 71–77%)",
        "resources": "Faculty time (2 hrs/wk) + 1 graduate TA stipend",
        "lead_time": "4 weeks (commencing Week 11)",
        "confidence": "78%",
        "evidence_basis": "Empirical archive shows 3 comparable interventions achieved an average gain of +13 pp (+9 to +17 range)."
      },
      {
        "option": "OPTION B: Teaching Assistant Allocation & Lab Pacing Support",
        "action": "Assign 2 M.Tech graduate teaching assistants to handle lab evaluations and support Sections B and C.",
        "expected_effect": "+6 to +9 percentage points improvement; relieves faculty contact overload.",
        "resources": "2 Graduate TAs (8 hrs/wk total)",
        "lead_time": "1 week",
        "confidence": "84%",
        "evidence_basis": "Agent 14 workload telemetry confirms faculty contact overload (18 hrs/wk vs 14 hr norm)."
      }
    ],
    "scenario": {
      "title": "WHAT IF?",
      "subtitle": "20 weakest students • 4-week remedial programme",
      "course_code": "CS201",
      "students_targeted": 20,
      "duration_weeks": 4,
      "hours_per_week": 2,
      "attendance_boost_pct": 8,
      "current_pass_rate": 61,
      "estimated_pass_rate_min": 71,
      "estimated_pass_rate_max": 77,
      "estimated_improvement": "+10–16 points",
      "students_benefited": 15,
      "confidence": 78
    },
    "confidence": 82,
    "limitations": [
      "Midterm 2 scripts for Section D are currently in final moderation.",
      "Assumes targeted students maintain at least 80% attendance during remedial sessions."
    ],
    "suggested_follow_ups": [
      "Why is this happening?",
      "Compare with last semester",
      "What worked before?",
      "What should we do?",
      "Run a scenario"
    ]
  },

  // Question 2: Which sections show declining performance compared to last semester?
  "declining_sections": {
    "executive_answer": "Analysis indicates 2 sections show statistically meaningful decline compared to last semester: CSE Year 2 Section B (-18 percentage points) and ECE Year 2 Section C (-15 percentage points).",
    "analysis_scope": {
      "question": "Which sections show declining performance compared to last semester?",
      "checklist": [
        "Section pass rate delta",
        "Average marks variance",
        "Attendance shift",
        "Timetable scheduling",
        "Entry preparedness comparison"
      ],
      "source_agents_consulted": [
        "Agent 34 — Result Analysis",
        "Agent 11 — Attendance",
        "Agent 69 — Early Warning Signals"
      ]
    },
    "ranked_findings": [
      {
        "rank": 1,
        "course_or_issue": "CSE Year 2 — Section B",
        "department": "CSE",
        "impact": "High",
        "actionability": "High",
        "priority_score": 88,
        "main_reason": "Pass rate plummeted from 72% last semester to 54% (-18 pp), tightly correlated with Friday afternoon lab attendance plunge (58%).",
        "current_pass": "54%",
        "historical_norm": "72%",
        "deviation": "-18 pp",
        "students_affected": 60,
        "confidence": 92,
        "recommended_next_step": "Reschedule Friday 3:30-5:30 PM lab to Wednesday morning."
      },
      {
        "rank": 2,
        "course_or_issue": "ECE Year 2 — Section C",
        "department": "ECE",
        "impact": "High",
        "actionability": "Medium",
        "priority_score": 84,
        "main_reason": "Pass rate dropped from 70% to 55% (-15 pp) in Digital Signal Processing with 14 students flagged at risk.",
        "current_pass": "55%",
        "historical_norm": "70%",
        "deviation": "-15 pp",
        "students_affected": 60,
        "confidence": 85,
        "recommended_next_step": "Provide DSP bridge clinics and TA support for filter realization labs."
      }
    ],
    "why_prioritised": [
      "CSE-B decline is sharp and localized to Friday scheduling fatigue rather than general student cognitive failure.",
      "Section A under the same lead faculty maintains 72%, proving curriculum design is viable when delivery schedule is balanced."
    ],
    "driver_diagnosis": {
      "primary_driver": "Timetable Fatigue & Scheduling Bottleneck",
      "confidence": 86,
      "explanation": "Section B has 4 continuous hours of lab scheduled on Friday afternoon, causing a 58% attendance drop."
    },
    "evidence_used": [
      {
        "source_agent": "Agent 34 — Result Analysis",
        "metric": "Section B Pass Rate Delta",
        "current": "54%",
        "previous": "72%",
        "change": "-18 percentage points",
        "population": "60 students (CSE-B)",
        "period": "Sem 1 vs Sem 2 Prior",
        "how_used": "Identified section-level variance isolated from general cohort trends."
      },
      {
        "source_agent": "Agent 11 — Attendance",
        "metric": "Friday Afternoon Lab Attendance",
        "current": "58%",
        "previous": "76%",
        "change": "-18 percentage points",
        "population": "CSE-B",
        "period": "Weeks 4–9",
        "how_used": "Pinpointed specific weekday attendance deficit causing lost lab marks."
      }
    ],
    "recommended_options": [
      {
        "option": "OPTION A: Timetable Rescheduling",
        "action": "Swap Friday afternoon lab slot with Wednesday morning 9:00-11:00 AM slot.",
        "expected_effect": "Attendance recovery to >75%; estimated +8% improvement in subsequent assessments.",
        "resources": "Zero monetary cost; timetable adjustment by Department Scheduling Coordinator",
        "lead_time": "Immediate",
        "confidence": "89%",
        "evidence_basis": "Historical timetable adjustments in 2024 restored attendance to 78% within 2 weeks."
      }
    ],
    "scenario": {
      "title": "WHAT IF?",
      "subtitle": "Timetable swap + attendance recovery to 76%",
      "course_code": "CSE-B",
      "students_targeted": 60,
      "duration_weeks": 2,
      "hours_per_week": 2,
      "attendance_boost_pct": 18,
      "current_pass_rate": 54,
      "estimated_pass_rate_min": 64,
      "estimated_pass_rate_max": 70,
      "estimated_improvement": "+10–16 points",
      "students_benefited": 10,
      "confidence": 86
    },
    "confidence": 88,
    "limitations": [
      "Requires faculty room availability agreement for Wednesday morning slots."
    ],
    "suggested_follow_ups": [
      "Why is this happening?",
      "What about Section A?",
      "What worked before?",
      "Record this decision"
    ]
  },

  // Question 3: Which faculty need additional support, and in what?
  "faculty_support": {
    "executive_answer": "In strict adherence to academic support principles (not punitive appraisal), 2 faculty members need institutional support: Dr. Arvind Ramanathan (workload overload + NBA coordination) and Dr. V. Bharadwaj (contact overload + syllabus delay in DSP).",
    "analysis_scope": {
      "question": "Which faculty need additional support, and in what?",
      "checklist": [
        "Teaching contact hours vs statutory norm",
        "Administrative coordination load",
        "Syllabus coverage progress",
        "Student feedback ratings",
        "Assessment difficulty calibration"
      ],
      "source_agents_consulted": [
        "Agent 14 — Faculty Workload",
        "Agent 6 — Course Progress",
        "Agent 10 — Curriculum Architecture"
      ]
    },
    "ranked_findings": [
      {
        "rank": 1,
        "course_or_issue": "Dr. Arvind Ramanathan (CSE)",
        "department": "CSE",
        "impact": "High",
        "actionability": "High",
        "priority_score": 86,
        "main_reason": "Excess contact hours (18 hrs/wk vs 14 hr norm) + Department NBA Coordinator duties leading to 14% syllabus delay in Data Structures.",
        "current_pass": "N/A (Workload)",
        "historical_norm": "14 hrs norm",
        "deviation": "+4 hrs contact overload",
        "students_affected": 240,
        "confidence": 89,
        "recommended_next_step": "Sanction 2 Graduate Teaching Assistants for lab evaluations and co-lead NBA documentation."
      },
      {
        "rank": 2,
        "course_or_issue": "Dr. V. Bharadwaj (ECE)",
        "department": "ECE",
        "impact": "High",
        "actionability": "Medium",
        "priority_score": 85,
        "main_reason": "Contact overload (19 hrs/wk vs 14 hr norm) + BoS Convener responsibilities; DSP syllabus is 17% behind schedule.",
        "current_pass": "N/A (Workload)",
        "historical_norm": "14 hrs norm",
        "deviation": "+5 hrs contact overload",
        "students_affected": 180,
        "confidence": 86,
        "recommended_next_step": "Provide adjunct lab faculty support to absorb embedded systems lab sessions."
      }
    ],
    "why_prioritised": [
      "Both faculty members possess exemplary student ratings (4.1 and 4.3 out of 5); delays are driven by institutional resource constraints, not instructional deficiency.",
      "Relieving lab evaluation hours allows professors to conduct high-yield remedial problem clinics."
    ],
    "driver_diagnosis": {
      "primary_driver": "Workload Overload & Administrative Burden",
      "confidence": 91,
      "explanation": "Average contact hours exceed institutional ceiling by 30%, coinciding with accreditation documentation peaks."
    },
    "evidence_used": [
      {
        "source_agent": "Agent 14 — Faculty Workload",
        "metric": "Contact Hours / Week",
        "current": "18–19 hrs",
        "previous": "14 hrs max",
        "change": "+4 to +5 hrs overload",
        "population": "Lead Faculty Cohort",
        "period": "Current Term",
        "how_used": "Verified that syllabus delay correlates directly with contact hour overload."
      },
      {
        "source_agent": "Agent 6 — Course Progress",
        "metric": "Syllabus Milestone Gap",
        "current": "51–54%",
        "previous": "68%",
        "change": "-14 to -17 pp behind schedule",
        "population": "CS201 & EC201",
        "period": "Week 10",
        "how_used": "Identified courses where faculty overload has impacted delivery pacing."
      }
    ],
    "recommended_options": [
      {
        "option": "OPTION A: Graduate Teaching Assistant Allocation",
        "action": "Sanction 2 Graduate TAs from the M.Tech scholarship pool to assist with grading and lab conduction.",
        "expected_effect": "Syllabus on-track within 3 weeks; frees 6 hours/week of faculty grading time.",
        "resources": "2 M.Tech Scholars (8 hrs/wk total, Dean Academic fund)",
        "lead_time": "1 week",
        "confidence": "85%",
        "evidence_basis": "Similar TA deployment in 2024 restored syllabus pacing within 18 days."
      }
    ],
    "scenario": {
      "title": "WHAT IF?",
      "subtitle": "Allocate 2 TAs to relieve 6 hrs/wk of lab grading",
      "course_code": "FACULTY-SUPPORT",
      "students_targeted": 40,
      "duration_weeks": 3,
      "hours_per_week": 6,
      "attendance_boost_pct": 0,
      "current_pass_rate": 61,
      "estimated_pass_rate_min": 70,
      "estimated_pass_rate_max": 74,
      "estimated_improvement": "+9–13 points",
      "students_benefited": 30,
      "confidence": 84
    },
    "confidence": 89,
    "limitations": [
      "Graduate Teaching Assistant availability depends on Dean Academic scholarship budget allocation."
    ],
    "suggested_follow_ups": [
      "What interventions worked before?",
      "What should we do?",
      "Record this decision"
    ]
  },

  // Question 4: Remedial programme simulation for 20 weakest students
  "remedial_simulation": {
    "executive_answer": "Based on our own historical intervention records, adding a 4-week weekend remedial programme for the 20 weakest second-year students in Data Structures is projected to yield an improvement of +10 to +16 percentage points, raising pass rate from 61% to 71–77% with 78% confidence.",
    "analysis_scope": {
      "question": "Remedial programme outcome expectation for 20 weakest Year 2 students",
      "checklist": [
        "Identified second-year students",
        "Isolated 20 weakest based on midterm failure (<45/100)",
        "Queried historical intervention archive",
        "Compared 3 similar intervention outcomes",
        "Estimated expected improvement & uncertainty",
        "Assessed resource feasibility & lead time"
      ],
      "source_agents_consulted": [
        "Historical Intervention Records",
        "Agent 35 — Backlog Intelligence",
        "Agent 34 — Result Analysis",
        "Agent 15 — Forecasting"
      ]
    },
    "ranked_findings": [
      {
        "rank": 1,
        "course_or_issue": "CSE Year 2 Data Structures — Weakest 20 Cohort",
        "department": "CSE",
        "impact": "High",
        "actionability": "High",
        "priority_score": 94,
        "main_reason": "High predicted baseline failure (48% without intervention); high recoverability index (82%) if acted upon immediately.",
        "current_pass": "52% (Cohort Baseline)",
        "historical_norm": "69% (Post-Remedial Norm)",
        "deviation": "+17 pp expected gain",
        "students_affected": 20,
        "confidence": 78,
        "recommended_next_step": "Authorize 4-week weekend whiteboard problem clinic commencing Week 11."
      }
    ],
    "why_prioritised": [
      "Empirical archive shows that small-group whiteboard problem-solving produces 2x higher retention than repeating theoretical lectures.",
      "Rescuing these 20 students prevents an estimated 38 credit backlogs in the upcoming 4th semester.",
      "Resource requirement is minimal: 1 faculty member (2 hrs/Saturday) + 1 TA stipend."
    ],
    "driver_diagnosis": {
      "primary_driver": "Remedial Skill Gap in Algorithmic Tracing & Recursion",
      "confidence": 84,
      "explanation": "Targeted 20 students have satisfactory attendance (74%), but failed midterms on recursive tree tracing and dynamic programming proofs."
    },
    "evidence_used": [
      {
        "source_agent": "Historical Intervention Records",
        "metric": "Comparable Historical Interventions",
        "current": "3 Previous Cases",
        "previous": "Average gain: +13 pp",
        "change": "+9 to +17 points observed range",
        "population": "CS201 Cohorts (2024–26)",
        "period": "3 Semesters",
        "how_used": "Ground truth used to benchmark expected effect from real institutional trials."
      },
      {
        "source_agent": "Agent 35 — Backlog Intelligence",
        "metric": "Cohort Recoverability Index",
        "current": "82%",
        "previous": "N/A",
        "change": "High",
        "population": "Target 20 Students",
        "period": "Current Term",
        "how_used": "Verified that students possess the prerequisite foundation to succeed with targeted coaching."
      },
      {
        "source_agent": "Agent 15 — Forecasting",
        "metric": "Projected Pass Probability (With Remedial)",
        "current": "73%",
        "previous": "52%",
        "change": "+21 percentage points",
        "population": "Target 20 Students",
        "period": "End of Term",
        "how_used": "Model projection incorporating attendance target and contact hours."
      }
    ],
    "recommended_options": [
      {
        "option": "OPTION A: Authorize 4-Week Weekend Remedial Clinic",
        "action": "Conduct 2 hours/Saturday problem clinics focusing on whiteboard algorithmic tracing and previous exam patterns.",
        "expected_effect": "+10 to +16 percentage points improvement; 14–16 students expected to clear.",
        "resources": "1 faculty member (2 hrs/wk) + 1 TA stipend, Classroom 204",
        "lead_time": "4 weeks (Weeks 11 to 14)",
        "confidence": "78%",
        "evidence_basis": "Fall 2025 identical protocol resulted in +17 pp observed pass rate increase."
      }
    ],
    "scenario": {
      "title": "WHAT IF?",
      "subtitle": "20 weakest students • 4-week remedial programme",
      "course_code": "CS201",
      "students_targeted": 20,
      "duration_weeks": 4,
      "hours_per_week": 2,
      "attendance_boost_pct": 8,
      "current_pass_rate": 61,
      "estimated_pass_rate_min": 71,
      "estimated_pass_rate_max": 77,
      "estimated_improvement": "+10–16 points",
      "students_benefited": 15,
      "confidence": 78
    },
    "confidence": 78,
    "limitations": [
      "Historical sample size is based on 3 previous intervention cohorts (total n=62 students).",
      "Assumes targeted students maintain minimum 80% attendance throughout the remedial programme."
    ],
    "suggested_follow_ups": [
      "Why is this happening?",
      "What worked before?",
      "What should we do?",
      "Record this decision"
    ]
  }
};
