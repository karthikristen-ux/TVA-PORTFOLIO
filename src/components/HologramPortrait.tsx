import React from 'react';

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

      {/* Floating Portrait */}
      <div className="hologram-portrait-frame">
        <img
          src="/images/ascii_variant.png"
          alt="Variant Hologram"
          className="hologram-portrait-img"
        />
        {/* Scanline overlay on image */}
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
