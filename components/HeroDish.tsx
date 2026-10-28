const disks = [
  { x: 250, y: 330, halo: 150, code: 'AMC 30' },
  { x: 480, y: 200, halo: 118, code: 'AZM 15' },
  { x: 430, y: 480, halo: 172, code: 'AMX 10' },
  { x: 665, y: 330, halo: 96, code: 'CIP 5' },
  { x: 285, y: 660, halo: 0, code: 'TET 30' },
  { x: 590, y: 680, halo: 132, code: 'GEN 10' },
];

export default function HeroDish({ label }: { label: string }) {
  return (
    <div className="hero-dish">
      <svg viewBox="0 0 1000 1000" role="img" aria-label={label}>
        <g className="dish-body">
          <circle cx="500" cy="500" r="500" fill="var(--dish)" />
          <circle cx="500" cy="500" r="472" fill="var(--field)" />
        </g>
        {disks.map((d, i) =>
          d.halo ? (
            <circle key={`h${i}`} className="halo-ring" style={{ ['--i' as string]: i }} cx={d.x} cy={d.y} r={d.halo} fill="var(--halo)" />
          ) : null,
        )}
        {disks.map((d, i) => (
          <g key={`d${i}`}>
            <circle cx={d.x} cy={d.y} r="36" fill="var(--paper)" />
            <text x={d.x} y={d.y + 5} textAnchor="middle" fontSize="15" fontWeight="500" fill="var(--field)" fontFamily="var(--font-text)">
              {d.code}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
