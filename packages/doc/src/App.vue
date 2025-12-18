<script setup lang="ts">
import Aside from './components/Aside/index.vue';
import Main from './components/Main/index.vue';
import Header from './components/Header/index.vue';
import { NSuitPad } from '@nio-fe/lego-pad';
import { routes } from './routes';
import { inject, provide, ref } from 'vue';
import type { ApplicationProps } from '@nio-fe/lego';
import { defaultLocale, localeInjectKey } from '@nio-fe/lego';
import { padModeInjectedKey, showTimeZoneInjectedKey, sizeChangeInjectedKey } from './utils/injectedKeys';
import { useLocalStorage } from '@vueuse/core';

const size = ref<ApplicationProps['size']>('medium');
const locale = inject(localeInjectKey, defaultLocale);
const padMode = useLocalStorage('pad-mode', false);
const showTimeZone = useLocalStorage('show-time-zone', false);

provide(sizeChangeInjectedKey, (curr: ApplicationProps['size']) => {
  size.value = curr;
});

provide(padModeInjectedKey, padMode);
provide(showTimeZoneInjectedKey, showTimeZone);
</script>

<template>
  <n-suit-pad :force="padMode">
    <n-application :locale="locale?.current" :size="size" :use-button-spacing="true" :show-time-zone="showTimeZone">
      <n-container class="lego-doc">
        <n-header>
          <Header />
        </n-header>
        <n-container>
          <n-aside width="auto">
            <Aside :menus="routes" />
          </n-aside>
          <n-main class="scroller-view">
            <Main>
              <router-view />
            </Main>
          </n-main>
        </n-container>
      </n-container>
    </n-application>
  </n-suit-pad>
</template>
