<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import { groupedBasicTokenInjectedKey, themeDataInjectedKey } from '~/utils/injectedKeys';
import { cls, ComponentClassBlock, snakeCase } from '@nio-fe/shared';
import { themeConfigMapping } from '@nio-fe/lego';
import { tinyColor } from '@nio-fe/colors';
import set from 'lodash/set';

const currentTheme = inject(themeDataInjectedKey)!;
const classHelper = new ComponentClassBlock('theme-setting--element-token', 'lego');

const groupedElementToken = computed(() =>
  Object.entries(currentTheme.value.element.colors).map(([groupKey, data]) => {
    return {
      label: groupKey,
      children: Object.entries(data).map(([key, value]) => {
        const currentIsColor = isColor(value);
        const basicToken = getBasicToken(value);
        const basicTokenFormatted = basicToken.replace(/^--n-/, '');
        const basicTokenShowRawName = basicTokenFormatted.match(/^(color-\d+)-/)?.[1] ?? '';
        const basicTokenShowGroupName =
          groupedBasicTokens.value.find(
            curr => curr.rawName.replace(/_/g, '-') === basicTokenShowRawName,
          )?.group ?? '';
        const basicTokenShowName = basicTokenFormatted.replace(
          basicTokenShowRawName,
          basicTokenShowGroupName,
        );
        const alphaToken = getAlphaValue(value) || 'opacity_10';

        return {
          isColor: currentIsColor,
          label: formatTokenName(key),
          basicToken,
          showValue: basicTokenShowName,
          alphaToken,
          alphaJsKey: snakeCase(alphaToken.replace('--n-', '')),
          rawLabel: key,
          rawValue: value,
          hex: currentIsColor ? getInstanceValue(basicToken) : '',
          path: `element.${groupKey}.${key}`,
        };
      }),
    };
  }),
);

const activeKeys = ref<string[]>([]);

const groupedBasicTokens = inject(groupedBasicTokenInjectedKey)!;

const groupedBasicColorTokens = computed(() =>
  groupedBasicTokens.value.filter(curr => curr.group !== 'opacity'),
);
const basicAlphaTokens = computed(
  () => groupedBasicTokens.value.find(curr => curr.group === 'opacity')?.children ?? [],
);

const isColor = (value: string) => {
  return /^rgb(a)*/.test(value);
};

const colorTokenReg = /^rgb(a)*\(var\(([\w-]+)\)(,\s*var\(([\w-]+)\))*\)$/;

const getBasicToken = (value: string) => {
  return value.replace(colorTokenReg, '$2');
};

const getAlphaValue = (value: string) => {
  return value.replace(colorTokenReg, '$4');
};

const formatTokenName = (token: string) => {
  return token.replace(/([A-Z][a-z]*|\d+)/gu, (curr, index) => {
    return index === 0 ? curr.toLowerCase() : `-${curr.toLowerCase()}`;
  });
};

const getHexValue = (rgb: string) => {
  return '#' + tinyColor(`rgb(${rgb})`).toHex(false);
};

const getInstanceValue = (basicToken: string) => {
  const basicKey = snakeCase(basicToken.replace('--n-', ''));
  return getHexValue(currentTheme.value.basic.colors[basicKey]);
};

function elementTokenChangeColor(
  elementTarget: (typeof groupedElementToken.value)[number]['children'][number],
  resValue: string,
) {
  if (elementTarget.isColor) {
    set(
      currentTheme.value,
      elementTarget.path,
      `rgba(var(${resValue}), var(${elementTarget.alphaToken}))`,
    );
  } else {
    set(currentTheme.value, elementTarget.path, resValue);
  }
}

function elementTokenChangeAlpha(
  elementTarget: (typeof groupedElementToken.value)[number]['children'][number],
  alphaToken: string,
) {
  set(
    currentTheme.value,
    elementTarget.path,
    `rgba(var(${elementTarget.basicToken}), var(${alphaToken}))`,
  );
}

watch(groupedElementToken, val => (activeKeys.value = val.slice(0, 2).map(item => item.label)), {
  immediate: true,
});
</script>

<template>
  <n-collapse :active-key="activeKeys" :class="classHelper.block" filled size="small">
    <n-collapse-item
      v-for="group of groupedElementToken"
      :key="group.label"
      :title="group.label"
      :name="group.label"
    >
      <div v-for="item of group.children" :key="item.label" :class="classHelper.e('item')">
        <n-form-item v-if="item.isColor" :label="item.label">
          <n-row :gutter="5">
            <n-col :span="14">
              <n-select
                :model-value="item.basicToken"
                :destroy-on-hide="true"
                @update:modelValue="val => elementTokenChangeColor(item, val)"
              >
                <n-option-group
                  v-for="basicTokenGroup of groupedBasicColorTokens"
                  :key="basicTokenGroup.rawName"
                  :label="basicTokenGroup.group"
                >
                  <template v-for="basicToken of basicTokenGroup.children">
                    <n-option
                      v-if="basicToken.isColor"
                      :key="basicToken.rawLabel"
                      :value="themeConfigMapping[basicToken.rawLabel]"
                    >
                      <template #default="slotProps">
                        <div :class="cls('color-option', slotProps.active ? 'active' : '')">
                          {{ basicToken.label }}
                          <div class="preview-color">
                            <span class="hex-color">{{ getHexValue(basicToken.value) }}</span>
                            <div
                              class="preview-circle"
                              :style="{ backgroundColor: `rgb(${basicToken.value})` }"
                            />
                          </div>
                        </div>
                      </template>
                    </n-option>
                  </template>
                </n-option-group>

                <template #selectRender>
                  <div class="selected-value">
                    {{ item.showValue }}
                    <div class="preview-color">
                      <span class="hex-color">{{ item.hex }}</span>
                      <div
                        class="preview-circle"
                        :style="{ backgroundColor: `rgb(var(${item.basicToken}))` }"
                      />
                    </div>
                  </div>
                </template>
              </n-select>
            </n-col>
            <n-col :span="10">
              <n-select
                :model-value="item.alphaJsKey"
                :destroy-on-hide="true"
                :to-body="false"
                @update:modelValue="val => elementTokenChangeAlpha(item, val)"
              >
                <n-option
                  v-for="alpha of basicAlphaTokens"
                  :key="alpha.rawLabel"
                  :value="alpha.label"
                  :label="`${alpha.label} (${alpha.value})`"
                />
              </n-select>
            </n-col>
          </n-row>
        </n-form-item>
      </div>
    </n-collapse-item>
  </n-collapse>
</template>

<style lang="scss" scoped>
@use '@nio-fe/lego/es/styles/mixins';

.lego-theme-setting--element-token {
  overflow-x: hidden;
}

.color-option {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  &:hover {
    background: mixins.css-variable('bg-hover');
  }

  &.active {
    font-weight: bolder;
    background: mixins.css-variable('bg-weak-default');
  }

  .preview-circle {
    width: 32px;
    height: 32px;
    border-radius: mixins.css-variable('radius-circle');
    display: inline-block;
    border: 1px solid mixins.css-variable('border-default');
  }
}

.preview-color {
  display: inline-flex;
  align-items: center;
}

.hex-color {
  font-size: 12px;
  color: mixins.css-variable('text-secondary');
  margin-right: 5px;
}

.selected-value {
  flex: 1;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .preview-circle {
    width: 26px;
    height: 26px;
    border-radius: mixins.css-variable('radius-circle');
    display: inline-block;
    border: 1px solid mixins.css-variable('border-default');
  }
}

.lego-theme-setting--element-token__item {
  :deep(.n-select-trigger) {
    width: 100%;
    min-width: 0;
  }

  :deep(.n-select-option__item) {
    padding-right: 12px;
  }
}
</style>
