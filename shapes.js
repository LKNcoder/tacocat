import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

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
  // Page 1: Act I — Winter Warmth (Architectural Wireframe Edition)
  [
    // 1. High-Definition 6-Fold Dendritic Snowflake
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
          const mx = cx + Math.cos(a) * 16, my = cy + Math.sin(a) * 16;
          const a1 = a + Math.PI / 3, a2 = a - Math.PI / 3;
          ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a1) * 8, my + Math.sin(a1) * 8);
          ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a2) * 8, my + Math.sin(a2) * 8);
          ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;
        // Central Double Hexagonal Jewel (Swatch 0: Brilliant White)
        const innerHexCount = Math.round(n * 0.08);
        const outerHexCount = Math.round(n * 0.12);
        for (let i = 0; i < innerHexCount; i++) {
          const a = (i / innerHexCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 2.2;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * 2.2;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }
        for (let i = 0; i < outerHexCount; i++) {
          const a = (i / outerHexCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 4.5;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * 4.5;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 1; // Glacial Cyan
          ptr++;
        }

        // 6 Main Primary Spines (Swatch 0: White)
        const spineCount = Math.round(n * 0.36);
        for (let i = 0; i < spineCount; i++) {
          const arm = i % 6;
          const a = (arm / 6) * Math.PI * 2;
          const u = Math.floor(i / 6) / (spineCount / 6);
          const r = 4.8 + u * 12.0;
          out[ptr * 3]     = Math.cos(a) * r;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * r;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Dual Chevron Dendrites per Arm (Swatch 1: Cyan)
        const chevronCount = Math.round(n * 0.32);
        for (let i = 0; i < chevronCount; i++) {
          const arm = i % 6;
          const aSpine = (arm / 6) * Math.PI * 2;
          const tier = Math.floor(i / 12) % 2; // Two distinct chevron tiers
          const baseR = tier === 0 ? 8.2 : 12.6;
          const side = (i % 2 === 0 ? 1 : -1);
          const aBranch = aSpine + side * (Math.PI / 3);
          const branchLen = 0.8 + ((i % 4) / 4) * 3.8;

          out[ptr * 3]     = Math.cos(aSpine) * baseR + Math.cos(aBranch) * branchLen;
          out[ptr * 3 + 1] = 14 + Math.sin(aSpine) * baseR + Math.sin(aBranch) * branchLen;
          out[ptr * 3 + 2] = side * 0.3;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Spearhead Tips & Sub-Barbs
        while (ptr < n) {
          const arm = ptr % 6;
          const a = (arm / 6) * Math.PI * 2;
          const offset = ((ptr % 3) - 1) * 0.22;
          out[ptr * 3]     = Math.cos(a + offset) * 17.2;
          out[ptr * 3 + 1] = 14 + Math.sin(a + offset) * 17.2;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
      }
    },

    // 2. Wireframe Latitude Snowman with Blue Hat, Coherent Scarf, Orange Carrot & Mitten Hand
    {
      id: "wavingSnowman",
      drawSVG: `<circle cx="12" cy="17" r="5" stroke-width="1.5"/><circle cx="12" cy="10" r="3.5" stroke-width="1.5"/><circle cx="12" cy="5" r="2.2" stroke-width="1.5"/><rect x="9.5" y="1.5" width="5" height="2" stroke-width="1.5"/><line x1="8.5" y1="10" x2="5" y2="12" stroke-width="1.5"/><line x1="15.5" y1="10" x2="19" y2="7" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.arc(cx, cy + 14, 14, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy + 1, 10, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy - 11, 7, 0, Math.PI * 2); ctx.stroke();
        // Blue Top Hat
        ctx.fillStyle = "#1976d2";
        ctx.fillRect(cx - 10, cy - 19, 20, 3);
        ctx.fillRect(cx - 6, cy - 28, 12, 9);
        // Orange Carrot
        ctx.fillStyle = "#ff6d00";
        ctx.beginPath(); ctx.moveTo(cx, cy - 12); ctx.lineTo(cx + 8, cy - 10); ctx.lineTo(cx, cy - 8); ctx.fill();
        // Arms
        ctx.strokeStyle = "#8d6e63"; ctx.beginPath();
        ctx.moveTo(cx - 9, cy); ctx.lineTo(cx - 18, cy + 4);
        ctx.moveTo(cx + 9, cy); ctx.lineTo(cx + 20, cy - 12); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;

        // Structured Horizontal Wireframe Rings for Spheres (Swatch 0: Snow White)
        // Base Sphere: 5 parallel circular latitude rings
        const baseRings = [
          { y: 2.2, r: 3.2, count: Math.round(n * 0.04) },
          { y: 4.2, r: 5.2, count: Math.round(n * 0.06) },
          { y: 6.5, r: 6.0, count: Math.round(n * 0.07) },
          { y: 8.8, r: 5.2, count: Math.round(n * 0.06) },
          { y: 10.8, r: 3.2, count: Math.round(n * 0.04) }
        ];
        for (const ring of baseRings) {
          for (let i = 0; i < ring.count; i++) {
            const a = (i / ring.count) * Math.PI * 2;
            out[ptr * 3]     = Math.cos(a) * ring.r;
            out[ptr * 3 + 1] = ring.y;
            out[ptr * 3 + 2] = Math.sin(a) * ring.r;
            if (swatchOut) swatchOut[ptr] = 0;
            ptr++;
          }
        }

        // Chest Sphere: 4 parallel latitude rings
        const midRings = [
          { y: 12.0, r: 3.0, count: Math.round(n * 0.04) },
          { y: 14.0, r: 4.4, count: Math.round(n * 0.06) },
          { y: 15.8, r: 4.4, count: Math.round(n * 0.06) },
          { y: 17.4, r: 3.0, count: Math.round(n * 0.04) }
        ];
        for (const ring of midRings) {
          for (let i = 0; i < ring.count; i++) {
            const a = (i / ring.count) * Math.PI * 2;
            out[ptr * 3]     = Math.cos(a) * ring.r;
            out[ptr * 3 + 1] = ring.y;
            out[ptr * 3 + 2] = Math.sin(a) * ring.r;
            if (swatchOut) swatchOut[ptr] = 0;
            ptr++;
          }
        }

        // Head Sphere: 3 parallel latitude rings
        const headRings = [
          { y: 18.8, r: 2.2, count: Math.round(n * 0.03) },
          { y: 20.2, r: 3.0, count: Math.round(n * 0.04) },
          { y: 21.6, r: 2.2, count: Math.round(n * 0.03) }
        ];
        for (const ring of headRings) {
          for (let i = 0; i < ring.count; i++) {
            const a = (i / ring.count) * Math.PI * 2;
            out[ptr * 3]     = Math.cos(a) * ring.r;
            out[ptr * 3 + 1] = ring.y;
            out[ptr * 3 + 2] = Math.sin(a) * ring.r;
            if (swatchOut) swatchOut[ptr] = 0;
            ptr++;
          }
        }

        // Blue Top Hat Wireframe (Swatch 1: Royal Blue)
        // Flat Brim Disk
        const brimCount = Math.round(n * 0.08);
        for (let i = 0; i < brimCount; i++) {
          const a = (i / brimCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 4.2;
          out[ptr * 3 + 1] = 22.4;
          out[ptr * 3 + 2] = Math.sin(a) * 4.2;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
        // Vertical Cylinder Crown Rings
        const crownRings = [23.5, 25.0, 26.5];
        for (const cy of crownRings) {
          const ringC = Math.round(n * 0.03);
          for (let i = 0; i < ringC; i++) {
            const a = (i / ringC) * Math.PI * 2;
            out[ptr * 3]     = Math.cos(a) * 2.4;
            out[ptr * 3 + 1] = cy;
            out[ptr * 3 + 2] = Math.sin(a) * 2.4;
            if (swatchOut) swatchOut[ptr] = 1;
            ptr++;
          }
        }

        // Coherent Double-Ring Scarf with Hanging Tassel (Swatch 2: Crimson Red)
        const scarfRingCount = Math.round(n * 0.07);
        for (let i = 0; i < scarfRingCount; i++) {
          const a = (i / scarfRingCount) * Math.PI * 2;
          const tier = (i % 2 === 0 ? 0 : 0.6);
          out[ptr * 3]     = Math.cos(a) * 3.6;
          out[ptr * 3 + 1] = 17.6 + tier;
          out[ptr * 3 + 2] = Math.sin(a) * 3.6;
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }
        // Clean hanging scarf tail
        const scarfTailCount = Math.round(n * 0.04);
        for (let i = 0; i < scarfTailCount; i++) {
          const u = i / scarfTailCount;
          out[ptr * 3]     = 1.5 + (i % 2) * 0.8;
          out[ptr * 3 + 1] = 17.2 - u * 5.5;
          out[ptr * 3 + 2] = 3.6;
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }

        // Orange Carrot Nose Cone extending along +Z (Swatch 3: Carrot Orange)
        const carrotCount = Math.max(14, Math.round(n * 0.035));
        for (let i = 0; i < carrotCount; i++) {
          const u = i / carrotCount;
          const a = i * 2.4;
          const coneR = (1.0 - u) * 0.7;
          out[ptr * 3]     = Math.cos(a) * coneR;
          out[ptr * 3 + 1] = 20.2 + Math.sin(a) * coneR;
          out[ptr * 3 + 2] = 3.0 + u * 3.5;
          if (swatchOut) swatchOut[ptr] = 3;
          ptr++;
        }

        // Static Left Stick Arm (Swatch 4: Timber Brown)
        const leftArmCount = Math.round(n * 0.04);
        for (let i = 0; i < leftArmCount; i++) {
          const u = i / leftArmCount;
          out[ptr * 3]     = -4.2 - u * 5.8;
          out[ptr * 3 + 1] = 15.0 - u * 2.2;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 4;
          ptr++;
        }

        // Articulated Right Waving Arm & Mitten Hand (Swatch 4: Timber Arm, Mitten)
        // Tagged with X > 4.2 for live kinematic rotation in index.html
        while (ptr < n) {
          const remCount = n - ptr;
          const u = (remCount - (n - ptr)) / remCount;
          if (u < 0.65) {
            // Rigid wooden arm
            out[ptr * 3]     = 4.2 + (u / 0.65) * 6.5;
            out[ptr * 3 + 1] = 15.0 + (u / 0.65) * 5.0;
            out[ptr * 3 + 2] = 0;
            if (swatchOut) swatchOut[ptr] = 4; // Timber Brown
          } else {
            // Defined 3D Mitten Hand with Thumb at tip
            const handU = (u - 0.65) / 0.35;
            const a = handU * Math.PI * 2;
            out[ptr * 3]     = 10.7 + Math.cos(a) * 1.5;
            out[ptr * 3 + 1] = 20.0 + Math.sin(a) * 1.8;
            out[ptr * 3 + 2] = (ptr % 2 === 0 ? 0.6 : -0.6);
            if (swatchOut) swatchOut[ptr] = 2; // Red Mitten
          }
          ptr++;
        }
      }
    },

    // 3. 12-Edge Wireframe Isometric Cube Gift Box with Dual Ribbon Struts & Top Bow
    {
      id: "giftBox3D",
      drawSVG: `<polygon points="12,2 22,7 12,12 2,7" stroke-width="1.5"/><polygon points="2,7 12,12 12,22 2,17" stroke-width="1.5"/><polygon points="22,7 12,12 12,22 22,17" stroke-width="1.5"/><line x1="12" y1="2" x2="12" y2="12" stroke-width="2"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.moveTo(cx, cy - 18); ctx.lineTo(cx + 20, cy - 7); ctx.lineTo(cx, cy + 4); ctx.lineTo(cx - 20, cy - 7); ctx.closePath();
        ctx.moveTo(cx - 20, cy - 7); ctx.lineTo(cx - 20, cy + 15); ctx.lineTo(cx, cy + 26); ctx.lineTo(cx, cy + 4);
        ctx.moveTo(cx + 20, cy - 7); ctx.lineTo(cx + 20, cy + 15); ctx.lineTo(cx, cy + 26); ctx.stroke();
        ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx, cy - 18); ctx.lineTo(cx, cy + 26); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx - 5, cy - 22, 6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx + 5, cy - 22, 6, 0, Math.PI * 2); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;
        const H = 6.0;
        const boxCenterY = 13.5;

        // Clean 12-Edge Cube Frame (Swatch 0: Regal Purple)
        // 12 edges: 4 top, 4 bottom, 4 vertical posts
        const edgePoints = Math.round((n * 0.52) / 12);
        const edges = [
          // Top 4 edges (Y = +H)
          { p0: [-H, boxCenterY + H, -H], p1: [H, boxCenterY + H, -H] },
          { p0: [H, boxCenterY + H, -H],  p1: [H, boxCenterY + H, H] },
          { p0: [H, boxCenterY + H, H],   p1: [-H, boxCenterY + H, H] },
          { p0: [-H, boxCenterY + H, H],  p1: [-H, boxCenterY + H, -H] },
          // Bottom 4 edges (Y = -H)
          { p0: [-H, boxCenterY - H, -H], p1: [H, boxCenterY - H, -H] },
          { p0: [H, boxCenterY - H, -H],  p1: [H, boxCenterY - H, H] },
          { p0: [H, boxCenterY - H, H],   p1: [-H, boxCenterY - H, H] },
          { p0: [-H, boxCenterY - H, H],  p1: [-H, boxCenterY - H, -H] },
          // 4 Vertical Pillars
          { p0: [-H, boxCenterY - H, -H], p1: [-H, boxCenterY + H, -H] },
          { p0: [H, boxCenterY - H, -H],  p1: [H, boxCenterY + H, -H] },
          { p0: [H, boxCenterY - H, H],   p1: [H, boxCenterY + H, H] },
          { p0: [-H, boxCenterY - H, H],  p1: [-H, boxCenterY + H, H] }
        ];

        for (const edge of edges) {
          for (let i = 0; i < edgePoints; i++) {
            const u = i / edgePoints;
            out[ptr * 3]     = edge.p0[0] + (edge.p1[0] - edge.p0[0]) * u;
            out[ptr * 3 + 1] = edge.p0[1] + (edge.p1[1] - edge.p0[1]) * u;
            out[ptr * 3 + 2] = edge.p0[2] + (edge.p1[2] - edge.p0[2]) * u;
            if (swatchOut) swatchOut[ptr] = 0;
            ptr++;
          }
        }

        // Two Orthogonal Ribbon Bands (Swatch 1: Radiant Gold)
        // Band 1: Vertical perimeter loop wrapping X = 0
        const ribbonLoop1 = Math.round(n * 0.16);
        for (let i = 0; i < ribbonLoop1; i++) {
          const u = (i / ribbonLoop1) * 4;
          let y = 0, z = 0;
          if (u < 1) { y = boxCenterY + H + 0.2; z = -H + (u / 1) * 2 * H; } // Top
          else if (u < 2) { y = (boxCenterY + H) - ((u - 1) / 1) * 2 * H; z = H + 0.2; } // Front
          else if (u < 3) { y = boxCenterY - H - 0.2; z = H - ((u - 2) / 1) * 2 * H; } // Bottom
          else { y = (boxCenterY - H) + ((u - 3) / 1) * 2 * H; z = -H - 0.2; } // Back

          out[ptr * 3]     = (i % 2 === 0 ? 0.8 : -0.8);
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = z;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Band 2: Horizontal perimeter loop wrapping Z = 0
        const ribbonLoop2 = Math.round(n * 0.16);
        for (let i = 0; i < ribbonLoop2; i++) {
          const u = (i / ribbonLoop2) * 4;
          let x = 0, y = 0;
          if (u < 1) { x = -H + (u / 1) * 2 * H; y = boxCenterY + H + 0.2; } // Top
          else if (u < 2) { x = H + 0.2; y = (boxCenterY + H) - ((u - 1) / 1) * 2 * H; } // Right
          else if (u < 3) { x = H - ((u - 2) / 1) * 2 * H; y = boxCenterY - H - 0.2; } // Bottom
          else { x = -H - 0.2; y = (boxCenterY - H) + ((u - 3) / 1) * 2 * H; } // Left

          out[ptr * 3]     = x;
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = (i % 2 === 0 ? 0.8 : -0.8);
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Flared 3D Ribbon Bow Loops (Swatch 1: Gold)
        while (ptr < n) {
          const side = ptr % 2 === 0 ? 1 : -1;
          const u = ((n - ptr) / (n - (ribbonLoop1 + ribbonLoop2))) * Math.PI * 2;
          const bowX = side * (Math.abs(Math.cos(u)) * 3.5 + 0.5);
          const bowY = (boxCenterY + H + 0.4) + Math.abs(Math.sin(u) * 2.8);
          const bowZ = Math.sin(u * 2) * 1.5;

          out[ptr * 3]     = bowX;
          out[ptr * 3 + 1] = bowY;
          out[ptr * 3 + 2] = bowZ;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
      }
    },

    // 4. CAD Wireframe Cocoa Mug, Thick Handle, Striped Stirrer & Animated Steam Emitters
    {
      id: "hotCocoaMug",
      drawSVG: `<path d="M5 6 L5 18 A 3 3 0 0 0 8 21 L14 21 A 3 3 0 0 0 17 18 L17 6 Z M17 9 H20 A 2 2 0 0 1 22 11 L22 15 A 2 2 0 0 1 20 17 H17" stroke-width="1.5"/><path d="M8 2 C8 4, 9 4, 9 6 M12 1 C12 3, 13 3, 13 5 M15 2 C15 4, 16 4, 16 6" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.strokeRect(cx - 16, cy - 8, 32, 26);
        ctx.arc(cx - 16, cy + 5, 8, Math.PI * 0.5, Math.PI * 1.5, false); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - 8, cy - 12); ctx.bezierCurveTo(cx - 12, cy - 20, cx - 4, cy - 24, cx - 8, cy - 30);
        ctx.moveTo(cx, cy - 12); ctx.bezierCurveTo(cx - 4, cy - 20, cx + 4, cy - 24, cx, cy - 30);
        ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;
        const mugBaseY = 4.5;
        const mugHeight = 11.5;
        const mugRadius = 6.5;

        // Structured Cylindrical Wireframe Rings (Swatch 0: Ceramic Red)
        // 5 horizontal contour rings + 8 vertical boundary struts
        const ringHeights = [mugBaseY, mugBaseY + 2.8, mugBaseY + 5.7, mugBaseY + 8.6, mugBaseY + mugHeight];
        const pointsPerRing = Math.round((n * 0.32) / ringHeights.length);

        for (const hy of ringHeights) {
          for (let i = 0; i < pointsPerRing; i++) {
            const a = (i / pointsPerRing) * Math.PI * 2;
            out[ptr * 3]     = Math.cos(a) * mugRadius;
            out[ptr * 3 + 1] = hy;
            out[ptr * 3 + 2] = Math.sin(a) * mugRadius;
            if (swatchOut) swatchOut[ptr] = 0;
            ptr++;
          }
        }

        // 8 Vertical Boundary Ribs (Swatch 0: Ceramic Red)
        const strutCount = Math.round(n * 0.14);
        for (let i = 0; i < strutCount; i++) {
          const rib = i % 8;
          const a = (rib / 8) * Math.PI * 2;
          const u = Math.floor(i / 8) / (strutCount / 8);
          out[ptr * 3]     = Math.cos(a) * mugRadius;
          out[ptr * 3 + 1] = mugBaseY + u * mugHeight;
          out[ptr * 3 + 2] = Math.sin(a) * mugRadius;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Thick Architectural Double-Arch Handle (Swatch 0: Ceramic Red)
        const handleCount = Math.round(n * 0.14);
        for (let i = 0; i < handleCount; i++) {
          const u = i / handleCount;
          const angle = u * Math.PI - Math.PI / 2;
          const isOuter = (i % 2 === 0);
          const hRad = isOuter ? 4.8 : 3.6;
          out[ptr * 3]     = -mugRadius - Math.cos(angle) * hRad;
          out[ptr * 3 + 1] = (mugBaseY + mugHeight * 0.5) + Math.sin(angle) * (hRad * 1.3);
          out[ptr * 3 + 2] = (isOuter ? 0.6 : -0.6);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Striped Peppermint Candy Cane Stirrer (Alternating Swatches: 2 Red / 1 White)
        const stirrerCount = Math.round(n * 0.12);
        for (let i = 0; i < stirrerCount; i++) {
          const u = i / stirrerCount;
          let sx = 0, sy = 0, sz = 0;
          if (u < 0.75) {
            // Straight diagonal shaft
            const su = u / 0.75;
            sx = 1.8 + su * 5.2;
            sy = (mugBaseY + mugHeight - 1.0) + su * 8.5;
            sz = 1.0 + su * 2.2;
          } else {
            // Curved top hook
            const hu = (u - 0.75) / 0.25;
            const a = hu * Math.PI;
            sx = 7.0 + Math.sin(a) * 2.0;
            sy = (mugBaseY + mugHeight + 7.5) + Math.cos(a) * 2.0;
            sz = 3.2;
          }
          out[ptr * 3]     = sx;
          out[ptr * 3 + 1] = sy;
          out[ptr * 3 + 2] = sz;
          // Clean alternating 2-drone red/white candy cane stripes
          if (swatchOut) swatchOut[ptr] = (Math.floor(i / 2) % 2 === 0) ? 2 : 1;
          ptr++;
        }

        // Autonomous Steam Emitters (Tagged with Swatch 3: Translucent Steam White)
        // Spawns across mug liquid surface ($Y = 16.0$) to be simulated live in index.html
        while (ptr < n) {
          const r = Math.sqrt(Math.random()) * (mugRadius - 1.0);
          const theta = Math.random() * Math.PI * 2;
          out[ptr * 3]     = Math.cos(theta) * r;
          out[ptr * 3 + 1] = (mugBaseY + mugHeight) + Math.random() * 14.0;
          out[ptr * 3 + 2] = Math.sin(theta) * r;
          if (swatchOut) swatchOut[ptr] = 3;
          ptr++;
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
