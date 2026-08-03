<template>
  <div class="box">
    <h-button @click="open">打开</h-button>
    <h-mask :value="show" absolute :opacity="0.5">
      <h-button @click="close">关闭</h-button>
    </h-mask>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const open = function () {
      console.info('打开');
      show.value = true;
    };
    const close = function () {
      console.info('关闭');
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
  width: 200px;
  height: 200px;
  box-shadow:
    0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
