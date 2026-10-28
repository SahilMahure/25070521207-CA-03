import "./RotatingBadge.css";

/**
 * Nocturne Atelier — Rotating Circular Stamp Badge
 * text: string of text on the circular path
 * size: number (px, default 120)
 * icon: Material Symbol name (default "local_fire_department")
 */
const RotatingBadge = ({
  text = "FRESHLY ROASTED · BREWED WITH LOVE · NOCTURNE ATELIER ·",
  size = 120,
  icon = "local_fire_department",
  className = "",
}) => {
  const r = (size / 2) - 12;
  const cx = size / 2;
  const cy = size / 2;
  const pathId = `badge-path-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <div
      className={`na-badge-wrap ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        className="na-badge-ring"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <path
          id={pathId}
          d={`M ${cx},${cy} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          fill="transparent"
        />
        <text className="na-badge-text">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      <div className="na-badge-center">
        <span className="material-symbols-outlined na-badge-icon">{icon}</span>
      </div>
    </div>
  );
};

export default RotatingBadge;
