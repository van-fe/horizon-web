<template>
  <div class="demo-progress">
    <n-progress :percentage="100" size="xs" />
    <n-progress :percentage="100" :format="format" size="s" />
    <n-progress :percentage="50" />
    <n-progress :percentage="100" size="l" />
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
.demo-progress .n-progress-container {
  margin-bottom: 15px;
  width: 350px;
}
</style>
