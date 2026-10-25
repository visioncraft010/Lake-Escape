"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ShieldCheck, Lock, Mail, Phone, Eye, EyeOff, 
  ArrowRight, KeyRound, CheckCircle2, AlertCircle, ArrowLeft, RefreshCw 
} from "lucide-react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const unauthorizedNotice = searchParams.get("unauthorized") === "true";

  // Login Form States
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(unauthorizedNotice ? "Direct access restricted. Please log in with administrator or management credentials." : "");

  // Reset Modal States
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetStep, setResetStep] = useState<"REQUEST" | "CONFIRM">("REQUEST");
  const [resetId, setResetId] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [devOtpNotice, setDevOtpNotice] = useState("");

  // ── Handle Admin Login ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      // Success: Route to the Admin Dashboard
      router.replace("/admin");
    } catch (err: unknown) {
      console.error("Admin login error:", err);
      setErrorMsg("Connection error. Please verify server availability.");
      setLoading(false);
    }
  };

  // ── Handle Request Reset OTP ──
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    setDevOtpNotice("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/admin/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request",
          identifier: resetId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResetError(data.error || "Failed to dispatch reset code.");
        setResetLoading(false);
        return;
      }

      setResetSuccess(data.message || "Verification code dispatched.");
      if (data.devCode) {
        setDevOtpNotice(`[Security Simulation] Verification Code: ${data.devCode}`);
      }
      setResetStep("CONFIRM");
    } catch (err: unknown) {
      console.error("Reset request error:", err);
      setResetError("Network communication error.");
    } finally {
      setResetLoading(false);
    }
  };

  // ── Handle Confirm OTP & Save New Password ──
  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);

    try {
      const res = await fetch("/api/admin/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "confirm",
          identifier: resetId,
          code: resetOtp,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResetError(data.error || "Invalid code or reset failed.");
        setResetLoading(false);
        return;
      }

      setResetSuccess(data.message || "Password successfully changed!");
      setTimeout(() => {
        setIdentifier(resetId);
        setPassword("");
        setShowResetModal(false);
        setResetStep("REQUEST");
        setErrorMsg("");
      }, 2000);
    } catch (err: unknown) {
      console.error("Reset confirm error:", err);
      setResetError("Failed to update password.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0805] text-[#FBF9F5] flex flex-col justify-between relative overflow-hidden selection:bg-[#8C6747] selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(140,103,71,0.25),rgba(255,255,255,0))]" />
      
      {/* Top Header */}
      <header className="relative z-10 container-sym pt-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft size={16} className="text-[#8C6747] group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-semibold tracking-wider text-white/70 group-hover:text-white transition-colors uppercase">
            Return to Sanctuary
          </span>
        </Link>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#8C6747]/40 bg-[#8C6747]/10 text-[#D6C4AD]">
          <ShieldCheck size={13} className="text-[#8C6747]" />
          <span>Internal Control Center</span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-12">
        <div className="bg-[#1A0F0A] border border-[#2C1A10] rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
          
          {/* Header & Crest */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#8C6747] to-[#4A3022] border border-[#D6C4AD]/30 flex items-center justify-center shadow-lg">
              <Lock size={24} className="text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] block mb-1">
              Lake Escape Floating Resort
            </span>
            <h1 className="text-2xl font-serif font-normal text-white">
              Administrator Portal
            </h1>
            <p className="text-xs text-white/60 mt-1.5 font-light">
              Management & Operations Authentication
            </p>
          </div>

          {/* Alert Message */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/50 flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6C4AD] mb-2">
                Administrator / Management ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="info@lakeescape.in or +91 97629..."
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-[#26150D] border border-[#3E2316] rounded-xl px-4 py-3 pl-11 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#8C6747] transition-all"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-white/40 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#D6C4AD]">
                  Permanent Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setResetId(identifier);
                    setShowResetModal(true);
                    setResetStep("REQUEST");
                    setResetError("");
                    setResetSuccess("");
                  }}
                  className="text-[11px] text-[#8C6747] hover:text-[#D6C4AD] transition-colors underline cursor-pointer"
                >
                  Reset with OTP
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#26150D] border border-[#3E2316] rounded-xl px-4 py-3 pl-11 pr-11 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#8C6747] transition-all"
                />
                <KeyRound size={16} className="absolute left-3.5 top-3.5 text-white/40 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#8C6747] to-[#6E4B2E] hover:from-[#9D7653] hover:to-[#7E5738] text-white py-3.5 px-6 text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Access Operations Portal</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footnote / Default Credentials Notice */}
          <div className="mt-8 pt-6 border-t border-[#2C1A10] text-center">
            <p className="text-[11px] text-white/50 leading-relaxed font-light">
              Default Master ID: <strong className="text-white/80 font-mono">info@lakeescape.in</strong><br />
              Default Password: <strong className="text-white/80 font-mono">LakeEscape@2026</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-white/30 text-[10px] uppercase tracking-widest font-mono">
        Lake Escape Luxury Houseboats · Tehri Lake Sanctuary · Security Subsystem
      </footer>

      {/* ── RESET PASSWORD WITH OTP MODAL ── */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1A0F0A] border border-[#3E2316] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#8C6747] block mb-1">
                  Security Recovery
                </span>
                <h3 className="text-xl font-serif text-white">
                  Reset Permanent Admin Password
                </h3>
              </div>
              <button
                onClick={() => setShowResetModal(false)}
                className="text-white/40 hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-white/70 mb-6 leading-relaxed font-light">
              Verification codes can strictly be dispatched to the official registered Administrator or Management contact.
            </p>

            {resetError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/40 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                <span>{resetSuccess}</span>
              </div>
            )}

            {devOtpNotice && (
              <div className="mb-4 p-2.5 rounded-lg bg-amber-950/50 border border-amber-800/50 text-[11px] font-mono text-amber-200 text-center">
                {devOtpNotice}
              </div>
            )}

            {resetStep === "REQUEST" ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6C4AD] mb-2">
                    Registered Admin Email or Mobile
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="info@lakeescape.in or +91 97629..."
                    value={resetId}
                    onChange={(e) => setResetId(e.target.value)}
                    className="w-full bg-[#26150D] border border-[#3E2316] rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#8C6747]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 rounded-xl border border-[#3E2316] py-3 text-xs text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 rounded-xl bg-[#8C6747] hover:bg-[#9D7653] text-white py-3 text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {resetLoading ? "Sending OTP..." : "Send Verification OTP"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleConfirmReset} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6C4AD] mb-1.5">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value)}
                    className="w-full bg-[#26150D] border border-[#3E2316] rounded-xl px-4 py-3 text-center tracking-[0.25em] font-mono text-base text-white focus:outline-none focus:border-[#8C6747]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#D6C4AD] mb-1.5">
                    Set New Permanent Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      placeholder="At least 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#26150D] border border-[#3E2316] rounded-xl px-4 py-3 pr-11 text-xs text-white focus:outline-none focus:border-[#8C6747]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3 text-white/40 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setResetStep("REQUEST")}
                    className="flex-1 rounded-xl border border-[#3E2316] py-3 text-xs text-white/70 hover:text-white transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 rounded-xl bg-[#8C6747] hover:bg-[#9D7653] text-white py-3 text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {resetLoading ? "Updating..." : "Save New Password"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0805] flex items-center justify-center text-[#D6C4AD] text-xs font-mono uppercase tracking-widest">
          Authenticating Security Subsystem...
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
