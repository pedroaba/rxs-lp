import 'dotenv/config';
import { readFile, writeFile } from 'node:fs/promises';
import { renderToString } from 'react-dom/server';
import { App } from '../src/App';
import { product } from '../src/config/product';

const configured = process.env.SITE_URL?.trim();
let siteUrl: string | undefined;
if (configured) {
  const parsed = new URL(configured);
  if (
    parsed.protocol !== 'https:' ||
    parsed.pathname !== '/' ||
    parsed.search ||
    parsed.hash ||
    parsed.username ||
    parsed.password ||
    ['localhost', '127.0.0.1'].includes(parsed.hostname)
  ) {
    throw new Error(
      'SITE_URL must be a public HTTPS origin without a path, credentials, query or fragment.',
    );
  }
  siteUrl = parsed.origin;
}
if (process.env.REQUIRE_SITE_URL && !siteUrl)
  throw new Error('Set SITE_URL in .env before generating the production site.');

const escape = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const metadata = [
  `<meta name="robots" content="${siteUrl ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}" />`,
  '<meta property="og:type" content="website" />',
  '<meta property="og:locale" content="pt_BR" />',
  '<meta property="og:site_name" content="RSX" />',
  '<meta property="og:title" content="RSX — Mostre o que você quer dizer." />',
  '<meta property="og:description" content="Capture, anote e compartilhe. Capturas de tela e anotações nativas para macOS, com processamento local." />',
  '<meta name="twitter:card" content="summary_large_image" />',
  '<meta name="twitter:title" content="RSX — Capturas e anotações para macOS" />',
  '<meta name="twitter:description" content="Capture, anote e compartilhe. Direto do seu Mac." />',
];
if (siteUrl) {
  const safeUrl = escape(siteUrl);
  metadata.push(
    `<link rel="canonical" href="${safeUrl}/" />`,
    `<meta property="og:url" content="${safeUrl}/" />`,
    `<meta property="og:image" content="${safeUrl}/media/rsx-social.png" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="RSX: capturas e anotações nativas para macOS, com a interface real do editor" />',
    `<meta name="twitter:image" content="${safeUrl}/media/rsx-social.png" />`,
  );
}
const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: product.name,
  description:
    'Aplicativo aberto de capturas de tela e anotações para macOS, com setas, retângulos, desenho livre e exportação PNG. Processamento local, sem upload de capturas.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: `macOS ${product.minimumMacOS} ou posterior`,
  softwareVersion: product.version,
  inLanguage: 'pt-BR',
  isAccessibleForFree: true,
  license: `${product.repository}/blob/main/LICENSE`,
  downloadUrl: product.releaseUrl,
  ...(siteUrl ? { url: `${siteUrl}/`, image: `${siteUrl}/media/rsx-social.png` } : {}),
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL', url: product.releaseUrl },
};
metadata.push(
  `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`,
);
const html = (await readFile('dist/index.html', 'utf8'))
  .replace('<div id="root"></div>', `<div id="root">${renderToString(<App />)}</div>`)
  .replace('<!--site-metadata-->', metadata.join('\n'));
if (!html.includes('Mostre o que') || !html.includes('application/ld+json'))
  throw new Error('Failed to prerender HTML and metadata.');
await writeFile('dist/index.html', html);
await writeFile(
  'dist/robots.txt',
  siteUrl
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${siteUrl ? `<url><loc>${escape(siteUrl)}/</loc></url>` : ''}</urlset>\n`,
);
console.log(
  siteUrl
    ? `Generated HTML and SEO metadata for ${siteUrl}`
    : 'Generated static HTML. SITE_URL is missing: this preview cannot be indexed.',
);
