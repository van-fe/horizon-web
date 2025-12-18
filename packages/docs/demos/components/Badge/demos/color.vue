<template>
  <n-badge color="#7F1FBF" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
  <n-badge bottom :color="colors.info" class="mr-5">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
  <n-badge type="num" :content="3" :color="colors.orange[4]">
    <div style="background: gray; width: 50px; height: 50px"></div>
  </n-badge>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { colors } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    return {
      colors,
    };
  },
});
</script>
