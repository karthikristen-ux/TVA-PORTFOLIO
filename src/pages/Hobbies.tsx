import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Camera } from 'lucide-react';
import tempadVideo from '../components/tempad_video/tempad video.mp4';

export const Hobbies: React.FC = () => {
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
        <video
          src={tempadVideo}
          className="hobbies-bg-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
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
            className="tva-card"
            style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <h1 className="crt-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, lineHeight: 1.1 }}>
              RECREATIONAL LOGS
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.6, margin: 0 }}>
              Documenting the sacred timeline outside of work. An archival look into personal pursuits and unclassified activities.
            </p>
            <div style={{ marginTop: '3rem', opacity: 0.7, animation: 'pulse 2s infinite', letterSpacing: '4px', fontSize: '0.9rem', color: 'var(--tva-orange)' }}>
              ↓ SCROLL TO ADVANCE TIMELINE ↓
            </div>
          </motion.div>
        </section>

        {/* CHECKPOINT 2: Photography TV */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            padding: '0 1rem'
          }}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="tva-card retro-tv-shell"
              style={{
                // MINIMALIST RETRO TV SHELL
                position: 'relative',
                width: '100%',
                maxWidth: '650px', 
                backgroundColor: 'rgba(15, 15, 15, 0.75)', 
                borderRadius: '24px', 
                padding: '2rem', 
                display: 'flex',
                gap: '1.5rem', 
                alignItems: 'center',
                margin: 0
              }}
            >
              {/* INNER CRT SCREEN */}
              <div style={{
                flex: 1,
                position: 'relative',
                backgroundColor: '#030200', 
                borderRadius: '16px', 
                border: '6px solid #000', 
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9), 0 0 15px rgba(255,140,0,0.1)',
                padding: '2rem',
                overflow: 'hidden',
                aspectRatio: '4/3', 
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'var(--font-mono)',
                color: 'var(--tva-orange)'
              }}>
                
                {/* Minimalist Glare */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                  pointerEvents: 'none', zIndex: 5,
                }} />
                
                {/* Subtle Scanlines */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)',
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none', zIndex: 4,
                }} />

                {/* MINIMALIST CONTENT */}
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', opacity: 0.9 }}>
                    <Camera size={24} color="var(--tva-orange)" />
                    <h3 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '2px', border: 'none' }}>PHOTOGRAPHY_ARCHIVE</h3>
                  </div>
                  
                  {/* Clean Placeholder Area */}
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 140, 0, 0.03)',
                    border: '1px dashed rgba(255, 140, 0, 0.2)',
                    borderRadius: '8px',
                    position: 'relative'
                  }}>
                    <Camera size={40} color="var(--tva-orange)" style={{ opacity: 0.4, marginBottom: '1rem' }} />
                    <div style={{ letterSpacing: '2px', fontSize: '0.8rem', opacity: 0.6 }}>[ ESTABLISHING FEED... ]</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.75rem', opacity: 0.4, marginTop: '1rem', letterSpacing: '2px' }}>
                    CH: 03 | VOL: 42
                  </div>

                </div>
              </div>

              {/* RETRO TV CONTROL PANEL */}
              <div className="retro-tv-controls" style={{ 
                width: '60px', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '2.5rem' 
              }}>
                {/* Big tuning knob */}
                <div style={{ 
                  width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#1a1a1a',
                  boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.05), 0 5px 10px rgba(0,0,0,0.5)',
                  border: '1px solid #333', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  <div style={{ width: '3px', height: '15px', backgroundColor: 'var(--tva-orange)', borderRadius: '2px', transform: 'translateY(-10px)' }} />
                </div>
                {/* Smaller volume knob */}
                <div style={{ 
                  width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#1a1a1a',
                  boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.05), 0 5px 10px rgba(0,0,0,0.5)',
                  border: '1px solid #333', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  transform: 'rotate(45deg)'
                }}>
                  <div style={{ width: '2px', height: '10px', backgroundColor: '#666', borderRadius: '2px', transform: 'translateY(-8px)' }} />
                </div>
                
                {/* Speaker Grill */}
                <div className="retro-tv-speaker" style={{ display: 'flex', gap: '5px', marginTop: '1.5rem', opacity: 0.7 }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} style={{ width: '24px', height: '3px', backgroundColor: '#000', borderRadius: '2px' }} />
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* CHECKPOINT 3: End of logs */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="tva-card"
              style={{ maxWidth: '500px', padding: '4rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <h2 className="crt-text" style={{ fontSize: '2.5rem', margin: 0, border: 'none' }}>END OF LOG</h2>
              <p style={{ fontSize: '1.15rem', color: '#ccc', lineHeight: '1.7', margin: 0 }}>
                The timeline is constantly expanding. More recreational logs and variant data will be added as new branch realities emerge.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};
