<script setup lang="ts">
import Aside from './components/Aside/index.vue';
import Main from './components/Main/index.vue';
import Header from './components/Header/index.vue';
// import { NSuitPad } from '@aurora/horizon-web-pad';
import { routes } from './routes';
import { inject, provide, ref } from 'vue';
import type { ApplicationProps } from '@aurora/horizon-web';
import { defaultLocale, localeInjectKey } from '@aurora/horizon-web';
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
  <!-- <h-suit-pad :force="padMode"> -->
    <h-application :locale="locale?.current" :size="size" :use-button-spacing="true" :show-time-zone="showTimeZone">
      <h-container class="horizon-web-doc">
        <h-header>
          <Header />
        </h-header>
        <h-container>
          <h-aside width="auto">
            <Aside :menus="routes" />
          </h-aside>
          <h-main class="scroller-view">
            <Main>
              <router-view />
            </Main>
          </h-main>
        </h-container>
      </h-container>
    </h-application>
  <!-- </h-suit-pad> -->
</template>
