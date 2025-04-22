<script setup lang="ts">
import { ref } from 'vue';
import type { SelectProps, TagProps } from '@nio-fe/lego';

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
  <n-form label-position="left" label-vertical-align="middle">
    <n-form-item label="尺寸">
      <n-radio-group v-model="size">
        <n-radio label="small" />
        <n-radio label="medium" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="样式">
      <n-radio-group v-model="inputStyle">
        <n-radio label="normal" />
        <n-radio label="no-border" />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="是否可过滤">
      <n-switch v-model="filterable" status />
    </n-form-item>
  </n-form>
  <n-row>
    <n-col :span="6">
      <div class="demo-title">单选</div>
      <n-select
        v-model="value"
        :to-body="false"
        :filterable="filterable"
        clearable
        :size="size"
        :input-style="inputStyle"
      >
        <n-option v-for="item of optionList" :key="item.label" :label="item.label" :value="item.label">
          <template #label>
            <n-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </n-tag>
          </template>
        </n-option>
        <template #tagRender="props">
          <n-tag
            :key="props.value"
            :type="getOptionByValue(value)?.type"
            :clickable="false"
            :color="getOptionByValue(value)?.color"
            :auto-color="!!getOptionByValue(value)?.color"
            :size="size"
          >
            {{ value }}
          </n-tag>
        </template>
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">多选</div>
      <n-select
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
        <n-option
          v-for="item of optionList"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
          <template #label>
            <n-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </n-tag>
          </template>
        </n-option>
        <template #tagRender="props">
          <n-tag
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
          </n-tag>
        </template>
      </n-select>
    </n-col>
    <n-col :span="6">
      <div class="demo-title">完全自定</div>
      <n-select
        v-model="values2"
        :multiple="true"
        :to-body="false"
        :filterable="filterable"
        :size="size"
        :input-style="inputStyle"
        :clearable="true"
      >
        <n-option v-for="item of optionList" :key="item.label" :label="item.label" :value="item.label">
          <template #label>
            <n-tag :type="item.type" :clickable="false" :color="item.color" :auto-color="!!item.color">
              {{ item.label }}
            </n-tag>
          </template>
        </n-option>
        <template #selectRender>
          <n-tag-group collapse collapse-use-tooltip tooltip-render-type="full">
            <template #prefix><div style="align-self: center; font-weight: bold;">你的选择是：</div></template>
            <n-tag
              v-for="item of values2"
              :key="item"
              :closable="true"
              :size="size"
              @close="onDeselect(values2, item)"
            >{{item}}</n-tag>
          </n-tag-group>
        </template>
      </n-select>
    </n-col>
  </n-row>
</template>

<style scoped>
.custom-tag {
  display: flex;
  height: var(--n-select-height--option);
  align-items: center;
  padding-left: 12px;
}

</style>
