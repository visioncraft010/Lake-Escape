"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  User, Phone, Mail, Lock, ShieldCheck, CheckCircle2, 
  ArrowRight, AlertCircle, X, Sparkles, Calendar,
  Utensils, Camera, HeartPulse, ChevronDown, ChevronUp, FileText, Gift
} from "lucide-react";

const AVATAR_PRESETS = [
  { label: "Catamaran", icon: "⛵" },
  { label: "Mountains", icon: "🏔️" },
  { label: "Sunrise", icon: "🌅" },
  { label: "Pine", icon: "🌲" },
  { label: "Lotus", icon: "🪷" },
  { label: "Tea", icon: "☕" },
];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams?.get("redirect");
  const redirectParam = rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : null;

  // Primary Credentials
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Optional Profile & Personalization States
  const [showOptionalPreferences, setShowOptionalPreferences] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [dietaryPreference, setDietaryPreference] = useState("Vegetarian");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [celebrationDate, setCelebrationDate] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [idTypeNumber, setIdTypeNumber] = useState("");
  const [specialPreferences, setSpecialPreferences] = useState("");

  // Verification States
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // OTP Verification Modal State
  const [activeOtpModal, setActiveOtpModal] = useState<"phone" | "email" | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [devOtpNotice, setDevOtpNotice] = useState("");

  // Global Submit State
  const [registerLoading, setRegisterLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // Handle local avatar photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setGlobalError("Please choose an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ── Send OTP Handler ──
  const handleTriggerOtp = async (type: "phone" | "email") => {
    setGlobalError("");
    setOtpError("");
    setOtpSuccessMessage("");
    setDevOtpNotice("");

    const target = type === "phone" ? phone : email;
    if (!target) {
      setGlobalError(`Please enter your ${type === "phone" ? "mobile number" : "email address"} first.`);
      return;
    }

    if (type === "phone" && target.length < 10) {
      setGlobalError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setOtpLoading(true);

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          type,
          purpose: "SIGNUP",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setGlobalError(data.error || "Failed to dispatch verification code.");
        setOtpLoading(false);
        return;
      }

      setActiveOtpModal(type);
      setOtpSuccessMessage(data.message || "Verification code dispatched.");
      if (data.devCode) {
        setDevOtpNotice(`[Dev Mode] Verification Code: ${data.devCode}`);
      }
    } catch {
      setGlobalError("Network error. Please check your internet connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Verify OTP Handler ──
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOtpModal) return;

    setOtpError("");
    setOtpLoading(true);

    const target = activeOtpModal === "phone" ? phone : email;

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          type: activeOtpModal,
          code: otpCode,
          purpose: "SIGNUP",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setOtpError(data.error || "Invalid verification code.");
        setOtpLoading(false);
        return;
      }

      if (activeOtpModal === "phone") {
        setPhoneVerified(true);
      } else {
        setEmailVerified(true);
      }

      // Close modal on verification success
      setTimeout(() => {
        setActiveOtpModal(null);
        setOtpCode("");
        setOtpSuccessMessage("");
        setDevOtpNotice("");
      }, 600);
    } catch {
      setOtpError("Network error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Complete Registration Handler ──
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");

    if (!phoneVerified || !emailVerified) {
      setGlobalError("Please verify both your mobile number and email before registering.");
      return;
    }

    if (password !== confirmPassword) {
      setGlobalError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setGlobalError("Password must be at least 6 characters.");
      return;
    }

    setRegisterLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
          avatarUrl: avatarUrl || null,
          dietaryPreference: dietaryPreference || "Vegetarian",
          dietaryNotes: dietaryNotes || null,
          celebrationDate: celebrationDate || null,
          emergencyContact: emergencyContact || null,
          idTypeNumber: idTypeNumber || null,
          specialPreferences: specialPreferences || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setGlobalError(data.error || "Registration failed.");
        setRegisterLoading(false);
        return;
      }

      // Successful registration: automatically redirect back to where guest left off
      const targetUrl = redirectParam || "/profile";
      router.push(targetUrl);
      router.refresh();
    } catch {
      setGlobalError("Network error. Please try again.");
      setRegisterLoading(false);
    }
  };

  const loginHref = redirectParam
    ? `/auth/login?redirect=${encodeURIComponent(redirectParam)}`
    : "/auth/login";

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] flex items-center justify-center px-4 py-24 sm:py-28">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-xl space-y-7">
        
        {/* Header */}
        <div className="text-center space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo-light-bg.png"
            alt="Lake Escape"
            className="w-[100px] h-auto mx-auto mb-3 object-contain"
          />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747] border border-[#2C1A10]/10">
            <Sparkles size={11} />
            <span>Join Lake Escape</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A0F0A]">
            Guest Registration
          </h1>
          <p className="text-xs text-[#5A3D2C]/75 leading-relaxed max-w-sm mx-auto">
            Create your account to unlock seamless direct reservations and stay management.
          </p>
        </div>

        {/* Redirect Notice if coming from Booking or Charter */}
        {redirectParam && (
          <div className="p-3.5 rounded-2xl bg-[#F5EFEB] border border-[#8C6747]/20 flex items-start gap-2.5 text-left">
            <Calendar size={16} className="text-[#8C6747] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5A3D2C]">
              <span className="font-semibold text-[#1A0F0A]">Reservation in Progress:</span> Complete your registration to confirm your stateroom or boat experience. You will return immediately to your selected dates.
            </div>
          </div>
        )}

        {/* Global Error Banner */}
        {globalError && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
            <AlertCircle size={15} className="shrink-0 text-red-600" />
            <span>{globalError}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
              Full Name *
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#5A3D2C]/60">
                <User size={13} />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full pl-10 pr-4 py-3 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none transition focus:border-[#1A0F0A] focus:bg-white"
              />
            </div>
          </div>

          {/* 2. Mobile Number + Inline Verification Button */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                Mobile Number *
              </label>
              {phoneVerified ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
              ) : (
                <span className="text-[10px] text-[#5A3D2C]/60">Verification Required</span>
              )}
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1 flex items-center">
                <span className="absolute left-3.5 text-[#5A3D2C]/60 text-xs font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  disabled={phoneVerified}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="9876543210"
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-3 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none transition focus:border-[#1A0F0A] focus:bg-white disabled:bg-emerald-50/50 disabled:border-emerald-300"
                />
              </div>

              {!phoneVerified ? (
                <button
                  type="button"
                  onClick={() => handleTriggerOtp("phone")}
                  disabled={otpLoading || phone.length < 10}
                  className="px-4 py-2.5 rounded-xl bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer disabled:opacity-40 shrink-0"
                >
                  Verify
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhoneVerified(false)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#5A3D2C] text-[11px] font-semibold transition"
                >
                  Change
                </button>
              )}
            </div>
          </div>

          {/* 3. Email Address + Inline Verification Button */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                Email Address *
              </label>
              {emailVerified ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </span>
              ) : (
                <span className="text-[10px] text-[#5A3D2C]/60">Verification Required</span>
              )}
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1 flex items-center">
                <span className="absolute left-3.5 text-[#5A3D2C]/60">
                  <Mail size={13} />
                </span>
                <input
                  type="email"
                  required
                  disabled={emailVerified}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none transition focus:border-[#1A0F0A] focus:bg-white disabled:bg-emerald-50/50 disabled:border-emerald-300"
                />
              </div>

              {!emailVerified ? (
                <button
                  type="button"
                  onClick={() => handleTriggerOtp("email")}
                  disabled={otpLoading || !email.includes("@")}
                  className="px-4 py-2.5 rounded-xl bg-[#1A0F0A] hover:bg-[#2C1A10] text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer disabled:opacity-40 shrink-0"
                >
                  Verify
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEmailVerified(false)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#5A3D2C] text-[11px] font-semibold transition"
                >
                  Change
                </button>
              )}
            </div>
          </div>

          {/* 4. Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                New Password *
              </label>
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
                  className="w-full pl-10 pr-3 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A] focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                Confirm Password *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#5A3D2C]/60">
                  <Lock size={13} />
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* ── 5. OPTIONAL GUEST PERSONALIZATION & STAY PREFERENCES ── */}
          <div className="border border-[#2C1A10]/10 rounded-2xl p-4 bg-[#FBF9F5] space-y-4 transition-all">
            <button
              type="button"
              onClick={() => setShowOptionalPreferences(!showOptionalPreferences)}
              className="flex items-center justify-between w-full text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#8C6747]" />
                <span className="text-xs font-bold text-[#1A0F0A]">
                  Personalize Guest Stay & Dining Preferences
                </span>
                <span className="text-[10px] font-semibold text-[#8C6747] bg-[#8C6747]/15 px-2 py-0.5 rounded-full">
                  Optional
                </span>
              </div>
              {showOptionalPreferences ? (
                <ChevronUp size={15} className="text-[#8C6747]" />
              ) : (
                <ChevronDown size={15} className="text-[#8C6747]" />
              )}
            </button>

            {showOptionalPreferences && (
              <div className="space-y-4 pt-2 border-t border-[#2C1A10]/8 animate-in fade-in duration-200">
                
                {/* Profile Picture / Avatar */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                    <Camera size={12} />
                    <span>Profile Picture or Avatar</span>
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#2C1A10]/15 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                      {avatarUrl ? (
                        avatarUrl.startsWith("data:") || avatarUrl.startsWith("http") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl">{avatarUrl}</span>
                        )
                      ) : (
                        <span className="text-lg text-[#5A3D2C]/40">👤</span>
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#2C1A10]/15 hover:border-[#1A0F0A] text-[11px] font-semibold text-[#1A0F0A] cursor-pointer transition">
                        <span>Upload Custom Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-[#5A3D2C]/60">Or choose:</span>
                        {AVATAR_PRESETS.map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setAvatarUrl(preset.icon)}
                            className="w-7 h-7 rounded-full bg-white hover:bg-[#F5EFEB] border border-[#2C1A10]/10 flex items-center justify-center text-xs transition cursor-pointer"
                            title={preset.label}
                          >
                            {preset.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dietary Preference & Allergies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                      <Utensils size={12} />
                      <span>Dietary Preference</span>
                    </label>
                    <select
                      value={dietaryPreference}
                      onChange={(e) => setDietaryPreference(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none"
                    >
                      <option value="Vegetarian">Pure Vegetarian</option>
                      <option value="Jain">Jain (No Root Veg / Onion / Garlic)</option>
                      <option value="Vegan">Vegan (Plant-Based)</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Halal">Halal</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                      <option value="Other">No Specific Restriction</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                      Food Allergies / Dislikes
                    </label>
                    <input
                      type="text"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder="e.g. Peanuts, lactose, shellfish..."
                      className="w-full px-3 py-2 bg-white border border-[#2C1A10]/15 rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Celebration Date & Emergency Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                      <Gift size={12} />
                      <span>Special Celebration Date</span>
                    </label>
                    <input
                      type="text"
                      value={celebrationDate}
                      onChange={(e) => setCelebrationDate(e.target.value)}
                      placeholder="e.g. Anniversary 15 Oct / Birthday 4 Nov"
                      className="w-full px-3 py-2 bg-white border border-[#2C1A10]/15 rounded-xl text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                      <HeartPulse size={12} />
                      <span>Emergency Contact</span>
                    </label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="e.g. Priya Sharma (+91 99999 88888)"
                      className="w-full px-3 py-2 bg-white border border-[#2C1A10]/15 rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>

                {/* Government ID / Passport Number & Stay Requests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                      <FileText size={12} />
                      <span>Govt ID / Passport (For Express Boarding)</span>
                    </label>
                    <input
                      type="text"
                      value={idTypeNumber}
                      onChange={(e) => setIdTypeNumber(e.target.value)}
                      placeholder="Aadhaar / Passport / Voter ID"
                      className="w-full px-3 py-2 bg-white border border-[#2C1A10]/15 rounded-xl text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                      Room & Comfort Preferences
                    </label>
                    <input
                      type="text"
                      value={specialPreferences}
                      onChange={(e) => setSpecialPreferences(e.target.value)}
                      placeholder="e.g. Quiet room, extra pillow, ginger tea"
                      className="w-full px-3 py-2 bg-white border border-[#2C1A10]/15 rounded-xl text-xs outline-none"
                    />
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Verification requirement warning */}
          {(!phoneVerified || !emailVerified) && (
            <p className="text-[11px] text-[#8C6747] text-center pt-1 font-medium">
              * Please verify both Mobile and Email with the 6-digit codes to enable registration.
            </p>
          )}

          {/* Complete Register Button */}
          <button
            type="submit"
            disabled={!phoneVerified || !emailVerified || registerLoading}
            className="btn-brown w-full py-3.5 text-xs font-bold uppercase tracking-wider shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <span>{registerLoading ? "Registering Sanctuary Account..." : "Register & Book Stays"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Existing user prompt */}
        <div className="pt-2 border-t border-[#2C1A10]/10 text-center">
          <p className="text-xs text-[#5A3D2C]/75">
            Already registered?{" "}
            <Link href={loginHref} className="font-bold text-[#1A0F0A] hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>

      {/* ── POPUP OTP VERIFICATION MODAL ── */}
      {activeOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-2xl relative space-y-4">
            
            <button
              onClick={() => {
                setActiveOtpModal(null);
                setOtpCode("");
                setOtpError("");
              }}
              className="absolute top-5 right-5 text-[#5A3D2C]/50 hover:text-[#1A0F0A] transition"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                <ShieldCheck size={13} />
                <span>Verification Code</span>
              </span>
              <h3 className="text-lg font-medium text-[#1A0F0A]">
                Verify your {activeOtpModal === "phone" ? "Mobile Number" : "Email Address"}
              </h3>
              <p className="text-xs text-[#5A3D2C]/70">
                We sent a 6-digit verification code to{" "}
                <strong className="text-[#1A0F0A]">
                  {activeOtpModal === "phone" ? `+91 ${phone}` : email}
                </strong>
              </p>
            </div>

            {otpError && (
              <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {otpError}
              </p>
            )}

            {otpSuccessMessage && (
              <p className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                {otpSuccessMessage}
              </p>
            )}

            {devOtpNotice && (
              <p className="text-xs font-mono text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                {devOtpNotice}
              </p>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] mb-1.5">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="123456"
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-center text-lg font-bold tracking-[0.25em] outline-none focus:border-[#1A0F0A] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[#5A3D2C]/70">
                <span>Didn&apos;t receive it?</span>
                <button
                  type="button"
                  onClick={() => handleTriggerOtp(activeOtpModal)}
                  disabled={otpLoading}
                  className="font-bold text-[#8C6747] hover:underline cursor-pointer"
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                disabled={otpLoading || otpCode.length !== 6}
                className="btn-brown w-full py-3 text-xs font-bold uppercase tracking-wider shadow-md disabled:opacity-50"
              >
                {otpLoading ? "Verifying..." : "Confirm & Verify"}
              </button>
            </form>

          </div>
        </div>
      )}

    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center text-xs font-semibold text-[#8C6747]">
        Loading Registration Portal...
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
