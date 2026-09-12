import React from 'react';

/**
 * OfficialAgentEmblem
 * Precision SVG implementation of the Agent 70 institutional circular emblem (matching Image 4)
 * - Soft lavender/periwinkle sectors (#8E9AF7)
 * - 5 radiating royal blue spokes (#1D4ED8) with crisp white border stripes
 * - Central royal blue ring with white hub disk
 * - Solid royal blue 5-pointed star in the center
 */
export function OfficialAgentEmblem({ size = 44, className = '' }) {
  // Spoke rotation angles (0° = pointing straight down)
  const spokeAngles = [0, 72, 144, 216, 288];

  // 5-pointed star path coordinates centered at (100, 100)
  // Outer radius = 18.5, Inner radius = 8.0, top point at 12 o'clock
  const starPath = "M 100,81.5 L 104.7,93.5 L 118.1,94.1 L 107.6,102.5 L 111.2,115.4 L 100,108.0 L 88.8,115.4 L 92.4,102.5 L 81.9,94.1 L 95.3,93.5 Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`select-none shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clip path for crisp circular emblem boundary */}
        <clipPath id="emblem-circle-clip">
          <circle cx="100" cy="100" r="95" />
        </clipPath>
      </defs>

      {/* Main emblem group with circle clip */}
      <g clipPath="url(#emblem-circle-clip)">
        {/* 1. Lavender / Periwinkle Sector Base */}
        <circle cx="100" cy="100" r="96" fill="#8F98F5" />

        {/* 2. 5 Radiating Spokes with White Borders and Royal Blue Core */}
        {spokeAngles.map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            {/* White spoke border layer */}
            <rect x="85" y="100" width="30" height="98" fill="#FFFFFF" />
            {/* Royal Blue spoke center bar */}
            <rect x="91" y="100" width="18" height="98" fill="#1D4ED8" />
          </g>
        ))}

        {/* 3. Central Royal Blue Outer Hub Ring */}
        <circle cx="100" cy="100" r="37" fill="#1D4ED8" />

        {/* 4. White Center Hub Disk */}
        <circle cx="100" cy="100" r="26" fill="#FFFFFF" />

        {/* 5. Central Royal Blue 5-Pointed Star */}
        <path d={starPath} fill="#1D4ED8" />
      </g>

      {/* Outer Circle Ring Border */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="#FFFFFF" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="96" fill="none" stroke="#7C88E8" strokeWidth="1" />
    </svg>
  );
}

export default OfficialAgentEmblem;
