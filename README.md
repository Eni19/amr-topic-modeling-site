# Como o Brasil fala de superbactérias

Showcase do artigo *Topic Modeling in Brazilian Portuguese Documents on Antimicrobial Resistance* (PROPOR 2026). Next.js com exportação estática, em português (`/pt/`) e inglês (`/en/`).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000/pt/
npm run build      # gera a pasta out/ (HTML estático)
```

## Publicar

- **Vercel:** importe a pasta `site/` como projeto. O framework é detectado como Next.js e o `output: 'export'` gera o site estático.
- **GitHub Pages:** rode `npm run build` e publique o conteúdo de `out/`. Se o site ficar num subcaminho (`usuario.github.io/repo`), adicione `basePath: '/repo'` em `next.config.mjs`.

`public/index.html` redireciona `/` para `/pt/` ou `/en/` conforme o idioma do navegador.

## Onde editar

- Textos, números e créditos: `lib/content.ts` (os dois idiomas ficam lado a lado).
- Visual: `app/globals.css` (tokens no topo).
- Seções interativas: `components/Voices.tsx` (as três fontes) e `components/TopicDish.tsx` (os temas).

## Antes de publicar

- Colocar a URL real do LinkedIn em `links.linkedin` (`lib/content.ts`).
- Confirmar o link da ACL Anthology (`links.paper`) e o e-mail de contato.
