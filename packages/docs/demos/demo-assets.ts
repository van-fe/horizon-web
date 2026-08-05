import type { HViewerSource } from '@aurora/horizon-web';

export function publicAssetUrl(pathname: string) {
  return `${import.meta.env.BASE_URL}${pathname.replace(/^\/+/, '')}`;
}

export function demoAssetUrl(fileName: string) {
  return publicAssetUrl(`demo-assets/${fileName}`);
}

export const demoImageUrls = [
  demoAssetUrl('scene-aurora.svg'),
  demoAssetUrl('scene-summit.svg'),
  demoAssetUrl('scene-coast.svg'),
  demoAssetUrl('scene-city.svg'),
  demoAssetUrl('scene-forest.svg'),
  demoAssetUrl('scene-night.svg'),
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
