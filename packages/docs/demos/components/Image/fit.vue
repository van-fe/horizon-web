<template>
  <div class="flex flex-wrap">
    <div v-for="item in fits" :key="item">
      <p class="text-center">
        {{ item }}
        <span v-if="item === 'cover'">(default)</span>
      </p>
      <h-image
        src="https://www.example.com/cdn-static/mydemo/nextjs/images/4124399E5BB45E85CBAFDE6307297F4A045845F4/home/es7-homepage-hero-desktop.jpg"
        :object-fit="item"
        class="mr-2 img"
        :width="150"
        :height="150"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
    };
  },
});
</script>

<style scoped>
.img {
  border: 2px dashed #aaa;
}
</style>
