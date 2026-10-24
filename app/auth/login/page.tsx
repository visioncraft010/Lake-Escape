"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, Lock, ArrowRight, KeyRound, X, CheckCircle2, AlertCircle, Calendar } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams?.get("redirect");
  // Security: only allow internal redirects starting with /
  const redirectParam = rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : null;

  // Login form state
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgetTarget, setForgetTarget] = useState("");
  const [targetType, setTargetType] = useState<"phone" | "email">("phone");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [devOtpNotice, setDevOtpNotice] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Login failed. Please check your credentials.");
        setIsLoading(false);
        return;
      }

      // Check role & redirect back to where guest left off
      if (data.user?.role === "ADMIN" || data.user?.role === "STAFF") {
        router.push("/admin");
      } else if (redirectParam) {
        router.push(redirectParam);
      } else {
        router.push("/profile");
      }
      router.refresh();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  // ── Forgot Password Handlers ──
  const handleSendResetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotMessage("");
    setForgotLoading(true);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target: forgetTarget || (targetType === "phone" ? phone : ""),
          type: targetType,
          purpose: "RESET_PASSWORD",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setForgotError(data.error || "Failed to send reset code.");
        setForgotLoading(false);
        return;
      }

      setOtpSent(true);
      setForgotMessage(data.message || "Verification code sent.");
      if (data.devCode) {
        setDevOtpNotice(`[Dev Mode] Verification Code: ${data.devCode}`);
      }
    } catch {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");

    if (newPassword !== confirmPassword) {
      setForgotError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setForgotError("Password must be at least 6 characters.");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target: forgetTarget,
          code: otpCode,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setForgotError(data.error || "Password reset failed.");
        setForgotLoading(false);
        return;
      }

      setForgotMessage("Password reset successfully! You can now log in.");
      setTimeout(() => {
        setShowForgotModal(false);
        setOtpSent(false);
        setOtpCode("");
        setNewPassword("");
        setConfirmPassword("");
        setForgotMessage("");
      }, 1500);
    } catch {
      setForgotError("Network error. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const registerHref = redirectParam
    ? `/auth/register?redirect=${encodeURIComponent(redirectParam)}`
    : "/auth/register";

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] flex items-center justify-center px-4 py-24 sm:py-28">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#2C1A10]/10 shadow-xl space-y-7">
        
        {/* Header with Logo */}
        <div className="text-center space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo-light-bg.png"
            alt="Lake Escape"
            className="w-[100px] h-auto mx-auto mb-3 object-contain"
          />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6747]">
            Sanctuary Portal
          </p>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A0F0A]">
            Guest & Staff Login
          </h1>
          <p className="text-xs text-[#5A3D2C]/70">
            Sign in with your registered mobile number and password.
          </p>
        </div>

        {/* Redirect Notice if coming from Booking or Charter */}
        {redirectParam && (
          <div className="p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#8C6747]/20 flex items-start gap-2.5 text-left">
            <Calendar size={16} className="text-[#8C6747] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5A3D2C]">
              <span className="font-semibold text-[#1A0F0A]">Reservation in Progress:</span> Sign in to reserve your suite or vessel. You will return immediately to your selected dates.
            </div>
          </div>
        )}

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Mobile Number */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
              Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#5A3D2C]/60 text-xs font-semibold">
                +91
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="9876543210"
                maxLength={10}
                className="w-full pl-12 pr-4 py-3 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none transition focus:border-[#1A0F0A] focus:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgetTarget(phone);
                  setShowForgotModal(true);
                }}
                className="text-[11px] font-medium text-[#8C6747] hover:text-[#1A0F0A] transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#5A3D2C]/60">
                <Lock size={13} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none transition focus:border-[#1A0F0A] focus:bg-white"
              />
            </div>
          </div>

          {/* Submit Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-brown w-full py-3.5 text-xs font-bold uppercase tracking-wider shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span>{isLoading ? "Authenticating..." : "Sign In to Portal"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Divider & Registration Prompt */}
        <div className="pt-2 border-t border-[#2C1A10]/10 text-center space-y-3">
          <p className="text-xs text-[#5A3D2C]/75">
            Visiting for the first time?
          </p>
          <Link
            href={registerHref}
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full border border-[#2C1A10]/20 hover:border-[#1A0F0A] bg-white text-[#1A0F0A] text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Create New Guest Account</span>
          </Link>
        </div>

      </div>

      {/* ── FORGOT PASSWORD MODAL ── */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#2C1A10]/10 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#2C1A10]/10">
              <div className="flex items-center gap-2">
                <KeyRound size={16} className="text-[#8C6747]" />
                <h3 className="font-semibold text-sm text-[#1A0F0A]">Password Reset</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F5EFEB] text-[#1A0F0A]/60 hover:text-[#1A0F0A]"
              >
                <X size={15} />
              </button>
            </div>

            {forgotError && (
              <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
                {forgotError}
              </div>
            )}
            {forgotMessage && (
              <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{forgotMessage}</span>
              </div>
            )}
            {devOtpNotice && (
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 font-mono text-[11px]">
                {devOtpNotice}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendResetOtp} className="space-y-4">
                <p className="text-xs text-[#5A3D2C]/80">
                  Select how you want to receive your 6-digit password reset code:
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetType("phone")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                      targetType === "phone"
                        ? "bg-[#1A0F0A] text-white border-[#1A0F0A]"
                        : "bg-[#FBF9F5] text-[#5A3D2C] border-[#2C1A10]/15"
                    }`}
                  >
                    Mobile SMS
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetType("email")}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                      targetType === "email"
                        ? "bg-[#1A0F0A] text-white border-[#1A0F0A]"
                        : "bg-[#FBF9F5] text-[#5A3D2C] border-[#2C1A10]/15"
                    }`}
                  >
                    Email Address
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#8C6747]">
                    {targetType === "phone" ? "Mobile Number" : "Email Address"}
                  </label>
                  <input
                    type={targetType === "phone" ? "tel" : "email"}
                    required
                    value={forgetTarget}
                    onChange={(e) => setForgetTarget(e.target.value)}
                    placeholder={targetType === "phone" ? "9876543210" : "guest@example.com"}
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="btn-brown w-full py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  {forgotLoading ? "Sending Code..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#8C6747]">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="123456"
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-center text-sm font-bold tracking-widest outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#8C6747]">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-[#8C6747]">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type password"
                    className="w-full px-3.5 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="btn-brown w-full py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  {forgotLoading ? "Updating Password..." : "Set New Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center text-xs font-semibold text-[#8C6747]">
        Loading Portal Gateway...
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
