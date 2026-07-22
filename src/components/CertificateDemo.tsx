interface CertificateDemoProps {
  level: string;
  studentLabel: string;
  courseLabel: string;
  dateLabel: string;
  signatureLabel: string;
  exampleLabel: string;
}

export default function CertificateDemo({
  level,
  studentLabel,
  courseLabel,
  dateLabel,
  signatureLabel,
  exampleLabel,
}: CertificateDemoProps) {
  return (
    <svg
      viewBox="0 0 800 540"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto rounded-xl shadow-md"
      role="img"
      aria-label="Certificate demo"
    >
      <rect x="0" y="0" width="800" height="540" fill="#F5F0E8" />

      {/* Outer + inner border frame */}
      <rect x="18" y="18" width="764" height="504" fill="none" stroke="#1B4332" strokeWidth="3" />
      <rect x="30" y="30" width="740" height="480" fill="none" stroke="#D00000" strokeWidth="1.2" />

      {/* Corner ornaments */}
      {[[18, 18], [782, 18], [18, 522], [782, 522]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill="#D00000" />
      ))}

      {/* Watermark example ribbon */}
      <g transform="translate(650,60) rotate(35)">
        <rect x="-60" y="-14" width="150" height="28" fill="#D00000" opacity="0.9" />
        <text x="15" y="6" textAnchor="middle" fontSize="14" fontWeight="700" fill="white" fontFamily="Inter, sans-serif" letterSpacing="1">
          {exampleLabel.toUpperCase()}
        </text>
      </g>

      {/* Seal / badge */}
      <g transform="translate(400,95)">
        <circle r="34" fill="#1B4332" />
        <circle r="27" fill="none" stroke="#F2A900" strokeWidth="2.5" />
        <path
          d="M0 -13 L4 -3 L15 -3 L6 3 L9 14 L0 7 L-9 14 L-6 3 L-15 -3 L-4 -3 Z"
          fill="#F2A900"
        />
      </g>

      {/* FN Formation wordmark */}
      <text x="400" y="158" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1B4332" fontFamily="Inter, sans-serif" letterSpacing="3">
        FN FORMATION
      </text>

      {/* Title */}
      <text x="400" y="205" textAnchor="middle" fontSize="34" fontWeight="700" fill="#1A1A1A" fontFamily="'Cormorant Garamond', Georgia, serif" letterSpacing="1">
        Certificat de Réussite
      </text>

      <line x1="300" y1="222" x2="500" y2="222" stroke="#D00000" strokeWidth="1.5" />

      {/* Body */}
      <text x="400" y="262" textAnchor="middle" fontSize="13" fill="#6B5B4F" fontFamily="Inter, sans-serif">
        {studentLabel}
      </text>
      <text x="400" y="300" textAnchor="middle" fontSize="28" fontWeight="700" fill="#1B4332" fontFamily="'Cormorant Garamond', Georgia, serif">
        Prénom NOM
      </text>

      <foreignObject x="120" y="325" width="560" height="90">
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#6B5B4F',
            textAlign: 'center',
          }}
        >
          {courseLabel.replace('{level}', level)}
        </div>
      </foreignObject>

      {/* Signature + date lines */}
      <line x1="90" y1="460" x2="270" y2="460" stroke="#6B5B4F" strokeWidth="1" />
      <text x="180" y="480" textAnchor="middle" fontSize="11" fill="#6B5B4F" fontFamily="Inter, sans-serif">
        {dateLabel}
      </text>

      <line x1="530" y1="460" x2="710" y2="460" stroke="#6B5B4F" strokeWidth="1" />
      <text x="620" y="480" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1A1A1A" fontFamily="Inter, sans-serif">
        {signatureLabel}
      </text>
      <text x="620" y="494" textAnchor="middle" fontSize="9" fill="#6B5B4F" fontFamily="Inter, sans-serif">
        FN Formation
      </text>
    </svg>
  );
}
