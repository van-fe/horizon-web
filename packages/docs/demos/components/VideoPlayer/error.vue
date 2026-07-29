<template>
  <h-video-player
    :sources="[
      {
        src: 'https://www.example.com/not-found.mp4',
        type: 'video/mp4',
      },
    ]"
    poster="https://www.example.com/cdn-static/mydemo/nextjs/images/et5/top-hero-desktop.jpg"
  />
</template>
