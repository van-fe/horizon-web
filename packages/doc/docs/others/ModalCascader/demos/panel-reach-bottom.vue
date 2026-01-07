<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <h-modal-cascader
        ref="cascaderDomRef1"
        v-model="currentVal"
        :clearable="true"
        :to-body="false"
        :options="baseData"
        :panels-loading="panelsLoading"
        @panelReachBottom="onReachBottom"
      />
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CascaderExposes, HCascader, type HCascaderOption , HCascaderExtendOption } from '@aurora/horizon-web';
import { HorizonWebComponentInstance } from '@aurora/utils';
import { faker } from '@faker-js/faker';

const cascaderDomRef1 = ref<HorizonWebComponentInstance<typeof HCascader, CascaderExposes>>();

const currentVal = ref<string[]>([]);
const baseData = ref<HCascaderOption[]>(createList(5, 40));
const panelsLoading = ref(false);

function onReachBottom(evt: Event | undefined, parent: HCascaderExtendOption | null | unknown) {
  console.info(evt, parent);

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

function createList(amount: number, childrenAmount = 0): HCascaderOption[] {
  return new Array(amount).fill(0).map(() => ({
    label: faker.word.noun(),
    value: faker.datatype.uuid(),
    children: createList(childrenAmount),
  }));
}
</script>
