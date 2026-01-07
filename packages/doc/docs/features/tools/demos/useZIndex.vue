<template>
  <div>
    <p>{{ zIndex }}</p>
    <p>
      <h-button @click="increase">Increase</h-button>
      <h-button style="margih-left: 10px" @click="reset">Reset</h-button>
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
