<template>
  <div class="flex">
    <h-image
      v-for="rounded in roundedList"
      :key="rounded"
      class="mr-3"
      src="/demo-assets/scene-aurora.svg"
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
