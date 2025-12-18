<template>
  <n-space>
    <n-input v-model="val" status="error" />
    <n-input v-model="val" input-style="emphasize" status="error" />
    <n-input v-model="val" input-style="no-border" status="error" />
  </n-space>
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
