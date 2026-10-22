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

// Multi-Primitive Surface Sampler
export function sampleCompositePrimitives(primitives, count, out, swatchOut, baseAltitude = 14) {
  if (!primitives || primitives.length === 0) {
    generateBalancedGrid(out, count, 24, 16, baseAltitude);
    return;
  }

  const areas = [];
  let totalArea = 0;
  for (const p of primitives) {
    p.mesh.updateWorldMatrix(true, false);
    const geom = p.mesh.geometry;
    if (!geom.boundingBox) geom.computeBoundingBox();
    const size = new THREE.Vector3();
    geom.boundingBox.getSize(size);
    size.multiply(p.mesh.scale);
    const area = 2 * (size.x * size.y + size.y * size.z + size.z * size.x) || 1.0;
    areas.push(area);
    totalArea += area;
  }

  let ptr = 0;
  const tempV = new THREE.Vector3();

  for (let idx = 0; idx < primitives.length; idx++) {
    const p = primitives[idx];
    const pCount = (idx === primitives.length - 1)
      ? (count - ptr)
      : Math.max(12, Math.round((areas[idx] / totalArea) * count));

    const meshClone = p.mesh.clone();
    meshClone.applyMatrix4(p.mesh.matrixWorld);
    const sampler = new MeshSurfaceSampler(meshClone).build();

    for (let i = 0; i < pCount && ptr < count; i++) {
      sampler.sample(tempV);
      out[ptr * 3]     = tempV.x;
      out[ptr * 3 + 1] = tempV.y;
      out[ptr * 3 + 2] = tempV.z;
      if (swatchOut) swatchOut[ptr] = p.swatchIdx || 0;
      ptr++;
    }
  }

  while (ptr < count) {
    out[ptr * 3]     = out[(ptr - 1) * 3] + 0.1;
    out[ptr * 3 + 1] = out[(ptr - 1) * 3 + 1];
    out[ptr * 3 + 2] = out[(ptr - 1) * 3 + 2];
    if (swatchOut) swatchOut[ptr] = 0;
    ptr++;
  }
}

export const SHAPE_PAGES = [
  // Page 1: Act I — Winter Warmth (Architectural High-Definition Edition)
  [
    // 1. High-Density Crystalline Snowflake (Prominent Dual-Rail Chevrons)
    {
      id: "snowflake",
      drawSVG: `<line x1="12" y1="2" x2="12" y2="22" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke-width="1.5"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke-width="1.5"/><line x1="4.9" y1="19.1" x2="19.1" y2="4.9" stroke-width="1.5"/><polygon points="12,7 16,12 12,17 8,12" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5;
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * 26, cy + Math.sin(a) * 26);
          const mx = cx + Math.cos(a) * 16, my = cy + Math.sin(a) * 16;
          const a1 = a + Math.PI / 3, a2 = a - Math.PI / 3;
          ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a1) * 9, my + Math.sin(a1) * 9);
          ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a2) * 9, my + Math.sin(a2) * 9);
          ctx.stroke();
        }
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const x = cx + Math.cos(a) * 9, y = cy + Math.sin(a) * 9;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;
        // Central Double-Hexagonal Lattice (Swatch 0: Pure Ice White)
        const innerHexCount = Math.round(n * 0.08);
        const outerHexCount = Math.round(n * 0.10);
        for (let i = 0; i < innerHexCount; i++) {
          const a = (i / innerHexCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 2.6;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * 2.6;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }
        for (let i = 0; i < outerHexCount; i++) {
          const a = (i / outerHexCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 5.4;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * 5.4;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 1; // Glacial Cyan
          ptr++;
        }

        // 6 Heavy Dual-Strand Spines (Swatch 0: White)
        const spineCount = Math.round(n * 0.24);
        for (let i = 0; i < spineCount; i++) {
          const arm = i % 6;
          const a = (arm / 6) * Math.PI * 2;
          const u = Math.floor(i / 6) / (spineCount / 6);
          const r = 3.0 + u * 14.5;
          const strandOffset = (i % 2 === 0 ? 0.35 : -0.35);
          out[ptr * 3]     = Math.cos(a) * r - Math.sin(a) * strandOffset;
          out[ptr * 3 + 1] = 14 + Math.sin(a) * r + Math.cos(a) * strandOffset;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // 3 Tiers of Pronounced, Thick Chevrons per Arm (Swatch 1: Cyan, 45% of total drones)
        const chevronTiers = [
          { baseR: 6.8,  branchLen: 4.8 },
          { baseR: 10.4, branchLen: 5.6 },
          { baseR: 14.0, branchLen: 4.2 }
        ];
        const chevronCount = Math.round(n * 0.46);

        for (let i = 0; i < chevronCount; i++) {
          const arm = i % 6;
          const aSpine = (arm / 6) * Math.PI * 2;
          const tierIdx = Math.floor(i / 12) % 3;
          const tier = chevronTiers[tierIdx];
          const side = (i % 2 === 0 ? 1 : -1);
          const aBranch = aSpine + side * (Math.PI / 3);
          const u = ((i % 6) / 5);
          const len = 0.8 + u * tier.branchLen;

          out[ptr * 3]     = Math.cos(aSpine) * tier.baseR + Math.cos(aBranch) * len;
          out[ptr * 3 + 1] = 14 + Math.sin(aSpine) * tier.baseR + Math.sin(aBranch) * len;
          out[ptr * 3 + 2] = side * 0.3;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Spearhead Diamond Tips
        while (ptr < n) {
          const arm = ptr % 6;
          const a = (arm / 6) * Math.PI * 2;
          const offset = ((ptr % 3) - 1) * 0.24;
          out[ptr * 3]     = Math.cos(a + offset) * 17.6;
          out[ptr * 3 + 1] = 14 + Math.sin(a + offset) * 17.6;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
      }
    },

    // 2. Fibonacci Geodesic Snowman (Triangular Surface Packing)
    {
      id: "wavingSnowman",
      drawSVG: `<circle cx="12" cy="17" r="5" stroke-width="1.5"/><circle cx="12" cy="10" r="3.5" stroke-width="1.5"/><circle cx="12" cy="5" r="2.2" stroke-width="1.5"/><rect x="9.5" y="1.5" width="5" height="2" fill="#1976d2"/><polygon points="12,5 16,5.5 12,6" fill="#ff6d00"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.arc(cx, cy + 14, 14, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy + 1, 10, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy - 11, 7, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = "#1976d2";
        ctx.fillRect(cx - 10, cy - 19, 20, 3);
        ctx.fillRect(cx - 6, cy - 28, 12, 9);
        ctx.fillStyle = "#ff6d00";
        ctx.beginPath(); ctx.moveTo(cx, cy - 12); ctx.lineTo(cx + 8, cy - 10); ctx.lineTo(cx, cy - 8); ctx.fill();
        ctx.strokeStyle = "#8d6e63"; ctx.beginPath();
        ctx.moveTo(cx - 9, cy); ctx.lineTo(cx - 18, cy + 4);
        ctx.moveTo(cx + 9, cy); ctx.lineTo(cx + 20, cy - 12); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;

        const baseCount = Math.round(n * 0.26);
        const midCount = Math.round(n * 0.20);
        const headCount = Math.round(n * 0.14);

        // Base Geodesic Sphere (Swatch 0: Snow White)
        for (let i = 0; i < baseCount; i++) {
          const y = 1 - (i / (baseCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y) * 5.8;
          const t = i * GOLDEN;
          out[ptr * 3]     = r * Math.cos(t);
          out[ptr * 3 + 1] = 6.0 + y * 5.8;
          out[ptr * 3 + 2] = r * Math.sin(t);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Chest Geodesic Sphere (Swatch 0: Snow White)
        for (let i = 0; i < midCount; i++) {
          const y = 1 - (i / (midCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y) * 4.2;
          const t = i * GOLDEN;
          out[ptr * 3]     = r * Math.cos(t);
          out[ptr * 3 + 1] = 13.6 + y * 4.2;
          out[ptr * 3 + 2] = r * Math.sin(t);
          if (swatchOut) swatchOut[ptr] = 0;
          ptr++;
        }

        // Head Geodesic Sphere (Swatch 0: Snow White)
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

        // Royal Blue Top Hat (Swatch 1: Royal Blue #1976d2)
        const brimCount = Math.round(n * 0.08);
        for (let i = 0; i < brimCount; i++) {
          const a = (i / brimCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 4.4;
          out[ptr * 3 + 1] = 22.4;
          out[ptr * 3 + 2] = Math.sin(a) * 4.4;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
        const crownCount = Math.round(n * 0.10);
        for (let i = 0; i < crownCount; i++) {
          const u = i / crownCount;
          const a = u * Math.PI * 8;
          out[ptr * 3]     = Math.cos(a) * 2.6;
          out[ptr * 3 + 1] = 22.4 + u * 4.2;
          out[ptr * 3 + 2] = Math.sin(a) * 2.6;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Red Scarf Collar & Sash (Swatch 2: Crimson Red #d50000)
        const scarfRingCount = Math.round(n * 0.06);
        for (let i = 0; i < scarfRingCount; i++) {
          const a = (i / scarfRingCount) * Math.PI * 2;
          out[ptr * 3]     = Math.cos(a) * 3.6;
          out[ptr * 3 + 1] = 17.5 + Math.sin(a * 2) * 0.3;
          out[ptr * 3 + 2] = Math.sin(a) * 3.6;
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }
        const scarfTailCount = Math.round(n * 0.04);
        for (let i = 0; i < scarfTailCount; i++) {
          const u = i / scarfTailCount;
          out[ptr * 3]     = 1.4 + (i % 2) * 0.7;
          out[ptr * 3 + 1] = 17.2 - u * 5.8;
          out[ptr * 3 + 2] = 3.8;
          if (swatchOut) swatchOut[ptr] = 2;
          ptr++;
        }

        // Carrot Nose Cone in +Z (Swatch 3: Carrot Orange #ff6d00)
        const carrotCount = Math.max(16, Math.round(n * 0.04));
        for (let i = 0; i < carrotCount; i++) {
          const u = i / carrotCount;
          const a = i * 2.4;
          const coneR = (1.0 - u) * 0.8;
          out[ptr * 3]     = Math.cos(a) * coneR;
          out[ptr * 3 + 1] = 20.0 + Math.sin(a) * coneR;
          out[ptr * 3 + 2] = 2.8 + u * 3.8;
          if (swatchOut) swatchOut[ptr] = 3;
          ptr++;
        }

        // Left Arm (Swatch 4: Timber Brown #8d6e63)
        const leftArmCount = Math.round(n * 0.04);
        for (let i = 0; i < leftArmCount; i++) {
          const u = i / leftArmCount;
          out[ptr * 3]     = -4.2 - u * 5.8;
          out[ptr * 3 + 1] = 14.8 - u * 2.2;
          out[ptr * 3 + 2] = 0;
          if (swatchOut) swatchOut[ptr] = 4;
          ptr++;
        }

        // Right Arm & Mitten Hand (Swatch 4: Arm, Swatch 2: Red Mitten)
        while (ptr < n) {
          const rem = n - ptr;
          const u = (rem - (n - ptr)) / rem;
          if (u < 0.65) {
            out[ptr * 3]     = 4.2 + (u / 0.65) * 6.5;
            out[ptr * 3 + 1] = 14.8 + (u / 0.65) * 5.0;
            out[ptr * 3 + 2] = 0;
            if (swatchOut) swatchOut[ptr] = 4;
          } else {
            const handU = (u - 0.65) / 0.35;
            const a = handU * Math.PI * 2;
            out[ptr * 3]     = 10.7 + Math.cos(a) * 1.5;
            out[ptr * 3 + 1] = 19.8 + Math.sin(a) * 1.8;
            out[ptr * 3 + 2] = (ptr % 2 === 0 ? 0.6 : -0.6);
            if (swatchOut) swatchOut[ptr] = 2;
          }
          ptr++;
        }
      }
    },

    // 3. Red Cube with Thick 3-Axis Bright Yellow Ribbon Crosses & Double Bow
    {
      id: "giftBox3D",
      drawSVG: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="#d50000" stroke-width="2"/><line x1="12" y1="3" x2="12" y2="21" stroke="#ffe600" stroke-width="3"/><line x1="3" y1="12" x2="21" y2="12" stroke="#ffe600" stroke-width="3"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#d50000"; ctx.lineWidth = 3;
        ctx.strokeRect(cx - 18, cy - 14, 36, 36);
        ctx.strokeStyle = "#ffe600"; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy + 22); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - 18, cy + 4); ctx.lineTo(cx + 18, cy + 4); ctx.stroke();
      },
      gen: (out, n, swatchOut) => {
        let ptr = 0;
        const H = 6.0;
        const boxCenterY = 13.5;

        // Clean Red Cube Wireframe (Swatch 0: Crimson Red #d50000, 32% of drones)
        const edgePoints = Math.round((n * 0.32) / 12);
        const edges = [
          { p0: [-H, boxCenterY + H, -H], p1: [H, boxCenterY + H, -H] },
          { p0: [H, boxCenterY + H, -H],  p1: [H, boxCenterY + H, H] },
          { p0: [H, boxCenterY + H, H],   p1: [-H, boxCenterY + H, H] },
          { p0: [-H, boxCenterY + H, H],  p1: [-H, boxCenterY + H, -H] },
          { p0: [-H, boxCenterY - H, -H], p1: [H, boxCenterY - H, -H] },
          { p0: [H, boxCenterY - H, -H],  p1: [H, boxCenterY - H, H] },
          { p0: [H, boxCenterY - H, H],   p1: [-H, boxCenterY - H, H] },
          { p0: [-H, boxCenterY - H, H],  p1: [-H, boxCenterY - H, -H] },
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

        // Dual-Strand Bright Yellow Ribbons (Swatch 1: Electric Yellow #ffe600, 68% of drones)
        // Band 1: Vertical perimeter loop wrapping X = 0
        const ribbon1Count = Math.round(n * 0.17);
        for (let i = 0; i < ribbon1Count; i++) {
          const u = (i / ribbon1Count) * 4;
          let y = 0, z = 0;
          if (u < 1) { y = boxCenterY + H + 0.2; z = -H + u * 2 * H; }
          else if (u < 2) { y = (boxCenterY + H) - (u - 1) * 2 * H; z = H + 0.2; }
          else if (u < 3) { y = boxCenterY - H - 0.2; z = H - (u - 2) * 2 * H; }
          else { y = (boxCenterY - H) + (u - 3) * 2 * H; z = -H - 0.2; }
          out[ptr * 3]     = (i % 2 === 0 ? 0.75 : -0.75);
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = z;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Band 2: Vertical perimeter loop wrapping Z = 0
        const ribbon2Count = Math.round(n * 0.17);
        for (let i = 0; i < ribbon2Count; i++) {
          const u = (i / ribbon2Count) * 4;
          let x = 0, y = 0;
          if (u < 1) { x = -H + u * 2 * H; y = boxCenterY + H + 0.2; }
          else if (u < 2) { x = H + 0.2; y = (boxCenterY + H) - (u - 1) * 2 * H; }
          else if (u < 3) { x = H - (u - 2) * 2 * H; y = boxCenterY - H - 0.2; }
          else { x = -H - 0.2; y = (boxCenterY - H) + (u - 3) * 2 * H; }
          out[ptr * 3]     = x;
          out[ptr * 3 + 1] = y;
          out[ptr * 3 + 2] = (i % 2 === 0 ? 0.75 : -0.75);
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Band 3: Horizontal waist loop wrapping Y = boxCenterY
        const ribbon3Count = Math.round(n * 0.18);
        for (let i = 0; i < ribbon3Count; i++) {
          const u = (i / ribbon3Count) * 4;
          let x = 0, z = 0;
          if (u < 1) { x = -H + u * 2 * H; z = H + 0.2; }
          else if (u < 2) { x = H + 0.2; z = H - (u - 1) * 2 * H; }
          else if (u < 3) { x = H - (u - 2) * 2 * H; z = -H - 0.2; }
          else { x = -H - 0.2; z = -H + (u - 3) * 2 * H; }
          out[ptr * 3]     = x;
          out[ptr * 3 + 1] = boxCenterY + (i % 2 === 0 ? 0.75 : -0.75);
          out[ptr * 3 + 2] = z;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }

        // Double 4-Leaf Bow on Top (Swatch 1: Electric Yellow)
        while (ptr < n) {
          const side = (ptr % 4 < 2) ? 1 : -1;
          const axis = (ptr % 2 === 0) ? 'x' : 'z';
          const u = ((n - ptr) / 40) * Math.PI * 2;
          const r = Math.sin(u) * 3.4;

          let bx = 0, bz = 0;
          if (axis === 'x') {
            bx = side * (Math.abs(Math.cos(u)) * 4.0 + 0.6);
            bz = Math.sin(u * 2) * 1.5;
          } else {
            bz = side * (Math.abs(Math.cos(u)) * 4.0 + 0.6);
            bx = Math.sin(u * 2) * 1.5;
          }

          out[ptr * 3]     = bx;
          out[ptr * 3 + 1] = (boxCenterY + H + 0.4) + Math.abs(r);
          out[ptr * 3 + 2] = bz;
          if (swatchOut) swatchOut[ptr] = 1;
          ptr++;
        }
      }
    },

    // 4. CAD Wireframe Mug, Striped Stirrer & Rising Steam Particles
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

        const stirrerCount = Math.round(n * 0.14);
        for (let i = 0; i < stirrerCount; i++) {
          const u = i / stirrerCount;
          let sx = 0, sy = 0, sz = 0;
          if (u < 0.75) {
            const su = u / 0.75;
            sx = 1.8 + su * 5.2;
            sy = (mugBaseY + mugHeight - 1.0) + su * 8.5;
            sz = 1.0 + su * 2.2;
          } else {
            const hu = (u - 0.75) / 0.25;
            const a = hu * Math.PI;
            sx = 7.0 + Math.sin(a) * 2.0;
            sy = (mugBaseY + mugHeight + 7.5) + Math.cos(a) * 2.0;
            sz = 3.2;
          }
          out[ptr * 3]     = sx;
          out[ptr * 3 + 1] = sy;
          out[ptr * 3 + 2] = sz;
          if (swatchOut) swatchOut[ptr] = (Math.floor(i / 2) % 2 === 0) ? 2 : 1;
          ptr++;
        }

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
