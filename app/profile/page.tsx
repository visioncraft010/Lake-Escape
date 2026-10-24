"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, Users, ShieldCheck, MapPin, Phone, Mail, 
  ArrowRight, LogOut, Ship, Compass, Sparkles, MessageSquare, 
  CheckCircle2, Clock, AlertCircle, Utensils, Camera, HeartPulse,
  FileText, Gift, Edit3, User
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface BookingItem {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED" | "COMPLETED";
  specialRequests?: string;
  room: {
    name: string;
    slug: string;
    price: number;
    description: string;
  };
}

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
  dietaryPreference?: string | null;
  dietaryNotes?: string | null;
  celebrationDate?: string | null;
  emergencyContact?: string | null;
  idTypeNumber?: string | null;
  specialPreferences?: string | null;
}

const AVATAR_PRESETS = [
  { label: "Catamaran", icon: "⛵" },
  { label: "Mountains", icon: "🏔️" },
  { label: "Sunrise", icon: "🌅" },
  { label: "Pine", icon: "🌲" },
  { label: "Lotus", icon: "🪷" },
  { label: "Tea", icon: "☕" },
];

export default function GuestPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings");

  // Profile Edit States
  const [editName, setEditName] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [editDietary, setEditDietary] = useState("Vegetarian");
  const [editDietaryNotes, setEditDietaryNotes] = useState("");
  const [editCelebrationDate, setEditCelebrationDate] = useState("");
  const [editEmergencyContact, setEditEmergencyContact] = useState("");
  const [editIdTypeNumber, setEditIdTypeNumber] = useState("");
  const [editSpecialPreferences, setEditSpecialPreferences] = useState("");

  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");
  const [saveErrorMessage, setSaveErrorMessage] = useState("");

  useEffect(() => {
    async function loadPortalData() {
      try {
        // 1. Verify User Session & Load Profile
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        if (!authData.authenticated || !authData.user) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const u = authData.user;
        setUser(u);
        setEditName(u.name || "");
        setEditAvatar(u.avatarUrl || "");
        setEditDietary(u.dietaryPreference || "Vegetarian");
        setEditDietaryNotes(u.dietaryNotes || "");
        setEditCelebrationDate(u.celebrationDate || "");
        setEditEmergencyContact(u.emergencyContact || "");
        setEditIdTypeNumber(u.idTypeNumber || "");
        setEditSpecialPreferences(u.specialPreferences || "");

        // 2. Fetch User's Real Reservations
        const bookingsRes = await fetch("/api/bookings/my-bookings");
        const bookingsData = await bookingsRes.json();
        if (bookingsData.success && bookingsData.bookings) {
          setBookings(bookingsData.bookings);
        }
      } catch (err) {
        console.error("Failed to load portal data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPortalData();
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSaveErrorMessage("Please choose an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setSaveSuccessMessage("");
    setSaveErrorMessage("");

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName,
          avatarUrl: editAvatar,
          dietaryPreference: editDietary,
          dietaryNotes: editDietaryNotes,
          celebrationDate: editCelebrationDate,
          emergencyContact: editEmergencyContact,
          idTypeNumber: editIdTypeNumber,
          specialPreferences: editSpecialPreferences,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSaveErrorMessage(data.error || "Failed to update profile preferences.");
      } else {
        setUser(data.user);
        setSaveSuccessMessage("Your profile and stay preferences have been saved.");
        setTimeout(() => setSaveSuccessMessage(""), 4000);
      }
    } catch {
      setSaveErrorMessage("Network error. Please try again.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/auth/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#1A0F0A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase font-bold tracking-widest text-[#8C6747]">
            Opening Sanctuary Portal...
          </p>
        </div>
      </main>
    );
  }

  // ── Unauthenticated State: Clean Guest Login / Signup Gateway ──
  if (!user) {
    return (
      <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-white rounded-3xl p-8 sm:p-14 border border-[#2C1A10]/10 shadow-lg">
          
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logo-light-bg.png"
              alt="Lake Escape"
              className="w-[100px] h-auto mx-auto mb-4 object-contain"
            />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFEB] text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
              <Sparkles size={11} />
              <span>Guest Portal</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#1A0F0A]">
              Welcome to Your Escape
            </h1>
            <p className="text-xs sm:text-sm text-[#5A3D2C]/75 leading-relaxed max-w-md mx-auto">
              Please sign in with your mobile number to view confirmed reservations, arrange private speedboat transfers, and customize your onboard dining.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/auth/login?redirect=/profile"
              className="btn-brown w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md"
            >
              <span>Sign In with Mobile</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/auth/register?redirect=/profile"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#2C1A10]/20 hover:border-[#1A0F0A] bg-white text-[#1A0F0A] text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Register New Account</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-[#2C1A10]/8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs">
            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/5">
              <p className="font-bold text-[#8C6747] uppercase text-[10px]">Direct Booking</p>
              <p className="text-[#5A3D2C]/80 mt-1">Manage dates & staterooms with instant confirmations.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/5">
              <p className="font-bold text-[#8C6747] uppercase text-[10px]">Speedboat Transit</p>
              <p className="text-[#5A3D2C]/80 mt-1">Live coordinates and captain contact on arrival.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#2C1A10]/5">
              <p className="font-bold text-[#8C6747] uppercase text-[10px]">Private Buyouts</p>
              <p className="text-[#5A3D2C]/80 mt-1">Exclusive whole-vessel charter for up to 12 guests.</p>
            </div>
          </div>

        </div>
      </main>
    );
  }

  // ── Authenticated Guest Portal: Fully Dynamic ──
  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-7">
        
        {/* Top Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#2C1A10]/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Guest Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5EFEB] border-2 border-[#8C6747]/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm text-3xl">
              {user.avatarUrl ? (
                user.avatarUrl.startsWith("data:") || user.avatarUrl.startsWith("http") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{user.avatarUrl}</span>
                )
              ) : (
                <User size={30} className="text-[#8C6747]" />
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] px-2.5 py-0.5 rounded-full bg-[#F5EFEB] border border-[#2C1A10]/10">
                  {user.role === "ADMIN" ? "Administrator" : user.role === "STAFF" ? "Staff Member" : "Verified Guest"}
                </span>
                {user.dietaryPreference && (
                  <span className="text-[10px] font-semibold text-[#5A3D2C] px-2.5 py-0.5 rounded-full bg-[#FBF9F5] border border-[#2C1A10]/10 flex items-center gap-1">
                    <Utensils size={10} className="text-[#8C6747]" />
                    <span>{user.dietaryPreference}</span>
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-medium text-[#1A0F0A]">
                Namaste, {user.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A3D2C]/80 pt-0.5">
                <span className="flex items-center gap-1.5">
                  <Phone size={12} className="text-[#8C6747]" />
                  <span>+91 {user.phone}</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-[#8C6747]" />
                  <span>{user.email}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {user.role !== "GUEST" && (
              <Link
                href="/admin"
                className="btn-brown px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
              >
                <span>Staff Control Room</span>
              </Link>
            )}
            <Link
              href="/booking"
              className="btn-brown px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
            >
              <span>Book New Stay</span>
              <ArrowRight size={13} />
            </Link>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-4 py-2.5 rounded-full border border-[#2C1A10]/15 hover:bg-[#F5EFEB] text-xs font-semibold text-[#1A0F0A] flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut size={13} />
              <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* ── Navigation Tabs ── */}
        <div className="flex items-center gap-3 border-b border-[#2C1A10]/10 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "bookings"
                ? "bg-[#1A0F0A] text-white shadow-sm"
                : "text-[#5A3D2C] hover:text-[#1A0F0A] hover:bg-[#F5EFEB]"
            }`}
          >
            <Calendar size={13} />
            <span>My Reservations ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#1A0F0A] text-white shadow-sm"
                : "text-[#5A3D2C] hover:text-[#1A0F0A] hover:bg-[#F5EFEB]"
            }`}
          >
            <Edit3 size={13} />
            <span>Profile & Stay Preferences</span>
          </button>
        </div>

        {/* ── TAB 1: RESERVATIONS LEDGER ── */}
        {activeTab === "bookings" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#2C1A10]/10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F5EFEB] text-[#8C6747] flex items-center justify-center mx-auto">
                  <Ship size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-[#1A0F0A]">
                    No Active Reservations Yet
                  </h3>
                  <p className="text-xs text-[#5A3D2C]/75 max-w-sm mx-auto">
                    Reserve one of our four floating staterooms or privatize the whole 85ft boat for up to 12 guests.
                  </p>
                </div>
                <Link
                  href="/booking"
                  className="btn-brown inline-flex px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  <span>Explore Staterooms & Book Dates</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl p-6 border border-[#2C1A10]/10 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6747]">
                          Ref: {b.id.slice(0, 10)}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          b.status === "CONFIRMED" || b.status === "CHECKED_IN"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : b.status === "CANCELLED"
                            ? "bg-red-50 text-red-800 border-red-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-[#1A0F0A]">
                          {b.room?.name || "Presidential Lake Suite"}
                        </h3>
                        <p className="text-xs text-[#5A3D2C]/70">
                          {b.room?.description || "Floating luxury stateroom with private lake terrace"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-[#FBF9F5] p-3 rounded-xl border border-[#2C1A10]/5">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] block">Check-in</span>
                          <span className="font-semibold text-[#1A0F0A]">
                            {new Date(b.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] block">Check-out</span>
                          <span className="font-semibold text-[#1A0F0A]">
                            {new Date(b.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#2C1A10]/8 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747] block">Total Amount</span>
                        <span className="text-base font-semibold text-[#1A0F0A]">
                          {formatCurrency(b.total)}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/919762985044?text=Hi%20Lake%20Escape,%20I%20am%20inquiring%20about%20my%20reservation%20${b.id.slice(0, 8)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shadow-xs transition"
                      >
                        <MessageSquare size={13} className="fill-current" />
                        <span>Concierge</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: GUEST PROFILE & PREFERENCES ── */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#2C1A10]/10 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-medium text-[#1A0F0A]">
                Guest Profile & Stay Personalization
              </h2>
              <p className="text-xs text-[#5A3D2C]/70 mt-1">
                Customize your profile picture, dietary restrictions, culinary notes, and arrival preferences for your stay.
              </p>
            </div>

            {saveSuccessMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                <span>{saveSuccessMessage}</span>
              </div>
            )}

            {saveErrorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-red-600" />
                <span>{saveErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Profile Avatar Selection */}
              <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#2C1A10]/10 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                  <Camera size={14} />
                  <span>Profile Picture / Avatar</span>
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-[#8C6747]/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm text-3xl">
                    {editAvatar ? (
                      editAvatar.startsWith("data:") || editAvatar.startsWith("http") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span>{editAvatar}</span>
                      )
                    ) : (
                      <span className="text-xl text-[#5A3D2C]/40">👤</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#2C1A10]/15 hover:border-[#1A0F0A] text-xs font-semibold text-[#1A0F0A] cursor-pointer transition shadow-xs">
                      <span>Upload New Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-[#5A3D2C]/60">Or choose icon:</span>
                      {AVATAR_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setEditAvatar(preset.icon)}
                          className="w-8 h-8 rounded-full bg-white hover:bg-[#F5EFEB] border border-[#2C1A10]/10 flex items-center justify-center text-sm transition cursor-pointer"
                          title={preset.label}
                        >
                          {preset.icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                    Registered Mobile (+91)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`+91 ${user.phone}`}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Dietary Preferences & Food Allergies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                    <Utensils size={12} />
                    <span>Dietary Preference</span>
                  </label>
                  <select
                    value={editDietary}
                    onChange={(e) => setEditDietary(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs font-semibold text-[#1A0F0A] outline-none focus:border-[#1A0F0A]"
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
                    Food Allergies / Dietary Notes
                  </label>
                  <input
                    type="text"
                    value={editDietaryNotes}
                    onChange={(e) => setEditDietaryNotes(e.target.value)}
                    placeholder="e.g. Peanuts, lactose, shellfish, less spice..."
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>
              </div>

              {/* Celebration Date & Emergency Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                    <Gift size={12} />
                    <span>Special Celebration Date</span>
                  </label>
                  <input
                    type="text"
                    value={editCelebrationDate}
                    onChange={(e) => setEditCelebrationDate(e.target.value)}
                    placeholder="e.g. Anniversary 15 Oct / Birthday 4 Nov"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                    <HeartPulse size={12} />
                    <span>Emergency Contact</span>
                  </label>
                  <input
                    type="text"
                    value={editEmergencyContact}
                    onChange={(e) => setEditEmergencyContact(e.target.value)}
                    placeholder="e.g. Priya Sharma (+91 99999 88888)"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>
              </div>

              {/* Government ID & Travel / Room Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747] flex items-center gap-1.5">
                    <FileText size={12} />
                    <span>Govt ID / Passport (For Express Boarding)</span>
                  </label>
                  <input
                    type="text"
                    value={editIdTypeNumber}
                    onChange={(e) => setEditIdTypeNumber(e.target.value)}
                    placeholder="Aadhaar / Passport / Voter ID Number"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                    Room & Comfort Preferences
                  </label>
                  <input
                    type="text"
                    value={editSpecialPreferences}
                    onChange={(e) => setEditSpecialPreferences(e.target.value)}
                    placeholder="e.g. Quiet room, extra pillow, morning ginger tea"
                    className="w-full px-4 py-2.5 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A]"
                  />
                </div>
              </div>

              {/* Save Preferences Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="btn-brown px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isSavingProfile ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Preferences...</span>
                    </>
                  ) : (
                    <span>Save Sanctuary Preferences</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}
