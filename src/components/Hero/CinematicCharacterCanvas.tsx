import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinematicCharacterCanvasProps {
  scrollProgress?: number;
}

export const CinematicCharacterCanvas: React.FC<CinematicCharacterCanvasProps> = ({ scrollProgress = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera & Renderer setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030308, 0.035);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Cinematic Studio Lights)
    const ambientLight = new THREE.AmbientLight(0x0a0d1a, 1.2);
    scene.add(ambientLight);

    // Key Light (Soft Volumetric Top Light)
    const keyLight = new THREE.DirectionalLight(0xf3f4f6, 1.8);
    keyLight.position.set(2, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Screen Light (Cyan Glow illuminating the character from front)
    const screenLight = new THREE.PointLight(0x00f0ff, 3.5, 8);
    screenLight.position.set(-0.8, 1.2, 1.8);
    scene.add(screenLight);

    // Rim Light (Electric Violet Backlight)
    const rimLight = new THREE.PointLight(0x8b5cf6, 4.0, 10);
    rimLight.position.set(2.5, 2.5, -2);
    scene.add(rimLight);

    // Subtle Fill Light (Warm Magenta)
    const fillLight = new THREE.PointLight(0xec4899, 1.2, 6);
    fillLight.position.set(-2, 0.5, 1);
    scene.add(fillLight);

    // 3. Realistic Futuristic Developer Character (Modular Group)
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, -0.6, 0);

    // Torso / Hoodie (Dark Metallic Charcoal)
    const hoodieGeo = new THREE.CylinderGeometry(0.55, 0.45, 1.3, 32);
    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x0f1423,
      roughness: 0.7,
      metalness: 0.2,
    });
    const torso = new THREE.Mesh(hoodieGeo, hoodieMat);
    torso.position.y = 0.65;
    torso.castShadow = true;
    torso.receiveShadow = true;
    characterGroup.add(torso);

    // Hoodie Collar / Jacket detail
    const collarGeo = new THREE.TorusGeometry(0.32, 0.08, 16, 32);
    const collarMat = new THREE.MeshStandardMaterial({ color: 0x1a2035, roughness: 0.5 });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.y = 1.25;
    characterGroup.add(collar);

    // Shoulders & Upper Arms
    const leftArmGeo = new THREE.CapsuleGeometry(0.14, 0.7, 8, 16);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0f1423, roughness: 0.7 });
    const leftArm = new THREE.Mesh(leftArmGeo, armMat);
    leftArm.position.set(-0.65, 0.6, 0);
    leftArm.rotation.z = 0.2;
    characterGroup.add(leftArm);

    const rightArm = new THREE.Mesh(leftArmGeo, armMat);
    rightArm.position.set(0.65, 0.6, 0);
    rightArm.rotation.z = -0.2;
    characterGroup.add(rightArm);

    // Head Group (Rotates dynamically with cursor)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.5, 0);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.3, 16);
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x1f2638, roughness: 0.6 });
    const neck = new THREE.Mesh(neckGeo, neckMat);
    neck.position.y = -0.15;
    headGroup.add(neck);

    // Head Base (Realistic skin tone / dark stylized finish)
    const headGeo = new THREE.SphereGeometry(0.28, 32, 32);
    headGeo.scale(1, 1.15, 1);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x2a324b,
      roughness: 0.4,
      metalness: 0.1,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.castShadow = true;
    headGroup.add(head);

    // Stylized Futuristic Developer Hair
    const hairGeo = new THREE.SphereGeometry(0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x07090e, roughness: 0.9 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 0.05, -0.02);
    headGroup.add(hair);

    // Cyberpunk/Futuristic Visor/Glasses (reflecting cyan monitor light)
    const visorGeo = new THREE.BoxGeometry(0.44, 0.12, 0.22);
    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transmission: 0.6,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.03, 0.18);
    headGroup.add(visor);

    // Eyes / Glowing subtle pupil nodes
    const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.11, 0.03, 0.25);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.11, 0.03, 0.25);
    headGroup.add(rightEye);

    characterGroup.add(headGroup);

    // Holographic Floating HUD Monitor nearby
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(-1.4, 1.1, 0.8);
    monitorGroup.rotation.y = 0.35;

    const screenFrameGeo = new THREE.PlaneGeometry(1.6, 0.9);
    const screenFrameMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const screenFrame = new THREE.Mesh(screenFrameGeo, screenFrameMat);
    monitorGroup.add(screenFrame);

    const screenGlowGeo = new THREE.PlaneGeometry(1.58, 0.88);
    const screenGlowMat = new THREE.MeshBasicMaterial({
      color: 0x071126,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const screenGlow = new THREE.Mesh(screenGlowGeo, screenGlowMat);
    screenGlow.position.z = -0.01;
    monitorGroup.add(screenGlow);

    characterGroup.add(monitorGroup);
    scene.add(characterGroup);

    // 4. Floating Atmospheric Particles & Studio Environment Grid
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8 + 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      particleScales[i] = Math.random() * 0.04 + 0.01;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Floor Studio Reflections
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x030308,
      roughness: 0.4,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    floor.receiveShadow = true;
    scene.add(floor);

    // 5. Mouse tracking event listener
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Responsive resize listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Rotate character head and torso smoothly towards cursor
      headGroup.rotation.y = mouse.x * 0.45;
      headGroup.rotation.x = -mouse.y * 0.25;

      torso.rotation.y = mouse.x * 0.15;

      // Subtle breathing & floating animation
      characterGroup.position.y = -0.6 + Math.sin(elapsedTime * 1.5) * 0.03;
      monitorGroup.position.y = 1.1 + Math.cos(elapsedTime * 2.0) * 0.04;

      // Light pulsing
      screenLight.intensity = 3.0 + Math.sin(elapsedTime * 3.0) * 0.5;

      // Particle subtle rotation
      particleSystem.rotation.y = elapsedTime * 0.03;

      // Camera position adjustment based on scrollProgress
      camera.position.z = 5.5 - scrollProgress * 1.2;
      camera.position.y = 1.2 - scrollProgress * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
      data-cursor="✦ LOOK"
    />
  );
};
