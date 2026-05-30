import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HologramPortrait } from './HologramPortrait';

// @ts-ignore
import tempadVideo from './tempad_video/tempad video.mp4';

interface Props {
  onComplete: () => void;
}

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

    // Waka waka
    let time = audioCtx.currentTime + 0.5;
    for (let i = 0; i < 15; i++) {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.frequency.setValueAtTime(i % 2 === 0 ? 300 : 450, time);
      gain2.gain.setValueAtTime(0.05, time);
      gain2.gain.linearRampToValueAtTime(0.01, time + 0.15);
      osc2.start(time);
      osc2.stop(time + 0.15);
      time += 0.3;
    }
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const TVALoadingScreen: React.FC<Props> = ({ onComplete }) => {
  // Phase 1: breach → tempad + hologram
  // Phase 2: pacman loading (after click)
  const [phase, setPhase] = useState<'breach' | 'tempad' | 'loading'>('breach');
  const [alertMoved, setAlertMoved] = useState(false);
  const [showTempad, setShowTempad] = useState(false);
  const [showBeam, setShowBeam] = useState(false);
  const [showHologram, setShowHologram] = useState(false);
  const [progress, setProgress] = useState(0);

  // Phase 1 animation sequence
  useEffect(() => {
    // After 2s, alert moves up
    const t1 = setTimeout(() => setAlertMoved(true), 2000);
    // After 2.8s, tempad appears
    const t2 = setTimeout(() => {
      setPhase('tempad');
      setShowTempad(true);
    }, 2800);
    // After 3.5s, beam shoots out
    const t3 = setTimeout(() => setShowBeam(true), 3500);
    // After 4.2s, hologram materializes
    const t4 = setTimeout(() => setShowHologram(true), 4200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // Phase 2: pacman progress
  useEffect(() => {
    if (phase !== 'loading') return;
    const duration = 5000;
    const interval = 50;
    let current = 0;
    const timer = setInterval(() => {
      current += interval;
      setProgress(Math.min((current / duration) * 100, 100));
      if (current >= duration) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [phase, onComplete]);

  const handleClickToView = () => {
    playRetroSound();
    setPhase('loading');
  };

  return (
    <div className="tva-intro-container">
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>

      {/* Background Video */}
      <video
        src={tempadVideo}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: phase === 'loading' ? 'brightness(0.1)' : 'contrast(1.2) brightness(0.3)',
          zIndex: 1,
          transition: 'filter 1s ease',
        }}
      />

      {/* ============ PHASE 1 & 2 (TEMPAD): BREACH → TEMPAD + HOLOGRAM ============ */}
      <AnimatePresence>
        {phase !== 'loading' && (
          <motion.div
            key="phase1"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 20,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {/* BREACH ALERT — starts center, moves up */}
            <motion.div
              className="breach-alert-text"
              animate={{
                y: alertMoved ? -180 : 0,
                scale: alertMoved ? 0.65 : 1,
                opacity: [1, 0.7, 1],
              }}
              transition={{
                y: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 0.8, ease: 'easeInOut' },
                opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
              }}
              style={{ fontSize: alertMoved ? undefined : 'clamp(2rem, 5vw, 4rem)' }}
            >
              ⚠ TIMELINE BREACH ALERT ⚠
            </motion.div>

            {/* TEMPAD + HOLOGRAM ROW */}
            <AnimatePresence>
              {showTempad && (
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
                  className="tempad-hologram-row"
                >
                  {/* TEMPAD PANEL */}
                  <div className="tempad-panel">
                    <div className="tempad-panel-scanlines" />

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

                    {/* Animated light beam shooting right */}
                    {showBeam && (
                      <motion.div
                        className="tempad-light-beam"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    )}

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

                  {/* HOLOGRAM on right */}
                  <AnimatePresence>
                    {showHologram && (
                      <motion.div
                        className="hologram-side"
                        initial={{ opacity: 0, x: -30, scale: 0.7 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      >
                        <HologramPortrait size={380} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ PHASE 3: PACMAN LOADING ============ */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="phase2"
            className="tva-screen-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ zIndex: 20 }}
          >
            {/* TVA Logo */}
            <div className="tva-logo-large">
              <span style={{ fontSize: '8rem', fontWeight: 900, letterSpacing: '-5px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                T<span style={{ position: 'relative' }}>
                  V
                  <span style={{ position: 'absolute', right: '-15%', top: '50%', width: '130%', height: '8px', background: '#E23D28', transform: 'translateY(-50%)' }}></span>
                </span>A
              </span>
            </div>

            <h1 className="retro-text" style={{ fontSize: '2rem', letterSpacing: '8px', marginBottom: '40px', color: 'var(--tva-orange)' }}>
              LOADING VARIANT FILE...
            </h1>

            {/* Pacman Loading Bar */}
            <div className="loading-area" style={{ position: 'relative', width: '60%', maxWidth: '800px', height: '100px' }}>
              {/* Pac-Man Miss Minutes */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: `${progress}%`,
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }}
              >
                <svg viewBox="0 0 100 120" width="80" height="96" style={{ overflow: 'visible' }}>
                  <g stroke="var(--tva-orange)" strokeWidth="4" strokeLinecap="round">
                    <line x1="40" y1="92" x2="30" y2="110">
                      <animate attributeName="x2" values="30;50;30" dur="0.4s" repeatCount="indefinite" />
                    </line>
                    <line x1="60" y1="92" x2="70" y2="110">
                      <animate attributeName="x2" values="70;50;70" dur="0.4s" repeatCount="indefinite" />
                    </line>
                  </g>
                  <circle cx="50" cy="50" r="45" fill="var(--tva-orange)" />
                  <circle cx="50" cy="30" r="8" fill="#fff" />
                  <circle cx="53" cy="30" r="4" fill="#000" />
                  <path d="M 50 50 L 100 20 A 45 45 0 0 1 100 80 Z" fill="#111">
                    <animate attributeName="d"
                      values="M 50 50 L 100 20 A 45 45 0 0 1 100 80 Z; M 50 50 L 100 48 A 45 45 0 0 1 100 52 Z; M 50 50 L 100 20 A 45 45 0 0 1 100 80 Z"
                      dur="0.3s" repeatCount="indefinite" />
                  </path>
                </svg>
              </motion.div>

              {/* Progress Bar */}
              <div className="progress-bar-container" style={{
                position: 'absolute', bottom: '0', width: '100%', height: '40px',
                border: '4px solid var(--tva-orange)', padding: '4px', boxSizing: 'border-box',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  {[...Array(20)].map((_, i) => (
                    <div key={i} style={{ width: '8px', height: '8px', background: 'rgba(255,140,0,0.5)', borderRadius: '50%' }} />
                  ))}
                </div>
                <div style={{
                  height: '100%', background: 'var(--tva-orange)',
                  width: `${progress}%`, transition: 'width 0.1s linear',
                }}></div>
              </div>
            </div>

            <div className="tva-border-text bottom-left">
              TIME VARIANCE AUTHORITY PRESENTATION COMMISSION // DSTORY.CO
            </div>
            <div className="tva-border-logo bottom-right">
              TVA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
