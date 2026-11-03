import * as THREE from "three";
import { mergeGeometries, toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { brandFont, drawCross, makeBusDecal, makeDecal, makeKit } from "./AmbulanceScene";

/*
 * Higher-fidelity assets for the hero story: vehicles extruded from real side profiles,
 * PBR materials (clear-coated paint, reflective glass, rubber, alloy), a two-storey hospital,
 * street furniture, and paramedics driven by an AnimationMixer walk cycle.
 * Conventions: +x is the nose, y is up, models sit on y = 0.
 */

/* -------------------------------- materials -------------------------------- */

export function makePBR(track) {
  const P = (o) => track(new THREE.MeshPhysicalMaterial(o));
  const S = (o) => track(new THREE.MeshStandardMaterial(o));
  return {
    paintCar: P({ color: 0x4a74c9, roughness: 0.34, metalness: 0.55, clearcoat: 1, clearcoatRoughness: 0.05 }),
    paintWhite: P({ color: 0xf2f3f8, roughness: 0.3, metalness: 0.12, clearcoat: 1, clearcoatRoughness: 0.06 }),
    paintTruck: P({ color: 0xe9812f, roughness: 0.4, metalness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.1 }),
    paintCargo: P({ color: 0xe4e5ec, roughness: 0.5, metalness: 0.1, clearcoat: 0.5, clearcoatRoughness: 0.2 }),
    paintBrand: P({ color: 0x6d09f9, roughness: 0.32, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08 }),
    paintAlarm: P({ color: 0xf9091d, roughness: 0.35, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.1 }),
    trim: S({ color: 0x15131c, roughness: 0.62, metalness: 0.1 }),
    glass: P({ color: 0x0a0816, roughness: 0.03, metalness: 0.2, envMapIntensity: 1.8 }),
    rubber: S({ color: 0x0c0c10, roughness: 0.95, side: THREE.DoubleSide }),
    alloy: S({ color: 0xd9dbe4, roughness: 0.22, metalness: 1 }),
    steel: S({ color: 0x7d7f8d, roughness: 0.4, metalness: 0.9 }),
    chrome: S({ color: 0xcfd0dc, roughness: 0.1, metalness: 1 }),
    headlight: S({ color: 0xfff6d8, emissive: 0xfff2c0, emissiveIntensity: 1.1, roughness: 0.2 }),
    tail: S({ color: 0xc50a1a, emissive: 0xf9091d, emissiveIntensity: 0.6, roughness: 0.3 }),
    navy: S({ color: 0x2a2f5c, roughness: 0.8 }),
    vest: S({ color: 0x6d09f9, roughness: 0.7 }),
    reflect: S({ color: 0xd8dae6, roughness: 0.3, metalness: 0.6, emissive: 0x6a6a7a, emissiveIntensity: 0.4 }),
    skin: S({ color: 0x8d5a3b, roughness: 0.7 }),
    concrete: S({ color: 0xdfe3ee, roughness: 0.85 }),
    concreteDark: S({ color: 0x5b5a6e, roughness: 0.9 }),
    apron: S({ color: 0x24213a, roughness: 0.95 }),
    windowGlass: P({ color: 0x1d3a6b, roughness: 0.06, metalness: 0.5, envMapIntensity: 1.6 }),
    windowLit: S({ color: 0xffe2a8, emissive: 0xffd28a, emissiveIntensity: 0.9, roughness: 0.4 }),
    frame: S({ color: 0x2c2b38, roughness: 0.5, metalness: 0.6 }),
    leaf: S({ color: 0x1f6b45, roughness: 0.95 }),
    trunk: S({ color: 0x4a3426, roughness: 1 }),
    hedge: S({ color: 0x17573a, roughness: 1 }),
    lampHead: S({ color: 0xfff1d0, emissive: 0xffe2a8, emissiveIntensity: 1.2 }),
  };
}

/* ----------------------------- shared geometry ----------------------------- */

// Extrude a side-profile shape across the vehicle width, bevelled, with creased (smooth) normals.
function extrudeProfile(shape, depth, bevel) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 20,
  });
  geo.translate(0, 0, -depth / 2);
  return toCreasedNormals(geo, Math.PI / 4);
}

const mesh = (geo, material, x = 0, y = 0, z = 0) => {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  return m;
};

// A tire (lathe profile) + alloy rim with spokes, brake disc and centre cap. Axle along z.
export function makeRealWheelFactory(track, M, r, w) {
  const profile = [
    [0.6, -0.5], [0.86, -0.5], [0.97, -0.38], [1, -0.15], [1, 0.15], [0.97, 0.38], [0.86, 0.5], [0.6, 0.5],
  ].map(([x, y]) => new THREE.Vector2(x * r, y * w));
  const tireGeo = track(new THREE.LatheGeometry(profile, 40));
  tireGeo.rotateX(Math.PI / 2);
  const rimGeo = track(new THREE.CylinderGeometry(r * 0.62, r * 0.62, w * 0.86, 32));
  rimGeo.rotateX(Math.PI / 2);
  const discGeo = track(new THREE.CylinderGeometry(r * 0.48, r * 0.48, w * 0.3, 28));
  discGeo.rotateX(Math.PI / 2);
  const spokeGeo = track(new THREE.BoxGeometry(r * 0.56, r * 0.1, w * 0.4));
  const capGeo = track(new THREE.CylinderGeometry(r * 0.14, r * 0.14, w * 0.96, 16));
  capGeo.rotateX(Math.PI / 2);
  return () => {
    const wheel = new THREE.Group();
    wheel.add(new THREE.Mesh(tireGeo, M.rubber));
    wheel.add(new THREE.Mesh(discGeo, M.steel));
    wheel.add(new THREE.Mesh(rimGeo, M.alloy));
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      [-1, 1].forEach((side) => {
        const sp = new THREE.Mesh(spokeGeo, M.trim);
        sp.position.set(Math.cos(a) * r * 0.36, Math.sin(a) * r * 0.36, side * w * 0.02);
        sp.rotation.z = a;
        wheel.add(sp);
      });
    }
    wheel.add(new THREE.Mesh(capGeo, M.chrome));
    return wheel;
  };
}

// Dark block filling a wheel arch so the tunnel through the body reads as a wheel well.
// Spans from the ground to the arch crown, so nothing pokes below y = 0.
function archLiner(group, track, M, x, yb, radius, width) {
  const h = yb + radius;
  group.add(mesh(track(new THREE.BoxGeometry(radius * 2, h, width)), M.trim, x, h / 2, 0));
}

const wheelArc = (shape, xc, yb, R) => {
  shape.lineTo(xc - R, yb);
  shape.absarc(xc, yb, R, Math.PI, 0, true);
};

/* ------------------------------------ car ----------------------------------- */

const CAR = { W: 1.58, BEV: 0.06, YB: 0.28, SEAM: 1.8 };

function carShapes() {
  const { YB: yb, SEAM: seam } = CAR;
  const main = new THREE.Shape();
  main.moveTo(-2.05, yb);
  wheelArc(main, -1.45, yb, 0.46);
  wheelArc(main, 1.3, yb, 0.46);
  main.lineTo(seam, yb);
  main.lineTo(seam, 0.95);
  main.lineTo(1.0, 1.0);
  main.lineTo(0.82, 1.03);
  main.lineTo(0.15, 1.44); // windshield
  main.quadraticCurveTo(-0.45, 1.56, -1.0, 1.45); // roof
  main.lineTo(-1.5, 1.08); // rear glass
  main.quadraticCurveTo(-1.55, 1.05, -1.7, 1.04);
  main.lineTo(-2.0, 1.03);
  main.quadraticCurveTo(-2.14, 1.0, -2.16, 0.86);
  main.lineTo(-2.18, 0.55);
  main.quadraticCurveTo(-2.18, yb, -2.05, yb);

  const nose = new THREE.Shape(); // front fascia, hinged at the seam so it can crumple
  nose.moveTo(0, yb);
  nose.lineTo(0.3, yb);
  nose.quadraticCurveTo(0.5, yb, 0.5, 0.5);
  nose.quadraticCurveTo(0.51, 0.78, 0.38, 0.86);
  nose.quadraticCurveTo(0.2, 0.93, 0, 0.95);
  nose.lineTo(0, yb);
  return { main, nose };
}

export function buildSedan(M, track) {
  const group = new THREE.Group();
  const { rbox, box } = makeKit(group, track);
  const { W, BEV, YB, SEAM } = CAR;
  const FW = W + BEV * 2;
  const { main, nose } = carShapes();

  group.add(mesh(track(extrudeProfile(main, W, BEV)), M.paintCar));
  const noseGroup = new THREE.Group();
  noseGroup.position.set(SEAM, 0, 0);
  noseGroup.add(mesh(track(extrudeProfile(nose, W, BEV)), M.paintCar));
  group.add(noseGroup);

  // glass: side panels poke 1cm proud of the body, windshield and rear glass sit on the bevel
  const side = new THREE.Shape();
  [[0.76, 1.07], [0.17, 1.4], [-0.44, 1.455], [-0.96, 1.4], [-1.42, 1.1]].forEach(([x, y], i) => (i ? side.lineTo(x, y) : side.moveTo(x, y)));
  const sideGeo = track(new THREE.ExtrudeGeometry(side, { depth: FW + 0.02, bevelEnabled: false }));
  sideGeo.translate(0, 0, -(FW + 0.02) / 2);
  group.add(mesh(sideGeo, M.glass));
  const ws = mesh(track(new THREE.BoxGeometry(0.8, 0.02, W - 0.1)), M.glass, 0.52 + 0.04, 1.245 + 0.07, 0);
  ws.rotation.z = -0.55;
  const rg = mesh(track(new THREE.BoxGeometry(0.62, 0.02, W - 0.14)), M.glass, -1.27 - 0.05, 1.28 + 0.045, 0);
  rg.rotation.z = 0.69;
  group.add(ws, rg);

  // pillar + door shut lines, handles, mirrors
  [-1, 1].forEach((s) => {
    const z = s * (FW / 2 + 0.005);
    box(0.07, 0.42, 0.012, M.paintCar, -0.5, 1.24, z); // B pillar
    box(0.015, 0.7, 0.012, M.trim, 0.55, 0.68, z);
    box(0.015, 0.7, 0.012, M.trim, -0.5, 0.68, z);
    box(0.015, 0.7, 0.012, M.trim, -1.2, 0.68, z);
    rbox(0.2, 0.03, 0.025, 0.012, M.chrome, 0.3, 0.9, z);
    rbox(0.2, 0.03, 0.025, 0.012, M.chrome, -0.8, 0.9, z);
    box(0.06, 0.03, 0.18, M.trim, 0.62, 1.1, s * 0.93);
    rbox(0.12, 0.1, 0.1, 0.03, M.paintCar, 0.6, 1.12, s * 1.04);
    box(0.05, 0.14, 0.4, M.tail, -2.185, 0.88, s * 0.52); // tail lamp
  });
  rbox(0.1, 0.2, FW - 0.1, 0.04, M.trim, -2.17, 0.4, 0); // rear valance
  rbox(0.02, 0.12, 0.42, 0.01, M.chrome, -2.2, 0.72, 0); // plate surround
  box(0.02, 0.28, FW - 0.02, M.trim, 0.1, 0.32, 0); // sill

  // front fascia parts ride with the crumple zone
  const nk = makeKit(noseGroup, track);
  nk.rbox(0.07, 0.22, 1.2, 0.03, M.trim, 0.5, 0.52, 0); // grille
  nk.rbox(0.04, 0.03, 1.1, 0.015, M.chrome, 0.52, 0.6, 0);
  nk.rbox(0.12, 0.1, FW - 0.1, 0.04, M.trim, 0.47, 0.36, 0); // splitter
  [-1, 1].forEach((s) => {
    nk.rbox(0.1, 0.13, 0.4, 0.04, M.headlight, 0.43, 0.78, s * 0.55);
    nk.box(0.05, 0.08, 0.16, M.hazardFront || M.headlight, 0.5, 0.42, s * 0.68);
  });

  // wheels
  const wheels = [];
  const makeWheel = makeRealWheelFactory(track, M, 0.34, 0.24);
  [[1.3, 0.74], [1.3, -0.74], [-1.45, 0.74], [-1.45, -0.74]].forEach(([x, z]) => {
    const w = makeWheel();
    w.position.set(x, 0.34, z);
    group.add(w);
    wheels.push({ obj: w, r: 0.34 });
  });
  [1.3, -1.45].forEach((x) => archLiner(group, track, M, x, YB, 0.47, 1.1));

  // hazard lamps (blink during the story)
  const hazard = track(new THREE.MeshStandardMaterial({ color: 0xffb13d, emissive: 0xff9f1a, emissiveIntensity: 0, roughness: 0.3 }));
  [-1, 1].forEach((s) => {
    box(0.05, 0.08, 0.16, hazard, -2.19, 0.66, s * 0.7);
    nk.box(0.05, 0.08, 0.16, hazard, 0.5, 0.66, s * 0.7);
  });
  return { group, nose: noseGroup, wheels, hazards: [hazard], seamX: SEAM };
}

/* ------------------------------ ambulance (van) ------------------------------ */

const VAN = { W: 1.8, BEV: 0.07, YB: 0.3 };

function vanShape() {
  const { YB: yb } = VAN;
  const s = new THREE.Shape();
  s.moveTo(-2.5, yb);
  wheelArc(s, -1.7, yb, 0.5);
  wheelArc(s, 1.75, yb, 0.5);
  s.lineTo(2.45, yb);
  s.quadraticCurveTo(2.66, yb, 2.66, 0.55);
  s.lineTo(2.67, 1.0);
  s.quadraticCurveTo(2.68, 1.3, 2.5, 1.38);
  s.lineTo(2.25, 1.42);
  s.lineTo(1.72, 2.22); // steep windshield
  s.quadraticCurveTo(1.66, 2.32, 1.5, 2.33);
  s.lineTo(-2.35, 2.33);
  s.quadraticCurveTo(-2.6, 2.33, -2.63, 2.1);
  s.lineTo(-2.66, 0.7);
  s.quadraticCurveTo(-2.66, yb, -2.5, yb);
  return s;
}

// A Hiace-style high-roof ambulance bus in 8medical livery.
export function buildAmbulanceBus(M, track, lamps) {
  const group = new THREE.Group();
  const { rbox, box } = makeKit(group, track);
  const { W, BEV, YB } = VAN;
  const FW = W + BEV * 2;
  const wheels = [];

  group.add(mesh(track(extrudeProfile(vanShape(), W, BEV)), M.paintWhite));

  // glass: cab door window, three saloon windows, windshield, rear window
  const cab = new THREE.Shape();
  [[2.18, 1.52], [1.76, 2.14], [1.1, 2.14], [1.1, 1.52]].forEach(([x, y], i) => (i ? cab.lineTo(x, y) : cab.moveTo(x, y)));
  const cabGeo = track(new THREE.ExtrudeGeometry(cab, { depth: FW + 0.02, bevelEnabled: false }));
  cabGeo.translate(0, 0, -(FW + 0.02) / 2);
  group.add(mesh(cabGeo, M.glass));
  [0.45, -0.7, -1.85].forEach((x) => group.add(mesh(track(new THREE.BoxGeometry(0.95, 0.52, FW + 0.02)), M.glass, x, 1.88, 0)));
  const ws = mesh(track(new THREE.BoxGeometry(0.9, 0.025, W - 0.14)), M.glass, 1.99 + 0.07, 1.82 + 0.04, 0);
  ws.rotation.z = -1.0;
  group.add(ws);
  group.add(mesh(track(new THREE.BoxGeometry(0.03, 0.6, W - 0.3)), M.glass, -2.7, 1.95, 0));

  // livery: brand stripe + alarm line, flank panel with wordmark, seams, handles
  const panelTex = track(makeBusDecal());
  const panelMat = track(new THREE.MeshBasicMaterial({ map: panelTex, transparent: true }));
  const panelGeo = track(new THREE.PlaneGeometry(3.4, 0.6));
  [-1, 1].forEach((s) => {
    const z = s * (FW / 2 + 0.006);
    box(5.1, 0.13, 0.012, M.paintBrand, 0, 0.98, z);
    box(5.1, 0.04, 0.012, M.paintAlarm, 0, 0.86, z);
    const p = new THREE.Mesh(panelGeo, panelMat);
    p.position.set(-0.55, 1.42, z + s * 0.002);
    if (s < 0) p.rotation.y = Math.PI;
    group.add(p);
    box(0.02, 0.95, 0.012, M.trim, 1.55, 1.3, z); // cab door seam
    box(0.02, 0.95, 0.012, M.trim, -0.05, 1.3, z); // sliding door rear seam
    rbox(0.2, 0.04, 0.03, 0.015, M.trim, 1.35, 1.5, z);
    rbox(0.2, 0.04, 0.03, 0.015, M.trim, -0.25, 1.5, z);
    box(0.05, 0.05, 0.26, M.trim, 2.12, 1.62, s * 1.0); // mirror arm
    rbox(0.07, 0.34, 0.15, 0.03, M.trim, 2.12, 1.55, s * 1.13);
  });

  // front end + rear end
  rbox(0.06, 0.3, 1.3, 0.03, M.trim, 2.68, 0.98, 0); // grille
  box(0.03, 0.04, 1.3, M.chrome, 2.7, 1.1, 0);
  rbox(0.24, 0.3, FW + 0.02, 0.06, M.trim, 2.62, 0.55, 0); // bumper
  rbox(0.22, 0.3, FW + 0.02, 0.06, M.trim, -2.62, 0.55, 0);
  [-1, 1].forEach((s) => {
    rbox(0.07, 0.2, 0.46, 0.03, M.headlight, 2.68, 1.3, s * 0.68);
    box(0.06, 0.1, 0.16, M.tail, -2.69, 1.0, s * 0.8);
    box(0.06, 0.4, 0.14, M.tail, -2.69, 1.45, s * 0.82);
  });

  // roof: vent + light bar with alternating beacons
  rbox(1.2, 0.16, 1.1, 0.05, M.paintWhite, -1.3, 2.4, 0);
  rbox(0.55, 0.09, 1.7, 0.03, M.trim, 1.3, 2.4, 0);
  const lampRed = rbox(0.32, 0.17, 0.7, 0.05, lamps.red, 1.3, 2.5, 0.45);
  const lampPurple = rbox(0.32, 0.17, 0.7, 0.05, lamps.purple, 1.3, 2.5, -0.45);
  const glowRed = new THREE.PointLight(0xff2234, 0, 8);
  glowRed.position.set(1.3, 3.0, 0.7);
  const glowPurple = new THREE.PointLight(0x8540ff, 0, 8);
  glowPurple.position.set(1.3, 3.0, -0.7);
  group.add(glowRed, glowPurple);

  // wheels + wells
  const makeWheel = makeRealWheelFactory(track, M, 0.4, 0.27);
  [[1.75, 0.88], [1.75, -0.88], [-1.7, 0.88], [-1.7, -0.88]].forEach(([x, z]) => {
    const w = makeWheel();
    w.position.set(x, 0.4, z);
    group.add(w);
    wheels.push({ obj: w, r: 0.4 });
  });
  [1.75, -1.7].forEach((x) => archLiner(group, track, M, x, YB, 0.51, 1.2));

  return { group, wheels, lamps: [lampRed, lampPurple], glows: [glowRed, glowPurple] };
}

/* ---------------------------------- truck ---------------------------------- */

export function buildTruck(M, track) {
  const group = new THREE.Group();
  const { rbox, box } = makeKit(group, track);
  const hazard = track(new THREE.MeshStandardMaterial({ color: 0xffb13d, emissive: 0xff9f1a, emissiveIntensity: 0, roughness: 0.3 }));

  box(5.5, 0.3, 1.7, M.trim, 0, 0.58, 0); // ladder frame
  rbox(3.7, 2.15, 2.0, 0.07, M.paintCargo, -0.95, 1.8, 0); // cargo box
  for (let i = 0; i < 7; i++) box(0.03, 2.0, 2.03, M.concreteDark, -2.5 + i * 0.52, 1.8, 0); // panel ribs
  rbox(1.35, 1.7, 1.95, 0.14, M.paintTruck, 1.6, 1.55, 0); // cab
  rbox(0.5, 0.5, 1.9, 0.08, M.paintTruck, 2.2, 0.95, 0); // bonnet
  const ws = mesh(track(new THREE.BoxGeometry(0.05, 0.8, 1.62)), M.glass, 2.27, 2.0, 0);
  ws.rotation.z = 0.16;
  group.add(ws);
  rbox(0.14, 0.34, 2.05, 0.04, M.trim, -2.88, 0.6, 0); // rear bumper bar
  rbox(0.2, 0.3, 2.0, 0.05, M.trim, 2.6, 0.6, 0);
  box(0.04, 1.95, 0.04, M.trim, -2.8, 1.8, 0.0); // rear door split
  [-1, 1].forEach((s) => {
    box(0.95, 0.65, 0.03, M.glass, 1.6, 2.0, s * 0.985);
    box(0.05, 0.22, 0.4, M.tail, -2.84, 0.98, s * 0.75);
    box(0.05, 0.12, 0.16, hazard, -2.86, 1.3, s * 0.88);
    box(0.05, 0.12, 0.16, hazard, 2.64, 0.95, s * 0.8);
    rbox(0.1, 0.16, 0.4, 0.03, M.headlight, 2.62, 1.05, s * 0.6);
    rbox(0.1, 0.1, 0.05, 0.02, M.trim, 1.6, 2.72, s * 0.5);
    rbox(0.07, 0.4, 0.14, 0.03, M.trim, 2.15, 1.8, s * 1.1); // mirror
    box(0.2, 0.05, 0.03, M.trim, 1.3, 1.5, s * 0.985); // handle
  });
  const wheels = [];
  const makeWheel = makeRealWheelFactory(track, M, 0.46, 0.3);
  [[1.7, 0.86], [1.7, -0.86], [-1.9, 0.86], [-1.9, -0.86], [-0.85, 0.86], [-0.85, -0.86]].forEach(([x, z]) => {
    const w = makeWheel();
    w.position.set(x, 0.46, z);
    group.add(w);
    wheels.push({ obj: w, r: 0.46 });
  });
  return { group, wheels, hazards: [hazard] };
}

/* --------------------------------- hospital --------------------------------- */

const makeSign = (w, h, bg, fg, text, cross = false) =>
  makeDecal(w, h, (ctx) => {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    let x = w / 2;
    ctx.textBaseline = "middle";
    ctx.fillStyle = fg;
    ctx.font = `700 ${Math.round(h * 0.5)}px ${brandFont()}`;
    if (cross) {
      drawCross(ctx, h * 0.62, h / 2, h * 0.58);
      x = h * 1.1;
      ctx.textAlign = "left";
    } else ctx.textAlign = "center";
    ctx.fillText(text, x, h / 2 + 4);
  });

// Two-storey hospital with a cross tower, main entrance, window rows and an emergency bay.
// Local origin: centre of the main block on the ground, front facing +z. Emergency wing is at x = -7.5.
export function buildHospital(M, track) {
  const group = new THREE.Group();
  const { rbox, box } = makeKit(group, track);

  rbox(13.4, 0.25, 6.4, 0.05, M.concreteDark, 0, 0.125, 0.4); // plinth
  rbox(10, 4.65, 4.4, 0.08, M.concrete, 0, 2.575, 0); // main block
  box(10.1, 0.12, 4.5, M.concreteDark, 0, 2.6, 0); // floor band
  box(10.2, 0.22, 4.6, M.concreteDark, 0, 4.95, 0); // parapet cap
  rbox(3.0, 1.9, 3.2, 0.06, M.concrete, 0, 5.9, 0.2); // tower

  // glazing: two rows, lit windows picked from a fixed pattern
  const cols = [-4.2, -3.0, -1.8, -0.6, 0.6, 1.8, 3.0, 4.2];
  const rows = [{ y: 1.5, h: 1.5, skip: [-0.6, 0.6] }, { y: 3.75, h: 1.4, skip: [] }];
  const spots = [];
  rows.forEach((row) => cols.forEach((x) => !row.skip.includes(x) && spots.push({ x, y: row.y, h: row.h })));
  const winGeo = track(new THREE.BoxGeometry(0.92, 1, 0.05));
  const frameGeo = track(new THREE.BoxGeometry(1.04, 1, 0.08));
  const lit = [];
  const dark = [];
  let seed = 5;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  spots.forEach((sp) => (rnd() < 0.45 ? lit : dark).push(sp));
  const frames = new THREE.InstancedMesh(frameGeo, M.frame, spots.length);
  const dummy = new THREE.Object3D();
  const place = (inst, list, zOff) =>
    list.forEach((sp, i) => {
      dummy.position.set(sp.x, sp.y, 2.2 + zOff);
      dummy.scale.set(1, sp.h * (zOff ? 0.88 : 1), 1);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
  place(frames, spots, 0);
  group.add(frames);
  [[dark, M.windowGlass], [lit, M.windowLit]].forEach(([list, material]) => {
    if (!list.length) return;
    const inst = new THREE.InstancedMesh(winGeo, material, list.length);
    place(inst, list, 0.045);
    group.add(inst);
  });

  // main entrance: lit lobby, glass doors, canopy on slim columns, sign
  box(2.5, 2.1, 0.06, M.windowLit, 0, 1.3, 2.18);
  box(2.6, 2.2, 0.08, M.frame, 0, 1.35, 2.2);
  [-0.62, 0.62].forEach((x) => box(1.1, 2.0, 0.06, M.windowGlass, x, 1.3, 2.24));
  rbox(4.6, 0.2, 2.4, 0.05, M.concreteDark, 0, 2.55, 3.3);
  [-2.1, 2.1].forEach((x) => group.add(mesh(track(new THREE.CylinderGeometry(0.07, 0.07, 2.4, 14)), M.chrome, x, 1.32, 4.4)));
  const signTex = track(makeSign(1024, 192, "#FFFFFF", "#2C0174", "Hospital", true));
  const signMat = track(new THREE.MeshBasicMaterial({ map: signTex, toneMapped: false }));
  const sign = new THREE.Mesh(track(new THREE.PlaneGeometry(3.6, 0.68)), signMat);
  sign.position.set(0, 3.2, 2.23);
  group.add(sign);

  // cross on the tower
  const crossTex = track(makeDecal(256, 256, (ctx) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 256, 256);
    drawCross(ctx, 128, 128, 180);
  }));
  const cross = new THREE.Mesh(track(new THREE.PlaneGeometry(1.5, 1.5)), track(new THREE.MeshBasicMaterial({ map: crossTex, toneMapped: false })));
  cross.position.set(0, 5.9, 1.82);
  group.add(cross);
  [[-4, 5.2], [3.8, 5.2]].forEach(([x, y]) => rbox(1.4, 0.5, 1.2, 0.05, M.concreteDark, x, y + 0.1, -0.4)); // plant

  // emergency wing + ambulance bay
  rbox(4.4, 3.4, 4.8, 0.08, M.concrete, -7.5, 1.95, 0.2);
  box(4.5, 0.12, 4.9, M.concreteDark, -7.5, 3.7, 0.2);
  box(3.2, 2.3, 0.1, M.frame, -7.5, 1.4, 2.62); // bay opening
  box(3.0, 2.1, 0.06, M.windowLit, -7.5, 1.35, 2.66);
  rbox(5.0, 0.2, 3.4, 0.05, M.concreteDark, -7.5, 3.15, 4.0); // canopy
  [-9.7, -5.3].forEach((x) => group.add(mesh(track(new THREE.CylinderGeometry(0.08, 0.08, 3.0, 14)), M.chrome, x, 1.65, 5.5)));
  const emTex = track(makeSign(1024, 192, "#D90818", "#FFFFFF", "EMERGENCY"));
  const em = new THREE.Mesh(
    track(new THREE.PlaneGeometry(3.6, 0.68)),
    track(new THREE.MeshBasicMaterial({ map: emTex, toneMapped: false }))
  );
  em.position.set(-7.5, 3.4, 2.65);
  group.add(em);
  const pad = new THREE.Mesh(track(new THREE.PlaneGeometry(6.0, 6.6)), M.apron);
  pad.rotation.x = -Math.PI / 2;
  pad.position.set(-7.5, 0.27, 4.4);
  group.add(pad);

  // landscaping
  [-3.2, 3.2].forEach((x) => rbox(2.6, 0.55, 0.8, 0.22, M.hedge, x, 0.52, 3.2));
  return group;
}

/* ------------------------------ street furniture ----------------------------- */

export function buildStreetlight(M, track) {
  const g = new THREE.Group();
  const { rbox } = makeKit(g, track);
  g.add(mesh(track(new THREE.CylinderGeometry(0.05, 0.07, 4.4, 10)), M.steel, 0, 2.2, 0));
  rbox(0.9, 0.06, 0.07, 0.02, M.steel, 0.4, 4.4, 0);
  rbox(0.5, 0.1, 0.22, 0.04, M.lampHead, 0.85, 4.36, 0);
  return g;
}

export function buildTree(M, track, scale = 1) {
  const g = new THREE.Group();
  g.add(mesh(track(new THREE.CylinderGeometry(0.12, 0.2, 1.8, 8)), M.trunk, 0, 0.9, 0));
  [[0, 2.5, 0, 1.15], [0.45, 2.1, 0.2, 0.8], [-0.4, 2.2, -0.1, 0.85]].forEach(([x, y, z, r]) =>
    g.add(mesh(track(new THREE.IcosahedronGeometry(r, 1)), M.leaf, x, y, z))
  );
  g.scale.setScalar(scale);
  return g;
}

export function buildRoadSign(M, track) {
  const g = new THREE.Group();
  g.add(mesh(track(new THREE.CylinderGeometry(0.04, 0.04, 2.6, 8)), M.steel, 0, 1.3, 0));
  const tex = track(makeDecal(384, 256, (ctx) => {
    ctx.fillStyle = "#1859C8";
    ctx.fillRect(0, 0, 384, 256);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, 364, 236);
    drawCross(ctx, 110, 128, 120);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(210, 112);
    ctx.lineTo(290, 112);
    ctx.lineTo(290, 80);
    ctx.lineTo(356, 128);
    ctx.lineTo(290, 176);
    ctx.lineTo(290, 144);
    ctx.lineTo(210, 144);
    ctx.closePath();
    ctx.fill();
  }));
  const plate = new THREE.Mesh(track(new THREE.PlaneGeometry(1.6, 1.07)), track(new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })));
  plate.position.set(0, 2.5, 0.05);
  g.add(plate);
  return g;
}

/* ---------------------------------- people ---------------------------------- */

const Z_AXIS = new THREE.Vector3(0, 0, 1);
const quatTrack = (name, times, angles) => {
  const vals = [];
  angles.forEach((a) => vals.push(...new THREE.Quaternion().setFromAxisAngle(Z_AXIS, a).toArray()));
  return new THREE.QuaternionKeyframeTrack(`${name}.quaternion`, times, vals);
};

// A paramedic in a purple hi-vis vest. The walk cycle is an AnimationClip played by an AnimationMixer:
// limb pivots are named nodes, so the tracks bind by name. Weight 0 returns the rest pose.
export function buildParamedic(M, track) {
  const group = new THREE.Group();
  const hips = new THREE.Group();
  hips.name = "hips";
  group.add(hips);

  const limb = (name, radius, length, material, px, py, pz, parent) => {
    const pivot = new THREE.Group();
    pivot.name = name;
    pivot.position.set(px, py, pz);
    const m = new THREE.Mesh(track(new THREE.CapsuleGeometry(radius, length, 4, 10)), material);
    m.position.y = -(length / 2 + radius);
    pivot.add(m);
    parent.add(pivot);
    return pivot;
  };
  limb("legL", 0.085, 0.62, M.navy, 0, 0.9, 0.1, hips);
  limb("legR", 0.085, 0.62, M.navy, 0, 0.9, -0.1, hips);
  [0.1, -0.1].forEach((z) => hips.add(mesh(track(new THREE.BoxGeometry(0.3, 0.09, 0.14)), M.trim, 0.05, 0.05, z))); // boots
  const torso = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.2, 0.42, 6, 12)), M.vest);
  torso.position.y = 1.23;
  torso.scale.z = 1.15;
  hips.add(torso);
  const band = new THREE.Mesh(track(new THREE.CylinderGeometry(0.205, 0.205, 0.07, 16)), M.reflect);
  band.position.y = 1.15;
  band.scale.z = 1.15;
  hips.add(band);
  limb("armL", 0.062, 0.46, M.vest, 0, 1.5, 0.27, hips);
  limb("armR", 0.062, 0.46, M.vest, 0, 1.5, -0.27, hips);
  hips.add(mesh(track(new THREE.SphereGeometry(0.13, 18, 14)), M.skin, 0, 1.78, 0));
  const cap = mesh(track(new THREE.SphereGeometry(0.14, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2)), M.navy, 0, 1.8, 0);
  hips.add(cap);

  // walk clip: 0.8s loop, legs and arms swing in opposition, hips bob at double frequency
  const times = Array.from({ length: 9 }, (_, i) => i * 0.1);
  const swing = (amp, phase) => times.map((t) => Math.sin(((t / 0.8) * Math.PI * 2) + phase) * amp);
  const bob = [];
  times.forEach((t) => bob.push(0, Math.abs(Math.sin((t / 0.8) * Math.PI * 2)) * 0.035, 0));
  const clip = new THREE.AnimationClip("walk", 0.8, [
    quatTrack("legL", times, swing(0.55, 0)),
    quatTrack("legR", times, swing(0.55, Math.PI)),
    quatTrack("armL", times, swing(0.18, Math.PI)),
    quatTrack("armR", times, swing(0.18, 0)),
    new THREE.VectorKeyframeTrack("hips.position", times, bob),
  ]);
  clip.optimize();
  const mixer = new THREE.AnimationMixer(group);
  const action = mixer.clipAction(clip);
  action.play();
  action.setEffectiveWeight(0);
  return { group, mixer, action };
}

export function buildStretcher(M, track) {
  const g = new THREE.Group();
  const { rbox, box } = makeKit(g, track);
  rbox(1.9, 0.05, 0.52, 0.02, M.chrome, 0, 0.9, 0); // bed frame
  rbox(1.8, 0.09, 0.46, 0.04, M.concrete, 0, 0.96, 0); // mattress
  [-0.7, 0.7].forEach((x) => [-0.2, 0.2].forEach((z) => box(0.04, 0.2, 0.04, M.steel, x, 0.8, z)));
  const patient = new THREE.Group();
  const body = new THREE.Mesh(track(new THREE.CapsuleGeometry(0.15, 1.05, 6, 12)), M.vest);
  body.rotation.z = Math.PI / 2;
  body.position.set(-0.1, 1.12, 0);
  body.scale.set(1, 1, 1.1);
  patient.add(body);
  patient.add(mesh(track(new THREE.SphereGeometry(0.12, 16, 12)), M.skin, 0.68, 1.13, 0));
  rbox(0.3, 0.07, 0.34, 0.03, M.concrete, 0.74, 1.02, 0); // pillow
  g.add(patient);
  return { group: g, patient };
}

/* ------------------------------ Nigerian streetscape ------------------------------ */

// Palm tree: slightly leaning trunk with a crown of drooping fronds.
export function buildPalm(M, track, scale = 1) {
  const g = new THREE.Group();
  const trunk = mesh(track(new THREE.CylinderGeometry(0.1, 0.17, 5.2, 9)), M.trunk, 0, 2.6, 0);
  trunk.rotation.z = -0.07;
  g.add(trunk);
  const frond = track(new THREE.SphereGeometry(1, 10, 4));
  frond.scale(1.5, 0.05, 0.26);
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const f = new THREE.Mesh(frond, M.leaf);
    f.position.set(Math.cos(a) * 0.95 - 0.35, 5.2 - Math.abs(Math.sin(a * 2)) * 0.1, Math.sin(a) * 0.95);
    f.rotation.y = -a;
    f.rotation.z = -0.4; // droop outward
    g.add(f);
  }
  g.scale.setScalar(scale);
  return g;
}

// A row of Nigerian-style roadside buildings: painted two-storey blocks with balconies and rooftop
// water tanks, shop rows with roll-up shutters under corrugated zinc roofs, and walled compounds with gates.
// `skip` leaves a gap (where the hospital stands). Fronts line up along z = -6.6.
export function buildNigerianStreet(M, track, { from, to, skip = [0, 0] }) {
  const root = new THREE.Group();
  let seed = 21;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const FRONT_Z = -6.6;

  const paints = [0xf2c94c, 0x2fa36b, 0x3b82c4, 0xe98fa0, 0xf28c4a, 0xe9e4d6, 0xb9503e, 0x7bc8c0].map((c) =>
    track(new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }))
  );
  const white = track(new THREE.MeshStandardMaterial({ color: 0xf5f3ee, roughness: 0.9 }));
  const ironDark = track(new THREE.MeshStandardMaterial({ color: 0x23222b, roughness: 0.6, metalness: 0.6 }));
  const tankMat = track(new THREE.MeshStandardMaterial({ color: 0x17171b, roughness: 0.5 }));

  // shared textures: louvre window glass, corrugated roll-up shutter, corrugated roof, shop signs
  const louvreTex = track(makeDecal(128, 192, (ctx) => {
    ctx.fillStyle = "#6f94bd";
    ctx.fillRect(0, 0, 128, 192);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let y = 8; y < 192; y += 16) ctx.fillRect(4, y, 120, 7);
    ctx.strokeStyle = "#2c2b38";
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 120, 184);
  }));
  const shutterTex = track(makeDecal(128, 192, (ctx) => {
    ctx.fillStyle = "#a3a9b3";
    ctx.fillRect(0, 0, 128, 192);
    ctx.fillStyle = "rgba(60,64,74,0.45)";
    for (let y = 4; y < 192; y += 9) ctx.fillRect(0, y, 128, 3);
    ctx.fillStyle = "#3b3f4a";
    ctx.fillRect(48, 168, 32, 8);
  }));
  const roofStripes = (a, b) => {
    const t = makeDecal(128, 64, (ctx) => {
      for (let x = 0; x < 128; x += 8) {
        ctx.fillStyle = (x / 8) % 2 ? a : b;
        ctx.fillRect(x, 0, 8, 64);
      }
    });
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 1);
    return track(t);
  };
  const roofMats = [["#8b3a2b", "#a54a37"], ["#6b7280", "#8a909c"], ["#2f6f4f", "#3a8a63"]].map(([a, b]) =>
    track(new THREE.MeshStandardMaterial({ map: roofStripes(a, b), roughness: 0.55, metalness: 0.45 }))
  );
  const louvreMat = track(new THREE.MeshStandardMaterial({ map: louvreTex, roughness: 0.4, metalness: 0.2 }));
  const shutterMat = track(new THREE.MeshStandardMaterial({ map: shutterTex, roughness: 0.55, metalness: 0.5 }));
  const SIGNS = [
    ["PROVISIONS", "#1F7A4D"], ["BUKA", "#C0392B"], ["PHONE REPAIR", "#1B5FB5"], ["SALON", "#B8329A"],
    ["POS & TRANSFER", "#E39B12"], ["PHARMACY", "#0F8A5F"], ["TAILOR", "#6D09F9"], ["FRESH BREAD", "#B4531A"],
  ];
  const signMats = SIGNS.map(([text, bg]) =>
    track(new THREE.MeshBasicMaterial({
      map: track(makeDecal(512, 112, (ctx) => {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 512, 112);
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 6;
        ctx.strokeRect(8, 8, 496, 96);
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `700 54px ${brandFont()}`;
        ctx.fillText(text, 256, 58);
      })),
      toneMapped: false,
    }))
  );

  const plane = (w, h, material, x, y, z, parent) => {
    const m = mesh(track(new THREE.PlaneGeometry(w, h)), material, x, y, z);
    parent.add(m);
    return m;
  };
  const gable = (parent, w, d, y, rise, roofMat, zOff = 0) => {
    // two zinc sheets meeting at a ridge along x, with a small overhang
    const run = d / 2 + 0.35;
    const len = Math.hypot(run, rise);
    const ang = Math.atan2(rise, run);
    [-1, 1].forEach((s) => {
      const sheet = mesh(track(new THREE.BoxGeometry(w + 0.5, 0.07, len)), roofMat, 0, y + rise / 2, zOff + s * (run / 2));
      sheet.rotation.x = s * ang;
      parent.add(sheet);
    });
  };

  // building types ---------------------------------------------------------------
  const twoStorey = (w, d) => {
    const g = new THREE.Group();
    const wall = pick(paints);
    const { rbox, box } = makeKit(g, track);
    box(w, 6.0, d, wall, 0, 3.0, 0);
    box(w + 0.12, 0.45, d + 0.12, M.concreteDark, 0, 0.22, 0); // plinth
    box(w + 0.3, 0.25, d + 0.3, M.concrete, 0, 6.12, 0); // roof slab
    box(w + 0.3, 0.5, 0.12, M.concrete, 0, 6.5, d / 2 + 0.1); // front parapet
    const fz = d / 2 + 0.02;
    // ground floor shops
    const bays = Math.max(2, Math.floor(w / 2.3));
    for (let i = 0; i < bays; i++) {
      const x = -w / 2 + (w / bays) * (i + 0.5);
      plane(1.5, 2.3, shutterMat, x, 1.35, fz, g);
      plane(Math.min(2.0, w / bays - 0.2), 0.45, pick(signMats), x, 2.85, fz, g);
    }
    // first floor: louvre windows + balcony
    for (let i = 0; i < 3; i++) plane(0.9, 1.3, louvreMat, -w / 2 + (w / 3) * (i + 0.5), 4.5, fz, g);
    box(w * 0.8, 0.14, 0.9, M.concrete, 0, 3.6, d / 2 + 0.45);
    box(w * 0.8, 0.07, 0.07, white, 0, 4.4, d / 2 + 0.88);
    for (let i = 0; i <= 8; i++) box(0.05, 0.8, 0.05, white, -w * 0.4 + (w * 0.8 / 8) * i, 4.0, d / 2 + 0.88);
    // rooftop water tank on a stand + stair head
    g.add(mesh(track(new THREE.CylinderGeometry(0.55, 0.55, 1.0, 16)), tankMat, w * 0.2, 7.4, 0));
    [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].forEach(([dx, dz]) => box(0.07, 0.5, 0.07, ironDark, w * 0.2 + dx, 6.7, dz));
    box(1.4, 1.2, 1.4, M.concrete, -w * 0.25, 6.85, -0.4);
    return { g, h: 7 };
  };

  const shopRow = (w, d) => {
    const g = new THREE.Group();
    const wall = pick(paints);
    const { box } = makeKit(g, track);
    box(w, 3.4, d, wall, 0, 1.7, 0);
    box(w + 0.1, 0.35, d + 0.1, M.concreteDark, 0, 0.17, 0);
    const bays = Math.max(2, Math.floor(w / 2.4));
    const fz = d / 2 + 0.02;
    for (let i = 0; i < bays; i++) {
      const x = -w / 2 + (w / bays) * (i + 0.5);
      plane(1.6, 2.3, shutterMat, x, 1.3, fz, g);
      plane(Math.min(2.1, w / bays - 0.2), 0.5, pick(signMats), x, 2.85, fz, g);
    }
    // verandah on slim pillars + corrugated zinc gable roof
    box(w + 0.4, 0.07, 1.2, roofMats[0], 0, 3.25, d / 2 + 0.6);
    for (let i = 0; i <= bays; i++) box(0.09, 3.2, 0.09, white, -w / 2 + (w / bays) * i, 1.6, d / 2 + 1.15);
    gable(g, w, d, 3.4, 1.25, pick(roofMats));
    return { g, h: 4.7 };
  };

  const compound = (w, d) => {
    const g = new THREE.Group();
    const wall = pick(paints);
    const band = pick(paints);
    const { box } = makeKit(g, track);
    const wz = d / 2 - 0.2; // wall sits on the front line
    box(w, 2.2, 0.28, wall, 0, 1.1, wz);
    box(w, 0.55, 0.3, band, 0, 0.28, wz);
    box(w + 0.1, 0.12, 0.38, M.concrete, 0, 2.25, wz);
    // gate: iron frame with vertical bars
    box(2.0, 2.0, 0.12, ironDark, -w * 0.2, 1.0, wz + 0.02);
    for (let i = 0; i < 9; i++) box(0.04, 1.8, 0.14, M.steel, -w * 0.2 - 0.9 + i * 0.225, 1.0, wz + 0.04);
    [-1.1, 1.1].forEach((dx) => box(0.3, 2.5, 0.34, M.concrete, -w * 0.2 + dx, 1.25, wz));
    // the bungalow behind the wall
    const hw = w * 0.75;
    box(hw, 2.9, d - 1.6, pick(paints), 0, 1.45, -0.5);
    plane(0.9, 1.1, louvreMat, -hw * 0.25, 1.6, (d - 1.6) / 2 - 0.5 + 0.02, g);
    plane(0.9, 1.1, louvreMat, hw * 0.25, 1.6, (d - 1.6) / 2 - 0.5 + 0.02, g);
    gable(g, hw, d - 1.6, 2.9, 1.1, pick(roofMats), -0.5);
    return { g, h: 4.2 };
  };

  const kinds = [twoStorey, shopRow, compound, shopRow, twoStorey, compound];
  let x = from;
  let n = 0;
  while (x < to) {
    const w = 5 + rnd() * 2.8;
    if (x + w > skip[0] && x < skip[1]) {
      x = skip[1] + 1;
      continue;
    }
    const d = 4 + rnd() * 1.2;
    const built = kinds[n++ % kinds.length](w, d);
    built.g.position.set(x + w / 2, 0, FRONT_Z - d / 2);
    root.add(built.g);
    x += w + 0.3 + rnd() * 1.1;
  }
  return root;
}

/* -------------------------------- performance -------------------------------- */

// Bakes a group of static meshes into one mesh per material. The roadside street is ~300 small meshes;
// merged it is a couple of dozen draw calls, which is what keeps the scene light on modest GPUs.
export function mergeStatic(root, track) {
  root.updateMatrixWorld(true);
  const buckets = new Map();
  root.traverse((o) => {
    if (!o.isMesh || o.isInstancedMesh) return;
    const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    g.applyMatrix4(o.matrixWorld);
    Object.keys(g.attributes).forEach((name) => {
      if (!["position", "normal", "uv"].includes(name)) g.deleteAttribute(name);
    });
    if (!g.attributes.uv) g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!buckets.has(o.material)) buckets.set(o.material, []);
    buckets.get(o.material).push(g);
  });
  const out = new THREE.Group();
  buckets.forEach((geos, material) => {
    const merged = mergeGeometries(geos, false);
    geos.forEach((g) => g.dispose());
    if (merged) out.add(new THREE.Mesh(track(merged), material));
  });
  return out;
}
