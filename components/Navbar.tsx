"use client";
import React from "react";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";

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

  const links = [
    { id: "home", label: "Beranda" },
    { id: "menu", label: "Menu" },
    { id: "delivery", label: "Pesan" },
    { id: "profile", label: "Profil" },
    ...(hasActiveOrder ? [{ id: "tracker", label: "Lacak" }] : []),
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
        <button onClick={() => setActiveSection("home")} style={logoStyle}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(223,183,92,0.4)", boxShadow: "0 0 16px rgba(223,183,92,0.2)", flexShrink: 0 }}>
            <Image src="/logo.jpeg" alt="MoonSlice" width={40} height={40} style={{ objectFit: "cover" }} />
          </div>
          <div>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", color: "#f4ede3" }}>MOON</span>
            <span style={{ fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 700, letterSpacing: "0.08em", background: "linear-gradient(135deg,#dfb75c,#b38e43)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>SLICE</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden-mobile">
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
          <button onClick={onOpenCart} style={{
            position: "relative", display: "flex", alignItems: "center", gap: 8,
            padding: "9px 18px", borderRadius: 9999, cursor: "pointer",
            background: "rgba(223,183,92,0.08)", border: "1px solid rgba(223,183,92,0.25)",
            color: "#f4ede3", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans',sans-serif",
            transition: "all 0.2s",
          }}>
            <ShoppingCart size={16} />
            <span>Keranjang</span>
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
            <button onClick={() => setActiveSection("profile")} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
              borderRadius: 9999, cursor: "pointer",
              background: "rgba(244,237,227,0.06)", border: "1px solid rgba(244,237,227,0.12)",
              color: "#f4ede3", fontSize: 14, fontWeight: 500,
            }}>
              <User size={15} />
              <span>{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button onClick={onOpenLogin} style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 22px",borderRadius:9999,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#dfb75c,#b38e43)",color:"#050505",border:"none",cursor:"pointer",boxShadow:"0 4px 16px rgba(223,183,92,0.35)",whiteSpace:"nowrap" }}>
              Masuk
            </button>
          )}
        </div>
      </div>

      <style>{`.hidden-mobile { display: flex !important; } @media (max-width: 640px) { .hidden-mobile { display: none !important; } }`}</style>
    </header>
  );
}
