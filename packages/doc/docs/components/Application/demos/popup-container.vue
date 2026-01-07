<template>
  <h-application :get-popup-container="getPopupContainer">
    <h-space block direction="vertical">
      <h-radio-group v-model="componentType">
        <h-radio v-for="k in Object.keys(overlays)" :value="k">{{ k }}</h-radio>
      </h-radio-group>

      <component :is="currentOverlay" />
      <div id="appoint">
        <div>
          这里指定
          <i>#appoint</i>
          节点挂载
        </div>
      </div>
    </h-space>
  </h-application>
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
