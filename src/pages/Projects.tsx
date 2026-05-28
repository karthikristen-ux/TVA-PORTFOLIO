import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, X } from 'lucide-react';

const projects = [
  {
    title: 'RAWP – Radioactive/Water Analysis Web Project',
    date: '01/2025 - 06/2025',
    description: 'An IoT-based web application designed to analyze water quality and detect radioactive contamination using sensor data and visualization. Implemented backend logic and basic data visualization for real-world environmental monitoring.',
    problemStatement: 'Natural disasters or industrial accidents can contaminate water sources with dangerous radioactive materials, which often go undetected by conventional water sensors until it is too late.',
    solution: 'Designed an IoT-based framework that integrates specialized sensors to detect radioactive anomalies in real-time, providing immediate data visualization and alerts to authorities before the water reaches civilian populations.',
    features: [
      'Integration of IoT water quality sensors',
      'Real-time data visualization dashboard',
      'Automated anomaly detection for radioactive elements',
      'Secure backend for data logging and analytics'
    ],
    github: 'https://github.com/karthikristen-ux/R.A.W.P.git',
    link: '#',
    image: '/images/rawp.png'
  },
  {
    title: 'Mobile Flood Water Transporter',
    date: '2024',
    description: 'A Bluetooth-controlled embedded system developed to navigate flooded areas and assist in transporting and purifying water during emergencies. Integrated pumping and filtration mechanisms.',
    problemStatement: 'During severe floods, clean drinking water becomes scarce, and navigating flooded terrains to deliver supplies or extract water is extremely difficult for human responders.',
    solution: 'Built a buoyant, Bluetooth-controlled embedded vehicle capable of navigating floodwaters. The system actively pumps and filters contaminated floodwater on the go, providing an accessible source of purified water in emergency zones.',
    features: [
      'Bluetooth Low Energy (BLE) control system',
      'Integrated pumping and water filtration mechanisms',
      'Buoyant chassis design for navigating flooded terrains',
      'Low power consumption for extended operation'
    ],
    github: '#',
    link: '#',
    image: '/images/flood.png'
  },
  {
    title: 'One-Man Farming System',
    date: '2019',
    description: 'An automated IoT-enabled agricultural system designed to support ploughing, harvesting, and smart irrigation with minimal human intervention. Built an automated Bluetooth/Wi-Fi controlled vehicle.',
    problemStatement: 'Small-scale farmers face labor shortages and high operational costs when trying to maintain large plots of land, making traditional farming methods unsustainable and inefficient.',
    solution: 'Developed an automated, smart-agricultural vehicle that combines ploughing, harvesting, and soil moisture-based irrigation into a single IoT-connected unit, allowing a single farmer to manage their entire crop yield via a mobile app.',
    features: [
      'Automated ploughing and seeding mechanisms',
      'Smart irrigation triggered by soil moisture sensors',
      'Mobile app control via Bluetooth/Wi-Fi',
      'Solar-powered battery management'
    ],
    github: '#',
    link: '#',
    image: '/images/farming.png'
  },
  {
    title: 'Smart Traffic System',
    date: '2025',
    description: 'An intelligent traffic management system developed to optimize traffic flow and reduce congestion using smart sensors and dynamic signaling algorithms.',
    problemStatement: 'Rapid urban expansion leads to severe traffic congestion, increasing commute times and delaying emergency vehicles because static traffic lights cannot adapt to real-time road conditions.',
    solution: 'Implemented a dynamic traffic management system using IoT sensors to monitor vehicle density. The system algorithmically adjusts signal timings in real-time and provides prioritized routing for emergency responders to significantly reduce overall congestion.',
    features: [
      'Real-time traffic density monitoring using IoT sensors',
      'Dynamic signal timing optimization algorithms',
      'Emergency vehicle detection and route prioritization',
      'Centralized analytics dashboard for traffic management'
    ],
    github: 'https://github.com/karthikristen-ux/smart-traffic-system-1.git',
    link: '#',
    image: '/images/smart_traffic.png'
  }
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="tva-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="crt-text">PROJECT ARCHIVE</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
          Database entries for significant engineering deployments.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projects.map((proj, index) => (
            <motion.div 
              key={index}
              className="tva-card"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2>{proj.title}</h2>
                <span style={{ color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)' }}>[{proj.date}]</span>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <img 
                    src={proj.image} 
                    alt={`${proj.title} schematic`} 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      border: '2px solid var(--tva-orange)', 
                      boxShadow: '0 0 10px var(--tva-orange-glow)',
                      filter: 'grayscale(100%) sepia(100%) hue-rotate(350deg) saturate(500%) brightness(1.2)' // Forces orange tint
                    }} 
                  />
                </div>
                <div style={{ flex: '2', minWidth: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>{proj.description}</p>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Code size={20} /> Code
                    </a>
                    <button onClick={() => setSelectedProject(proj)} className="tva-btn" style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--tva-orange)' }}>
                      <ExternalLink size={20} /> Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '1rem',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="tva-card"
              style={{
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                background: '#0a0a0a',
                border: '2px solid var(--tva-orange)',
                boxShadow: '0 0 20px var(--tva-orange-glow)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--tva-orange)',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <X size={24} />
              </button>
              
              <h2 style={{ marginBottom: '1rem', paddingRight: '2rem' }}>{selectedProject.title}</h2>
              <p style={{ color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', marginBottom: '1.5rem' }}>[{selectedProject.date}]</p>
              
              <img 
                src={selectedProject.image} 
                alt={`${selectedProject.title} schematic`} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  marginBottom: '1.5rem',
                  border: '1px solid var(--tva-orange)',
                  filter: 'grayscale(100%) sepia(100%) hue-rotate(350deg) saturate(500%) brightness(1.2)'
                }} 
              />
              
              <h3 style={{ color: 'var(--tva-orange)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>// PROBLEM STATEMENT</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{selectedProject.problemStatement}</p>

              <h3 style={{ color: 'var(--tva-orange)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>// SOLUTION</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{selectedProject.solution}</p>
              
              <h3 style={{ color: 'var(--tva-orange)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>// KEY FEATURES</h3>
              <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
                {selectedProject.features?.map((feature, idx) => (
                  <li key={idx} style={{ position: 'relative', paddingLeft: '1.5rem', marginBottom: '0.5rem', lineHeight: '1.5' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--tva-orange)' }}>&gt;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'center', justifyContent: 'center', flex: 1 }}>
                  <Code size={20} /> Access Source Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
