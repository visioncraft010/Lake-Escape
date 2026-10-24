"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Mail } from "lucide-react";

interface ReservationItem {
  id: string;
  roomName: string;
  roomCategory: string;
  image: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  total: number;
  guestName: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

const defaultSampleReservations: ReservationItem[] = [
  {
    id: "LE-894120",
    roomName: "The Presidential Lake Suite",
    roomCategory: "Signature Master Suite",
    image: "/images/rooms/suite-room/Suite Room Interior - 1.JPG",
    checkIn: "2026-08-28",
    checkOut: "2026-08-30",
    nights: 2,
    guests: "2 Adults",
    total: 40590,
    guestName: "Aarav Kapoor",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 12345",
    status: "CONFIRMED",
    createdAt: "2026-08-23T10:30:00Z",
  },
  {
    id: "LE-772910",
    roomName: "The Morning Dew Cabin",
    roomCategory: "Deluxe Lakefront Cabin",
    image: "/images/rooms/room-1/Room - interior - 1.JPG",
    checkIn: "2026-06-12",
    checkOut: "2026-06-14",
    nights: 2,
    guests: "2 Adults",
    total: 30444,
    guestName: "Aarav Kapoor",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 12345",
    status: "COMPLETED",
    createdAt: "2026-06-01T12:00:00Z",
  }
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"reservations" | "preferences" | "security">("reservations");
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lake_escape_reservations");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReservations(parsed);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      setReservations(defaultSampleReservations);
    }
  }, []);

  const handleDownloadVoucher = (id: string) => {
    setDownloadSuccess(id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const tabStyle = (active: boolean) => ({
    paddingBottom: "12px",
    fontFamily: "'DM Sans', sans-serif" as const,
    fontSize: "13px",
    fontWeight: active ? 500 : 400,
    color: active ? "#1a0f0a" : "rgba(26, 15, 10, 0.4)",
    borderBottom: active ? "1px solid #1a0f0a" : "1px solid transparent",
    background: "transparent",
    border: "none",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid" as const,
    borderBottomColor: active ? "#1a0f0a" : "transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  return (
    <main style={{
      minHeight: "100vh", background: "#faf6f0", color: "#1a0f0a",
      paddingTop: "clamp(7rem, 14vh, 10rem)",
      paddingBottom: "clamp(4rem, 8vw, 8rem)",
      paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
      paddingRight: "clamp(1.5rem, 4vw, 4rem)",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>

        {/* Profile Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "2rem", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%",
              background: "#1a0f0a", color: "#f0e8dc",
              display: "grid", placeItems: "center",
              fontFamily: "'Libre Baskerville', serif", fontSize: "18px",
            }}>AK</div>
            <div>
              <h1 style={{
                fontFamily: "'Libre Baskerville', serif",
                fontSize: "24px", fontWeight: 400, margin: 0,
              }}>Aarav Kapoor</h1>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                color: "rgba(26, 15, 10, 0.4)", marginTop: "2px",
              }}>aarav.kapoor@example.com</p>
            </div>
          </div>
          <Link href="/booking" className="btn btn-primary">Book New Stay</Link>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: "2rem",
          borderBottom: "1px solid rgba(75, 48, 36, 0.08)",
        }}>
          <button onClick={() => setActiveTab("reservations")} style={tabStyle(activeTab === "reservations")}>
            Reservations ({reservations.length})
          </button>
          <button onClick={() => setActiveTab("preferences")} style={tabStyle(activeTab === "preferences")}>
            Preferences
          </button>
          <button onClick={() => setActiveTab("security")} style={tabStyle(activeTab === "security")}>
            Account
          </button>
        </div>

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {reservations.map((res) => {
              const isPast = res.status === "COMPLETED";
              return (
                <div key={res.id} style={{
                  background: "#fff", padding: "clamp(1.5rem, 3vw, 2rem)",
                  opacity: isPast ? 0.7 : 1,
                  borderBottom: "1px solid rgba(75, 48, 36, 0.06)",
                }}>
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 2fr 1fr",
                    gap: "2rem", alignItems: "center",
                  }}>
                    <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
                      <Image src={res.image} alt={res.roomName} fill className="object-cover" sizes="33vw" />
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                        color: "#9a7b5b", letterSpacing: "0.08em", textTransform: "uppercase",
                        marginBottom: "4px",
                      }}>{res.roomCategory}</p>
                      <h3 style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "20px", fontWeight: 400, margin: "0 0 0.8rem",
                      }}>{res.roomName}</h3>
                      <div style={{
                        display: "flex", gap: "2rem",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                        color: "rgba(26, 15, 10, 0.5)",
                      }}>
                        <span>{res.checkIn} → {res.checkOut}</span>
                        <span>{res.guests}</span>
                      </div>
                      <div style={{
                        marginTop: "0.6rem", display: "inline-block",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                        fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase",
                        color: res.status === "CONFIRMED" ? "#2d6a4f" : "rgba(26, 15, 10, 0.35)",
                        background: res.status === "CONFIRMED" ? "rgba(45, 106, 79, 0.08)" : "rgba(26, 15, 10, 0.04)",
                        padding: "4px 10px",
                      }}>
                        {res.status}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                        color: "rgba(26, 15, 10, 0.35)", letterSpacing: "0.06em",
                        textTransform: "uppercase", marginBottom: "4px",
                      }}>Total</p>
                      <p style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: "22px", margin: "0 0 1rem",
                      }}>₹{res.total.toLocaleString("en-IN")}</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", alignItems: "flex-end" }}>
                        <button
                          onClick={() => handleDownloadVoucher(res.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: "6px",
                            fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                            color: "#9a7b5b", background: "none", border: "none", cursor: "pointer",
                          }}
                        >
                          <Download size={13} />
                          <span>{downloadSuccess === res.id ? "Downloaded" : "Download Voucher"}</span>
                        </button>
                        <a href="mailto:stay@lakeescape.in" style={{
                          display: "flex", alignItems: "center", gap: "6px",
                          fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                          color: "rgba(26, 15, 10, 0.35)",
                        }}>
                          <Mail size={13} />
                          <span>Concierge</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === "preferences" && (
          <div style={{ maxWidth: "700px" }}>
            <h2 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "24px", fontWeight: 400, fontStyle: "italic",
              margin: "0 0 0.5rem",
            }}>Room Preferences</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              color: "rgba(26, 15, 10, 0.45)", marginBottom: "2rem",
            }}>Your preferences are configured for upcoming stays.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              {[
                { cat: "Dining", items: ["Vegetarian Options", "Organic Herbal Tea", "Gluten-Sensitive Breakfast"] },
                { cat: "Comfort", items: ["Hypoallergenic Pillows", "Cedar & Pine Fragrance", "Telescope Setup on Deck"] },
              ].map((group) => (
                <div key={group.cat}>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500,
                    letterSpacing: "0.08em", textTransform: "uppercase", color: "#9a7b5b",
                    marginBottom: "1rem",
                  }}>{group.cat}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {group.items.map((item) => (
                      <label key={item} style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                        color: "rgba(26, 15, 10, 0.7)", cursor: "pointer",
                        padding: "10px 14px", background: "#fff",
                      }}>
                        <input type="checkbox" defaultChecked style={{ accentColor: "#1a0f0a" }} />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-primary" style={{ marginTop: "2rem" }}>Save Preferences</button>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div style={{ maxWidth: "480px" }}>
            <h2 style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "24px", fontWeight: 400, fontStyle: "italic",
              margin: "0 0 0.5rem",
            }}>Account Details</h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
              color: "rgba(26, 15, 10, 0.45)", marginBottom: "2rem",
            }}>Manage your credentials for reservation access.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {[
                { label: "Full Name", value: "Aarav Kapoor", type: "text" },
                { label: "Email", value: "aarav.kapoor@example.com", type: "email" },
                { label: "Mobile", value: "+91 98765 12345", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label style={{
                    display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
                    fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: "rgba(26, 15, 10, 0.4)", marginBottom: "6px",
                  }}>{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    style={{
                      width: "100%", padding: "12px 14px",
                      background: "#fff", border: "1px solid rgba(75, 48, 36, 0.1)",
                      fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1a0f0a",
                      borderRadius: "2px", outline: "none",
                    }}
                  />
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-primary" style={{ marginTop: "2rem" }}>Update Profile</button>
          </div>
        )}

      </div>
    </main>
  );
}
