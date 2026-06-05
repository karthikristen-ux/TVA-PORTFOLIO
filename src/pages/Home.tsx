import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Cpu, Terminal } from 'lucide-react';
import { TemPadTimeline } from '../components/TemPadTimeline';
import { PCBBoard } from '../components/PCBBoard';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Home: React.FC = () => {
  return (
    <div className="tva-container">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="home-hero-grid">
          
          {/* LEFT COLUMN: INTRO & PCB BOARD */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h1 className="crt-text" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>T. KARTHIKEYAN</h1>
              <h2 style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', borderBottom: 'none', color: '#ff8c00', opacity: 0.9, letterSpacing: '4px', padding: 0, display: 'inline-block' }}>Electronics & Communication Engineering</h2>
            </div>
            
            <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: '#ccc', lineHeight: '1.8', maxWidth: '90%' }}>
              Welcome to my timeline. I am an aspiring engineer with a hyper-focus on <strong style={{color: '#fff'}}>Embedded Systems, IoT, and Software Development</strong>. 
              Currently decoding the future at Sathyabama Institute of Science and Technology (2023 - 2027).
            </p>

            {/* PCB BOARD WITH IC CHIP TABS */}
            <PCBBoard />
          </motion.div>

          {/* RIGHT COLUMN: ASCII ART VARIANT LOG */}
          <motion.div 
            variants={itemVariants}
            className="tva-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              padding: '1.5rem', 
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.8, letterSpacing: '2px', borderBottom: '1px solid var(--tva-orange)', paddingBottom: '0.8rem' }}>
              SUBJECT_VARIANT_LOG :: T.K
            </div>
            <div style={{ 
              width: '100%', 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 0 15px rgba(255, 140, 0, 0.2)',
              backgroundColor: '#000',
              marginBottom: '1.5rem'
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
              textAlign: 'left', 
              fontFamily: "'Courier New', Courier, monospace", 
              fontSize: '0.95rem', 
              lineHeight: '1.6',
              color: 'var(--tva-orange)',
              textShadow: '0 0 5px var(--tva-orange-glow)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--tva-orange)', paddingBottom: '0.5rem', marginBottom: '0.8rem' }}>
                <span>[ ID ]</span>
                <strong>VARIANT-18</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--tva-orange)', paddingBottom: '0.5rem', marginBottom: '0.8rem' }}>
                <span>[ STATUS ]</span>
                <span style={{ color: '#ff4d00' }}>ESCAPED FROM 2023 TIMELINE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                <span>[ LOCATION ]</span>
                <strong>CHENNAI, INDIA</strong>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div variants={containerVariants} className="home-skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          
          <motion.div variants={itemVariants} className="tva-card">
            <h3 className="crt-text" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,140,0,0.2)', paddingBottom: '1rem' }}>
              <Cpu size={24} color="#ff8c00" /> CORE ARCHITECTURE
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#ccc' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Python, C, Java</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Embedded Systems & Microcontrollers</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Internet of Things (IoT)</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Circuit Design & PCB Design</li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="tva-card">
            <h3 className="crt-text" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,140,0,0.2)', paddingBottom: '1rem' }}>
              <Terminal size={24} color="#ff8c00" /> DEPLOYMENT TOOLS
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: '#ccc' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Arduino IDE & Proteus</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> MATLAB</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Visual Studio Code</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><span style={{ color: '#ff8c00' }}>▹</span> Git & GitHub</li>
            </ul>
          </motion.div>

        </motion.div>

        {/* TVA TEMPAD TIMELINE */}
        <motion.div variants={itemVariants}>
          <h3 className="crt-text" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '-1rem', textAlign: 'center', letterSpacing: '8px' }}>EXPERIENCE LOG</h3>
          <TemPadTimeline />
        </motion.div>

      </motion.div>
    </div>
  );
};
