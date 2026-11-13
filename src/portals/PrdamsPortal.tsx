import React, { useState, useRef } from 'react';
import { PortalWrapper } from './PortalWrapper';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  FileCheck, 
  Download, 
  PenTool, 
  RotateCcw, 
  QrCode, 
  Sparkles
} from 'lucide-react';
import { portalStorage } from '../utils/portalStorage';
import type { PrdamsCertificate } from '../utils/portalStorage';

interface PrdamsPortalProps {
  onBack: () => void;
}

type TabType = 'generator' | 'verification' | 'roles' | 'registry';

export const PrdamsPortal: React.FC<PrdamsPortalProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [certificates, setCertificates] = useState<PrdamsCertificate[]>(() => portalStorage.getCertificates());

  // Form state for generating certificate
  const [recipientName, setRecipientName] = useState('Shakthi J.');
  const [recipientEmail, setRecipientEmail] = useState('shakthi@gonexora.com');
  const [projectName, setProjectName] = useState('Nexora Autonomous AI Gateway');
  const [role, setRole] = useState('Lead AI Engineer');
  const [issueDate, setIssueDate] = useState('2026-11-13');
  const [tenure, setTenure] = useState('6 Months');
  const [signatory, setSignatory] = useState('Aakash Raj');

  // Active preview certificate
  const [previewCert, setPreviewCert] = useState<PrdamsCertificate>(certificates[0]);

  // Verification state
  const [lookupHash, setLookupHash] = useState('');
  const [lookupResult, setLookupResult] = useState<PrdamsCertificate | null>(null);
  const [lookupFailed, setLookupFailed] = useState(false);

  // Digital Signature Pad state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0878C9';
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = portalStorage.saveCertificate({
      recipientName,
      recipientEmail,
      projectName,
      role,
      issueDate,
      tenure,
      signature: signatory
    });

    setCertificates(prev => [created, ...prev]);
    setPreviewCert(created);
    alert(`🎉 Official PRDAMS Certificate Issued!\nVerification Hash: ${created.hash}`);
  };

  const handleVerifyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupHash) return;
    const found = certificates.find(c => 
      c.hash.toLowerCase().includes(lookupHash.toLowerCase()) ||
      c.id.toLowerCase().includes(lookupHash.toLowerCase()) ||
      c.recipientName.toLowerCase().includes(lookupHash.toLowerCase())
    );

    if (found) {
      setLookupResult(found);
      setLookupFailed(false);
    } else {
      setLookupResult(null);
      setLookupFailed(true);
    }
  };

  const handleDownloadCertificate = () => {
    const doc = `========================================================================
                      NEXORA TECHNOLOGIES
      PROJECT ROLE & DIGITAL ACKNOWLEDGEMENT SYSTEM (PRDAMS)
========================================================================
CERTIFICATE ID: ${previewCert.id}
SECURITY HASH:  ${previewCert.hash}
ISSUED ON:      ${previewCert.issueDate}

THIS IS TO OFFICIALLY CERTIFY THAT

                    ${previewCert.recipientName.toUpperCase()}
(${previewCert.recipientEmail})

Has successfully undertaken and performed the role of:
                    ${previewCert.role.toUpperCase()}

Under the flagship engineering project:
"${previewCert.projectName}"

Tenure / Duration: ${previewCert.tenure}
Authorized Signature: ${previewCert.signature} (Director of Engineering)

VERIFICATION STATUS:
[X] Cryptographically Certified & Signed by Nexora Technologies
QR Authentication Link: https://acknowledgement-generator-roan.vercel.app/verify/${previewCert.hash}
========================================================================`;

    const blob = new Blob([doc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate_${previewCert.id}_${previewCert.recipientName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PortalWrapper
      title="PRDAMS Portal"
      subtitle="Project Role & Digital Acknowledgement Management, Verification & Security"
      icon={<ShieldCheck className="w-5 h-5" />}
      cloudUrl="https://acknowledgement-generator-roan.vercel.app/auth"
      onBack={onBack}
      badge="PRDAMS Verified"
      badgeColor="text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    >
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">

        {/* Navigation Tabs Pill Bar */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'generator', label: 'Certificate Generator', icon: <Award className="w-4 h-4" /> },
            { id: 'verification', label: 'Verification Scanner', icon: <FileCheck className="w-4 h-4" /> },
            { id: 'roles', label: 'Role Acceptance & Signature', icon: <PenTool className="w-4 h-4" /> },
            { id: 'registry', label: 'Issued Registry', icon: <CheckCircle className="w-4 h-4" /> }
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

        {/* TAB 1: CERTIFICATE GENERATOR & PREVIEW */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Form */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-black text-brand-navy dark:text-white">Issue Role Acknowledgement</h3>
                <p className="text-xs text-slate-500">Configure parameters to generate an official digital credential</p>
              </div>

              <form onSubmit={handleGenerateCertificate} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Recipient Email</label>
                    <input
                      type="email"
                      required
                      value={recipientEmail}
                      onChange={e => setRecipientEmail(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500">Designated Role Title</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  >
                    <option value="Lead AI Engineer">Lead AI Engineer</option>
                    <option value="Senior Full-Stack Architect">Senior Full-Stack Architect</option>
                    <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                    <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                    <option value="AI Research Intern">AI Research Intern</option>
                    <option value="Full-Stack Engineering Intern">Full-Stack Engineering Intern</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500">Project Name</label>
                  <input
                    type="text"
                    required
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Issue Date</label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={e => setIssueDate(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Tenure</label>
                    <input
                      type="text"
                      value={tenure}
                      onChange={e => setTenure(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Signatory</label>
                    <input
                      type="text"
                      value={signatory}
                      onChange={e => setSignatory(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-brand-blue text-white font-black text-xs uppercase tracking-wider shadow-md shadow-brand-blue/30 cursor-pointer active:scale-98 transition-all"
                >
                  Generate & Register Certificate
                </button>
              </form>
            </div>

            {/* LIVE CERTIFICATE PREVIEW CANVAS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Live Certificate Preview</span>
                <button
                  onClick={handleDownloadCertificate}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 cursor-pointer active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Certificate</span>
                </button>
              </div>

              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-[#06152F] dark:to-[#030914] border-4 border-double border-brand-gold/40 shadow-xl text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase text-brand-gold">NEXORA TECHNOLOGIES</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-black text-brand-navy dark:text-white uppercase tracking-tight">
                    Certificate of Role Acknowledgement
                  </h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">PRDAMS Cryptographic Verification Standard</p>
                </div>

                <p className="text-xs text-slate-500">This certifies that</p>
                <h3 className="text-xl sm:text-2xl font-black text-brand-blue dark:text-brand-cyan tracking-tight">
                  {previewCert.recipientName}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Has successfully fulfilled the designated role of <strong className="text-brand-navy dark:text-white">{previewCert.role}</strong> on project <strong className="text-brand-navy dark:text-white">"{previewCert.projectName}"</strong> with verified distinction.
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-black/10 dark:border-white/10 text-left">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Signed By</span>
                    <span className="text-xs font-bold text-brand-navy dark:text-white">{previewCert.signature}</span>
                    <span className="text-[9px] text-slate-400 block">Director of Engineering</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <QrCode className="w-10 h-10 text-brand-navy dark:text-white p-1 bg-white rounded-lg shadow-sm" />
                    <div className="text-right">
                      <span className="text-[8px] font-bold text-emerald-500 uppercase block">VERIFIED</span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 block">{previewCert.hash}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VERIFICATION SCANNER */}
        {activeTab === 'verification' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm max-w-xl mx-auto space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">PRDAMS Certificate Verifier</h3>
              <p className="text-xs text-slate-500">Instant cryptographic check against Nexora's verified credential registry</p>
            </div>

            <form onSubmit={handleVerifyLookup} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Certificate Hash (e.g. NX-8F92A1-VERIFIED)"
                value={lookupHash}
                onChange={e => setLookupHash(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 cursor-pointer"
              >
                Lookup
              </button>
            </form>

            {lookupResult && (
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-wider">OFFICIAL PRDAMS VERIFIED CREDENTIAL</span>
                </div>
                <div className="text-xs space-y-1">
                  <p>Certificate ID: <strong className="text-brand-navy dark:text-white">{lookupResult.id}</strong></p>
                  <p>Recipient: <strong className="text-brand-navy dark:text-white">{lookupResult.recipientName}</strong></p>
                  <p>Project: <strong className="text-brand-navy dark:text-white">{lookupResult.projectName}</strong></p>
                  <p>Role: <strong className="text-brand-navy dark:text-white">{lookupResult.role}</strong></p>
                  <p>Issue Date: <strong className="text-brand-navy dark:text-white">{lookupResult.issueDate}</strong></p>
                  <p>Tenure: <strong className="text-brand-navy dark:text-white">{lookupResult.tenure}</strong></p>
                </div>
              </div>
            )}

            {lookupFailed && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold">
                No matching verified PRDAMS record found. Please verify the hash code.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ROLE ACCEPTANCE & DIGITAL SIGNATURE */}
        {activeTab === 'roles' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm max-w-xl mx-auto space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">Role Acceptance Agreement</h3>
              <p className="text-xs text-slate-500">Sign electronically to confirm assignment to the active project squad</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs space-y-2">
              <span className="font-bold text-brand-navy dark:text-white block">Role Agreement Terms:</span>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                I hereby accept the project role responsibilities under Nexora Technologies, adhering to code quality standards, data privacy protocols, and daily progress reporting (DPR) guidelines.
              </p>
            </div>

            {/* Signature Canvas */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">Draw Digital Signature</span>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              <div className="border border-dashed border-brand-blue/30 rounded-2xl bg-white dark:bg-[#030914] overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={140}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-36 cursor-crosshair touch-none"
                />
              </div>
            </div>

            <button
              onClick={() => {
                if (!hasSignature) {
                  alert('Please sign on the canvas before accepting.');
                  return;
                }
                alert('🎉 Role Acceptance Signed & Submitted to PRDAMS Registry!');
              }}
              className="w-full py-3.5 rounded-2xl bg-brand-blue text-white font-black text-xs uppercase tracking-wider shadow-md shadow-brand-blue/30 cursor-pointer active:scale-98 transition-all"
            >
              Confirm & Electronically Sign Role
            </button>
          </div>
        )}

        {/* TAB 4: ISSUED REGISTRY */}
        {activeTab === 'registry' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-black text-brand-navy dark:text-white">PRDAMS Registry</h3>
              <p className="text-xs text-slate-500">All authenticated certificates registered in local & cloud ledger</p>
            </div>

            <div className="grid gap-3">
              {certificates.map(c => (
                <div 
                  key={c.id} 
                  className="p-4 rounded-2xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-blue/30 transition-all cursor-pointer"
                  onClick={() => {
                    setPreviewCert(c);
                    setActiveTab('generator');
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-blue dark:text-brand-cyan">{c.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500">
                        {c.hash}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-brand-navy dark:text-white">{c.recipientName} — {c.role}</h4>
                    <p className="text-xs text-slate-500">{c.projectName} • {c.tenure}</p>
                  </div>

                  <span className="text-xs font-bold text-brand-blue hover:underline">
                    View Certificate →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </PortalWrapper>
  );
};
