import scfLogo from "@/assets/scf-logo.svg";

interface SCFBadgeProps {
  className?: string;
}

const SCFBadge = ({ className = "" }: SCFBadgeProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-muted-foreground">Funded by</span>
      <img 
        src={scfLogo} 
        alt="Stellar Community Fund" 
        className="h-8 w-auto object-contain"
      />
    </div>
  );
};

export default SCFBadge;
