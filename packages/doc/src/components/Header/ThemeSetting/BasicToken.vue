<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { groupedBasicTokenInjectedKey, themeDataInjectedKey } from '~/utils/injectedKeys';
import { ComponentClassBlock } from '@nio-fe/shared';
import { GroupedBasicTokenItem } from '~/config/themes/Tokens';
import { tinyColor } from '@nio-fe/colors';
import get from 'lodash/get';
import set from 'lodash/set';

const currentTheme = inject(themeDataInjectedKey)!;
const classHelper = new ComponentClassBlock('theme-setting--basic-token', 'lego');
const activeKeys = ref<string[]>([]);

const groupedBasicTokens = inject(groupedBasicTokenInjectedKey)!;

function setColor(item: GroupedBasicTokenItem, val: string) {
  const color = tinyColor(val);
  const rgb = color.toRgb();
  set(currentTheme.value, item.path, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
}

watch(groupedBasicTokens, val => (activeKeys.value = val.slice(0, 2).map(item => item.rawName)), {
  immediate: true,
});
</script>

<template>
  <n-collapse :active-key="activeKeys" :class="classHelper.block" filled size="small">
    <n-collapse-item
      v-for="group of groupedBasicTokens"
      :key="group.group"
      :title="group.group"
      :name="group.rawName"
      :class="classHelper.e('item')"
    >
      <n-form-item v-for="item of group.children" :key="item.label" :label="item.label">
        <template v-if="item.isColor">
          <n-color-picker
            :model-value="`rgb(${get(currentTheme, item.path)})`"
            :editable="true"
            @update:modelValue="val => setColor(item, val)"
          />
        </template>
        <template v-else>
          <n-input
            v-if="item.group !== 'opacity'"
            :model-value="get(currentTheme, item.path)"
            @change="val => set(currentTheme, item.path, val)"
          />
          <n-input-number
            v-else
            :model-value="get(currentTheme, item.path)"
            :min="0"
            :max="1"
            :step="0.1"
            :precision="2"
            @change="val => set(currentTheme, item.path, val)"
          />
        </template>
      </n-form-item>
    </n-collapse-item>
  </n-collapse>
</template>
