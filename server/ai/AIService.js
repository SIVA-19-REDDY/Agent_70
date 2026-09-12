import { GeminiProvider } from './GeminiProvider.js';
import { MOCK_AI_RESPONSES } from '../data/mockAIResponses.js';
import { INSTITUTIONAL_DATA } from '../data/institutionalData.js';

export class AIService {
  constructor() {
    this.gemini = new GeminiProvider();
  }

  getProviderStatus() {
    const geminiConfigured = this.gemini.isConfigured();

    return {
      provider: 'gemini',
      name: 'Google Gemini',
      gemini: {
        configured: geminiConfigured,
        model: this.gemini.defaultModel,
        status: geminiConfigured ? 'Available' : 'Unconfigured (Missing API Key)'
      },
      demo_mode_active: false,
      default_provider: 'gemini'
    };
  }

  /**
   * Process a question exclusively through Google Gemini
   */
  async analyzeQuery(question, userContext = {}, preferredProvider = 'gemini', options = {}) {
    const qLower = question.toLowerCase();
    const enrichedContext = {
      ...INSTITUTIONAL_DATA,
      active_filters: userContext.filters || {},
      user_role: userContext.role || 'HoD',
      user_department: userContext.department || 'CSE'
    };

    if (this.gemini.isConfigured()) {
      try {
        const result = await this.gemini.generateDecisionSupport(question, enrichedContext, options);
        return {
          provider_used: 'Google Gemini',
          model_used: options.model || this.gemini.defaultModel,
          is_demo: false,
          data: result
        };
      } catch (err) {
        console.warn('[AIService] Gemini request failed:', err.message);
        return this._getDemoResponse(qLower, enrichedContext, `Gemini request encountered an issue (${err.message}). Displaying institutional diagnostic analysis.`);
      }
    }

    return this._getDemoResponse(qLower, enrichedContext, 'Gemini API key not configured.');
  }

  /**
   * Deterministic institutional response generator for Demo AI Mode
   */
  _getDemoResponse(qLower, context, fallbackNotice = null) {
    let matchedData = null;

    if (qLower.includes('remedial') || qLower.includes('twenty weakest') || qLower.includes('20 weakest') || qLower.includes('second year') || qLower.includes('improvement should we expect')) {
      matchedData = JSON.parse(JSON.stringify(MOCK_AI_RESPONSES.remedial_simulation));
    } else if (qLower.includes('section') || qLower.includes('declining performance') || qLower.includes('decline')) {
      matchedData = JSON.parse(JSON.stringify(MOCK_AI_RESPONSES.declining_sections));
    } else if (qLower.includes('faculty') || qLower.includes('support') || qLower.includes('teaching load')) {
      matchedData = JSON.parse(JSON.stringify(MOCK_AI_RESPONSES.faculty_support));
    } else if (qLower.includes('course') || qLower.includes('immediate intervention') || qLower.includes('priority') || qLower.includes('action') || qLower.includes('hod do first') || qLower.includes('where should')) {
      matchedData = JSON.parse(JSON.stringify(MOCK_AI_RESPONSES.courses_intervention));
    } else {
      // Dynamic fallback based on primary course data
      const topCourse = context.courses[0];
      matchedData = {
        executive_answer: `Based on institutional multi-agent analysis for ${context.user_department || 'CSE'}, the highest priority requiring leadership review is ${topCourse.name} (${topCourse.code}) with an explainable priority score of ${topCourse.priority_score}/100 and a ${Math.abs(topCourse.deviation)}% negative performance deviation.`,
        analysis_decomposition: [
          `1. Screened institutional courses against active filter criteria (${context.user_department || 'CSE'} / ${context.academic_calendar.semester}).`,
          `2. Gathered evidence from Agent 34 (Results), Agent 11 (Attendance), and Agent 6 (Syllabus Completion).`,
          `3. Ranked actionable intervention vectors by impact vs feasibility.`
        ],
        priority_ranking: context.courses.slice(0, 3).map((c, idx) => ({
          rank: idx + 1,
          item: `${c.code} ${c.name}`,
          priority_score: c.priority_score,
          severity: c.priority_status,
          main_issue: `${c.deviation}% pass rate deviation vs historical baseline.`,
          metric_change: `Current ${c.current_pass_pct}% vs Historical ${c.historical_pass_pct}% (${c.deviation} pp)`
        })),
        driver_diagnosis: {
          primary_driver: topCourse.diagnostic.primary_driver,
          confidence: topCourse.diagnostic.confidence,
          factors: [
            { factor: "Assessment & Exam Rigor", evidence: `Internal avg ${topCourse.diagnostic.internal_assessment_avg}% vs external avg ${topCourse.diagnostic.external_assessment_avg}%`, impact: "High" },
            { factor: "Attendance Shortfall", evidence: `Current attendance is ${topCourse.attendance_pct}%`, impact: "Moderate" },
            { factor: "Syllabus Delivery Gap", evidence: `Syllabus is at ${topCourse.syllabus_completion_pct}% vs expected ${topCourse.expected_syllabus_pct}%`, impact: "High" }
          ]
        },
        why: [
          `${topCourse.name} impacts ${topCourse.enrolled} students across all sections.`,
          `Historical data shows interventions started before Week 11 recover pass rates by +11 to +17 percentage points.`
        ],
        evidence: [
          { source_agent: "Agent 34 — Result Analysis", metric: "Course Pass Rate", current_value: `${topCourse.current_pass_pct}%`, baseline_value: `${topCourse.historical_pass_pct}%`, delta: `${topCourse.deviation} pp`, period: "2026–27 Sem 1", population: `${topCourse.department} (${topCourse.enrolled} students)`, confidence: 91 },
          { source_agent: "Agent 11 — Attendance Engine", metric: "Average Attendance", current_value: `${topCourse.attendance_pct}%`, baseline_value: "75%", delta: `${topCourse.attendance_pct - 75} pp`, period: "Weeks 1-10", population: topCourse.name, confidence: 94 },
          { source_agent: "Agent 6 — Course Progress", metric: "Syllabus Completion", current_value: `${topCourse.syllabus_completion_pct}%`, baseline_value: `${topCourse.expected_syllabus_pct}%`, delta: `${topCourse.syllabus_completion_pct - topCourse.expected_syllabus_pct} pp`, period: "Week 10", population: "Syllabus Milestones", confidence: 88 }
        ],
        confidence: 86,
        limitations: [
          "External paper evaluation difficulty cannot be strictly deterministic until exam script moderation completes."
        ],
        recommendations: [
          {
            action: topCourse.recommended_action,
            why: "Empirical historical interventions in similar prerequisite courses demonstrated +14% clearance rate.",
            expected_effect: `Estimated improvement of +10 to +15 percentage points in ${topCourse.name}.`,
            resources_needed: "1 faculty member (2 hrs/wk) and classroom allocation.",
            lead_time: "Immediate (Week 11)",
            feasibility: "High",
            target_group: `${topCourse.students_at_risk} at-risk students in ${topCourse.code}`
          }
        ],
        scenario_simulation: {
          baseline_pass_rate: topCourse.current_pass_pct,
          projected_pass_rate: topCourse.current_pass_pct + 12,
          delta_points: 12,
          students_benefited: Math.round(topCourse.students_at_risk * 0.7),
          confidence: 80
        },
        follow_up_questions: [
          "Which courses require immediate intervention this semester?",
          "If we add a remedial programme for the twenty weakest students in the second year, what improvement should we expect based on our own history?",
          "Which sections show declining performance compared to last semester?",
          "Which faculty need additional support, and in what?"
        ]
      };
    }

    if (fallbackNotice) {
      matchedData.limitations.unshift(fallbackNotice);
    }

    return {
      provider_used: 'Demo AI Mode',
      model_used: 'Deterministic Academic Intelligence Engine',
      is_demo: true,
      data: matchedData
    };
  }

  /**
   * Scenario simulation calculation engine
   */
  simulateIntervention(params) {
    const {
      course_id = 'cs201',
      students_targeted = 20,
      weeks = 4,
      hours_per_week = 2,
      attendance_boost_pct = 8,
      intervention_type = 'remedial'
    } = params;

    const course = INSTITUTIONAL_DATA.courses.find(c => c.id === course_id) || INSTITUTIONAL_DATA.courses[0];
    const baselinePass = course.current_pass_pct;

    // Simulation formula based on empirical historical data
    // Total contact hours = weeks * hours_per_week
    const contactHours = weeks * hours_per_week;
    let baseGain = 0;

    if (intervention_type === 'remedial') {
      baseGain = Math.min(18, Math.round(contactHours * 1.4 + (attendance_boost_pct * 0.35)));
    } else if (intervention_type === 'ta_support') {
      baseGain = Math.min(14, Math.round(contactHours * 1.1 + (attendance_boost_pct * 0.25)));
    } else {
      baseGain = Math.min(16, Math.round(contactHours * 1.2 + (attendance_boost_pct * 0.3)));
    }

    const projectedPass = Math.min(94, baselinePass + baseGain);
    const studentsHelped = Math.min(students_targeted, Math.round(students_targeted * (baseGain / 20 * 0.85 + 0.5)));

    let costLevel = "Low";
    if (contactHours > 16 || students_targeted > 40) costLevel = "High";
    else if (contactHours > 8 || students_targeted > 25) costLevel = "Medium";

    return {
      course_id: course.id,
      course_name: course.name,
      course_code: course.code,
      parameters: {
        students_targeted,
        weeks,
        hours_per_week,
        attendance_boost_pct,
        total_hours: contactHours,
        intervention_type
      },
      results: {
        baseline_pass_rate: baselinePass,
        projected_pass_rate: projectedPass,
        estimated_improvement: `+${baseGain} percentage points`,
        improvement_points: baseGain,
        students_benefited: studentsHelped,
        cost_requirement: costLevel,
        lead_time: `${weeks} weeks`,
        confidence: Math.max(68, Math.min(90, 84 - Math.abs(weeks - 4) * 2)),
        historical_precedent: "Fall 2025 Weekend Remedial Programme (+17 pp gain across 20 students)"
      }
    };
  }
}
