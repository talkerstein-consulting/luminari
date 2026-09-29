"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ListChecks, Plus, RotateCcw } from "lucide-react";
import { Tumble } from "./cta";

/* The final inspection: six hotspots on the dirty room. Open one, then wipe (drag across
   the pad) or press to clean it — the clean photo is revealed in that area only. Then a
   two-step handover, then a sign-off that lists anything missed. Copy is the original's. */
const details: [string, string, string, number, number][] = [
  ["Table surface", "Coffee rings blend into the grain. Wipe the tabletop before calling it ready.", "Wipe the table", 40.7, 50],
  ["Under the table", "A tidy tabletop can hide crumbs below. Accessible floor areas count too.", "Clean beneath the table", 47, 82],
  ["Glass", "Look at glass from an angle to notice fingerprints.", "Polish the glass", 94, 28],
  ["Waste bins", "Empty the bin and replace the liner where included in the scope.", "Empty the bin", 95, 85],
  ["Touchpoints", "Agreed frequently touched surfaces need attention.", "Clean the touchpoint", 5, 34.7],
  ["Floor edges", "Accessible edges can collect dust outside the main walkway.", "Clean the floor edge", 13, 59],
];
/* where each detail's clean patch shows through */
const patches = [
  "inset(44% 53% 43% 36%)", "inset(74% 46% 11% 40%)", "inset(14% 0% 56% 90%)",
  "inset(72% 0% 0% 88%)", "inset(28% 92% 59% 0%)", "inset(50% 78% 28% 6%)",
];
const ic = { strokeWidth: 1.5, "aria-hidden": true } as const;

/* A tumbling CTA with a trailing lucide icon; the label is the accessible name. */
function Btn({ label, icon, kind = "main", onClick, href }: { label: string; icon?: ReactNode; kind?: "main" | "secondary"; onClick?: () => void; href?: string }) {
  const cls = `cta cta-${kind} cta-icon`;
  const inner = <><Tumble>{label}</Tumble>{icon}</>;
  return href
    ? <a className={cls} href={href} aria-label={label}>{inner}</a>
    : <button type="button" className={cls} onClick={onClick} aria-label={label}>{inner}</button>;
}

export function Inspection() {
  const [cleaned, setCleaned] = useState<number[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [stage, setStage] = useState<0 | 1 | 2>(0); // room · handover · sign-off
  const [record, setRecord] = useState(false);
  const [review, setReview] = useState(false);
  const [wipe, setWipe] = useState(0);
  const [list, setList] = useState(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const inspect = (i: number) => { setOpen(i); setWipe(0); };
  const markClean = (i: number) => setCleaned((c) => (c.includes(i) ? c : [...c, i]));
  const finish = () => { if (open !== null) markClean(open); setWipe(100); };
  const onWipe = (e: React.PointerEvent) => {
    if (!last.current || open === null) return;
    const d = Math.hypot(e.clientX - last.current.x, e.clientY - last.current.y);
    last.current = { x: e.clientX, y: e.clientY };
    setWipe((w) => { const n = Math.min(100, w + d / 2); if (n === 100) markClean(open); return n; });
  };
  const reset = () => { setCleaned([]); setOpen(null); setStage(0); setRecord(false); setReview(false); setWipe(0); setList(false); };
  const done = (i: number) => cleaned.includes(i);

  return (
    <div className="insp">
      <div className={`insp-scene ${open !== null && stage === 0 ? "has-action" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/challenge-room.jpg" alt="Illustrative meeting room with areas to inspect and clean" />
        {cleaned.map((i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} className="insp-patch" src="/images/challenge-clean.jpg" alt="" style={{ clipPath: patches[i] }} />
        ))}
        {details.map((d, i) => (
          <button key={d[0]} type="button" style={{ left: `${d[3]}%`, top: `${d[4]}%` }}
            className={`insp-spot ${done(i) ? "done" : ""} ${stage === 2 && !done(i) ? "missed" : ""} ${open === i && stage === 0 ? "active" : ""}`}
            aria-label={`Inspect ${d[0]}`} aria-pressed={open === i && stage === 0}
            onClick={() => { if (stage === 0) inspect(i); }}>
            {done(i) ? <Check {...ic} /> : list || stage === 2 ? <span>{i + 1}</span> : <Plus {...ic} />}
          </button>
        ))}
        {open !== null && stage === 0 && (
          <div className="insp-action">
            <div className="insp-pad"
              onPointerDown={(e) => { last.current = { x: e.clientX, y: e.clientY }; try { e.currentTarget.setPointerCapture(e.pointerId); } catch {} }}
              onPointerMove={onWipe} onPointerUp={() => { last.current = null; }} onPointerCancel={() => { last.current = null; }}>
              <i style={{ width: `${done(open) ? 100 : wipe}%` }} />
              <span>{done(open) ? <><Check {...ic} /> Ready for the next person</> : `Swipe here to ${details[open][2].toLowerCase()}`}</span>
            </div>
            <button type="button" className="insp-do" onClick={finish} disabled={done(open)}>
              {done(open) ? "Completed" : details[open][2]} <Check {...ic} />
            </button>
          </div>
        )}
        <span className="insp-caption">Illustrative cleaning activity · No timer</span>
      </div>

      <div className="insp-panel" aria-live="polite">
        <div className="insp-status">
          <p className="eyebrow">{stage === 2 ? "Your sign-off" : `${cleaned.length} / 6 details cleaned`}</p>
          <div className="insp-meter" aria-hidden="true"><i style={{ width: `${(cleaned.length / 6) * 100}%` }} /></div>
        </div>

        {stage === 0 && (
          <>
            <div className="insp-copy">
              <h3>{open === null ? "What would you notice?" : details[open][0]}</h3>
              <p className="body">{open === null ? "Inspect the room, then complete each cleaning action. Opening a detail doesn’t clean it. Remember: the visit also needs a completion record and issue review." : details[open][1]}</p>
              {list && (
                <ul className="insp-tasks">
                  {details.map((d, i) => (
                    <li key={d[0]}><button type="button" className={done(i) ? "done" : ""} onClick={() => inspect(i)}>
                      <span>{done(i) ? <Check {...ic} /> : i + 1}</span>{d[0]}
                    </button></li>
                  ))}
                </ul>
              )}
            </div>
            <div className="insp-actions">
              <Btn label="The room is ready" icon={<ArrowRight {...ic} />} onClick={() => setStage(1)} />
              <Btn kind="secondary" label={`${list ? "Hide" : "Show"} inspection checklist`} icon={<ListChecks {...ic} />} onClick={() => setList((l) => !l)} />
            </div>
          </>
        )}

        {stage === 1 && (
          <>
            <div className="insp-copy">
              <h3>Finish the follow-through.</h3>
              <p className="body">A clean room and a clear handover work together.</p>
              <label className="insp-check"><input type="checkbox" checked={record} onChange={(e) => setRecord(e.target.checked)} /><span><Check {...ic} /></span> Record the completed work</label>
              <label className="insp-check"><input type="checkbox" checked={review} onChange={(e) => setReview(e.target.checked)} /><span><Check {...ic} /></span> Review and flag outstanding issues</label>
            </div>
            <div className="insp-actions">
              <Btn label="See my result" icon={<ArrowUpRight {...ic} />} onClick={() => setStage(2)} />
              <Btn kind="secondary" label="Return to the room" icon={<ArrowLeft {...ic} />} onClick={() => setStage(0)} />
            </div>
          </>
        )}

        {stage === 2 && (
          <>
            <div className="insp-copy">
              <h3>{cleaned.length === 6 && record && review ? "An eye for the whole picture." : "Easy to miss. Worth noticing."}</h3>
              <p className="body">You cleaned {cleaned.length} of 6 details and completed {Number(record) + Number(review)} of 2 handover steps.</p>
              <div className="insp-missed">
                {details.filter((_, i) => !done(i)).map((d) => <p key={d[0]}><strong>Missed: {d[0]}.</strong> {d[1]}</p>)}
                {!record && <p><strong>Missing record.</strong> Let the client know what was completed.</p>}
                {!review && <p><strong>Missing issue review.</strong> Flag anything that needs further attention.</p>}
              </div>
            </div>
            <div className="insp-actions">
              <Btn label="How is your own setup working?" icon={<ArrowUpRight {...ic} />} href="#walkthrough" />
              <Btn kind="secondary" label="Try again" icon={<RotateCcw {...ic} />} onClick={reset} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
