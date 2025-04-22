<template>
  <n-form label-position="left" label-vertical-align="middle" label-justify-align="right">
    <n-form-item label="size">
      <n-radio-group v-model="selectSize">
        <n-radio
          v-for="(label, index) in ['small', 'medium', 'large']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="style">
      <n-radio-group v-model="selectStyle">
        <n-radio
          v-for="(label, index) in ['normal', 'noborder', 'emphasize']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="disabled">
      <n-radio-group v-model="selectDisabled">
        <n-radio
          v-for="(label, index) in ['disabled', 'useable']"
          :key="index"
          :label="label"
          size="small"
        />
      </n-radio-group>
    </n-form-item>
  </n-form>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        单选
      </div>
      <n-modal-select
        :model-value="value1"
        class="curGroup"
        :size="selectSize"
        :select-style="selectStyle"
        clearable
        placeholder="请选择"
        :disabled="selectDisabled === 'disabled'"
        :to-body="false"
        @change="changeHandle"
        @update:modelValue="onUpdateModelValue"
      >
        <n-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.value === 2"
        />
      </n-modal-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">
        多选
      </div>
      <n-modal-select
        :model-value="values1"
        class="curGroup"
        multiple
        :size="selectSize"
        :select-style="selectStyle"
        clearable
        placeholder="请选择"
        :disabled="selectDisabled === 'disabled'"
        :collapse="true"
        :multiple-limit="2"
        :to-body="false"
        @change="changeHandle"
        @update:modelValue="onUpdateMultipleModelValue"
      >
        <n-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const selectSize = ref('medium');
    const selectStyle = ref('normal');
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
      console.log(value1.value);
    };

    const onUpdateModelValue = (val: any) => {
      console.log('update-modelValue', val);
      value1.value = val;
    };

    const onUpdateMultipleModelValue = (val: any) => {
      console.log('update-multiple-modelValue', val);
      values1.value = val;
    };

    return {
      selectSize,
      changeHandle,
      selectStyle,
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

<style scoped>
</style>
