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

export function sampleSVGString(svgD, out, count, scale = 0.22, altitude = 14) {
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
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  for (let i = 0; i < count; i++) {
    const pt = rawPts[i];
    out[i * 3] = (pt.x - cx) * scale;
    out[i * 3 + 1] = altitude - (pt.y - cy) * scale;
    out[i * 3 + 2] = (i % 2 === 0 ? 1 : -1) * 1.4;
  }
}

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
  // Page 1: Sports & Emblems
  [
    {
      id: "soccerBall",
      drawSVG: `<circle cx="12" cy="12" r="9" stroke-width="1.5"/><polygon points="12,8 15,10 14,14 10,14 9,10" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="15" y1="10" x2="20" y2="9"/><line x1="14" y1="14" x2="18" y2="18"/><line x1="10" y1="14" x2="6" y2="18"/><line x1="9" y1="10" x2="4" y2="9"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * 11, y = cy + Math.sin(a) * 11;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y) * 11.5, t = i * GOLDEN;
          out[i * 3] = r * Math.cos(t); out[i * 3 + 1] = 14 + y * 11.5; out[i * 3 + 2] = r * Math.sin(t);
        }
      }
    },
    {
      id: "shieldCrest",
      drawSVG: `<path d="M12 2 L20 5 V11 C20 16, 16 20, 12 22 C8 20, 4 16, 4 11 V5 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx, cy - 26); ctx.lineTo(cx + 24, cy - 18); ctx.lineTo(cx + 24, cy - 2);
        ctx.bezierCurveTo(cx + 24, cy + 14, cx + 12, cy + 24, cx, cy + 28);
        ctx.bezierCurveTo(cx - 12, cy + 24, cx - 24, cy + 14, cx - 24, cy - 2);
        ctx.lineTo(cx - 24, cy - 18); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 100 20 L 170 50 L 170 110 C 170 160, 130 190, 100 210 C 70 190, 30 160, 30 110 L 30 50 Z", out, n, 0.22, 14)
    },
    {
      id: "trophyCup",
      drawSVG: `<path d="M6 4h12v6a6 6 0 0 1-12 0V4z M6 7H3v2a3 3 0 0 0 3 3h0 M18 7h3v2a3 3 0 0 1-3 3h0 M12 16v4 M8 20h8" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.strokeRect(cx - 16, cy - 24, 32, 20); ctx.arc(cx, cy - 4, 16, 0, Math.PI);
        ctx.moveTo(cx, cy + 12); ctx.lineTo(cx, cy + 22);
        ctx.moveTo(cx - 16, cy + 22); ctx.lineTo(cx + 16, cy + 22);
        ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 50 30 L 150 30 L 150 90 C 150 140, 50 140, 50 90 Z M 100 140 L 100 180 M 60 180 L 140 180", out, n, 0.22, 14)
    },
    {
      id: "basketball",
      drawSVG: `<circle cx="12" cy="12" r="9" stroke-width="1.5"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M5.5 5.5 A9 9 0 0 1 18.5 18.5 M18.5 5.5 A9 9 0 0 0 5.5 18.5" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.arc(cx, cy, 26, 0, Math.PI * 2);
        ctx.moveTo(cx - 26, cy); ctx.lineTo(cx + 26, cy);
        ctx.moveTo(cx, cy - 26); ctx.lineTo(cx, cy + 26); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n;
          if (u < 0.4) {
            const t = (u / 0.4) * Math.PI * 2;
            out[i * 3] = Math.cos(t) * 12; out[i * 3 + 1] = 14 + Math.sin(t) * 12; out[i * 3 + 2] = 0;
          } else {
            const phi = i * GOLDEN, costheta = (Math.random() - 0.5) * 2, sintheta = Math.sqrt(1 - costheta * costheta);
            out[i * 3] = sintheta * Math.cos(phi) * 12; out[i * 3 + 1] = 14 + sintheta * Math.sin(phi) * 12; out[i * 3 + 2] = costheta * 12;
          }
        }
      }
    }
  ],
  // Page 2: Flags
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
      id: "tricolorBanner",
      drawSVG: `<rect x="3" y="4" width="18" height="14" rx="2" stroke-width="1.5"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="4" x2="15" y2="18"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        ctx.strokeRect(cx - 26, cy - 18, 52, 36);
        ctx.beginPath();
        ctx.moveTo(cx - 9, cy - 18); ctx.lineTo(cx - 9, cy + 18);
        ctx.moveTo(cx + 9, cy - 18); ctx.lineTo(cx + 9, cy + 18);
        ctx.stroke();
      },
      gen: (out, n) => generateBalancedGrid(out, n, 30, 18, 14)
    },
    {
      id: "starSpangledPennant",
      drawSVG: `<polygon points="3,4 21,11 3,18" stroke-width="1.5"/><circle cx="8" cy="11" r="1.5" fill="#70e6ff"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 24, cy - 20); ctx.lineTo(cx + 26, cy); ctx.lineTo(cx - 24, cy + 20); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n, spanX = u * 32 - 16, halfH = (1 - u) * 14;
          out[i * 3] = spanX; out[i * 3 + 1] = 14 + (Math.random() - 0.5) * 2 * halfH; out[i * 3 + 2] = 0;
        }
      }
    },
    {
      id: "laurelWreath",
      drawSVG: `<path d="M7 19c-3-3-4-7-2-11 3 1 5 3 6 6-1 2-2 4-4 5zM17 19c3-3 4-7 2-11-3 1-5 3-6 6 1 2 2 4 4 5z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.arc(cx - 4, cy, 22, Math.PI * 0.3, Math.PI * 1.7);
        ctx.arc(cx + 4, cy, 22, -Math.PI * 0.7, Math.PI * 0.7); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const side = i % 2 === 0 ? 1 : -1, t = (i / n) * Math.PI * 0.8 + 0.3;
          out[i * 3] = Math.cos(t) * 13 * side; out[i * 3 + 1] = 14 + Math.sin(t) * 13; out[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
        }
      }
    }
  ],
  // Page 3: 3D Solid Hulls
  [
    {
      id: "torusKnot3D",
      drawSVG: `<path d="M7 12 C7 7, 17 7, 17 12 C17 17, 7 17, 7 12 M12 7 C17 7, 17 17, 12 17 C7 17, 7 7, 12 7" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        for (let t = 0; t <= Math.PI * 4; t += 0.08) {
          const r = 16 + 8 * Math.cos(1.5 * t);
          const x = cx + r * Math.cos(t), y = cy + r * Math.sin(t);
          if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      },
      gen: (out, n) => sampleProcedural3DMesh(new THREE.TorusKnotGeometry(8, 2.5, 90, 16, 2, 3), out, n, 1.0, 14)
    },
    {
      id: "dodecahedron3D",
      drawSVG: `<polygon points="12,2 21,9 18,20 6,20 3,9" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * 24, y = cy + Math.sin(a) * 24;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => sampleProcedural3DMesh(new THREE.DodecahedronGeometry(11, 1), out, n, 1.0, 14)
    },
    {
      id: "cylinderRibbon3D",
      drawSVG: `<ellipse cx="12" cy="6" rx="8" ry="3" stroke-width="1.5"/><ellipse cx="12" cy="18" rx="8" ry="3" stroke-width="1.5"/><line x1="4" y1="6" x2="4" y2="18"/><line x1="20" y1="6" x2="20" y2="18"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(cx, cy - 16, 22, 7, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(cx, cy + 16, 22, 7, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - 22, cy - 16); ctx.lineTo(cx - 22, cy + 16);
        ctx.moveTo(cx + 22, cy - 16); ctx.lineTo(cx + 22, cy + 16); ctx.stroke();
      },
      gen: (out, n) => sampleProcedural3DMesh(new THREE.CylinderGeometry(7, 11, 18, 32, 6, true), out, n, 1.0, 14)
    },
    {
      id: "icosahedronSphere3D",
      drawSVG: `<circle cx="12" cy="12" r="9" stroke-width="1.5"/><polygon points="12,3 20,8 18,17 6,17 4,8" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, 26, 0, Math.PI * 2); ctx.stroke();
      },
      gen: (out, n) => sampleProcedural3DMesh(new THREE.IcosahedronGeometry(12, 2), out, n, 1.0, 14)
    }
  ],
  // Page 4: Cosmic
  [
    {
      id: "saturn",
      drawSVG: `<circle cx="12" cy="12" r="5" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-width="1.5" transform="rotate(-20 12 12)"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.stroke();
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.35);
        ctx.beginPath(); ctx.ellipse(0, 0, 38, 12, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      },
      gen: (out, n) => {
        const core = Math.floor(n * 0.3);
        for (let i = 0; i < core; i++) {
          const u = (i + 0.5) / core, y = 1 - 2 * u, r = Math.sqrt(1 - y * y) * 4.5, t = i * GOLDEN;
          out[i * 3] = r * Math.cos(t); out[i * 3 + 1] = 14 + y * 4.5; out[i * 3 + 2] = r * Math.sin(t);
        }
        for (let i = core; i < n; i++) {
          const u = (i - core) / (n - core), t = u * Math.PI * 8, r = 7.0 + u * 11.0;
          out[i * 3] = r * Math.cos(t); out[i * 3 + 1] = 14 + r * Math.sin(t) * Math.sin(0.42); out[i * 3 + 2] = r * Math.sin(t) * Math.cos(0.42);
        }
      }
    },
    {
      id: "galaxy",
      drawSVG: `<path d="M12 2a10 10 0 0 0-7 17l1.5-1.5A8 8 0 1 1 12 20v2a10 10 0 0 0 0-20zm0 6a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        for (let a = 0; a < Math.PI * 4; a += 0.1) {
          const r = 2 + a * 7.5, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
          if (a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = (i + 0.5) / n, arm = i % 3, r = 1.5 + 20 * u, t = i * GOLDEN * 0.5 + (arm * Math.PI * 2) / 3;
          out[i * 3] = r * Math.cos(t); out[i * 3 + 1] = 14 + r * Math.sin(t) * 0.45; out[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
        }
      }
    },
    {
      id: "atom",
      drawSVG: `<circle cx="12" cy="12" r="2.5" fill="#70e6ff"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke-width="1.5" transform="rotate(120 12 12)"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2.5;
        ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
        for (const angle of [0, Math.PI / 3, (Math.PI * 2) / 3]) {
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
          ctx.beginPath(); ctx.ellipse(0, 0, 36, 14, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
        }
      },
      gen: (out, n) => {
        const nuc = Math.floor(n * 0.1);
        for (let i = 0; i < nuc; i++) {
          const r = Math.cbrt(Math.random()) * 2.2, theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1);
          out[i * 3] = r * Math.sin(phi) * Math.cos(theta); out[i * 3 + 1] = 14 + r * Math.sin(phi) * Math.sin(theta); out[i * 3 + 2] = r * Math.cos(phi);
        }
        const perRing = Math.floor((n - nuc) / 3), angles = [0, Math.PI / 3, -Math.PI / 3];
        for (let k = 0; k < 3; k++) {
          const base = nuc + k * perRing, rotX = angles[k];
          for (let j = 0; j < perRing; j++) {
            const t = (j / perRing) * Math.PI * 2, x = 14 * Math.cos(t), y = 6.5 * Math.sin(t), idx = (base + j) * 3;
            out[idx] = x; out[idx + 1] = 14 + y * Math.cos(rotX); out[idx + 2] = y * Math.sin(rotX);
          }
        }
      }
    },
    {
      id: "moon",
      drawSVG: `<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a7 7 0 1 1-7.54-7.54c-.44-.06-.9-.1-1.36-.1z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.fillStyle = "rgba(112, 230, 255, 0.25)"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx - 6, cy, 28, -Math.PI * 0.4, Math.PI * 0.4, false);
        ctx.bezierCurveTo(cx + 8, cy + 18, cx + 8, cy - 18, cx - 6, cy - 28 * Math.cos(Math.PI * 0.4));
        ctx.stroke(); ctx.fill();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n, angle = (u - 0.5) * Math.PI * 1.5, r1 = 14;
          out[i * 3] = Math.cos(angle) * r1 - 3.5 + (Math.random() - 0.5) * 1.2;
          out[i * 3 + 1] = 14 + Math.sin(angle) * r1; out[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
    }
  ],
  // Page 5: Fauna
  [
    {
      id: "eagle",
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
          const u = (i / n) * 2 - 1, span = u * 20, sweep = -Math.abs(u) * 6, flap = Math.cos(u * Math.PI * 0.9) * 4.2;
          out[i * 3] = span; out[i * 3 + 1] = 14 + flap; out[i * 3 + 2] = sweep;
        }
      }
    },
    {
      id: "butterfly",
      drawSVG: `<path d="M12 4 C8 2, 3 5, 3 10 C3 14, 8 15, 12 20 C16 15, 21 14, 21 10 C21 5, 16 2, 12 4 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx, cy - 22); ctx.bezierCurveTo(cx - 32, cy - 30, cx - 36, cy + 6, cx, cy + 24);
        ctx.bezierCurveTo(cx + 36, cy + 6, cx + 32, cy - 30, cx, cy - 22); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const t = (i / n) * Math.PI * 12, q = Math.exp(Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12), 5);
          out[i * 3] = 4.0 * Math.sin(t) * q; out[i * 3 + 1] = 14 + 4.0 * Math.cos(t) * q; out[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
    },
    {
      id: "lotus",
      drawSVG: `<path d="M12 21 C8 17, 3 14, 3 9 C6 10, 9 12, 12 16 C15 12, 18 10, 21 9 C21 14, 16 17, 12 21 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI - Math.PI / 2;
          ctx.arc(cx + Math.cos(a) * 14, cy + Math.sin(a) * 14, 16, 0, Math.PI * 2);
        }
        ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = (i + 0.5) / n, theta = i * GOLDEN, r = Math.sqrt(u) * (10 + 4 * Math.cos(6 * theta));
          out[i * 3] = r * Math.cos(theta); out[i * 3 + 1] = 12 + Math.pow(u, 0.7) * 5; out[i * 3 + 2] = r * Math.sin(theta);
        }
      }
    },
    {
      id: "wave",
      drawSVG: `<path d="M2 16 C6 10, 10 10, 14 16 C18 22, 20 12, 22 8" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 36, cy + 14);
        ctx.bezierCurveTo(cx - 20, cy - 20, cx - 4, cy - 20, cx + 8, cy + 10);
        ctx.bezierCurveTo(cx + 18, cy + 28, cx + 26, cy + 8, cx + 36, cy - 12); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = (i / n) * 40 - 20;
          out[i * 3] = u; out[i * 3 + 1] = 14 + 5 * Math.sin(u * 0.25) + 2.5 * Math.sin(u * 0.5 + 1.2);
          out[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
      }
    }
  ],
  // Page 6: Graphic Symbols
  [
    {
      id: "heart",
      drawSVG: `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.fillStyle = "rgba(112, 230, 255, 0.25)"; ctx.lineWidth = 3;
        ctx.beginPath(); const topY = cy - 20;
        ctx.moveTo(cx, topY + 16);
        ctx.bezierCurveTo(cx, topY, cx - 32, topY, cx - 32, topY + 24);
        ctx.bezierCurveTo(cx - 32, topY + 48, cx, topY + 62, cx, topY + 74);
        ctx.bezierCurveTo(cx, topY + 62, cx + 32, topY + 48, cx + 32, topY + 24);
        ctx.bezierCurveTo(cx + 32, topY, cx, topY + 16); ctx.stroke(); ctx.fill();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = (i + 0.5) / n, t = i * GOLDEN, r = Math.sqrt(u) * 0.88;
          out[i * 3] = 0.85 * r * 16 * Math.pow(Math.sin(t), 3);
          out[i * 3 + 1] = 14 + 0.72 * r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          out[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
        }
      }
    },
    {
      id: "star",
      drawSVG: `<polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        const spikes = 5, outerR = 28, innerR = 12;
        let rot = Math.PI / 2 * 3, x = cx, y = cy, step = Math.PI / spikes;
        ctx.beginPath(); ctx.moveTo(cx, cy - outerR);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerR; y = cy + Math.sin(rot) * outerR; ctx.lineTo(x, y); rot += step;
          x = cx + Math.cos(rot) * innerR; y = cy + Math.sin(rot) * innerR; ctx.lineTo(x, y); rot += step;
        }
        ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 100 15 L 124 72 L 186 75 L 138 114 L 154 174 L 100 138 L 46 174 L 62 114 L 14 75 L 76 72 Z", out, n, 0.22, 14)
    },
    {
      id: "infinity",
      drawSVG: `<path d="M6 12 C 2 6, 8 6, 12 12 C 16 18, 22 18, 18 12 C 14 6, 8 18, 6 12 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        for (let t = 0; t <= Math.PI * 2; t += 0.05) {
          const a = 30.0, denom = 1 + Math.sin(t) * Math.sin(t);
          const x = cx + (a * Math.cos(t)) / denom, y = cy + (a * Math.sin(t) * Math.cos(t)) / denom;
          if (t === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const t = (i / n) * Math.PI * 2, a = 12.0, denom = 1 + Math.sin(t) * Math.sin(t);
          out[i * 3] = (a * Math.cos(t)) / denom; out[i * 3 + 1] = 14 + (a * Math.sin(t) * Math.cos(t)) / denom; out[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
    },
    {
      id: "crown",
      drawSVG: `<path d="M3 18 L4 8 L9 13 L12 5 L15 13 L20 8 L21 18 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 30, cy + 18); ctx.lineTo(cx - 26, cy - 14); ctx.lineTo(cx - 12, cy + 2);
        ctx.lineTo(cx, cy - 24); ctx.lineTo(cx + 12, cy + 2); ctx.lineTo(cx + 26, cy - 14);
        ctx.lineTo(cx + 30, cy + 18); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n, theta = u * Math.PI * 2, r = 11.0;
          out[i * 3] = r * Math.cos(theta); out[i * 3 + 1] = 12 + Math.abs(Math.sin(theta * 2.5)) * 5.0; out[i * 3 + 2] = r * Math.sin(theta);
        }
      }
    }
  ],
  // Page 7: Aero & Vehicles
  [
    {
      id: "jet",
      drawSVG: `<path d="M12 2 L14 10 L22 14 L22 17 L14 15 L14 20 L17 22 L17 23 L12 22 L7 23 L7 22 L10 20 L10 15 L2 17 L2 14 L10 10 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx, cy - 30); ctx.lineTo(cx + 4, cy - 10); ctx.lineTo(cx + 32, cy + 2);
        ctx.lineTo(cx + 32, cy + 8); ctx.lineTo(cx + 4, cy + 4); ctx.lineTo(cx + 4, cy + 18);
        ctx.lineTo(cx + 12, cy + 24); ctx.lineTo(cx - 12, cy + 24); ctx.lineTo(cx - 4, cy + 18);
        ctx.lineTo(cx - 4, cy + 4); ctx.lineTo(cx - 32, cy + 8); ctx.lineTo(cx - 32, cy + 2);
        ctx.lineTo(cx - 4, cy - 10); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n;
          if (u < 0.4) {
            const t = (u / 0.4) * 36 - 18;
            out[i * 3] = (Math.random() - 0.5) * 1.5; out[i * 3 + 1] = 14 + (Math.random() - 0.5) * 1.5; out[i * 3 + 2] = t;
          } else {
            const w = (u - 0.4) / 0.6, side = i % 2 === 0 ? 1 : -1;
            out[i * 3] = w * 22 * side; out[i * 3 + 1] = 14 + (Math.random() - 0.5); out[i * 3 + 2] = w * 12 - 4;
          }
        }
      }
    },
    {
      id: "rocket",
      drawSVG: `<path d="M12 2 C16 6, 17 14, 15 18 L18 21 L15 21 L13 19 L11 19 L9 21 L6 21 L9 18 C7 14, 8 6, 12 2 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx, cy - 30); ctx.bezierCurveTo(cx + 16, cy - 10, cx + 16, cy + 12, cx + 8, cy + 20);
        ctx.lineTo(cx + 18, cy + 28); ctx.lineTo(cx - 18, cy + 28); ctx.lineTo(cx - 8, cy + 20);
        ctx.bezierCurveTo(cx - 16, cy + 12, cx - 16, cy - 10, cx, cy - 30); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n, y = u * 28 - 14, r = Math.sin(u * Math.PI * 0.9) * 4.5, theta = i * GOLDEN;
          out[i * 3] = r * Math.cos(theta); out[i * 3 + 1] = 14 - y; out[i * 3 + 2] = r * Math.sin(theta);
        }
      }
    },
    {
      id: "sailboat",
      drawSVG: `<path d="M4 18 L20 18 L18 22 L6 22 Z M12 4 L12 17 M12 5 L19 15 L12 15" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx - 28, cy + 12); ctx.lineTo(cx + 28, cy + 12); ctx.lineTo(cx + 20, cy + 24); ctx.lineTo(cx - 20, cy + 24); ctx.closePath();
        ctx.moveTo(cx - 2, cy + 8); ctx.lineTo(cx - 2, cy - 26); ctx.lineTo(cx + 22, cy + 8); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n;
          if (u < 0.4) {
            out[i * 3] = (u / 0.4) * 36 - 18; out[i * 3 + 1] = 10 + (Math.random() - 0.5) * 1.5; out[i * 3 + 2] = (Math.random() - 0.5) * 4;
          } else {
            const s = (u - 0.4) / 0.6;
            out[i * 3] = s * 16 - 2; out[i * 3 + 1] = 12 + (1 - s) * 20; out[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
          }
        }
      }
    },
    {
      id: "ufo",
      drawSVG: `<ellipse cx="12" cy="14" rx="10" ry="4" stroke-width="1.5"/><ellipse cx="12" cy="11" rx="5" ry="3" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.ellipse(cx, cy + 6, 36, 12, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy + 4, 16, Math.PI, 0); ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n, theta = i * GOLDEN;
          if (u < 0.65) {
            const r = 4 + Math.sqrt(u / 0.65) * 14;
            out[i * 3] = r * Math.cos(theta); out[i * 3 + 1] = 13 + (Math.random() - 0.5) * 1.2; out[i * 3 + 2] = r * Math.sin(theta);
          } else {
            const domeU = (u - 0.65) / 0.35, r = Math.cos(domeU * Math.PI * 0.5) * 7.5;
            out[i * 3] = r * Math.cos(theta); out[i * 3 + 1] = 13 + Math.sin(domeU * Math.PI * 0.5) * 6; out[i * 3 + 2] = r * Math.sin(theta);
          }
        }
      }
    }
  ],
  // Page 8: Nature & Symbols
  [
    {
      id: "skull",
      drawSVG: `<path d="M12 2a8 8 0 0 0-8 8c0 3 2 5.5 4.5 7v3h7v-3c2.5-1.5 4.5-4 4.5-7a8 8 0 0 0-8-8z" stroke-width="1.5"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.arc(cx, cy - 6, 22, Math.PI * 0.75, Math.PI * 0.25, false);
        ctx.lineTo(cx + 12, cy + 18); ctx.lineTo(cx - 12, cy + 18); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 100 30 C 50 30, 40 80, 40 110 C 40 140, 70 160, 70 190 L 130 190 C 130 160, 160 140, 160 110 C 160 80, 150 30, 100 30 Z", out, n, 0.18, 14)
    },
    {
      id: "lightning",
      drawSVG: `<polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx + 4, cy - 28); ctx.lineTo(cx - 20, cy + 2); ctx.lineTo(cx - 2, cy + 2);
        ctx.lineTo(cx - 4, cy + 28); ctx.lineTo(cx + 20, cy - 2); ctx.lineTo(cx + 2, cy - 2); ctx.closePath(); ctx.stroke();
      },
      gen: (out, n) => sampleSVGString("M 110 10 L 30 110 L 95 110 L 90 190 L 170 90 L 105 90 Z", out, n, 0.22, 14)
    },
    {
      id: "sunburst",
      drawSVG: `<circle cx="12" cy="12" r="4" stroke-width="1.5"/><path d="M12 2v3 M12 19v3 M2 12h3 M19 12h3" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(cx, cy, 12, 0, Math.PI * 2); ctx.stroke();
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16);
          ctx.lineTo(cx + Math.cos(a) * 28, cy + Math.sin(a) * 28); ctx.stroke();
        }
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n;
          if (u < 0.3) {
            const theta = i * GOLDEN;
            out[i * 3] = Math.cos(theta) * 5; out[i * 3 + 1] = 14 + Math.sin(theta) * 5; out[i * 3 + 2] = (Math.random() - 0.5) * 2;
          } else {
            const ray = i % 16, t = (ray / 16) * Math.PI * 2, r = 7 + ((i % 20) / 20) * 15;
            out[i * 3] = Math.cos(t) * r; out[i * 3 + 1] = 14 + Math.sin(t) * r; out[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
          }
        }
      }
    },
    {
      id: "tree",
      drawSVG: `<path d="M12 22 L12 14 M12 14 C6 14, 4 4, 12 2 C20 4, 18 14, 12 14 Z" stroke-width="1.5"/>`,
      drawCanvas: (ctx, cx, cy) => {
        ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 3; ctx.beginPath();
        ctx.moveTo(cx, cy + 24); ctx.lineTo(cx, cy + 4);
        ctx.arc(cx, cy - 8, 18, 0, Math.PI * 2);
        ctx.stroke();
      },
      gen: (out, n) => {
        for (let i = 0; i < n; i++) {
          const u = i / n;
          if (u < 0.25) {
            out[i * 3] = (Math.random() - 0.5) * 2; out[i * 3 + 1] = 3 + (u / 0.25) * 9; out[i * 3 + 2] = (Math.random() - 0.5) * 2;
          } else {
            const theta = i * GOLDEN, r = Math.sqrt((u - 0.25) / 0.75) * 13;
            out[i * 3] = r * Math.cos(theta); out[i * 3 + 1] = 14 + Math.sin((u - 0.25) * Math.PI) * 9; out[i * 3 + 2] = r * Math.sin(theta);
          }
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
