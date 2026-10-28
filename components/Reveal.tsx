'use client';

import { useEffect } from 'react';

// Reveals [data-reveal] and .shutter-host elements once as they enter the viewport.
// Content is visible by default without script; the hidden state only applies under html.js.
// Anything already above the fold (after a jump from the nav, or a fast scroll) is revealed too.
export default function Reveal() {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .shutter-host'));
    const show = (el: HTMLElement) => el.classList.add('is-in');

    if (!('IntersectionObserver' in window)) {
      pending.forEach(show);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    pending.forEach((el) => io.observe(el));

    let frame = 0;
    const sweep = () => {
      frame = 0;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < innerHeight * 0.95) {
          show(el);
          io.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    sweep();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
