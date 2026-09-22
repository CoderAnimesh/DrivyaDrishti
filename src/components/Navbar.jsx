import React, { useState, useEffect } from 'react';
import { Compass, Satellite, Cpu, Users, ChevronDown, Activity, Clock } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [currentTime, setCurrentTime] = useState('');
  const [showOrbitDropdown, setShowOrbitDropdown] = useState(false);
  const [selectedOrbit, setSelectedOrbit] = useState('CH-2 POLAR 100KM');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const utcStr = now.toISOString().slice(11, 19) + ' UTC';
      const istStr = now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' }) + ' IST';
      setCurrentTime(`${istStr} / ${utcStr}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'overview', label: '01 // MISSION OVERVIEW' },
    { id: 'studio', label: '02 // GEODETIC ALIGNMENT BENCH' },
    { id: 'architecture', label: '03 // ALGORITHM ARCHITECTURE' },
    { id: 'calculations', label: '04 // CALCULATIONS, MVP & USP' },
    { id: 'team', label: '05 // TEAM PRATYAKSH' },
  ];

  return (
    <header className="spacex-navbar">
      <div className="nav-container">
        {/* Left: Project Identifier */}
        <div className="nav-brand" onClick={() => setActiveTab('overview')}>
          <div className="brand-logo-wrap">
            <span className="brand-title">DIVYADRISHTI</span>
          </div>
          <span className="brand-sub">LUNAR CO-REGISTRATION & GEOMETRIC ALIGNMENT</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
              {activeTab === item.id && <span className="nav-item-indicator" />}
            </button>
          ))}
        </nav>

        {/* Right: Mission Time & Orbit Selector */}
        <div className="nav-utilities">
          <div className="telemetry-clock">
            <Clock size={11} className="clock-icon" />
            <span className="clock-text">{currentTime || '00:00:00 UTC'}</span>
          </div>

          <div className="orbit-selector-wrap">
            <button 
              className="orbit-selector-btn"
              onClick={() => setShowOrbitDropdown(!showOrbitDropdown)}
              title="Select Orbital Observation Sensor"
            >
              <Satellite size={11} />
              <span>{selectedOrbit}</span>
              <ChevronDown size={11} />
            </button>

            {showOrbitDropdown && (
              <div className="orbit-dropdown-menu">
                {[
                  { label: 'CH-2 OHRC POLAR 100KM', desc: '0.32m/px · Morning Sun · Oblique' },
                  { label: 'LRO NAC BASEMAP 50KM', desc: '0.50m/px · Midday Sun · Nadir' },
                  { label: 'RISAT-1A SAR C-BAND', desc: '1.0m/px · Active Microwave Penetration' },
                  { label: 'LISS-IV SWATH 5.8M', desc: '5.8m/px · Multi-Spectral Swath' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="orbit-dropdown-item"
                    onClick={() => {
                      setSelectedOrbit(item.label.split(' ')[0] + ' ' + item.label.split(' ')[1]);
                      setShowOrbitDropdown(false);
                    }}
                  >
                    <span className="dropdown-label">{item.label}</span>
                    <span className="dropdown-desc">{item.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            className="btn-ghost-outline nav-cta"
            onClick={() => setActiveTab('studio')}
          >
            ALIGNMENT BENCH
          </button>
        </div>
      </div>

      <style>{`
        .spacex-navbar {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          background: #000000;
          border-bottom: 1px solid var(--color-dark-gunmetal);
        }

        .nav-container {
          max-width: 1720px;
          margin: 0 auto;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .nav-brand {
          display: flex;
          flex-direction: column;
          gap: 3px;
          cursor: pointer;
        }

        .brand-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-title {
          font-family: var(--font-d-din-bold);
          font-size: 21px;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #f0f0fa;
        }

        .brand-sub {
          font-family: var(--font-d-din);
          font-size: 9px;
          letter-spacing: 0.14em;
          color: var(--color-dim-steel);
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-item-btn {
          position: relative;
          background: transparent;
          border: none;
          color: var(--color-dim-steel);
          font-family: var(--font-d-din);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px 0;
          transition: color 0.15s ease;
        }

        .nav-item-btn:hover {
          color: var(--color-star-white);
        }

        .nav-item-btn.active {
          color: var(--color-star-white);
        }

        .nav-item-indicator {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: var(--color-star-white);
        }

        .nav-utilities {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .telemetry-clock {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-dim-steel);
          padding: 6px 10px;
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-buttons);
          letter-spacing: 0.06em;
        }

        .clock-icon {
          color: var(--color-star-white);
        }

        .orbit-selector-wrap {
          position: relative;
        }

        .orbit-selector-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid var(--color-star-white);
          border-radius: var(--radius-buttons);
          color: var(--color-star-white);
          font-family: var(--font-d-din);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 8px 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .orbit-selector-btn:hover {
          background: rgba(240, 240, 250, 0.1);
        }

        .orbit-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 290px;
          background: #000000;
          border: 1px solid var(--color-star-white);
          border-radius: var(--radius-buttons);
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 200;
        }

        .orbit-dropdown-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 8px 12px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }

        .orbit-dropdown-item:hover {
          border-color: var(--color-dim-steel);
          background: rgba(240, 240, 250, 0.08);
        }

        .dropdown-label {
          font-family: var(--font-d-din);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-star-white);
          text-transform: uppercase;
        }

        .dropdown-desc {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-dim-steel);
          letter-spacing: 0.02em;
          margin-top: 2px;
        }

        .nav-cta {
          padding: 8px 16px;
          font-size: 11px;
        }

        @media (max-width: 1200px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
