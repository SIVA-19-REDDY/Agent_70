/**
 * Detailed Specifications and Sample Telemetry for the 12 Source Agents
 * Derived from "Agentic AI Platform for Academic Institutions: Detailed Agent Specifications and Workflows"
 * Consumed by Agent 70 (Academic Decision Support Agent - PDF Page 74)
 */

export const SOURCE_AGENTS_SPEC = [
  {
    id: "agent_6",
    number: 6,
    name: "Agent 6",
    title: "Course Progress Monitoring Agent",
    domain: "Curriculum Delivery",
    pdf_page: 11,
    freshness: "Real-time sync (15 min ago)",
    purpose: "Answers whether the syllabus is actually being covered on schedule, in every section, by every faculty member. Detects slippage early enough to correct it.",
    primary_users: "Heads of Department, Deans, faculty, Internal Quality Assurance Cell (IQAC).",
    pdf_inputs: [
      "Approved lesson plans from Agent 5",
      "Faculty weekly topic completion entries",
      "Attendance and class conduct records",
      "Academic calendar with institutional events"
    ],
    pdf_outputs: [
      "Coverage dashboards and section-wise progress reports",
      "Pending syllabus lists with topic-level granularity",
      "Recovery plan recommendations and extra session requirements",
      "End-of-semester syllabus completion certificates for accreditation"
    ],
    workflow_summary: "1. Establish planned coverage baseline. 2. Collect actual completion entries via mobile/ERP. 3. Compute coverage percentage and variance against plan. 4. Classify status (on track, minor slippage, significant slippage, critical). 5. Estimate extra recovery sessions needed. 6. Escalate to HoD/Dean.",
    current_metrics: {
      metric_name: "Syllabus Coverage Variance",
      current_value: "68% (14% Delay)",
      baseline_value: "82% Planned (Week 10)",
      delta: "-14 percentage points",
      confidence: 94,
      target_course: "CS201 Data Structures (Section B & C)",
      status: "Significant Slippage",
      delayed_unit: "Unit 4: Tree Recursion & Dynamic Programming",
      extra_sessions_needed: 4
    },
    sample_inputs: [
      {
        id: "sample_6_critical",
        label: "Sample A: Severe Slippage in CS201 Unit 4 (18% Delay)",
        payload: {
          course_code: "CS201",
          section: "CSE-B",
          current_week: 11,
          planned_coverage_pct: 85,
          actual_completion_pct: 67,
          pending_topics: "B-Trees, AVL Balancing, Dynamic Programming Memoization",
          estimated_recovery_sessions: 6,
          faculty_remarks: "Practical tracing of tree rotations required 2 additional lab sessions."
        }
      },
      {
        id: "sample_6_recovered",
        label: "Sample B: Timetable Recovery in CS202 (On Track)",
        payload: {
          course_code: "CS202",
          section: "CSE-A",
          current_week: 11,
          planned_coverage_pct: 82,
          actual_completion_pct: 80,
          pending_topics: "Query Optimization & Indexing",
          estimated_recovery_sessions: 1,
          faculty_remarks: "Completed extra tutorial on Saturday to recover schedule."
        }
      }
    ]
  },
  {
    id: "agent_7",
    number: 7,
    name: "Agent 7",
    title: "Teaching-Learning Analytics Agent",
    domain: "Learning Behavior",
    pdf_page: 12,
    freshness: "Updated 1 hour ago",
    purpose: "Correlates the many separate signals of teaching effectiveness into a single interpretable picture. Discovers hidden correlations, e.g., a section's attendance dropped 3 weeks before internal marks did.",
    primary_users: "Faculty, Heads of Department, Deans, Internal Quality Assurance Cell.",
    pdf_inputs: [
      "Attendance records and punctuality feeds",
      "Formative assessment and mid-term marks",
      "Assignment submissions, quiz results, and lab performance",
      "Course Outcome (CO) attainment from Agent 8",
      "Student feedback and LMS activity logs"
    ],
    pdf_outputs: [
      "Course and section analytics dashboards",
      "Engagement scorecards and submission timeliness indicators",
      "Correlation summaries between engagement and exam marks",
      "Comparative benchmarking reports and narrative insight summaries"
    ],
    workflow_summary: "1. Consolidate engagement/performance signals against student/course key. 2. Compute descriptive mark and attendance distributions. 3. Run correlation analysis to discover predictive behaviors. 4. Benchmark against departmental norms. 5. Surface outliers and generate narrative insights.",
    current_metrics: {
      metric_name: "LMS Engagement & Activity Correlation",
      current_value: "59% Engagement",
      baseline_value: "76% Departmental Norm",
      delta: "-17 percentage points",
      confidence: 89,
      target_course: "CS202 DBMS (Section C)",
      status: "Engagement Gap",
      correlation_finding: "Attendance dip in Week 6 strongly correlated (r=0.78) with 22% failure in SQL Normalization quiz"
    },
    sample_inputs: [
      {
        id: "sample_7_drop",
        label: "Sample A: Post-Midterm Engagement Dip in Section C (LMS 52%)",
        payload: {
          course_code: "CS202",
          section: "CSE-C",
          lms_login_frequency_per_week: 1.8,
          assignment_submission_rate_pct: 54,
          quiz_average_marks: 51,
          lead_lag_indicator: "LMS activity dropped 14 days before mid-term 1 score decline",
          outlier_classification: "Section C underperforming Section A by -24%"
        }
      },
      {
        id: "sample_7_engaged",
        label: "Sample B: Peer Code Lab Engagement Boost in Section A (LMS 88%)",
        payload: {
          course_code: "CS201",
          section: "CSE-A",
          lms_login_frequency_per_week: 4.6,
          assignment_submission_rate_pct: 92,
          quiz_average_marks: 78,
          lead_lag_indicator: "Weekly interactive coding challenges correlated with +18% quiz score gain",
          outlier_classification: "Benchmark standard across department"
        }
      }
    ]
  },
  {
    id: "agent_10",
    number: 10,
    name: "Agent 10",
    title: "Academic Performance Agent",
    domain: "Academic Governance",
    pdf_page: 15,
    freshness: "Daily batch",
    purpose: "Provides the institution's consolidated view of academic results across every dimension and time period, replacing scattered spreadsheets across departments.",
    primary_users: "Principal, Deans, Heads of Department, IQAC, Management.",
    pdf_inputs: [
      "Semester results and external exam score files",
      "Internal assessment marks and course/section mark data",
      "Faculty allocation records from Agent 3",
      "Historical result data across batches and regulations"
    ],
    pdf_outputs: [
      "Institutional and departmental result dashboards",
      "Course-wise performance reports and Grade Point Average distributions",
      "Trend analyses across semesters and regulations",
      "Comparative rankings and statistical exception alerts"
    ],
    workflow_summary: "1. Ingest and validate published results. 2. Compute pass %, distinction, first class, average marks, and failure rates. 3. Slice by course, section, faculty, regulation, gender, admission category. 4. Compute trend series. 5. Attribute deviations (paper difficulty vs teaching issue). 6. Rank courses by intervention priority.",
    current_metrics: {
      metric_name: "Cohort GPA & Pass Rate Distribution",
      current_value: "64.8% Pass Rate",
      baseline_value: "75.2% 3-Year Baseline",
      delta: "-10.4 percentage points",
      confidence: 96,
      target_course: "CSE 2nd Year Cohort (Semester 3)",
      status: "Statistical Deviation Detected",
      attribution: "Significant variance isolated to 2 core engineering theory courses"
    },
    sample_inputs: [
      {
        id: "sample_10_deviation",
        label: "Sample A: Cross-Sectional Pass Rate Divergence (-18 pp)",
        payload: {
          cohort: "B.Tech CSE 2025-29 Batch",
          semester: 3,
          overall_pass_pct: 63.5,
          distinction_pct: 11.2,
          failure_rate_pct: 36.5,
          statistically_deviating_courses: ["CS201 (-13.2 pp)", "CS202 (-11.0 pp)"],
          intervention_priority_rank: 1
        }
      }
    ]
  },
  {
    id: "agent_11",
    number: 11,
    name: "Agent 11",
    title: "Attendance Analysis Agent",
    domain: "Student Presence",
    pdf_page: 16,
    freshness: "Hourly sync",
    purpose: "Converts raw attendance data into classified student cohorts, risk identification, and targeted intervention recommendations automatically on a weekly cycle.",
    primary_users: "Faculty, mentors, Heads of Department, Deans, examination section, students and parents.",
    pdf_inputs: [
      "Period-wise biometric or uploaded attendance spreadsheets",
      "Timetable and class conduct records from Agent 4",
      "Student master data and approved on-duty/medical records",
      "Institutional attendance regulations including condonation policy"
    ],
    pdf_outputs: [
      "Student-wise attendance statements and section summaries",
      "Shortage and detention lists (<65%, 65-75% condonation)",
      "Projected end-of-semester attendance percentages",
      "Parent communication drafts and intervention trackers"
    ],
    workflow_summary: "1. Ingest from biometric/ERP. 2. Validate conduct against timetable. 3. Normalise on-duty/medical leaves. 4. Compute student/course/section attendance. 5. Classify into bands (>=75%, 70-75%, 65-70%, 60-65%, <50%). 6. Calculate trend slope and projected final attendance. 7. Recommend counselling/warning. 8. Track outcome.",
    current_metrics: {
      metric_name: "Critical Attendance Shortage (<65%)",
      current_value: "15 Students (25%)",
      baseline_value: "4 Students (6.6% Normal)",
      delta: "+11 students at detention risk",
      confidence: 98,
      target_course: "CS201 Data Structures (Section B)",
      status: "Attendance Crisis in Friday PM Slot",
      projected_end_semester: "54% without timetable intervention"
    },
    sample_inputs: [
      {
        id: "sample_11_friday_fatigue",
        label: "Sample A: Friday Afternoon Lab Fatigue Plunge (Section B 54%)",
        payload: {
          section: "CSE-B",
          course_code: "CS201",
          timeslot: "Friday 3:30 - 5:30 PM",
          average_attendance_pct: 54,
          detention_risk_count: 15,
          condonation_eligible_count: 14,
          weekly_trend_slope: "-3.4% per week",
          recommended_action: "Swap Friday 3:30 PM lab with Wednesday 9:00 AM slot"
        }
      },
      {
        id: "sample_11_restored",
        label: "Sample B: Post-Rescheduling Attendance Recovery (Section B 78%)",
        payload: {
          section: "CSE-B",
          course_code: "CS201",
          timeslot: "Wednesday 9:00 - 11:00 AM",
          average_attendance_pct: 78,
          detention_risk_count: 3,
          condonation_eligible_count: 5,
          weekly_trend_slope: "+4.1% per week",
          recommended_action: "Maintain revised slot schedule"
        }
      }
    ]
  },
  {
    id: "agent_14",
    number: 14,
    name: "Agent 14",
    title: "Student Academic Risk Agent",
    domain: "Faculty Support & Student Risk",
    pdf_page: 19,
    freshness: "Updated today 08:00",
    purpose: "Produces a forward-looking risk assessment for each student across distinct risk types, so that intervention happens before the risk materialises rather than after.",
    primary_users: "Mentors, Heads of Department, Deans, counselling cell, examination section.",
    pdf_inputs: [
      "Signals from Agents 7, 10, 11, 12",
      "Historical backlog and exam result data",
      "Fee payment status and class conduct patterns",
      "Prior cohort outcome data for model training"
    ],
    pdf_outputs: [
      "Per-student multi-type risk profiles",
      "Ranked watchlists prioritized by intervenability",
      "Contributing-factor explanations (why the risk was flagged)",
      "Mentor alert queues with suggested opening actions"
    ],
    workflow_summary: "1. Define risk types separately (failing specific course, backlog accumulation, detention, dropout). 2. Assemble predictor set per risk type. 3. Calibrate model on historical cohorts. 4. Generate risk scores with explicit contributing factors. 5. Rank by intervenability. 6. Push alerts to mentors. 7. Log intervention outcome.",
    current_metrics: {
      metric_name: "High Intervenability Student Risk Count",
      current_value: "38 Students at Critical Risk",
      baseline_value: "12 Students Normal Threshold",
      delta: "+26 students flagged for rescue",
      confidence: 89,
      target_course: "CS201 & CS202 Enrolled Cohorts",
      status: "High Intervenability Score (85%)",
      top_contributing_factor: "Prerequisite gap in Discrete Maths + mid-term recursion failure"
    },
    sample_inputs: [
      {
        id: "sample_14_batch_flag",
        label: "Sample A: 38 Weak Students Flagged with Prerequisite Gaps",
        payload: {
          cohort_size: 240,
          students_at_risk: 38,
          high_intervenability_count: 28,
          moderate_risk_count: 10,
          primary_contributing_factors: [
            "Prerequisite recursion deficiency from CS102 (weight: 0.42)",
            "Assessment failure in first 2 quizzes (weight: 0.35)",
            "Attendance drop below 68% (weight: 0.23)"
          ],
          recommended_remedial_modality: "4-week weekend whiteboard problem clinic"
        }
      }
    ]
  },
  {
    id: "agent_15",
    number: 15,
    name: "Agent 15",
    title: "Academic Forecasting & Predictive Models",
    domain: "Predictive Analytics",
    pdf_page: 20,
    freshness: "Weekly model run",
    purpose: "Forecasts likely academic outcomes early enough in the semester that the forecast can be falsified by action. Delivers counterfactual scenarios: what changes if attendance rises or remedial help is provided.",
    primary_users: "Faculty, mentors, students, Heads of Department, Deans.",
    pdf_inputs: [
      "Current semester internal assessment marks and attendance",
      "Historical relationships between internal and external performance",
      "Prior semester Grade Point Average and quiz data",
      "Course difficulty history across 4 prior cohorts"
    ],
    pdf_outputs: [
      "Individual outcome projections with confidence ranges",
      "Counterfactual scenarios ('What-If' projections)",
      "Section-level pass percentage forecasts",
      "Model accuracy reports comparing predicted vs actuals"
    ],
    workflow_summary: "1. Build historical relationship between early indicators and end results. 2. Generate predictions for internal marks, final grade, and CGPA. 3. Express as confidence ranges, never deterministic numbers. 4. Generate counterfactual targets. 5. Aggregate to course/section level. 6. Report model accuracy openly.",
    current_metrics: {
      metric_name: "Projected Course Pass Rate Forecast",
      current_value: "61.2% Projected",
      baseline_value: "74.0% Historical Norm",
      delta: "-12.8 pp below historical projection",
      confidence: 88,
      target_course: "CS201 Data Structures",
      status: "Intervention Window Active (Weeks 8-12)",
      counterfactual: "Adding 4-week weekend remedial clinic projects +13 pp improvement to 74.2%"
    },
    sample_inputs: [
      {
        id: "sample_15_forecast_remedial",
        label: "Sample A: Counterfactual Remedial Projection (+13 pp Gain)",
        payload: {
          target_course: "CS201",
          baseline_forecast: 61,
          simulated_remedial_students: 20,
          simulated_duration_weeks: 4,
          projected_post_intervention_pass_rate: 74,
          projected_students_rescued: 31,
          confidence_interval: "71% to 77%",
          historical_model_accuracy_pct: 91.4
        }
      }
    ]
  },
  {
    id: "agent_34",
    number: 34,
    name: "Agent 34",
    title: "Result & Examination Analysis",
    domain: "Assessment Outcomes",
    pdf_page: 39,
    freshness: "Updated today 08:30",
    purpose: "Performs detailed post-result analysis that departments require, ranking courses by failure rate and deviation from expectation rather than failure rate alone.",
    primary_users: "Heads of Department, Deans, faculty, IQAC, Management.",
    pdf_inputs: [
      "Published semester results and student counts",
      "Internal marks from Agent 33",
      "Course and faculty allocation from Agent 3",
      "Historical results and student entry data"
    ],
    pdf_outputs: [
      "Result analysis reports with grade and mark distributions",
      "Internal-external marks correlation studies",
      "Course intervention priority lists ranked by deviation",
      "Comparative section analyses and merit lists"
    ],
    workflow_summary: "1. Ingest published results. 2. Compute pass %, grade distribution, failure rate, class average. 3. Slice by course/section/faculty/department. 4. Compute correlation between internal and external marks. 5. Compare against historical norms. 6. Rank courses needing intervention. 7. Feed backlogs to Agent 35.",
    current_metrics: {
      metric_name: "Semester Pass Rate & Baseline Deviation",
      current_value: "61% (146 Passed / 94 Failed)",
      baseline_value: "74% Historical Norm",
      delta: "-13 percentage points deviation",
      confidence: 95,
      target_course: "CS201 Data Structures (240 enrolled)",
      status: "Priority Rank #1",
      internal_external_correlation: "r = 0.44 (Lenient internal marking vs rigorous external exam)"
    },
    sample_inputs: [
      {
        id: "sample_34_exam_results",
        label: "Sample A: Published Mid-Term Result Analysis for CS201 (61% Pass)",
        payload: {
          course_code: "CS201",
          total_enrolled: 240,
          students_passed: 146,
          students_failed: 94,
          pass_percentage: 60.8,
          historical_pass_percentage: 74.0,
          performance_deviation: -13.2,
          section_breakdown: {
            "CSE-A": 72.0,
            "CSE-B": 54.0,
            "CSE-C": 56.0,
            "CSE-D": 63.0
          },
          evaluation_standard_variance: "High discrepancy between Section A and B"
        }
      }
    ]
  },
  {
    id: "agent_35",
    number: 35,
    name: "Agent 35",
    title: "Backlog & Remedial Intelligence",
    domain: "Student Progression",
    pdf_page: 40,
    freshness: "Daily batch",
    purpose: "Tracks accumulated arrears per student and manages escalating consequences (promotion eligibility, placement, degree duration limits) before the student is beyond recovery.",
    primary_users: "Heads of Department, mentors, students, examination section, placement cell.",
    pdf_inputs: [
      "Semester results across all past attempts",
      "Registration records for supplementary examinations",
      "University regulations on promotion and maximum duration",
      "Student master records"
    ],
    pdf_outputs: [
      "Student-wise arrear registers and clearance trend analyses",
      "Promotion and detention eligibility lists",
      "Degree duration risk alerts",
      "Chronic failure pattern reports and segmented intervention lists"
    ],
    workflow_summary: "1. Maintain per-student arrear register. 2. Compute current backlog count and remaining attempts. 3. Apply promotion rules. 4. Identify chronic failure patterns (repeated fails in same course). 5. Segment students by recoverability (routine, structured remedial, intensive). 6. Track clearance rate.",
    current_metrics: {
      metric_name: "Active Arrear Load & Chronic Failure Clusters",
      current_value: "52 Active Backlogs across 38 Students",
      baseline_value: "22 Backlogs Normal Cohort",
      delta: "+30 backlogs in core computing subjects",
      confidence: 96,
      target_course: "CS201 Data Structures (18 repeaters)",
      status: "Prerequisite Bottleneck",
      chronic_clustering: "72% of CS201 repeaters also failed prerequisite CS102"
    },
    sample_inputs: [
      {
        id: "sample_35_backlog_sweep",
        label: "Sample A: 18 Chronic Repeaters Segmented in CS201",
        payload: {
          course_code: "CS201",
          total_repeaters: 18,
          attempt_distribution: { "Attempt 2": 12, "Attempt 3": 4, "Attempt 4+": 2 },
          remedial_segmentation: {
            routine_supplementary: 6,
            structured_weekend_clinic: 10,
            intensive_mentor_counseling: 2
          },
          degree_duration_risk_students: 2
        }
      }
    ]
  },
  {
    id: "agent_46",
    number: 46,
    name: "Agent 46",
    title: "Student Grievance & Assessment Quality",
    domain: "Assessment Quality & Redressal",
    pdf_page: 50,
    freshness: "Per examination",
    purpose: "Provides a transparent, trackable grievance channel with defined resolution timelines, replacing informal complaint routes and discovering systemic assessment defects.",
    primary_users: "Students, Grievance Redressal Committee, Heads of Department, Deans.",
    pdf_inputs: [
      "Submitted grievances across academic and evaluation categories",
      "Grievance policy, resolution authorities, and 7-day statutory timelines",
      "Departmental routing rules and historical resolution data",
      "Committee meeting notes and precedent case history"
    ],
    pdf_outputs: [
      "Case registers with status and timeline compliance",
      "Resolution letters with reasoning and appeal routes",
      "Complainant satisfaction analyses",
      "Systemic defect pattern reports (detecting recurring complaints)"
    ],
    workflow_summary: "1. Accept grievances across channels. 2. Classify by category and severity. 3. Route immediately. 4. Acknowledge with reference number and deadline. 5. Support resolution with precedent cases. 6. Communicate outcome. 7. Analyze systemic patterns to fix defective evaluation schemes.",
    current_metrics: {
      metric_name: "Evaluation Consistency Grievance Flags",
      current_value: "6 Active Grievances",
      baseline_value: "1 Grievance Baseline",
      delta: "+5 evaluation grievances logged",
      confidence: 92,
      target_course: "CS202 DBMS Midterm-1 Assessment",
      status: "Systemic Scheme Ambiguity",
      systemic_pattern: "4 complaints regarding question 3B (B+ Tree Indexing) conflicting rubric across sections"
    },
    sample_inputs: [
      {
        id: "sample_46_rubric_defect",
        label: "Sample A: Evaluation Inconsistency Flag in CS202 Midterm Question 3B",
        payload: {
          category: "Academic / Evaluation Inconsistency",
          affected_course: "CS202 DBMS",
          grievance_count: 6,
          summary: "Question 3B marking scheme differed between Section A and Section C",
          resolution_action: "HoD mandated single standardized key; 14 answer scripts re-moderated",
          statutory_compliance: "Resolved in 3.5 days (limit: 7 days)"
        }
      }
    ]
  },
  {
    id: "agent_59",
    number: 59,
    name: "Agent 59",
    title: "Faculty Performance & Pacing Monitor",
    domain: "Faculty Support & Workload",
    pdf_page: 63,
    freshness: "Strictly aggregated",
    purpose: "Consolidates faculty contribution across teaching load, course results, syllabus coverage, and student feedback into an objective performance record for developmental support.",
    primary_users: "Heads of Department, Deans, Principal, Human Resources, faculty.",
    pdf_inputs: [
      "Teaching load and course results from Agents 10, 34, 58",
      "Student feedback scores and syllabus coverage from Agent 6",
      "Publications from Agent 17, funded projects from Agent 22",
      "Institutional appraisal rubric and workload norms"
    ],
    pdf_outputs: [
      "Pre-populated appraisal records and dimension scorecards",
      "Contextualized performance briefs (accounting for overload)",
      "Targeted development area recommendations",
      "Workload rebalancing support plans"
    ],
    workflow_summary: "1. Encode appraisal rubric. 2. Auto-populate from verified platform data. 3. Compute dimension scores. 4. Contextualise by teaching load and course difficulty. 5. Present trends. 6. Identify development areas. 7. Brief HoD for non-punitive rebalancing conversation.",
    current_metrics: {
      metric_name: "Faculty Contact Hour Overload & Delivery Load",
      current_value: "19.5 Contact Hours/Week",
      baseline_value: "14.0 Norm Hours/Week",
      delta: "+5.5 hrs/wk overload (+39%)",
      confidence: 96,
      target_faculty: "Prof. R. Venkatraman (CSE)",
      status: "Evaluation Bottleneck Identified",
      support_recommendation: "Assign 2 M.Tech Teaching Assistants for lab evaluations to relieve syllabus pressure"
    },
    sample_inputs: [
      {
        id: "sample_59_overload_telemetry",
        label: "Sample A: Overload Signal for Prof. Venkatraman (19.5 hrs/wk)",
        payload: {
          faculty_name: "Prof. R. Venkatraman",
          department: "CSE",
          assigned_courses: ["CS201 Data Structures", "CS304 Operating Systems"],
          weekly_contact_hours: 19.5,
          statutory_norm_hours: 14.0,
          overload_hours: 5.5,
          student_feedback_rating: 4.2,
          research_commitments: "2 DST Projects + 3 PhD Scholars",
          support_solution: "Allocate 2 M.Tech TAs for lab grading to reclaim 6 hours/week"
        }
      }
    ]
  },
  {
    id: "agent_63",
    number: 63,
    name: "Agent 63",
    title: "Data Analytics & Semantic Engine",
    domain: "Institutional Quality & Analytics",
    pdf_page: 67,
    freshness: "Monthly review",
    purpose: "Provides self-service analytics across institutional data, maintaining a semantic layer defining every metric precisely so pass percentage means the same thing across all 72 agents.",
    primary_users: "Management, Principal, Deans, Heads of Department, IQAC.",
    pdf_inputs: [
      "Unified academic data warehouse",
      "Canonical data model with standardized metric formulas",
      "Role-based access rules and data governance policies",
      "Accreditation manual criteria (NBA, NAAC, NIRF)"
    ],
    pdf_outputs: [
      "Conversational analytics responses with explicit definitions",
      "Role-based standing dashboards and charts",
      "Cross-department anomaly alerts",
      "Accreditation-grade verified data sets"
    ],
    workflow_summary: "1. Maintain semantic layer defining every metric precisely. 2. Translate natural language into canonical queries. 3. Apply role-based filters. 4. Execute and choose optimal visualization. 5. State period, filters, and metric definition explicitly. 6. Proactively push anomaly alerts.",
    current_metrics: {
      metric_name: "Semantic Metric Consistency & Anomaly Index",
      current_value: "100% Metric Conformance",
      baseline_value: "100% Standard",
      delta: "Zero Semantic Ambiguity",
      confidence: 99,
      target_scope: "Institutional 72-Agent Telemetry Stream",
      status: "Synchronized & Audit-Grade",
      cross_departmental_finding: "Statistical anomaly in 2nd year CS pass rate (-13 pp) confirmed against 3-year baseline"
    },
    sample_inputs: [
      {
        id: "sample_63_semantic_audit",
        label: "Sample A: Live Cross-Departmental Pass Rate Analytics Stream",
        payload: {
          audit_period: "Academic Year 2026-27 Odd Semester",
          canonical_entities_checked: ["CS201", "CS202", "EC201", "MA201"],
          metric_standard: "Pass % = (Final Assessment >= 40% AND Attendance >= 75%) / Enrolled",
          data_warehouse_sync_status: "Verified 12/12 Agent Streams Synchronized",
          nba_criterion_compliance: "Criterion 3 (Course Outcomes) & Criterion 4 (Student Performance) Fully Traceable"
        }
      }
    ]
  },
  {
    id: "agent_69",
    number: 69,
    name: "Agent 69",
    title: "Early Warning & Anomaly Signals",
    domain: "Proactive Alerts & Risk Detection",
    pdf_page: 73,
    freshness: "Real-time feed",
    purpose: "Detects emerging problems across the institution early enough that they can still be changed, combining signals that individually look unremarkable and collectively do not.",
    primary_users: "Mentors, Heads of Department, Deans, counselling cell, Principal.",
    pdf_inputs: [
      "Attendance patterns and trends from Agent 11",
      "Internal assessment results from Agent 33",
      "Assignment and submission timeliness from Agent 7",
      "Backlog status from Agent 35",
      "Behavioural observations from mentors via Agent 45"
    ],
    pdf_outputs: [
      "Prioritised early warning alerts with multi-signal evidence",
      "Designated first responder assignments (mentor, HoD, counseling)",
      "Escalation tracking with response time monitoring",
      "Detection threshold recalibration reports"
    ],
    workflow_summary: "1. Establish per-student baseline. 2. Monitor for continuous deviation. 3. Combine multi-signal deviations (attendance + assignments + marks). 4. Classify nature (academic, financial, personal). 5. Assign severity and responder. 6. Generate alert with evidence. 7. Route and capture outcome.",
    current_metrics: {
      metric_name: "Multi-Signal Composite Early Warnings",
      current_value: "18 Active Multi-Signal Alerts",
      baseline_value: "5 Alerts Baseline",
      delta: "+13 concurrent risk triggers",
      confidence: 94,
      target_scope: "CSE 2nd Year Cohort",
      status: "High Priority Alert Queue",
      composite_trigger: "Attendance drop (<65%) combined with Quiz 1 failure and 4-day assignment delay"
    },
    sample_inputs: [
      {
        id: "sample_69_early_warning_feed",
        label: "Sample A: 18 Multi-Signal Anomaly Flags Ingested",
        payload: {
          detection_batch: "Week 9 Sweep",
          total_students_screened: 240,
          anomalies_detected: 18,
          trigger_combination: "Attendance (<65%) + Quiz 1 Failure (<40%) + Assignment Missing",
          responder_routing: {
            "Academic Mentors": 14,
            "Head of Department": 4
          },
          accuracy_validation_rate_pct: 94.2,
          escalation_status: "Active - Review required within 48 hours"
        }
      }
    ]
  }
];
