import React from 'react';
import { Users, GraduationCap, Sparkles, CheckCircle2, Award, Shield, BookOpen } from 'lucide-react';

export default function TeamDossier() {
  const members = [
    {
      id: 1,
      role: 'TEAM LEADER & SYSTEM ARCHITECT',
      name: 'Aryan Dubey',
      academic: 'BCA 3rd Year',
      institution: 'University of Allahabad',
      focus: 'Multi-Modal Transformer Ingestion, SAR Geodetic Co-Registration, Mathematical Loss Formulation & Project Architecture'
    },
    {
      id: 2,
      role: 'COMPUTER VISION & TOPOLOGICAL MATCHING',
      name: 'Animesh Pathak',
      academic: 'BCA 3rd Year',
      institution: 'University of Allahabad',
      focus: 'Invariant Crater Rim Landmark Extraction, Topological Curvature Tensors, LoFTR Feature Correspondence & Inlier Validation'
    },
    {
      id: 3,
      role: 'DATASET ARCHITECTURE & ORBITAL ANALYSIS',
      name: 'Niyati',
      academic: 'BA 2nd Year',
      institution: 'University of Allahabad',
      focus: 'Multi-Temporal Lunar Orbital Baseline Cataloging, Cartographic Reference Framing & Empirical SSIM Evaluation'
    },
    {
      id: 4,
      role: 'RADAR FUSION & MULTI-MODAL RESEARCH',
      name: 'Shubham Anand Gupta',
      academic: 'BCA 3rd Year',
      institution: 'University of Allahabad',
      focus: 'Dual-Polarization Microwave Cross-Attention, Invariant Structural Feature Matching & SAR-Guided L_edge Adaptive Loss'
    },
    {
      id: 5,
      role: 'GEOMETRIC ALIGNMENT & SUB-PIXEL WARPING',
      name: 'Deepti Singh',
      academic: 'BCA 2nd Year',
      institution: 'University of Allahabad',
      focus: 'Planar Homography (DLT) Decomposition, SVD Stability Analysis, RANSAC Residual Optimization & Sub-0.3px RMSE'
    },
    {
      id: 6,
      role: 'EMBEDDED COMPUTE & FULL-STACK DEPLOYMENT',
      name: 'Shikhar Chaurasiya',
      academic: 'BCA 2nd Year',
      institution: 'University of Allahabad',
      focus: 'INT8 Post-Training Model Quantization, GDAL Cloud-Optimized GeoTIFF Streaming & Mission Control Telemetry'
    }
  ];

  return (
    <section className="spacex-team-section" id="team-section">
      {/* Header */}
      <div className="team-header">
        <div className="team-header-top">
          <div className="team-badge">
            <Users size={12} />
            <span>RESEARCH & DEVELOPMENT // TEAM PRATYAKSH</span>
          </div>
          <div className="team-affiliation-seal">
            <GraduationCap size={12} />
            <span>UNIVERSITY OF ALLAHABAD</span>
          </div>
        </div>

        <h2 className="team-headline">TEAM PRATYAKSH // RESEARCH DOSSIER</h2>
        <p className="team-subhead">
          AUTHORS & SYSTEM ARCHITECTS OF PROJECT DIVYADRISHTI: AUTONOMOUS MULTI-MODAL LUNAR CO-REGISTRATION, GEOMETRIC ALIGNMENT ENGINE & ALL-WEATHER SAR FUSION PIPELINE.
        </p>
      </div>

      {/* 6-Member Roster Grid */}
      <div className="team-roster-grid">
        {members.map((member, idx) => (
          <div key={member.id} className="member-card">
            <div className="member-header">
              <span className="instrument-label">RESEARCHER 0{idx + 1}</span>
              <span className="member-status-tag">{member.id === 1 ? 'TEAM LEADER' : 'RESEARCHER'}</span>
            </div>

            <div className="member-role-title">{member.role}</div>
            <h3 className="member-name">{member.name}</h3>

            <div className="member-detail-row">
              <GraduationCap size={13} className="member-icon" />
              <span className="member-college">{member.institution} · <span className="member-year">{member.academic}</span></span>
            </div>

            <div className="member-focus-box">
              <span className="focus-label">CORE RESEARCH & MISSION FOCUS:</span>
              <p className="focus-desc">{member.focus}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .spacex-team-section {
          width: 100%;
          max-width: 1720px;
          margin: 0 auto;
          padding: 30px 40px 60px;
          background: #000000;
        }

        .team-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-bottom: 1px solid var(--color-dark-gunmetal);
          padding-bottom: 24px;
          margin-bottom: 30px;
        }

        .team-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .team-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-d-din);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--color-dim-steel);
        }

        .team-affiliation-seal {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #f0f0fa;
          border: 1px solid var(--color-dark-gunmetal);
          padding: 4px 10px;
          border-radius: 2px;
          background: rgba(240, 240, 250, 0.04);
        }

        .team-headline {
          font-family: var(--font-d-din-bold);
          font-size: 42px;
          letter-spacing: 0.02em;
          color: #f0f0fa;
          line-height: 1.05;
        }

        .team-subhead {
          font-family: var(--font-d-din);
          font-size: 13px;
          line-height: 1.7;
          letter-spacing: 0.10em;
          color: #c8c8d2;
          max-width: 860px;
        }

        .team-roster-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .member-card {
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-cards);
          padding: 24px;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .member-card:hover {
          border-color: #f0f0fa;
          transform: translateY(-2px);
        }

        .member-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .member-status-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #f0f0fa;
          border: 1px solid var(--color-dim-steel);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .member-role-title {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--color-dim-steel);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .member-name {
          font-family: var(--font-d-din-bold);
          font-size: 26px;
          color: #f0f0fa;
          letter-spacing: 0.04em;
        }

        .member-detail-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-d-din);
          font-size: 12px;
          color: #d0d0dc;
        }

        .member-year {
          color: #f0f0fa;
          font-weight: 600;
        }

        .member-icon {
          color: var(--color-dim-steel);
          flex-shrink: 0;
        }

        .member-focus-box {
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: 2px;
          padding: 12px;
          background: #000;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 4px;
        }

        .focus-label {
          font-family: var(--font-d-din);
          font-size: 9px;
          color: var(--color-dim-steel);
          letter-spacing: 0.12em;
        }

        .focus-desc {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #c0c0ca;
          line-height: 1.5;
        }

        @media (max-width: 1200px) {
          .team-roster-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .team-roster-grid {
            grid-template-columns: 1fr;
          }
          .team-header-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
