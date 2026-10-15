import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('output/qa', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const viewport of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    await page.goto('http://127.0.0.1:4173/');
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const image of document.images) image.loading = 'eager';
      await Promise.all(Array.from(document.images).map((image) => image.decode()));
    });
    await page.screenshot({ path: `output/qa/${viewport.name}.png`, fullPage: true });
    await page.screenshot({ path: `output/qa/${viewport.name}-hero.png` });
    if (viewport.name === 'mobile') {
      await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
      await page.getByRole('dialog').waitFor();
      await page.screenshot({ path: 'output/qa/mobile-menu.png', animations: 'disabled' });
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log('Saved desktop, mobile and navigation screenshots in output/qa/.');
