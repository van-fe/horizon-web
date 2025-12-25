<script setup lang="ts">
import { $message, type NTabValue } from '@aurora/horizon-web';
import { ref } from 'vue';

const size = ref('small');
const tabs = Array(5)
  .fill(0)
  .map((_, index) => `TAG ${index + 1}`);

const onTabChanged = (tab: NTabValue) => {
  console.info('tab changed', tab);
  $message({ type: 'success', message: `Tab ${tab} is clicked` });
};
</script>

<template>
  <n-space class="box" block direction="vertical">
    <n-space>
      <span class="mr-4">尺寸</span>
      <n-radio-group v-model="size">
        <n-radio label="mini">mini(tag 不支持 mini)</n-radio>
        <n-radio label="small">small</n-radio>
        <n-radio label="medium">medium(Default)</n-radio>
        <n-radio label="large">large</n-radio>
      </n-radio-group>
    </n-space>
    <n-tabs :size="size" :underline="false" :indicator="false" @change="onTabChanged">
      <n-tab v-for="tab in tabs" :key="tab">
        <template #default="{ state }">
          <n-tag
            :size="size === 'mini' ? 'small' : size"
            :model-value="state"
            :clickable="false"
          >
            {{ tab }}
          </n-tag>
        </template>
      </n-tab>
    </n-tabs>
  </n-space>
</template>

<style scoped>
.box {
  --n-tabs-space--tab--line--mini: 4px;
  --n-tabs-space--tab--line--small: 4px;
  --n-tabs-space--tab--line--medium: 4px;
  --n-tabs-space--tab--line--large: 4px;
}
</style>
