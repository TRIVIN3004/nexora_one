import React, { useState, useEffect } from 'react';
import { PortalWrapper } from './PortalWrapper';
import { 
  Users, 
  Megaphone, 
  Clock, 
  Video, 
  BookOpen, 
  Ticket, 
  Gamepad2, 
  QrCode, 
  Plus, 
  ThumbsUp, 
  ShieldCheck, 
  Play, 
  Sparkles 
} from 'lucide-react';
import { portalStorage } from '../utils/portalStorage';
import type { ConnectBroadcast, ConnectMeeting, ConnectWebinar, ConnectTicket } from '../utils/portalStorage';
import { dprAttendanceService } from '../services/dprAttendanceService';

interface NexoraConnectPortalProps {
  onBack: () => void;
  onOpenAttendance?: () => void;
}

type TabType = 'broadcasts' | 'attendance' | 'meetings' | 'tickets' | 'knowledge' | 'games' | 'verify';

export const NexoraConnectPortal: React.FC<NexoraConnectPortalProps> = ({ onBack, onOpenAttendance }) => {
  const [activeTab, setActiveTab] = useState<TabType>('broadcasts');

  // State
  const [broadcasts, setBroadcasts] = useState<ConnectBroadcast[]>(() => portalStorage.getBroadcasts());
  const [meetings, setMeetings] = useState<ConnectMeeting[]>(() => portalStorage.getMeetings());
  const [webinars, setWebinars] = useState<ConnectWebinar[]>(() => portalStorage.getWebinars());
  const [tickets, setTickets] = useState<ConnectTicket[]>(() => portalStorage.getTickets());
  const [attendance, setAttendance] = useState(() => portalStorage.getAttendanceStatus());

  // Attendance live timer
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (attendance.clockedIn) {
      interval = setInterval(() => {
        setSessionSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSessionSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [attendance.clockedIn]);

  // Attendance toggle
  const handleToggleAttendance = () => {
    if (onOpenAttendance) {
      onOpenAttendance();
      return;
    }
    if (attendance.clockedIn) {
      const hours = attendance.todayHours + (sessionSeconds / 3600);
      const newState = {
        clockedIn: false,
        clockInTime: null,
        todayHours: Number(hours.toFixed(2))
      };
      setAttendance(newState);
      portalStorage.setAttendanceStatus(newState);
    } else {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newState = {
        clockedIn: true,
        clockInTime: now,
        todayHours: attendance.todayHours
      };
      setAttendance(newState);
      portalStorage.setAttendanceStatus(newState);
    }
  };

  // Broadcasts logic
  const [newBcTitle, setNewBcTitle] = useState('');
  const [newBcContent, setNewBcContent] = useState('');
  const [newBcCategory, setNewBcCategory] = useState<'General' | 'Engineering' | 'Executive' | 'HR'>('General');
  const [showBcModal, setShowBcModal] = useState(false);

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBcTitle || !newBcContent) return;
    const currentUser = dprAttendanceService.getSavedSession();
    const updated = portalStorage.saveBroadcast({
      title: newBcTitle,
      content: newBcContent,
      author: currentUser ? `${currentUser.name} (${currentUser.department || 'Nexora'})` : 'Nexora Member',
      category: newBcCategory,
      priority: 'NORMAL',
      timestamp: 'Just now'
    });
    setBroadcasts(updated);
    setNewBcTitle('');
    setNewBcContent('');
    setShowBcModal(false);
  };

  // Meeting create logic
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [mtTitle, setMtTitle] = useState('');
  const [mtAgenda, setMtAgenda] = useState('');
  const [mtPlatform, setMtPlatform] = useState<'Google Meet' | 'MS Teams' | 'Zoom'>('Google Meet');

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mtTitle) return;
    const updated = portalStorage.saveMeeting({
      title: mtTitle,
      agenda: mtAgenda || 'Quick sync and planning',
      date: new Date().toISOString().split('T')[0],
      time: '02:00 PM - 02:45 PM',
      platform: mtPlatform,
      link: mtPlatform === 'Google Meet' ? 'https://meet.google.com/new' : 'https://teams.microsoft.com',
      host: dprAttendanceService.getSavedSession()?.name || 'Nexora Host',
      participants: 4
    });
    setMeetings(updated);
    setMtTitle('');
    setMtAgenda('');
    setShowMeetingModal(false);
  };

  // Ticket create logic
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'IT' | 'Hardware' | 'HR' | 'Access' | 'Project'>('IT');
  const [ticketPriority, setTicketPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [showTicketModal, setShowTicketModal] = useState(false);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject) return;
    const updated = portalStorage.saveTicket({
      subject: ticketSubject,
      category: ticketCategory,
      priority: ticketPriority
    });
    setTickets(updated);
    setTicketSubject('');
    setShowTicketModal(false);
  };

  // Games State
  const [reactionState, setReactionState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
  const [startTime, setStartTime] = useState(0);
  const [reactionMs, setReactionMs] = useState<number | null>(null);

  const startReactionTest = () => {
    setReactionState('waiting');
    setReactionMs(null);
    const delay = Math.floor(Math.random() * 2000) + 1500;
    setTimeout(() => {
      setReactionState('ready');
      setStartTime(Date.now());
    }, delay);
  };

  const handleReactionClick = () => {
    if (reactionState === 'waiting') {
      setReactionState('idle');
      alert('Too early! Wait for green.');
    } else if (reactionState === 'ready') {
      const ms = Date.now() - startTime;
      setReactionMs(ms);
      setReactionState('result');
    }
  };

  // Verification state
  const [verifyQuery, setVerifyQuery] = useState('');
  const [verifyResult, setVerifyResult] = useState<any | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyQuery) return;
    const certs = portalStorage.getCertificates();
    const found = certs.find(c => 
      c.hash.toLowerCase().includes(verifyQuery.toLowerCase()) || 
      c.id.toLowerCase().includes(verifyQuery.toLowerCase()) ||
      c.recipientName.toLowerCase().includes(verifyQuery.toLowerCase())
    );
    if (found) {
      setVerifyResult(found);
    } else {
      setVerifyResult({
        notFound: true,
        hash: verifyQuery
      });
    }
  };

  return (
    <PortalWrapper
      title="Nexora Connect"
      subtitle="Team networking, live attendance, webinars, and unified knowledge base"
      icon={<Users className="w-5 h-5" />}
      cloudUrl="https://nexora-connect-seven.vercel.app/"
      onBack={onBack}
      badge="Connected Hub"
      badgeColor="text-indigo-500 bg-indigo-500/10 border-indigo-500/20"
    >
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
        
        {/* Navigation Tabs Pill Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'broadcasts', label: 'Broadcasts', icon: <Megaphone className="w-4 h-4" /> },
            { id: 'attendance', label: 'Attendance', icon: <Clock className="w-4 h-4" /> },
            { id: 'meetings', label: 'Meetings & Webinars', icon: <Video className="w-4 h-4" /> },
            { id: 'tickets', label: 'Support Tickets', icon: <Ticket className="w-4 h-4" /> },
            { id: 'knowledge', label: 'Knowledge Base', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'games', label: 'Stress Relief', icon: <Gamepad2 className="w-4 h-4" /> },
            { id: 'verify', label: 'Verification', icon: <QrCode className="w-4 h-4" /> }
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

        {/* TAB 1: BROADCASTS */}
        {activeTab === 'broadcasts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-brand-navy dark:text-white">Company Broadcasts</h3>
                <p className="text-xs text-slate-500">Official news, engineering bulletins, and team updates</p>
              </div>
              <button
                onClick={() => setShowBcModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Post Broadcast</span>
              </button>
            </div>

            <div className="grid gap-3">
              {broadcasts.map(bc => (
                <div 
                  key={bc.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-2 hover:border-brand-blue/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue">
                      {bc.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{bc.timestamp}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-brand-navy dark:text-white leading-snug">{bc.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{bc.content}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-xs text-slate-400">
                    <span>By <strong className="text-brand-navy dark:text-white">{bc.author}</strong></span>
                    <button 
                      onClick={() => {
                        setBroadcasts(prev => prev.map(b => b.id === bc.id ? { ...b, likes: b.likes + 1 } : b));
                      }}
                      className="flex items-center gap-1 text-slate-500 hover:text-brand-blue transition-colors cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{bc.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-brand-navy dark:text-white">Live Attendance Punch</h3>
                  <p className="text-xs text-slate-500">Record check-in and check-out with automatic session tracking</p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  attendance.clockedIn 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : 'bg-slate-200 dark:bg-white/10 text-slate-500'
                }`}>
                  {attendance.clockedIn ? 'Active Session' : 'Clocked Out'}
                </div>
              </div>

              {/* Stopwatch & Action Button */}
              <div className="text-center py-6 bg-slate-50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-brand-navy dark:text-brand-cyan">
                  {Math.floor(sessionSeconds / 3600).toString().padStart(2, '0')}:
                  {Math.floor((sessionSeconds % 3600) / 60).toString().padStart(2, '0')}:
                  {(sessionSeconds % 60).toString().padStart(2, '0')}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  {attendance.clockedIn ? `Checked in at ${attendance.clockInTime}` : `Today's accumulated hours: ${attendance.todayHours} hrs`}
                </p>
              </div>

              <button
                onClick={handleToggleAttendance}
                className={`w-full py-3.5 rounded-2xl font-black text-sm tracking-wide shadow-md transition-all cursor-pointer active:scale-98 ${
                  attendance.clockedIn
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30'
                }`}
              >
                {attendance.clockedIn ? 'Punch Out & Save Hours' : 'Punch In Now (Clock In)'}
              </button>

              {onOpenAttendance && (
                <button
                  type="button"
                  onClick={onOpenAttendance}
                  className="w-full py-2.5 px-3 rounded-xl bg-brand-blue/10 hover:bg-brand-blue/20 border border-brand-blue/20 text-brand-blue dark:text-brand-cyan text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>DPR Supabase Cloud Attendance (Direct Web Sync)</span>
                </button>
              )}
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
              <h3 className="text-base font-black text-brand-navy dark:text-white">Attendance Verification QR</h3>
              <p className="text-xs text-slate-500">Scan at office terminal or verify remotely</p>
              
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5">
                <div className="p-4 bg-white rounded-2xl shadow-inner">
                  <QrCode className="w-32 h-32 text-brand-navy" />
                </div>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 mt-3">
                  ID: NX-EMP-8942-VERIFIED
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEETINGS & WEBINARS */}
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-brand-navy dark:text-white">Scheduled Meetings</h3>
                  <p className="text-xs text-slate-500">Upcoming team syncs, sprint plannings, and client meetings</p>
                </div>
                <button
                  onClick={() => setShowMeetingModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 cursor-pointer active:scale-95 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Meeting</span>
                </button>
              </div>

              <div className="grid gap-3">
                {meetings.map(m => (
                  <div key={m.id} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                          {m.platform}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{m.date} • {m.time}</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">{m.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{m.agenda}</p>
                    </div>
                    <button 
                      onClick={() => window.open(m.link, '_blank')}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-brand-blue/10 dark:bg-brand-cyan/10 hover:bg-brand-blue/20 dark:hover:bg-brand-cyan/20 border border-brand-blue/25 text-brand-blue dark:text-brand-cyan text-xs font-bold active:scale-95 transition-all cursor-pointer shrink-0"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Room</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Webinars */}
            <div className="space-y-3 pt-4 border-t border-black/5 dark:border-white/5">
              <div>
                <h3 className="text-base font-black text-brand-navy dark:text-white">Nexora Tech Webinars</h3>
                <p className="text-xs text-slate-500">Live masterclasses from senior architects and AI researchers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {webinars.map(wb => (
                  <div key={wb.id} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-brand-blue dark:text-brand-cyan">
                        {wb.duration}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{wb.date} • {wb.time}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">{wb.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Speaker: {wb.speaker}</p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-1.5 flex-wrap">
                        {wb.tags.map(t => (
                          <span key={t} className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setWebinars(portalStorage.toggleWebinarRegister(wb.id))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                          wb.registered
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-blue text-white hover:bg-brand-blue/90'
                        }`}
                      >
                        {wb.registered ? 'Registered ✓' : 'Register Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TICKETS */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-brand-navy dark:text-white">Support & Service Desk</h3>
                <p className="text-xs text-slate-500">Raise IT, infrastructure, and HR tickets with rapid triage</p>
              </div>
              <button
                onClick={() => setShowTicketModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 cursor-pointer active:scale-95 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Raise Ticket</span>
              </button>
            </div>

            <div className="grid gap-3">
              {tickets.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-black text-brand-blue dark:text-brand-cyan">{t.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                        {t.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        t.priority === 'HIGH' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">{t.subject}</h4>
                    <span className="text-[11px] text-slate-400">Created: {t.createdAt}</span>
                  </div>

                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    t.status === 'OPEN'
                      ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      : t.status === 'IN_PROGRESS'
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {t.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Nexora Knowledge & Engineering Wiki</h3>
              <p className="text-xs text-slate-500">Internal architectural docs, onboarding blueprints, and code guidelines</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { title: 'Nexora Core Architecture Standards v2.0', tag: 'Architecture', updated: 'Nov 2026', read: '5 min' },
                { title: 'Capacitor 8 Mobile Integration & Native Bridges', tag: 'Mobile', updated: 'Nov 2026', read: '8 min' },
                { title: 'Supabase Transaction Pooler & Security RLS Policies', tag: 'Database', updated: 'Oct 2026', read: '6 min' },
                { title: 'PRDAMS Cryptographic Certificate Signing Standard', tag: 'Security', updated: 'Oct 2026', read: '7 min' }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-2 hover:border-brand-blue/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue">
                      {doc.tag}
                    </span>
                    <span className="text-[11px] text-slate-400">{doc.read} read</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-brand-navy dark:text-white leading-snug">{doc.title}</h4>
                  <p className="text-xs text-slate-500">Updated {doc.updated} by Core Engineering</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: STRESS RELIEF MINI GAMES */}
        {activeTab === 'games' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Stress Relief Mini Games</h3>
              <p className="text-xs text-slate-500">Quick cognitive breaks to refresh mental clarity during long sprints</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Reaction Speed Test */}
              <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">Cyber Reaction Speed</h4>
                  <span className="text-xs text-brand-blue font-bold">Reflex Trainer</span>
                </div>

                <div 
                  onClick={handleReactionClick}
                  className={`h-40 rounded-2xl flex flex-col items-center justify-center cursor-pointer select-none transition-all ${
                    reactionState === 'idle'
                      ? 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
                      : reactionState === 'waiting'
                      ? 'bg-amber-500 text-white animate-pulse'
                      : reactionState === 'ready'
                      ? 'bg-emerald-500 text-white font-black scale-102'
                      : 'bg-brand-blue text-white'
                  }`}
                >
                  {reactionState === 'idle' && (
                    <div className="text-center">
                      <Play className="w-8 h-8 mx-auto mb-2 text-brand-blue" />
                      <p className="text-xs font-bold">Tap to Start Test</p>
                    </div>
                  )}
                  {reactionState === 'waiting' && <p className="text-sm font-bold">Wait for GREEN...</p>}
                  {reactionState === 'ready' && <p className="text-xl font-black">CLICK NOW!</p>}
                  {reactionState === 'result' && (
                    <div className="text-center">
                      <span className="text-3xl font-black">{reactionMs} ms</span>
                      <p className="text-xs mt-1 opacity-90">Great reaction! Tap to retry.</p>
                    </div>
                  )}
                </div>

                {reactionState === 'idle' && (
                  <button
                    onClick={startReactionTest}
                    className="w-full py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                  >
                    Start Reflex Challenge
                  </button>
                )}
              </div>

              {/* Focus Breath Circle */}
              <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">Guided Focus Breath</h4>
                  <span className="text-xs text-brand-cyan font-bold">4-4-4 Cycle</span>
                </div>

                <div className="h-40 rounded-2xl bg-slate-50 dark:bg-black/20 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-blue/30 to-brand-cyan/40 border-2 border-brand-cyan/60 animate-pulse flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-brand-cyan animate-spin" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-300 mt-2">Inhale... Hold... Exhale...</span>
                </div>

                <p className="text-[11px] text-center text-slate-400">Take 3 deep breath cycles to reset cortisol levels and enhance coding focus.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: VERIFICATION LOOKUP */}
        {activeTab === 'verify' && (
          <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4 max-w-xl mx-auto">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Digital Credential Verification</h3>
              <p className="text-xs text-slate-500">Verify authentic certificates and project roles issued by Nexora Technologies</p>
            </div>

            <form onSubmit={handleVerify} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Credential ID or Hash (e.g. NX-8F92A1)"
                value={verifyQuery}
                onChange={e => setVerifyQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium focus:border-brand-blue"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 cursor-pointer active:scale-95 transition-all"
              >
                Verify
              </button>
            </form>

            {verifyResult && (
              <div className={`p-4 rounded-2xl border ${
                verifyResult.notFound 
                  ? 'bg-red-500/10 border-red-500/20 text-red-500'
                  : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              }`}>
                {verifyResult.notFound ? (
                  <p className="text-xs font-bold">No verified credential found for hash "{verifyResult.hash}".</p>
                ) : (
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-black text-sm">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span>OFFICIALLY VERIFIED NEXORA CREDENTIAL</span>
                    </div>
                    <p>Recipient: <strong className="text-brand-navy dark:text-white">{verifyResult.recipientName}</strong></p>
                    <p>Project: <strong className="text-brand-navy dark:text-white">{verifyResult.projectName}</strong></p>
                    <p>Role: <strong className="text-brand-navy dark:text-white">{verifyResult.role}</strong></p>
                    <p>Issued: <strong className="text-brand-navy dark:text-white">{verifyResult.issueDate}</strong></p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      {/* CREATE BROADCAST MODAL */}
      {showBcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-5 rounded-3xl bg-white dark:bg-[#06152F] border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-brand-navy dark:text-white">Create New Broadcast</h3>
            <form onSubmit={handleCreateBroadcast} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Broadcast Headline"
                  value={newBcTitle}
                  onChange={e => setNewBcTitle(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500">Category</label>
                <select
                  value={newBcCategory}
                  onChange={e => setNewBcCategory(e.target.value as any)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                >
                  <option value="General">General</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Executive">Executive</option>
                  <option value="HR">HR</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500">Content</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Details of the announcement..."
                  value={newBcContent}
                  onChange={e => setNewBcContent(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBcModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE MEETING MODAL */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-5 rounded-3xl bg-white dark:bg-[#06152F] border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-brand-navy dark:text-white">Schedule Meeting</h3>
            <form onSubmit={handleCreateMeeting} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500">Meeting Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mobile Architecture Review"
                  value={mtTitle}
                  onChange={e => setMtTitle(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500">Platform</label>
                <select
                  value={mtPlatform}
                  onChange={e => setMtPlatform(e.target.value as any)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="MS Teams">MS Teams</option>
                  <option value="Zoom">Zoom</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500">Agenda</label>
                <textarea
                  rows={2}
                  placeholder="Agenda notes..."
                  value={mtAgenda}
                  onChange={e => setMtAgenda(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMeetingModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                >
                  Save Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TICKET MODAL */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-5 rounded-3xl bg-white dark:bg-[#06152F] border border-black/10 dark:border-white/10 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-brand-navy dark:text-white">Raise Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500">Issue Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of the issue"
                  value={ticketSubject}
                  onChange={e => setTicketSubject(e.target.value)}
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Category</label>
                  <select
                    value={ticketCategory}
                    onChange={e => setTicketCategory(e.target.value as any)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  >
                    <option value="IT">IT Support</option>
                    <option value="Hardware">Hardware</option>
                    <option value="HR">HR Request</option>
                    <option value="Access">Access / Permissions</option>
                    <option value="Project">Project Infrastructure</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={e => setTicketPriority(e.target.value as any)}
                    className="w-full mt-1 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High (Urgent)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </PortalWrapper>
  );
};
