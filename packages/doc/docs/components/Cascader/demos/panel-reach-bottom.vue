<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <n-cascader
        ref="cascaderDomRef1"
        v-model="currentVal"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        :panels-loading="panelsLoading"
        @panelReachBottom="onReachBottom"
      />
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CascaderExposes, NCascader, type NCascaderOption , NCascaderExtendOption } from '@aurora/horizon-web';
import { LegoComponentInstance } from '@aurora/shared';
import { faker } from '@faker-js/faker';

const cascaderDomRef1 = ref<LegoComponentInstance<typeof NCascader, CascaderExposes>>();

const currentVal = ref<string[]>([]);
const baseData = ref<NCascaderOption[]>(createList(5, 20));
const panelsLoading = ref(false);

function onReachBottom(evt: Event | undefined, parent: NCascaderExtendOption | null | unknown) {
  console.log(evt, parent);

  if (parent) {
    const newTreeData = baseData.value.concat();

    const target = newTreeData.find(curr => curr.value === parent.value);

    if (target) {
      panelsLoading.value = true;
      setTimeout(() => {
        target.children = [...(target.children || []), ...createList(10)];

        baseData.value = newTreeData;
        setTimeout(() => {
          panelsLoading.value = false;
        }, 400); // 400ms is for animation running time. During the animate running, the dom's height will change in this time.
      }, 2000);
    }
  }
}

function createList(amount: number, childrenAmount = 0): NCascaderOption[] {
  return new Array(amount).fill(0).map(() => ({
    label: faker.word.noun(),
    value: faker.datatype.uuid(),
    children: createList(childrenAmount),
  }));
}
</script>
