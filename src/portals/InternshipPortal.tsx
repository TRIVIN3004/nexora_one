import React, { useState } from 'react';
import { PortalWrapper } from './PortalWrapper';
import { 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  FileCode, 
  ExternalLink, 
  Star, 
  Award, 
  Users
} from 'lucide-react';
import { portalStorage } from '../utils/portalStorage';
import type { InternshipAssignment } from '../utils/portalStorage';

interface InternshipPortalProps {
  onBack: () => void;
}

type TabType = 'tracks' | 'student' | 'mentor' | 'admin' | 'certificate';

export const InternshipPortal: React.FC<InternshipPortalProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('student');
  const [assignments, setAssignments] = useState<InternshipAssignment[]>(() => portalStorage.getAssignments());

  // Student submission form
  const [week, setWeek] = useState(3);
  const [asnTitle, setAsnTitle] = useState('Production Capacitor Bridge & Native Storage');
  const studentName = 'Alex Mercer';
  const [githubUrl, setGithubUrl] = useState('https://github.com/nexora-interns/alex-capacitor-app');
  const [demoUrl, setDemoUrl] = useState('https://alex-nexora-app.vercel.app');

  // Mentor evaluation state
  const [selectedAsn, setSelectedAsn] = useState<InternshipAssignment | null>(null);
  const [scoreInput, setScoreInput] = useState(96);
  const [feedbackInput, setFeedbackInput] = useState('Exemplary implementation! Clean code structure and robust offline caching.');

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl) return;

    const updated = portalStorage.saveAssignment({
      week,
      title: asnTitle,
      studentName,
      githubUrl,
      demoUrl
    });

    setAssignments(updated);
    alert('🎉 Assignment Submitted Successfully to Mentor Review Queue!');
  };

  const handleGradeAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsn) return;

    const updated = portalStorage.gradeAssignment(selectedAsn.id, scoreInput, feedbackInput);
    setAssignments(updated);
    setSelectedAsn(null);
    alert('✅ Student Submission Graded & Feedback Saved!');
  };

  const tracks = [
    {
      title: 'Autonomous AI & Large Language Models',
      duration: '12 Weeks',
      modules: ['Prompt Engineering & System Personas', 'RAG & Vector Embeddings', 'Multi-Agent Tool Orchestration', 'On-Device Edge Deployment'],
      icon: '🤖',
      status: 'Active Track'
    },
    {
      title: 'Full-Stack Modern Web & Mobile Systems',
      duration: '12 Weeks',
      modules: ['React 19 & Tailwind CSS 4', 'Capacitor 8 Mobile Platform Sync', 'Supabase Cloud Architecture', 'Desktop Electron Engineering'],
      icon: '📱',
      status: 'Enrolled'
    },
    {
      title: 'Cloud DevOps & Infrastructure Automation',
      duration: '12 Weeks',
      modules: ['Docker Containers & Kubernetes', 'CI/CD with GitHub Actions', 'Zero-Trust Cloud IAM Security', 'Monitoring & APM Observability'],
      icon: '☁️',
      status: 'Available'
    },
    {
      title: 'UI/UX & Design Systems Engineering',
      duration: '8 Weeks',
      modules: ['Figma Component Architecture', 'Design Tokens & Micro-Interactions', 'Accessibility (a11y) & Usability', 'Interactive Prototyping'],
      icon: '🎨',
      status: 'Available'
    }
  ];

  return (
    <PortalWrapper
      title="Nexora Internship Academy"
      subtitle="Curriculum tracks, project assignments, mentor grading, and certification"
      icon={<GraduationCap className="w-5 h-5" />}
      cloudUrl="https://internship-portal-silk.vercel.app/"
      onBack={onBack}
      badge="Internship Portal"
      badgeColor="text-brand-gold bg-brand-gold/10 border-brand-gold/20"
    >
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">

        {/* Navigation Tabs Pill Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'student', label: 'Student Dashboard', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'tracks', label: 'Curriculum Tracks', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'mentor', label: 'Mentor Review Queue', icon: <Star className="w-4 h-4" /> },
            { id: 'admin', label: 'Cohort Administration', icon: <Users className="w-4 h-4" /> },
            { id: 'certificate', label: 'Experience Certificate', icon: <Award className="w-4 h-4" /> }
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

        {/* TAB 1: STUDENT DASHBOARD */}
        {activeTab === 'student' && (
          <div className="space-y-6">
            {/* Student Header Summary Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-[#06152F] dark:to-[#040E20] border border-black/10 dark:border-brand-gold/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                  Enrolled Intern • Full-Stack Track
                </span>
                <h3 className="text-xl font-black text-brand-navy dark:text-white">Welcome, Alex Mercer</h3>
                <p className="text-xs text-slate-500">Cohort 2026-B • Mentor: Shakthi J. • Overall Progress: 75%</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Average Score</span>
                  <span className="text-2xl font-black text-emerald-500">95.5 / 100</span>
                </div>
              </div>
            </div>

            {/* Submission Form & Recent Submissions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Form */}
              <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
                <div>
                  <h4 className="text-base font-black text-brand-navy dark:text-white">Submit Weekly Assignment</h4>
                  <p className="text-xs text-slate-500">Upload your GitHub repository and live demo link for review</p>
                </div>

                <form onSubmit={handleSubmitAssignment} className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500">Week #</label>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        value={week}
                        onChange={e => setWeek(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] font-bold text-slate-500">Assignment Title</label>
                      <input
                        type="text"
                        required
                        value={asnTitle}
                        onChange={e => setAsnTitle(e.target.value)}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500">GitHub Repository Link</label>
                    <input
                      type="url"
                      required
                      value={githubUrl}
                      onChange={e => setGithubUrl(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Live Demo URL</label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={e => setDemoUrl(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-brand-blue text-white font-black text-xs uppercase tracking-wider shadow-md shadow-brand-blue/30 cursor-pointer active:scale-98 transition-all"
                  >
                    Submit Assignment for Grading
                  </button>
                </form>
              </div>

              {/* Submissions List & Mentor Feedback */}
              <div className="space-y-3">
                <h4 className="text-base font-black text-brand-navy dark:text-white">Submission History & Feedback</h4>
                
                <div className="grid gap-3">
                  {assignments.map(asn => (
                    <div key={asn.id} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue">
                          Week {asn.week}
                        </span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          asn.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {asn.status.replace('_', ' ')}
                        </span>
                      </div>

                      <h5 className="text-sm font-extrabold text-brand-navy dark:text-white">{asn.title}</h5>

                      <div className="flex items-center gap-3 text-xs text-brand-blue">
                        <a href={asn.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <FileCode className="w-3.5 h-3.5" />
                          <span>Code Repo</span>
                        </a>
                        {asn.demoUrl && (
                          <a href={asn.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live App</span>
                          </a>
                        )}
                      </div>

                      {asn.score !== undefined && (
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>Mentor Grade:</span>
                            <span className="text-emerald-500 font-extrabold">{asn.score} / 100</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 italic">"{asn.feedback}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM TRACKS */}
        {activeTab === 'tracks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map((t, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{t.icon}</span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    t.status === 'Enrolled' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                  }`}>
                    {t.status}
                  </span>
                </div>
                <h4 className="text-base font-black text-brand-navy dark:text-white">{t.title}</h4>
                <span className="text-xs font-bold text-slate-400 block">{t.duration} Intensive Pathway</span>
                
                <div className="space-y-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Core Syllabus Modules:</span>
                  {t.modules.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: MENTOR REVIEW QUEUE */}
        {activeTab === 'mentor' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Mentor Review & Grading Desk</h3>
              <p className="text-xs text-slate-500">Evaluate intern submissions, assign scores, and provide feedback</p>
            </div>

            <div className="grid gap-3">
              {assignments.map(asn => (
                <div key={asn.id} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-navy dark:text-white">{asn.studentName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue">
                        Week {asn.week}
                      </span>
                    </div>
                    <h5 className="text-sm font-extrabold text-brand-navy dark:text-white">{asn.title}</h5>
                    <span className="text-[11px] text-slate-400">Submitted: {asn.submittedAt}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAsn(asn);
                      setScoreInput(asn.score || 90);
                      setFeedbackInput(asn.feedback || '');
                    }}
                    className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 cursor-pointer active:scale-95 transition-all"
                  >
                    {asn.status === 'APPROVED' ? 'Re-Evaluate' : 'Grade Submission'}
                  </button>
                </div>
              ))}
            </div>

            {/* Evaluation Modal */}
            {selectedAsn && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
                <div className="w-full max-w-md p-5 rounded-3xl bg-white dark:bg-[#06152F] border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
                  <h4 className="text-base font-black text-brand-navy dark:text-white">Grade: {selectedAsn.studentName}</h4>
                  <p className="text-xs text-slate-400">{selectedAsn.title} (Week {selectedAsn.week})</p>

                  <form onSubmit={handleGradeAssignment} className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        <span>Score (out of 100)</span>
                        <span className="text-brand-blue font-black">{scoreInput} / 100</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={scoreInput}
                        onChange={e => setScoreInput(Number(e.target.value))}
                        className="w-full accent-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-500">Constructive Feedback</label>
                      <textarea
                        required
                        rows={3}
                        value={feedbackInput}
                        onChange={e => setFeedbackInput(e.target.value)}
                        placeholder="Mentor notes on code quality, architecture, and improvements..."
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedAsn(null)}
                        className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                      >
                        Save Evaluation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: COHORT ADMINISTRATION */}
        {activeTab === 'admin' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Enrolled Interns</span>
              <div className="text-3xl font-black text-brand-blue dark:text-brand-cyan">48 Interns</div>
              <p className="text-xs text-slate-500">Across 4 active tracks</p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Mentor Review Rate</span>
              <div className="text-3xl font-black text-emerald-500">97.8%</div>
              <p className="text-xs text-slate-500">Average review time 18 hrs</p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Certificates Granted</span>
              <div className="text-3xl font-black text-brand-gold">142 Issued</div>
              <p className="text-xs text-slate-500">Registered in PRDAMS</p>
            </div>
          </div>
        )}

        {/* TAB 5: EXPERIENCE CERTIFICATE PREVIEW */}
        {activeTab === 'certificate' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-[#06152F] dark:to-[#030914] border-4 border-double border-brand-gold/40 shadow-xl text-center space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-brand-gold" />
              <span className="text-xs font-black tracking-widest uppercase text-brand-gold">GONEXORA TECHS INTERNSHIP CERTIFICATE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white uppercase tracking-tight">
              Certificate of Internship Completion
            </h3>

            <p className="text-xs text-slate-500">This is proudly presented to</p>
            <h4 className="text-2xl font-black text-brand-blue dark:text-brand-cyan">ALEX MERCER</h4>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              For successfully completing the rigorous 12-Week Intensive Full-Stack Modern Web & Mobile Architecture program at Nexora Technologies with Grade A Distinction.
            </p>

            <div className="pt-4 flex items-center justify-between border-t border-black/10 dark:border-white/10 text-left">
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Authorized Mentor</span>
                <span className="text-xs font-bold text-brand-navy dark:text-white">Shakthi J.</span>
                <span className="text-[9px] text-slate-400 block">Lead Engineering Mentor</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Certification ID</span>
                <span className="text-xs font-mono font-bold text-brand-gold block">NX-INT-2026-9814</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Attribution */}
        <div className="mt-8 flex flex-col items-center text-center pb-2">
          <div className="w-8 h-[1px] bg-black/10 dark:bg-white/10 mb-2" />
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue dark:text-brand-cyan">
            Developed by Trivin
          </span>
          <span className="text-[8px] text-slate-400 font-semibold tracking-wider">
            Chief Architect & Lead Developer • Nexora Technologies
          </span>
        </div>

      </div>
    </PortalWrapper>
  );
};
