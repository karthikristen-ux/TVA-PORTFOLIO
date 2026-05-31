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
  },
  {
    title: 'Behaviour Screening System',
    date: '2026',
    description: 'An automated system designed to screen and analyze behavioral patterns using advanced data processing and monitoring techniques.',
    problemStatement: 'Manual behavioral screening processes are often subjective, time-consuming, and prone to human error, making it difficult to analyze large datasets efficiently.',
    solution: 'Developed an automated screening platform that leverages data analytics to evaluate behavioral metrics objectively, providing actionable insights and reports.',
    features: [
      'Automated behavioral data analysis',
      'Objective evaluation metrics',
      'Comprehensive reporting dashboard',
      'Scalable architecture for large datasets'
    ],
    github: 'https://github.com/karthikristen-ux/BEHAVIOUR-SCREENING-SYSYTEM.git',
    link: '#',
    image: '/images/rawp.png'
  }
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <div className="tva-container">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="crt-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '0.5rem', lineHeight: 1.1 }}>PROJECT ARCHIVE</h1>
          <p style={{ fontSize: '1.15rem', color: '#ccc', marginBottom: '4rem', maxWidth: '600px', lineHeight: 1.6 }}>
            A curated log of high-level engineering deployments and automated systems.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '3rem' }}>
            {projects.map((proj, index) => (
              <motion.div 
                key={index}
                className="tva-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,140,0,0.2)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0, border: 'none', padding: 0 }}>{proj.title}</h2>
                  <span style={{ color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', opacity: 0.8 }}>[{proj.date}]</span>
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    width: '100%', 
                    height: '220px', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(255,140,0,0.1)',
                    position: 'relative'
                  }}>
                    <img 
                      src={proj.image} 
                      alt={`${proj.title} schematic`} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        filter: 'grayscale(80%) sepia(50%) hue-rotate(350deg) saturate(200%) brightness(0.8)',
                        transition: 'all 0.5s ease'
                      }} 
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'grayscale(0%) sepia(20%) hue-rotate(350deg) saturate(300%) brightness(1.1)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'grayscale(80%) sepia(50%) hue-rotate(350deg) saturate(200%) brightness(0.8)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  
                  <p style={{ color: '#ccc', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: '1.6', flex: 1 }}>{proj.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '0.9rem' }}>
                      <Code size={18} style={{marginRight: '8px'}}/> SOURCE
                    </a>
                    <button onClick={() => setSelectedProject(proj)} className="tva-btn" style={{ fontSize: '0.9rem', background: 'transparent', borderColor: 'rgba(255,140,0,0.5)' }}>
                      <ExternalLink size={18} style={{marginRight: '8px'}}/> DECRYPT
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999,
              padding: '2rem'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="tva-card"
              style={{
                maxWidth: '800px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                position: 'relative',
                padding: '3rem',
                margin: 0
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(255,140,0,0.1)',
                  border: '1px solid rgba(255,140,0,0.3)',
                  color: 'var(--tva-orange)',
                  cursor: 'pointer',
                  zIndex: 2,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--tva-orange)'; e.currentTarget.style.color = '#000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,140,0,0.1)'; e.currentTarget.style.color = 'var(--tva-orange)'; }}
              >
                <X size={20} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,140,0,0.2)', paddingBottom: '1rem' }}>
                <h2 style={{ margin: 0, border: 'none', padding: 0 }}>{selectedProject.title}</h2>
                <span style={{ color: 'var(--tva-orange)', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>[{selectedProject.date}]</span>
              </div>
              
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(255,140,0,0.2)' }}>
                <img 
                  src={selectedProject.image} 
                  alt={`${selectedProject.title} schematic`} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    display: 'block',
                    filter: 'grayscale(20%) sepia(30%) hue-rotate(350deg) saturate(150%)'
                  }} 
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', color: '#ddd' }}>
                <div>
                  <h3 className="crt-text" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--tva-orange)' }}>//</span> PROBLEM STATEMENT
                  </h3>
                  <p style={{ lineHeight: '1.7' }}>{selectedProject.problemStatement}</p>
                </div>

                <div>
                  <h3 className="crt-text" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--tva-orange)' }}>//</span> SOLUTION
                  </h3>
                  <p style={{ lineHeight: '1.7' }}>{selectedProject.solution}</p>
                </div>
                
                <div>
                  <h3 className="crt-text" style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--tva-orange)' }}>//</span> KEY ARCHITECTURE
                  </h3>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {selectedProject.features?.map((feature, idx) => (
                      <li key={idx} style={{ position: 'relative', paddingLeft: '1.5rem', marginBottom: '0.8rem', lineHeight: '1.6' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--tva-orange)' }}>▹</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
                <a href={selectedProject.github} target="_blank" rel="noreferrer" className="tva-btn">
                  <Code size={18} style={{marginRight: '8px'}}/> ACCESS SOURCE CODE
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
