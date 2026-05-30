import React from 'react';

// @ts-ignore
import hologramVideo from './tempad_video/animation tempad.mp4';

interface HologramPortraitProps {
  size?: number;
}

export const HologramPortrait: React.FC<HologramPortraitProps> = ({
  size = 380,
}) => {
  return (
    <div className="hologram-projector" style={{ width: size, height: size + 80 }}>
      {/* Light Rays behind image */}
      <div className="hologram-rays">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="hologram-ray"
            style={{
              transform: `rotate(${i * 30}deg)`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Portrait Animation */}
      <div className="hologram-portrait-frame">
        <video
          src={hologramVideo}
          autoPlay
          loop
          muted
          playsInline
          className="hologram-portrait-img"
        />
        {/* Scanline overlay on video */}
        <div className="hologram-img-scanlines" />
        {/* Edge glow */}
        <div className="hologram-img-edge-glow" />
      </div>

      {/* Ripple rings at base */}
      <div className="hologram-base">
        <div className="hologram-ripple ripple-1" />
        <div className="hologram-ripple ripple-2" />
        <div className="hologram-ripple ripple-3" />
        {/* Bright center point */}
        <div className="hologram-base-glow" />
      </div>

      {/* Beam cone connecting base to image */}
      <div className="hologram-beam-cone" />
    </div>
  );
};
