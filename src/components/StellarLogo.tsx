import stellarSymbol from "@/assets/stellar-symbol.png";

interface StellarLogoProps {
  className?: string;
}

const StellarLogo = ({ className = "" }: StellarLogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={stellarSymbol} 
        alt="Stellar" 
        className="h-6 w-6 object-contain invert"
      />
      <span className="font-semibold text-foreground">Stellar</span>
    </div>
  );
};

export default StellarLogo;
