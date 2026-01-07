<template>
  <div class="">
    只读
    <h-rate v-model="currentScore" readonly />
    禁用
    <h-rate v-model="currentScore" disabled />
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
