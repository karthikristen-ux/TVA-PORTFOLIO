import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Link, Terminal, FileText } from 'lucide-react';

const icChips = [
  {
    label: 'COMMUNICATE',
    icon: Mail,
    href: 'mailto:karthikeyant1885@gmail.com',
    target: undefined as string | undefined,
    pinLabel: 'COM-01',
  },
  {
    label: 'LINKEDIN',
    icon: Link,
    href: 'https://www.linkedin.com/in/karthikristen/',
    target: '_blank',
    pinLabel: 'LNK-02',
  },
  {
    label: 'GITHUB',
    icon: Terminal,
    href: 'https://github.com/karthikristen-ux',
    target: '_blank',
    pinLabel: 'GIT-03',
  },
  {
    label: 'RESUME (CV)',
    icon: FileText,
    href: 'https://drive.google.com/file/d/1Y6PHHpYaOuttlEbAWEBzi9brH7QaRlze/view?usp=drive_link',
    target: '_blank',
    pinLabel: 'RES-04',
  },
];

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
        {/* SVG WIRES coming from the left */}
        <svg
          className="pcb-wires"
          viewBox="0 0 600 320"
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
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main bus wire from left edge */}
          <motion.path
            d="M 0,160 L 60,160"
            stroke="#ff8c00"
            strokeWidth="3"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          {/* Branch to top-left IC (COMMUNICATE) */}
          <motion.path
            d="M 60,160 L 60,80 L 130,80"
            stroke="#ff8c00"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          />

          {/* Branch to top-right IC (LINKEDIN) */}
          <motion.path
            d="M 60,160 L 60,80 L 310,80 L 370,80"
            stroke="#ff8c00"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />

          {/* Branch to bottom-left IC (GITHUB) */}
          <motion.path
            d="M 60,160 L 60,240 L 130,240"
            stroke="#ff8c00"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          />

          {/* Branch to bottom-right IC (RESUME) */}
          <motion.path
            d="M 60,160 L 60,240 L 310,240 L 370,240"
            stroke="#ff8c00"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* Horizontal crossbar traces */}
          <motion.path
            d="M 130,80 L 130,50 L 370,50 L 370,80"
            stroke="rgba(255,140,0,0.25)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          />
          <motion.path
            d="M 130,240 L 130,270 L 370,270 L 370,240"
            stroke="rgba(255,140,0,0.25)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          />

          {/* Junction dots */}
          <circle cx="60" cy="160" r="4" fill="#ff8c00" filter="url(#glow)" />
          <circle cx="60" cy="80" r="3" fill="#ff8c00" filter="url(#glow)" />
          <circle cx="60" cy="240" r="3" fill="#ff8c00" filter="url(#glow)" />
          <circle cx="310" cy="80" r="2.5" fill="#ff8c00" />
          <circle cx="310" cy="240" r="2.5" fill="#ff8c00" />
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
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
