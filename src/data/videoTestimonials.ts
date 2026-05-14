import type { ImageMetadata } from 'astro';
import type { VideoTestimonial } from '../components/VideoTestimonialCarousel.astro';

// Real video frame thumbnails extracted from testimonial videos
import bartThumb from '../assets/images/testimonials/mcm-research-thumb.webp';
import jeroenThumb from '../assets/images/testimonials/stekkies-thumb.webp';
import narayanThumb from '../assets/images/testimonials/narayan-eetclubnl-thumb.webp';
import catThumb from '../assets/images/testimonials/cathowell-8loops-thumb.webp';
import julianThumb from '../assets/images/testimonials/somnox-thumb.webp';

/**
 * Video testimonials — horizontal carousel on homepage.
 *
 * Thumbnails are extracted frames from the actual videos.
 * Videos served from /public/videos/testimonials/ (static).
 */
export const videoTestimonials: VideoTestimonial[] = [
  {
    id: 'bart-jenezon',
    name: 'Bart Jenezon',
    company: 'MCM Research',
    quote: "It's really great to work with Joost, he helps us with every aspect to reach our target audience",
    rating: 5,
    thumbnail: bartThumb,
    videoUrl: '/videos/testimonials/mcm-research-testimonial-video.mp4',
  },
  {
    id: 'jeroen-stekkies',
    name: 'Jeroen',
    company: 'Stekkies',
    quote: 'Joost helped us to go from zero ad budget euros in our account to now thousands of euros per month. He has a lot of valuable ideas for our company.',
    rating: 5,
    thumbnail: jeroenThumb,
    videoUrl: '/videos/testimonials/stekkies-testimonial-video.mp4',
  },
  {
    id: 'narayan-nederlandeet',
    name: 'Narayan',
    company: 'CEO Nederland Eetgroep',
    quote: 'Joost is altijd proactief met het opzetten van ads, en helpt ons maandelijks om onze doelstellingen te behalen',
    rating: 5,
    thumbnail: narayanThumb,
    videoUrl: '/videos/testimonials/narayan-eetclubnl-testimonial-video.mp4',
  },
  {
    id: 'cat-howell',
    name: 'Cat Howell',
    company: 'Author, Agency Owner',
    quote: 'Joost is one of the only marketers that passed our yearly E-commerce challenge for digital marketers and he did so with a great result',
    rating: 5,
    thumbnail: catThumb,
    videoUrl: '/videos/testimonials/cathowell-8loops-testimonial-video.mp4',
  },
  {
    id: 'julian-jagtenberg',
    name: 'Julian Jagtenberg',
    company: 'Somnox',
    quote: 'Dankzij Joost zijn we van 0 euro in ad spend naar enkele duizenden euros per maand gegaan die we winstgevend uitgeven via het Facebook/Meta ads platform',
    rating: 5,
    thumbnail: julianThumb,
    videoUrl: '/videos/testimonials/somnox-testimonial-video.mp4',
  },
];
