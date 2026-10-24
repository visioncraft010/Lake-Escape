"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Aarav Kapoor",
    email: "aarav.kapoor@example.com",
    phone: "+91 98765 12345",
    password: "••••••••",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 500);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 500);
  };

  return (
    <main style={{
      minHeight: "100vh", background: "#faf6f0", color: "#1a0f0a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "6rem 1.5rem 3rem",
    }}>
      <div style={{
        width: "100%", maxWidth: "440px",
        display: "flex", flexDirection: "column", gap: "2rem",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo-light-bg.png"
            alt="Lake Escape"
            style={{ width: "100px", height: "auto", margin: "0 auto 1.25rem", objectFit: "contain" }}
          />
          <h1 style={{
            fontFamily: "'Libre Baskerville', serif",
            fontSize: "28px", fontWeight: 400, fontStyle: "italic",
            margin: "0 0 0.5rem",
          }}>
            Join the Sanctuary
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
            color: "rgba(26, 15, 10, 0.45)",
          }}>
            Create your account for bespoke bookings and private charters.
          </p>
        </div>

        {/* Google OAuth Option */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
            background: "#ffffff", border: "1px solid rgba(26, 15, 10, 0.12)",
            color: "#1a0f0a", padding: "0.875rem", borderRadius: "4px",
            fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500,
            cursor: "pointer", transition: "all 0.2s ease",
          }}
        >
          <svg style={{ width: "18px", height: "18px" }} viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: "1rem",
          color: "rgba(26, 15, 10, 0.25)",
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(26, 15, 10, 0.1)" }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(26, 15, 10, 0.1)" }} />
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{
              display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(26, 15, 10, 0.5)", marginBottom: "0.5rem",
            }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: "100%", background: "#ffffff", border: "1px solid rgba(26, 15, 10, 0.12)",
                padding: "0.875rem 1rem", borderRadius: "4px", fontSize: "14px",
                color: "#1a0f0a", fontFamily: "'DM Sans', sans-serif", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(26, 15, 10, 0.5)", marginBottom: "0.5rem",
            }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: "100%", background: "#ffffff", border: "1px solid rgba(26, 15, 10, 0.12)",
                padding: "0.875rem 1rem", borderRadius: "4px", fontSize: "14px",
                color: "#1a0f0a", fontFamily: "'DM Sans', sans-serif", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(26, 15, 10, 0.5)", marginBottom: "0.5rem",
            }}>
              Phone Number (for booking confirmations)
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: "100%", background: "#ffffff", border: "1px solid rgba(26, 15, 10, 0.12)",
                padding: "0.875rem 1rem", borderRadius: "4px", fontSize: "14px",
                color: "#1a0f0a", fontFamily: "'DM Sans', sans-serif", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "11px",
              fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "rgba(26, 15, 10, 0.5)", marginBottom: "0.5rem",
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: "100%", background: "#ffffff", border: "1px solid rgba(26, 15, 10, 0.12)",
                padding: "0.875rem 1rem", borderRadius: "4px", fontSize: "14px",
                color: "#1a0f0a", fontFamily: "'DM Sans', sans-serif", outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ paddingTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%", background: "#1a0f0a", color: "#faf6f0",
                padding: "1rem", borderRadius: "4px", border: "none",
                fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "0.5rem", transition: "opacity 0.2s",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              <span>{isLoading ? "Creating Profile..." : "Create Account"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        <div style={{
          borderTop: "1px solid rgba(26, 15, 10, 0.08)",
          paddingTop: "1.25rem", textAlign: "center",
          fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
          color: "rgba(26, 15, 10, 0.5)",
        }}>
          <span>Already registered? </span>
          <Link href="/auth/login" style={{ color: "#1a0f0a", fontWeight: 600, textDecoration: "underline" }}>
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
