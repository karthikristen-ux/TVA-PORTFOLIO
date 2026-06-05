import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INSTAGRAM_URL = 'https://instagram.com/karthikristen';

interface ImageNode {
  id: number;
  src: string;
  label: string;
  // Position as percentage of the container
  x: number;
  y: number;
  // Which side the label appears
  labelSide: 'left' | 'right';
}

const imageNodes: ImageNode[] = [
  { id: 1, src: '/images/instagram/1.png', label: 'ASGARD',        x: 12, y: 22, labelSide: 'left' },
  { id: 2, src: '/images/instagram/2.png', label: 'VANAHEIM',      x: 10, y: 34, labelSide: 'left' },
  { id: 3, src: '/images/instagram/3.png', label: 'MIDGARD',       x: 12, y: 46, labelSide: 'left' },
  { id: 4, src: '/images/instagram/4.png', label: 'JOTUNHEIM',     x: 10, y: 58, labelSide: 'left' },
  { id: 5, src: '/images/instagram/5.png', label: 'NIFLHEIM',      x: 12, y: 70, labelSide: 'left' },
  { id: 6, src: '/images/instagram/6.png', label: 'ALFHEIM',       x: 88, y: 22, labelSide: 'right' },
  { id: 7, src: '/images/instagram/7.png', label: 'SVARTALFHEIM',  x: 90, y: 34, labelSide: 'right' },
  { id: 8, src: '/images/instagram/8.png', label: 'NIDAVELLIR',    x: 88, y: 46, labelSide: 'right' },
  { id: 9, src: '/images/instagram/9.png', label: 'MUSPELHEIM',    x: 90, y: 58, labelSide: 'right' },
];

// Generate decorative dots along the tree
const decorativeDots = [
  { cx: 50, cy: 18 }, { cx: 42, cy: 22 }, { cx: 58, cy: 22 },
  { cx: 35, cy: 28 }, { cx: 65, cy: 28 }, { cx: 30, cy: 32 },
  { cx: 70, cy: 32 }, { cx: 26, cy: 38 }, { cx: 74, cy: 38 },
  { cx: 45, cy: 25 }, { cx: 55, cy: 25 }, { cx: 38, cy: 30 },
  { cx: 62, cy: 30 }, { cx: 48, cy: 15 }, { cx: 52, cy: 15 },
  { cx: 33, cy: 24 }, { cx: 67, cy: 24 }, { cx: 22, cy: 42 },
  { cx: 78, cy: 42 }, { cx: 44, cy: 20 }, { cx: 56, cy: 20 },
  { cx: 28, cy: 35 }, { cx: 72, cy: 35 }, { cx: 40, cy: 27 },
  { cx: 60, cy: 27 }, { cx: 36, cy: 33 }, { cx: 64, cy: 33 },
  // Root dots
  { cx: 42, cy: 72 }, { cx: 58, cy: 72 }, { cx: 38, cy: 76 },
  { cx: 62, cy: 76 }, { cx: 35, cy: 80 }, { cx: 65, cy: 80 },
  { cx: 30, cy: 82 }, { cx: 70, cy: 82 },
];

// Branch paths from trunk to each node
const branchPaths = [
  // Left branches (top to bottom)
  "M 50 45 Q 42 40, 35 35 Q 28 30, 20 25",      // to Asgard
  "M 50 48 Q 40 44, 30 40 Q 22 37, 16 35",       // to Vanaheim
  "M 50 52 Q 40 50, 30 48 Q 22 47, 18 47",       // to Midgard
  "M 50 56 Q 40 56, 30 58 Q 22 59, 16 59",       // to Jotunheim
  "M 50 62 Q 42 64, 34 67 Q 26 70, 18 71",       // to Niflheim
  // Right branches (top to bottom)
  "M 50 45 Q 58 40, 65 35 Q 72 30, 80 25",       // to Alfheim
  "M 50 48 Q 60 44, 70 40 Q 78 37, 84 35",       // to Svartalfheim
  "M 50 52 Q 60 50, 70 48 Q 78 47, 82 47",       // to Nidavellir
  "M 50 56 Q 60 56, 70 58 Q 78 59, 84 59",       // to Muspelheim
];

// Main trunk paths
const trunkPaths = [
  "M 50 88 C 50 80, 50 72, 50 65",
  "M 50 65 C 49 58, 50 52, 50 45",
  "M 50 45 C 50 38, 50 30, 50 20",
  // Trunk inner curves for thickness
  "M 49 88 C 48 78, 49 70, 49 62",
  "M 51 88 C 52 78, 51 70, 51 62",
  "M 49 62 C 48 55, 49 48, 50 42",
  "M 51 62 C 52 55, 51 48, 50 42",
];

// Root paths
const rootPaths = [
  "M 50 88 Q 45 92, 38 94 Q 30 96, 24 95",
  "M 50 88 Q 44 90, 36 92 Q 28 93, 20 91",
  "M 50 88 Q 46 91, 42 93 Q 36 95, 30 97",
  "M 50 88 Q 55 92, 62 94 Q 70 96, 76 95",
  "M 50 88 Q 56 90, 64 92 Q 72 93, 80 91",
  "M 50 88 Q 54 91, 58 93 Q 64 95, 70 97",
  // Additional thinner roots
  "M 50 88 Q 43 93, 34 96",
  "M 50 88 Q 57 93, 66 96",
];

// Small branch sub-paths (decorative twigs)
const twigPaths = [
  "M 35 35 Q 32 32, 28 30", "M 35 35 Q 33 38, 30 40",
  "M 65 35 Q 68 32, 72 30", "M 65 35 Q 67 38, 70 40",
  "M 42 28 Q 39 25, 36 22", "M 58 28 Q 61 25, 64 22",
  "M 30 48 Q 27 45, 24 43", "M 70 48 Q 73 45, 76 43",
  "M 42 22 Q 40 18, 38 15", "M 58 22 Q 60 18, 62 15",
  "M 50 20 Q 48 16, 46 13", "M 50 20 Q 52 16, 54 13",
  "M 28 30 Q 25 28, 22 27", "M 72 30 Q 75 28, 78 27",
  "M 30 40 Q 26 42, 23 44", "M 70 40 Q 74 42, 77 44",
  "M 34 67 Q 30 69, 26 72", "M 66 67 Q 70 69, 74 72",
  "M 20 25 Q 18 22, 16 20", "M 80 25 Q 82 22, 84 20",
  // Crown top twigs
  "M 50 20 Q 46 14, 43 10", "M 50 20 Q 54 14, 57 10",
  "M 46 13 Q 44 10, 42 8", "M 54 13 Q 56 10, 58 8",
];

export const YggdrasilGallery: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="yggdrasil-scene">
      {/* Title at top */}
      <motion.div 
        className="yggdrasil-title-bar"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
        <span className="yggdrasil-subtitle">TREE OF CONNECTIONS</span>
      </motion.div>

      {/* Main tree container */}
      <div className="yggdrasil-tree-wrapper">
        
        {/* SVG Tree */}
        <svg 
          className="yggdrasil-svg"
          viewBox="0 0 100 100" 
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Glow filter */}
            <filter id="ygg-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="ygg-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Radial gradient for the circle */}
            <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,140,0,0.05)" />
              <stop offset="100%" stopColor="rgba(255,140,0,0)" />
            </radialGradient>
          </defs>

          {/* Large enclosing circle */}
          <circle 
            cx="50" cy="50" r="42" 
            fill="url(#circleGrad)" 
            stroke="rgba(255,140,0,0.15)" 
            strokeWidth="0.3" 
          />
          {/* Inner dashed circle */}
          <circle 
            cx="50" cy="50" r="38" 
            fill="none" 
            stroke="rgba(255,140,0,0.08)" 
            strokeWidth="0.15" 
            strokeDasharray="1 1.5" 
          />

          {/* Root paths */}
          {rootPaths.map((d, i) => (
            <motion.path
              key={`root-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,140,0,0.35)"
              strokeWidth={0.4 - i * 0.03}
              filter="url(#ygg-glow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 2, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
            />
          ))}

          {/* Trunk paths */}
          {trunkPaths.map((d, i) => (
            <motion.path
              key={`trunk-${i}`}
              d={d}
              fill="none"
              stroke={i < 3 ? "rgba(255,140,0,0.7)" : "rgba(255,140,0,0.3)"}
              strokeWidth={i < 3 ? 0.8 : 0.4}
              filter="url(#ygg-glow-strong)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 2, delay: i * 0.15, ease: 'easeOut' }}
            />
          ))}

          {/* Branch paths to nodes */}
          {branchPaths.map((d, i) => (
            <motion.path
              key={`branch-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,140,0,0.5)"
              strokeWidth="0.4"
              filter="url(#ygg-glow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, delay: 1.2 + i * 0.12, ease: 'easeOut' }}
            />
          ))}

          {/* Decorative twig paths */}
          {twigPaths.map((d, i) => (
            <motion.path
              key={`twig-${i}`}
              d={d}
              fill="none"
              stroke="rgba(255,140,0,0.25)"
              strokeWidth="0.2"
              filter="url(#ygg-glow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 1.8 + i * 0.05, ease: 'easeOut' }}
            />
          ))}

          {/* Decorative glowing dots */}
          {decorativeDots.map((dot, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r="0.4"
              fill="var(--tva-orange)"
              filter="url(#ygg-glow)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 0.8, 0.4] }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 2 + i * 0.04, ease: 'easeOut' }}
            />
          ))}
        </svg>

        {/* Image nodes overlaid on the tree */}
        {imageNodes.map((node, i) => (
          <YggdrasilImageNode
            key={node.id}
            node={node}
            index={i}
            isHovered={hoveredNode === node.id}
            onHover={() => setHoveredNode(node.id)}
            onLeave={() => setHoveredNode(null)}
          />
        ))}
      </div>

      {/* Bottom section */}
      <motion.div 
        className="yggdrasil-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        {/* Yggdrasil rune */}
        <div className="yggdrasil-rune">
          <svg viewBox="0 0 40 40" width="40" height="40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--tva-orange)" strokeWidth="1" />
            <line x1="20" y1="5" x2="20" y2="35" stroke="var(--tva-orange)" strokeWidth="1.5" />
            <line x1="20" y1="12" x2="12" y2="20" stroke="var(--tva-orange)" strokeWidth="1.2" />
            <line x1="20" y1="12" x2="28" y2="20" stroke="var(--tva-orange)" strokeWidth="1.2" />
          </svg>
        </div>
        <h2 className="yggdrasil-name">Y G G D R A S I L</h2>
        <div className="yggdrasil-buttons">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ygg-btn">
            <span>← EXPLORE</span>
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="ygg-btn">
            <span>CONNECT →</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

/* ---- Individual image node component ---- */
const YggdrasilImageNode: React.FC<{
  node: ImageNode;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}> = ({ node, index, isHovered, onHover, onLeave }) => {
  return (
    <motion.div
      className={`ygg-node ygg-node-${node.labelSide}`}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: 1.5 + index * 0.15, type: 'spring', stiffness: 200 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* The glowing dot */}
      <a 
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="ygg-dot-link"
      >
        <div className="ygg-dot">
          <div className="ygg-dot-core" />
          <div className="ygg-dot-ring" />
        </div>

        {/* Label */}
        <span className="ygg-label">{node.label}</span>
      </a>

      {/* Popup image on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="ygg-popup"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img src={node.src} alt={node.label} />
            <div className="ygg-popup-label">{node.label}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
