<template>
  <h-button @click="visible = true">点我</h-button>
  <h-dialog
    class="my-dialog"
    v-model="visible"
    header-margin="0"
    footer-margin="0"
    :class-names="{
      wrapper: 'my-wrapper',
      header: 'my-header',
      body: 'my-body',
      footer: 'my-footer',
      mask: 'my-mask'
    }"
    title="标题"
    @primaryClick="onPrimary"
    @secondaryClick="onSecondary"
  >
    <p>完全自定义</p>
  </h-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const visible2 = ref(false);
const onPrimary = () => {
  console.info('Primary button clicked!');
  visible2.value = true;
};
const onSecondary = () => {
  console.info('Secondary button clicked!');
  visible.value = false;
};
</script>

<style lang="scss">
.my-dialog{
  .my-wrapper {
    padding: 0;
  }
  .my-header {
    padding: var(--h-spacing-7) var(--h-spacing-7) 16px;
    border-bottom: 1px solid #000;
  }
  .my-body {
    background-color: #fff7e6;
    margin: 0;
  }
  .my-footer {
    margin-top: 0;
    border-top: 1px solid #000;
    padding: 16px var(--h-spacing-7) var(--h-spacing-7);
  }
  .my-mask {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
