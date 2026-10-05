import { Reveal } from "./interactive";
import { cover, services } from "./services";

/* The seven services as cover-photo cards. Used on the home page and /services.
   The first card is wide, so seven cards fill two rows of four. */
export function ServiceCards() {
  return (
    <ul className="scards">
      {services.map((s, i) => (
        <Reveal as="li" key={s.id} delay={(i % 4) * 80}>
          <a href={`/services/${s.id}`}>
            <div className="scards-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover(s.id)} alt="" width={2400} height={1600} loading="lazy" decoding="async" />
            </div>
            <span className="eyebrow">{s.tag}</span>
            <h3 className="h3">{s.title}</h3>
            <p className="body">{s.body}</p>
          </a>
        </Reveal>
      ))}
    </ul>
  );
}
