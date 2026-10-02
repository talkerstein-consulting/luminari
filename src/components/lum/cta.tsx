import type { CSSProperties } from "react";
import type React from "react";

/* Per-letter stagger for the tumble (Aria Noir: --stagger-char). */
const STEP_MS = 22;

/* Every glyph stacked over a duplicate of itself in its own clip box: on
   hover one lifts out and the other in, a beat behind the last, so the
   label reads as a wave. The rule under it sweeps left to right. */
export function Tumble({ children }: { children: string }) {
  return (
    <span className="cta-chars" aria-hidden="true">
      {Array.from(children).map((ch, i) => (
        <span key={i} className="cta-char" style={{ "--d": `${i * STEP_MS}ms` } as CSSProperties}>
          <span className="cta-char-clip">
            <span className="cta-char-line">{ch === " " ? " " : ch}</span>
            <span className="cta-char-line">{ch === " " ? " " : ch}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

/* Two CTAs. Main is the outlined box; secondary is the underline alone. */
export function Cta({ href, children, kind = "main", className = "", label, onClick }: {
  href: string; children: string; kind?: "main" | "secondary"; className?: string; label?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a href={href} onClick={onClick} aria-label={label ?? children} className={`cta cta-${kind} ${className}`}>
      <Tumble>{children}</Tumble>
    </a>
  );
}
