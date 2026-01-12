<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">单选: 隐藏选中项</div>
      <h-select v-model="value3" :selected-visible="false" clearable :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">多选: 隐藏选中项</div>
      <h-select v-model="values4" :selected-visible="false" clearable multiple :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
      </h-select>
    </h-col>
  </h-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value3 = ref();
    const values4 = ref([]);

    const changeHandle = (value: any, option: any) => {
      console.group('change');
      console.info(value);
      console.info(option);
      console.groupEnd();
    };

    return {
      valueFormat(originValue: any) {
        return {
          value: originValue.value,
          label: originValue.label,
        };
      },
      filterOption(input: string, props: any) {
        const label = props.label;
        return label.includes(input.toUpperCase());
      },
      blur() {
        console.info('blur');
      },
      focus() {
        console.info('focus');
      },
      clear() {
        console.info('clear');
      },
      deselect(value: any) {
        console.info('deselect', value);
      },
      dropdownVisibleChange(visible: boolean) {
        console.info('dropdownVisibleChange', visible);
      },

      changeHandle,
      value3,
      values4,
    };
  },
});
</script>

<style scoped>
</style>
