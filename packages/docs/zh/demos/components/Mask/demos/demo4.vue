<template>
  <div class="box">
    <n-button @click="open">打开</n-button>
    <n-mask :value="show" :z-index="999">
      <n-button @click="close">关闭</n-button>
    </n-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const open = function () {
      show.value = true;
    };
    const close = function () {
      show.value = false;
    };
    return {
      show,
      open,
      close,
    };
  },
});
</script>

<style scoped>
.box {
  position: relative;
}
</style>
