<template>
  <div class="">
    <n-rate v-model="currentScore" size="small" />
    <n-rate v-model="currentScore" size="medium" />
    <n-rate v-model="currentScore" size="large" />
    <n-rate v-model="currentScore" size="32" />
    <n-rate v-model="currentScore" size="36" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3),
    };
  },
});
</script>
