"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Flame, Leaf, Check, ShoppingBag, Sparkles, X,
  Search, ChevronDown, Zap, Target, Radio, Atom,
  ArrowRight, Star, Cpu,
} from "lucide-react";

/* ────────────────── TYPES ────────────────── */
interface Pizza {
  id: string; name: string; price: number; description: string;
  tag: string; tagStyle: string; spicy: boolean; veg: boolean;
  image: string; macros: { label: string; val: string; pct: number }[];
  coord: string; nebulaClass: string; nebulaAccent: string;
  origin: string; mass: number; rating: number; soldCount: number;
}
interface MenuProps { onAddToCart: (p: Pizza, toppings: string[], price: number) => void; }

/* ────────────────── DATA ────────────────── */
const TOPPINGS = [
  { id: "extra-cheese", name: "Keju Ekstra",     price: 5000, emoji: "🧀", cal: 120, mass: 45 },
  { id: "extra-meat",   name: "Daging Ekstra",    price: 8000, emoji: "🥩", cal: 210, mass: 80 },
  { id: "jalapeno",     name: "Jalapeno Segar",   price: 4000, emoji: "🌶️", cal: 15,  mass: 20 },
  { id: "mushroom",     name: "Jamur Portobello", price: 6000, emoji: "🍄", cal: 55,  mass: 55 },
];

const PIZZAS: Pizza[] = [
  {
    id: "supernova-cheese", name: "Supernova Cheese", price: 78000,
    description: "Mozzarella impor melimpah di atas saus tomat pomodoro organik dan oregano segar galaksi.",
    tag: "Terfavorit", tagStyle: "cream", spicy: false, veg: true,
    image: "/pizza-cheese.png",
    macros: [{ label: "KALORI", val: "820 kkal", pct: 68 }, { label: "PROTEIN", val: "32g", pct: 55 }, { label: "LEMAK", val: "28g", pct: 42 }],
    coord: "84.1° L · 12.3° T", nebulaClass: "glow-nebula-purple",
    nebulaAccent: "rgba(142,68,173,0.28)", origin: "Orbit Bintang Matahari", mass: 420, rating: 4.9, soldCount: 2341,
  },
  {
    id: "meteor-meat-lovers", name: "Meteor Meat Lovers", price: 98000,
    description: "Pepperoni renyah, sosis premium, daging cincang, dan double mozzarella hasil penambangan meteor.",
    tag: "Best Seller", tagStyle: "cream", spicy: true, veg: false,
    image: "/pizza-meat.png",
    macros: [{ label: "KALORI", val: "1020 kkal", pct: 85 }, { label: "PROTEIN", val: "52g", pct: 88 }, { label: "LEMAK", val: "45g", pct: 70 }],
    coord: "16.7° L · 91.2° T", nebulaClass: "glow-nebula-purple",
    nebulaAccent: "rgba(142,68,173,0.28)", origin: "Kawah Meteor M-74", mass: 580, rating: 4.8, soldCount: 1897,
  },
  {
    id: "galaxy-veggie", name: "Galaxy Veggie", price: 82000,
    description: "Jamur portobello, paprika tricolor, bawang karamel, zaitun hitam orbit, dan pesto basil aurora.",
    tag: "Sehat", tagStyle: "cream", spicy: false, veg: true,
    image: "/pizza-veggie.png",
    macros: [{ label: "KALORI", val: "680 kkal", pct: 55 }, { label: "PROTEIN", val: "18g", pct: 30 }, { label: "LEMAK", val: "20g", pct: 32 }],
    coord: "55.8° L · 33.9° T", nebulaClass: "glow-nebula-purple",
    nebulaAccent: "rgba(142,68,173,0.28)", origin: "Kebun Orbit Hidroponik", mass: 390, rating: 4.7, soldCount: 1102,
  },
  {
    id: "black-hole-truffle", name: "Black Hole Truffle", price: 120000,
    description: "Saus krim truffle hitam premium, jamur liar segar, parmesan shaved, minyak truffle langka.",
    tag: "Premium", tagStyle: "cream", spicy: false, veg: true,
    image: "/pizza-truffle.png",
    macros: [{ label: "KALORI", val: "920 kkal", pct: 76 }, { label: "PROTEIN", val: "26g", pct: 44 }, { label: "LEMAK", val: "52g", pct: 80 }],
    coord: "99.0° L · 00.1° T", nebulaClass: "glow-nebula-purple",
    nebulaAccent: "rgba(142,68,173,0.28)", origin: "Singularitas Lubang Hitam", mass: 510, rating: 5.0, soldCount: 788,
  },
  {
    id: "nebula-carbonara", name: "Nebula Carbonara", price: 92000,
    description: "Saus alfredo krim nebula, potongan dada ayam asap kosmis, jamur portobello, dan limpahan mozzarella premium.",
    tag: "Terbaru", tagStyle: "cream", spicy: false, veg: false,
    image: "/pizza-carbonara.png",
    macros: [{ label: "KALORI", val: "880 kkal", pct: 73 }, { label: "PROTEIN", val: "38g", pct: 64 }, { label: "LEMAK", val: "36g", pct: 55 }],
    coord: "42.3° L · 77.5° T", nebulaClass: "glow-nebula-purple",
    nebulaAccent: "rgba(142,68,173,0.28)", origin: "Stasiun Orbit Alpha-9", mass: 460, rating: 4.9, soldCount: 412,
  },
  {
    id: "solar-flare-spicy", name: "Solar Flare Spicy", price: 88000,
    description: "Pepperoni sapi premium, sosis chorizo pedas, cabai jalapeno orbit, dibalut madu cabai lava pedas membara.",
    tag: "Pedas Dahsyat", tagStyle: "cream", spicy: true, veg: false,
    image: "/pizza-spicy.png",
    macros: [{ label: "KALORI", val: "960 kkal", pct: 80 }, { label: "PROTEIN", val: "44g", pct: 73 }, { label: "LEMAK", val: "40g", pct: 62 }],
    coord: "03.5° L · 121.8° T", nebulaClass: "glow-nebula-purple",
    nebulaAccent: "rgba(142,68,173,0.28)", origin: "Sisi Dekat Matahari", mass: 490, rating: 4.8, soldCount: 829,
  },
];

const TAG_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  gold:  { bg: "rgba(223,183,92,0.12)",  border: "rgba(223,183,92,0.45)",  color: "#dfb75c" },
  lava:  { bg: "rgba(192,57,43,0.15)",   border: "rgba(192,57,43,0.5)",   color: "#e74c3c" },
  basil: { bg: "rgba(45,186,106,0.12)",  border: "rgba(45,186,106,0.4)",  color: "#2dba6a" },
  cream: { bg: "rgba(244,237,227,0.07)", border: "rgba(244,237,227,0.25)", color: "#f4ede3" },
};

type SortKey   = "popular" | "price_asc" | "price_desc" | "calories";
type FilterKey = "all" | "veg" | "spicy";

/* ────────────────── COMPONENT ────────────────── */
export default function Menu({ onAddToCart }: MenuProps) {
  const [selected, setSelected]   = useState<Pizza | null>(null);
  const [toppings, setToppings]   = useState<string[]>([]);
  const [filter, setFilter]       = useState<FilterKey>("all");
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState<SortKey>("popular");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleTopping = (id: string) =>
    setToppings(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);

  const total     = (selected?.price ?? 0) + toppings.reduce((s, id) => s + (TOPPINGS.find(t => t.id === id)?.price ?? 0), 0);
  const extraCal  = toppings.reduce((s, id) => s + (TOPPINGS.find(t => t.id === id)?.cal  ?? 0), 0);
  const extraMass = toppings.reduce((s, id) => s + (TOPPINGS.find(t => t.id === id)?.mass ?? 0), 0);

  const list = useMemo(() => {
    let arr = PIZZAS.filter(p => {
      if (filter === "veg"   && !p.veg)   return false;
      if (filter === "spicy" && !p.spicy) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    switch (sort) {
      case "price_asc":  arr = [...arr].sort((a, b) => a.price - b.price); break;
      case "price_desc": arr = [...arr].sort((a, b) => b.price - a.price); break;
      case "calories":   arr = [...arr].sort((a, b) => b.macros[0].pct - a.macros[0].pct); break;
    }
    return arr;
  }, [filter, search, sort]);

  const confirm = () => {
    if (!selected) return;
    onAddToCart(selected, toppings.map(id => TOPPINGS.find(t => t.id === id)!.name), total);
    setSelected(null);
    setToppings([]);
  };

  const FILTER_OPTS: { key: FilterKey; label: string; icon: React.ReactNode }[] = [
    { key: "all",   label: "Semua",   icon: <Radio size={11} /> },
    { key: "veg",   label: "Veggie",  icon: <Leaf  size={11} /> },
    { key: "spicy", label: "Pedas",   icon: <Flame size={11} /> },
  ];
  const SORT_OPTS: { key: SortKey; label: string }[] = [
    { key: "popular",    label: "⭐  Terpopuler" },
    { key: "price_asc",  label: "↑  Harga Terendah" },
    { key: "price_desc", label: "↓  Harga Tertinggi" },
    { key: "calories",   label: "⚡  Energi" },
  ];

  return (
    <div className="site-bg font-body" style={{ minHeight: "100vh", color: "#f4ede3", paddingBottom: 120 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px 0" }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ marginBottom: 48 }}>
          <div className="section-label"><Target size={12} /> MENU</div>
          <h1 className="font-display glow-text-lava"
            style={{ fontSize: "clamp(52px,7vw,88px)", color: "#f4ede3", lineHeight: 0.88, marginBottom: 16 }}>
            MENU<br /><span className="text-lava">PIZZA</span>
          </h1>
          <p style={{ color: "rgba(244,237,227,0.38)", fontSize: 14, maxWidth: 480, lineHeight: 1.7 }}>
            Arsenal pizza premium galaksi — pilih misi kuliner terbaikmu dari dok MoonSlice.
          </p>
        </div>

        {/* ── COMMAND FILTER DECK ── */}
        <div style={{
          background: "rgba(12,10,8,0.88)", backdropFilter: "blur(24px)",
          border: "1px solid rgba(223,183,92,0.14)", borderRadius: 20,
          padding: "18px 22px", marginBottom: 48,
          display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(223,183,92,0.4), transparent)" }} />

          {/* Search */}
          <div style={{ flex: "1 1 200px", position: "relative" }}>
            <Search size={14} style={{ position: "absolute", left: 13, top: "50%",
              transform: "translateY(-50%)", color: "rgba(223,183,92,0.5)", pointerEvents: "none" }} />
            <input className="menu-search" placeholder="Cari pizza..." value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 5, background: "rgba(26,20,16,0.8)",
            padding: 4, borderRadius: 12, border: "1px solid rgba(244,237,227,0.05)", flexShrink: 0 }}>
            {FILTER_OPTS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "8px 14px", borderRadius: 9, fontSize: 11, fontWeight: 700,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                background: filter === f.key ? "linear-gradient(135deg, #dfb75c, #b38e43)" : "transparent",
                color: filter === f.key ? "#050505" : "rgba(244,237,227,0.38)",
                border: "none", boxShadow: filter === f.key ? "0 0 14px rgba(223,183,92,0.35)" : "none",
              }}>{f.icon}{f.label}</button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <select className="menu-select" value={sort}
              onChange={e => setSort(e.target.value as SortKey)} style={{ paddingRight: 38 }}>
              {SORT_OPTS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            <ChevronDown size={13} style={{ position: "absolute", right: 13, top: "50%",
              transform: "translateY(-50%)", color: "rgba(223,183,92,0.5)", pointerEvents: "none" }} />
          </div>

          {/* Counter */}
          <div className="tag tag-gold" style={{ gap: 6, marginLeft: "auto", flexShrink: 0 }}>
            <span className="hud-blink" style={{ width: 5, height: 5, borderRadius: "50%",
              background: "#dfb75c", display: "inline-block" }} />
            {list.length} PRODUK
          </div>
        </div>

        {/* ── PIZZA CARD GRID ── */}
        {list.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(244,237,227,0.28)" }}>
            <Atom size={44} style={{ margin: "0 auto 14px", opacity: 0.25 }} />
            <p className="font-display" style={{ fontSize: 22 }}>Tidak ada pizza ditemukan</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {list.map(pizza => {
              const ts       = TAG_STYLES[pizza.tagStyle];
              const isHover  = hoveredId === pizza.id;

              return (
                <div key={pizza.id}
                  onMouseEnter={() => setHoveredId(pizza.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => { setSelected(pizza); setToppings([]); }}
                  style={{
                    position: "relative", borderRadius: 28, overflow: "hidden",
                    cursor: "pointer", background: "rgba(11,9,7,0.95)",
                    border: `1px solid ${isHover ? ts.border : "rgba(244,237,227,0.06)"}`,
                    boxShadow: isHover
                      ? `0 0 40px -8px ${pizza.nebulaAccent}, 0 20px 60px -20px rgba(0,0,0,0.8)`
                      : "0 4px 30px -10px rgba(0,0,0,0.6)",
                    transform: isHover ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
                    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}>

                  {/* ── TOP ACCENT LINE per flavor ── */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 10,
                    background: `linear-gradient(90deg, transparent 0%, ${ts.color} 40%, ${ts.color} 60%, transparent 100%)`,
                    opacity: isHover ? 1 : 0.35, transition: "opacity 0.35s" }} />

                  {/* ── CORNER BRACKET (TL) ── */}
                  <div style={{ position: "absolute", top: 10, left: 10, zIndex: 20,
                    width: 18, height: 18, borderTop: `2px solid ${ts.color}`, borderLeft: `2px solid ${ts.color}`,
                    borderRadius: "4px 0 0 0", opacity: isHover ? 0.9 : 0.3, transition: "opacity 0.3s" }} />
                  {/* ── CORNER BRACKET (BR) ── */}
                  <div style={{ position: "absolute", bottom: 10, right: 10, zIndex: 20,
                    width: 18, height: 18, borderBottom: `2px solid ${ts.color}`, borderRight: `2px solid ${ts.color}`,
                    borderRadius: "0 0 4px 0", opacity: isHover ? 0.9 : 0.3, transition: "opacity 0.3s" }} />

                  {/* ── IMAGE ZONE (full width, tall) ── */}
                  <div style={{ position: "relative", height: 220, overflow: "hidden",
                    background: `radial-gradient(ellipse 110% 110% at 50% 100%, rgba(0,0,0,0.95) 0%, rgba(14,11,8,0.5) 55%, transparent 100%)` }}>

                    {/* Nebula radial glow on hover */}
                    <div style={{ position: "absolute", inset: 0, zIndex: 1,
                      background: `radial-gradient(ellipse 90% 70% at 50% 30%, ${pizza.nebulaAccent} 0%, transparent 70%)`,
                      opacity: isHover ? 1 : 0, transition: "opacity 0.5s ease" }} />

                    {/* Rotating orbit ring */}
                    <div className="spin-slow" style={{ position: "absolute", zIndex: 2,
                      width: 200, height: 200, top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%", border: `1px dashed ${ts.color}28`,
                      opacity: isHover ? 1 : 0, transition: "opacity 0.4s" }} />

                    {/* Pizza image — scales + rotates on hover */}
                    <div style={{
                      position: "absolute", zIndex: 3, width: 180, height: 180,
                      top: "50%", left: "50%",
                      transform: isHover
                        ? "translate(-50%, -55%) scale(1.18) rotate(8deg)"
                        : "translate(-50%, -50%) scale(1) rotate(0deg)",
                      transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s",
                      filter: isHover
                        ? `drop-shadow(0 20px 50px ${pizza.nebulaAccent})`
                        : "drop-shadow(0 8px 20px rgba(0,0,0,0.6))",
                    }}>
                      <Image src={pizza.image} alt={pizza.name} fill style={{ objectFit: "contain" }} />
                    </div>

                    {/* TOP badges row */}
                    <div style={{ position: "absolute", top: 16, left: 16, right: 16,
                      zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      {/* Tag badge */}
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "5px 12px", borderRadius: 9999,
                        background: ts.bg, border: `1px solid ${ts.border}`, color: ts.color,
                        fontSize: 9, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        backdropFilter: "blur(8px)",
                      }}>{pizza.tag}</div>

                      {/* Dietary icons */}
                      <div style={{ display: "flex", gap: 5 }}>
                        {pizza.spicy && (
                          <span style={{ width: 26, height: 26, borderRadius: "50%",
                            background: "rgba(192,57,43,0.2)", border: "1px solid rgba(192,57,43,0.45)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backdropFilter: "blur(8px)" }}>
                            <Flame size={12} color="#e74c3c" />
                          </span>
                        )}
                        {pizza.veg && (
                          <span style={{ width: 26, height: 26, borderRadius: "50%",
                            background: "rgba(45,186,106,0.2)", border: "1px solid rgba(45,186,106,0.4)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backdropFilter: "blur(8px)" }}>
                            <Leaf size={12} color="#2dba6a" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Coord HUD bottom */}
                    <div style={{ position: "absolute", bottom: 12, left: 16, zIndex: 10,
                      fontSize: 8, fontFamily: "'Space Mono', monospace",
                      color: "rgba(244,237,227,0.22)", letterSpacing: "0.05em" }}>
                      {pizza.coord}
                    </div>

                    {/* Rating badge bottom-right */}
                    <div style={{ position: "absolute", bottom: 10, right: 16, zIndex: 10,
                      display: "flex", alignItems: "center", gap: 4,
                      padding: "4px 10px", borderRadius: 9999,
                      background: "rgba(8,6,4,0.7)", border: "1px solid rgba(244,237,227,0.07)",
                      backdropFilter: "blur(8px)" }}>
                      <Star size={9} color="#dfb75c" fill="#dfb75c" />
                      <span style={{ fontSize: 10, fontFamily: "'Space Mono', monospace",
                        fontWeight: 700, color: "#dfb75c" }}>{pizza.rating}</span>
                    </div>

                    {/* Bottom gradient fade into card body */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                      background: "linear-gradient(to bottom, transparent, rgba(11,9,7,0.95))", zIndex: 5 }} />
                  </div>

                  {/* ── CARD BODY ── */}
                  <div style={{ padding: "0 22px 22px" }}>

                    {/* Origin label */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%",
                        background: ts.color, boxShadow: `0 0 8px ${ts.color}`,
                        flexShrink: 0 }} />
                      <span style={{ fontSize: 8, fontFamily: "'Space Mono', monospace",
                        color: "rgba(244,237,227,0.3)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                        {pizza.origin}
                      </span>
                    </div>

                    {/* Pizza name */}
                    <h3 className="font-display" style={{ fontSize: 26, color: "#f4ede3",
                      lineHeight: 1, marginBottom: 8, letterSpacing: "-0.01em" }}>
                      {pizza.name}
                    </h3>

                    {/* Description */}
                    <p style={{ fontSize: 12, color: "rgba(244,237,227,0.38)", lineHeight: 1.65,
                      marginBottom: 18, minHeight: 40 }}>
                      {pizza.description}
                    </p>

                    {/* ── PRICE + CTA ROW ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Price block */}
                      <div style={{ flex: 1 }}>
                        <span style={{ display: "block", fontSize: 8,
                          fontFamily: "'Space Mono', monospace",
                          color: "rgba(244,237,227,0.25)", letterSpacing: "0.12em", marginBottom: 2 }}>
                          HARGA MISI
                        </span>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                          fontSize: 21, color: ts.color, display: "block" }}>
                          Rp {pizza.price.toLocaleString("id-ID")}
                        </span>
                        <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                          color: "rgba(244,237,227,0.22)" }}>
                          {pizza.soldCount.toLocaleString()} terjual
                        </span>
                      </div>

                      {/* CTA button */}
                      <button
                        onClick={e => { e.stopPropagation(); setSelected(pizza); setToppings([]); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "12px 20px", borderRadius: 14, flexShrink: 0,
                          background: isHover
                            ? `linear-gradient(135deg, ${ts.color}, ${ts.color === "#dfb75c" ? "#b38e43" : ts.color === "#e74c3c" ? "#922b21" : ts.color === "#2dba6a" ? "#1d8a4e" : "#6c3483"})`
                            : "rgba(244,237,227,0.04)",
                          border: `1px solid ${isHover ? "transparent" : ts.border}`,
                          color: isHover ? "#050505" : ts.color,
                          fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                          cursor: "pointer",
                          boxShadow: isHover ? `0 0 20px -4px ${pizza.nebulaAccent}` : "none",
                          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                          transform: isHover ? "scale(1.04)" : "scale(1)",
                        }}>
                        Pilih <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* ── BOTTOM SYSTEM BAR ── */}
                    <div style={{ marginTop: 16, paddingTop: 12,
                      borderTop: "1px solid rgba(244,237,227,0.04)",
                      display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4,
                          fontSize: 9, fontFamily: "'Space Mono', monospace",
                          color: "rgba(244,237,227,0.2)" }}>
                          <Cpu size={8} /> {pizza.mass}g
                        </span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4,
                          fontSize: 9, fontFamily: "'Space Mono', monospace",
                          color: "rgba(244,237,227,0.2)" }}>
                          <Zap size={8} /> {pizza.macros[0].val}
                        </span>
                      </div>
                      <span style={{ fontSize: 8, fontFamily: "'Space Mono', monospace",
                        color: `${ts.color}55` }}>KUSTOMISASI TERSEDIA</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════
          TOPPING LABORATORY MODAL
          ════════════════════════════════════════ */}
      {selected && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div onClick={() => setSelected(null)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }} />

          <div style={{
            position: "relative", width: "100%", maxWidth: 900, zIndex: 10,
            background: "rgba(10,8,6,0.97)", borderRadius: 28,
            border: "1px solid rgba(223,183,92,0.25)",
            boxShadow: "0 0 60px -10px rgba(223,183,92,0.2), 0 40px 80px -20px rgba(0,0,0,0.9)",
            animation: "scale-in 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            overflow: "hidden",
          }}>
            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, #dfb75c, transparent)" }} />

            {/* Modal header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 28px", borderBottom: "1px solid rgba(244,237,227,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Sparkles size={14} color="#dfb75c" />
                <span className="font-display" style={{ fontSize: 13, color: "#dfb75c",
                  letterSpacing: "0.2em" }}>TOPPING DOCKING LABORATORY</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none",
                  cursor: "pointer", color: "rgba(244,237,227,0.3)", padding: 4 }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr" }} className="lab-modal-grid">

              {/* LEFT — Scanner */}
              <div style={{ borderRight: "1px solid rgba(244,237,227,0.06)",
                padding: "40px 32px", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 24 }}>
                <div style={{ position: "relative", width: 280, height: 280,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className="spin-slow" style={{ position: "absolute",
                    width: "100%", height: "100%", borderRadius: "50%",
                    border: "1px dashed rgba(223,183,92,0.18)" }} />
                  <svg className="scanner-ring" style={{ position: "absolute", width: "85%", height: "85%" }}
                    viewBox="0 0 200 200">
                    <defs>
                      <linearGradient id="laserG" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#dfb75c" stopOpacity="0" />
                        <stop offset="100%" stopColor="#dfb75c" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(223,183,92,0.1)" strokeWidth="1" />
                    <path d="M100,100 L196,100" stroke="url(#laserG)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="3" fill="#dfb75c" opacity="0.8" />
                  </svg>
                  <div className="scanner-ping" style={{ position: "absolute", width: "70%", height: "70%",
                    borderRadius: "50%", border: "1px solid rgba(223,183,92,0.22)" }} />
                  <div style={{ position: "absolute", width: "55%", height: "55%", borderRadius: "50%",
                    border: "1px solid rgba(244,237,227,0.05)" }} />

                  {/* Pizza center */}
                  <div className="float-slow-1" style={{ width: 140, height: 140, position: "relative", zIndex: 10 }}>
                    <Image src={selected.image} alt={selected.name} fill
                      style={{ objectFit: "contain",
                        filter: "drop-shadow(0 10px 30px rgba(223,183,92,0.35))" }} />
                    {toppings.map((topId, idx) => {
                      const tObj = TOPPINGS.find(t => t.id === topId);
                      if (!tObj) return null;
                      return Array.from({ length: 4 }).map((_, itemIdx) => {
                        const angle = (idx * 90 + itemIdx * 90) * (Math.PI / 180);
                        const dist  = 30 + itemIdx * 5;
                        const x     = 70 + Math.cos(angle) * dist - 9;
                        const y     = 70 + Math.sin(angle) * dist - 9;
                        return (
                          <span key={`${topId}-${itemIdx}`} style={{
                            position: "absolute", top: y, left: x, fontSize: 14, zIndex: 20,
                            filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.5))",
                          }}>{tObj.emoji}</span>
                        );
                      });
                    })}
                  </div>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h3 className="font-display" style={{ fontSize: 26, color: "#f4ede3", lineHeight: 1 }}>
                    {selected.name}
                  </h3>
                  <p style={{ fontSize: 11, color: "rgba(244,237,227,0.35)", lineHeight: 1.6,
                    marginTop: 8, maxWidth: 240, margin: "8px auto 0" }}>
                    {selected.description}
                  </p>
                </div>

                {/* Telemetry */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%" }}>
                  {[
                    { label: "BOBOT",   value: `${selected.mass + extraMass}g`, icon: "⚖️" },
                    { label: "PANAS",   value: "450 °C",                        icon: "🔥" },
                    { label: "ENERGI",  value: `${selected.macros[0].val.split(" ")[0]}${extraCal > 0 ? `+${extraCal}` : ""} kkal`, icon: "⚡" },
                    { label: "TRANSIT", value: "30 mnt",                        icon: "🚀" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(18,14,12,0.7)",
                      border: "1px solid rgba(244,237,227,0.05)", borderRadius: 12, padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                        <span style={{ fontSize: 11 }}>{s.icon}</span>
                        <span style={{ fontSize: 7, fontFamily: "'Space Mono', monospace",
                          color: "rgba(244,237,227,0.25)", letterSpacing: "0.1em" }}>{s.label}</span>
                      </div>
                      <span style={{ fontSize: 13, fontFamily: "'Space Mono', monospace",
                        fontWeight: 700, color: "#dfb75c" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Topping slots */}
              <div style={{ display: "flex", flexDirection: "column", padding: "36px 30px" }}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                    color: "rgba(244,237,227,0.25)", letterSpacing: "0.14em",
                    textTransform: "uppercase", display: "block", marginBottom: 6 }}>HARGA DASAR</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                    fontSize: 17, color: "#dfb75c" }}>
                    Rp {selected.price.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="lava-divider" />

                <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                  color: "rgba(244,237,227,0.25)", letterSpacing: "0.14em",
                  textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                  SLOT TOPPING AMUNISI
                </span>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {TOPPINGS.map(t => {
                    const active = toppings.includes(t.id);
                    return (
                      <button key={t.id} className={`cargo-slot ${active ? "active" : ""}`}
                        onClick={() => toggleTopping(t.id)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                            border: `2px solid ${active ? "#dfb75c" : "rgba(244,237,227,0.18)"}`,
                            background: active ? "#dfb75c" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s" }}>
                            {active && <Check size={11} color="#050505" strokeWidth={3} />}
                          </div>
                          <span style={{ fontSize: 15 }}>{t.emoji}</span>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600,
                              color: active ? "#f4ede3" : "rgba(244,237,227,0.5)" }}>{t.name}</span>
                            <span style={{ display: "block", fontSize: 9,
                              fontFamily: "'Space Mono', monospace",
                              color: "rgba(244,237,227,0.22)", marginTop: 1 }}>
                              +{t.cal} kkal · +{t.mass}g
                            </span>
                          </div>
                        </div>
                        <span style={{ fontSize: 12, fontFamily: "'Space Mono', monospace",
                          fontWeight: 700, color: active ? "#dfb75c" : "rgba(244,237,227,0.25)",
                          flexShrink: 0 }}>
                          +Rp {t.price.toLocaleString("id-ID")}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div style={{ flex: 1 }} />

                {/* Total & CTA */}
                <div style={{ borderTop: "1px solid rgba(244,237,227,0.07)",
                  paddingTop: 20, marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "flex-end", marginBottom: 16 }}>
                    <div>
                      <span style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                        color: "rgba(244,237,227,0.25)", display: "block", marginBottom: 4,
                        letterSpacing: "0.12em", textTransform: "uppercase" }}>TOTAL MISI</span>
                      <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                        fontSize: 28, color: "#dfb75c" }}>
                        Rp {total.toLocaleString("id-ID")}
                      </span>
                    </div>
                    {toppings.length > 0 && (
                      <div className="tag tag-gold" style={{ fontSize: 10 }}>
                        <Zap size={9} /> {toppings.length} AKTIF
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setSelected(null)} className="btn-ghost"
                      style={{ padding: "11px 20px", fontSize: 13 }}>Batal</button>
                    <button onClick={confirm} className="btn-primary"
                      style={{ flex: 1, fontSize: 14, padding: "12px 24px", gap: 8 }}>
                      <ShoppingBag size={16} /> Dok ke Keranjang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 680px) { .lab-modal-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
