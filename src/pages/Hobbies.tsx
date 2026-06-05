import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tempadVideo from '../components/tempad_video/tempad video.mp4';
import { YggdrasilGallery } from '../components/YggdrasilGallery';

export const Hobbies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'freelance' | 'photography' | 'music'>('photography');

  const getTabClass = (isActive: boolean) => {
    return isActive ? 'tva-tab active' : 'tva-tab';
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      
      {/* 1. ANIMATED BACKGROUND (Fixed) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <video
          src={tempadVideo}
          className="hobbies-bg-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
            filter: 'saturate(1.5) contrast(1.2) sepia(0.6) hue-rotate(-15deg)', 
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        {/* Orange color overlay to force warm aesthetic */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(232, 130, 26, 0.25)',
          mixBlendMode: 'color'
        }} />
      </div>

      {/* 2. SCROLLING CONTENT WITH CHECKPOINTS */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        
        {/* CHECKPOINT 1: Intro */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="tva-card"
            style={{ maxWidth: '800px', textAlign: 'center', padding: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
          >
            <h1 className="crt-text" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: 0, lineHeight: 1.1 }}>
              RECREATIONAL LOGS
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.6, margin: 0 }}>
              Documenting the sacred timeline outside of work. An archival look into personal pursuits and unclassified activities.
            </p>
            <div style={{ marginTop: '3rem', opacity: 0.7, animation: 'pulse 2s infinite', letterSpacing: '4px', fontSize: '0.9rem', color: 'var(--tva-orange)' }}>
              ↓ SCROLL TO ADVANCE TIMELINE ↓
            </div>
          </motion.div>
        </section>

        {/* TABS NAVIGATION */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          padding: '1rem', 
          position: 'sticky', 
          top: 0, 
          zIndex: 50, 
          background: 'rgba(0, 0, 0, 0.7)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(200,113,26,0.2)',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => setActiveTab('freelance')} 
            className={getTabClass(activeTab === 'freelance')}
          >
            Freelance
          </button>
          <button 
            onClick={() => setActiveTab('photography')} 
            className={getTabClass(activeTab === 'photography')}
          >
            Photography
          </button>
          <button 
            onClick={() => setActiveTab('music')} 
            className={getTabClass(activeTab === 'music')}
          >
            Music
          </button>
        </div>

        {/* CHECKPOINT 2: Tab Content */}
        <section style={{ width: '100%', position: 'relative', minHeight: '100vh' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'photography' && (
              <motion.div 
                key="photography" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <YggdrasilGallery />
              </motion.div>
            )}

            {activeTab === 'freelance' && (
              <motion.div 
                key="freelance" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
              >
                <div className="tva-card" style={{ maxWidth: '800px', padding: '4rem', textAlign: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                  <h2 className="crt-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', border: 'none' }}>
                    FREELANCE LOGS
                  </h2>
                  <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8 }}>
                    [ DEVELOPING DIGITAL INFRASTRUCTURE FOR THE TIMELINE ]
                  </p>
                  <p style={{ fontSize: '1.2rem', color: '#ccc', lineHeight: 1.8, marginTop: '1.5rem' }}>
                    I build custom web projects and applications. My work includes creating dynamic platforms for college students, full-scale CRM systems, and highly professional portfolio websites tailored to unique variant specifications.
                  </p>
                  <div style={{ marginTop: '3rem' }}>
                    <a href="https://wa.me/" target="_blank" rel="noreferrer" className="tva-btn" style={{ padding: '1rem 2rem', border: '1px solid var(--tva-orange)', color: 'var(--tva-orange)', textDecoration: 'none', fontFamily: '"Share Tech Mono", monospace', fontSize: '1.1rem', letterSpacing: '0.1em', transition: 'all 0.3s ease' }}>
                      CONTACT VIA WHATSAPP
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'music' && (
              <motion.div 
                key="music" 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}
              >
                <div className="tva-card" style={{ maxWidth: '600px', padding: '4rem', textAlign: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}>
                  <h2 className="crt-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem', border: 'none' }}>
                    MUSIC LOGS
                  </h2>
                  <div style={{ 
                    padding: '2rem', 
                    border: '1px dashed var(--tva-orange, #e8821a)', 
                    color: 'var(--tva-orange, #e8821a)', 
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: '1.1rem',
                    letterSpacing: '0.15em',
                    animation: 'pulse 2s infinite' 
                  }}>
                    [ TEMPORAL BRANCH UNDER CONSTRUCTION ]
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CHECKPOINT 3: End of logs */}
        <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="tva-card"
              style={{ maxWidth: '500px', padding: '4rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)' }}
            >
              <h2 className="crt-text" style={{ fontSize: '2.5rem', margin: 0, border: 'none' }}>END OF LOG</h2>
              <p style={{ fontSize: '1.15rem', color: '#ccc', lineHeight: '1.7', margin: 0 }}>
                The timeline is constantly expanding. More recreational logs and variant data will be added as new branch realities emerge.
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Hobbies;
