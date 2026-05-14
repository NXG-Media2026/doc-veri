import { siteConfig, type Locale } from '../data/site';

interface HreflangEntry {
  lang: string;
  href: string;
}

export function buildHreflang(paths: Partial<Record<Locale, string>>): HreflangEntry[] {
  return Object.entries(paths)
    .filter(([, path]) => path != null)
    .map(([locale, path]) => ({
      lang: locale,
      href: `${siteConfig.url}${path}`,
    }));
}

export function buildHreflangPair(nlPath: string, enPath: string): HreflangEntry[] {
  return buildHreflang({ nl: nlPath, en: enPath });
}

export function buildHreflangTrilingual(nlPath: string, enPath: string, esPath: string): HreflangEntry[] {
  return buildHreflang({ nl: nlPath, en: enPath, es: esPath });
}
