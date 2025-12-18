<template>
  <div>
    <div
      class="mb-2"
      style="width: 220px; display: flex; align-items: center; justify-content: space-between"
    >
      背景主题色:
      <n-select v-model="bgColorValue">
        <n-option v-for="color in teals" :key="color" :value="color" :label="color"></n-option>
      </n-select>
    </div>
    <div
      class="mb-2"
      style="width: 220px; display: flex; align-items: center; justify-content: space-between"
    >
      文字主题色:
      <n-select v-model="textColorValue">
        <n-option v-for="color in blues" :key="color" :value="color" :label="color"></n-option>
      </n-select>
    </div>
    <n-cascader v-model="currentVal" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h, watchEffect } from 'vue';

import { $themes, colors } from '@nio-fe/lego';

export default defineComponent({
  setup() {
    const currentVal = ref<string[][]>([]);

    const bgColorValue = ref('');
    const textColorValue = ref('');

    watchEffect(() => {
      $themes.set(
        {
          bgPrimary: bgColorValue.value,
        },
        document.body,
      );
    });

    watchEffect(() => {
      $themes.set({
        textPrimary: textColorValue.value,
      });
    });

    return {
      bgColorValue,
      textColorValue,
      currentVal,
      teals: colors.brand,
      blues: colors.blue,
      options: [
        {
          value: 'a',
          label: '1',
          children: [
            {
              value: 'a-a',
              label: (option: any) =>
                h(
                  'div',
                  {
                    style: 'border: 1px solid #f00;',
                  },
                  [h('span', {}, ['我的值是：', option.value])],
                ),
              children: [
                {
                  value: 'a-a-a',
                  label: '1-1-1',
                },
                {
                  value: 'a-a-b',
                  label: '1-1-2',
                },
              ],
            },
            {
              value: 'a-b',
              label: '1-2',
              children: [
                {
                  value: 'a-b-a',
                  label: '1-2-1',
                },
                {
                  value: 'a-b-b',
                  label: '1-2-2',
                },
              ],
            },
            {
              value: 'a-c',
              label: '1-3',
              children: [
                {
                  value: 'a-c-a',
                  label: '1-3-1',
                },
              ],
            },
          ],
        },
        {
          value: 'b',
          label: '2',
          children: [
            {
              value: 'b-a',
              label: '2-1',
            },
            {
              value: 'b-b',
              label: '2-2',
              children: [
                {
                  value: 'b-b-a',
                  label: '2-2-1',
                },
              ],
            },
          ],
        },
      ],
    };
  },
});
</script>
