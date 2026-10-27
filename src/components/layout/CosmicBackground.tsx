"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
}

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createStars(count: number): Star[] {
  const random = seededRandom(270819);
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    size: 0.4 + random() * 0.8,
    alpha: 0.12 + random() * 0.3,
  }));
}

// A still, sparse star field on flat Carbon: no glows, no motion competing with the work.
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasContext = canvasElement.getContext("2d", { alpha: true });
    if (!canvasContext) return;

    const canvas = canvasElement;
    const context = canvasContext;

    function draw() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const stars = createStars(width < 640 ? 60 : width < 1024 ? 90 : 130);
      for (const star of stars) {
        context.fillStyle = `rgba(238, 234, 226, ${star.alpha})`;
        context.beginPath();
        context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <div className="cosmic-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
