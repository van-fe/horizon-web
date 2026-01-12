<template>
  <h-space>
    <h-input v-model="val" status="error" />
    <h-input v-model="val" input-style="emphasize" status="error" />
    <h-input v-model="val" input-style="no-border" status="error" />
  </h-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const val = ref('');
    return {
      val,
    };
  },
});
</script>
