"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Tumble } from "./cta";

/* The final inspection, as a wipe. The clean room sits underneath; on top, a canvas
   holds the dirty room plus its dirt (coffee rings, crumbs, smears, grime, dust).
   Dragging a pointer or finger across wipes that layer away, sparkles trailing.
   Nothing says where to look: each problem area registers as the cloth passes over
   it — a burst, and the panel names what was found. Find all six, or clean most of
   the room, and the rest goes in one sweep. */
type Spot = { id: string; name: string; found: string; box: [number, number, number, number] };
// box: left, top, width, height as fractions of the scene
const spots: Spot[] = [
  { id: "table", name: "Table surface", found: "Coffee rings, gone. They blend into the grain until someone puts their notes down.", box: [.36, .44, .11, .13] },
  { id: "under", name: "Under the table", found: "Crumbs below a tidy tabletop. Accessible floor areas count too.", box: [.40, .74, .14, .15] },
  { id: "glass", name: "Glass", found: "Fingerprints on the glass. You only see them from an angle — so does every visitor.", box: [.90, .14, .10, .30] },
  { id: "bins", name: "Waste bins", found: "Bin emptied, liner replaced. The thing nobody mentions until it’s full.", box: [.88, .72, .12, .28] },
  { id: "touch", name: "Touchpoints", found: "Handles and switches wiped. The most touched surfaces in the room.", box: [0, .28, .08, .13] },
  { id: "floor", name: "Floor edges", found: "Dust along the edges, outside the main walkway. Cleaned.", box: [.06, .50, .16, .22] },
];
const COLS = 32, ROWS = 18;
const SPOT_DONE = .5; // share of an area's cells that must be wiped before it counts
// the coverage cells that fall inside each area
const spotCells = spots.map((s) => {
  const out: number[] = [];
  for (let i = 0; i < COLS; i++) for (let j = 0; j < ROWS; j++) {
    const cx = (i + .5) / COLS, cy = (j + .5) / ROWS;
    if (cx >= s.box[0] && cx <= s.box[0] + s.box[2] && cy >= s.box[1] && cy <= s.box[1] + s.box[3]) out.push(j * COLS + i);
  }
  return out;
});
const fmt = (ms: number) => { const s = Math.round(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

export function Inspection() {
  const scene = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<HTMLDivElement>(null);
  const cur = useRef<HTMLSpanElement>(null);
  const seen = useRef(new Set<number>());
  const lastSpark = useRef(0);
  const start = useRef<number | null>(null);
  const burstId = useRef(0);
  const [found, setFound] = useState<string[]>([]);
  const [last, setLast] = useState<Spot | null>(null);
  const [done, setDone] = useState(false);
  const [time, setTime] = useState(0);
  const [bursts, setBursts] = useState<{ k: number; x: number; y: number }[]>([]);
  const [round, setRound] = useState(0);
  const foundRef = useRef<string[]>([]);
  const doneRef = useRef(false);

  // paint the dirty room + its dirt; repaint on resize and on "Mess it up again"
  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const img = new Image();
    img.src = "/images/challenge-room.jpg";
    const paint = () => {
      if (doneRef.current || !img.complete) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = c.clientWidth, h = c.clientHeight;
      c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      const x = c.getContext("2d");
      if (!x) return;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.globalCompositeOperation = "source-over";
      // the whole room: dim, washed out and yellowed, so every wipe is obvious
      x.filter = "brightness(.62) saturate(.45) sepia(.4) contrast(.9)";
      x.drawImage(img, 0, 0, w, h);
      x.filter = "none";
      x.fillStyle = "rgba(70,56,36,.28)"; x.fillRect(0, 0, w, h);
      const vig = x.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, w * .75);
      vig.addColorStop(0, "rgba(40,32,22,0)"); vig.addColorStop(1, "rgba(40,32,22,.45)");
      x.fillStyle = vig; x.fillRect(0, 0, w, h);
      for (let i = 0; i < (w * h) / 1400; i++) {
        x.fillStyle = Math.random() > .5 ? `rgba(30,24,18,${Math.random() * .35})` : `rgba(210,196,170,${Math.random() * .2})`;
        const s = Math.random() * 2; x.fillRect(Math.random() * w, Math.random() * h, s, s);
      }
      seen.current.clear();
    };
    img.onload = paint;
    let t = 0;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(paint, 150); };
    window.addEventListener("resize", onResize);
    if (img.complete) paint();
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [round]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setDone(true);
    if (start.current) setTime(performance.now() - start.current);
  };

  // the cloth: a large ring that follows the pointer over the dirty room
  const moveCloth = (e: React.PointerEvent) => {
    const el = cur.current, c = cvs.current;
    if (!el || !c || e.pointerType !== "mouse") return;
    const b = c.getBoundingClientRect();
    el.style.transform = `translate(${e.clientX - b.left}px, ${e.clientY - b.top}px)`;
    el.classList.add("on");
  };
  const hideCloth = () => cur.current?.classList.remove("on");

  const wipe = (e: React.PointerEvent) => {
    moveCloth(e);
    const c = cvs.current;
    if (!c || doneRef.current) return;
    const b = c.getBoundingClientRect();
    const px = e.clientX - b.left, py = e.clientY - b.top;
    const x = c.getContext("2d");
    if (!x) return;
    start.current ??= performance.now();
    const r = 60; // matches the 120px .game-cloth ring
    x.globalCompositeOperation = "destination-out";
    const g = x.createRadialGradient(px, py, 0, px, py, r);
    g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(.85, "rgba(0,0,0,.95)"); g.addColorStop(1, "rgba(0,0,0,0)");
    x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();

    // coverage, and any problem area the cloth just passed over
    const cw = b.width / COLS, ch = b.height / ROWS;
    for (let i = Math.floor((px - r * .7) / cw); i <= Math.floor((px + r * .7) / cw); i++)
      for (let j = Math.floor((py - r * .7) / ch); j <= Math.floor((py + r * .7) / ch); j++)
        if (i >= 0 && j >= 0 && i < COLS && j < ROWS) seen.current.add(j * COLS + i);
    const fx = px / b.width, fy = py / b.height;
    // an area is found once most of it has actually been wiped, not when the cloth grazes it
    const hit = spots.find((s, k) => !foundRef.current.includes(s.id) && spotCells[k].length > 0 &&
      spotCells[k].filter((c) => seen.current.has(c)).length / spotCells[k].length >= SPOT_DONE);
    if (hit) {
      foundRef.current = [...foundRef.current, hit.id];
      setFound(foundRef.current);
      setLast(hit);
      const k = ++burstId.current;
      setBursts((v) => [...v, { k, x: fx * 100, y: fy * 100 }]);
      window.setTimeout(() => setBursts((v) => v.filter((q) => q.k !== k)), 1100);
      if (foundRef.current.length === spots.length) finish();
    }
    if (seen.current.size / (COLS * ROWS) > .72) finish();

    const now = performance.now();
    if (now - lastSpark.current > 45 && sparks.current) {
      lastSpark.current = now;
      const s = document.createElement("i");
      s.className = "spark";
      s.style.left = `${px + (Math.random() - .5) * r}px`;
      s.style.top = `${py + (Math.random() - .5) * r}px`;
      s.style.setProperty("--s", String(.6 + Math.random() * .9));
      sparks.current.appendChild(s);
      window.setTimeout(() => s.remove(), 900);
    }
  };

  const reset = () => {
    doneRef.current = false; foundRef.current = []; start.current = null;
    setDone(false); setFound([]); setLast(null); setTime(0); setRound((n) => n + 1);
  };

  return (
    <div className="game">
      <div ref={scene} className={`game-scene ${done ? "spotless" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="game-clean" src="/images/challenge-clean.jpg" alt="Illustrative meeting room that needs a closer look" />
        <canvas key={round} ref={cvs} className="game-canvas" aria-hidden="true" onPointerMove={wipe} onPointerDown={wipe} onPointerLeave={hideCloth} />
        {!done && <span ref={cur} className="game-cloth" aria-hidden="true" />}
        <div ref={sparks} className="game-sparks" aria-hidden="true" />
        <i className="game-sweep" aria-hidden="true" />
        {bursts.map((b) => (
          <span key={b.k} className="game-burst" style={{ left: `${b.x}%`, top: `${b.y}%` }} aria-hidden="true">
            {Array.from({ length: 10 }, (_, n) => <i key={n} style={{ ["--a" as string]: `${n * 36}deg` }}><Sparkles strokeWidth={1.5} /></i>)}
          </span>
        ))}
        <div className="game-count" aria-hidden="true">
          {spots.map((s) => <i key={s.id} className={found.includes(s.id) ? "on" : ""} />)}
        </div>
        {/* keyboard and screen-reader path: the same result without a pointer */}
        {!done && <button type="button" className="game-kbd" onClick={() => { foundRef.current = spots.map((s) => s.id); setFound(foundRef.current); finish(); }}>Clean the whole room</button>}
      </div>

      <div className="game-panel" aria-live="polite">
        <p className="eyebrow">{done ? (time ? `Spotless in ${fmt(time)}` : "Spotless") : `${found.length} of ${spots.length} found`}</p>
        {done ? (
          <>
            <h3>Every detail, handled.</h3>
            <p className="body">That’s the difference a final look makes — and what your space should feel like every morning.</p>
            <div className="game-ctas">
              <a className="cta cta-main cta-icon" href="#walkthrough" aria-label="Request an assessment"><Tumble>Request an assessment</Tumble><ArrowRight strokeWidth={1.5} aria-hidden="true" /></a>
              <button type="button" className="cta cta-secondary cta-icon" aria-label="Mess it up again" onClick={reset}><Tumble>Mess it up again</Tumble><RotateCcw strokeWidth={1.5} aria-hidden="true" /></button>
            </div>
          </>
        ) : last ? (
          <><h3 key={last.id}>{last.name}.</h3><p className="body">{last.found}</p></>
        ) : (
          <><h3>Something’s not right in here.</h3><p className="body">Take a closer look.</p></>
        )}
      </div>
    </div>
  );
}
