import React from 'react';

/**
 * AIRobotAvatar
 * Displays the 3D animated institutional AI robot mascot with floating & pulse animations
 */
export function AIRobotAvatar({ size = 'md', state = 'idle', variant = 'buji', animate = true, className = '' }) {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-36 h-36',
    giant: 'w-52 h-52'
  };

  const imageSrc = state === 'thinking' 
    ? '/assets/ai-robot-thinking.jpg' 
    : (variant === 'classic' ? '/assets/ai-robot.jpg' : '/assets/buji_robot.jpg');

  const animationClass = animate 
    ? (state === 'thinking' ? 'animate-robot-thinking' : 'animate-robot-float')
    : '';

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Outer Glow Halo */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-400/30 to-blue-500/30 blur-md ${animate ? 'animate-pulse' : ''}`}
      />

      {/* Robot Image Container */}
      <div 
        className={`${sizeMap[size] || sizeMap.md} relative rounded-2xl overflow-hidden border-2 border-cyan-300/80 shadow-md bg-white ${animationClass} transition-transform duration-300`}
      >
        <img
          src={imageSrc}
          alt="AURA AI Decision Robot Mascot"
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Holographic light reflection overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-white/20 pointer-events-none" />
      </div>

      {/* Online / Activity Pulse Indicator */}
      <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-white" />
      </span>
    </div>
  );
}

export default AIRobotAvatar;
