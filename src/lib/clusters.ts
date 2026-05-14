import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { getCollection } from 'astro:content';
import type { Locale } from '../data/site';

// ─── Types ───────────────────────────────────────────────────────

export interface ClusterFaqItem {
  question: Record<string, string>;
  answer: Record<string, string>;
}

export interface CrossClusterLink {
  cluster: string;
  relationship: string;
  bridgeText: Record<string, string>;
  priority: number;
  showOn: Array<'hub' | 'articles' | 'services'>;
}

export interface LeadMagnet {
  slug: string;
  type: string;
  title: string;
  deliveryUrl: string;
  emailTag: string;
}

export interface ClusterAudience {
  primaryICP: string;
  metaPixelEvent: string;
  emailListTag: string;
  retargetingAudienceId: string;
}

export interface ClusterAnalytics {
  primarySuccessEvent: string;
  secondarySuccessEvents: string[];
  funnelOrder: string[];
}

export interface ClusterConfig {
  slug: string;
  hubSlug: string;
  title: string;
  shortTitle: string;
  heroImage: string;
  locales: string[];
  brandFocus: 'personal' | 'company';

  citableDefinition: Record<string, string>;
  hubIntro: Record<string, string>;

  featuredCases: string[];
  featuredGuides: string[];

  primaryProduct: string;
  secondaryProducts: string[];
  crossSellProducts: string[];

  leadMagnets: {
    primary: LeadMagnet;
    secondary?: LeadMagnet;
  };

  crossClusters: CrossClusterLink[];
  calendlyContext: string;
  audience: ClusterAudience;
  analytics: ClusterAnalytics;
  hubFaq: ClusterFaqItem[];
}

// ─── YAML loading ────────────────────────────────────────────────

const CLUSTERS_DIR = path.join(process.cwd(), 'src', 'data', 'clusters');
const clusterCache = new Map<string, ClusterConfig>();

export function getCluster(slug: string): ClusterConfig | null {
  if (clusterCache.has(slug)) {
    return clusterCache.get(slug)!;
  }

  const filePath = path.join(CLUSTERS_DIR, `${slug}.yaml`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const config = parseYaml(raw) as ClusterConfig;
  clusterCache.set(slug, config);
  return config;
}

export function getAllClusters(): ClusterConfig[] {
  if (!fs.existsSync(CLUSTERS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CLUSTERS_DIR).filter((f) => f.endsWith('.yaml'));

  return files.map((file) => {
    const slug = file.replace('.yaml', '');
    return getCluster(slug)!;
  }).filter(Boolean);
}

export function getClusterCitableDefinition(cluster: ClusterConfig, locale: Locale): string {
  return cluster.citableDefinition[locale] ?? cluster.citableDefinition.nl ?? '';
}

export function getClusterHubIntro(cluster: ClusterConfig, locale: Locale): string {
  return cluster.hubIntro[locale] ?? cluster.hubIntro.nl ?? '';
}

export function getClusterFaqLocalized(cluster: ClusterConfig, locale: Locale): Array<{ question: string; answer: string }> {
  return cluster.hubFaq.map((item) => ({
    question: item.question[locale] ?? item.question.nl ?? '',
    answer: item.answer[locale] ?? item.answer.nl ?? '',
  }));
}

export function supportsLocale(cluster: ClusterConfig, locale: Locale): boolean {
  return cluster.locales.includes(locale);
}

// ─── Content graph resolution ────────────────────────────────────

export async function getClusterCases(clusterSlug: string, locale?: Locale) {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  const cases = await getCollection('cases');

  return cases.filter((c) => {
    const data = c.data as Record<string, unknown>;
    if (locale && data.locale !== locale) return false;
    if (data.cluster === clusterSlug) return true;
    if (Array.isArray(data.secondaryClusters) && data.secondaryClusters.includes(clusterSlug)) return true;
    return false;
  });
}

export async function getClusterGuides(clusterSlug: string, locale?: Locale) {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  const guides = await getCollection('guides');

  return guides.filter((g) => {
    const data = g.data as Record<string, unknown>;
    if (locale && data.locale !== locale) return false;
    if (data.cluster === clusterSlug) return true;
    if (Array.isArray(data.secondaryClusters) && data.secondaryClusters.includes(clusterSlug)) return true;
    return false;
  });
}

export async function getClusterPrimaryProduct(clusterSlug: string, locale?: Locale) {
  const cluster = getCluster(clusterSlug);
  if (!cluster?.primaryProduct) return null;

  const services = await getCollection('services');
  return services.find(
    (s) => s.data.pageSlug === cluster.primaryProduct.replace('services/', '') && (!locale || s.data.locale === locale),
  ) ?? null;
}

export function getClusterBridges(
  clusterSlug: string,
  pageType: 'hub' | 'articles' | 'services',
): CrossClusterLink[] {
  const cluster = getCluster(clusterSlug);
  if (!cluster) return [];

  return cluster.crossClusters
    .filter((link) => link.showOn.includes(pageType))
    .sort((a, b) => a.priority - b.priority);
}
