import { ShieldCheck, Terminal, Container, Lock, Globe, Palette, Music, Download } from '@lucide/astro';

// Icon of each project's category badge (card and case study); any other project gets ShieldCheck.
const categoryIcons: Record<string, typeof ShieldCheck> = {
  archforge: Terminal,
  dockerward: Container,
  'chat-anonimo': Lock,
  'secuscan-api': Globe,
  'hyprland-dotfiles': Palette,
  'yt-cli': Music,
  'downloader-sh': Download,
};

export const categoryIconFor = (slug: string) => categoryIcons[slug] ?? ShieldCheck;
