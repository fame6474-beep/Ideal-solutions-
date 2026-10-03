export function FinishingLayer() {
  return (
    <g className="layer-finishing" fill="#c25c34" stroke="#8a3e21" strokeWidth="2" strokeLinejoin="round">
      {/* Ridge Cap Flashing (Copper) */}
      <path d="M 500,140 L 510,145 L 510,505 L 500,510 L 490,505 L 490,145 Z" />
      
      {/* Left Gutter */}
      <path d="M 140,350 L 150,345 L 500,495 L 490,500 Z" />
      <path d="M 140,350 L 140,360 L 490,510 L 490,500 Z" fill="#a54d2a" />
      
      {/* Right Gutter */}
      <path d="M 860,350 L 850,345 L 500,495 L 510,500 Z" />
      <path d="M 860,350 L 860,360 L 510,510 L 510,500 Z" fill="#a54d2a" />
    </g>
  );
}
