import type { ReactNode } from 'react';

export type IconName =
  | 'arrow'
  | 'download'
  | 'capture'
  | 'pen'
  | 'copy'
  | 'shield'
  | 'github'
  | 'play'
  | 'check'
  | 'close'
  | 'menu'
  | 'apple'
  | 'chevron';
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" />
      </>
    ),
    capture: (
      <>
        <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
        <path d="m9 15 6-6m-5 0h5v5" />
      </>
    ),
    pen: (
      <>
        <path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-4-4L5 15l-1 5Z" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M15 8V3H3v12h5" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4 1-4-2-6-2m14 5v-4a3.5 3.5 0 0 0-1-2.7c3-.3 6-1.5 6-6.3A5 5 0 0 0 20.5 5 4.5 4.5 0 0 0 20.4 1S19.2.6 16 2.5a14 14 0 0 0-8 0C4.8.6 3.6 1 3.6 1a4.5 4.5 0 0 0-.1 4A5 5 0 0 0 2 9c0 4.8 3 6 6 6.3A3.5 3.5 0 0 0 7 18v4" />
      </>
    ),
    play: <path d="m9 5 11 7-11 7V5Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    apple: (
      <>
        <path d="M16 3c-2 0-3 2-3 3 2 0 3-2 3-3Z" />
        <path d="M16.5 7.5c-1.8-.5-3 1-4.5 1s-2.7-1.5-4.5-1C2 9 5 20 8.5 21c1.3.4 2-1 3.5-1s2.2 1.4 3.5 1c1.5-.5 3-3 3.5-5-3-1-3-5 0-6-1-1.5-1.5-2-2.5-2.5Z" />
      </>
    ),
    chevron: <path d="m8 10 4 4 4-4" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
