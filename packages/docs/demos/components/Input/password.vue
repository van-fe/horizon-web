<template>
  <h-input v-model="val" clearable type="password" show-password />
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
