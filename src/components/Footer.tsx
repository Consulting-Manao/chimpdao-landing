import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import chimpMascot from "@/assets/chimp-mascot.png";
import stellarSymbol from "@/assets/stellar-symbol.png";
import scfLogo from "@/assets/scf-logo.svg";

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const quickLinks = [
  { label: "Shop", href: "https://shop.chimpdao.xyz" },
  { label: "NFT Gallery", href: "https://nft.chimpdao.xyz" },
  { label: "iOS App", href: "https://apps.apple.com/app/chimpdao" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/chimpdao", icon: Github },
  { label: "X", href: "https://x.com/chimpdao", icon: XIcon },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo and brand - using mascot/hanger logo */}
          <div className="flex items-center gap-3">
            <img
              src={chimpMascot}
              alt="ChimpDAO"
              className="w-10 h-10 object-contain"
            />
            <span className="text-lg font-bold text-foreground">ChimpDAO</span>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group text-sm"
              >
                {link.label}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon />
              </a>
            ))}
          </div>

          {/* Stellar badge */}
          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="text-xs">Built on</span>
            <img src={stellarSymbol} alt="Stellar" className="h-5 w-auto invert opacity-70 hover:opacity-100 transition-opacity" />
          </a>

          {/* SCF badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Funded by</span>
            <img src={scfLogo} alt="Stellar Community Fund" className="h-5 w-auto opacity-70" />
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ChimpDAO
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
