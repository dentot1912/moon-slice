"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, User, Menu as MenuIcon, X as CloseIcon, Home, Compass, Flame, Activity, ChevronRight } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  rank?: string;
  points?: number;
  addresses?: string[];
}

interface NavbarProps {
  user: UserProfile | null | undefined; cartCount: number; onOpenCart: () => void; onOpenLogin: () => void;
  activeSection: string; setActiveSection: (s: string) => void; hasActiveOrder: boolean;
}

export default function Navbar({ user, cartCount, onOpenCart, onOpenLogin, activeSection, setActiveSection, hasActiveOrder }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Beranda", icon: Home },
    { id: "menu", label: "Menu", icon: Compass },
    { id: "delivery", label: "Pesan", icon: Flame },
    { id: "profile", label: "Profil", icon: User },
    ...(hasActiveOrder ? [{ id: "tracker", label: "Lacak", icon: Activity }] : []),
  ];

  const navStyle: React.CSSProperties = {
    position: "sticky", top: 0, zIndex: 40, width: "100%",
    backgroundColor: "rgba(13,10,9,0.85)",
    backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
    borderBottom: "1px solid rgba(244,237,227,0.06)",
  };

  const logoStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "12px",
    cursor: "pointer", textDecoration: "none", background: "none", border: "none",
  };

  return (
    <header style={navStyle}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <button onClick={() => { setActiveSection("home"); setIsMobileMenuOpen(false); }} style={logoStyle}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(223,183,92,0.4)", boxShadow: "0 0 16px rgba(223,183,92,0.2)", flexShrink: 0 }}>
            <Image src="/logo.jpeg" alt="MoonSlice" width={40} height={40} style={{ objectFit: "cover" }} />
          </div>
          <div>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "#f4ede3" }}>MOON</span>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", background: "linear-gradient(135deg,#dfb75c,#b38e43)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>SLICE</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav style={{ gap: 4, alignItems: "center" }} className="hidden-mobile">
          {links.map(l => (
            <button key={l.id} onClick={() => setActiveSection(l.id)}
              style={{
                padding: "8px 18px", borderRadius: 9999, fontSize: 14, fontWeight: 500, fontFamily: "'DM Sans',sans-serif",
                cursor: "pointer", transition: "all 0.2s",
                color: activeSection === l.id ? "#dfb75c" : "rgba(244,237,227,0.5)",
                background: activeSection === l.id ? "rgba(223,183,92,0.12)" : "transparent",
                border: activeSection === l.id ? "1px solid rgba(223,183,92,0.3)" : "1px solid transparent",
              }}>
              {l.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onOpenCart} className="mobile-cart-btn" style={{
            position: "relative", display: "flex", alignItems: "center", gap: 8,
            padding: "9px 18px", borderRadius: 9999, cursor: "pointer",
            background: "rgba(223,183,92,0.08)", border: "1px solid rgba(223,183,92,0.25)",
            color: "#f4ede3", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans',sans-serif",
            transition: "all 0.2s",
          }}>
            <ShoppingCart size={16} />
            <span className="hidden-mobile">Keranjang</span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                width: 20, height: 20, borderRadius: "50%",
                background: "linear-gradient(135deg,#dfb75c,#b38e43)",
                color: "#050505", fontSize: 10, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(223,183,92,0.5)",
              }}>{cartCount}</span>
            )}
          </button>

          {user ? (
            <button onClick={() => { setActiveSection("profile"); setIsMobileMenuOpen(false); }} className="mobile-user-btn" style={{
              display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
              borderRadius: 9999, cursor: "pointer",
              background: "rgba(244,237,227,0.06)", border: "1px solid rgba(244,237,227,0.12)",
              color: "#f4ede3", fontSize: 14, fontWeight: 500,
            }}>
              <User size={15} />
              <span className="hidden-mobile">{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button onClick={onOpenLogin} className="mobile-login-btn" style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 22px",borderRadius:9999,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#dfb75c,#b38e43)",color:"#050505",border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(223,183,92,0.35)",whiteSpace:"nowrap" }}>
              <span className="hidden-mobile">Masuk</span>
              <User size={15} className="visible-mobile" />
            </button>
          )}

          {/* Hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="visible-mobile"
            style={{
              background: "rgba(244,237,227,0.06)",
              border: "1px solid rgba(244,237,227,0.12)",
              borderRadius: "50%",
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4ede3",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {isMobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(5,4,3,0.65)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            zIndex: 35,
            animation: "fade-in-overlay 0.3s ease-out",
          }} 
          className="visible-mobile"
        />
      )}

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "85vw",
          maxWidth: 380,
          height: "100vh",
          backgroundColor: "rgba(12,9,8,0.96)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          zIndex: 45,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 24px 30px",
          borderLeft: "1px solid rgba(223,183,92,0.2)",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.85), -2px 0 20px rgba(223,183,92,0.05)",
          animation: "slide-in-drawer 0.4s cubic-bezier(0.16,1,0.3,1)",
          overflowY: "auto",
        }} className="visible-mobile">
          
          <div>
            {/* Header: Title and Close button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(223,183,92,0.4)" }}>
                  <Image src="/logo.jpeg" alt="MoonSlice" width={34} height={34} style={{ objectFit: "cover" }} />
                </div>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.08em" }}>
                  <span style={{ color: "#f4ede3" }}>MOON</span>
                  <span style={{ background: "linear-gradient(135deg,#dfb75c,#b38e43)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>SLICE</span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background: "rgba(244,237,227,0.05)",
                  border: "1px solid rgba(244,237,227,0.1)",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(244,237,227,0.6)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "#dfb75c"; e.currentTarget.style.borderColor = "#dfb75c"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(244,237,227,0.6)"; e.currentTarget.style.borderColor = "rgba(244,237,227,0.1)"; }}
              >
                <CloseIcon size={16} />
              </button>
            </div>

            {/* System Status Banner */}
            <div style={{
              background: "rgba(223,183,92,0.04)",
              border: "1px solid rgba(223,183,92,0.12)",
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="telemetry-dot" style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#dfb75c", display: "inline-block" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#dfb75c", fontWeight: 700 }}>MOON-OS ACTIVE</span>
              </div>
            </div>

            {/* Links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
              {links.map(l => {
                const LinkIcon = l.icon;
                const isActive = activeSection === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      setActiveSection(l.id);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "14px 20px",
                      borderRadius: 16,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: "'Space Mono', monospace",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                      color: isActive ? "#dfb75c" : "rgba(244,237,227,0.75)",
                      background: isActive ? "linear-gradient(90deg, rgba(223,183,92,0.12) 0%, rgba(223,183,92,0.02) 100%)" : "rgba(244,237,227,0.01)",
                      border: isActive ? "1px solid rgba(223,183,92,0.3)" : "1px solid rgba(244,237,227,0.04)",
                      boxShadow: isActive ? "0 4px 20px rgba(223,183,92,0.06)" : "none",
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: isActive ? "rgba(223,183,92,0.15)" : "rgba(244,237,227,0.04)",
                      color: isActive ? "#dfb75c" : "rgba(244,237,227,0.45)",
                      transition: "all 0.25s",
                    }}>
                      <LinkIcon size={16} />
                    </div>
                    <span style={{ flexGrow: 1, letterSpacing: "0.03em" }}>{l.label.toUpperCase()}</span>
                    {isActive ? (
                      <span className="glow-text-gold" style={{ 
                        fontSize: 9, 
                        color: "#dfb75c", 
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700
                      }}>// ACTIVE</span>
                    ) : (
                      <ChevronRight size={14} style={{ color: "rgba(244,237,227,0.2)" }} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Cockpit Diagnostics / Bottom Deck */}
          <div style={{ marginTop: 40, borderTop: "1px dashed rgba(244,237,227,0.08)", paddingTop: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              
            </div>

            {user ? (
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 14,
                background: "rgba(244,237,227,0.03)",
                border: "1px solid rgba(244,237,227,0.06)"
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(223,183,92,0.12)",
                  border: "1px solid rgba(223,183,92,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#dfb75c",
                  flexShrink: 0
                }}>
                  <User size={14} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#f4ede3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.name}
                  </p>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#dfb75c", textTransform: "uppercase" }}>
                    Rank: {user.rank ?? "Astronot Baru"}
                  </p>
                </div>
              </div>
            ) : (
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenLogin(); }} style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 12,
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                fontWeight: 700,
                background: "linear-gradient(135deg,#dfb75c,#b38e43)",
                color: "#050505",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: "0 4px 16px rgba(223,183,92,0.25)"
              }}>
                <User size={13} /> LOGIN
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex !important; }
        .visible-mobile { display: none !important; }
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .visible-mobile { display: flex !important; }
          .mobile-cart-btn { padding: 9px 12px !important; }
          .mobile-user-btn { padding: 9px 10px !important; }
          .mobile-login-btn { padding: 9px 10px !important; border-radius: 50% !important; width: 38px !important; height: 38px !important; }
        }
        @keyframes fade-in-overlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes pulse-telemetry {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 4px #dfb75c; }
          50% { opacity: 1; box-shadow: 0 0 10px #dfb75c; }
        }
        .telemetry-dot {
          animation: pulse-telemetry 2s infinite ease-in-out;
        }
      `}</style>
    </header>
  );
}
