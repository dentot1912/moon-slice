"use client";

import React, { useState, useEffect } from "react";
import { Check, ChefHat, Flame, Package, Bike, Bell, Clock, Compass, Activity } from "lucide-react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  id: string;
  duration: string;
  deliveryType: "delivery" | "pickup";
  paymentMethod: string;
  address: string;
  items: OrderItem[];
  total: number;
}

interface OrderTrackerProps {
  activeOrder: OrderData | null;
  onOrderFinished: () => void;
}

const STEPS = [
  { key: "received",  label: "Transmisi Diterima",    desc: "Dapur orbit MoonSlice menerima pesanan Anda. Mengisi slot bahan segar hidroponik.", icon: Package,  dur: 5000, tag: "[TERDAFTAR]", color: "#dfb75c" },
  { key: "making",    label: "Fabrikasi Molekuler",   desc: "Koki kami menguleni adonan beragitasi mikro. Menyusun topping organik pilihan.", icon: ChefHat, dur: 5000, tag: "[FABRIKASI]", color: "#eddab9" },
  { key: "oven",      label: "Termal Oven 450°C",     desc: "Pizza dibakar presisi di oven batu termal supernova hingga pinggiran renyah sempurna.", icon: Flame,   dur: 5000, tag: "[PEMAKANAN]", color: "#e74c3c" },
  { key: "delivery",  label: "Mesin Warp Aktif",      desc: "Kurir logistik menghidupkan mesin roket warp. Menembus atmosfer stasiun orbit.", icon: Bike,   dur: 5000, tag: "[WARP_SPEED]", color: "#3498db" },
  { key: "delivered", label: "Darat Sempurna! 🎉",    desc: "Pendaratan pod logistik sukses. Ransum kosmik siap dinikmati astronot!", icon: Bell,  dur: 0,    tag: "[SELESAI]", color: "#2dba6a" },
];

export default function OrderTracker({ activeOrder, onOrderFinished }: OrderTrackerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length - 1) return;
    const t = setTimeout(() => setCurrentStep((s) => s + 1), STEPS[currentStep].dur);
    return () => clearTimeout(t);
  }, [currentStep]);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  if (!activeOrder) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center font-body" style={{ color: "#f4ede3" }}>
      <div className="text-6xl float-slow-1">📡</div>
      <h2 className="font-display text-4xl glow-text-lava">Tidak Ada Pesanan Aktif</h2>
      <p className="text-cream/40 text-sm max-w-xs" style={{ color: "rgba(244,237,227,0.4)" }}>Belum ada pesanan yang sedang diproses saat ini.</p>
    </div>
  );

  const done = currentStep >= STEPS.length - 1;

  return (
    <div className="min-h-screen site-bg font-body text-cream" style={{ color: "#f4ede3", overflow: "hidden" }}>
      <div className="mx-auto max-w-6xl px-6 py-20 tracker-wrapper" style={{ maxWidth: 1180, margin: "0 auto" }}>
        
        {/* Header telemetry deck */}
        <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }} className="tracker-header">
          <div>
            <div className="pill pill-lava mb-4" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span className="h-2 w-2 rounded-full bg-lava animate-pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#dfb75c", display: "inline-block" }} />
              PESANAN LOGISTIK BERJALAN
            </div>
            <h1 className="font-display glow-text-lava" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.95, color: "#f4ede3" }}>
              LACAK <span className="text-lava">PESANAN</span>
            </h1>
          </div>
          
          {/* Monospace telemetry code */}
          <div style={{ background: "rgba(13, 10, 8, 0.6)", padding: "16px 24px", borderRadius: 16, border: "1px solid rgba(244, 237, 227, 0.05)", textAlign: "right" }} className="telemetry-log">
            <p style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.35)", letterSpacing: "0.05em" }}>TRANSMISI ID</p>
            <p style={{ fontSize: 16, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#dfb75c", marginTop: 4 }}>{activeOrder.id}</p>
            <p style={{ fontSize: 10, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.3)", marginTop: 6 }}>WAKTU TERBANG: {fmt(elapsed)}</p>
          </div>
        </div>

        {/* Widescreen console grid layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "28px" }} className="tracker-grid">
          
          {/* Left Panel: Holographic radar & steps progress */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Holographic Warp Radar */}
            <div className="glass-panel" style={{
              padding: "28px",
              position: "relative",
              overflow: "hidden",
              background: "rgba(10, 8, 7, 0.95)",
              border: "1px solid rgba(223, 183, 92, 0.15)",
              boxShadow: "0 0 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(223, 183, 92, 0.05)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(244,237,227,0.08)", paddingBottom: "12px", marginBottom: "20px" }}>
                <span className="tag tag-gold" style={{ display: "flex", alignItems: "center", gap: 6, letterSpacing: "0.15em" }}>
                  <Compass size={11} className="spin-slow" /> LOGISTIK RADAR ORBITAL
                </span>
                <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: "rgba(223, 183, 92, 0.6)" }}>
                  COORDINATE // MOON_DOCK_99
                </span>
              </div>

              {/* Radar Circular Visuals */}
              <div style={{
                height: "220px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(5, 5, 5, 0.6)",
                borderRadius: "18px",
                border: "1px solid rgba(244, 237, 227, 0.04)",
                overflow: "hidden"
              }}>
                {/* Radar Grid Line Overlay */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(223, 183, 92, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(223, 183, 92, 0.03) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                {/* Satellite Radar Sweeper Line */}
                <div className="radar-sweeper" style={{
                  position: "absolute",
                  width: "150%",
                  height: "150%",
                  background: "conic-gradient(from 0deg, rgba(223, 183, 92, 0.08) 0deg, transparent 90deg)",
                  transformOrigin: "center center",
                  pointerEvents: "none"
                }} />

                <svg viewBox="0 0 400 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                  {/* Orbit Rings */}
                  <circle cx="200" cy="110" r="90" fill="none" stroke="rgba(244, 237, 227, 0.05)" strokeDasharray="3 3" />
                  <circle cx="200" cy="110" r="60" fill="none" stroke="rgba(223, 183, 92, 0.08)" strokeDasharray="3 3" />
                  <circle cx="200" cy="110" r="30" fill="none" stroke="rgba(244, 237, 227, 0.03)" />

                  {/* Trajectory Parabolic Flight Path */}
                  <path
                    d="M 50,180 Q 200,60 350,180"
                    fill="none"
                    stroke="rgba(223, 183, 92, 0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  {/* Dynamic tracking arc (drawn up to current progress) */}
                  <path
                    d="M 50,180 Q 200,60 350,180"
                    fill="none"
                    stroke="#dfb75c"
                    strokeWidth="2"
                    strokeDasharray="500"
                    strokeDashoffset={500 - (currentStep / (STEPS.length - 1)) * 500}
                    style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
                  />

                  {/* Stasiun Orbit (MoonSlice HQ) */}
                  <g>
                    <circle cx="50" cy="180" r="16" fill="rgba(223, 183, 92, 0.15)" stroke="#dfb75c" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px rgba(223,183,92,0.3))" }} />
                    <text x="50" y="184" fontSize="13" textAnchor="middle" dominantBaseline="middle">🏪</text>
                    <text x="50" y="206" fontSize="7" fontFamily="'Space Mono', monospace" fill="rgba(244,237,227,0.4)" textAnchor="middle">MOON_DOCK</text>
                  </g>

                  {/* Landing Coordinates (Astronot Base) */}
                  <g>
                    <circle cx="350" cy="180" r="16" fill="rgba(45, 186, 106, 0.15)" stroke="#2dba6a" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 4px rgba(45,186,106,0.3))" }} />
                    <text x="350" y="184" fontSize="13" textAnchor="middle" dominantBaseline="middle">🏠</text>
                    <text x="350" y="206" fontSize="7" fontFamily="'Space Mono', monospace" fill="rgba(244,237,227,0.4)" textAnchor="middle">BASE_CAMP</text>
                  </g>

                  {/* Orbit Spacecraft pod (Rocket) */}
                  {(() => {
                    const pct = currentStep / (STEPS.length - 1);
                    const t = pct;
                    const rx = (1-t)*(1-t)*50 + 2*(1-t)*t*200 + t*t*350; 
                    const ry = (1-t)*(1-t)*180 + 2*(1-t)*t*60 + t*t*180;
                    
                    return (
                      <g style={{ transition: "all 0.8s ease-in-out" }}>
                        <circle cx={rx} cy={ry} r="16" fill="rgba(223, 183, 92, 0.25)" stroke="#dfb75c" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 6px rgba(223,183,92,0.6))" }} />
                        <text x={rx} y={ry + 4} fontSize="14" textAnchor="middle" dominantBaseline="middle">🚀</text>
                      </g>
                    );
                  })()}

                  {/* Active radar ping at landing base when rocket arrives */}
                  {currentStep === STEPS.length - 1 && (
                    <circle cx="350" cy="180" r="16" fill="none" stroke="#2dba6a" strokeWidth="2" opacity="0.8">
                      <animate attributeName="r" values="16;36" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </svg>
              </div>

              {/* Status details bar */}
              <div style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(13, 10, 8, 0.6)",
                padding: "10px 18px",
                borderRadius: "12px",
                border: "1px solid rgba(244,237,227,0.05)"
              }}>
                <div>
                  <span style={{ display: "block", fontSize: "7px", fontFamily: "'Space Mono', monospace", color: "rgba(244,237,227,0.3)" }}>STATUS KORIDOR</span>
                  <span style={{ fontSize: "11px", fontFamily: "'Space Mono', monospace", fontWeight: 700, color: STEPS[currentStep].color }}>
                    {STEPS[currentStep].tag} {STEPS[currentStep].label.toUpperCase()}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ display: "block", fontSize: "7px", fontFamily: "'Space Mono', monospace", color: "rgba(244,237,227,0.3)" }}>KECEPATAN ANTAR</span>
                  <span style={{ fontSize: "11px", fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#dfb75c" }}>
                    {currentStep === 3 ? "0.98c WARP" : currentStep === 4 ? "STASIONER" : "ATMOSFERIK"}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Timeline Manifest */}
            <div className="glass-panel" style={{
              padding: "32px 28px",
              background: "rgba(10, 8, 7, 0.95)",
              border: "1px solid rgba(244, 237, 227, 0.06)"
            }}>
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "28px" }}>
                
                {/* Visual Vertical Progress Tracker Line */}
                <div style={{
                  position: "absolute",
                  left: "22px",
                  top: "24px",
                  bottom: "24px",
                  width: "2px",
                  background: "rgba(244, 237, 227, 0.05)"
                }} />
                <div style={{
                  position: "absolute",
                  left: "22px",
                  top: "24px",
                  width: "2px",
                  background: "linear-gradient(180deg, #dfb75c, #e74c3c, #2dba6a)",
                  height: `${(currentStep / (STEPS.length - 1)) * 90}%`,
                  boxShadow: "0 0 10px rgba(223, 183, 92, 0.4)",
                  transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />

                {STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  const isComplete = idx < currentStep;
                  const isActive = idx === currentStep;

                  return (
                    <div key={step.key} style={{
                      position: "relative",
                      display: "flex",
                      gap: "24px",
                      opacity: isActive || isComplete ? 1 : 0.35,
                      transition: "opacity 0.5s ease"
                    }}>
                      {/* Step Circle Bubble */}
                      <div className="shimmer-fast" style={{
                        position: "relative",
                        zIndex: 10,
                        height: "46px",
                        width: "46px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid",
                        borderColor: isComplete ? "#2dba6a" : isActive ? step.color : "rgba(244, 237, 227, 0.12)",
                        background: isComplete ? "rgba(45, 186, 106, 0.1)" : isActive ? "rgba(13, 10, 8, 0.95)" : "rgba(18, 14, 11, 0.8)",
                        boxShadow: isComplete ? "0 0 15px rgba(45, 186, 106, 0.2)" : isActive ? `0 0 20px ${step.color}aa` : "none",
                        color: isComplete ? "#2dba6a" : isActive ? step.color : "rgba(244, 237, 227, 0.25)",
                        transition: "all 0.5s ease",
                        flexShrink: 0
                      }}>
                        {isComplete ? (
                          <Check size={18} strokeWidth={3} />
                        ) : (
                          <StepIcon size={18} />
                        )}
                      </div>

                      {/* Step Details Manifest */}
                      <div style={{ paddingTop: "4px", paddingBottom: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                          <span style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: isActive ? "#f4ede3" : isComplete ? "rgba(244, 237, 227, 0.65)" : "rgba(244, 237, 227, 0.25)",
                            fontFamily: "'DM Sans', sans-serif"
                          }}>
                            {step.label}
                          </span>
                          {isActive && (
                            <span className="tag tag-lava animate-pulse" style={{
                              fontSize: "7px",
                              padding: "2px 8px",
                              borderRadius: 4,
                              background: "rgba(223, 183, 92, 0.12)",
                              border: `1.5px solid ${step.color}`,
                              color: step.color
                            }}>SEKARANG AKTIF</span>
                          )}
                        </div>
                        {(isActive || isComplete) && (
                          <p style={{
                            fontSize: "12px",
                            color: "rgba(244, 237, 227, 0.4)",
                            lineHeight: 1.6,
                            maxWidth: "420px"
                          }}>
                            {step.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Warp Arrival Complete CTA */}
              {done && (
                <div style={{
                  marginTop: "28px",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(45, 186, 106, 0.15) 0%, rgba(45, 186, 106, 0.03) 100%)",
                  border: "1.5px solid rgba(45, 186, 106, 0.35)",
                  boxShadow: "0 0 15px rgba(45, 186, 106, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 16
                }}>
                  <div>
                    <h4 className="font-display" style={{ fontSize: "16px", color: "#f4ede3" }}>PIZZA SUDAH TIBA! 🍕</h4>
                    <p style={{ fontSize: "12px", color: "rgba(244, 237, 227, 0.45)", marginTop: 4 }}>Selamat menikmati ransum orbital MoonSlice terlezat!</p>
                  </div>
                  <button onClick={onOrderFinished} className="btn-lava pulse-glow-lava" style={{
                    padding: "10px 24px",
                    borderRadius: 9999,
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    background: "linear-gradient(135deg, #2dba6a 0%, #219a55 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 4px 12px rgba(45, 186, 106, 0.35)",
                    color: "#050505"
                  }}>
                    TUTUP PESANAN
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Manifest cargo billing receipt & ETA details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Realtime Warp ETA Tracker */}
            <div className="glass-panel" style={{
              padding: "24px",
              background: "rgba(10, 8, 7, 0.95)",
              border: "1px solid rgba(244, 237, 227, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <span style={{ display: "block", fontSize: "8px", fontFamily: "'Space Mono', monospace", color: "rgba(244,237,227,0.35)", letterSpacing: "0.15em" }}>ESTIMASI TIBA (ETA)</span>
                <span className="font-display" style={{ fontSize: "28px", color: "#dfb75c", display: "block", marginTop: 4 }}>{activeOrder.duration}</span>
              </div>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(223, 183, 92, 0.05)",
                border: "1px solid rgba(223, 183, 92, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(223, 183, 92, 0.35)"
              }}>
                <Clock size={20} />
              </div>
            </div>

            {/* Cargo Manifest Billing Panel */}
            <div className="glass-panel" style={{
              padding: "28px",
              background: "rgba(10, 8, 7, 0.95)",
              border: "1px solid rgba(223, 183, 92, 0.12)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "repeating-linear-gradient(90deg, #dfb75c, #dfb75c 10px, transparent 10px, transparent 20px)" }} />
              
              <h3 className="font-display" style={{ fontSize: "16px", color: "#f4ede3", marginBottom: "16px", display: "flex", alignItems: "center", gap: 10 }}>
                <Activity size={16} color="#dfb75c" /> SPESIFIKASI MANIFEST CARGO
              </h3>
              
              <div className="lava-divider" style={{ opacity: 0.3 }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(244, 237, 227, 0.4)" }}>Mode Transpor</span>
                  <span style={{ color: "#f4ede3", fontWeight: 600 }}>
                    {activeOrder.deliveryType === "delivery" ? "🛵 Warp Logistics Antar" : "🏪 Orbit Dock Ambil"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(244, 237, 227, 0.4)" }}>Metode Pembayaran</span>
                  <span style={{ color: "#f4ede3", fontWeight: 600 }}>{activeOrder.paymentMethod}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ color: "rgba(244, 237, 227, 0.4)" }}>Titik Koordinat Tujuan</span>
                  <span style={{ color: "rgba(244, 237, 227, 0.75)", fontSize: "11px", lineHeight: 1.5 }}>{activeOrder.address}</span>
                </div>
              </div>

              <div className="lava-divider" style={{ opacity: 0.3 }} />

              {/* Items list with dashed dividers */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {activeOrder.items.map((item: OrderItem, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px" }}>
                    <span style={{ color: "rgba(244, 237, 227, 0.65)" }}>
                      {item.name} <span style={{ fontFamily: "'Space Mono', monospace", color: "rgba(223, 183, 92, 0.45)" }}>×{item.quantity}</span>
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", color: "#f4ede3" }}>
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="lava-divider" style={{ opacity: 0.3 }} />
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "rgba(244, 237, 227, 0.5)", fontWeight: "bold", fontSize: "13px" }}>TOTAL HARGA RANSUM</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: "bold", fontSize: "20px", color: "#dfb75c" }}>
                  Rp {activeOrder.total.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Futuristic Cargo Barcode */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: "24px", opacity: 0.35 }}>
                <div style={{
                  width: "100%",
                  height: "36px",
                  background: "repeating-linear-gradient(90deg, #f4ede3, #f4ede3 2px, transparent 2px, transparent 8px, #f4ede3 8px, #f4ede3 12px, transparent 12px, transparent 16px)"
                }} />
                <span style={{ fontSize: "8px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.25em" }}>MS_SEC_DOCK_A_MANIFEST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Radar Animations */}
      <style>{`
        @keyframes radar-sweep {
          to { transform: rotate(360deg); }
        }
        .radar-sweeper {
          animation: radar-sweep 6s linear infinite;
        }
        @media (max-width: 820px) {
          .tracker-wrapper { padding: 32px 16px !important; }
          .tracker-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .telemetry-log { text-align: left !important; width: 100% !important; }
          .tracker-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
