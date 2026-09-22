import React, { useRef, useEffect, useState } from 'react';
import { 
  ArrowRight, Radio, Compass, Satellite, ShieldCheck, 
  Cpu, Activity, Target, Layers
} from 'lucide-react';

export default function HeroAstronaut({ onLaunchStudio, onOpenArchitecture }) {
  const [astronautPos, setAstronautPos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [astronautLoaded, setAstronautLoaded] = useState(false);

  const containerRef = useRef(null);

  // Pre-load and hardware pre-decode astronaut image so it renders immediately and entirely at once
  useEffect(() => {
    const webpImg = new Image();
    webpImg.src = '/assets/indian_astronaut_cutout.webp';

    const markReady = () => {
      if (webpImg.decode) {
        webpImg.decode()
          .then(() => setAstronautLoaded(true))
          .catch(() => setAstronautLoaded(true));
      } else {
        setAstronautLoaded(true);
      }
    };

    if (webpImg.complete) {
      markReady();
    } else {
      webpImg.onload = markReady;
      webpImg.onerror = () => {
        // Fallback to png
        const pngImg = new Image();
        pngImg.src = '/assets/indian_astronaut_cutout.png';
        pngImg.onload = () => setAstronautLoaded(true);
        pngImg.onerror = () => setAstronautLoaded(true);
      };
    }
  }, []);

  // Scroll listener for subtle parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth, natural zero-G floating kinematics (buoyancy drift)
  useEffect(() => {
    let animId;
    let t = 0;

    const loop = () => {
      t += 0.016;

      // Realistic, gentle micro-gravity drift
      const floatX = Math.sin(t * 0.60) * 9 + Math.cos(t * 0.32) * 4;
      const floatY = Math.cos(t * 0.75) * 11 + Math.sin(t * 0.40) * 5;

      setAstronautPos({
        x: floatX,
        y: floatY
      });

      animId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Sleek mouse parallax handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx, y: ny });
  };

  // 3D Perspective Rotation based on mouse position + subtle organic oscillation
  const rotY = mousePos.x * 14 + (astronautPos.x * 0.04);
  const rotX = -mousePos.y * 10 - (astronautPos.y * 0.04);
  const rotZ = Math.sin(Date.now() * 0.0008) * 1.2 + (mousePos.x * 2.5);

  // Smooth scroll parallax transitions
  const bgParallaxY = scrollY * 0.18;
  const textOpacity = Math.max(0, 1 - scrollY / 460);
  const textTranslateY = -scrollY * 0.12;
  const astronautScrollY = scrollY * 0.22;

  return (
    <section 
      ref={containerRef}
      className="spacex-real-hero-viewport"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Real 8K Space Rocket Launch Background with Parallax */}
      <div 
        className="space-backdrop-photo-layer" 
        style={{ transform: `translateY(${bgParallaxY}px) scale(1.02)` }}
      />
      
      {/* 2. Directional Vignette for High-Contrast Aerospace Text Legibility */}
      <div className="space-backdrop-vignette" />

      {/* 3. Hero Content Anchor */}
      <div className="hero-content-anchor">
        <div className="hero-split-grid">
          
          {/* LEFT COLUMN: Mission Narrative, Action CTAs & Telemetry */}
          <div 
            className="hero-text-block"
            style={{ 
              opacity: textOpacity, 
              transform: `translateY(${textTranslateY}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
            }}
          >
            {/* Mission Indicator Tag */}
            <div className="mission-indicator-tag">
              <span className="live-pulse-dot" />
              <span className="mission-tag-text">PROJECT DIVYADRISHTI // AUTONOMOUS PAYLOAD PIPELINE</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline">
              LUNAR IMAGE<br />
              ALIGNMENT &<br />
              MULTI-MODAL REGISTRATION
            </h1>

            {/* Description */}
            <p className="hero-description">
              DEPLOYING INVARIANT TOPOLOGICAL CRATER-RIM GEOMETRY AND SYNTHETIC APERTURE RADAR (SAR) CROSS-ATTENTION TO AUTOMATICALLY RESOLVE EXTREME ILLUMINATION INVERSIONS BETWEEN CHANDRAYAAN-2 AND LRO ORBITAL FEEDS WITH SUB-PIXEL RMSE PRECISION.
            </p>

            {/* Action CTAs */}
            <div className="hero-actions-row">
              <button 
                className="btn-ghost-outline hero-cta-btn"
                onClick={onLaunchStudio}
              >
                <span>ENTER GEODETIC ALIGNMENT BENCH</span>
                <ArrowRight size={13} />
              </button>

              <button 
                className="btn-secondary-outline hero-sec-btn"
                onClick={onOpenArchitecture}
              >
                <span>ALGORITHM ARCHITECTURE</span>
              </button>
            </div>

            {/* Telemetry Stats Strip */}
            <div className="hero-telemetry-panel">
              <div className="telemetry-stat">
                <span className="stat-label">CONVERGENCE</span>
                <span className="stat-val">0.912 SSIM</span>
              </div>
              <div className="telemetry-separator" />
              <div className="telemetry-stat">
                <span className="stat-label">SUB-PIXEL RMSE</span>
                <span className="stat-val">0.27 px</span>
              </div>
              <div className="telemetry-separator" />
              <div className="telemetry-stat">
                <span className="stat-label">EDGE QUANT</span>
                <span className="stat-val">INT8 FPGA</span>
              </div>
              <div className="telemetry-separator" />
              <div className="telemetry-stat">
                <span className="stat-label">RESEARCH TEAM</span>
                <span className="stat-val">PRATYAKSH</span>
              </div>
              <div className="telemetry-separator" />
              <div className="telemetry-stat">
                <span className="stat-label">GEODETIC DATUM</span>
                <span className="stat-val">IAU2000</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Photorealistic Zero-G Astronaut with Organic Float & 3D Parallax */}
          <div className="hero-astronaut-column">
            <div 
              className="real-astronaut-entity-wrap"
              style={{
                transform: `translate3d(${astronautPos.x}px, ${astronautPos.y + astronautScrollY}px, 0px)`
              }}
            >
              <div 
                className="astronaut-3d-gimbal"
                style={{
                  transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`
                }}
              >
                <div className="photo-astronaut-frame">
                  <picture>
                    <source srcSet="/assets/indian_astronaut_cutout.webp" type="image/webp" />
                    <img 
                      src="/assets/indian_astronaut_cutout.png" 
                      alt="Indian Gaganyaan astronaut floating in zero gravity" 
                      className={`real-astronaut-img ${astronautLoaded ? 'is-ready' : 'is-loading'}`}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      onLoad={() => setAstronautLoaded(true)}
                      draggable="false"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Professional Aerospace Mission Telemetry Strip (Bottom Horizon) */}
      <div className="hero-orbital-telemetry-ribbon">
        <div className="telemetry-ribbon-container">
          <div className="ribbon-col">
            <div className="ribbon-label-row">
              <span className="beacon-indicator" />
              <span className="ribbon-label">ORBITAL INSERTION TELEMETRY</span>
            </div>
            <div className="ribbon-val-row">
              <span className="ribbon-val">CH-2 CIRCULAR POLAR 100 KM</span>
              <span className="ribbon-sub">ALT: 100.24 KM · VEL: 1,633.8 M/S · INC: 90.0°</span>
            </div>
          </div>

          <div className="ribbon-separator" />

          <div className="ribbon-col">
            <div className="ribbon-label-row">
              <Compass size={10} className="ribbon-icon" />
              <span className="ribbon-label">CARTOGRAPHIC DATUM</span>
            </div>
            <div className="ribbon-val-row">
              <span className="ribbon-val">SHACKLETON POLAR BASIN (89.9°S, 0.0°E)</span>
              <span className="ribbon-sub">IAU2000 MOON STEREOGRAPHIC · PERMANENT SHADOW REGION</span>
            </div>
          </div>

          <div className="ribbon-separator" />

          <div className="ribbon-col">
            <div className="ribbon-label-row">
              <Satellite size={10} className="ribbon-icon" />
              <span className="ribbon-label">MULTI-MODAL SENSOR SYNC</span>
            </div>
            <div className="ribbon-val-row">
              <span className="ribbon-val">OHRC 0.32M + SAR C-BAND + LRO BASEMAP</span>
              <span className="ribbon-sub">SVD STABILITY κ = 1.284 · INLIER CONSENSUS: 94.6%</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Full Viewport Fit: Clean SpaceX Horizon */
        .spacex-real-hero-viewport {
          position: relative;
          width: 100%;
          height: calc(100vh - 65px);
          max-height: calc(100vh - 65px);
          min-height: 600px;
          background: #000000;
          overflow: hidden;
          display: flex;
          align-items: center;
          user-select: none;
        }

        /* 8K Photographic Deep Space Background */
        .space-backdrop-photo-layer {
          position: absolute;
          inset: -20px;
          width: calc(100% + 40px);
          height: calc(100% + 40px);
          background-image: url('/assets/deep_space_rocket_launch.webp');
          background-size: cover;
          background-position: center 32%;
          z-index: 0;
          opacity: 0.88;
          filter: brightness(0.95) contrast(1.10);
          will-change: transform;
        }

        /* Directional vignette ensuring text readability without obscuring rocket or astronaut */
        .space-backdrop-vignette {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.76) 38%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.45) 85%, rgba(0,0,0,0.75) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 76%, rgba(0,0,0,0.92) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* Main Container Anchor */
        .hero-content-anchor {
          position: relative;
          z-index: 20;
          width: 100%;
          max-width: 1680px;
          margin: 0 auto;
          padding: 0 48px;
          height: 100%;
          display: flex;
          align-items: center;
        }

        /* Two-column balanced split grid */
        .hero-split-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 30px;
          align-items: center;
          padding-bottom: 40px;
        }

        /* Left Column Text Block */
        .hero-text-block {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.5vh, 16px);
          max-width: 580px;
          will-change: transform, opacity;
        }

        .mission-indicator-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 10px;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-buttons);
          width: fit-content;
        }

        .live-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f0f0fa;
          box-shadow: 0 0 8px rgba(240, 240, 250, 0.8);
          animation: pulseFade 2s infinite ease-in-out;
        }

        @keyframes pulseFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1.0; }
        }

        .mission-tag-text {
          font-family: var(--font-d-din);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--color-dim-steel);
        }

        .hero-headline {
          font-family: var(--font-d-din-bold);
          font-size: clamp(28px, 3.1vw, 42px);
          line-height: 1.08;
          letter-spacing: 0.02em;
          color: #f0f0fa;
          text-transform: uppercase;
        }

        .hero-description {
          font-family: var(--font-d-din);
          font-size: clamp(11px, 1.0vw, 12px);
          line-height: 1.6;
          letter-spacing: 0.10em;
          color: #c8c8d2;
          max-width: 500px;
        }

        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 4px;
        }

        .hero-cta-btn {
          padding: 10px 18px;
          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .hero-sec-btn {
          padding: 10px 16px;
          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .hero-telemetry-panel {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 14px;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-buttons);
          margin-top: 4px;
          width: fit-content;
        }

        .telemetry-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-label {
          font-family: var(--font-d-din);
          font-size: 8.5px;
          color: var(--color-dim-steel);
          letter-spacing: 0.12em;
        }

        .stat-val {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--color-star-white);
          letter-spacing: 0.06em;
        }

        .telemetry-separator {
          width: 1px;
          height: 18px;
          background: var(--color-dark-gunmetal);
        }

        /* Right Column - Centered Zero-G Astronaut */
        .hero-astronaut-column {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          height: 100%;
        }

        .real-astronaut-entity-wrap {
          width: clamp(320px, 32vw, 470px);
          height: clamp(320px, 32vw, 470px);
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .astronaut-3d-gimbal {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.08s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .photo-astronaut-frame {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          outline: none;
        }

        /* Clean cutout image with zero border/square artifacts - instant load with zero frame scanlines */
        .real-astronaut-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: transparent;
          border: none;
          outline: none;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.22s ease-out;
        }

        .real-astronaut-img.is-ready {
          opacity: 1;
        }

        /* Bottom Mission Telemetry Ribbon */
        .hero-orbital-telemetry-ribbon {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 25;
          background: rgba(0, 0, 0, 0.88);
          border-top: 1px solid var(--color-dark-gunmetal);
          backdrop-filter: blur(12px);
          padding: 8px 48px;
        }

        .telemetry-ribbon-container {
          max-width: 1680px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .ribbon-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ribbon-label-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .beacon-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #f0f0fa;
          animation: pulseFade 1.6s infinite ease-in-out;
        }

        .ribbon-icon {
          color: var(--color-dim-steel);
        }

        .ribbon-label {
          font-family: var(--font-d-din);
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--color-dim-steel);
        }

        .ribbon-val-row {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .ribbon-val {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: #f0f0fa;
          letter-spacing: 0.05em;
        }

        .ribbon-sub {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: var(--color-dim-steel);
          letter-spacing: 0.04em;
        }

        .ribbon-separator {
          width: 1px;
          height: 24px;
          background: var(--color-dark-gunmetal);
        }

        @media (max-width: 1200px) {
          .ribbon-sub {
            display: none;
          }
        }

        @media (max-width: 1100px) {
          .hero-split-grid {
            grid-template-columns: 1fr;
          }
          .hero-astronaut-column {
            display: none;
          }
          .hero-orbital-telemetry-ribbon {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
