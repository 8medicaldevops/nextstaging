"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { siren } from "./siren";
import { makeGlowTexture, makeLamps, makeRoadAlpha } from "./AmbulanceScene";
import {
  buildAmbulanceBus,
  buildHospital,
  buildNigerianStreet,
  buildPalm,
  buildParamedic,
  buildRoadSign,
  buildSedan,
  buildStreetlight,
  buildStretcher,
  buildTree,
  buildTruck,
  makePBR,
  makePavementTexture,
  mergeStatic,
} from "./realistic";
import { BEATS } from "./story-beats";
import poster__asset from "../../assets/images/ambu-big-transformed.png";

const poster = poster__asset.src ?? poster__asset;

/*
 * A 22 second story, looping: an ordinary drive, a crash, a call, help arrives, the patient is carried
 * to the ambulance, and the ambulance drives the whole way down the road to the hospital while the
 * camera follows it.
 * World: +x is the direction of travel (screen-right), the camera looks from +z.
 * Far lane z = -1 (the crash), near lane z = +1.5 (the ambulance). The hospital is ~40 units downstream.
 */

const FAR_LANE = -1;
const NEAR_LANE = 1.5;
const CREW_Z = 0.3; // the strip between the lanes
const HOSPITAL_X = 41;
const BAY_X = HOSPITAL_X - 7.5; // under the emergency canopy
const VAN_SCALE = 0.9;
// The words sit in their own band below the scene, so the camera aims higher: the road lands in the
// lower quarter of the frame and the vehicles fill the view instead of an empty foreground.
const VIEW_HEIGHT = 8.4;
const LOOK_Y = 2.2;

/* --------------------------------- textures -------------------------------- */

function makeSmokeTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(210,205,225,0.95)");
  g.addColorStop(0.5, "rgba(170,160,200,0.45)");
  g.addColorStop(1, "rgba(150,140,190,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// One repeating tile of road: black asphalt with grain, white edge lines and a dashed white centre line.
// The tile is 7.2 world units long (u) and spans the 5.8 unit road width (v).
function makeAsphaltTexture() {
  const W = 512;
  const H = 256;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#222227";
  ctx.fillRect(0, 0, W, H);
  // aggregate grain: wrapped so the tile repeats without a seam
  let seed = 3;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 5200; i++) {
    const g = 20 + Math.floor(rnd() * 60);
    ctx.fillStyle = `rgba(${g},${g},${g + 4},${0.35 + rnd() * 0.5})`;
    ctx.fillRect(Math.floor(rnd() * W), Math.floor(rnd() * H), 1 + Math.floor(rnd() * 2), 1 + Math.floor(rnd() * 2));
  }
  // lane markings, slightly worn
  ctx.fillStyle = "rgba(244,244,246,0.95)";
  ctx.fillRect(0, 14, W, 6); // far edge line
  ctx.fillRect(0, H - 20, W, 6); // near edge line
  [[16, 196], [272, 452]].forEach(([x0, x1]) => ctx.fillRect(x0, H / 2 - 3, x1 - x0, 6)); // dashed centre
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* ---------------------------------- scene ---------------------------------- */

export default function StoryScene({ className, onBeat, onReady }) {
  const mountRef = useRef(null);
  const beatRef = useRef(onBeat);
  const readyRef = useRef(onReady);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    beatRef.current = onBeat;
    readyRef.current = onReady;
  }, [onBeat, onReady]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // quality tiers: weaker devices start lighter, and a frame-time monitor steps down further if needed
    const lowEnd =
      (navigator.hardwareConcurrency || 8) <= 4 ||
      (navigator.deviceMemory || 8) <= 4 ||
      window.matchMedia("(pointer: coarse)").matches;
    const perf = { level: 0, frames: 0, acc: 0 };
    renderer.setPixelRatio(lowEnd ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = lowEnd ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false; // refreshed every other frame in the loop (shadows move slowly)
    renderer.shadowMap.needsUpdate = true;
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const disposables = [];
    const track = (o) => (disposables.push(o), o);
    const M = makePBR(track);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf1edff, 28, 66); // matches the hero wash
    {
      const c = document.createElement("canvas");
      c.width = 4; c.height = 256;
      const ctx = c.getContext("2d");
      const g = ctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, "#F8F6FF");
      g.addColorStop(0.55, "#EFEAFF");
      g.addColorStop(1, "#E8E2FF");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 4, 256);
      const sky = new THREE.CanvasTexture(c);
      sky.colorSpace = THREE.SRGBColorSpace;
      scene.background = track(sky);
    }
    const FOV = 30;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 140);

    /* ---- light: image-based reflections + a shadow-casting key that follows the camera ---- */
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.8;

    scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc8e8, 0.95));
    const key = new THREE.DirectionalLight(0xfff1de, 2.6);
    key.castShadow = true;
    key.shadow.mapSize.set(lowEnd ? 1024 : 2048, lowEnd ? 1024 : 2048);
    Object.assign(key.shadow.camera, { left: -17, right: 17, top: 9, bottom: -9, near: 1, far: 45 });
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.03;
    scene.add(key, key.target);
    const rim = new THREE.DirectionalLight(0x9d7bff, 0.55);
    rim.position.set(10, 5, -9);
    scene.add(rim);

    /* ---- the world ---- */
    const ground = new THREE.Mesh(
      track(new THREE.PlaneGeometry(190, 40)),
      track(new THREE.MeshStandardMaterial({ color: 0xdcd7ee, roughness: 1 }))
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(25, -0.02, -13);
    ground.receiveShadow = true;
    scene.add(ground);
    track(ground.material);

    const ROAD_LEN = 120;
    const roadTex = makeAsphaltTexture();
    roadTex.repeat.set(ROAD_LEN / 7.2, 1);
    const roadAlpha = makeRoadAlpha();
    const roadMat = new THREE.MeshStandardMaterial({ map: roadTex, alphaMap: roadAlpha, transparent: true, depthWrite: false, roughness: 0.92, metalness: 0 });
    const road = new THREE.Mesh(track(new THREE.PlaneGeometry(ROAD_LEN, 5.8)), roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(25, 0.004, 0.2);
    road.renderOrder = 1; // transparent layers on the ground draw in a fixed order: road, shadows, light pools
    scene.add(road);
    track(roadTex);
    track(roadAlpha);
    track(roadMat);

    const shadowCatcher = new THREE.Mesh(track(new THREE.PlaneGeometry(ROAD_LEN, 9)), track(new THREE.ShadowMaterial({ opacity: 0.32, color: 0x2a1a5e, depthWrite: false })));
    shadowCatcher.rotation.x = -Math.PI / 2;
    shadowCatcher.position.set(25, 0.03, 0);
    shadowCatcher.receiveShadow = true;
    shadowCatcher.renderOrder = 2;
    scene.add(shadowCatcher);
    track(shadowCatcher.material);

    // paved sidewalks with kerb stones on both sides of the road (road spans z = -2.7 .. 3.1)
    const paveTex = track(makePavementTexture());
    paveTex.repeat.set(ROAD_LEN / 2, 1);
    const paveMat = track(new THREE.MeshStandardMaterial({ map: paveTex, roughness: 0.9 }));
    [[-3.75, 2.0], [3.95, 1.6]].forEach(([z, d]) => {
      const pave = new THREE.Mesh(track(new THREE.PlaneGeometry(ROAD_LEN, d)), paveMat);
      pave.rotation.x = -Math.PI / 2;
      pave.position.set(25, 0.12, z);
      pave.receiveShadow = true;
      scene.add(pave);
    });
    [-2.78, 3.18].forEach((z) => {
      const kerb = new THREE.Mesh(track(new THREE.BoxGeometry(ROAD_LEN, 0.13, 0.22)), M.concreteDark);
      kerb.position.set(25, 0.065, z);
      kerb.receiveShadow = true;
      scene.add(kerb);
    });

    // a Nigerian roadside: painted blocks with balconies, shop rows under zinc roofs, walled compounds, palms.
    // The hospital stands in the gap left between x = 26 and 53.
    const furniture = new THREE.Group(); // static: merged below into a few draw calls
    furniture.add(buildNigerianStreet(M, track, { from: -36, to: 92, skip: [26, 53] }));
    [[-9, 1.1], [4.5, 1.0], [17, 1.2], [21, 0.9], [58, 1.1], [66, 1.0], [78, 1.2]].forEach(([x, sc]) => {
      const palm = buildPalm(M, track, sc);
      palm.position.set(x, 0, -5.3);
      furniture.add(palm);
    });

    // street furniture: lamps all along the route, trees, and the sign that points the way
    for (let i = 0; i < 12; i++) {
      const lamp = buildStreetlight(M, track);
      lamp.position.set(-16 + i * 10, 0, -3.2);
      lamp.rotation.y = -Math.PI / 2; // arm reaches over the road
      furniture.add(lamp);
    }
    [[12, 1.0], [24, 1.25], [47.5, 1.1], [54, 1.3], [-6, 1.1]].forEach(([x, s]) => {
      const t = buildTree(M, track, s);
      t.position.set(x, 0, -4.6);
      furniture.add(t);
    });
    const roadSign = buildRoadSign(M, track);
    roadSign.position.set(9.5, 0, -3.3);
    furniture.add(roadSign);
    scene.add(mergeStatic(furniture, track));

    // the hospital, far down the road
    const hospital = buildHospital(M, track);
    hospital.position.set(HOSPITAL_X, 0, -6.6);
    scene.add(hospital);

    /* ---- actors ---- */
    const car = buildSedan(M, track);
    scene.add(car.group);
    const truck = buildTruck(M, track);
    scene.add(truck.group);
    const van = buildAmbulanceBus(M, track, makeLamps(track));
    van.group.scale.setScalar(VAN_SCALE);
    scene.add(van.group);

    // siren light on the asphalt under the van
    const glowTex = track(makeGlowTexture());
    const pools = [0xff2234, 0x8540ff].map((color, i) => {
      const m = track(
        new THREE.MeshBasicMaterial({ map: glowTex, color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      const p = new THREE.Mesh(track(new THREE.PlaneGeometry(8, 3.8)), m);
      p.rotation.x = -Math.PI / 2;
      p.position.set(0, 0.04, i === 0 ? 0.6 : -0.6);
      p.renderOrder = 3;
      van.group.add(p);
      return m;
    });

    // paramedics + stretcher, moving as one crew group
    const crew = new THREE.Group();
    const medicA = buildParamedic(M, track);
    const medicB = buildParamedic(M, track);
    medicA.group.position.x = 1.2;
    medicB.group.position.x = -1.2;
    const stretcher = buildStretcher(M, track);
    crew.add(medicA.group, medicB.group, stretcher.group);
    const medics = [medicA, medicB];
    scene.add(crew);
    const patient = stretcher.patient;

    // crash smoke
    const smokeTex = track(makeSmokeTexture());
    const smoke = Array.from({ length: 8 }, () => {
      const m = track(new THREE.SpriteMaterial({ map: smokeTex, transparent: true, opacity: 0, depthWrite: false }));
      const s = new THREE.Sprite(m);
      scene.add(s);
      return s;
    });

    // "call" rings above the wreck
    const rings = Array.from({ length: 3 }, () => {
      const m = track(new THREE.MeshBasicMaterial({ color: 0xf9091d, transparent: true, opacity: 0, depthWrite: false }));
      const r = new THREE.Mesh(track(new THREE.RingGeometry(0.5, 0.6, 48)), m);
      r.position.set(-1.6, 3.4, FAR_LANE);
      scene.add(r);
      return r;
    });

    // everything solid casts and receives soft shadows
    [car.group, truck.group, van.group, crew, hospital].forEach((g) =>
      g.traverse((o) => {
        if (o.isMesh && !o.material.isMeshBasicMaterial) {
          o.castShadow = true;
          o.receiveShadow = true;
        }
      })
    );

    /* ---- story state + timeline ---- */
    const S = { hazard: 0, siren: 0, shake: 0, focus: -2.5, zoom: 1, lookY: LOOK_Y, walk: 0, walkBlend: 0 };
    const vehicles = [
      { group: car.group, wheels: car.wheels, scale: 1, lastX: 0 },
      { group: truck.group, wheels: truck.wheels, scale: 1, lastX: 0 },
      { group: van.group, wheels: van.wheels, scale: VAN_SCALE, lastX: 0 },
    ];
    const hazardMats = [...car.hazards, ...truck.hazards];

    const reset = () => {
      car.group.position.set(-13, 0, FAR_LANE);
      car.group.rotation.set(0, 0, 0);
      car.nose.scale.set(1, 1, 1);
      car.nose.rotation.set(0, 0, 0);
      truck.group.position.set(3.0, 0, FAR_LANE);
      van.group.position.set(-16, 0, NEAR_LANE);
      van.group.rotation.set(0, 0, 0);
      crew.position.set(-7.2, 0, CREW_Z);
      crew.rotation.y = 0;
      crew.visible = false;
      patient.visible = false;
      smoke.forEach((s) => (s.material.opacity = 0));
      rings.forEach((r) => (r.material.opacity = 0));
      Object.assign(S, { hazard: 0, siren: 0, shake: 0, focus: -2.5, zoom: 1, lookY: LOOK_Y, walk: 0, walkBlend: 0 });
      vehicles.forEach((v) => (v.lastX = v.group.position.x));
    };
    reset();

    const beat = (i) => beatRef.current?.(i, BEATS[i]);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, paused: true, defaults: { ease: "none", immediateRender: false } });
    const canvas = renderer.domElement;
    tl.call(reset, null, 0);
    tl.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
    tl.call(beat, [0], 0);

    // 1. the drive
    tl.fromTo(car.group.position, { x: -13 }, { x: -2.3, duration: 3, ease: "power1.in" }, 0);
    // 2. the crash
    tl.call(beat, [1], 3);
    tl.to(car.nose.scale, { x: 0.55, duration: 0.1, ease: "power3.out" }, 3);
    tl.to(car.nose.rotation, { z: 0.05, duration: 0.15, ease: "power3.out" }, 3);
    tl.to(car.group.position, { x: -2.08, duration: 0.12, ease: "power3.out" }, 3);
    tl.to(car.group.position, { x: -2.2, duration: 0.5, ease: "power2.out" }, 3.12);
    tl.to(car.group.rotation, { y: 0.04, z: -0.012, duration: 0.3, ease: "power2.out" }, 3);
    tl.to(truck.group.position, { x: 3.22, duration: 0.25, ease: "power3.out" }, 3);
    tl.fromTo(S, { shake: 1 }, { shake: 0, duration: 0.8, ease: "power2.out" }, 3);
    tl.set(S, { hazard: 1 }, 3.1);
    smoke.forEach((s, i) => {
      const t0 = 3.05 + i * 0.28;
      tl.fromTo(s.position, { x: -0.6 + i * 0.05, y: 1.0, z: FAR_LANE + 0.1 }, { x: -0.4 + i * 0.12, y: 3.1, z: FAR_LANE + 0.1, duration: 2.6, ease: "power1.out" }, t0);
      tl.fromTo(s.scale, { x: 0.5, y: 0.5, z: 1 }, { x: 2.4, y: 2.4, z: 1, duration: 2.6 }, t0);
      tl.fromTo(s.material, { opacity: 0.6 }, { opacity: 0, duration: 2.6, ease: "power1.in" }, t0);
    });
    // 3. the call
    tl.call(beat, [2], 4.2);
    rings.forEach((r, i) => {
      const t0 = 4.2 + i * 0.55;
      tl.fromTo(r.scale, { x: 0.4, y: 0.4, z: 1 }, { x: 3, y: 3, z: 1, duration: 1.4, ease: "power2.out" }, t0);
      tl.fromTo(r.material, { opacity: 0.85 }, { opacity: 0, duration: 1.4, ease: "power1.in" }, t0);
    });
    // 4. help arrives
    tl.fromTo(van.group.position, { x: -16 }, { x: -8.5, duration: 2.4, ease: "power2.out" }, 5.2);
    tl.call(beat, [3], 5.4);
    tl.fromTo(S, { siren: 0 }, { siren: 1, duration: 0.6 }, 5.6);
    tl.fromTo(S, { focus: -2.5 }, { focus: -4.5, duration: 2, ease: "power2.inOut" }, 5.2);
    // 5. the crew crosses to the car, picks the patient up and carries them back
    tl.call(() => {
      crew.visible = true;
      S.walk = 1;
    }, null, 7.6);
    tl.fromTo(crew.position, { x: -7.2 }, { x: -3.0, duration: 2.6, ease: "power1.inOut" }, 7.6);
    tl.call(() => (S.walk = 0), null, 10.2);
    tl.call(beat, [4], 10.2);
    tl.fromTo(crew.rotation, { y: 0 }, { y: Math.PI, duration: 0.5, ease: "power2.inOut" }, 10.6);
    tl.call(() => (patient.visible = true), null, 10.6);
    tl.call(() => (S.walk = 1), null, 11.2);
    tl.to(crew.position, { x: -7.6, duration: 2.6, ease: "power1.inOut" }, 11.2);
    tl.call(() => {
      S.walk = 0;
      crew.visible = false;
    }, null, 13.8);
    // 6. the long drive to the hospital; the camera follows, then pulls back to take in the building
    tl.call(beat, [5], 14);
    tl.fromTo(van.group.position, { x: -8.5 }, { x: BAY_X + 0.4, duration: 7, ease: "power2.inOut" }, 14);
    tl.fromTo(S, { focus: -4.5 }, { focus: HOSPITAL_X - 2.5, duration: 7, ease: "power2.inOut" }, 14);
    tl.fromTo(S, { zoom: 1 }, { zoom: 1.35, duration: 3, ease: "power2.inOut" }, 18);
    tl.fromTo(S, { lookY: LOOK_Y }, { lookY: LOOK_Y + 0.6, duration: 3, ease: "power2.inOut" }, 18);
    // turn into the ambulance bay
    tl.fromTo(van.group.position, { z: NEAR_LANE }, { z: -0.5, duration: 1.8, ease: "power2.inOut" }, 19.2);
    tl.fromTo(van.group.rotation, { y: 0 }, { y: 0.36, duration: 0.9, ease: "power2.inOut" }, 19.2);
    tl.to(van.group.rotation, { y: 0, duration: 0.9, ease: "power2.inOut" }, 20.1);
    tl.to(canvas, { opacity: 0, duration: 0.6 }, 22.6);
    tl.to({}, { duration: 0.01 }, 23.2);

    /* ---- camera framing ---- */
    const viewDir = new THREE.Vector3(0, 0.2, 1).normalize();
    const cam = { baseSpan: 20 };
    const target = new THREE.Vector3(-2.5, LOOK_Y, 0);
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // the frame shows ~9.5 world units top to bottom, so a wide screen takes in ~18 across and a phone ~9
      cam.baseSpan = THREE.MathUtils.clamp(camera.aspect * VIEW_HEIGHT, 9, 30);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(mount);

    const onContextLost = (e) => {
      e.preventDefault();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    /* ---- render loop ---- */
    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let lastT = performance.now();
    let t = 0;
    const pointer = { x: 0, tx: 0 };

    const draw = (dt) => {
      target.x = dt ? THREE.MathUtils.damp(target.x, S.focus, 3.5, dt) : S.focus;
      target.y = S.lookY;
      const span = cam.baseSpan * S.zoom;
      const dist = span / 2 / (Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * camera.aspect);
      const shake = S.shake * 0.12;
      camera.position.copy(viewDir).multiplyScalar(dist).add(target);
      camera.position.x += pointer.x * 0.6 + (Math.random() - 0.5) * shake;
      camera.position.y += (Math.random() - 0.5) * shake;
      camera.lookAt(target);
      // the shadow-casting key travels with the action
      key.position.set(target.x - 7, 13, 10);
      key.target.position.set(target.x, 0, 0);
      key.target.updateMatrixWorld();
      renderer.render(scene, camera);
    };

    let frame = 0;
    let signalled = false;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - lastT < 15) return; // cap at ~60fps on 90/120Hz displays
      const dt = Math.min((now - lastT) / 1000, 0.05);
      const frameMs = now - lastT;
      lastT = now;
      t += dt;

      // adaptive quality: after warm-up, average 45 frames; if slower than ~28ms step down one tier
      if (frame > 30 && perf.level < 2) {
        perf.acc += frameMs;
        if (++perf.frames === 45) {
          if (perf.acc / 45 > 28) {
            perf.level++;
            if (perf.level === 1) renderer.setPixelRatio(1);
            else key.castShadow = false;
          }
          perf.frames = 0;
          perf.acc = 0;
        }
      }
      if (frame++ % 2 === 0) renderer.shadowMap.needsUpdate = true;

      vehicles.forEach((v) => {
        const x = v.group.position.x;
        const dx = x - v.lastX;
        v.lastX = x;
        if (Math.abs(dx) < 4) v.wheels.forEach((w) => (w.obj.rotation.z -= dx / (w.r * v.scale)));
      });

      // walk cycle: an AnimationClip per paramedic, blended in and out with the action weight
      S.walkBlend += (S.walk - S.walkBlend) * Math.min(1, dt * 10);
      medics.forEach((m) => {
        m.action.setEffectiveWeight(S.walkBlend);
        m.mixer.update(dt * S.walkBlend);
      });

      // hazard lights + the van's beacons (and, through siren.js, the hero headline)
      const blink = S.hazard * (Math.sin(t * 9) > 0 ? 1 : 0);
      hazardMats.forEach((m) => (m.emissiveIntensity = blink * 2));
      const pulse = Math.sin(t * 7);
      van.lamps[0].material.emissiveIntensity = 0.6 + S.siren * Math.max(0, pulse) * 2.6;
      van.lamps[1].material.emissiveIntensity = 0.6 + S.siren * Math.max(0, -pulse) * 2.6;
      van.glows[0].intensity = S.siren * Math.max(0, pulse) * 2.4;
      van.glows[1].intensity = S.siren * Math.max(0, -pulse) * 2.4;
      pools[0].opacity = S.siren * (0.06 + Math.max(0, pulse) * 0.55);
      pools[1].opacity = S.siren * (0.06 + Math.max(0, -pulse) * 0.55);
      siren.pulse = pulse * S.siren;

      pointer.x += (pointer.tx - pointer.x) * 0.06;
      draw(dt);
      if (!signalled) {
        signalled = true;
        readyRef.current?.(); // first frame is on screen: the hero can drop its placeholder
      }
    };

    const startLoop = () => {
      if (!raf && visible && pageVisible && !reduceMotion) {
        siren.live = true;
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
        tl.resume();
      }
    };
    const stopLoop = () => {
      siren.live = false;
      cancelAnimationFrame(raf);
      raf = 0;
      tl.pause();
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

    const onPointerMove = (e) => {
      const r = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    };
    const onPointerLeave = () => (pointer.tx = 0);

    if (reduceMotion) {
      // one still frame: the crew reaching the patient
      tl.time(10.2, true);
      crew.visible = true;
      S.siren = 1;
      S.walk = 0;
      canvas.style.opacity = 1;
      beat(4);
      draw(0);
      readyRef.current?.();
    } else {
      mount.addEventListener("pointermove", onPointerMove);
      mount.addEventListener("pointerleave", onPointerLeave);
      startLoop();
    }

    return () => {
      stopLoop();
      tl.kill();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      medics.forEach((m) => m.mixer.stopAllAction());
      disposables.forEach((d) => d.dispose?.());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  if (failed) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <img src={poster} alt="An 8medical ambulance" className="w-full max-w-[560px] object-contain" />
      </div>
    );
  }

  return <div ref={mountRef} className={cn("h-full w-full", className)} aria-hidden="true" />;
}
