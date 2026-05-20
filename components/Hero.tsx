"use client";

import React from "react";
import Image from "next/image";
import { Rocket, ShieldCheck, Stars, Compass } from "lucide-react";

interface HeroProps {
  onOrderNow: () => void;
  onOpenLogin: () => void;
  user: Record<string, unknown> | null | undefined;
}

export default function Hero({ onOrderNow, onOpenLogin, user }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 font-mono">
      {/* Spaceship cockpit HUD nebula lights */}
      <div className="absolute top-20 left-1/4 h-80 w-80 rounded-full bg-space-cyan/10 blur-[130px] -z-1"></div>
      <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-space-gold/5 blur-[150px] -z-1"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headline, Description, CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Elegant stardust tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold bg-space-cyan/15 text-space-cyan border border-space-cyan/35 tracking-widest uppercase animate-pulse">
              <Stars className="h-3.5 w-3.5 text-space-cyan animate-spin-slow" />
              <span>[RANSUEM ANTARIKSA AKTIF]</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5.5xl font-serif uppercase leading-tight">
              Sensasi Pizza <br className="hidden sm:inline" />
              <span className="text-gold-gradient block my-1">
                Kelezatan Kosmis
              </span>
              di Semesta!
            </h1>

            {/* Subheadline description */}
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed font-sans font-medium">
              Kami memfermentasikan adonan pizza dalam gravitasi mikro di orbit stasiun MoonSlice, lalu memanggangnya langsung menggunakan reaktor termal energi bintang untuk keju kosmik yang berpadu dengan cinta yang tulus.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onOrderNow}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-space-gold-dark to-space-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-black hover:shadow-[0_0_25px_rgba(223,183,92,0.35)] transition-all cursor-pointer font-serif"
              >
                <Rocket className="h-4 w-4" />
                <span>Pesan Pizza Sekarang</span>
              </button>
              
              {!user && (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center justify-center gap-2 rounded-full border border-space-cyan/40 bg-transparent hover:bg-space-cyan/10 px-8 py-4 text-xs font-bold uppercase tracking-widest text-space-cyan hover:border-space-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Dashboard Astronot</span>
                </button>
              )}
            </div>

            {/* Star Rating & trust */}
            <div className="flex items-center gap-4 pt-6 border-t border-space-cyan/15 w-full justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border border-space-cyan/25 bg-space-cyan/5 flex items-center justify-center text-xs shadow-md">
                    🧑‍🚀
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start text-left">
                <div className="flex text-space-gold text-[11px] tracking-widest">
                  {"★".repeat(5)}
                </div>
                <span className="text-[9px] text-zinc-500 font-serif font-bold uppercase tracking-wider mt-1">
                  Disukai oleh 10,000+ Komandan Stasiun Angkasa
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Logo visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Elegant rotating orbits */}
            <div className="absolute h-80 w-80 sm:h-[400px] sm:w-[400px] rounded-full border border-space-cyan/20 animate-pulse-slow"></div>
            <div className="absolute h-64 w-64 sm:h-[320px] sm:w-[320px] rounded-full border border-dashed border-space-cyan/30 animate-slow-spin"></div>
            
            {/* High-res Logo visual frame - Pitch Black container to blend with original logo */}
            <div className="relative h-64 w-64 sm:h-88 sm:w-88 rounded-full overflow-hidden border-2 border-space-cyan/45 shadow-[0_0_35px_rgba(0,240,255,0.15)] bg-black animate-float p-1.5">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/logo.jpeg"
                  alt="MoonSlice Celestial Art"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Gold sparkling stars orbiting */}
              <span className="absolute top-4 right-4 text-2xl animate-pulse">✨</span>
              <span className="absolute bottom-8 left-4 text-3xl">🌙</span>
              <span className="absolute top-12 left-10 text-xl animate-bounce">🪐</span>
            </div>
          </div>
        </div>

        {/* Space Stats Bottom Ribbon */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 rounded-3xl border border-space-cyan/20 bg-[#0a0a0c] p-8 luxury-glass-card shadow-lg">
          <div className="flex items-center gap-4 text-left justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-space-cyan/15 text-space-cyan border border-space-cyan/25">
              <Compass className="h-6 w-6 animate-slow-spin" />
            </div>
            <div className="flex flex-col font-serif">
              <span className="text-xl font-bold text-white">1,000+</span>
              <span className="text-[9px] text-space-cyan uppercase tracking-widest font-semibold mt-0.5">Stasiun Orbit Galaksi</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left justify-center sm:justify-start border-y sm:border-y-0 sm:border-x border-space-cyan/10 py-4 sm:py-0 sm:px-6">
            <div className="p-3 rounded-2xl bg-space-cyan/15 text-space-cyan border border-space-cyan/25">
              <Stars className="h-6 w-6 animate-pulse" />
            </div>
            <div className="flex flex-col font-serif">
              <span className="text-xl font-bold text-white">4.9 / 5.0</span>
              <span className="text-[9px] text-space-cyan uppercase tracking-widest font-semibold mt-0.5">Rating Kelezatan Semesta</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left justify-center sm:justify-start">
            <div className="p-3 rounded-2xl bg-space-cyan/15 text-space-cyan border border-space-cyan/25">
              <Rocket className="h-6 w-6 animate-bounce" />
            </div>
            <div className="flex flex-col font-serif">
              <span className="text-xl font-bold text-white">15 Menit</span>
              <span className="text-[9px] text-space-cyan uppercase tracking-widest font-semibold mt-0.5">Pengiriman Roket Warp</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
