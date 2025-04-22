<template>
  <n-switch v-model="currentRef" label="Some text" status />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      currentRef: ref(false),
    };
  },
});
</script>
