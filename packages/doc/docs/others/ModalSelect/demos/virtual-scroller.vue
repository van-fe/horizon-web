<script setup lang="ts">
import { ref } from 'vue';
import { faker } from '@faker-js/faker';
import type { SelectProps } from '@nio-fe/lego';

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
  console.log('reach bottom');
}
</script>

<template>
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="input-style">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="fit-input-width">
      <n-radio-group v-model="fitInputWidth">
        <n-radio :label="true">True</n-radio>
        <n-radio :label="false">False</n-radio>
        <n-radio label="fit-content"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="description-position">
      <n-radio-group v-model="descriptionPosition">
        <n-radio label="right"></n-radio>
        <n-radio label="bottom"></n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="expand-panel-by-children">
      <n-radio-group v-model="expandPanelByChildren">
        <n-switch v-model="expandPanelByChildren" status />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-modal-select
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
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-modal-select
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
    </n-col>
  </n-row>
</template>

<style scoped>

</style>
