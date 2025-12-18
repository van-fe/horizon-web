<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">单选: 隐藏选中项</div>
      <n-select v-model="value3" :selected-visible="false" clearable :to-body="false">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
      </n-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">多选: 隐藏选中项</div>
      <n-select v-model="values4" :selected-visible="false" clearable multiple :to-body="false">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
      </n-select>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value3 = ref();
    const values4 = ref([]);

    const changeHandle = (value: any, option: any) => {
      console.group('change');
      console.log(value);
      console.log(option);
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
        console.log('blur');
      },
      focus() {
        console.log('focus');
      },
      clear() {
        console.log('clear');
      },
      deselect(value: any) {
        console.log('deselect', value);
      },
      dropdownVisibleChange(visible: boolean) {
        console.log('dropdownVisibleChange', visible);
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
