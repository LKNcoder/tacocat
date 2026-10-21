<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DroneShow Designer XR</title>
<style>
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body {
  margin: 0;
  overflow: hidden;
  background: #02040d;
  color: #e8efff;
  font: 14px/1.4 system-ui, sans-serif;
  user-select: none;
}
canvas { display: block; }

#panel {
  position: fixed;
  z-index: 2;
  left: 16px;
  top: 16px;
  width: min(580px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  padding: 14px;
  border: 1px solid #ffffff26;
  border-radius: 14px;
  background: #07101ddd;
  backdrop-filter: blur(14px);
  box-shadow: 0 12px 40px #0008;
}
#top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
#title { font-weight: 700; font-size: 16px; }
#status { color: #70e6ff; font-size: 12px; margin-bottom: 8px; }

.toolbar-btn {
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  background: #111e33;
  border: 1px solid #375077;
  color: #c0d1ed;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.toolbar-btn:hover { background: #1c3b6a; border-color: #70e6ff; color: #fff; }
.toolbar-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.section-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  text-transform: uppercase;
  color: #8fa2c3;
  margin: 8px 0 4px;
  letter-spacing: 0.5px;
}
.ctrl-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 11px;
  margin-bottom: 4px;
}
.ctrl-row label { display: flex; align-items: center; gap: 6px; color: #c0d1ed; cursor: pointer; }
.ctrl-row input[type="range"], .ctrl-row select, .ctrl-row input[type="text"] {
  flex: 1; accent-color: #70e6ff; background:#111e33; color:#fff;
  border:1px solid #233b5d; border-radius:4px; padding:3px 6px; font-size:11px;
}

.context-card {
  background: #0a1424;
  border: 1px solid #233b5d;
  border-radius: 8px;
  padding: 10px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.context-card.hidden { display: none !important; }

.tab-row { display: flex; gap: 4px; margin-bottom: 4px; }
.page-btn {
  flex: 1; padding: 4px 0; font-size: 10px; font-weight: bold;
  background: #111e33; border: 1px solid #233b5d; color: #9cb5db;
  border-radius: 5px; cursor: pointer;
}
.page-btn.active { background: #1b3864; border-color: #70e6ff; color: #ffffff; }

.icon-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}
button.symbol-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 52px; background: #172742; border: 1px solid #375077; border-radius: 8px;
  padding: 4px; cursor: grab;
}
button.symbol-btn:hover { background: #22385c; border-color: #70e6ff; }
button.symbol-btn:active { cursor: grabbing; }
button.symbol-btn.active { border-color: #70e6ff; background: #1c3b6a; }
button.symbol-btn svg { width: 24px; height: 24px; stroke: #70e6ff; fill: none; }
button.symbol-btn span { font-size: 9px; color: #8fa2c3; margin-top: 2px; }

.palette-builder {
  display: flex; align-items: center; gap: 8px;
  background: #0b1526; padding: 6px 8px; border-radius: 8px; border: 1px solid #233b5d;
}
.swatches-list { display: flex; gap: 6px; flex: 1; }
.swatch-slot {
  width: 22px; height: 22px; border-radius: 50%;
  border: 2px solid #ffffff44; cursor: pointer;
}
.swatch-slot.active { border-color: #ffffff; transform: scale(1.15); box-shadow: 0 0 8px #70e6ff; }
.swatch-ctrl-btn {
  padding: 3px 8px; font-size: 11px; font-weight: bold;
  background: #172742; border: 1px solid #375077; color: #ecf3ff;
  border-radius: 6px; cursor: pointer;
}

#desktop-spectrum {
  width: 100%; height: 16px; border-radius: 6px; border: 1px solid #ffffff44;
  cursor: crosshair;
  background: linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
}

/* Unified Timeline Module */
.timeline-module {
  background: #070f1e;
  border: 1px solid #233b5d;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
}
.timeline-grid {
  display: flex;
  gap: 8px;
  position: relative;
}
.timeline-headers-col {
  width: 80px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.header-cell {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 700;
  color: #8fa2c3;
  letter-spacing: 0.5px;
}
.header-actions { display: flex; gap: 2px; }
.track-add-btn, .track-del-btn {
  width: 20px; height: 20px; padding: 0; font-size: 11px; font-weight: bold;
  background: #132238; border: 1px solid #2e4a73; color: #9cb5db;
  border-radius: 3px; cursor: pointer; line-height: 1;
}
.track-add-btn:hover { background: #1c3b6a; color: #fff; border-color: #70e6ff; }
.track-del-btn:hover { background: #4a1924; color: #ff859c; border-color: #ff3b69; }

.timeline-lanes-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
}

.ruler-track {
  height: 24px;
  background: #0d1a30;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  border: 1px solid #ffffff1a;
}
.ruler-marker {
  position: absolute; top: 5px; font-size: 9px; color: #6a82a9;
  transform: translateX(-50%); pointer-events: none;
}

.track-lane {
  height: 36px;
  background: #040913;
  border: 1px solid #1a2c47;
  border-radius: 4px;
  position: relative;
  display: flex;
  overflow: hidden;
}
.track-lane.dragover {
  outline: 2px dashed #70e6ff;
  background: #071933;
}

.block-element {
  position: relative; height: 100%; display: flex; align-items: center;
  justify-content: center; cursor: pointer; box-sizing: border-box;
  overflow: hidden; font-size: 10px; font-weight: 600; border-right: 1px solid #0004;
}
.block-element.active-block { outline: 2px solid #ffffff; z-index: 2; }
.block-element.dragging { opacity: 0.4; }
.block-element.flight-gate { background: #13382c !important; color: #70ffb0; }
.block-element.text-block { background: #3b2054; color: #e4c2ff; border-left: 3px solid #df52ff; }

.resize-handle {
  position: absolute; right: 0; top: 0; width: 10px; height: 100%;
  cursor: col-resize; background: rgba(255, 255, 255, 0.25);
  touch-action: none; z-index: 5;
}
.resize-handle:hover { background: #70e6ff; }

.transition-block {
  background: repeating-linear-gradient(45deg, #1b283a, #1b283a 6px, #26384f 6px, #26384f 12px);
  cursor: pointer;
  font-size: 9px;
  color: #8fa2c3;
}
.transition-block:hover { background: #22385c; color: #70e6ff; }
.transition-block.active-block { outline: 2px solid #70e6ff; z-index: 3; }

#playhead-needle {
  position: absolute;
  top: -4px;
  bottom: 0;
  width: 2px;
  background: #ff3b69;
  box-shadow: 0 0 8px #ff3b69;
  z-index: 20;
  pointer-events: none;
  transform: translateX(-50%);
}
#playhead-handle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 14px;
  background: #ff3b69;
  clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%);
  cursor: ew-resize;
  pointer-events: auto;
  box-shadow: 0 0 6px #000;
}
#playhead-handle:hover { background: #ff7595; }

.timeline-bottom-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
#hint { color: #8fa2c3; font-size: 11px; margin-top: 8px; line-height: 1.4; }
#vr-tip {
  position: fixed; z-index: 1; bottom: 14px; left: 50%;
  transform: translateX(-50%); color: #b9c8e3; background: #07101dbb;
  padding: 7px 11px; border-radius: 8px; font-size: 12px; pointer-events: none;
}
body.xr-active #panel, body.xr-active #vr-tip, body.xr-active #VRButton { display: none !important; }
</style>
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
  }
}
</script>
</head>
<body>
<div id="panel">
  <div id="top-bar">
    <div id="title">DroneShow Designer XR</div>
    <div style="display:flex; gap:6px;">
      <button class="toolbar-btn" id="btn-undo" title="Revert last action (Ctrl+Z)">↶ Undo</button>
    </div>
  </div>
  <div id="status">Unified Single-Track Timeline · Synchronized Block Hierarchy</div>

  <!-- Global Fleet & Environmental Precipitation -->
  <div class="ctrl-row" style="margin-top:6px;">
    <span style="min-width:65px;">Active Fleet:</span>
    <input type="range" id="slider-fleet-count" min="100" max="1200" step="10" value="400">
    <span id="val-fleet-count" style="color:#70e6ff; font-weight:bold; min-width:35px; text-align:right;">400</span>
  </div>

  <div class="section-label" style="cursor:pointer;" id="label-precip-toggle">
    <span>Environmental Precipitation</span>
    <label style="cursor:pointer;"><input type="checkbox" id="chk-precip" checked> <b>Active</b></label>
  </div>
  <div class="context-card" id="card-precip-options">
    <div class="ctrl-row">
      <span style="min-width:60px;">Type:</span>
      <select id="sel-precip-type">
        <option value="snow" selected>Snow (Harmonic Drift)</option>
        <option value="rain">Rain (Direct Streaks)</option>
      </select>
      <span style="min-width:40px; text-align:right;">Drones:</span>
      <input type="range" id="slider-precip-count" min="10" max="150" step="5" value="50" style="max-width:80px;">
      <span id="val-precip-count" style="min-width:28px; text-align:right;">50</span>
    </div>
    <div class="ctrl-row">
      <span style="min-width:60px;">Speed:</span>
      <input type="range" id="slider-precip-speed" min="-6.0" max="6.0" step="0.2" value="2.4">
      <span id="val-precip-speed" style="min-width:55px; text-align:right;">2.4 m/s</span>
    </div>
    <div class="ctrl-row">
      <span style="min-width:60px;">Wind Angle:</span>
      <input type="range" id="slider-precip-angle" min="-45" max="45" step="1" value="0">
      <span id="val-precip-angle" style="min-width:55px; text-align:right;">0°</span>
    </div>
    <div class="ctrl-row">
      <span style="min-width:60px;">Lighting FX:</span>
      <select id="sel-precip-fx">
        <option value="glimmer" selected>Soft Glimmer</option>
        <option value="sparkle">Diamond Sparkle</option>
        <option value="rainbow">Rainbow Prism</option>
        <option value="strobe">Emergency Strobe</option>
      </select>
      <input type="color" id="picker-precip-color" value="#ffffff" style="max-width:36px; height:24px; padding:0; border:none; background:none; cursor:pointer;">
    </div>
  </div>

  <!-- INSPECTOR: Formation Block -->
  <div class="context-card hidden" id="card-inspector-formation">
    <div class="section-label" style="margin:0;">
      <span id="inspector-block-title">Formation Properties</span>
      <span id="inspector-shape-name" style="color:#70e6ff;">xmasTree</span>
    </div>

    <!-- Shape/Text Switcher Tabs -->
    <div id="formation-sub-shape">
      <div class="tab-row" id="page-tabs"></div>
      <div class="icon-grid" id="desktop-icon-grid"></div>
    </div>
    <div class="hidden" id="formation-sub-text">
      <div class="ctrl-row" style="margin-top:4px;">
        <span style="min-width:55px;">Message:</span>
        <input type="text" id="input-text-msg" value="HAPPY NEW YEAR" maxlength="28">
        <button class="toolbar-btn" id="btn-vr-keyboard" style="padding:2px 8px; font-size:10px;">⌨ VR Key</button>
      </div>
      <div class="ctrl-row">
        <span style="min-width:55px;">Font:</span>
        <select id="sel-text-font">
          <option value="Impact" selected>Impact (Block)</option>
          <option value="Arial">Arial (Sans)</option>
          <option value="Georgia">Georgia (Serif)</option>
          <option value="Courier New">Courier (Mono)</option>
          <option value="Brush Script MT">Brush (Cursive)</option>
        </select>
        <select id="sel-text-fx" style="max-width:130px;">
          <option value="scroll" selected>Marquee Scroll</option>
          <option value="wave">Ocean Wave</option>
          <option value="dissolve">Dissolve</option>
          <option value="pulse">Pulse</option>
          <option value="none">Static</option>
        </select>
      </div>
    </div>

    <!-- Geometry: Altitude & Scale & Rotation -->
    <div class="section-label" style="margin-top:6px;"><span>Staging & Kinematics</span></div>
    <div class="ctrl-row">
      <span style="min-width:50px;">Altitude:</span>
      <input type="range" id="slider-block-alt" min="6" max="36" step="1" value="18">
      <span id="val-block-alt" style="min-width:32px; text-align:right;">18m</span>
      <span style="min-width:40px; text-align:right;">Scale:</span>
      <input type="range" id="slider-block-scale" min="0.4" max="2.5" step="0.1" value="1.0">
      <span id="val-block-scale" style="min-width:32px; text-align:right;">1.0x</span>
    </div>
    <div class="ctrl-row">
      <span style="min-width:50px;">Y Spin:</span>
      <input type="range" id="slider-block-rot-start" min="-180" max="180" step="5" value="0">
      <input type="range" id="slider-block-rot-end" min="-180" max="180" step="5" value="30">
      <span id="val-block-rot" style="min-width:65px; font-size:10px; text-align:right;">0→30°/s</span>
    </div>

    <!-- Synchronized Color Palette & FX -->
    <div class="section-label" style="margin-top:6px;"><span>Synchronized Palette & Lighting</span></div>
    <div class="palette-builder">
      <div class="swatches-list" id="swatches-container"></div>
      <button class="swatch-ctrl-btn" id="btn-add-color">+ Swatch</button>
      <button class="swatch-ctrl-btn" id="btn-del-color">− Swatch</button>
      <button class="swatch-ctrl-btn" id="btn-auto-zone" style="background:#1b3864; border-color:#70e6ff;">Auto-Zone</button>
    </div>
    <div id="desktop-spectrum"></div>
    <div class="ctrl-row" style="margin-top:4px;">
      <span style="min-width:50px;">Cycle:</span>
      <input type="range" id="slider-cycle-speed" min="0" max="4" step="0.1" value="0">
      <span id="val-cycle-speed" style="min-width:30px; text-align:right;">0x</span>
      <label><input type="checkbox" id="chk-run"> Run</label>
      <label><input type="checkbox" id="chk-blink"> Blink</label>
      <label><input type="checkbox" id="chk-sparkle"> Sparkle</label>
    </div>
  </div>

  <!-- INSPECTOR: Transition Period -->
  <div class="context-card hidden" id="card-inspector-transition">
    <div class="section-label" style="margin:0;">
      <span>Transition Period Settings</span>
      <span id="inspector-trans-id" style="color:#70e6ff;">⇄ Transition</span>
    </div>
    <div class="ctrl-row" style="margin-top:4px;">
      <span style="min-width:70px;">Duration:</span>
      <input type="range" id="slider-trans-dur" min="1.0" max="10.0" step="0.5" value="4.0">
      <span id="val-trans-dur" style="min-width:35px; text-align:right;">4.0s</span>
    </div>
    <div class="ctrl-row">
      <span style="min-width:70px;">Lighting FX:</span>
      <select id="sel-trans-fx">
        <option value="blend" selected>Smooth Palette Cross-Fade</option>
        <option value="sparkle">Diamond Sparkle Flurry</option>
        <option value="beacon">Amber Navigation Beacons</option>
        <option value="strobe">High-Energy Strobe Warning</option>
      </select>
    </div>
  </div>

  <!-- INSPECTOR: Takeoff Gate -->
  <div class="context-card hidden" id="card-inspector-takeoff">
    <div class="section-label" style="margin:0;">
      <span>Takeoff Launch Sequence</span>
      <span style="color:#70ffb0;">▲ Ground to Sky</span>
    </div>
    <div class="ctrl-row" style="margin-top:4px;">
      <span style="min-width:65px;">Style:</span>
      <select id="sel-takeoff-style">
        <option value="wave" selected>Concentric Wave</option>
        <option value="uniform">Uniform Elevator</option>
        <option value="spiral">Spiral Vortex</option>
      </select>
    </div>
    <div class="ctrl-row">
      <span style="min-width:65px;">Duration:</span>
      <input type="range" id="slider-takeoff-dur" min="4" max="16" step="1" value="8">
      <span id="val-takeoff-dur" style="min-width:35px; text-align:right;">8s</span>
    </div>
  </div>

  <!-- INSPECTOR: Landing Gate -->
  <div class="context-card hidden" id="card-inspector-landing">
    <div class="section-label" style="margin:0;">
      <span>Return to Home (Landing)</span>
      <span style="color:#ff859c;">▼ Sky to Ground</span>
    </div>
    <div class="ctrl-row" style="margin-top:4px;">
      <span style="min-width:65px;">Style:</span>
      <select id="sel-landing-style">
        <option value="uniform" selected>Simultaneous Descent</option>
        <option value="wave">Concentric Settle Wave</option>
      </select>
    </div>
    <div class="ctrl-row">
      <span style="min-width:65px;">Duration:</span>
      <input type="range" id="slider-landing-dur" min="4" max="16" step="1" value="8">
      <span id="val-landing-dur" style="min-width:35px; text-align:right;">8s</span>
    </div>
  </div>

  <!-- Unified Single-Track Timeline Module -->
  <div class="timeline-module">
    <div class="timeline-grid">
      <div class="timeline-headers-col">
        <div class="header-cell" style="color:#6a82a9;">TIMECODE</div>
        <div class="header-cell">
          <span>SHOW TRACK</span>
          <div class="header-actions">
            <button class="track-add-btn" id="btn-add-shape" title="Add formation block">+</button>
            <button class="track-add-btn" id="btn-add-text" title="Add text block" style="color:#df52ff;">T</button>
            <button class="track-del-btn" id="btn-del-shape" title="Delete selected block">−</button>
          </div>
        </div>
      </div>

      <div class="timeline-lanes-col" id="timeline-lanes-area">
        <div id="playhead-needle" style="left:0%;">
          <div id="playhead-handle"></div>
        </div>
        <div class="ruler-track" id="master-ruler"></div>
        <div class="track-lane" id="lane-unified"></div>
      </div>
    </div>

    <div class="timeline-bottom-row">
      <button id="btn-play" style="padding:4px 14px; font-size:11px; background:#1b3864; border:1px solid #70e6ff; color:#fff; border-radius:4px; cursor:pointer;">Play</button>
      <span id="time-display" style="font-size:11px; font-variant-numeric:tabular-nums; min-width:85px;">00:00 / 01:00</span>
      <span style="font-size:10px; color:#8fa2c3; flex:1; text-align:right;">Click any block or transition to inspect</span>
    </div>
  </div>

  <div id="hint">
    <b>Unified Track:</b> Colors, rotation, scale, and altitude are configured per block.<br>
    <b>Precipitation:</b> Flurries park on ground pad at launch; LEDs extinguish while recycling.<br>
    <b>Painting:</b> Select swatch, hold <b>Shift</b> + drag in 3D (Desktop) or squeeze trigger in VR.
  </div>
</div>
<div id="vr-tip">In VR: Press Left X for HUD · Trigger paints drones with active swatch</div>

<script type="module">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { SHAPE_PAGES, findShapeById, generateTextDrones } from "./shapes.js";

function formatTime(s) {
  if (isNaN(s) || s === undefined || s === null) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

const MAX_DRONES = 1200;
let activeDroneCount = 400;
let TOTAL_DURATION = 60.0;
let panSensitivity = 5.0;
const BASE_DRONE_SIZE = 0.55;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

// Gate Configurations
let takeoffConfig = { dur: 8.0, style: "wave" };
let landingConfig = { dur: 8.0, style: "uniform" };

// Environmental Precipitation State
let precipConfig = {
  enabled: true,
  type: "snow",
  count: 50,
  speed: 2.4, // Negative = rising sparks/bubbles!
  angle: 0.0, // Degrees wind tilt
  fx: "glimmer",
  color: "#ffffff"
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040d);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500);
camera.position.set(0, 16, 52);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.xr.enabled = true;
renderer.xr.setFoveation(0.0);

document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const xrRig = new THREE.Group();
scene.add(xrRig);
xrRig.add(camera);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 14, 0);
orbit.update();

const stageGroup = new THREE.Group();
scene.add(stageGroup);

const leftController = renderer.xr.getController(0);
const rightController = renderer.xr.getController(1);
xrRig.add(leftController);
xrRig.add(rightController);

const controllerRays = [];
function createRay(controller) {
  const geom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
  const mat = new THREE.LineBasicMaterial({ color: 0x70e6ff, transparent: true, opacity: 0.65 });
  const line = new THREE.Line(geom, mat);
  line.scale.z = 4;
  line.visible = false;
  controller.add(line);
  controllerRays.push(line);
  return line;
}
createRay(leftController);
createRay(rightController);

function createPaintSphere(controller) {
  const geom = new THREE.SphereGeometry(1.6, 16, 12);
  const mat = new THREE.MeshBasicMaterial({ color: 0x70e6ff, wireframe: true, transparent: true, opacity: 0.45 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.visible = false;
  controller.add(mesh);
  return mesh;
}
const paintMeshL = createPaintSphere(leftController);
const paintMeshR = createPaintSphere(rightController);

scene.add(new THREE.HemisphereLight(0x9bbcff, 0x101629, 1.2));
const gridHelper = new THREE.GridHelper(90, 45, 0x274064, 0x14223b);
stageGroup.add(gridHelper);

const launchPadGeom = new THREE.PlaneGeometry(32, 32);
const launchPadMat = new THREE.MeshBasicMaterial({ color: 0x071b33, side: THREE.DoubleSide });
const launchPadMesh = new THREE.Mesh(launchPadGeom, launchPadMat);
launchPadMesh.rotation.x = -Math.PI / 2;
launchPadMesh.position.y = 0.05;
stageGroup.add(launchPadMesh);

const glowCanvas = document.createElement("canvas");
glowCanvas.width = 64; glowCanvas.height = 64;
const glowCtx = glowCanvas.getContext("2d");
const grad = glowCtx.createRadialGradient(32, 32, 1, 32, 32, 32);
grad.addColorStop(0, "rgba(255,255,255,1)");
grad.addColorStop(0.25, "rgba(255,255,255,0.9)");
grad.addColorStop(0.6, "rgba(255,255,255,0.2)");
grad.addColorStop(1, "rgba(255,255,255,0)");
glowCtx.fillStyle = grad;
glowCtx.fillRect(0, 0, 64, 64);
const glowTexture = new THREE.CanvasTexture(glowCanvas);
glowTexture.colorSpace = THREE.SRGBColorSpace;

const currentPositions = new Float32Array(MAX_DRONES * 3);
const targetPositions = new Float32Array(MAX_DRONES * 3);
const velocities = new Float32Array(MAX_DRONES * 3);
const currentColors = new Float32Array(MAX_DRONES * 3);
const targetColors = new Float32Array(MAX_DRONES * 3);
const droneSwatchIndices = new Uint8Array(MAX_DRONES);

// Ground Launchpad Coordinates
const groundPositions = new Float32Array(MAX_DRONES * 3);
function updateGroundPositions(n) {
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const spacing = 1.15;
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    groundPositions[i * 3]     = (c - (cols - 1) * 0.5) * spacing;
    groundPositions[i * 3 + 1] = 0.12;
    groundPositions[i * 3 + 2] = (r - (rows - 1) * 0.5) * spacing;
  }
}
updateGroundPositions(activeDroneCount);

// Ambient Precipitation Buffers
const precipPositions = new Float32Array(MAX_DRONES * 3);
const precipDriftSeeds = new Float32Array(MAX_DRONES);
function initPrecipPositions() {
  for (let i = 0; i < MAX_DRONES; i++) {
    precipPositions[i * 3]     = (Math.random() - 0.5) * 36;
    precipPositions[i * 3 + 1] = 1.5 + Math.random() * 30;
    precipPositions[i * 3 + 2] = (Math.random() - 0.5) * 36;
    precipDriftSeeds[i]        = Math.random() * Math.PI * 2;
  }
}
initPrecipPositions();

for (let i = 0; i < MAX_DRONES; i++) {
  currentPositions[i * 3]     = groundPositions[i * 3];
  currentPositions[i * 3 + 1] = groundPositions[i * 3 + 1];
  currentPositions[i * 3 + 2] = groundPositions[i * 3 + 2];
  targetPositions[i * 3]      = currentPositions[i * 3];
  targetPositions[i * 3 + 1]  = currentPositions[i * 3 + 1];
  targetPositions[i * 3 + 2]  = currentPositions[i * 3 + 2];
}

const droneGeometry = new THREE.BufferGeometry();
droneGeometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
droneGeometry.setAttribute("color", new THREE.BufferAttribute(currentColors, 3));
droneGeometry.setDrawRange(0, activeDroneCount);

const dronePoints = new THREE.Points(
  droneGeometry,
  new THREE.PointsMaterial({
    size: BASE_DRONE_SIZE,
    map: glowTexture,
    vertexColors: true,
    transparent: true,
    alphaTest: 0.05,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
);
stageGroup.add(dronePoints);

function assignMinimalPaths(currentPos, rawTargets, count) {
  const assigned = new Float32Array(count * 3);
  const unassigned = new Set();
  for (let i = 0; i < count; i++) unassigned.add(i);

  for (let i = 0; i < count; i++) {
    const cx = currentPos[i * 3], cy = currentPos[i * 3 + 1], cz = currentPos[i * 3 + 2];
    let closest = -1, minD = Infinity;
    for (const tIdx of unassigned) {
      const tx = rawTargets[tIdx * 3], ty = rawTargets[tIdx * 3 + 1], tz = rawTargets[tIdx * 3 + 2];
      const d = (cx - tx) ** 2 + (cy - ty) ** 2 + (cz - tz) ** 2;
      if (d < minD) { minD = d; closest = tIdx; }
    }
    unassigned.delete(closest);
    assigned[i * 3]     = rawTargets[closest * 3];
    assigned[i * 3 + 1] = rawTargets[closest * 3 + 1];
    assigned[i * 3 + 2] = rawTargets[closest * 3 + 2];
  }
  return assigned;
}

// Unified Timeline Architecture: All Parameters Integrated into Blocks
const timelineData = {
  formationBlocks: [
    {
      id: "f0", shapeId: "xmasTree", isText: false, dur: 18.0, transDur: 4.0,
      transColorFX: "blend", altitude: 18.0, scale: 1.0, rotStartY: 0, rotEndY: 30,
      palette: ["#ffd700", "#00c853", "#8b4513", "#ff1744", "#00e5ff"],
      activeSwatchIdx: 0, cycleSpeed: 0.0, run: false, runSpeed: 3.0, blink: false, blinkSpeed: 3.0, sparkle: true, sparkleDensity: 0.25
    },
    {
      id: "t0", isText: true, text: "HAPPY NEW YEAR", font: "Impact", fx: "scroll", speed: 1.0, dur: 22.0, transDur: 4.0,
      transColorFX: "sparkle", altitude: 19.0, scale: 1.1, rotStartY: 0, rotEndY: 0,
      palette: ["#ff0055", "#00ffff"],
      activeSwatchIdx: 0, cycleSpeed: 1.0, run: true, runSpeed: 4.0, blink: false, blinkSpeed: 3.0, sparkle: false, sparkleDensity: 0.35
    },
    {
      id: "f1", shapeId: "giftBox", isText: false, dur: 18.0, transDur: 0.0,
      transColorFX: "blend", altitude: 16.0, scale: 1.0, rotStartY: 0, rotEndY: 45,
      palette: ["#ff0033", "#ffffff", "#ffd700"],
      activeSwatchIdx: 0, cycleSpeed: 0.5, run: true, runSpeed: 3.5, blink: false, blinkSpeed: 3.0, sparkle: false, sparkleDensity: 0.35
    }
  ]
};

// Selection State: "takeoff" | "formation" | "transition" | "landing"
let selectedInspectorType = "formation";
let selectedFormationBlockId = "f0";
let selectedTransitionBlockId = null;

let formationTrajectories = [];
let formationSwatchStore = [];

function buildShowTrajectoryData() {
  const formationCount = precipConfig.enabled ? Math.max(50, activeDroneCount - precipConfig.count) : activeDroneCount;
  formationTrajectories = [];
  formationSwatchStore = [];

  let prevSlots = groundPositions;

  for (let i = 0; i < timelineData.formationBlocks.length; i++) {
    const b = timelineData.formationBlocks[i];
    const raw = new Float32Array(formationCount * 3);
    const swatches = new Uint8Array(formationCount);

    if (b.isText) {
      generateTextDrones(raw, b.text || "DRONE", formationCount, b.font || "Impact", 0.28, 14);
      for (let s = 0; s < formationCount; s++) swatches[s] = s % (b.palette?.length || 2);
    } else {
      const shape = findShapeById(b.shapeId);
      if (shape) shape.gen(raw, formationCount, swatches);
    }

    const assigned = assignMinimalPaths(prevSlots, raw, formationCount);
    formationTrajectories.push(assigned);
    formationSwatchStore.push(swatches);
    prevSlots = assigned;
  }
}

function recalculateTimelineDuration() {
  let formTotal = 0;
  for (const b of timelineData.formationBlocks) formTotal += b.dur + (b.transDur || 0);
  TOTAL_DURATION = takeoffConfig.dur + Math.max(formTotal, 20.0) + landingConfig.dur;
}
recalculateTimelineDuration();
buildShowTrajectoryData();

// Multi-Level Undo
const undoStack = [];
function saveUndoState() {
  undoStack.push({
    timeline: JSON.parse(JSON.stringify(timelineData)),
    swatches: new Uint8Array(droneSwatchIndices),
    selectedType: selectedInspectorType,
    selectedF: selectedFormationBlockId,
    selectedT: selectedTransitionBlockId,
    takeoffConfig: { ...takeoffConfig },
    landingConfig: { ...landingConfig },
    precipConfig: { ...precipConfig }
  });
  if (undoStack.length > 40) undoStack.shift();
  updateUndoButton();
}

function updateUndoButton() {
  const btn = document.getElementById("btn-undo");
  if (btn) btn.disabled = (undoStack.length === 0);
}

function performUndo() {
  if (undoStack.length === 0) return;
  const state = undoStack.pop();
  timelineData.formationBlocks = state.timeline.formationBlocks;
  droneSwatchIndices.set(state.swatches);
  selectedInspectorType = state.selectedType;
  selectedFormationBlockId = state.selectedF;
  selectedTransitionBlockId = state.selectedT;
  takeoffConfig = state.takeoffConfig;
  landingConfig = state.landingConfig;
  precipConfig = state.precipConfig;

  recalculateTimelineDuration();
  buildShowTrajectoryData();
  evaluateTimeline(playheadTime);
  buildDesktopTimeline();
  updateContextPanels();
  updateUndoButton();
  if (vrHUD.visible) renderHUD();
}

document.getElementById("btn-undo").onclick = performUndo;
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
    e.preventDefault();
    performUndo();
  }
});

let playheadTime = 0.0;
let isPlaying = false;
const tempColor = new THREE.Color();

function applyAutoZoneColors() {
  saveUndoState();
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (!b || !b.palette || b.palette.length <= 1) return;

  const formationCount = precipConfig.enabled ? Math.max(50, activeDroneCount - precipConfig.count) : activeDroneCount;
  let minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < formationCount; i++) {
    const y = targetPositions[i * 3 + 1];
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const span = Math.max(0.1, maxY - minY);
  const nSwatches = b.palette.length;

  for (let i = 0; i < formationCount; i++) {
    const normH = (targetPositions[i * 3 + 1] - minY) / span;
    const swatchIdx = Math.min(nSwatches - 1, Math.floor((1.0 - normH) * nSwatches));
    droneSwatchIndices[i] = swatchIdx;
  }
}

function applyLightingFX(block, timeSec) {
  const pal = block.palette || ["#ffffff"];
  const nColors = pal.length;
  const formationCount = precipConfig.enabled ? Math.max(50, activeDroneCount - precipConfig.count) : activeDroneCount;

  for (let i = 0; i < formationCount; i++) {
    let r = 1, g = 1, b = 1;
    const swatchIdx = droneSwatchIndices[i] % nColors;
    tempColor.set(pal[swatchIdx]);
    r = tempColor.r; g = tempColor.g; b = tempColor.b;

    if (swatchIdx === 3 || swatchIdx === 4) {
      const twinkle = Math.sin(timeSec * 6.0 + i * 2.3) * 0.35 + 0.85;
      r = Math.min(1, r * twinkle); g = Math.min(1, g * twinkle); b = Math.min(1, b * twinkle);
    }
    if (block.run) {
      const wave = Math.sin(timeSec * block.runSpeed - (i / formationCount) * 8.0);
      if (wave > 0.3) { r = Math.min(1, r * 1.5); g = Math.min(1, g * 1.5); b = Math.min(1, b * 1.5); }
    }
    if (block.blink) {
      const on = Math.sin(timeSec * Math.PI * 2 * block.blinkSpeed) > 0;
      const factor = on ? 1.0 : 0.08;
      r *= factor; g *= factor; b *= factor;
    }
    if (block.sparkle && Math.sin(i * 127.1 + timeSec * 16.0) > (1.0 - block.sparkleDensity * 0.8)) {
      r = 1.0; g = 1.0; b = 1.0;
    }

    targetColors[i * 3]     = r;
    targetColors[i * 3 + 1] = g;
    targetColors[i * 3 + 2] = b;
  }
}

// Procedural Motion FX
function applyTextProceduralFX(block, tOffset, count, inOutVecArray) {
  if (!block || !block.isText || !block.fx || block.fx === "none") return;
  const speed = block.speed || 1.0;
  const time = tOffset * speed;

  if (block.fx === "scroll") {
    const scrollSpan = 38.0;
    const xShift = (time * 8.5) % scrollSpan;
    for (let i = 0; i < count; i++) {
      let x = inOutVecArray[i * 3] - xShift;
      if (x < -scrollSpan * 0.5) x += scrollSpan;
      inOutVecArray[i * 3] = x;
    }
  } else if (block.fx === "wave") {
    for (let i = 0; i < count; i++) {
      const x = inOutVecArray[i * 3];
      inOutVecArray[i * 3 + 1] += Math.sin(time * 3.5 + x * 0.28) * 2.2;
    }
  } else if (block.fx === "dissolve") {
    const scatterCycle = Math.sin(time * 2.0);
    const envelope = Math.max(0, scatterCycle * scatterCycle - 0.25) * 4.5;
    for (let i = 0; i < count; i++) {
      inOutVecArray[i * 3]     += Math.sin(i * 12.3 + time * 4.0) * envelope;
      inOutVecArray[i * 3 + 1] += Math.cos(i * 7.1 + time * 3.0) * envelope;
      inOutVecArray[i * 3 + 2] += Math.sin(i * 19.5 + time * 5.0) * envelope;
    }
  } else if (block.fx === "pulse") {
    const s = 1.0 + Math.sin(time * 3.0) * 0.16;
    for (let i = 0; i < count; i++) {
      inOutVecArray[i * 3]     *= s;
      inOutVecArray[i * 3 + 1] = 14 + (inOutVecArray[i * 3 + 1] - 14) * s;
    }
  }
}

const rotEuler = new THREE.Euler(0, 0, 0, "YXZ");
const rotMatrix = new THREE.Matrix4();
const centerPt = new THREE.Vector3(0, 18, 0);

function transformToSky(x, y, z, altitude, scale, angleY, outVec) {
  rotEuler.set(0, angleY, 0);
  rotMatrix.makeRotationFromEuler(rotEuler);
  centerPt.set(0, altitude, 0);

  outVec.set(
    x * scale,
    (y - 14) * scale + altitude,
    z * scale
  );
  outVec.sub(centerPt);
  outVec.applyMatrix4(rotMatrix);
  outVec.add(centerPt);
  outVec.y = Math.max(0.12, outVec.y);
}

const skyPosA = new THREE.Vector3();
const skyPosB = new THREE.Vector3();
const localScratchPoints = new Float32Array(MAX_DRONES * 3);

function evaluateTimeline(t) {
  const formationCount = precipConfig.enabled ? Math.max(50, activeDroneCount - precipConfig.count) : activeDroneCount;
  const showBodyEnd = TOTAL_DURATION - landingConfig.dur;
  if (formationTrajectories.length === 0) return;

  // 1. TAKEOFF
  if (t <= takeoffConfig.dur) {
    const u = Math.max(0, t / takeoffConfig.dur);
    const firstTargets = formationTrajectories[0];
    const firstSwatches = formationSwatchStore[0];
    const b0 = timelineData.formationBlocks[0];
    const alt = b0.altitude || 18.0;
    const scl = b0.scale || 1.0;
    const v0y = THREE.MathUtils.degToRad(b0.rotStartY || 0);

    for (let i = 0; i < formationCount; i++) {
      const gx = groundPositions[i * 3];
      const gy = groundPositions[i * 3 + 1];
      const gz = groundPositions[i * 3 + 2];

      transformToSky(firstTargets[i * 3], firstTargets[i * 3 + 1], firstTargets[i * 3 + 2], alt, scl, v0y, skyPosA);

      let prog = u;
      if (takeoffConfig.style === "wave") {
        const dist = Math.sqrt(gx * gx + gz * gz) / 16.0;
        prog = THREE.MathUtils.clamp((u - dist * 0.35) / 0.65, 0, 1);
      } else if (takeoffConfig.style === "spiral") {
        const angle = Math.atan2(gz, gx);
        prog = THREE.MathUtils.clamp((u - (angle / (Math.PI * 2) + 0.5) * 0.3) / 0.7, 0, 1);
      }
      const ease = prog * prog * (3 - 2 * prog);

      targetPositions[i * 3]     = gx + (skyPosA.x - gx) * ease;
      targetPositions[i * 3 + 1] = gy + (skyPosA.y - gy) * ease;
      targetPositions[i * 3 + 2] = gz + (skyPosA.z - gz) * ease;

      if (firstSwatches) droneSwatchIndices[i] = firstSwatches[i];

      targetColors[i * 3]     = 0.3 + 0.7 * ease;
      targetColors[i * 3 + 1] = 0.6 + 0.4 * ease;
      targetColors[i * 3 + 2] = 0.3 + 0.7 * ease;
    }
  }

  // 2. ACTIVE SHOW FORMATIONS
  else if (t > takeoffConfig.dur && t < showBodyEnd) {
    const showT = t - takeoffConfig.dur;
    let curT = 0;

    for (let i = 0; i < timelineData.formationBlocks.length; i++) {
      const b = timelineData.formationBlocks[i];
      const formStart = curT, formEnd = curT + b.dur, transEnd = formEnd + (b.transDur || 0);
      const currTargets = formationTrajectories[i];
      const currSwatches = formationSwatchStore[i];

      const alt = b.altitude || 18.0;
      const scl = b.scale || 1.0;
      const v0y = THREE.MathUtils.degToRad(b.rotStartY || 0);
      const v1y = THREE.MathUtils.degToRad(b.rotEndY || 0);

      if (showT >= formStart && showT < formEnd) {
        // Hold Window
        const uBlock = (showT - formStart) / b.dur;
        const curRotY = v0y + (v1y - v0y) * uBlock;

        localScratchPoints.set(currTargets.subarray(0, formationCount * 3));
        if (b.isText) applyTextProceduralFX(b, showT - formStart, formationCount, localScratchPoints);

        for (let j = 0; j < formationCount; j++) {
          transformToSky(localScratchPoints[j * 3], localScratchPoints[j * 3 + 1], localScratchPoints[j * 3 + 2], alt, scl, curRotY, skyPosA);
          targetPositions[j * 3]     = skyPosA.x;
          targetPositions[j * 3 + 1] = skyPosA.y;
          targetPositions[j * 3 + 2] = skyPosA.z;
          if (currSwatches) droneSwatchIndices[j] = currSwatches[j];
        }

        applyLightingFX(b, t);
        break;
      } else if (showT >= formEnd && showT < transEnd) {
        // Transition Period
        const nextIdx = (i + 1 < timelineData.formationBlocks.length) ? i + 1 : 0;
        const nextB = timelineData.formationBlocks[nextIdx];
        const nextTargets = formationTrajectories[nextIdx];
        const nextSwatches = formationSwatchStore[nextIdx];

        const progress = (showT - formEnd) / b.transDur;
        const ease = progress * progress * (3 - 2 * progress);

        // Smooth Altitude & Scale Interpolation between formations
        const nextAlt = nextB.altitude || 18.0;
        const nextScl = nextB.scale || 1.0;
        const interpAlt = alt + (nextAlt - alt) * ease;
        const interpScl = scl + (nextScl - scl) * ease;

        const nextV0y = THREE.MathUtils.degToRad(nextB.rotStartY || 0);
        const curRotY = v1y + (nextV0y - v1y) * ease;

        localScratchPoints.set(currTargets.subarray(0, formationCount * 3));
        if (b.isText) applyTextProceduralFX(b, showT - formStart, formationCount, localScratchPoints);

        for (let j = 0; j < formationCount; j++) {
          transformToSky(localScratchPoints[j * 3], localScratchPoints[j * 3 + 1], localScratchPoints[j * 3 + 2], interpAlt, interpScl, curRotY, skyPosA);
          transformToSky(nextTargets[j * 3], nextTargets[j * 3 + 1], nextTargets[j * 3 + 2], interpAlt, interpScl, curRotY, skyPosB);

          targetPositions[j * 3]     = skyPosA.x + (skyPosB.x - skyPosA.x) * ease;
          targetPositions[j * 3 + 1] = skyPosA.y + (skyPosB.y - skyPosA.y) * ease;
          targetPositions[j * 3 + 2] = skyPosA.z + (skyPosB.z - skyPosA.z) * ease;

          if (ease > 0.5 && nextSwatches) droneSwatchIndices[j] = nextSwatches[j];
          else if (currSwatches) droneSwatchIndices[j] = currSwatches[j];
        }

        // Transition Lighting FX
        const transFX = b.transColorFX || "blend";
        if (transFX === "sparkle") {
          for (let j = 0; j < formationCount; j++) {
            const sparkle = Math.sin(t * 16.0 + j * 7.0) > 0.3 ? 1.0 : 0.2;
            targetColors[j * 3] = sparkle; targetColors[j * 3 + 1] = sparkle; targetColors[j * 3 + 2] = sparkle;
          }
        } else if (transFX === "beacon") {
          for (let j = 0; j < formationCount; j++) {
            const beacon = Math.sin(t * 8.0 + j) > 0.4 ? 1.0 : 0.2;
            targetColors[j * 3] = beacon; targetColors[j * 3 + 1] = beacon * 0.45; targetColors[j * 3 + 2] = 0.05;
          }
        } else if (transFX === "strobe") {
          const on = Math.sin(t * 22.0) > 0;
          for (let j = 0; j < formationCount; j++) {
            targetColors[j * 3] = on ? 1 : 0.05; targetColors[j * 3 + 1] = on ? 1 : 0.05; targetColors[j * 3 + 2] = on ? 1 : 0.05;
          }
        } else {
          applyLightingFX(b, t);
        }
        break;
      }
      curT = transEnd;
    }
  }

  // 3. RTH LANDING
  else {
    const landT = t - showBodyEnd;
    const u = THREE.MathUtils.clamp(landT / landingConfig.dur, 0, 1);
    const lastTargets = formationTrajectories[formationTrajectories.length - 1];
    const lastB = timelineData.formationBlocks[timelineData.formationBlocks.length - 1];
    const alt = lastB.altitude || 18.0;
    const scl = lastB.scale || 1.0;
    const v1y = THREE.MathUtils.degToRad(lastB.rotEndY || 0);

    for (let i = 0; i < formationCount; i++) {
      const gx = groundPositions[i * 3];
      const gy = groundPositions[i * 3 + 1];
      const gz = groundPositions[i * 3 + 2];

      transformToSky(lastTargets[i * 3], lastTargets[i * 3 + 1], lastTargets[i * 3 + 2], alt, scl, v1y, skyPosA);

      let prog = u;
      if (landingConfig.style === "wave") {
        const dist = Math.sqrt(gx * gx + gz * gz) / 16.0;
        prog = THREE.MathUtils.clamp((u - (1 - dist) * 0.3) / 0.7, 0, 1);
      }
      const ease = prog * prog * (3 - 2 * prog);

      targetPositions[i * 3]     = skyPosA.x + (gx - skyPosA.x) * ease;
      targetPositions[i * 3 + 1] = skyPosA.y + (gy - skyPosA.y) * ease;
      targetPositions[i * 3 + 2] = skyPosA.z + (gz - skyPosA.z) * ease;

      const navPulse = (Math.sin(t * 8.0 + i) > 0.5 && u < 0.95) ? 1.0 : 0.15;
      targetColors[i * 3]     = navPulse;
      targetColors[i * 3 + 1] = navPulse * 0.4;
      targetColors[i * 3 + 2] = 0.05;
    }
  }

  // 4. PRECIPITATION DRONES: Ground Parked at Launch, Zero Upward Glitch
  if (precipConfig.enabled) {
    const precipHex = new THREE.Color(precipConfig.color);

    for (let i = formationCount; i < activeDroneCount; i++) {
      const gx = groundPositions[i * 3];
      const gy = groundPositions[i * 3 + 1];
      const gz = groundPositions[i * 3 + 2];
      const px = precipPositions[i * 3];
      const py = precipPositions[i * 3 + 1];
      const pz = precipPositions[i * 3 + 2];

      if (t <= takeoffConfig.dur) {
        // Parked on ground, rises with launch
        const u = Math.max(0, t / takeoffConfig.dur);
        const ease = u * u * (3 - 2 * u);
        targetPositions[i * 3]     = gx + (px - gx) * ease;
        targetPositions[i * 3 + 1] = gy + (py - gy) * ease;
        targetPositions[i * 3 + 2] = gz + (pz - gz) * ease;
        targetColors[i * 3]     = precipHex.r * 0.4 * ease;
        targetColors[i * 3 + 1] = precipHex.g * 0.4 * ease;
        targetColors[i * 3 + 2] = precipHex.b * 0.4 * ease;
      } else if (t > takeoffConfig.dur && t < showBodyEnd) {
        // Airborne active particle
        targetPositions[i * 3]     = px;
        targetPositions[i * 3 + 1] = py;
        targetPositions[i * 3 + 2] = pz;

        let brightness = 1.0;
        if (precipConfig.fx === "glimmer") {
          brightness = Math.sin(t * 8.0 + precipDriftSeeds[i] * 5.0) > 0.4 ? 1.0 : 0.65;
        } else if (precipConfig.fx === "sparkle") {
          brightness = Math.sin(t * 16.0 + i * 9.0) > 0.3 ? 1.0 : 0.15;
        } else if (precipConfig.fx === "rainbow") {
          precipHex.setHSL((t * 0.2 + i * 0.02) % 1.0, 1.0, 0.6);
        } else if (precipConfig.fx === "strobe") {
          brightness = Math.sin(t * 20.0) > 0 ? 1.0 : 0.05;
        }

        targetColors[i * 3]     = precipHex.r * brightness;
        targetColors[i * 3 + 1] = precipHex.g * brightness;
        targetColors[i * 3 + 2] = precipHex.b * brightness;
      } else {
        // Lands smoothly to ground launchpad
        const u = THREE.MathUtils.clamp((t - showBodyEnd) / landingConfig.dur, 0, 1);
        const ease = u * u * (3 - 2 * u);
        targetPositions[i * 3]     = px + (gx - px) * ease;
        targetPositions[i * 3 + 1] = py + (gy - py) * ease;
        targetPositions[i * 3 + 2] = pz + (gz - pz) * ease;
        const navPulse = (Math.sin(t * 8.0 + i) > 0.5 && u < 0.95) ? 1.0 : 0.15;
        targetColors[i * 3]     = navPulse * (1 - ease * 0.8);
        targetColors[i * 3 + 1] = navPulse * 0.4 * (1 - ease * 0.8);
        targetColors[i * 3 + 2] = 0.05;
      }
    }
  }
}

// World-Space Locomotion
const grabState = {
  leftGrip: false, rightGrip: false, mode: 'none',
  anchorHandL: new THREE.Vector3(), anchorHandR: new THREE.Vector3(),
  anchorMid: new THREE.Vector3(), anchorDist: 1.0, anchorAngle: 0.0,
  anchorStagePos: new THREE.Vector3(), anchorStageScale: 1.0, anchorStageRotY: 0.0
};
const posL = new THREE.Vector3(), posR = new THREE.Vector3(), midCurr = new THREE.Vector3(), diffVec = new THREE.Vector3();

function onGripChange() {
  const l = grabState.leftGrip, r = grabState.rightGrip;
  leftController.getWorldPosition(posL);
  rightController.getWorldPosition(posR);

  if (l && r) {
    grabState.mode = 'dual';
    grabState.anchorHandL.copy(posL); grabState.anchorHandR.copy(posR);
    grabState.anchorMid.addVectors(posL, posR).multiplyScalar(0.5);
    diffVec.subVectors(posR, posL);
    grabState.anchorDist = Math.max(0.08, diffVec.length());
    grabState.anchorAngle = Math.atan2(diffVec.x, diffVec.z);
    grabState.anchorStagePos.copy(stageGroup.position);
    grabState.anchorStageScale = stageGroup.scale.x;
    grabState.anchorStageRotY = stageGroup.rotation.y;
  } else if (l) {
    grabState.mode = 'single-left'; grabState.anchorHandL.copy(posL);
    grabState.anchorStagePos.copy(stageGroup.position);
  } else if (r) {
    grabState.mode = 'single-right'; grabState.anchorHandR.copy(posR);
    grabState.anchorStagePos.copy(stageGroup.position);
  } else {
    grabState.mode = 'none';
  }
}

leftController.addEventListener("squeezestart", () => { grabState.leftGrip = true; onGripChange(); });
leftController.addEventListener("squeezeend", () => { grabState.leftGrip = false; onGripChange(); });
rightController.addEventListener("squeezestart", () => { grabState.rightGrip = true; onGripChange(); });
rightController.addEventListener("squeezeend", () => { grabState.rightGrip = false; onGripChange(); });

function updateWorldGrab() {
  if (!renderer.xr.isPresenting || grabState.mode === 'none') return;
  leftController.getWorldPosition(posL);
  rightController.getWorldPosition(posR);

  if (grabState.mode === 'dual') {
    midCurr.addVectors(posL, posR).multiplyScalar(0.5);
    diffVec.subVectors(posR, posL);
    const currDist = Math.max(0.08, diffVec.length());
    const currAngle = Math.atan2(diffVec.x, diffVec.z);

    const scaleRatio = currDist / grabState.anchorDist;
    const targetScale = THREE.MathUtils.clamp(grabState.anchorStageScale * scaleRatio, 0.05, 30.0);
    const effectiveRatio = targetScale / grabState.anchorStageScale;
    stageGroup.scale.setScalar(targetScale);

    dronePoints.material.size = Math.max(0.02, BASE_DRONE_SIZE * targetScale);

    const deltaAngle = currAngle - grabState.anchorAngle;
    stageGroup.rotation.y = grabState.anchorStageRotY + deltaAngle;

    const vOffset = new THREE.Vector3().subVectors(grabState.anchorStagePos, grabState.anchorMid);
    vOffset.multiplyScalar(effectiveRatio);
    vOffset.applyAxisAngle(Y_AXIS, deltaAngle);

    const midDelta = new THREE.Vector3().subVectors(midCurr, grabState.anchorMid);
    stageGroup.position.copy(grabState.anchorMid).add(midDelta).add(vOffset);
  } else if (grabState.mode === 'single-left') {
    const scaleFactor = Math.max(0.1, stageGroup.scale.x);
    const delta = new THREE.Vector3().subVectors(posL, grabState.anchorHandL).multiplyScalar(panSensitivity * scaleFactor);
    stageGroup.position.addVectors(grabState.anchorStagePos, delta);
  } else if (grabState.mode === 'single-right') {
    const scaleFactor = Math.max(0.1, stageGroup.scale.x);
    const delta = new THREE.Vector3().subVectors(posR, grabState.anchorHandR).multiplyScalar(panSensitivity * scaleFactor);
    stageGroup.position.addVectors(grabState.anchorStagePos, delta);
  }
}

// In-VR HUD
const vrHUD = new THREE.Group();
vrHUD.visible = false;
scene.add(vrHUD);

const hudCanvas = document.createElement("canvas");
hudCanvas.width = 1024; hudCanvas.height = 700;
const hudCtx = hudCanvas.getContext("2d");
const hudTex = new THREE.CanvasTexture(hudCanvas);
hudTex.colorSpace = THREE.SRGBColorSpace;

const hudMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(2.5, 1.7),
  new THREE.MeshBasicMaterial({ map: hudTex, transparent: true, depthTest: true })
);
vrHUD.add(hudMesh);

let currentSymbolPage = 0;

function renderHUD() {
  const ctx = hudCtx;
  ctx.clearRect(0, 0, 1024, 700);

  ctx.fillStyle = "rgba(7, 16, 29, 0.96)";
  ctx.fillRect(0, 0, 1024, 700);
  ctx.strokeStyle = "rgba(112, 230, 255, 0.7)";
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 1008, 684);

  const totalPages = Math.max(1, SHAPE_PAGES.length);
  ctx.fillStyle = "rgba(27, 56, 100, 0.9)";
  ctx.fillRect(40, 20, 60, 48); ctx.fillRect(420, 20, 60, 48);
  ctx.strokeStyle = "#70e6ff"; ctx.lineWidth = 2;
  ctx.strokeRect(40, 20, 60, 48); ctx.strokeRect(420, 20, 60, 48);
  ctx.fillStyle = "#fff"; ctx.font = "bold 22px system-ui"; ctx.textAlign = "center";
  ctx.fillText("◀", 70, 52); ctx.fillText("▶", 450, 52);
  ctx.fillText(`PAGE ${currentSymbolPage + 1} / ${totalPages}`, 260, 52);

  const activeBlock = timelineData.formationBlocks.find(b => b.id === selectedFormationBlockId);
  if (activeBlock && activeBlock.isText) {
    ctx.fillStyle = "#df52ff"; ctx.fillRect(520, 20, 200, 48);
    ctx.strokeStyle = "#ffffff"; ctx.strokeRect(520, 20, 200, 48);
    ctx.fillStyle = "#fff"; ctx.font = "bold 15px system-ui"; ctx.textAlign = "center";
    ctx.fillText("⌨ EDIT TEXT", 620, 50);
  }

  const shapes = (SHAPE_PAGES && SHAPE_PAGES[currentSymbolPage]) ? SHAPE_PAGES[currentSymbolPage] : [];
  for (let i = 0; i < 4; i++) {
    const s = shapes[i];
    const x = 40 + i * 238;
    ctx.fillStyle = "rgba(23, 39, 66, 0.85)";
    ctx.fillRect(x, 82, 224, 96);
    if (!s) continue;

    const activeShapeId = timelineData.formationBlocks.find(b => b && b.id === selectedFormationBlockId)?.shapeId;
    ctx.strokeStyle = (activeShapeId === s.id && !activeBlock?.isText) ? "#70e6ff" : "#375077";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, 82, 224, 96);

    if (typeof s.drawCanvas === "function") s.drawCanvas(ctx, x + 112, 130);
  }

  // Active Block Swatches
  const pal = activeBlock?.palette || ["#ffffff"];
  ctx.fillStyle = "#8fa2c3"; ctx.font = "bold 13px system-ui"; ctx.textAlign = "left";
  ctx.fillText("BLOCK PALETTE:", 40, 208);

  for (let sIdx = 0; sIdx < pal.length; sIdx++) {
    const sx = 180 + sIdx * 50;
    ctx.fillStyle = pal[sIdx];
    ctx.beginPath(); ctx.arc(sx, 202, 16, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = (activeBlock?.activeSwatchIdx === sIdx) ? "#ffffff" : "#000000";
    ctx.lineWidth = (activeBlock?.activeSwatchIdx === sIdx) ? 3 : 1;
    ctx.stroke();
  }

  ctx.fillStyle = "#1b3864"; ctx.fillRect(480, 185, 140, 34);
  ctx.strokeStyle = "#70e6ff"; ctx.strokeRect(480, 185, 140, 34);
  ctx.fillStyle = "#fff"; ctx.font = "bold 13px system-ui"; ctx.textAlign = "center";
  ctx.fillText("AUTO-ZONE", 550, 207);

  const specGrad = ctx.createLinearGradient(40, 234, 984, 234);
  specGrad.addColorStop(0.00, "#ff0000"); specGrad.addColorStop(0.17, "#ffff00");
  specGrad.addColorStop(0.33, "#00ff00"); specGrad.addColorStop(0.50, "#00ffff");
  specGrad.addColorStop(0.67, "#0000ff"); specGrad.addColorStop(0.83, "#ff00ff");
  specGrad.addColorStop(1.00, "#ff0000");
  ctx.fillStyle = specGrad; ctx.fillRect(40, 234, 944, 34);
  ctx.strokeStyle = "#ffffff44"; ctx.strokeRect(40, 234, 944, 34);

  // Unified Single-Track Timeline in VR
  const availW = 944;
  let curX = 40;

  // Takeoff in VR
  const toW = (takeoffConfig.dur / TOTAL_DURATION) * availW;
  ctx.fillStyle = "#13382c"; ctx.fillRect(curX, 335, toW, 34);
  ctx.strokeStyle = "#70ffb0"; ctx.strokeRect(curX, 335, toW, 34);
  ctx.fillStyle = "#70ffb0"; ctx.font = "bold 10px system-ui"; ctx.textAlign = "center";
  ctx.fillText("▲ LAUNCH", curX + toW / 2, 356);
  curX += toW;

  for (const b of timelineData.formationBlocks) {
    if (!b) continue;
    const fw = (b.dur / TOTAL_DURATION) * availW;
    const isSelected = selectedFormationBlockId === b.id;
    ctx.fillStyle = b.isText ? (isSelected ? "#7e22ce" : "#4c1d95") : (isSelected ? "#2a548a" : "#1b3353");
    ctx.fillRect(curX, 335, fw, 34);
    ctx.strokeStyle = isSelected ? "#ffffff" : "#456a99";
    ctx.strokeRect(curX, 335, fw, 34);

    if (b.isText) {
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 10px system-ui"; ctx.textAlign = "center";
      ctx.fillText(b.text || "TEXT", curX + fw / 2, 356);
    } else {
      const s = findShapeById(b.shapeId);
      if (s && typeof s.drawCanvas === "function") s.drawCanvas(ctx, curX + fw / 2, 352);
    }
    curX += fw;

    if (b.transDur > 0) {
      const tw = (b.transDur / TOTAL_DURATION) * availW;
      ctx.fillStyle = "#1b283a"; ctx.fillRect(curX, 335, tw, 34);
      ctx.strokeStyle = "#456a99"; ctx.strokeRect(curX, 335, tw, 34);
      ctx.fillStyle = "#8fa2c3"; ctx.font = "bold 9px system-ui"; ctx.textAlign = "center";
      ctx.fillText("⇄", curX + tw / 2, 356);
      curX += tw;
    }
  }

  // Landing in VR
  const landW = (landingConfig.dur / TOTAL_DURATION) * availW;
  ctx.fillStyle = "#13382c"; ctx.fillRect(curX, 335, landW, 34);
  ctx.strokeStyle = "#ff859c"; ctx.strokeRect(curX, 335, landW, 34);
  ctx.fillStyle = "#ff859c"; ctx.font = "bold 10px system-ui"; ctx.textAlign = "center";
  ctx.fillText("▼ LAND", curX + landW / 2, 356);

  const playX = 40 + (playheadTime / TOTAL_DURATION) * availW;
  ctx.strokeStyle = "#ff3b69"; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(playX, 330); ctx.lineTo(playX, 455); ctx.stroke();

  hudTex.needsUpdate = true;
}

const headWorldPos = new THREE.Vector3();
const headWorldDir = new THREE.Vector3();

function toggleHUD() {
  vrHUD.visible = !vrHUD.visible;
  if (vrHUD.visible) {
    camera.getWorldPosition(headWorldPos);
    camera.getWorldDirection(headWorldDir);
    headWorldDir.y = 0; headWorldDir.normalize();

    vrHUD.position.copy(headWorldPos).addScaledVector(headWorldDir, 1.8);
    vrHUD.position.y = headWorldPos.y;
    vrHUD.rotation.set(0, Math.atan2(-headWorldDir.x, -headWorldDir.z), 0);
    renderHUD();
  }
  for (const ray of controllerRays) ray.visible = vrHUD.visible;
}

const raycaster = new THREE.Raycaster();
const quat = new THREE.Quaternion();

function promptVRSystemKeyboard() {
  const activeBlock = timelineData.formationBlocks.find(b => b.id === selectedFormationBlockId);
  if (!activeBlock || !activeBlock.isText) return;

  const currentVal = activeBlock.text || "HAPPY NEW YEAR";
  const result = window.prompt("Enter Drone Formation Text:", currentVal);
  if (result !== null && result.trim() !== "") {
    saveUndoState();
    activeBlock.text = result.trim().toUpperCase();
    $("input-text-msg").value = activeBlock.text;
    buildShowTrajectoryData();
    evaluateTimeline(playheadTime);
    buildDesktopTimeline();
    renderHUD();
  }
}

function handleVRSelect(controller) {
  if (!vrHUD.visible) return;
  const origin = new THREE.Vector3();
  controller.getWorldPosition(origin);
  controller.getWorldQuaternion(quat);
  const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(quat).normalize();
  raycaster.set(origin, dir);

  const hits = raycaster.intersectObject(hudMesh, false);
  if (!hits.length || !hits[0].uv) return;

  const px = hits[0].uv.x * 1024, py = (1 - hits[0].uv.y) * 700;
  const inRect = (x, y, w, h) => px >= x && px <= x + w && py >= y && py <= y + h;
  const activeBlock = timelineData.formationBlocks.find(b => b.id === selectedFormationBlockId);
  const totalPages = Math.max(1, SHAPE_PAGES.length);

  if (inRect(520, 20, 200, 48)) {
    promptVRSystemKeyboard();
    return;
  }

  if (inRect(40, 20, 60, 48)) {
    currentSymbolPage = (currentSymbolPage + totalPages - 1) % totalPages;
    populateDesktopIcons(); renderHUD(); return;
  }
  if (inRect(420, 20, 60, 48)) {
    currentSymbolPage = (currentSymbolPage + 1) % totalPages;
    populateDesktopIcons(); renderHUD(); return;
  }

  const shapes = (SHAPE_PAGES && SHAPE_PAGES[currentSymbolPage]) ? SHAPE_PAGES[currentSymbolPage] : [];
  for (let i = 0; i < 4; i++) {
    const x = 40 + i * 238;
    if (inRect(x, 82, 224, 96)) {
      const s = shapes[i];
      if (!s) return;
      if (activeBlock) {
        saveUndoState();
        activeBlock.isText = false;
        activeBlock.shapeId = s.id;
        buildShowTrajectoryData();
        evaluateTimeline(playheadTime);
        buildDesktopTimeline();
        updateContextPanels();
        renderHUD();
      }
      return;
    }
  }

  if (activeBlock && activeBlock.palette) {
    for (let sIdx = 0; sIdx < activeBlock.palette.length; sIdx++) {
      const sx = 180 + sIdx * 50;
      if ((px - sx) ** 2 + (py - 202) ** 2 <= 16 ** 2) {
        activeBlock.activeSwatchIdx = sIdx;
        syncDesktopPalette(); renderHUD(); return;
      }
    }
  }

  if (inRect(480, 185, 140, 34)) {
    applyAutoZoneColors();
    evaluateTimeline(playheadTime);
    renderHUD();
    return;
  }

  if (inRect(40, 234, 944, 34)) {
    const ratio = Math.max(0, Math.min(1, (px - 40) / 944));
    const hColor = new THREE.Color().setHSL(ratio, 1.0, 0.5);
    if (activeBlock && activeBlock.palette) {
      saveUndoState();
      activeBlock.palette[activeBlock.activeSwatchIdx] = "#" + hColor.getHexString();
      syncDesktopPalette(); buildDesktopTimeline(); renderHUD();
    }
    return;
  }
}

let isTriggerDownL = false, isTriggerDownR = false;
leftController.addEventListener("selectstart", () => {
  isTriggerDownL = true;
  if (!vrHUD.visible) paintMeshL.visible = true;
});
leftController.addEventListener("selectend", () => {
  isTriggerDownL = false; paintMeshL.visible = false;
  handleVRSelect(leftController);
});
rightController.addEventListener("selectstart", () => {
  isTriggerDownR = true;
  if (!vrHUD.visible) paintMeshR.visible = true;
});
rightController.addEventListener("selectend", () => {
  isTriggerDownR = false; paintMeshR.visible = false;
  handleVRSelect(rightController);
});

let xPrev = false;
function checkHUDInput() {
  const pad = leftController.userData.gamepad;
  const x = Boolean(pad?.buttons?.[4]?.pressed);
  if (x && !xPrev) toggleHUD();
  xPrev = x;
}
leftController.addEventListener("connected", e => leftController.userData.gamepad = e.data.gamepad);
rightController.addEventListener("connected", e => rightController.userData.gamepad = e.data.gamepad);

function $(id) { return document.getElementById(id); }
function onEvent(id, event, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener(event, handler);
}

// Precipitation Panel Handlers
onEvent("chk-precip", "change", (e) => {
  saveUndoState();
  precipConfig.enabled = e.target.checked;
  $("card-precip-options").classList.toggle("hidden", !precipConfig.enabled);
  buildShowTrajectoryData();
  evaluateTimeline(playheadTime);
});
onEvent("sel-precip-type", "change", (e) => {
  saveUndoState();
  precipConfig.type = e.target.value;
});
onEvent("slider-precip-count", "input", (e) => {
  precipConfig.count = parseInt(e.target.value);
  $("val-precip-count").textContent = `${precipConfig.count}`;
  buildShowTrajectoryData();
  evaluateTimeline(playheadTime);
});
onEvent("slider-precip-speed", "input", (e) => {
  precipConfig.speed = parseFloat(e.target.value);
  $("val-precip-speed").textContent = `${precipConfig.speed.toFixed(1)} m/s`;
});
onEvent("slider-precip-angle", "input", (e) => {
  precipConfig.angle = parseFloat(e.target.value);
  $("val-precip-angle").textContent = `${precipConfig.angle}°`;
});
onEvent("sel-precip-fx", "change", (e) => {
  saveUndoState();
  precipConfig.fx = e.target.value;
});
onEvent("picker-precip-color", "input", (e) => {
  precipConfig.color = e.target.value;
});

// Takeoff & Landing Inspectors
onEvent("sel-takeoff-style", "change", (e) => {
  saveUndoState();
  takeoffConfig.style = e.target.value;
  buildDesktopTimeline();
  evaluateTimeline(playheadTime);
});
onEvent("slider-takeoff-dur", "input", (e) => {
  takeoffConfig.dur = parseFloat(e.target.value);
  $("val-takeoff-dur").textContent = `${takeoffConfig.dur}s`;
  recalculateTimelineDuration();
  buildDesktopTimeline();
  evaluateTimeline(playheadTime);
});
onEvent("sel-landing-style", "change", (e) => {
  saveUndoState();
  landingConfig.style = e.target.value;
  buildDesktopTimeline();
  evaluateTimeline(playheadTime);
});
onEvent("slider-landing-dur", "input", (e) => {
  landingConfig.dur = parseFloat(e.target.value);
  $("val-landing-dur").textContent = `${landingConfig.dur}s`;
  recalculateTimelineDuration();
  buildDesktopTimeline();
  evaluateTimeline(playheadTime);
});

// Transition Inspector Handlers
onEvent("slider-trans-dur", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x.id === selectedTransitionBlockId);
  if (b) {
    b.transDur = parseFloat(e.target.value);
    $("val-trans-dur").textContent = `${b.transDur.toFixed(1)}s`;
    recalculateTimelineDuration();
    buildDesktopTimeline();
    evaluateTimeline(playheadTime);
  }
});
onEvent("sel-trans-fx", "change", (e) => {
  saveUndoState();
  const b = timelineData.formationBlocks.find(x => x.id === selectedTransitionBlockId);
  if (b) b.transColorFX = e.target.value;
});

// Formation Inspector Handlers
onEvent("slider-block-alt", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b) {
    b.altitude = parseFloat(e.target.value);
    $("val-block-alt").textContent = `${b.altitude}m`;
    evaluateTimeline(playheadTime);
  }
});
onEvent("slider-block-scale", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b) {
    b.scale = parseFloat(e.target.value);
    $("val-block-scale").textContent = `${b.scale.toFixed(1)}x`;
    evaluateTimeline(playheadTime);
  }
});
onEvent("slider-block-rot-start", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b) {
    b.rotStartY = parseInt(e.target.value);
    $("val-block-rot").textContent = `${b.rotStartY}→${b.rotEndY}°/s`;
    evaluateTimeline(playheadTime);
  }
});
onEvent("slider-block-rot-end", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b) {
    b.rotEndY = parseInt(e.target.value);
    $("val-block-rot").textContent = `${b.rotStartY}→${b.rotEndY}°/s`;
    evaluateTimeline(playheadTime);
  }
});

onEvent("slider-fleet-count", "input", (e) => {
  activeDroneCount = parseInt(e.target.value);
  const el = $("val-fleet-count"); if (el) el.textContent = `${activeDroneCount}`;
  droneGeometry.setDrawRange(0, activeDroneCount);
  updateGroundPositions(activeDroneCount);
  buildShowTrajectoryData();
  evaluateTimeline(playheadTime);
});

// Contextual Inspector Switcher
function updateContextPanels() {
  $("card-inspector-takeoff").classList.toggle("hidden", selectedInspectorType !== "takeoff");
  $("card-inspector-formation").classList.toggle("hidden", selectedInspectorType !== "formation");
  $("card-inspector-transition").classList.toggle("hidden", selectedInspectorType !== "transition");
  $("card-inspector-landing").classList.toggle("hidden", selectedInspectorType !== "landing");

  if (selectedInspectorType === "formation") {
    const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
    if (!b) return;

    $("formation-sub-shape").classList.toggle("hidden", Boolean(b.isText));
    $("formation-sub-text").classList.toggle("hidden", !b.isText);

    if (b.isText) {
      $("inspector-shape-name").textContent = `Text: "${b.text || ""}"`;
      $("input-text-msg").value = b.text || "";
      $("sel-text-font").value = b.font || "Impact";
      $("sel-text-fx").value = b.fx || "scroll";
    } else {
      $("inspector-shape-name").textContent = b.shapeId;
      populateDesktopIcons();
    }

    $("slider-block-alt").value = b.altitude || 18.0;
    $("val-block-alt").textContent = `${b.altitude || 18.0}m`;
    $("slider-block-scale").value = b.scale || 1.0;
    $("val-block-scale").textContent = `${(b.scale || 1.0).toFixed(1)}x`;

    $("slider-block-rot-start").value = b.rotStartY || 0;
    $("slider-block-rot-end").value = b.rotEndY || 30;
    $("val-block-rot").textContent = `${b.rotStartY || 0}→${b.rotEndY || 30}°/s`;

    syncDesktopPalette();
  } else if (selectedInspectorType === "transition") {
    const b = timelineData.formationBlocks.find(x => x.id === selectedTransitionBlockId);
    if (b) {
      $("slider-trans-dur").value = b.transDur;
      $("val-trans-dur").textContent = `${b.transDur.toFixed(1)}s`;
      $("sel-trans-fx").value = b.transColorFX || "blend";
    }
  }
}

// Text Inputs
onEvent("input-text-msg", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b && b.isText) {
    b.text = e.target.value.toUpperCase();
    buildShowTrajectoryData();
    evaluateTimeline(playheadTime);
    buildDesktopTimeline();
  }
});
onEvent("sel-text-font", "change", (e) => {
  saveUndoState();
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b && b.isText) {
    b.font = e.target.value;
    buildShowTrajectoryData();
    evaluateTimeline(playheadTime);
    buildDesktopTimeline();
  }
});
onEvent("sel-text-fx", "change", (e) => {
  saveUndoState();
  const b = timelineData.formationBlocks.find(x => x.id === selectedFormationBlockId);
  if (b && b.isText) {
    b.fx = e.target.value;
    evaluateTimeline(playheadTime);
  }
});
onEvent("btn-vr-keyboard", "click", () => promptVRSystemKeyboard());

// Track Add / Delete
onEvent("btn-add-shape", "click", () => {
  saveUndoState();
  const id = "f" + Date.now();
  timelineData.formationBlocks.push({
    id, shapeId: "xmasTree", isText: false, dur: 20.0, transDur: 4.0,
    transColorFX: "blend", altitude: 18.0, scale: 1.0, rotStartY: 0, rotEndY: 30,
    palette: ["#ffd700", "#00c853", "#8b4513"], activeSwatchIdx: 0,
    cycleSpeed: 0.0, run: false, runSpeed: 3.0, blink: false, blinkSpeed: 3.0, sparkle: false, sparkleDensity: 0.35
  });
  selectedFormationBlockId = id;
  selectedInspectorType = "formation";
  recalculateTimelineDuration();
  buildShowTrajectoryData();
  buildDesktopTimeline();
  updateContextPanels();
  renderHUD();
});

onEvent("btn-add-text", "click", () => {
  saveUndoState();
  const id = "t" + Date.now();
  timelineData.formationBlocks.push({
    id, isText: true, text: "HELLO XR", font: "Impact", fx: "scroll", speed: 1.0,
    dur: 20.0, transDur: 4.0, transColorFX: "sparkle", altitude: 19.0, scale: 1.0, rotStartY: 0, rotEndY: 0,
    palette: ["#70e6ff", "#df52ff"], activeSwatchIdx: 0,
    cycleSpeed: 1.0, run: false, runSpeed: 3.0, blink: false, blinkSpeed: 3.0, sparkle: false, sparkleDensity: 0.35
  });
  selectedFormationBlockId = id;
  selectedInspectorType = "formation";
  recalculateTimelineDuration();
  buildShowTrajectoryData();
  buildDesktopTimeline();
  updateContextPanels();
  renderHUD();
});

onEvent("btn-del-shape", "click", () => {
  if (timelineData.formationBlocks.length > 1) {
    saveUndoState();
    const idx = timelineData.formationBlocks.findIndex(b => b.id === selectedFormationBlockId);
    if (idx !== -1) timelineData.formationBlocks.splice(idx, 1);
    selectedFormationBlockId = timelineData.formationBlocks[Math.max(0, idx - 1)].id;
    selectedInspectorType = "formation";
    recalculateTimelineDuration();
    buildShowTrajectoryData();
    evaluateTimeline(playheadTime);
    buildDesktopTimeline();
    updateContextPanels();
    renderHUD();
  }
});

// Pagination
const pageTabs = $("page-tabs");
if (pageTabs) {
  const totalPages = Math.max(1, SHAPE_PAGES.length);
  for (let p = 0; p < totalPages; p++) {
    const b = document.createElement("button");
    b.className = "page-btn" + (p === 0 ? " active" : "");
    b.textContent = "Pack " + (p + 1);
    b.onclick = () => {
      document.querySelectorAll(".page-btn").forEach(btn => btn.classList.remove("active"));
      b.classList.add("active");
      currentSymbolPage = p;
      populateDesktopIcons();
      renderHUD();
    };
    pageTabs.appendChild(b);
  }
}

function populateDesktopIcons() {
  const container = $("desktop-icon-grid");
  if (!container) return;
  container.innerHTML = "";
  const shapes = (SHAPE_PAGES && SHAPE_PAGES[currentSymbolPage]) ? SHAPE_PAGES[currentSymbolPage] : [];
  const activeFormation = timelineData.formationBlocks.find(b => b && b.id === selectedFormationBlockId);

  for (const s of shapes) {
    if (!s) continue;
    const btn = document.createElement("button");
    btn.className = "symbol-btn" + (activeFormation?.shapeId === s.id && !activeFormation?.isText ? " active" : "");
    btn.draggable = true;
    btn.innerHTML = `<svg viewBox="0 0 24 24">${s.drawSVG || ""}</svg><span>${s.id}</span>`;

    btn.onclick = () => {
      if (activeFormation) {
        saveUndoState();
        activeFormation.isText = false;
        activeFormation.shapeId = s.id;
        buildShowTrajectoryData();
        evaluateTimeline(playheadTime);
        buildDesktopTimeline();
        updateContextPanels();
        renderHUD();
      }
    };

    btn.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", s.id);
      e.dataTransfer.effectAllowed = "copy";
    });
    container.appendChild(btn);
  }
}

// Drag & Drop Shape into Lane
const laneUnifiedEl = $("lane-unified");
laneUnifiedEl.addEventListener("dragover", (e) => {
  e.preventDefault();
  laneUnifiedEl.classList.add("dragover");
  e.dataTransfer.dropEffect = "copy";
});
laneUnifiedEl.addEventListener("dragleave", () => {
  laneUnifiedEl.classList.remove("dragover");
});
laneUnifiedEl.addEventListener("drop", (e) => {
  e.preventDefault();
  laneUnifiedEl.classList.remove("dragover");
  const shapeId = e.dataTransfer.getData("text/plain");
  if (!shapeId) return;

  saveUndoState();
  const rect = laneUnifiedEl.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  const dropTime = ratio * TOTAL_DURATION;

  const id = "f" + Date.now();
  let insertIdx = timelineData.formationBlocks.length;
  let accumT = takeoffConfig.dur;
  for (let i = 0; i < timelineData.formationBlocks.length; i++) {
    const b = timelineData.formationBlocks[i];
    if (dropTime <= accumT + b.dur / 2) {
      insertIdx = i;
      break;
    }
    accumT += b.dur + (b.transDur || 0);
  }

  timelineData.formationBlocks.splice(insertIdx, 0, {
    id, shapeId, isText: false, dur: 20.0, transDur: 4.0, transColorFX: "blend",
    altitude: 18.0, scale: 1.0, rotStartY: 0, rotEndY: 30,
    palette: ["#ffd700", "#00c853", "#8b4513"], activeSwatchIdx: 0,
    cycleSpeed: 0.0, run: false, runSpeed: 3.0, blink: false, blinkSpeed: 3.0, sparkle: false, sparkleDensity: 0.35
  });

  selectedFormationBlockId = id;
  selectedInspectorType = "formation";
  recalculateTimelineDuration();
  buildShowTrajectoryData();
  evaluateTimeline(playheadTime);
  buildDesktopTimeline();
  updateContextPanels();
  renderHUD();
});

// Color Sync for Block Palette
function syncDesktopPalette() {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (!b || !b.palette) return;
  const container = $("swatches-container");
  if (!container) return;
  container.innerHTML = "";

  for (let i = 0; i < b.palette.length; i++) {
    const slot = document.createElement("div");
    slot.className = "swatch-slot" + (b.activeSwatchIdx === i ? " active" : "");
    slot.style.background = b.palette[i];
    slot.onclick = () => {
      b.activeSwatchIdx = i;
      syncDesktopPalette(); renderHUD();
    };
    container.appendChild(slot);
  }

  const activeHex = b.palette[b.activeSwatchIdx] || "#ffffff";
  paintMeshL.material.color.set(activeHex);
  paintMeshR.material.color.set(activeHex);

  $("slider-cycle-speed").value = b.cycleSpeed || 0;
  $("val-cycle-speed").textContent = (b.cycleSpeed || 0).toFixed(1) + "x";
  $("chk-run").checked = Boolean(b.run);
  $("chk-blink").checked = Boolean(b.blink);
  $("chk-sparkle").checked = Boolean(b.sparkle);
}

onEvent("btn-add-color", "click", () => {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (b && b.palette && b.palette.length < 5) {
    saveUndoState();
    b.palette.push("#ffffff");
    b.activeSwatchIdx = b.palette.length - 1;
    syncDesktopPalette(); buildDesktopTimeline(); renderHUD();
  }
});
onEvent("btn-del-color", "click", () => {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (b && b.palette && b.palette.length > 1) {
    saveUndoState();
    b.palette.splice(b.activeSwatchIdx, 1);
    b.activeSwatchIdx = Math.max(0, b.activeSwatchIdx - 1);
    syncDesktopPalette(); buildDesktopTimeline(); renderHUD();
  }
});
onEvent("btn-auto-zone", "click", () => {
  applyAutoZoneColors();
  evaluateTimeline(playheadTime);
});

const specBar = $("desktop-spectrum");
if (specBar) {
  function handleSpectrum(e) {
    const rect = specBar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const hex = "#" + new THREE.Color().setHSL(ratio, 1.0, 0.5).getHexString();
    const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
    if (b && b.palette && b.palette.length) {
      b.palette[b.activeSwatchIdx] = hex;
      syncDesktopPalette(); buildDesktopTimeline(); renderHUD();
    }
  }
  specBar.onmousedown = e => {
    saveUndoState();
    handleSpectrum(e);
    window.onmousemove = handleSpectrum;
    window.onmouseup = () => window.onmousemove = null;
  };
}

onEvent("slider-cycle-speed", "input", (e) => {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (b) { b.cycleSpeed = parseFloat(e.target.value); $("val-cycle-speed").textContent = b.cycleSpeed.toFixed(1) + "x"; }
});
onEvent("chk-run", "change", (e) => {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (b) b.run = e.target.checked;
});
onEvent("chk-blink", "change", (e) => {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (b) b.blink = e.target.checked;
});
onEvent("chk-sparkle", "change", (e) => {
  const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
  if (b) b.sparkle = e.target.checked;
});

// Block Resizing
function attachResizeHandle(handleEl, blockObj, getTrackWidth) {
  let isDragging = false, startX = 0, origDur = 0;
  handleEl.onpointerdown = (e) => {
    e.stopPropagation(); e.preventDefault();
    saveUndoState();
    isDragging = true; startX = e.clientX; origDur = blockObj.dur;
    handleEl.setPointerCapture(e.pointerId);
  };
  handleEl.onpointermove = (e) => {
    if (!isDragging) return;
    const deltaSec = ((e.clientX - startX) / getTrackWidth()) * TOTAL_DURATION;
    blockObj.dur = Math.max(2.0, origDur + deltaSec);
    recalculateTimelineDuration();
    syncDesktopTimeline();
  };
  handleEl.onpointerup = (e) => {
    if (!isDragging) return;
    isDragging = false;
    handleEl.releasePointerCapture(e.pointerId);
    buildDesktopTimeline(); renderHUD();
  };
}

// Single-Track Block Reorder
function attachBlockReorder(blockEl, list, index) {
  blockEl.draggable = true;
  blockEl.addEventListener("dragstart", (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("application/json", JSON.stringify({ index }));
    blockEl.classList.add("dragging");
  });
  blockEl.addEventListener("dragend", () => blockEl.classList.remove("dragging"));
  blockEl.addEventListener("dragover", e => { e.preventDefault(); e.stopPropagation(); });
  blockEl.addEventListener("drop", (e) => {
    e.preventDefault(); e.stopPropagation();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      if (data.index !== undefined && data.index !== index) {
        saveUndoState();
        const movedItem = list.splice(data.index, 1)[0];
        list.splice(index, 0, movedItem);
        buildShowTrajectoryData();
        evaluateTimeline(playheadTime);
        buildDesktopTimeline();
        updateContextPanels();
        renderHUD();
      }
    } catch (_) {}
  });
}

// Build Unified Single-Track Timeline
function buildDesktopTimeline() {
  const ruler = $("master-ruler");
  ruler.innerHTML = "";
  const step = TOTAL_DURATION <= 60 ? 10 : 20;
  for (let s = 0; s <= TOTAL_DURATION; s += step) {
    const m = document.createElement("div");
    m.className = "ruler-marker";
    m.style.left = (s / TOTAL_DURATION) * 100 + "%";
    m.textContent = s + "s";
    ruler.appendChild(m);
  }

  const lane = $("lane-unified");
  lane.innerHTML = "";

  // 1. Takeoff Gate
  const takeoffBlock = document.createElement("div");
  takeoffBlock.className = "block-element flight-gate" + (selectedInspectorType === "takeoff" ? " active-block" : "");
  takeoffBlock.style.width = (takeoffConfig.dur / TOTAL_DURATION) * 100 + "%";
  takeoffBlock.textContent = `▲ LAUNCH (${takeoffConfig.dur}s)`;
  takeoffBlock.onclick = (e) => {
    e.stopPropagation();
    selectedInspectorType = "takeoff";
    buildDesktopTimeline();
    updateContextPanels();
  };
  lane.appendChild(takeoffBlock);

  // 2. Formation Blocks & Embedded Transitions
  for (let i = 0; i < timelineData.formationBlocks.length; i++) {
    const b = timelineData.formationBlocks[i];
    const fBlock = document.createElement("div");
    const isSelected = (selectedInspectorType === "formation" && selectedFormationBlockId === b.id);
    fBlock.className = "block-element" + (isSelected ? " active-block" : "");
    if (b.isText) fBlock.classList.add("text-block");
    fBlock.style.width = (b.dur / TOTAL_DURATION) * 100 + "%";

    if (b.isText) {
      fBlock.innerHTML = `<span>T: ${b.text || "TEXT"}</span>`;
    } else {
      fBlock.style.background = "#1b3353";
      const s = findShapeById(b.shapeId);
      fBlock.innerHTML = `<svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#70e6ff;fill:none;">${s ? (s.drawSVG || "") : ""}</svg>`;
    }

    fBlock.onclick = (e) => {
      e.stopPropagation();
      selectedFormationBlockId = b.id;
      selectedInspectorType = "formation";
      buildDesktopTimeline();
      updateContextPanels();
    };

    attachBlockReorder(fBlock, timelineData.formationBlocks, i);
    const handle = document.createElement("div");
    handle.className = "resize-handle";
    attachResizeHandle(handle, b, () => lane.clientWidth);
    fBlock.appendChild(handle);
    lane.appendChild(fBlock);

    // Embedded Transition Block
    if (b.transDur > 0) {
      const tBlock = document.createElement("div");
      const isTransSelected = (selectedInspectorType === "transition" && selectedTransitionBlockId === b.id);
      tBlock.className = "block-element transition-block" + (isTransSelected ? " active-block" : "");
      tBlock.style.width = (b.transDur / TOTAL_DURATION) * 100 + "%";
      tBlock.textContent = `⇄ ${b.transDur.toFixed(1)}s`;
      tBlock.onclick = (e) => {
        e.stopPropagation();
        selectedTransitionBlockId = b.id;
        selectedInspectorType = "transition";
        buildDesktopTimeline();
        updateContextPanels();
      };
      lane.appendChild(tBlock);
    }
  }

  // 3. Landing Gate
  const landingBlock = document.createElement("div");
  landingBlock.className = "block-element flight-gate" + (selectedInspectorType === "landing" ? " active-block" : "");
  landingBlock.style.width = (landingConfig.dur / TOTAL_DURATION) * 100 + "%";
  landingBlock.textContent = `▼ LAND (${landingConfig.dur}s)`;
  landingBlock.onclick = (e) => {
    e.stopPropagation();
    selectedInspectorType = "landing";
    buildDesktopTimeline();
    updateContextPanels();
  };
  lane.appendChild(landingBlock);

  syncDesktopTimeline();
}

function syncDesktopTimeline() {
  const needle = $("playhead-needle");
  if (needle) {
    const percent = THREE.MathUtils.clamp((playheadTime / TOTAL_DURATION) * 100, 0, 100);
    needle.style.left = `${percent}%`;
  }
  const disp = $("time-display");
  if (disp) disp.textContent = `${formatTime(playheadTime)} / ${formatTime(TOTAL_DURATION)}`;
}

// Timeline Scrubbing
const lanesArea = $("timeline-lanes-area");
let isScrubbing = false;

function scrubFromClientX(clientX) {
  const rect = lanesArea.getBoundingClientRect();
  const ratio = THREE.MathUtils.clamp((clientX - rect.left) / rect.width, 0, 1);
  playheadTime = ratio * TOTAL_DURATION;
  evaluateTimeline(playheadTime);
  syncDesktopTimeline();
  if (vrHUD.visible) renderHUD();
}

const rulerEl = $("master-ruler");
rulerEl.onpointerdown = (e) => {
  e.preventDefault();
  isScrubbing = true;
  rulerEl.setPointerCapture(e.pointerId);
  scrubFromClientX(e.clientX);
};
rulerEl.onpointermove = (e) => { if (isScrubbing) scrubFromClientX(e.clientX); };
rulerEl.onpointerup = (e) => {
  if (isScrubbing) { isScrubbing = false; rulerEl.releasePointerCapture(e.pointerId); }
};

const handleEl = $("playhead-handle");
handleEl.onpointerdown = (e) => {
  e.preventDefault(); e.stopPropagation();
  isScrubbing = true;
  handleEl.setPointerCapture(e.pointerId);
};
handleEl.onpointermove = (e) => { if (isScrubbing) scrubFromClientX(e.clientX); };
handleEl.onpointerup = (e) => {
  if (isScrubbing) { isScrubbing = false; handleEl.releasePointerCapture(e.pointerId); }
};

onEvent("btn-play", "click", () => {
  if (playheadTime >= TOTAL_DURATION - 0.1) {
    playheadTime = 0.0;
  }
  isPlaying = !isPlaying;
  const btn = $("btn-play");
  if (btn) btn.textContent = isPlaying ? "Pause" : "Play";
  renderHUD();
});

// Desktop Shift + Drag Painting
const desktopRaycaster = new THREE.Raycaster();
desktopRaycaster.params.Points.threshold = 1.4;
const mouse = new THREE.Vector2();

function paintDroneAtMouse(e) {
  if (!e.shiftKey) return;
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
  desktopRaycaster.setFromCamera(mouse, camera);

  const intersects = desktopRaycaster.intersectObject(dronePoints, false);
  if (intersects.length > 0) {
    const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
    if (!b || !b.palette) return;
    const swatchIdx = b.activeSwatchIdx;
    for (const hit of intersects) {
      if (hit.index !== undefined && hit.index < activeDroneCount) {
        droneSwatchIndices[hit.index] = swatchIdx;
      }
    }
    evaluateTimeline(playheadTime);
  }
}

window.addEventListener("pointerdown", paintDroneAtMouse);
window.addEventListener("pointermove", (e) => {
  if (e.buttons === 1 && e.shiftKey) paintDroneAtMouse(e);
});

// Boot
populateDesktopIcons();
updateContextPanels();
buildDesktopTimeline();
updateUndoButton();
evaluateTimeline(0);

// WebXR Session Management
renderer.xr.addEventListener("sessionstart", () => {
  document.body.classList.add("xr-active");
  renderer.xr.setFoveation(0.0);
  xrRig.position.set(0, 0, 38);
  xrRig.rotation.set(0, 0, 0);
  vrHUD.visible = false;
  for (const ray of controllerRays) ray.visible = false;
});
renderer.xr.addEventListener("sessionend", () => {
  document.body.classList.remove("xr-active");
  vrHUD.visible = false;
  for (const ray of controllerRays) ray.visible = false;
});

// Simulation Loop with Zero-Upward Glitch Particle Engine
const SPRING = 7.5;
const DAMPING = 4.0;
const MAX_DRONE_SPEED = 8.5;

const cPosWorldL = new THREE.Vector3();
const cPosWorldR = new THREE.Vector3();
const cPosLocalL = new THREE.Vector3();
const cPosLocalR = new THREE.Vector3();

let prevTime = performance.now();
renderer.setAnimationLoop(now => {
  const dt = Math.min(0.05, (now - prevTime) / 1000);
  prevTime = now;

  if (isPlaying) {
    playheadTime += dt;
    if (playheadTime >= TOTAL_DURATION) {
      playheadTime = TOTAL_DURATION;
      isPlaying = false;
      const btn = $("btn-play");
      if (btn) btn.textContent = "Play";
    }
    evaluateTimeline(playheadTime);
    syncDesktopTimeline();
    if (vrHUD.visible) renderHUD();
  }

  const isVR = renderer.xr.isPresenting;
  if (isVR) {
    checkHUDInput();
    updateWorldGrab();

    leftController.getWorldPosition(cPosWorldL);
    rightController.getWorldPosition(cPosWorldR);
    stageGroup.worldToLocal(cPosLocalL.copy(cPosWorldL));
    stageGroup.worldToLocal(cPosLocalR.copy(cPosWorldR));

    // VR Swarm Spray Painting
    const b = timelineData.formationBlocks.find(x => x && x.id === selectedFormationBlockId);
    if (b && b.palette && !vrHUD.visible) {
      const activeIdx = b.activeSwatchIdx;
      const localRadius = 1.6 / Math.max(0.05, stageGroup.scale.x);
      const brushRadiusSq = localRadius * localRadius;

      if (isTriggerDownL) {
        for (let i = 0; i < activeDroneCount; i++) {
          const dx = currentPositions[i * 3] - cPosLocalL.x;
          const dy = currentPositions[i * 3 + 1] - cPosLocalL.y;
          const dz = currentPositions[i * 3 + 2] - cPosLocalL.z;
          if (dx * dx + dy * dy + dz * dz < brushRadiusSq) droneSwatchIndices[i] = activeIdx;
        }
      }
      if (isTriggerDownR) {
        for (let i = 0; i < activeDroneCount; i++) {
          const dx = currentPositions[i * 3] - cPosLocalR.x;
          const dy = currentPositions[i * 3 + 1] - cPosLocalR.y;
          const dz = currentPositions[i * 3 + 2] - cPosLocalR.z;
          if (dx * dx + dy * dy + dz * dz < brushRadiusSq) droneSwatchIndices[i] = activeIdx;
        }
      }
    }
  }

  dronePoints.material.size = Math.max(0.02, BASE_DRONE_SIZE * stageGroup.scale.x);

  // 1. Formation Physics Integration
  for (let i = 0; i < activeDroneCount; i++) {
    const idx = i * 3;
    let px = currentPositions[idx], py = currentPositions[idx + 1], pz = currentPositions[idx + 2];
    let vx = velocities[idx], vy = velocities[idx + 1], vz = velocities[idx + 2];

    let fx = (targetPositions[idx] - px) * SPRING - vx * DAMPING;
    let fy = (targetPositions[idx + 1] - py) * SPRING - vy * DAMPING;
    let fz = (targetPositions[idx + 2] - pz) * SPRING - vz * DAMPING;

    vx += fx * dt; vy += fy * dt; vz += fz * dt;

    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
    if (speed > MAX_DRONE_SPEED) {
      vx = (vx / speed) * MAX_DRONE_SPEED;
      vy = (vy / speed) * MAX_DRONE_SPEED;
      vz = (vz / speed) * MAX_DRONE_SPEED;
    }

    currentPositions[idx]     += vx * dt;
    currentPositions[idx + 1] += vy * dt;
    currentPositions[idx + 2] += vz * dt;

    velocities[idx]     = vx;
    velocities[idx + 1] = vy;
    velocities[idx + 2] = vz;

    currentColors[idx]     += (targetColors[idx] - currentColors[idx]) * 7.0 * dt;
    currentColors[idx + 1] += (targetColors[idx + 1] - currentColors[idx + 1]) * 7.0 * dt;
    currentColors[idx + 2] += (targetColors[idx + 2] - currentColors[idx + 2]) * 7.0 * dt;
  }

  // 2. Autonomous Precipitation Simulation (Zero-Glitch Recycle)
  const showBodyEnd = TOTAL_DURATION - landingConfig.dur;
  if (precipConfig.enabled && playheadTime > takeoffConfig.dur && playheadTime < showBodyEnd) {
    const fallSpeed = precipConfig.speed; // Supports negative!
    const windRad = THREE.MathUtils.degToRad(precipConfig.angle);
    const windXShift = Math.sin(windRad) * Math.abs(fallSpeed);
    const formationCount = Math.max(50, activeDroneCount - precipConfig.count);

    for (let i = formationCount; i < activeDroneCount; i++) {
      const idx = i * 3;
      const seed = precipDriftSeeds[i];

      // Vertical translation + Wind tilt
      precipPositions[idx + 1] -= fallSpeed * dt;
      precipPositions[idx]     += windXShift * dt;

      if (precipConfig.type === "snow") {
        precipPositions[idx]     += Math.sin(now * 0.0015 + seed) * 0.6 * dt;
        precipPositions[idx + 2] += Math.cos(now * 0.0012 + seed) * 0.6 * dt;
      }

      // Zero-Glitch Instant Recycle: Snap physically without spring drag
      if (fallSpeed >= 0) {
        // Falling mode: hits ground -> teleport to ceiling
        if (precipPositions[idx + 1] < 1.5) {
          precipPositions[idx + 1] = 31.5;
          precipPositions[idx]     = (Math.random() - 0.5) * 36;
          precipPositions[idx + 2] = (Math.random() - 0.5) * 36;
          currentPositions[idx]     = precipPositions[idx];
          currentPositions[idx + 1] = precipPositions[idx + 1];
          currentPositions[idx + 2] = precipPositions[idx + 2];
        }
      } else {
        // Rising mode: hits ceiling -> teleport to ground
        if (precipPositions[idx + 1] > 31.5) {
          precipPositions[idx + 1] = 1.6;
          precipPositions[idx]     = (Math.random() - 0.5) * 36;
          precipPositions[idx + 2] = (Math.random() - 0.5) * 36;
          currentPositions[idx]     = precipPositions[idx];
          currentPositions[idx + 1] = precipPositions[idx + 1];
          currentPositions[idx + 2] = precipPositions[idx + 2];
        }
      }
    }
  }

  droneGeometry.attributes.position.needsUpdate = true;
  droneGeometry.attributes.color.needsUpdate = true;

  if (!isVR) orbit.update();
  renderer.render(scene, camera);
});

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
</script>
</body>
</html>
