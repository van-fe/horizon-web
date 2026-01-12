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
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="description-position">
      <h-radio-group v-model="descriptionPosition">
        <h-radio label="right"></h-radio>
        <h-radio label="bottom"></h-radio>
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select v-model="value1" :to-body="false" filterable :options="options" :description-position="descriptionPosition" @option-list-reach-bottom="onReachBottom" />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select v-model="value2" :to-body="false" filterable multiple :options="options" :description-position="descriptionPosition" :collapse-tags="true" :collapse-tags-tooltip="true" @option-list-reach-bottom="onReachBottom" />
    </h-col>
  </h-row>
</template>

<style scoped>

</style>
