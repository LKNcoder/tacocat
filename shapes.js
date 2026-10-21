import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

// Balanced Row Partitioning for planar grids
export function generateBalancedGrid(out, count, width = 32, height = 20, altitude = 14) {
  const aspect = width / height;
  const R = Math.max(2, Math.round(Math.sqrt(count / aspect)));
  const Cbase = Math.floor(count / R);
  const remainder = count % R;

  let droneIdx = 0;
  for (let r = 0; r < R; r++) {
    const numInRow = r < remainder ? (Cbase + 1) : Cbase;
    const y = (r / (R - 1) - 0.5) * height + altitude;

    for (let c = 0; c < numInRow; c++) {
      const x = numInRow > 1 ? (c / (numInRow - 1) - 0.5) * width : 0;
      out[droneIdx * 3]     = x;
      out[droneIdx * 3 + 1] = y;
      out[droneIdx * 3 + 2] = 0;
      droneIdx++;
    }
  }
}

// Equidistant Vector Path Sampler
export function sampleSVGString(svgD, out, count, scale = 0.24, altitude = 14) {
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", svgD);
  const totalLength = p.getTotalLength();
  if (!totalLength) return;

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const rawPts = [];
  for (let i = 0; i < count; i++) {
    const pt = p.getPointAtLength((i / count) * totalLength);
    rawPts.push(pt);
    if (pt.x < minX) minX = pt.x; if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y; if (pt.y > maxY) maxY = pt.y;
  }
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  for (let i = 0; i < count; i++) {
    const pt = rawPts[i];
    out[i * 3]     = (pt.x - cx) * scale;
    out[i * 3 + 1] = altitude - (pt.y - cy) * scale;
    out[i * 3 + 2] = (i % 2 === 0 ? 1 : -1) * 1.2;
  }
}

// Typography & Text Formation Rasterizer
export function generateTextDrones(out, text, count, font = "Impact", scale = 0.28, altitude = 14) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `bold 64px ${font}, sans-serif`;
  ctx.fillText(text.trim() || "DRONE", 256, 64);

  const imgData = ctx.getImageData(0, 0, 512, 128).data;
  const validPixels = [];
  for (let y = 0; y < 128; y += 2) {
    for (let x = 0; x < 512; x += 2) {
      if (imgData[(y * 512 + x) * 4] > 110) {
        validPixels.push({ x: x - 256, y: 64 - y });
      }
    }
  }

  if (validPixels.length === 0) {
    for (let i = 0; i < count; i++) {
      out[i * 3]     = (Math.random() - 0.5) * 24;
      out[i * 3 + 1] = altitude;
      out[i * 3 + 2] = 0;
    }
    return;
  }

  const step = validPixels.length / count;
  for (let i = 0; i < count; i++) {
    const pt = validPixels[Math.floor(i * step) % validPixels.length];
    out[i * 3]     = pt.x * scale;
    out[i * 3 + 1] = altitude + pt.y * scale;
    out[i * 3 + 2] = (i % 2 === 0 ? 0.35 : -0.35);
  }
}

export const SHAPE_PAGES = [
  // Page 1: Act I — Winter Warmth
  [
    // 1. Intricate 6-Fold Crystalline Snowflake
    {
      id: "snowflake",
      drawSVG: `<line x1="12" y1="2" x2="12" y2="22" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke-width="1.5"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke-width="1.5"/><line x1="4.9" y1="19.1" x2="19.1" y2="4.9" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5;
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26);
          // Secondary chevrons
          const mx = cx + Math.cos(a) * 16, my = cy + Math.sin(a) * 16;
          const a1 = a + Math.PI / 3, a2 = a - Math.PI / 3;
          ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a1) * 8, my + Math.sin(a1) * 8);
          ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a2) * 8, my + Math.sin(a2) * 8);
          ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        const coreCount = Math.max(18, Math.round(n * 0.14));
        const spineCount = Math.round(n * 0.44);
        const chevronCount = Math.round(n * 0.32);
        const tipCount = n - coreCount - spineCount - chevronCount;
        let ptr = 0;

        // Central Hexagonal Core (Swatch 0: Ice White)
        for (let i = 0; i < coreCount; i++) {
          const a = (i / coreCount) * Math.PI * 2;
          const r = 2.4 + (i % 2 === 0 ? 0.8 : 0.0);
          out[ptr * 3]     = Math.cos(a) * r;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * r;
          out[ptr * 3 + 2] = (i % 2 === 0 ? 0.35 : -0.35);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // 6 Radial Spines (Swatch 0: Ice White)
        for (let i = 0; i < spineCount; i++) {
          const arm = i % 6;
          const a = (arm / 6) * Math.PI * 2;
          const dist = 3.2 + (Math.floor(i / 6) / (spineCount / 6)) * 12.0;
          out[ptr * 3]     = Math.cos(a) * dist;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * dist;
          out[ptr * 3 + 2] = (i % 3 === 0 ? 0.5 : -0.5);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Branching Chevron Needles (Swatch 1: Glacier Cyan)
        for (let i = 0; i < chevronCount; i++) {
          const arm = i % 6;
          const aSpine = (arm / 6) * Math.PI * 2;
          const tier = Math.floor(i / 12) % 2; // 2 chevron tiers along each spine
          const distBase = tier === 0 ? 6.5 : 10.5;
          const side = i % 2 === 0 ? 1 : -1;
          const aBranch = aSpine + side * (Math.PI / 3);
          const len = 1.0 + ((i % 4) / 4) * 3.5;

          const baseX = Math.cos(aSpine) * distBase;
          const baseY = Math.sin(aSpine) * distBase;
          out[ptr * 3]     = baseX + Math.cos(aBranch) * len;
          out[ptr * 3 + 1] = 14 + (baseY + Math.sin(aBranch) * len);
          out[ptr * 3 + 2] = side * 0.4;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Outer Twinkle Diamond Tips (Swatch 1: Glacier Cyan)
        for (let i = 0; i < tipCount; i++) {
          const arm = i % 6;
          const a = (arm / 6) * Math.PI * 2;
          const spread = ((i % 3) - 1) * 0.18;
          const r = 15.0 + Math.abs(spread) * 2.0;
          out[ptr * 3]     = Math.cos(a + spread) * r;
          out[ptr * 3 + 1] = 14 + Math.sin(a + spread) * r;
          out[ptr * 3 + 2] = (i % 2 === 0 ? 0.6 : -0.6);
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
      }
    },

    // 2. 3D Waving Snowman with Hat, Scarf, Carrot & Articulated Stick Arm
    {
      id: "wavingSnowman",
      drawSVG: `<circle cx="12" cy="17" r="5" stroke-width="1.5"/><circle cx="12" cy="10" r="3.5" stroke-width="1.5"/><circle cx="12" cy="5" r="2.2" stroke-width="1.5"/><rect x="9.5" y="1.5" width="5" height="2" stroke-width="1.5"/><line x1="8.5" y1="10" x2="5" y2="12" stroke-width="1.5"/><line x1="15.5" y1="10" x2="19" y2="7" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        // Base, Body, Head
        ctx.arc(cx, cy + 14, 14, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy + 1, 10, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy - 11, 7, 0, Math.PI * 2); ctx.stroke();
        // Top hat
        ctx.fillStyle = "#1b283a";
        ctx.fillRect(cx - 10, cy - 19, 20, 3);
        ctx.fillRect(cx - 6, cy - 28, 12, 9);
        ctx.strokeRect(cx - 10, cy - 19, 20, 3);
        ctx.strokeRect(cx - 6, cy - 28, 12, 9);
        // Waving Right Arm
        ctx.beginPath(); ctx.moveTo(cx + 9, cy); ctx.lineTo(cx + 20, cy - 12); ctx.stroke();
        // Static Left Arm
        ctx.beginPath(); ctx.moveTo(cx - 9, cy); ctx.lineTo(cx - 18, cy + 4); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        const baseCount = Math.round(n * 0.28);
        const midCount = Math.round(n * 0.22);
        const headCount = Math.round(n * 0.16);
        const hatCount = Math.round(n * 0.12);
        const scarfCount = Math.round(n * 0.08);
        const carrotCount = Math.round(n * 0.04);
        const armCount = n - baseCount - midCount - headCount - hatCount - scarfCount - carrotCount;
        let ptr = 0;

        // Base Sphere (Swatch 0: Snow White)
        for (let i = 0; i < baseCount; i++) {
          const y = 1 - (i / (baseCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y) * 5.8;
          const t = i * GOLDEN;
          out[ptr * 3]     = r * Math.cos(t);
          out[ptr * 3 + 1] = 6.2 + y * 5.8;
          out[ptr * 3 + 2] = r * Math.sin(t);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Middle Sphere (Swatch 0: Snow White)
        for (let i = 0; i < midCount; i++) {
          const y = 1 - (i / (midCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y) * 4.2;
          const t = i * GOLDEN;
          out[ptr * 3]     = r * Math.cos(t);
          out[ptr * 3 + 1] = 13.8 + y * 4.2;
          out[ptr * 3 + 2] = r * Math.sin(t);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Head Sphere (Swatch 0: Snow White)
        for (let i = 0; i < headCount; i++) {
          const y = 1 - (i / (headCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y) * 2.8;
          const t = i * GOLDEN;
          out[ptr * 3]     = r * Math.cos(t);
          out[ptr * 3 + 1] = 19.8 + y * 2.8;
          out[ptr * 3 + 2] = r * Math.sin(t);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Top Hat: Brim + Cylinder Crown (Swatch 1: Charcoal Black)
        for (let i = 0; i < hatCount; i++) {
          const u = i / hatCount;
          if (u < 0.4) {
            // Flat wide brim disk
            const angle = (u / 0.4) * Math.PI * 2;
            const r = 1.0 + Math.sqrt(u / 0.4) * 3.0;
            out[ptr * 3]     = Math.cos(angle) * r;
            out[ptr * 3 + 1] = 22.4;
            out[ptr * 3 + 2] = Math.sin(angle) * r;
          } else {
            // Cylindrical vertical crown
            const cu = (u - 0.4) / 0.6;
            const angle = cu * Math.PI * 8;
            const h = cu * 3.8;
            out[ptr * 3]     = Math.cos(angle) * 2.2;
            out[ptr * 3 + 1] = 22.4 + h;
            out[ptr * 3 + 2] = Math.sin(angle) * 2.2;
          }
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Scarf: Torus ring with trailing tail (Swatch 2: Festive Red)
        for (let i = 0; i < scarfCount; i++) {
          const u = i / scarfCount;
          if (u < 0.7) {
            const a = (u / 0.7) * Math.PI * 2;
            out[ptr * 3]     = Math.cos(a) * 3.4;
            out[ptr * 3 + 1] = 17.4 + Math.sin(a * 2) * 0.4;
            out[ptr * 3 + 2] = Math.sin(a) * 3.4;
          } else {
            // Trailing scarf tail hanging down chest
            const tu = (u - 0.7) / 0.3;
            out[ptr * 3]     = 1.4 + tu * 0.6;
            out[ptr * 3 + 1] = 17.2 - tu * 4.5;
            out[ptr * 3 + 2] = 3.6 - tu * 0.8;
          }
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }

        // Carrot Nose (Swatch 3: Orange Carrot)
        for (let i = 0; i < carrotCount; i++) {
          const u = i / carrotCount;
          out[ptr * 3]     = (Math.random() - 0.5) * (1 - u) * 0.5;
          out[ptr * 3 + 1] = 19.8 + (Math.random() - 0.5) * (1 - u) * 0.5;
          out[ptr * 3 + 2] = 2.8 + u * 2.6; // Protrudes forward in +Z
          if (swatchOut) swatchOut[ptr] = 3;
          ptr++;
        }

        // Arms: Left Static Stick + Right Waving Arm (Swatch 4: Timber Brown)
        const halfArm = Math.floor(armCount / 2);
        // Left Arm (Static resting stick)
        for (let i = 0; i < halfArm; i++) {
          const u = i / halfArm;
          out[ptr * 3]     = -3.8 - u * 5.0;
          out[ptr * 3 + 1] = 14.5 + u * 1.5;
          out[ptr * 3 + 2] = (Math.random() - 0.5) * 0.6;
          if (swatchOut) swatchOut[ptr] = 4;
          ptr++;
        }
        // Right Arm (Articulated Waving Arm: Starts at X=+3.8, tagged for live animation)
        for (let i = halfArm; i < armCount; i++) {
          const u = (i - halfArm) / (armCount - halfArm);
          out[ptr * 3]     = 3.8 + u * 6.2;
          out[ptr * 3 + 1] = 14.5 + u * 5.8;
          out[ptr * 3 + 2] = (Math.random() - 0.5) * 0.6;
          if (swatchOut) swatchOut[ptr] = 4;
          ptr++;
        }
      }
    },

    // 3. Upgraded 3D Isometric Gift Box with Interlocking Ribbon & Top Bow
    {
      id: "giftBox3D",
      drawSVG: `<polygon points="12,2 22,7 12,12 2,7" stroke-width="1.5"/><polygon points="2,7 12,12 12,22 2,17" stroke-width="1.5"/><polygon points="22,7 12,12 12,22 22,17" stroke-width="1.5"/><line x1="12" y1="2" x2="12" y2="12" stroke-width="2"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        // Isometric Cube Wireframe
        ctx.moveTo(cx, cy - 18); ctx.lineTo(cx + 20, cy - 7); ctx.lineTo(cx, cy + 4); ctx.lineTo(cx - 20, cy - 7); ctx.closePath();
        ctx.moveTo(cx - 20, cy - 7); ctx.lineTo(cx - 20, cy + 15); ctx.lineTo(cx, cy + 26); ctx.lineTo(cx, cy + 4);
        ctx.moveTo(cx + 20, cy - 7); ctx.lineTo(cx + 20, cy + 15); ctx.lineTo(cx, cy + 26); ctx.stroke();
        // Ribbon Cross
        ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx, cy - 18); ctx.lineTo(cx, cy + 26); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx - 5, cy - 22, 6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + 5, cy - 22, 6, 0, Math.PI * 2); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        const boxCount = Math.round(n * 0.62);
        const ribbonCount = Math.round(n * 0.24);
        const bowCount = n - boxCount - ribbonCount;
        let ptr = 0;

        const half = 6.2;
        const boxCenterY = 13.5;

        // 3D Cube Surfaces & Edges (Swatch 0: Royal Velvet Crimson)
        for (let i = 0; i < boxCount; i++) {
          const face = i % 6;
          const u = (Math.random() - 0.5) * 2 * half;
          const v = (Math.random() - 0.5) * 2 * half;

          let x = 0, y = 0, z = 0;
          if (face === 0) { x = half; y = boxCenterY + u; z = v; }
          else if (face === 1) { x = -half; y = boxCenterY + u; z = v; }
          else if (face === 2) { x = u; y = boxCenterY + half; z = v; } // Top
          else if (face === 3) { x = u; y = boxCenterY - half; z = v; } // Bottom
          else if (face === 4) { x = u; y = boxCenterY + v; z = half; }
          else { x = u; y = boxCenterY + v; z = -half; }

          out[ptr * 3]     = x;
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = z;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Interlocking Orthogonal Ribbon Bands (Swatch 1: Metallic Gold)
        for (let i = 0; i < ribbonCount; i++) {
          const isVert = i % 2 === 0;
          const theta = (i / ribbonCount) * Math.PI * 4;
          if (isVert) {
            // Vertical band wrapping Z-Y perimeter
            const y = boxCenterY + Math.sin(theta) * (half + 0.3);
            const z = Math.cos(theta) * (half + 0.3);
            out[ptr * 3]     = (Math.random() - 0.5) * 1.8;
            out[ptr * 3 + 1] = y;
            out[ptr * 3 + 2] = z;
          } else {
            // Horizontal band wrapping X-Z perimeter
            const x = Math.cos(theta) * (half + 0.3);
            const z = Math.sin(theta) * (half + 0.3);
            out[ptr * 3]     = x;
            out[ptr * 3 + 1] = boxCenterY + (Math.random() - 0.5) * 1.8;
            out[ptr * 3 + 2] = z;
          }
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Flared Top 3D Bow Loops (Swatch 1: Metallic Gold)
        for (let i = 0; i < bowCount; i++) {
          const side = i % 2 === 0 ? 1 : -1;
          const u = (i / bowCount) * Math.PI * 2;
          const r = 2.8 * Math.sin(u);
          const bowX = side * (Math.abs(Math.cos(u)) * 3.8 + 0.8);
          const bowY = (boxCenterY + half + 0.4) + Math.abs(r);
          const bowZ = Math.sin(u * 2) * 1.6;

          out[ptr * 3]     = bowX;
          out[ptr * 3 + 1] = bowY;
          out[ptr * 3 + 2] = bowZ;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
      }
    },

    // 4. Steaming Hot Cocoa Mug with Peppermint Stirrer & Vapor Trails
    {
      id: "hotCocoaMug",
      drawSVG: `<path d="M5 6 L5 18 A 3 3 0 0 0 8 21 L14 21 A 3 3 0 0 0 17 18 L17 6 Z M17 9 H20 A 2 2 0 0 1 22 11 L22 15 A 2 2 0 0 1 20 17 H17" stroke-width="1.5"/><path d="M8 2 C8 4, 9 4, 9 6 M12 1 C12 3, 13 3, 13 5 M15 2 C15 4, 16 4, 16 6" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        // Mug Body & Base
        ctx.strokeRect(cx - 16, cy - 8, 32, 26);
        // Handle
        ctx.arc(cx - 16, cy + 5, 8, Math.PI * 0.5, Math.PI * 1.5, false); ctx.stroke();
        // Steam Plumes
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 12); ctx.bezierCurveTo(cx - 12, cy - 20, cx - 4, cy - 24, cx - 8, cy - 30);
        ctx.moveTo(cx, cy - 12); ctx.bezierCurveTo(cx - 4, cy - 20, cx + 4, cy - 24, cx, cy - 30);
        ctx.moveTo(cx + 8, cy - 12); ctx.bezierCurveTo(cx + 4, cy - 20, cx + 12, cy - 24, cx + 8, cy - 30);
        ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        const bodyCount = Math.round(n * 0.45);
        const handleCount = Math.round(n * 0.12);
        const marshmallowCount = Math.round(n * 0.15);
        const stirrerCount = Math.round(n * 0.10);
        const steamCount = n - bodyCount - handleCount - marshmallowCount - stirrerCount;
        let ptr = 0;

        const mugBaseY = 5.0;
        const mugHeight = 11.5;
        const mugRadius = 6.2;

        // Cylindrical Ceramic Mug Body (Swatch 0: Ceramic Crimson)
        for (let i = 0; i < bodyCount; i++) {
          const u = i / bodyCount;
          const theta = u * Math.PI * 18;
          const y = mugBaseY + u * mugHeight;
          out[ptr * 3]     = Math.cos(theta) * mugRadius;
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = Math.sin(theta) * mugRadius;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Curved Mug Handle (Swatch 0: Ceramic Crimson)
        for (let i = 0; i < handleCount; i++) {
          const angle = (i / handleCount) * Math.PI - Math.PI / 2;
          const hRadius = 4.2;
          out[ptr * 3]     = -mugRadius - Math.cos(angle) * hRadius;
          out[ptr * 3 + 1] = (mugBaseY + mugHeight * 0.5) + Math.sin(angle) * hRadius * 1.3;
          out[ptr * 3 + 2] = (Math.random() - 0.5) * 1.2;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Marshmallow Foam Surface (Swatch 1: Cream White)
        for (let i = 0; i < marshmallowCount; i++) {
          const r = Math.sqrt(Math.random()) * (mugRadius - 0.8);
          const theta = Math.random() * Math.PI * 2;
          out[ptr * 3]     = Math.cos(theta) * r;
          out[ptr * 3 + 1] = (mugBaseY + mugHeight - 0.4) + Math.sin(i * 1.5) * 0.6;
          out[ptr * 3 + 2] = Math.sin(theta) * r;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Diagonal Peppermint Candy Cane Stirrer (Swatch 2: Peppermint Red)
        for (let i = 0; i < stirrerCount; i++) {
          const u = i / stirrerCount;
          out[ptr * 3]     = 1.5 + u * 5.5;
          out[ptr * 3 + 1] = (mugBaseY + mugHeight - 1.0) + u * 7.5;
          out[ptr * 3 + 2] = 1.0 + u * 2.0;
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }

        // Rising Steam Trails (Swatch 3: Steam Cyan/White)
        for (let i = 0; i < steamCount; i++) {
          const plume = i % 3;
          const u = Math.floor(i / 3) / (steamCount / 3);
          const xOffset = (plume - 1) * 3.5;
          const y = (mugBaseY + mugHeight + 1.2) + u * 12.0;
          const wave = Math.sin(u * Math.PI * 3 + plume) * 1.6;

          out[ptr * 3]     = xOffset + wave;
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = (Math.random() - 0.5) * 2.2;
          if (swatchOut) swatchOut[ptr] = 3;
          ptr++;
        }
      }
    }
  ],

  // Page 2: Christmas Tree Showcase & Classic Emblems
  [
    // Christmas Tree with Cones and Star
    {
      id: "xmasTree",
      drawSVG: `<polygon points="12,1 13,3 15,3 13.5,4.5 14,6.5 12,5 10,6.5 10.5,4.5 9,3 11,3" fill="#70e6ff"/><polygon points="12,6 15,10 13.5,10 17,14 15,14 19,19 5,19 9,14 7,14 10.5,10 9,10" stroke-width="1.5"/><rect x="10.5" y="19" width="3" height="4" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.fillStyle = "#ffd700";
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          const aInner = a + Math.PI / 5;
          const ox = cx + Math.cos(a) * 6, oy = (cy - 24) + Math.sin(a) * 6;
          const ix = cx + Math.cos(aInner) * 2.5, iy = (cy - 24) + Math.sin(aInner) * 2.5;
          if (i === 0) ctx.moveTo(ox, oy); else ctx.lineTo(ox, oy);
          ctx.lineTo(ix, iy);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy - 18); ctx.lineTo(cx + 8, cy - 10); ctx.lineTo(cx + 5, cy - 10);
        ctx.lineTo(cx + 14, cy - 1); ctx.lineTo(cx + 9, cy - 1);
        ctx.lineTo(cx + 20, cy + 14); ctx.lineTo(cx - 20, cy + 14);
        ctx.lineTo(cx - 9, cy - 1); ctx.lineTo(cx - 14, cy - 1);
        ctx.lineTo(cx - 5, cy - 10); ctx.lineTo(cx - 8, cy - 10); ctx.closePath();
        ctx.strokeRect(cx - 3.5, cy + 14, 7, 8); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        const starCount = Math.max(12, Math.round(n * 0.07));
        const trunkCount = Math.max(16, Math.round(n * 0.12));
        const foliageCount = n - starCount - trunkCount;
        let ptr = 0;

        const starCenterY = 24.5;
        const starR = 2.2;
        for (let i = 0; i < starCount; i++) {
          const angle = (i / starCount) * Math.PI * 4;
          const isTip = i % 2 === 0;
          const r = isTip ? starR : starR * 0.45;
          const zDepth = (i % 3 === 0 ? 0.7 : -0.7) * (1 - (r / starR) * 0.5);

          out[ptr * 3]     = Math.cos(angle) * r;
          out[ptr * 3 + 1] = starCenterY + Math.sin(angle) * r;
          out[ptr * 3 + 2] = zDepth;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        const tiers = [
          { count: Math.round(foliageCount * 0.25), yBase: 17.5, h: 6.5, rBase: 4.2 },
          { count: Math.round(foliageCount * 0.35), yBase: 12.0, h: 7.5, rBase: 7.2 },
          { count: foliageCount - Math.round(foliageCount * 0.25) - Math.round(foliageCount * 0.35), yBase: 6.5, h: 8.5, rBase: 10.2 }
        ];

        for (const tier of tiers) {
          for (let i = 0; i < tier.count; i++) {
            const v = Math.sqrt((i + 0.5) / tier.count);
            const y = tier.yBase + v * tier.h;
            let r = tier.rBase * (1.0 - v * 0.92);
            const theta = i * GOLDEN;

            const isLight = (i % 9 === 2 || i % 9 === 7);
            if (isLight) {
              r *= 1.06;
              if (swatchOut) swatchOut[ptr] = (i % 2 === 0) ? 3 : 4;
            } else {
              if (swatchOut) swatchOut[ptr] = 1;
            }

            out[ptr * 3]     = Math.cos(theta) * r;
            out[ptr * 3 + 1] = y;
            out[ptr * 3 + 2] = Math.sin(theta) * r;
            ptr++;
          }
        }

        const trunkYBase = 2.0;
        const trunkHeight = 5.0;
        const trunkRadius = 1.8;

        for (let i = 0; i < trunkCount; i++) {
          const u = i / trunkCount;
          const y = trunkYBase + u * trunkHeight;
          const theta = i * GOLDEN;

          out[ptr * 3]     = Math.cos(theta) * trunkRadius;
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = Math.sin(theta) * trunkRadius;
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }
      }
    },
    {
      id: "champagneFlutes",
      drawSVG: `<path d="M6 3 L10 11 L10 17 M8 17 L12 17 M10 6 L6 6 M18 3 L14 11 L14 17 M12 17 L16 17 M14 6 L18 6" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.moveTo(cx - 14, cy - 20); ctx.lineTo(cx - 6, cy - 4); ctx.lineTo(cx - 6, cy + 14);
        ctx.moveTo(cx - 12, cy + 14); ctx.lineTo(cx, cy + 14);
        ctx.moveTo(cx + 14, cy - 20); ctx.lineTo(cx + 6, cy - 4); ctx.lineTo(cx + 6, cy + 14);
        ctx.moveTo(cx, cy + 14); ctx.lineTo(cx + 12, cy + 14);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 50 30 L 80 100 L 80 170 M 60 170 L 100 170 M 150 30 L 120 100 L 120 170 M 100 170 L 140 170", out, n, 0.22, 14)
    },
    {
      id: "countdownClock",
      drawSVG: `<circle cx="12" cy="12" r="9" stroke-width="1.5"/><polyline points="12,7 12,12 15,10" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.moveTo(cx, cy - 16); ctx.lineTo(cx, cy); ctx.lineTo(cx + 10, cy - 8);
        ctx.stroke();
      },
      gen: (out, n) => {
        const rimCount = Math.floor(n * 0.7);
        for (let i = 0; i < rimCount; i++) {
          const a = (i / rimCount) * Math.PI * 2;
          out[i * 3]     = Math.cos(a) * 12;
          out[i * 3 + 1] = 14 + Math.sin(a) * 12;
          out[i * 3 + 2] = 0;
        }
        for (let i = rimCount; i < n; i++) {
          const u = (i - rimCount) / (n - rimCount);
          if (u < 0.6) {
            out[i * 3]     = 0;
            out[i * 3 + 1] = 14 + (u / 0.6) * 8;
            out[i * 3 + 2] = 0;
          } else {
            const handU = (u - 0.6) / 0.4;
            out[i * 3]     = handU * 6;
            out[i * 3 + 1] = 14 + handU * 4;
            out[i * 3 + 2] = 0;
          }
        }
      }
    },
    {
      id: "fireworkBurst",
      drawSVG: `<circle cx="12" cy="12" r="2" fill="#70e6ff"/><line x1="12" y1="3" x2="12" y2="7" stroke-width="1.5"/><line x1="12" y1="17" x2="12" y2="21" stroke-width="1.5"/><line x1="3" y1="12" x2="7" y2="12" stroke-width="1.5"/><line x1="17" y1="12" x2="21" y2="12" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2;
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(a) * 6, cy + Math.sin(a) * 6);
          ctx.lineTo(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26);
          ctx.stroke();
        }
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n;
          const a = i * GOLDEN;
          const r = Math.sqrt(u) * 14;
          out[i * 3]     = Math.cos(a) * r;
          out[i * 3 + 1] = 14 + Math.sin(a) * r;
          out[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
        }
      }
    }
  ]
];

export function findShapeById(id) {
  for (const page of SHAPE_PAGES) {
    for (const shape of page) {
      if (shape.id === id) return shape;
    }
  }
  return SHAPE_PAGES[0][0];
}
