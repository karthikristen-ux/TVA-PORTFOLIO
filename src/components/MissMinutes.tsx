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

// ========== MINI SVG (tiny sleeping face) ==========
const MissMinutesMini: React.FC = () => {
  const orange = '#FF8C00';
  const orangeLight = '#FFB347';
  const orangeDark = '#CC6600';

  return (
    <svg viewBox="0 0 200 200" width="55" height="55" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="mmglow-mini">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="bodyGrad-mini" cx="45%" cy="38%">
          <stop offset="0%" stopColor={orangeLight} />
          <stop offset="65%" stopColor={orange} />
          <stop offset="100%" stopColor={orangeDark} />
        </radialGradient>
      </defs>

      {/* MAIN BODY */}
      <circle cx="100" cy="100" r="80" fill="url(#bodyGrad-mini)" filter="url(#mmglow-mini)" />
      <circle cx="100" cy="100" r="73" fill="none" stroke={orangeDark} strokeWidth="1.5" opacity="0.4" />

      {/* HOUR MARKERS */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        return (
          <line key={i}
            x1={100 + Math.cos(angle) * 64} y1={100 + Math.sin(angle) * 64}
            x2={100 + Math.cos(angle) * 72} y2={100 + Math.sin(angle) * 72}
            stroke={orangeDark} strokeWidth={i % 3 === 0 ? 3.5 : 1.8} strokeLinecap="round" />
        );
      })}

      {/* CLOCK HANDS */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="40s" repeatCount="indefinite" />
        <line x1="100" y1="100" x2="100" y2="63" stroke="#3a1800" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="90 100 100" to="450 100 100" dur="8s" repeatCount="indefinite" />
        <line x1="100" y1="100" x2="100" y2="50" stroke="#3a1800" strokeWidth="2" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="100" r="3.5" fill="#3a1800" />

      {/* SLEEPING EYES */}
      <ellipse cx="78" cy="90" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
      <path d="M 68 90 Q 78 100 88 90" fill="none" stroke="#3a1800" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="122" cy="90" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
      <path d="M 112 90 Q 122 100 132 90" fill="none" stroke="#3a1800" strokeWidth="2.5" strokeLinecap="round" />

      {/* EYEBROWS */}
      <line x1="65" y1="69" x2="88" y2="71" stroke={orangeDark} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="112" y1="71" x2="135" y2="69" stroke={orangeDark} strokeWidth="2.5" strokeLinecap="round" />

      {/* SMILE */}
      <path d="M 80 120 Q 100 145 120 120" fill="none" stroke={orangeDark} strokeWidth="3" strokeLinecap="round" />

      {/* BLUSH */}
      <circle cx="62" cy="117" r="7" fill="rgba(255,80,40,0.25)" />
      <circle cx="138" cy="117" r="7" fill="rgba(255,80,40,0.25)" />

      {/* Z's */}
      <g>
        <text x="140" y="45" fontSize="16" fill={orangeLight} fontFamily="var(--font-mono)" opacity="0" fontWeight="bold">
          <animate attributeName="y" values="45;25" dur="2s" repeatCount="indefinite" />
          <animate attributeName="x" values="140;150" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          Z
        </text>
        <text x="150" y="30" fontSize="20" fill={orangeLight} fontFamily="var(--font-mono)" opacity="0" fontWeight="bold">
          <animate attributeName="y" values="30;5" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="x" values="150;160" dur="2s" repeatCount="indefinite" begin="0.6s" />
          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.6s" />
          Z
        </text>
      </g>
    </svg>
  );
};

// ========== ANIMATED SVG CHARACTER (FULL) ==========
const MissMinutesBody: React.FC<{
  pupilPos: { x: number; y: number };
  isTalking: boolean;
  mood: string;
}> = ({ pupilPos, isTalking, mood }) => {
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

      {/* EYES (awake, tracking) */}
      <g>
        <ellipse cx="78" cy="85" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
        <circle cx={78 + pupilPos.x} cy={85 + pupilPos.y} r="6.5" fill="#1a1a1a" />
        <circle cx={75 + pupilPos.x} cy={82 + pupilPos.y} r="2.2" fill="white" />
        <ellipse cx="122" cy="85" rx="15" ry="18" fill="white" stroke={orangeDark} strokeWidth="1.2" />
        <circle cx={122 + pupilPos.x} cy={85 + pupilPos.y} r="6.5" fill="#1a1a1a" />
        <circle cx={119 + pupilPos.x} cy={82 + pupilPos.y} r="2.2" fill="white" />
      </g>

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

  const [isAwake, setIsAwake] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
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

  // Reset on page change
  useEffect(() => {
    setShowSpeech(false);
    setIsAwake(false);
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
        setIsAwake(true);
        resetSleepTimer(15000);
      }
    };

    window.addEventListener('miss-minutes-speak', handleSpeakEvent);
    return () => window.removeEventListener('miss-minutes-speak', handleSpeakEvent);
  }, []);

  const resetSleepTimer = (delay = 8000) => {
    if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
    sleepTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
      setIsAwake(false);
    }, delay);
  };

  const handleMouseEnter = () => {
    if (sleepTimeoutRef.current) clearTimeout(sleepTimeoutRef.current);
  };

  const handleMouseLeave = () => {
    if (isAwake) {
      resetSleepTimer(5000);
    }
  };

  // Eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isAwake || !characterRef.current) return;
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
  }, [isAwake]);

  // Wake up handler
  const handleWakeUp = () => {
    setIsAwake(true);
    setShowSpeech(true);
    setFactIndex(0);
    setCurrentFact(config.facts[0]);
    resetSleepTimer(8000);
  };

  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Robust click handler to differentiate single (change fact) and double (minimize) clicks
  const handleInteraction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (clickTimeoutRef.current) {
      // Double tap detected!
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      setIsAwake(false);
      setShowSpeech(false);
    } else {
      // First tap — start timer
      clickTimeoutRef.current = setTimeout(() => {
        const nextIndex = (factIndex + 1) % config.facts.length;
        setFactIndex(nextIndex);
        setCurrentFact(config.facts[nextIndex]);
        setShowSpeech(true);
        resetSleepTimer(8000);
        clickTimeoutRef.current = null;
      }, 250); // 250ms window for double tap
    }
  };

  // Do not render on Hobbies page (she's in the background animation there)
  if (location.pathname === '/hobbies') {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {!isAwake ? (
        /* ---- MINIMIZED STATE: tiny face + cloud text ---- */
        <motion.div
          key="minimized"
          className="mm-minimized"
          onClick={handleWakeUp}
          initial={{ opacity: 0, scale: 0.3, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.3, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          aria-label="Wake up Miss Minutes for fun facts"
        >
          {/* Cloud text */}
          <motion.div
            className="mm-mini-cloud"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Click me for facts!
          </motion.div>
          {/* Tiny face */}
          <motion.div
            className="mm-mini-body"
            animate={{ rotate: [0, -5, 5, 0], y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MissMinutesMini />
          </motion.div>
        </motion.div>
      ) : (
        /* ---- AWAKE STATE: full character flies out ---- */
        <motion.div
          key="awake"
          ref={characterRef}
          className="mm-full-container"
          initial={{ opacity: 0, scale: 0.2, y: 80, x: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.2, y: 60, x: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Speech bubble */}
          <AnimatePresence mode="wait">
            {showSpeech && (
              <motion.div
                key={`speech-${currentFact}`}
                className="mm-speech-bubble"
                initial={{ opacity: 0, scale: 0.5, y: 15, filter: 'blur(6px)' }}
                animate={{
                  opacity: [0, 1, 0.8, 1], scale: [0.5, 1.05, 0.98, 1],
                  y: [15, -3, 1, 0], filter: ['blur(6px)', 'blur(0px)', 'blur(1px)', 'blur(0px)'],
                }}
                exit={{ opacity: 0, scale: 0.3, filter: 'blur(10px)' }}
                transition={{ duration: 0.35 }}
              >
                {currentFact}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full character body */}
          <motion.div
            className="mm-full-body"
            onClick={handleInteraction}
            animate={{ rotate: [0, -3, 3, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MissMinutesBody pupilPos={pupilPos} isTalking={showSpeech} mood={config.mood} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
