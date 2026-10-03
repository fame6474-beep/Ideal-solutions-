export function RoofingLayer() {
  return (
    <g className="layer-roofing" stroke="#111" strokeWidth="1" strokeLinejoin="round">
      {/* Left Pitch Shingles / Metal Panels */}
      <polygon points="150,350 500,150 500,220 220,380" fill="#333" />
      <polygon points="220,380 500,220 500,290 290,410" fill="#383838" />
      <polygon points="290,410 500,290 500,360 360,440" fill="#333" />
      <polygon points="360,440 500,360 500,430 430,470" fill="#383838" />
      <polygon points="430,470 500,430 500,500 500,500" fill="#333" />
      
      {/* Right Pitch Shingles / Metal Panels */}
      <polygon points="500,150 850,350 780,380 500,220" fill="#222" />
      <polygon points="500,220 780,380 710,410 500,290" fill="#272727" />
      <polygon points="500,290 710,410 640,440 500,360" fill="#222" />
      <polygon points="500,360 640,440 570,470 500,430" fill="#272727" />
      <polygon points="500,430 570,470 500,500 500,500" fill="#222" />
    </g>
  );
}
