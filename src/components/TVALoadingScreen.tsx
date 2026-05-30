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

      {/* 3D LAYER 1: Massive Background Text */}
      <div className="massive-bg-text">KARTHIKEYAN</div>

      {/* 3D LAYER 2: Floating Holographic Blobs */}
      <div className="fluid-blob blob-1" />
      <div className="fluid-blob blob-2" />
      <div className="fluid-blob blob-3" />

      {/* 3D LAYER 3: Main Animation Container */}
      <motion.div
        key="intro"
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
        {/* Custom Chroma-Keyed Animation (CENTERED FRONT) */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                width: '100%',
                maxWidth: '900px',
                height: '80vh',
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
                onEnded={onComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
