<template>
  <div>
    <p>{{ zIndex }}</p>
    <p>
      <n-button @click="increase">Increase</n-button>
      <n-button style="margin-left: 10px" @click="reset">Reset</n-button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useZIndex } from '@aurora/horizon-web';

export default defineComponent({
  name: 'UseZIndex',
  setup() {
    const zIndexHandler = useZIndex();
    const zIndex = ref(zIndexHandler.current);
    const increase = () => {
      zIndex.value = zIndexHandler.next();
    };

    const reset = () => {
      zIndex.value = zIndexHandler.set(2000);
    };

    return {
      zIndex,
      zIndexHandler,
      increase,
      reset,
    };
  },
});
</script>
