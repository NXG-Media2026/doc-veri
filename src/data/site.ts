const ga4Id = import.meta.env.PUBLIC_GA_MEASUREMENT_ID ?? '';
const gscId = import.meta.env.PUBLIC_GSC_VERIFICATION_ID ?? '';
const metaPixelId = import.meta.env.PUBLIC_META_PIXEL_ID ?? '';
const calendlyUrl = import.meta.env.PUBLIC_CALENDLY_URL ?? '';
const emailProvider = import.meta.env.PUBLIC_EMAIL_PROVIDER ?? 'placeholder';

export const siteConfig = {
  name: 'NXG Media',
  shortName: 'NXG Media',
  tagline: {
    nl: 'Bouw een online groeisysteem rond jouw expertise.',
    en: 'Build an online growth system around your expertise.',
    es: 'Visibilidad ante IA para clínicas locales.',
  },
  url: 'https://nxg-media.com',
  defaultLocale: 'nl' as const,
  locales: ['nl', 'en', 'es'] as const,
  languageSwitcherEnabled: true,

  analytics: {
    ga4MeasurementId: ga4Id,
    gscVerificationId: gscId,
    metaPixelId,
    plausible: '',
    gtm: '',
  },

  email: 'info@nxg-media.com',
  phone: '',

  socials: {
    linkedin: 'https://www.linkedin.com/in/joost-van-putten/',
    instagram: 'https://www.instagram.com/joostvanputten',
    youtube: '',
  },

  founder: {
    slug: 'joost-van-putten',
    name: 'Joost van Putten',
    role: 'Founder & Online Growth Strategist',
    bio: 'Founder van NXG Media. 7+ jaar ervaring in online groeisystemen. Meer dan €5 miljoen aan advertentiebudget beheerd voor coaches en experts. Bouwt systemen die gemiddeld 5-7x return on ad spend opleveren — met storytelling, productladders, emailflows, ads en AI-vindbaarheid als kern.',
    description: 'Joost van Putten is de oprichter van NXG Media en heeft 7+ jaar ervaring in het bouwen van online groeisystemen voor coaches, kennisondernemers en lokale praktijken. Hij heeft meer dan €5 miljoen aan advertentiebudget beheerd en werkt met 50+ coaches aan systemen die gemiddeld 5-7x return on ad spend realiseren. Daarnaast bouwt NXG Media aan AI-vindbaarheid voor lokale praktijken en MKB.',
    qualifications: [
      '7+ jaar ervaring in online marketing & funnelstrategie',
      '50+ coaches en experts begeleid naar voorspelbare leadflow',
      '€5M+ aan Meta Ads budget beheerd',
      'Gemiddeld 5-7x ROAS voor klanten',
    ] as string[],
    credentials: [
      { name: 'Facebook Certified Media Buying Professional', issuer: 'Meta', year: 2019 },
      { name: 'Google Analytics Academy', issuer: 'Google', year: 2019 },
    ] as Array<{ name: string; issuer: string; year: number }>,
    education: [] as Array<{ institution: string; degree: string; year: number }>,
    languages: ['Nederlands', 'Engels', 'Spaans'],
    memberships: [] as string[],
    publications: [] as string[],
    knowsAbout: [
      'Online groeisystemen voor experts',
      'Storytelling & content strategie',
      'Mini-producten & productladders',
      'Email marketing automatisering',
      'Meta Ads voor coaches en experts',
      'AI-vindbaarheid & citeerbaarheid',
      'Lokale vindbaarheid voor praktijken',
    ],
    image: '/images/joost-portrait.webp',
  },

  locations: ['Valencia, ES', 'Nederland'],

  external: {
    calendlyUrl,
    scannerUrl: 'https://scanner.nxg-media.com',
  },

  newsletter: {
    provider: emailProvider as 'placeholder' | 'mailerlite' | 'kit',
  },

  legal: {
    businessName: 'NXG-Media',
    responsiblePerson: 'Joost van Putten',
    street: 'Amendijk 1',
    postalCode: '3829DS',
    city: 'Hooglanderveen',
    country: 'Nederland',
    registerNumber: 'KVK 78318122',
    taxId: 'NL003318346B95',
    email: 'info@nxg-media.com',
    phone: '+34 645 80 73 02',
  },

  expertPersonId: 'https://nxg-media.com/#joost-van-putten',
} as const;

export type SiteConfig = typeof siteConfig;
export type Locale = (typeof siteConfig.locales)[number];
