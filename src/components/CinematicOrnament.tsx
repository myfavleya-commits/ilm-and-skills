import type { CSSProperties } from 'react';

// Abstract architecture only. No calligraphy or sacred text is used as ornament.
export function ArchPortal() {
  return (
    <div className="arch-portal" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((layer) => (
        <svg
          key={layer}
          viewBox="0 0 700 850"
          fill="none"
          className="portal-arch"
          style={{ '--arch-layer': layer } as CSSProperties}
        >
          <path
            d="M32 850V386C32 219 203 132 350 24c147 108 318 195 318 362v464"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M42 850V390C42 228 210 140 350 36c140 104 308 192 308 354v460"
            stroke="currentColor"
            strokeOpacity=".35"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ))}
      <span className="portal-horizon" />
    </div>
  );
}

export function GeometricSeal() {
  return (
    <svg
      className="geometric-seal"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="seal-face"
        d="M100 3 126 74 197 100 126 126 100 197 74 126 3 100 74 74Z"
        fill="var(--parchment)"
        stroke="currentColor"
      />
      <path
        d="m100 23 21 56 56 21-56 21-21 56-21-56-56-21 56-21Z"
        stroke="currentColor"
        strokeWidth=".5"
      />
      <path
        d="m100 62 27 11 11 27-11 27-27 11-27-11-11-27 11-27Z"
        stroke="currentColor"
        strokeWidth=".5"
      />
      <path d="m100 84 16 16-16 16-16-16Z" fill="var(--emerald)" />
      <circle cx="100" cy="100" r="3" fill="var(--crimson)" />
    </svg>
  );
}
