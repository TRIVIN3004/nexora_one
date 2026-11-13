import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Mail, 
  CheckCircle2, 
  LogOut, 
  X, 
  Sparkles 
} from 'lucide-react';
import { portalStorage, defaultTrivinUser } from '../utils/portalStorage';
import type { AuthUser } from '../utils/portalStorage';

interface PortalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthUser;
  onUserUpdate: (user: AuthUser) => void;
}

export const PortalAuthModal: React.FC<PortalAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserUpdate
}) => {
  const [name, setName] = useState(currentUser.name || 'Trivin');
  const [email, setEmail] = useState(currentUser.email || 'trivin@nexoratechs.com');
  const [role, setRole] = useState<'ADMIN' | 'EMPLOYEE' | 'MENTOR' | 'STUDENT'>(currentUser.role || 'ADMIN');
  const [department, setDepartment] = useState(currentUser.department || 'Core Engineering & Architecture');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user: AuthUser = {
      id: name.toLowerCase().includes('trivin') ? 'NX-EMP-TRIVIN' : `NX-USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim() || 'Trivin',
      email: email.trim() || 'trivin@nexoratechs.com',
      role,
      designation: role === 'ADMIN' ? 'Lead Developer & Chief Architect' : role === 'MENTOR' ? 'Senior Technical Mentor' : role === 'STUDENT' ? 'Engineering Intern' : 'Staff Engineer',
      department,
      isLoggedIn: true
    };
    portalStorage.setAuthUser(user);
    onUserUpdate(user);
    onClose();
  };

  const handleQuickLoginTrivin = () => {
    portalStorage.setAuthUser(defaultTrivinUser);
    onUserUpdate(defaultTrivinUser);
    onClose();
  };

  const handleLogout = () => {
    const loggedOut: AuthUser = {
      ...currentUser,
      isLoggedIn: false
    };
    portalStorage.setAuthUser(loggedOut);
    onUserUpdate(loggedOut);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#06152F] border border-black/10 dark:border-white/10 shadow-2xl space-y-5 text-slate-800 dark:text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer active:scale-95 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-brand-navy dark:text-white leading-tight">
              Portal Authentication Desk
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Identity & session authorization for Attendance, DPR, and Certifications
            </p>
          </div>
        </div>

        {/* Current Session Overview */}
        {currentUser.isLoggedIn ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Active Authenticated Session
              </span>
              <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-white dark:bg-black/20 text-slate-600 dark:text-slate-300">
                {currentUser.id}
              </span>
            </div>
            <div className="pt-1 text-slate-600 dark:text-slate-300 space-y-0.5">
              <p>User: <strong className="text-brand-navy dark:text-white">{currentUser.name}</strong></p>
              <p>Email: <strong className="text-brand-navy dark:text-white">{currentUser.email}</strong></p>
              <p>Role: <strong className="text-brand-blue dark:text-brand-cyan">{currentUser.designation}</strong></p>
              <p>Department: <strong className="text-brand-navy dark:text-white">{currentUser.department}</strong></p>
            </div>
            <div className="flex gap-2 pt-2 border-t border-emerald-500/20">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold cursor-pointer"
              >
                Continue to Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300">
            Please sign in to log your personal attendance, file DPR reports, and access credential portals.
          </div>
        )}

        {/* 1-Click Login as Trivin */}
        <button
          onClick={handleQuickLoginTrivin}
          className="w-full p-3 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20 cursor-pointer active:scale-98 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Quick Sign In as Trivin (Lead Developer)</span>
        </button>

        {/* Or Custom Sign In Form */}
        <form onSubmit={handleLogin} className="space-y-3 pt-2 border-t border-black/5 dark:border-white/5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            {currentUser.isLoggedIn ? 'Switch Account or Update Profile' : 'Custom Credentials Sign In'}
          </span>

          <div>
            <label className="text-[11px] font-bold text-slate-500">Full Name</label>
            <div className="relative mt-1">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-500">Corporate Email</label>
            <div className="relative mt-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@nexoratechs.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-500">Portal Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold"
              >
                <option value="ADMIN">Lead Architect / Admin</option>
                <option value="EMPLOYEE">Staff Engineer / Employee</option>
                <option value="MENTOR">Technical Mentor</option>
                <option value="STUDENT">Internship Student</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-500">Department</label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold"
              >
                <option value="Core Engineering & Architecture">Core Engineering</option>
                <option value="AI Research & Agents">AI Research</option>
                <option value="Full-Stack Web & Mobile">Web & Mobile</option>
                <option value="Cloud DevOps">Cloud DevOps</option>
                <option value="UI/UX Product Design">Product Design</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-wider cursor-pointer active:scale-98 transition-all mt-2"
          >
            Authenticate & Set Active Session
          </button>
        </form>

        <div className="text-center pt-2 text-[10px] text-slate-400 font-bold">
          Developed by Trivin • Nexora One Security Hub
        </div>
      </div>
    </div>
  );
};
