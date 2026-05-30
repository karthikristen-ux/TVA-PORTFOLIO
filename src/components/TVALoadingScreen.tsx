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
  const [alertMoved, setAlertMoved] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // After 1s, alert moves up
    const t1 = setTimeout(() => setAlertMoved(true), 1500);
    // After 2s, custom animation video appears
    const t2 = setTimeout(() => setShowVideo(true), 2000);

    return () => { clearTimeout(t1); clearTimeout(t2); };
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
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 0,
          margin: 0,
        }}
      >
        {/* BREACH ALERT */}
        <AnimatePresence>
          {!showVideo && (
            <motion.div
              className="breach-alert-text"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [1, 0.7, 1],
                scale: alertMoved ? 0.8 : 1,
                y: alertMoved ? -50 : 0
              }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
              transition={{
                opacity: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' },
                scale: { duration: 0.8, ease: 'easeInOut' },
                y: { duration: 0.8, ease: 'easeInOut' }
              }}
              style={{ 
                position: 'absolute',
                zIndex: 30,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              ⚠ TIMELINE BREACH ALERT ⚠
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Chroma-Keyed Animation */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
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
