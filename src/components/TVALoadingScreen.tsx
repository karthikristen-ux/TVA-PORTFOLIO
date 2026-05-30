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

export const TVALoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Custom animation video appears after 1s
    const t = setTimeout(() => setShowVideo(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="tva-intro-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#050505', margin: 0, padding: 0 }}>
      <div className="crt-overlay" style={{ zIndex: 10 }}></div>

      {/* Dimmed Background Video */}
      <video
        src={tempadBgVideo}
        autoPlay loop muted playsInline
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'contrast(1.2) brightness(0.2)',
          zIndex: 1,
        }}
      />

      <motion.div
        key="intro"
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'row', // Side by side
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '4rem',
          padding: '2rem',
          boxSizing: 'border-box',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* BREACH ALERT (LEFT SIDE) */}
        <AnimatePresence>
          <motion.div
            className="breach-alert-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: [1, 0.7, 1],
              x: 0,
            }}
            transition={{
              opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
              x: { duration: 0.8, ease: 'easeOut' }
            }}
            style={{ 
              zIndex: 30,
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              maxWidth: '300px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '4rem' }}>⚠</span>
            <span>TIMELINE BREACH ALERT</span>
            <span style={{ fontSize: '4rem' }}>⚠</span>
          </motion.div>
        </AnimatePresence>

        {/* Custom Chroma-Keyed Animation (CENTER/RIGHT) */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                flex: '1 1 auto',
                maxWidth: '800px',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 25,
              }}
            >
              <ChromaKeyVideo 
                src={customAnimationVideo}
                width="100%"
                height="100%"
                loop={false}
                onEnded={onComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
