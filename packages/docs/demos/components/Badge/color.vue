<template>
  <h-badge color="#7F1FBF" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge bottom :color="colors.info" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
  <h-badge type="num" :content="3" :color="colors.orange[4]">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </h-badge>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    return {
      colors,
    };
  },
});
</script>
