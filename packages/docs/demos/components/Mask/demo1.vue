<template>
  <div style="display: flex">
    <div class="box">
      <h-button @click="open">打开(default)</h-button>
      <h-mask :value="show" type="default">
        <h-button @click="close">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open01">打开(weak)</h-button>
      <h-mask :value="show01" type="weak">
        <h-button @click="close01">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open02">打开(strong)</h-button>
      <h-mask :value="show02" type="strong">
        <h-button @click="close02">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open03">打开(inverse)</h-button>
      <h-mask :value="show03" type="inverse">
        <h-button @click="close03">关闭</h-button>
      </h-mask>
    </div>
    <div class="box">
      <h-button @click="open04">打开(transparent)</h-button>
      <h-mask :value="show04" type="transparent">
        <h-button @click="close04">关闭</h-button>
      </h-mask>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const show = ref(false);
    const show01 = ref(false);
    const show02 = ref(false);
    const show03 = ref(false);
    const show04 = ref(false);
    const open = function () {
      show.value = true;
    };
    const close = function () {
      show.value = false;
    };
    const open01 = function () {
      show01.value = true;
    };
    const close01 = function () {
      show01.value = false;
    };
    const open02 = function () {
      show02.value = true;
    };
    const close02 = function () {
      show02.value = false;
    };
    const open03 = function () {
      show03.value = true;
    };
    const close03 = function () {
      show03.value = false;
    };
    const open04 = function () {
      show04.value = true;
    };
    const close04 = function () {
      show04.value = false;
    };
    return {
      show,
      show01,
      show02,
      show03,
      show04,
      open,
      close,
      open01,
      close01,
      open02,
      close02,
      open03,
      close03,
      open04,
      close04,
    };
  },
});
</script>

<style scoped>
.box {
  position: relative;
  margin: 0px 10px;
}
</style>
