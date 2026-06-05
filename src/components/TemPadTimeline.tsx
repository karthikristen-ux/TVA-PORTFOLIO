import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Updated Timeline Data Structure with explicit visual coordinates to match the drawing perfectly
// Updated Timeline Data Structure with explicit visual coordinates to match the drawing perfectly
const timelineEvents = [
  {
    id: "46465189=703",
    date: "-04.15.2021",
    yearLabel: "10th - 2021",
    time: "08:39:42",
    location: "10th Grade (SGPS)",
    description: "Foundational timeline established.",
    missMinutesFact: "In 2021, he crushed his 10th grade at SGPS with a solid 88 percent! A perfect start to the timeline!",
    type: "origin",
    cx: 180,
    cy: 130,
    branchPath: "M 180 130 Q 210 130, 250 50", // Up-right
    textX: 250,
    textY: 35
  },
  {
    id: "46462044=006",
    date: "-05.20.2023",
    yearLabel: "12th - 2023",
    time: "10:09:34",
    location: "12th Grade (SGPS)",
    description: "Higher secondary education completed.",
    missMinutesFact: "Timeline updated to 2023! He finished 12th grade at SGPS scoring 82 percent! The foundation is set!",
    type: "nexus",
    cx: 350,
    cy: 130,
    branchPath: "M 350 130 Q 400 130, 480 210", // Down-right
    textX: 480,
    textY: 230
  },
  {
    id: "46443278=421",
    date: "-08.10.2023",
    yearLabel: "B.E. ECE - 2023-2027",
    time: "08:02:13",
    location: "B.E. ECE (Sathyabama)",
    description: "Undergraduate Engineering Degree.",
    missMinutesFact: "The big nexus event! B.E. in Electronics and Communication at Sathyabama! Currently holding a brilliant 8.29 CGPA!",
    type: "nexus",
    cx: 550,
    cy: 130,
    branchPath: "M 550 130 Q 580 130, 640 50", // Up-right
    textX: 640,
    textY: 35
  },
  {
    id: "46420987=051",
    date: "-07.01.2025",
    yearLabel: "Port Intern - 2025",
    time: "14:21:03",
    location: "Chennai Port Intern",
    description: "In-Plant Training – Electrical Systems.",
    missMinutesFact: "2025 training at Chennai Port Authority! Observing huge 33kV power distributions and transformers!",
    type: "branch",
    cx: 750,
    cy: 130,
    branchPath: "M 750 130 Q 770 130, 810 50", // Up-right fork
    textX: 810,
    textY: 35
  },
  {
    id: "46492982=140",
    date: "-08.20.2025",
    yearLabel: "AICTE Intern - 2025",
    time: "09:45:00",
    location: "Shell Internship",
    description: "AICTE App Dev (IoT Based Project).",
    missMinutesFact: "Also in 2025, a crucial branch: AICTE App Dev internship at Shell! Building real IoT projects!",
    type: "branch",
    cx: 750, // Same starting point as Port intern to create the fork
    cy: 130,
    branchPath: "M 750 130 Q 780 130, 830 210", // Down-right fork
    textX: 830,
    textY: 230
  }
];

export const TemPadTimeline: React.FC = () => {
  const [activeEventIndex, setActiveEventIndex] = useState<number | null>(null);

  const orangeGlow = "var(--tva-orange)";
  const redGlow = "#ff4d00";
  const dimOrange = "rgba(255, 140, 0, 0.4)";

  // Dispatch custom event for Miss Minutes
  const handleDotClick = (fact: string) => {
    window.dispatchEvent(new CustomEvent('miss-minutes-speak', { detail: fact }));
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
      
      {/* FLOATING CURVED MONITOR SHELL */}
      <motion.div 
        className="tempad-monitor"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring' }}
        style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#111',
          borderRadius: '50% / 15%', 
          padding: '20px 40px',
          borderTop: '10px solid #a38560',
          borderBottom: '10px solid #222',
          borderLeft: '4px solid #333',
          borderRight: '4px solid #333',
          boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 20px 30px rgba(0,0,0,0.8)',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-30px', left: '50%', transform: 'translateX(-50%)',
          width: '150px', height: '20px',
          backgroundColor: '#a38560', borderRadius: '10px 10px 0 0',
          zIndex: 0
        }} />
        
        {/* TEMPAD SCREEN */}
        <div className="tempad-screen" style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#000000', 
          borderRadius: '45% / 12%', 
          padding: '2px',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 60px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)',
          zIndex: 10
        }}>
          
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(255,255,255,0.02) 100%)'
          }} />
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9, pointerEvents: 'none',
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)', // Lightened scanlines
            backgroundSize: '100% 4px',
          }} />

          {/* SCREEN CONTENT CONTAINER */}
          <div className="tempad-screen-content" style={{
            position: 'relative',
            zIndex: 5,
            padding: '3rem 2rem',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: orangeGlow,
            textShadow: `0 0 8px ${orangeGlow}`,
          }}>
            
            {/* SACRED TIMELINE GRAPH */}
            <div className="tempad-graph-container" style={{ 
              position: 'relative', 
              height: '260px', 
              marginBottom: '2rem', 
              backgroundColor: 'transparent',
              borderRadius: '40% / 15%',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                backgroundImage: `linear-gradient(${dimOrange} 1px, transparent 1px), linear-gradient(90deg, ${dimOrange} 1px, transparent 1px)`,
                backgroundSize: '30px 15px', 
                opacity: 0.05 
              }} />

              <svg width="100%" height="100%" viewBox="0 0 900 260" preserveAspectRatio="xMidYMid meet" style={{ position: 'relative', zIndex: 2 }}>
                <defs>
                  <filter id="strongGlow">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="branchGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main Sacred Timeline (Slightly wavy/organic) */}
                <motion.path 
                  d="M 20 135 Q 200 125, 450 135 T 880 135" 
                  fill="none"
                  stroke={orangeGlow} 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  filter="url(#strongGlow)" 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Branches branching OFF the main line perfectly */}
                {timelineEvents.map((event, i) => (
                  <g key={`branch-${event.id}`}>
                    <motion.path 
                      d={event.branchPath}
                      fill="none"
                      stroke={orangeGlow}
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity={0.9}
                      filter="url(#branchGlow)"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 1 + (i * 0.2) }}
                    />
                  </g>
                ))}

                {/* Nodes and Labels */}
                {timelineEvents.map((event, i) => (
                  <g key={`node-${event.id}`}>
                    {/* Outer Pulse/Highlight when active */}
                    {activeEventIndex === i && (
                      <circle cx={event.cx} cy={event.cy} r="18" fill="none" stroke="#fff" strokeWidth="2" opacity="0.6" filter="url(#strongGlow)">
                        <animate attributeName="r" values="10;25;10" dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    )}

                    {/* Clickable Node point on the main line */}
                    <motion.circle 
                      cx={event.cx} 
                      cy={event.cy} 
                      r="10" 
                      fill={activeEventIndex === i ? "#fff" : "#ffb347"} 
                      filter="url(#strongGlow)"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + (i * 0.2) }}
                      onMouseEnter={() => setActiveEventIndex(i)}
                      onMouseLeave={() => setActiveEventIndex(null)}
                      onClick={() => handleDotClick(event.missMinutesFact)}
                      style={{ cursor: 'pointer' }}
                    />

                    {/* Year Label - Large, readable, and positioned perfectly at the end of the branches */}
                    <motion.text
                      x={event.textX}
                      y={event.textY}
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1 + (i * 0.2) }}
                      style={{ 
                        pointerEvents: 'none',
                        textShadow: '0px 3px 6px rgba(0,0,0,1), 0px 0px 10px rgba(0,0,0,1)' // Extreme contrast shadow
                      }}
                    >
                      {event.yearLabel}
                    </motion.text>
                  </g>
                ))}
              </svg>
            </div>

            {/* EVENT LOG TABLE */}
            <div style={{ borderTop: `1px solid ${dimOrange}`, padding: '1rem 0 0 0' }}>
              <table className="tempad-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${dimOrange}`, color: redGlow }}>
                    <th style={{ padding: '0.5rem', fontWeight: 'bold' }}>EVENT#</th>
                    <th style={{ padding: '0.5rem', fontWeight: 'bold' }}>DATE</th>
                    <th style={{ padding: '0.5rem', fontWeight: 'bold' }}>LOCATION / TITLE</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineEvents.map((event, i) => (
                    <motion.tr 
                      key={event.id}
                      onMouseEnter={() => setActiveEventIndex(i)}
                      onMouseLeave={() => setActiveEventIndex(null)}
                      onClick={() => handleDotClick(event.missMinutesFact)} // Trigger Miss Minutes on row click too
                      style={{ 
                        backgroundColor: activeEventIndex === i ? 'rgba(255, 140, 0, 0.15)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <td className="tempad-event-id" style={{ padding: '0.5rem' }}>{event.id}</td>
                      <td style={{ padding: '0.5rem' }}>{event.date}</td>
                      <td style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: '#fff' }}>{event.location}</span>
                        {activeEventIndex === i && (
                          <motion.span 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 0.9, height: 'auto' }}
                            style={{ fontSize: '0.75rem', marginTop: '4px', color: '#ffb347' }}
                          >
                            {event.description}
                          </motion.span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER MENU */}
            <div className="tempad-footer-menu" style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', fontSize: '0.8rem', opacity: 0.8, justifyContent: 'center' }}>
              <div style={{ fontWeight: 'bold', color: '#fff', textShadow: `0 0 5px ${redGlow}` }}>TVA LOG</div>
              <div style={{ cursor: 'pointer' }}>FILE</div>
              <div style={{ cursor: 'pointer' }}>EDIT</div>
              <div style={{ cursor: 'pointer' }}>VIEW</div>
              <div style={{ cursor: 'pointer' }}>MODE</div>
              <div style={{ cursor: 'pointer' }}>HELP</div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};
