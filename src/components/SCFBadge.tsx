import scfLogo from "@/assets/scf-logo.svg";

interface SCFBadgeProps {
  className?: string;
}

const SCFBadge = ({ className = "" }: SCFBadgeProps) => {
  return (
    <a 
      href="https://communityfund.stellar.org/" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center gap-2 transition-opacity hover:opacity-80 ${className}`}
    >
      <span className="text-sm text-muted-foreground">Funded by</span>
      <img 
        src={scfLogo} 
        alt="Stellar Community Fund" 
        className="h-8 w-auto object-contain"
      />
    </a>
  );
};

export default SCFBadge;
