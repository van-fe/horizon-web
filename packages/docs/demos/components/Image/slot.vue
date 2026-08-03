<template>
  <div class="flex">
    <h-image
      src="/demo-assets/scene-aurora.svg"
      width="300px"
      height="300px"
      class="mr-2"
    >
      <div
        class="absolute p-3"
        style="
          width: 100%;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
        "
      >
        <div class="white text-body-1">Demo ES7</div>
        <span class="white">FAR BEYOND</span>
      </div>
    </h-image>
    <h-image
      src="/demo-assets/scene-aurora.svg"
      width="300px"
      height="300px"
    >
      <template #hover>
        <div
          class="absolute p-3"
          style="
            width: 100%;
            bottom: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
          "
        >
          <div class="white text-body-1">Demo ES7</div>
          <span class="white">FAR BEYOND</span>
        </div>
      </template>
    </h-image>
  </div>
</template>
