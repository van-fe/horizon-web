<template>
  <n-row :gutter="10">
    <n-col :span="6">
      <div class="demo-title">
        自定义 tag
        <n-tooltip>
          <template #content>
            你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数。自定义 tag 不支持在可以输入（例如：filterOption、allowCreate）中生效
          </template>
          <n-icon name="help" />
        </n-tooltip>
      </div>
      <n-modal-select v-model="value1" :to-body="false" :to-body="false">
        <n-option label="中国" :value="1" en_name="China" />
        <n-option :value="2" label="美国" en_name="America" />
        <n-option :value="3" label="日本" en_name="Japan" />
        <template #tagRender="slotProps">
          <div style="height: 100px; display: flex; align-items: center">
            {{ `${slotProps.label}(${slotProps.en_name})` ?? '' }}
          </div>
        </template>
      </n-modal-select>
    </n-col>

    <n-col :span="6">
      <div class="demo-title">自定义 完整 select</div>
      <n-modal-select v-model="value2" :value-format="valueFormat" :to-body="false">
        <n-option label="上海" :value="1" />
        <n-option :value="2" label="北京" />
        <n-option :value="3" label="合肥" name="hefei" />
        <template #selectRender>
          <div style="height: 100px; border: 1px solid #f00">
            {{ value2 ? value2?.label + '' + value2?.value : '' }}
          </div>
        </template>
      </n-modal-select>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const value1 = ref();
    const value2 = ref();

    return {
      valueFormat(originValue: any) {
        return {
          value: originValue.value,
          label: originValue.label,
        };
      },
      value1,
      value2,
    };
  },
});
</script>

<style scoped>
</style>
