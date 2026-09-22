import React from 'react';
import { Terminal, Shield, Globe, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="spacex-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">DIVYADRISHTI // ORBITAL RESEARCH</span>
            <p className="footer-desc">
              INVARIANT TOPOLOGICAL MULTI-MODAL CO-REGISTRATION & SYNTHETIC APERTURE RADAR FUSION ENGINE. ADVANCED REMOTE SENSING & PLANETARY REGISTRATION.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">NAVIGATION</span>
            <button onClick={() => onNavigate('overview')} className="footer-link">01 // MISSION OVERVIEW</button>
            <button onClick={() => onNavigate('studio')} className="footer-link">02 // GEODETIC ALIGNMENT BENCH</button>
            <button onClick={() => onNavigate('architecture')} className="footer-link">03 // ALGORITHM ARCHITECTURE</button>
            <button onClick={() => onNavigate('calculations')} className="footer-link">04 // CALCULATIONS, MVP & USP</button>
            <button onClick={() => onNavigate('team')} className="footer-link">05 // TEAM PRATYAKSH</button>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">SATELLITE MISSIONS</span>
            <span className="footer-item">CHANDRAYAAN-2 (TMC-2 & OHRC)</span>
            <span className="footer-item">LUNAR RECONNAISSANCE ORBITER (LRO)</span>
            <span className="footer-item">RISAT-1A (EOS-04) SAR C-BAND</span>
            <span className="footer-item">RESOURCESAT-2A (LISS-IV CAMERA)</span>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">MISSION STATUS</span>
            <span className="footer-item status-live">● TELEMETRY: NOMINAL</span>
            <span className="footer-item">RMSE CONVERGENCE: &lt; 0.32 px</span>
            <span className="footer-item">QUANTIZATION: INT8 FPGA</span>
            <span className="footer-item">AFFILIATION: TEAM PRATYAKSH</span>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            <span>© 2026 TEAM PRATYAKSH · PROJECT DIVYADRISHTI · ALL RIGHTS RESERVED</span>
          </div>
          <div className="footer-design-seal">
            <span>DESIGN SYSTEM: SPACEX MISSION CONTROL TOKENS (VOID BLACK #000000 · STAR WHITE #F0F0FA)</span>
          </div>
        </div>
      </div>

      <style>{`
        .spacex-footer {
          width: 100%;
          background: #000000;
          border-top: 1px solid var(--color-dark-gunmetal);
          padding: 50px 40px 30px;
        }

        .footer-container {
          max-width: 1720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1.2fr 1.2fr;
          gap: 40px;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-logo {
          font-family: var(--font-d-din-bold);
          font-size: 20px;
          letter-spacing: 0.12em;
          color: #f0f0fa;
        }

        .footer-desc {
          font-family: var(--font-d-din);
          font-size: 11px;
          line-height: 1.7;
          letter-spacing: 0.10em;
          color: var(--color-dim-steel);
          max-width: 440px;
        }

        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-col-title {
          font-family: var(--font-d-din);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--color-star-white);
          margin-bottom: 4px;
        }

        .footer-link {
          background: none;
          border: none;
          text-align: left;
          font-family: var(--font-d-din);
          font-size: 11px;
          letter-spacing: 0.10em;
          color: var(--color-dim-steel);
          cursor: pointer;
          padding: 0;
          transition: color 0.15s ease;
        }

        .footer-link:hover {
          color: #f0f0fa;
        }

        .footer-item {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-dim-steel);
          letter-spacing: 0.04em;
        }

        .status-live {
          color: #ffffff;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-dark-gunmetal);
          padding-top: 20px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-dim-steel);
          letter-spacing: 0.06em;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
