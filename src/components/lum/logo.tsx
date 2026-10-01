/* Luminari brand mark (from the brand sheet): three rising bars with angled tops,
   the last turning into an L, closed by a C. Drawn on a 312 × 300 grid, currentColor.
   The bars and arc carry classes so the preloader can build the mark piece by piece. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`lum-mark ${className}`} viewBox="0 0 312 300" fill="currentColor" aria-hidden="true" focusable="false">
      <path className="bar b1" d="M0 137 26 112V300H0Z" />
      <path className="bar b2" d="M44 82 70 57V300H44Z" />
      <path className="bar b3" d="M88 27 116 2V267H214V300H88Z" />
      <path className="arc" d="M296.2 142.8A86.5 86.5 0 1 0 296.2 249.2" fill="none" stroke="currentColor" strokeWidth="33" pathLength={1} />
    </svg>
  );
}

/* Full lockup, centred on its own axis: mark, LUMINARI, and CLEANING between two rules.
   `inline` drops the mark beside the wordmark for tight spaces. */
export function Logo({ className = "", mark = true }: { className?: string; mark?: boolean }) {
  return (
    <span className={`logo ${className}`}>
      {mark && <Mark />}
      <b>LUMINARI</b>
      <span><i aria-hidden="true" />CLEANING<i aria-hidden="true" /></span>
    </span>
  );
}
