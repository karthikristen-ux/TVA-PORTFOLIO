import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Terminal, Cpu, Mail, Link, FileText } from 'lucide-react';
import { TemPadTimeline } from '../components/TemPadTimeline';

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
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(300px, 1fr)', 
          gap: '4rem', 
          alignItems: 'start', 
          marginBottom: '6rem' 
        }}>
          
          {/* LEFT COLUMN: INTRO & BUTTONS */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h1 className="crt-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>T. KARTHIKEYAN</h1>
              <h2 style={{ fontSize: '1.4rem', borderBottom: 'none', color: '#ff8c00', opacity: 0.9, letterSpacing: '4px', padding: 0 }}>Electronics & Communication Engineering</h2>
            </div>
            
            <p style={{ fontSize: '1.15rem', color: '#ccc', lineHeight: '1.8', maxWidth: '90%' }}>
              Welcome to my timeline. I am an aspiring engineer with a hyper-focus on <strong style={{color: '#fff'}}>Embedded Systems, IoT, and Software Development</strong>. 
              Currently decoding the future at Sathyabama Institute of Science and Technology (2023 - 2027).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <a href="mailto:karthikeyant1885@gmail.com" className="tva-btn">
                 <Mail size={18} style={{marginRight: '8px'}} /> COMMUNICATE
              </a>
              <a href="https://www.linkedin.com/in/karthikristen/" target="_blank" rel="noopener" className="tva-btn">
                 <Link size={18} style={{marginRight: '8px'}} /> LINKEDIN
              </a>
              <a href="https://github.com/karthikristen-ux" target="_blank" rel="noreferrer" className="tva-btn">
                 <Terminal size={18} style={{marginRight: '8px'}} /> GITHUB
              </a>
              <a href="https://drive.google.com/file/d/1Y6PHHpYaOuttlEbAWEBzi9brH7QaRlze/view?usp=drive_link" target="_blank" rel="noreferrer" className="tva-btn">
                 <FileText size={18} style={{marginRight: '8px'}} /> DOSSIER
              </a>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: HOLOGRAM VARIANT DISPLAY */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* Hologram Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '450px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              
              {/* The Holographic Figure */}
              <motion.div
                initial={{ y: 10, opacity: 0.8 }}
                animate={{ y: -10, opacity: 1 }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  filter: 'drop-shadow(0 0 15px rgba(255, 140, 0, 0.4))'
                }}
              >
                <img 
                  src="/images/ascii_variant.png" 
                  alt="ASCII Variant Portrait" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    mixBlendMode: 'screen',
                    opacity: 0.95,
                  }}
                />
                
                {/* Glowing Base Platform under the image */}
                <div style={{
                  position: 'absolute',
                  bottom: '-5%',
                  width: '60%',
                  height: '20px',
                  background: 'radial-gradient(ellipse at center, rgba(255, 140, 0, 0.4) 0%, rgba(0,0,0,0) 70%)',
                  borderRadius: '50%',
                  transform: 'rotateX(75deg)',
                  boxShadow: '0 0 30px rgba(255, 140, 0, 0.2)',
                  zIndex: -1
                }} />
              </motion.div>

              {/* ID Card Details Below the Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(20, 10, 0, 0.6)',
                  border: '1px solid #ff8c00',
                  borderRadius: '8px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  boxShadow: '0 0 20px rgba(255, 140, 0, 0.15), inset 0 0 10px rgba(255, 140, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Scanline effect on ID card */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(rgba(255, 140, 0, 0.03) 50%, rgba(0, 0, 0, 0.2) 50%)',
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none',
                }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(255,140,0,0.3)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#ff8c00', opacity: 0.7, fontSize: '0.75rem', letterSpacing: '2px' }}>SUBJECT</span>
                  <strong style={{ color: '#ff8c00', fontSize: '1rem', letterSpacing: '1px' }}>T. KARTHIKEYAN</strong>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(255,140,0,0.3)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#ff8c00', opacity: 0.7, fontSize: '0.75rem', letterSpacing: '2px' }}>CASE ID</span>
                  <span style={{ color: '#ff8c00', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>0232-467-9751</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ff4d00', opacity: 0.7, fontSize: '0.75rem', letterSpacing: '2px' }}>STATUS</span>
                  <span style={{ 
                    color: '#ff4d00', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold', 
                    letterSpacing: '1px',
                    textShadow: '0 0 8px rgba(255,77,0,0.5)',
                    animation: 'pulse 2s infinite'
                  }}>
                    ESCAPED TIMELINE
                  </span>
                </div>
              </motion.div>
              
            </div>
          </motion.div>

        </div>

        <motion.div variants={containerVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
          
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
          <h3 className="crt-text" style={{ fontSize: '2rem', marginBottom: '-1rem', textAlign: 'center', letterSpacing: '8px' }}>EXPERIENCE LOG</h3>
          <TemPadTimeline />
        </motion.div>

      </motion.div>
    </div>
  );
};
