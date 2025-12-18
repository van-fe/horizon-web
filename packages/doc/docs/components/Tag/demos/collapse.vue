<template>
  <n-row :gutter="10">
    <n-col :span="24">
      <n-form label-width="150px" label-position="left" label-vertical-align="middle" helper-placement="after-label">
        <n-form-item label="Toggle" helper="展开/收起">
          <n-button size="small" @click="toggle">Toggle</n-button>
        </n-form-item>
        <n-form-item label="size">
          <n-radio-group v-model="size">
            <n-radio label="small" />
            <n-radio label="medium" />
            <n-radio label="large" />
          </n-radio-group>
        </n-form-item>
        <n-form-item label="tooltip render type">
          <template #helperTitle>
            折叠 `tooltip` 展示的内容
          </template>
          <template #helperContent>
            <li>innerText: 展示每个元素的文字内容</li>
            <li>full: 完整渲染元素</li>
          </template>
          <n-radio-group v-model="renderType">
            <n-radio label="innerText"></n-radio>
            <n-radio label="full"></n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="editable">
          <n-radio-group v-model="editable">
            <n-radio :label="true">True</n-radio>
            <n-radio :label="false">False</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="closable">
          <n-radio-group v-model="closable">
            <n-radio :label="true">True</n-radio>
            <n-radio :label="false">False</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="fill up" helper="是否尽量占满容器。启用 minDisplayed 无效">
          <n-radio-group v-model="fillUp">
            <n-radio :label="true">True</n-radio>
            <n-radio :label="false">False</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="width" style="max-width: 500px">
          <n-slider v-model="width" :min="100" :max="600" :step="25" :input-enable="true" />
        </n-form-item>
        <n-form-item label="amount" style="max-width: 500px">
          <n-slider v-model="renderedAmount" :min="5" :max="50" :input-enable="true" />
        </n-form-item>
        <n-form-item label="use min displayed" style="max-width: 500px" helper="是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠">
          <n-radio-group v-model="minDisplayedEnable">
            <n-radio :label="true">True</n-radio>
            <n-radio :label="false">False</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-show="minDisplayedEnable" label="min displayed" style="max-width: 500px" helper="至少显示的tag数量">
          <n-slider v-model="minDisplayed" :min="1" :max="renderedAmount" :input-enable="true" />
        </n-form-item>
      </n-form>
    </n-col>
    <n-col>
      <n-tag-group
        ref="tagGroup"
        :collapse="true"
        :expand="true"
        :editable="editable"
        :fill-up="fillUp"
        :size="size"
        :tooltip-render-type="renderType"
        :min-displayed="minDisplayedEnable ? minDisplayed : undefined"
        :before-edit="onBeforeEdit"
        :before-close="onBeforeClose"
        :style="{width: width + 'px'}"
      >
        <n-tag v-for="(item, index) of renderedItems" :id="index" :key="index" :clickable="false" :closable="closable">{{ item }}</n-tag>
      </n-tag-group>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { DefinedComponent } from '@aurora/utils';
import { $message } from '@aurora/horizon-web';

const tagGroup = ref<InstanceType<DefinedComponent> | null>(null);

const renderedAmount = ref(20);
const minDisplayed = ref(1);
const width = ref(600);
const editable = ref(false);
const closable = ref(false);
const fillUp = ref(false);
const minDisplayedEnable = ref(false);
const renderType = ref('innerText');
const size = ref('medium');
const renderedItems = ref<Array<string | number>>([]);

watchEffect(() => {
  renderedItems.value = Array.from(Array(renderedAmount.value).keys()).map(val => `Tag ${val + 1}`);
});

watch(() => renderedItems.value.length, val => {
  renderedAmount.value = val;
});

function toggle() {
  tagGroup.value?.toggle();
}

function onBeforeEdit(newVal: string, oldVal: string, id: number) {
  renderedItems.value[id] = newVal;
}

function onBeforeClose(id: number) {
  if (renderedItems.value.length <= 5) {
    $message.warning("Cannot reduce the item's length less than 5");
    return;
  }
  renderedItems.value.splice(id, 1);
}
</script>

<style scoped></style>
