/* 
  MoonSlice Shared Button Styles
  These are injected as a <style> tag from each component to guarantee rendering
  regardless of Tailwind CSS processing pipeline.
*/
export const BTN_PRIMARY: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "14px 32px",
  borderRadius: "9999px",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 700,
  fontSize: "14px",
  letterSpacing: "0.01em",
  background: "linear-gradient(135deg, #dfb75c 0%, #b38e43 100%)",
  color: "#050505",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 4px 20px rgba(223,183,92,0.25), 0 1px 0 rgba(255,255,255,0.2) inset",
  transition: "box-shadow 0.25s ease, transform 0.2s ease",
  position: "relative",
  overflow: "hidden",
  whiteSpace: "nowrap" as const,
};

export const BTN_GHOST: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "13px 28px",
  borderRadius: "9999px",
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  background: "rgba(244,237,227,0.05)",
  color: "#f4ede3",
  border: "1px solid rgba(244,237,227,0.18)",
  cursor: "pointer",
  transition: "background 0.25s ease, border-color 0.25s ease",
  whiteSpace: "nowrap" as const,
};

export const GLASS_CARD: React.CSSProperties = {
  background: "rgba(26,20,16,0.75)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(244,237,227,0.08)",
  borderRadius: "20px",
  boxShadow: "0 1px 0 rgba(244,237,227,0.05) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
  position: "relative" as const,
  overflow: "hidden" as const,
};

import React from "react";
