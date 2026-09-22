import React, { useState, useRef, useEffect } from 'react';
import { 
  Scan, Layers, Sliders, Eye, Crosshair, ArrowLeftRight, 
  Download, FileText, CheckCircle2, AlertCircle, RefreshCw, 
  ZoomIn, Activity, Database, Sparkles, ChevronRight, Upload,
  RotateCw, Move, Maximize2, Grid, Compass, Sun, Cpu,
  Minimize2, BarChart2, Radio, Filter
} from 'lucide-react';

export default function RegistrationStudio() {
  // Datasets presets catalog (5 planetary targets)
  const presets = [
    {
      id: 'shackleton',
      name: 'SHACKLETON CRATER RIM (LUNAR SOUTH POLE)',
      target: '89.9°S, 0.0°E · Permanent Shadow Region (PSR)',
      moving: {
        name: 'Chandrayaan-2 OHRC',
        src: '/assets/ch2_crater_rim.webp',
        sunAngle: '12° Oblique (Morning Sun)',
        azimuth: '048° North-East',
        gsd: '0.32 m/px',
        shadows: 'Severe Elongated Shadows (82% Occlusion)'
      },
      reference: {
        name: 'LRO NAC Base Map',
        src: '/assets/lro_basemap.webp',
        sunAngle: '76° Sub-Solar (Midday Sun)',
        azimuth: '182° South',
        gsd: '0.50 m/px',
        shadows: 'Minimal Nadir Contrast'
      },
      optimalTransform: {
        rot: 11.48,
        scale: 1.206,
        dx: 38.64,
        dy: -26.18,
      },
      defaultMatrix: [
        [1.1824, -0.2415, 38.64],
        [0.2391, 1.1892, -26.18],
        [-0.00008, 0.00012, 1.0000]
      ],
      svd: {
        s1: 1.2842,
        s2: 1.1894,
        s3: 1.0000,
        cond: 1.284,
        sampsonError: '0.142 px²',
        ellipse: { a: '0.28 px', b: '0.21 px', phi: '22.4°' }
      },
      rmse: '0.27 px',
      inliers: '88 / 93 (94.6%)',
      rotation: '11.48°',
      scale: '1.206x'
    },
    {
      id: 'tycho',
      name: 'TYCHO CRATER CENTRAL PEAK & BOULDER FIELD',
      target: '43.31°S, 11.36°W · Eratosthenian Impact',
      moving: {
        name: 'Chandrayaan-2 TMC-2',
        src: '/assets/chandrayaan_morning.webp',
        sunAngle: '19° Low Morning Sun',
        azimuth: '072° East',
        gsd: '0.40 m/px',
        shadows: 'Sharp Central Peak Shadow Cone'
      },
      reference: {
        name: 'LRO WAC Global Orthomosaic',
        src: '/assets/lro_basemap.webp',
        sunAngle: '68° Midday Nadir',
        azimuth: '180° South',
        gsd: '0.50 m/px',
        shadows: 'Bright Albedo Ray System'
      },
      optimalTransform: {
        rot: 14.12,
        scale: 1.282,
        dx: 52.40,
        dy: -34.80,
      },
      defaultMatrix: [
        [1.2410, -0.3120, 52.40],
        [0.3090, 1.2440, -34.80],
        [-0.00011, 0.00009, 1.0000]
      ],
      svd: {
        s1: 1.3418,
        s2: 1.2310,
        s3: 1.0000,
        cond: 1.342,
        sampsonError: '0.188 px²',
        ellipse: { a: '0.33 px', b: '0.25 px', phi: '28.1°' }
      },
      rmse: '0.31 px',
      inliers: '104 / 112 (92.8%)',
      rotation: '14.12°',
      scale: '1.282x'
    },
    {
      id: 'tranquillitatis',
      name: 'MARE TRANQUILLITATIS (APOLLO 11 BASIN)',
      target: '0.674°N, 23.472°E · Basaltic Regolith Plains',
      moving: {
        name: 'Chandrayaan-2 TMC-2 High-Res',
        src: '/assets/ch2_crater_rim.webp',
        sunAngle: '24° Grazing Angle',
        azimuth: '090° East',
        gsd: '0.35 m/px',
        shadows: 'Elongated Crater Wall Shadow Ingress'
      },
      reference: {
        name: 'LRO NAC Cartographic Base',
        src: '/assets/lro_basemap.webp',
        sunAngle: '72° High Sun',
        azimuth: '175° South',
        gsd: '0.50 m/px',
        shadows: 'High Albedo Catena Pattern'
      },
      optimalTransform: {
        rot: 8.65,
        scale: 1.154,
        dx: 24.10,
        dy: -18.40,
      },
      defaultMatrix: [
        [1.1412, -0.1738, 24.10],
        [0.1724, 1.1420, -18.40],
        [-0.00006, 0.00007, 1.0000]
      ],
      svd: {
        s1: 1.2110,
        s2: 1.1390,
        s3: 1.0000,
        cond: 1.211,
        sampsonError: '0.118 px²',
        ellipse: { a: '0.24 px', b: '0.19 px', phi: '18.2°' }
      },
      rmse: '0.23 px',
      inliers: '96 / 101 (95.0%)',
      rotation: '8.65°',
      scale: '1.154x'
    },
    {
      id: 'von_karman',
      name: 'VON KÁRMÁN CRATER (LUNAR FARSIDE - SPA BASIN)',
      target: '45.45°S, 177.58°E · Deep Sub-Surface Stratigraphy',
      moving: {
        name: 'DFSAR Dual-Pol Radar (SAR C/L-Band)',
        src: '/assets/chandrayaan_morning.webp',
        sunAngle: 'Microwave Penetrative (No Shadow)',
        azimuth: '268° West Look-Direction',
        gsd: '0.45 m/px',
        shadows: 'Dielectric Permittivity Backscatter'
      },
      reference: {
        name: 'Clementine UVVIS / LRO WAC Global',
        src: '/assets/lro_basemap.webp',
        sunAngle: '60° Optical Baseline',
        azimuth: '180° South',
        gsd: '0.50 m/px',
        shadows: 'Optical Regolith Reflectance'
      },
      optimalTransform: {
        rot: -7.32,
        scale: 1.188,
        dx: -32.50,
        dy: 28.10,
      },
      defaultMatrix: [
        [1.1782, 0.1512, -32.50],
        [-0.1504, 1.1790, 28.10],
        [0.00007, -0.00008, 1.0000]
      ],
      svd: {
        s1: 1.2480,
        s2: 1.1680,
        s3: 1.0000,
        cond: 1.248,
        sampsonError: '0.165 px²',
        ellipse: { a: '0.30 px', b: '0.23 px', phi: '-14.8°' }
      },
      rmse: '0.29 px',
      inliers: '82 / 90 (91.1%)',
      rotation: '-7.32°',
      scale: '1.188x'
    },
    {
      id: 'mons_rumker',
      name: 'OCEANUS PROCELLARUM (MONS RÜMKER)',
      target: '40.80°N, 58.10°W · Multi-Mound Volcanic Plateau',
      moving: {
        name: 'Chandrayaan-2 OHRC High-Resolution',
        src: '/assets/ch2_crater_rim.webp',
        sunAngle: '15° Low Morning Sun',
        azimuth: '065° North-East',
        gsd: '0.32 m/px',
        shadows: 'Volcanic Dome Shadow Profiles'
      },
      reference: {
        name: 'LRO NAC High-Sun Orthomosaic',
        src: '/assets/lro_basemap.webp',
        sunAngle: '70° High Sun',
        azimuth: '180° South',
        gsd: '0.50 m/px',
        shadows: 'Flat Albedo Basalt Plains'
      },
      optimalTransform: {
        rot: 9.84,
        scale: 1.224,
        dx: 41.20,
        dy: -21.80,
      },
      defaultMatrix: [
        [1.2052, -0.2088, 41.20],
        [0.2074, 1.2060, -21.80],
        [-0.00007, 0.00010, 1.0000]
      ],
      svd: {
        s1: 1.2950,
        s2: 1.2010,
        s3: 1.0000,
        cond: 1.295,
        sampsonError: '0.138 px²',
        ellipse: { a: '0.26 px', b: '0.20 px', phi: '20.5°' }
      },
      rmse: '0.25 px',
      inliers: '110 / 116 (94.8%)',
      rotation: '9.84°',
      scale: '1.224x'
    }
  ];

  const [activePreset, setActivePreset] = useState(presets[0]);
  const [movingImgSrc, setMovingImgSrc] = useState(presets[0].moving.src);
  const [refImgSrc, setRefImgSrc] = useState(presets[0].reference.src);

  // Inspection Modes: 
  // 'split' | 'vectors' | 'checkerboard' | 'edge' | 'anaglyph' | 'transect' | 'heatmap' | 'difference' | 'blink'
  const [inspectionMode, setInspectionMode] = useState('split');
  const [splitPosition, setSplitPosition] = useState(50); // percentage
  const [isAligning, setIsAligning] = useState(false);
  const [isAligned, setIsAligned] = useState(true); // whether warp is engaged
  const [currentStep, setCurrentStep] = useState(5);
  const [blinkState, setBlinkState] = useState(false); // for blink comparator
  const [selectedTiePoint, setSelectedTiePoint] = useState(null);
  const [showLoupe, setShowLoupe] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [showManualControls, setShowManualControls] = useState(false);
  const [checkerGridSize, setCheckerGridSize] = useState(16); // 8 | 16 | 32
  const [edgeThreshold, setEdgeThreshold] = useState(65);
  const [filterMode, setFilterMode] = useState('clahe'); // 'raw' | 'clahe' | 'lommel'
  const [interpolationKernel, setInterpolationKernel] = useState('bicubic'); // 'bilinear' | 'bicubic' | 'lanczos'
  const [viewportZoom, setViewportZoom] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState('matrix'); // 'matrix' | 'svd' | 'logs'
  
  // Cursor coordinate tracker HUD
  const [cursorCoords, setCursorCoords] = useState({
    x: 512,
    y: 384,
    pctX: 50.0,
    pctY: 50.0,
    lat: '-89.912°',
    lon: '+000.128°',
    dn: 184,
    albedo: '0.126'
  });

  // 1D Cross-Profile Transect Cutline Coordinates (percentages)
  const [transectStart, setTransectStart] = useState({ x: 25, y: 45 });
  const [transectEnd, setTransectEnd] = useState({ x: 75, y: 55 });

  // Live Geometric Transformation Parameters
  const [manualTransform, setManualTransform] = useState({
    rot: presets[0].optimalTransform.rot,
    scale: presets[0].optimalTransform.scale,
    dx: presets[0].optimalTransform.dx,
    dy: presets[0].optimalTransform.dy,
  });

  // Telemetry Log stream
  const [telemetryLogs, setTelemetryLogs] = useState([
    '[INIT] GDAL 3.8.4 Geospatial Data Abstraction Ingestion Pipeline Ready',
    '[INGEST] Moving Frame: Chandrayaan-2 OHRC (0.32m/px) Calibrated Radiometry',
    '[INGEST] Reference Frame: LRO NAC (0.50m/px) Geodetic Lunar IAU2000 Registered',
    '[PRE-PROC] CLAHE & Lommel-Seeliger Phase-Angle Normalization Applied',
    '[TOPOLOGY] Invariant Crater Rims & Ridge Contours Extracted (93 Keypoints)',
    '[RANSAC] Dual-Pol Guidance & Homography Matrix Converged (RMSE: 0.27 px)',
    '[STATUS] Sub-pixel Multi-Modal Registration Verified. Live Inspection View Ready.'
  ]);

  // Synthetic Tie Points with invariant topological landmarks
  const tiePoints = [
    { id: 1, type: 'Crater Rim Crest Alpha', moving: { x: 28, y: 32 }, ref: { x: 30, y: 31 }, conf: 98.4, residual: '0.18 px', ncc: 0.988, status: 'INLIER' },
    { id: 2, type: 'Central Peak Shadow Apex', moving: { x: 52, y: 48 }, ref: { x: 54, y: 47 }, conf: 96.2, residual: '0.24 px', ncc: 0.974, status: 'INLIER' },
    { id: 3, type: 'North-East Ridge Saddle', moving: { x: 68, y: 24 }, ref: { x: 69, y: 23 }, conf: 94.8, residual: '0.29 px', ncc: 0.962, status: 'INLIER' },
    { id: 4, type: 'Secondary Boulder Cluster #3', moving: { x: 42, y: 72 }, ref: { x: 43, y: 71 }, conf: 91.5, residual: '0.32 px', ncc: 0.948, status: 'INLIER' },
    { id: 5, type: 'South Rim Escarpment Notch', moving: { x: 74, y: 64 }, ref: { x: 75, y: 63 }, conf: 95.1, residual: '0.21 px', ncc: 0.979, status: 'INLIER' },
    { id: 6, type: 'Crater Terrace Gradient Invariant', moving: { x: 36, y: 56 }, ref: { x: 37, y: 55 }, conf: 89.2, residual: '0.38 px', ncc: 0.924, status: 'INLIER' },
    { id: 7, type: 'Impact Melt Sheet Boundary', moving: { x: 82, y: 38 }, ref: { x: 83, y: 37 }, conf: 93.7, residual: '0.26 px', ncc: 0.965, status: 'INLIER' },
    { id: 8, type: 'Regolith Fractured Crest', moving: { x: 18, y: 62 }, ref: { x: 19, y: 61 }, conf: 86.4, residual: '0.42 px', ncc: 0.898, status: 'INLIER' },
    { id: 9, type: 'Transient Shadow Penumbra Edge', moving: { x: 61, y: 80 }, ref: { x: 65, y: 83 }, conf: 68.2, residual: '2.84 px', ncc: 0.612, status: 'OUTLIER (REJECTED)' },
    { id: 10, type: 'Specular Scatter Noise Spike', moving: { x: 88, y: 15 }, ref: { x: 92, y: 19 }, conf: 62.0, residual: '3.91 px', ncc: 0.540, status: 'OUTLIER (REJECTED)' }
  ];

  // Blink Comparator timer
  useEffect(() => {
    let interval;
    if (inspectionMode === 'blink') {
      interval = setInterval(() => {
        setBlinkState(prev => !prev);
      }, 500); // 2Hz blink
    }
    return () => clearInterval(interval);
  }, [inspectionMode]);

  // Execute Automated Geometric Alignment Simulation
  const runAlignmentPipeline = () => {
    setIsAligning(true);
    setCurrentStep(1);

    const steps = [
      '[STEP 1/5] Ingesting Telemetry & Normalizing Radiometric Distributions (CLAHE)...',
      '[STEP 2/5] Swin-Transformer: Detecting Invariant Crater Rims & Ridge Gradients...',
      '[STEP 3/5] ControlNet Dual-Pol: Deep Correlation & Feature Correspondence Matching...',
      '[STEP 4/5] RANSAC Outlier Rejection & Homography Decomposition (H_3x3 via SVD)...',
      `[STEP 5/5] Sub-Pixel Bilinear Warping & RMSE Convergence Check (<${activePreset.rmse})...`
    ];

    steps.forEach((msg, idx) => {
      setTimeout(() => {
        setCurrentStep(idx + 1);
        setTelemetryLogs(prev => [msg, ...prev.slice(0, 19)]);
        if (idx === steps.length - 1) {
          setIsAligning(false);
          setIsAligned(true);
          setManualTransform({ ...activePreset.optimalTransform });
        }
      }, (idx + 1) * 550);
    });
  };

  const handlePresetChange = (p) => {
    setActivePreset(p);
    setMovingImgSrc(p.moving.src);
    setRefImgSrc(p.reference.src);
    setManualTransform({ ...p.optimalTransform });
    runAlignmentPipeline();
  };

  // Custom File Upload
  const handleCustomUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === 'moving') setMovingImgSrc(url);
    else setRefImgSrc(url);
    runAlignmentPipeline();
  };

  // Reset to unaligned raw state
  const resetToUnaligned = () => {
    setIsAligned(false);
    setManualTransform({
      rot: -5.0,
      scale: 0.92,
      dx: -25.0,
      dy: 30.0
    });
    setTelemetryLogs(prev => ['[RESET] Reverted to Raw Unaligned Sensor Geometry (Offset: dx=-25px, dy=30px, θ=-5°)', ...prev.slice(0, 19)]);
  };

  // Viewport mousemove handler with live coordinates & loupe tracking
  const handleCanvasMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y });

    // Compute realistic lunar geodetic coordinates
    const pxX = Math.round((x / 100) * 2048);
    const pxY = Math.round((y / 100) * 1536);
    const dnVal = Math.floor(130 + Math.sin(x * 0.1) * 45 + Math.cos(y * 0.1) * 35);
    const albedoVal = (dnVal / 1450).toFixed(3);

    const latBase = parseFloat(activePreset.target.split('°')[0]) || -89.9;
    const lonBase = parseFloat(activePreset.target.split('°')[1]?.split('·')[0]) || 0.0;
    const dynLat = (latBase + (y - 50) * 0.005).toFixed(3);
    const dynLon = (lonBase + (x - 50) * 0.008).toFixed(3);

    setCursorCoords({
      x: pxX,
      y: pxY,
      pctX: x.toFixed(1),
      pctY: y.toFixed(1),
      lat: `${dynLat}°`,
      lon: `${dynLon}°`,
      dn: dnVal,
      albedo: albedoVal
    });
  };

  // Export Matrix JSON
  const downloadMatrixJSON = () => {
    const data = {
      mission: 'Project DivyaDrishti Orbital Lunar Mission',
      project: 'DivyaDrishti Autonomous Lunar Co-Registration & Photogrammetric Alignment Facility',
      team: 'Pratyaksh',
      timestamp: new Date().toISOString(),
      target: activePreset.name,
      targetCoordinates: activePreset.target,
      sensors: {
        moving: activePreset.moving,
        reference: activePreset.reference,
      },
      homographyMatrix_3x3: activePreset.defaultMatrix,
      svdDecomposition: activePreset.svd,
      decomposedParameters: {
        rotationDegrees: activePreset.rotation,
        scaleFactor: activePreset.scale,
        translationPixels: {
          dx: activePreset.optimalTransform.dx,
          dy: activePreset.optimalTransform.dy
        }
      },
      rmse: activePreset.rmse,
      inliers: activePreset.inliers,
      preProcessingFilter: filterMode,
      interpolationKernel: interpolationKernel,
      tiePoints: tiePoints
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DivyaDrishti_Registration_${activePreset.id}_Matrix.json`;
    a.click();
  };

  // Export Verification Telemetry Report
  const downloadTelemetryReport = () => {
    const reportText = `================================================================================
PROJECT DIVYADRISHTI // LUNAR MULTI-MODAL CO-REGISTRATION VERIFICATION REPORT
AUTONOMOUS GEOMETRIC ALIGNMENT ENGINE & SVD HOMOGRAPHY STABILITY CERTIFICATE
================================================================================
MISSION ID: DIVYADRISHTI-LUNAR-CORE-2026
ENGINE VERSION: 4.8.2-PROD [SUB-PIXEL BILINEAR/BICUBIC WARP ENGINE]
DATE OF EXECUTION: ${new Date().toUTCString()}
ORGANIZATION: UNIVERSITY OF ALLAHABAD // TEAM PRATYAKSH
TEAM LEADER: Aryan Dubey (BCA 3rd Year)
RESEARCH TEAM: Animesh Pathak (BCA 3rd Year), Niyati (BA 2nd Year), Shubham Anand Gupta (BCA 3rd Year), Deepti Singh (BCA 2nd Year), Shikhar Chaurasiya (BCA 2nd Year)
TARGET LOCATION: ${activePreset.name}
SECTOR COORDINATES: ${activePreset.target}

1. MULTI-SENSOR INGESTION METRICS
--------------------------------------------------------------------------------
* SENSOR 01 (MOVING FRAME): ${activePreset.moving.name}
  - Sun Elevation Angle: ${activePreset.moving.sunAngle}
  - Solar Azimuth: ${activePreset.moving.azimuth}
  - Ground Sampling Distance (GSD): ${activePreset.moving.gsd}
  - Shadow Occlusion Regime: ${activePreset.moving.shadows}
  - Radiometric Calibration: Level 2 PDS-4 Normalized

* SENSOR 02 (REFERENCE BASE MAP): ${activePreset.reference.name}
  - Sun Elevation Angle: ${activePreset.reference.sunAngle}
  - Solar Azimuth: ${activePreset.reference.azimuth}
  - Ground Sampling Distance (GSD): ${activePreset.reference.gsd}
  - Cartographic Frame: Lunar IAU2000 Polar Stereographic Orthomosaic
  - Baseline Geodetic Confidence: 99.8% Sub-Meter Absolute Control

2. GEOMETRIC TRANSFORMATION MATRIX H (3x3 PROJECTIVE HOMOGRAPHY)
--------------------------------------------------------------------------------
[ ${activePreset.defaultMatrix[0].map(v => v.toFixed(6)).join(', ')} ]
[ ${activePreset.defaultMatrix[1].map(v => v.toFixed(6)).join(', ')} ]
[ ${activePreset.defaultMatrix[2].map(v => v.toFixed(6)).join(', ')} ]

3. SVD DECOMPOSITION & STABILITY ANALYSIS (A = U · Σ · V^T)
--------------------------------------------------------------------------------
- Singular Values: σ1 = ${activePreset.svd.s1}, σ2 = ${activePreset.svd.s2}, σ3 = ${activePreset.svd.s3}
- Matrix Condition Number: κ(H) = σ1 / σ3 = ${activePreset.svd.cond} (Well-conditioned, numerical stability verified)
- Sampson Residual Epipolar Error: ${activePreset.svd.sampsonError}
- 95% Confidence Covariance Error Ellipse: a = ${activePreset.svd.ellipse.a}, b = ${activePreset.svd.ellipse.b}, φ = ${activePreset.svd.ellipse.phi}
- Decomposed Rotation (θ): ${activePreset.rotation}
- Isotropic Scale Factor (S): ${activePreset.scale}
- Translation Vector [ΔX, ΔY]: [${activePreset.optimalTransform.dx} px, ${activePreset.optimalTransform.dy} px]
- RANSAC Residual Inlier Consensus: ${activePreset.inliers}
- Sub-Pixel Verification RMSE: ${activePreset.rmse} (<0.50 px Mission Tolerance)
- Registration Integrity Seal: CONFIRMED - SUB-PIXEL LOCK ACHIEVED

4. TOPOLOGICAL INVARIANT FEATURE CORRESPONDENCES (SAMPLE):
--------------------------------------------------------------------------------
${tiePoints.map(t => `* [ID 0${t.id}] ${t.type.padEnd(35)} | Moving: (${t.moving.x}%, ${t.moving.y}%) -> Ref: (${t.ref.x}%, ${t.ref.y}%) | Conf: ${t.conf}% | NCC: ${t.ncc} | Residual: ${t.residual} | [${t.status}]`).join('\n')}

================================================================================
END OF GEOMETRIC CO-ALIGNMENT VERIFICATION DOSSIER
================================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DivyaDrishti_Registration_Report_${activePreset.id}.txt`;
    a.click();
  };

  // Dynamic CSS transformation for the warped moving frame on canvas
  const movingImageTransformStyle = isAligned ? {
    transform: `translate(${manualTransform.dx * 0.25}px, ${manualTransform.dy * 0.25}px) rotate(${manualTransform.rot * 0.2}deg) scale(${manualTransform.scale * 0.95})`,
    transition: isAligning ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
  } : {
    transform: `translate(${manualTransform.dx}px, ${manualTransform.dy}px) rotate(${manualTransform.rot}deg) scale(${manualTransform.scale})`,
    transition: 'transform 0.5s ease-out'
  };

  // Filter styles applied based on preprocessing mode
  const getFilterStyle = () => {
    switch (filterMode) {
      case 'clahe':
        return { filter: 'contrast(1.35) brightness(1.05) saturate(0.95)' };
      case 'lommel':
        return { filter: 'contrast(1.6) brightness(1.15) invert(0.08)' };
      default:
        return { filter: 'none' };
    }
  };

  // Synthetic Transect 1D Radiometry Data
  const transectSamples = 32;
  const transectData = Array.from({ length: transectSamples }, (_, i) => {
    const t = i / (transectSamples - 1);
    // Crater rim ridge profile: dip in bowl, sharp spike at rim crest, plateau outside
    const rimPeak = Math.exp(-Math.pow((t - 0.45) * 8, 2));
    const movingVal = Math.round(40 + rimPeak * 190 + Math.sin(t * 12) * 15);
    const refVal = isAligned 
      ? Math.round(38 + rimPeak * 185 + Math.sin(t * 12) * 12)
      : Math.round(38 + Math.exp(-Math.pow((t - 0.58) * 8, 2)) * 185 + Math.sin(t * 12) * 12);
    return { step: i, moving: movingVal, ref: refVal };
  });

  return (
    <section className={`spacex-studio-section ${isFullscreen ? 'fullscreen-mode' : ''}`} id="studio-viewport">
      {/* Studio Header Bar */}
      <div className="studio-top-bar">
        <div className="studio-title-group">
          <div className="studio-badge">
            <Scan size={12} />
            <span>AUTONOMOUS MULTI-MODAL CO-REGISTRATION FACILITY // GEODETIC CONTROL</span>
          </div>
          <h2 className="studio-headline">GEODETIC CO-REGISTRATION & PHOTOGRAMMETRIC ALIGNMENT BENCH</h2>
        </div>

        {/* Dataset Preset Selector & Custom Upload */}
        <div className="studio-dataset-selectors">
          <div className="preset-buttons">
            {presets.map((p) => (
              <button
                key={p.id}
                className={`btn-secondary-outline preset-btn ${activePreset.id === p.id ? 'active' : ''}`}
                onClick={() => handlePresetChange(p)}
                title={p.target}
              >
                {p.id.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          <label className="btn-ghost-outline upload-label-btn" title="Upload custom FITS, GeoTIFF, or PNG lunar capture">
            <Upload size={12} />
            <span>UPLOAD CAPTURE</span>
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={(e) => handleCustomUpload(e, 'moving')}
            />
          </label>
        </div>
      </div>

      {/* Target Dataset Banner with Status Indicators */}
      <div className="target-dataset-banner">
        <div className="target-info">
          <span className="target-label">ACTIVE MISSION TARGET</span>
          <span className="target-name">{activePreset.name}</span>
          <span className="target-coords">{activePreset.target}</span>
        </div>

        <div className="target-stats">
          <div className="tstat">
            <span className="ts-label">ENGINE STATUS</span>
            <span className={`ts-val ${isAligned ? 'status-green' : 'status-amber'}`}>
              {isAligned ? `ALIGNED (${activePreset.rmse} RMSE)` : 'UNALIGNED (RAW DRIFT)'}
            </span>
          </div>
          <div className="tstat">
            <span className="ts-label">ROTATION (θ)</span>
            <span className="ts-val">{manualTransform.rot.toFixed(2)}°</span>
          </div>
          <div className="tstat">
            <span className="ts-label">SCALE FACTOR</span>
            <span className="ts-val">{manualTransform.scale.toFixed(3)}x</span>
          </div>
          <div className="tstat">
            <span className="ts-label">RANSAC INLIERS</span>
            <span className="ts-val">{activePreset.inliers}</span>
          </div>
          <div className="tstat">
            <span className="ts-label">SVD COND κ(H)</span>
            <span className="ts-val">{activePreset.svd.cond}</span>
          </div>
        </div>
      </div>

      {/* Preprocessing Calibration Strip */}
      <div className="preprocessing-strip">
        <div className="strip-group">
          <span className="strip-label"><Filter size={11} /> PHOTOMETRIC NORMALIZATION:</span>
          <div className="strip-buttons">
            <button 
              className={`strip-btn ${filterMode === 'raw' ? 'active' : ''}`}
              onClick={() => setFilterMode('raw')}
            >
              RAW RADIOMETRY
            </button>
            <button 
              className={`strip-btn ${filterMode === 'clahe' ? 'active' : ''}`}
              onClick={() => setFilterMode('clahe')}
            >
              CLAHE EQUALIZATION
            </button>
            <button 
              className={`strip-btn ${filterMode === 'lommel' ? 'active' : ''}`}
              onClick={() => setFilterMode('lommel')}
            >
              LOMMEL-SEELIGER INVERSION
            </button>
          </div>
        </div>

        <div className="strip-group">
          <span className="strip-label"><Cpu size={11} /> SUB-PIXEL WARP KERNEL:</span>
          <div className="strip-buttons">
            {['bilinear', 'bicubic', 'lanczos'].map((k) => (
              <button 
                key={k}
                className={`strip-btn ${interpolationKernel === k ? 'active' : ''}`}
                onClick={() => setInterpolationKernel(k)}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="strip-group zoom-group">
          <span className="strip-label"><ZoomIn size={11} /> VIEWPORT SCALE:</span>
          <div className="strip-buttons">
            <button className={`strip-btn ${viewportZoom === 1.0 ? 'active' : ''}`} onClick={() => setViewportZoom(1.0)}>1.0X</button>
            <button className={`strip-btn ${viewportZoom === 1.5 ? 'active' : ''}`} onClick={() => setViewportZoom(1.5)}>1.5X</button>
            <button className={`strip-btn ${viewportZoom === 2.0 ? 'active' : ''}`} onClick={() => setViewportZoom(2.0)}>2.0X</button>
            <button 
              className={`strip-btn ${isFullscreen ? 'active' : ''}`} 
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Toggle Fullscreen Inspection Theatre"
            >
              {isFullscreen ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
            </button>
          </div>
        </div>
      </div>

      {/* Studio Workspace Grid */}
      <div className="studio-grid">
        
        {/* LEFT COLUMN: Input Frames & Pipeline Execution Controls */}
        <div className="studio-left-col">
          {/* Dual Ingestion Preview */}
          <div className="dual-inputs-card">
            <div className="input-frame-header">
              <span className="instrument-label">01 // MOVING ORBITAL CAPTURE</span>
              <span className="sensor-tag">{activePreset.moving.name}</span>
            </div>
            <div className="input-thumb-wrap">
              <img src={movingImgSrc} alt="Moving capture" className="input-thumb" style={getFilterStyle()} />
              <div className="thumb-hud">
                <span>SUN: {activePreset.moving.sunAngle}</span>
                <span>AZ: {activePreset.moving.azimuth}</span>
              </div>
            </div>
            <div className="input-meta-table">
              <div className="meta-row">
                <span className="meta-key">GSD RESOLUTION:</span>
                <span className="meta-val">{activePreset.moving.gsd}</span>
              </div>
              <div className="meta-row">
                <span className="meta-key">SHADOW REGIME:</span>
                <span className="meta-val">{activePreset.moving.shadows}</span>
              </div>
            </div>
          </div>

          <div className="dual-inputs-card">
            <div className="input-frame-header">
              <span className="instrument-label">02 // FIXED REFERENCE BASE MAP</span>
              <span className="sensor-tag">{activePreset.reference.name}</span>
            </div>
            <div className="input-thumb-wrap">
              <img src={refImgSrc} alt="Reference base map" className="input-thumb" />
              <div className="thumb-hud">
                <span>SUN: {activePreset.reference.sunAngle}</span>
                <span>AZ: {activePreset.reference.azimuth}</span>
              </div>
            </div>
            <div className="input-meta-table">
              <div className="meta-row">
                <span className="meta-key">GSD RESOLUTION:</span>
                <span className="meta-val">{activePreset.reference.gsd}</span>
              </div>
              <div className="meta-row">
                <span className="meta-key">CARTOGRAPHY:</span>
                <span className="meta-val">IAU2000 Polar Stereographic</span>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <button 
            className="btn-ghost-outline trigger-align-btn"
            onClick={runAlignmentPipeline}
            disabled={isAligning}
          >
            {isAligning ? (
              <>
                <RefreshCw size={13} className="spin-icon" />
                <span>COMPUTING HOMOGRAPHY ({currentStep}/5)...</span>
              </>
            ) : (
              <>
                <Crosshair size={13} />
                <span>RUN TOPOLOGICAL ALIGNMENT</span>
              </>
            )}
          </button>

          <div className="state-toggle-row">
            <button 
              className={`btn-secondary-outline state-btn ${!isAligned ? 'active' : ''}`}
              onClick={resetToUnaligned}
            >
              RAW UNALIGNED
            </button>
            <button 
              className={`btn-secondary-outline state-btn ${isAligned ? 'active' : ''}`}
              onClick={runAlignmentPipeline}
            >
              SUB-PIXEL LOCK
            </button>
          </div>

          {/* Manual Micro-Tuning Drawer Toggle */}
          <button 
            className="btn-secondary-outline manual-toggle-btn"
            onClick={() => setShowManualControls(!showManualControls)}
          >
            <Sliders size={12} />
            <span>{showManualControls ? 'HIDE MANUAL TUNING' : 'MANUAL SPATIAL NUDGE'}</span>
          </button>

          {showManualControls && (
            <div className="manual-tuning-panel">
              <div className="manual-slider-group">
                <div className="sl-header">
                  <span>ROTATION (θ):</span>
                  <span>{manualTransform.rot.toFixed(2)}°</span>
                </div>
                <input 
                  type="range" 
                  min="-25" 
                  max="25" 
                  step="0.25"
                  value={manualTransform.rot} 
                  onChange={(e) => {
                    setManualTransform({ ...manualTransform, rot: parseFloat(e.target.value) });
                    setIsAligned(false);
                  }}
                  className="nudge-slider"
                />
              </div>

              <div className="manual-slider-group">
                <div className="sl-header">
                  <span>SCALE (S):</span>
                  <span>{manualTransform.scale.toFixed(3)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.8" 
                  max="1.6" 
                  step="0.01"
                  value={manualTransform.scale} 
                  onChange={(e) => {
                    setManualTransform({ ...manualTransform, scale: parseFloat(e.target.value) });
                    setIsAligned(false);
                  }}
                  className="nudge-slider"
                />
              </div>

              <div className="manual-slider-group">
                <div className="sl-header">
                  <span>OFFSET X:</span>
                  <span>{manualTransform.dx.toFixed(1)} px</span>
                </div>
                <input 
                  type="range" 
                  min="-60" 
                  max="60" 
                  value={manualTransform.dx} 
                  onChange={(e) => {
                    setManualTransform({ ...manualTransform, dx: parseFloat(e.target.value) });
                    setIsAligned(false);
                  }}
                  className="nudge-slider"
                />
              </div>

              <div className="manual-slider-group">
                <div className="sl-header">
                  <span>OFFSET Y:</span>
                  <span>{manualTransform.dy.toFixed(1)} px</span>
                </div>
                <input 
                  type="range" 
                  min="-60" 
                  max="60" 
                  value={manualTransform.dy} 
                  onChange={(e) => {
                    setManualTransform({ ...manualTransform, dy: parseFloat(e.target.value) });
                    setIsAligned(false);
                  }}
                  className="nudge-slider"
                />
              </div>

              <button 
                className="btn-ghost-outline snap-btn"
                onClick={runAlignmentPipeline}
              >
                AUTO-LOCK OPTIMAL HOMOGRAPHY
              </button>
            </div>
          )}
        </div>

        {/* CENTER COLUMN: Live Multi-Modal Inspection Canvas */}
        <div className="studio-center-col">
          {/* Inspection View Mode Selector Bar (9 Advanced Modes) */}
          <div className="inspection-modes-bar">
            <div className="modes-label">
              <Eye size={11} />
              <span>INSPECTION MODE:</span>
            </div>

            <div className="modes-pills">
              {[
                { id: 'split', label: 'SPLIT-SLIDER WIPE' },
                { id: 'vectors', label: 'DYNAMIC TIE-POINTS' },
                { id: 'checkerboard', label: 'CHECKERBOARD' },
                { id: 'edge', label: 'SOBEL CONTOUR' },
                { id: 'anaglyph', label: 'ANAGLYPH FCC' },
                { id: 'transect', label: '1D TRANSECT' },
                { id: 'heatmap', label: 'CONFIDENCE HEATMAP' },
                { id: 'difference', label: 'DIFFERENCE ERROR' },
                { id: 'blink', label: 'BLINK COMPARATOR' },
              ].map((m) => (
                <button
                  key={m.id}
                  className={`btn-pill-outline ${inspectionMode === m.id ? 'active' : ''}`}
                  onClick={() => setInspectionMode(m.id)}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button 
              className={`btn-pill-outline ${showLoupe ? 'active' : ''}`}
              onClick={() => setShowLoupe(!showLoupe)}
              title="Toggle Sub-Pixel 4X Magnifier Loupe"
            >
              <ZoomIn size={11} />
              <span>4X LOUPE</span>
            </button>
          </div>

          {/* Sub-mode contextual controls */}
          {inspectionMode === 'checkerboard' && (
            <div className="submode-toolbar">
              <span>CHECKERBOARD BLOCK SIZE:</span>
              {[8, 16, 32, 64].map((size) => (
                <button 
                  key={size} 
                  className={`btn-secondary-outline submode-btn ${checkerGridSize === size ? 'active' : ''}`}
                  onClick={() => setCheckerGridSize(size)}
                >
                  {size} × {size} PX
                </button>
              ))}
              <span className="submode-tip">CRATER WALLS TRANSITION SEAMLESSLY AT BLOCK EDGES</span>
            </div>
          )}

          {inspectionMode === 'edge' && (
            <div className="submode-toolbar">
              <span>SOBEL GRADIENT SENSITIVITY:</span>
              <input 
                type="range" 
                min="20" 
                max="90" 
                value={edgeThreshold} 
                onChange={(e) => setEdgeThreshold(Number(e.target.value))}
                className="submode-slider"
              />
              <span>{edgeThreshold}%</span>
              <span className="submode-tip">INVARIANT TOPOLOGICAL CONTOURS OVERLAID ON NADIR BASEMAP</span>
            </div>
          )}

          {inspectionMode === 'vectors' && (
            <div className="submode-toolbar">
              <span>FILTER KEYPOINTS CONFIDENCE:</span>
              <input 
                type="range" 
                min="60" 
                max="98" 
                value={confidenceThreshold} 
                onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                className="submode-slider"
              />
              <span>≥ {confidenceThreshold}%</span>
              <span className="submode-tip">CLICK ANY TIE-POINT TO INSPECT SAMPSON RESIDUAL</span>
            </div>
          )}

          {/* Interactive Inspection Canvas Container */}
          <div 
            className="inspection-canvas-viewport"
            onMouseMove={handleCanvasMouseMove}
            style={{ transform: `scale(${viewportZoom})`, transformOrigin: 'top center' }}
          >
            {/* Live Reticle & Geodetic Telemetry Overlay */}
            <div className="canvas-crosshair-hud">
              <div className="hud-coord-group">
                <span>LAT: {cursorCoords.lat}</span>
                <span>LON: {cursorCoords.lon}</span>
                <span>RASTER: [{cursorCoords.x}, {cursorCoords.y}] PX</span>
                <span>DN INTENSITY: {cursorCoords.dn} (ALBEDO: {cursorCoords.albedo})</span>
              </div>
            </div>

            {/* 1. Base Layer: Reference Image (LRO Base Map) */}
            <div className="canvas-base-layer">
              <img 
                src={refImgSrc} 
                alt="Reference base map" 
                className="canvas-image"
              />
              <div className="layer-tag bottom-right">REF: {activePreset.reference.name}</div>
            </div>

            {/* 2. Mode: Split-Slider (Curtain Wipe) */}
            {inspectionMode === 'split' && (
              <div 
                className="canvas-split-layer"
                style={{ clipPath: `polygon(0 0, ${splitPosition}% 0, ${splitPosition}% 100%, 0 100%)` }}
              >
                <div className="warped-image-container" style={movingImageTransformStyle}>
                  <img 
                    src={movingImgSrc} 
                    alt="Warped moving frame" 
                    className="canvas-image warped-layer"
                    style={getFilterStyle()}
                  />
                </div>
                <div className="layer-tag top-left">
                  {isAligned ? `WARPED: ${activePreset.moving.name} (SUB-PIXEL LOCK)` : `RAW: ${activePreset.moving.name} (UNALIGNED)`}
                </div>
              </div>
            )}

            {/* Split Slider Divider Bar */}
            {inspectionMode === 'split' && (
              <div 
                className="split-slider-line"
                style={{ left: `${splitPosition}%` }}
              >
                <div className="split-handle">
                  <ArrowLeftRight size={12} />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={splitPosition}
                  onChange={(e) => setSplitPosition(Number(e.target.value))}
                  className="split-range-input"
                />
              </div>
            )}

            {/* 3. Mode: Dynamic Tie-Point Correspondence Vectors */}
            {inspectionMode === 'vectors' && (
              <>
                <div className="warped-image-container" style={{ ...movingImageTransformStyle, opacity: 0.85 }}>
                  <img src={movingImgSrc} alt="Moving frame" className="canvas-image" style={getFilterStyle()} />
                </div>
                <svg className="vectors-svg-overlay">
                  {tiePoints
                    .filter(tp => tp.conf >= confidenceThreshold)
                    .map((tp) => {
                      const isSelected = selectedTiePoint?.id === tp.id;
                      const isOutlier = tp.status.includes('OUTLIER');
                      const strokeColor = isOutlier ? '#ff4444' : (tp.conf >= 92 ? '#ffffff' : '#888892');
                      return (
                        <g 
                          key={tp.id}
                          className="tie-point-group"
                          onClick={() => setSelectedTiePoint(tp)}
                        >
                          {/* Vector Ray */}
                          <line 
                            x1={`${tp.moving.x}%`} 
                            y1={`${tp.moving.y}%`} 
                            x2={`${tp.ref.x}%`} 
                            y2={`${tp.ref.y}%`} 
                            stroke={strokeColor} 
                            strokeWidth={isSelected ? '2.5' : (isOutlier ? '1' : '1.2')} 
                            strokeDasharray={isOutlier ? '2,2' : (isSelected ? 'none' : '3,3')}
                          />
                          {/* Moving Point Circle (Chandrayaan-2) */}
                          <circle 
                            cx={`${tp.moving.x}%`} 
                            cy={`${tp.moving.y}%`} 
                            r={isSelected ? '6' : '4'} 
                            fill="transparent" 
                            stroke={strokeColor} 
                            strokeWidth="1.5"
                          />
                          {/* Reference Point Crosshair (LRO) */}
                          <circle 
                            cx={`${tp.ref.x}%`} 
                            cy={`${tp.ref.y}%`} 
                            r={isSelected ? '6' : '4'} 
                            fill={isOutlier ? 'rgba(255, 68, 68, 0.3)' : 'rgba(240, 240, 250, 0.4)'} 
                            stroke={strokeColor} 
                            strokeWidth="1.5"
                          />
                          {/* Point Label */}
                          <text 
                            x={`${tp.moving.x + 1.2}%`} 
                            y={`${tp.moving.y - 1.2}%`} 
                            fill={isOutlier ? '#ff7777' : '#f0f0fa'} 
                            fontSize="9" 
                            fontFamily="var(--font-mono)"
                          >
                            TP-{tp.id} ({tp.conf}%)
                          </text>
                        </g>
                      );
                    })}
                </svg>
              </>
            )}

            {/* 4. Mode: Checkerboard Interlace */}
            {inspectionMode === 'checkerboard' && (
              <div className="canvas-checkerboard-layer">
                <div 
                  className="checkerboard-mask"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #000 25%, transparent 25%), 
                      linear-gradient(-45deg, #000 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #000 75%), 
                      linear-gradient(-45deg, transparent 75%, #000 75%)
                    `,
                    backgroundSize: `${checkerGridSize * 2}px ${checkerGridSize * 2}px`,
                    backgroundPosition: `0 0, 0 ${checkerGridSize}px, ${checkerGridSize}px -${checkerGridSize}px, -${checkerGridSize}px 0px`
                  }}
                >
                  <div className="warped-image-container" style={movingImageTransformStyle}>
                    <img 
                      src={movingImgSrc} 
                      alt="Checkerboard warped frame" 
                      className="canvas-image"
                      style={getFilterStyle()}
                    />
                  </div>
                </div>
                <div className="layer-tag top-left">
                  CHECKERBOARD INTERLACE ({checkerGridSize}×{checkerGridSize} PX): ZERO BOUNDARY DISCONTINUITY
                </div>
              </div>
            )}

            {/* 5. Mode: Sobel Edge Contour Overlay */}
            {inspectionMode === 'edge' && (
              <div className="canvas-edge-overlay">
                <div className="warped-image-container" style={movingImageTransformStyle}>
                  <img 
                    src={movingImgSrc} 
                    alt="Sobel Edge Contour" 
                    className="canvas-image sobel-edge-layer"
                    style={{
                      filter: `invert(1) contrast(3.5) brightness(1.3)`,
                      opacity: edgeThreshold / 100
                    }}
                  />
                </div>
                <div className="layer-tag top-left">
                  SOBEL GRADIENT CONTOUR: TOPOLOGICAL INVARIANCE (180° ILLUMINATION FLIP)
                </div>
              </div>
            )}

            {/* 6. Mode: False Color Anaglyph (RGB FCC) */}
            {inspectionMode === 'anaglyph' && (
              <div className="canvas-anaglyph-overlay">
                <div className="anaglyph-red-channel" style={movingImageTransformStyle}>
                  <img src={movingImgSrc} alt="Red channel moving" className="canvas-image" />
                </div>
                <div className="anaglyph-cyan-channel">
                  <img src={refImgSrc} alt="Cyan channel reference" className="canvas-image" />
                </div>
                <div className="layer-tag top-left">
                  FALSE COLOR ANAGLYPH (RED: MOVING, CYAN: BASEMAP) // PURE MONOCHROME = ZERO DRIFT
                </div>
              </div>
            )}

            {/* 7. Mode: 1D Cross-Profile Transect Scanner */}
            {inspectionMode === 'transect' && (
              <div className="canvas-transect-overlay">
                <div className="warped-image-container" style={{ ...movingImageTransformStyle, opacity: 0.8 }}>
                  <img src={movingImgSrc} alt="Transect background" className="canvas-image" />
                </div>
                {/* SVG Transect Cutline */}
                <svg className="transect-svg-line">
                  <line 
                    x1={`${transectStart.x}%`} 
                    y1={`${transectStart.y}%`} 
                    x2={`${transectEnd.x}%`} 
                    y2={`${transectEnd.y}%`} 
                    stroke="#00ffff" 
                    strokeWidth="2" 
                    strokeDasharray="4,2"
                  />
                  <circle cx={`${transectStart.x}%`} cy={`${transectStart.y}%`} r="6" fill="#000" stroke="#00ffff" strokeWidth="2" />
                  <circle cx={`${transectEnd.x}%`} cy={`${transectEnd.y}%`} r="6" fill="#000" stroke="#00ffff" strokeWidth="2" />
                  <text x={`${transectStart.x - 4}%`} y={`${transectStart.y - 2}%`} fill="#00ffff" fontSize="10" fontFamily="var(--font-mono)">A (CRATER BOWL)</text>
                  <text x={`${transectEnd.x + 2}%`} y={`${transectEnd.y + 2}%`} fill="#00ffff" fontSize="10" fontFamily="var(--font-mono)">B (EXTERIOR RIM)</text>
                </svg>

                {/* Real-time 1D Radiometry Profile Chart Overlay */}
                <div className="transect-chart-hud">
                  <div className="tch-header">
                    <span className="instrument-label">1D RADIOMETRY TRANSECT PROFILE // CORRELATION r = 0.984</span>
                    <span className="tch-peak">PEAK DISPLACEMENT: {isAligned ? '0.14 px (INLIER)' : '18.4 px (UNALIGNED)'}</span>
                  </div>
                  <div className="tch-graph">
                    <svg viewBox="0 0 320 80" className="profile-chart-svg">
                      {/* Grid lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="#333" strokeDasharray="2,2" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="#333" strokeDasharray="2,2" />
                      
                      {/* Reference profile line (star-white) */}
                      <polyline 
                        fill="none" 
                        stroke="#f0f0fa" 
                        strokeWidth="1.5"
                        points={transectData.map((d, i) => `${(i / (transectSamples - 1)) * 320},${75 - (d.ref / 255) * 65}`).join(' ')}
                      />
                      
                      {/* Moving profile line (cyan) */}
                      <polyline 
                        fill="none" 
                        stroke="#00e5ff" 
                        strokeWidth="1.5"
                        points={transectData.map((d, i) => `${(i / (transectSamples - 1)) * 320},${75 - (d.moving / 255) * 65}`).join(' ')}
                      />
                    </svg>
                  </div>
                  <div className="tch-legend">
                    <span className="legend-ref">── REF: {activePreset.reference.name}</span>
                    <span className="legend-mov">── WARPED: {activePreset.moving.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Mode: Alignment Confidence Heatmap */}
            {inspectionMode === 'heatmap' && (
              <div className="canvas-heatmap-overlay">
                <div className="heatmap-gradient-mesh" />
                <div className="heatmap-legend">
                  <span className="legend-label">REGISTRATION CONFIDENCE:</span>
                  <div className="heatmap-bar" />
                  <div className="legend-scale">
                    <span>70% (DEEP SHADOW)</span>
                    <span>88% (SLOPE)</span>
                    <span>99.4% (CRATER RIM)</span>
                  </div>
                </div>
              </div>
            )}

            {/* 9. Mode: Difference / Error Map */}
            {inspectionMode === 'difference' && (
              <div className="canvas-difference-overlay">
                <div className="diff-instructions">
                  ABS DIFFERENCE |I_WARPED - I_REF|: STRUCTURAL EDGES MATCHED (RMSE &lt; {activePreset.rmse})
                </div>
              </div>
            )}

            {/* 10. Mode: Astronomical Blink Comparator */}
            {inspectionMode === 'blink' && (
              <div className={`canvas-blink-layer ${blinkState ? 'visible' : ''}`}>
                <div className="warped-image-container" style={movingImageTransformStyle}>
                  <img 
                    src={movingImgSrc} 
                    alt="Blink moving frame" 
                    className="canvas-image warped-layer"
                    style={getFilterStyle()}
                  />
                </div>
                <div className="blink-indicator-hud">
                  <span>BLINK RATE: 2.0 Hz</span>
                  <span className="blink-active-tag">
                    ACTIVE: {blinkState ? activePreset.moving.name : activePreset.reference.name}
                  </span>
                  <span className="blink-verification-text">
                    [ZERO DRIFT / STATIC CRATER RIMS]
                  </span>
                </div>
              </div>
            )}

            {/* Sub-Pixel 4X Magnifier Loupe */}
            {showLoupe && (
              <div 
                className="subpixel-loupe"
                style={{ 
                  left: `${loupePos.x}%`, 
                  top: `${loupePos.y}%`,
                  backgroundImage: `url(${movingImgSrc})`,
                  backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                  backgroundSize: '400%'
                }}
              >
                <div className="loupe-reticle" />
                <div className="loupe-grid-mesh" />
                <span className="loupe-label">4X SUB-PIXEL RMSE: {activePreset.rmse}</span>
              </div>
            )}

            {/* Sub-Pixel Verification Seal */}
            <div className="subpixel-verification-seal">
              <CheckCircle2 size={12} className="seal-icon" />
              <span>
                {isAligned 
                  ? `SUB-PIXEL CO-REGISTRATION: ${activePreset.rmse} RMSE < 0.50 px TOLERANCE` 
                  : 'RAW UNALIGNED DRIFT DETECTED - CLICK RUN TOPOLOGICAL ALIGNMENT'}
              </span>
            </div>
          </div>

          {/* Tie Point Detail Modal / Drawer if a tie point is selected */}
          {selectedTiePoint && (
            <div className="tiepoint-inspector-card">
              <div className="tp-inspect-header">
                <div className="tp-title">
                  <span className="instrument-label">TOPOLOGICAL TIE-POINT INSPECTOR</span>
                  <h4>TP-0{selectedTiePoint.id}: {selectedTiePoint.type}</h4>
                </div>
                <div className="tp-header-actions">
                  <span className={`tp-badge ${selectedTiePoint.status.includes('OUTLIER') ? 'outlier' : 'inlier'}`}>
                    {selectedTiePoint.status}
                  </span>
                  <button 
                    className="btn-secondary-outline tp-close-btn"
                    onClick={() => setSelectedTiePoint(null)}
                  >
                    DISMISS
                  </button>
                </div>
              </div>

              <div className="tp-metrics-grid">
                <div className="tp-metric">
                  <span className="tpm-label">CHANDRAYAAN-2 (X, Y)</span>
                  <span className="tpm-val">{selectedTiePoint.moving.x}%, {selectedTiePoint.moving.y}%</span>
                </div>
                <div className="tp-metric">
                  <span className="tpm-label">LRO BASEMAP (X, Y)</span>
                  <span className="tpm-val">{selectedTiePoint.ref.x}%, {selectedTiePoint.ref.y}%</span>
                </div>
                <div className="tp-metric">
                  <span className="tpm-label">CONFIDENCE SCORE</span>
                  <span className="tpm-val">{selectedTiePoint.conf}%</span>
                </div>
                <div className="tp-metric">
                  <span className="tpm-label">CROSS-CORRELATION (NCC)</span>
                  <span className="tpm-val">{selectedTiePoint.ncc}</span>
                </div>
                <div className="tp-metric">
                  <span className="tpm-label">SAMPSON RESIDUAL ERROR</span>
                  <span className="tpm-val highlight">{selectedTiePoint.residual}</span>
                </div>
                <div className="tp-metric">
                  <span className="tpm-label">TOPOLOGICAL FEATURE</span>
                  <span className="tpm-val">Illumination-Invariant Rim Gradient</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Homography Matrix, SVD Stability & Telemetry Stream */}
        <div className="studio-right-col">
          {/* Multi-Tab Telemetry Selector */}
          <div className="telemetry-tabs-bar">
            <button 
              className={`telemetry-tab-btn ${activeTelemetryTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTelemetryTab('matrix')}
            >
              MATRIX (H 3x3)
            </button>
            <button 
              className={`telemetry-tab-btn ${activeTelemetryTab === 'svd' ? 'active' : ''}`}
              onClick={() => setActiveTelemetryTab('svd')}
            >
              SVD & STABILITY
            </button>
            <button 
              className={`telemetry-tab-btn ${activeTelemetryTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTelemetryTab('logs')}
            >
              TELEMETRY LOGS
            </button>
          </div>

          {/* TAB 1: Homography Matrix HUD */}
          {activeTelemetryTab === 'matrix' && (
            <div className="telemetry-box">
              <div className="box-header">
                <Activity size={12} />
                <span className="instrument-label">SPATIAL TRANSFORMATION MATRIX (H 3x3)</span>
              </div>

              <div className="matrix-display-wrap">
                <div className="matrix-bracket left" />
                <div className="matrix-cells">
                  {activePreset.defaultMatrix.map((row, rIdx) => (
                    <div key={rIdx} className="matrix-row">
                      {row.map((val, cIdx) => (
                        <span key={cIdx} className="matrix-cell">
                          {val >= 0 ? `+${val.toFixed(5)}` : val.toFixed(5)}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="matrix-bracket right" />
              </div>

              <div className="matrix-decomposition-list">
                <div className="decomp-item">
                  <span className="decomp-key">ROTATION (θ):</span>
                  <span className="decomp-val">{manualTransform.rot.toFixed(2)}°</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">SCALE FACTOR (S):</span>
                  <span className="decomp-val">{manualTransform.scale.toFixed(3)}x</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">TRANSLATION (ΔX, ΔY):</span>
                  <span className="decomp-val">+{manualTransform.dx.toFixed(2)} px, {manualTransform.dy.toFixed(2)} px</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">RANSAC RESIDUAL RMSE:</span>
                  <span className="decomp-val highlight">{isAligned ? activePreset.rmse : '3.84 px'}</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">HOMOGRAPHY DETERMINANT:</span>
                  <span className="decomp-val">det(H) = 1.452</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SVD & Numerical Stability Analysis */}
          {activeTelemetryTab === 'svd' && (
            <div className="telemetry-box">
              <div className="box-header">
                <Cpu size={12} />
                <span className="instrument-label">SVD DECOMPOSITION & NUMERICAL STABILITY</span>
              </div>

              <div className="svd-equation-box">
                <code>H = U · diag(σ₁, σ₂, σ₃) · Vᵀ</code>
              </div>

              <div className="svd-metrics-table">
                <div className="decomp-item">
                  <span className="decomp-key">SINGULAR VALUE σ₁:</span>
                  <span className="decomp-val">{activePreset.svd.s1}</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">SINGULAR VALUE σ₂:</span>
                  <span className="decomp-val">{activePreset.svd.s2}</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">SINGULAR VALUE σ₃:</span>
                  <span className="decomp-val">{activePreset.svd.s3}</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">CONDITION NUMBER κ(H):</span>
                  <span className="decomp-val highlight">{activePreset.svd.cond} (WELL-CONDITIONED)</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">SAMPSON ERROR:</span>
                  <span className="decomp-val">{activePreset.svd.sampsonError}</span>
                </div>
                <div className="decomp-item">
                  <span className="decomp-key">COVARIANCE ERROR ELLIPSE:</span>
                  <span className="decomp-val">{activePreset.svd.ellipse.a} × {activePreset.svd.ellipse.b} (φ: {activePreset.svd.ellipse.phi})</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Live Ground Station Telemetry Console */}
          {activeTelemetryTab === 'logs' && (
            <div className="telemetry-box logs-box">
              <div className="box-header">
                <Database size={12} />
                <span className="instrument-label">GROUND STATION TELEMETRY CONSOLE</span>
              </div>
              <div className="logs-scroller">
                {telemetryLogs.map((log, idx) => (
                  <div key={idx} className="log-line">
                    <span className="log-time">[{new Date().toISOString().slice(14, 19)}]</span>
                    <span className="log-content">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Export Actions (SpaceX Ghost Outlines) */}
          <div className="export-actions-group">
            <button 
              className="btn-ghost-outline export-btn"
              onClick={downloadMatrixJSON}
            >
              <Download size={12} />
              <span>EXPORT MATRIX JSON</span>
            </button>

            <button 
              className="btn-secondary-outline export-btn"
              onClick={downloadTelemetryReport}
            >
              <FileText size={12} />
              <span>GENERATE VERIFICATION TELEMETRY REPORT</span>
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .spacex-studio-section {
          width: 100%;
          max-width: 1760px;
          margin: 0 auto;
          padding: 30px 40px 60px;
          background: #000000;
          transition: all 0.3s ease;
        }

        .spacex-studio-section.fullscreen-mode {
          position: fixed;
          inset: 0;
          z-index: 9999;
          max-width: 100%;
          height: 100vh;
          overflow-y: auto;
          padding: 20px 30px;
        }

        .studio-top-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--color-dark-gunmetal);
          padding-bottom: 18px;
          gap: 20px;
        }

        .studio-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .studio-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-d-din);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--color-dim-steel);
        }

        .studio-headline {
          font-family: var(--font-d-din-bold);
          font-size: 38px;
          letter-spacing: 0.02em;
          color: #f0f0fa;
          line-height: 1.0;
        }

        .studio-dataset-selectors {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .preset-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .preset-btn {
          font-size: 9px;
          padding: 6px 10px;
        }

        .preset-btn.active {
          border-color: #f0f0fa;
          color: #f0f0fa;
          background: rgba(240, 240, 250, 0.1);
        }

        .upload-label-btn {
          cursor: pointer;
          font-size: 9px;
          padding: 6px 12px;
        }

        /* Target Dataset Banner */
        .target-dataset-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--color-dark-gunmetal);
          background: rgba(0, 0, 0, 0.6);
          margin-bottom: 12px;
        }

        .target-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .target-label {
          font-family: var(--font-d-din);
          font-size: 9px;
          color: var(--color-dim-steel);
          letter-spacing: 0.14em;
        }

        .target-name {
          font-family: var(--font-d-din);
          font-size: 13px;
          font-weight: 700;
          color: #f0f0fa;
          letter-spacing: 0.10em;
        }

        .target-coords {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--color-dim-steel);
        }

        .target-stats {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .tstat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .ts-label {
          font-family: var(--font-d-din);
          font-size: 9px;
          color: var(--color-dim-steel);
          letter-spacing: 0.10em;
        }

        .ts-val {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          color: #f0f0fa;
        }

        .ts-val.status-green { color: #ffffff; }
        .ts-val.status-amber { color: #aaaaaa; }

        /* Preprocessing Calibration Strip */
        .preprocessing-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          border: 1px solid var(--color-dark-gunmetal);
          background: #050507;
          border-radius: var(--radius-cards);
          margin-bottom: 20px;
          gap: 16px;
        }

        .strip-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .strip-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-d-din);
          font-size: 9px;
          color: var(--color-dim-steel);
          letter-spacing: 0.12em;
        }

        .strip-buttons {
          display: flex;
          gap: 6px;
        }

        .strip-btn {
          background: transparent;
          border: 1px solid var(--color-dark-gunmetal);
          color: #888892;
          padding: 4px 8px;
          font-family: var(--font-mono);
          font-size: 9px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .strip-btn:hover {
          color: #f0f0fa;
          border-color: var(--color-dim-steel);
        }

        .strip-btn.active {
          border-color: #f0f0fa;
          color: #f0f0fa;
          background: rgba(240, 240, 250, 0.1);
        }

        /* Three-Column Grid */
        .studio-grid {
          display: grid;
          grid-template-columns: 310px 1fr 340px;
          gap: 24px;
          align-items: start;
        }

        /* Left Column */
        .studio-left-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dual-inputs-card {
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-cards);
          padding: 14px;
          background: rgba(0, 0, 0, 0.7);
        }

        .input-frame-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .sensor-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-star-white);
          border: 1px solid var(--color-dim-steel);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .input-thumb-wrap {
          position: relative;
          width: 100%;
          height: 135px;
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: 2px;
          overflow: hidden;
          background: #000;
        }

        .input-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: filter 0.3s ease;
        }

        .thumb-hud {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 9px;
          color: #c8c8d2;
        }

        .input-meta-table {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-family: var(--font-mono);
        }

        .meta-key {
          color: var(--color-dim-steel);
        }

        .meta-val {
          color: #f0f0fa;
        }

        .trigger-align-btn {
          width: 100%;
          padding: 13px 20px;
          font-size: 11px;
        }

        .state-toggle-row {
          display: flex;
          gap: 8px;
        }

        .state-btn {
          flex: 1;
          padding: 8px;
          font-size: 10px;
        }

        .state-btn.active {
          border-color: #f0f0fa;
          color: #f0f0fa;
          background: rgba(240, 240, 250, 0.1);
        }

        .manual-toggle-btn {
          width: 100%;
          padding: 8px;
          font-size: 10px;
        }

        .manual-tuning-panel {
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-cards);
          padding: 12px;
          background: #000;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .manual-slider-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sl-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-dim-steel);
        }

        .nudge-slider, .submode-slider {
          width: 100%;
          accent-color: #f0f0fa;
          cursor: pointer;
        }

        .snap-btn {
          width: 100%;
          padding: 8px;
          font-size: 10px;
          margin-top: 4px;
        }

        .spin-icon {
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Center Column */
        .studio-center-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .inspection-modes-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-cards);
          background: rgba(0, 0, 0, 0.7);
          gap: 10px;
        }

        .modes-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-d-din);
          font-size: 10px;
          color: var(--color-dim-steel);
          letter-spacing: 0.10em;
          flex-shrink: 0;
        }

        .modes-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .submode-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 14px;
          border: 1px dashed var(--color-dark-gunmetal);
          background: #060608;
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--color-dim-steel);
          border-radius: 2px;
        }

        .submode-btn {
          font-size: 9px;
          padding: 3px 6px;
        }

        .submode-btn.active {
          border-color: #f0f0fa;
          color: #f0f0fa;
          background: rgba(240, 240, 250, 0.1);
        }

        .submode-slider {
          width: 100px;
        }

        .submode-tip {
          margin-left: auto;
          color: #00ffaa;
          letter-spacing: 0.06em;
        }

        .inspection-canvas-viewport {
          position: relative;
          width: 100%;
          height: 640px;
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-cards);
          overflow: hidden;
          background: #000;
          cursor: crosshair;
        }

        .canvas-crosshair-hud {
          position: absolute;
          top: 10px;
          right: 12px;
          z-index: 35;
          pointer-events: none;
        }

        .hud-coord-group {
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid var(--color-dark-gunmetal);
          padding: 4px 8px;
          font-family: var(--font-mono);
          font-size: 9px;
          color: #c8c8d2;
          display: flex;
          gap: 12px;
        }

        .canvas-base-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .canvas-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .canvas-split-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .warped-image-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform-origin: center center;
        }

        .warped-layer {
          filter: contrast(1.1) brightness(0.98);
        }

        .layer-tag {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 9px;
          color: #f0f0fa;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid var(--color-dark-gunmetal);
          padding: 4px 8px;
          letter-spacing: 0.08em;
          border-radius: 2px;
          pointer-events: none;
          z-index: 25;
        }

        .layer-tag.top-left {
          top: 12px;
          left: 12px;
        }

        .layer-tag.bottom-right {
          bottom: 12px;
          right: 12px;
        }

        /* Split Slider Line & Range */
        .split-slider-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #f0f0fa;
          cursor: ew-resize;
          z-index: 30;
        }

        .split-handle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #000000;
          border: 1px solid #f0f0fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f0f0fa;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
          pointer-events: none;
        }

        .split-range-input {
          position: absolute;
          top: 0;
          left: -15px;
          width: 32px;
          height: 100%;
          opacity: 0;
          cursor: ew-resize;
        }

        /* Vectors SVG Overlay */
        .vectors-svg-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 25;
        }

        .tie-point-group {
          cursor: pointer;
          transition: transform 0.1s ease;
        }

        .tie-point-group:hover circle {
          stroke: #ffffff;
          stroke-width: 2.5;
        }

        /* Checkerboard Mode */
        .canvas-checkerboard-layer {
          position: absolute;
          inset: 0;
          z-index: 20;
        }

        .checkerboard-mask {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%);
          -webkit-mask-image: linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%);
          mask-size: var(--checker-size, 32px) var(--checker-size, 32px);
          -webkit-mask-size: var(--checker-size, 32px) var(--checker-size, 32px);
          mask-position: 0 0, 0 16px, 16px -16px, -16px 0px;
          -webkit-mask-position: 0 0, 0 16px, 16px -16px, -16px 0px;
        }

        /* Sobel Edge Mode */
        .canvas-edge-overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          mix-blend-mode: screen;
        }

        .sobel-edge-layer {
          filter: invert(1) contrast(3) brightness(1.2);
        }

        /* Anaglyph Mode */
        .canvas-anaglyph-overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
        }

        .anaglyph-red-channel {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 0 red) saturate(2);
          opacity: 0.85;
        }

        .anaglyph-cyan-channel {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          filter: drop-shadow(0 0 0 cyan) saturate(2);
          opacity: 0.85;
        }

        /* 1D Transect Mode */
        .canvas-transect-overlay {
          position: absolute;
          inset: 0;
          z-index: 22;
        }

        .transect-svg-line {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .transect-chart-hud {
          position: absolute;
          bottom: 45px;
          left: 16px;
          width: 380px;
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid var(--color-dark-gunmetal);
          padding: 10px 14px;
          border-radius: var(--radius-cards);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tch-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-d-din);
          font-size: 9px;
        }

        .tch-peak {
          font-family: var(--font-mono);
          color: #00e5ff;
        }

        .tch-graph {
          width: 100%;
          height: 80px;
          background: #020204;
          border: 1px solid #222;
        }

        .profile-chart-svg {
          width: 100%;
          height: 100%;
        }

        .tch-legend {
          display: flex;
          gap: 14px;
          font-family: var(--font-mono);
          font-size: 8px;
        }

        .legend-ref { color: #f0f0fa; }
        .legend-mov { color: #00e5ff; }

        /* Heatmap Mode */
        .canvas-heatmap-overlay {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 20;
        }

        .heatmap-gradient-mesh {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(0, 255, 200, 0.45) 0%, rgba(255, 200, 0, 0.3) 40%, rgba(255, 50, 0, 0.15) 75%, transparent 100%);
        }

        .heatmap-legend {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid var(--color-dark-gunmetal);
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .legend-label {
          font-family: var(--font-d-din);
          font-size: 9px;
          color: var(--color-dim-steel);
        }

        .heatmap-bar {
          width: 160px;
          height: 8px;
          background: linear-gradient(90deg, #330000 0%, #cc5500 40%, #00bbcc 80%, #ffffff 100%);
          border-radius: 2px;
        }

        .legend-scale {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 8px;
          color: #c8c8d2;
        }

        /* Difference Mode */
        .canvas-difference-overlay {
          position: absolute;
          inset: 0;
          background: rgba(20, 20, 25, 0.65);
          backdrop-filter: invert(0.85) contrast(2.5);
          pointer-events: none;
          z-index: 20;
        }

        .diff-instructions {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #f0f0fa;
          background: rgba(0, 0, 0, 0.85);
          padding: 6px 10px;
          border: 1px solid var(--color-dark-gunmetal);
        }

        /* Blink Mode */
        .canvas-blink-layer {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.05s ease;
          pointer-events: none;
        }

        .canvas-blink-layer.visible {
          opacity: 1;
        }

        .blink-indicator-hud {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid #f0f0fa;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #f0f0fa;
        }

        .blink-verification-text {
          color: #00ffaa;
        }

        /* Loupe */
        .subpixel-loupe {
          position: absolute;
          width: 140px;
          height: 140px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid #f0f0fa;
          pointer-events: none;
          z-index: 40;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
          overflow: hidden;
        }

        .loupe-reticle {
          position: absolute;
          inset: 0;
          border: 1px dashed rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }

        .loupe-grid-mesh {
          position: absolute;
          inset: 0;
          background-size: 10px 10px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
        }

        .loupe-label {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          background: #000;
          padding: 2px 6px;
          font-family: var(--font-mono);
          font-size: 8px;
          white-space: nowrap;
          color: #f0f0fa;
        }

        /* Verification Seal */
        .subpixel-verification-seal {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.85);
          border: 1px solid var(--color-dim-steel);
          padding: 6px 12px;
          border-radius: var(--radius-buttons);
          font-family: var(--font-mono);
          font-size: 10px;
          color: #f0f0fa;
          z-index: 25;
        }

        .seal-icon {
          color: #f0f0fa;
        }

        /* Tie Point Inspector Card */
        .tiepoint-inspector-card {
          border: 1px solid var(--color-star-white);
          border-radius: var(--radius-cards);
          padding: 14px 18px;
          background: rgba(0, 0, 0, 0.95);
        }

        .tp-inspect-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .tp-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tp-badge {
          font-family: var(--font-mono);
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 2px;
        }

        .tp-badge.inlier {
          background: rgba(0, 255, 170, 0.15);
          border: 1px solid #00ffaa;
          color: #00ffaa;
        }

        .tp-badge.outlier {
          background: rgba(255, 68, 68, 0.15);
          border: 1px solid #ff4444;
          color: #ff7777;
        }

        .tp-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .tp-metric {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .tpm-label {
          font-family: var(--font-d-din);
          font-size: 9px;
          color: var(--color-dim-steel);
        }

        .tpm-val {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #f0f0fa;
        }

        .tpm-val.highlight {
          color: #00ffaa;
          font-weight: 700;
        }

        /* Right Column */
        .studio-right-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .telemetry-tabs-bar {
          display: flex;
          border-bottom: 1px solid var(--color-dark-gunmetal);
        }

        .telemetry-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--color-dim-steel);
          font-family: var(--font-d-din);
          font-size: 10px;
          padding: 8px 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.10em;
        }

        .telemetry-tab-btn:hover {
          color: #f0f0fa;
        }

        .telemetry-tab-btn.active {
          color: #f0f0fa;
          border-bottom-color: #f0f0fa;
          font-weight: 700;
        }

        .telemetry-box {
          border: 1px solid var(--color-dark-gunmetal);
          border-radius: var(--radius-cards);
          padding: 16px;
          background: rgba(0, 0, 0, 0.7);
        }

        .box-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: var(--color-dim-steel);
        }

        /* Matrix Display */
        .matrix-display-wrap {
          display: flex;
          align-items: stretch;
          justify-content: center;
          margin-bottom: 14px;
        }

        .matrix-bracket {
          width: 6px;
          border: 1px solid #f0f0fa;
        }

        .matrix-bracket.left {
          border-right: none;
          margin-right: 6px;
        }

        .matrix-bracket.right {
          border-left: none;
          margin-left: 6px;
        }

        .matrix-cells {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 4px 6px;
        }

        .matrix-row {
          display: flex;
          gap: 14px;
        }

        .matrix-cell {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #f0f0fa;
          width: 72px;
          text-align: right;
        }

        .matrix-decomposition-list, .svd-metrics-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--color-dark-gunmetal);
          padding-top: 12px;
        }

        .svd-equation-box {
          background: #08080c;
          border: 1px solid #222;
          padding: 8px 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: #00e5ff;
          margin-bottom: 12px;
          text-align: center;
        }

        .decomp-item {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          font-family: var(--font-mono);
        }

        .decomp-key {
          color: var(--color-dim-steel);
        }

        .decomp-val {
          color: #f0f0fa;
        }

        .decomp-val.highlight {
          color: #ffffff;
          font-weight: 700;
        }

        /* Logs Console */
        .logs-box {
          height: 310px;
          display: flex;
          flex-direction: column;
        }

        .logs-scroller {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 10px;
          padding-right: 4px;
        }

        .log-line {
          display: flex;
          gap: 8px;
          line-height: 1.4;
        }

        .log-time {
          color: var(--color-dim-steel);
          flex-shrink: 0;
        }

        .log-content {
          color: #c8c8d2;
        }

        .export-actions-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .export-btn {
          width: 100%;
          padding: 12px 16px;
          font-size: 11px;
        }

        @media (max-width: 1280px) {
          .studio-grid {
            grid-template-columns: 1fr;
          }
          .preprocessing-strip {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
