<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">事件监听</div>
      <n-select
        v-model="values2"
        multiple
        allow-create
        :to-body="false"
        @blur="blur"
        @focus="focus"
        @change="changeHandle"
        @clear="clear"
        @deselect="deselect"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <n-option label="中国" :value="1" />
        <n-option :value="2" label="美国" />
        <n-option :value="3" label="日本" />
      </n-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">事件监听 -- 确认选项</div>
      <n-select
        v-model="values3"
        multiple
        allow-create
        need-dropdown-confirm
        :to-body="false"
        @blur="blur"
        @focus="focus"
        @change="changeHandle"
        @clear="clear"
        @deselect="deselect"
        @dropdownVisibleChange="dropdownVisibleChange"
      >
        <n-option label="中国" :value="1" />
        <n-option :value="2" label="美国" />
        <n-option :value="3" label="日本" />
      </n-select>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const values2 = ref([]);
    const values3 = ref([]);

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
      values2,
      values3,
    };
  },
});
</script>

<style scoped>
</style>
