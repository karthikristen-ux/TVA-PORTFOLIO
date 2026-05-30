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
  const [progress, setProgress] = useState(0);

  // Phase 2: pacman progress
  useEffect(() => {
    if (phase !== 'loading') return;
    
    playRetroSound();
    
    const duration = 6500; 
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

  return (
    <div className="tva-intro-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#050505', margin: 0, padding: 0 }}>
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>

      {/* PHASE 1: TEMPAD TV ALERT */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden'
            }}
          >
            {/* TV Shell */}
            <div style={{
              width: '100%',
              maxWidth: '600px',
              backgroundColor: '#1a1a1a',
              borderRadius: '24px',
              border: '4px solid #333',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,140,0,0.2), inset 0 0 10px rgba(255,140,0,0.1)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              position: 'relative'
            }}>
              
              {/* TV Screen Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                backgroundColor: '#050300',
                borderRadius: '16px',
                border: '6px solid #000',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 0 15px rgba(255,140,0,0.3)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Glare and Scanlines */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                  pointerEvents: 'none', zIndex: 5,
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 140, 0, 0.05) 50%)',
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none', zIndex: 4,
                }} />
                
                {/* Video playing inside the TV */}
                <video 
                  src={tempadBgVideo} 
                  autoPlay loop muted playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.2) sepia(1) hue-rotate(350deg) saturate(3) brightness(1.1)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>

              {/* TV Control Panel & Alert */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 0.5rem'
              }}>
                {/* Alert Message */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    color: '#ff4d00',
                    fontFamily: 'system-ui, sans-serif',
                    letterSpacing: '2px',
                    textShadow: '0 0 10px rgba(255, 77, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <strong style={{ fontSize: '1.2rem', marginBottom: '4px' }}>[ TIMELINE BREACHED ]</strong>
                  <button 
                    onClick={() => setPhase('loading')}
                    style={{ 
                      fontSize: '0.85rem', 
                      color: 'var(--tva-orange)', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      textAlign: 'left',
                      padding: 0,
                      opacity: 0.8
                    }}>
                    &gt; CLICK TO VIEW VARIANT
                  </button>
                </motion.div>

                {/* Knobs */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#222', border: '1px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <div style={{ width: '2px', height: '12px', backgroundColor: 'var(--tva-orange)', borderRadius: '2px', transform: 'translateY(-6px)' }} />
                  </div>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#222', border: '1px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'rotate(45deg)' }}>
                     <div style={{ width: '2px', height: '12px', backgroundColor: '#555', borderRadius: '2px', transform: 'translateY(-6px)' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: ANIMATION AND LOADING BAR */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="main"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              width: '100vw',
              height: '100vh',
              overflow: 'hidden'
            }}
          >
            {/* Subtle Background Video */}
            <video
              src={tempadBgVideo}
              autoPlay loop muted playsInline
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.05)',
                zIndex: 1,
              }}
            />

            {/* Animation Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                width: '100%',
                maxWidth: '800px',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 25,
                position: 'relative'
              }}
            >
              <ChromaKeyVideo 
                src={customAnimationVideo}
                width="100%"
                height="100%"
                loop={false}
              />
            </motion.div>

            {/* Loading Section directly below animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', width: '100%' }}
            >
              <h1 className="retro-text" style={{ fontSize: '1.2rem', letterSpacing: '6px', marginBottom: '15px', color: 'var(--tva-orange)' }}>
                LOADING TIMELINE...
              </h1>

              {/* Pacman Loading Bar */}
              <div className="loading-area" style={{ position: 'relative', width: '60%', maxWidth: '600px', height: '60px' }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: `${progress}%`,
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                  }}
                >
                  <svg viewBox="0 0 100 120" width="50" height="60" style={{ overflow: 'visible' }}>
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
                  position: 'absolute', bottom: '0', width: '100%', height: '20px',
                  border: '2px solid var(--tva-orange)', padding: '2px', boxSizing: 'border-box',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    {[...Array(20)].map((_, i) => (
                      <div key={i} style={{ width: '6px', height: '6px', background: 'rgba(255,140,0,0.4)', borderRadius: '50%' }} />
                    ))}
                  </div>
                  <div style={{
                    height: '100%', background: 'var(--tva-orange)',
                    width: `${progress}%`, transition: 'width 0.1s linear',
                  }}></div>
                </div>
              </div>

              {/* VARIANT FOUND Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                style={{ marginTop: '1.5rem', color: '#fff', letterSpacing: '4px', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}
              >
                [ VARIANT FOUND ]
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="tva-border-text bottom-left">
        TIME VARIANCE AUTHORITY PRESENTATION COMMISSION // DSTORY.CO
      </div>
      <div className="tva-border-logo bottom-right">
        TVA
      </div>
    </div>
  );
};
