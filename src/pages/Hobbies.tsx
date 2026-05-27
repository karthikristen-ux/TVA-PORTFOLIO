import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Camera } from 'lucide-react';

// Setup frames for the background
const TOTAL_FRAMES = 40;
const frameUrls = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/images/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`
);

// Preload to avoid flickering
frameUrls.forEach((src) => {
  const img = new Image();
  img.src = src;
});

export const Hobbies: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Make the spring slightly tighter for more deliberate "checkpoint" feeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Map smooth progress (0-1) to frame index (0-39)
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    // Update the actual frame state whenever the spring value changes
    return frameIndex.on("change", (latest) => {
      setCurrentFrame(Math.floor(latest));
    });
  }, [frameIndex]);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* 1. ANIMATED BACKGROUND (Fixed) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <img
          src={frameUrls[currentFrame]}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'saturate(1.2) contrast(1.1)', 
          }}
        />
        {/* Dark gradient for text readability */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.8) 100%)',
        }} />
      </div>

      {/* 2. SCROLLING CONTENT WITH CHECKPOINTS */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        
        {/* CHECKPOINT 1: Intro */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '800px', textAlign: 'center', backgroundColor: 'rgba(10,10,10,0.6)', padding: '3rem', borderRadius: '20px', border: '1px solid var(--tva-orange)', backdropFilter: 'blur(5px)' }}
          >
            <h1 className="crt-text" style={{ textShadow: '0 0 10px #000, 0 0 20px var(--tva-orange)', margin: 0 }}>
              RECREATIONAL LOGS
            </h1>
            <p style={{ fontSize: '1.4rem', marginTop: '1rem', textShadow: '0 0 5px #000' }}>
              Documenting the sacred timeline outside of work.
            </p>
            <div style={{ marginTop: '2rem', opacity: 0.8, animation: 'pulse 2s infinite' }}>
              ↓ SCROLL TO ADVANCE TIMELINE ↓
            </div>
          </motion.div>
        </section>

        {/* CHECKPOINT 2: Photography TV */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ type: 'spring', bounce: 0.4 }}
              style={{
                // MINIMALIST RETRO TV SHELL
                position: 'relative',
                width: '100%',
                maxWidth: '600px', 
                backgroundColor: '#1a1a1a', // Sleek dark shell
                borderRadius: '40px', // Heavy rounded corners for retro TV look
                border: '4px solid #333',
                boxShadow: '20px 20px 60px rgba(0,0,0,0.8), -10px -10px 30px rgba(255,255,255,0.05), 0 0 20px rgba(255,140,0,0.2)',
                padding: '1.5rem', 
                display: 'flex',
                gap: '1rem', // Space between screen and control panel
                alignItems: 'center'
              }}
            >
              {/* INNER CRT SCREEN */}
              <div style={{
                flex: 1,
                position: 'relative',
                backgroundColor: '#050300', 
                borderRadius: '25px', // Curved screen
                border: '8px solid #0a0a0a', // Inner bezel
                boxShadow: 'inset 0 0 40px #000',
                padding: '2rem',
                overflow: 'hidden',
                aspectRatio: '4/3', // Classic TV aspect ratio
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'var(--font-mono)',
                color: 'var(--tva-orange)'
              }}>
                
                {/* Minimalist Glare */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
                  pointerEvents: 'none', zIndex: 5,
                }} />
                
                {/* Subtle Scanlines */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none', zIndex: 4,
                }} />
                
                {/* Tube shadow */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  boxShadow: 'inset 0 0 30px #000',
                  pointerEvents: 'none', zIndex: 6,
                }} />

                {/* MINIMALIST CONTENT */}
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', opacity: 0.9 }}>
                    <Camera size={24} color="var(--tva-orange)" />
                    <h3 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px' }}>PHOTOGRAPHY_ARCHIVE</h3>
                  </div>
                  
                  {/* Clean Placeholder Area */}
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 140, 0, 0.05)',
                    borderRadius: '10px',
                    position: 'relative'
                  }}>
                    <Camera size={40} color="var(--tva-orange)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <div style={{ letterSpacing: '2px', fontSize: '0.8rem', opacity: 0.8 }}>[ CONNECTING TO FEED... ]</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.7rem', opacity: 0.5, marginTop: '1rem', letterSpacing: '1px' }}>
                    CH: 03 | VOL: 42
                  </div>

                </div>
              </div>

              {/* RETRO TV CONTROL PANEL (Right side knobs) */}
              <div style={{ 
                width: '60px', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '2rem' 
              }}>
                {/* Big tuning knob */}
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222',
                  boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.8)',
                  border: '2px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  <div style={{ width: '4px', height: '15px', backgroundColor: 'var(--tva-orange)', borderRadius: '2px', transform: 'translateY(-8px)' }} />
                </div>
                {/* Smaller volume knob */}
                <div style={{ 
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#222',
                  boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.1), 0 5px 10px rgba(0,0,0,0.8)',
                  border: '2px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  transform: 'rotate(45deg)'
                }}>
                  <div style={{ width: '3px', height: '10px', backgroundColor: '#555', borderRadius: '2px', transform: 'translateY(-5px)' }} />
                </div>
                
                {/* Speaker Grill */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '1rem' }}>
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#0a0a0a', borderRadius: '2px' }} />
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#0a0a0a', borderRadius: '2px' }} />
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#0a0a0a', borderRadius: '2px' }} />
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#0a0a0a', borderRadius: '2px' }} />
                  <div style={{ width: '20px', height: '3px', backgroundColor: '#0a0a0a', borderRadius: '2px' }} />
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* CHECKPOINT 3: End of logs */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', padding: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '500px', backgroundColor: 'rgba(10,10,10,0.8)', padding: '3rem', borderRadius: '20px', border: '1px solid var(--tva-orange)' }}
            >
              <h2 style={{ color: 'var(--tva-orange)', marginTop: 0 }}>END OF LOG</h2>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                The timeline is constantly expanding. More recreational logs will be added as new branch realities emerge.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};
