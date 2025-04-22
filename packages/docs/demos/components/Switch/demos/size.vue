<template>
  <n-switch v-model="currentRef" status label="Some text" />
  <n-switch v-model="currentRef" size="small" status label="Some text" class="ml-4" />
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
