import type { HViewerSource } from '@aurora/horizon-web';

export const demoImageUrls = [
  '/demo-assets/scene-aurora.svg',
  '/demo-assets/scene-summit.svg',
  '/demo-assets/scene-coast.svg',
  '/demo-assets/scene-city.svg',
  '/demo-assets/scene-forest.svg',
  '/demo-assets/scene-night.svg',
] as const;

export function getDemoImageUrl(index: number) {
  return demoImageUrls[index % demoImageUrls.length];
}

export function createDemoViewerSources(count: number): HViewerSource[] {
  return Array.from({ length: count }, (_, index) => {
    const imageUrl = getDemoImageUrl(index);
    return {
      type: 'image',
      thumbnail: imageUrl,
      cover: imageUrl,
      title: `Demo image ${index + 1}`,
    };
  });
}
