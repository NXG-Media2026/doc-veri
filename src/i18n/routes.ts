import type { Locale } from '../data/site';

export const routeSegments: Record<Locale, Record<string, string>> = {
  nl: {
    'expert-growth': 'expert-growth-accelerator',
    'ai-vindbaarheid': 'ai-vindbaarheid',
    diensten: 'diensten',
    cases: 'cases',
    producten: 'producten',
    guides: 'guides',
    about: 'over-joost',
    contact: 'contact',
    privacy: 'privacy',
    voorwaarden: 'voorwaarden',
  },
  en: {
    'expert-growth': 'expert-growth-accelerator',
    'ai-vindbaarheid': 'ai-visibility',
    diensten: 'services',
    cases: 'cases',
    producten: 'products',
    guides: 'guides',
    about: 'about-joost',
    contact: 'contact',
    privacy: 'privacy',
    voorwaarden: 'terms',
  },
  es: {
    'ai-vindbaarheid': 'visibilidad-ia',
    diensten: 'servicios',
    cases: 'casos',
    about: 'sobre-joost',
    contact: 'contacto',
    privacy: 'privacidad',
    voorwaarden: 'terminos',
  },
};

type RouteKey = keyof typeof routeSegments.nl;

const reverseMap = new Map<string, { key: RouteKey; locale: Locale }>();
for (const [locale, segments] of Object.entries(routeSegments)) {
  for (const [key, segment] of Object.entries(segments)) {
    reverseMap.set(`${locale}:${segment}`, { key: key as RouteKey, locale: locale as Locale });
  }
}

export function getRouteKey(segment: string, locale: Locale): RouteKey | null {
  const entry = reverseMap.get(`${locale}:${segment}`);
  return entry?.key ?? null;
}

export function getRouteSegment(key: string, locale: Locale): string {
  return routeSegments[locale]?.[key] ?? routeSegments.nl[key] ?? key;
}
