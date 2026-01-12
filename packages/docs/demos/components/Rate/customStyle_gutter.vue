<template>
  <div class="">
    <h-rate v-model="currentScore" :gutter="10" />
    <h-rate v-model="currentScore" :gutter="30" />
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
