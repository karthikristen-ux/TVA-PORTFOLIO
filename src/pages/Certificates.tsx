import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certificates = [
  { name: 'State-Level Expo – VIT Vellore (1st place for One-Man Farming Project)', date: '2019' },
  { name: 'District-Level Expo – SRM University (3rd place for agriculture automation)', date: '2019' },
  { name: 'NPTEL – Introduction to Internet of Things (Elite certification, 80%)', date: 'Jul–Oct 2025' },
  { name: 'MATLAB Onramp Certifications', date: 'N/A' },
  { name: 'ML in IoT & Wi-Fi 6 Workshop – ISTE, Sathyabama IST', date: '2024' },
  { name: 'In-Plant Training – Chennai Port Authority', date: '2025' },
  { name: 'AICTE Industry-Oriented Virtual Internship – Shell', date: '2025' },
];

export const Certificates: React.FC = () => {
  return (
    <div className="tva-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="crt-text">CERTIFICATIONS & AWARDS</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
          Official credentials and recognitions on file.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              className="tva-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
            >
              <Award size={40} color="var(--tva-orange)" />
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cert.name}</h3>
                <span style={{ color: 'var(--tva-orange)', opacity: 0.7, fontFamily: 'var(--font-mono)' }}>[{cert.date}]</span>
                <div style={{ marginTop: '1rem', width: '100%', height: '2px', backgroundColor: 'var(--tva-orange)', opacity: 0.3 }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
