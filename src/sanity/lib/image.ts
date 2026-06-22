import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '741ifkcf';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const imageBuilder = imageUrlBuilder({
  projectId: projectId,
  dataset: dataset,
});

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max')
}
