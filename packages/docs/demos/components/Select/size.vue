<template>
  <h-form label-position="left" label-vertical-align="middle" label-justify-align="right">
    <h-form-item label="size">
      <h-radio-group v-model="selectSize">
        <h-radio
          v-for="(label, index) in ['small', 'medium', 'large']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="style">
      <h-radio-group v-model="inputStyle">
        <h-radio
          v-for="(label, index) in ['normal', 'no-border', 'emphasize']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="disabled">
      <h-radio-group v-model="selectDisabled">
        <h-radio
          v-for="(label, index) in ['disabled', 'useable']"
          :key="index"
          :label="label"
          size="small"
        />
      </h-radio-group>
    </h-form-item>
  </h-form>
  <h-grid :gap="10">
    <h-grid-item :span="6">
      <div class="demo-title">单选</div>
      <h-select
        :model-value="value1"
        class="curGroup"
        :size="selectSize"
        :input-style="inputStyle"
        clearable
        placeholder="请选择"
        :disabled="selectDisabled === 'disabled'"
        :to-body="false"
        @change="changeHandle"
        @update:modelValue="onUpdateModelValue"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.value === 2"
        />
      </h-select>
    </h-grid-item>
    <h-grid-item :span="6">
      <div class="demo-title">多选</div>
      <h-select
        :model-value="values1"
        class="curGroup"
        multiple
        :size="selectSize"
        :input-style="inputStyle"
        clearable
        placeholder="请选择"
        :disabled="selectDisabled === 'disabled'"
        :collapse-tags="true"
        :multiple-limit="2"
        :to-body="false"
        @change="changeHandle"
        @update:modelValue="onUpdateMultipleModelValue"
      >
        <h-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </h-select>
    </h-grid-item>
  </h-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const selectSize = ref('medium');
    const inputStyle = ref('normal');
    const selectDisabled = ref('useable');
    const value1 = ref(null);
    const value2 = ref();
    const values1 = ref([]);
    const values2 = ref([]);

    const remoteSelect1 = ref<any>(null);
    const remoteSelect2 = ref<any>(null);

    const selectOptions = [
      { value: 1, label: '上海' },
      { value: 2, label: '北京' },
      { value: 3, label: '合肥' },
    ];

    const changeHandle = () => {
      console.info(value1.value);
    };

    const onUpdateModelValue = (val: any) => {
      console.info('update-modelValue', val);
      value1.value = val;
    };

    const onUpdateMultipleModelValue = (val: any) => {
      console.info('update-multiple-modelValue', val);
      values1.value = val;
    };

    return {
      selectSize,
      changeHandle,
      inputStyle,
      selectDisabled,
      selectOptions,
      remoteSelect1,
      remoteSelect2,
      value1,
      value2,
      values1,
      values2,
      onUpdateModelValue,
      onUpdateMultipleModelValue,
    };
  },
});
</script>

<style scoped></style>
