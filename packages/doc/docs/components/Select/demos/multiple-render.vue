<template>
  <h-row>
    <!-- 自定义 tag -->
    <h-col :span="6">
      <div class="demo-title">
        自定义 tag
        <h-tooltip>
          <template #content>
            你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="values1" multiple collapse :to-body="false">
        <h-option label="中国" :value="1" en_name="China" />
        <h-option :value="2" label="美国" en_name="America" />
        <h-option :value="3" label="日本" en_name="Japan" />
        <template #tagRender="slotProps">
          <h-tag type="info" :clickable="false">{{ `${slotProps.label}(${slotProps.en_name})` ?? '' }}</h-tag>
        </template>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">
        允许创建选项
        <h-tooltip>
          <template #content>
            你可以在 tagRender 这个 slot 中接受到传递到每一个选项上的所有参数
          </template>
          <a-icon name="help" />
        </h-tooltip>
      </div>
      <h-select v-model="values2" multiple allow-create collapse :to-body="false">
        <h-option label="中国" :value="1" en_name="Chinaaaaa" />
        <h-option :value="3" label="日本" en_name="Japanaaaa" />
        <h-option :value="2" label="美国" en_name="Afsdffdsa" />
        <template #tagRender="slotProps">
          <h-tag type="success" :clickable="false">{{ `${slotProps.label}(${slotProps.en_name})` ?? '' }}</h-tag>
        </template>
      </h-select>
    </h-col>

    <h-col :span="6">
      <div class="demo-title">自定义 完整 select</div>
      <h-select v-model="values3" :multiple="true" :value-format="valueFormat" :to-body="false">
        <h-option label="上海" :value="1" />
        <h-option :value="2" label="北京" />
        <h-option :value="3" label="合肥" name="hefei" />
        <template #selectRender>
          你的选择是：{{ values3.map(v => v.label).join('+') }}
        </template>
      </h-select>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const values1 = ref([]);
const values2 = ref([]);
const values3 = ref<{label: string}[]>([]);

function valueFormat(originValue: any) {
  return {
    value: originValue.value,
    label: originValue.label,
  };
}
</script>

<style scoped>
.multiple-tag {
  display: inline-flex;
  justify-content: center;
  aligh-items: center;
  border: 1px solid #14798f;
  font-size: 12px;
  padding: 0 3px;
  height: 24px;
  margin: 4px 5px;
  color: #f00;
}
</style>
