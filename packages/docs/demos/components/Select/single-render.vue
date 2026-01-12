<template>
  <h-row :gutter="10">
    <h-col :span="6">
      <div class="demo-title">
        自定义 tag
        <h-tooltip>
          <template #content>
            你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数。自定义 tag 不支持在可以输入（例如：filterOption、allowCreate）中生效
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="value1" :to-body="false" :to-body="false">
        <h-option label="中国" :value="1" en_name="China" />
        <h-option :value="2" label="美国" en_name="America" />
        <h-option :value="3" label="日本" en_name="Japan" />
        <template #tagRender="slotProps">
          <div style="height: 100px; display: flex; align-items: center">
            {{ `${slotProps.label}(${slotProps.en_name})` ?? '' }}
          </div>
        </template>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">自定义 完整 select</div>
      <h-select v-model="value2" :value-format="valueFormat" :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #selectRender>
          <div style="height: 100px; border: 1px solid #f00">
            {{ value2 ? value2?.label + '' + value2?.value : '' }}
          </div>
        </template>
      </h-select>
    </h-col>
  </h-row>
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
