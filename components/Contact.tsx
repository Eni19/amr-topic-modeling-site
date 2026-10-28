'use client';

import type { FormEvent } from 'react';
import { links, type Dict } from '@/lib/content';
import { ArrowUpRight } from './Icons';

export default function Contact({ t }: { t: Dict['contact'] }) {
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      String(f.get('message') || ''),
      '',
      `${f.get('name') || ''}${f.get('company') ? ` · ${f.get('company')}` : ''}`,
      String(f.get('email') || ''),
    ].join('\n');
    window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(t.subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="coupon-wrap wrap" id="contato" aria-labelledby="contact-title">
      <div className="coupon field">
        <div className="coupon-left">
          <h2 className="display" id="contact-title" data-reveal>
            {t.title}
          </h2>
          <div>
            <p className="lead" style={{ maxWidth: '24ch' }}>
              {t.text}
            </p>
            <p className="links" style={{ marginTop: 24 }}>
              <a className="link" href={links.github}>
                GitHub <ArrowUpRight />
              </a>
              <a className="link" href={links.linkedin}>
                LinkedIn <ArrowUpRight />
              </a>
              <a className="link" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} data-reveal style={{ ['--i' as string]: 1 }}>
          <label>
            <span className="visually-hidden">{t.name}</span>
            <input name="name" autoComplete="name" placeholder={t.name} required />
          </label>
          <label>
            <span className="visually-hidden">{t.company}</span>
            <input name="company" autoComplete="organization" placeholder={t.company} />
          </label>
          <label className="full">
            <span className="visually-hidden">{t.email}</span>
            <input name="email" type="email" autoComplete="email" placeholder={t.email} required />
          </label>
          <label className="full">
            <span className="visually-hidden">{t.message}</span>
            <textarea name="message" rows={4} placeholder={t.message} required />
          </label>
          <div className="submit-row">
            <button className="disk-btn" type="submit">
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
