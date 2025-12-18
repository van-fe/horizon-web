<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <n-cascader v-model="currentVal1" :options="optionsWithGroup" :to-body="false" />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';

const currentVal1 = ref<(string | number)[]>([]);

const optionsWithGroup = [
  {
    groupLabel: 'components',
  },
  {
    value: 'navigation',
    label: 'Navigation',
    children: [
      {
        value: 'side navigation',
        label: 'Side Navigation',
      },
      {
        value: 'top navigation',
        label: 'Top Navigation',
      },
    ],
  },
  {
    groupLabel: () =>
      h(
        'div',
        {
          style: 'font-weight: 700;',
        },
        ['directives'],
      ),
  },
  {
    value: 'tooltip',
    label: 'Tooltip',
    children: [
      {
        value: 'visible tooltip',
        label: 'Visible Tooltip',
      },
      {
        value: 'hidden tooltip',
        label: 'Hidden Tooltip',
      },
    ],
  },
];
</script>
