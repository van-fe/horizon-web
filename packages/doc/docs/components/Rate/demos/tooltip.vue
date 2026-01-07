<template>
  <div class="">
    <h-rate v-model="currentScore" show-tooltip />
    <h-rate v-model="currentScore" show-tooltip :tooltip="tooltipText" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      tooltipText: reactive(['oops', 'disappointed', 'normal', 'good', 'great']),
      currentScore: ref(3),
    };
  },
});
</script>
