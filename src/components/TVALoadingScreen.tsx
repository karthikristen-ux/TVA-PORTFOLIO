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
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show content after 1s
    const t = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showContent) return;
    
    playRetroSound();
    
    // Total duration of the loading phase before calling onComplete
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
  }, [showContent, onComplete]);

  return (
    <div className="tva-intro-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#050505', margin: 0, padding: 0 }}>
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>

      {/* Subtle Background Video */}
      <AnimatePresence>
        {showContent && (
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
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
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
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
            {/* Massive Background Text */}
            <motion.div 
              className="massive-bg-text"
              initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: "-50%", y: "-50%" }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              KARTHIKEYAN
            </motion.div>

            {/* Animation Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                width: '100%',
                maxWidth: '700px',
                height: '50vh',
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
              transition={{ duration: 1, delay: 1 }}
              style={{ zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', width: '100%' }}
            >
              <h1 className="retro-text" style={{ fontSize: '1.5rem', letterSpacing: '6px', marginBottom: '20px', color: 'var(--tva-orange)' }}>
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
                  position: 'absolute', bottom: '0', width: '100%', height: '24px',
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
