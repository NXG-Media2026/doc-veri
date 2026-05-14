import { siteConfig, type Locale } from './site';
import type { Testimonial } from './testimonials';
import { t } from '../i18n/utils';
import { localizePath } from '../i18n/utils';

const founderUrl = `${siteConfig.url}/over-joost#${siteConfig.founder.slug}`;
const orgId = `${siteConfig.url}#org`;

function localizeUrl(path: string, locale: Locale): string {
  return `${siteConfig.url}${localizePath(path, locale)}`;
}

function baseSameAs(): string[] {
  return Object.values(siteConfig.socials).filter((url): url is string => Boolean(url));
}

export function generateFounderPerson() {
  const { founder } = siteConfig;
  const fullImage = founder.image
    ? (founder.image.startsWith('http') ? founder.image : `${siteConfig.url}${founder.image}`)
    : undefined;

  const credentials = founder.credentials.length > 0
    ? founder.credentials.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certificate',
        name: c.name,
        recognizedBy: { '@type': 'Organization', name: c.issuer },
      }))
    : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': founderUrl,
    name: founder.name,
    url: founderUrl,
    jobTitle: founder.role,
    description: founder.description,
    worksFor: { '@id': orgId },
    ...(founder.languages.length > 0 && { knowsLanguage: [...founder.languages] }),
    ...(founder.knowsAbout.length > 0 && { knowsAbout: [...founder.knowsAbout] }),
    ...(fullImage && { image: fullImage }),
    ...(credentials && { hasCredential: credentials }),
  });
}

export function generateOrganization() {
  const sameAs = baseSameAs();
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: siteConfig.name,
    description: siteConfig.tagline.nl,
    url: siteConfig.url,
    founder: { '@id': founderUrl },
    ...(sameAs.length > 0 && { sameAs }),
  });
}

export function generateWebSite(locale: Locale = 'nl') {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: locale,
  });
}

export function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function generateFAQPage(faqs: Array<{ question: string; answer: string }>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });
}

export function generateProduct(product: {
  name: string;
  description: string;
  url: string;
  price: number | string;
  currency?: string;
  image?: string;
  reviews?: Testimonial[];
}) {
  const reviews = product.reviews ?? [];
  const ratedReviews = reviews.filter((r) => r.rating && r.rating > 0);

  const aggregateRating = ratedReviews.length > 0
    ? {
        '@type': 'AggregateRating',
        ratingValue: (ratedReviews.reduce((sum, r) => sum + (r.rating ?? 5), 0) / ratedReviews.length).toFixed(1),
        reviewCount: ratedReviews.length,
        bestRating: 5,
        worstRating: 1,
      }
    : undefined;

  const reviewSchema = reviews.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewBody: t.text,
    ...(t.rating && {
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  }));

  const priceStr = typeof product.price === 'number'
    ? product.price.toFixed(2)
    : product.price.replace(/[^0-9.,]/g, '');

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    brand: { '@id': orgId },
    offers: {
      '@type': 'Offer',
      price: priceStr,
      priceCurrency: product.currency ?? 'EUR',
      availability: 'https://schema.org/InStock',
    },
    ...(product.image && {
      image: product.image.startsWith('http') ? product.image : `${siteConfig.url}${product.image}`,
    }),
    ...(aggregateRating && { aggregateRating }),
    ...(reviewSchema.length > 0 && { review: reviewSchema }),
  });
}

export function generateService(service: {
  name: string;
  description: string;
  url: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { '@id': orgId },
  });
}

export function generateArticle(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  locale?: Locale;
}, locale?: Locale) {
  const lang = locale ?? article.locale ?? 'nl';
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    inLanguage: lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': article.url },
    author: { '@id': founderUrl },
    publisher: { '@id': orgId },
    ...(article.image && {
      image: article.image.startsWith('http') ? article.image : `${siteConfig.url}${article.image}`,
    }),
  });
}

export function generateProfilePage() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: { '@id': founderUrl },
  });
}

export function generateCollectionPage(collection: {
  name: string;
  url: string;
  description: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    url: collection.url,
    description: collection.description,
  });
}

export function generateReviewArray(set: Testimonial[]): string[] {
  return set.map((t) =>
    JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Review',
      '@id': `${siteConfig.url}#review-${t.id}`,
      itemReviewed: { '@id': orgId },
      author: { '@type': 'Person', name: t.name },
      reviewBody: t.text,
    }),
  );
}

export function generateCaseStudy(caseData: {
  title: string;
  url: string;
  description: string;
  clientName: string;
  results: Array<{ value: string; label: string }>;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.title,
    description: caseData.description,
    url: caseData.url,
    articleSection: 'Case Study',
    author: { '@id': founderUrl },
    publisher: { '@id': orgId },
    about: {
      '@type': 'Organization',
      name: caseData.clientName,
    },
  });
}

export function generateVideoObject(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate?: string;
  duration?: string; // ISO 8601 e.g. PT2M30S
  inLanguage?: string;
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `${siteConfig.url}${video.thumbnailUrl}`,
    contentUrl: video.contentUrl.startsWith('http') ? video.contentUrl : `${siteConfig.url}${video.contentUrl}`,
    uploadDate: video.uploadDate ?? new Date().toISOString().split('T')[0],
    ...(video.duration && { duration: video.duration }),
    inLanguage: video.inLanguage ?? 'nl',
    publisher: { '@id': orgId },
  });
}

export function generateVideoObjectArray(videos: Array<{
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  inLanguage?: string;
}>): string[] {
  return videos.map((v) => generateVideoObject(v));
}

export function generatePerson(member: {
  slug?: string;
  name: string;
  role: string;
  description?: string;
  qualifications?: readonly string[];
  languages?: readonly string[];
  image?: string;
}) {
  const personUrl = member.slug ? `${siteConfig.url}/over-joost#${member.slug}` : `${siteConfig.url}/over-joost`;
  const fullImage = member.image
    ? (member.image.startsWith('http') ? member.image : `${siteConfig.url}${member.image}`)
    : undefined;

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personUrl,
    name: member.name,
    url: personUrl,
    jobTitle: member.role,
    ...(member.description && { description: member.description }),
    worksFor: { '@id': orgId },
    ...(member.languages && member.languages.length > 0 && { knowsLanguage: [...member.languages] }),
    ...(fullImage && { image: fullImage }),
  });
}
