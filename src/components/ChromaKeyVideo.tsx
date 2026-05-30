import React, { useRef, useEffect } from 'react';

interface ChromaKeyVideoProps {
  src: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const ChromaKeyVideo: React.FC<ChromaKeyVideoProps> = ({
  src,
  width = 800,
  height = 600,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Temporary canvas to draw the raw video frame
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
    if (!tempCtx) return;

    const computeFrame = () => {
      if (video.paused || video.ended) {
        requestRef.current = requestAnimationFrame(computeFrame);
        return;
      }

      // Match canvas dimensions to video
      if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        tempCanvas.width = video.videoWidth;
        tempCanvas.height = video.videoHeight;
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        const w = video.videoWidth;
        const h = video.videoHeight;

        // Draw current video frame to temporary canvas
        tempCtx.drawImage(video, 0, 0, w, h);
        
        // Get pixel data
        const frame = tempCtx.getImageData(0, 0, w, h);
        const l = frame.data.length / 4;

        // Chroma key logic (Green Screen Removal)
        for (let i = 0; i < l; i++) {
          const r = frame.data[i * 4 + 0];
          const g = frame.data[i * 4 + 1];
          const b = frame.data[i * 4 + 2];

          // Identify green pixels
          // Typical green screen is high green, low red/blue
          if (g > 100 && g > r * 1.4 && g > b * 1.4) {
            // Set alpha to 0 (transparent)
            frame.data[i * 4 + 3] = 0;
          } else if (g > 80 && g > r * 1.1 && g > b * 1.1) {
            // Anti-aliasing / edge spill reduction
            // Partially transparent for pixels that are somewhat green
            frame.data[i * 4 + 3] = Math.max(0, frame.data[i * 4 + 3] - (g - r) * 1.5);
            // Desaturate green slightly on edges
            frame.data[i * 4 + 1] = (r + b) / 2;
          }
        }

        // Put modified pixel data onto the visible canvas
        ctx.putImageData(frame, 0, 0);
      }

      requestRef.current = requestAnimationFrame(computeFrame);
    };

    video.addEventListener('play', () => {
      requestRef.current = requestAnimationFrame(computeFrame);
    });

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width, height }} className={className}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        style={{ display: 'none' }} // Hide actual video
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
};
