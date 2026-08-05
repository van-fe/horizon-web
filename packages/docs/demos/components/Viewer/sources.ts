import type { HViewerSource } from '@aurora/horizon-web';

const localVideo = '/aurora-background.mp4';

export function createImageReviewSources(): HViewerSource[] {
  return [
    {
      type: 'image',
      cover: '/demo-assets/scene-coast.svg',
      thumbnail: '/demo-assets/scene-coast.svg',
      title: 'Coastal launch campaign',
    },
    {
      type: 'image',
      cover: '/demo-assets/scene-city.svg',
      thumbnail: '/demo-assets/scene-city.svg',
      title: 'City launch campaign',
    },
    {
      type: 'image',
      cover: '/demo-assets/scene-forest.svg',
      thumbnail: '/demo-assets/scene-forest.svg',
      title: 'Forest launch campaign',
    },
    {
      type: 'image',
      cover: '/demo-assets/scene-night.svg',
      thumbnail: '/demo-assets/scene-night.svg',
      title: 'Night launch campaign',
    },
  ];
}

export function createVideoSource(): HViewerSource {
  return {
    type: 'video',
    cover: '/demo-assets/video-poster.svg',
    thumbnail: '/demo-assets/video-poster.svg',
    title: 'Reliability briefing',
    videoSources: [{ src: localVideo, type: 'video/mp4' }],
  };
}

export function createMixedReviewSources(): HViewerSource[] {
  return [createVideoSource(), ...createImageReviewSources()];
}
