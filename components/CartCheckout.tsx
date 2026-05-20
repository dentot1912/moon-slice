"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Trash2, MapPin, Copy, Check, ChevronRight, Tag,
  Bike, Building2, ShieldCheck, Clock, Zap, CreditCard,
  QrCode, Package,
} from "lucide-react";

interface CartItem {
  id: string; name: string; price: number;
  toppings: string[]; quantity: number; originalPrice: number; image: string;
}
interface UserProfile {
  name: string; email: string; rank?: string;
  points?: number; addresses?: string[];
}
interface OrderData {
  id: string; items: CartItem[]; subtotal: number;
  shippingFee: number; discount: number; total: number;
  deliveryType: "delivery" | "pickup"; address: string;
  paymentMethod: string; duration: string; timestamp: string;
}
interface CartCheckoutProps {
  cart: CartItem[]; user: UserProfile | null | undefined;
  onUpdateQuantity: (idx: number, change: number) => void;
  onRemoveItem: (idx: number) => void;
  onCheckoutSuccess: (orderData: OrderData) => void;
}

const G = {
  gold: "#dfb75c", darkGold: "#b38e43", cream: "#f4ede3",
  dim: "rgba(244,237,227,0.4)", faint: "rgba(244,237,227,0.06)",
  panel: "rgba(14,11,9,0.92)", crust: "rgba(26,20,16,0.7)",
  border: "rgba(223,183,92,0.18)", borderFaint: "rgba(244,237,227,0.06)",
  green: "#2dba6a", red: "#c0392b",
};

export default function CartCheckout({ cart, user, onUpdateQuantity, onRemoveItem, onCheckoutSuccess }: CartCheckoutProps) {
  const [step, setStep]               = useState<"cart" | "delivery" | "payment">("cart");
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress]         = useState(user?.addresses?.[0] ?? "");
  const [promo, setPromo]             = useState("");
  const [discount, setDiscount]       = useState(0);
  const [promoMsg, setPromoMsg]       = useState<{ ok: boolean; text: string } | null>(null);
  const [payMethod, setPayMethod]     = useState<"qris" | "bca" | "mandiri">("qris");
  const [copied, setCopied]           = useState(false);
  const [timer, setTimer]             = useState(300);

  useEffect(() => {
    let iv: NodeJS.Timeout;
    if (step === "payment" && payMethod === "qris" && timer > 0) {
      iv = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(iv);
  }, [step, payMethod, timer]);

  const subtotal    = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = deliveryType === "pickup" ? 0 : 15000;
  const discountAmt = subtotal * discount;
  const total       = subtotal - discountAmt + shippingFee;

  const applyPromo = () => {
    if (promo.toUpperCase() === "PIZZA20") {
      setDiscount(0.2);
      setPromoMsg({ ok: true, text: "✓ Diskon 20% berhasil diaktifkan!" });
    } else {
      setDiscount(0);
      setPromoMsg({ ok: false, text: "✗ Kode tidak valid — coba: PIZZA20" });
    }
  };

  const copyVA = () => {
    navigator.clipboard.writeText(payMethod === "bca" ? "402689231104" : "1200040268923");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinish = () => {
    onCheckoutSuccess({
      id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
      items: cart, subtotal, shippingFee, discount: discountAmt, total,
      deliveryType,
      address: deliveryType === "pickup" ? "Gerai MoonSlice Utama" : address,
      paymentMethod: payMethod === "qris" ? "QRIS" : `VA ${payMethod.toUpperCase()}`,
      duration: deliveryType === "pickup" ? "Siap 15 menit" : "30 menit",
      timestamp: new Date().toLocaleTimeString("id-ID"),
    });
  };

  const fmt = (n: number) =>
    `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

  const STEPS = [
    { key: "cart",     label: "Keranjang",     icon: Package    },
    { key: "delivery", label: "Pengiriman", icon: Bike       },
    { key: "payment",  label: "Pembayaran", icon: CreditCard },
  ] as const;
  const curIdx = STEPS.findIndex(s => s.key === step);

  /* ── Empty cart ── */
  if (cart.length === 0) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center",
      padding: 40 }}>
      <div style={{ fontSize: 64 }}>🛸</div>
      <h2 className="font-display" style={{ fontSize: 36, color: G.cream }}>
        Dok Kosong
      </h2>
      <p style={{ color: G.dim, fontSize: 14, maxWidth: 280, lineHeight: 1.6 }}>
        Belum ada pizza di keranjang peluncuran. Kunjungi katalog dan pilih muatan kosmikmu!
      </p>
    </div>
  );

  return (
    <div className="pizza-bg font-body" style={{ minHeight: "100vh", color: G.cream, paddingBottom: 100 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 0" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 40 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>
            <Zap size={12} /> Pesanan
          </div>
          <h1 className="font-display glow-text-lava"
            style={{ fontSize: "clamp(48px,7vw,80px)", lineHeight: 0.88, color: G.cream }}>
            FINALISASI<br /><span className="text-lava">PESANAN</span>
          </h1>
        </div>

        {/* ── Step indicator ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 40,
          background: G.panel, border: `1px solid ${G.borderFaint}`,
          borderRadius: 16, padding: "6px", width: "fit-content" }}>
          {STEPS.map((s, i) => {
            const Icon  = s.icon;
            const done  = i < curIdx;
            const active = i === curIdx;
            return (
              <React.Fragment key={s.key}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s",
                  background: active ? "linear-gradient(135deg, #dfb75c, #b38e43)"
                             : done  ? "rgba(223,183,92,0.1)" : "transparent",
                  color: active ? "#050505" : done ? G.gold : "rgba(244,237,227,0.3)",
                  boxShadow: active ? "0 0 18px rgba(223,183,92,0.35)" : "none",
                }}>
                  <Icon size={14} />
                  {s.label}
                  {done && <Check size={12} strokeWidth={3} />}
                </div>
                {i < 2 && (
                  <ChevronRight size={14} style={{
                    color: done ? "rgba(223,183,92,0.4)" : "rgba(244,237,227,0.12)",
                    flexShrink: 0, margin: "0 2px",
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}
          className="checkout-grid">

          {/* ══════════ MAIN PANEL ══════════ */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* STEP 1 — Cart Items */}
            {step === "cart" && (
              <div className="bento-card" style={{ padding: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 20 }}>
                  <h2 className="font-display" style={{ fontSize: 26, color: G.cream }}>
                    KERANJANG
                  </h2>
                  <span className="tag tag-gold" style={{ fontSize: 10 }}>
                    {cart.reduce((s, i) => s + i.quantity, 0)} ITEM
                  </span>
                </div>
                <div className="lava-divider" />

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", borderRadius: 16,
                      background: "rgba(18,14,12,0.7)",
                      border: `1px solid ${G.borderFaint}`,
                      transition: "border-color 0.25s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = G.border)}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = G.borderFaint)}
                    >
                      {/* Image */}
                      <div style={{ width: 60, height: 60, borderRadius: 12, flexShrink: 0,
                        background: "rgba(12,10,8,0.9)", border: `1px solid ${G.borderFaint}`,
                        overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Image src={item.image} alt={item.name} width={52} height={52}
                          style={{ objectFit: "contain" }} />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 600, fontSize: 14, color: G.cream,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </p>
                        {item.toppings.length > 0 && (
                          <p style={{ fontSize: 10, color: G.gold,
                            fontFamily: "'Space Mono', monospace", marginTop: 2 }}>
                            +{item.toppings.join(" · ")}
                          </p>
                        )}
                        <p style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                          fontSize: 15, color: G.gold, marginTop: 4 }}>
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>

                      {/* Qty control */}
                      <div style={{ display: "flex", alignItems: "center", gap: 4,
                        background: "rgba(8,6,5,0.8)", border: `1px solid ${G.borderFaint}`,
                        borderRadius: 9999, padding: "3px 6px" }}>
                        <button onClick={() => onUpdateQuantity(idx, -1)} style={{
                          width: 28, height: 28, borderRadius: "50%", border: "none",
                          background: "none", cursor: "pointer", color: "rgba(244,237,227,0.4)",
                          fontSize: 18, fontWeight: 700, display: "flex",
                          alignItems: "center", justifyContent: "center", transition: "color 0.2s",
                        }}
                          onMouseEnter={e => (e.currentTarget.style.color = G.cream)}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,237,227,0.4)")}
                        >−</button>
                        <span style={{ width: 22, textAlign: "center", fontSize: 14,
                          fontFamily: "'Space Mono', monospace", color: G.cream, fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => onUpdateQuantity(idx, 1)} style={{
                          width: 28, height: 28, borderRadius: "50%", border: "none",
                          background: "none", cursor: "pointer", color: "rgba(244,237,227,0.4)",
                          fontSize: 18, fontWeight: 700, display: "flex",
                          alignItems: "center", justifyContent: "center", transition: "color 0.2s",
                        }}
                          onMouseEnter={e => (e.currentTarget.style.color = G.cream)}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(244,237,227,0.4)")}
                        >+</button>
                      </div>

                      {/* Delete */}
                      <button onClick={() => onRemoveItem(idx)} style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(192,57,43,0.4)", padding: 6, borderRadius: 8,
                        transition: "color 0.2s, background 0.2s",
                      }}
                        onMouseEnter={e => { e.currentTarget.style.color = G.red; e.currentTarget.style.background = "rgba(192,57,43,0.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "rgba(192,57,43,0.4)"; e.currentTarget.style.background = "none"; }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="lava-divider" />
                <button onClick={() => setStep("delivery")} className="btn-primary"
                  style={{ width: "100%", fontSize: 15, padding: "15px 0" }}>
                  Lanjut ke Pengiriman <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 2 — Delivery */}
            {step === "delivery" && (
              <div className="bento-card" style={{ padding: 28 }}>
                <h2 className="font-display" style={{ fontSize: 26, color: G.cream, marginBottom: 20 }}>
                  RUTE PENGIRIMAN
                </h2>
                <div className="lava-divider" />

                {/* Delivery type toggle */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {([
                    { id: "delivery", label: "Antar ke Lokasi", sub: "Rp 15.000", icon: Bike },
                    { id: "pickup",   label: "Ambil di Gerai",  sub: "Gratis",    icon: Building2 },
                  ] as const).map(opt => {
                    const Icon   = opt.icon;
                    const active = deliveryType === opt.id;
                    return (
                      <button key={opt.id} onClick={() => setDeliveryType(opt.id)} style={{
                        padding: "18px 16px", borderRadius: 18, textAlign: "left",
                        cursor: "pointer", border: `1px solid ${active ? G.border : G.borderFaint}`,
                        background: active ? "rgba(223,183,92,0.06)" : "rgba(18,14,12,0.6)",
                        transition: "all 0.25s", position: "relative", overflow: "hidden",
                        boxShadow: active ? "0 0 20px -5px rgba(223,183,92,0.15)" : "none",
                      }}>
                        {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0,
                          height: 2, background: "linear-gradient(90deg, transparent, #dfb75c, transparent)" }} />}
                        <Icon size={20} color={active ? G.gold : "rgba(244,237,227,0.3)"} style={{ marginBottom: 10 }} />
                        <p style={{ fontSize: 14, fontWeight: 600,
                          color: active ? G.cream : "rgba(244,237,227,0.45)" }}>{opt.label}</p>
                        <p style={{ fontSize: 11, fontFamily: "'Space Mono', monospace",
                          color: active ? G.gold : "rgba(244,237,227,0.25)", marginTop: 4 }}>{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>

                {deliveryType === "delivery" ? (
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 9, fontFamily: "'Space Mono', monospace",
                      color: "rgba(244,237,227,0.3)", textTransform: "uppercase",
                      letterSpacing: "0.14em", marginBottom: 8 }}>
                      KOORDINAT TUJUAN
                    </label>
                    <div style={{ position: "relative" }}>
                      <MapPin size={15} style={{ position: "absolute", left: 14, top: 14,
                        color: "rgba(223,183,92,0.4)", pointerEvents: "none" }} />
                      <textarea
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Jl. Contoh No. 1, Kota, Provinsi..."
                        rows={3}
                        className="field"
                        style={{ resize: "none", paddingLeft: 40 }}
                      />
                    </div>
                    {user?.addresses?.[0] && (
                      <button onClick={() => setAddress(user.addresses?.[0] ?? "")}
                        style={{ marginTop: 8, fontSize: 11, color: G.gold,
                          background: "none", border: "none", cursor: "pointer",
                          fontFamily: "'Space Mono', monospace", textDecoration: "underline" }}>
                        ← Pakai alamat tersimpan
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ marginBottom: 20, padding: "18px 20px", borderRadius: 16,
                    background: "rgba(18,14,12,0.6)", border: `1px solid ${G.borderFaint}`,
                    display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                      background: "rgba(223,183,92,0.08)", border: `1px solid ${G.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MapPin size={18} color={G.gold} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, color: G.cream }}>MoonSlice Gerai Utama</p>
                      <p style={{ fontSize: 11, color: "rgba(244,237,227,0.35)",
                        fontFamily: "'Space Mono', monospace", marginTop: 3 }}>
                        Jl. Pizzaria Raya No. 88 · Siap 15 menit
                      </p>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep("cart")} className="btn-ghost"
                    style={{ flex: 1, padding: "13px 0", fontSize: 14 }}>← Kembali</button>
                  <button onClick={() => setStep("payment")} className="btn-primary"
                    style={{ flex: 2, padding: "13px 0", fontSize: 14 }}>
                    Lanjut ke Bayar <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step === "payment" && (
              <div className="bento-card" style={{ padding: 28 }}>
                <h2 className="font-display" style={{ fontSize: 26, color: G.cream, marginBottom: 20 }}>
                  METODE PEMBAYARAN
                </h2>
                <div className="lava-divider" />

                {/* Method tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 24,
                  background: "rgba(18,14,12,0.7)", padding: 5, borderRadius: 14,
                  border: `1px solid ${G.borderFaint}` }}>
                  {([
                    { id: "qris",    label: "QRIS",       icon: QrCode     },
                    { id: "bca",     label: "VA BCA",      icon: CreditCard },
                    { id: "mandiri", label: "VA Mandiri",  icon: CreditCard },
                  ] as const).map(m => {
                    const Icon   = m.icon;
                    const active = payMethod === m.id;
                    return (
                      <button key={m.id} onClick={() => { setPayMethod(m.id); setTimer(300); }}
                        style={{
                          flex: 1, padding: "10px 0", borderRadius: 10, fontSize: 12,
                          fontWeight: 700, fontFamily: "'Space Mono', monospace",
                          cursor: "pointer", border: "none", display: "flex",
                          alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.25s",
                          background: active ? "linear-gradient(135deg, #dfb75c, #b38e43)" : "transparent",
                          color: active ? "#050505" : "rgba(244,237,227,0.35)",
                          boxShadow: active ? "0 0 14px rgba(223,183,92,0.3)" : "none",
                        }}>
                        <Icon size={12} /> {m.label}
                      </button>
                    );
                  })}
                </div>

                {/* QRIS */}
                {payMethod === "qris" && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                    {/* QR frame */}
                    <div style={{ padding: 16, borderRadius: 20, background: "#ffffff",
                      boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(223,183,92,0.2)" }}>
                      <div style={{ width: 168, height: 168, position: "relative",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Image src="/qris_logo.png" alt="QRIS Code" width={168} height={168} style={{ objectFit: "contain" }} />
                      </div>
                    </div>

                    {/* Timer */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 20px", borderRadius: 9999,
                      background: "rgba(18,14,12,0.8)", border: `1px solid ${G.borderFaint}` }}>
                      <Clock size={14} color={timer < 60 ? G.red : G.gold} />
                      <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                        fontSize: 18, color: timer < 60 ? G.red : G.gold }}>
                        {fmt(timer)}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(244,237,227,0.35)" }}>tersisa</span>
                    </div>

                    <p style={{ fontSize: 12, color: "rgba(244,237,227,0.4)", textAlign: "center",
                      maxWidth: 280, lineHeight: 1.7 }}>
                      Buka GoPay, OVO, DANA, atau m-Banking — lalu pindai kode QR di atas untuk menyelesaikan pembayaran.
                    </p>
                    <button onClick={handleFinish} className="btn-primary"
                      style={{ width: "100%", fontSize: 15, padding: "15px 0", gap: 8 }}>
                      <ShieldCheck size={16} /> Konfirmasi Sudah Bayar
                    </button>
                  </div>
                )}

                {/* VA panel */}
                {(payMethod === "bca" || payMethod === "mandiri") && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ padding: "20px 22px", borderRadius: 16,
                      background: "rgba(18,14,12,0.7)", border: `1px solid ${G.border}` }}>
                      <p style={{ fontSize: 9, fontFamily: "'Space Mono', monospace",
                        color: "rgba(244,237,227,0.28)", letterSpacing: "0.14em",
                        textTransform: "uppercase", marginBottom: 10 }}>
                        Nomor Virtual Account {payMethod.toUpperCase()}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                          fontSize: 22, color: G.cream, letterSpacing: "0.08em" }}>
                          {payMethod === "bca" ? "4026 8923 1104" : "120 0040268 923"}
                        </span>
                        <button onClick={copyVA} style={{
                          padding: "8px 14px", borderRadius: 10, cursor: "pointer",
                          border: `1px solid ${copied ? "rgba(45,186,106,0.4)" : G.border}`,
                          background: copied ? "rgba(45,186,106,0.1)" : "rgba(223,183,92,0.06)",
                          color: copied ? G.green : G.gold, display: "flex", alignItems: "center",
                          gap: 6, fontSize: 12, fontWeight: 700, transition: "all 0.2s",
                        }}>
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? "Disalin!" : "Salin"}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        "Buka m-Banking dan pilih menu Transfer.",
                        "Pilih Transfer Virtual Account → masukkan nomor di atas.",
                        `Masukkan nominal tepat Rp ${total.toLocaleString("id-ID")}.`,
                      ].map((txt, i) => (
                        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <span style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                            background: "rgba(223,183,92,0.12)", border: `1px solid ${G.border}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontFamily: "'Space Mono', monospace",
                            fontWeight: 700, color: G.gold }}>{i + 1}</span>
                          <p style={{ fontSize: 13, color: "rgba(244,237,227,0.55)", lineHeight: 1.6 }}>{txt}</p>
                        </div>
                      ))}
                    </div>

                    <button onClick={handleFinish} className="btn-primary"
                      style={{ width: "100%", fontSize: 15, padding: "15px 0", gap: 8 }}>
                      <ShieldCheck size={16} /> Konfirmasi Sudah Transfer
                    </button>
                  </div>
                )}

                <div style={{ marginTop: 12 }}>
                  <button onClick={() => setStep("delivery")} className="btn-ghost"
                    style={{ width: "100%", padding: "12px 0", fontSize: 14 }}>← Kembali</button>
                </div>
              </div>
            )}
          </div>

          {/* ══════════ ORDER SUMMARY SIDEBAR ══════════ */}
          <div style={{ position: "sticky", top: 100 }}>
            <div className="bento-card" style={{ padding: 24 }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Package size={16} color={G.gold} />
                <h3 className="font-display" style={{ fontSize: 18, color: G.cream }}>RINGKASAN</h3>
              </div>
              <div className="lava-divider" />

              {/* Items list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", gap: 8 }}>
                    <span style={{ fontSize: 13, color: "rgba(244,237,227,0.55)", lineHeight: 1.4 }}>
                      {item.name}
                      <span style={{ fontFamily: "'Space Mono', monospace",
                        fontSize: 10, color: "rgba(244,237,227,0.25)", marginLeft: 6 }}>
                        ×{item.quantity}
                      </span>
                    </span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12,
                      color: G.cream, flexShrink: 0 }}>
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code */}
              <div style={{ display: "flex", gap: 8, marginBottom: promoMsg ? 6 : 16 }}>
                <div style={{ flex: 1, position: "relative" }}>
                  <Tag size={13} style={{ position: "absolute", left: 12, top: "50%",
                    transform: "translateY(-50%)", color: "rgba(244,237,227,0.25)", pointerEvents: "none" }} />
                  <input value={promo} onChange={e => setPromo(e.target.value)}
                    placeholder="Kode promo" className="field"
                    style={{ paddingLeft: 34, paddingTop: 10, paddingBottom: 10, fontSize: 12 }}
                    onKeyDown={e => e.key === "Enter" && applyPromo()}
                  />
                </div>
                <button onClick={applyPromo} className="btn-lava"
                  style={{ padding: "0 14px", borderRadius: 12, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  Pakai
                </button>
              </div>
              {promoMsg && (
                <p style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", marginBottom: 14,
                  color: promoMsg.ok ? G.green : G.red }}>
                  {promoMsg.text}
                </p>
              )}

              {/* Totals */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(244,237,227,0.45)" }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: "'Space Mono', monospace" }}>
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                {discountAmt > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", color: G.green }}>
                    <span>Diskon 20%</span>
                    <span style={{ fontFamily: "'Space Mono', monospace" }}>
                      −Rp {discountAmt.toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(244,237,227,0.45)" }}>
                  <span>Ongkos kirim</span>
                  <span style={{ fontFamily: "'Space Mono', monospace" }}>
                    {shippingFee > 0 ? `Rp ${shippingFee.toLocaleString("id-ID")}` : "Gratis"}
                  </span>
                </div>
              </div>

              <div className="lava-divider" />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: G.cream }}>Total</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  fontSize: 24, color: G.gold }}>
                  Rp {total.toLocaleString("id-ID")}
                </span>
              </div>

              {/* Guarantee banner */}
              <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 14,
                background: "rgba(45,186,106,0.06)", border: "1px solid rgba(45,186,106,0.18)",
                display: "flex", gap: 10, alignItems: "flex-start" }}>
                <ShieldCheck size={15} color={G.green} style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 11, color: "rgba(244,237,227,0.45)", lineHeight: 1.6 }}>
                  Garansi tiba dalam 30 menit atau pizza Anda{" "}
                  <strong style={{ color: "rgba(244,237,227,0.7)" }}>100% gratis</strong>!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
