"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, LockKeyhole, RotateCcw } from "lucide-react";
import { Tumble } from "./cta";

/* "Is your current cleaning company actually doing a good job?"
   Eight questions, one at a time. The score is ready at the end, but it is shown
   only after an email — the result is the reason to leave one. */
const questions: { q: string; good: string }[] = [
  { q: "The same team shows up, and they know your space.", good: "A regular team learns your layout, your priorities and the small things that matter." },
  { q: "Washrooms and kitchens are right every visit, not just most visits.", good: "The rooms people judge you by should be consistent, every time." },
  { q: "You never have to make the same request twice.", good: "A request made once should become part of the routine." },
  { q: "Handles, switches and shared desks are cleaned on schedule.", good: "High-touch surfaces need attention on a set frequency, not when someone notices." },
  { q: "You get a record of what was done after each visit.", good: "A short completion record shows what was handled, and what wasn’t." },
  { q: "There’s one person you can reach, and they answer.", good: "One point of contact who takes responsibility when something needs attention." },
  { q: "Problems are flagged to you before you notice them.", good: "A good team reports issues — a leak, a broken dispenser — before they become yours." },
  { q: "Supplies are restocked before they run out.", good: "Paper, soap and liners should never be the thing staff or visitors notice." },
];
const answers = [["Always", 2], ["Sometimes", 1], ["Rarely", 0]] as const;
const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.trim());

function band(pct: number) {
  if (pct >= 85) return ["In good hands.", "Your current service is doing the job. Keep holding it to this standard."];
  if (pct >= 60) return ["Room to improve.", "The basics are there, but the gaps below are the ones people notice first."];
  return ["Time for a change.", "Your cleaning arrangement is creating work for you instead of taking it away."];
}

export function Assessment() {
  const [stage, setStage] = useState<"quiz" | "gate" | "result">("quiz");
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);

  const score = picks.reduce((a, b) => a + b, 0);
  const pct = Math.round((score / (questions.length * 2)) * 100);
  const [title, line] = band(pct);
  const weak = questions.map((q, k) => ({ ...q, v: picks[k] })).filter((q) => q.v < 2).sort((a, b) => a.v - b.v);

  const answer = (v: number) => {
    const next = [...picks.slice(0, i), v];
    setPicks(next);
    if (i < questions.length - 1) setI(i + 1);
    else setStage("gate");
  };

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!emailOk(email) || sending) return;
    setSending(true);
    // the lead is sent if the site is configured to; the result is shown either way
    await fetch("/api/assessment", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, score: pct, answers: picks }),
    }).catch(() => null);
    setSending(false);
    setStage("result");
  };

  const restart = () => { setStage("quiz"); setI(0); setPicks([]); };

  return (
    <div className="asmt" aria-live="polite">
      {/* progress is drawn as the container's outline, tracing round as questions are answered */}
      <svg className="asmt-ring" aria-hidden="true" preserveAspectRatio="none">
        <rect x="0" y="0" width="100%" height="100%" pathLength={100}
          style={{ strokeDasharray: `${stage === "quiz" ? (i / questions.length) * 100 : 100} 100` }} />
      </svg>

      {stage === "quiz" && (
        <div className="asmt-q" key={i}>
          <p className="eyebrow">Question {i + 1} of {questions.length}</p>
          <h3>{questions[i].q}</h3>
          <div className="asmt-opts" role="group" aria-label="Your answer">
            {answers.map(([label, v]) => (
              <button key={label} type="button" className={picks[i] === v ? "on" : ""} onClick={() => answer(v)}>{label}</button>
            ))}
          </div>
          {i > 0 && (
            <button type="button" className="asmt-back" onClick={() => setI(i - 1)}><ArrowLeft strokeWidth={1.5} aria-hidden="true" /> Back</button>
          )}
        </div>
      )}

      {stage === "gate" && (
        <form className="asmt-gate" onSubmit={unlock} noValidate>
          <LockKeyhole strokeWidth={1.25} aria-hidden="true" />
          <h3>Your score is ready.</h3>
          <p className="body">Where should we send your results? You’ll see them right away.</p>
          <div className="asmt-fields">
            <label className="field"><span>Name <em>(optional)</em></span><input autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></label>
            <label className={`field ${tried && !emailOk(email) ? "err" : ""}`}>
              <span>Work email</span>
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={(tried && !emailOk(email)) || undefined} required />
            </label>
          </div>
          <p className="form-msg" role="alert">{tried && !emailOk(email) ? "Enter a complete email address to see your score." : ""}</p>
          <button type="submit" className={`cta cta-main cta-icon ${sending ? "is-busy" : ""}`} aria-label="Show my results" disabled={sending}>
            <Tumble>Show my results</Tumble><ArrowRight strokeWidth={1.5} aria-hidden="true" />
          </button>
          <p className="asmt-fine">One email with your results, and a single follow-up. No newsletters.</p>
        </form>
      )}

      {stage === "result" && (
        <div className="asmt-result">
          <div className="asmt-score" style={{ ["--v" as string]: pct }}>
            <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" /><circle cx="60" cy="60" r="54" pathLength={100} /></svg>
            <span><b>{pct}</b>/100</span>
          </div>
          <div className="asmt-read">
            <p className="eyebrow">Your result</p>
            <h3>{title}</h3>
            <p className="body">{line}</p>
            {weak.length > 0 ? (
              <ul className="asmt-weak">
                {weak.slice(0, 4).map((w) => (
                  <li key={w.q}><strong>{w.v === 0 ? "Rarely" : "Sometimes"}: {w.q}</strong> {w.good}</li>
                ))}
              </ul>
            ) : (
              <p className="asmt-all"><Check strokeWidth={1.5} aria-hidden="true" /> Every answer was “Always”. That’s rare.</p>
            )}
            <div className="asmt-ctas">
              <a className="cta cta-main cta-icon" href="#walkthrough" aria-label="Request an assessment"><Tumble>Request an assessment</Tumble><ArrowRight strokeWidth={1.5} aria-hidden="true" /></a>
              <button type="button" className="cta cta-secondary cta-icon" aria-label="Retake" onClick={restart}><Tumble>Retake</Tumble><RotateCcw strokeWidth={1.5} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
