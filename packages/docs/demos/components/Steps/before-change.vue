<template>
  <div>
    <h-steps v-model="modelValue" :clickable="true" :before-change="onBeforeChange">
      <h-step>
        <template #title>Succeeded</template>
        <template #subtitle>
          <span>This is a description.</span>
        </template>
      </h-step>
      <h-step title="Processing" subtitle="This is a description." description="03/23/2021" />
      <h-step title="Future step" subtitle="This is a description." />
    </h-steps>
  </div>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { $confirm, useStepProps } from '@aurora/horizon-web';

const modelValue = ref(0);

function onBeforeChange(next: number, curr: number, nextProp: ExtractPropTypes<typeof useStepProps>, currProp: ExtractPropTypes<typeof useStepProps>) {
  console.info({ next, curr, nextProp, currProp });

  return new Promise((resolve, reject) => {
    $confirm(`是否同意切换步骤？从 【${curr}】 切换到 【${next}】`, '切换步骤确认').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      reject();
    });
  });
}
</script>
