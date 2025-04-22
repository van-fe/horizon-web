<template>
  <div class="">
    <n-rate v-model="currentScore" color="pink" void-color="blue" />
    <n-rate v-model="currentScore" disabled disabled-color="green" />
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
