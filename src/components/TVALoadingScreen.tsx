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
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ zIndex: 200, width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem' }}
          >
            <div
              className="retro-tv-shell"
              style={{
                position: 'relative', width: '100%', maxWidth: '650px', backgroundColor: '#1a1a1a',
                borderRadius: '40px', border: '4px solid #333',
                boxShadow: '20px 20px 60px rgba(0,0,0,0.8), -10px -10px 30px rgba(255,255,255,0.05), 0 0 30px rgba(255,0,0,0.2)',
                padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={handleStart}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* INNER CRT SCREEN */}
              <div style={{
                flex: 1, position: 'relative', backgroundColor: '#050300', borderRadius: '25px',
                border: '8px solid #0a0a0a', boxShadow: 'inset 0 0 40px #000',
                overflow: 'hidden', aspectRatio: '4/3', display: 'flex', flexDirection: 'column',
                fontFamily: 'var(--font-mono)', color: 'var(--tva-orange)'
              }}>
                {/* Glare, Scanlines, Shadow */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)', pointerEvents: 'none', zIndex: 5 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 4 }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', boxShadow: 'inset 0 0 30px #000', pointerEvents: 'none', zIndex: 6 }} />

                {/* ANIMATION CONTENT */}
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                   
                   {/* Branching SVG (Matching Reference Image) */}
                   <svg viewBox="0 0 800 400" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                      <defs>
                        <style>
                          {`
                            .grow-branch {
                              stroke-dasharray: 600;
                              stroke-dashoffset: 600;
                              animation: growAnim 2.5s ease-out forwards;
                            }
                            @keyframes growAnim {
                              0% { stroke-dashoffset: 600; }
                              100% { stroke-dashoffset: 0; }
                            }
                            .red-line-anim {
                              stroke-dasharray: 600;
                              stroke-dashoffset: 600;
                              animation: growRedAnim 3.5s ease-out forwards;
                            }
                            @keyframes growRedAnim {
                              0% { stroke-dashoffset: 600; }
                              60% { stroke-dashoffset: 600; } /* Wait for yellow branches to grow */
                              100% { stroke-dashoffset: 0; }
                            }
                            .nexus-text {
                              opacity: 0;
                              animation: revealAndBlink 1s step-end infinite 2.5s;
                            }
                            @keyframes revealAndBlink {
                              0% { opacity: 1; }
                              50% { opacity: 0; }
                              100% { opacity: 1; }
                            }
                          `}
                        </style>
                        <filter id="glow-heavy">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <filter id="glow-light">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Subtle Grid / Scanlines in SVG */}
                      <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                      {/* Red Threshold Lines (Slightly curved to match CRT look) */}
                      <path d="M 0 130 Q 400 120 800 130" fill="none" stroke="#ff4444" strokeWidth="5" opacity="0.75" filter="url(#glow-light)" />
                      <path d="M 0 270 Q 400 280 800 270" fill="none" stroke="#ff4444" strokeWidth="5" opacity="0.75" filter="url(#glow-light)" />

                      {/* Central Sacred Timeline (Intertwined & Thick) */}
                      <path d="M 0 200 Q 150 190 300 200 T 600 200 T 800 200" fill="none" stroke="#d4f0ff" strokeWidth="7" filter="url(#glow-heavy)" />
                      <path d="M 0 200 Q 150 210 300 200 T 600 200 T 800 200" fill="none" stroke="#ffffff" strokeWidth="4" filter="url(#glow-heavy)" />

                      {/* Dense Yellow/Orange Branches */}
                      <g className="grow-branch" fill="none" stroke="#ffbc42" strokeWidth="4" filter="url(#glow-light)" strokeLinecap="round" opacity="0.9">
                        
                        {/* Top branches */}
                        <path d="M 40 200 Q 120 150 180 50" />
                        <path d="M 90 200 Q 180 160 260 60" />
                        <path d="M 150 200 Q 240 170 330 60" />
                        <path d="M 210 200 Q 300 150 410 40" />
                        <path d="M 260 200 Q 350 160 470 50" />
                        <path d="M 320 200 Q 410 140 540 40" />
                        <path d="M 380 200 Q 470 160 610 50" />
                        <path d="M 430 200 Q 520 150 670 60" />
                        <path d="M 490 200 Q 580 140 740 40" />
                        <path d="M 550 200 Q 640 160 780 70" />
                        <path d="M 610 200 Q 700 150 820 80" />

                        {/* Top sub-branches */}
                        <path d="M 130 140 Q 190 100 240 70" strokeWidth="2.5" />
                        <path d="M 260 140 Q 320 100 370 70" strokeWidth="2.5" />
                        <path d="M 420 130 Q 480 80 560 50" strokeWidth="2.5" />
                        <path d="M 580 120 Q 640 80 720 50" strokeWidth="2.5" />
                        
                        {/* Bottom branches */}
                        <path d="M 60 200 Q 140 250 210 350" />
                        <path d="M 120 200 Q 200 240 290 340" />
                        <path d="M 180 200 Q 270 230 360 360" />
                        <path d="M 230 200 Q 320 260 440 350" />
                        <path d="M 290 200 Q 380 250 490 370" />
                        <path d="M 350 200 Q 440 270 570 340" />
                        <path d="M 410 200 Q 500 260 640 360" />
                        <path d="M 470 200 Q 560 240 690 330" />
                        <path d="M 530 200 Q 620 250 740 370" />
                        <path d="M 590 200 Q 680 260 810 320" />

                        {/* Bottom sub-branches */}
                        <path d="M 160 270 Q 220 310 270 340" strokeWidth="2.5" />
                        <path d="M 310 270 Q 370 320 440 350" strokeWidth="2.5" />
                        <path d="M 490 280 Q 560 330 630 360" strokeWidth="2.5" />
                        <path d="M 650 290 Q 720 340 790 370" strokeWidth="2.5" />
                      </g>

                      {/* Animated Red-Lining (Branches turning red) */}
                      <g className="red-line-anim" fill="none" stroke="#ff2a2a" strokeWidth="5" filter="url(#glow-heavy)" strokeLinecap="round">
                         <path d="M 210 200 Q 300 150 410 40" />
                         <path d="M 470 200 Q 560 240 690 330" />
                         <path d="M 90 200 Q 180 160 260 60" />
                      </g>

                      {/* Numbers on the right side */}
                      <text x="760" y="125" fill="#777" fontSize="14" fontFamily="monospace">.30</text>
                      <text x="760" y="195" fill="#777" fontSize="14" fontFamily="monospace">.00</text>
                      <text x="760" y="265" fill="#777" fontSize="14" fontFamily="monospace">.30</text>
                      
                      {/* TVA Logo Bottom Right */}
                      <text x="740" y="380" fill="#ffbc42" fontSize="24" fontWeight="bold" fontFamily="sans-serif" filter="url(#glow-light)">TVA</text>
                   </svg>

                   {/* Overlay Text */}
                   <div className="nexus-text" style={{ position: 'absolute', top: '20px', left: '20px', color: '#ff3333', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '0 0 10px #ff0000' }}>
                     NEXUS EVENT DETECTED!!!!
                   </div>
                   
                   <div style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center', color: '#fff', fontSize: '1.2rem', padding: '10px', textShadow: '0 0 10px #fff' }}>
                     [ CLICK TO INTERVENE ]
                   </div>

                </div>
              </div>

              {/* TV Controls */}
              <div className="retro-tv-controls" style={{ width: '60px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222', boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.8)', border: '2px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '4px', height: '15px', backgroundColor: '#ff3333', borderRadius: '2px', transform: 'translateY(-8px)', boxShadow: '0 0 5px #ff0000' }} />
                </div>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#222', boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.8)', border: '2px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'rotate(45deg)' }}>
                  <div style={{ width: '3px', height: '10px', backgroundColor: '#555', borderRadius: '2px', transform: 'translateY(-5px)' }} />
                </div>
                <div className="retro-tv-speaker" style={{ display: 'flex', gap: '4px', marginTop: '1rem' }}>
                  {[...Array(5)].map((_, i) => <div key={i} style={{ width: '20px', height: '3px', backgroundColor: '#0a0a0a', borderRadius: '2px' }} />)}
                </div>
              </div>
            </div>
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
