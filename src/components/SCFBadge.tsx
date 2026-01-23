import { motion } from "motion/react";

interface SCFBadgeProps {
  className?: string;
}

const SCFBadge = ({ className = "" }: SCFBadgeProps) => {
  return (
    <motion.a
      href="https://communityfund.stellar.org"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border hover:border-primary/50 transition-all duration-300 ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      {/* SCF Icon - stylized S with brush stroke effect */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
          {/* Brush stroke background */}
          <path
            d="M4 16c0-8 6-12 12-12s12 4 12 12-6 12-12 12S4 24 4 16z"
            fill="url(#scfGradient)"
            opacity="0.9"
          />
          {/* S letter stylized */}
          <path
            d="M20 11c0-1.5-1.5-3-4-3s-4 1.5-4 3c0 2 2 3 4 3.5s4 1.5 4 3.5c0 1.5-1.5 3-4 3s-4-1.5-4-3"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="scfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        Stellar Community Fund
      </span>
    </motion.a>
  );
};

export default SCFBadge;
