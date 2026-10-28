import { notFound } from 'next/navigation';
import { credits, dict, keywordTotals, keywordsOrder, langs, links, bibtex, metrics, type Lang, type SourceId } from '@/lib/content';
import HeroDish from '@/components/HeroDish';
import Voices from '@/components/Voices';
import TopicDish from '@/components/TopicDish';
import Contact from '@/components/Contact';
import CiteButton from '@/components/CiteButton';
import Reveal from '@/components/Reveal';
import { ArrowUp, ArrowUpRight } from '@/components/Icons';

// Deterministic pseudo-random values so the drawings are identical on every build.
const rand = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const clusters = [
  { cx: 120, cy: 190, r: 52, n: 16, main: false },
  { cx: 300, cy: 110, r: 64, n: 22, main: true },
  { cx: 300, cy: 270, r: 44, n: 12, main: false },
];

const delay = (i: number) => ({ ['--i' as string]: i });

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  if (!langs.includes(lang)) notFound();
  const t = dict[lang];
  const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
  const fmt = new Intl.NumberFormat(locale);
  const dec = new Intl.NumberFormat(locale, { minimumFractionDigits: 4 });
  const srcName: Record<SourceId, string> = {
    twitter: t.voices.sources.twitter.name,
    g1: t.voices.sources.g1.name,
    gov: t.voices.sources.gov.name,
  };
  const maxKw = Math.max(...Object.values(keywordTotals));

  return (
    <>
      <a className="skip" href="#conteudo">
        {t.nav.skip}
      </a>

      <header className="site-header">
        <a className="wordmark" href={`/${lang}/`}>
          Enrique Reis Susin
        </a>
        <nav className="site-nav" aria-label={lang === 'pt' ? 'Principal' : 'Main'}>
          <a className="nav-section" href="#dados">{t.nav.data}</a>
          <a className="nav-section" href="#metodo">{t.nav.method}</a>
          <a className="nav-section" href="#achados">{t.nav.findings}</a>
          <a className="nav-section" href="#contato">{t.nav.contact}</a>
          <a className="lang" href={`/${t.other.lang}/`} hrefLang={t.other.lang} lang={t.other.lang} aria-label={t.other.label}>
            {t.other.lang.toUpperCase()}
          </a>
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero">
          <HeroDish label={t.hero.dishLabel} />
          <div className="hero-copy">
            <h1 className="display">
              <span>{t.hero.title[0]}</span>
              <span>{t.hero.title[1]}</span>
            </h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="hero-actions">
              <a className="disk-btn" href={links.paper}>
                {t.hero.cta}
              </a>
              <a className="link" href={links.code}>
                {t.hero.code} <ArrowUpRight />
              </a>
            </div>
            <p className="hero-venue small">{t.hero.venue}</p>
          </div>
        </section>

        <section className="intro wrap" aria-label={t.intro.parts[0]}>
          <p className="statement" data-reveal>
            {t.intro.parts[0]}
            {t.intro.parts[1]}
            {t.intro.parts[2]}
            {t.intro.parts[3]}
          </p>
          <p className="intro-source small" data-reveal style={delay(1)}>
            {t.intro.source}
          </p>
        </section>

        <Voices t={t.voices} locale={locale} />

        <section className="section wrap" id="metodo" aria-labelledby="pipeline-title">
          <div className="pipeline-grid">
            <div className="pipeline-intro">
              <h2 className="head" id="pipeline-title" data-reveal>
                {t.pipeline.title}
              </h2>
              <p data-reveal style={delay(1)}>
                {t.pipeline.lead}
              </p>
            </div>

            <div className="stage" data-reveal>
              <div className="tile">
                <p className="raw-text" lang="pt-BR">
                  {t.pipeline.raw.split(' ').map((w, i) => (
                    <span key={i}>{t.pipeline.rawNoise.includes(w) ? <s>{w}</s> : w} </span>
                  ))}
                </p>
              </div>
              <div>
                <h3>{t.pipeline.stages[0].name}</h3>
                <p>{t.pipeline.stages[0].text}</p>
              </div>
            </div>

            <div className="stage" data-reveal style={delay(1)}>
              <div className="tile">
                <ul className="token-list" lang="pt-BR">
                  {t.pipeline.tokens.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t.pipeline.stages[1].name}</h3>
                <p>{t.pipeline.stages[1].text}</p>
              </div>
            </div>

            <div className="stage" data-reveal style={delay(2)}>
              <div className="tile">
                <svg className="vector" viewBox="0 0 320 240" aria-hidden="true">
                  {Array.from({ length: 48 }, (_, i) => (
                    <circle
                      key={i}
                      cx={20 + (i % 8) * 40}
                      cy={20 + Math.floor(i / 8) * 40}
                      r={7 + rand(i + 99) * 9}
                      fill="var(--field-ink)"
                      opacity={0.15 + rand(i + 1) * 0.85}
                    />
                  ))}
                </svg>
                <p className="tile-caption">{t.pipeline.vectorLabel}</p>
              </div>
              <div>
                <h3>{t.pipeline.stages[2].name}</h3>
                <p>{t.pipeline.stages[2].text}</p>
              </div>
            </div>

            <div className="stage" data-reveal style={delay(3)}>
              <div className="tile">
                <div className="cluster">
                  <svg viewBox="0 0 420 360" aria-hidden="true">
                    {clusters.map((c, ci) => (
                      <g key={ci}>
                        {c.main && <circle cx={c.cx} cy={c.cy} r={c.r + 30} fill="var(--halo-open)" />}
                        {Array.from({ length: c.n }, (_, i) => {
                          const a = rand(ci * 50 + i) * Math.PI * 2;
                          const d = Math.sqrt(rand(ci * 50 + i + 7)) * c.r;
                          return (
                            <circle
                              key={i}
                              cx={c.cx + Math.cos(a) * d}
                              cy={c.cy + Math.sin(a) * d}
                              r={c.main ? 7 : 5.5}
                              fill={c.main ? 'var(--paper)' : 'var(--field-muted)'}
                              opacity={c.main ? 1 : 0.55}
                            />
                          );
                        })}
                      </g>
                    ))}
                    {Array.from({ length: 14 }, (_, i) => (
                      <circle key={`n${i}`} cx={20 + rand(i + 300) * 380} cy={20 + rand(i + 400) * 320} r="4" fill="var(--field-muted)" opacity="0.3" />
                    ))}
                  </svg>
                </div>
                <p className="tile-caption">{t.pipeline.clusterLabel}</p>
              </div>
              <div>
                <h3>{t.pipeline.stages[3].name}</h3>
                <p>{t.pipeline.stages[3].text}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section wrap results-section" aria-labelledby="results-title" style={{ paddingTop: 0 }}>
          <div className="results-grid">
            <h2 className="head results-head" id="results-title" data-reveal>
              {t.results.title}
            </h2>
            <div className="fig-tile fig-a" data-reveal>
              <strong className="num">{t.results.diversity.figure}</strong>
              <span>{t.results.diversity.caption}</span>
            </div>
            <div className="fig-tile fig-b" data-reveal style={delay(1)}>
              <strong className="num">{t.results.coherence.figure}</strong>
              <span>{t.results.coherence.caption}</span>
            </div>
            <div className="fig-tile fig-c" data-reveal style={delay(2)}>
              <strong className="num">{t.results.corpus.figure}</strong>
              <span>{t.results.corpus.caption}</span>
            </div>
          </div>
          <div className="results-foot">
            <table data-reveal>
              <caption>{t.results.tableCaption}</caption>
              <thead>
                <tr>
                  <th scope="col">{t.results.model}</th>
                  <th scope="col">{t.results.coherenceCol}</th>
                  <th scope="col">{t.results.diversityCol}</th>
                </tr>
              </thead>
              <tbody className="num">
                <tr>
                  <td>GSDMM</td>
                  <td>{dec.format(metrics.gsdmm.coherence)}</td>
                  <td>{dec.format(metrics.gsdmm.diversity)}</td>
                </tr>
                <tr>
                  <td>BERTopic</td>
                  <td>{dec.format(metrics.bertopic.coherence)}</td>
                  <td>{dec.format(metrics.bertopic.diversity)}</td>
                </tr>
              </tbody>
            </table>
            <p className="note" data-reveal style={delay(1)}>
              {t.results.note}
            </p>
          </div>
        </section>

        <TopicDish t={t.dish} locale={locale} />

        <section className="section wrap" aria-labelledby="narr-title">
          <h2 className="head section-title" id="narr-title" data-reveal>
            {t.narratives.title}
          </h2>
          {t.narratives.groups.map((g) => (
            <div className="narr-group" key={g.name}>
              <div className="narr-head" data-reveal>
                <h3>{g.name}</h3>
                <span className="small">{t.narratives.sourcesCount(g.items.length)}</span>
              </div>
              <ul className="narr-items">
                {g.items.map((it, i) => (
                  <li className="narr-item" key={it.title} data-reveal style={{ ...delay(i), ['--c' as string]: `var(--${it.source})` }}>
                    <span className="dot" aria-hidden="true" />
                    <div>
                      <div className="row">
                        <strong>{it.title}</strong>
                        <span className="src">{srcName[it.source]}</span>
                      </div>
                      <p>{it.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="cross">
            <div className="cross-pic" data-reveal>
              <img src="/img/plates-stack.jpg" width={1400} height={838} alt={t.narratives.crossAlt} />
            </div>
            <div>
              <h3 data-reveal>{t.narratives.crossTitle}</h3>
              <p data-reveal style={delay(1)}>
                {t.narratives.crossText}
              </p>
            </div>
          </div>
        </section>

        <section className="section wrap conclusion" aria-labelledby="conclusion-title">
          <h2 className="head section-title" id="conclusion-title" data-reveal>
            {t.conclusion.title}
          </h2>
          <div className="conclusion-grid">
            <div className="conclusion-halo" data-reveal>
              <p>{t.conclusion.statement}</p>
            </div>
            <div className="conclusion-points">
              <ul>
                {t.conclusion.points.map((p, i) => (
                  <li key={p.title} data-reveal style={delay(i)}>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ul>
              <div className="conclusion-next" data-reveal style={delay(3)}>
                <h3>{t.conclusion.nextTitle}</h3>
                <p>{t.conclusion.next}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="about-left">
            <h2 className="display" id="about-title" data-reveal>
              {t.about.statement}
            </h2>
            <figure className="about-photo">
              <img src="/img/manguinhos-1910.jpg" width={1024} height={748} alt={t.about.photoAlt} />
              <figcaption>{t.about.photoCaption}</figcaption>
            </figure>
          </div>
          <div className="about-text">
            <div data-reveal>
              <h3>{t.about.built.title}</h3>
              <p>{t.about.built.text}</p>
            </div>
            <div data-reveal style={delay(1)}>
              <h3>{t.about.with.title}</h3>
              <p>{t.about.with.text}</p>
            </div>
            <div data-reveal style={delay(2)}>
              <a className="disk-btn on-dark" href={links.code}>
                {t.about.cta}
              </a>
            </div>
          </div>
        </section>

        <Contact t={t.contact} />
      </main>

      <footer className="footer">
        <div className="footer-mark" role="img" aria-label={t.footer.markLabel}>
          {keywordsOrder.map((k) => (
            <figure key={k} style={{ ['--w' as string]: Math.sqrt(keywordTotals[k] / maxKw).toFixed(3) }}>
              <svg className="halo-c" viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="50" fill="var(--field)" />
                <circle cx="50" cy="50" r={Math.min(16, 900 / Math.max(40, Math.sqrt(keywordTotals[k] / maxKw) * 100))} fill="var(--paper)" />
              </svg>
              <figcaption>
                <b>{t.voices.keywords[k]}</b>
                <span className="num">{fmt.format(keywordTotals[k])}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="footer-grid">
          <div className="footer-links">
            <a className="link" href={links.paper}>
              ACL Anthology <ArrowUpRight />
            </a>
            <a className="link" href={links.pdf}>
              {t.footer.pdf} <ArrowUpRight />
            </a>
            <a className="link" href={links.code}>
              GitHub <ArrowUpRight />
            </a>
            <a className="link" href={links.linkedin}>
              LinkedIn <ArrowUpRight />
            </a>
            <a className="link" href={`mailto:${links.email}`}>
              {links.email}
            </a>
          </div>
          <div className="footer-cite">
            <h3>BibTeX</h3>
            <pre id="bibtex">{bibtex}</pre>
            <CiteButton label={t.footer.cite} done={t.footer.copied} />
          </div>
          <div className="footer-credits">
            <h3>{t.footer.credits}</h3>
            {credits.map((c) => (
              <p key={c.file}>
                <a href={c.url}>{c.title}</a>, {c.by}, {c.licence}
              </p>
            ))}
          </div>
        </div>

        <div className="footer-last">
          <p>© 2026 {t.footer.authors} · PROPOR 2026</p>
          <a className="top-btn" href="#conteudo" aria-label={t.footer.top}>
            <ArrowUp />
          </a>
        </div>
      </footer>

      <Reveal />
    </>
  );
}
