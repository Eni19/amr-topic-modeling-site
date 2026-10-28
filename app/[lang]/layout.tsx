import type { Metadata, Viewport } from 'next';
import { dict, langs, type Lang } from '@/lib/content';
import '../globals.css';

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = (await params).lang as Lang;
  const t = dict[lang];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { 'pt-BR': '/pt/', en: '/en/' } },
    openGraph: { title: t.meta.title, description: t.meta.description, images: ['/img/plate-serratia.jpg'] },
    icons: { icon: '/icon.svg' },
  };
}

export const viewport: Viewport = { themeColor: '#edccbe' };

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  return (
    <html lang={lang === 'pt' ? 'pt-BR' : 'en'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@300;400&family=Stack+Sans+Text:wght@400;500&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
