import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Terminal, Cpu, Mail, Link, FileText } from 'lucide-react';
import { TemPadTimeline } from '../components/TemPadTimeline';

// @ts-ignore
import tempadBgVideo from '../components/tempad_video/tempad video.mp4';

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

          {/* RIGHT COLUMN: TVA TV TEMPAD DISPLAY */}
          <motion.div 
            variants={itemVariants}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            {/* TV Shell */}
            <div style={{
              width: '100%',
              maxWidth: '500px',
              backgroundColor: '#1a1a1a',
              borderRadius: '24px',
              border: '4px solid #333',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,140,0,0.2), inset 0 0 10px rgba(255,140,0,0.1)',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative'
            }}>
              
              {/* TV Screen Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/3',
                backgroundColor: '#050300',
                borderRadius: '16px',
                border: '6px solid #000',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 0 15px rgba(255,140,0,0.3)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Glare and Scanlines */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                  pointerEvents: 'none', zIndex: 5,
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(255, 140, 0, 0.05) 50%)',
                  backgroundSize: '100% 4px',
                  pointerEvents: 'none', zIndex: 4,
                }} />
                
                {/* Video playing inside the TV */}
                <video 
                  src={tempadBgVideo} 
                  autoPlay loop muted playsInline
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.2) sepia(1) hue-rotate(350deg) saturate(3) brightness(1.1)',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </div>

              {/* TV Control Panel & Alert */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 0.5rem'
              }}>
                {/* Alert Message */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    color: '#ff4d00',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    letterSpacing: '2px',
                    textShadow: '0 0 10px rgba(255, 77, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <strong style={{ fontSize: '1rem' }}>[ TIMELINE BREACHED ]</strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px', cursor: 'pointer' }}>&gt; CLICK TO VIEW VARIANT</span>
                </motion.div>

                {/* Knobs */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '25px', height: '25px', borderRadius: '50%', backgroundColor: '#222', border: '1px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <div style={{ width: '2px', height: '10px', backgroundColor: 'var(--tva-orange)', borderRadius: '2px', transform: 'translateY(-5px)' }} />
                  </div>
                  <div style={{ width: '25px', height: '25px', borderRadius: '50%', backgroundColor: '#222', border: '1px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'rotate(45deg)' }}>
                     <div style={{ width: '2px', height: '10px', backgroundColor: '#555', borderRadius: '2px', transform: 'translateY(-5px)' }} />
                  </div>
                </div>
              </div>
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
