<template>
  <n-application :get-popup-container="getPopupContainer">
    <n-space block direction="vertical">
      <n-radio-group v-model="componentType">
        <n-radio v-for="k in Object.keys(overlays)" :value="k">{{ k }}</n-radio>
      </n-radio-group>

      <component :is="currentOverlay" />
      <div id="appoint">
        <div>
          这里指定
          <i>#appoint</i>
          节点挂载
        </div>
      </div>
    </n-space>
  </n-application>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import * as overlays from './container-demos';

const getPopupContainer = () => {
  return document.querySelector('#appoint') as HTMLElement;
};

const componentType = ref<keyof typeof overlays>('dialog');
const currentOverlay = computed(() => overlays[componentType.value]);
</script>
