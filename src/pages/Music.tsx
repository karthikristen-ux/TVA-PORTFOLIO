import React from 'react';
import { motion } from 'framer-motion';
import tempadVideo from '../components/tempad_video/tempad video.mp4';

export const Music: React.FC = () => {
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
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.9) 100%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="tva-card"
          style={{ maxWidth: '600px', padding: '4rem', textAlign: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
        >
          <h2 className="crt-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', border: 'none' }}>
            MUSIC LOGS
          </h2>
          <div style={{ 
            padding: '2rem', 
            border: '1px dashed var(--tva-orange, #e8821a)', 
            color: 'var(--tva-orange, #e8821a)', 
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
            animation: 'pulse 2s infinite' 
          }}>
            [ TEMPORAL BRANCH UNDER CONSTRUCTION ]
          </div>
        </motion.div>
      </div>
    </div>
  );
};
