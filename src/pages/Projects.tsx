import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

/* ───── project data ───── */
const projects = [
  {
    id: 'rawp',
    title: 'RAWP – RADIOACTIVE WATER ANALYSIS',
    shortTitle: 'RAWP',
    year: '2025',
    description:
      'An IoT-based web application designed to analyze water quality and detect radioactive contamination using sensor data and real-time visualization dashboards.',
    tags: ['IOT', 'REACT', 'NODE.JS', 'SENSORS', 'DATA-VIZ'],
    github: 'https://github.com/karthikristen-ux/R.A.W.P.git',
    image: '/images/rawp.png',
    wideImage: '/images/rawp_wide.png',
    problemStatement:
      'Natural disasters or industrial accidents can contaminate water sources with dangerous radioactive materials, which often go undetected by conventional water sensors until it is too late.',
    solution:
      'Designed an IoT-based framework that integrates specialized sensors to detect radioactive anomalies in real-time, providing immediate data visualization and alerts to authorities before the water reaches civilian populations.',
    features: [
      'Integration of IoT water quality sensors',
      'Real-time data visualization dashboard',
      'Automated anomaly detection for radioactive elements',
      'Secure backend for data logging and analytics',
    ],
  },
  {
    id: 'flood',
    title: 'MOBILE FLOOD WATER TRANSPORTER',
    shortTitle: 'FLOOD TRANSPORTER',
    year: '2024',
    description:
      'A Bluetooth-controlled embedded system developed to navigate flooded areas and assist in transporting and purifying water during emergencies.',
    tags: ['EMBEDDED', 'BLUETOOTH', 'FILTRATION', 'HARDWARE'],
    github: '#',
    image: '/images/flood.png',
    wideImage: '/images/flood_wide.png',
    problemStatement:
      'During severe floods, clean drinking water becomes scarce, and navigating flooded terrains to deliver supplies or extract water is extremely difficult for human responders.',
    solution:
      'Built a buoyant, Bluetooth-controlled embedded vehicle capable of navigating floodwaters. The system actively pumps and filters contaminated floodwater on the go, providing an accessible source of purified water in emergency zones.',
    features: [
      'Bluetooth Low Energy (BLE) control system',
      'Integrated pumping and water filtration mechanisms',
      'Buoyant chassis design for navigating flooded terrains',
      'Low power consumption for extended operation',
    ],
  },
  {
    id: 'farm',
    title: 'ONE-MAN FARMING SYSTEM',
    shortTitle: 'FARMING SYSTEM',
    year: '2019',
    description:
      'An automated IoT-enabled agricultural system supporting ploughing, harvesting, and smart irrigation with minimal human intervention.',
    tags: ['IOT', 'AUTOMATION', 'AGRICULTURE', 'WI-FI'],
    github: '#',
    image: '/images/farming.png',
    wideImage: '/images/farming_wide.png',
    problemStatement:
      'Small-scale farmers face labor shortages and high operational costs when trying to maintain large plots of land, making traditional farming methods unsustainable and inefficient.',
    solution:
      'Developed an automated, smart-agricultural vehicle that combines ploughing, harvesting, and soil moisture-based irrigation into a single IoT-connected unit, allowing a single farmer to manage their entire crop yield via a mobile app.',
    features: [
      'Automated ploughing and seeding mechanisms',
      'Smart irrigation triggered by soil moisture sensors',
      'Mobile app control via Bluetooth/Wi-Fi',
      'Solar-powered battery management',
    ],
  },
  {
    id: 'traffic',
    title: 'SMART TRAFFIC SYSTEM',
    shortTitle: 'TRAFFIC SYSTEM',
    year: '2025',
    description:
      'An intelligent traffic management system using smart sensors and dynamic signaling algorithms to optimize flow and reduce congestion.',
    tags: ['IOT', 'ALGORITHMS', 'SENSORS', 'REAL-TIME'],
    github: 'https://github.com/karthikristen-ux/smart-traffic-system-1.git',
    image: '/images/smart_traffic.png',
    wideImage: '/images/smart_traffic_wide.png',
    problemStatement:
      'Rapid urban expansion leads to severe traffic congestion, increasing commute times and delaying emergency vehicles because static traffic lights cannot adapt to real-time road conditions.',
    solution:
      'Implemented a dynamic traffic management system using IoT sensors to monitor vehicle density. The system algorithmically adjusts signal timings in real-time and provides prioritized routing for emergency responders.',
    features: [
      'Real-time traffic density monitoring using IoT sensors',
      'Dynamic signal timing optimization algorithms',
      'Emergency vehicle detection and route prioritization',
      'Centralized analytics dashboard for traffic management',
    ],
  },
  {
    id: 'glove',
    title: 'BEHAVIOUR SCREENING SYSTEM',
    shortTitle: 'SMART GLOVE',
    year: '2026',
    description:
      'A wearable smart glove prototype equipped with flex sensors that translates natural hand gestures into precise PC inputs via Wi-Fi.',
    tags: ['WEARABLE', 'WI-FI', 'GESTURE', 'FLEX-SENSOR'],
    github: 'https://github.com/karthikristen-ux/BEHAVIOUR-SCREENING-SYSYTEM.git',
    image: '/images/smart_glove.png',
    wideImage: '/images/smart_glove_wide.png',
    problemStatement:
      'Traditional gaming controllers can be unintuitive and limit the immersive experience. There is a need for more natural, motion-based human-computer interfaces.',
    solution:
      'Developed a prototype wearable glove integrating flex sensors and a Wi-Fi enabled microcontroller. It translates hand movements and finger gestures into precise gaming inputs on a PC in real-time.',
    features: [
      'Wearable flex-sensor glove design',
      'Wireless Wi-Fi connectivity to PC',
      'Real-time gesture recognition',
      'Seamless game integration',
    ],
  },
];

/* ───── component ───── */
export const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailProject, setDetailProject] = useState<typeof projects[0] | null>(null);
  const total = projects.length;

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({ itemWidth: 340, gap: 320 });

  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        setDimensions({ itemWidth: 280, gap: 230 });
      } else if (w <= 768) {
        setDimensions({ itemWidth: 300, gap: 250 });
      } else if (w <= 900) {
        setDimensions({ itemWidth: 320, gap: 280 });
      } else {
        setDimensions({ itemWidth: 360, gap: 320 });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);



  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (detailProject) {
        if (e.key === 'Escape') setDetailProject(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % total);
      } else if (e.key === 'Enter') {
        setDetailProject(projects[activeIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, detailProject, total]);


  const goLeft = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goRight = () => setActiveIndex((prev) => (prev + 1) % total);

  // Get carousel item transform based on offset from active
  const getItemStyle = (index: number) => {
    let offset = index - activeIndex;
    // Wrap around
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const absOffset = Math.abs(offset);

    if (absOffset > 2) {
      return {
        transform: `translateX(${offset * (dimensions.gap * 0.6)}px) scale(0.5) rotateY(${offset > 0 ? -35 : 35}deg)`,
        opacity: 0,
        filter: 'blur(12px)',
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }

    return {
      transform: `translateX(${offset * dimensions.gap}px) scale(${1 - absOffset * 0.18}) rotateY(${offset * -15}deg)`,
      opacity: absOffset === 0 ? 1 : 0.4 - absOffset * 0.1,
      filter: absOffset === 0 ? 'blur(0px)' : `blur(${absOffset * 4}px)`,
      zIndex: 10 - absOffset,
      pointerEvents: absOffset === 0 ? 'auto' as const : 'none' as const,
    };
  };

  return (
    <div className="carousel-root">
      {/* Page header */}
      <div className="carousel-header">
        <h1>PROJECT ARCHIVE</h1>
        <p>SELECT A BLUEPRINT TO DECRYPT CLASSIFIED PROJECT DATA</p>
      </div>

      {/* Carousel */}
      <div className="carousel-container">
        {/* Left arrow */}
        <button
          className="carousel-nav-btn carousel-nav-prev"
          onClick={goLeft}
          aria-label="Previous project"
        >
          ‹
        </button>



        {/* Track */}
        <motion.div
          className="carousel-track"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, { offset }) => {
            if (offset.x < -40) goRight();
            else if (offset.x > 40) goLeft();
          }}
          style={{ touchAction: 'pan-y' }}
        >
          {projects.map((project, index) => {
            const style = getItemStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={project.id}
                className={`carousel-item ${isActive ? 'carousel-item--active' : ''}`}
                animate={{
                  transform: style.transform,
                  opacity: style.opacity,
                  filter: style.filter,
                  zIndex: style.zIndex,
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  pointerEvents: style.pointerEvents,
                  position: 'absolute',
                  left: '50%',
                  marginLeft: `${-dimensions.itemWidth / 2}px`,
                  width: `${dimensions.itemWidth}px`,
                }}
                onClick={isActive ? () => setDetailProject(project) : () => setActiveIndex(index)}
              >
                <div className="carousel-item-inner">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="carousel-item-img"
                    draggable={false}
                  />
                  <div className="carousel-item-title">{project.shortTitle}</div>
                  <div className="carousel-item-year">[{project.year}]</div>
                  {isActive && (
                    <motion.div
                      className="carousel-item-prompt"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                    >
                      <span>▸ CLICK TO DECLASSIFY ◂</span>
                      <span>← SWIPE TO VIEW NEXT →</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right arrow */}
        <button
          className="carousel-nav-btn carousel-nav-next"
          onClick={goRight}
          aria-label="Next project"
        >
          ›
        </button>
      </div>



      {/* Dot indicators */}
      <div className="carousel-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === activeIndex ? 'carousel-dot--active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* ---- DETAIL OVERLAY ---- */}
      {createPortal(
        <AnimatePresence>
          {detailProject && (
            <motion.div
              className="project-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setDetailProject(null);
            }}
          >
            <motion.div
              className="project-detail-panel"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <button
                className="detail-close-btn"
                onClick={() => setDetailProject(null)}
                aria-label="Close detail panel"
              >
                ✕
              </button>

              {/* Hero image */}
              <img
                src={detailProject.wideImage}
                alt={detailProject.title}
                className="detail-hero-img"
              />

              {/* Title area */}
              <span className="detail-year">[{detailProject.year}]</span>
              <h2 className="detail-title">{detailProject.title}</h2>
              <div className="detail-status-bar">
                <span className="detail-status-item">
                  <span className="detail-status-dot" /> STATUS: DECLASSIFIED
                </span>
                <span className="detail-status-item">
                  FILE 0{projects.indexOf(detailProject) + 1}/0{projects.length}
                </span>
              </div>

              <div className="detail-divider" />

              {/* Overview */}
              <p className="detail-desc">{detailProject.description}</p>

              {/* Problem + Solution */}
              <div className="detail-two-col">
                <div>
                  <h3 className="detail-section-heading">// PROBLEM</h3>
                  <p className="detail-desc">{detailProject.problemStatement}</p>
                </div>
                <div>
                  <h3 className="detail-section-heading">// SOLUTION</h3>
                  <p className="detail-desc">{detailProject.solution}</p>
                </div>
              </div>

              <div className="detail-divider" />

              {/* Features */}
              <h3 className="detail-section-heading">// KEY ARCHITECTURE</h3>
              <ul className="detail-features">
                {detailProject.features.map((f, i) => (
                  <li key={i}>
                    <span className="detail-feat-arrow">▹</span> {f}
                  </li>
                ))}
              </ul>

              {/* Tags + Link */}
              <div className="detail-footer-row">
                <div className="detail-tags">
                  {detailProject.tags.map((t) => (
                    <span key={t} className="detail-tag">{t}</span>
                  ))}
                </div>

                {detailProject.github && detailProject.github !== '#' && (
                  <a
                    href={detailProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="detail-link"
                  >
                    [ VIEW PROJECT ] ›
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
