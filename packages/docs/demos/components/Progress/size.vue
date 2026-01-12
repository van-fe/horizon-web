<template>
  <div class="demo-progress">
    <h-progress :percentage="100" size="xs" />
    <h-progress :percentage="100" :format="format" size="s" />
    <h-progress :percentage="50" />
    <h-progress :percentage="100" size="l" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage}%`);
    return {
      format,
    };
  },
});
</script>

<style>
.demo-progress .h-progress-container {
  margin-bottom: 15px;
  width: 350px;
}
</style>
