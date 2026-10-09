"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  depth: number;
  size: number;
  alpha: number;
  phase: number;
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
    depth: 0.2 + random() * 0.8,
    size: 0.35 + random() * 1.5,
    alpha: 0.18 + random() * 0.64,
    phase: random() * Math.PI * 2,
  }));
}

function drawGalaxy(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  rotation: number,
  alpha: number,
  time: number,
) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation + time * 0.000004);
  context.scale(1, 0.34);

  const haze = context.createRadialGradient(0, 0, 0, 0, 0, radius);
  haze.addColorStop(0, `rgba(255, 246, 194, ${alpha * 1.4})`);
  haze.addColorStop(0.12, `rgba(255, 212, 0, ${alpha})`);
  haze.addColorStop(0.45, `rgba(255, 176, 0, ${alpha * 0.28})`);
  haze.addColorStop(1, "rgba(255, 212, 0, 0)");
  context.fillStyle = haze;
  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.fill();

  for (let arm = 0; arm < 3; arm += 1) {
    for (let step = 3; step <= 72; step += 2) {
      const progress = step / 72;
      const angle = progress * Math.PI * 3.2 + arm * ((Math.PI * 2) / 3);
      const distance = radius * 0.08 + progress * radius * 0.78;
      const pointX = Math.cos(angle) * distance;
      const pointY = Math.sin(angle) * distance;
      const particleAlpha = alpha * (0.42 - progress * 0.25);
      context.fillStyle = `rgba(255, 225, 82, ${particleAlpha})`;
      context.beginPath();
      context.arc(pointX, pointY, Math.max(0.6, radius * (0.012 - progress * 0.006)), 0, Math.PI * 2);
      context.fill();
    }
  }

  context.restore();
}

function drawBlackHole(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  time: number,
) {
  context.save();
  context.translate(x, y);
  context.rotate(-0.17 + Math.sin(time * 0.00008) * 0.025);

  const corona = context.createRadialGradient(0, 0, radius * 0.45, 0, 0, radius * 2.65);
  corona.addColorStop(0, "rgba(255, 244, 177, 0.62)");
  corona.addColorStop(0.24, "rgba(255, 212, 0, 0.36)");
  corona.addColorStop(0.58, "rgba(255, 170, 0, 0.11)");
  corona.addColorStop(1, "rgba(255, 212, 0, 0)");
  context.fillStyle = corona;
  context.beginPath();
  context.arc(0, 0, radius * 2.65, 0, Math.PI * 2);
  context.fill();

  context.save();
  context.scale(1, 0.3);
  for (let ring = 0; ring < 10; ring += 1) {
    const ringRadius = radius * (1.05 + ring * 0.13);
    context.beginPath();
    context.arc(0, 0, ringRadius, 0, Math.PI * 2);
    context.strokeStyle = `rgba(255, ${220 - ring * 7}, 0, ${0.34 - ring * 0.022})`;
    context.lineWidth = Math.max(1, radius * (0.13 - ring * 0.007));
    context.stroke();
  }
  context.restore();

  const core = context.createRadialGradient(-radius * 0.15, -radius * 0.15, 0, 0, 0, radius * 1.08);
  core.addColorStop(0, "#000000");
  core.addColorStop(0.72, "#010101");
  core.addColorStop(0.9, "rgba(5, 5, 5, 0.98)");
  core.addColorStop(1, "rgba(5, 5, 5, 0)");
  context.fillStyle = core;
  context.beginPath();
  context.arc(0, 0, radius * 1.08, 0, Math.PI * 2);
  context.fill();

  context.restore();
}

function drawPulsar(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  time: number,
) {
  const angle = -0.72 + Math.sin(time * 0.00016) * 0.12;
  const pulse = 0.5 + Math.sin(time * 0.0011) * 0.12;

  context.save();
  context.translate(x, y);
  context.rotate(angle);
  const beam = context.createLinearGradient(-length, 0, length, 0);
  beam.addColorStop(0, "rgba(255, 212, 0, 0)");
  beam.addColorStop(0.46, `rgba(255, 220, 46, ${0.08 * pulse})`);
  beam.addColorStop(0.5, `rgba(255, 246, 194, ${0.52 * pulse})`);
  beam.addColorStop(0.54, `rgba(255, 220, 46, ${0.08 * pulse})`);
  beam.addColorStop(1, "rgba(255, 212, 0, 0)");
  context.strokeStyle = beam;
  context.lineWidth = 1.2;
  context.beginPath();
  context.moveTo(-length, 0);
  context.lineTo(length, 0);
  context.stroke();
  context.restore();

  const glow = context.createRadialGradient(x, y, 0, x, y, 24);
  glow.addColorStop(0, `rgba(255, 255, 235, ${0.9 * pulse})`);
  glow.addColorStop(0.18, `rgba(255, 212, 0, ${0.46 * pulse})`);
  glow.addColorStop(1, "rgba(255, 212, 0, 0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, 24, 0, Math.PI * 2);
  context.fill();
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasContext = canvasElement.getContext("2d", { alpha: true });
    if (!canvasContext) return;

    const canvas = canvasElement;
    const context = canvasContext;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = createStars(width < 640 ? 110 : width < 1024 ? 180 : 280);
    let frameId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function draw(time: number) {
      context.clearRect(0, 0, width, height);
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      const driftX = reducedMotion.matches ? 0 : Math.sin(time * 0.000045) * 5;
      const driftY = reducedMotion.matches ? 0 : Math.cos(time * 0.00004) * 4;

      for (const star of stars) {
        const x = star.x * width + currentX * 18 * star.depth + driftX * star.depth;
        const y = star.y * height + currentY * 12 * star.depth + driftY * star.depth;
        const twinkle = reducedMotion.matches ? 1 : 0.78 + Math.sin(time * 0.0007 + star.phase) * 0.22;
        context.fillStyle = `rgba(255, ${Math.round(225 + star.depth * 28)}, ${Math.round(105 + star.depth * 105)}, ${star.alpha * twinkle})`;
        context.beginPath();
        context.arc(x, y, star.size * star.depth, 0, Math.PI * 2);
        context.fill();
      }

      drawGalaxy(
        context,
        width * 0.14 + currentX * 7,
        height * 0.22 + currentY * 5,
        Math.min(width, height) * (width < 640 ? 0.18 : 0.24),
        -0.42,
        width < 640 ? 0.12 : 0.16,
        time,
      );
      drawGalaxy(
        context,
        width * 0.48 + currentX * 10,
        height * 0.8 + currentY * 8,
        Math.min(width, height) * (width < 640 ? 0.22 : 0.3),
        0.3,
        width < 640 ? 0.08 : 0.11,
        -time,
      );
      drawPulsar(context, width * 0.18 + currentX * 13, height * 0.55 + currentY * 9, Math.min(width * 0.2, 230), time);

      const blackHoleRadius = Math.min(width, height) * (width < 640 ? 0.105 : 0.135);
      drawBlackHole(
        context,
        width * (width < 640 ? 0.73 : 0.78) + currentX * 20,
        height * (width < 640 ? 0.22 : 0.3) + currentY * 14,
        blackHoleRadius,
        time,
      );
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, width < 640 ? 1 : 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      stars = createStars(width < 640 ? 110 : width < 1024 ? 180 : 280);
      if (reducedMotion.matches) draw(0);
    }

    function animate(time: number) {
      draw(time);
      frameId = window.requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      if (coarsePointer.matches || reducedMotion.matches) return;
      targetX = event.clientX / width - 0.5;
      targetY = event.clientY / height - 0.5;
    }

    function handlePointerLeave() {
      targetX = 0;
      targetY = 0;
    }

    function handleVisibilityChange() {
      window.cancelAnimationFrame(frameId);
      if (!document.hidden && !reducedMotion.matches) frameId = window.requestAnimationFrame(animate);
    }

    function handleMotionPreference() {
      window.cancelAnimationFrame(frameId);
      if (reducedMotion.matches) draw(0);
      else frameId = window.requestAnimationFrame(animate);
    }

    resize();
    if (!reducedMotion.matches) frameId = window.requestAnimationFrame(animate);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, []);

  return (
    <div className="cosmic-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="cosmic-vignette" />
    </div>
  );
}
