import { defineCollection, z } from 'astro:content';

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const seoFields = z.object({
  title: z.string().max(60),
  description: z.string().max(155),
});

const i18nFields = {
  locale: z.enum(['de', 'en']).default('de'),
  translationKey: z.string().optional(),
};

const produkte = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    price: z.string(),
    currency: z.literal('EUR'),
    plugAndPayUrl: z.string().url(),
    heroImage: image().optional(),
    shortDescription: z.string().max(160),
    longDescription: z.string(),
    includes: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })),
    targetAudience: z.array(z.string()),
    cluster: z.string().optional(),
    secondaryClusters: z.array(z.string()).optional(),
    productType: z.enum(['guide', 'bundle', 'course', 'membership', 'micro-product']).optional(),
    partOfBundle: z.object({
      product: z.string(),
      reason: z.string(),
      label: z.string().optional(),
      ctaLabel: z.string().optional(),
    }).optional(),
    notForYou: z.array(z.string()).optional(),
    valueProposition: z.object({
      doThis: z.string(),
      getThis: z.array(z.string()),
      howItWorks: z.array(z.string()),
    }).optional(),
    expertPOV: z.string().optional(),
    ctaBullets: z.array(z.string()).optional(),
    faq: z.array(faqItem).default([]),
    featuredTestimonialIds: z.array(z.string()).optional(),
    relatedProductSlugs: z.array(z.string()).optional(),
    sortOrder: z.number().default(50),
    hidden: z.boolean().default(false),
    seo: seoFields,
    ...i18nFields,
  }),
});

const coaching = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    format: z.enum(['1-on-1', 'group', 'hybrid']),
    duration: z.string(),
    heroImage: image().optional(),
    shortDescription: z.string().max(160),
    outcomes: z.array(z.string()),
    methodology: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    includes: z.array(z.string()),
    faq: z.array(faqItem).default([]),
    ctaUrl: z.string(),
    seo: seoFields,
    ...i18nFields,
  }),
});

const artikel = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    pillarSlug: z.string(),
    cluster: z.string().optional(),
    secondaryClusters: z.array(z.string()).optional(),
    publishedDate: z.date(),
    lastReviewedDate: z.date(),
    excerpt: z.string().max(200),
    heroImage: image().optional(),
    authorId: z.string().default('verena'),
    readingTime: z.number(),
    relatedArticleSlugs: z.array(z.string()).optional(),
    relatedProductSlugs: z.array(z.string()).optional(),
    seo: seoFields,
    ...i18nFields,
  }),
});

const pillars = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    heroImage: image().optional(),
    citableDefinition: z.string().max(300),
    subtopics: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    faq: z.array(faqItem).default([]),
    seo: seoFields,
    ...i18nFields,
  }),
});

const archetypen = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    heroImage: image().optional(),
    shortDescription: z.string().max(200),
    explanation: z.string(),
    commonSymptoms: z.array(z.string()),
    recommendedProductSlugs: z.array(z.string()),
    recommendedCoachingSlugs: z.array(z.string()),
    recommendedClusterSlugs: z.array(z.string()).optional(),
    faq: z.array(faqItem).default([]),
    seo: seoFields,
    ...i18nFields,
  }),
});

const mitgliedschaft = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    heroImage: image().optional(),
    monthlyPrice: z.string(),
    whatYouGet: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })),
    format: z.string(),
    faq: z.array(faqItem).default([]),
    ctaUrl: z.string().optional(),
    seo: seoFields,
    isLive: z.boolean().default(false),
    ...i18nFields,
  }),
});

const glossar = defineCollection({
  type: 'data',
  schema: z.object({
    term: z.string(),
    slug: z.string(),
    cluster: z.string().optional(),
    secondaryClusters: z.array(z.string()).optional(),
    definition: z.string(),
    longDescription: z.string().optional(),
    relatedTerms: z.array(z.string()).optional(),
    linkedArticle: z.string().optional(),
    seo: seoFields.optional(),
    ...i18nFields,
  }),
});

const leadMagnets = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    pageSlug: z.string(),
    heroImage: image().optional(),
    coverImage: image().optional(),
    shortDescription: z.string().max(160),
    whatYouGet: z.array(z.string()),
    pages: z.number().optional(),
    tag: z.string(),
    deliveryFileUrl: z.string().url().optional(),
    seo: seoFields,
    ...i18nFields,
  }),
});

export const collections = {
  produkte,
  coaching,
  artikel,
  pillars,
  archetypen,
  mitgliedschaft,
  leadMagnets,
  glossar,
};
