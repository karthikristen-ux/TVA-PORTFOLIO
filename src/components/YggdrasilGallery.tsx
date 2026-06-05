import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── ADD / REMOVE IMAGES HERE ─────────────────────────────────────────────────
const images = [
  { id: 1, src: '/images/instagram/1.png', label: 'TIMELINE EVENT: 0X-11', link: 'https://instagram.com' },
  { id: 2, src: '/images/instagram/2.png', label: 'TIMELINE EVENT: 0X-12', link: 'https://instagram.com' },
  { id: 3, src: '/images/instagram/3.png', label: 'TIMELINE EVENT: 0X-13', link: 'https://instagram.com' },
  { id: 4, src: '/images/instagram/4.png', label: 'TIMELINE EVENT: 0X-14', link: 'https://instagram.com' },
  { id: 5, src: '/images/instagram/5.png', label: 'TIMELINE EVENT: 0X-15', link: 'https://instagram.com' },
  { id: 6, src: '/images/instagram/6.png', label: 'TIMELINE EVENT: 0X-16', link: 'https://instagram.com' },
  { id: 7, src: '/images/instagram/7.png', label: 'TIMELINE EVENT: 0X-17', link: 'https://instagram.com' },
  { id: 8, src: '/images/instagram/8.png', label: 'TIMELINE EVENT: 0X-18', link: 'https://instagram.com' },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  .ygg-section {
    width: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0 48px;
    position: relative;
    overflow: hidden;
  }
  .ygg-vignette {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }
  .ygg-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .ygg-header {
    text-align: center;
    margin-bottom: 16px;
  }
  .ygg-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(1rem, 2vw, 1.5rem);
    color: #c8711a;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-shadow: 0 0 24px rgba(200,113,26,0.7);
    margin: 0;
    background: rgba(40, 15, 0, 0.85);
    padding: 8px 16px;
    border: 1px solid rgba(200,113,26,0.3);
    border-radius: 4px;
  }
  .ygg-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.5rem, 1vw, 0.7rem);
    color: rgba(200,113,26,0.7);
    letter-spacing: 0.3em;
    margin-top: 5px;
    background: rgba(40, 15, 0, 0.85);
    padding: 4px 12px;
    border: 1px solid rgba(200,113,26,0.2);
    border-radius: 4px;
  }
  .ygg-tree-wrap {
    position: relative;
    width: 100%;
    max-width: 1400px;
    aspect-ratio: 1;
  }
  .ygg-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .ygg-nodes-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .ygg-node {
    position: absolute;
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    pointer-events: auto;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    z-index: 9999;
  }
  .ygg-node.visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  .ygg-node:hover { transform: translate(-50%, -50%) scale(1.07) !important; z-index: 10000; }
  .ygg-frame {
    position: relative;
    width: clamp(60px, 10vw, 120px);
    aspect-ratio: 1;
  }
  .ygg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    clip-path: polygon(7px 0%,calc(100% - 7px) 0%,100% 7px,100% calc(100% - 7px),calc(100% - 7px) 100%,7px 100%,0% calc(100% - 7px),0% 7px);
    transition: filter 0.3s;
  }
  .ygg-node:hover .ygg-img { filter: brightness(1.2); }
  .ygg-border1 {
    position: absolute;
    inset: -3px;
    border: 1px solid rgba(200,113,26,0.85);
    clip-path: polygon(7px 0%,calc(100% - 7px) 0%,100% 7px,100% calc(100% - 7px),calc(100% - 7px) 100%,7px 100%,0% calc(100% - 7px),0% 7px);
    box-shadow: 0 0 16px rgba(200,113,26,0.4);
  }
  .ygg-border2 {
    position: absolute;
    inset: -6px;
    border: 1px solid rgba(200,113,26,0.18);
    clip-path: polygon(11px 0%,calc(100% - 11px) 0%,100% 11px,100% calc(100% - 11px),calc(100% - 11px) 100%,11px 100%,0% calc(100% - 11px),0% 11px);
  }
  .ygg-dot {
    position: absolute;
    width: 6px; height: 6px;
    background: #c8711a;
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px #c8711a;
  }
  .ygg-lbl {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.4rem, 0.6vw, 0.6rem);
    color: #c8711a;
    letter-spacing: 0.1em;
    text-align: center;
    margin-top: 8px;
    white-space: nowrap;
    text-shadow: 0 0 5px rgba(200,113,26,0.4);
    background: rgba(40, 15, 0, 0.85);
    padding: 4px 8px;
    border: 1px solid rgba(200,113,26,0.3);
    border-radius: 4px;
  }
  .ygg-counter {
    margin-top: 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: rgba(200,113,26,0.6);
    letter-spacing: 0.3em;
    text-align: center;
    background: rgba(40, 15, 0, 0.85);
    padding: 8px 16px;
    border: 1px solid rgba(200,113,26,0.3);
    border-radius: 4px;
  }
`;

// ─── GEOMETRY & TIMING ────────────────────────────────────────────────────────
const SVG_WIDTH = 2400;
const SVG_HEIGHT = 1800;
const CX = SVG_WIDTH / 2;
const ORANGE = '#c8711a';

// Scale factor for the internal PCB traces so they are visible on the huge canvas
const S = 3.5;

interface AnimItem {
  el: SVGElement | null;
  delay: number;
  dur: number;
  isCircle?: boolean;
}

interface NodeSpec {
  x: number;
  y: number;
  imgIdx: number;
  showAt: number;
}

function buildTree(svgEl: SVGSVGElement, imgCount: number): NodeSpec[] {
  const NS = 'http://www.w3.org/2000/svg';
  const anims: AnimItem[] = [];
  const nodeSpecs: NodeSpec[] = [];

  function se<T extends SVGElement>(tag: string, attrs: Record<string,string|number>, parent: SVGElement): T {
    const e = document.createElementNS(NS, tag) as T;
    Object.entries(attrs).forEach(([k,v]) => e.setAttribute(k, String(v)));
    parent.appendChild(e);
    return e;
  }

  function animPath(pts: [number,number][], sw: number, delay: number, dur: number, parent: SVGElement) {
    const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ');
    const el = se<SVGPathElement>('path', { d, fill:'none', stroke:ORANGE, 'stroke-width':sw, 'stroke-linecap':'round', 'stroke-linejoin':'round' }, parent);
    anims.push({ el, delay, dur });
    return el;
  }
  function animTri(cx: number, cy: number, size: number, up: boolean, delay: number, parent: SVGElement) {
    const pts: [number,number][] = up
      ? [[cx,cy-size*0.67],[cx-size/2,cy+size*0.33],[cx+size/2,cy+size*0.33],[cx,cy-size*0.67]]
      : [[cx,cy+size*0.67],[cx-size/2,cy-size*0.33],[cx+size/2,cy-size*0.33],[cx,cy+size*0.67]];
    return animPath(pts, 0.7, delay, 280, parent);
  }
  function animDot(cx: number, cy: number, delay: number, parent: SVGElement) {
    const c = se<SVGCircleElement>('circle', { cx, cy, r:4, fill:ORANGE, stroke:'none', opacity:'0' }, parent);
    anims.push({ el:c, delay, dur:0, isCircle:true });
  }

  // Create layer groups
  const gRing = se<SVGGElement>('g', { filter:'url(#yggGlow)' }, svgEl);
  const gTree = se<SVGGElement>('g', { filter:'url(#yggGlow)' }, svgEl);
  const gDots = se<SVGGElement>('g', { filter:'url(#yggGlow)' }, svgEl);

  let t = 0;

  // ── Ring ──────────────────────────────────────────────────────────────────
  const circPts: [number,number][] = [];
  const ringR = 850; 
  for(let i=0;i<=72;i++){const a=(i/72)*Math.PI*2-Math.PI/2; circPts.push([CX+ringR*Math.cos(a), 800+ringR*Math.sin(a)]);}
  animPath(circPts, 0.8, t, 600, gRing);
  t += 700;

  // ── Crown ─────────────────────────────────────────────────────────────────
  animTri(CX, 180, 9, true, t, gTree);
  animTri(CX, 190, 7, true, t+100, gTree);
  t += 350;

  // ── Trunk grows top→bottom ────────────────────────────────────────────────
  const trunkYs = [200, 350, 600, 850, 1100, 1350, 1600, 1800];
  const trunkTimes: number[] = [t];
  trunkYs.forEach((y,i)=>{
    if(i===0) return;
    const prev = trunkYs[i-1];
    const dur = Math.abs(y-prev)*1.5; // faster animation for big tree
    animPath([[CX,prev],[CX,y]], 3.0, t, dur, gTree);
    animPath([[CX-4,prev],[CX-4,y]], 1.0, t+30, dur, gTree);
    animPath([[CX+4,prev],[CX+4,y]], 1.0, t+60, dur, gTree);
    t += dur+30;
    trunkTimes.push(t);
  });

  function trunkTimeAt(jY: number): number {
    for(let i=1;i<trunkYs.length;i++){
      if(trunkYs[i]>=jY){
        const frac=(jY-trunkYs[i-1])/(trunkYs[i]-trunkYs[i-1]);
        return trunkTimes[i-1] + frac*(trunkTimes[i]-trunkTimes[i-1]);
      }
    }
    return trunkTimes[trunkTimes.length-1];
  }

  // ── Tier definitions (top→bottom order) ───────────────────────────────────
  // We use a ZIGZAG pattern to mathematically guarantee images will never overlap.
  // One tier is short, the next is extremely long, providing massive clearance.
  const tiers = [
    {jY:350,  len:350, sw:1.0},
    {jY:600,  len:950, sw:1.2},
    {jY:850,  len:350, sw:1.4},
    {jY:1100, len:950, sw:1.6},
    {jY:1350, len:350, sw:1.8},
    {jY:1600, len:950, sw:2.0},
  ];
  
  // These are the internal PCB trace offsets. They are scaled by 'S' so they look proportional.
  const rawSubDefs: any[] = [
    [[10,18],[24,9]],
    [[14,25,[[8,-1,12]]],[35,12]],
    [[18,30,[[10,-1,16]]],[44,15]],
    [[22,35,[[12,-1,20]]],[55,18,[[9,-1,14]]]],
    [[25,40,[[15,-1,24]]],[65,22,[[10,-1,16]]]],
    [[30,45,[[18,-1,28],[18,1,16]]],[76,25,[[12,-1,18]]]],
    [[40,50,[[20,-1,36],[20,1,18]]],[90,30,[[14,-1,22]]]],
  ];

  const tiersNeeded = Math.min(Math.ceil(imgCount/2), tiers.length);
  tiers.slice(0,tiersNeeded).forEach((tier,ti)=>{
    const {jY, len, sw} = tier;
    const subs = rawSubDefs[ti];
    const baseT = trunkTimeAt(jY)+60;

    animDot(CX,jY,baseT,gDots);

    [-1,1].forEach(dir=>{
      const tipX = CX+dir*len;
      animPath([[CX,jY],[tipX,jY]], sw, baseT, len*1.5, gTree);
      animTri(tipX, jY-10, 8, true, baseT+len*1.5+50, gTree);

      subs.forEach((sub: any, si: number)=>{
        const [rawOffset,rawVlen,...rest] = sub;
        if(!rawVlen) return;
        const offset = rawOffset * S;
        const vlen = rawVlen * S;
        const bx = CX+dir*offset;
        const byTop = jY-vlen;
        const bDelay = baseT+offset*1.2+100;
        animPath([[bx,jY],[bx,byTop]], sw*0.7, bDelay, vlen*1.5, gTree);
        animTri(bx, byTop-7, 6, true, bDelay+vlen*1.5+40, gTree);

        const subSubs = rest[0];
        if(subSubs){
          (subSubs as [number,number,number][]).forEach(([rawSsOff,ssDir,rawSsLen])=>{
            const ssOff = rawSsOff * S;
            const ssLen = rawSsLen * S;
            const sy2 = byTop-ssOff;
            const ex2 = bx+dir*ssDir*-1*ssLen;
            const ssD = bDelay+vlen*1.5+80+si*60;
            animPath([[bx,sy2],[ex2,sy2]], sw*0.55, ssD, ssLen*2, gTree);
            animTri(ex2, sy2-6, 5, true, ssD+ssLen*2+30, gTree);
          });
        }
      });

      const imgIdx = ti*2+(dir===-1?0:1);
      if(imgIdx<imgCount) nodeSpecs.push({x:tipX, y:jY, imgIdx, showAt:baseT+len*1.5+200});
    });
  });

  // ── Roots ─────────────────────────────────────────────────────────────────
  const rootBaseY = 1600;
  const rootBaseTime = trunkTimeAt(rootBaseY)+100;
  [{y:1650,len:400,sw:2.0},{y:1700,len:250,sw:1.6}].forEach(({y,len,sw})=>{
    [-1,1].forEach(dir=>{
      const ex=CX+dir*len;
      animPath([[CX,y],[ex,y]],sw,rootBaseTime,len*1.5,gTree);
      animTri(ex,y+8,6,false,rootBaseTime+len*1.5+40,gTree);
      const rx=CX+dir*len*0.55;
      animPath([[rx,y],[rx,y+80]],sw*0.7,rootBaseTime+len*0.7+60,220,gTree);
      animPath([[rx,y+80],[rx+dir*60,y+80]],sw*0.55,rootBaseTime+len*0.7+300,200,gTree);
      animTri(rx+dir*60,y+88,5,false,rootBaseTime+len*0.7+520,gTree);
    });
  });

  // ── Apply initial dash state + fire animations ────────────────────────────
  anims.forEach(({el,isCircle})=>{
    if(!el) return;
    if(isCircle){ (el as SVGCircleElement).style.opacity='0'; return; }
    try {
      const len = (el as SVGPathElement).getTotalLength() || 200;
      el.setAttribute('stroke-dasharray', String(len));
      el.setAttribute('stroke-dashoffset', String(len));
    } catch(_){}
  });

  anims.forEach(({el,delay,dur,isCircle})=>{
    if(!el) return;
    setTimeout(()=>{
      if(isCircle){
        (el as any).style.transition='opacity 0.3s ease';
        (el as any).style.opacity='1';
        return;
      }
      (el as any).style.transition=`stroke-dashoffset ${dur}ms linear`;
      el.setAttribute('stroke-dashoffset','0');
    }, delay);
  });

  return nodeSpecs;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const YggdrasilGallery: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement|null)[]>([]);
  const initiated = useRef(false);
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  useEffect(()=>{
    if(!svgRef.current || !nodesRef.current || initiated.current) return;
    initiated.current = true;

    const svg = svgRef.current;
    const NS = 'http://www.w3.org/2000/svg';

    // Inject glow filter
    const defs = document.createElementNS(NS,'defs') as SVGDefsElement;
    const filt = document.createElementNS(NS,'filter') as SVGFilterElement;
    filt.setAttribute('id','yggGlow');
    filt.setAttribute('x','-40%'); filt.setAttribute('y','-40%');
    filt.setAttribute('width','180%'); filt.setAttribute('height','180%');
    const blur = document.createElementNS(NS,'feGaussianBlur') as SVGElement;
    blur.setAttribute('stdDeviation','2.0'); blur.setAttribute('result','b');
    const merge = document.createElementNS(NS,'feMerge') as SVGElement;
    ['b','b','SourceGraphic'].forEach(v=>{ const n=document.createElementNS(NS,'feMergeNode') as SVGElement; n.setAttribute('in',v); merge.appendChild(n); });
    filt.appendChild(blur); filt.appendChild(merge);
    defs.appendChild(filt); svg.appendChild(defs);

    const nodeSpecs = buildTree(svg, images.length);

    // Position nodes and reveal at scheduled times
    nodeSpecs.forEach(({x, y, imgIdx, showAt})=>{
      const el = nodeRefs.current[imgIdx];
      if(el){
        el.style.left = `${(x/SVG_WIDTH)*100}%`;
        el.style.top  = `${(y/SVG_HEIGHT)*100}%`;
        setTimeout(()=>{ el.classList.add('visible'); }, showAt);
      }
    });
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: STYLES}} />
      <section className="ygg-section">
        <div className="ygg-vignette" />
        <div className="ygg-content">
          <div className="ygg-header">
            <h2 className="ygg-title">SACRED TIMELINE BRANCHES</h2>
            <p className="ygg-subtitle">[ VIEWING ALTERNATE REALITIES ]</p>
          </div>
          <div className="ygg-tree-wrap">
            <svg
              ref={svgRef}
              className="ygg-svg"
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
            />
            <div ref={nodesRef} className="ygg-nodes-layer">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  ref={el => { nodeRefs.current[i] = el; }}
                  className="ygg-node"
                  style={{ left:`${0}%`, top:`${0}%` }}
                  onClick={() => setSelectedImage(img)}
                >
                  <div style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="ygg-frame">
                      <img src={img.src} alt={img.label} className="ygg-img" loading="lazy" />
                      <div className="ygg-border1" />
                      <div className="ygg-border2" />
                      <div className="ygg-dot" />
                    </div>
                    <p className="ygg-lbl">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="ygg-counter">[ {images.length.toString().padStart(2,'0')} BRANCHES ACTIVE ]</p>
        </div>
      </section>

      {/* IMAGE DETAILS MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                background: 'rgba(20, 10, 0, 0.9)',
                border: '1px solid var(--tva-orange, #c8711a)',
                padding: '1.5rem',
                maxWidth: '450px',
                width: '90%',
                maxHeight: '90vh',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 0 30px rgba(200, 113, 26, 0.2)',
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                style={{ 
                  position: 'absolute', top: '10px', right: '15px', 
                  background: 'none', border: 'none', color: '#c8711a', 
                  fontSize: '1.5rem', cursor: 'pointer', fontFamily: 'monospace',
                  zIndex: 10
                }}
              >
                X
              </button>
              
              <h2 style={{ fontFamily: '"Share Tech Mono", monospace', color: '#c8711a', fontSize: '1.2rem', letterSpacing: '0.15em', marginTop: '1rem', marginBottom: '1rem', textAlign: 'center', borderBottom: '1px solid rgba(200,113,26,0.3)', paddingBottom: '0.8rem', width: '100%' }}>
                {selectedImage.label}
              </h2>

              <div style={{ width: '100%', maxHeight: '40vh', aspectRatio: '1', position: 'relative', overflow: 'hidden', border: '1px solid rgba(200,113,26,0.5)', marginBottom: '1.5rem' }}>
                 <img src={selectedImage.src} alt={selectedImage.label} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.5)' }} />
                 <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,120,0,0.02) 3px, rgba(255,120,0,0.02) 6px)', pointerEvents: 'none' }} />
              </div>
              
              <a 
                href={selectedImage.link} 
                target="_blank" 
                rel="noreferrer"
                className="tva-tab"
              >
                VIEW ARCHIVE ON INSTAGRAM
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default YggdrasilGallery;
