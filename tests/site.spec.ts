import { test, expect } from '@playwright/test';
import { product } from '../src/config/product';

test('content, downloads and FAQ work without JavaScript', async ({
  browser,
  baseURL,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: testInfo.project.use.viewport,
  });
  const page = await context.newPage();
  const response = await page.goto(baseURL!);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mostre o quevocê quer dizer.');
  await expect(page.locator('[data-download]')).toHaveCount(2);
  for (const download of product.downloads)
    await expect(page.locator(`[data-download="${download.id}"]`)).toHaveAttribute(
      'href',
      download.url,
    );
  await page.locator('.faq-list summary').first().click();
  await expect(page.locator('details[open]')).toContainText('barra de menus');
  await expect(
    page.getByRole('link', { name: 'Assistir à demonstração em MP4', exact: true }).first(),
  ).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('hydration, mobile navigation and on-demand media work', async ({ page }, testInfo) => {
  const errors: string[] = [];
  const mediaRequests: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (/\.(mp4|webm)(\?|$)/.test(request.url())) mediaRequests.push(request.url());
  });
  await page.goto('/');
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(mediaRequests).toEqual([]);
  expect(await page.locator('h1').count()).toBe(1);
  if (testInfo.project.name === 'mobile') {
    const toggle = page.getByRole('button', { name: 'Abrir menu', exact: true });
    await toggle.click();
    await expect(page.getByRole('navigation', { name: 'Navegação móvel' })).toBeVisible();
    await page
      .getByRole('navigation', { name: 'Navegação móvel' })
      .getByRole('link', { name: 'Recursos', exact: true })
      .click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
  const images = page.locator('img');
  for (const image of await images.all()) {
    if (await image.isVisible()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty('complete', true);
      expect(await image.evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
    }
  }
  await page.getByRole('button', { name: 'Ver o RSX em ação', exact: false }).click();
  const video = page.locator('video').first();
  await expect(video).toBeVisible();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState), { timeout: 15000 })
    .toBeGreaterThanOrEqual(2);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime), { timeout: 15000 })
    .toBeGreaterThan(0);
  expect(await video.evaluate((v: HTMLVideoElement) => Math.round(v.duration))).toBe(25);
  await page.locator('.quick-demo>summary').click();
  await page.getByRole('button', { name: 'Ver versão rápida', exact: false }).click();
  const short = page.locator('video').last();
  await expect
    .poll(() => short.evaluate((v: HTMLVideoElement) => v.readyState))
    .toBeGreaterThanOrEqual(2);
  expect(await short.evaluate((v: HTMLVideoElement) => Math.round(v.duration))).toBe(8);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('video failures preserve the poster and expose a download fallback', async ({ page }) => {
  await page.route(/\.(webm|mp4)$/, (route) => route.abort());
  await page.goto('/');
  await page.getByRole('button', { name: 'Ver o RSX em ação', exact: false }).click();
  await expect(page.getByRole('status')).toContainText('Não foi possível reproduzir');
  await expect(
    page.getByRole('link', { name: 'Baixar demonstração em MP4', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.video-frame').first().locator('img')).toBeVisible();
});

test('keyboard navigation and reduced motion work', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await expect(page.locator('video')).toHaveCount(0);
});

test('static HTML, metadata and technical files are available', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).toContain('application/ld+json');
  expect(html).toContain('SoftwareApplication');
  expect(html).toContain('O RSX é um aplicativo');
  expect(html).toContain('lang="pt-BR"');
  expect(html).not.toContain('<!--site-metadata-->');
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  for (const file of [
    'rsx-demo.mp4',
    'rsx-demo.webm',
    'rsx-short.mp4',
    'rsx-short.webm',
    'rsx-demo.vtt',
    'rsx-short.vtt',
  ]) {
    const response = await request.head(`/media/${file}`);
    expect(response.status()).toBe(200);
    expect(Number(response.headers()['content-length'])).toBeGreaterThan(0);
  }
});
