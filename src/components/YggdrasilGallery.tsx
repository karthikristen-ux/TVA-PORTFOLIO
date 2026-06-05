import React, { useEffect, useRef } from 'react';

// ─── ADD / REMOVE IMAGES HERE ─────────────────────────────────────────────────
const images = [
  { id: 1, src: '/images/instagram/1.png', label: 'TIMELINE EVENT: 0X-11' },
  { id: 2, src: '/images/instagram/2.png', label: 'TIMELINE EVENT: 0X-12' },
  { id: 3, src: '/images/instagram/3.png', label: 'TIMELINE EVENT: 0X-13' },
  { id: 4, src: '/images/instagram/4.png', label: 'TIMELINE EVENT: 0X-14' },
  { id: 5, src: '/images/instagram/5.png', label: 'TIMELINE EVENT: 0X-15' },
  { id: 6, src: '/images/instagram/6.png', label: 'TIMELINE EVENT: 0X-16' },
  { id: 7, src: '/images/instagram/7.png', label: 'TIMELINE EVENT: 0X-17' },
  { id: 8, src: '/images/instagram/8.png', label: 'TIMELINE EVENT: 0X-18' },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  .ygg-section {
    width: 100%;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0 48px;
    position: relative;
    overflow: hidden;
  }
  .ygg-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 60%, #180c00 0%, #090400 55%, #000 100%);
  }
  .ygg-section::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,120,0,0.008) 3px, rgba(255,120,0,0.008) 6px);
    pointer-events: none;
  }
  .ygg-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%);
    pointer-events: none;
    z-index: 1;
  }
  .ygg-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ygg-header {
    text-align: center;
    margin-bottom: 16px;
  }
  .ygg-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.75rem, 2vw, 1.25rem);
    color: #c8711a;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    text-shadow: 0 0 24px rgba(200,113,26,0.7);
    margin: 0;
  }
  .ygg-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.42rem, 0.85vw, 0.6rem);
    color: rgba(200,113,26,0.5);
    letter-spacing: 0.3em;
    margin-top: 5px;
  }
  .ygg-tree-wrap {
    position: relative;
    width: min(88vh, 88vw, 560px);
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
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.4,0.64,1);
  }
  .ygg-node.visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  .ygg-node:hover { transform: translate(-50%, -50%) scale(1.07) !important; }
  .ygg-frame {
    position: relative;
    width: clamp(50px, 8vw, 92px);
    aspect-ratio: 1;
  }
  .ygg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    clip-path: polygon(7px 0%,calc(100% - 7px) 0%,100% 7px,100% calc(100% - 7px),calc(100% - 7px) 100%,7px 100%,0% calc(100% - 7px),0% 7px);
    filter: sepia(0.15) brightness(0.82);
    transition: filter 0.3s;
  }
  .ygg-node:hover .ygg-img { filter: sepia(0) brightness(1.05); }
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
    width: 4px; height: 4px;
    background: #c8711a;
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 7px #c8711a;
  }
  .ygg-lbl {
    font-family: 'Share Tech Mono', monospace;
    font-size: clamp(0.25rem, 0.42vw, 0.36rem);
    color: rgba(200,113,26,0.7);
    letter-spacing: 0.09em;
    text-align: center;
    margin-top: 4px;
    white-space: nowrap;
    text-shadow: 0 0 5px rgba(200,113,26,0.4);
  }
  .ygg-counter {
    margin-top: 14px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.5rem;
    color: rgba(200,113,26,0.35);
    letter-spacing: 0.27em;
    text-align: center;
  }
`;

// ─── GEOMETRY & TIMING ────────────────────────────────────────────────────────
const SVG_SIZE = 560;
const CX = SVG_SIZE / 2;
const ORANGE = '#c8711a';

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
    const c = se<SVGCircleElement>('circle', { cx, cy, r:2.5, fill:ORANGE, stroke:'none', opacity:'0' }, parent);
    anims.push({ el:c, delay, dur:0, isCircle:true });
  }

  // Create layer groups
  const gRing = se<SVGGElement>('g', { filter:'url(#yggGlow)' }, svgEl);
  const gTree = se<SVGGElement>('g', { filter:'url(#yggGlow)' }, svgEl);
  const gDots = se<SVGGElement>('g', { filter:'url(#yggGlow)' }, svgEl);

  let t = 0;

  // ── Ring ──────────────────────────────────────────────────────────────────
  const circPts: [number,number][] = [];
  for(let i=0;i<=72;i++){const a=(i/72)*Math.PI*2-Math.PI/2; circPts.push([CX+255*Math.cos(a), CX+255*Math.sin(a)]);}
  animPath(circPts, 0.8, t, 600, gRing);
  animPath([[22,CX-6],[10,CX],[22,CX+6]], 0.8, t+200, 200, gRing);
  animPath([[SVG_SIZE-22,CX-6],[SVG_SIZE-10,CX],[SVG_SIZE-22,CX+6]], 0.8, t+200, 200, gRing);
  animTri(CX, 22, 8, true, t+200, gRing);
  animTri(CX, SVG_SIZE-22, 8, false, t+200, gRing);
  animPath([[255+CX,CX],[SVG_SIZE-22,CX]], 0.5, t+300, 200, gRing);
  animPath([[22,CX],[CX-255,CX]], 0.5, t+300, 200, gRing);
  t += 700;

  // ── Crown ─────────────────────────────────────────────────────────────────
  animTri(CX, 112, 7, true, t, gTree);
  animTri(CX, 122, 5, true, t+100, gTree);
  t += 350;

  // ── Trunk grows top→bottom ────────────────────────────────────────────────
  const trunkYs = [120,135,162,200,245,290,340,390,480];
  const trunkTimes: number[] = [t];
  trunkYs.forEach((y,i)=>{
    if(i===0) return;
    const prev = trunkYs[i-1];
    const dur = Math.abs(y-prev)*3.5;
    animPath([[CX,prev],[CX,y]], 2.0, t, dur, gTree);
    animPath([[CX-2,prev],[CX-2,y]], 0.7, t+30, dur, gTree);
    animPath([[CX+2,prev],[CX+2,y]], 0.7, t+60, dur, gTree);
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
  const tiers = [
    {jY:135,len:30,sw:0.6},{jY:162,len:44,sw:0.7},{jY:200,len:58,sw:0.8},
    {jY:245,len:72,sw:0.9},{jY:290,len:88,sw:1.0},{jY:340,len:106,sw:1.2},
    {jY:390,len:130,sw:1.4},
  ];
  const subDefs: any[] = [
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
    const {jY,len,sw} = tier;
    const subs = subDefs[ti];
    const baseT = trunkTimeAt(jY)+60;

    animDot(CX,jY,baseT,gDots);

    [-1,1].forEach(dir=>{
      const tipX = CX+dir*len;
      animPath([[CX,jY],[tipX,jY]], sw, baseT, len*3, gTree);
      animTri(tipX, jY-7, 5, true, baseT+len*3+50, gTree);

      subs.forEach((sub: any, si: number)=>{
        const [offset,vlen,...rest] = sub;
        if(!vlen) return;
        const bx = CX+dir*offset;
        const byTop = jY-vlen;
        const bDelay = baseT+offset*2.5+100;
        animPath([[bx,jY],[bx,byTop]], sw*0.7, bDelay, vlen*3.5, gTree);
        animTri(bx, byTop-5, 4, true, bDelay+vlen*3.5+40, gTree);

        const subSubs = rest[0];
        if(subSubs){
          (subSubs as [number,number,number][]).forEach(([ssOff,ssDir,ssLen])=>{
            const sy2 = byTop-ssOff;
            const ex2 = bx+dir*ssDir*-1*ssLen;
            const ssD = bDelay+vlen*3.5+80+si*60;
            animPath([[bx,sy2],[ex2,sy2]], sw*0.55, ssD, ssLen*4, gTree);
            animTri(ex2, sy2-5, 3, true, ssD+ssLen*4+30, gTree);
          });
        }
      });

      const imgIdx = ti*2+(dir===-1?0:1);
      if(imgIdx<imgCount) nodeSpecs.push({x:tipX, y:jY, imgIdx, showAt:baseT+len*3+200});
    });
  });

  // ── Roots ─────────────────────────────────────────────────────────────────
  const rootBase = trunkTimeAt(480)+100;
  [{y:450,len:80,sw:1.0},{y:430,len:50,sw:0.8}].forEach(({y,len,sw})=>{
    [-1,1].forEach(dir=>{
      const ex=CX+dir*len;
      animPath([[CX,y],[ex,y]],sw,rootBase,len*3,gTree);
      animTri(ex,y+6,4,false,rootBase+len*3+40,gTree);
      const rx=CX+dir*len*0.55;
      animPath([[rx,y],[rx,y+22]],sw*0.7,rootBase+len*1.5+60,220,gTree);
      animPath([[rx,y+22],[rx+dir*18,y+22]],sw*0.55,rootBase+len*1.5+300,200,gTree);
      animTri(rx+dir*18,y+28,3,false,rootBase+len*1.5+520,gTree);
    });
  });
  animPath([[CX,480],[CX,522]],1.2,rootBase,200,gTree);
  animTri(CX,528,6,false,rootBase+220,gTree);
  animTri(CX,538,4,false,rootBase+350,gTree);
  animPath([[CX-65,450],[CX-35,450]],0.6,rootBase+100,200,gTree);
  animTri(CX-65,456,3,false,rootBase+320,gTree);
  animPath([[CX+35,450],[CX+65,450]],0.6,rootBase+100,200,gTree);
  animTri(CX+65,456,3,false,rootBase+320,gTree);

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
        (el as unknown as HTMLElement).style.transition='opacity 0.3s ease';
        (el as unknown as HTMLElement).style.opacity='1';
        return;
      }
      (el as unknown as HTMLElement).style.transition=`stroke-dashoffset ${dur}ms linear`;
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
    blur.setAttribute('stdDeviation','1.0'); blur.setAttribute('result','b');
    const merge = document.createElementNS(NS,'feMerge') as SVGElement;
    ['b','b','SourceGraphic'].forEach(v=>{ const n=document.createElementNS(NS,'feMergeNode') as SVGElement; n.setAttribute('in',v); merge.appendChild(n); });
    filt.appendChild(blur); filt.appendChild(merge);
    defs.appendChild(filt); svg.appendChild(defs);

    const nodeSpecs = buildTree(svg, images.length);

    // Position nodes and reveal at scheduled times
    nodeSpecs.forEach(({x, y, imgIdx, showAt})=>{
      const el = nodeRefs.current[imgIdx];
      if(el){
        el.style.left = `${(x/SVG_SIZE)*100}%`;
        el.style.top  = `${(y/SVG_SIZE)*100}%`;
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
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              preserveAspectRatio="xMidYMid meet"
            />
            <div ref={nodesRef} className="ygg-nodes-layer">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  ref={el => { nodeRefs.current[i] = el; }}
                  className="ygg-node"
                  style={{ left:`${0}%`, top:`${0}%` }}
                >
                  <div className="ygg-frame">
                    <img src={img.src} alt={img.label} className="ygg-img" loading="lazy" />
                    <div className="ygg-border1" />
                    <div className="ygg-border2" />
                    <div className="ygg-dot" />
                  </div>
                  <p className="ygg-lbl">{img.label}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="ygg-counter">[ {images.length.toString().padStart(2,'0')} BRANCHES ACTIVE ]</p>
        </div>
      </section>
    </>
  );
};

export default YggdrasilGallery;
