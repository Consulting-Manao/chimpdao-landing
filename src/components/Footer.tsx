import { motion } from "motion/react";
import { Github } from "lucide-react";
import chimpJoystick from "@/assets/chimp-joystick.png";
import stellarSymbol from "@/assets/stellar-symbol.png";
import scfLogo from "@/assets/scf-logo.svg";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className || "w-5 h-5"} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialLinks = [
  { label: "GitHub", href: "https://github.com/orgs/Consulting-Manao/repositories", icon: Github },
  { label: "X", href: "https://x.com/Chi_m_p", icon: XIcon },
];

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left side: Logo + Brand + Social icons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={chimpJoystick}
                alt="ChimpDAO"
                width={40}
                height={40}
                loading="lazy"
                className="w-10 h-10 object-contain"
              />
              <span className="text-lg font-bold text-foreground">ChimpDAO</span>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-2 ml-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right side: Stellar badge + SCF badge + Copyright */}
          <div className="flex items-center gap-6">
            {/* Stellar badge */}
            <a
              href="https://stellar.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="text-xs">Built on</span>
              <img src={stellarSymbol} alt="Stellar" width={16} height={16} loading="lazy" className="h-4 w-auto invert opacity-70 hover:opacity-100 transition-opacity" />
            </a>

            {/* SCF badge */}
            <a
              href="https://communityfund.stellar.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="text-xs">Funded by</span>
              <img src={scfLogo} alt="Stellar Community Fund" width={48} height={16} loading="lazy" className="h-4 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            </a>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ChimpDAO
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;