export function ProtectionLayer() {
  return (
    <g className="layer-protection">
      {/* Waterproofing Underlayment - Dark Blue/Grey */}
      <polygon points="150,350 500,150 500,500 150,350" fill="#2a3038" stroke="#1d2228" strokeWidth="2" strokeLinejoin="round" />
      <polygon points="500,150 850,350 500,500 500,150" fill="#1d2228" stroke="#15191d" strokeWidth="2" strokeLinejoin="round" />
      {/* Overlay grid lines for underlayment rolls */}
      <path d="M 220,310 L 500,200" stroke="#15191d" strokeWidth="2" />
      <path d="M 290,340 L 500,250" stroke="#15191d" strokeWidth="2" />
      <path d="M 360,370 L 500,300" stroke="#15191d" strokeWidth="2" />
      <path d="M 430,400 L 500,350" stroke="#15191d" strokeWidth="2" />
      
      <path d="M 780,310 L 500,200" stroke="#111417" strokeWidth="2" />
      <path d="M 710,340 L 500,250" stroke="#111417" strokeWidth="2" />
      <path d="M 640,370 L 500,300" stroke="#111417" strokeWidth="2" />
      <path d="M 570,400 L 500,350" stroke="#111417" strokeWidth="2" />
    </g>
  );
}
