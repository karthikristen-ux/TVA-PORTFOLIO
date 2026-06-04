import React, { useState } from 'react';

/* ───── project data ───── */
const projects = [
  {
    id: 'rawp',
    title: 'RAWP – RADIOACTIVE WATER ANALYSIS',
    year: '2025',
    description:
      'An IoT-based web application designed to analyze water quality and detect radioactive contamination using sensor data and real-time visualization dashboards.',
    tags: ['IOT', 'REACT', 'NODE.JS', 'SENSORS', 'DATA-VIZ'],
    github: 'https://github.com/karthikristen-ux/R.A.W.P.git',
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
    year: '2024',
    description:
      'A Bluetooth-controlled embedded system developed to navigate flooded areas and assist in transporting and purifying water during emergencies.',
    tags: ['EMBEDDED', 'BLUETOOTH', 'FILTRATION', 'HARDWARE'],
    github: '#',
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
    year: '2019',
    description:
      'An automated IoT-enabled agricultural system supporting ploughing, harvesting, and smart irrigation with minimal human intervention.',
    tags: ['IOT', 'AUTOMATION', 'AGRICULTURE', 'WI-FI'],
    github: '#',
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
    year: '2025',
    description:
      'An intelligent traffic management system using smart sensors and dynamic signaling algorithms to optimize flow and reduce congestion.',
    tags: ['IOT', 'ALGORITHMS', 'SENSORS', 'REAL-TIME'],
    github: 'https://github.com/karthikristen-ux/smart-traffic-system-1.git',
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
    year: '2026',
    description:
      'A wearable smart glove prototype equipped with flex sensors that translates natural hand gestures into precise PC inputs via Wi-Fi.',
    tags: ['WEARABLE', 'WI-FI', 'GESTURE', 'FLEX-SENSOR'],
    github: 'https://github.com/karthikristen-ux/BEHAVIOUR-SCREENING-SYSYTEM.git',
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

/* ───── SVG wireframes ───── */
const SensorBoxSVG: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* main enclosure */}
    <rect x="20" y="30" width="100" height="80" rx="4" stroke="#c86010" strokeWidth="0.8" />
    {/* top panel line */}
    <line x1="20" y1="50" x2="120" y2="50" stroke="#c86010" strokeWidth="0.6" strokeDasharray="3 2" />
    {/* inner display */}
    <rect x="35" y="58" width="40" height="22" rx="2" stroke="#c86010" strokeWidth="0.7" />
    {/* display wave */}
    <polyline points="38,69 44,63 50,72 56,65 62,70 68,66 72,69" stroke="#c86010" strokeWidth="0.6" fill="none" />
    {/* antenna */}
    <line x1="70" y1="30" x2="70" y2="14" stroke="#c86010" strokeWidth="0.7" />
    <circle cx="70" cy="11" r="3" stroke="#c86010" strokeWidth="0.6" />
    {/* sensor probes bottom */}
    <line x1="40" y1="110" x2="40" y2="125" stroke="#7a4010" strokeWidth="0.6" />
    <line x1="70" y1="110" x2="70" y2="130" stroke="#7a4010" strokeWidth="0.6" />
    <line x1="100" y1="110" x2="100" y2="125" stroke="#7a4010" strokeWidth="0.6" />
    {/* indicator LEDs */}
    <circle cx="90" cy="62" r="2.5" stroke="#c86010" strokeWidth="0.6" />
    <circle cx="100" cy="62" r="2.5" stroke="#c86010" strokeWidth="0.6" />
    <circle cx="110" cy="62" r="2.5" stroke="#c86010" strokeWidth="0.6" />
    {/* ventilation slits */}
    <line x1="85" y1="75" x2="115" y2="75" stroke="#5a3008" strokeWidth="0.5" />
    <line x1="85" y1="79" x2="115" y2="79" stroke="#5a3008" strokeWidth="0.5" />
    <line x1="85" y1="83" x2="115" y2="83" stroke="#5a3008" strokeWidth="0.5" />
    {/* corner bolts */}
    <circle cx="26" cy="36" r="1.5" stroke="#5a3008" strokeWidth="0.5" />
    <circle cx="114" cy="36" r="1.5" stroke="#5a3008" strokeWidth="0.5" />
    <circle cx="26" cy="104" r="1.5" stroke="#5a3008" strokeWidth="0.5" />
    <circle cx="114" cy="104" r="1.5" stroke="#5a3008" strokeWidth="0.5" />
  </svg>
);

const TankTruckSVG: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* tank body (elliptical) */}
    <ellipse cx="75" cy="55" rx="55" ry="25" stroke="#c86010" strokeWidth="0.8" />
    {/* tank inner structure lines */}
    <ellipse cx="75" cy="55" rx="40" ry="18" stroke="#5a3008" strokeWidth="0.5" strokeDasharray="4 3" />
    {/* cab */}
    <rect x="125" y="40" width="28" height="32" rx="3" stroke="#c86010" strokeWidth="0.8" />
    {/* windshield */}
    <rect x="130" y="44" width="18" height="12" rx="1" stroke="#7a4010" strokeWidth="0.6" />
    {/* cab connect to tank */}
    <line x1="125" y1="55" x2="130" y2="55" stroke="#c86010" strokeWidth="0.7" />
    {/* wheels */}
    <circle cx="35" cy="85" r="9" stroke="#c86010" strokeWidth="0.8" />
    <circle cx="35" cy="85" r="4" stroke="#5a3008" strokeWidth="0.5" />
    <circle cx="75" cy="85" r="9" stroke="#c86010" strokeWidth="0.8" />
    <circle cx="75" cy="85" r="4" stroke="#5a3008" strokeWidth="0.5" />
    <circle cx="140" cy="85" r="9" stroke="#c86010" strokeWidth="0.8" />
    <circle cx="140" cy="85" r="4" stroke="#5a3008" strokeWidth="0.5" />
    {/* chassis line */}
    <line x1="25" y1="76" x2="150" y2="76" stroke="#7a4010" strokeWidth="0.6" />
    {/* top hatch */}
    <rect x="65" y="28" width="20" height="6" rx="1" stroke="#c86010" strokeWidth="0.6" />
    {/* pipe */}
    <line x1="20" y1="55" x2="8" y2="55" stroke="#7a4010" strokeWidth="0.7" />
    <circle cx="6" cy="55" r="3" stroke="#7a4010" strokeWidth="0.5" />
    {/* pump indicator */}
    <rect x="50" y="43" width="8" height="5" rx="1" stroke="#5a3008" strokeWidth="0.5" />
    <rect x="92" y="43" width="8" height="5" rx="1" stroke="#5a3008" strokeWidth="0.5" />
  </svg>
);

const TractorSVG: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* large rear wheel */}
    <circle cx="45" cy="90" r="28" stroke="#c86010" strokeWidth="0.8" />
    <circle cx="45" cy="90" r="20" stroke="#5a3008" strokeWidth="0.5" strokeDasharray="3 2" />
    <circle cx="45" cy="90" r="8" stroke="#c86010" strokeWidth="0.6" />
    {/* spokes */}
    <line x1="45" y1="62" x2="45" y2="70" stroke="#5a3008" strokeWidth="0.4" />
    <line x1="45" y1="110" x2="45" y2="118" stroke="#5a3008" strokeWidth="0.4" />
    <line x1="17" y1="90" x2="25" y2="90" stroke="#5a3008" strokeWidth="0.4" />
    <line x1="65" y1="90" x2="73" y2="90" stroke="#5a3008" strokeWidth="0.4" />
    {/* small front wheel */}
    <circle cx="130" cy="95" r="14" stroke="#c86010" strokeWidth="0.8" />
    <circle cx="130" cy="95" r="5" stroke="#5a3008" strokeWidth="0.5" />
    {/* body/hood */}
    <path d="M 70 65 L 145 65 L 145 82 L 115 82 L 110 75 L 70 75 Z" stroke="#c86010" strokeWidth="0.8" fill="none" />
    {/* cab */}
    <rect x="60" y="30" width="35" height="35" rx="2" stroke="#c86010" strokeWidth="0.8" />
    {/* cab window */}
    <rect x="65" y="34" width="25" height="18" rx="1" stroke="#7a4010" strokeWidth="0.6" />
    {/* exhaust pipe */}
    <line x1="105" y1="65" x2="105" y2="25" stroke="#c86010" strokeWidth="0.7" />
    <ellipse cx="105" cy="22" rx="3" ry="2" stroke="#7a4010" strokeWidth="0.5" />
    {/* steering */}
    <line x1="72" y1="55" x2="80" y2="62" stroke="#5a3008" strokeWidth="0.5" />
    <circle cx="72" cy="53" r="3" stroke="#5a3008" strokeWidth="0.4" />
    {/* hitch */}
    <line x1="145" y1="72" x2="158" y2="72" stroke="#7a4010" strokeWidth="0.6" />
    <circle cx="158" cy="72" r="2" stroke="#7a4010" strokeWidth="0.5" />
    {/* axle */}
    <line x1="45" y1="90" x2="70" y2="75" stroke="#5a3008" strokeWidth="0.5" />
    <line x1="115" y1="82" x2="130" y2="95" stroke="#5a3008" strokeWidth="0.5" />
  </svg>
);

const TrafficLightSVG: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* pole */}
    <line x1="50" y1="130" x2="50" y2="90" stroke="#7a4010" strokeWidth="0.8" />
    {/* base */}
    <rect x="35" y="128" width="30" height="6" rx="2" stroke="#7a4010" strokeWidth="0.6" />
    {/* arm */}
    <line x1="50" y1="35" x2="80" y2="35" stroke="#7a4010" strokeWidth="0.7" />
    {/* housing */}
    <rect x="30" y="10" width="40" height="80" rx="5" stroke="#c86010" strokeWidth="0.8" />
    {/* lights */}
    <circle cx="50" cy="28" r="10" stroke="#c86010" strokeWidth="0.7" />
    <circle cx="50" cy="50" r="10" stroke="#c86010" strokeWidth="0.7" />
    <circle cx="50" cy="72" r="10" stroke="#c86010" strokeWidth="0.7" />
    {/* light inner details */}
    <circle cx="50" cy="28" r="5" stroke="#5a3008" strokeWidth="0.4" strokeDasharray="2 2" />
    <circle cx="50" cy="50" r="5" stroke="#5a3008" strokeWidth="0.4" strokeDasharray="2 2" />
    <circle cx="50" cy="72" r="5" stroke="#5a3008" strokeWidth="0.4" strokeDasharray="2 2" />
    {/* visor hoods */}
    <path d="M 30 20 L 22 16 L 22 22 Z" stroke="#c86010" strokeWidth="0.6" fill="none" />
    <path d="M 30 42 L 22 38 L 22 44 Z" stroke="#c86010" strokeWidth="0.6" fill="none" />
    <path d="M 30 64 L 22 60 L 22 66 Z" stroke="#c86010" strokeWidth="0.6" fill="none" />
    {/* sensor on top */}
    <rect x="44" y="2" width="12" height="8" rx="1" stroke="#5a3008" strokeWidth="0.5" />
    <line x1="50" y1="2" x2="50" y2="-2" stroke="#5a3008" strokeWidth="0.4" />
    {/* signal waves */}
    <path d="M 82 30 Q 88 28 82 26" stroke="#5a3008" strokeWidth="0.4" fill="none" />
    <path d="M 85 32 Q 93 28 85 24" stroke="#5a3008" strokeWidth="0.4" fill="none" />
  </svg>
);

const GloveSVG: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* palm */}
    <path d="M 30 90 Q 25 60 35 50 L 40 30 L 48 28 L 48 48" stroke="#c86010" strokeWidth="0.8" fill="none" />
    <path d="M 48 48 L 48 20 L 56 18 L 56 45" stroke="#c86010" strokeWidth="0.8" fill="none" />
    <path d="M 56 45 L 56 15 L 64 13 L 64 42" stroke="#c86010" strokeWidth="0.8" fill="none" />
    <path d="M 64 42 L 64 18 L 72 20 L 72 48" stroke="#c86010" strokeWidth="0.8" fill="none" />
    <path d="M 72 48 L 75 40 L 82 45 L 78 55" stroke="#c86010" strokeWidth="0.8" fill="none" />
    {/* palm body */}
    <path d="M 30 90 Q 28 110 40 120 L 70 120 Q 85 110 82 90 L 78 55" stroke="#c86010" strokeWidth="0.8" fill="none" />
    {/* wrist */}
    <rect x="32" y="118" width="45" height="20" rx="3" stroke="#c86010" strokeWidth="0.7" />
    {/* flex sensor strips */}
    <line x1="44" y1="28" x2="44" y2="48" stroke="#7a4010" strokeWidth="0.5" strokeDasharray="2 2" />
    <line x1="52" y1="18" x2="52" y2="45" stroke="#7a4010" strokeWidth="0.5" strokeDasharray="2 2" />
    <line x1="60" y1="15" x2="60" y2="42" stroke="#7a4010" strokeWidth="0.5" strokeDasharray="2 2" />
    <line x1="68" y1="20" x2="68" y2="48" stroke="#7a4010" strokeWidth="0.5" strokeDasharray="2 2" />
    {/* PCB on back of hand */}
    <rect x="42" y="65" width="25" height="18" rx="2" stroke="#c86010" strokeWidth="0.6" />
    <line x1="46" y1="70" x2="63" y2="70" stroke="#5a3008" strokeWidth="0.4" />
    <line x1="46" y1="74" x2="63" y2="74" stroke="#5a3008" strokeWidth="0.4" />
    <line x1="46" y1="78" x2="63" y2="78" stroke="#5a3008" strokeWidth="0.4" />
    <circle cx="50" cy="72" r="1.5" stroke="#c86010" strokeWidth="0.4" />
    <circle cx="58" cy="72" r="1.5" stroke="#c86010" strokeWidth="0.4" />
    {/* wi-fi waves */}
    <path d="M 90 50 Q 96 45 90 40" stroke="#5a3008" strokeWidth="0.5" fill="none" />
    <path d="M 93 53 Q 102 45 93 37" stroke="#5a3008" strokeWidth="0.5" fill="none" />
    <path d="M 96 56 Q 108 45 96 34" stroke="#5a3008" strokeWidth="0.5" fill="none" />
    {/* wrist module details */}
    <circle cx="40" cy="128" r="2" stroke="#5a3008" strokeWidth="0.4" />
    <rect x="58" y="124" width="12" height="8" rx="1" stroke="#5a3008" strokeWidth="0.4" />
  </svg>
);

const modelMap: Record<string, React.FC<{ size?: number }>> = {
  rawp: SensorBoxSVG,
  flood: TankTruckSVG,
  farm: TractorSVG,
  traffic: TrafficLightSVG,
  glove: GloveSVG,
};

/* ───── component ───── */
export const Projects: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = projects.find((p) => p.id === activeId) ?? null;

  const handleModelClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bp-root">
      {/* ---- left: models stage ---- */}
      <div className={`bp-stage${activeId ? ' bp-stage--collapsed' : ''}`}>
        {projects.map((p, i) => {
          const ModelSVG = modelMap[p.id] ?? SensorBoxSVG;
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              className={`bp-model${isActive ? ' bp-model--active' : ''}`}
              style={{ animationDelay: `${i * 0.6}s` }}
              onClick={() => handleModelClick(p.id)}
              aria-label={`View project: ${p.title}`}
            >
              <ModelSVG size={activeId ? 80 : 140} />
              <span className="bp-model-label">{p.title.split('–')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* ---- right: detail panel ---- */}
      <div className={`bp-panel${active ? ' bp-panel--open' : ''}`}>
        {active && (
          <div className="bp-panel-inner">
            <button
              className="bp-panel-close"
              onClick={() => setActiveId(null)}
              aria-label="Close detail panel"
            >
              ✕
            </button>

            <span className="bp-year">[{active.year}]</span>
            <h2 className="bp-title">{active.title}</h2>
            <div className="bp-divider" />

            <p className="bp-desc">{active.description}</p>

            {/* Problem */}
            <h3 className="bp-section-heading">// PROBLEM</h3>
            <p className="bp-desc">{active.problemStatement}</p>

            {/* Solution */}
            <h3 className="bp-section-heading">// SOLUTION</h3>
            <p className="bp-desc">{active.solution}</p>

            {/* Features */}
            <h3 className="bp-section-heading">// KEY ARCHITECTURE</h3>
            <ul className="bp-features">
              {active.features.map((f, i) => (
                <li key={i}>
                  <span className="bp-feat-arrow">▹</span> {f}
                </li>
              ))}
            </ul>

            {/* Tags */}
            <div className="bp-tags">
              {active.tags.map((t) => (
                <span key={t} className="bp-tag">
                  {t}
                </span>
              ))}
            </div>

            {active.github && active.github !== '#' && (
              <a
                href={active.github}
                target="_blank"
                rel="noreferrer"
                className="bp-link"
              >
                [ VIEW PROJECT ] ›
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
