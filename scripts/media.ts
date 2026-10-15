import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

// Preserve interface pixels: only resize and optimize the original images.
const media = path.resolve('public/media');
const source = path.resolve('assets/source');
const work = path.resolve('output/media-source');
await mkdir(work, { recursive: true });
await Promise.all([
  sharp(`${source}/background-source.png`)
    .resize(1440)
    .webp({ quality: 78 })
    .toFile(`${media}/hero-background.webp`),
  sharp(`${source}/editor-original.png`)
    .resize(1440)
    .webp({ quality: 90 })
    .toFile(`${media}/hero-editor.webp`),
  sharp(`${source}/editor-original.png`)
    .resize(720)
    .webp({ quality: 86 })
    .toFile(`${media}/hero-editor-small.webp`),
  sharp(`${source}/color-picker-original.png`)
    .resize(520)
    .webp({ quality: 88 })
    .toFile(`${media}/color-picker.webp`),
  sharp(`${source}/annotation-original.png`)
    .resize(1000)
    .webp({ quality: 88 })
    .toFile(`${media}/feature-annotations.webp`),
]);
const dataImage = async (name: string) =>
  `data:image/png;base64,${(await readFile(`${source}/${name}`)).toString('base64')}`;
const [editor, annotation, picker, background, font] = await Promise.all([
  dataImage('editor-original.png'),
  dataImage('annotation-original.png'),
  dataImage('color-picker-original.png'),
  dataImage('background-source.png'),
  readFile('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2').then(
    (b) => b.toString('base64'),
  ),
]);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1,
});
const base = `<style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font})}*{box-sizing:border-box}body{margin:0;background:#0b0d13 url('${background}') center/cover;color:#f2f4fb;font-family:Manrope,sans-serif}.frame{width:1280px;height:720px;position:relative;padding:42px 56px}.top{display:flex;align-items:center;justify-content:space-between}.brand{font-size:25px;font-weight:800;letter-spacing:-1px;display:flex;align-items:center;gap:10px}.mark{display:inline-flex;width:34px;height:34px;border:1px solid #6e99ff;background:#356df0;border-radius:9px;align-items:center;justify-content:center;font-size:26px;font-weight:500}.eyebrow{font-size:10px;letter-spacing:1.7px;color:#b3c3e5}.heading{font-size:36px;font-weight:600;letter-spacing:-1.3px;line-height:1.25;margin-top:27px}.heading span{color:#a6b7d6}.copy{font-size:14px;line-height:1.8;color:#b9c4d7;margin-top:10px;max-width:350px}.stage{position:absolute;left:440px;right:60px;top:146px;bottom:80px;display:flex;align-items:center;justify-content:center}.stage img{width:100%;height:auto;max-height:100%;object-fit:contain;border-radius:9px;box-shadow:0 18px 60px #0008;border:1px solid #46506a}.footer{position:absolute;bottom:27px;left:56px;right:56px;display:flex;justify-content:space-between;font-size:9px;letter-spacing:.6px;color:#b4c0d9}.label{position:absolute;left:57px;bottom:117px;border-left:2px solid #6894ff;padding:10px 14px;font-size:12px;color:#c0cce4;line-height:1.8}.scene{position:absolute;top:245px;left:57px;font-size:10px;color:#91a8d1;letter-spacing:1px}.portrait .stage{left:645px;right:160px;top:135px;bottom:85px}.portrait .stage img{width:auto;height:100%;max-width:100%}.full .stage{left:205px;right:205px;top:147px;bottom:77px}.full .heading{font-size:27px;margin-top:20px}.full .scene,.full .copy,.full .label{display:none}</style>`;
const scenes = [
  {
    title: 'Uma captura.<br><span>Tudo mais claro.</span>',
    copy: 'Capturas e anotações nativas para macOS.',
    image: editor,
    label: 'Capture. Anote. Compartilhe.',
    className: '',
    caption:
      'RSX: capturas e anotações nativas para macOS. O editor reúne ferramentas de anotação e exportação PNG.',
  },
  {
    title: 'Destaque o que<br><span>realmente importa.</span>',
    copy: 'Uma seta, um contorno, um traço.<br>A mensagem fica mais clara.',
    image: annotation,
    label: 'Seta · Retângulo · Desenho livre',
    className: '',
    caption: 'Use setas, retângulos e desenho livre para destacar áreas da imagem.',
  },
  {
    title: 'Cada detalhe,<br><span>do seu jeito.</span>',
    copy: 'Escolha a cor, ajuste a opacidade<br>e guarde seus tons favoritos.',
    image: picker,
    label: 'HEX · Opacidade · Coleção de cores',
    className: 'portrait',
    caption: 'Personalize cor e opacidade. Guarde tons favoritos na coleção de cores do editor.',
  },
  {
    title: 'Copie. Salve.<br><span>Compartilhe a ideia.</span>',
    copy: 'Exporte em PNG e preserve<br>a resolução original da imagem.',
    image: editor,
    label: 'Copiar ⌘C · Salvar PNG ⌘S',
    className: '',
    caption:
      'Copie para o clipboard ou salve um PNG com a resolução original. Command C copia; Command S salva.',
  },
  {
    title: 'Mostre o que você quer dizer.',
    copy: '',
    image: editor,
    label: '',
    className: 'full',
    caption:
      'RSX. Capture, anote e compartilhe. Processamento local no seu Mac. Projeto gratuito e aberto.',
  },
];
try {
  for (const [index, scene] of scenes.entries()) {
    await page.setContent(
      `${base}<div class="frame ${scene.className}"><div class="top"><div class="brand"><span class="mark">↗</span>RSX.</div><span class="eyebrow">CAPTURE. ANOTE. COMPARTILHE.</span></div><h1 class="heading">${scene.title}</h1><div class="scene">0${index + 1} / DIRETO AO PONTO</div><p class="copy">${scene.copy}</p><div class="stage"><img src="${scene.image}" alt="Interface real do editor" /></div><div class="label">${scene.label}</div><div class="footer"><span>DEMONSTRAÇÃO ANIMADA · IMAGENS REAIS DO EDITOR</span><span>macOS 13+ · CÓDIGO ABERTO</span></div></div>`,
    );
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images).map((i) => i.decode()));
    });
    await page.screenshot({ path: `${work}/scene-${index}.png` });
  }
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(
    `${base}<style>.frame{width:1200px;height:630px}.heading{font-size:57px;margin-top:70px;letter-spacing:-2.5px}.stage{left:525px;right:-125px;top:145px;bottom:65px;transform:rotate(-5deg)}.stage img{width:100%}.copy{font-size:17px;max-width:450px}.footer{font-size:11px}</style><div class="frame"><div class="top"><div class="brand"><span class="mark">↗</span>RSX.</div><span class="eyebrow">NATIVO NO macOS</span></div><h1 class="heading">Uma captura.<br><span>Tudo mais claro.</span></h1><p class="copy">Capture, anote e compartilhe.<br>Direto do seu Mac.</p><div class="stage"><img src="${editor}" /></div><div class="footer"><span>GRATUITO · CÓDIGO ABERTO · PROCESSAMENTO LOCAL</span></div></div>`,
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((i) => i.decode()));
  });
  await page.screenshot({ path: `${media}/rsx-social.png` });
} finally {
  await browser.close();
}

await Promise.all([
  sharp(`${work}/scene-0.png`).webp({ quality: 87 }).toFile(`${media}/rsx-demo-poster.webp`),
  sharp(`${work}/scene-4.png`).webp({ quality: 87 }).toFile(`${media}/rsx-short-poster.webp`),
]);

async function ffmpeg(args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`)),
    );
  });
}
const fps = 24;
// Apply a subtle camera movement. Text and interface are rendered before encoding.
for (let i = 0; i < scenes.length; i++) {
  await ffmpeg([
    '-i',
    `${work}/scene-${i}.png`,
    '-vf',
    `scale=1920:-1,zoompan=z='1+0.018*on/120':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=120:s=1280x720:fps=${fps},format=yuv420p`,
    '-frames:v',
    '120',
    '-c:v',
    'libx264',
    '-preset',
    'fast',
    '-crf',
    '22',
    '-an',
    `${work}/segment-${i}.mp4`,
  ]);
}
await writeFile(
  `${work}/concat.txt`,
  scenes.map((_, i) => `file '${work}/segment-${i}.mp4'`).join('\n'),
);
await ffmpeg([
  '-f',
  'concat',
  '-safe',
  '0',
  '-i',
  `${work}/concat.txt`,
  '-c',
  'copy',
  '-movflags',
  '+faststart',
  `${media}/rsx-demo.mp4`,
]);
await writeFile(
  `${work}/short.txt`,
  [4, 1].map((i) => `file '${work}/segment-${i}.mp4'\ninpoint 0\noutpoint 4`).join('\n'),
);
await ffmpeg([
  '-f',
  'concat',
  '-safe',
  '0',
  '-i',
  `${work}/short.txt`,
  '-t',
  '8',
  '-c:v',
  'libx264',
  '-preset',
  'fast',
  '-crf',
  '22',
  '-pix_fmt',
  'yuv420p',
  '-an',
  '-movflags',
  '+faststart',
  `${media}/rsx-short.mp4`,
]);
for (const file of ['rsx-demo', 'rsx-short']) {
  await ffmpeg([
    '-i',
    `${media}/${file}.mp4`,
    '-c:v',
    'libvpx-vp9',
    '-crf',
    '35',
    '-b:v',
    '0',
    '-deadline',
    'good',
    '-cpu-used',
    '4',
    '-row-mt',
    '1',
    '-an',
    `${media}/${file}.webm`,
  ]);
}
const time = (seconds: number) =>
  `00:${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}.000`;
await writeFile(
  `${media}/rsx-demo.vtt`,
  `WEBVTT\n\n${scenes.map((s, i) => `${time(i * 5)} --> ${time((i + 1) * 5)}\n${s.caption}`).join('\n\n')}\n`,
);
await writeFile(
  `${media}/rsx-short.vtt`,
  `WEBVTT\n\n00:00:00.000 --> 00:00:04.000\n${scenes[4].caption}\n\n00:00:04.000 --> 00:00:08.000\n${scenes[1].caption}\n`,
);
console.log('Generated images, posters and 25-second / 8-second videos in public/media.');
