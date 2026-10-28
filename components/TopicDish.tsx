'use client';

import { useEffect, useRef, useState } from 'react';
import { topics, type Dict } from '@/lib/content';

const pos: Record<number, { x: number; y: number }> = {
  0: { x: 31, y: 33 },
  1: { x: 68, y: 29 },
  4: { x: 33, y: 70 },
  5: { x: 69, y: 67 },
};

export default function TopicDish({ t, locale }: { t: Dict['dish']; locale: string }) {
  const [selected, setSelected] = useState(0);
  const [shown, setShown] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const fmt = new Intl.NumberFormat(locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 });

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function choose(id: number) {
    if (id === selected) return;
    setSelected(id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(id);
      return;
    }
    setSwapping(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setShown(id);
      setSwapping(false);
    }, 200);
  }

  const topic = topics.find((x) => x.id === shown)!;
  const info = t.topics[shown];
  const max = Math.max(...topics.flatMap((x) => x.words.map((w) => w.v)));

  return (
    <section className="field section wrap" id="achados" aria-labelledby="dish-title">
      <div className="dish-section">
        <div className="dish-head section-title">
          <h2 className="head" id="dish-title" data-reveal>
            {t.title}
          </h2>
          <p data-reveal style={{ ['--i' as string]: 1 }}>
            {t.lead}
          </p>
        </div>
        <div className="dish" data-reveal>
          <svg className="dish-bg" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="50" fill="var(--dish)" />
            <circle cx="50" cy="50" r="47" fill="#3b1c31" />
          </svg>
          {topics.map((x) => (
            <button
              key={x.id}
              type="button"
              className="dish-disk"
              aria-pressed={selected === x.id}
              aria-label={`${t.topicWord} ${x.id}: ${t.topics[x.id].name}`}
              style={{ left: `${pos[x.id].x}%`, top: `${pos[x.id].y}%` }}
              onClick={() => choose(x.id)}
            >
              <span className="halo" aria-hidden="true" />
              <span className="paper" aria-hidden="true">
                {x.id}
              </span>
            </button>
          ))}
        </div>
        <div className="topic-panel" aria-live="polite">
          <div className={`topic-swap${swapping ? ' is-swapping' : ''}`}>
            <h3>{info.name}</h3>
            <p style={{ marginTop: 18 }}>{info.text}</p>
            <ul className="word-bars">
              {topic.words.map((w) => (
                <li key={w.w}>
                  <span lang="pt-BR">{w.w}</span>
                  <span className="track">
                    <span className="bar" style={{ width: `${(w.v / max) * 70}%` }} />
                    <span className="v num">{fmt.format(w.v)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="topic-note small">{t.weightsNote}</p>
        </div>
      </div>
    </section>
  );
}
