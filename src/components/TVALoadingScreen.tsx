import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HologramPortrait } from './HologramPortrait';

// @ts-ignore - Ignore type error for mp4 import if it exists
import tempadVideo from './tempad_video/tempad video.mp4';

interface Props {
  onComplete: () => void;
}

// Simple Web Audio API for Retro Sound Effects
const playRetroSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'square';
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.5);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const TVALoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [showHologram, setShowHologram] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 800);
    const t2 = setTimeout(() => setShowHologram(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleClickToView = () => {
    playRetroSound();
    setTimeout(() => onComplete(), 500);
  };

  return (
    <div className="tva-intro-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>

      {/* Background Video */}
      <video
        src={tempadVideo}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'contrast(1.2) brightness(0.3)',
          zIndex: 1
        }}
      />

      {/* Main Content — side by side */}
      <div className="intro-layout">

        {/* ===== LEFT SIDE: TEMPAD INFO ===== */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="intro-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
            >
              {/* Breach Alert */}
              <motion.div
                className="breach-alert-text"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                ⚠ TIMELINE BREACH ALERT ⚠
              </motion.div>

              {/* TemPad Panel */}
              <div className="tempad-panel">
                {/* Scanlines */}
                <div className="tempad-panel-scanlines" />

                {/* Header */}
                <div className="tempad-header">
                  <span>CONFIRM IDENTITY</span>
                  <span style={{ color: '#ff3333' }}>BREACH</span>
                </div>

                {/* Graph */}
                <div className="tempad-graph-area">
                  <svg width="100%" height="100%" viewBox="0 0 400 140" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <g stroke="rgba(255, 140, 0, 0.12)" strokeWidth="1">
                      <line x1="0" y1="28" x2="400" y2="28" />
                      <line x1="0" y1="56" x2="400" y2="56" />
                      <line x1="0" y1="84" x2="400" y2="84" />
                      <line x1="0" y1="112" x2="400" y2="112" />
                      <line x1="80" y1="0" x2="80" y2="140" />
                      <line x1="160" y1="0" x2="160" y2="140" />
                      <line x1="240" y1="0" x2="240" y2="140" />
                      <line x1="320" y1="0" x2="320" y2="140" />
                    </g>
                    <rect x="0" y="8" width="400" height="10" fill="#ff3333" opacity="0.7" />
                    <line x1="0" y1="84" x2="400" y2="84" stroke="var(--tva-orange)" strokeWidth="2.5" />
                    <motion.line
                      x1="180" y1="84" x2="320" y2="14"
                      stroke="#ff3333" strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      style={{ filter: 'drop-shadow(0 0 4px #ff0000)' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', bottom: '8px', left: '10px', color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.9, lineHeight: '1.3' }}>
                    TIMELINE M44 : 70.62.0734<br />SEGMENT : 636.432
                  </div>
                  <div style={{ position: 'absolute', top: '22px', left: '10px', color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 'bold' }}>
                    3.92<br /><span style={{ fontSize: '0.5rem', fontWeight: 'normal' }}>UNITS</span>
                  </div>
                </div>

                {/* Variant Info */}
                <div className="tempad-variant-info">
                  <div className="variant-row"><span>VARIANT#</span><strong>T.K-18</strong></div>
                  <div className="variant-row"><span>STATUS</span><span style={{ color: '#ff4d00' }}>ESCAPED</span></div>
                  <div className="variant-row"><span>ORIGIN</span><strong>CHENNAI</strong></div>
                  <div className="variant-row"><span>THREAT</span><span style={{ color: '#ff3333' }}>LEVEL 9</span></div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={handleClickToView}
                  whileHover={{ scale: 1.02, backgroundColor: 'var(--tva-orange)', color: '#000', boxShadow: '0 0 25px rgba(255, 140, 0, 0.7)' }}
                  whileTap={{ scale: 0.97 }}
                  className="tempad-cta-button"
                >
                  [ CLICK TO VIEW VARIANT ]
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== RIGHT SIDE: HOLOGRAM ===== */}
        <AnimatePresence>
          {showHologram && (
            <motion.div
              className="intro-right"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <HologramPortrait size={360} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
