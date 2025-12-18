<template>
  <div class="demo-progress">
    <n-progress :percentage="50" />
    <n-progress :percentage="100" :format="format" />
    <n-progress :percentage="100" status="success" />
    <n-progress :percentage="100" status="warning" />
    <n-progress :percentage="50" status="exception" />
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
.demo-progress .n-progress-line {
  margin-bottom: 15px;
  width: 350px;
}
</style>
