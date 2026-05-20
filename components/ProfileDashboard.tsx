"use client";

import React, { useState } from "react";
import {
  User, Award, MapPin, History, LogOut, Plus, Star,
  Package, ChevronRight, Send, Shield, Rocket, X,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  rank?: string;
  points?: number;
  addresses?: string[];
}
interface ProfileDashboardProps {
  user: UserProfile | null | undefined;
  onLogout: () => void;
  onSelectSection: (section: string) => void;
}

const G = {
  gold: "#dfb75c", darkGold: "#b38e43", cream: "#f4ede3",
  dim: "rgba(244,237,227,0.4)", faint: "rgba(244,237,227,0.06)",
  border: "rgba(223,183,92,0.18)", borderFaint: "rgba(244,237,227,0.06)",
  green: "#2dba6a", red: "#c0392b",
  panel: "rgba(14,11,9,0.9)", crust: "rgba(22,17,14,0.85)",
};

const RANKS = [
  { name: "Rookie",    pts: 0,    color: G.dim,   icon: "🌑", desc: "Misi perdana" },
  { name: "Astronot",  pts: 500,  color: G.gold,  icon: "🌕", desc: "Penerbangan reguler" },
  { name: "Komandan",  pts: 1500, color: "#e5c96f",icon: "⭐", desc: "Kelas elit" },
  { name: "Laksamana", pts: 5000, color: "#fff8e1",icon: "🌟", desc: "Puncak kosmik" },
];

const MOCK_ORDERS = [
  { id: "MS-4029", date: "12 Apr 2025", items: "Supernova Cheese + Keju Ekstra", total: 83000,  status: "Terkirim",  statusColor: G.green },
  { id: "MS-3982", date: "28 Nov 2024", items: "Meteor Meat Lovers × 2",         total: 196000, status: "Terkirim",  statusColor: G.green },
  { id: "MS-3841", date: "5 Agu 2024",  items: "Black Hole Truffle",             total: 120000, status: "Diambil",   statusColor: G.gold  },
];

export default function ProfileDashboard({ user, onLogout, onSelectSection }: ProfileDashboardProps) {
  const [addresses, setAddresses] = useState<string[]>(user?.addresses ?? []);
  const [newAddress, setNewAddress] = useState("");
  const [addingAddr, setAddingAddr] = useState(false);

  const userPts  = user?.points ?? 0;
  const rank     = [...RANKS].reverse().find(r => userPts >= r.pts) ?? RANKS[0];
  const nextRank = RANKS.find(r => r.pts > userPts);
  const pct      = nextRank ? Math.min((userPts / nextRank.pts) * 100, 100) : 100;

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    setAddresses([...addresses, newAddress.trim()]);
    setNewAddress("");
    setAddingAddr(false);
  };

  return (
    <div className="pizza-bg font-body" style={{ minHeight: "100vh", color: G.cream, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 0" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 40 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>
            <Shield size={12} /> Dok Pribadi
          </div>
          <h1 className="font-display glow-text-lava"
            style={{ fontSize: "clamp(48px,7vw,80px)", lineHeight: 0.88, color: G.cream }}>
            PROFIL<br /><span className="text-lava">PENGGUNA</span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, alignItems: "start" }}
          className="profile-grid">

          {/* ══════════ LEFT SIDEBAR ══════════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Avatar card */}
            <div className="bento-card" style={{ padding: 28, position: "relative", overflow: "hidden" }}>
              {/* Background nebula */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180,
                borderRadius: "50%", background: "radial-gradient(circle, rgba(223,183,92,0.1) 0%, transparent 70%)",
                pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, transparent, rgba(223,183,92,0.5), transparent)" }} />

              {/* Avatar circle */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                gap: 16, position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%",
                    background: G.crust, border: `2px solid ${G.border}`,
                    boxShadow: `0 0 24px rgba(223,183,92,0.15)`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
                    🧑‍🚀
                  </div>
                  <div style={{ position: "absolute", bottom: 0, right: 0,
                    width: 22, height: 22, borderRadius: "50%",
                    background: "linear-gradient(135deg, #dfb75c, #b38e43)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "2px solid #050505", fontSize: 10 }}>
                    {rank.icon}
                  </div>
                </div>

                {/* Name */}
                <div style={{ textAlign: "center" }}>
                  <h2 className="font-display" style={{ fontSize: 22, color: G.cream }}>
                    User
                  </h2>
                  <p style={{ fontSize: 11, color: "rgba(244,237,227,0.3)",
                    fontFamily: "'Space Mono', monospace", marginTop: 4 }}>
                    user@gmail.com
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6,
                    marginTop: 10, padding: "5px 14px", borderRadius: 9999,
                    background: "rgba(223,183,92,0.1)", border: `1px solid ${G.border}`,
                    fontSize: 10, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                    color: G.gold }}>
                    <Award size={10} /> {rank.name} · {rank.desc}
                  </div>
                </div>

                {/* Points progress */}
                <div style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between",
                    marginBottom: 8, fontSize: 11, fontFamily: "'Space Mono', monospace" }}>
                    <span style={{ color: "rgba(244,237,227,0.35)" }}>
                      Poin: <strong style={{ color: G.cream }}>{userPts.toLocaleString()}</strong>
                    </span>
                    {nextRank && (
                      <span style={{ color: "rgba(244,237,227,0.25)" }}>
                        Target: {nextRank.pts.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill-lava" style={{ width: `${pct}%` }} />
                  </div>
                  {nextRank && (
                    <p style={{ fontSize: 10, color: "rgba(244,237,227,0.25)",
                      fontFamily: "'Space Mono', monospace", marginTop: 6, textAlign: "center" }}>
                      {(nextRank.pts - userPts).toLocaleString()} poin lagi → {nextRank.name} {nextRank.icon}
                    </p>
                  )}
                </div>

                {/* Logout button */}
                <button onClick={onLogout} style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: "11px 0", borderRadius: 9999, cursor: "pointer",
                  background: "rgba(192,57,43,0.07)", border: "1px solid rgba(192,57,43,0.2)",
                  color: "rgba(192,57,43,0.7)", fontSize: 13, fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,57,43,0.14)"; e.currentTarget.style.color = G.red; e.currentTarget.style.borderColor = "rgba(192,57,43,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(192,57,43,0.07)"; e.currentTarget.style.color = "rgba(192,57,43,0.7)"; e.currentTarget.style.borderColor = "rgba(192,57,43,0.2)"; }}
                >
                  <LogOut size={15} /> Keluar dari Dok
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Total Pesanan",     value: MOCK_ORDERS.length.toString(), icon: Rocket, color: G.gold },
                { label: "Rating Anda",    value: "★ 4.9",                       icon: Star,   color: "#f5c842" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bento-card" style={{ padding: "18px 14px", textAlign: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10,
                      background: "rgba(223,183,92,0.08)", border: `1px solid ${G.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 10px" }}>
                      <Icon size={16} color={s.color} />
                    </div>
                    <p className="font-display" style={{ fontSize: 22, color: G.cream }}>{s.value}</p>
                    <p style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                      color: "rgba(244,237,227,0.28)", marginTop: 4, letterSpacing: "0.08em",
                      textTransform: "uppercase" }}>{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════ RIGHT CONTENT ══════════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Saved Addresses */}
            <div className="bento-card" style={{ padding: 26 }}>
              <div style={{ display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10,
                    background: "rgba(223,183,92,0.08)", border: `1px solid ${G.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={15} color={G.gold} />
                  </div>
                  <h3 className="font-display" style={{ fontSize: 20, color: G.cream }}>
                    ALAMAT TERSIMPAN
                  </h3>
                </div>
                {!addingAddr && (
                  <button onClick={() => setAddingAddr(true)} style={{
                    display: "flex", alignItems: "center", gap: 6, fontSize: 12,
                    fontWeight: 700, color: G.gold, background: "rgba(223,183,92,0.08)",
                    border: `1px solid ${G.border}`, borderRadius: 9999,
                    padding: "6px 14px", cursor: "pointer", transition: "all 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(223,183,92,0.14)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(223,183,92,0.08)"}
                  >
                    <Plus size={12} /> Tambah
                  </button>
                )}
              </div>
              <div className="lava-divider" />

              {addingAddr && (
                <form onSubmit={handleAddAddress} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <MapPin size={13} style={{ position: "absolute", left: 12, top: "50%",
                      transform: "translateY(-50%)", color: "rgba(223,183,92,0.4)", pointerEvents: "none" }} />
                    <input value={newAddress} onChange={e => setNewAddress(e.target.value)}
                      placeholder="Jl. Contoh No. 1, Kota..."
                      className="field" style={{ paddingLeft: 36, fontSize: 13 }} autoFocus />
                  </div>
                  <button type="submit" className="btn-primary" style={{ padding: "0 16px", flexShrink: 0 }}>
                    <Send size={14} />
                  </button>
                  <button type="button" onClick={() => setAddingAddr(false)}
                    style={{ padding: "0 12px", background: "rgba(244,237,227,0.04)",
                      border: `1px solid ${G.borderFaint}`, borderRadius: 12,
                      cursor: "pointer", color: "rgba(244,237,227,0.3)" }}>
                    <X size={14} />
                  </button>
                </form>
              )}

              {addresses.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {addresses.map((addr, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 16px", borderRadius: 14,
                      background: G.crust, border: `1px solid ${G.borderFaint}` }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                        background: "rgba(223,183,92,0.08)", border: `1px solid ${G.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MapPin size={13} color={G.gold} />
                      </div>
                      <p style={{ fontSize: 13, color: "rgba(244,237,227,0.65)", lineHeight: 1.4 }}>{addr}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "24px 0", color: "rgba(244,237,227,0.2)" }}>
                  <MapPin size={28} style={{ margin: "0 auto 8px", opacity: 0.3 }} />
                  <p style={{ fontSize: 13 }}>Belum ada alamat tersimpan</p>
                </div>
              )}
            </div>

            {/* Order History */}
            <div className="bento-card" style={{ padding: 26 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10,
                  background: "rgba(223,183,92,0.08)", border: `1px solid ${G.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <History size={15} color={G.gold} />
                </div>
                <h3 className="font-display" style={{ fontSize: 20, color: G.cream }}>
                  LOG PESANAN
                </h3>
              </div>
              <div className="lava-divider" />

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} style={{
                    display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
                    borderRadius: 16, background: G.crust, border: `1px solid ${G.borderFaint}`,
                    transition: "all 0.25s", cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.background = "rgba(26,20,16,0.95)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = G.borderFaint; e.currentTarget.style.background = G.crust; }}
                  >
                    {/* Status dot */}
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `${order.statusColor}12`,
                      border: `1px solid ${order.statusColor}35`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Package size={14} color={order.statusColor} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace",
                          fontWeight: 700, color: G.gold }}>{order.id}</span>
                        <span style={{ fontSize: 9, color: "rgba(244,237,227,0.2)" }}>·</span>
                        <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace",
                          color: "rgba(244,237,227,0.25)" }}>{order.date}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "rgba(244,237,227,0.6)",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {order.items}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%",
                          background: order.statusColor,
                          boxShadow: `0 0 6px ${order.statusColor}` }} />
                        <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                          fontWeight: 700, color: order.statusColor, textTransform: "uppercase",
                          letterSpacing: "0.08em" }}>{order.status}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                        fontSize: 14, color: G.gold }}>
                        Rp {order.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => onSelectSection("menu")} style={{
                marginTop: 18, width: "100%", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8, padding: "12px 0",
                borderRadius: 12, cursor: "pointer",
                background: "rgba(223,183,92,0.06)", border: `1px solid ${G.border}`,
                color: G.gold, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.25s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(223,183,92,0.12)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(223,183,92,0.06)"}
              >
                <Rocket size={14} /> Pesan Lagi <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
