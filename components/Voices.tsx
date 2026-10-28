'use client';

import { useId, useState, type KeyboardEvent } from 'react';
import { docsByKeyword, keywordsOrder, sourceTotals, type Dict, type SourceId } from '@/lib/content';

const order: SourceId[] = ['twitter', 'g1', 'gov'];

export default function Voices({ t, locale }: { t: Dict['voices']; locale: string }) {
  const [active, setActive] = useState<SourceId>('twitter');
  const id = useId();
  const fmt = new Intl.NumberFormat(locale);
  const data = docsByKeyword[active];
  const max = Math.max(...keywordsOrder.map((k) => data[k] ?? 0));

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = order[(order.indexOf(active) + (e.key === 'ArrowRight' ? 1 : order.length - 1)) % order.length];
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  }

  const s = t.sources[active];
  return (
    <section className="voices" id="dados" aria-labelledby={`${id}-title`}>
      <div className="voices-plate">
        <div className="plate-frame shutter-host">
          <div className="shutter">
            <img src="/img/plate-serratia.jpg" width={1200} height={1200} alt={t.plateAlt} />
          </div>
        </div>
      </div>
      <div className="voices-body">
        <h2 className="head" id={`${id}-title`} data-reveal>
          {t.title}
        </h2>
        <div className="tabs" role="tablist" aria-label={t.tabsLabel} data-reveal style={{ ['--i' as string]: 1 }}>
          {order.map((src) => (
            <button
              key={src}
              id={`${id}-tab-${src}`}
              role="tab"
              type="button"
              className="tab"
              aria-selected={active === src}
              aria-controls={`${id}-panel`}
              tabIndex={active === src ? 0 : -1}
              onClick={() => setActive(src)}
              onKeyDown={onKey}
              style={{ ['--c' as string]: `var(--${src})` }}
            >
              <span className="dot" aria-hidden="true" />
              {t.sources[src].name}
            </button>
          ))}
        </div>
        <div className="voice-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} data-reveal style={{ ['--i' as string]: 2 }}>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          <div className="voice-cells">
            <div className="voice-cell">
              <strong className="num">{fmt.format(sourceTotals[active])}</strong>
              <span>{t.docs}</span>
            </div>
            <div className="voice-cell">
              <strong>{s.register}</strong>
              <span>{t.tone}</span>
            </div>
          </div>
          <figure className="kw-chart" style={{ ['--c' as string]: `var(--${active})` }}>
            <h4>{t.chartTitle}</h4>
            {keywordsOrder.filter((k) => data[k] != null).map((k) => {
              const v = data[k]!;
              return (
                <div className="kw-row" key={k}>
                  <span>{t.keywords[k]}</span>
                  <span className="kw-track">
                    <span className="kw-bar" style={{ width: `${Math.max(1, (v / max) * 78)}%` }} />
                    <span className="kw-val num">{fmt.format(v)}</span>
                  </span>
                </div>
              );
            })}
          </figure>
        </div>
      </div>
    </section>
  );
}
