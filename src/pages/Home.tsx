import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Mail, Link, FileText } from 'lucide-react';
import { TemPadTimeline } from '../components/TemPadTimeline';

export const Home: React.FC = () => {
  return (
    <div className="tva-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
          
          {/* LEFT COLUMN: INTRO & BUTTONS */}
          <div style={{ flex: '1 1 300px' }}>
            <h1 className="crt-text">T. KARTHIKEYAN</h1>
            <h2>Electronics & Communication Engineering</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '800px', lineHeight: '1.6' }}>
              Welcome to my timeline. I am an aspiring engineer with a focus on Embedded Systems, 
              IoT, and Software Development. Currently studying at Sathyabama Institute of Science 
              and Technology (2023 - 2027).
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:karthikeyant1885@gmail.com" className="tva-btn" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Mail size={20} /> COMMUNICATE
              </a>
              <a href="https://www.linkedin.com/in/karthikristen" target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Link size={20} /> LINKEDIN NODE
              </a>
              <a href="https://github.com/karthikristen-ux" target="_blank" rel="noreferrer" className="tva-btn" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Terminal size={20} /> GITHUB REPO
              </a>
              <a href="#" className="tva-btn" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <FileText size={20} /> EXTRACT DOSSIER (CV)
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: ASCII ART VARIANT LOG */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="tva-card" 
            style={{ flex: '1 1 300px', maxWidth: '400px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}
          >
            <div style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8, letterSpacing: '2px', borderBottom: '1px solid var(--tva-orange)', paddingBottom: '0.5rem' }}>
              SUBJECT_VARIANT_LOG :: T.K
            </div>
            <div style={{ 
              width: '100%', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 0 15px rgba(255, 140, 0, 0.2)',
              backgroundColor: '#000'
            }}>
              <img 
                src="/images/ascii_variant.png" 
                alt="ASCII Variant Portrait" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block',
                  filter: 'contrast(1.2) sepia(1) hue-rotate(350deg) saturate(3)' 
                }} 
              />
            </div>

            {/* VARIANT DETAILS */}
            <div style={{ 
              marginTop: '1.5rem', 
              textAlign: 'left', 
              fontFamily: "'Courier New', Courier, monospace", 
              fontSize: '0.95rem', 
              lineHeight: '1.6',
              color: 'var(--tva-orange)',
              textShadow: '0 0 5px var(--tva-orange-glow)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--tva-orange)', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
                <span>[ ID ]</span>
                <strong>VARIANT-18</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--tva-orange)', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
                <span>[ STATUS ]</span>
                <span style={{ color: '#ff4d00' }}>ESCAPED FROM HIS TIMELINE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.2rem' }}>
                <span>[ LOCATION ]</span>
                <strong>CHENNAI, INDIA</strong>
              </div>
            </div>

          </motion.div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="tva-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Cpu size={24}/> Core Skills</h3>
            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
              <li>Python, C, Java</li>
              <li>Embedded Systems & Microcontrollers</li>
              <li>Internet of Things (IoT)</li>
              <li>Circuit Design & PCB Design</li>
            </ul>
          </div>

          <div className="tva-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Terminal size={24}/> Tools</h3>
            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
              <li>Arduino IDE & Proteus</li>
              <li>MATLAB</li>
              <li>Visual Studio Code</li>
              <li>Git & GitHub</li>
            </ul>
          </div>

        </div>

        {/* TVA TEMPAD TIMELINE (Replaces the old Experience card) */}
        <div style={{ marginTop: '4rem' }}>
          <h3 className="crt-text" style={{ fontSize: '1.5rem', marginBottom: '-2rem', textAlign: 'center', opacity: 0.8 }}>EXPERIENCE LOG</h3>
          <TemPadTimeline />
        </div>

      </motion.div>
    </div>
  );
};
