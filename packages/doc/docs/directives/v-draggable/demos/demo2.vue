<template>
  <h-switch v-model="enabled" label="允许移动" label-position="right" />
  <div class="drag-container">
    <div v-draggable="{ enabled }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const enabled = ref(true);
    return {
      enabled,
    };
  },
});
</script>

<style scoped>
.drag-container {
  height: 200px;
}

.drag-container div {
  height: 80px;
  width: 80px;
  background: #14798f;
}
</style>
