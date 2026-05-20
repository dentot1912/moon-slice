"use client";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import Menu from "../components/Menu";
import CartCheckout from "../components/CartCheckout";
import ProfileDashboard from "../components/ProfileDashboard";
import LoginModal from "../components/LoginModal";
import OrderTracker from "../components/OrderTracker";
import { ShoppingBag, X, ShoppingCart, Flame, Check, Trash2 } from "lucide-react";

export interface UserProfile {
  name: string;
  email: string;
  rank?: string;
  points?: number;
  addresses?: string[];
}

export interface CartItem {
  id: string; name: string; price: number; toppings: string[];
  quantity: number; originalPrice: number; image: string;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  deliveryType: "delivery" | "pickup";
  address: string;
  paymentMethod: string;
  duration: string;
  timestamp: string;
}

export interface CartPizza {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState("delivery");
  const [activeOrder, setActiveOrder] = useState<OrderData | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToast(msg); setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleAddToCart = (pizza: CartPizza, toppings: string[], totalPrice: number) => {
    const idx = cart.findIndex(i => i.id === pizza.id && JSON.stringify(i.toppings.sort()) === JSON.stringify([...toppings].sort()));
    if (idx > -1) {
      const u = [...cart]; u[idx].quantity += 1; setCart(u);
    } else {
      setCart([...cart, { id: pizza.id, name: pizza.name, price: totalPrice, toppings, quantity: 1, originalPrice: pizza.price, image: pizza.image }]);
    }
    triggerToast(`🍕 ${pizza.name} ditambahkan!`);
  };

  const handleUpdateQty = (idx: number, change: number) => {
    const u = [...cart]; u[idx].quantity += change;
    if (u[idx].quantity <= 0) { u.splice(idx, 1); triggerToast("Item dihapus dari keranjang."); }
    setCart(u);
  };

  const handleRemoveItem = (idx: number) => {
    const name = cart[idx].name;
    setCart(cart.filter((_, i) => i !== idx));
    triggerToast(`${name} dihapus.`);
  };

  const handleLoginSuccess = (userData: UserProfile) => {
    setUser(userData); triggerToast(`Selamat datang, ${userData.name}! 🎉`);
  };

  const handleLogout = () => {
    setUser(null); setActiveSection("home"); triggerToast("Berhasil keluar.");
  };

  const handleCheckoutSuccess = (orderData: OrderData) => {
    setActiveOrder(orderData); setCart([]); setActiveSection("tracker");
    triggerToast("✓ Pesanan berhasil! Kurir sedang menuju lokasi Anda.");
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  /* ── Style constants ── */
  const C = {
    bg: "#050505", panel: "rgba(10,10,10,0.97)", border: "rgba(244,237,227,0.07)",
    text: "#f4ede3", dim: "rgba(244,237,227,0.45)", lava: "#dfb75c", ember: "#eddab9",
    crust: "#1a1410", crustMid: "#221910",
  };

  return (
    <div className="site-bg" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", color: C.text, position: "relative" }}>
      <Navbar
        user={user} cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setLoginOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        hasActiveOrder={!!activeOrder}
      />

      <main style={{ flex: 1 }}>
        {activeSection === "home"     && <LandingPage onOrderNow={() => setActiveSection("menu")} onOpenLogin={() => setLoginOpen(true)} user={user} onAddToCart={handleAddToCart} />}
        {activeSection === "menu"     && <Menu onAddToCart={handleAddToCart} />}
        {activeSection === "delivery" && <CartCheckout cart={cart} user={user} onUpdateQuantity={handleUpdateQty} onRemoveItem={handleRemoveItem} onCheckoutSuccess={handleCheckoutSuccess} />}
        {activeSection === "profile"  && <ProfileDashboard user={user} onLogout={handleLogout} onSelectSection={setActiveSection} />}
        {activeSection === "tracker"  && <OrderTracker activeOrder={activeOrder} onOrderFinished={() => { setActiveOrder(null); setActiveSection("home"); triggerToast("💚 Terima kasih! Pesanan selesai."); }} />}
      </main>

      {/* ══════════════ COSMO-LOGISTICS TERMINAL DECK (FOOTER) ══════════════ */}
      <footer style={{
        borderTop: "1px solid rgba(223, 183, 92, 0.15)",
        background: "rgba(10, 8, 7, 0.98)",
        padding: "80px 24px 40px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Holographic background scanner grid line */}
        <div className="footer-grid-overlay" style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(223, 183, 92, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(223, 183, 92, 0.01) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          opacity: 0.8
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10 }}>
          
          {/* Main 4-Column Terminal Grid */}
          <div className="footer-terminal-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr 1fr 1fr",
            gap: "48px",
            marginBottom: "60px"
          }}>
            
            {/* Column 1: Brand & Telemetry Deck */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <div className="font-display" style={{ fontSize: "28px", color: "#f4ede3", fontFamily: "Cinzel, serif", letterSpacing: "0.05em" }}>
                  MOON<span style={{ background: "linear-gradient(135deg,#dfb75c,#b38e43)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontWeight: 800 }}>SLICE</span>
                </div>
                <p style={{ fontSize: "12px", color: "rgba(244, 237, 227, 0.4)", lineHeight: 1.6, marginTop: "8px" }}>
                  Penyedia spesifikasi ransum kosmis terbaik, dibuat dalam mikrogravitasi konstan untuk astronot premium di seluruh penjuru galaksi.
                </p>
              </div>
            </div>

            {/* Column 2: Space Navigation */}
            <div>
              <h4 className="font-display" style={{ fontSize: "14px", color: "#dfb75c", letterSpacing: "0.15em", marginBottom: "20px", borderBottom: "1px solid rgba(223, 183, 92, 0.15)", paddingBottom: "8px" }}>
                NAVIGASI DECK
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
                {[
                  { label: "[01] Halaman Utama (Home)", action: () => setActiveSection("home") },
                  { label: "[02] Menu Pizza", action: () => setActiveSection("menu") },
                  {
                    label: "[03] Lacak Pesanan",
                    action: () => {
                      if (activeOrder) {
                        setActiveSection("tracker");
                      } else {
                        triggerToast("📡 Tidak ada transmisi kargo aktif saat ini.");
                      }
                    },
                    highlight: !!activeOrder
                  },
                  { label: "[04] Profil", action: () => setActiveSection("profile") }
                ].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={item.action}
                      className="footer-nav-link"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: item.highlight ? "#dfb75c" : "rgba(244, 237, 227, 0.45)",
                        padding: 0,
                        textAlign: "left",
                        fontSize: "13px",
                        fontFamily: "'Space Mono', monospace",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      {item.label}
                      {item.highlight && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#dfb75c", display: "inline-block", animation: "pulse 1.5s infinite" }} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Technical Specifications */}
            <div>
              <h4 className="font-display" style={{ fontSize: "14px", color: "#dfb75c", letterSpacing: "0.15em", marginBottom: "20px", borderBottom: "1px solid rgba(223, 183, 92, 0.15)", paddingBottom: "8px" }}>
                Sosial Media
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "rgba(244, 237, 227, 0.45)" }}>
                {[
                  { name: "Tiktok", desc: "Adonan difermentasi 72 jam di orbit." },
                  { name: "Instagram", desc: "Pemanggangan presisi kiln fusi 450°C." },
                  { name: "Facebook", desc: "Insulasi komposit menahan suhu pizza." }
                ].map((spec, i) => (
                  <li key={i} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ color: "#f4ede3", fontWeight: 700, fontSize: "12px" }}>{spec.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Transmission Capture (Newsletter) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <h4 className="font-display" style={{ fontSize: "14px", color: "#dfb75c", letterSpacing: "0.15em", marginBottom: "8px", display: "block" }}>
                  Kontak Kami
                </h4>
                <p style={{ fontSize: "11px", color: "rgba(244, 237, 227, 0.35)", lineHeight: 1.5 }}>
                  Daftarkan email Anda untuk menerima diskon kilat.
                </p>
              </div>

              {/* High-tech messaging capture block */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                background: "rgba(13, 10, 8, 0.4)",
                border: "1px solid rgba(244, 237, 227, 0.06)",
                padding: "12px",
                borderRadius: "14px"
              }}>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  className="footer-transmission-input"
                  style={{
                    width: "100%",
                    background: "rgba(5, 5, 5, 0.8)",
                    border: "1px solid rgba(223, 183, 92, 0.2)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    fontFamily: "'Space Mono', monospace",
                    color: "#f4ede3",
                    outline: "none",
                    transition: "all 0.3s ease"
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value;
                      if (val.trim()) {
                        triggerToast("✓ Sinyal terenkripsi terkirim ke satelit!");
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const parent = e.currentTarget.parentElement;
                    const input = parent?.querySelector("input") as HTMLInputElement;
                    if (input && input.value.trim()) {
                      triggerToast("✓ Sinyal terenkripsi terkirim ke satelit!");
                      input.value = "";
                    } else {
                      triggerToast("📡 Masukkan alamat transmisi koordinat.");
                    }
                  }}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #dfb75c 0%, #b38e43 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    padding: "8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    color: "#050505",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(223, 183, 92, 0.2)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "brightness(1.1)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(223, 183, 92, 0.35)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = "none";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(223, 183, 92, 0.2)";
                  }}
                >
                  KIRIM
                </button>
              </div>
            </div>

          </div>

          <div style={{ borderTop: "1px solid rgba(244, 237, 227, 0.05)", paddingTop: "30px", marginTop: "30px" }} />

          {/* Security Clearance Monospace Bottom Bar */}
          <div className="footer-bottom-bar" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div>
              <p style={{ fontSize: "11px", color: "rgba(244, 237, 227, 0.25)", fontFamily: "'Space Mono', monospace" }}>
                © 2026 MOONSLICE ORBITAL. HAK CIPTA DILINDUNGI.
              </p>
            </div>
            
            {/* Bottom Links */}
            <div style={{ display: "flex", gap: "28px" }}>
              {["Privasi", "Syarat", "Hubungi Kami"].map(l => (
                <a key={l} href="#" className="footer-bottom-link" style={{
                  fontSize: "12px",
                  fontFamily: "'Space Mono', monospace",
                  color: "rgba(244, 237, 227, 0.3)",
                  textDecoration: "none",
                  transition: "all 0.2s ease"
                }}>{l}</a>
              ))}
            </div>
          </div>

        </div>

        {/* Embedded Interactive Styles */}
        <style>{`
          @keyframes footer-ping {
            0% { transform: scale(0.9); opacity: 0.8; }
            50% { transform: scale(1.4); opacity: 0; }
            100% { transform: scale(0.9); opacity: 0; }
          }
          .footer-ping-dot {
            position: relative;
          }
          .footer-ping-dot::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid #2dba6a;
            animation: footer-ping 1.8s ease-out infinite;
          }
          .footer-nav-link:hover {
            color: #dfb75c !important;
            padding-left: 6px !important;
            text-shadow: 0 0 8px rgba(223, 183, 92, 0.4);
          }
          .footer-transmission-input:focus {
            border-color: #dfb75c !important;
            box-shadow: 0 0 10px rgba(223, 183, 92, 0.15);
          }
          .footer-bottom-link {
            position: relative;
          }
          .footer-bottom-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0%;
            height: 1px;
            background: #dfb75c;
            transition: width 0.25s ease;
          }
          .footer-bottom-link:hover {
            color: #f4ede3 !important;
          }
          .footer-bottom-link:hover::after {
            width: 100%;
          }
          @media (max-width: 820px) {
            .footer-terminal-grid {
              grid-template-columns: 1fr !important;
              gap: 36px !important;
            }
            .footer-bottom-bar {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
          }
        `}</style>
      </footer>

      {/* ════════════ CART DRAWER ════════════ */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <div onClick={() => setCartOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }} />
          <div style={{ position: "absolute", inset: 0, right: 0, left: "auto", width: 400, display: "flex", flexDirection: "column", background: "rgba(13,10,9,0.98)", borderLeft: "1px solid rgba(244,237,227,0.07)", boxShadow: "-20px 0 60px rgba(0,0,0,0.5)" }}>

            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(223,183,92,0.5),transparent)" }} />

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid rgba(244,237,227,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ShoppingBag size={18} color="#dfb75c" />
                <h2 className="font-display" style={{ fontSize: 22, color: "#f4ede3" }}>KERANJANG</h2>
                {cartCount > 0 && (
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#dfb75c,#b38e43)", color: "#050505", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(223,183,92,0.4)" }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(244,237,227,0.3)", padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, textAlign: "center" }}>
                  <ShoppingCart size={48} color="rgba(244,237,227,0.1)" />
                  <p style={{ color: "rgba(244,237,227,0.3)", fontSize: 14 }}>Keranjang masih kosong.</p>
                  <button onClick={() => { setCartOpen(false); setActiveSection("menu"); }} className="btn-primary" style={{ fontSize: 13, padding: "10px 24px" }}>
                    Lihat Menu
                  </button>
                </div>
              ) : cart.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: 12, alignItems: "center", padding: "14px", borderRadius: 14, background: "rgba(26,20,16,0.8)", border: "1px solid rgba(244,237,227,0.06)" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: "#1a1410", border: "1px solid rgba(244,237,227,0.05)", flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Image src={item.image} alt={item.name} width={44} height={44} style={{ objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, color: "#f4ede3", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                    {item.toppings.length > 0 && (
                      <p style={{ fontSize: 10, color: "#dfb75c", fontFamily: "'Space Mono',monospace", marginTop: 2 }}>+{item.toppings.join(", ")}</p>
                    )}
                    <p style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 14, color: "#dfb75c", marginTop: 4 }}>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(13,10,9,0.8)", border: "1px solid rgba(244,237,227,0.08)", borderRadius: 9999, padding: "2px 4px" }}>
                      <button onClick={() => handleUpdateQty(idx, -1)} style={{ width: 24, height: 24, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", color: "rgba(244,237,227,0.4)", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ width: 20, textAlign: "center", fontSize: 13, fontFamily: "'Space Mono',monospace", color: "#f4ede3", fontWeight: 700 }}>{item.quantity}</span>
                      <button onClick={() => handleUpdateQty(idx, 1)} style={{ width: 24, height: 24, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", color: "rgba(244,237,227,0.4)", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                    <button onClick={() => handleRemoveItem(idx)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(192,57,43,0.5)", padding: 2 }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: "16px 24px 28px", borderTop: "1px solid rgba(244,237,227,0.06)", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: "rgba(244,237,227,0.45)" }}>Total</span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 22, color: "#dfb75c" }}>Rp {cartTotal.toLocaleString("id-ID")}</span>
                </div>
                <button onClick={() => { setCartOpen(false); setActiveSection("delivery"); }} className="btn-primary" style={{ fontSize: 15 }}>
                  <Flame size={18} /> Lanjut Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />

      {/* Toast */}
      {showToast && (
        <div style={{
          position: "fixed", bottom: 28, left: 28, zIndex: 60, maxWidth: 320,
          background: "rgba(10,10,10,0.97)", border: "1px solid rgba(223,183,92,0.35)",
          borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(223,183,92,0.1)",
          animation: "fade-in-up 0.3s ease",
        }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(223,183,92,0.15)", border: "1px solid rgba(223,183,92,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Check size={16} color="#dfb75c" />
          </div>
          <p style={{ fontSize: 13, color: "#f4ede3", fontWeight: 500 }}>{toast}</p>
        </div>
      )}
    </div>
  );
}
