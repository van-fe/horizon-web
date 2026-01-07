<template>
  <h-row>
    <h-col :span="6">
      <h-modal-cascader
        v-model="currentVal1"
        :field-map="{
          value: 'id',
          label: 'tag',
          stringLabel: 'tagString',
        }"
        :options="options1"
        :to-body="false"
      />
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue';
import type { HCascaderOption } from '@aurora/horizon-web';


export default defineComponent({
  setup() {
    const currentVal1 = ref<string[]>([]);
    return {
      currentVal1,
      options1: [
        {
          id: 'a',
          tag: '1',
          children: [
            {
              id: 'a-a',
              tag: (option: HCascaderOption) =>
                h(
                  'div',
                  {
                    style: 'border: 1px solid #f00;',
                  },
                  [h('span', {}, ['我的值是：', option.id])],
                ),
              tagString: 'a-a',
              children: [
                {
                  id: 'a-a-a',
                  tag: '1-1-1',
                },
                {
                  id: 'a-a-b',
                  tag: '1-1-2',
                },
              ],
            },
            {
              id: 'a-b',
              tag: '1-2',
              children: [
                {
                  id: 'a-b-a',
                  tag: '1-2-1',
                },
                {
                  id: 'a-b-b',
                  tag: '1-2-2',
                },
              ],
            },
            {
              id: 'a-c',
              tag: '1-3',
              children: [
                {
                  id: 'a-c-a',
                  tag: '1-3-1',
                },
              ],
            },
          ],
        },
        {
          id: 'b',
          tag: '2',
          children: [
            {
              id: 'b-a',
              tag: '2-1',
            },
            {
              id: 'b-b',
              tag: '2-2',
              children: [
                {
                  id: 'b-b-a',
                  tag: '2-2-1',
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
