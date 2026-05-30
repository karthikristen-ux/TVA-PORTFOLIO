import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface HologramPortraitProps {
  size?: number;
  rotationSpeed?: number;
}

export const HologramPortrait: React.FC<HologramPortraitProps> = ({
  size = 350,
  rotationSpeed = 0.004,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.3, 3.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xff8c00, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xff8c00, 2, 10);
    pointLight1.position.set(2, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff4400, 1.5, 10);
    pointLight2.position.set(-2, -1, 2);
    scene.add(pointLight2);

    // Group for rotation
    const group = new THREE.Group();
    scene.add(group);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/images/ascii_variant.png', (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // Create displacement geometry — subdivided plane
      const segments = 150;
      const geometry = new THREE.PlaneGeometry(2.8, 2.8, segments, segments);

      // Wireframe mesh — holographic skeleton
      const wireframeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff8c00,
        emissive: 0xff6600,
        emissiveIntensity: 0.4,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        displacementMap: texture,
        displacementScale: 1.2,
        map: texture,
        side: THREE.DoubleSide,
      });

      const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
      group.add(wireframeMesh);

      // Points mesh — floating particles layer
      const pointsGeometry = new THREE.PlaneGeometry(2.8, 2.8, 100, 100);
      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff9933,
        size: 0.015,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
        map: createCircleTexture(),
        alphaTest: 0.5,
        depthWrite: false,
      });

      // Apply displacement to points manually
      const posArray = pointsGeometry.attributes.position.array as Float32Array;
      const uvArray = pointsGeometry.attributes.uv.array as Float32Array;

      // We'll use a canvas to read pixel data from the image for displacement
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = texture.image as HTMLImageElement;
        canvas.width = 100;
        canvas.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);
        const imageData = ctx.getImageData(0, 0, 100, 100);

        for (let i = 0; i < posArray.length / 3; i++) {
          const uvX = uvArray[i * 2];
          const uvY = uvArray[i * 2 + 1];
          const pixelX = Math.floor(uvX * 99);
          const pixelY = Math.floor((1 - uvY) * 99);
          const idx = (pixelY * 100 + pixelX) * 4;

          const r = imageData.data[idx];
          const g = imageData.data[idx + 1];
          const b = imageData.data[idx + 2];
          const brightness = (r + g + b) / (3 * 255);

          // Push Z based on brightness
          posArray[i * 3 + 2] = brightness * 1.2;
        }
        pointsGeometry.attributes.position.needsUpdate = true;
      }

      const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
      group.add(pointsMesh);

      // Glow mesh — slightly larger, very transparent, for bloom effect
      const glowGeometry = new THREE.PlaneGeometry(2.8, 2.8, 80, 80);
      const glowMaterial = new THREE.MeshStandardMaterial({
        color: 0xff8c00,
        emissive: 0xff6600,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
        displacementMap: texture,
        displacementScale: 1.4,
        side: THREE.DoubleSide,
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.scale.set(1.05, 1.05, 1.05);
      group.add(glowMesh);

      // Center the group
      group.rotation.x = 0.1;
    });

    // Animation loop
    let time = 0;
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      group.rotation.y += rotationSpeed;

      // Subtle floating bob
      group.position.y = Math.sin(time * 1.5) * 0.05;

      // Hologram flicker effect
      const flicker = Math.random();
      if (flicker > 0.97) {
        group.visible = false;
      } else {
        group.visible = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameIdRef.current);
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size, rotationSpeed]);

  return (
    <div
      ref={containerRef}
      className="hologram-container"
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
    />
  );
};

// Helper: Create a circle texture for points
function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 180, 50, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 140, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
