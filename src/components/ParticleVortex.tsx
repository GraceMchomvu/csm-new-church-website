import { useRef, useEffect, useMemo, useCallback } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = window.innerWidth < 768 ? 6000 : 12000;

const COLORS = [
  0x0d9488, 0xd97706, 0x14b8a6, 0xe11d48, 0x059669, 0xf59e0b
];

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uRadius;
uniform float uCrossIntensity;
uniform float uExplosion;

attribute vec3 aPosition;
attribute vec3 aColor;
attribute float aScale;

varying vec3 vColor;
varying float vDist;

vec3 rotate(vec3 v, float a) {
  float s = sin(a);
  float c = cos(a);
  return vec3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c);
}

float crossDistance(vec3 p) {
  vec2 d = abs(p.xz);
  if (d.y > d.x) {
    d = d.yx;
  }
  vec2 f = vec2(uRadius);
  vec2 q = d - f;
  if (q.x < 0.0) {
    return length(q);
  }
  return q.x;
}

void main() {
  vec3 pos = aPosition;
  float t = uTime * 0.15;
  float angle = atan(pos.z, pos.x) + t;

  float mEffect = smoothstep(0.8, 0.0, length(uMouse));
  float mouseAngle = atan(uMouse.y, uMouse.x) * mEffect * 0.3;
  angle += mouseAngle;

  float r = length(pos.xz);
  float distToCross = crossDistance(pos);
  r += (smoothstep(1.0, 0.0, distToCross) * uCrossIntensity) * (sin(t * 5.0 + angle * 3.0) * 0.5);

  pos = rotate(pos, t + angle);
  r = clamp(r, 0.0, 20.0);
  pos.xz = vec2(cos(angle), sin(angle)) * r;

  float yOffset = sin(uTime + pos.x) * 0.1;
  pos.y += yOffset;

  float exp = uExplosion * 15.0;
  pos += vec3(cos(angle), sin(pos.x), sin(angle)) * exp;

  float s = aScale + (sin(uTime + aScale * 1000.0) * 0.1);
  s *= smoothstep(0.0, 0.2, uExplosion) * smoothstep(1.0, 0.8, uExplosion);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;
  float pSize = (20.0 / -mv.z) * s;
  gl_PointSize = max(pSize, 1.0);
  vColor = aColor;
  vDist = length(pos);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vDist;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float l = length(c);
  float f = smoothstep(0.5, 0.0, l);
  float alpha = f * smoothstep(20.0, 0.0, vDist);
  gl_FragColor = vec4(vColor, alpha);
}
`;

export default function ParticleVortex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const explosionRef = useRef({ value: 0 });
  const isVisibleRef = useRef(true);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  const { scene, camera, points, material } = useMemo(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 30;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 10;
      const height = (Math.random() - 0.5) * 50;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = height;
      positions[i3 + 2] = Math.sin(angle) * radius;

      const color = new THREE.Color(COLORS[i % COLORS.length]);
      const brightness = 0.8 + Math.random() * 0.4;
      colors[i3] = color.r * brightness;
      colors[i3 + 1] = color.g * brightness;
      colors[i3 + 2] = color.b * brightness;

      scales[i] = 0.01 + Math.random() * 0.03;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PARTICLE_COUNT * 3), 3));
    geometry.setAttribute('aPosition', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uRadius: { value: 2.5 },
        uCrossIntensity: { value: 1.0 },
        uExplosion: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    geometryRef.current = geometry;
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    return { scene, camera, points, material };
  }, []);

  const triggerExplosion = useCallback(() => {
    const start = performance.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 0.8) {
        const easeOut = 1 - Math.pow(1 - progress / 0.8, 3);
        explosionRef.current.value = easeOut;
      } else {
        const easeIn = 1 - Math.pow((progress - 0.8) / 0.2, 3);
        explosionRef.current.value = easeIn;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        explosionRef.current.value = 0;
      }
    };
    animate();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const clock = new THREE.Clock();

    const onPointerMove = (e: PointerEvent) => {
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = -(e.clientY / window.innerHeight) * 2 + 1;
      const len = Math.sqrt(x * x + y * y);
      if (len > 1) {
        x /= len;
        y /= len;
      }
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const onClick = () => triggerExplosion();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    if (container) observer.observe(container);

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.uExplosion.value = explosionRef.current.value;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      renderer.dispose();
      geometryRef.current?.dispose();
      material.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scene, camera, points, material, triggerExplosion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 cursor-pointer"
      style={{ touchAction: 'none' }}
    />
  );
}
