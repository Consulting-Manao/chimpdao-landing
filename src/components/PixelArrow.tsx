interface PixelArrowProps {
  className?: string;
}

const PixelArrow = ({ className }: PixelArrowProps) => (
  <svg 
    viewBox="0 0 8 8" 
    className={className}
    fill="currentColor"
  >
    {/* Pixel-style right arrow using rectangles */}
    <rect x="2" y="3" width="2" height="2" />
    <rect x="4" y="2" width="2" height="2" />
    <rect x="4" y="4" width="2" height="2" />
    <rect x="6" y="3" width="2" height="2" />
  </svg>
);

export default PixelArrow;
