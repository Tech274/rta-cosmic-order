import React, { forwardRef } from "react";
import { motion, type Transition } from "framer-motion";

interface RtaLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

const RtaLogo = forwardRef<SVGSVGElement, RtaLogoProps>(({ className = "", size = 200, animate = true }, ref) => {
  const baseTransition: Transition = { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] };
  
  const animationProps = animate ? {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: baseTransition
  } : {};

  const pathAnimation = (delay: number, duration: number = 1.5) => animate ? {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration, ease: [0.25, 0.46, 0.45, 0.94] as const, delay }
  } : {};

  const scaleAnimation = (delay: number, targetOpacity: number = 1) => animate ? {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: targetOpacity },
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay }
  } : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...animationProps}
    >
      {/* Glow filter for sacred radiance */}
      <defs>
        <filter id="sacredGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="1"/>
        </linearGradient>
      </defs>

      {/* Outermost ethereal ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="98"
        stroke="currentColor"
        strokeWidth="0.3"
        fill="none"
        opacity={0.2}
        {...pathAnimation(0, 2.5)}
      />

      {/* Outer Circle - Brahman (infinite reality) */}
      <motion.circle
        cx="100"
        cy="100"
        r="95"
        stroke="url(#goldGradient)"
        strokeWidth="1.5"
        fill="none"
        filter="url(#sacredGlow)"
        {...pathAnimation(0.1, 2)}
      />
      
      {/* Secondary outer ring */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        opacity={0.3}
        {...pathAnimation(0.2, 1.8)}
      />

      {/* Decorative arc segments */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.path
          key={`arc-${angle}`}
          d={`M ${100 + 87 * Math.cos((angle - 15) * Math.PI / 180)} ${100 + 87 * Math.sin((angle - 15) * Math.PI / 180)} A 87 87 0 0 1 ${100 + 87 * Math.cos((angle + 15) * Math.PI / 180)} ${100 + 87 * Math.sin((angle + 15) * Math.PI / 180)}`}
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          opacity={0.25}
          {...pathAnimation(0.3 + i * 0.05, 0.8)}
        />
      ))}

      {/* Inner decorative circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="82"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity={0.35}
        strokeDasharray="4 8"
        {...pathAnimation(0.4, 1.5)}
      />

      {/* Inner Square - Dharma (structured cosmic law) */}
      <motion.rect
        x="57.5"
        y="57.5"
        width="85"
        height="85"
        stroke="url(#goldGradient)"
        strokeWidth="1"
        fill="none"
        filter="url(#sacredGlow)"
        {...pathAnimation(0.6, 1.5)}
      />

      {/* Rotated inner square for depth */}
      <motion.rect
        x="70"
        y="70"
        width="60"
        height="60"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        opacity={0.25}
        transform="rotate(45 100 100)"
        {...pathAnimation(0.7, 1.2)}
      />

      {/* Upward Triangle - ṚTA (cosmic order, Agni) */}
      <motion.path
        d="M100 35 L150 135 L50 135 Z"
        stroke="url(#goldGradient)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        filter="url(#sacredGlow)"
        {...pathAnimation(0.9, 1.5)}
      />

      {/* Downward Triangle - Shakti (complementary energy) */}
      <motion.path
        d="M100 155 L150 65 L50 65 Z"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeLinejoin="round"
        fill="none"
        opacity={0.35}
        {...pathAnimation(1.1, 1.5)}
      />

      {/* Hexagram intersection highlight */}
      <motion.path
        d="M65 100 L100 50 L135 100 L100 150 Z"
        stroke="currentColor"
        strokeWidth="0.3"
        fill="none"
        opacity={0.2}
        {...pathAnimation(1.3, 1)}
      />

      {/* Lotus petal hints around center */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.ellipse
          key={`petal-${angle}`}
          cx={100 + 28 * Math.cos(angle * Math.PI / 180)}
          cy={100 + 28 * Math.sin(angle * Math.PI / 180)}
          rx="8"
          ry="3"
          stroke="currentColor"
          strokeWidth="0.4"
          fill="none"
          opacity={0.3}
          transform={`rotate(${angle} ${100 + 28 * Math.cos(angle * Math.PI / 180)} ${100 + 28 * Math.sin(angle * Math.PI / 180)})`}
          {...scaleAnimation(1.4 + i * 0.05, 0.3)}
        />
      ))}

      {/* Inner rings around bindu */}
      <motion.circle
        cx="100"
        cy="100"
        r="18"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        opacity={0.4}
        {...scaleAnimation(1.6, 0.4)}
      />

      <motion.circle
        cx="100"
        cy="100"
        r="12"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity={0.6}
        {...scaleAnimation(1.7, 0.6)}
      />

      {/* Central Dot - Ātman (consciousness, witness) with breathing animation */}
      <motion.circle
        cx="100"
        cy="100"
        r="6"
        fill="currentColor"
        filter="url(#innerGlow)"
        initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        animate={animate ? { 
          scale: [1, 1.15, 1],
          opacity: 1 
        } : { scale: 1, opacity: 1 }}
        transition={animate ? {
          scale: {
            duration: 4,
            ease: [0.4, 0, 0.6, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 2.5
          },
          opacity: { duration: 0.6, delay: 1.8 }
        } : undefined}
      />

      {/* Breathing glow ring around bindu */}
      <motion.circle
        cx="100"
        cy="100"
        r="8"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.3 }}
        animate={animate ? { 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.1, 0.3]
        } : { scale: 1, opacity: 0.3 }}
        transition={animate ? {
          duration: 4,
          ease: [0.4, 0, 0.6, 1],
          repeat: Infinity,
          repeatDelay: 0.5,
          delay: 2.5
        } : undefined}
      />

      {/* Cardinal points with enhanced styling */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.g key={`cardinal-${angle}`}>
          <motion.circle
            cx={100 + 75 * Math.cos((angle * Math.PI) / 180)}
            cy={100 + 75 * Math.sin((angle * Math.PI) / 180)}
            r="3"
            fill="currentColor"
            opacity={0.7}
            {...scaleAnimation(2 + i * 0.08, 0.7)}
          />
          <motion.circle
            cx={100 + 75 * Math.cos((angle * Math.PI) / 180)}
            cy={100 + 75 * Math.sin((angle * Math.PI) / 180)}
            r="5"
            stroke="currentColor"
            strokeWidth="0.3"
            fill="none"
            opacity={0.3}
            {...scaleAnimation(2.1 + i * 0.08, 0.3)}
          />
        </motion.g>
      ))}

      {/* Intercardinal points (subtle) */}
      {[45, 135, 225, 315].map((angle, i) => (
        <motion.circle
          key={`intercardinal-${angle}`}
          cx={100 + 75 * Math.cos((angle * Math.PI) / 180)}
          cy={100 + 75 * Math.sin((angle * Math.PI) / 180)}
          r="1.5"
          fill="currentColor"
          opacity={0.4}
          {...scaleAnimation(2.3 + i * 0.05, 0.4)}
        />
      ))}

      {/* Subtle connecting lines to center */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.line
          key={`line-${angle}`}
          x1={100 + 20 * Math.cos((angle * Math.PI) / 180)}
          y1={100 + 20 * Math.sin((angle * Math.PI) / 180)}
          x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="0.3"
          opacity={0.15}
          {...pathAnimation(2.4 + i * 0.05, 0.6)}
        />
      ))}
    </motion.svg>
  );
});

RtaLogo.displayName = "RtaLogo";

export default RtaLogo;