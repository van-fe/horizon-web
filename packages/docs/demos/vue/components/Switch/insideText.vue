<script setup lang="ts">
import { ref } from 'vue';

const enabled = ref(false);
</script>

<template>
  <div class="switch-stage">
    <h-switch
      v-model="enabled"
      status
      status-position="inside"
      status-on-text="ON"
      status-off-text="OFF"
    />
  </div>
</template>

<style scoped>
.switch-stage {
  display: flex;
  align-items: center;
  min-height: 48px;
}
</style>
