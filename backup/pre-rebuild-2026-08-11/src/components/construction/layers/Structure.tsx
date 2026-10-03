export function StructureLayer() {
  return (
    <g className="layer-structure" stroke="#333333" strokeWidth="2" fill="#1a1a1a" strokeLinejoin="round">
      {/* Base walls - Isometric projection approximation */}
      <polygon points="150,550 500,700 850,550 850,350 500,500 150,350" fill="#111" />
      <polygon points="150,550 500,700 500,500 150,350" fill="#151515" />
      <polygon points="500,700 850,550 850,350 500,500" fill="#1a1a1a" />
      {/* Floor grid / architecture details */}
      <path d="M 200,400 L 450,510" stroke="#2a2a2a" strokeWidth="1" />
      <path d="M 250,420 L 450,530" stroke="#2a2a2a" strokeWidth="1" />
      <path d="M 800,400 L 550,510" stroke="#2a2a2a" strokeWidth="1" />
    </g>
  );
}
