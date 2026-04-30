import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.4, 7.2);

    const group = new THREE.Group();
    scene.add(group);

    const panelMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c2430'),
      metalness: 0.45,
      roughness: 0.36,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d6b24a'),
      metalness: 0.7,
      roughness: 0.28,
      emissive: new THREE.Color('#3b2b05'),
      emissiveIntensity: 0.22,
    });

    const blueMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#6aa6b8'),
      metalness: 0.35,
      roughness: 0.32,
      emissive: new THREE.Color('#071f2a'),
      emissiveIntensity: 0.18,
    });

    const panelGeometry = new THREE.BoxGeometry(2.25, 1.18, 0.08);
    const positions = [
      [-2.2, 0.5, 0.15],
      [0, 0.9, -0.15],
      [2.25, 0.35, 0.08],
      [-1.1, -1.0, -0.1],
      [1.2, -0.9, 0.12],
    ];

    positions.forEach((position, index) => {
      const mesh = new THREE.Mesh(panelGeometry, panelMaterial.clone());
      mesh.position.set(position[0], position[1], position[2]);
      mesh.rotation.set(-0.16 + index * 0.025, -0.28 + index * 0.14, 0.08 - index * 0.035);
      group.add(mesh);

      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(panelGeometry),
        new THREE.LineBasicMaterial({ color: index % 2 ? '#d6b24a' : '#6aa6b8', transparent: true, opacity: 0.42 }),
      );
      edge.position.copy(mesh.position);
      edge.rotation.copy(mesh.rotation);
      group.add(edge);
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.85, 0.018, 12, 120),
      goldMaterial,
    );
    ring.rotation.set(Math.PI / 2.6, 0.15, -0.25);
    ring.position.set(0.08, -0.05, -0.3);
    group.add(ring);

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.46, 1), blueMaterial);
    core.position.set(0.1, -0.02, 0.35);
    group.add(core);

    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.018, 8, 8);
    for (let i = 0; i < 72; i++) {
      const material = i % 3 === 0 ? goldMaterial : blueMaterial;
      const particle = new THREE.Mesh(particleGeometry, material);
      const radius = 2.3 + Math.random() * 2.8;
      const angle = Math.random() * Math.PI * 2;
      particle.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 2.6, Math.sin(angle) * radius - 1.3);
      particles.add(particle);
    }
    scene.add(particles);

    scene.add(new THREE.AmbientLight('#d9e5ee', 0.72));
    const keyLight = new THREE.DirectionalLight('#fff2c7', 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight('#69c4dc', 2.2, 9);
    rimLight.position.set(-3.4, 0.8, 2.6);
    scene.add(rimLight);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let raf = 0;

    const render = () => {
      frame += 0.008;
      if (!prefersReducedMotion) {
        group.rotation.y = Math.sin(frame) * 0.09;
        group.rotation.x = Math.cos(frame * 0.7) * 0.045;
        ring.rotation.z += 0.004;
        core.rotation.x += 0.006;
        core.rotation.y += 0.008;
        particles.rotation.y -= 0.0018;
      }
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', resize);
    render();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      panelGeometry.dispose();
      particleGeometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
}

