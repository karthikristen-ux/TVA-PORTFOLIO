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
    
    // Play a "startup" power up sound
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
  const [showBreachAlert, setShowBreachAlert] = useState(false);
  const [showTempad, setShowTempad] = useState(false);
  const [showHologram, setShowHologram] = useState(false);

  useEffect(() => {
    // Staggered animation sequence
    const t1 = setTimeout(() => setShowBreachAlert(true), 1000);
    const t2 = setTimeout(() => setShowTempad(true), 1800);
    const t3 = setTimeout(() => setShowHologram(true), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleClickToView = () => {
    playRetroSound();
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  return (
    <div className="tva-intro-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>
      
      {/* Background Video */}
      <video 
        src={tempadVideo} 
        autoPlay 
        loop 
        muted 
        playsInline
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          filter: 'contrast(1.2) brightness(0.4)',
          zIndex: 1
        }} 
      />

      {/* Main Content Layer */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}>

        {/* BREACH ALERT TEXT */}
        <AnimatePresence>
          {showBreachAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="breach-alert-text"
            >
              ⚠ TIMELINE BREACH ALERT ⚠
            </motion.div>
          )}
        </AnimatePresence>

        {/* HOLOGRAM SECTION */}
        <AnimatePresence>
          {showHologram && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                marginBottom: '-20px',
              }}
            >
              {/* 3D Hologram Portrait */}
              <div className="hologram-wrapper">
                <HologramPortrait size={320} rotationSpeed={0.005} />
                {/* Hologram scanline overlay */}
                <div className="hologram-scanlines"></div>
              </div>

              {/* Hologram Beam Cone */}
              <div className="hologram-beam"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TEMPAD UI PANEL */}
        <AnimatePresence>
          {showTempad && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
              className="tempad-panel"
            >
              {/* Scanlines inside panel */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 1, borderRadius: '12px' }} />

              {/* Header Bar */}
              <div className="tempad-header">
                <span>CONFIRM IDENTITY</span>
                <span style={{ color: '#ff3333' }}>BREACH DETECTED</span>
              </div>

              {/* Content Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
                
                {/* Graph Side */}
                <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div className="tempad-graph-area">
                    {/* SVG Graph */}
                    <svg width="100%" height="100%" viewBox="0 0 400 160" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
                      <g stroke="rgba(255, 140, 0, 0.12)" strokeWidth="1">
                        <line x1="0" y1="32" x2="400" y2="32" />
                        <line x1="0" y1="64" x2="400" y2="64" />
                        <line x1="0" y1="96" x2="400" y2="96" />
                        <line x1="0" y1="128" x2="400" y2="128" />
                        <line x1="80" y1="0" x2="80" y2="160" />
                        <line x1="160" y1="0" x2="160" y2="160" />
                        <line x1="240" y1="0" x2="240" y2="160" />
                        <line x1="320" y1="0" x2="320" y2="160" />
                      </g>
                      
                      {/* Red danger zone */}
                      <rect x="0" y="12" width="400" height="12" fill="#ff3333" opacity="0.7" />
                      
                      {/* Sacred Timeline */}
                      <line x1="0" y1="96" x2="400" y2="96" stroke="var(--tva-orange)" strokeWidth="2.5" />
                      
                      {/* Branch line */}
                      <motion.line 
                        x1="180" y1="96" 
                        x2="320" y2="20" 
                        stroke="#ff3333" 
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        style={{ filter: 'drop-shadow(0 0 4px #ff0000)' }}
                      />
                    </svg>

                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.9, lineHeight: '1.4' }}>
                      TIMELINE M44 : 70.62.0734.4641<br/>
                      SEGMENT : 636.432
                    </div>

                    <div style={{ position: 'absolute', top: '30px', left: '12px', color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 'bold' }}>
                      3.92<br/>
                      <span style={{ fontSize: '0.55rem', fontWeight: 'normal' }}>UNITS</span>
                    </div>
                  </div>
                </div>

                {/* Variant Info Side */}
                <div style={{ flex: '0 0 180px', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 2 }}>
                  <div className="tempad-variant-info">
                    <div className="variant-row">
                      <span>VARIANT#</span>
                      <strong>T.K-18</strong>
                    </div>
                    <div className="variant-row">
                      <span>STATUS</span>
                      <span style={{ color: '#ff4d00', fontSize: '0.85rem' }}>ESCAPED</span>
                    </div>
                    <div className="variant-row">
                      <span>ORIGIN</span>
                      <strong>CHENNAI</strong>
                    </div>
                    <div className="variant-row">
                      <span>THREAT</span>
                      <span style={{ color: '#ff3333' }}>LEVEL 9</span>
                    </div>
                  </div>

                  <div style={{
                    padding: '0.5rem',
                    textAlign: 'center',
                    color: '#000',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--tva-orange)',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    fontSize: '0.9rem',
                  }}>
                    TVA CASE FILE
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handleClickToView}
                whileHover={{ scale: 1.02, backgroundColor: 'var(--tva-orange)', color: '#000', boxShadow: '0 0 25px rgba(255, 140, 0, 0.7)' }}
                whileTap={{ scale: 0.97 }}
                className="tempad-cta-button"
              >
                [ CLICK TO VIEW VARIANT ]
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
