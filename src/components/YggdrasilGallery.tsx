import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const images = [
  { id: 1, src: '/images/instagram/1.png', x: 20, y: 70, label: 'TIMELINE EVENT: 0X-11' },
  { id: 2, src: '/images/instagram/2.png', x: 80, y: 65, label: 'TIMELINE EVENT: 0X-12' },
  { id: 3, src: '/images/instagram/3.png', x: 15, y: 30, label: 'TIMELINE EVENT: 0X-13' },
  { id: 4, src: '/images/instagram/4.png', x: 85, y: 25, label: 'TIMELINE EVENT: 0X-14' },
  { id: 5, src: '/images/instagram/5.png', x: 50, y: 10, label: 'TIMELINE EVENT: 0X-15' },
];

export const YggdrasilGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  // Calculate opacity for elements based on scroll progress
  const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  return (
    <div 
      ref={containerRef} 
      className="yggdrasil-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '200vh', // Ensures enough scroll distance for the animation
        paddingTop: '10vh'
      }}
    >
      <div className="yggdrasil-sticky" style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        {/* Title */}
        <motion.div 
          style={{ 
            position: 'absolute', 
            top: '5%', 
            textAlign: 'center', 
            zIndex: 20,
            opacity
          }}
        >
          <h2 className="crt-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', border: 'none' }}>SACRED TIMELINE BRANCHES</h2>
          <p style={{ color: 'var(--tva-orange)', letterSpacing: '3px', opacity: 0.8, fontSize: '0.9rem' }}>
            [ VIEWING ALTERNATE REALITIES ]
          </p>
        </motion.div>

        {/* The SVG Tree (Yggdrasil) */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 10 }}>
          <svg 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMax meet" 
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              <filter id="branchGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Trunk */}
            <motion.path
              d="M 50 100 Q 50 85, 50 75"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="1.5"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0, 0.2], [0, 1]) }}
            />

            {/* Branch to Image 1 (Left low) */}
            <motion.path
              d="M 50 75 Q 35 75, 20 70"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="0.8"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0.2, 0.4], [0, 1]) }}
            />

            {/* Branch to Image 2 (Right low) */}
            <motion.path
              d="M 50 75 Q 65 72, 80 65"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="0.8"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0.2, 0.4], [0, 1]) }}
            />

            {/* Trunk continues up */}
            <motion.path
              d="M 50 75 Q 50 55, 50 45"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="1.2"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0.4, 0.6], [0, 1]) }}
            />

            {/* Branch to Image 3 (Left high) */}
            <motion.path
              d="M 50 45 Q 30 40, 15 30"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="0.6"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0.6, 0.8], [0, 1]) }}
            />

            {/* Branch to Image 4 (Right high) */}
            <motion.path
              d="M 50 45 Q 70 35, 85 25"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="0.6"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0.6, 0.8], [0, 1]) }}
            />

            {/* Branch to Image 5 (Top center) */}
            <motion.path
              d="M 50 45 Q 50 25, 50 10"
              fill="none"
              stroke="var(--tva-orange)"
              strokeWidth="0.5"
              filter="url(#branchGlow)"
              style={{ pathLength: useTransform(smoothProgress, [0.8, 1], [0, 1]) }}
            />
          </svg>
        </div>

        {/* HTML Images overlaid on SVG coordinates */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 15, pointerEvents: 'none' }}>
          {images.map((img, i) => (
            <YggdrasilNode key={img.id} img={img} index={i} progress={smoothProgress} />
          ))}
        </div>

      </div>
    </div>
  );
};

// Sub-component to safely use hooks for each mapped item
const YggdrasilNode: React.FC<{ img: any; index: number; progress: any }> = ({ img, index, progress }) => {
  const appearStart = 0.3 + (index * 0.12);
  const appearEnd = appearStart + 0.1;
  
  const imgOpacity = useTransform(progress, [appearStart, appearEnd], [0, 1]);
  const imgScale = useTransform(progress, [appearStart, appearEnd], [0.5, 1]);

  return (
    <motion.div
      className="yggdrasil-node"
      style={{
        position: 'absolute',
        left: `${img.x}%`,
        top: `${img.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: imgOpacity,
        scale: imgScale,
        pointerEvents: 'auto'
      }}
    >
      <div className="yggdrasil-img-wrapper">
        <img src={img.src} alt={`Timeline Event ${img.id}`} className="yggdrasil-img" />
        <div className="yggdrasil-img-overlay">
          <span>{img.label}</span>
        </div>
      </div>
    </motion.div>
  );
};
