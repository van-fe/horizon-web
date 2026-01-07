<template>
  <h-row :gutter="10">
    <h-col :span="24">
      <h-form label-width="150px" label-position="left" label-vertical-align="middle" helper-placement="after-label">
        <h-form-item label="Toggle" helper="展开/收起">
          <h-button size="small" @click="toggle">Toggle</h-button>
        </h-form-item>
        <h-form-item label="size">
          <h-radio-group v-model="size">
            <h-radio label="small" />
            <h-radio label="medium" />
            <h-radio label="large" />
          </h-radio-group>
        </h-form-item>
        <h-form-item label="tooltip render type">
          <template #helperTitle>
            折叠 `tooltip` 展示的内容
          </template>
          <template #helperContent>
            <li>innerText: 展示每个元素的文字内容</li>
            <li>full: 完整渲染元素</li>
          </template>
          <h-radio-group v-model="renderType">
            <h-radio label="innerText"></h-radio>
            <h-radio label="full"></h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="editable">
          <h-radio-group v-model="editable">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="closable">
          <h-radio-group v-model="closable">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="fill up" helper="是否尽量占满容器。启用 minDisplayed 无效">
          <h-radio-group v-model="fillUp">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="width" style="max-width: 500px">
          <h-slider v-model="width" :min="100" :max="600" :step="25" :input-enable="true" />
        </h-form-item>
        <h-form-item label="amount" style="max-width: 500px">
          <h-slider v-model="renderedAmount" :min="5" :max="50" :input-enable="true" />
        </h-form-item>
        <h-form-item label="use min displayed" style="max-width: 500px" helper="是否启用至少显示Tag数量的属性。启用后，超过 minDisplayed 的数量的元素都会被折叠">
          <h-radio-group v-model="minDisplayedEnable">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item v-show="minDisplayedEnable" label="min displayed" style="max-width: 500px" helper="至少显示的tag数量">
          <h-slider v-model="minDisplayed" :min="1" :max="renderedAmount" :input-enable="true" />
        </h-form-item>
      </h-form>
    </h-col>
    <h-col>
      <h-tag-group
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
        <h-tag v-for="(item, index) of renderedItems" :id="index" :key="index" :clickable="false" :closable="closable">{{ item }}</h-tag>
      </h-tag-group>
    </h-col>
  </h-row>
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
