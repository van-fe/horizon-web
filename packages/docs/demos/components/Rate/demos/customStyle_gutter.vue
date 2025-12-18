<template>
  <div class="">
    <n-rate v-model="currentScore" :gutter="10" />
    <n-rate v-model="currentScore" :gutter="30" />
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
