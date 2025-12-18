<template>
  <div class="">
    <n-rate v-model="currentScore" :half="true" />
    <n-rate v-model="currentScore" :half="true" size="32">A</n-rate>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentScore: ref(3.5),
    };
  },
});
</script>
