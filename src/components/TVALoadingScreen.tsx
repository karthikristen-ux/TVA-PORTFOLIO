import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

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

    // Play "waka waka" sequence
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
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStart = () => {
    setStarted(true);
    playRetroSound();
  };

  useEffect(() => {
    if (!started) return;

    const duration = 5000;
    const interval = 50;
    let current = 0;

    const timer = setInterval(() => {
      current += interval;
      setProgress(Math.min((current / duration) * 100, 100));
      
      if (current >= duration) {
        clearInterval(timer);
        setTimeout(onComplete, 500); // slight delay after 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, [started, onComplete]);

  return (
    <div className="tva-intro-container">
      <div className="crt-overlay"></div>
      
      <AnimatePresence>
        {!started && (
          <motion.div 
            className="start-prompt"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <button onClick={handleStart} className="tva-button-large">
              <Clock size={24} style={{ marginRight: '10px' }} />
              CLICK TO ACCESS TIMELINE
            </button>
            <p className="retro-text blink" style={{ marginTop: '20px', fontSize: '0.8rem' }}>
              [ AUDIO REQUIRED ]
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <motion.div 
          className="tva-screen-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Logo */}
          <div className="tva-logo-large">
            <span style={{ fontSize: '8rem', fontWeight: 900, letterSpacing: '-5px', position: 'relative', display: 'flex', alignItems: 'center' }}>
              T<span style={{ position: 'relative' }}>
                V
                <span style={{ position: 'absolute', right: '-15%', top: '50%', width: '130%', height: '8px', background: '#E23D28', transform: 'translateY(-50%)' }}></span>
              </span>A
            </span>
          </div>

          <h1 className="retro-text" style={{ fontSize: '2rem', letterSpacing: '8px', marginBottom: '40px' }}>
            HEY Y'ALL...
          </h1>

          {/* Loading Area */}
          <div className="loading-area" style={{ position: 'relative', width: '60%', maxWidth: '800px', height: '100px' }}>
            
            {/* Pac-Man Miss Minutes */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: `${progress}%`,
                transform: 'translateX(-50%)',
                zIndex: 10
              }}
            >
              <svg viewBox="0 0 100 120" width="80" height="96" style={{ overflow: 'visible' }}>
                {/* Legs running */}
                <g stroke="var(--tva-orange)" strokeWidth="4" strokeLinecap="round">
                  <line x1="40" y1="92" x2="30" y2="110">
                    <animate attributeName="x2" values="30;50;30" dur="0.4s" repeatCount="indefinite" />
                  </line>
                  <line x1="60" y1="92" x2="70" y2="110">
                    <animate attributeName="x2" values="70;50;70" dur="0.4s" repeatCount="indefinite" />
                  </line>
                </g>
                {/* Pacman body */}
                <circle cx="50" cy="50" r="45" fill="var(--tva-orange)" />
                {/* Eye */}
                <circle cx="50" cy="30" r="8" fill="#fff" />
                <circle cx="53" cy="30" r="4" fill="#000" />
                {/* Animated Mouth (Pac-Man style) */}
                <path d="M 50 50 L 100 20 A 45 45 0 0 1 100 80 Z" fill="#111">
                  <animate attributeName="d" 
                    values="M 50 50 L 100 20 A 45 45 0 0 1 100 80 Z; M 50 50 L 100 48 A 45 45 0 0 1 100 52 Z; M 50 50 L 100 20 A 45 45 0 0 1 100 80 Z" 
                    dur="0.3s" repeatCount="indefinite" />
                </path>
              </svg>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="progress-bar-container" style={{ 
              position: 'absolute', bottom: '0', width: '100%', height: '40px', 
              border: '4px solid var(--tva-orange)', padding: '4px', boxSizing: 'border-box'
            }}>
              {/* Dots for Pacman to eat */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                {[...Array(20)].map((_, i) => (
                  <div key={i} style={{ width: '8px', height: '8px', background: 'rgba(255,140,0,0.5)', borderRadius: '50%' }} />
                ))}
              </div>
              
              {/* Solid Fill */}
              <div style={{ 
                height: '100%', background: 'var(--tva-orange)', 
                width: `${progress}%`, transition: 'width 0.1s linear' 
              }}></div>
            </div>
          </div>
          
          {/* Border Details */}
          <div className="tva-border-text bottom-left">
            TIME VARIANCE AUTHORITY PRESENTATION COMMISSION // DSTORY.CO
          </div>
          <div className="tva-border-logo bottom-right">
            TVA
          </div>
          
        </motion.div>
      )}
    </div>
  );
};
