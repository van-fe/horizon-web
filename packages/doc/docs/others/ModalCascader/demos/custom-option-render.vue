<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-modal-cascader v-model="currentVal1" :options="optionsWithRender" :to-body="false">
        <template #itemRender="slotProps">
          <div style="width: 200px">
            👼🏻
            {{ slotProps.label }}
          </div>
        </template>
      </h-modal-cascader>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);

    const optionsWithRender = [
      {
        value: 'disciplines',
        label: (option: any) =>
          h(
            'div',
            {
              style: 'color: #00BEBE;width: 300px;',
            },
            ['你可以看到我的 value =', option.value],
          ),
        stringLabel: 'Disciplines',
        children: [
          {
            stringLabel: 'Consistency',
            value: 'consistency',
            label: (option: any) =>
              h('div', {}, [
                h(
                  'span',
                  {
                    style: 'width: 300px;',
                  },
                  ['➕', option.value],
                ),
              ]),
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
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

    return {
      currentVal1,
      optionsWithRender,
    };
  },
});
</script>
