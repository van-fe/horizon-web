<template>
  <div class="flex">
    <h-image
      v-for="rounded in roundedList"
      :key="rounded"
      class="mr-3"
      src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
      width="150px"
      height="150px"
      :rounded="rounded"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      roundedList: [0, 2, 4, '8px', '50%'],
    };
  },
});
</script>
