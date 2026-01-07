<script setup lang="ts">
import { ref } from 'vue';
import type { SelectProps, TagProps } from '@aurora/horizon-web';

const optionList: Array<{label: string; type?: TagProps['type']; color?: string}> = [
  {label: '正常', color: 'brand' },
  {label: '警示', type: 'warning' },
  {label: '错误', type: 'error' },
  {label: '进行中', type: 'info' },
  {label: '已完成', type: 'success' },
];

const value = ref<string>();
const values = ref<string[]>([]);
const values2 = ref<string[]>([]);
const size = ref<NonNullable<SelectProps['size']>>('medium');
const filterable = ref(true);
const inputStyle = ref<SelectProps['inputStyle']>('normal');

function getOptionByValue(value: string | undefined) {
  return optionList.find(curr => curr.label === value)!;
}

function onDeselect(collection: string[], value: string) {
  const index = collection.indexOf(value);

  if (index >= 0) {
    collection.splice(index, 1);
  }
}
</script>

<template>
  <h-form label-position="left" label-vertical-align="middle">
    <h-form-item label="尺寸">
      <h-radio-group v-model="size">
        <h-radio label="small" />
        <h-radio label="medium" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="样式">
      <h-radio-group v-model="inputStyle">
        <h-radio label="normal" />
        <h-radio label="no-border" />
      </h-radio-group>
    </h-form-item>
    <h-form-item label="是否可过滤">
      <h-switch v-model="filterable" status />
    </h-form-item>
  </h-form>
  <h-row>
    <h-col :span="6">
      <div class="demo-title">单选</div>
      <h-select
        v-model="value"
        :to-body="false"
        :filterable="filterable"
        clearable
        :size="size"
        :input-style="inputStyle"
      >
        <h-option v-for="item of optionList" :key="item.label" :label="item.label" :value="item.label">
          <template #label>
            <h-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </h-tag>
          </template>
        </h-option>
        <template #tagRender="props">
          <h-tag
            :key="props.value"
            :type="getOptionByValue(value)?.type"
            :clickable="false"
            :color="getOptionByValue(value)?.color"
            :auto-color="!!getOptionByValue(value)?.color"
            :size="size"
          >
            {{ value }}
          </h-tag>
        </template>
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">多选</div>
      <h-select
        v-model="values"
        :multiple="true"
        :collapse="true"
        :collapse-tags-tooltip="true"
        :to-body="false"
        :filterable="filterable"
        clearable
        :size="size"
        :input-style="inputStyle"
      >
        <h-option
          v-for="item of optionList"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
          <template #label>
            <h-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </h-tag>
          </template>
        </h-option>
        <template #tagRender="props">
          <h-tag
            :key="props.value"
            :type="getOptionByValue(props.value).type"
            :clickable="false"
            :closable="true"
            :size="size"
            :color="getOptionByValue(props.value).color"
            :auto-color="!!getOptionByValue(props.value).color"
            @close="onDeselect(values, props.value)"
          >
            {{ getOptionByValue(props.value).label }}
          </h-tag>
        </template>
      </h-select>
    </h-col>
    <h-col :span="6">
      <div class="demo-title">完全自定</div>
      <h-select
        v-model="values2"
        :multiple="true"
        :to-body="false"
        :filterable="filterable"
        :size="size"
        :input-style="inputStyle"
        :clearable="true"
      >
        <h-option v-for="item of optionList" :key="item.label" :label="item.label" :value="item.label">
          <template #label>
            <h-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </h-tag>
          </template>
        </h-option>
        <template #selectRender>
          <h-tag-group collapse collapse-use-tooltip tooltip-render-type="full">
            <template #prefix><div style="aligh-self: center; font-weight: bold;">你的选择是：</div></template>
            <h-tag
              v-for="item of values2"
              :key="item"
              :closable="true"
              :size="size"
              @close="onDeselect(values2, item)"
            >{{item}}</h-tag>
          </h-tag-group>
        </template>
      </h-select>
    </h-col>
  </h-row>
</template>

<style scoped>
.custom-tag {
  display: flex;
  height: var(--h-select-height--option);
  aligh-items: center;
  padding-left: 12px;
}

</style>
