import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  LogIn, 
  LogOut, 
  User, 
  ShieldCheck, 
  Calendar, 
  Database, 
  Eye,
  EyeOff,
  History,
  RefreshCw
} from 'lucide-react';
import { dprAttendanceService } from '../services/dprAttendanceService';
import type { DprAuthUser, AttendanceRecord } from '../services/dprAttendanceService';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAttendanceChanged?: () => void;
  onLoginSuccess?: (user: DprAuthUser) => void;
  modalTitle?: string;
  modalSubtitle?: string;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({ 
  isOpen, 
  onClose,
  onAttendanceChanged,
  onLoginSuccess,
  modalTitle,
  modalSubtitle
}) => {
  const [currentUser, setCurrentUser] = useState<DprAuthUser | null>(() => dprAttendanceService.getSavedSession());
  
  // Login form states
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Attendance Punch states
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [punchMethod, setPunchMethod] = useState('Nexora One App');
  const [remarks, setRemarks] = useState('');
  const [isSubmittingPunch, setIsSubmittingPunch] = useState(false);
  const [punchSuccessMsg, setPunchSuccessMsg] = useState<string | null>(null);
  const [punchErrorMsg, setPunchErrorMsg] = useState<string | null>(null);

  // Live timer state
  const [currentTime, setCurrentTime] = useState(new Date());

  // Attendance history
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Live clock interval
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch today's record and history when user changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const session = dprAttendanceService.getSavedSession();
      setCurrentUser(session);
      if (session) {
        refreshAttendanceData(session);
      }
    }
  }, [isOpen]);

  const refreshAttendanceData = async (user: DprAuthUser) => {
    setIsLoadingHistory(true);
    try {
      const today = await dprAttendanceService.getTodayAttendanceRecord(user.id);
      setTodayRecord(today);
      const records = await dprAttendanceService.fetchAttendanceHistory(user.id);
      setHistory(records);
    } catch (e) {
      console.warn('Error loading attendance records:', e);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    const result = await dprAttendanceService.loginWithDpr(emailOrId, password);
    setIsLoggingIn(false);

    if (result.success && result.user) {
      setCurrentUser(result.user);
      refreshAttendanceData(result.user);
      if (onLoginSuccess) {
        onLoginSuccess(result.user);
      }
    } else {
      setAuthError(result.error || 'Login failed. Please check your credentials.');
    }
  };

  // Handle Sign Out / Switch User
  const handleSignOut = () => {
    dprAttendanceService.clearSession();
    setCurrentUser(null);
    setTodayRecord(null);
    setHistory([]);
    setPunchSuccessMsg(null);
    setPunchErrorMsg(null);
  };

  // Handle Punch In
  const handlePunchIn = async () => {
    if (!currentUser) return;
    setIsSubmittingPunch(true);
    setPunchErrorMsg(null);
    setPunchSuccessMsg(null);

    const result = await dprAttendanceService.markCheckIn(currentUser, punchMethod, remarks);
    setIsSubmittingPunch(false);

    if (result.success && result.record) {
      setTodayRecord(result.record);
      setPunchSuccessMsg('🎉 Punch-In recorded and synced to Supabase Cloud & DPR Web App!');
      refreshAttendanceData(currentUser);
      if (onAttendanceChanged) onAttendanceChanged();
    } else {
      setPunchErrorMsg(result.error || 'Failed to mark attendance.');
    }
  };

  // Handle Punch Out
  const handlePunchOut = async () => {
    if (!currentUser) return;
    setIsSubmittingPunch(true);
    setPunchErrorMsg(null);
    setPunchSuccessMsg(null);

    const result = await dprAttendanceService.markCheckOut(currentUser);
    setIsSubmittingPunch(false);

    if (result.success && result.record) {
      setTodayRecord(result.record);
      setPunchSuccessMsg('🏁 Workday completed! Check-out saved in Supabase.');
      refreshAttendanceData(currentUser);
      if (onAttendanceChanged) onAttendanceChanged();
    } else {
      setPunchErrorMsg(result.error || 'Failed to check out.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg glass-effect rounded-[28px] border border-brand-blue/30 dark:border-brand-cyan/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] bg-white dark:bg-[#06152f]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-black/10 dark:border-white/10 bg-gradient-to-r from-brand-navy/90 to-brand-blue/90 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan border border-brand-cyan/30 shadow-xs">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-2">
                {modalTitle || 'DPR Attendance Portal'}
                <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Supabase Live
                </span>
              </h3>
              <span className="text-[10px] text-white/70 block">
                {modalSubtitle || 'Independent Real-time Cloud Punch System • Developed by Trivin'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          
          {/* VIEW A: LOGIN REQUIRED */}
          {!currentUser ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-brand-blue/5 dark:bg-brand-cyan/5 border border-brand-blue/15 dark:border-brand-cyan/15">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-blue dark:text-brand-cyan shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-brand-navy dark:text-white">DPR Authentication Required</p>
                    <p className="text-brand-secondary mt-0.5 leading-relaxed">
                      Please enter your DPR corporate credentials so your attendance is uniquely verified, registered in Supabase, and reflected in real-time across the company dashboard.
                    </p>
                  </div>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-500 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-brand-navy dark:text-white uppercase tracking-wider mb-1">
                    Employee ID or Corporate Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. employee@nexora.com or EMP-0001"
                      value={emailOrId}
                      onChange={e => setEmailOrId(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-brand-navy dark:text-white focus:outline-hidden focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-navy dark:text-white uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your DPR password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-brand-navy dark:text-white focus:outline-hidden focus:border-brand-cyan"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/25 active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Verifying with Supabase...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      {modalTitle ? 'Verify Credentials & Access' : 'Verify Credentials & Punch'}
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* VIEW B: USER LOGGED IN - READY TO PUNCH */
            <div className="space-y-4">
              
              {/* Logged in User Bar */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white font-black text-sm flex items-center justify-center shadow-md">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-brand-navy dark:text-white">
                        {currentUser.name}
                      </span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-brand-blue/15 text-brand-blue dark:text-brand-cyan font-extrabold">
                        {currentUser.id}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-secondary block">
                      {currentUser.department} • {currentUser.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  title="Switch User / Logout"
                  className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-red-500/10 hover:text-red-500 text-slate-400 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Live Digital Clock & Today's Date */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-navy/90 to-brand-blue/80 text-white text-center shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-widest mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
                <div className="text-3xl font-black tracking-tight font-mono text-white">
                  {currentTime.toLocaleTimeString()}
                </div>
                
                {/* Supabase Status Pill */}
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Connected to Supabase Cloud Database</span>
                </div>
              </div>

              {/* Status & Feedback banners */}
              {punchSuccessMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-600 dark:text-emerald-300 font-bold animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{punchSuccessMsg}</span>
                </div>
              )}

              {punchErrorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-500 font-bold animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{punchErrorMsg}</span>
                </div>
              )}

              {/* Attendance Action Box */}
              <div className="p-4 rounded-2xl glass-effect border border-black/10 dark:border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-brand-navy dark:text-white uppercase tracking-wider">
                    Today's Attendance Status
                  </span>
                  {todayRecord && todayRecord.checkInTime ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
                      ● Checked In at {todayRecord.checkInTime}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
                      ○ Not Yet Checked In
                    </span>
                  )}
                </div>

                {/* If Not Checked In: Form & Punch In Button */}
                {!todayRecord || !todayRecord.checkInTime ? (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-brand-secondary block mb-1">
                          Punch Source
                        </label>
                        <select
                          value={punchMethod}
                          onChange={e => setPunchMethod(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-brand-navy dark:text-white focus:outline-hidden"
                        >
                          <option value="Nexora One App">Nexora One Universal App</option>
                          <option value="Workstation Desktop">Workstation Desktop</option>
                          <option value="Mobile App">Mobile Phone</option>
                          <option value="QR Scan">Digital QR</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-brand-secondary block mb-1">
                          Remarks (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. On-time check-in"
                          value={remarks}
                          onChange={e => setRemarks(e.target.value)}
                          className="w-full px-2.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs text-brand-navy dark:text-white focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handlePunchIn}
                      disabled={isSubmittingPunch}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-emerald-500/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingPunch ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Marking Attendance in Supabase...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Punch In Now (Mark Attendance)
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  /* If Already Checked In: Summary & Punch Out */
                  <div className="space-y-3 pt-1">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <div className="flex justify-between text-brand-navy dark:text-white">
                        <span className="font-semibold">Check-In Timestamp:</span>
                        <span className="font-black font-mono">{todayRecord.checkInTime}</span>
                      </div>
                      {todayRecord.checkOutTime ? (
                        <div className="flex justify-between text-brand-navy dark:text-white">
                          <span className="font-semibold">Check-Out Timestamp:</span>
                          <span className="font-black font-mono">{todayRecord.checkOutTime}</span>
                        </div>
                      ) : null}
                      <div className="flex justify-between text-brand-navy dark:text-white">
                        <span className="font-semibold">Marked By:</span>
                        <span>{todayRecord.markedBy}</span>
                      </div>
                      <div className="flex justify-between text-brand-navy dark:text-white">
                        <span className="font-semibold">Status:</span>
                        <span className="text-emerald-500 font-bold">{todayRecord.status}</span>
                      </div>
                    </div>

                    {!todayRecord.checkOutTime ? (
                      <button
                        onClick={handlePunchOut}
                        disabled={isSubmittingPunch}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-rose-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingPunch ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Recording Check-Out...
                          </>
                        ) : (
                          <>
                            <LogOut className="w-4 h-4" />
                            Punch Out (End Workday)
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="text-center py-2 text-xs font-bold text-emerald-500">
                        ✨ Full day attendance has been completed and verified.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Recent Cloud Attendance Logs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy dark:text-white uppercase tracking-wider">
                    <History className="w-3.5 h-3.5 text-brand-cyan" />
                    <span>Recent Supabase Attendance Logs</span>
                  </div>
                  <button
                    onClick={() => currentUser && refreshAttendanceData(currentUser)}
                    className="text-[10px] text-brand-blue dark:text-brand-cyan hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoadingHistory ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                <div className="space-y-1.5 max-h-40 overflow-y-auto no-scrollbar pr-1">
                  {history.length > 0 ? (
                    history.slice(0, 6).map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-brand-navy dark:text-white">
                            {rec.date}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded-md text-[9px] font-black uppercase ${
                            rec.status === 'Present' 
                              ? 'bg-emerald-500/20 text-emerald-500' 
                              : 'bg-amber-500/20 text-amber-500'
                          }`}>
                            {rec.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-brand-secondary font-mono">
                          In: {rec.checkInTime || '--:--'} | Out: {rec.checkOutTime || '--:--'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-brand-secondary">
                      {isLoadingHistory ? 'Loading records from Supabase...' : 'No prior records found.'}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer with Attribution */}
        <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5 text-center flex items-center justify-between px-5">
          <span className="text-[10px] text-brand-secondary flex items-center gap-1">
            <Database className="w-3 h-3 text-brand-cyan" />
            Supabase Project ID: <code className="font-mono">qwvdyyeyzpqtxqzithso</code>
          </span>
          <span className="text-[10px] font-extrabold text-brand-blue dark:text-brand-cyan tracking-wider">
            Developed by Trivin
          </span>
        </div>

      </div>
    </div>
  );
};
