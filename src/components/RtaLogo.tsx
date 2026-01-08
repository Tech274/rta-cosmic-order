import { motion } from "framer-motion";

const RtaLogo = ({ className = "", size = 200 }: { className?: string; size?: number }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Outer Circle - Brahman (infinite reality) */}
      <motion.circle
        cx="100"
        cy="100"
        r="95"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      {/* Inner decorative circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="85"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity={0.4}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
      />

      {/* Inner Square - Dharma (structured cosmic law) - rotated 45 degrees */}
      <motion.rect
        x="100"
        y="100"
        width="85"
        height="85"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        transform="translate(-42.5, -42.5)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Upward Triangle - ṚTA (cosmic order, Agni, alignment) */}
      <motion.path
        d="M100 40 L145 130 L55 130 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
      />

      {/* Downward Triangle - Complementary energy */}
      <motion.path
        d="M100 150 L145 70 L55 70 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity={0.3}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
      />

      {/* Central Dot - Ātman (consciousness, witness) */}
      <motion.circle
        cx="100"
        cy="100"
        r="6"
        fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
      />

      {/* Inner ring around bindu */}
      <motion.circle
        cx="100"
        cy="100"
        r="12"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
      />

      {/* Cardinal points */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.circle
          key={angle}
          cx={100 + 75 * Math.cos((angle * Math.PI) / 180)}
          cy={100 + 75 * Math.sin((angle * Math.PI) / 180)}
          r="2"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.4, delay: 1.8 + i * 0.1 }}
        />
      ))}
    </motion.svg>
  );
};

export default RtaLogo;
