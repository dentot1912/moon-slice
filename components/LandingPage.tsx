"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Flame, Clock, Leaf, Users, ChevronRight, ShieldCheck, Star, ChevronDown, Radio, HelpCircle, Compass, Sparkles } from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  rank?: string;
  points?: number;
  addresses?: string[];
}

interface LandingPageProps {
  onOrderNow: () => void;
  onOpenLogin: () => void;
  user: UserProfile | null | undefined;
  onAddToCart: (p: { id: string; name: string; price: number; image: string }, toppings: string[], price: number) => void;
}



const featuredPizzas = [
  {
    id: "supernova-cheese",
    name: "Supernova Cheese",
    price: 78000,
    image: "/pizza-cheese.png",
    tag: "Terfavorit",
    tagClass: "tag-gold",
    badgeClass: "tag-gold",
    desc: "Lautan keju mozzarella impor, saus pomodoro organik San Marzano, oregano galaksi.",
    macros: [
      { label: "KALORI", val: "820 kkal", pct: 68 },
      { label: "PROTEIN", val: "32g", pct: 55 },
      { label: "LEMAK", val: "28g", pct: 42 }
    ],
    colorTheme: "rgba(223, 183, 92, 0.3)",
    colorThemeSecondary: "rgba(223, 183, 92, 0.15)",
    accent: "#dfb75c",
    lore: "Keju mozzarella pilihan difermentasi dalam mikrogravitasi konstan untuk tekstur elastisitas nebula yang sempurna.",
    gravity: "0.8g Orbit",
    ovenTemp: "450°C",
    fermentation: "72 Jam Orbit",
  },
  {
    id: "meteor-meat-lovers",
    name: "Meteor Meat Lovers",
    price: 98000,
    image: "/pizza-meat.png",
    tag: "Best Seller",
    tagClass: "tag-lava",
    badgeClass: "tag-lava",
    desc: "Hujan pepperoni renyah, sosis premium, daging cincang terkaramelisasi, double cheese.",
    macros: [
      { label: "KALORI", val: "1020 kkal", pct: 85 },
      { label: "PROTEIN", val: "52g", pct: 88 },
      { label: "LEMAK", val: "45g", pct: 70 }
    ],
    colorTheme: "rgba(192, 57, 43, 0.35)",
    colorThemeSecondary: "rgba(192, 57, 43, 0.18)",
    accent: "#c0392b",
    lore: "Kombinasi protein hewani kosmis premium dipanggang kilat dengan fusi api bintang yang meletup-letup.",
    gravity: "1.0g Standard",
    ovenTemp: "480°C Presisi",
    fermentation: "72 Jam Orbit",
  },
  {
    id: "black-hole-truffle",
    name: "Black Hole Truffle",
    price: 120000,
    image: "/pizza-truffle.png",
    tag: "Premium",
    tagClass: "tag-cream",
    badgeClass: "tag-cream",
    desc: "Saus krim truffle hitam aromatis, jamur liar portobello, parutan parmesan premium.",
    macros: [
      { label: "KALORI", val: "920 kkal", pct: 76 },
      { label: "PROTEIN", val: "26g", pct: 44 },
      { label: "LEMAK", val: "52g", pct: 80 }
    ],
    colorTheme: "rgba(142, 68, 173, 0.3)",
    colorThemeSecondary: "rgba(142, 68, 173, 0.15)",
    accent: "#9b59b6",
    lore: "Aroma mewah truffle hitam yang diselimuti jamur liar dari kawah stasiun orbit MoonSlice.",
    gravity: "0.0g Nol Gravitasi",
    ovenTemp: "460°C Konstan",
    fermentation: "96 Jam Deep Space",
  },
];

export default function LandingPage({ onOrderNow, onOpenLogin, user, onAddToCart }: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [embers] = useState<{ id: number; left: number; size: number; delay: number; dur: number; color: string }[]>(() => {
    const colors = ["#dfb75c", "#eddab9", "#f4ede3", "#b38e43"];
    return Array.from({ length: 26 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 10,
      dur: Math.random() * 7 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  });
  const [activeCraftTab, setActiveCraftTab] = useState(0);
  const [activePizzaIdx, setActivePizzaIdx] = useState(0);

  const highlights = [
    { icon: Flame, title: "Oven Batu Fusi 450°C", sub: "Pinggiran renyah macan tutul kosmik" },
    { icon: Leaf, title: "100% Bahan Organik Orbit", sub: "Tanpa rekayasa genetik, segar & murni" },
    { icon: Clock, title: "Warp Delivery 30 Menit", sub: "Lebih lambat? 100% GRATIS" },
    { icon: Users, title: "10K+ Astronot Puas", sub: "Rating indeks kepuasan bintang ★ 4.9" },
  ];

  const craftTabs = [
    {
      title: "Gravitasi Mikro",
      desc: "Kami memfermentasikan adonan pizza artisanal kami selama 72 jam di dalam ruang gravitasi nol stasiun orbit. Proses ini menghasilkan struktur gelembung udara kosmik yang super mengembang, menghasilkan pinggiran roti yang luar biasa renyah namun tetap lembut bagai awan di dalam.",
      stats: "Struktur adonan +40% lebih aerasi",
    },
    {
      title: "Reaktor Fusi Termal",
      desc: "Setiap pizza dipanggang secepat kilat selama tepat 90 detik dalam oven batu reaktor termal berkekuatan 450°C. Panas intensif memicu karamelisasi kilat (leopard spotting) kosmik yang memberikan aroma kayu bakar berasap (smoky) yang khas Italia sejati.",
      stats: "Pemanggangan presisi 90 Detik",
    },
    {
      title: "Bahan Orbit Hidroponik",
      desc: "Bahan-bahan kami dipetik langsung dari rumah kaca hidroponik berteknologi tinggi di orbit. Kami menggunakan tomat San Marzano murni tanpa MSG, minyak zaitun perasan dingin murni, serta keju mozzarella segar yang diputar secara tradisional untuk cita rasa legendaris.",
      stats: "100% Segar Tanpa Bahan Pengawet",
    },
  ];

  const reviews = [
    { name: "Komandan Andi S.", text: "Keju mozzarellanya melar indah bagaikan kabut nebula! Tekstur rotinya sangat renyah dengan isian gurih melimpah. Pizza terbaik di alam semesta!", rating: 5, avatar: "👨‍🚀" },
    { name: "Astronot Bella R.", text: "Saya memesan Meteor Meat Lovers jam 10 malam, tiba dalam 22 menit dan masih berasap panas! Layanan roket antar yang luar biasa presisi.", rating: 5, avatar: "👩‍🚀" },
    { name: "Doktor Cahyo W.", text: "Black Hole Truffle-nya memiliki aroma legendaris yang langsung menyelimuti ruangan. Pengalaman fine dining bintang lima di ruang makan kami.", rating: 5, avatar: "👽" },
  ];

  const faqs = [
    { q: "Bagaimana cara kerja jaminan pengiriman 30 menit?", a: "Sejak sensor docking kami mengonfirmasi pesanan Anda, roket logistik kurir kami akan meluncur. Jika pesanan Anda tiba lebih dari 30 menit, pizza tersebut 100% gratis tanpa syarat apa pun." },
    { q: "Dapatkah saya memesan pizza setengah-setengah (half & half)?", a: "Tentu saja! Pada panel kustomisasi menu utama, Anda dapat merancang pizza dengan membagi kombinasi topping kosmik sesuka hati." },
    { q: "Bagaimana pizza tetap hangat saat pengiriman?", a: "Kami menggunakan 'Thermal Shield Pods' berinsulasi komposit karbon yang menahan suhu panas oven tetap stabil layaknya suhu pemanggangan asli hingga tiba di pintu Anda." },
    { q: "Bagaimana cara mendapatkan diskon Astronot Baru?", a: "Cukup masukkan kode promo PIZZA20 di panel checkout untuk langsung memotong harga pesanan pertama Anda sebesar 20%!" },
  ];

  return (
    <div className="site-bg font-body" style={{ color: "#f4ede3", overflow: "hidden" }}>
      {/* Dynamic Stardust Particle Field */}
      <div className="stars-overlay">
        {embers.map(e => (
          <div
            key={e.id}
            className="ember-particle"
            style={{
              left: `${e.left}%`,
              bottom: 0,
              width: e.size,
              height: e.size,
              background: e.color,
              opacity: 0.8,
              "--delay": `${e.delay}s`,
              "--dur": `${e.dur}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", borderBottom: "1px solid rgba(244,237,227,0.06)", overflow: "hidden", padding: "80px 0 40px" }}>
        {/* Deep Space Glowing Nebulas */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(223,183,92,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(223, 183, 92, 0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", width: "100%", position: "relative", zIndex: 10 }} className="hero-grid">
          {/* Left Hero Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <span className="tag tag-lava animate-pulse" style={{ alignSelf: "flex-start", gap: 8, padding: "6px 14px" }}>
              <Radio size={12} className="glow-text-lava" /> RANSUM KOSMIK TERENKRAPSI AKTIF
            </span>

            <div>
              <h1 className="font-display glow-text-lava" style={{ fontSize: "clamp(56px, 7vw, 92px)", color: "#f4ede3", lineHeight: 0.9 }}>
                PIZZA<br />
                <span className="text-lava">KOSMIS</span><br />
                TERBAIK DI ALAM SEMESTA
              </h1>
            </div>

            <p style={{ color: "rgba(244,237,227,0.55)", fontSize: 16, lineHeight: 1.65, maxWidth: 480 }}>
              Adonan difermentasikan dalam gravitasi mikro di orbit stasiun antariksa MoonSlice, lalu dipanggang dengan reaktor panas fusi bintang supernova untuk kelezatan kosmik tak tertandingi!
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 8 }}>
              <button onClick={onOrderNow} className="btn-primary pulse-glow-lava" style={{ padding: "16px 36px", fontSize: 15 }}>
                <Flame size={18} /> Explore
              </button>
            </div>
          </div>

          {/* Right Hero Column - Beautiful orbiting logo showcase */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} className="hero-logo-container">
            {/* Holographic orbital rings */}
            <div className="orbit-ring-base" style={{ position: "relative", width: 440, height: 440, display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center" }}>
              <div className="spin-slow" style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", border: "1px dashed rgba(223, 183, 92, 0.15)" }} />
              <div className="spin-reverse" style={{ position: "absolute", width: "80%", height: "80%", borderRadius: "50%", border: "1px solid rgba(223, 183, 92, 0.1)" }} />
              <div className="spin-slow" style={{ position: "absolute", width: "60%", height: "60%", borderRadius: "50%", border: "1px dashed rgba(223, 183, 92, 0.12)" }} />

              {/* Central Premium Logo Pod */}
              <div className="float-slow-1" style={{ position: "relative", zIndex: 10 }}>
                <div className="glow-ring" style={{
                  width: 250, height: 250, borderRadius: "50%", overflow: "hidden",
                  background: "#120e0b", padding: 6,
                  border: "2px solid rgba(223, 183, 92, 0.4)",
                  boxShadow: "0 0 40px rgba(223, 183, 92, 0.25), inset 0 0 20px rgba(223, 183, 92, 0.15)"
                }}>
                  <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative" }}>
                    <Image src="/logo.jpeg" alt="MoonSlice Orbital logo" fill style={{ objectFit: "cover" }} priority />
                  </div>
                </div>

                {/* Floating astronaut badges */}
                <div className="tag tag-gold glow-gold float-slow-2" style={{ position: "absolute", top: -16, right: -24, padding: "8px 16px", borderRadius: 14 }}>
                  <Sparkles size={11} className="glow-text-gold" /> PIZZA MURNI 100%
                </div>
                <div className="tag tag-lava glow-lava float-slow-1" style={{ position: "absolute", bottom: -12, left: -28, padding: "8px 16px", borderRadius: 14 }}>
                  🚀 WARP DOCKING READY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", color: "rgba(223, 183, 92, 0.3)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em" }}>RADAR TURUN</span>
          <ChevronDown size={20} className="float-slow-1" />
        </div>
      </section>

      {/* ══════════════ MISSION HIGHLIGHTS ══════════════ */}
      <section style={{ background: "rgba(13,10,9,0.95)", borderBottom: "1px solid rgba(244,237,227,0.05)", padding: "48px 24px", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="glass-panel shimmer-fast" style={{ padding: "24px 28px", display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                  background: "rgba(223, 183, 92, 0.08)", border: "1px solid rgba(223, 183, 92, 0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 10px rgba(223, 183, 92, 0.1)"
                }}>
                  <Icon size={22} color="#dfb75c" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#f4ede3", letterSpacing: "0.01em" }}>{h.title}</p>
                  <p style={{ fontSize: 11, color: "rgba(244,237,227,0.38)", fontFamily: "'Space Mono', monospace", marginTop: 4 }}>{h.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════ SIGNATURE FEATURED MENU ══════════════ */}
      <section style={{ padding: "100px 24px", borderBottom: "1px solid rgba(244,237,227,0.05)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <div className="section-label">Pustaka Utama</div>
              <h2 className="font-display glow-text-lava" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#f4ede3", lineHeight: 0.95 }}>
                MENU PIZZA <span className="text-lava">UNGGULAN</span>
              </h2>
            </div>
            <button onClick={onOrderNow} className="btn-ghost" style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 13,
              padding: "10px 20px", borderRadius: 9999, transition: "all 0.2s"
            }}>
              Buka Semua Menu <ChevronRight size={14} />
            </button>
          </div>

          {/* Holographic Spec-Sheet Console */}
          {(() => {
            const activePizza = featuredPizzas[activePizzaIdx];
            return (
              <div>
                <div className="glass-panel" style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.2fr",
                  gap: 40,
                  padding: "48px",
                  background: "rgba(10, 8, 7, 0.95)",
                  border: `1px solid ${activePizza.colorTheme}`,
                  boxShadow: `0 0 45px -15px ${activePizza.colorThemeSecondary}`,
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                }} id="hologram-console">
                  {/* Left Column: Holographic Projection Pod */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    minHeight: 380,
                  }}>
                    {/* Dynamic Theme Glow Aura */}
                    <div style={{
                      position: "absolute",
                      width: 320,
                      height: 320,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${activePizza.colorTheme} 0%, transparent 70%)`,
                      filter: "blur(30px)",
                      transition: "all 0.5s ease",
                      pointerEvents: "none",
                      zIndex: 0,
                    }} />

                    {/* Rotating Outer Radar Dashed Circle */}
                    <div className="spin-slow" style={{
                      position: "absolute",
                      width: 300,
                      height: 300,
                      borderRadius: "50%",
                      border: `1px dashed ${activePizza.accent}`,
                      opacity: 0.25,
                      transition: "all 0.5s ease",
                    }} />
                    
                    {/* Outer Scanning Ring */}
                    <div className="spin-reverse" style={{
                      position: "absolute",
                      width: 250,
                      height: 250,
                      borderRadius: "50%",
                      border: `1px solid ${activePizza.accent}`,
                      opacity: 0.12,
                      transition: "all 0.5s ease",
                    }} />

                    {/* Holographic vertical sweep line */}
                    <div className="scanner-line" style={{
                      position: "absolute",
                      top: 0,
                      left: "10%",
                      right: "10%",
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${activePizza.accent}, transparent)`,
                      boxShadow: `0 0 15px ${activePizza.accent}`,
                      opacity: 0.45,
                      zIndex: 15,
                      pointerEvents: "none",
                    }} />

                    {/* Central Floating Pizza Image */}
                    <div className="float" style={{
                      width: 240,
                      height: 240,
                      position: "relative",
                      zIndex: 10,
                      transition: "all 0.5s ease",
                    }}>
                      <Image
                        src={activePizza.image}
                        alt={activePizza.name}
                        fill
                        style={{
                          objectFit: "contain",
                          filter: `drop-shadow(0 20px 40px ${activePizza.colorThemeSecondary})`,
                        }}
                        priority
                      />
                    </div>

                  </div>

                  {/* Right Column: Cosmic Spec-Sheet & Telemetry */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 10 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className={`tag ${activePizza.badgeClass}`} style={{ transition: "all 0.3s ease" }}>
                          {activePizza.tag}
                        </span>
                      </div>
                      <h3 className="font-display text-lava" style={{ fontSize: 36, color: "#f4ede3", marginTop: 10, lineHeight: 1.1 }}>
                        {activePizza.name}
                      </h3>
                      <p style={{ fontSize: 13, color: "rgba(244, 237, 227, 0.45)", lineHeight: 1.6, marginTop: 10 }}>
                        {activePizza.desc}
                      </p>
                      <p style={{ fontSize: 12, color: `${activePizza.accent}cc`, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginTop: 8 }}>
                        &ldquo;{activePizza.lore}&rdqufo;
                      </p>
                    </div>

                    {/* Telemetry Stats Grid */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                      background: "rgba(13, 10, 8, 0.4)",
                      padding: "16px",
                      borderRadius: 16,
                      border: "1px solid rgba(244, 237, 227, 0.05)",
                    }}>
                      <div>
                        <span style={{ display: "block", fontSize: 8, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.35)", letterSpacing: "0.05em" }}>GRAVITASI</span>
                        <span style={{ display: "block", fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#f4ede3", marginTop: 4 }}>{activePizza.gravity}</span>
                      </div>
                      <div style={{ borderLeft: "1px solid rgba(244, 237, 227, 0.1)", paddingLeft: 12 }}>
                        <span style={{ display: "block", fontSize: 8, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.35)", letterSpacing: "0.05em" }}>PANAS INTI</span>
                        <span style={{ display: "block", fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#f4ede3", marginTop: 4 }}>{activePizza.ovenTemp}</span>
                      </div>
                      <div style={{ borderLeft: "1px solid rgba(244, 237, 227, 0.1)", paddingLeft: 12 }}>
                        <span style={{ display: "block", fontSize: 8, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.35)", letterSpacing: "0.05em" }}>FERMENTASI</span>
                        <span style={{ display: "block", fontSize: 12, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "#f4ede3", marginTop: 4 }}>{activePizza.fermentation}</span>
                      </div>
                    </div>

                    {/* Micro-Nutrient Graph Analyzers */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <span style={{ display: "block", fontSize: 9, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.3)", letterSpacing: "0.1em" }}>SPESIFIKASI NUTRISI KOSMIK</span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, background: "rgba(13,10,8,0.25)", padding: "14px 12px", borderRadius: 16 }}>
                        {activePizza.macros.map((macro, idx) => (
                          <div key={idx} style={{ textAlign: "center" }}>
                            <span style={{ display: "block", fontSize: 7, fontFamily: "'Space Mono', monospace", color: "rgba(244,237,227,0.3)", letterSpacing: "0.05em" }}>{macro.label}</span>
                            <span style={{ display: "block", fontSize: 11, fontFamily: "'Space Mono', monospace", fontWeight: 700, color: "rgba(244,237,227,0.8)", marginTop: 2 }}>{macro.val}</span>
                            <div style={{ height: 4, background: "rgba(244,237,227,0.06)", borderRadius: 9999, overflow: "hidden", marginTop: 6 }}>
                              <div style={{
                                height: "100%",
                                width: `${macro.pct}%`,
                                background: `linear-gradient(90deg, ${activePizza.accent}cc, ${activePizza.accent})`,
                                boxShadow: `0 0 8px ${activePizza.accent}`,
                                borderRadius: 9999,
                                transition: "width 0.8s ease-in-out",
                              }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Call-to-Action Console Buttons */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ display: "block", fontSize: 8, fontFamily: "'Space Mono', monospace", color: "rgba(244, 237, 227, 0.3)" }}>HARGA STANDAR</span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 24, color: "#dfb75c" }}>
                          Rp {activePizza.price.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <button
                          onClick={onOrderNow}
                          className="btn-outline-cream"
                          style={{
                            padding: "12px 20px",
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Kustomisasi
                        </button>

                        <button
                          onClick={() => {
                            onAddToCart({
                              id: activePizza.id,
                              name: activePizza.name,
                              price: activePizza.price,
                              image: activePizza.image,
                            }, [], activePizza.price);
                          }}
                          className="btn-primary"
                          style={{
                            padding: "12px 28px",
                            borderRadius: 9999,
                            fontSize: 12,
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${activePizza.accent} 0%, #b38e43 100%)`,
                            boxShadow: `0 4px 15px ${activePizza.colorThemeSecondary}`,
                            border: `1px solid rgba(255,255,255,0.15)`,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Pesan Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Pizza Selector Strip */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 20,
                  marginTop: 28,
                }} className="selector-strip">
                  {featuredPizzas.map((pizza, idx) => {
                    const isSelected = activePizzaIdx === idx;
                    return (
                      <button
                        key={pizza.id}
                        onClick={() => setActivePizzaIdx(idx)}
                        className="glass-panel shimmer-fast"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 16,
                          padding: "18px 24px",
                          cursor: "pointer",
                          textAlign: "left",
                          background: isSelected ? "rgba(13, 10, 8, 0.85)" : "rgba(18, 14, 11, 0.4)",
                          border: isSelected ? `1.5px solid ${pizza.accent}` : "1px solid rgba(244, 237, 227, 0.06)",
                          boxShadow: isSelected ? `0 0 20px ${pizza.colorThemeSecondary}` : "none",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          position: "relative",
                        }}
                      >
                        {/* Miniature spinning pizza render */}
                        <div className={isSelected ? "spin-slow" : ""} style={{
                          width: 44,
                          height: 44,
                          position: "relative",
                          flexShrink: 0,
                          transition: "transform 0.3s ease",
                        }}>
                          <Image
                            src={pizza.image}
                            alt={pizza.name}
                            fill
                            style={{
                              objectFit: "contain",
                              filter: isSelected ? `drop-shadow(0 4px 10px ${pizza.accent}aa)` : "grayscale(0.3) opacity(0.7)",
                            }}
                          />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 8, fontFamily: "'Space Mono', monospace", color: "rgba(244,237,227,0.3)" }}>0{idx + 1}</span>
                            <span className={`tag ${pizza.badgeClass}`} style={{ fontSize: 7, padding: "2px 6px" }}>{pizza.tag}</span>
                          </div>
                          <h4 className="font-display" style={{
                            fontSize: 14,
                            color: isSelected ? "#f4ede3" : "rgba(244, 237, 227, 0.6)",
                            marginTop: 4,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            transition: "color 0.2s ease",
                          }}>
                            {pizza.name}
                          </h4>
                        </div>
                        
                        {/* Active Indicator bar */}
                        {isSelected && (
                          <div style={{
                            position: "absolute",
                            bottom: 0,
                            left: "10%",
                            right: "10%",
                            height: 2,
                            background: pizza.accent,
                            boxShadow: `0 0 10px ${pizza.accent}`,
                            borderRadius: "9999px 9999px 0 0",
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ══════════════ COMSIC REVIEWS ══════════════ */}
      <section style={{ padding: "100px 24px", borderBottom: "1px solid rgba(244,237,227,0.05)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Testimoni</div>
            <h2 className="font-display glow-text-lava" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#f4ede3", lineHeight: 0.95 }}>
              ULASAN <span className="text-lava">PELANGGAN</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="glass-panel shimmer-fast" style={{ padding: "32px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <Star key={idx} size={14} fill="#f5c842" color="#f5c842" />
                  ))}
                </div>
                <p style={{ color: "rgba(244,237,227,0.6)", fontSize: 13, lineHeight: 1.7, flex: 1 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="divider" style={{ opacity: 0.3 }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "rgba(0, 240, 255, 0.08)", border: "1px solid rgba(0, 240, 255, 0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20
                  }}>{r.avatar}</div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: "#f4ede3" }}>{r.name}</h4>
                    <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace", color: "rgba(244,237,227,0.3)" }}>DOKUMEN TERVERIFIKASI</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ COCKPIT ACCORDION FAQ ══════════════ */}
      <section style={{ padding: "100px 24px", background: "rgba(13,10,9,0.55)", borderBottom: "1px solid rgba(244,237,227,0.05)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: "center" }}><HelpCircle size={12} /> Bantuan Modul</div>
            <h2 className="font-display glow-text-lava" style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "#f4ede3", lineHeight: 0.95 }}>
              PERTANYAAN <span className="text-lava">UMUM</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  overflow: "hidden",
                  border: openFaq === i ? "1px solid rgba(223, 183, 92, 0.4)" : "1px solid rgba(244,237,227,0.06)",
                  boxShadow: openFaq === i ? "0 0 15px rgba(223, 183, 92, 0.08)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "22px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 14, color: openFaq === i ? "#dfb75c" : "#f4ede3" }}>
                    {f.q}
                  </span>
                  <ChevronDown
                    size={16}
                    color={openFaq === i ? "#dfb75c" : "rgba(244,237,227,0.3)"}
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: "0 28px 24px", color: "rgba(244,237,227,0.5)", fontSize: 13,
                    lineHeight: 1.7, animation: "fade-in-up 0.25s ease forwards", borderTop: "1px solid rgba(244,237,227,0.04)", paddingTop: 16
                  }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ MISSION LAUNCH CTA BANNER ══════════════ */}
      <section style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
        {/* Hyperspace backdrop lights */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(223,183,92,0.14) 0%, rgba(223,183,92,0.05) 50%, transparent 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          <h2 className="font-display glow-text-lava" style={{ fontSize: "clamp(48px, 8vw, 80px)", color: "#f4ede3", lineHeight: 0.9, marginBottom: 24 }}>
            SIAP MELUNCURKAN<br />
            <span className="text-lava">MISI RASA?</span>
          </h2>
          <p style={{ color: "rgba(244,237,227,0.45)", fontSize: 15, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
            Gunakan kode peluncuran astronot baru <strong style={{ fontFamily: "'Space Mono', monospace", color: "#f5c842" }}>PIZZA20</strong> untuk mendapatkan diskon 20% di gerbang checkout.
          </p>

          <button onClick={onOrderNow} className="btn-primary pulse-glow-lava" style={{ padding: "20px 52px", fontSize: 17, gap: 10 }}>
            <Flame size={22} /> Luncurkan Pesanan Sekarang
          </button>
        </div>
      </section>

      {/* Embedded CSS Media Query for responsive grid overrides */}
      <style>{`
        @keyframes hologram-sweep {
          0%, 100% { top: 0%; opacity: 0.15; }
          50% { top: 100%; opacity: 0.55; }
        }
        .scanner-line {
          animation: hologram-sweep 5s ease-in-out infinite;
        }
        @media (max-width: 820px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-logo-container { margin-top: 20px; }
          .hero-logo-container .orbit-ring-base { width: 340px !important; height: 340px !important; }
          .hero-logo-container .glow-ring { width: 190px !important; height: 190px !important; }
          .hero-logo-container .tag { font-size: 8px !important; padding: 6px 12px !important; }
          #interactive-pizza { grid-template-columns: 1fr !important; gap: 32px !important; padding: 24px !important; }
          #hologram-console { grid-template-columns: 1fr !important; gap: 32px !important; padding: 24px !important; }
          .selector-strip { grid-template-columns: 1fr !important; gap: 12px !important; }
          .featured-grid, .reviews-grid, .craftsmanship-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
