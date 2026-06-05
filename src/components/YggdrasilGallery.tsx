import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ─── IMAGE DATA ────────────────────────────────────────────────────────────────
// Add or remove images here — the tree auto-generates branches to match.
const images = [
  { id: 1, src: '/images/instagram/1.png', label: 'TIMELINE EVENT: 0X-11' },
  { id: 2, src: '/images/instagram/2.png', label: 'TIMELINE EVENT: 0X-12' },
  { id: 3, src: '/images/instagram/3.png', label: 'TIMELINE EVENT: 0X-13' },
  { id: 4, src: '/images/instagram/4.png', label: 'TIMELINE EVENT: 0X-14' },
  { id: 5, src: '/images/instagram/5.png', label: 'TIMELINE EVENT: 0X-15' },
  { id: 6, src: '/images/instagram/6.png', label: 'TIMELINE EVENT: 0X-16' },
  { id: 7, src: '/images/instagram/7.png', label: 'TIMELINE EVENT: 0X-17' },
  { id: 8, src: '/images/instagram/8.png', label: 'TIMELINE EVENT: 0X-18' },
];

// ─── TREE LAYOUT GENERATOR ────────────────────────────────────────────────────
// Automatically lays out trunk + branches based on image count.
// Returns nodes with (x,y) positions in 0-100 coordinate space and SVG path data.

interface TreeNode {
  id: number;
  x: number;       // 0-100 percentage
  y: number;       // 0-100 percentage
  pathD: string;   // SVG path from parent junction to this node
  trunkSegment?: string; // optional trunk segment drawn before this tier
  appearAt: number; // scroll progress [0,1] when this node/branch appears
}

function buildTree(count: number): TreeNode[] {
  if (count === 0) return [];

  const nodes: TreeNode[] = [];
  const cx = 50; // trunk center x

  // Trunk runs from bottom (y=95) up to y=10
  // We divide the trunk into tiers. Each tier hosts a pair of branches (or one center branch).

  // Tier definitions: trunk junction Y and branch spread
  const tierJunctions = [80, 62, 44, 28, 14];
  const tierSpreads   = [22, 28, 32, 34, 34]; // horizontal distance from trunk

  // Assign images round-robin to positions: left, right, left, right, center...
  // Then group into tiers of 2 (or 1 for odd last)

  const positions: { x: number; y: number; junctionY: number; tierIdx: number; side: 'left' | 'right' | 'center' }[] = [];

  let tier = 0;
  let slot = 0; // 0=left, 1=right per tier

  for (let i = 0; i < count; i++) {
    const tIdx = Math.min(tier, tierJunctions.length - 1);
    const jY = tierJunctions[tIdx];
    const spread = tierSpreads[tIdx];

    // Within a tier: first goes left, second goes right
    // If only one remains, goes slightly offset from center
    const side: 'left' | 'right' | 'center' = slot === 0 ? 'left' : 'right';
    const nodeX = side === 'left' ? cx - spread : cx + spread;
    const nodeY = jY - 8 + (slot === 0 ? 4 : -4);

    positions.push({ x: nodeX, y: nodeY, junctionY: jY, tierIdx: tIdx, side });

    slot++;
    if (slot >= 2) {
      slot = 0;
      tier++;
    }
  }

  // Build SVG paths + scroll appear timing
  positions.forEach((pos, i) => {
    const jY = pos.junctionY;
    const normalizedAppear = 0.15 + (i / count) * 0.65;

    // Branch path: from trunk at (cx, jY) curve to node position
    const midX = pos.side === 'left'
      ? cx - (pos.x - cx) * 0.3
      : cx + (pos.x - cx) * 0.3;

    const pathD = `M ${cx} ${jY} Q ${midX} ${jY - 4}, ${pos.x} ${pos.y}`;

    nodes.push({
      id: i + 1,
      x: pos.x,
      y: pos.y,
      pathD,
      appearAt: normalizedAppear,
    });
  });

  return nodes;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  .ygg-wrap {
    position: relative;
    width: 100%;
    min-height: 280vh;
    background: transparent;
  }

  .ygg-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }

  .ygg-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 60%, #1a0d00 0%, #0a0500 60%, #000 100%);
    z-index: 0;
  }

  .ygg-scan {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255,120,0,0.012) 2px,
      rgba(255,120,0,0.012) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  .ygg-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%);
    pointer-events: none;
    z-index: 2;
  }

  .ygg-svg-layer {
    position: absolute;
    inset: 0;
    z-index: 10;
  }

  .ygg-nodes-layer {
    position: absolute;
    inset: 0;
    z-index: 20;
  }

  .ygg-header {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 30;
    white-space: nowrap;
  }

  .ygg-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(1.2rem, 3vw, 2.2rem);
    color: #e8821a;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-shadow: 0 0 30px rgba(232,130,26,0.6);
    margin: 0 0 0.4rem;
  }

  .ygg-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.55rem, 1.2vw, 0.75rem);
    color: rgba(232,130,26,0.6);
    letter-spacing: 0.3em;
    text-transform: uppercase;
  }

  .ygg-node-img {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .ygg-frame {
    position: relative;
    width: clamp(80px, 9vw, 130px);
    aspect-ratio: 1;
  }

  .ygg-frame::before {
    content: '';
    position: absolute;
    inset: -3px;
    border: 1px solid rgba(232,130,26,0.7);
    clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px);
    box-shadow: 0 0 18px rgba(232,130,26,0.35), inset 0 0 12px rgba(0,0,0,0.6);
  }

  .ygg-frame::after {
    content: '';
    position: absolute;
    inset: -6px;
    border: 1px solid rgba(232,130,26,0.2);
    clip-path: polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px);
  }

  .ygg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px);
    filter: sepia(0.2) saturate(0.9) brightness(0.85);
    transition: filter 0.3s ease;
  }

  .ygg-node-img:hover .ygg-img {
    filter: sepia(0) saturate(1.1) brightness(1.05);
  }

  .ygg-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.38rem, 0.7vw, 0.55rem);
    color: rgba(232,130,26,0.8);
    letter-spacing: 0.12em;
    text-align: center;
    margin-top: 5px;
    white-space: nowrap;
    text-shadow: 0 0 8px rgba(232,130,26,0.5);
  }

  .ygg-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #e8821a;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #e8821a, 0 0 20px rgba(232,130,26,0.5);
  }

  .ygg-counter {
    position: absolute;
    bottom: 6%;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: rgba(232,130,26,0.4);
    letter-spacing: 0.3em;
    z-index: 30;
    white-space: nowrap;
  }
`;

// ─── SUB-COMPONENT: BRANCH PATH ───────────────────────────────────────────────
const AnimatedBranch: React.FC<{
  pathD: string;
  progress: any;
  appearAt: number;
  strokeWidth?: number;
}> = ({ pathD, progress, appearAt, strokeWidth = 0.7 }) => {
  const pathLength = useTransform(progress, [appearAt, Math.min(appearAt + 0.08, 1)], [0, 1]);
  const opacity    = useTransform(progress, [appearAt, Math.min(appearAt + 0.06, 1)], [0, 1]);

  return (
    <motion.path
      d={pathD}
      fill="none"
      stroke="var(--tva-orange, #e8821a)"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      style={{
        pathLength,
        opacity,
        filter: 'drop-shadow(0 0 3px rgba(232,130,26,0.7))',
      }}
    />
  );
};

// ─── SUB-COMPONENT: NODE ─────────────────────────────────────────────────────
const YggdrasilNode: React.FC<{
  img: (typeof images)[number];
  node: TreeNode;
  progress: any;
}> = ({ img, node, progress }) => {
  const start = node.appearAt + 0.04;
  const end   = Math.min(start + 0.07, 1);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale   = useTransform(progress, [start, end], [0.4, 1]);
  const y       = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.div
      className="ygg-node-img"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        opacity,
        scale,
        y,
      }}
    >
      <div className="ygg-frame">
        <img src={img.src} alt={img.label} className="ygg-img" loading="lazy" />
        <div className="ygg-dot" />
      </div>
      <p className="ygg-label">{img.label}</p>
    </motion.div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const YggdrasilGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 18,
    restDelta: 0.001,
  });

  const headerOpacity = useTransform(smoothProgress, [0, 0.12], [0, 1]);

  // Auto-generate tree layout from image array
  const nodes = useMemo(() => buildTree(images.length), []);

  // Trunk path segments — drawn in tiers matching node tiers
  const trunkSegments = useMemo(() => {
    // One trunk segment per tier (from bottom to top)
    const tiers = [
      { d: 'M 50 95 Q 50 87, 50 80', at: 0.05 },
      { d: 'M 50 80 Q 50 71, 50 62', at: 0.25 },
      { d: 'M 50 62 Q 50 53, 50 44', at: 0.42 },
      { d: 'M 50 44 Q 50 36, 50 28', at: 0.57 },
      { d: 'M 50 28 Q 50 21, 50 14', at: 0.72 },
    ];
    // Only render as many trunk segments as there are tier groups needed
    const tiersNeeded = Math.ceil(images.length / 2);
    return tiers.slice(0, Math.min(tiersNeeded, tiers.length));
  }, []);

  // Outer ring
  const ringOpacity = useTransform(smoothProgress, [0, 0.1], [0, 0.6]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div ref={containerRef} className="ygg-wrap">
        <div className="ygg-sticky">

          {/* ── Background ── */}
          <div className="ygg-bg" />
          <div className="ygg-scan" />
          <div className="ygg-vignette" />

          {/* ── Header ── */}
          <motion.div className="ygg-header" style={{ opacity: headerOpacity }}>
            <h2 className="ygg-title">Sacred Timeline Branches</h2>
            <p className="ygg-subtitle">[ Viewing Alternate Realities ]</p>
          </motion.div>

          {/* ── SVG Tree ── */}
          <div className="ygg-svg-layer">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMax meet"
              style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
              <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer decorative ring */}
              <motion.circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#e8821a"
                strokeWidth="0.3"
                style={{ opacity: ringOpacity }}
              />
              {/* Cardinal tick marks */}
              {[0, 90, 180, 270].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const r1 = 46, r2 = 43;
                const x1 = 50 + r1 * Math.sin(rad);
                const y1 = 50 - r1 * Math.cos(rad);
                const x2 = 50 + r2 * Math.sin(rad);
                const y2 = 50 - r2 * Math.cos(rad);
                return (
                  <motion.line
                    key={deg}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#e8821a"
                    strokeWidth="0.5"
                    style={{ opacity: ringOpacity }}
                  />
                );
              })}
              {/* Small triangle markers at cardinal ends */}
              {[
                { d: 'M 50 2.5 L 51.8 5.5 L 48.2 5.5 Z' },
                { d: 'M 50 97.5 L 48.2 94.5 L 51.8 94.5 Z' },
                { d: 'M 2.5 50 L 5.5 48.2 L 5.5 51.8 Z' },
                { d: 'M 97.5 50 L 94.5 51.8 L 94.5 48.2 Z' },
              ].map((t, i) => (
                <motion.path
                  key={i}
                  d={t.d}
                  fill="none"
                  stroke="#e8821a"
                  strokeWidth="0.4"
                  style={{ opacity: ringOpacity }}
                />
              ))}

              {/* Trunk segments */}
              <g filter="url(#glow)">
                {trunkSegments.map((seg, i) => (
                  <AnimatedBranch
                    key={`trunk-${i}`}
                    pathD={seg.d}
                    progress={smoothProgress}
                    appearAt={seg.at}
                    strokeWidth={1.4 - i * 0.15}
                  />
                ))}

                {/* Branch paths to each node */}
                {nodes.map((node) => (
                  <AnimatedBranch
                    key={`branch-${node.id}`}
                    pathD={node.pathD}
                    progress={smoothProgress}
                    appearAt={node.appearAt}
                    strokeWidth={0.6}
                  />
                ))}

                {/* Root system — decorative */}
                {[
                  { d: 'M 50 95 Q 38 97, 28 99', at: 0.02 },
                  { d: 'M 50 95 Q 62 97, 72 99', at: 0.02 },
                  { d: 'M 50 95 Q 44 100, 40 102', at: 0.03 },
                  { d: 'M 50 95 Q 56 100, 60 102', at: 0.03 },
                  { d: 'M 28 99 Q 22 99, 18 101', at: 0.04 },
                  { d: 'M 72 99 Q 78 99, 82 101', at: 0.04 },
                ].map((r, i) => (
                  <AnimatedBranch
                    key={`root-${i}`}
                    pathD={r.d}
                    progress={smoothProgress}
                    appearAt={r.at}
                    strokeWidth={0.5}
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* ── Image Nodes ── */}
          <div className="ygg-nodes-layer">
            {nodes.map((node, i) => {
              const img = images[i];
              if (!img) return null;
              return (
                <YggdrasilNode
                  key={node.id}
                  img={img}
                  node={node}
                  progress={smoothProgress}
                />
              );
            })}
          </div>

          {/* ── Footer counter ── */}
          <motion.p
            className="ygg-counter"
            style={{ opacity: useTransform(smoothProgress, [0.05, 0.2], [0, 1]) }}
          >
            [ {images.length.toString().padStart(2, '0')} BRANCHES ACTIVE ]
          </motion.p>

        </div>
      </div>
    </>
  );
};

export default YggdrasilGallery;
