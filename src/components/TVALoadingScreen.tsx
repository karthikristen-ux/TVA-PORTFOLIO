import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChromaKeyVideo } from './ChromaKeyVideo';

// @ts-ignore
import tempadBgVideo from './tempad_video/tempad video.mp4';
// @ts-ignore
import customAnimationVideo from './tempad_video/animation tempad.mp4';

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
  const [phase, setPhase] = useState<'intro' | 'loading'>('intro');
  const [alertMoved, setAlertMoved] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [progress, setProgress] = useState(0);

  // Phase 1 animation sequence
  useEffect(() => {
    // After 1s, alert moves up
    const t1 = setTimeout(() => setAlertMoved(true), 1500);
    // After 2s, custom animation video appears
    const t2 = setTimeout(() => setShowVideo(true), 2000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
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
    <div className="tva-intro-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#050505' }}>
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>

      {/* Dimmed Background Video */}
      <video
        src={tempadBgVideo}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: phase === 'loading' ? 'brightness(0.1)' : 'contrast(1.2) brightness(0.2)',
          zIndex: 1,
          transition: 'filter 1s ease',
        }}
      />

      {/* ============ PHASE 1: CUSTOM ANIMATION ============ */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
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
            {/* BREACH ALERT */}
            <motion.div
              className="breach-alert-text"
              animate={{
                y: alertMoved ? -30 : 0,
                scale: alertMoved ? 0.7 : 1,
                opacity: [1, 0.7, 1],
              }}
              transition={{
                y: { duration: 0.8, ease: 'easeInOut' },
                scale: { duration: 0.8, ease: 'easeInOut' },
                opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
              }}
              style={{ 
                position: alertMoved ? 'absolute' : 'relative',
                top: alertMoved ? '20px' : 'auto',
                fontSize: alertMoved ? undefined : 'clamp(2rem, 5vw, 4rem)',
                zIndex: 30
              }}
            >
              ⚠ TIMELINE BREACH ALERT ⚠
            </motion.div>

            {/* Custom Chroma-Keyed Animation */}
            <AnimatePresence>
              {showVideo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    width: '100%',
                    maxWidth: '1200px',
                    height: '75vh', // Take up most of the screen
                  }}
                >
                  <ChromaKeyVideo 
                    src={customAnimationVideo}
                    width="100%"
                    height="100%"
                  />

                  <motion.button
                    onClick={handleClickToView}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 140, 0, 0.2)', boxShadow: '0 0 30px rgba(255, 140, 0, 0.8)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1rem 3rem',
                      backgroundColor: 'rgba(255, 140, 0, 0.05)',
                      border: '2px solid var(--tva-orange)',
                      color: 'var(--tva-orange)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.5rem',
                      letterSpacing: '5px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      boxShadow: '0 0 15px rgba(255, 140, 0, 0.3)',
                      zIndex: 30
                    }}
                  >
                    [ CLICK TO VIEW VARIANT ]
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ PHASE 2: PACMAN LOADING ============ */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="loading"
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
