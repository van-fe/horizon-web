<template>
  <h-video-player
    :sources="[
      {
        src: '/aurora-background.mp4',
        type: 'video/mp4',
        label: 'HD',
        default: true,
      },
      {
        src: '/aurora-background.mp4',
        type: 'video/mp4',
        label: 'SD',
      },
    ]"
    poster="/demo-assets/video-poster.svg"
  />
</template>
