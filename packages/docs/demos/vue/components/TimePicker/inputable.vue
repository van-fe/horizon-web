<script setup lang="ts">
import { ref } from 'vue';

const inputable = ref(true);
const value = ref('09:15');
const status = ref('尚未修改');
</script>

<template>
  <section class="docs-demo">
    <div class="docs-demo__controls">
      <h-switch v-model="inputable" label="Allow typing" />
    </div>

    <h-time-picker
      v-model="value"
      value-format="HH:mm"
      :inputable="inputable"
      :to-body="false"
      @input="status = `正在输入：${$event}`"
      @change="status = `已提交：${$event}`"
    />
    <p class="docs-demo__status" aria-live="polite">{{ status }}</p>
  </section>
</template>
