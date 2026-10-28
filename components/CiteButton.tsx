'use client';

import { useState } from 'react';
import { bibtex } from '@/lib/content';

export default function CiteButton({ label, done }: { label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById('bibtex')!);
    }
  }
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
      {copied ? done : label}
    </button>
  );
}
