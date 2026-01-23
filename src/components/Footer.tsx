import { motion } from "motion/react";
import { Github, ExternalLink } from "lucide-react";
import chimpLogo from "@/assets/chimp-logo.png";
import StellarLogo from "./StellarLogo";
import SCFBadge from "./SCFBadge";

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
  {
    label: "GitHub",
    href: "https://github.com/chimpdao",
    icon: Github,
  },
  {
    label: "X",
    href: "https://x.com/chimpdao",
    icon: XIcon,
  },
];

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and brand */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={chimpLogo}
              alt="ChimpDAO"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-foreground">ChimpDAO</span>
          </motion.div>

          {/* Quick links */}
          <motion.nav
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-1 group"
              >
                {link.label}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </motion.nav>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom bar with Stellar and SCF badges */}
        <motion.div
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Built on Stellar */}
          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="text-sm">Built on</span>
            <StellarLogo className="h-5 w-auto text-foreground" />
          </a>

          {/* SCF Badge */}
          <SCFBadge />

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ChimpDAO. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
