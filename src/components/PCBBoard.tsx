import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Link, Instagram, MessageCircle } from 'lucide-react';

const icChips = [
  {
    label: 'GMAIL',
    icon: Mail,
    href: 'mailto:karthikeyant1885@gmail.com',
    target: undefined as string | undefined,
    pinLabel: 'COM-01',
  },
  {
    label: 'WHATSAPP',
    icon: MessageCircle,
    href: 'https://wa.me/918110823730',
    target: '_blank',
    pinLabel: 'WAP-02',
  },
  {
    label: 'INSTAGRAM',
    icon: Instagram,
    href: 'https://instagram.com/karthikristen',
    target: '_blank',
    pinLabel: 'IG-03',
  },
  {
    label: 'LINKEDIN',
    icon: Link,
    href: 'https://www.linkedin.com/in/karthikristen/',
    target: '_blank',
    pinLabel: 'LNK-04',
  },
];

/* Helper: create a glowing animated trace */
const Trace = ({ d, w = 2, delay = 0.5, dur = 0.8, dim = false }: { d: string; w?: number; delay?: number; dur?: number; dim?: boolean }) => (
  <motion.path
    d={d}
    stroke={dim ? 'rgba(255,140,0,0.18)' : '#ff8c00'}
    strokeWidth={w}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    filter={dim ? undefined : 'url(#traceGlow)'}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: dur, delay, ease: 'easeInOut' }}
  />
);

/* Via hole (through-hole pad) */
const Via = ({ cx, cy, r = 3.5, bright = false }: { cx: number; cy: number; r?: number; bright?: boolean }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 2} fill="none" stroke="rgba(255,140,0,0.25)" strokeWidth="1" />
    <circle cx={cx} cy={cy} r={r} fill={bright ? '#ff8c00' : 'rgba(255,140,0,0.4)'} filter={bright ? 'url(#traceGlow)' : undefined} />
    <circle cx={cx} cy={cy} r={r - 1.5} fill="rgba(0,0,0,0.8)" />
  </g>
);

export const PCBBoard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      style={{
        position: 'relative',
        marginTop: '2rem',
        width: '100%',
      }}
    >
      {/* PCB BOARD CONTAINER */}
      <div className="pcb-board">

        {/* ===== DENSE SVG PCB TRACES ===== */}
        <svg
          className="pcb-wires"
          viewBox="0 0 600 340"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <defs>
            <filter id="traceGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========== MAIN BUS FROM LEFT ========== */}
          {/* Thick main bus */}
          <Trace d="M -5,170 L 45,170" w={4} delay={0.3} dur={0.5} />
          {/* Bus splits into 8 parallel lines entering the board */}
          <Trace d="M 0,155 L 35,155" w={1.5} delay={0.35} dur={0.4} />
          <Trace d="M 0,162 L 35,162" w={1.5} delay={0.38} dur={0.4} />
          <Trace d="M 0,178 L 35,178" w={1.5} delay={0.4} dur={0.4} />
          <Trace d="M 0,185 L 35,185" w={1.5} delay={0.42} dur={0.4} />
          <Trace d="M 0,148 L 30,148" w={1} delay={0.44} dur={0.4} dim />
          <Trace d="M 0,192 L 30,192" w={1} delay={0.46} dur={0.4} dim />

          {/* ========== VERTICAL BACKBONE ========== */}
          <Trace d="M 45,170 L 45,45" w={3} delay={0.6} dur={0.6} />
          <Trace d="M 45,170 L 45,295" w={3} delay={0.6} dur={0.6} />
          {/* Parallel backbone traces */}
          <Trace d="M 38,155 L 38,55" w={1.5} delay={0.65} dur={0.5} />
          <Trace d="M 38,185 L 38,285" w={1.5} delay={0.65} dur={0.5} />
          <Trace d="M 52,162 L 52,60" w={1} delay={0.7} dur={0.5} dim />
          <Trace d="M 52,178 L 52,280" w={1} delay={0.7} dur={0.5} dim />

          {/* ========== TOP-LEFT (COMMUNICATE) TRACES ========== */}
          {/* Main trace */}
          <Trace d="M 45,85 L 85,85 L 100,70 L 140,70" w={2.5} delay={0.9} dur={0.6} />
          {/* Parallel traces */}
          <Trace d="M 38,75 L 70,75 L 85,60 L 140,60" w={1.5} delay={0.95} dur={0.5} />
          <Trace d="M 52,95 L 80,95 L 95,80 L 140,80" w={1.5} delay={1.0} dur={0.5} />
          {/* Thin detail traces */}
          <Trace d="M 45,68 L 65,68 L 75,55 L 140,55" w={1} delay={1.05} dur={0.5} dim />
          <Trace d="M 45,100 L 90,100 L 100,90 L 140,90" w={1} delay={1.08} dur={0.5} dim />
          {/* Extra meandering traces */}
          <Trace d="M 60,75 L 60,50 L 80,50 L 80,60" w={0.8} delay={1.1} dur={0.4} dim />
          <Trace d="M 100,95 L 100,105 L 120,105 L 120,90" w={0.8} delay={1.12} dur={0.4} dim />

          {/* ========== TOP-RIGHT (LINKEDIN) TRACES ========== */}
          {/* Main trace */}
          <Trace d="M 140,70 L 280,70 L 300,85 L 340,85" w={2.5} delay={1.1} dur={0.7} />
          {/* Parallel */}
          <Trace d="M 140,60 L 260,60 L 280,75 L 340,75" w={1.5} delay={1.15} dur={0.6} />
          <Trace d="M 140,80 L 290,80 L 305,95 L 340,95" w={1.5} delay={1.2} dur={0.6} />
          {/* Thin detail */}
          <Trace d="M 140,55 L 250,55 L 265,65 L 340,65" w={1} delay={1.25} dur={0.5} dim />
          <Trace d="M 140,90 L 295,90 L 310,100 L 340,100" w={1} delay={1.28} dur={0.5} dim />
          {/* Cross traces between top chips */}
          <Trace d="M 200,55 L 200,40 L 280,40 L 280,55" w={0.8} delay={1.3} dur={0.4} dim />
          <Trace d="M 220,90 L 220,105 L 260,105 L 260,90" w={0.8} delay={1.32} dur={0.4} dim />

          {/* ========== BOTTOM-LEFT (GITHUB) TRACES ========== */}
          {/* Main trace */}
          <Trace d="M 45,255 L 85,255 L 100,270 L 140,270" w={2.5} delay={1.0} dur={0.6} />
          {/* Parallel */}
          <Trace d="M 38,265 L 70,265 L 85,280 L 140,280" w={1.5} delay={1.05} dur={0.5} />
          <Trace d="M 52,245 L 80,245 L 95,260 L 140,260" w={1.5} delay={1.1} dur={0.5} />
          {/* Thin detail */}
          <Trace d="M 45,272 L 65,272 L 75,285 L 140,285" w={1} delay={1.15} dur={0.5} dim />
          <Trace d="M 45,240 L 90,240 L 100,250 L 140,250" w={1} delay={1.18} dur={0.5} dim />
          {/* Extra traces */}
          <Trace d="M 60,265 L 60,290 L 80,290 L 80,280" w={0.8} delay={1.2} dur={0.4} dim />
          <Trace d="M 100,245 L 100,235 L 120,235 L 120,250" w={0.8} delay={1.22} dur={0.4} dim />

          {/* ========== BOTTOM-RIGHT (RESUME) TRACES ========== */}
          {/* Main trace */}
          <Trace d="M 140,270 L 280,270 L 300,255 L 340,255" w={2.5} delay={1.2} dur={0.7} />
          {/* Parallel */}
          <Trace d="M 140,280 L 260,280 L 280,265 L 340,265" w={1.5} delay={1.25} dur={0.6} />
          <Trace d="M 140,260 L 290,260 L 305,245 L 340,245" w={1.5} delay={1.3} dur={0.6} />
          {/* Thin detail */}
          <Trace d="M 140,285 L 250,285 L 265,275 L 340,275" w={1} delay={1.35} dur={0.5} dim />
          <Trace d="M 140,250 L 295,250 L 310,240 L 340,240" w={1} delay={1.38} dur={0.5} dim />
          {/* Cross traces between bottom chips */}
          <Trace d="M 200,285 L 200,300 L 280,300 L 280,285" w={0.8} delay={1.4} dur={0.4} dim />
          <Trace d="M 220,250 L 220,235 L 260,235 L 260,250" w={0.8} delay={1.42} dur={0.4} dim />

          {/* ========== VERTICAL INTER-CHIP CONNECTORS ========== */}
          {/* Left side vertical between COMMUNICATE & GITHUB */}
          <Trace d="M 120,90 L 120,250" w={1} delay={1.5} dur={0.6} dim />
          <Trace d="M 130,95 L 130,245" w={0.8} delay={1.52} dur={0.6} dim />
          {/* Right side vertical between LINKEDIN & RESUME */}
          <Trace d="M 355,100 L 355,240" w={1} delay={1.55} dur={0.6} dim />
          <Trace d="M 365,95 L 365,245" w={0.8} delay={1.57} dur={0.6} dim />

          {/* ========== OUTER EDGE TRACES (border routing) ========== */}
          <Trace d="M 10,20 L 590,20" w={0.8} delay={1.6} dur={0.8} dim />
          <Trace d="M 10,30 L 590,30" w={0.5} delay={1.65} dur={0.8} dim />
          <Trace d="M 10,310 L 590,310" w={0.8} delay={1.6} dur={0.8} dim />
          <Trace d="M 10,320 L 590,320" w={0.5} delay={1.65} dur={0.8} dim />
          {/* Left edge vertical */}
          <Trace d="M 15,20 L 15,320" w={0.5} delay={1.7} dur={0.6} dim />
          <Trace d="M 22,25 L 22,315" w={0.5} delay={1.72} dur={0.6} dim />
          {/* Right edge vertical */}
          <Trace d="M 585,20 L 585,320" w={0.5} delay={1.7} dur={0.6} dim />
          <Trace d="M 578,25 L 578,315" w={0.5} delay={1.72} dur={0.6} dim />

          {/* ========== DECORATIVE DIAGONAL TRACES ========== */}
          <Trace d="M 15,20 L 30,35" w={0.6} delay={1.8} dur={0.3} dim />
          <Trace d="M 585,20 L 570,35" w={0.6} delay={1.8} dur={0.3} dim />
          <Trace d="M 15,320 L 30,305" w={0.6} delay={1.8} dur={0.3} dim />
          <Trace d="M 585,320 L 570,305" w={0.6} delay={1.8} dur={0.3} dim />
          {/* Diagonal accent traces */}
          <Trace d="M 160,110 L 180,130 L 180,210 L 160,230" w={0.6} delay={1.85} dur={0.5} dim />
          <Trace d="M 320,110 L 300,130 L 300,210 L 320,230" w={0.6} delay={1.87} dur={0.5} dim />

          {/* ========== VIA HOLES (through-hole pads) ========== */}
          {/* Main junction vias */}
          <Via cx={45} cy={170} r={5} bright />
          <Via cx={45} cy={85} r={4} bright />
          <Via cx={45} cy={255} r={4} bright />

          {/* Trace junction vias */}
          <Via cx={85} cy={85} r={3} />
          <Via cx={85} cy={255} r={3} />
          <Via cx={280} cy={70} r={3} />
          <Via cx={280} cy={270} r={3} />

          {/* Decorative vias along edges */}
          <Via cx={15} cy={50} r={2.5} />
          <Via cx={15} cy={120} r={2.5} />
          <Via cx={15} cy={220} r={2.5} />
          <Via cx={15} cy={290} r={2.5} />
          <Via cx={585} cy={50} r={2.5} />
          <Via cx={585} cy={120} r={2.5} />
          <Via cx={585} cy={220} r={2.5} />
          <Via cx={585} cy={290} r={2.5} />

          {/* Mid-board decorative vias */}
          <Via cx={200} cy={170} r={2.5} />
          <Via cx={240} cy={170} r={2.5} />
          <Via cx={160} cy={130} r={2} />
          <Via cx={160} cy={210} r={2} />
          <Via cx={320} cy={130} r={2} />
          <Via cx={320} cy={210} r={2} />

          {/* Corner mounting holes */}
          <Via cx={25} cy={25} r={4} />
          <Via cx={575} cy={25} r={4} />
          <Via cx={25} cy={315} r={4} />
          <Via cx={575} cy={315} r={4} />

          {/* ========== PULSING GLOW ON MAIN BUS ========== */}
          <motion.circle
            cx={45}
            cy={170}
            r={8}
            fill="none"
            stroke="rgba(255,140,0,0.4)"
            strokeWidth={2}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        </svg>

        {/* IC CHIP GRID */}
        <div className="pcb-chip-grid">
          {icChips.map((chip, index) => {
            const Icon = chip.icon;
            return (
              <motion.a
                key={chip.label}
                href={chip.href}
                target={chip.target}
                rel={chip.target ? 'noopener noreferrer' : undefined}
                className="pcb-ic-chip"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.15, duration: 0.5 }}
              >
                {/* IC Pin notch */}
                <div className="pcb-ic-notch" />

                {/* IC Pin label */}
                <span className="pcb-ic-pin-label">{chip.pinLabel}</span>

                {/* IC Chip pins (left side) */}
                <div className="pcb-ic-pins pcb-ic-pins-left">
                  <div className="pcb-pin" />
                  <div className="pcb-pin" />
                  <div className="pcb-pin" />
                  <div className="pcb-pin" />
                </div>

                {/* IC Content */}
                <div className="pcb-ic-content">
                  <Icon size={20} />
                  <span>{chip.label}</span>
                </div>

                {/* IC Chip pins (right side) */}
                <div className="pcb-ic-pins pcb-ic-pins-right">
                  <div className="pcb-pin" />
                  <div className="pcb-pin" />
                  <div className="pcb-pin" />
                  <div className="pcb-pin" />
                </div>

                {/* IC Chip pins (bottom) */}
                <div className="pcb-ic-pins-bottom">
                  <div className="pcb-pin-h" />
                  <div className="pcb-pin-h" />
                  <div className="pcb-pin-h" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
