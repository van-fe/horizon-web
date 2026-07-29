<script setup lang="ts">
import { $message, type HTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const size = ref('small');
const tabs = Array(5)
  .fill(0)
  .map((_, index) => `TAG ${index + 1}`);

const onTabChanged = (tab: HTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <h-space class="box" block direction="vertical">
    <h-space>
      <span class="mr-4">尺寸</span>
      <h-radio-group v-model="size">
        <h-radio label="mini">mini(tag 不支持 mini)</h-radio>
        <h-radio label="small">small</h-radio>
        <h-radio label="medium">medium(Default)</h-radio>
        <h-radio label="large">large</h-radio>
      </h-radio-group>
    </h-space>
    <h-tabs :size="size" :underline="false" :indicator="false" @change="onTabChanged">
      <h-tab v-for="tab in tabs" :key="tab">
        <template #default="{ state }">
          <h-tag
            :size="size === 'mini' ? 'small' : size"
            :model-value="state"
            :clickable="false"
          >
            {{ tab }}
          </h-tag>
        </template>
      </h-tab>
    </h-tabs>
  </h-space>
</template>

<style scoped>
.box {
  --n-tabs-space--tab--line--mini: 4px;
  --n-tabs-space--tab--line--small: 4px;
  --n-tabs-space--tab--line--medium: 4px;
  --n-tabs-space--tab--line--large: 4px;
}
</style>
