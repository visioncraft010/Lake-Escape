"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  CalendarCheck, CircleDollarSign, Users, ShieldCheck, 
  Search, Filter, CheckCircle2, Phone, Mail, MessageSquare, 
  ArrowUpRight, Clock, AlertCircle, RefreshCw, LogOut, Ship
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

export default function AdminPortalPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; role: string } | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  // Fetch bookings from admin endpoint
  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const authRes = await fetch("/api/auth/me");
      const authData = await authRes.json();
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
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  // Handle status update
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

  // Derived statistics
  const totalRevenue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + (b.total || 0), 0);
  const confirmedCount = bookings.filter((b) => b.status === "CONFIRMED" || b.status === "CHECKED_IN").length;
  const pendingCount = bookings.filter((b) => b.status === "PENDING").length;

  return (
    <main className="min-h-screen bg-[#FBF9F5] text-[#1A0F0A] pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1360px] mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#2C1A10]/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C6747] px-2.5 py-0.5 rounded-full bg-[#F5EFEB] border border-[#2C1A10]/10">
                Staff & Captain Control Room
              </span>
              <span className="text-xs text-[#5A3D2C]/60">·</span>
              <span className="text-xs text-[#5A3D2C]/80 font-medium">Tehri Lake Anchorage</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium text-[#1A0F0A]">
              Reservation Management
            </h1>
            <p className="text-xs text-[#5A3D2C]/70 mt-1">
              Regulate stateroom arrivals, speedboat schedules, and guest check-ins.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="px-4 py-2.5 rounded-full border border-[#2C1A10]/15 hover:bg-[#F5EFEB] text-xs font-semibold text-[#1A0F0A] flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh Ledger</span>
            </button>
            <Link
              href="/profile"
              className="px-4 py-2.5 rounded-full bg-[#1A0F0A] text-white text-xs font-semibold hover:bg-[#2C1A10] transition"
            >
              Guest View
            </Link>
          </div>
        </div>

        {/* Live Notification */}
        {updateMessage && (
          <div className="flex items-center gap-2 p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-semibold border border-emerald-200 animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{updateMessage}</span>
          </div>
        )}

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
          
          {/* Status Filter Tabs */}
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

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchBookings();
            }}
            className="relative w-full sm:w-72 flex items-center"
          >
            <Search size={14} className="absolute left-3.5 text-[#5A3D2C]/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guest, phone, or ID..."
              className="w-full pl-9 pr-4 py-2 bg-[#FBF9F5] border border-[#2C1A10]/15 rounded-xl text-xs outline-none focus:border-[#1A0F0A] text-[#1A0F0A]"
            />
          </form>

        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-3xl border border-[#2C1A10]/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F5] border-b border-[#2C1A10]/10 text-[10px] font-bold uppercase tracking-wider text-[#8C6747]">
                <tr>
                  <th className="py-3.5 px-5">Guest & Contact</th>
                  <th className="py-3.5 px-4">Stateroom</th>
                  <th className="py-3.5 px-4">Dates</th>
                  <th className="py-3.5 px-4">Guests</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Status & Regulation</th>
                  <th className="py-3.5 px-5 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C1A10]/8 font-medium">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#5A3D2C]/60 text-xs">
                      No reservations found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#FBF9F5]/70 transition-colors">
                      
                      {/* Guest Details */}
                      <td className="py-4 px-5">
                        <div className="font-semibold text-sm text-[#1A0F0A]">{b.guestName}</div>
                        <div className="text-[11px] text-[#5A3D2C]/75 flex items-center gap-1.5 mt-0.5">
                          <span>+91 {b.phone}</span>
                          <span>·</span>
                          <span>{b.email}</span>
                        </div>
                        {b.specialRequests && (
                          <div className="mt-1 text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                            Req: {b.specialRequests}
                          </div>
                        )}
                      </td>

                      {/* Room */}
                      <td className="py-4 px-4 font-semibold text-[#1A0F0A]">
                        {b.room?.name || "Presidential Lake Suite"}
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-4 text-[11px]">
                        <div className="text-[#1A0F0A] font-semibold">
                          {new Date(b.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} →{" "}
                          {new Date(b.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </td>

                      {/* Guests */}
                      <td className="py-4 px-4 text-[#1A0F0A]">
                        {b.guests} {b.guests === 1 ? "Guest" : "Guests"}
                      </td>

                      {/* Total */}
                      <td className="py-4 px-4 font-bold text-[#1A0F0A]">
                        {formatCurrency(b.total)}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={b.status}
                          disabled={updatingId === b.id}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className={`text-xs font-bold uppercase tracking-wider rounded-xl px-2.5 py-1.5 border outline-none cursor-pointer transition ${
                            b.status === "CONFIRMED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : b.status === "CHECKED_IN"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : b.status === "CHECKED_OUT"
                              ? "bg-purple-50 text-purple-800 border-purple-300"
                              : b.status === "CANCELLED"
                              ? "bg-red-50 text-red-800 border-red-300"
                              : "bg-amber-50 text-amber-800 border-amber-300"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CHECKED_IN">CHECKED IN</option>
                          <option value="CHECKED_OUT">CHECKED OUT</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>

                      {/* Quick Contact Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/91${b.phone.replace(/[^0-9]/g, "")}?text=Namaste%20${encodeURIComponent(b.guestName)},%20this%20is%20Lake%20Escape%20Concierge%20regarding%20your%20stay.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba5a] transition"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare size={13} className="fill-current" />
                          </a>
                          <a
                            href={`tel:+91${b.phone.replace(/[^0-9]/g, "")}`}
                            className="w-8 h-8 rounded-full bg-[#F5EFEB] hover:bg-[#E6DCCE] text-[#1A0F0A] flex items-center justify-center transition border border-[#2C1A10]/15"
                            title="Call Guest"
                          >
                            <Phone size={13} />
                          </a>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
