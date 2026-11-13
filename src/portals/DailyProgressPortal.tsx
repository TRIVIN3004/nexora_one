import React, { useState } from 'react';
import { PortalWrapper } from './PortalWrapper';
import { 
  ClipboardList, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { portalStorage } from '../utils/portalStorage';
import type { DprEntry } from '../utils/portalStorage';

interface DailyProgressPortalProps {
  onBack: () => void;
}

type TabType = 'dashboard' | 'submit' | 'history' | 'analytics' | 'reports';

export const DailyProgressPortal: React.FC<DailyProgressPortalProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [dprs, setDprs] = useState<DprEntry[]>(() => portalStorage.getDprs());

  // Form State
  const [member, setMember] = useState('Trivin Sakthi');
  const [department, setDepartment] = useState('Engineering & Mobile');
  const [project, setProject] = useState('Nexora One Unified Platform');
  const [tasks, setTasks] = useState<string[]>([
    'Configured universal iOS and Android platforms via Capacitor',
    'Integrated DPR report generator and local storage sync',
    'Created cross-platform adaptive workstation layouts'
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [blockers, setBlockers] = useState('None. All platforms building cleanly.');
  const [tomorrowPlan, setTomorrowPlan] = useState('Fine-tune desktop window bindings and add offline cache verification.');
  const [hours, setHours] = useState(8.0);

  const handleAddTask = () => {
    if (newTaskInput.trim()) {
      setTasks(prev => [...prev, newTaskInput.trim()]);
      setNewTaskInput('');
    }
  };

  const handleRemoveTask = (idx: number) => {
    setTasks(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmitDpr = (e: React.FormEvent) => {
    e.preventDefault();
    if (tasks.length === 0) {
      alert('Please include at least one completed task.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const updated = portalStorage.saveDpr({
      date: todayStr,
      member,
      department,
      project,
      tasksCompleted: tasks,
      blockers,
      tomorrowPlan,
      hoursWorked: hours
    });

    setDprs(updated);
    setActiveTab('dashboard');
    alert('🎉 DPR Successfully Submitted & Logged!');
  };

  // Export PDF Simulation
  const handleExportPdf = (dpr: DprEntry) => {
    // Generate clean printable document window or download text
    const content = `=====================================================
NEXORA TECHNOLOGIES - DAILY PROGRESS REPORT (DPR)
=====================================================
Date: ${dpr.date} | Submitted At: ${dpr.submittedAt}
Employee: ${dpr.member}
Department: ${dpr.department}
Active Project: ${dpr.project}
Hours Worked: ${dpr.hoursWorked} hrs

TASKS COMPLETED TODAY:
${dpr.tasksCompleted.map((t, i) => `  ${i + 1}. ${t}`).join('\n')}

BLOCKERS / IMPEDIMENTS:
  ${dpr.blockers || 'None'}

TOMORROW'S PLANNED OBJECTIVES:
  ${dpr.tomorrowPlan || 'Continue scheduled roadmap'}

VERIFICATION STATUS:
  [X] System Verified & Timestamped
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DPR_${dpr.date}_${dpr.member.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasSubmittedToday = dprs.some(d => d.date === new Date().toISOString().split('T')[0]);

  return (
    <PortalWrapper
      title="Daily Progress Report (DPR)"
      subtitle="Task logging, compliance analytics, attendance hours, and audit reports"
      icon={<ClipboardList className="w-5 h-5" />}
      cloudUrl="https://dpr-nexora.vercel.app/"
      onBack={onBack}
      badge="Operational DPR"
      badgeColor="text-blue-500 bg-blue-500/10 border-blue-500/20"
    >
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">

        {/* Navigation Tabs Pill Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'submit', label: 'Submit DPR', icon: <Plus className="w-4 h-4" /> },
            { id: 'history', label: 'History & Calendar', icon: <CalendarIcon className="w-4 h-4" /> },
            { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'reports', label: 'Audit Reports', icon: <FileText className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/30'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-black/5 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              hasSubmittedToday
                ? 'bg-emerald-500/10 border-emerald-500/25'
                : 'bg-amber-500/10 border-amber-500/25'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {hasSubmittedToday ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  )}
                  <span className={`text-xs font-black uppercase tracking-wider ${
                    hasSubmittedToday ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {hasSubmittedToday ? "Today's DPR Submitted" : "Pending Today's Submission"}
                  </span>
                </div>
                <h3 className="text-lg font-black text-brand-navy dark:text-white">
                  {hasSubmittedToday ? "Great job! Your daily progress is logged." : "Don't forget to file your daily progress before 7:00 PM."}
                </h3>
                <p className="text-xs text-slate-500">Date: {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>

              {!hasSubmittedToday && (
                <button
                  onClick={() => setActiveTab('submit')}
                  className="px-5 py-2.5 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-brand-blue/30 cursor-pointer active:scale-95 transition-all"
                >
                  File DPR Now
                </button>
              )}
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Weekly Streak', value: '5 Days', tag: '100% On-Time' },
                { label: 'Total Hours', value: '42.5 hrs', tag: 'This Month' },
                { label: 'Team Compliance', value: '98.4%', tag: 'High Rank' },
                { label: 'Logged Tasks', value: '38 Tasks', tag: 'All Projects' }
              ].map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                  <div className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">{m.value}</div>
                  <span className="text-[10px] font-bold text-emerald-500">{m.tag}</span>
                </div>
              ))}
            </div>

            {/* Recent DPR Logs */}
            <div className="space-y-3">
              <h3 className="text-base font-black text-brand-navy dark:text-white">Recent Daily Logs</h3>
              <div className="grid gap-3">
                {dprs.slice(0, 5).map(dpr => (
                  <div 
                    key={dpr.id} 
                    onClick={() => handleExportPdf(dpr)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-blue/30 transition-all cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue">
                          {dpr.project}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{dpr.date} • {dpr.hoursWorked} hrs</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">
                        {dpr.tasksCompleted[0]}
                      </h4>
                      {dpr.tasksCompleted.length > 1 && (
                        <span className="text-[11px] text-slate-400">+{dpr.tasksCompleted.length - 1} more tasks</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportPdf(dpr);
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-500 cursor-pointer"
                        title="Download text report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SUBMIT DPR */}
        {activeTab === 'submit' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm max-w-2xl mx-auto space-y-5">
            <div>
              <h3 className="text-lg font-black text-brand-navy dark:text-white">Submit Daily Progress Report</h3>
              <p className="text-xs text-slate-500">Record your tasks, blockers, and tomorrow's objectives for today</p>
            </div>

            <form onSubmit={handleSubmitDpr} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Member Name</label>
                  <input
                    type="text"
                    required
                    value={member}
                    onChange={e => setMember(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Department</label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  >
                    <option value="Engineering & Mobile">Engineering & Mobile</option>
                    <option value="AI Research & Agents">AI Research & Agents</option>
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="UI/UX Product Design">UI/UX Product Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500">Active Project</label>
                <input
                  type="text"
                  required
                  value={project}
                  onChange={e => setProject(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>

              {/* Tasks List */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500">Tasks Completed Today</label>
                <div className="space-y-1.5">
                  {tasks.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs">
                      <span>• {t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTask(idx)}
                        className="text-red-400 hover:text-red-600 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Add completed task..."
                    value={newTaskInput}
                    onChange={e => setNewTaskInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTask();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="px-3.5 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                  >
                    Add Task
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500">Blockers & Impediments</label>
                <textarea
                  rows={2}
                  value={blockers}
                  onChange={e => setBlockers(e.target.value)}
                  placeholder="Any blockers or dependency delays..."
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500">Tomorrow's Planned Roadmap</label>
                <textarea
                  rows={2}
                  value={tomorrowPlan}
                  onChange={e => setTomorrowPlan(e.target.value)}
                  placeholder="Key targets for next work day..."
                  className="w-full mt-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
                  <span>Hours Worked Today</span>
                  <span className="text-brand-blue font-extrabold">{hours} hrs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  step="0.5"
                  value={hours}
                  onChange={e => setHours(Number(e.target.value))}
                  className="w-full mt-1 accent-brand-blue"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 cursor-pointer active:scale-98 transition-all"
              >
                Submit & Sign DPR
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: HISTORY & CALENDAR */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Submission History</h3>
              <p className="text-xs text-slate-500">Inspect past DPR filings and download official logs</p>
            </div>

            <div className="grid gap-3">
              {dprs.map(dpr => (
                <div 
                  key={dpr.id} 
                  className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black text-brand-blue dark:text-brand-cyan">{dpr.date}</span>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                      Logged {dpr.hoursWorked} hrs
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">{dpr.project} ({dpr.member})</h4>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Accomplishments:</span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                      {dpr.tasksCompleted.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand-blue font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-black/5 dark:border-white/5">
                    <span className="text-[11px] text-slate-400">Blockers: {dpr.blockers}</span>
                    <button
                      onClick={() => handleExportPdf(dpr)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-blue/10 text-brand-blue text-xs font-bold hover:bg-brand-blue/20 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export DPR</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">On-Time Submissions</span>
                <div className="text-3xl font-black text-emerald-500">98.2%</div>
                <p className="text-xs text-slate-500">Highest ranking department in Q4</p>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Average Daily Hours</span>
                <div className="text-3xl font-black text-brand-blue dark:text-brand-cyan">8.3 hrs</div>
                <p className="text-xs text-slate-500">Balanced velocity across sprints</p>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Resolved Blockers</span>
                <div className="text-3xl font-black text-purple-500">100%</div>
                <p className="text-xs text-slate-500">All impediments triaged within 24h</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT REPORTS */}
        {activeTab === 'reports' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm max-w-xl mx-auto space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Generate Executive DPR Summary</h3>
              <p className="text-xs text-slate-500">Consolidate all monthly reports for HR payroll and client billing</p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>Current Active Cohort</span>
                  <span className="text-brand-blue">November 2026</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Total Logged Entries</span>
                  <span>{dprs.length} Reports</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (dprs.length > 0) handleExportPdf(dprs[0]);
                }}
                className="w-full py-3.5 rounded-2xl bg-brand-blue text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Export Consolidated Audit File (.txt / .pdf)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </PortalWrapper>
  );
};
