<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        默认
      </div>
      <h-cascader v-model="currentVal1" :options="optionsWithEmpty" :to-body="false" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义空列表文案内容
      </div>
      <h-cascader
          v-model="currentVal1"
          :options="optionsWithEmpty"
          empty-content="没有对应的内容"
          :to-body="false"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">
        自定义空列表展示
      </div>
      <h-cascader v-model="currentVal1" :options="optionsWithEmpty" :to-body="false">
        <template #emptyRender>
          <h-empty description="没有对应的内容" />
        </template>
      </h-cascader>
    </h-col>
  </h-row>
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
