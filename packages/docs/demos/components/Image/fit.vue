<template>
  <div class="flex flex-wrap">
    <div v-for="item in fits" :key="item">
      <p class="text-center">
        {{ item }}
        <span v-if="item === 'cover'">(default)</span>
      </p>
      <h-image
        src="/demo-assets/scene-aurora.svg"
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
