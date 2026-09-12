/**
 * Institutional Academic Dataset for Agent 70 - Academic Decision Support
 * Interconnected data model covering Departments, Courses, Sections, Faculty,
 * 12 Source Agents (6, 7, 10, 11, 14, 15, 34, 35, 46, 59, 63, 69),
 * Historical Interventions, Recorded Decisions, and Measured Outcomes.
 */

export const INSTITUTIONAL_DATA = {
  academic_calendar: {
    year: "2026–27",
    semester: "Semester 1",
    current_week: 10,
    total_weeks: 16,
    last_updated: "2026-09-12 08:30 IST"
  },

  departments: [
    { id: "cse", name: "Computer Science & Engineering", code: "CSE", student_count: 960, faculty_count: 42, active_courses: 24 },
    { id: "ece", name: "Electronics & Communication Engineering", code: "ECE", student_count: 720, faculty_count: 36, active_courses: 20 },
    { id: "aids", name: "Artificial Intelligence & Data Science", code: "AI & DS", student_count: 480, faculty_count: 24, active_courses: 16 },
    { id: "eee", name: "Electrical & Electronics Engineering", code: "EEE", student_count: 540, faculty_count: 28, active_courses: 18 },
    { id: "mech", name: "Mechanical Engineering", code: "MECH", student_count: 600, faculty_count: 32, active_courses: 20 },
    { id: "civil", name: "Civil Engineering", code: "CIVIL", student_count: 420, faculty_count: 22, active_courses: 16 }
  ],

  programmes: [
    { id: "btech", name: "B.Tech", duration_years: 4 },
    { id: "mtech", name: "M.Tech", duration_years: 2 }
  ],

  kpi_summary: {
    critical_priorities: 8,
    critical_priorities_trend: "+2 vs last week",
    courses_requiring_action: 14,
    courses_requiring_action_trend: "+3 vs mid-term",
    students_at_risk: 126,
    students_at_risk_trend: "-12 after mentoring drive",
    intervention_opportunities: 9,
    intervention_opportunities_trend: "5 high feasibility",
    backlog_cases: 73,
    backlog_cases_trend: "48 recoverable with targeted support",
    early_warning_signals: 18,
    early_warning_signals_trend: "6 critical human reviews pending"
  },

  courses: [
    {
      id: "cs201",
      code: "CS201",
      name: "Data Structures & Algorithms",
      department: "CSE",
      programme: "B.Tech",
      year: 2,
      semester: 3,
      lead_faculty: "Dr. Arvind Ramanathan",
      credits: 4,
      enrolled: 240,
      current_pass_pct: 61,
      historical_pass_pct: 74,
      deviation: -13,
      attendance_pct: 68,
      engagement_pct: 62,
      syllabus_completion_pct: 54,
      expected_syllabus_pct: 68,
      students_at_risk: 42,
      priority_score: 91,
      priority_status: "Critical",
      priority_factors: {
        performance_deviation: 24,
        students_affected: 20,
        historical_persistence: 16,
        attendance_risk: 13,
        syllabus_delay: 10,
        intervention_feasibility: 8
      },
      diagnostic: {
        primary_driver: "Likely Teaching / Coverage Issue",
        confidence: 84,
        internal_assessment_avg: 58,
        external_assessment_avg: 52,
        lab_performance_avg: 71,
        student_entry_ability_score: 76,
        root_causes: [
          "Syllabus coverage is 14% behind schedule in Trees & Dynamic Programming modules",
          "Section B and C report difficulty keeping pace with algorithmic proofs",
          "Lab sessions lack teaching assistant support for 40+ student batches"
        ]
      },
      sections: [
        { section: "CSE-A", faculty: "Dr. Arvind Ramanathan", enrolled: 60, pass_pct: 72, avg_marks: 68, attendance: 78, assignment_completion: 82, risk_count: 6 },
        { section: "CSE-B", faculty: "Prof. Sunita Deshmukh", enrolled: 60, pass_pct: 54, avg_marks: 52, attendance: 62, assignment_completion: 58, risk_count: 15 },
        { section: "CSE-C", faculty: "Prof. Manoj Verma", enrolled: 60, pass_pct: 56, avg_marks: 54, attendance: 64, assignment_completion: 60, risk_count: 14 },
        { section: "CSE-D", faculty: "Dr. Arvind Ramanathan", enrolled: 60, pass_pct: 63, avg_marks: 61, attendance: 69, assignment_completion: 68, risk_count: 7 }
      ],
      recommended_action: "Deploy 2 Teaching Assistants and initiate weekend remedial problem-solving for 20 weakest students.",
      agent_evidence: ["Agent 34", "Agent 11", "Agent 7", "Agent 6", "Agent 15"]
    },
    {
      id: "cs202",
      code: "CS202",
      name: "Database Management Systems",
      department: "CSE",
      programme: "B.Tech",
      year: 2,
      semester: 3,
      lead_faculty: "Dr. Rajesh K. Nair",
      credits: 4,
      enrolled: 240,
      current_pass_pct: 65,
      historical_pass_pct: 76,
      deviation: -11,
      attendance_pct: 64,
      engagement_pct: 59,
      syllabus_completion_pct: 62,
      expected_syllabus_pct: 68,
      students_at_risk: 38,
      priority_score: 84,
      priority_status: "Critical",
      priority_factors: {
        performance_deviation: 20,
        students_affected: 18,
        historical_persistence: 15,
        attendance_risk: 15,
        syllabus_delay: 7,
        intervention_feasibility: 9
      },
      diagnostic: {
        primary_driver: "Mixed Factors (Attendance + Assessment Gap)",
        confidence: 79,
        internal_assessment_avg: 61,
        external_assessment_avg: 54,
        lab_performance_avg: 68,
        student_entry_ability_score: 72,
        root_causes: [
          "Post-midterm attendance dip in Section C (59%)",
          "Normalization and SQL query optimization assessments had 48% failure rate",
          "Disconnect between theoretical lectures and practical SQL lab executions"
        ]
      },
      sections: [
        { section: "CSE-A", faculty: "Dr. Rajesh K. Nair", enrolled: 60, pass_pct: 74, avg_marks: 70, attendance: 75, assignment_completion: 80, risk_count: 5 },
        { section: "CSE-B", faculty: "Dr. Rajesh K. Nair", enrolled: 60, pass_pct: 68, avg_marks: 65, attendance: 70, assignment_completion: 72, risk_count: 8 },
        { section: "CSE-C", faculty: "Prof. Priya Krishnan", enrolled: 60, pass_pct: 58, avg_marks: 56, attendance: 59, assignment_completion: 62, risk_count: 14 },
        { section: "CSE-D", faculty: "Prof. Priya Krishnan", enrolled: 60, pass_pct: 60, avg_marks: 58, attendance: 62, assignment_completion: 65, risk_count: 11 }
      ],
      recommended_action: "Implement mandatory interactive SQL query clinics and peer-led lab practice groups.",
      agent_evidence: ["Agent 34", "Agent 11", "Agent 46", "Agent 69"]
    },
    {
      id: "cs301",
      code: "CS301",
      name: "Operating Systems",
      department: "CSE",
      programme: "B.Tech",
      year: 3,
      semester: 5,
      lead_faculty: "Dr. Meenakshi Sundaram",
      credits: 4,
      enrolled: 230,
      current_pass_pct: 69,
      historical_pass_pct: 78,
      deviation: -9,
      attendance_pct: 74,
      engagement_pct: 68,
      syllabus_completion_pct: 60,
      expected_syllabus_pct: 68,
      students_at_risk: 28,
      priority_score: 78,
      priority_status: "High",
      priority_factors: {
        performance_deviation: 18,
        students_affected: 16,
        historical_persistence: 14,
        attendance_risk: 10,
        syllabus_delay: 9,
        intervention_feasibility: 11
      },
      diagnostic: {
        primary_driver: "Likely Assessment Difficulty",
        confidence: 76,
        internal_assessment_avg: 64,
        external_assessment_avg: 59,
        lab_performance_avg: 74,
        student_entry_ability_score: 78,
        root_causes: [
          "Concurrency and process synchronization question paper had 35% higher cognitive demand than previous 3 years",
          "Internal mark distribution was bell-shaped, but mid-term theory was harshly graded on memory management"
        ]
      },
      sections: [
        { section: "CSE-A", faculty: "Dr. Meenakshi Sundaram", enrolled: 58, pass_pct: 76, avg_marks: 72, attendance: 80, assignment_completion: 84, risk_count: 4 },
        { section: "CSE-B", faculty: "Dr. Meenakshi Sundaram", enrolled: 57, pass_pct: 71, avg_marks: 68, attendance: 76, assignment_completion: 78, risk_count: 6 },
        { section: "CSE-C", faculty: "Prof. K. Venkatesh", enrolled: 58, pass_pct: 64, avg_marks: 60, attendance: 71, assignment_completion: 70, risk_count: 9 },
        { section: "CSE-D", faculty: "Prof. K. Venkatesh", enrolled: 57, pass_pct: 65, avg_marks: 61, attendance: 70, assignment_completion: 72, risk_count: 9 }
      ],
      recommended_action: "Conduct item analysis on midterm assessment question paper and provide synchronization tutorial sheets.",
      agent_evidence: ["Agent 34", "Agent 46", "Agent 10", "Agent 15"]
    },
    {
      id: "cs302",
      code: "CS302",
      name: "Computer Networks",
      department: "CSE",
      programme: "B.Tech",
      year: 3,
      semester: 5,
      lead_faculty: "Dr. Ananya Roy",
      credits: 4,
      enrolled: 230,
      current_pass_pct: 73,
      historical_pass_pct: 80,
      deviation: -7,
      attendance_pct: 78,
      engagement_pct: 72,
      syllabus_completion_pct: 66,
      expected_syllabus_pct: 68,
      students_at_risk: 22,
      priority_score: 72,
      priority_status: "High",
      priority_factors: {
        performance_deviation: 15,
        students_affected: 14,
        historical_persistence: 12,
        attendance_risk: 9,
        syllabus_delay: 8,
        intervention_feasibility: 14
      },
      diagnostic: {
        primary_driver: "Likely Student Preparedness Issue (Math/Subnetting)",
        confidence: 81,
        internal_assessment_avg: 71,
        external_assessment_avg: 66,
        lab_performance_avg: 82,
        student_entry_ability_score: 74,
        root_causes: [
          "Subnet masking, IP routing math, and protocol state diagrams caused 64% of lost marks in formative tests"
        ]
      },
      sections: [
        { section: "CSE-A", faculty: "Dr. Ananya Roy", enrolled: 58, pass_pct: 78, avg_marks: 74, attendance: 82, assignment_completion: 86, risk_count: 3 },
        { section: "CSE-B", faculty: "Dr. Ananya Roy", enrolled: 57, pass_pct: 75, avg_marks: 71, attendance: 80, assignment_completion: 81, risk_count: 4 },
        { section: "CSE-C", faculty: "Prof. Hemant Joshi", enrolled: 58, pass_pct: 70, avg_marks: 66, attendance: 75, assignment_completion: 75, risk_count: 7 },
        { section: "CSE-D", faculty: "Prof. Hemant Joshi", enrolled: 57, pass_pct: 68, avg_marks: 65, attendance: 74, assignment_completion: 73, risk_count: 8 }
      ],
      recommended_action: "Provide guided packet-tracing workshops and interactive subnetting calculation worksheets.",
      agent_evidence: ["Agent 34", "Agent 10", "Agent 7"]
    },
    {
      id: "cs401",
      code: "CS401",
      name: "Machine Learning & Pattern Recognition",
      department: "CSE",
      programme: "B.Tech",
      year: 4,
      semester: 7,
      lead_faculty: "Dr. S. Mukherjee",
      credits: 4,
      enrolled: 210,
      current_pass_pct: 77,
      historical_pass_pct: 82,
      deviation: -5,
      attendance_pct: 82,
      engagement_pct: 79,
      syllabus_completion_pct: 70,
      expected_syllabus_pct: 68,
      students_at_risk: 14,
      priority_score: 64,
      priority_status: "Moderate",
      priority_factors: {
        performance_deviation: 12,
        students_affected: 11,
        historical_persistence: 11,
        attendance_risk: 7,
        syllabus_delay: 5,
        intervention_feasibility: 18
      },
      diagnostic: {
        primary_driver: "Likely Student Preparedness Issue (Linear Algebra / Calculus)",
        confidence: 86,
        internal_assessment_avg: 76,
        external_assessment_avg: 71,
        lab_performance_avg: 86,
        student_entry_ability_score: 80,
        root_causes: [
          "Mathematical optimization and backpropagation vector derivations require prerequisite math refresher"
        ]
      },
      sections: [
        { section: "CSE-A", faculty: "Dr. S. Mukherjee", enrolled: 70, pass_pct: 81, avg_marks: 78, attendance: 85, assignment_completion: 89, risk_count: 3 },
        { section: "CSE-B", faculty: "Dr. S. Mukherjee", enrolled: 70, pass_pct: 78, avg_marks: 74, attendance: 82, assignment_completion: 84, risk_count: 4 },
        { section: "CSE-C", faculty: "Prof. Deepa V.", enrolled: 70, pass_pct: 72, avg_marks: 69, attendance: 79, assignment_completion: 78, risk_count: 7 }
      ],
      recommended_action: "Provide supplementary self-paced modules on Matrix Calculus and Gradient Descent mechanics.",
      agent_evidence: ["Agent 34", "Agent 6", "Agent 7"]
    },
    {
      id: "ec201",
      code: "EC201",
      name: "Digital Signal Processing",
      department: "ECE",
      programme: "B.Tech",
      year: 2,
      semester: 4,
      lead_faculty: "Dr. V. Bharadwaj",
      credits: 4,
      enrolled: 180,
      current_pass_pct: 59,
      historical_pass_pct: 73,
      deviation: -14,
      attendance_pct: 66,
      engagement_pct: 58,
      syllabus_completion_pct: 51,
      expected_syllabus_pct: 68,
      students_at_risk: 34,
      priority_score: 89,
      priority_status: "Critical",
      priority_factors: {
        performance_deviation: 23,
        students_affected: 19,
        historical_persistence: 17,
        attendance_risk: 14,
        syllabus_delay: 11,
        intervention_feasibility: 5
      },
      diagnostic: {
        primary_driver: "Likely Teaching / Coverage Issue + High Math Rigor",
        confidence: 82,
        internal_assessment_avg: 55,
        external_assessment_avg: 51,
        lab_performance_avg: 64,
        student_entry_ability_score: 70,
        root_causes: [
          "Syllabus is 17% behind on FFT/IIR filters; teaching load is 18 contact hours/week for single faculty",
          "Lack of MATLAB simulation practice in mid-term preparation"
        ]
      },
      sections: [
        { section: "ECE-A", faculty: "Dr. V. Bharadwaj", enrolled: 60, pass_pct: 64, avg_marks: 61, attendance: 71, assignment_completion: 74, risk_count: 8 },
        { section: "ECE-B", faculty: "Dr. V. Bharadwaj", enrolled: 60, pass_pct: 57, avg_marks: 54, attendance: 65, assignment_completion: 62, risk_count: 12 },
        { section: "ECE-C", faculty: "Prof. R. Sethuraman", enrolled: 60, pass_pct: 55, avg_marks: 51, attendance: 62, assignment_completion: 58, risk_count: 14 }
      ],
      recommended_action: "Allocate Teaching Assistant to relieve Dr. Bharadwaj's lab load and conduct 3-week DSP bridge clinics.",
      agent_evidence: ["Agent 34", "Agent 14", "Agent 6", "Agent 10"]
    }
  ],

  faculty_support_opportunities: [
    {
      id: "fac_1",
      faculty_name: "Dr. Arvind Ramanathan",
      department: "CSE",
      designation: "Associate Professor",
      teaching_load_hours: 18,
      norm_hours: 14,
      courses_handled: ["Data Structures & Algorithms (2 sections)", "Advanced Algorithms (PG)"],
      administrative_burden: "Department NBA Accreditation Coordinator",
      syllabus_coverage_pct: 54,
      target_coverage_pct: 68,
      section_entry_ability: 76,
      student_feedback_score: 4.1,
      support_reason: "High teaching load (18 hrs) combined with heavy administrative burden (NBA Coordinator) leading to syllabus delay in Data Structures.",
      suggested_support: "Allocate 2 Graduate Teaching Assistants for lab evaluation and assign administrative co-lead for NBA documentation.",
      expected_effect: "Syllabus delay resolved within 3 weeks; faculty contact time redistributed to remedial problem sessions.",
      confidence: 84,
      statutory_disclaimer: "These insights are solely for institutional academic workload support and resource allocation, never for autonomous performance appraisal or career-impacting actions."
    },
    {
      id: "fac_2",
      faculty_name: "Prof. Sunita Deshmukh",
      department: "CSE",
      designation: "Assistant Professor",
      teaching_load_hours: 16,
      norm_hours: 16,
      courses_handled: ["Data Structures Section B", "Computer Architecture"],
      administrative_burden: "First-year Proctorial Duty",
      syllabus_coverage_pct: 52,
      target_coverage_pct: 68,
      section_entry_ability: 68,
      student_feedback_score: 3.8,
      support_reason: "Section B has lower entry preparedness in C programming fundamentals; instructional pacing requires pedagogical scaffolding.",
      suggested_support: "Faculty development peer-mentoring with Senior Professor and shared slide/problem repository for algorithms.",
      expected_effect: "Improved section engagement and +8% higher assignment submission rate.",
      confidence: 81,
      statutory_disclaimer: "These insights are solely for institutional academic workload support and resource allocation, never for autonomous performance appraisal or career-impacting actions."
    },
    {
      id: "fac_3",
      faculty_name: "Dr. V. Bharadwaj",
      department: "ECE",
      designation: "Professor",
      teaching_load_hours: 19,
      norm_hours: 14,
      courses_handled: ["Digital Signal Processing (2 sections)", "Embedded Systems Lab"],
      administrative_burden: "Board of Studies Convener",
      syllabus_coverage_pct: 51,
      target_coverage_pct: 68,
      section_entry_ability: 70,
      student_feedback_score: 4.3,
      support_reason: "High contact hour overload (19 hrs) and BoS duties; syllabus lag in DSP FFT transforms.",
      suggested_support: "Provide adjunct lab faculty support for Embedded Systems Lab and rebalance 3 contact hours.",
      expected_effect: "15% faster lab evaluation cycle and on-time completion of remaining syllabus modules.",
      confidence: 86,
      statutory_disclaimer: "These insights are solely for institutional academic workload support and resource allocation, never for autonomous performance appraisal or career-impacting actions."
    },
    {
      id: "fac_4",
      faculty_name: "Prof. Priya Krishnan",
      department: "CSE",
      designation: "Assistant Professor",
      teaching_load_hours: 15,
      norm_hours: 16,
      courses_handled: ["DBMS Sections C & D"],
      administrative_burden: "Department Library In-charge",
      syllabus_coverage_pct: 58,
      target_coverage_pct: 68,
      section_entry_ability: 69,
      student_feedback_score: 3.9,
      support_reason: "Students reporting disconnect between SQL syntax lectures and practical relational database design exercises.",
      suggested_support: "Co-teaching support for advanced SQL query optimization and automated lab grading testbench.",
      expected_effect: "Reduced assignment backlog and +12% improvement in database normalization quiz.",
      confidence: 79,
      statutory_disclaimer: "These insights are solely for institutional academic workload support and resource allocation, never for autonomous performance appraisal or career-impacting actions."
    }
  ],

  student_risk_analytics: {
    total_active_students: 3720,
    risk_breakdown: {
      high_risk: 126,
      moderate_risk: 218,
      stable: 3376
    },
    risk_factors: [
      { factor: "Attendance Shortfall (<70%)", count: 94, contribution_pct: 32 },
      { factor: "Course Failures / Low CGPA (<5.5)", count: 78, contribution_pct: 26 },
      { factor: "Backlog Persistence (>2 subjects)", count: 52, contribution_pct: 18 },
      { factor: "Midterm Assessment Gap (<40%)", count: 46, contribution_pct: 15 },
      { factor: "LMS Engagement Drop (>40% drop)", count: 28, contribution_pct: 9 }
    ],
    department_distribution: [
      { department: "CSE", high: 42, moderate: 64, stable: 854 },
      { department: "ECE", high: 34, moderate: 52, stable: 634 },
      { department: "MECH", high: 22, moderate: 38, stable: 540 },
      { department: "EEE", high: 14, moderate: 28, stable: 498 },
      { department: "AI & DS", high: 8, moderate: 20, stable: 452 },
      { department: "CIVIL", high: 6, moderate: 16, stable: 398 }
    ],
    statutory_warning: "Aggregated academic risk indicators are for early institutional advising and mentoring only. Pursuant to academic council policy, risk models must NEVER be utilized for admission filtering, financial scholarship disqualification, or career placement barring."
  },

  backlog_intelligence: {
    total_backlog_cases: 73,
    repeated_course_cases: 29,
    clearance_trend_semester_over_semester: "+14% clearance rate after 2025 remedial reforms",
    segments: [
      {
        segment: "Recoverable with Targeted Support",
        count: 42,
        cgpa_range: "5.5 - 6.8",
        backlog_count: "1 - 2 courses",
        characteristics: "Passed internal assessments; failed single end-term paper by <8 marks; high attendance (78%).",
        recommended_action: "4-week targeted evening problem-solving sessions focusing on past 5 years' university questions.",
        expected_clearance_rate: "82%"
      },
      {
        segment: "Needs Intensive Academic Intervention",
        count: 18,
        cgpa_range: "4.8 - 5.5",
        backlog_count: "2 - 3 courses",
        characteristics: "Dual failure in core prerequisites (Math + Algorithms); marginal attendance (65-72%).",
        recommended_action: "Faculty mentor 1-on-1 tutoring, adjusted modular load, and bi-weekly diagnostic milestone checks.",
        expected_clearance_rate: "64%"
      },
      {
        segment: "High Duration & Progression Risk",
        count: 9,
        cgpa_range: "<4.8",
        backlog_count: "4+ courses",
        characteristics: "Repeated failure across 2+ semesters; year progression barrier imminent.",
        recommended_action: "Dean & Parent-Teacher academic counseling review, course load decompression recommendation.",
        expected_clearance_rate: "41%"
      },
      {
        segment: "Repeated Failure Cases",
        count: 4,
        cgpa_range: "<4.5",
        backlog_count: "3rd attempt",
        characteristics: "Chronic failure in Mathematics-II and Digital Systems.",
        recommended_action: "Statutory academic council committee review with specialized remedial learning plan.",
        expected_clearance_rate: "35%"
      }
    ]
  },

  early_warnings: [
    {
      id: "ew_101",
      signal: "Sudden Section-wide Attendance Plunge in CSE Year 2 Section B",
      source_agent: "Agent 69 — Early Warning Signals",
      category: "Attendance & Engagement",
      severity: "Critical",
      evidence: "Attendance dropped from 74% to 58% over weeks 7-9 in Data Structures and DBMS.",
      affected_population: "60 students (CSE-B Year 2)",
      suggested_human_review: "HoD should convene meeting with Section B class representatives and proctors to investigate scheduling bottlenecks or fatigue.",
      status: "Pending Review",
      assigned_owner: "Dr. K. S. Sharma (HoD CSE)",
      escalation: "Escalate to Dean if unresolved by Week 11",
      timestamp: "2026-09-10 14:15"
    },
    {
      id: "ew_102",
      signal: "Unusual Midterm Score Variance in Data Structures Section C",
      source_agent: "Agent 69 — Early Warning Signals",
      category: "Academic Assessment",
      severity: "Urgent",
      evidence: "Standard deviation of 26 marks with 42% scoring below 40 marks on Tree Traversal questions.",
      affected_population: "60 students (CSE-C)",
      suggested_human_review: "Academic auditor to review midterm question difficulty calibration against Bloom's Taxonomy standards.",
      status: "In Progress",
      assigned_owner: "Dr. Arvind Ramanathan (Lead Faculty)",
      escalation: "Department Curriculum Committee",
      timestamp: "2026-09-11 09:30"
    },
    {
      id: "ew_103",
      signal: "Syllabus Lag Exceeding 15% in ECE Digital Signal Processing",
      source_agent: "Agent 69 — Early Warning Signals",
      category: "Curriculum Delivery",
      severity: "Urgent",
      evidence: "Module 3 (IIR Filter Design) not commenced; scheduled for completion by Week 9.",
      affected_population: "180 students (ECE Year 2)",
      suggested_human_review: "Dean Academic to sanction 4 additional extra lecture slots on Saturday mornings.",
      status: "Pending Review",
      assigned_owner: "Dr. V. Bharadwaj (Lead Faculty)",
      escalation: "Dean of Academics",
      timestamp: "2026-09-11 11:20"
    },
    {
      id: "ew_104",
      signal: "High Concentration of Multiple Assignment Delinquencies in AI & DS Year 3",
      source_agent: "Agent 69 — Early Warning Signals",
      category: "Student Submission",
      severity: "Moderate",
      evidence: "28 students missed consecutive Deep Learning lab project submissions.",
      affected_population: "28 students",
      suggested_human_review: "Lab coordinator to verify GPU cloud lab environment access issues reported by students.",
      status: "Resolved",
      assigned_owner: "Prof. N. Swamy",
      escalation: "None",
      timestamp: "2026-09-08 16:45"
    }
  ],

  grievance_patterns: {
    total_grievances_academic_term: 46,
    avg_resolution_days: 3.4,
    statutory_routing_note: "Grievances involving statutory rights, harassment, discrimination, or ragging are automatically routed to the Internal Complaints Committee (ICC) and Anti-Ragging Cell under confidential protocols and omitted from general academic analytics.",
    categories: [
      { category: "Assessment & Grading Ambiguity", volume: 19, trend: "+12%", avg_resolution: "2.8 days", systemic_pattern: "Questions in Midterm 1 regarding ambiguous rubric on algorithmic complexity." },
      { category: "Lab Infrastructure & Software Access", volume: 14, trend: "-5%", avg_resolution: "4.1 days", systemic_pattern: "Database license server downtime during peak submission hours." },
      { category: "Classroom Scheduling & Timetable Clash", volume: 8, trend: "-18%", avg_resolution: "1.9 days", systemic_pattern: "Elective course slot overlap between AI & DS and CSE." },
      { category: "Syllabus Pacing & Assignment Deadlines", volume: 5, trend: "+2%", avg_resolution: "4.5 days", systemic_pattern: "Multiple assignment deadlines clustered in Week 8." }
    ]
  },

  historical_interventions: [
    {
      id: "hi_2025_ds",
      title: "Weekend Remedial Problem-Solving Sessions",
      course_id: "cs201",
      course_name: "Data Structures & Algorithms",
      academic_term: "2025–26 Sem 1",
      target_group: "Weakest 20 students (midterm marks < 45)",
      problem_addressed: "Low algorithmic problem-solving ability and tree recursion failures",
      intervention_format: "4 weeks, 2 hours/Saturday, 1 senior faculty + 1 teaching assistant",
      students_affected: 20,
      before_pass_probability: 52,
      after_pass_rate: 69,
      observed_improvement_points: 17,
      attendance_change_pct: "+11%",
      cost_resources: "Low (1 faculty stipend + lab electricity)",
      effectiveness: "High",
      lessons_learned: "Hands-on code tracing on whiteboards yielded 2x better retention than re-lecturing theory.",
      synthetic_label: "Institutional Empirical Archive"
    },
    {
      id: "hi_2025_dbms",
      title: "Interactive Query Clinic & Peer Code Reviews",
      course_id: "cs202",
      course_name: "Database Management Systems",
      academic_term: "2025–26 Sem 1",
      target_group: "Students with failing grades in SQL quiz (32 students)",
      problem_addressed: "Syntax disorientation in complex nested queries and JOIN operations",
      intervention_format: "3 weeks, 2 hours/week, peer mentoring by high-scoring Year 3 seniors",
      students_affected: 32,
      before_pass_probability: 58,
      after_pass_rate: 73,
      observed_improvement_points: 15,
      attendance_change_pct: "+8%",
      cost_resources: "Minimal (peer mentor certificates & refreshments)",
      effectiveness: "High",
      lessons_learned: "Peer mentors removed intimidation barrier; students practiced query design without evaluation anxiety.",
      synthetic_label: "Institutional Empirical Archive"
    },
    {
      id: "hi_2024_os",
      title: "Synchronization Visualizer Lab Modules",
      course_id: "cs301",
      course_name: "Operating Systems",
      academic_term: "2024–25 Sem 1",
      target_group: "All sections (cohort-wide lab enhancement)",
      problem_addressed: "High conceptual failure in Deadlock & Semaphore questions",
      intervention_format: "Introduced interactive graphical simulator in weekly 2-hour lab slots",
      students_affected: 215,
      before_pass_probability: 64,
      after_pass_rate: 75,
      observed_improvement_points: 11,
      attendance_change_pct: "+6%",
      cost_resources: "Medium (software simulator deployment & lab manual rewrite)",
      effectiveness: "High",
      lessons_learned: "Cohort-wide visual tooling prevented end-term backlog spikes more effectively than late remedial lecturing.",
      synthetic_label: "Institutional Empirical Archive"
    },
    {
      id: "hi_2025_dsp",
      title: "MATLAB Simulation Support Hours",
      course_id: "ec201",
      course_name: "Digital Signal Processing",
      academic_term: "2025–26 Sem 2",
      target_group: "Section B & C lagging students (25 students)",
      problem_addressed: "Z-Transform and Filter realization math failure",
      intervention_format: "5 weeks, 2 hours/week guided simulation clinics",
      students_affected: 25,
      before_pass_probability: 48,
      after_pass_rate: 62,
      observed_improvement_points: 14,
      attendance_change_pct: "+12%",
      cost_resources: "Low (Teaching Assistant allocation)",
      effectiveness: "Moderate to High",
      lessons_learned: "Simulating filter poles and zeros visually drastically reduced formula memorization errors.",
      synthetic_label: "Institutional Empirical Archive"
    }
  ],

  recorded_decisions: [
    {
      id: "dec_2026_01",
      title: "Approve 4-Week Weekend Remedial Support for Data Structures Year 2",
      issue: "Performance decline in CS201 Data Structures (Current 61% vs Historical 74%)",
      evidence_sources: ["Agent 34 (Result Analysis)", "Agent 11 (Attendance)", "Agent 7 (Engagement)"],
      chosen_action: "Launch targeted 4-week weekend problem clinic for 20 weakest students in Year 2 CSE-B and CSE-C.",
      owner: "Dr. K. S. Sharma (HoD CSE)",
      assigned_to: "Dr. Arvind Ramanathan",
      start_date: "2026-09-18",
      target_review_date: "2026-10-18",
      expected_outcome: "Course pass rate improvement from 61% to >=72%; minimum 14 students rescued from backlog.",
      allocated_resources: "1 faculty member (2 hrs/wk) + 1 TA stipend",
      status: "Active",
      notes: "Classrooms 204 & 205 booked. Proctor notifications sent to targeted cohort."
    },
    {
      id: "dec_2026_02",
      title: "Teaching Assistant Deployment for DSP Laboratory & Pacing Recovery",
      issue: "ECE Digital Signal Processing 14% historical deviation and 17% syllabus delay",
      evidence_sources: ["Agent 34 (Results)", "Agent 14 (Faculty Workload)", "Agent 6 (Progress)"],
      chosen_action: "Assign 2 M.Tech teaching assistants to handle lab evaluations and schedule 3 extra morning theory sessions.",
      owner: "Dr. M. S. Pillai (Dean Academics)",
      assigned_to: "Dr. V. Bharadwaj",
      start_date: "2026-09-15",
      target_review_date: "2026-10-15",
      expected_outcome: "Syllabus delay reduced to <5%; mid-term failure rate reduced by 10 points.",
      allocated_resources: "2 M.Tech Scholars (8 hours/week total)",
      status: "Planned",
      notes: "Dean sanctioned teaching assistant stipends under Dean Academic discretionary fund."
    },
    {
      id: "dec_2026_03",
      title: "Section-Level Timetable & Lab Rescheduling for CSE-B",
      issue: "CSE-B Section attendance plunge to 58% due to late-evening lab fatigue",
      evidence_sources: ["Agent 69 (Early Warnings)", "Agent 11 (Attendance)"],
      chosen_action: "Swap Friday 3:30-5:30 PM lab slot with Wednesday morning 9:00-11:00 AM slot.",
      owner: "Dr. K. S. Sharma (HoD CSE)",
      assigned_to: "Prof. Sunita Deshmukh",
      start_date: "2026-09-08",
      target_review_date: "2026-09-29",
      expected_outcome: "CSE-B attendance restored to >75%.",
      allocated_resources: "Zero financial cost; timetable reconfiguration",
      status: "Active",
      notes: "Implemented in Week 9 timetable revision."
    }
  ],

  outcome_tracking: [
    {
      id: "out_2025_01",
      decision_id: "dec_2025_08",
      title: "2025 Fall Remedial Programme — Data Structures",
      intervention: "4-Week Targeted Weekend Problem Clinic",
      target_population: "20 students with failing midterm scores",
      baseline_pass_rate: 52,
      expected_pass_rate: 68,
      actual_pass_rate: 71,
      expected_improvement: 16,
      actual_improvement: 19,
      expected_attendance: 75,
      actual_attendance: 82,
      variance_assessment: "Better than Expected (+3% over target)",
      what_did_we_learn: "Providing printed syntax reference cards and live coding trace exercises significantly reduced cognitive load during dynamic programming recursion.",
      closed_date: "2025-12-18",
      reviewed_by: "Academic Council"
    },
    {
      id: "out_2025_02",
      decision_id: "dec_2025_12",
      title: "DBMS Interactive SQL Lab Peer Mentoring",
      intervention: "Peer Code Clinics for Section C & D",
      target_population: "32 students",
      baseline_pass_rate: 58,
      expected_pass_rate: 70,
      actual_pass_rate: 73,
      expected_improvement: 12,
      actual_improvement: 15,
      expected_attendance: 72,
      actual_attendance: 78,
      variance_assessment: "Better than Expected (+3% over target)",
      what_did_we_learn: "Peer mentors effectively bridged informal questions that students hesitated to ask professors during large lecture halls.",
      closed_date: "2025-12-22",
      reviewed_by: "HoD CSE"
    }
  ],

  source_agents: [
    { id: "agent_6", name: "Agent 6", title: "Course Progress & Syllabus Tracking", domain: "Curriculum Delivery", freshness: "Real-time sync (15 min ago)" },
    { id: "agent_7", name: "Agent 7", title: "Student LMS Engagement Analytics", domain: "Learning Behavior", freshness: "Updated 1 hour ago" },
    { id: "agent_10", name: "Agent 10", title: "Curriculum & Syllabus Architecture", domain: "Academic Governance", freshness: "Daily batch" },
    { id: "agent_11", name: "Agent 11", title: "Attendance & Punctuality Engine", domain: "Student Presence", freshness: "Hourly sync" },
    { id: "agent_14", name: "Agent 14", title: "Faculty Workload & Pacing Monitor", domain: "Faculty Support", freshness: "Updated today 08:00" },
    { id: "agent_15", name: "Agent 15", title: "Academic Forecasting & Predictive Models", domain: "Predictive Analytics", freshness: "Weekly model run" },
    { id: "agent_34", name: "Agent 34", title: "Result & Examination Analysis", domain: "Assessment Outcomes", freshness: "Updated today 08:30" },
    { id: "agent_35", name: "Agent 35", title: "Backlog & Remedial Intelligence", domain: "Student Progression", freshness: "Daily batch" },
    { id: "agent_46", name: "Agent 46", title: "Assessment Rubric & Grading Calibration", domain: "Assessment Quality", freshness: "Per examination" },
    { id: "agent_59", name: "Agent 59", title: "Student Advising & Counseling Aggregates", domain: "Student Welfare", freshness: "Strictly aggregated" },
    { id: "agent_63", name: "Agent 63", title: "Accreditation & Quality Benchmarks (NBA/NAAC)", domain: "Institutional Quality", freshness: "Monthly review" },
    { id: "agent_69", name: "Agent 69", title: "Early Warning & Anomaly Signals", domain: "Proactive Alerts", freshness: "Real-time feed" }
  ]
};
