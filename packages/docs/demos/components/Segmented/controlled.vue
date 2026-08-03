<script setup lang="ts">
import { ref } from 'vue';

const active = ref('Wednesday');
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
</script>

<template>
  <section class="docs-demo">
    <h-select v-model="active" :to-body="false" aria-label="选择工作日">
      <h-option v-for="day in days" :key="day" :label="day" :value="day" />
    </h-select>
    <h-segmented v-model:active-key="active" block>
      <h-segmented-item v-for="day in days" :key="day" :label="day" />
    </h-segmented>
  </section>
</template>
