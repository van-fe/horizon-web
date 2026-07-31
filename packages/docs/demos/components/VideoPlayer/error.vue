<template>
  <h-video-player
    :sources="[
      {
        src: 'https://www.example.com/not-found.mp4',
        type: 'video/mp4',
      },
    ]"
    poster="/demo-assets/scene-summit.svg"
  />
</template>
