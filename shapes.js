import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

// Balanced Row Partitioning: Fills edge-to-edge for any arbitrary fleet count
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
      out[droneIdx * 3] = x;
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
    out[i * 3] = (pt.x - cx) * scale;
    out[i * 3 + 1] = altitude - (pt.y - cy) * scale;
    out[i * 3 + 2] = (i % 2 === 0 ? 1 : -1) * 1.2;
  }
}

// 3D Procedural Mesh Sampler
export function sampleProcedural3DMesh(geometry, out, count, scale = 1.0, altitude = 14) {
  geometry.computeBoundingBox();
  geometry.center();
  const mesh = new THREE.Mesh(geometry);
  const sampler = new MeshSurfaceSampler(mesh).build();
  const tempV = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    sampler.sample(tempV);
    out[i * 3] = tempV.x * scale;
    out[i * 3 + 1] = altitude + tempV.y * scale;
    out[i * 3 + 2] = tempV.z * scale;
  }
}

export const SHAPE_PAGES = [
  // Page 1: Christmas & Winter Festival (Pack 1)
  [
    {
      id: "xmasTree",
      drawSVG: `<polygon points="12,2 15,7 13,7 17,13 14,13 19,19 5,19 10,13 7,13 11,7 9,7" stroke-width="1.5"/><rect x="10.5" y="19" width="3" height="3" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.moveTo(cx, cy - 24); ctx.lineTo(cx + 8, cy - 14); ctx.lineTo(cx + 4, cy - 14);
        ctx.lineTo(cx + 14, cy - 2); ctx.lineTo(cx + 8, cy - 2);
        ctx.lineTo(cx + 20, cy + 14); ctx.lineTo(cx - 20, cy + 14);
        ctx.lineTo(cx - 8, cy - 2); ctx.lineTo(cx - 14, cy - 2);
        ctx.lineTo(cx - 4, cy - 14); ctx.lineTo(cx - 8, cy - 14); ctx.closePath();
        ctx.strokeRect(cx - 4, cy + 14, 8, 8); ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 100 20 L 130 60 L 115 60 L 150 110 L 125 110 L 170 170 L 30 170 L 75 110 L 50 110 L 85 60 L 70 60 Z M 88 170 L 88 200 L 112 200 L 112 170 Z", out, n, 0.22, 14)
    },
    {
      id: "snowflake",
      drawSVG: `<line x1="12" y1="2" x2="12" y2="22" stroke-width="1.5"/><line x1="2" y1="12" x2="22" y2="12" stroke-width="1.5"/><line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke-width="1.5"/><line x1="4.9" y1="19.1" x2="19.1" y2="4.9" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5;
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * 24, cy + Math.sin(a) * 24);
          ctx.stroke();
        }
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const arm = i % 6;
          const a = (arm / 6) * Math.PI * 2;
          const dist = ((Math.floor(i / 6) % 15) / 15) * 14;
          out[i * 3] = Math.cos(a) * dist;
          out[i * 3 + 1] = 14 + Math.sin(a) * dist;
          out[i * 3 + 2] = (i % 2 === 0 ? 1 : -1) * 1.0;
        }
      }
    },
    {
      id: "giftBox",
      drawSVG: `<rect x="3" y="8" width="18" height="13" rx="2" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="21" stroke-width="1.5"/><path d="M12 8 C9 3, 4 4, 7 8 C10 8, 12 8, 12 8" stroke-width="1.5"/><path d="M12 8 C15 3, 20 4, 17 8 C14 8, 12 8, 12 8" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5;
        ctx.strokeRect(cx - 18, cy - 6, 36, 26);
        ctx.beginPath(); ctx.moveTo(cx, cy - 6); ctx.lineTo(cx, cy + 20); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy - 6); ctx.bezierCurveTo(cx - 16, cy - 24, cx - 24, cy - 6, cx, cy - 6);
        ctx.bezierCurveTo(cx + 24, cy - 6, cx + 16, cy - 24, cx, cy - 6);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 30 70 L 170 70 L 170 180 L 30 180 Z M 100 70 L 100 180 M 100 70 C 60 20, 20 40, 60 70 C 80 70, 100 70, 100 70 C 100 70, 120 70, 140 70 C 180 40, 140 20, 100 70", out, n, 0.22, 14)
    },
    {
      id: "candyCane",
      drawSVG: `<path d="M7 21 L7 9 A 5 5 0 0 1 17 9 L17 11" stroke-width="1.5"/><line x1="7" y1="18" x2="10" y2="16" stroke-width="1.5"/><line x1="7" y1="13" x2="11" y2="10" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 8, cy + 22); ctx.lineTo(cx - 8, cy - 6);
        ctx.arc(cx + 4, cy - 6, 12, Math.PI, 0, false);
        ctx.lineTo(cx + 16, cy + 2);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 60 190 L 60 80 A 40 40 0 0 1 140 80 L 140 105", out, n, 0.22, 14)
    }
  ],

  // Page 2: New Year's Eve & Milestones (Pack 2)
  [
    {
      id: "champagneFlutes",
      drawSVG: `<path d="M6 3 L10 11 L10 17 M8 17 L12 17 M10 6 L6 6 M18 3 L14 11 L14 17 M12 17 L16 17 M14 6 L18 6" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        // Left Flute
        ctx.moveTo(cx - 14, cy - 20); ctx.lineTo(cx - 6, cy - 4); ctx.lineTo(cx - 6, cy + 14);
        ctx.moveTo(cx - 12, cy + 14); ctx.lineTo(cx, cy + 14);
        // Right Flute
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
          out[i * 3] = Math.cos(a) * 12;
          out[i * 3 + 1] = 14 + Math.sin(a) * 12;
          out[i * 3 + 2] = 0;
        }
        for (let i = rimCount; i < n; i++) {
          const u = (i - rimCount) / (n - rimCount);
          if (u < 0.6) {
            out[i * 3] = 0;
            out[i * 3 + 1] = 14 + (u / 0.6) * 8;
            out[i * 3 + 2] = 0;
          } else {
            const handU = (u - 0.6) / 0.4;
            out[i * 3] = handU * 6;
            out[i * 3 + 1] = 14 + handU * 4;
            out[i * 3 + 2] = 0;
          }
        }
      }
    },
    {
      id: "partyPopper",
      drawSVG: `<polygon points="2,22 10,20 4,14" stroke-width="1.5"/><path d="M10 14 C12 10, 16 11, 18 8 M14 18 C17 17, 18 13, 21 12 M18 19 L20 22 M8 6 L11 4 M14 4 A 2 2 0 1 1 16 6" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        // Cone
        ctx.moveTo(cx - 20, cy + 18); ctx.lineTo(cx - 4, cy + 14); ctx.lineTo(cx - 14, cy + 4); ctx.closePath();
        // Streamers
        ctx.moveTo(cx, cy); ctx.bezierCurveTo(cx + 12, cy - 10, cx + 18, cy + 4, cx + 24, cy - 8);
        ctx.moveTo(cx - 2, cy - 6); ctx.lineTo(cx + 8, cy - 18);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 20 180 L 80 160 L 40 120 Z M 80 120 C 100 80, 140 90, 160 60 M 120 150 C 150 140, 160 110, 190 100 M 150 160 L 170 190 M 70 50 L 100 30", out, n, 0.22, 14)
    },
    {
      id: "fireworkBurst",
      drawSVG: `<circle cx="12" cy="12" r="2" fill="#70e6ff"/><line x1="12" y1="3" x2="12" y2="7" stroke-width="1.5"/><line x1="12" y1="17" x2="12" y2="21" stroke-width="1.5"/><line x1="3" y1="12" x2="7" y2="12" stroke-width="1.5"/><line x1="17" y1="12" x2="21" y2="12" stroke-width="1.5"/><line x1="5.6" y1="5.6" x2="8.5" y2="8.5" stroke-width="1.5"/><line x1="15.5" y1="15.5" x2="18.4" y2="18.4" stroke-width="1.5"/>`,
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
          out[i * 3] = Math.cos(a) * r;
          out[i * 3 + 1] = 14 + Math.sin(a) * r;
          out[i * 3 + 2] = (Math.random() - 0.5) * 4.0;
        }
      }
    }
  ],

  // Page 3: Major League Baseball & Stadium Sports (Pack 3)
  [
    {
      id: "crossedBats",
      drawSVG: `<line x1="4" y1="4" x2="20" y2="20" stroke-width="2"/><line x1="4" y1="20" x2="20" y2="4" stroke-width="2"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 20, cy - 20); ctx.lineTo(cx + 20, cy + 20);
        ctx.moveTo(cx - 20, cy + 20); ctx.lineTo(cx + 20, cy - 20);
        ctx.stroke();
      },
      gen: (out, n) => {
        const half = Math.floor(n / 2);
        for (let i = 0; i < half; i++) {
          const u = (i / half) * 28 - 14;
          out[i * 3] = u; out[i * 3 + 1] = 14 + u; out[i * 3 + 2] = 0.5;
        }
        for (let i = half; i < n; i++) {
          const u = ((i - half) / (n - half)) * 28 - 14;
          out[i * 3] = u; out[i * 3 + 1] = 14 - u; out[i * 3 + 2] = -0.5;
        }
      }
    },
    {
      id: "baseballBall",
      drawSVG: `<circle cx="12" cy="12" r="9" stroke-width="1.5"/><path d="M7 5 C9 9, 9 15, 7 19 M17 5 C15 9, 15 15, 17 19" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx - 14, cy, 18, -Math.PI * 0.35, Math.PI * 0.35);
        ctx.arc(cx + 14, cy, 18, Math.PI * 0.65, Math.PI * 1.35);
        ctx.stroke();
      },
      gen: (out, n) => {
        const sphereCount = Math.floor(n * 0.6);
        for (let i = 0; i < sphereCount; i++) {
          const y = 1 - (i / (sphereCount - 1)) * 2;
          const r = Math.sqrt(1 - y * y) * 11;
          const t = i * GOLDEN;
          out[i * 3] = r * Math.cos(t); out[i * 3 + 1] = 14 + y * 11; out[i * 3 + 2] = r * Math.sin(t);
        }
        // Red curved stitching
        for (let i = sphereCount; i < n; i++) {
          const side = i % 2 === 0 ? 1 : -1;
          const prog = (i - sphereCount) / (n - sphereCount);
          const a = prog * Math.PI * 2;
          out[i * 3] = Math.cos(a) * 11.2 * side;
          out[i * 3 + 1] = 14 + Math.sin(a) * 11.2;
          out[i * 3 + 2] = Math.sin(a * 2) * 5.0;
        }
      }
    },
    {
      id: "baseballCap",
      drawSVG: `<path d="M4 14 C4 8, 16 8, 16 14 Z M16 14 L22 15" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.arc(cx - 4, cy + 4, 18, Math.PI, 0, false);
        ctx.lineTo(cx + 24, cy + 8);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 30 140 C 30 60, 150 60, 150 140 Z M 150 140 L 210 150", out, n, 0.22, 14)
    },
    {
      id: "stadiumMug",
      drawSVG: `<path d="M6 5 L6 19 A 2 2 0 0 0 8 21 L14 21 A 2 2 0 0 0 16 19 L16 5 Z M16 8 H19 A 2 2 0 0 1 21 10 L21 14 A 2 2 0 0 1 19 16 H16" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.strokeRect(cx - 14, cy - 16, 24, 34);
        ctx.arc(cx + 10, cy, 10, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 50 40 L 50 180 L 130 180 L 130 40 Z M 130 70 L 160 70 A 25 25 0 0 1 185 95 L 185 125 A 25 25 0 0 1 160 150 L 130 150", out, n, 0.22, 14)
    }
  ],

  // Page 4: Patriotic & American Flags (Pack 4)
  [
    {
      id: "wavingFlag",
      drawSVG: `<path d="M4 3v18 M4 4c4-2 8 2 12 0s4-2 4-2v10c-4 2-8-2-12 0s-4 2-4 2" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 24, cy - 24); ctx.lineTo(cx - 24, cy + 26);
        ctx.moveTo(cx - 24, cy - 20);
        ctx.bezierCurveTo(cx - 8, cy - 30, cx + 8, cy - 10, cx + 24, cy - 20);
        ctx.lineTo(cx + 24, cy);
        ctx.bezierCurveTo(cx + 8, cy + 10, cx - 8, cy - 10, cx - 24, cy); ctx.stroke();
      },
      gen: (out, n) => generateBalancedGrid(out, n, 32, 20, 14)
    },
    {
      id: "eagleSoar",
      drawSVG: `<path d="M2 10 C 6 4, 10 12, 12 9 C 14 12, 18 4, 22 10 C 17 14, 13 18, 12 21 C 11 18, 7 14, 2 10 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 36, cy + 2); ctx.bezierCurveTo(cx - 20, cy - 24, cx - 8, cy + 6, cx, cy - 6);
        ctx.bezierCurveTo(cx + 8, cy + 6, cx + 20, cy - 24, cx + 36, cy + 2);
        ctx.bezierCurveTo(cx + 18, cy + 18, cx + 8, cy + 26, cx, cy + 30);
        ctx.bezierCurveTo(cx - 8, cy + 26, cx - 18, cy + 18, cx - 36, cy + 2); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = (i / n) * 2 - 1;
          out[i * 3] = u * 20;
          out[i * 3 + 1] = 14 + Math.cos(u * Math.PI * 0.9) * 4.2;
          out[i * 3 + 2] = -Math.abs(u) * 6;
        }
      }
    },
    {
      id: "libertyBell",
      drawSVG: `<path d="M7 17 L8 8 A 4 4 0 0 1 16 8 L17 17 Z M5 17 H19 M10 20 H14" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        ctx.arc(cx, cy - 8, 14, Math.PI, 0, false);
        ctx.lineTo(cx + 18, cy + 14); ctx.lineTo(cx - 18, cy + 14); ctx.closePath();
        ctx.moveTo(cx - 22, cy + 14); ctx.lineTo(cx + 22, cy + 14);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 60 160 L 70 80 A 30 30 0 0 1 130 80 L 140 160 Z M 40 160 L 160 160 M 85 180 L 115 180", out, n, 0.22, 14)
    },
    {
      id: "torchFlame",
      drawSVG: `<path d="M12 2 C10 6, 8 8, 12 13 C10 11, 9 9, 10 7 M9 15 L15 15 L14 22 L10 22 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5; ctx.beginPath();
        // Flame
        ctx.moveTo(cx, cy - 24);
        ctx.bezierCurveTo(cx - 14, cy - 8, cx - 10, cy, cx, cy + 6);
        ctx.bezierCurveTo(cx + 10, cy, cx + 14, cy - 8, cx, cy - 24);
        // Handle
        ctx.moveTo(cx - 8, cy + 6); ctx.lineTo(cx + 8, cy + 6);
        ctx.lineTo(cx + 4, cy + 24); ctx.lineTo(cx - 4, cy + 24); ctx.closePath();
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 100 20 C 60 70, 70 110, 100 130 C 130 110, 140 70, 100 20 Z M 75 130 L 125 130 L 115 200 L 85 200 Z", out, n, 0.22, 14)
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
