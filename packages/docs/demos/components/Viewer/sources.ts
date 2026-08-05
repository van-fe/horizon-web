import { demoAssetUrl, publicAssetUrl } from '../../demo-assets';
import type { HViewerSource } from '@aurora/horizon-web';

const localVideo = publicAssetUrl('aurora-background.mp4');

export function createImageReviewSources(): HViewerSource[] {
  return [
    {
      type: 'image',
      cover: demoAssetUrl('scene-coast.svg'),
      thumbnail: demoAssetUrl('scene-coast.svg'),
      title: 'Coastal launch campaign',
    },
    {
      type: 'image',
      cover: demoAssetUrl('scene-city.svg'),
      thumbnail: demoAssetUrl('scene-city.svg'),
      title: 'City launch campaign',
    },
    {
      type: 'image',
      cover: demoAssetUrl('scene-forest.svg'),
      thumbnail: demoAssetUrl('scene-forest.svg'),
      title: 'Forest launch campaign',
    },
    {
      type: 'image',
      cover: demoAssetUrl('scene-night.svg'),
      thumbnail: demoAssetUrl('scene-night.svg'),
      title: 'Night launch campaign',
    },
  ];
}

export function createVideoSource(): HViewerSource {
  return {
    type: 'video',
    cover: demoAssetUrl('video-poster.svg'),
    thumbnail: demoAssetUrl('video-poster.svg'),
    title: 'Reliability briefing',
    videoSources: [{ src: localVideo, type: 'video/mp4' }],
  };
}

export function createMixedReviewSources(): HViewerSource[] {
  return [createVideoSource(), ...createImageReviewSources()];
}
