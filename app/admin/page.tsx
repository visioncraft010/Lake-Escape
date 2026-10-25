"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CalendarCheck, CircleDollarSign, Users, ShieldCheck, 
  Search, Filter, CheckCircle2, Phone, Mail, MessageSquare, 
  ArrowUpRight, Clock, AlertCircle, RefreshCw, LogOut, Ship,
  UserPlus, Trash2, KeyRound, Lock, Crown
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AdminBooking {
  id: string;
  guestName: string;
  phone: string;
  email: string;
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
  };
  user?: {
    id: string;
    name: string;
    phone: string;
    role: string;
  };
}

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

export default function AdminPortalPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; role: string; email?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"RESERVATIONS" | "MANAGEMENT">("RESERVATIONS");
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [staffLoading, setStaffLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // New Staff Modal State
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffPhone, setNewStaffPhone] = useState("");
  const [newStaffPassword, setNewStaffPassword] = useState("");
  const [staffActionLoading, setStaffActionLoading] = useState(false);
  const [staffError, setStaffError] = useState("");
  const [staffSuccess, setStaffSuccess] = useState("");

  // ── Authentication Check & Bookings Fetch ──
  const fetchBookings = useCallback(async () => {
    try {
      setIsLoading(true);
      const authRes = await fetch("/api/auth/me");
      const authData = await authRes.json();

      if (!authData.authenticated || (authData.user?.role !== "ADMIN" && authData.user?.role !== "STAFF")) {
        router.replace("/admin/login?unauthorized=true");
        return;
      }

      setCurrentUser(authData.user);

      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/bookings?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Failed to fetch admin bookings:", err);
    } finally {
      setIsLoading(false);
    }
  }, [router, searchTerm, statusFilter]);

  // ── Fetch Management / Staff Team ──
  const fetchStaff = useCallback(async () => {
    try {
      setStaffLoading(true);
      const res = await fetch("/api/admin/staff");
      const data = await res.json();
      if (data.success && data.staff) {
        setStaffList(data.staff);
      }
    } catch (err) {
      console.error("Failed to fetch staff:", err);
    } finally {
      setStaffLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    if (currentUser?.role === "ADMIN" && activeTab === "MANAGEMENT") {
      fetchStaff();
    }
  }, [currentUser, activeTab, fetchStaff]);

  // ── Handle Reservation Status Update ──
  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId);
    setUpdateMessage(null);

    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as AdminBooking["status"] } : b))
        );
        setUpdateMessage(`Reservation status updated to ${newStatus}`);
        setTimeout(() => setUpdateMessage(null), 3000);
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Handle Add Management Member ──
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError("");
    setStaffSuccess("");
    setStaffActionLoading(true);

    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newStaffName,
          email: newStaffEmail,
          phone: newStaffPhone,
          password: newStaffPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStaffError(data.error || "Failed to add management member.");
        setStaffActionLoading(false);
        return;
      }

      setStaffSuccess(data.message || "Management member added successfully.");
      setNewStaffName("");
      setNewStaffEmail("");
      setNewStaffPhone("");
      setNewStaffPassword("");
      fetchStaff();
      setTimeout(() => {
        setShowAddStaffModal(false);
        setStaffSuccess("");
      }, 1500);
    } catch (err: unknown) {
      console.error("Add staff error:", err);
      setStaffError("Network communication error.");
    } finally {
      setStaffActionLoading(false);
    }
  };

  // ── Handle Revoke Staff ──
  const handleRevokeStaff = async (staffId: string, staffName: string) => {
    if (!confirm(`Are you sure you want to revoke management access for ${staffName}?`)) {
      return;
    }

    try {
      const res = await fetch("/api/admin/staff", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffId }),
      });

      const data = await res.json();
      if (data.success) {
        setUpdateMessage(`Access revoked for ${staffName}`);
        fetchStaff();
        setTimeout(() => setUpdateMessage(null), 3000);
      } else {
        alert(data.error || "Failed to revoke access.");
      }
    } catch (err) {
      console.error("Revoke staff error:", err);
    }
  };

  // ── Handle Admin Logout ──
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.replace("/admin/login");
    }
  };

  // Derived statistics
  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + (b.total || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "CHECKED_IN").length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  const isMasterAdmin = currentUser?.role === "ADMIN";

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#2C1A10]/10 shadow-sm">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {isMasterAdmin ? (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] px-3 py-1 rounded-full bg-[#8C6747]/10 border border-[#8C6747]/30 flex items-center gap-1.5">
                  <Crown size={12} className="text-[#8C6747]" />
                  <span>Master Administrator</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  <span>Management (Restricted Staff View)</span>
                </span>
              )}
              <span className="text-xs text-[#5A3D2C]/40">·</span>
              <span className="text-xs text-[#5A3D2C]/80 font-medium">Tehri Lake Sanctuary Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#1A0F0A]">
              Control Center & Operations
            </h1>
            <p className="text-xs text-[#5A3D2C]/70 mt-1">
              Logged in as <strong className="text-[#1A0F0A]">{currentUser?.name || "Operations User"}</strong> ({currentUser?.role})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchBookings}
              className="px-4 py-2 rounded-full border border-[#2C1A10]/15 hover:bg-[#F5EFEB] text-xs font-semibold text-[#1A0F0A] flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
            <Link
              href="/profile"
              className="px-4 py-2 rounded-full border border-[#2C1A10]/15 hover:bg-[#F5EFEB] text-xs font-semibold text-[#1A0F0A] transition"
            >
              Guest Portal
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Live Notification */}
        {updateMessage && (
          <div className="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold border border-emerald-200 animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{updateMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#2C1A10]/10 pb-3">
          <button
            onClick={() => setActiveTab("RESERVATIONS")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "RESERVATIONS"
                ? "bg-[#1A0F0A] text-white shadow-sm"
                : "bg-white hover:bg-[#F5EFEB] text-[#5A3D2C] border border-[#2C1A10]/10"
            }`}
          >
            <Ship size={14} />
            <span>Reservations Ledger ({bookings.length})</span>
          </button>

          {isMasterAdmin && (
            <button
              onClick={() => setActiveTab("MANAGEMENT")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "MANAGEMENT"
                  ? "bg-[#1A0F0A] text-white shadow-sm"
                  : "bg-white hover:bg-[#F5EFEB] text-[#5A3D2C] border border-[#2C1A10]/10"
              }`}
            >
              <Users size={14} />
              <span>Management Team ({staffList.length})</span>
            </button>
          )}

          {!isMasterAdmin && (
            <div className="ml-auto text-[11px] text-[#5A3D2C]/60 italic hidden sm:block">
              * Management account has operational reservation access only.
            </div>
          )}
        </div>

        {/* ═══════════ TAB 1: RESERVATIONS ═══════════ */}
        {activeTab === "RESERVATIONS" && (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#2C1A10]/10 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">Total Bookings</span>
                <div className="text-2xl font-bold text-[#1A0F0A]">{bookings.length}</div>
                <p className="text-[11px] text-[#5A3D2C]/70">All recorded reservations</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#2C1A10]/10 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Active / Confirmed</span>
                <div className="text-2xl font-bold text-emerald-800">{confirmedCount}</div>
                <p className="text-[11px] text-[#5A3D2C]/70">Ready for boat departure</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#2C1A10]/10 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Pending Review</span>
                <div className="text-2xl font-bold text-amber-800">{pendingCount}</div>
                <p className="text-[11px] text-[#5A3D2C]/70">Requires concierge call</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#2C1A10]/10 shadow-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">Booked Revenue</span>
                <div className="text-2xl font-bold text-[#1A0F0A]">{formatCurrency(totalRevenue)}</div>
                <p className="text-[11px] text-[#5A3D2C]/70">Excluding cancellations</p>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#2C1A10]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {["ALL", "CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "PENDING", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                      statusFilter === st
                        ? "bg-[#1A0F0A] text-white"
                        : "bg-[#FBF9F5] hover:bg-[#F5EFEB] text-[#5A3D2C]"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3.5 top-3 text-[#5A3D2C]/40" />
                <input
                  type="text"
                  placeholder="Search guest name, phone, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchBookings()}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#2C1A10]/15 bg-[#FBF9F5] text-xs focus:outline-none focus:border-[#8C6747] text-[#1A0F0A]"
                />
              </div>
            </div>

            {/* Reservations Table */}
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5EFEB] text-[#5A3D2C] uppercase text-[10px] tracking-wider border-b border-[#2C1A10]/10 font-bold">
                    <tr>
                      <th className="py-3.5 px-5">Guest & Contact</th>
                      <th className="py-3.5 px-5">Stateroom</th>
                      <th className="py-3.5 px-5">Dates & Guests</th>
                      <th className="py-3.5 px-5">Financials</th>
                      <th className="py-3.5 px-5">Status & Action</th>
                      <th className="py-3.5 px-5 text-right">Quick Contact</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#2C1A10]/10 text-[#1A0F0A]">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-[#5A3D2C]/60">
                          <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-[#8C6747]" />
                          <span>Loading reservation records...</span>
                        </td>
                      </tr>
                    ) : bookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-[#5A3D2C]/60">
                          No reservations match the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      bookings.map((b) => {
                        const statusColors: Record<string, string> = {
                          CONFIRMED: "bg-emerald-50 text-emerald-800 border-emerald-200",
                          CHECKED_IN: "bg-blue-50 text-blue-800 border-blue-200",
                          CHECKED_OUT: "bg-purple-50 text-purple-800 border-purple-200",
                          PENDING: "bg-amber-50 text-amber-800 border-amber-200",
                          CANCELLED: "bg-red-50 text-red-800 border-red-200",
                          COMPLETED: "bg-gray-50 text-gray-800 border-gray-200",
                        };

                        const formattedPhone = b.phone.replace(/[^0-9]/g, "");

                        return (
                          <tr key={b.id} className="hover:bg-[#FBF9F5] transition">
                            <td className="py-4 px-5">
                              <p className="font-semibold text-sm text-[#1A0F0A]">{b.guestName}</p>
                              <p className="text-[11px] text-[#5A3D2C]/70">{b.email}</p>
                              <p className="text-[11px] font-mono text-[#5A3D2C]/80 mt-0.5">{b.phone}</p>
                            </td>

                            <td className="py-4 px-5">
                              <p className="font-semibold text-[#1A0F0A]">{b.room?.name || "Stateroom"}</p>
                              <span className="text-[10px] text-[#8C6747] font-semibold uppercase tracking-wider">
                                {formatCurrency(b.room?.price || 0)} / nt
                              </span>
                            </td>

                            <td className="py-4 px-5">
                              <p className="font-medium text-[#1A0F0A]">
                                {new Date(b.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} &rarr; {new Date(b.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </p>
                              <p className="text-[11px] text-[#5A3D2C]/70">{b.guests} Guests</p>
                              {b.specialRequests && (
                                <p className="text-[10px] text-amber-900 bg-amber-50 rounded px-1.5 py-0.5 mt-1 max-w-[200px] truncate" title={b.specialRequests}>
                                  Note: {b.specialRequests}
                                </p>
                              )}
                            </td>

                            <td className="py-4 px-5">
                              <p className="font-bold text-sm text-[#1A0F0A]">{formatCurrency(b.total)}</p>
                              <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">
                                Paid Online
                              </span>
                            </td>

                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[b.status] || "bg-gray-100"}`}>
                                  {b.status.replace("_", " ")}
                                </span>

                                <select
                                  disabled={updatingId === b.id}
                                  value={b.status}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                  className="text-[11px] rounded-lg border border-[#2C1A10]/20 bg-white px-2 py-1 text-[#1A0F0A] focus:outline-none focus:border-[#8C6747] cursor-pointer"
                                >
                                  <option value="CONFIRMED">Confirm</option>
                                  <option value="CHECKED_IN">Check In</option>
                                  <option value="CHECKED_OUT">Check Out</option>
                                  <option value="PENDING">Pending</option>
                                  <option value="CANCELLED">Cancel</option>
                                </select>
                              </div>
                            </td>

                            <td className="py-4 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={`https://wa.me/${formattedPhone}?text=Hello%20${encodeURIComponent(b.guestName)},%20this%20is%20Lake%20Escape%20resort%20management%20regarding%20your%20upcoming%20stateroom%20booking.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition cursor-pointer"
                                  title="WhatsApp Guest"
                                >
                                  <MessageSquare size={13} />
                                </a>

                                <a
                                  href={`tel:${b.phone}`}
                                  className="w-7 h-7 rounded-full bg-[#1A0F0A]/5 text-[#1A0F0A] hover:bg-[#1A0F0A] hover:text-white flex items-center justify-center transition cursor-pointer"
                                  title="Call Guest"
                                >
                                  <Phone size={13} />
                                </a>

                                <a
                                  href={`mailto:${b.email}?subject=Lake%20Escape%20Reservation%20Details`}
                                  className="w-7 h-7 rounded-full bg-[#1A0F0A]/5 text-[#1A0F0A] hover:bg-[#1A0F0A] hover:text-white flex items-center justify-center transition cursor-pointer"
                                  title="Email Guest"
                                >
                                  <Mail size={13} />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ TAB 2: MANAGEMENT TEAM (ADMIN EXCLUSIVE) ═══════════ */}
        {activeTab === "MANAGEMENT" && isMasterAdmin && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#2C1A10]/10 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] block mb-1">
                  Access & Governance
                </span>
                <h2 className="text-xl font-semibold text-[#1A0F0A]">
                  Management Staff Accounts
                </h2>
                <p className="text-xs text-[#5A3D2C]/70 mt-1 max-w-xl">
                  Authorized management staff can view arrivals, update guest check-ins, and communicate with guests. They cannot add staff or change master security credentials.
                </p>
              </div>

              <button
                onClick={() => setShowAddStaffModal(true)}
                className="px-5 py-2.5 rounded-full bg-[#1A0F0A] hover:bg-[#8C6747] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
              >
                <UserPlus size={14} />
                <span>Add Management Member</span>
              </button>
            </div>

            {/* Staff List Table */}
            <div className="bg-white rounded-3xl border border-[#2C1A10]/10 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5EFEB] text-[#5A3D2C] uppercase text-[10px] tracking-wider border-b border-[#2C1A10]/10 font-bold">
                  <tr>
                    <th className="py-3.5 px-5">Staff Name</th>
                    <th className="py-3.5 px-5">Email & Login ID</th>
                    <th className="py-3.5 px-5">Mobile</th>
                    <th className="py-3.5 px-5">Access Level</th>
                    <th className="py-3.5 px-5">Added On</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C1A10]/10">
                  {staffLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-[#5A3D2C]/60">
                        <RefreshCw size={18} className="animate-spin mx-auto mb-2 text-[#8C6747]" />
                        <span>Loading team members...</span>
                      </td>
                    </tr>
                  ) : staffList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#5A3D2C]/60">
                        No management staff accounts added yet. Click &quot;Add Management Member&quot; to invite a team member.
                      </td>
                    </tr>
                  ) : (
                    staffList.map((st) => (
                      <tr key={st.id} className="hover:bg-[#FBF9F5] transition">
                        <td className="py-4 px-5 font-semibold text-sm text-[#1A0F0A]">
                          {st.name}
                        </td>
                        <td className="py-4 px-5 font-mono text-[11px] text-[#5A3D2C]">
                          {st.email}
                        </td>
                        <td className="py-4 px-5 font-mono text-[11px] text-[#5A3D2C]">
                          {st.phone}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Management (Staff)
                          </span>
                        </td>
                        <td className="py-4 px-5 text-[#5A3D2C]/70">
                          {new Date(st.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            onClick={() => handleRevokeStaff(st.id, st.name)}
                            className="px-3 py-1 rounded-lg text-red-600 hover:bg-red-50 text-xs font-semibold transition cursor-pointer flex items-center gap-1 ml-auto"
                            title="Revoke access"
                          >
                            <Trash2 size={13} />
                            <span>Revoke</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ── ADD MANAGEMENT MEMBER MODAL ── */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#2C1A10]/15 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] block mb-1">
                  Team Provisioning
                </span>
                <h3 className="text-xl font-semibold text-[#1A0F0A]">
                  Add Management Member
                </h3>
              </div>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="text-[#5A3D2C]/40 hover:text-[#1A0F0A] text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#5A3D2C]/70 mb-5 leading-relaxed">
              This staff member will receive management access to view and update bookings, without master administrative powers.
            </p>

            {staffError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0 text-red-500" />
                <span>{staffError}</span>
              </div>
            )}

            {staffSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 size={15} className="shrink-0 text-emerald-600" />
                <span>{staffSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAddStaff} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A3D2C] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Front Desk Concierge"
                  value={newStaffName}
                  onChange={(e) => setNewStaffName(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-2.5 text-xs text-[#1A0F0A] focus:outline-none focus:border-[#8C6747]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A3D2C] mb-1.5">
                  Management Email (Login ID)
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. concierge@lakeescape.in"
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-2.5 text-xs text-[#1A0F0A] focus:outline-none focus:border-[#8C6747]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A3D2C] mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={newStaffPhone}
                  onChange={(e) => setNewStaffPhone(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-2.5 text-xs text-[#1A0F0A] focus:outline-none focus:border-[#8C6747]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5A3D2C] mb-1.5">
                  Initial Passcode (At least 6 chars)
                </label>
                <input
                  type="text"
                  required
                  minLength={6}
                  placeholder="Create temporary passcode"
                  value={newStaffPassword}
                  onChange={(e) => setNewStaffPassword(e.target.value)}
                  className="w-full bg-[#FBF9F5] border border-[#2C1A10]/20 rounded-xl px-4 py-2.5 text-xs text-[#1A0F0A] focus:outline-none focus:border-[#8C6747]"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="flex-1 rounded-xl border border-[#2C1A10]/20 py-2.5 text-xs text-[#5A3D2C] hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={staffActionLoading}
                  className="flex-1 rounded-xl bg-[#1A0F0A] hover:bg-[#8C6747] text-white py-2.5 text-xs font-semibold uppercase tracking-wider transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {staffActionLoading ? "Adding..." : "Grant Access"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
