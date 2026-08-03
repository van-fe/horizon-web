<template>
  <div class="">
    <h-rate v-model="currentScore" size="small" />
    <h-rate v-model="currentScore" size="medium" />
    <h-rate v-model="currentScore" size="large" />
    <h-rate v-model="currentScore" size="32" />
    <h-rate v-model="currentScore" size="36" />
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
