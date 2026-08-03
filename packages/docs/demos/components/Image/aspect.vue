<template>
  <div class="flex">
    <div v-for="ratio in ratios" :key="ratio" class="mr-3" style="width: 20%">
            <p class="text-center">{{ ratio.replace('/', ':') }}</p>
      <h-image
        src="/demo-assets/scene-aurora.svg"
        width="100%"
        :aspect-ratio="ratio"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      ratios: ['1/1', '16/9'],
    };
  },
});
</script>
