"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

const TAU = Math.PI * 2;
const VOLTAGE = "rgb(255, 212, 0)";
const GRAPHITE = "rgba(140, 142, 141, 0.24)";
const GRAPHITE_RIFT = "rgba(140, 142, 141, 0.6)";
const INDEX_LINE = "rgba(238, 234, 226, 0.3)";

// The Rift centreline from thunderboy-rift-primary.svg (480 x 960), as fractions of that box.
const RIFT: Point[] = [
  [0.756, 0],
  [0.51, 0.458],
  [0.698, 0.427],
  [0.429, 1],
];

const CUT_PERIOD = 9000;
const FIRST_CUT = 1200;
const CUT_LENGTH = 2300;
const MAX_SLIP = 18;
const DRIFT_TICK = 120;

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

// How far the cut has drawn in, pulled away, and how far the far side has slipped.
function cutPhase(elapsed: number) {
  let shift = 0;
  if (elapsed >= 0 && elapsed < 450) shift = easeOut(elapsed / 450);
  else if (elapsed >= 450 && elapsed < 1100) shift = 1;
  else if (elapsed >= 1100) shift = Math.max(0, 1 - easeOut((elapsed - 1100) / 1100));
  return { draw: clamp(elapsed / 450), erase: clamp((elapsed - 1100) / 550), shift };
}

function riftPoints(width: number, height: number): Point[] {
  const left = width * 0.22;
  const span = width * 0.62;
  return RIFT.map(([x, y]) => [left + x * span, -height * 0.04 + y * height * 1.08]);
}

// A point is left of the cut when a ray to its right crosses the Rift an odd number of times.
function isLeftOfRift(points: Point[], x: number, y: number) {
  let crossings = 0;
  for (let index = 0; index < points.length - 1; index += 1) {
    const [ax, ay] = points[index];
    const [bx, by] = points[index + 1];
    if (ay > y !== by > y && ax + ((y - ay) / (by - ay)) * (bx - ax) > x) crossings += 1;
  }
  return crossings % 2 === 1;
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

function strokeRift(context: CanvasRenderingContext2D, points: Point[], draw: number, erase: number, color: string) {
  if (draw <= erase) return;
  const lengths = points.slice(1).map((point, index) => Math.hypot(point[0] - points[index][0], point[1] - points[index][1]));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const pointAt = (distance: number): Point => {
    let remaining = distance;
    for (let index = 0; index < lengths.length; index += 1) {
      if (remaining <= lengths[index]) {
        const t = remaining / lengths[index];
        return [lerp(points[index][0], points[index + 1][0], t), lerp(points[index][1], points[index + 1][1], t)];
      }
      remaining -= lengths[index];
    }
    return points[points.length - 1];
  };

  const from = easeOut(erase) * total;
  const to = easeOut(draw) * total;
  const start = pointAt(from);
  const end = pointAt(to);
  context.beginPath();
  context.moveTo(start[0], start[1]);
  let travelled = 0;
  for (let index = 0; index < lengths.length; index += 1) {
    travelled += lengths[index];
    if (travelled > from && travelled < to) context.lineTo(points[index + 1][0], points[index + 1][1]);
  }
  context.lineTo(end[0], end[1]);
  context.lineJoin = "miter";
  context.lineCap = "butt";
  context.lineWidth = 1.5;
  context.strokeStyle = color;
  context.stroke();
}

// Fault line: a slow Graphite contour map that the Rift cuts every few seconds.
// The ground beyond the cut slips along it, then settles. The pointer raises a small hill.
// Voltage appears only in the cut; with reduced motion the map is drawn once, already slipped.
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
    let field = new Float32Array(0);
    let frameId = 0;
    let lastDraw = -Infinity;
    const hill = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, target: 0 };

    function draw(time: number, still: boolean) {
      const cell = width < 640 ? 20 : 14;
      const columns = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;
      if (field.length !== columns * rows) field = new Float32Array(columns * rows);

      const points = riftPoints(width, height);
      const directionX = points[3][0] - points[0][0];
      const directionY = points[3][1] - points[0][1];
      const directionLength = Math.hypot(directionX, directionY);

      const elapsed = (time - FIRST_CUT) % CUT_PERIOD;
      const phase = still ? { draw: 1, erase: 0, shift: 0.6 } : cutPhase(elapsed);
      const slip = MAX_SLIP * phase.shift;
      const slipX = (directionX / directionLength) * slip;
      const slipY = (directionY / directionLength) * slip;
      const depth = still ? 2 : time * 0.00002;
      const hillRadius = 120 * 120;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const gridX = column * cell;
          const gridY = row * cell;
          let x = gridX;
          let y = gridY;
          if (slip > 0 && !isLeftOfRift(points, x, y)) {
            x -= slipX;
            y -= slipY;
          }
          let value = noise(x * 0.0022, y * 0.0022, depth) * 0.75 + noise(x * 0.006, y * 0.006, depth * 1.7) * 0.25;
          if (hill.strength > 0.001) {
            value += 0.14 * hill.strength * Math.exp(-((gridX - hill.x) ** 2 + (gridY - hill.y) ** 2) / hillRadius);
          }
          field[row * columns + column] = value;
        }
      }

      context.clearRect(0, 0, width, height);
      let levelIndex = 0;
      for (let level = 0.2; level < 0.95; level += 0.045, levelIndex += 1) {
        const isIndexLine = levelIndex % 5 === 2;
        context.lineWidth = isIndexLine ? 1.4 : 1;
        context.strokeStyle = isIndexLine ? INDEX_LINE : GRAPHITE;
        traceContour(context, field, columns, rows, cell, level);
      }
      strokeRift(context, points, phase.draw, phase.erase, still ? GRAPHITE_RIFT : VOLTAGE);
    }

    // Redraw only when something changed: a cut is running, the hill is moving, or the drift tick is due.
    function animate(time: number) {
      frameId = window.requestAnimationFrame(animate);
      hill.x += (hill.targetX - hill.x) * 0.12;
      hill.y += (hill.targetY - hill.y) * 0.12;
      hill.strength += (hill.target - hill.strength) * 0.08;
      const hillMoving =
        Math.abs(hill.targetX - hill.x) > 0.5 || Math.abs(hill.targetY - hill.y) > 0.5 || Math.abs(hill.target - hill.strength) > 0.005;

      const elapsed = (time - FIRST_CUT) % CUT_PERIOD;
      const cutRunning = elapsed >= 0 && elapsed < CUT_LENGTH;
      const busy = cutRunning || hillMoving;

      // Busy frames run at about 30 fps; idle frames only at the drift tick.
      if (time - lastDraw < (busy ? 32 : DRIFT_TICK)) return;
      lastDraw = time;
      draw(time, false);
    }

    function start() {
      window.cancelAnimationFrame(frameId);
      if (reducedMotion.matches) {
        draw(0, true);
        return;
      }
      if (!document.hidden) frameId = window.requestAnimationFrame(animate);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (reducedMotion.matches) draw(0, true);
      else lastDraw = -Infinity;
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
