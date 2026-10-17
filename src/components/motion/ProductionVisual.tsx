type ProductionVisualProps = { frame?: number };

export function ProductionVisual({ frame = 90 }: ProductionVisualProps) {
  const entrance = 1 - Math.pow(1 - Math.min(1, Math.max(0, frame / 32)), 3);
  const scale = .97 + entrance * .03;
  const seconds = String(Math.floor(frame / 30)).padStart(2, '0');

  return (
    <div data-studio-visual aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 65%, #26443133, transparent 58%)' }} />
      <svg data-property-backdrop viewBox="0 0 800 1000" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} fill="none">
        <defs>
          <linearGradient id="studio-building-shade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1D3B28" stopOpacity=".3" /><stop offset="1" stopColor="#0B160F" stopOpacity=".1" /></linearGradient>
        </defs>
        <g stroke="#85BC94" strokeWidth="1.5" strokeOpacity=".24" strokeLinejoin="round">
          <path d="M 467 905 V 327 H 497 V 263 H 687 V 327 H 725 V 905 Z" fill="url(#studio-building-shade)" />
          <path d="M 725 327 L 769 300 V 878 L 725 905 M 687 263 L 731 238 L 769 300 L 725 327 M 497 263 L 541 238 H 731" />
          <path d="M 517 263 V 245 H 664 V 263 M 534 245 V 227 H 647 V 245" />
          {[352, 429, 506, 583, 660, 737, 814].map((y) => (
            <g key={y}>
              <path d={`M 485 ${y + 46} H 708 V ${y + 62} H 485 Z M 500 ${y + 46} V ${y + 62} M 542 ${y + 46} V ${y + 62} M 584 ${y + 46} V ${y + 62} M 626 ${y + 46} V ${y + 62} M 668 ${y + 46} V ${y + 62} M 708 ${y + 62} L 752 ${y + 36} V ${y + 20} L 708 ${y + 46}`} />
              <path d={`M 502 ${y} H 573 V ${y + 46} H 502 Z M 538 ${y} V ${y + 46} M 612 ${y} H 683 V ${y + 46} H 612 Z M 648 ${y} V ${y + 46}`} strokeOpacity=".16" />
            </g>
          ))}
          <path d="M 485 905 V 883 H 708 V 905 M 558 905 V 873 H 638 V 905 M 598 873 V 905" />
          <path d="M 429 908 H 788" strokeOpacity=".12" />
        </g>
      </svg>
      <svg
        data-recording-phone
        viewBox="0 0 300 620"
        width={300}
        height={620}
        style={{
          position: 'absolute',
          left: '26%',
          top: '37.5%',
          width: '32%',
          height: 'auto',
          opacity: .4 + entrance * .6,
          transform: `translateY(${(1 - entrance) * 20}px) rotate(-7deg) scale(${scale})`,
          filter: 'drop-shadow(0 22px 22px #0006)',
        }}
      >
        <defs>
          <linearGradient id="recording-phone-rim" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9CAEA4" /><stop offset=".2" stopColor="#3B4941" /><stop offset=".6" stopColor="#17241C" /><stop offset="1" stopColor="#687D70" /></linearGradient>
          <linearGradient id="recording-phone-screen-shade" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#0008" /><stop offset=".3" stopColor="#0000" /><stop offset=".7" stopColor="#0000" /><stop offset="1" stopColor="#000B" /></linearGradient>
          <clipPath id="recording-phone-screen"><rect x="11" y="11" width="278" height="598" rx="35" /></clipPath>
        </defs>
        <path d="M 1 110 V 146 M 1 165 V 221 M 299 157 V 230" stroke="#7C8D83" strokeWidth="3" strokeLinecap="round" />
        <rect x="2" y="2" width="296" height="616" rx="44" fill="#080C0A" stroke="url(#recording-phone-rim)" strokeWidth="3" />
        <g clipPath="url(#recording-phone-screen)">
          <image href="/assets/architecture.jpg" x="11" y="11" width="278" height="598" preserveAspectRatio="xMidYMid slice" style={{ transformOrigin: '150px 310px', transform: `scale(${1.08 - Math.min(frame, 135) * .0003})` }} />
          <rect x="11" y="11" width="278" height="598" fill="url(#recording-phone-screen-shade)" />
          <g fill="white" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500" letterSpacing="1">
            <circle cx="38" cy="68" r="3.5" fill="#F46E68" opacity={frame % 36 < 24 ? 1 : .6} />
            <text x="49" y="72">REC</text>
            <text x="217" y="72" textAnchor="middle" style={{ fontVariantNumeric: 'tabular-nums' }}>00:{seconds}</text>
          </g>
          <path d="M 79 225 H 96 M 79 225 V 242 M 221 225 H 204 M 221 225 V 242 M 79 367 H 96 M 79 367 V 350 M 221 367 H 204 M 221 367 V 350" fill="none" stroke="white" strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="150" cy="491" r="17" fill="#0A130CA0" stroke="#FFFFFF40" strokeWidth=".8" />
          <text x="150" y="495" textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif">1×</text>
          <circle cx="150" cy="550" r="30" fill="#0002" stroke="white" strokeWidth="2.5" />
          <rect x="138" y="538" width="24" height="24" rx="5" fill="#ED6059" />
          <path d="M 113 593 H 187" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </g>
        <rect x="110" y="21" width="80" height="21" rx="10.5" fill="#080C0A" />
        <circle cx="173" cy="31.5" r="3" fill="#172D22" />
      </svg>
    </div>
  );
}

export function EditTimeline({ frame }: { frame: number }) {
  const playhead = 52 + (frame % 120) * 1.7;
  return (
    <svg viewBox="0 0 310 480" width="100%" height="100%" aria-hidden="true">
      <rect width="310" height="480" fill="#0D1C13" />
      <rect x="18" y="65" width="274" height="200" rx="12" fill="#182F20" stroke="#3D6247" />
      <rect x="74" y="111" width="107" height="74" rx="13" fill="#1E442B" stroke="#86DE98" />
      <path d="M 181 129 L 216 111 V 185 L 181 166 Z" fill="#335F3F" stroke="#86DE98" />
      <path d="M 30 78 H 54 M 30 78 V 102 M 280 78 H 256 M 280 78 V 102 M 30 252 H 54 M 30 252 V 228 M 280 252 H 256 M 280 252 V 228" fill="none" stroke="#608A69" />
      <text x="155" y="226" textAnchor="middle" fill="#9EBDA6" fontFamily="Sora, sans-serif" fontSize="10" letterSpacing="2">SEU CONTEÚDO EM FOCO</text>
      <text x="22" y="299" fill="#8FAB97" fontFamily="Sora, sans-serif" fontSize="10" letterSpacing="2">EDIÇÃO + ESTRATÉGIA</text>
      {[0, 1, 2].map((track) => (
        <g key={track}>
          <rect x="22" y={319 + track * 39} width="266" height="29" rx="5" fill="#142A1C" />
          <rect x={31 + track * 13} y={324 + track * 39} width={track === 1 ? 143 : 207} height="19" rx="4" fill={track === 1 ? '#509361' : '#2E6B40'} />
          {Array.from({ length: 16 }, (_, i) => <path key={i} d={'M ' + (45 + i * 11) + ' ' + (330 + track * 39) + ' v ' + (5 + Math.sin(i * 2 + track) * 3)} stroke="#A5D5AF" strokeWidth="1.2" opacity=".5" />)}
        </g>
      ))}
      <path d={'M ' + playhead + ' 313 V 437'} stroke="#B5F2C2" strokeWidth="1.5" />
      <circle cx={playhead} cy="312" r="3" fill="#B5F2C2" />
    </svg>
  );
}
