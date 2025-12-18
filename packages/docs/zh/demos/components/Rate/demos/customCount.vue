<template>
  <div class="">
    <n-rate v-model="currentScore" :count="10" />
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
