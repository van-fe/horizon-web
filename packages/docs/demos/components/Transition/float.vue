<template>
  <div>
    <h-button type="normal" class="mb-2" @click="visible = !visible">Change</h-button>
    <h-grid :gap="10" style="height: 80px;">
      <h-grid-item :span="6">
        <h-transition name="float">
          <div v-show="visible" class="animate-box">float</div>
        </h-transition>
      </h-grid-item>
    </h-grid>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>

<style scoped>
.animate-box {
    width: 150px;
    height: 80px;
    background: var(--h-bg-brand-default);
    border-radius: var(--h-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--h-text-inverse);
}
</style>
