import { useEffect, useRef, useState } from "react";
import { impact } from "../data/profile.js";

// The hero's signature element: a live "device tracker" that echoes the
// GPS and IoT products Saurabh builds. The pin moves along a route and the
// readout updates with it. Respects reduced-motion.

const ROUTE = "M28 210 C 70 200, 84 150, 132 148 S 196 196, 236 150 S 300 70, 344 86 S 392 40, 432 52";
const ROADS = [
  "M0 120 C 90 110, 150 130, 260 110 S 400 120, 460 100",
  "M120 0 C 130 60, 110 120, 140 190 S 150 250, 150 260",
  "M300 0 C 290 70, 320 130, 310 200 S 330 240, 340 260",
  "M0 230 C 100 225, 200 240, 460 220",
];

export default function TrackerPanel() {
  const routeRef = useRef(null);
  const pinRef = useRef(null);
  const [coords, setCoords] = useState({ lat: 12.9716, lng: 77.5946 });

  useEffect(() => {
    const path = routeRef.current;
    const pin = pinRef.current;
    if (!path || !pin) return;
    const total = path.getTotalLength();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const place = (t) => {
      const pt = path.getPointAtLength(total * t);
      pin.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      setCoords({
        lat: 12.9716 + (210 - pt.y) * 0.00042,
        lng: 77.5946 + (pt.x - 28) * 0.00048,
      });
    };

    if (reduce) { place(0.62); return; }

    let raf, start;
    const loop = (ts) => {
      if (!start) start = ts;
      const t = ((ts - start) / 14000) % 1;
      place(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <figure className="tracker" aria-label="Animated device tracker illustration">
      <div className="tracker__head">
        <span className="tracker__device">Device SK-014</span>
        <span className="tracker__status"><i className="tracker__dot" /> Online</span>
      </div>

      <svg className="tracker__map" viewBox="0 0 460 260" role="presentation">
        <defs>
          <pattern id="grid" width="23" height="23" patternUnits="userSpaceOnUse">
            <path d="M23 0H0V23" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="460" height="260" fill="url(#grid)" />
        {ROADS.map((d, i) => (<path key={i} d={d} fill="none" stroke="var(--road)" strokeWidth="9" strokeLinecap="round" />))}
        <path ref={routeRef} d={ROUTE} fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        <circle cx="28" cy="210" r="6" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" />
        <g ref={pinRef}>
          <circle r="16" fill="var(--pin)" opacity=".28" />
          <path d="M0 -20c-7 0-12 5-12 11 0 8 12 22 12 22s12-14 12-22c0-6-5-11-12-11z" fill="var(--pin)" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cy="-9" r="4" fill="var(--ink)" />
        </g>
      </svg>

      <p className="tracker__coords" aria-hidden="true">
        {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
      </p>

      <dl className="tracker__stats">
        {impact.map((i) => (
          <div key={i.label}>
            <dt>{i.label}</dt>
            <dd>{i.value}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
