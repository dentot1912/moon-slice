"use client";
import React, { useState } from "react";
import { X, Eye, EyeOff, Flame, ShieldCheck, User } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  rank?: string;
  points?: number;
  addresses?: string[];
}

interface LoginModalProps { isOpen: boolean; onClose: () => void; onLoginSuccess: (u: UserProfile) => void; }

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    onLoginSuccess({ name: tab === "register" ? name : (email.split("@")[0] || "Pelanggan"), email, rank: "Regular Member", points: 175, addresses: [] });
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }} />

      <div className="glass-card" style={{
        position: "relative", width: "100%", maxWidth: 400,
        animation: "scale-in 0.2s ease", zIndex: 10,
      }}>
        {/* Top glow accent */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 2, background: "linear-gradient(90deg,transparent,rgba(223,183,92,0.6),transparent)", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(223,183,92,0.1),transparent 70%)", pointerEvents: "none" }} />

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "rgba(244,237,227,0.3)", padding: 4 }}>
          <X size={18} />
        </button>

        <div style={{ padding: "32px 28px" }}>
          {/* Brand header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(223,183,92,0.12)", border: "1px solid rgba(223,183,92,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Flame size={22} color="#dfb75c" />
            </div>
            <div>
              <h2 className="font-display" style={{ fontSize: 26, color: "#f4ede3", lineHeight: 1 }}>
                {tab === "login" ? "MASUK" : "DAFTAR"}
              </h2>
              <p style={{ fontSize: 11, color: "rgba(244,237,227,0.3)", fontFamily: "'Space Mono',monospace", marginTop: 2 }}>MoonSlice Pizza</p>
            </div>
          </div>

          {/* Tab switcher */}
          <div style={{ display: "flex", gap: 2, padding: 4, background: "rgba(26,20,16,0.8)", border: "1px solid rgba(244,237,227,0.07)", borderRadius: 9999, marginBottom: 24 }}>
            {(["login", "register"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex: 1, padding: "9px 0", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif", transition: "all 0.25s",
                background: tab === t ? "linear-gradient(135deg,#dfb75c,#b38e43)" : "transparent",
                color: tab === t ? "#050505" : "rgba(244,237,227,0.4)",
                border: "none",
                boxShadow: tab === t ? "0 2px 10px rgba(223,183,92,0.35)" : "none",
              }}>{t === "login" ? "Masuk" : "Daftar"}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {tab === "register" && (
              <div>
                <label style={{ display: "block", fontSize: 10, fontFamily: "'Space Mono',monospace", color: "rgba(244,237,227,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Nama Lengkap</label>
                <div style={{ position: "relative" }}>
                  <User size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(244,237,227,0.25)" }} />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe"
                    className="field" style={{ paddingLeft: 40 }} />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: 10, fontFamily: "'Space Mono',monospace", color: "rgba(244,237,227,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="kamu@email.com"
                className="field" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 10, fontFamily: "'Space Mono',monospace", color: "rgba(244,237,227,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                  className="field" style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(244,237,227,0.3)", padding: 0 }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px 0",width:"100%",borderRadius:9999,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:14,background:"linear-gradient(135deg,#dfb75c,#b38e43)",color:"#050505",border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(223,183,92,0.4)",marginTop:8,opacity:loading?0.7:1 }}>
              {loading
                ? <span style={{ opacity: 0.8 }}>Memproses...</span>
                : <><ShieldCheck size={16} /> {tab === "login" ? "Masuk Sekarang" : "Buat Akun"}</>
              }
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 10, fontFamily: "'Space Mono',monospace", color: "rgba(244,237,227,0.15)", marginTop: 20 }}>
            Demo: isi email & password apapun
          </p>
        </div>
      </div>
    </div>
  );
}
