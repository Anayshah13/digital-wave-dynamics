import React, { useEffect, useRef } from 'react';
import { EffectComposer, RenderPass, EffectPass, BloomEffect } from 'postprocessing';
import * as THREE from 'three';

type GridScanProps = {
    lineThickness?: number;
    linesColor?: string;
    gridScale?: number;
    scanColor?: string;
    scanOpacity?: number;
    // Removed jitter, noise, etc.
    bloomIntensity?: number;
    bloomThreshold?: number;
    bloomSmoothing?: number;
    scanDuration?: number;
    // Control for infinite scan
    enableContinuousScan?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
// Removed skew/tilt/yaw/jitter/noise uniforms for stability
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
uniform float uBloomOpacity;
uniform float uScanDuration;
uniform float uScanDelay;

varying vec2 vUv;

uniform float uScanStarts[8];
uniform float uScanCount;

const int MAX_SCANS = 8;

float smoother01(float a, float b, float x){
  float t = clamp((x - a) / max(1e-5, (b - a)), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    
    // Perfectly straight ray direction
    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));

    // No rotation/skew/jitter
    vec3 color = vec3(0.0);
    float minT = 1e20;
    float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 1.5; // Slightly reduced fade for visibility
    vec2 gridUV = vec2(0.0);

    float hitIsY = 1.0;
    // Standard floor/ceiling/wall intersection
    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        // Box tunnel: Floor, Ceiling, Left Wall, Right Wall
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float num = pos - (isY * ro.y + (1.0 - isY) * ro.x);
        float den = isY * rd.y + (1.0 - isY) * rd.x;
        float t = num / den;
        vec3 h = ro + rd * t;

        // Simple straight geometry - no depthBoost distortion
        bool use = t > 0.0 && t < minT;
        gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
        minT = use ? t : minT;
        hitIsY = use ? isY : hitIsY;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);

    // Grid Line Calculation
    float fx = fract(gridUV.x);
    float fy = fract(gridUV.y);
    float ax = min(fx, 1.0 - fx);
    float ay = min(fy, 1.0 - fy);
    
    // Pixel-perfect line width
    float wx = fwidth(gridUV.x);
    float wy = fwidth(gridUV.y);
    float halfPx = max(0.0, uLineThickness) * 0.5;
    float tx = halfPx * wx;
    float ty = halfPx * wy;
    float aax = wx;
    float aay = wy;

    float lineX = 1.0 - smoothstep(tx, tx + aax, ax);
    float lineY = 1.0 - smoothstep(ty, ty + aay, ay);
    
    // Solid lines only (removed dashed/dotted logic)
    float lineMask = max(lineX, lineY);
    
    // Fade into distance
    float fade = exp(-dist * fadeStrength);

    // Scan Pulse Calculation
    float dur = max(0.05, uScanDuration);
    float scanZMax = 2.0;

    float combinedPulse = 0.0;
    
    // We only use the "ScanStarts" array for multiple infinite scans
    for (int i = 0; i < MAX_SCANS; i++) {
      if (float(i) >= uScanCount) break;
      float tActiveI = iTime - uScanStarts[i];
      // Linear scan phase: 0 to 1
      float phaseI = tActiveI / dur;
      
      if (phaseI >= 0.0 && phaseI <= 1.0) {
          // One-way scan: Forward
          float scanZI = phaseI * scanZMax;
          float dzI = abs(hit.z - scanZI);
          
          // Gaussian pulse shape
          float sigma = 0.2; // Fixed softness
          float lineBandI = exp(-0.5 * (dzI * dzI) / (sigma * sigma));
          
          // Taper at ends
          float headFadeI = smoother01(0.0, 0.1, phaseI);
          float tailFadeI = 1.0 - smoother01(0.9, 1.0, phaseI);
          float phaseWindowI = headFadeI * tailFadeI;
          
          combinedPulse += lineBandI * phaseWindowI;
      }
    }
    
    combinedPulse = clamp(combinedPulse, 0.0, 1.0);
    
    // Logic: Grid lines appear ONLY where the scan pulse acts
    // We multiply the grid line mask by the pulse intensity
    float visibleGrid = lineMask * combinedPulse;

    // Color Composition
    // The "Scan" itself (glow) + The "Grid" revealed by it
    vec3 finalScanGlow = uScanColor * combinedPulse * uScanOpacity;
    vec3 finalGridLines = uLinesColor * visibleGrid * fade; 
    
    color = finalGridLines + finalScanGlow;

    // Output
    float alpha = clamp(combinedPulse * (length(finalGridLines) + length(finalScanGlow)), 0.0, 1.0);
    // Add Bloom contribution to alpha
    alpha = max(alpha, length(color) * uBloomOpacity);
    
    fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

export const GridScan: React.FC<GridScanProps> = ({
    lineThickness = 1,
    linesColor = '#392e4e',
    scanColor = '#FF9FFC',
    scanOpacity = 0.2,
    gridScale = 0.15,
    bloomIntensity = 0.5,
    bloomThreshold = 0.1,
    bloomSmoothing = 0.1,
    scanDuration = 5.0,
    enableContinuousScan = true,
    className,
    style
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);
    const rafRef = useRef<number | null>(null);
    const scanStartsRef = useRef<number[]>([]);
    const MAX_SCANS = 4;

    const pushScan = (t: number) => {
        const arr = scanStartsRef.current.slice();
        // Keep list clean
        const now = t;
        // Remove old scans
        const activeArr = arr.filter(originalT => (now - originalT) < scanDuration);

        activeArr.push(now);

        if (activeArr.length > MAX_SCANS) activeArr.shift();

        scanStartsRef.current = activeArr;

        if (materialRef.current) {
            const u = materialRef.current.uniforms;
            const buf = new Array(MAX_SCANS).fill(0);
            for (let i = 0; i < activeArr.length && i < MAX_SCANS; i++) buf[i] = activeArr[i];
            u.uScanStarts.value = buf;
            u.uScanCount.value = activeArr.length;
        }
    };

    useEffect(() => {
        if (enableContinuousScan) {
            // Push first scan immediately
            pushScan(performance.now() / 1000);

            const interval = setInterval(() => {
                pushScan(performance.now() / 1000);
            }, scanDuration * 1000 * 0.85); // Overlap slightly: new scan at 80% completion of prev

            return () => clearInterval(interval);
        }
    }, [enableContinuousScan, scanDuration]);

    // Setup Three.js
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, 1) },
                iTime: { value: 0 },
                uLineThickness: { value: lineThickness },
                uLinesColor: { value: new THREE.Color(linesColor) },
                uScanColor: { value: new THREE.Color(scanColor) },
                uGridScale: { value: gridScale },
                uScanOpacity: { value: scanOpacity },
                uBloomOpacity: { value: bloomIntensity },
                uScanDuration: { value: scanDuration },
                uScanStarts: { value: new Array(MAX_SCANS).fill(0) },
                uScanCount: { value: 0 }
            },
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            depthWrite: false,
            depthTest: false
        });
        materialRef.current = material;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
        scene.add(quad);

        let composer: EffectComposer | null = null;
        // Always enable bloom for the glow effect
        composer = new EffectComposer(renderer);
        composerRef.current = composer;
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const bloom = new BloomEffect({
            intensity: 1.0,
            luminanceThreshold: bloomThreshold,
            luminanceSmoothing: bloomSmoothing
        });
        bloom.blendMode.opacity.value = bloomIntensity;

        // No chromatic aberration
        const effectPass = new EffectPass(camera, bloom);
        effectPass.renderToScreen = true;
        composer.addPass(effectPass);

        const onResize = () => {
            if (!container) return;
            renderer.setSize(container.clientWidth, container.clientHeight);
            material.uniforms.iResolution.value.set(container.clientWidth, container.clientHeight, 1);
            composer?.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', onResize);

        const tick = () => {
            const now = performance.now() / 1000;
            material.uniforms.iTime.value = now;
            composer?.render();
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            material.dispose();
            (quad.geometry as THREE.BufferGeometry).dispose();
            composer?.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [
        linesColor, scanColor, gridScale, scanOpacity,
        bloomIntensity, bloomThreshold, bloomSmoothing, scanDuration
    ]);

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className ?? ''}`} style={style} />
    );
};
