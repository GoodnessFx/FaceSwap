import React from 'react';

/**
 * Icon — the single source of truth for every glyph on the site.
 *
 * The project ships zero emoji and zero raster icons: every mark is an inline
 * SVG path defined here so it inherits `currentColor`, scales crisply at any
 * size, and stays readable by screen readers through the `title` prop.
 */
export type IconName =
  | 'spark' | 'bolt' | 'check' | 'checkCircle' | 'x' | 'xCircle' | 'minus'
  | 'warning' | 'info' | 'shield' | 'download' | 'external'
  | 'arrowRight' | 'arrowLeft' | 'chevronDown' | 'chevronRight'
  | 'search' | 'copy' | 'face' | 'video' | 'mic' | 'sliders'
  | 'monitor' | 'terminal' | 'folder' | 'lock' | 'unlock' | 'clock'
  | 'users' | 'route' | 'bug' | 'link' | 'cpu' | 'palette' | 'wallet'
  | 'key' | 'bell' | 'play' | 'book' | 'layers' | 'target' | 'globe'
  | 'mail' | 'menu' | 'close' | 'plus' | 'eye' | 'refresh' | 'flag'
  | 'gauge' | 'star' | 'plug' | 'image' | 'wand' | 'clipboard';

type Shape = { d: string; fill?: boolean };

const STROKE_ICONS_A: Partial<Record<IconName, Shape[]>> = {
  spark: [{ d: 'M12 2.5l1.9 5.1 5.1 1.9-5.1 1.9L12 16.5l-1.9-5.1L5 9.5l5.1-1.9L12 2.5z' }],
  bolt: [{ d: 'M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z' }],
  check: [{ d: 'M4.5 12.5l5 5 10-11' }],
  x: [{ d: 'M6 6l12 12M18 6L6 18' }],
  minus: [{ d: 'M5 12h14' }],
  warning: [{ d: 'M10.3 3.2L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.2a2 2 0 00-3.4 0zM11 9.5a1 1 0 012 0l-.3 4a.7.7 0 01-1.4 0l-.3-4zm1 7.2a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z', fill: true }],
  info: [{ d: 'M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm0 4.2a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zm1 10.5a1 1 0 01-2 0v-4.6a1 1 0 012 0v4.6z', fill: true }],
  shield: [{ d: 'M12 2.2l7.5 3v6.3c0 4.6-3.1 8.6-7.5 10.3C7.6 20.1 4.5 16.1 4.5 11.5V5.2l7.5-3z' }, { d: 'M8.7 12.1l2.3 2.4 4.4-4.9' }],
  download: [{ d: 'M12 3v11' }, { d: 'M7.5 10.5L12 15l4.5-4.5' }, { d: 'M4.5 19.5h15' }],
  external: [{ d: 'M14 4.5h5.5V10' }, { d: 'M19.5 4.5L11 13' }, { d: 'M18 14.5v4a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 014 18.5v-11A1.5 1.5 0 015.5 6h4' }],
  arrowRight: [{ d: 'M4.5 12h15' }, { d: 'M13.5 6l6 6-6 6' }],
  arrowLeft: [{ d: 'M19.5 12h-15' }, { d: 'M10.5 6l-6 6 6 6' }],
  chevronDown: [{ d: 'M6 9.5l6 6 6-6' }],
  chevronRight: [{ d: 'M9.5 6l6 6-6 6' }],
  search: [{ d: 'M11 3.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z' }, { d: 'M16.6 16.6L21 21' }],
  copy: [{ d: 'M9 9h9.5a1.5 1.5 0 011.5 1.5V20a1.5 1.5 0 01-1.5 1.5H9A1.5 1.5 0 017.5 20v-9.5A1.5 1.5 0 019 9z' }, { d: 'M5.5 15h-.5A1.5 1.5 0 013.5 13.5V4A1.5 1.5 0 015 2.5h9.5A1.5 1.5 0 0116 4v.5' }],
  face: [{ d: 'M12 3a9 9 0 100 18 9 9 0 000-18z' }, { d: 'M9 10h.01M15 10h.01' }, { d: 'M8.5 14.5a4.5 4.5 0 007 0' }],
  video: [{ d: 'M3.5 6.5h11A1.5 1.5 0 0116 8v8a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 012 16V8a1.5 1.5 0 011.5-1.5z' }, { d: 'M16 11l5.5-3v8L16 13z' }],
  mic: [{ d: 'M12 3.5a3 3 0 00-3 3v5a3 3 0 006 0v-5a3 3 0 00-3-3z' }, { d: 'M5.5 11.5a6.5 6.5 0 0013 0' }, { d: 'M12 18v3' }],
  sliders: [{ d: 'M4 7h9M17 7h3M4 17h3M11 17h9' }, { d: 'M15 4.5v5M9 14.5v5' }],
  monitor: [{ d: 'M3.5 4.5h17a1 1 0 011 1v10a1 1 0 01-1 1h-17a1 1 0 01-1-1v-10a1 1 0 011-1z' }, { d: 'M8.5 20.5h7M12 16.5v4' }],
  terminal: [{ d: 'M4.5 4.5h15a1 1 0 011 1v13a1 1 0 01-1 1h-15a1 1 0 01-1-1v-13a1 1 0 011-1z' }, { d: 'M7.5 10l2.5 2.5-2.5 2.5M12.5 15.5h4' }],
  folder: [{ d: 'M3.5 6.5h6l2 2.5h9a1 1 0 011 1v8a1 1 0 01-1 1h-17a1 1 0 01-1-1v-10.5a1 1 0 011-1z' }],
};

const STROKE_ICONS_B: Partial<Record<IconName, Shape[]>> = {
  lock: [{ d: 'M6.5 10.5h11a1 1 0 011 1V20a1 1 0 01-1 1h-11a1 1 0 01-1-1v-8.5a1 1 0 011-1z' }, { d: 'M8.5 10.5V7.5a3.5 3.5 0 017 0v3' }],
  unlock: [{ d: 'M6.5 10.5h11a1 1 0 011 1V20a1 1 0 01-1 1h-11a1 1 0 01-1-1v-8.5a1 1 0 011-1z' }, { d: 'M8.5 10.5V7.5a3.5 3.5 0 016.8-1.2' }],
  clock: [{ d: 'M12 3a9 9 0 100 18 9 9 0 000-18z' }, { d: 'M12 7v5.3l3.5 2' }],
  users: [{ d: 'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7z' }, { d: 'M2.5 20.5a6.5 6.5 0 0113 0' }, { d: 'M16 4.5a3.5 3.5 0 010 6.6M17 14.6a6.5 6.5 0 014.5 5.9' }],
  route: [{ d: 'M6.5 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 15.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z' }, { d: 'M6.5 8.5v4a4 4 0 004 4h7' }],
  bug: [{ d: 'M8 7.5h8a4 4 0 014 4v2a6 6 0 01-6 6h-4a6 6 0 01-6-6v-2a4 4 0 014-4z' }, { d: 'M9 7.5V6a3 3 0 016 0v1.5M3 12h3M18 12h3M4.5 19.5l2-2M19.5 19.5l-2-2' }],
  link: [{ d: 'M10 13.5a4 4 0 005.7 0l2.8-2.8a4 4 0 10-5.7-5.7l-1 1' }, { d: 'M14 10.5a4 4 0 00-5.7 0l-2.8 2.8a4 4 0 105.7 5.7l1-1' }],
  cpu: [{ d: 'M7.5 7.5h9v9h-9z' }, { d: 'M4 9.5h3.5M4 14.5h3.5M16.5 9.5H20M16.5 14.5H20M9.5 4v3.5M14.5 4v3.5M9.5 16.5V20M14.5 16.5V20' }],
  palette: [{ d: 'M12 3a9 9 0 000 18 2 2 0 001.6-3.2 2 2 0 011.6-3.2H18a3 3 0 003-3c0-4.8-4-9-9-9z' }, { d: 'M7.5 10.5h.01M10 7h.01M14 7.5h.01' }],
  wallet: [{ d: 'M3.5 7.5h15A1.5 1.5 0 0120 9v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 012 18V9a1.5 1.5 0 011.5-1.5z' }, { d: 'M2.5 11h17M16.5 14.5h.01' }],
  key: [{ d: 'M15 3.5a5.5 5.5 0 00-5.2 7.3L3 17.5V21h3.5l1-1v-1.5H9v-1.5h1.5l1.3-1.3A5.5 5.5 0 1015 3.5z' }, { d: 'M16.8 7.4a1.3 1.3 0 110-2.6 1.3 1.3 0 010 2.6z' }],
  bell: [{ d: 'M6.5 10a5.5 5.5 0 0111 0v4l1.5 3h-14l1.5-3v-4z' }, { d: 'M10 20.5h4' }],
  play: [{ d: 'M7 4.5l12 7.5-12 7.5z' }],
  book: [{ d: 'M4 4.5h6.5A2.5 2.5 0 0113 7v13a2 2 0 00-2-2H4z' }, { d: 'M20 4.5h-6.5A2.5 2.5 0 0011 7v13a2 2 0 012-2h7z' }],
  layers: [{ d: 'M12 3l8.5 5-8.5 5L3.5 8z' }, { d: 'M3.5 12.5l8.5 5 8.5-5M3.5 16.5l8.5 5 8.5-5' }],
  target: [{ d: 'M12 3a9 9 0 100 18 9 9 0 000-18z' }, { d: 'M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z' }, { d: 'M12 11.2a.8.8 0 100 1.6.8.8 0 000-1.6z' }],
  globe: [{ d: 'M12 3a9 9 0 100 18 9 9 0 000-18z' }, { d: 'M3.2 12h17.6' }, { d: 'M12 3c2.6 2.2 4 5.6 4 9s-1.4 6.8-4 9c-2.6-2.2-4-5.6-4-9s1.4-6.8 4-9z' }],
  mail: [{ d: 'M3.5 6h17a1 1 0 011 1v10a1 1 0 01-1 1h-17a1 1 0 01-1-1V7a1 1 0 011-1z' }, { d: 'M3 7l9 6.5L21 7' }],
  menu: [{ d: 'M4 7h16M4 12h16M4 17h16' }],
  close: [{ d: 'M6 6l12 12M18 6L6 18' }],
  plus: [{ d: 'M12 5v14M5 12h14' }],
};


const FILLED_ICONS: Partial<Record<IconName, Shape[]>> = {
  checkCircle: [{ d: 'M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm4.3 7.2l-5.1 5.6a1 1 0 01-1.45.02L7.4 12.9a1 1 0 011.45-1.38l1.62 1.7 4.38-4.8a1 1 0 111.45 1.38z', fill: true }],
  xCircle: [{ d: 'M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19zm3.3 12.3a1 1 0 01-1.42 1.42L12 13.42l-1.88 1.8a1 1 0 11-1.42-1.42l1.9-1.8-1.9-1.8a1 1 0 011.42-1.42L12 10.58l1.88-1.8a1 1 0 111.42 1.42L13.4 12l1.9 1.8z', fill: true }],
  star: [{ d: 'M12 3.2l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z', fill: true }],
};

const STROKE_ICONS_C: Partial<Record<IconName, Shape[]>> = {
  eye: [{ d: 'M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z' }, { d: 'M12 9a3 3 0 100 6 3 3 0 000-6z' }],
  refresh: [{ d: 'M20 12a8 8 0 11-2.5-5.8' }, { d: 'M20 3.5V9h-5.5' }],
  flag: [{ d: 'M6 21V4' }, { d: 'M6 4.5h11l-2 4 2 4H6z' }],
  gauge: [{ d: 'M3.5 17a9 9 0 1117 0' }, { d: 'M12 17l4-5' }],
  plug: [{ d: 'M9 3.5v5M15 3.5v5' }, { d: 'M6.5 8.5h11v3a5.5 5.5 0 01-11 0v-3z' }, { d: 'M12 17v3.5' }],
  image: [{ d: 'M3.5 5.5h17a1 1 0 011 1v11a1 1 0 01-1 1h-17a1 1 0 01-1-1v-11a1 1 0 011-1z' }, { d: 'M3 15.5l4.5-4 4 3.5 3-2.5 6.5 5' }, { d: 'M9 9.5h.01' }],
  wand: [{ d: 'M14.5 4.5l1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6L9.5 9.5l3.6-1.4z' }, { d: 'M13.5 13.5L4 23' }],
  clipboard: [{ d: 'M9 4.5h6a1 1 0 011 1V7H8V5.5a1 1 0 011-1z' }, { d: 'M5.5 6.5h2M16.5 6.5h2a1 1 0 011 1V20a1 1 0 01-1 1h-13a1 1 0 01-1-1V7.5a1 1 0 011-1z' }, { d: 'M8.5 12h7M8.5 16h4' }],
};

const PATHS: Record<IconName, Shape[]> = {
  ...(STROKE_ICONS_A as Record<IconName, Shape[]>),
  ...(STROKE_ICONS_B as Record<IconName, Shape[]>),
  ...(STROKE_ICONS_C as Record<IconName, Shape[]>),
  ...(FILLED_ICONS as Record<IconName, Shape[]>),
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  /** Accessible label. Omit for purely decorative icons. */
  title?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 20,
  title,
  strokeWidth = 1.6,
  className = '',
  ...rest
}: IconProps) {
  const shapes = PATHS[name] ?? [];

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['shrink-0', className].join(' ')}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {shapes.map((shape, i) =>
        shape.fill ? (
          <path key={i} d={shape.d} fill="currentColor" stroke="none" />
        ) : (
          <path key={i} d={shape.d} />
        )
      )}
    </svg>
  );
}

/** Icon inside a soft rounded tile — used across feature cards and lists. */
export function IconTile({
  name,
  tone = 'indigo',
  size = 'md',
  className = '',
  title,
}: {
  name: IconName;
  tone?: 'indigo' | 'teal' | 'amber' | 'rose' | 'emerald' | 'slate' | 'onDark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  title?: string;
}) {
  const tones: Record<string, string> = {
    indigo: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
    teal: 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]',
    amber: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    rose: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
    emerald: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
    slate: 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]',
    onDark: 'bg-white/10 text-white border-white/15',
  };
  const sizes: Record<string, string> = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };
  const glyph: Record<string, number> = { sm: 15, md: 18, lg: 22 };

  return (
    <span
      className={[
        'inline-flex items-center justify-center border shrink-0',
        sizes[size],
        tones[tone],
        className,
      ].join(' ')}
    >
      <Icon name={name} size={glyph[size]} title={title} />
    </span>
  );
}
