<template>
  <div class="">
    <h-rate v-model="currentScore" :half="true" />
    <h-rate v-model="currentScore" :half="true" size="32">A</h-rate>
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
