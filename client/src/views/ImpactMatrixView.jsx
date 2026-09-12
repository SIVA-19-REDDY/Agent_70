import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, ArrowRight, Target, Sparkles } from 'lucide-react';
import { useAI } from '../contexts/AIContext';

export function ImpactMatrixView() {
  const { openDecisionModal } = useAI();
  const navigate = useNavigate();

  const matrixItems = [
    {
      id: 'item_1',
      title: 'CS201 Weekend Problem Clinic',
      course: 'Data Structures & Algorithms',
      quadrant: 'do_now',
      actionability: 88,
      impact: 91,
      students: 20,
      gain: '+14 pp',
      action: 'Authorize 4-week Saturday problem-solving session for Year 2 CSE.'
    },
    {
      id: 'item_2',
      title: 'CSE Section B Friday Lab Rescheduling',
      course: 'Data Structures & DBMS',
      quadrant: 'do_now',
      actionability: 94,
      impact: 84,
      students: 60,
      gain: '+12 pp',
      action: 'Reschedule Friday 3:30 PM lab to Wednesday 9:00 AM slot.'
    },
    {
      id: 'item_3',
      title: 'Graduate TA Support for DSP Labs',
      course: 'Digital Signal Processing (EC201)',
      quadrant: 'plan',
      actionability: 48,
      impact: 89,
      students: 180,
      gain: '+15 pp',
      action: 'Sanction 2 M.Tech scholar stipends under Dean Academic discretionary budget.'
    },
    {
      id: 'item_4',
      title: 'Midterm Question Difficulty Recalibration',
      course: 'Operating Systems (CS301)',
      quadrant: 'plan',
      actionability: 42,
      impact: 78,
      students: 230,
      gain: '+9 pp',
      action: 'Curriculum committee review on Bloom taxonomy distribution for concurrency questions.'
    },
    {
      id: 'item_5',
      title: 'Interactive SQL Query Testbench',
      course: 'Database Management Systems (CS202)',
      quadrant: 'quick_wins',
      actionability: 85,
      impact: 58,
      students: 120,
      gain: '+8 pp',
      action: 'Deploy automated SQL query evaluator for Section C and D lab assignments.'
    },
    {
      id: 'item_6',
      title: 'Self-Paced Matrix Calculus Refreshers',
      course: 'Machine Learning (CS401)',
      quadrant: 'monitor',
      actionability: 52,
      impact: 45,
      students: 70,
      gain: '+5 pp',
      action: 'Upload video lectures on Vector Derivatives for Year 4 elective.'
    }
  ];

  const quadrants = [
    {
      key: 'do_now',
      title: 'DO NOW',
      subtitle: 'High Impact • High Actionability',
      color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900',
      badge: 'Immediate Execution'
    },
    {
      key: 'plan',
      title: 'PLAN',
      subtitle: 'High Impact • Low Actionability',
      color: 'border-institutional-200 bg-institutional-50/40 text-institutional-900',
      badge: 'Budget / Committee'
    },
    {
      key: 'quick_wins',
      title: 'QUICK WINS',
      subtitle: 'Low Impact • High Actionability',
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      badge: 'Low Overhead'
    },
    {
      key: 'monitor',
      title: 'MONITOR',
      subtitle: 'Low Impact • Low Actionability',
      color: 'border-slate-200 bg-slate-50/40 text-slate-800',
      badge: 'Periodic Review'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-institutional-600 block">
            Executive Prioritization Framework
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Impact × Actionability Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluate academic interventions along feasibility and outcome dimensions to allocate scarce institutional resources.
          </p>
        </div>
      </div>

      {/* 4 Quadrants Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrants.map((quad) => {
          const items = matrixItems.filter(i => i.quadrant === quad.key);
          return (
            <div
              key={quad.key}
              className={`rounded-3xl p-6 md:p-7 border ${quad.color} shadow-card flex flex-col justify-between space-y-4 bg-white`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-black tracking-tight text-slate-900">{quad.title}</h3>
                    <span className="text-xs text-slate-500">{quad.subtitle}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {quad.badge}
                  </span>
                </div>

                <div className="space-y-3 mt-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2 hover:border-institutional-300 transition-all cursor-pointer"
                      onClick={() => openDecisionModal({
                        title: item.title,
                        issue: `${item.course} requires prioritized intervention.`,
                        chosen_action: item.action
                      })}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.title}</span>
                        <span className="text-[10px] font-bold text-emerald-700 font-mono shrink-0">
                          {item.gain}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{item.course} • {item.students} students affected</p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Impact: <strong>{item.impact}</strong> | Actionability: <strong>{item.actionability}</strong></span>
                        <span className="text-institutional-600 font-semibold flex items-center gap-0.5">
                          Commit Decision <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No current actions mapped to this quadrant.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
