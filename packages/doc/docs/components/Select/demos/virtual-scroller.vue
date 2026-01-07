<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import type { SelectProps } from '@aurora/horizon-web';

const options = new Array(5000).fill(0).map((_, index) => {
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
const descriptionPosition = ref<SelectProps['descriptionPosition']>('right');
const inputStyle = ref<SelectProps['inputStyle']>('normal');
const fitInputWidth = ref(true);
const expandPanelByChildren = ref(false);

function onReachBottom() {
  console.info('reach bottom');
}
</script>

<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="input-style">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="fit-input-width">
      <h-radio-group v-model="fitInputWidth">
        <h-radio :label="true">True</h-radio>
        <h-radio :label="false">False</h-radio>
        <h-radio label="fit-content"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="description-position">
      <h-radio-group v-model="descriptionPosition">
        <h-radio label="right"></h-radio>
        <h-radio label="bottom"></h-radio>
      </h-radio-group>
    </h-form-item>
    <h-form-item label="expand-panel-by-children">
      <h-radio-group v-model="expandPanelByChildren">
        <h-switch v-model="expandPanelByChildren" status />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select
        v-model="value1"
        :to-body="false"
        need-confirm
        filterable
        :fit-input-width="fitInputWidth"
        :input-style="inputStyle"
        :options="options"
        :description-position="descriptionPosition"
        :expand-panel-by-children="expandPanelByChildren"
        @option-list-reach-bottom="onReachBottom"
      />
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select
        v-model="value2"
        :to-body="false"
        filterable
        multiple
        :fit-input-width="fitInputWidth"
        :input-style="inputStyle"
        :options="options"
        :description-position="descriptionPosition"
        :collapse-tags="true"
        :collapse-tags-tooltip="true"
        :expand-panel-by-children="expandPanelByChildren"
        @option-list-reach-bottom="onReachBottom"
      />
    </h-col>
  </h-row>
</template>

<style scoped>

</style>
