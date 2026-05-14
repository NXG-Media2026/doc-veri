import type { ImageMetadata } from 'astro';

import joostLaptop from '../assets/images/founder/joost-sitting-laptop-looking-working.webp';
import joostFront from '../assets/images/founder/joost-sitting-laptop-lookingfront.webp';
import joostPlayful from '../assets/images/founder/joost-standing-playfull.webp';
import joostRelaxed from '../assets/images/founder/joost-standing-relaxed.webp';
import joostWorking from '../assets/images/founder/joost-standing-workinglaptop.webp';
import joostPortrait from '../assets/images/founder/joost-profielfoto-portrait.webp';

export interface SocialPost {
  id: string;
  title: string;
  type: 'reel' | 'carousel' | 'post' | 'story';
  url: string;
  image: ImageMetadata;
}

export const socialPosts: SocialPost[] = [
  {
    id: 'funnel-converteert-niet',
    title: 'Waarom je funnel niet converteert',
    type: 'reel',
    url: 'https://www.instagram.com/joostvanputten',
    image: joostLaptop,
  },
  {
    id: 'ai-vindbaarheid-lagen',
    title: '3 lagen van AI-vindbaarheid',
    type: 'carousel',
    url: 'https://www.instagram.com/joostvanputten',
    image: joostFront,
  },
  {
    id: 'nul-naar-10k',
    title: 'Van 0 naar €10k/mnd productomzet',
    type: 'post',
    url: 'https://www.instagram.com/joostvanputten',
    image: joostPlayful,
  },
  {
    id: 'chatgpt-concurrent',
    title: 'ChatGPT noemt je concurrent, niet jou',
    type: 'reel',
    url: 'https://www.instagram.com/joostvanputten',
    image: joostRelaxed,
  },
  {
    id: 'mini-producten-kwalificatie',
    title: 'Mini-producten als kwalificatiemachine',
    type: 'carousel',
    url: 'https://www.instagram.com/joostvanputten',
    image: joostWorking,
  },
  {
    id: 'systeem-30000-leads',
    title: 'Het systeem achter 30.000 leads',
    type: 'post',
    url: 'https://www.instagram.com/joostvanputten',
    image: joostPortrait,
  },
];

export function getSocialPosts(max: number = 6): SocialPost[] {
  return socialPosts.slice(0, max);
}
