"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { siren } from "./siren";
import poster__asset from "../../assets/images/ambu-big-transformed.png";

const poster = poster__asset.src ?? poster__asset;

/* ----------------------------- canvas textures ---------------------------- */

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// next/font hashes the family name, so read it from the CSS variable it sets on <html>.
const brandFont = () =>
  (typeof document !== "undefined" &&
    getComputedStyle(document.documentElement).getPropertyValue("--font-manrope").trim()) ||
  "system-ui, sans-serif";

// Generic canvas decal; redraws once webfonts are ready so the wordmark never falls back.
function makeDecal(w, h, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const paint = () => {
    ctx.clearRect(0, 0, w, h);
    draw(ctx);
  };
  paint();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (document.fonts?.ready) {
    Promise.all([document.fonts.load(`700 24px ${brandFont()}`), document.fonts.load(`600 24px ${brandFont()}`)])
      .catch(() => {})
      .then(() => document.fonts.ready)
      .then(() => {
      paint();
      texture.needsUpdate = true;
    });
  }
  return texture;
}

function drawCross(ctx, cx, cy, s) {
  ctx.fillStyle = "#F9091D";
  roundedRect(ctx, cx - s / 2, cy - s / 6, s, s / 3, s / 12);
  ctx.fill();
  roundedRect(ctx, cx - s / 6, cy - s / 2, s / 3, s, s / 12);
  ctx.fill();
}

// Long flank panel for the van: cross, wordmark, spaced AMBULANCE.
export const makeBusDecal = () =>
  makeDecal(1600, 280, (ctx) => {
    drawCross(ctx, 150, 140, 170);
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#2C0174";
    ctx.font = `700 130px ${brandFont()}`;
    ctx.fillText("8medical", 290, 132);
    ctx.fillStyle = "#636066";
    ctx.font = `600 54px ${brandFont()}`;
    ctx.letterSpacing = "12px";
    ctx.fillText("AMBULANCE", 1040, 140);
  });

// Compact badge for the tricycle and the motorcycle sidecar.
const makeBadgeDecal = () =>
  makeDecal(512, 384, (ctx) => {
    drawCross(ctx, 256, 140, 190);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#2C0174";
    ctx.font = `700 96px ${brandFont()}`;
    ctx.fillText("8medical", 256, 316);
  });

function makeShadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(128, 64, 8, 128, 64, 120);
  g.addColorStop(0, "rgba(4, 1, 18, 0.6)");
  g.addColorStop(1, "rgba(4, 1, 18, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 128);
  return new THREE.CanvasTexture(canvas);
}

// One repeating road tile: asphalt, center dash, faint edge lines.
// Soft radial pool of light (white centre, transparent edge), tinted per use with material.color.
function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function makeRoadTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(20, 12, 44, 0.6)";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "rgba(237, 233, 254, 0.8)";
  roundedRect(ctx, 28, 124, 132, 8, 4);
  ctx.fill();
  ctx.fillStyle = "rgba(133, 64, 255, 0.4)";
  ctx.fillRect(0, 6, 256, 6);
  ctx.fillRect(0, 244, 256, 6);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Fades the road out at both ends (white = opaque, black = transparent).
function makeRoadAlpha() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 512, 0);
  g.addColorStop(0, "#000");
  g.addColorStop(0.22, "#fff");
  g.addColorStop(0.78, "#fff");
  g.addColorStop(1, "#000");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 64);
  return new THREE.CanvasTexture(canvas);
}

/* ------------------------------ vehicle build ----------------------------- */
// All vehicles face +x (the nose). Each builder returns a group sitting on y = 0.

function makeMaterials(track) {
  const m = (opts) => track(new THREE.MeshStandardMaterial(opts));
  return {
    body: m({ color: 0xf5f5fa, roughness: 0.32, metalness: 0.1 }),
    roof: m({ color: 0xe9e9f2, roughness: 0.45, metalness: 0.08 }),
    dark: m({ color: 0x16121f, roughness: 0.75 }),
    glass: m({ color: 0x18102e, roughness: 0.08, metalness: 0.65 }),
    tire: m({ color: 0x101016, roughness: 0.92 }),
    rim: m({ color: 0xcfcfdd, roughness: 0.25, metalness: 0.8 }),
    spoke: m({ color: 0x8b8b9c, roughness: 0.4, metalness: 0.7 }),
    hubcap: m({ color: 0x6d09f9, roughness: 0.3, metalness: 0.5 }),
    accent: m({ color: 0x6d09f9, roughness: 0.4 }),
    navy: m({ color: 0x2c0174, roughness: 0.6 }),
    chrome: m({ color: 0xb9b9c9, roughness: 0.2, metalness: 0.85 }),
    headlight: m({ color: 0xfff6d8, emissive: 0xfff2c0, emissiveIntensity: 0.9 }),
    amber: m({ color: 0xffb13d, emissive: 0xff9f1a, emissiveIntensity: 0.5 }),
    tail: m({ color: 0xf9091d, emissive: 0xf9091d, emissiveIntensity: 0.4 }),
  };
}

// Each vehicle owns its beacon materials so they can pulse out of phase.
function makeLamps(track) {
  return {
    red: track(new THREE.MeshStandardMaterial({ color: 0xf9091d, emissive: 0xf9091d, emissiveIntensity: 0.6 })),
    purple: track(new THREE.MeshStandardMaterial({ color: 0x8540ff, emissive: 0x8540ff, emissiveIntensity: 0.6 })),
  };
}

function makeKit(group, track) {
  const rbox = (w, h, d, r, material, x, y, z) => {
    const mesh = new THREE.Mesh(track(new RoundedBoxGeometry(w, h, d, 2, r)), material);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };
  const box = (w, h, d, material, x, y, z) => {
    const mesh = new THREE.Mesh(track(new THREE.BoxGeometry(w, h, d)), material);
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };
  // flat decal on a flank; side = +1 faces +z, -1 faces -z (rotated so text reads upright)
  const decal = (geo, material, x, y, side) => {
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(x, y, side * 1);
    if (side < 0) mesh.rotation.y = Math.PI;
    group.add(mesh);
    return mesh;
  };
  return { rbox, box, decal };
}

function makeWheelFactory(track, mat, r, w) {
  const tireGeo = track(new THREE.CylinderGeometry(r, r, w, 24));
  tireGeo.rotateX(Math.PI / 2);
  const rimGeo = track(new THREE.CylinderGeometry(r * 0.6, r * 0.6, w + 0.01, 18));
  rimGeo.rotateX(Math.PI / 2);
  const spokeGeo = track(new THREE.BoxGeometry(r * 0.92, r * 0.17, w + 0.012));
  const capGeo = track(new THREE.CylinderGeometry(r * 0.16, r * 0.16, w + 0.03, 12));
  capGeo.rotateX(Math.PI / 2);
  return () => {
    const wheel = new THREE.Group();
    wheel.add(new THREE.Mesh(tireGeo, mat.tire));
    wheel.add(new THREE.Mesh(rimGeo, mat.rim));
    for (let i = 0; i < 5; i++) {
      const spoke = new THREE.Mesh(spokeGeo, mat.spoke);
      spoke.rotation.z = (i / 5) * Math.PI;
      wheel.add(spoke);
    }
    wheel.add(new THREE.Mesh(capGeo, mat.hubcap));
    return wheel;
  };
}

// Hiace-style panel van: cab-over, short sloped nose, tall roof, sliding side door.
function buildVan(mat, track) {
  const group = new THREE.Group();
  const { rbox, box, decal } = makeKit(group, track);
  const lamps = makeLamps(track);
  const wheels = [];

  /* bodywork */
  box(5.1, 0.22, 1.8, mat.dark, 0, 0.5, 0); // chassis
  rbox(5.2, 0.16, 1.94, 0.04, mat.dark, 0, 0.68, 0); // skirt
  rbox(5.3, 1.1, 1.95, 0.12, mat.body, 0, 1.2, 0); // lower body
  rbox(4.9, 0.62, 1.9, 0.16, mat.body, -0.25, 2.02, 0); // tall greenhouse / roof
  box(5.32, 0.12, 1.97, mat.accent, 0, 1.0, 0); // brand stripe
  box(5.32, 0.04, 1.97, mat.tail, 0, 0.88, 0); // alarm line
  box(0.4, 0.03, 1.7, mat.dark, 2.42, 1.76, 0); // wiper cowl on the short bonnet

  /* glass */
  const windshield = box(0.06, 0.55, 1.72, mat.glass, 2.23, 2.02, 0);
  windshield.rotation.z = 0.22; // top leans back
  box(0.03, 0.5, 1.4, mat.glass, -2.69, 2.02, 0);
  [-1, 1].forEach((side) => {
    const z = side * 0.955;
    box(0.72, 0.46, 0.03, mat.glass, 1.85, 2.02, z); // front door
    [0.7, -0.4, -1.5].forEach((x) => box(0.95, 0.46, 0.03, mat.glass, x, 2.02, z));
    box(0.03, 1.05, 0.03, mat.dark, 1.55, 1.2, side * 0.98); // door seam
    box(0.03, 1.05, 0.03, mat.dark, -0.1, 1.2, side * 0.98); // sliding door rear seam
    rbox(0.2, 0.05, 0.03, 0.015, mat.dark, 1.3, 1.5, side * 0.985); // handle
    box(0.04, 0.04, 0.2, mat.dark, 2.15, 1.82, side * 0.98); // mirror arm
    rbox(0.05, 0.3, 0.14, 0.02, mat.dark, 2.15, 1.72, side * 1.12);
  });

  /* flank decals */
  const panelTex = track(makeBusDecal());
  const panelMat = track(new THREE.MeshBasicMaterial({ map: panelTex, transparent: true }));
  const panelGeo = track(new THREE.PlaneGeometry(3.4, 0.6));
  decal(panelGeo, panelMat, -0.55, 1.42, 1).position.z = 0.977;
  decal(panelGeo, panelMat, -0.55, 1.42, -1).position.z = -0.977;

  /* front end */
  box(0.05, 0.28, 1.3, mat.dark, 2.66, 1.2, 0); // grille
  box(0.03, 0.04, 1.3, mat.chrome, 2.68, 1.3, 0);
  rbox(0.22, 0.3, 1.98, 0.06, mat.dark, 2.7, 0.7, 0); // front bumper
  rbox(0.2, 0.3, 1.98, 0.06, mat.dark, -2.7, 0.7, 0); // rear bumper
  [0.72, -0.72].forEach((z) => {
    rbox(0.07, 0.22, 0.5, 0.03, mat.headlight, 2.64, 1.5, z);
    box(0.06, 0.1, 0.16, mat.amber, 2.68, 0.95, z * 1.25);
    box(0.06, 0.5, 0.14, mat.tail, -2.66, 1.5, z * 1.18);
  });

  /* roof: vent + light bar with alternating beacons */
  rbox(1.1, 0.14, 1.0, 0.04, mat.roof, -1.2, 2.38, 0);
  rbox(0.5, 0.08, 1.6, 0.03, mat.dark, 1.4, 2.37, 0);
  const lampRed = rbox(0.3, 0.15, 0.6, 0.05, lamps.red, 1.4, 2.47, 0.42);
  const lampPurple = rbox(0.3, 0.15, 0.6, 0.05, lamps.purple, 1.4, 2.47, -0.42);
  const glowRed = new THREE.PointLight(0xff2234, 0, 7);
  glowRed.position.set(1.4, 2.9, 0.7);
  group.add(glowRed);
  const glowPurple = new THREE.PointLight(0x8540ff, 0, 7);
  glowPurple.position.set(1.4, 2.9, -0.7);
  group.add(glowPurple);

  /* wheels */
  const makeWheel = makeWheelFactory(track, mat, 0.38, 0.26);
  [[1.75, 0.88], [1.75, -0.88], [-1.7, 0.88], [-1.7, -0.88]].forEach(([x, z]) => {
    const wheel = makeWheel();
    wheel.position.set(x, 0.38, z);
    group.add(wheel);
    wheels.push({ obj: wheel, r: 0.38 });
  });

  return { group, wheels, lamps: [lampRed, lampPurple], glows: [glowRed, glowPurple] };
}

function buildTrike(mat, track) {
  const group = new THREE.Group();
  const { rbox, box, decal } = makeKit(group, track);
  const lamps = makeLamps(track);
  const wheels = [];

  /* rear patient cabin + chassis */
  box(2.1, 0.12, 0.95, mat.dark, -0.25, 0.5, 0);
  rbox(1.45, 0.95, 1.05, 0.1, mat.body, -0.55, 1.05, 0);
  box(1.47, 0.1, 1.07, mat.accent, -0.55, 0.8, 0);
  box(0.03, 0.4, 0.8, mat.glass, -1.29, 1.25, 0); // rear window
  [-1, 1].forEach((side) => {
    box(0.4, 0.4, 0.03, mat.glass, -0.1, 1.25, side * 0.53);
    box(0.04, 0.2, 0.1, mat.tail, -1.29, 0.8, side * 0.4);
    box(0.05, 0.8, 0.05, mat.dark, 0.85, 1.2, side * 0.55); // canopy posts
  });
  const badgeTex = track(makeBadgeDecal());
  const badgeMat = track(new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true }));
  const badgeGeo = track(new THREE.PlaneGeometry(0.8, 0.6));
  decal(badgeGeo, badgeMat, -0.82, 1.1, 1).position.z = 0.531;
  decal(badgeGeo, badgeMat, -0.82, 1.1, -1).position.z = -0.531;

  /* canopy over cabin and driver */
  rbox(2.0, 0.08, 1.2, 0.04, mat.roof, -0.1, 1.6, 0);
  const ws = box(0.05, 0.55, 1.0, mat.glass, 0.88, 1.28, 0);
  ws.rotation.z = 0.25; // top leans back

  /* front end: fairing, fork, bars, headlight */
  rbox(0.75, 0.5, 0.46, 0.08, mat.body, 0.8, 0.8, 0);
  rbox(0.5, 0.06, 0.3, 0.03, mat.body, 1.35, 0.68, 0);
  [0.13, -0.13].forEach((z) => {
    const fork = box(0.05, 0.55, 0.05, mat.chrome, 1.3, 0.58, z);
    fork.rotation.z = 0.2;
  });
  box(0.06, 0.06, 0.7, mat.dark, 0.72, 1.12, 0);
  rbox(0.08, 0.16, 0.2, 0.03, mat.headlight, 1.18, 0.88, 0);
  rbox(0.4, 0.12, 0.5, 0.04, mat.dark, 0.35, 0.85, 0); // driver seat

  /* beacons */
  box(0.3, 0.05, 0.5, mat.dark, 0.5, 1.67, 0);
  const lampRed = rbox(0.22, 0.12, 0.2, 0.04, lamps.red, 0.5, 1.75, 0.15);
  const lampPurple = rbox(0.22, 0.12, 0.2, 0.04, lamps.purple, 0.5, 1.75, -0.15);

  /* wheels: two rear on an axle, one front */
  box(0.08, 0.08, 1.2, mat.dark, -1.0, 0.32, 0);
  const rear = makeWheelFactory(track, mat, 0.32, 0.2);
  [0.6, -0.6].forEach((z) => {
    const wheel = rear();
    wheel.position.set(-1.0, 0.32, z);
    group.add(wheel);
    wheels.push({ obj: wheel, r: 0.32 });
  });
  const front = makeWheelFactory(track, mat, 0.3, 0.18)();
  front.position.set(1.35, 0.3, 0);
  group.add(front);
  wheels.push({ obj: front, r: 0.3 });

  return { group, wheels, lamps: [lampRed, lampPurple], glows: [] };
}

function buildMoto(mat, track) {
  const group = new THREE.Group();
  const { rbox, box, decal } = makeKit(group, track);
  const lamps = makeLamps(track);
  const wheels = [];

  /* bike */
  rbox(0.5, 0.35, 0.3, 0.06, mat.dark, 0, 0.62, 0); // engine
  rbox(0.55, 0.28, 0.3, 0.1, mat.accent, 0.3, 0.98, 0); // tank
  rbox(0.7, 0.12, 0.3, 0.05, mat.dark, -0.35, 0.95, 0); // seat
  rbox(0.5, 0.15, 0.26, 0.05, mat.body, -0.75, 0.98, 0); // tail
  box(0.45, 0.04, 0.2, mat.dark, -0.85, 0.85, 0); // rear fender
  box(0.7, 0.08, 0.08, mat.chrome, -0.3, 0.45, 0.2); // exhaust
  const fork = box(0.06, 0.8, 0.07, mat.chrome, 0.725, 0.775, 0);
  fork.rotation.z = 0.2;
  box(0.06, 0.06, 0.62, mat.dark, 0.62, 1.17, 0); // handlebar
  rbox(0.12, 0.2, 0.24, 0.04, mat.headlight, 0.78, 1.0, 0);

  /* rider */
  const torso = rbox(0.3, 0.6, 0.36, 0.08, mat.navy, -0.2, 1.3, 0);
  torso.rotation.z = -0.2;
  const helmet = new THREE.Mesh(track(new THREE.SphereGeometry(0.16, 14, 10)), mat.body);
  helmet.position.set(-0.02, 1.74, 0);
  group.add(helmet);
  box(0.1, 0.06, 0.2, mat.glass, 0.1, 1.74, 0); // visor
  [0.2, -0.2].forEach((z) => {
    const arm = box(0.77, 0.1, 0.1, mat.navy, 0.27, 1.33, z);
    arm.rotation.z = -0.44;
    box(0.14, 0.5, 0.16, mat.navy, 0.12, 0.75, z); // leg
  });

  /* sidecar ambulance module on the near (-z) side */
  const sz = -0.95;
  box(1.3, 0.08, 0.8, mat.dark, -0.15, 0.45, sz);
  [0.3, -0.5].forEach((x) => box(0.06, 0.06, 0.7, mat.dark, x, 0.55, -0.5));
  rbox(1.5, 0.7, 0.85, 0.14, mat.body, -0.1, 0.9, sz);
  rbox(0.5, 0.45, 0.7, 0.15, mat.body, 0.55, 0.75, sz);
  box(1.52, 0.07, 0.87, mat.accent, -0.1, 0.7, sz);
  box(0.5, 0.28, 0.03, mat.glass, 0.2, 1.02, sz - 0.43);
  const badgeTex = track(makeBadgeDecal());
  const badgeMat = track(new THREE.MeshBasicMaterial({ map: badgeTex, transparent: true }));
  const badgeGeo = track(new THREE.PlaneGeometry(0.62, 0.46));
  const badge = decal(badgeGeo, badgeMat, -0.42, 0.92, -1);
  badge.position.z = sz - 0.431;
  box(0.08, 0.5, 0.03, mat.tail, -0.88, 0.95, sz - 0.3); // tail light
  const lampRed = rbox(0.2, 0.1, 0.25, 0.04, lamps.red, -0.2, 1.31, sz + 0.17);
  const lampPurple = rbox(0.2, 0.1, 0.25, 0.04, lamps.purple, -0.2, 1.31, sz - 0.17);
  const sideWheel = makeWheelFactory(track, mat, 0.3, 0.14)();
  sideWheel.position.set(-0.15, 0.3, sz - 0.05);
  group.add(sideWheel);
  wheels.push({ obj: sideWheel, r: 0.3 });

  /* bike wheels */
  const bikeWheel = makeWheelFactory(track, mat, 0.4, 0.16);
  [0.8, -0.8].forEach((x) => {
    const wheel = bikeWheel();
    wheel.position.set(x, 0.4, 0);
    group.add(wheel);
    wheels.push({ obj: wheel, r: 0.4 });
  });

  return { group, wheels, lamps: [lampRed, lampPurple], glows: [] };
}

/* -------------------------------- component ------------------------------- */

// Noses point at the viewer, turned ~12° so we read a front three-quarter view.
const HEADING = -0.75;

export default function AmbulanceScene({ className }) {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setFailed(true);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 1.5 is visually indistinguishable here and renders ~44% fewer pixels than 2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);

    // lighting: soft hemisphere, warm key, purple rim
    const hemi = new THREE.HemisphereLight(0xcdbcff, 0x160a38, 1.1);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.9);
    key.position.set(6, 9, 7);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8540ff, 1.2);
    rim.position.set(-7, 4, -6);
    scene.add(rim);

    // The heading group fixes the 3/4 view; the vehicle drives along its own nose axis inside it.
    const heading = new THREE.Group();
    heading.rotation.y = HEADING;
    scene.add(heading);

    // The convoy: van, motorcycle and tricycle ambulances in a spaced row.
    // `mult` makes the smaller vehicles arrive a touch later in the intro.
    const disposables = [];
    const track = (obj) => (disposables.push(obj), obj);
    const mat = makeMaterials(track);
    const group = new THREE.Group(); // fleet root, used for camera fitting
    heading.add(group);
    const fleet = [
      // a spaced row abreast, all facing the viewer: motorcycle (screen-left), van (centre, a step back), tricycle (right)
      { ...buildVan(mat, track), x: -1.4, z: 0, scale: 0.85, mult: 1, phase: 0, roll: 0.004 },
      { ...buildMoto(mat, track), x: 1.3, z: 3.5, scale: 1, mult: 1.12, phase: 1.7, roll: 0.02 },
      { ...buildTrike(mat, track), x: 1.1, z: -3.3, scale: 1, mult: 1.25, phase: 3.1, roll: 0.01 },
    ];
    fleet.forEach((v) => {
      v.group.position.set(v.x, 0, v.z);
      v.group.scale.setScalar(v.scale);
      group.add(v.group);
    });
    const van = fleet[0];

    // Auto-fit camera: project the fleet's real (heading-local) box corners and back the camera
    // off until they sit inside the frame, so the vehicles stay as large as the canvas allows.
    heading.rotation.y = 0;
    scene.updateMatrixWorld(true);
    const localBox = new THREE.Box3().setFromObject(group);
    heading.rotation.y = HEADING;
    scene.updateMatrixWorld(true);
    const corners = [];
    [localBox.min.x, localBox.max.x].forEach((x) =>
      [localBox.min.y, localBox.max.y].forEach((y) =>
        [localBox.min.z, localBox.max.z].forEach((z) => corners.push(heading.localToWorld(new THREE.Vector3(x, y, z))))
      )
    );
    const target = heading.localToWorld(localBox.getCenter(new THREE.Vector3()));
    const viewDir = new THREE.Vector3(5.4, 2.0, 7.6).normalize();
    const baseCam = new THREE.Vector3();
    const fitCamera = () => {
      let dist = 14;
      for (let i = 0; i < 6; i++) {
        baseCam.copy(viewDir).multiplyScalar(dist).add(target);
        camera.position.copy(baseCam);
        camera.lookAt(target);
        camera.updateMatrixWorld(true);
        let m = 0.01;
        corners.forEach((c) => {
          const p = c.clone().project(camera);
          m = Math.max(m, Math.abs(p.x), Math.abs(p.y));
        });
        dist *= m / 0.9; // 10% breathing room for bob + parallax drift
      }
    };

    // fake contact shadows, one per vehicle (they ride along with it)
    const shadowTex = makeShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    disposables.push(shadowTex, shadowMat);
    [
      [van, 6.4, 3.2, 0, 0],
      [fleet[1], 3.4, 3.4, 0, -0.45],
      [fleet[2], 3.6, 1.9, 0.1, 0],
    ].forEach(([v, w, d, ox, oz]) => {
      const geo = new THREE.PlaneGeometry(w, d);
      const shadow = new THREE.Mesh(geo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(ox, 0.012, oz);
      v.group.add(shadow);
      disposables.push(geo);
    });

    // road strip with scrolling dashes, along the vehicle's travel axis
    const roadTex = makeRoadTexture();
    roadTex.repeat.set(8, 1);
    const roadAlpha = makeRoadAlpha();
    const roadMat = new THREE.MeshBasicMaterial({
      map: roadTex,
      alphaMap: roadAlpha,
      transparent: true,
      depthWrite: false,
    });
    const roadGeo = new THREE.PlaneGeometry(22, 8.6);
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0.6, 0.004, 0);
    heading.add(road);
    disposables.push(roadTex, roadAlpha, roadMat, roadGeo);

    // siren light spilling on the asphalt: a red and a purple pool under each vehicle, pulsing with its beacons
    const glowTex = makeGlowTexture();
    disposables.push(glowTex);
    [
      [van, 7.2, 3.4],
      [fleet[1], 4.6, 3.8],
      [fleet[2], 4.4, 3.2],
    ].forEach(([v, w, d]) => {
      v.pools = [0xff2234, 0x8540ff].map((color, i) => {
        const m = new THREE.MeshBasicMaterial({
          map: glowTex,
          color,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const geo = new THREE.PlaneGeometry(w, d);
        const pool = new THREE.Mesh(geo, m);
        pool.rotation.x = -Math.PI / 2;
        pool.position.set(0, 0.02, i === 0 ? 0.55 : -0.55);
        v.group.add(pool);
        disposables.push(m, geo);
        return m;
      });
    });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h); // also sets canvas CSS size: without it the canvas overflows on high-DPR screens
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      fitCamera();
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) renderer.render(scene, camera);
    });
    ro.observe(mount);

    const onContextLost = (e) => {
      e.preventDefault();
      setFailed(true);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    if (reduceMotion) {
      // static beauty frame: beacons softly lit, no loop
      fleet.forEach((v) => {
        v.lamps.forEach((l) => (l.material.emissiveIntensity = 1.4));
        v.pools.forEach((m) => (m.opacity = 0.3));
      });
      renderer.render(scene, camera);
    }

    /* interaction + loop */
    const drive = { x: reduceMotion ? 0 : -8 }; // start at the road's faded end, not beyond it
    let lastX = drive.x;
    const CRUISE = 2.6; // constant "driving" speed once the intro settles
        const ROAD_TILE = 22 / 8; // world units per repeated road tile
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let lastT = performance.now();
    let introTween;

    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const clock = { t: 0 };
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;
      clock.t += dt;
      const t = clock.t;

      // distance travelled this frame: intro approach + steady cruise
      const dDrive = drive.x - lastX;
      lastX = drive.x;
      fleet.forEach((v) => {
        const travel = dDrive * v.mult + CRUISE * dt;
        v.group.position.x = v.x + drive.x * v.mult;
        v.wheels.forEach((w) => (w.obj.rotation.z -= travel / (w.r * v.scale)));
        // suspension bob + sway (the bike rolls a little more)
        v.group.position.y = Math.sin(t * 2.2 + v.phase) * 0.02;
        v.group.rotation.z = Math.sin(t * 1.7 + v.phase) * 0.005;
        v.group.rotation.x = Math.sin(t * 1.3 + v.phase) * v.roll;
      });
      roadTex.offset.x += (dDrive + CRUISE * dt) / ROAD_TILE;

      // pointer parallax (lerped)
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      heading.rotation.y = HEADING + pointer.x * 0.1;
      camera.position.set(baseCam.x, baseCam.y - pointer.y * 0.25, baseCam.z);
      camera.lookAt(target);

      // alternating beacon pulse
      siren.pulse = Math.sin(t * 7); // lead vehicle's phase, read by the hero headline
      fleet.forEach((v) => {
        const pulse = Math.sin(t * 7 + v.phase);
        v.pools[0].opacity = 0.06 + Math.max(0, pulse) * 0.55;
        v.pools[1].opacity = 0.06 + Math.max(0, -pulse) * 0.55;
        v.lamps[0].material.emissiveIntensity = 0.7 + Math.max(0, pulse) * 2.4;
        v.lamps[1].material.emissiveIntensity = 0.7 + Math.max(0, -pulse) * 2.4;
        if (v.glows[0]) {
          v.glows[0].intensity = Math.max(0, pulse) * 2.2;
          v.glows[1].intensity = Math.max(0, -pulse) * 2.2;
        }
      });

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!raf && visible && pageVisible && !reduceMotion) {
        siren.live = true;
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const stopLoop = () => {
      siren.live = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? startLoop() : stopLoop();
    });
    io.observe(mount);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      pageVisible ? startLoop() : stopLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduceMotion) {
      mount.addEventListener("pointermove", onPointerMove);
      mount.addEventListener("pointerleave", onPointerLeave);
      introTween = gsap.to(drive, { x: 0, duration: 1.8, ease: "power3.out" });
      startLoop();
    }

    return () => {
      stopLoop();
      introTween?.kill();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  if (failed) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <img src={poster} alt="8medical ambulance fleet" className="w-full max-w-[560px] object-contain" />
      </div>
    );
  }

  return <div ref={mountRef} className={cn("h-full w-full", className)} aria-hidden="true" />;
}

// Shared with StoryScene (the hero's scripted scene).
export {
  brandFont,
  drawCross,
  makeDecal,
  makeGlowTexture,
  makeKit,
  makeLamps,
  makeMaterials,
  makeRoadAlpha,
  makeRoadTexture,
  makeWheelFactory,
  buildVan,
};
