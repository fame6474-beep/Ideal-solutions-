export function DeckingLayer() {
  return (
    <g className="layer-decking" stroke="#b08d6a" strokeWidth="1" fill="#8c6c51" strokeLinejoin="round">
      {/* Left Pitch Decking Panels */}
      <polygon points="150,350 500,150 500,250 250,390" />
      <polygon points="250,390 500,250 500,350 350,430" />
      <polygon points="350,430 500,350 500,450 450,470" />
      <polygon points="450,470 500,450 500,500 500,500" />
      {/* Right Pitch Decking Panels */}
      <polygon points="500,150 850,350 750,390 500,250" fill="#7a5d45" />
      <polygon points="500,250 750,390 650,430 500,350" fill="#7a5d45" />
      <polygon points="500,350 650,430 550,470 500,450" fill="#7a5d45" />
      <polygon points="500,450 550,470 500,500 500,500" fill="#7a5d45" />
    </g>
  );
}
