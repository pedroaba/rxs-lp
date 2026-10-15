# Visual asset provenance

## Product images

The files in `source/` named `editor-original.png`, `color-picker-original.png` and `annotation-original.png` are copied from the RSX application's `docs/assets/` directory in the sibling `rxs` repository. The application screenshot and synthetic annotation examples are preserved; the website pipeline only changes resolution and encoding. The source project is licensed under MIT.

## Generated background

`source/background-source.png` was generated with the built-in ImageGen tool on October 15, 2026. The generated background contains no interface, product claims or logos. The original generation prompt was:

> Use case: stylized-concept. Asset type: background texture for the hero of RSX, a native macOS screenshot annotation application. Create a sophisticated restrained abstract dark graphite background, 1536x1024 landscape, deep nearly black charcoal with subtle cobalt blue light sweeping diagonally through smoked glass at the bottom right, a fine tactile cinematic grain, soft reflective arcs, mostly dark negative space at top and center for an application screenshot to be composited separately. Premium precise developer tool aesthetic. No text, no letters, no logos, no UI, no icons, no objects, no screen mockup. The texture must remain subtle and low contrast, not a bright gradient.

## Website assets

- `public/media/hero-background.webp`: optimized generated background.
- `public/media/hero-editor.webp` and its small version: actual editor interface.
- `public/media/feature-annotations.webp`: actual synthetic annotation export.
- `public/media/color-picker.webp`: actual color-picker image.
- `public/media/rsx-social.png`: 1200 × 630 social composition with the real editor.
- `public/media/rsx-demo.*`: 25-second animated demonstration, poster and captions.
- `public/media/rsx-short.*`: 8-second animated demonstration, poster and captions.

The main product composition is rendered with the original interface over the generated background in the hero section. No interface pixels are regenerated. Both videos use a subtle zoom, scene changes, Portuguese explanatory text and the same unmodified source images. Both have MP4/H.264 and WebM/VP9 versions at 1280 × 720, 24 fps, without audio.

Run `pnpm media` to regenerate the deterministic assets. It requires FFmpeg in PATH and a Playwright Chromium installation (`pnpm exec playwright install chromium`). Intermediate frames are saved under `output/media-source/`.

Manrope and DM Sans are self-hosted via Fontsource packages and retain their SIL Open Font License files in the installed packages.
