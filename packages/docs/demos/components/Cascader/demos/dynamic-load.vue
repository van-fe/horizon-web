<template>
  <div>
    <n-row :gutter="10">
      <n-col :span="6">
        <div class="demo-title">单选</div>
        <n-cascader
            v-model="currentVal1"
            v-model:options="refDynOptions1"
            :dynamic-load="dynamicLoad"
            :to-body="false"
        />
      </n-col>
      <n-col :span="6">
        <div class="demo-title">多选</div>
        <n-cascader
            v-model="currentVal2"
            v-model:options="refDynOptions2"
            multiple
            :dynamic-load="dynamicLoad"
            :to-body="false"
        />
      </n-col>
    </n-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NCascaderDynamicLoadNode } from '@aurora/horizon-web';

const dynOptions = [
  {
    value: 'disciplines',
    label: 'disciplines',
  },
  {
    value: 'navigation',
    label: 'Navigation',
    isLeaf: false,
  },
];

export default defineComponent({
  setup() {
    const refDynOptions1 = ref([...dynOptions]);
    const refDynOptions2 = ref(JSON.parse(JSON.stringify(dynOptions)));
    const currentVal1 = ref<string[]>([]);
    const currentVal2 = ref<string[][]>([]);

    const options = ref([]);
    fetch(
      'https://static.nio.com/fx-static/horizon-web/clhoirqpc0000088sgljrau3o/cascader-options.json',
    ).then(res => {
      res.json().then(value => {
        options.value = value;
      });
    });

    const dynamicLoad = (node: NCascaderDynamicLoadNode) => {
      console.log(node);
      return new Promise(resolve => {
        setTimeout(() => {
          const codePoint = 97 + node.level;

          resolve(new Array(5).fill(0).map((_, index) => (
            {
              label: `${node.options.at(0)?.label} - ${String.fromCodePoint(codePoint)}(${index})`,
              value: `${codePoint}(${index})`,
              isLeaf: codePoint > 100,
              children: [],
            }
          )));
        }, 2000);
      });
    };

    return {
      refDynOptions1,
      refDynOptions2,
      currentVal1,
      currentVal2,
      options,
      dynamicLoad,
    };
  },
});
</script>
