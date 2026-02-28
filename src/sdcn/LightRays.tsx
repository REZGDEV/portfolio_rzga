import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";
import "./LightRays.css";

const DEFAULT_COLOR = "#ffffff";

/* ================= TYPES ================= */

interface LightRaysProps {
  raysOrigin?: string;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

type Vec2 = [number, number];
type Vec3 = [number, number, number];

interface Uniform<T> {
  value: T;
}

interface Uniforms {
  iTime: Uniform<number>;
  iResolution: Uniform<Vec2>;
  rayPos: Uniform<Vec2>;
  rayDir: Uniform<Vec2>;
  raysColor: Uniform<Vec3>;
  raysSpeed: Uniform<number>;
  lightSpread: Uniform<number>;
  rayLength: Uniform<number>;
  pulsating: Uniform<number>;
  fadeDistance: Uniform<number>;
  saturation: Uniform<number>;
  mousePos: Uniform<Vec2>;
  mouseInfluence: Uniform<number>;
  noiseAmount: Uniform<number>;
  distortion: Uniform<number>;
}

/* ================= HELPERS ================= */

const hexToRgb = (hex: string): Vec3 => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (origin: string, w: number, h: number): { anchor: Vec2; dir: Vec2 } => {
  const outside = 0.2;

  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

/* ================= COMPONENT ================= */

const LightRays = ({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  className = "",
}: LightRaysProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const uniformsRef = useRef<Uniforms | null>(null);
  const animationRef = useRef<number | null>(null);

  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });

  const [isVisible, setIsVisible] = useState(false);

  /* ===== Intersection Observer ===== */

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver((entries) => setIsVisible(entries[0].isIntersecting), { threshold: 0.1 });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  /* ===== WebGL ===== */

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });

    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(gl.canvas);

    const uniforms: Uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0, 0] },
      rayDir: { value: [0, 1] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      rayLength: { value: rayLength },
      pulsating: { value: pulsating ? 1 : 0 },
      fadeDistance: { value: fadeDistance },
      saturation: { value: saturation },
      mousePos: { value: [0.5, 0.5] },
      mouseInfluence: { value: mouseInfluence },
      noiseAmount: { value: noiseAmount },
      distortion: { value: distortion },
    };

    uniformsRef.current = uniforms;

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`,
      fragment: `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);

  float pulse = pulsating > 0.5
    ? (0.8 + 0.2 * sin(iTime * raysSpeed * 3.0))
    : 1.0;

  return spreadFactor * lengthFalloff * pulse;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);

  vec2 finalRayDir = rayDir;

  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  float strength = rayStrength(rayPos, finalRayDir, coord);

  vec3 color = raysColor * strength;

  float brightness = 1.0 - (coord.y / iResolution.y);
  color *= brightness;

  gl_FragColor = vec4(color, strength);
}`,
      uniforms,
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!containerRef.current || !uniformsRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();

      renderer.setSize(width, height);

      const dpr = renderer.dpr;
      const w = width * dpr;
      const h = height * dpr;

      uniformsRef.current.iResolution.value = [w, h];

      const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);

      uniformsRef.current.rayPos.value = anchor;
      uniformsRef.current.rayDir.value = dir;
    };

    resize();
    window.addEventListener("resize", resize);

    const loop = (t: number) => {
      if (!uniformsRef.current) return;

      uniformsRef.current.iTime.value = t * 0.001;

      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.1;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.1;

      uniformsRef.current.mousePos.value = [smoothMouseRef.current.x, smoothMouseRef.current.y];

      renderer.render({ scene: mesh });
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  /* ===== Mouse ===== */

  useEffect(() => {
    if (!followMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse]);

  return <div ref={containerRef} className={`light-rays-container ${className}`.trim()} />;
};

export default LightRays;
