import React, { useRef, useEffect, useState } from 'react';

interface BinaryLogoProps {
  onLogoFormed?: () => void;
}

const BinaryLogo: React.FC<BinaryLogoProps> = ({ onLogoFormed }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isLogoFormed, setIsLogoFormed] = useState(false);
  const logoFormedRef = useRef(false);

  // Use a ref for the callback so it doesn't trigger re-renders of the effect
  const onLogoFormedRef = useRef(onLogoFormed);

  useEffect(() => {
    onLogoFormedRef.current = onLogoFormed;
  }, [onLogoFormed]);


  // Configuration
  const PRIMARY_PARTICLE_COUNT = 2000;
  const SECONDARY_PARTICLE_COUNT = 2400;

  const PRIMARY_BASE_COLOR = '#039eb2ff'; // Blue-leaning Teal
  const SECONDARY_BASE_COLOR = '#057382ff'; // Deep Azure-Teal

  const HOVER_COLOR = '#ffffff';
  const TRANSITION_DELAY = 400;
  const GRAVITY = 0.28;
  const BASE_FONT_SIZE = 10;
  const HOVER_RADIUS = 60;

  const LOGO_PATHS_1 = [
    "M435 4635 c-11 -2 -55 -7 -98 -10 -59 -5 -75 -10 -70 -20 5 -7 86 -94 181 -192 l174 -180 141 0 c244 1 418 -55 537 -173 157 -155 192 -348 97 -538 -61 -121 -122 -187 -227 -244 -112 -62 -155 -71 -349 -73 l-173 -2 -186 -187 c-102 -102 -183 -189 -180 -192 12 -11 193 -24 358 -24 170 0 384 19 465 41 148 39 284 97 365 153 233 162 343 373 357 686 7 166 -9 267 -63 401 -77 193 -215 330 -427 426 -141 63 -183 75 -392 109 -83 14 -463 28 -510 19z",
    "M2277 4630 c-229 -3 -357 -9 -356 -15 1 -5 76 -92 168 -192 l166 -181 355 -4 355 -3 5 -497 5 -497 120 -128 c66 -70 152 -162 192 -203 l73 -75 0 903 0 902 -362 -2 c-200 -2 -524 -5 -721 -8z",
    "M5476 4594 c-44 -19 -96 -48 -115 -63 -20 -15 -43 -32 -52 -37 -77 -44 -186 -175 -221 -268 -25 -65 -34 -216 -19 -316 22 -147 112 -280 231 -345 l55 -30 460 -3 c506 -4 515 -5 573 -65 31 -33 35 -45 33 -111 -1 -32 -9 -47 -48 -86 l-48 -47 -304 -7 c-167 -3 -428 -6 -580 -6 -317 0 -591 -10 -591 -21 0 -4 30 -38 68 -76 37 -38 120 -124 184 -191 l116 -122 555 0 c399 0 570 3 608 12 83 19 228 112 296 190 130 147 160 326 89 534 -58 172 -143 267 -281 314 -43 15 -112 19 -495 25 -501 8 -494 7 -530 79 -25 53 -26 112 0 153 36 60 31 60 545 67 259 3 543 9 633 13 l163 6 122 125 c67 68 161 164 209 212 48 49 84 91 81 94 -4 3 -378 6 -832 6 l-826 -1 -79 -35z",
    "M4675 4610 c-532 -8 -578 -14 -749 -105 -266 -141 -419 -396 -476 -794 -7 -47 -5 -84 6 -141 59 -312 235 -536 539 -685 174 -85 164 -84 624 -77 239 3 401 9 401 14 0 6 -83 92 -185 192 l-184 183 -163 6 c-183 6 -229 16 -351 75 -65 32 -97 55 -141 104 -69 75 -89 111 -117 214 -17 62 -20 96 -17 173 8 168 59 256 204 351 135 89 389 138 660 127 l143 -5 176 180 c96 98 175 183 175 189 0 5 -24 8 -52 7 -29 -1 -251 -5 -493 -8z",
    "M177 4554 c-12 -12 -8 -1652 3 -1659 6 -3 39 22 74 57 34 35 115 113 180 175 l116 112 0 479 0 479 -119 119 c-208 209 -247 245 -254 238z",
    "M7324 4507 c-30 -32 -154 -146 -296 -273 l-77 -69 -3 -532 c-1 -293 -3 -595 -3 -670 l0 -138 180 3 c99 1 186 4 193 7 9 3 12 38 12 127 0 68 4 263 10 433 5 171 15 486 21 700 6 215 12 401 13 414 2 35 -15 34 -50 -2z",
    "M1895 3622 c27 -183 125 -419 214 -512 9 -9 30 -32 47 -51 58 -62 151 -129 237 -169 158 -73 174 -75 437 -73 253 2 400 10 400 22 0 4 -75 85 -167 180 l-168 171 -61 0 c-241 -1 -425 128 -527 370 -30 72 -40 86 -64 91 -15 4 -102 10 -192 13 l-163 6 7 -48z"
  ];

  const LOGO_PATHS_2 = [
    "M6983 6113 c-76 -70 -195 -180 -264 -245 l-127 -118 -274 0 c-299 0 -395 -8 -537 -45 -205 -55 -355 -165 -448 -332 -47 -84 -65 -154 -71 -274 -8 -177 35 -310 143 -448 43 -54 140 -141 159 -141 4 0 -6 19 -23 43 -43 63 -87 154 -107 222 -25 84 -25 268 0 350 67 225 227 375 481 451 88 26 100 27 438 34 l349 7 69 74 c38 41 84 101 102 134 39 74 165 206 246 260 40 27 61 47 61 60 0 18 -44 95 -55 95 -2 0 -66 -57 -142 -127z",
    "M4567 5763 c-4 -256 -7 -780 -7 -1163 0 -651 1 -698 18 -712 24 -22 198 -108 217 -108 14 0 15 44 15 387 -1 329 -4 391 -17 417 -8 16 -26 61 -39 100 -80 234 -75 534 11 758 41 104 39 98 20 98 -10 0 -15 10 -15 31 0 16 -5 50 -11 74 -10 38 -9 46 10 72 32 43 37 93 14 138 -16 31 -18 44 -9 75 9 35 6 45 -23 102 -18 35 -48 79 -66 99 -18 20 -36 43 -41 51 -9 15 -54 48 -65 48 -3 0 -9 -210 -12 -467z",
    "M9835 6172 c-28 -26 -149 -139 -269 -252 l-219 -205 -896 -5 c-962 -6 -927 -4 -999 -58 -51 -37 -72 -79 -72 -140 0 -72 29 -125 87 -162 53 -34 99 -43 198 -38 l70 3 -32 18 c-18 9 -47 17 -66 17 -26 0 -38 7 -56 31 -12 16 -33 35 -47 41 -34 16 -30 41 12 88 58 64 95 71 424 81 157 4 538 7 847 6 l562 -2 35 34 c19 18 37 43 40 55 3 11 105 109 226 216 l220 195 -1 45 c-1 81 -8 85 -64 32z",
    "M435 6024 c45 -41 289 -251 320 -274 47 -37 -15 32 -120 131 -103 98 -156 139 -215 168 -18 9 -14 2 -15 -25z",
    "M2290 5794 c8 -12 38 -52 66 -89 123 -163 183 -342 191 -572 24 -673 -328 -1108 -992 -1223 -120 -21 -168 -23 -615 -27 -280 -3 -478 -8 -469 -13 9 -5 63 -22 121 -39 142 -40 396 -56 747 -48 363 8 497 27 696 97 275 98 485 272 601 501 32 63 65 161 66 194 0 6 -11 53 -25 105 -13 52 -27 128 -31 168 l-6 72 66 0 67 0 -6 93 c-10 135 -40 247 -102 372 -81 166 -192 292 -355 405 -31 22 -33 23 -20 4z",
    "M918 5747 c7 -8 43 -35 79 -59 l67 -43 179 -7 c186 -7 357 -28 441 -53 27 -8 51 -13 53 -11 3 2 -15 16 -39 30 -159 93 -362 141 -638 153 -141 6 -154 5 -142 -10z",
    "M3105 5735 c17 -13 54 -41 84 -62 l55 -38 355 -3 c196 -2 375 0 399 3 l42 6 0 60 0 59 -482 0 -483 0 30 -25z",
    "M811 5041 c-3 -598 -5 -668 -20 -685 -12 -14 -237 -199 -433 -357 -22 -17 -17 -25 38 -51 l30 -15 249 204 249 203 62 0 c47 0 63 4 68 16 3 9 6 275 6 593 0 446 -3 581 -12 594 -12 15 -179 136 -216 156 -16 8 -17 -29 -21 -658z",
    "M7100 4906 c0 -2 25 -23 56 -46 74 -56 205 -116 279 -128 33 -6 294 -13 580 -17 467 -5 600 -12 684 -32 l26 -6 -30 33 c-40 43 -88 66 -165 80 -38 7 -279 14 -619 19 l-556 8 -88 27 c-49 14 -106 35 -128 46 -21 11 -39 19 -39 16z",
    "M3170 4874 c0 -65 62 -217 117 -285 48 -61 144 -139 209 -170 84 -39 94 -37 47 14 -52 57 -97 137 -123 222 -33 110 -34 110 -127 166 -110 67 -123 73 -123 53z",
    "M9327 4539 c-9 -121 -28 -193 -77 -297 -65 -136 -195 -255 -346 -316 -137 -56 -142 -56 -1054 -56 l-841 0 22 -31 c12 -17 36 -40 53 -50 30 -18 64 -19 866 -19 780 0 841 2 927 19 372 77 581 433 470 800 l-14 45 -6 -95z",
    "M4315 3978 c22 -18 53 -45 70 -59 l29 -27 -105 -7 c-144 -10 -702 1 -763 14 -27 6 -51 10 -52 8 -7 -6 232 -89 295 -102 36 -7 120 -19 186 -25 144 -14 650 -19 662 -6 4 4 0 13 -11 20 -10 6 -66 45 -123 86 -153 110 -185 130 -207 130 -17 0 -13 -6 19 -32z",
    "M5540 3941 c29 -21 225 -94 316 -117 146 -37 331 -52 715 -59 278 -5 358 -4 364 6 5 7 -10 27 -41 55 l-49 43 -460 1 c-257 0 -498 5 -545 10 -73 9 -232 44 -295 65 -16 6 -17 5 -5 -4z",
    "M9470 3854 c0 -11 9 -33 19 -51 l20 -31 203 1 203 2 3 39 c2 21 -1 42 -6 45 -6 3 -107 8 -226 10 -205 3 -216 2 -216 -15z"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let startTime = Date.now();
    let width: number, height: number;

    let primaryParticles: Particle[] = [];
    let secondaryParticles: Particle[] = [];
    let backgroundElements: BackgroundDrifter[] = [];

    const interpolateColor = (color1: string, color2: string, factor: number) => {
      const c1 = color1.startsWith('#') ? color1.substring(1) : color1;
      const c2 = color2.startsWith('#') ? color2.substring(1) : color2;
      const r1 = parseInt(c1.substring(0, 2), 16), g1 = parseInt(c1.substring(2, 4), 16), b1 = parseInt(c1.substring(4, 6), 16);
      const r2 = parseInt(c2.substring(0, 2), 16), g2 = parseInt(c2.substring(2, 4), 16), b2 = parseInt(c2.substring(4, 6), 16);
      const r = Math.round(r1 + factor * (r2 - r1)), g = Math.round(g1 + factor * (g2 - g1)), b = Math.round(b1 + factor * (b2 - b1));
      return `rgb(${r}, ${g}, ${b})`;
    };

    class BackgroundDrifter {
      char: string; x: number; y: number; vx: number; vy: number; opacity: number; size: number;
      constructor(w: number, h: number) {
        const types = ['</>', '101', '01', '{ }', 'git', 'main', 'null'];
        this.char = types[Math.floor(Math.random() * types.length)];
        this.x = Math.random() * w; this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.18; this.vy = (Math.random() - 0.5) * 0.18;
        this.opacity = Math.random() * 0.12 + 0.02; this.size = Math.random() * 10 + 8;
      }
      update(w: number, h: number) {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = w; if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h; if (this.y > h) this.y = 0;
      }
      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = `rgba(0, 158, 179, ${this.opacity})`;
        context.font = `${this.size}px monospace`;
        context.fillText(this.char, this.x, this.y);
        context.restore();
      }
    }

    const setupLogoGeometry = (w: number, h: number, scale: number) => {
      const path1 = new Path2D();
      const path2 = new Path2D();

      const center1X = 3835, center1Y = 3575;
      const center2X = 6923, center2Y = 6068;

      const yPos = h * 0.45;
      const xAnchor = w * 0.3;

      const matrix1 = new DOMMatrix()
        .translate(xAnchor, yPos)
        .scale(scale * 0.085, -scale * 0.085)
        .translate(-center1X, -center1Y);

      const matrix2 = new DOMMatrix()
        .translate(xAnchor + 136, yPos - 96)
        .scale(scale * 0.065, -scale * 0.065)
        .translate(-center2X, -center2Y);

      LOGO_PATHS_1.forEach(p => path1.addPath(new Path2D(p), matrix1));
      LOGO_PATHS_2.forEach(p => path2.addPath(new Path2D(p), matrix2));

      const generatePoints = (path: Path2D, targetCount: number, minDistance: number) => {
        const pts: { x: number, y: number }[] = [];
        let attempts = 0;
        while (pts.length < targetCount && attempts < targetCount * 140) {
          const rx = (xAnchor) - (8000 * scale * 0.08) + Math.random() * (16000 * scale * 0.08);
          const ry = yPos - (6000 * scale * 0.08) + Math.random() * (12000 * scale * 0.08);
          if (ctx.isPointInPath(path, rx, ry, 'nonzero')) {
            let overlap = false;
            for (let i = pts.length - 1; i >= Math.max(0, pts.length - 1000); i--) {
              if (Math.hypot(pts[i].x - rx, pts[i].y - ry) < minDistance) { overlap = true; break; }
            }
            if (!overlap) pts.push({ x: rx, y: ry });
          }
          attempts++;
        }
        return pts;
      };

      return {
        pts1: generatePoints(path1, PRIMARY_PARTICLE_COUNT, 4.2),
        pts2: generatePoints(path2, SECONDARY_PARTICLE_COUNT, 5.2)
      };
    };

    class Particle {
      char: string; targetX: number; targetY: number; x: number; y: number; vy: number; gravity: number;
      isLocked: boolean; visible: boolean; baseColor: string; isPrimary: boolean;
      blinkOffset: number; blinkCycle: number; offDuration: number; colorFactor: number; shimmerOffset: number;

      constructor(target: { x: number, y: number }, baseColor: string, isPrimary: boolean) {
        this.char = Math.random() > 0.5 ? '1' : '0';
        this.targetX = target.x; this.targetY = target.y;
        this.x = this.targetX; this.y = -(Math.random() * 5000 + 500);
        this.vy = 0; this.gravity = GRAVITY + Math.random() * 0.05;
        this.isLocked = false; this.visible = true;

        this.baseColor = baseColor;
        this.isPrimary = isPrimary;

        this.blinkOffset = Math.random() * 10000;
        this.blinkCycle = Math.random() * 20000 + 15000;
        this.offDuration = 200;
        this.colorFactor = 0;
        this.shimmerOffset = Math.random() * Math.PI * 2;
      }
      update(elapsed: number, mX: number, mY: number, now: number) {
        const relativeTime = (now + this.blinkOffset) % this.blinkCycle;
        this.visible = relativeTime > this.offDuration;
        if (elapsed > TRANSITION_DELAY && !this.isLocked) {
          this.vy += this.gravity; this.y += this.vy;
          if (this.y >= this.targetY) { this.y = this.targetY; this.vy = 0; this.isLocked = true; }
        }
        this.colorFactor = Math.hypot(this.x - mX, this.y - mY) < HOVER_RADIUS ? 1 - (Math.hypot(this.x - mX, this.y - mY) / HOVER_RADIUS) : 0;
      }
      draw(context: CanvasRenderingContext2D, time: number) {
        if (!this.visible) return;
        const shimmer = Math.sin(time * 0.005 + this.shimmerOffset) * 0.08 + 0.92;
        context.save();
        context.globalAlpha = shimmer;
        context.fillStyle = interpolateColor(this.baseColor, HOVER_COLOR, this.colorFactor);

        const fontSize = this.isPrimary ? BASE_FONT_SIZE : BASE_FONT_SIZE - 3;
        context.font = `bold ${fontSize}px monospace`;

        context.textAlign = 'center'; context.textBaseline = 'middle';
        context.fillText(this.char, this.x, this.y);
        context.restore();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight;
      if (width === 0 || height === 0) return;
      const scale = Math.min(width / 1100, height / 600) * 0.85;
      const geo = setupLogoGeometry(width, height, scale);

      primaryParticles = geo.pts1.map(pt => new Particle(pt, PRIMARY_BASE_COLOR, true));
      secondaryParticles = geo.pts2.map(pt => new Particle(pt, SECONDARY_BASE_COLOR, false));
      backgroundElements = Array.from({ length: 130 }, () => new BackgroundDrifter(width, height));
    };

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);
      backgroundElements.forEach(el => { el.update(width, height); el.draw(ctx); });

      secondaryParticles.forEach(p => {
        p.update(elapsed, mouseRef.current.x, mouseRef.current.y, now);
        p.draw(ctx, now);
      });
      primaryParticles.forEach(p => {
        p.update(elapsed, mouseRef.current.x, mouseRef.current.y, now);
        // Only trigger once
        if (p.isLocked && !logoFormedRef.current && primaryParticles.indexOf(p) === 500) {
          logoFormedRef.current = true;
          setIsLogoFormed(true);
          onLogoFormedRef.current?.();
        }
        p.draw(ctx, now);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => { startTime = Date.now(); init(); };
    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    init(); animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Subheading and symbol - increased font size and opacity */}
      <div
        className="absolute z-20 pointer-events-none transition-all duration-1000 ease-out flex flex-col items-center"
        style={{
          left: '30%',
          top: '62%',
          transform: isLogoFormed ? 'translate(-50%, 0)' : 'translate(-50%, 20px)',
          opacity: isLogoFormed ? 1 : 0
        }}
      >
        <h2 className="mb-3 pointer-events-auto cursor-default text-primary/90 text-[1.8vh] md:text-[18px] leading-tight tracking-[0.12em] uppercase transition-all duration-300 text-center hover:scale-105 hover:text-foreground font-kaisei w-[120%] -ml-4">
          The Official Student Chapter Of Computer Society Of India <br /> At DJ Sanghvi College Of Engineering
        </h2>

        <div className="flex justify-center items-center w-full">
          <h2 className="pointer-events-auto cursor-default text-primary/80 text-[4.5vh] md:text-[40px] leading-none tracking-[0.25em] mt-2 transition-all duration-300 hover:scale-125 hover:text-accent font-mono font-bold">
            {"</>"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default BinaryLogo;