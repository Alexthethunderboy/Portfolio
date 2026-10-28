"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

interface Bolt {
  x: number;
  y: number;
  size: number;
  tilt: number;
  born: number;
}

const VOLTAGE = "rgb(255, 212, 0)";
const CARBON = "#050505";
const GRAPHITE = "rgba(140, 142, 141, 0.24)";
const GRAPHITE_EDGE = "rgba(140, 142, 141, 0.6)";
const INDEX_LINE = "rgba(238, 234, 226, 0.3)";

// The transparent bolt from the wordmark, in wordmark units (box 222.56-254.56 x 74-152).
const BOLT: Point[] = [
  [248.56, 74],
  [227.56, 82],
  [222.56, 119],
  [237.56, 113],
  [236.56, 152],
  [254.56, 88],
  [241.56, 91],
];
const BOLT_CENTER: Point = [238.56, 113];
const BOLT_HEIGHT = 78;

const BOLT_LIFE = 1650;
const BOLT_OPEN = 260;
const BOLT_CLOSE_AT = 1150;
const BOLT_CLOSE = 450;
const MAX_BOLTS = 4;
const DRIFT_TICK = 120;

// Where bolts sit, held open, when reduced motion is on.
const STILL_BOLTS = [
  [0.72, 0.22, 78, 0.12],
  [0.86, 0.62, 92, -0.2],
  [0.3, 0.16, 70, 0.18],
  [0.12, 0.74, 84, -0.08],
  [0.93, 0.3, 64, 0.22],
];

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

const permutation = (() => {
  const random = seededRandom(9157);
  const values = Array.from({ length: 256 }, (_, index) => index);
  for (let index = 255; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [values[index], values[swap]] = [values[swap], values[index]];
  }
  const table = new Uint8Array(512);
  for (let index = 0; index < 512; index += 1) table[index] = values[index & 255];
  return table;
})();

function hash(x: number, y: number, z: number) {
  return permutation[(permutation[(permutation[x & 255] + y) & 255] + z) & 255] / 255;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// 3D value noise: enough for a slow, soft terrain.
function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const zf = smooth(z - zi);
  const front = lerp(lerp(hash(xi, yi, zi), hash(xi + 1, yi, zi), xf), lerp(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), xf), yf);
  const back = lerp(
    lerp(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), xf),
    lerp(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), xf),
    yf,
  );
  return lerp(front, back, zf);
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

// Marching-squares segments per corner case (top-left 8, top-right 4, bottom-right 2, bottom-left 1).
// Edges: 0 top, 1 right, 2 bottom, 3 left.
const SEGMENTS: (number[][] | null)[] = [
  null, [[3, 2]], [[2, 1]], [[3, 1]], [[0, 1]], [[3, 0], [2, 1]], [[0, 2]], [[3, 0]],
  [[3, 0]], [[0, 2]], [[0, 1], [3, 2]], [[0, 1]], [[3, 1]], [[2, 1]], [[3, 2]], null,
];

function traceContour(
  context: CanvasRenderingContext2D,
  field: Float32Array,
  columns: number,
  rows: number,
  cell: number,
  level: number,
) {
  context.beginPath();
  for (let row = 0; row < rows - 1; row += 1) {
    for (let column = 0; column < columns - 1; column += 1) {
      const topLeft = field[row * columns + column];
      const topRight = field[row * columns + column + 1];
      const bottomLeft = field[(row + 1) * columns + column];
      const bottomRight = field[(row + 1) * columns + column + 1];
      const segments =
        SEGMENTS[
          (topLeft > level ? 8 : 0) | (topRight > level ? 4 : 0) | (bottomRight > level ? 2 : 0) | (bottomLeft > level ? 1 : 0)
        ];
      if (!segments) continue;

      const x = column * cell;
      const y = row * cell;
      const edgePoint = (edge: number): Point => {
        if (edge === 0) return [x + (cell * (level - topLeft)) / (topRight - topLeft), y];
        if (edge === 1) return [x + cell, y + (cell * (level - topRight)) / (bottomRight - topRight)];
        if (edge === 2) return [x + (cell * (level - bottomLeft)) / (bottomRight - bottomLeft), y + cell];
        return [x, y + (cell * (level - topLeft)) / (bottomLeft - topLeft)];
      };
      for (const [from, to] of segments) {
        const start = edgePoint(from);
        const end = edgePoint(to);
        context.moveTo(start[0], start[1]);
        context.lineTo(end[0], end[1]);
      }
    }
  }
  context.stroke();
}

// A bolt opens from the top, holds, then closes from the top. It is cut out of the map
// (Carbon over the contours) with a thin edge, never filled with colour.
function drawBolt(context: CanvasRenderingContext2D, bolt: Bolt, age: number, still: boolean, width: number) {
  const opened = still ? 1 : clamp(age / BOLT_OPEN);
  const closed = still ? 0 : clamp((age - BOLT_CLOSE_AT) / BOLT_CLOSE);
  const top = bolt.y - bolt.size * 0.6;
  const span = bolt.size * 1.2;
  const from = top + easeOut(closed) * span;
  const to = top + easeOut(opened) * span;
  if (to <= from) return;

  const scale = bolt.size / BOLT_HEIGHT;
  const cos = Math.cos(bolt.tilt);
  const sin = Math.sin(bolt.tilt);
  context.save();
  context.beginPath();
  context.rect(0, from, width, to - from);
  context.clip();
  context.beginPath();
  BOLT.forEach(([x, y], index) => {
    const dx = (x - BOLT_CENTER[0]) * scale;
    const dy = (y - BOLT_CENTER[1]) * scale;
    const px = bolt.x + dx * cos - dy * sin;
    const py = bolt.y + dx * sin + dy * cos;
    if (index === 0) context.moveTo(px, py);
    else context.lineTo(px, py);
  });
  context.closePath();
  context.fillStyle = CARBON;
  context.fill();
  context.lineJoin = "miter";
  context.lineWidth = 1.25;
  context.strokeStyle = still ? GRAPHITE_EDGE : VOLTAGE;
  context.stroke();
  context.restore();
}

// Bolt scatter: a slow Graphite contour map with small bolts from the wordmark cutting in and
// out of it at random spots, at most four at a time. The pointer raises a small hill.
// The contours are cached on a second canvas and only retraced on the drift tick or while the
// hill moves; bolts are drawn over that layer. With reduced motion, a few bolts are held open.
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasContext = canvasElement.getContext("2d", { alpha: true });
    const layerElement = document.createElement("canvas");
    const layerContext = layerElement.getContext("2d", { alpha: true });
    if (!canvasContext || !layerContext) return;

    const canvas = canvasElement;
    const context = canvasContext;
    const layer = layerElement;
    const layerCtx = layerContext;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = 1;
    let field = new Float32Array(0);
    let frameId = 0;
    let lastFrame = -Infinity;
    let lastContours = -Infinity;
    let nextBolt = 300;
    let bolts: Bolt[] = [];
    const hill = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, target: 0 };

    function drawContours(time: number, still: boolean) {
      const cell = width < 640 ? 20 : 14;
      const columns = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;
      if (field.length !== columns * rows) field = new Float32Array(columns * rows);

      const depth = still ? 2 : time * 0.00002;
      const hillRadius = 120 * 120;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * cell;
          const y = row * cell;
          let value = noise(x * 0.0022, y * 0.0022, depth) * 0.75 + noise(x * 0.006, y * 0.006, depth * 1.7) * 0.25;
          if (hill.strength > 0.001) {
            value += 0.14 * hill.strength * Math.exp(-((x - hill.x) ** 2 + (y - hill.y) ** 2) / hillRadius);
          }
          field[row * columns + column] = value;
        }
      }

      layerCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      layerCtx.clearRect(0, 0, width, height);
      let levelIndex = 0;
      for (let level = 0.2; level < 0.95; level += 0.045, levelIndex += 1) {
        const isIndexLine = levelIndex % 5 === 2;
        layerCtx.lineWidth = isIndexLine ? 1.4 : 1;
        layerCtx.strokeStyle = isIndexLine ? INDEX_LINE : GRAPHITE;
        traceContour(layerCtx, field, columns, rows, cell, level);
      }
    }

    function composite() {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(layer, 0, 0);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function drawStill() {
      drawContours(0, true);
      composite();
      for (const [x, y, size, tilt] of STILL_BOLTS) {
        drawBolt(context, { x: x * width, y: y * height, size: width < 640 ? size * 0.75 : size, tilt, born: 0 }, 0, true, width);
      }
    }

    function spawnBolt(time: number) {
      const size = width < 640 ? 48 + Math.random() * 30 : 64 + Math.random() * 50;
      let x = 0;
      let y = 0;
      for (let attempt = 0; attempt < 12; attempt += 1) {
        // On wide screens content cards cover the middle, so most bolts land in the side bands.
        const inSideBand = width >= 900 && Math.random() < 0.75;
        x = inSideBand
          ? width * (Math.random() < 0.5 ? 0.03 + Math.random() * 0.13 : 0.84 + Math.random() * 0.13)
          : width * (0.06 + Math.random() * 0.88);
        y = height * (0.1 + Math.random() * 0.8);
        if (bolts.every((bolt) => Math.hypot(bolt.x - x, bolt.y - y) > 160)) break;
      }
      bolts.push({ x, y, size, tilt: (Math.random() - 0.5) * 0.5, born: time });
    }

    function animate(time: number) {
      frameId = window.requestAnimationFrame(animate);

      hill.x += (hill.targetX - hill.x) * 0.12;
      hill.y += (hill.targetY - hill.y) * 0.12;
      hill.strength += (hill.target - hill.strength) * 0.08;
      const hillMoving =
        Math.abs(hill.targetX - hill.x) > 0.5 || Math.abs(hill.targetY - hill.y) > 0.5 || Math.abs(hill.target - hill.strength) > 0.005;

      // About 30 fps is plenty for the bolts and the hill.
      if (time - lastFrame < 32) return;
      lastFrame = time;

      bolts = bolts.filter((bolt) => time >= bolt.born && time - bolt.born < BOLT_LIFE);
      if (time >= nextBolt) {
        if (bolts.length < MAX_BOLTS) spawnBolt(time);
        nextBolt = time + 380 + Math.random() * 700;
      }

      if (hillMoving || time - lastContours >= DRIFT_TICK) {
        lastContours = time;
        drawContours(time, false);
      }
      composite();
      for (const bolt of bolts) drawBolt(context, bolt, time - bolt.born, false, width);
    }

    function start() {
      window.cancelAnimationFrame(frameId);
      if (reducedMotion.matches) {
        drawStill();
        return;
      }
      if (!document.hidden) {
        lastContours = -Infinity;
        frameId = window.requestAnimationFrame(animate);
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      for (const target of [canvas, layer]) {
        target.width = Math.round(width * pixelRatio);
        target.height = Math.round(height * pixelRatio);
      }
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      bolts = [];
      if (reducedMotion.matches) drawStill();
      else lastContours = -Infinity;
    }

    function handlePointerMove(event: PointerEvent) {
      if (coarsePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      if (hill.target === 0) {
        hill.x = event.clientX;
        hill.y = event.clientY;
      }
      hill.targetX = event.clientX;
      hill.targetY = event.clientY;
      hill.target = 1;
    }

    function handlePointerLeave() {
      hill.target = 0;
    }

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", start);
    reducedMotion.addEventListener("change", start);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", start);
      reducedMotion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div className="cosmic-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
