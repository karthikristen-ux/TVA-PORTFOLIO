import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Page-specific facts
const pageConfig: Record<string, { facts: string[]; mood: string }> = {
  '/': {
    mood: 'wave',
    facts: [
      "Hey there, y'all! Welcome to Karthikeyan's timeline!",
      "He's studying Electronics and Communication Engineering!",
      "Ooh! He knows Python, C, Java, and IoT!",
      "Need a circuit designed? He's your guy!",
      "He's at Sathyabama Institute of Science and Technology!",
      "Click me again for another fun fact, sugar!"
    ]
  },
  '/projects': {
    mood: 'excited',
    facts: [
      "Look at all these projects! 1st place for a Farming Project!",
      "Watch out! He built a Mobile Flood Water Transporter!",
      "He interned at Shell doing fancy IoT Web Projects!",
      "Click the code buttons to see the repositories!",
      "The RAWP project monitors water quality with real sensors!",
      "That farming system runs on Bluetooth and Wi-Fi, sugar!"
    ]
  },
  '/certificates': {
    mood: 'proud',
    facts: [
      "Wowee! Look at all these credentials!",
      "He's got a State-Level Expo win from VIT Vellore!",
      "A District-Level Hackathon runner up! Impressive!",
      "All these certificates prove he's not a variant!",
      "Each one is a verified timeline event!",
      "The TVA approves of these credentials, sugar!"
    ]
  },
  '/hobbies': {
    mood: 'excited',
    facts: [
      "Ooh, look at these captures from across the timeline!",
      "He's got a real eye for photography, sugar!",
      "These image logs are perfectly aesthetic!",
      "When he's not coding, he's snapping pictures!",
      "Click the Instagram link to see the full archive!",
      "Every picture tells a story of the timeline!"
    ]
  }
};

// ========== ANIMATED SVG CHARACTER ==========
const MissMinutesBody: React.FC<{
  pupilPos: { x: number; y: number };
  isTalking: boolean;
  mood: string;
  isSleeping: boolean;
}> = ({ pupilPos, isTalking, mood, isSleeping }) => {
  const orange = '#FF8C00';
  const orangeLight = '#FFB347';
  const orangeDark = '#CC6600';
  const cream = '#FFF5E6';

  return (
    <svg viewBox="0 0 200 240" width="130" height="156" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="mmglow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bodyGrad2" cx="45%" cy="38%">
          <stop offset="0%" stopColor={orangeLight} />
          <stop offset="65%" stopColor={orange} />
          <stop offset="100%" stopColor={orangeDark} />
        </radialGradient>
      </defs>

      {/* LEFT LEG */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-12,75,175;12,75,175;-12,75,175" dur="0.5s" repeatCount="indefinite" />
        <rect x="68" y="170" width="12" height="28" rx="5" fill={orangeDark} />
        <ellipse cx="68" cy="200" rx="14" ry="7" fill="#6B3410" />
        <ellipse cx="68" cy="198" rx="12" ry="5" fill="#8B4513" />
      </g>

      {/* RIGHT LEG */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="12,125,175;-12,125,175;12,125,175" dur="0.5s" repeatCount="indefinite" />
        <rect x="118" y="170" width="12" height="28" rx="5" fill={orangeDark} />
        <ellipse cx="132" cy="200" rx="14" ry="7" fill="#6B3410" />
        <ellipse cx="132" cy="198" rx="12" ry="5" fill="#8B4513" />
      </g>

      {/* LEFT ARM */}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values={mood === 'excited' ? "-20,42,100;-45,42,100;-20,42,100" : "10,42,100;-45,42,100;10,42,100"}
          dur={mood === 'excited' ? "0.6s" : "0.7s"} repeatCount="indefinite" />
        <rect x="15" y="95" width="30" height="10" rx="5" fill={orangeDark} />
        <circle cx="13" cy="100" r="9" fill={cream} />
        <circle cx="8" cy="94" r="4.5" fill={cream} />
      </g>

      {/* RIGHT ARM */}
      <g>
        <animateTransform attributeName="transform" type="rotate"
          values={mood === 'excited' ? "20,158,100;45,158,100;20,158,100" : "-10,158,100;45,158,100;-10,158,100"}
          dur={mood === 'excited' ? "0.6s" : "0.9s"} repeatCount="indefinite" />
        <rect x="155" y="95" width="30" height="10" rx="5" fill={orangeDark} />
        <circle cx="187" cy="100" r="9" fill={cream} />
        <circle cx="192" cy="94" r="4.5" fill={cream} />
      </g>

      {/* MAIN BODY */}
      <circle cx="100" cy="95" r="80" fill="url(#bodyGrad2)" filter="url(#mmglow)" />
      <circle cx="100" cy="95" r="73" fill="none" stroke={orangeDark} strokeWidth="1.5" opacity="0.4" />

      {/* HOUR MARKERS */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        return (
          <line key={i}
            x1={100 + Math.cos(angle) * 64} y1={95 + Math.sin(angle) * 64}
            x2={100 + Math.cos(angle) * 72} y2={95 + Math.sin(angle) * 72}
            stroke={orangeDark} strokeWidth={i % 3 === 0 ? 3.5 : 1.8} strokeLinecap="round" />
        );
      })}

      {/* CLOCK HANDS */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 100 95" to="360 100 95" dur="40s" repeatCount="indefinite" />
        <line x1="100" y1="95" x2="100" y2="58" stroke="#3a1800" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="90 100 95" to="450 100 95" dur="8s" repeatCount="indefinite" />
        <line x1="100" y1="95" x2="100" y2="45" stroke="#3a1800" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="95" r="3.5" fill="#3a1800" />

      {/* EYES */}
      {isSleeping ? (
        <g>
          {/* Sleeping Eyes */}
          <ellipse cx="78" cy="85" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
          <path d="M 68 85 Q 78 95 88 85" fill="none" stroke="#3a1800" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="122" cy="85" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
          <path d="M 112 85 Q 122 95 132 85" fill="none" stroke="#3a1800" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Zzzzz animation */}
          <g>
            <text x="135" y="40" fontSize="18" fill={orangeLight} fontFamily="var(--font-mono)" opacity="0" fontWeight="bold">
              <animate attributeName="y" values="40;20" dur="2s" repeatCount="indefinite" />
              <animate attributeName="x" values="135;145" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              Z
            </text>
            <text x="145" y="25" fontSize="22" fill={orangeLight} fontFamily="var(--font-mono)" opacity="0" fontWeight="bold">
              <animate attributeName="y" values="25;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="x" values="145;155" dur="2s" repeatCount="indefinite" begin="0.6s" />
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
              Z
            </text>
            <text x="155" y="5" fontSize="28" fill={orangeLight} fontFamily="var(--font-mono)" opacity="0" fontWeight="bold">
              <animate attributeName="y" values="5;-25" dur="2s" repeatCount="indefinite" begin="1.2s" />
              <animate attributeName="x" values="155;165" dur="2s" repeatCount="indefinite" begin="1.2s" />
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.2s" />
              Z
            </text>
          </g>
        </g>
      ) : (
        <g>
          <ellipse cx="78" cy="85" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
          <circle cx={78 + pupilPos.x} cy={85 + pupilPos.y} r="6.5" fill="#1a1a1a" />
          <circle cx={75 + pupilPos.x} cy={82 + pupilPos.y} r="2.2" fill="white" />
          <ellipse cx="122" cy="85" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
          <circle cx={122 + pupilPos.x} cy={85 + pupilPos.y} r="6.5" fill="#1a1a1a" />
          <circle cx={119 + pupilPos.x} cy={82 + pupilPos.y} r="2.2" fill="white" />
        </g>
      )}

      {/* EYEBROWS */}
      <line x1="65" y1="64" x2="88" y2="66" stroke={orangeDark} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="112" y1="66" x2="135" y2="64" stroke={orangeDark} strokeWidth="2.5" strokeLinecap="round" />

      {/* MOUTH */}
      {isTalking ? (
        <g>
          <ellipse cx="100" cy="118" rx="16" ry="10" fill="#6B0000" stroke={orangeDark} strokeWidth="1.2">
            <animate attributeName="ry" values="10;6;12;6;10" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <rect x="89" y="109" width="22" height="5" rx="1" fill="white" />
        </g>
      ) : (
        <g>
          <path d="M 80 115 Q 100 140 120 115" fill="none" stroke={orangeDark} strokeWidth="3" strokeLinecap="round" />
          <circle cx="62" cy="112" r="7" fill="rgba(255,80,40,0.25)" />
          <circle cx="138" cy="112" r="7" fill="rgba(255,80,40,0.25)" />
        </g>
      )}

      {/* ACCESSORIES */}
      {mood === 'excited' && (
        <g>
          <ellipse cx="100" cy="23" rx="55" ry="8" fill="#FFD700" />
          <path d="M 55 23 Q 55 0 100 -3 Q 145 0 145 23" fill="#FFD700" stroke="#DAA520" strokeWidth="1.5" />
          <rect x="50" y="19" width="100" height="8" rx="2" fill="#DAA520" />
        </g>
      )}
      {mood === 'proud' && (
        <g>
          <polygon points="100,-5 40,20 100,13 160,20" fill="#333" stroke="#222" strokeWidth="1" />
          <rect x="95" y="10" width="10" height="12" fill="#333" />
          <line x1="145" y1="20" x2="160" y2="40" stroke="#FFD700" strokeWidth="2" />
          <circle cx="160" cy="43" r="4" fill="#FFD700" />
        </g>
      )}
    </svg>
  );
};

// ========== MAIN COMPONENT ==========
export const MissMinutes: React.FC = () => {
  const location = useLocation();
  const characterRef = useRef<HTMLDivElement>(null);

  const [showSpeech, setShowSpeech] = useState(false);
  const [isSleeping, setIsSleeping] = useState(true);
  const [currentFact, setCurrentFact] = useState('');
  const [factIndex, setFactIndex] = useState(0);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const sleepTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = pageConfig[location.pathname] || pageConfig['/'];

  useEffect(() => {
    return () => {
      if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setShowSpeech(false);
    setIsSleeping(true);
    setFactIndex(0);
    setCurrentFact(config.facts[0]);
  }, [location.pathname]);

  // Listen for custom speak events from other components (like TemPadTimeline)
  useEffect(() => {
    const handleSpeakEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setCurrentFact(customEvent.detail);
        setShowSpeech(true);
        setIsSleeping(false);
        resetSleepTimer(15000);
      }
    };

    window.addEventListener('miss-minutes-speak', handleSpeakEvent);
    return () => window.removeEventListener('miss-minutes-speak', handleSpeakEvent);
  }, []);

  const resetSleepTimer = (delay = 5000) => {
    if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
    sleepTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
      setIsSleeping(true);
    }, delay);
  };

  const handleMouseEnter = () => {
    if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    if (!isSleeping) {
      resetSleepTimer(5000); // go to sleep 5s after mouse leaves
    }
  };

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isSleeping || !characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(7, Math.hypot(dx, dy) / 30);
      setPupilPos({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isSleeping]);

  const handleClick = () => {
    if (isSleeping) {
      setIsSleeping(false);
      setShowSpeech(true);
      setFactIndex(0);
      setCurrentFact(config.facts[0]);
    } else {
      const nextIndex = (factIndex + 1) % config.facts.length;
      setFactIndex(nextIndex);
      setCurrentFact(config.facts[nextIndex]);
      setShowSpeech(true);
    }
  };

  // Do not render the bottom-right interactive Miss Minutes if we are on the Hobbies page
  // (because the Hobbies page already features her prominently in the background animation)
  if (location.pathname === '/hobbies') {
    return null;
  }

  return (
    <div
      ref={characterRef}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '2rem',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {showSpeech && (
          <motion.div
            key={`speech-${currentFact}`}
            initial={{ opacity: 0, scale: 0.5, y: 15, filter: 'blur(6px)' }}
            animate={{
              opacity: [0, 1, 0.8, 1], scale: [0.5, 1.05, 0.98, 1],
              y: [15, -3, 1, 0], filter: ['blur(6px)', 'blur(0px)', 'blur(1px)', 'blur(0px)'],
            }}
            exit={{ opacity: 0, scale: 0.3, filter: 'blur(10px)' }}
            transition={{ duration: 0.35 }}
            style={{
              backgroundColor: 'rgba(5,5,5,0.95)', border: '2px solid var(--tva-orange)',
              padding: '0.8rem 1rem', borderRadius: '4px', maxWidth: '240px', marginBottom: '0.3rem',
              boxShadow: '0 0 20px var(--tva-orange-glow)', fontFamily: 'var(--font-mono)',
              fontSize: '1rem', color: 'var(--tva-orange)', textShadow: '0 0 6px var(--tva-orange-glow)',
              textAlign: 'center', pointerEvents: 'auto', position: 'relative',
            }}
          >
            {currentFact}
            <div style={{
              position: 'absolute', bottom: '-8px', right: '40px',
              width: 0, height: 0,
              borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
              borderTop: '8px solid var(--tva-orange)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        onClick={handleClick}
        animate={{ rotate: [0, -3, 3, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          cursor: 'pointer', pointerEvents: 'auto',
          filter: 'drop-shadow(0 0 12px var(--tva-orange-glow))',
        }}
      >
        <MissMinutesBody pupilPos={pupilPos} isTalking={showSpeech} mood={config.mood} isSleeping={isSleeping} />
      </motion.div>
    </div>
  );
};
