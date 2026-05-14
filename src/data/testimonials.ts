import type { Locale } from './site';

export interface Testimonial {
  id: string;
  name: string;
  outcome?: string;
  website?: string;
  logo?: string; // filename in /src/assets/images/logos/
  photo?: string;
  text: string;
  rating?: number;
  productSlug?: string;
  featured?: boolean;
  locale?: Locale;
  cluster?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'rolf-happywithyoga',
    name: 'Rolf',
    outcome: 'Happy With Yoga',
    website: 'https://www.happywithyoga.com',
    logo: 'happywithyoga-logo.webp',
    photo: 'rolf-profile-photo-happywithyoga.png',
    text: 'Joost heeft een compleet systeem gebouwd dat onze bezoekers stap voor stap omzet in betalende leden. Van quiz-funnel tot webinar tot mini-cursus — alles werkt samen. We zitten nu op 30.000+ leads en 2.000 betalende platformleden.',
    rating: 5,
    featured: true,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'tessa-youlife',
    name: 'Tessa',
    outcome: 'Youlife',
    website: 'https://www.youlife.nl',
    logo: 'youlife-logo.avif',
    photo: 'tessa-youlife-profile-photo.png',
    text: 'We zijn in vier maanden van nul naar zo\'n €10.000 per maand aan online productomzet gegaan. Zes producten gelanceerd en gemiddeld tien coachingklanten per maand die binnenkomen via de productleads. Het systeem draait nu grotendeels automatisch.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'josine-coachjosine',
    name: 'Josine',
    outcome: 'Coach Josine',
    website: 'https://www.coachjosine.nl',
    logo: 'coachjosine-logo.avif',
    photo: 'coachjosine-profile-photo.png',
    text: 'Mijn eerste digitale product — de Eetstrijdguide — was in de eerste week al 600 keer verkocht. Daarnaast 80 aanmeldingen voor de masterclass. Ik had niet verwacht dat het zo snel zou gaan met de juiste lanceringsstructuur.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'claire-ikrouwvanje',
    name: 'Claire',
    outcome: 'ikrouwvanje.nl',
    website: 'https://www.ikrouwvanje.nl',
    logo: 'ikrouwvanje-logo.webp',
    photo: 'claire-profile-photo.png',
    text: '+25% meer klanten. Vanaf maand 3 werd het verschil echt duidelijk — en het mooiste: ik ben veel minder afhankelijk geworden van betaald adverteren.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
  {
    id: 'andrew-coreprogression',
    name: 'Andrew',
    outcome: 'Core Progression',
    text: 'Joost heeft ons geholpen om een compleet online traject neer te zetten. Van content strategie tot ads — alles werkt nu als één systeem. De resultaten spreken voor zich.',
    rating: 5,
    locale: 'nl',
    cluster: 'expert-growth',
  },
];

export function getTestimonials(opts: {
  featuredOnly?: boolean;
  productSlug?: string;
  locale?: Locale;
  cluster?: string;
} = {}): Testimonial[] {
  const targetLocale = opts.locale ?? 'nl';
  let result = testimonials.filter((t) => (t.locale ?? 'nl') === targetLocale);

  if (opts.productSlug) {
    result = result.filter((t) => t.productSlug === opts.productSlug);
  }

  if (opts.cluster) {
    result = result.filter((t) => t.cluster === opts.cluster);
  }

  if (opts.featuredOnly) {
    result = result.filter((t) => t.featured);
  }

  return result;
}

export function getProductTestimonials(productSlug: string, max = 4, locale: Locale = 'nl'): Testimonial[] {
  const localeTestimonials = testimonials.filter((t) => (t.locale ?? 'nl') === locale);
  const productReviews = localeTestimonials.filter((t) => t.productSlug === productSlug);
  const generalReviews = localeTestimonials.filter(
    (t) => !t.productSlug && !productReviews.some((pr) => pr.id === t.id),
  );
  return [...productReviews, ...generalReviews].slice(0, max);
}
