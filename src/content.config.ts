import { defineCollection, z } from 'astro:content';

const Locale = z.enum(['nl', 'en', 'es']);
const Cluster = z.enum(['expert-growth', 'ai-vindbaarheid']);
const BrandFocus = z.enum(['personal', 'company', 'hybrid']);

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    locale: Locale,
    cluster: Cluster,
    secondaryClusters: z.array(Cluster).default([]),
    brandFocus: BrandFocus.default('hybrid'),
    clientType: z.string(),
    relationshipSince: z.string(),
    phase: z.enum(['eerste-tractie', 'productgroei', 'volwassen-platform', 'in-progress']),
    entryRoute: z.string(),
    startSituation: z.string(),
    whatWeBuilt: z.array(z.string()),
    proofStats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    strategicLesson: z.string(),
    screenshots: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    locale: Locale,
    cluster: Cluster,
    brandFocus: BrandFocus,
    productType: z.enum(['service', 'retainer', 'audit']).default('service'),
    pricing: z.object({
      setup: z.string().optional(),
      monthly: z.string().optional(),
      minimumTerm: z.string().optional(),
      status: z.enum(['fixed', 'pilot', 'from-pricing', 'custom']).default('custom'),
      note: z.string().optional(),
    }).optional(),
    primaryCta: z.string(),
    secondaryCta: z.string().optional(),
    problemRecognition: z.string(),
    failedSolutions: z.array(z.string()),
    mechanism: z.string(),
    method: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    forYouIf: z.array(z.string()),
    notForYouIf: z.array(z.string()),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    locale: Locale,
    cluster: Cluster,
    brandFocus: BrandFocus,
    productType: z.enum(['micro-product']).default('micro-product'),
    status: z.enum(['draft', 'live']).default('draft'),
    price: z.number(),
    currency: z.string().default('EUR'),
    format: z.string(),
    cover: z.string().optional(),
    shortDescription: z.string(),
    whatsInside: z.array(z.string()),
    forWhom: z.array(z.string()),
    checkoutUrl: z.string(),
    bumpOffers: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    calendlyContext: z.enum(['off', 'warm-only', 'coaching-only']).default('off'),
    featured: z.boolean().default(false),
    relatedCaseSlug: z.string().optional(),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pageSlug: z.string(),
    locale: Locale,
    cluster: Cluster.optional(),
    secondaryClusters: z.array(Cluster).default([]),
    publishedAt: z.string(),
    authorId: z.string().default('joost'),
    contentSchema: z.object({
      primaryQuestion: z.string(),
      primaryAnswer: z.string(),
    }),
  }),
});

export const collections = { cases, services, products, guides };
