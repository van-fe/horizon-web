<template>
  <div class="demo-progress">
    <h-progress :percentage="50" />
    <h-progress :percentage="100" :format="format" />
    <h-progress :percentage="100" status="success" />
    <h-progress :percentage="100" status="warning" />
    <h-progress :percentage="50" status="exception" />
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
.demo-progress .h-progress-line {
  margih-bottom: 15px;
  width: 350px;
}
</style>
