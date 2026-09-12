import React from 'react';
import { X, Printer, Download, FileSpreadsheet, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAI } from '../../contexts/AIContext';

export function DecisionBriefModal() {
  const { isBriefModalOpen, closeBriefModal, briefData } = useAI();

  if (!isBriefModalOpen) return null;

  const data = briefData || {
    question: "Which courses require immediate intervention this semester?",
    executive_answer: "3 courses require immediate Tier-1 academic intervention: Data Structures (CSE, 91), Digital Signal Processing (ECE, 89), and DBMS (CSE, 84).",
    confidence: 88,
    review_date: "2026-10-18",
    priority_ranking: [
      { rank: 1, item: "CS201 Data Structures & Algorithms", priority_score: 91, main_issue: "Performance decline (-13% deviation), syllabus lag (14%)." },
      { rank: 2, item: "EC201 Digital Signal Processing", priority_score: 89, main_issue: "Mathematical barrier, syllabus lag (17%), faculty overload." },
      { rank: 3, item: "CS202 Database Management Systems", priority_score: 84, main_issue: "SQL normalization gap, attendance drop in Section C." }
    ],
    recommendations: [
      { action: "Deploy 2 Teaching Assistants & Launch 4-Week Weekend Remedial Clinic for CS201", expected_effect: "+11 to +16 percentage points pass rate recovery", lead_time: "Immediate (Week 11)" },
      { action: "Rebalance Faculty Load & Schedule 3 Morning DSP Bridge Sessions for EC201", expected_effect: "Syllabus on-track within 3 weeks; failure risk reduced by 22%", lead_time: "1 week" }
    ],
    evidence: [
      { source: "Agent 34 — Result Analysis", metric: "Pass rate dropped -13 pp vs historical" },
      { source: "Agent 11 — Attendance Engine", metric: "Section B attendance at 58%" },
      { source: "Agent 6 — Course Progress", metric: "Syllabus 14% behind schedule" }
    ],
    limitations: [
      "Midterm-2 moderation for Section D is ongoing.",
      "Assumes minimum 80% attendance in remedial sessions."
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const rows = [
      ["ACADEMIC DECISION BRIEF - AGENT 70 (AURA)"],
      ["Question", data.question],
      ["Executive Answer", data.executive_answer],
      ["Confidence", `${data.confidence}%`],
      ["Target Review Date", data.review_date || '2026-10-18'],
      [],
      ["Rank", "Item", "Priority Score", "Core Issue"],
      ...(data.priority_ranking || []).map(p => [p.rank, p.item, p.priority_score, p.main_issue]),
      [],
      ["Recommendations", "Expected Effect", "Lead Time"],
      ...(data.recommendations || []).map(r => [r.action, r.expected_effect, r.lead_time])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `academic_decision_brief_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-elevated border border-slate-200 overflow-hidden my-8">
        {/* Modal Toolbar (hidden on print) */}
        <div className="no-print p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-institutional-600" />
            <span>Official Institutional Document Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-institutional-600 hover:bg-institutional-700 rounded-lg shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={closeBriefModal}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 md:p-10 text-slate-900 font-sans space-y-6">
          {/* Institutional Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-institutional-700 uppercase">
                Institutional Academic Decision Intelligence Platform
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">ACADEMIC DECISION BRIEF</h1>
              <p className="text-xs text-slate-500 mt-0.5">Agent 70 (AURA) • Executive Council & HoD Action Docket</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <span className="font-bold text-slate-800 block">Date: {new Date().toLocaleDateString()}</span>
              <span>Semester 1, 2026–27</span>
              <span className="block text-institutional-600 font-semibold mt-1">Status: Formal Brief</span>
            </div>
          </div>

          {/* Question & Executive Summary */}
          <div className="space-y-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Inquiry</span>
              <p className="text-sm font-bold text-slate-900">{data.question}</p>
            </div>

            <div className="bg-institutional-50/60 border border-institutional-100 rounded-xl p-4">
              <span className="text-[10px] font-bold text-institutional-700 uppercase tracking-wider block mb-1">Executive Answer</span>
              <p className="text-sm leading-relaxed text-slate-800">{data.executive_answer}</p>
              <div className="mt-2.5 pt-2 border-t border-institutional-100 flex items-center justify-between text-xs text-institutional-800">
                <span>Model Confidence: <strong>{data.confidence}%</strong></span>
                <span>Scheduled Review Date: <strong>{data.review_date || '2026-10-18'}</strong></span>
              </div>
            </div>
          </div>

          {/* Priority Rankings Table */}
          {data.priority_ranking && data.priority_ranking.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Priority Ranking & Actionable Items</h3>
              <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-2.5">Rank</th>
                    <th className="p-2.5">Course / Entity</th>
                    <th className="p-2.5 text-right">Priority Score</th>
                    <th className="p-2.5">Primary Diagnostic Issue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.priority_ranking.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-bold text-slate-900">#{item.rank}</td>
                      <td className="p-2.5 font-semibold text-slate-800">{item.item}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-red-600">{item.priority_score}/100</td>
                      <td className="p-2.5 text-slate-600">{item.main_issue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Recommendations */}
          {data.recommendations && data.recommendations.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Authoritative Recommendations</h3>
              <div className="space-y-2">
                {data.recommendations.map((rec, i) => (
                  <div key={i} className="border border-slate-200 rounded-xl p-3.5 bg-white">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-slate-900 block">{rec.action}</span>
                        <div className="text-slate-600 flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                          <span>Expected Effect: <strong className="text-emerald-700">{rec.expected_effect}</strong></span>
                          {rec.lead_time && <span>Lead Time: <strong>{rec.lead_time}</strong></span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Trace & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">Supporting Multi-Agent Evidence</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {(data.evidence || []).map((e, i) => (
                  <li key={i}>
                    <span className="font-semibold">{e.source_agent || e.source}:</span> {e.metric}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
              <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block mb-1">Analytical Boundaries & Assumptions</span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {(data.limitations || ["Standard institutional assumptions apply."]).map((lim, i) => (
                  <li key={i}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signatures & Approvals */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs text-slate-600">
            <div>
              <div className="h-10 border-b border-dashed border-slate-300 mb-1" />
              <span className="font-bold text-slate-800">Head of Department</span>
              <span className="block text-[11px] text-slate-400">Dr. K. S. Sharma</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-300 mb-1" />
              <span className="font-bold text-slate-800">Dean of Academic Affairs</span>
              <span className="block text-[11px] text-slate-400">Dr. M. S. Pillai</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-300 mb-1" />
              <span className="font-bold text-slate-800">Secretariat Sign-off</span>
              <span className="block text-[11px] text-slate-400">Academic Council</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
