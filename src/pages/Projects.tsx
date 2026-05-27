import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'RAWP – Radioactive/Water Analysis Web Project',
    date: '01/2025 - 06/2025',
    description: 'An IoT-based web application designed to analyze water quality and detect radioactive contamination using sensor data and visualization. Implemented backend logic and basic data visualization for real-world environmental monitoring.',
    github: 'https://github.com/karthikristen-ux/R.A.W.P.git',
    link: '#',
    image: '/images/rawp.png'
  },
  {
    title: 'Mobile Flood Water Transporter',
    date: '2024',
    description: 'A Bluetooth-controlled embedded system developed to navigate flooded areas and assist in transporting and purifying water during emergencies. Integrated pumping and filtration mechanisms.',
    github: '#',
    link: '#',
    image: '/images/flood.png'
  },
  {
    title: 'One-Man Farming System',
    date: '2019',
    description: 'An automated IoT-enabled agricultural system designed to support ploughing, harvesting, and smart irrigation with minimal human intervention. Built an automated Bluetooth/Wi-Fi controlled vehicle.',
    github: '#',
    link: '#',
    image: '/images/farming.png'
  }
];

export const Projects: React.FC = () => {
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
                <div style={{ flex: '1', minWidth: '300px' }}>
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
                <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>{proj.description}</p>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href={proj.github} target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Code size={20} /> Code
                    </a>
                    <a href={proj.link} target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ExternalLink size={20} /> Details
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
