import { ui, type UIKey } from './ui';
import { getRouteKey, getRouteSegment } from './routes';
import { siteConfig, type Locale } from '../data/site';

const secondaryLocales = siteConfig.locales.filter((l) => l !== siteConfig.defaultLocale);

export function getLocaleFromPath(path: string): Locale {
  for (const locale of secondaryLocales) {
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return siteConfig.defaultLocale;
}

export function stripLocaleFromPath(path: string): string {
  for (const locale of secondaryLocales) {
    if (path === `/${locale}`) return '/';
    if (path.startsWith(`/${locale}/`)) return path.slice(locale.length + 1);
  }
  return path;
}

export function localizePath(path: string, locale: Locale): string {
  const stripped = stripLocaleFromPath(path);
  if (locale === siteConfig.defaultLocale) return stripped;
  return stripped === '/' ? `/${locale}` : `/${locale}${stripped}`;
}

export function t(key: UIKey, locale: Locale = 'nl'): string {
  return ui[locale]?.[key] ?? ui.nl[key] ?? key;
}

export function getTranslatedPath(path: string, targetLocale: Locale): string {
  const sourceLocale = getLocaleFromPath(path);
  const stripped = stripLocaleFromPath(path);

  if (sourceLocale === targetLocale && stripped === path) return path;

  const segments = stripped.split('/').filter(Boolean);
  if (segments.length === 0) return localizePath('/', targetLocale);

  const firstSegment = segments[0];
  const routeKey = getRouteKey(firstSegment, sourceLocale);

  if (routeKey) {
    const translatedSegment = getRouteSegment(routeKey, targetLocale);
    segments[0] = translatedSegment;
  }

  return localizePath(`/${segments.join('/')}`, targetLocale);
}

export function getCollectionBasePath(
  collection: 'cases' | 'diensten' | 'producten' | 'guides' | 'about' | 'contact' | 'privacy' | 'voorwaarden',
  locale: Locale = 'nl',
): string {
  const segment = getRouteSegment(collection, locale);
  return localizePath(`/${segment}`, locale);
}
