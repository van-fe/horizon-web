<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        默认
      </div>
      <n-modal-cascader v-model="currentVal1" :options="optionsWithEmpty" :to-body="false" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        自定义空列表文案内容
      </div>
      <n-modal-cascader
          v-model="currentVal1"
          :options="optionsWithEmpty"
          empty-content="没有对应的内容"
          :to-body="false"
      />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        自定义空列表展示
      </div>
      <n-modal-cascader v-model="currentVal1" :options="optionsWithEmpty" :to-body="false">
        <template #emptyRender>
          <n-empty description="没有对应的内容" />
        </template>
      </n-modal-cascader>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentVal1 = ref<string[]>([]);

const optionsWithEmpty = [
  {
    value: 'disciplines',
    label: 'disciplines',
    isLeaf: false,
  },
  {
    value: 'navigation',
    label: 'Navigation',
    children: [
      {
        value: 'side nav',
        label: 'Side Navigation',
      },
      {
        value: 'top nav',
        label: 'Top Navigation',
      },
    ],
  },
];
</script>
