<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';

const options = new Array(50).fill(0).map((_, index) => {
  const value = faker.name.fullName();
  return {
    label: value,
    value,
    description: index % 2 === 0 ? undefined : faker.address.county(),
    disabled: index % 5 === 0,
  };
});
const value1 = ref();
const value2 = ref([options[12].value, options[15].value]);
const descriptionPosition = ref('right');

function onReachBottom() {
  console.info('reach bottom');
}
</script>

<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="description-position">
      <n-radio-group v-model="descriptionPosition">
        <n-radio label="right"></n-radio>
        <n-radio label="bottom"></n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-select v-model="value1" :to-body="false" filterable :options="options" :description-position="descriptionPosition" @option-list-reach-bottom="onReachBottom" />
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-select v-model="value2" :to-body="false" filterable multiple :options="options" :description-position="descriptionPosition" :collapse-tags="true" :collapse-tags-tooltip="true" @option-list-reach-bottom="onReachBottom" />
    </n-col>
  </n-row>
</template>

<style scoped>

</style>
