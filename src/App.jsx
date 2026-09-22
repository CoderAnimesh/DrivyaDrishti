import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroAstronaut from './components/HeroAstronaut.jsx';
import RegistrationStudio from './components/RegistrationStudio.jsx';
import ArchitectureView from './components/ArchitectureView.jsx';
import ProjectCalculationsMVPUSP from './components/ProjectCalculationsMVPUSP.jsx';
import TeamDossier from './components/TeamDossier.jsx';
import Footer from './components/Footer.jsx';
import { ChevronUp, Activity, Satellite, ShieldCheck, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'studio' | 'architecture' | 'calculations' | 'team'
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentSector, setCurrentSector] = useState('01 // ORBITAL INSERTION');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll tracking for telemetry progress bar and sector detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, pct)));
      setShowScrollTop(scrollY > 350);

      // Sector identification based on scroll percentage
      if (pct < 22) {
        setCurrentSector('01 // ORBITAL INSERTION (HERO)');
      } else if (pct < 50) {
        setCurrentSector('02 // GEODETIC ALIGNMENT BENCH');
      } else if (pct < 74) {
        setCurrentSector('03 // CALCULATIONS & MVP MATRIX');
      } else if (pct < 90) {
        setCurrentSector('04 // ALGORITHM ARCHITECTURE');
      } else {
        setCurrentSector('05 // TEAM PRATYAKSH DOSSIER');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  const handleLaunchStudio = () => {
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArchitecture = () => {
    setActiveTab('architecture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="spacex-app-root">
      {/* Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Orbital Telemetry Scroll Progress Bar (Directly below fixed Navbar) */}
      <div className="orbital-scroll-tracker">
        <div 
          className="scroll-progress-fill" 
          style={{ width: `${scrollPercent}%` }}
        />
        <div className="scroll-sector-hud">
          <div className="sector-indicator">
            <span className="telemetry-beacon-dot" />
            <span className="sector-text">{currentSector}</span>
          </div>
          <span className="sector-pct">{scrollPercent.toFixed(0)}% ORBIT COMPLETE</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-viewport-content">
        {activeTab === 'overview' && (
          <>
            {/* Front Page: Realistic Moving Astronaut & Cinematic Rocket Launch */}
            <HeroAstronaut 
              onLaunchStudio={handleLaunchStudio}
              onOpenArchitecture={handleOpenArchitecture}
            />

            {/* Sector Transition Divider 01 -> 02 */}
            <div className="sector-transition-strip">
              <div className="strip-container">
                <span className="strip-code">SECTOR TRANSITION // 01 → 02</span>
                <span className="strip-desc">ENTERING LUNAR SUB-PIXEL GEODETIC CO-REGISTRATION BENCH</span>
                <span className="strip-coords">IAU2000 POLAR GRID LOCK</span>
              </div>
            </div>

            {/* Embedded Studio Section with Scroll Reveal */}
            <div className="overview-embedded-studio reveal-on-scroll">
              <RegistrationStudio />
            </div>

            {/* Sector Transition Divider 02 -> 03 */}
            <div className="sector-transition-strip">
              <div className="strip-container">
                <span className="strip-code">SECTOR TRANSITION // 02 → 03</span>
                <span className="strip-desc">MATHEMATICAL DERIVATIONS, PRODUCTION MVP & STRATEGIC USP</span>
                <span className="strip-coords">DLT · SVD · L_EDGE LOSS</span>
              </div>
            </div>

            {/* Calculations, MVP & USP Section with Scroll Reveal */}
            <div className="overview-subsections">
              <div className="reveal-on-scroll">
                <ProjectCalculationsMVPUSP />
              </div>
              <div className="reveal-on-scroll">
                <ArchitectureView />
              </div>
              <div className="reveal-on-scroll">
                <TeamDossier />
              </div>
            </div>
          </>
        )}

        {activeTab === 'studio' && (
          <div className="dedicated-tab-view">
            <RegistrationStudio />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="dedicated-tab-view">
            <ArchitectureView />
          </div>
        )}

        {activeTab === 'calculations' && (
          <div className="dedicated-tab-view">
            <ProjectCalculationsMVPUSP />
          </div>
        )}

        {activeTab === 'team' && (
          <div className="dedicated-tab-view">
            <TeamDossier />
          </div>
        )}
      </main>

      {/* Floating "Return to Orbit" HUD Button on Scroll */}
      {showScrollTop && (
        <button 
          className="return-to-orbit-hud"
          onClick={scrollToTop}
          title="Glide back to Orbital Insertion"
        >
          <ChevronUp size={14} className="hud-arrow-icon" />
          <span>RETURN TO ORBIT</span>
          <span className="hud-orbit-dot" />
        </button>
      )}

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      <style>{`
        .spacex-app-root {
          min-height: 100vh;
          background-color: var(--color-void-black);
          color: var(--color-star-white);
          display: flex;
          flex-direction: column;
        }

        /* Orbital Telemetry Scroll Progress Bar */
        .orbital-scroll-tracker {
          position: sticky;
          top: 61px;
          left: 0;
          width: 100%;
          height: 18px;
          background: rgba(0, 0, 0, 0.9);
          border-bottom: 1px solid var(--color-dark-gunmetal);
          z-index: 95;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .scroll-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, rgba(240, 240, 250, 0.2) 0%, rgba(240, 240, 250, 0.4) 100%);
          border-right: 2px solid #f0f0fa;
          transition: width 0.08s ease-out;
          pointer-events: none;
        }

        .scroll-sector-hud {
          position: relative;
          width: 100%;
          max-width: 1720px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 8.5px;
          color: var(--color-dim-steel);
          letter-spacing: 0.10em;
          z-index: 2;
        }

        .sector-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .telemetry-beacon-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00ffaa;
          box-shadow: 0 0 6px #00ffaa;
        }

        .sector-text {
          color: #c8c8d2;
          font-weight: 700;
        }

        .sector-pct {
          color: #888892;
        }

        /* Sector Transition Strips */
        .sector-transition-strip {
          width: 100%;
          background: #040406;
          border-top: 1px solid var(--color-dark-gunmetal);
          border-bottom: 1px solid var(--color-dark-gunmetal);
          padding: 10px 40px;
        }

        .strip-container {
          max-width: 1720px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-dim-steel);
          letter-spacing: 0.12em;
        }

        .strip-code {
          color: #f0f0fa;
          font-weight: 700;
        }

        .strip-desc {
          color: #888892;
        }

        .strip-coords {
          color: #00e5ff;
        }

        /* Main Content Area */
        .main-viewport-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .dedicated-tab-view {
          padding-top: 10px;
        }

        .overview-embedded-studio {
          background: #000000;
        }

        .overview-subsections {
          background: #000000;
        }

        /* Scroll-Reveal Animation Styles */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .reveal-on-scroll.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        /* Floating Return to Orbit HUD Button */
        .return-to-orbit-hud {
          position: fixed;
          bottom: 24px;
          right: 32px;
          z-index: 90;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.88);
          border: 1px solid #f0f0fa;
          color: #f0f0fa;
          padding: 8px 16px;
          border-radius: var(--radius-buttons);
          font-family: var(--font-d-din);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
          transition: all 0.25s ease;
          animation: slideUpFade 0.3s ease-out;
        }

        .return-to-orbit-hud:hover {
          background: #f0f0fa;
          color: #000000;
          transform: translateY(-2px);
        }

        .return-to-orbit-hud:hover .hud-arrow-icon {
          transform: translateY(-2px);
        }

        .hud-arrow-icon {
          transition: transform 0.2s ease;
        }

        .hud-orbit-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00ffaa;
          box-shadow: 0 0 6px #00ffaa;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .strip-desc {
            display: none;
          }
          .scroll-sector-hud {
            padding: 0 16px;
          }
          .return-to-orbit-hud {
            bottom: 16px;
            right: 16px;
            padding: 6px 12px;
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
}
