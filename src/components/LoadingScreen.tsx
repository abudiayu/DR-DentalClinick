/**
 * LoadingScreen — cinematic brand intro for Dr. Muhammed Zain Dental Clinic
 *
 * Design system:
 *   - Gradient background: deep navy → teal-mint
 *   - Floating soft-glow blobs for depth (CSS @keyframes, GPU-only transforms)
 *   - Staged "boom" text reveal: Welcome to / Dr. Muhammed Zain / Dental Clinic
 *   - Self-drawing underline beneath the clinic name
 *   - Slim gradient progress bar at the bottom
 *   - Slow-network warning after 5 s
 *   - Entire screen scales + fades out when visible → false
 *   - prefers-reduced-motion: skips scale/translate, keeps opacity only
 */

import { useEffect, useRef, useState } from 'react'
import i18n from '../i18n'

// ─── Translation helper (above React tree — direct i18n instance access) ──────
function t(key: 'slow'): string {
  return i18n.t(`loading.${key}`)
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface LoadingScreenProps {
  visible: boolean
  onDone:  () => void
}

// ─── Inline styles object (avoids an external CSS file) ──────────────────────
const CYAN_LIGHT  = '#67e8f9'   // cyan-300 — text highlights
const CYAN        = '#22d3ee'   // cyan-400 — primary accent
const TEAL_DARK   = '#0e7490'   // progress bar end
const NAVY        = '#0b1120'   // bg start
const NAVY_MID    = '#0d1a2e'   // bg mid

const keyframes = `
/* ─── Blob float animations ─────────────────────────────────────── */
@keyframes ls-blob1 {
  0%,100% { transform: translate(0,   0)   scale(1);   }
  40%      { transform: translate(40px,-30px) scale(1.08); }
  70%      { transform: translate(-20px, 20px) scale(0.96); }
}
@keyframes ls-blob2 {
  0%,100% { transform: translate(0, 0) scale(1);     }
  35%     { transform: translate(-50px, 25px) scale(1.06); }
  65%     { transform: translate(30px,-20px) scale(0.97); }
}
@keyframes ls-blob3 {
  0%,100% { transform: translate(0, 0)   scale(1);   }
  45%     { transform: translate(25px, 40px) scale(1.04); }
  75%     { transform: translate(-30px,-15px) scale(0.98); }
}

/* ─── Radial pulse glow ──────────────────────────────────────────── */
@keyframes ls-glow {
  0%,100% { opacity: 0.18; transform: scale(1);    }
  50%     { opacity: 0.32; transform: scale(1.12); }
}

/* ─── Text "boom" reveal: scale(0.82)+opacity0 → scale(1)+opacity1 ─ */
@keyframes ls-boom {
  0%   { opacity: 0; transform: scale(0.82) translateY(8px); }
  60%  { opacity: 1; transform: scale(1.02) translateY(-1px); }
  100% { opacity: 1; transform: scale(1)    translateY(0);    }
}

/* ─── "Welcome to" slides up from slight bottom ─────────────────── */
@keyframes ls-slide-up {
  0%   { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* ─── "Dental Clinic" — letter-spacing expand ───────────────────── */
@keyframes ls-spread {
  0%   { opacity: 0; letter-spacing: -0.04em; transform: translateY(6px); }
  60%  { opacity: 1; letter-spacing: 0.18em;  transform: translateY(0); }
  100% { opacity: 1; letter-spacing: 0.12em;  transform: translateY(0); }
}

/* ─── Underline draws itself left → right ───────────────────────── */
@keyframes ls-underline {
  0%   { transform: scaleX(0); opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: scaleX(1); opacity: 1; }
}

/* ─── Progress bar gradient sweep ───────────────────────────────── */
@keyframes ls-bar {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

/* ─── Slow-network warning fade-in ─────────────────────────────── */
@keyframes ls-fadein {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── Dot pulse (loading dots) ───────────────────────────────────── */
@keyframes ls-dot {
  0%,80%,100% { transform: scale(0.6); opacity: 0.35; }
  40%          { transform: scale(1);   opacity: 1;    }
}

/* ─── Exit: entire screen scales down + fades out ───────────────── */
@keyframes ls-exit {
  0%   { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.04); }
}

/* ─── Reduced-motion overrides ───────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  @keyframes ls-boom        { from { opacity:0 } to { opacity:1 } }
  @keyframes ls-slide-up    { from { opacity:0 } to { opacity:1 } }
  @keyframes ls-spread      { from { opacity:0 } to { opacity:1 } }
  @keyframes ls-underline   { from { opacity:0 } to { opacity:1 } }
  @keyframes ls-blob1,
  @keyframes ls-blob2,
  @keyframes ls-blob3,
  @keyframes ls-glow        { from {} to {} }
  @keyframes ls-exit        { from { opacity:1 } to { opacity:0 } }
}
`

export default function LoadingScreen({ visible, onDone }: LoadingScreenProps) {
  const [isSlow,   setIsSlow]   = useState(false)
  const [exiting,  setExiting]  = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  // Inject keyframes once
  useEffect(() => {
    if (document.getElementById('ls-kf')) return
    const s = document.createElement('style')
    s.id = 'ls-kf'
    s.textContent = keyframes
    document.head.appendChild(s)
    return () => { /* leave style tag — harmless after unmount */ }
  }, [])

  // Slow-network warning
  useEffect(() => {
    if (!visible) return
    const id = setTimeout(() => setIsSlow(true), 5_000)
    return () => clearTimeout(id)
  }, [visible])

  // Exit animation
  useEffect(() => {
    if (visible) return
    setExiting(true)
    const id = setTimeout(() => onDoneRef.current(), 480)
    return () => clearTimeout(id)
  }, [visible])

  // ── Shared animation timing ─────────────────────────────────────────────
  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Dr. Muhammed Zain Dental Clinic"
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     9999,
        overflow:   'hidden',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        /* Gradient background — deep navy → teal */
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%,   #0f3460 0%, transparent 65%),
          radial-gradient(ellipse 60% 50% at 80% 100%,  #0e4d4d 0%, transparent 60%),
          linear-gradient(160deg, ${NAVY} 0%, ${NAVY_MID} 50%, #071c1c 100%)
        `,

        /* Exit animation */
        animation: exiting
          ? `ls-exit 0.48s ${EASE} forwards`
          : undefined,
      }}
    >

      {/* ── Floating blob 1 ────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-15%', left: '-10%',
        width: 'clamp(320px, 55vw, 700px)',
        height: 'clamp(320px, 55vw, 700px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)',
        filter: 'blur(60px)',
        animation: `ls-blob1 14s ease-in-out infinite`,
        willChange: 'transform',
      }} />

      {/* ── Floating blob 2 ────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: '-20%', right: '-15%',
        width: 'clamp(280px, 50vw, 650px)',
        height: 'clamp(280px, 50vw, 650px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,116,144,0.18) 0%, transparent 70%)',
        filter: 'blur(70px)',
        animation: `ls-blob2 18s ease-in-out infinite`,
        willChange: 'transform',
      }} />

      {/* ── Floating blob 3 — warm accent ──────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '40%', left: '55%',
        width: 'clamp(200px, 35vw, 450px)',
        height: 'clamp(200px, 35vw, 450px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(103,232,249,0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        animation: `ls-blob3 22s ease-in-out infinite`,
        willChange: 'transform',
      }} />

      {/* ── Radial glow behind text ─────────────────────────────────────── */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(280px, 60vw, 700px)',
        height: 'clamp(180px, 30vw, 380px)',
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(34,211,238,0.1) 0%, transparent 70%)`,
        animation: `ls-glow 3.5s ease-in-out infinite`,
        pointerEvents: 'none',
      }} />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CONTENT BLOCK                                                     */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 clamp(16px, 5vw, 48px)',
        maxWidth: '680px',
        width: '100%',
      }}>

        {/* ── Logo badge ───────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            width:  'clamp(52px, 8vw, 68px)',
            height: 'clamp(52px, 8vw, 68px)',
            borderRadius: '50%',
            border: `1.5px solid rgba(103,232,249,0.45)`,
            background: 'rgba(34,211,238,0.07)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'clamp(20px, 4vh, 32px)',
            boxShadow: `0 0 32px rgba(34,211,238,0.18), inset 0 1px 0 rgba(255,255,255,0.07)`,
            opacity: 0,
            animation: `ls-slide-up 0.6s ${EASE} 0.1s forwards`,
          }}
        >
          <span style={{
            fontSize: 'clamp(20px, 3.5vw, 28px)',
            fontWeight: 800,
            color: CYAN_LIGHT,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>D</span>
        </div>

        {/* ── Part 1: "WELCOME TO" ─────────────────────────────────────── */}
        <span style={{
          display: 'block',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(0.65rem, 1.8vw, 0.85rem)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(103,232,249,0.75)',
          marginBottom: 'clamp(10px, 2vh, 16px)',
          opacity: 0,
          animation: `ls-slide-up 0.55s ${EASE} 0.35s forwards`,
        }}>
          Welcome to
        </span>

        {/* ── Part 2: "Dr. Muhammed Zain" ─────────────────────────────── */}
        <h1 style={{
          margin: 0,
          fontFamily: 'Georgia, "Playfair Display", "Times New Roman", serif',
          fontWeight: 700,
          fontSize: 'clamp(1.9rem, 6.5vw, 4.2rem)',
          lineHeight: 1.08,
          color: '#ffffff',
          textShadow: `
            0 0 60px rgba(34,211,238,0.35),
            0 2px 20px rgba(0,0,0,0.5),
            0 1px 0 rgba(255,255,255,0.1)
          `,
          marginBottom: 'clamp(8px, 1.5vh, 14px)',
          opacity: 0,
          animation: `ls-boom 0.65s ${EASE} 0.75s forwards`,
        }}>
          Dr. Muhammed Zain
        </h1>

        {/* ── Part 3: "DENTAL CLINIC" ──────────────────────────────────── */}
        <span style={{
          display: 'block',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(0.85rem, 2.8vw, 1.35rem)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: CYAN_LIGHT,
          marginBottom: 0,
          opacity: 0,
          animation: `ls-spread 0.75s ${EASE} 1.38s forwards`,
        }}>
          Dental Clinic
        </span>

        {/* ── Self-drawing underline ────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          marginTop: 'clamp(14px, 2.5vh, 22px)',
          width: 'clamp(80px, 18vw, 160px)',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          opacity: 0,
          animation: `ls-underline 0.8s ${EASE} 2.0s forwards`,
        }} />

        {/* ── Loading dots ─────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            gap: '7px',
            marginTop: 'clamp(28px, 5vh, 44px)',
          }}
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: CYAN,
              opacity: 0.35,
              animation: `ls-dot 1.4s ease-in-out ${(i * 0.22).toFixed(2)}s infinite`,
            }} />
          ))}
        </div>

        {/* ── Slim gradient progress bar ───────────────────────────────── */}
        <div style={{
          marginTop: 'clamp(14px, 2.5vh, 20px)',
          width: 'clamp(180px, 38vw, 320px)',
          height: '2px',
          borderRadius: '9999px',
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, ${TEAL_DARK}, ${CYAN}, ${CYAN_LIGHT})`,
            borderRadius: '9999px',
            animation: `ls-bar 2.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s infinite`,
          }} />
        </div>

        {/* ── Slow-network warning ─────────────────────────────────────── */}
        <div style={{
          marginTop: 'clamp(14px, 2vh, 20px)',
          height: '18px',   /* reserve space so layout doesn't jump */
        }}>
          {isSlow && (
            <span style={{
              display: 'block',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontSize: 'clamp(0.68rem, 1.6vw, 0.76rem)',
              color: 'rgba(251,191,36,0.8)',   /* amber — warm but not alarming */
              letterSpacing: '0.02em',
              animation: `ls-fadein 0.6s ease forwards`,
            }}>
              {t('slow')}
            </span>
          )}
        </div>

      </div>{/* /content */}

    </div>
  )
}
