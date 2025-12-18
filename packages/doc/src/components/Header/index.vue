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
    document.querySelector('html')?.classList.add('lego-dark-mode');
  } else {
    document.querySelector('html')?.classList.remove('lego-dark-mode');
  }
}, {
  immediate: true,
});
</script>

<template>
  <div class='header'>
    <div class='logo-wrapper'>
      <img src="https://cdn-fx.nio.com/fx/lego/ObrJWptCzEzZto4D0eMjS/logo.png" height="40" alt="lego logo" />
    </div>
    <div class='header-body'>
      <n-space size="small">
        <n-space-item style="display: flex; align-items: center; grid-column-gap: 4px;">
          <n-switch v-model="showTimeZone" /> 显示时区
        </n-space-item>
        <n-space-item style="display: flex; align-items: center; grid-column-gap: 4px;">
          <n-switch v-model="padMode" /> Pad 模式
        </n-space-item>
        <n-space-item style="display: flex; align-items: center; grid-column-gap: 4px;">
          <n-switch v-model="dark" /> 暗黑模式
        </n-space-item>
        <size />
        <locale />
        <n-link href="https://fx.nioint.com/pages/sfc/" target="_blank">
          Playground
        </n-link>
        <n-link href="https://nio.feishu.cn/docs/doccnmqUM4iuP2kN5AGxAMM0Rkc#" target="_blank">
          Change Log
        </n-link>
      </n-space>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use '@nio-fe/lego/es/styles/mixins';

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
