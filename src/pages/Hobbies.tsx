import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import tempadVideo from '../components/tempad_video/tempad video.mp4';
import { YggdrasilGallery } from '../components/YggdrasilGallery';

export const Hobbies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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

        {/* CHECKPOINT 2: Yggdrasil Gallery */}
        <section style={{ width: '100%', position: 'relative' }}>
          <YggdrasilGallery />
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
