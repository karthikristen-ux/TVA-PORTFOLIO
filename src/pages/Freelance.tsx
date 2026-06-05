import React from 'react';
import { motion } from 'framer-motion';
import tempadVideo from '../components/tempad_video/tempad video.mp4';

export const Freelance: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
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
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* Dark gradient for text readability */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.9) 100%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="tva-card"
          style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
        >
          <h2 className="crt-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', border: 'none' }}>
            FREELANCE LOGS
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8 }}>
            [ DEVELOPING DIGITAL INFRASTRUCTURE FOR THE TIMELINE ]
          </p>
          <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8, marginTop: '1.5rem' }}>
            I build custom web projects and applications. My work includes creating dynamic platforms for college students, full-scale CRM systems, and highly professional portfolio websites tailored to unique variant specifications.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="tva-btn" style={{ padding: '1rem 2rem', border: '1px solid var(--tva-orange)', color: 'var(--tva-orange)', textDecoration: 'none', fontFamily: '"Share Tech Mono", monospace', fontSize: '1.1rem', letterSpacing: '0.1em', transition: 'all 0.3s ease' }}>
              CONTACT VIA WHATSAPP
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
