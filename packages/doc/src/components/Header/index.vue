<script lang="ts" setup>
import Size from './Size.vue';
import Locale from './Locale.vue';
import { inject, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { padModeInjectedKey, showTimeZoneInjectedKey } from '~/utils/injectedKeys';

const dark = useLocalStorage('dark-mode', false);
const padMode = inject(padModeInjectedKey)!;
const showTimeZone = inject(showTimeZoneInjectedKey)!;

watch(dark, val => {
  if (val) {
    document.querySelector('html')?.classList.add('horizon-web-dark-mode');
  } else {
    document.querySelector('html')?.classList.remove('horizon-web-dark-mode');
  }
}, {
  immediate: true,
});
</script>

<template>
  <div class='header'>
    <div class='logo-wrapper'>
      <img src="/lego-icon.svg" height="40" alt="horizon-web logo" />
    </div>
    <div class='header-body'>
      <h-space size="small">
        <h-space-item style="display: flex; align-items: center; grid-column-gap: 4px;">
          <h-switch v-model="showTimeZone" /> 显示时区
        </h-space-item>
        <h-space-item style="display: flex; align-items: center; grid-column-gap: 4px;">
          <h-switch v-model="padMode" /> Pad 模式
        </h-space-item>
        <h-space-item style="display: flex; align-items: center; grid-column-gap: 4px;">
          <h-switch v-model="dark" /> 暗黑模式
        </h-space-item>
        <size />
        <locale />
        <h-link href="https://fx.nioint.com/pages/sfc/" target="_blank">
          Playground
        </h-link>
        <h-link href="https://nio.feishu.cn/docs/doccnmqUM4iuP2kN5AGxAMM0Rkc#" target="_blank">
          Change Log
        </h-link>
      </h-space>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use '@aurora/horizon-web/es/styles/mixins';

.header {
  height: 100%;
  background: mixins.css-variable('bg-default');
  display: flex;

  .logo-wrapper {
    height: 100%;
    flex: 0 220px;
    font-size: 30px;
    font-weight: bold;
    color: mixins.css-variable('text-secondary');
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  &-body {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > span {
      display: inline-flex;
      align-items: center;
      margin-right: mixins.css-variable('spacing-3');
    }
  }

  &-right {
    flex: 0 180px;
  }
}
</style>
