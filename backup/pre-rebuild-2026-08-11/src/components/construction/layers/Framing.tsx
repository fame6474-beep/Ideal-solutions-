export function FramingLayer() {
  return (
    <g className="layer-framing" stroke="#8c5839" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      {/* Trusses / Rafters */}
      <path d="M 150,350 L 500,150 L 850,350" />
      <path d="M 200,370 L 500,200 L 800,370" />
      <path d="M 250,390 L 500,250 L 750,390" />
      <path d="M 300,410 L 500,300 L 700,410" />
      <path d="M 350,430 L 500,350 L 650,430" />
      <path d="M 400,450 L 500,400 L 600,450" />
      <path d="M 450,470 L 500,450 L 550,470" />
      {/* Ridge board */}
      <path d="M 500,150 L 500,500" strokeWidth="6" />
      {/* Cross beams */}
      <path d="M 150,350 L 500,500 L 850,350" />
    </g>
  );
}
