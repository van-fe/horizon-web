<script setup lang="tsx">
import { computed, provide, ref, watch } from 'vue';
import BasicToken from './BasicToken.vue';
import ElementToken from './ElementToken.vue';
import { cls, ComponentClassBlock } from '@nio-fe/shared';
import { groupedBasicTokenInjectedKey, themeDataInjectedKey } from '~/utils/injectedKeys';
import defaultTheme from '~/config/themes/default.json';
import { $alert, $confirm, $message, $themes, ThemeType } from '@nio-fe/lego';
import pick from 'lodash/pick';
import { hex2rgb } from '~/utils/color';
import { groupBy } from 'lodash';
import { GroupedBasicToken } from '~/config/themes/Tokens';
import { currentCacheKey, CurrentConfigType, getLocalCacheTokens } from './utils/oldTokenTransform';
import { TreeType } from './utils/v2TokenTransform';

const visible = ref(false);
const loadFileVisible = ref(false);
const loadFileContent = ref('');
const classHelper = new ComponentClassBlock('theme-setting', 'lego');
const currentTokenCate = ref<'basic' | 'element'>('basic');
const currentTheme = ref<CurrentConfigType>({
  basic: defaultTheme.basic,
  element: defaultTheme.element,
});
const scrollRef = ref<HTMLElement | null>(null);
const scrollRecord = ref({
  basic: 0,
  element: 0,
});

const cache = getLocalCacheTokens();

if (cache) {
  currentTheme.value = cache;
}

provide(themeDataInjectedKey, currentTheme);

watch(
  currentTheme,
  val => {
    $themes.set(transformRawJson(val));
  },
  {
    deep: true,
    immediate: true,
  },
);

const groupedBasicTokens = computed(() =>
  Object.entries(
    groupBy(Object.entries(currentTheme.value.basic.colors), ([label]) => {
      return label.match(/^color_\d+/)![0];
    }),
  )
    .map(([key, values]) => {
      const colorName = values.find(([currKey]) => currKey === `${key}_name`)![1];

      return {
        group: colorName,
        rawName: key,
        children: values.map(([colorKey, value]) => {
          return {
            label: colorKey.replace(key, colorName),
            value,
            group: key,
            rawLabel: colorKey,
            isColor: !colorKey.includes('name'),
            path: `basic.colors.${colorKey}`,
          };
        }),
      } as GroupedBasicToken;
    })
    .sort((a, b) => (a.group === 'gray' ? -1 : b.group === 'gray' ? 1 : 0))
    .concat({
      group: 'opacity',
      rawName: 'opacity',
      children: Object.entries(currentTheme.value.basic.opacity).map(([key, value]) => ({
        label: key,
        value,
        group: 'opacity',
        rawLabel: key,
        isColor: false,
        path: `basic.opacity.${key}`,
      })),
    }),
);

provide(groupedBasicTokenInjectedKey, groupedBasicTokens);

function transformRawJson(data: CurrentConfigType) {
  function flattenTree(data: TreeType) {
    let res: Record<string, string> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        res[key] = value;
      } else if (typeof value === 'object') {
        res = { ...res, ...flattenTree(value) };
      }
    });

    return res;
  }

  return flattenTree(data);
}

function saveCache() {
  window.localStorage.setItem(currentCacheKey, JSON.stringify(currentTheme.value));
}

function onSubmit() {
  saveCache();
  $message.success('保存成功');
}

function download() {
  const data = JSON.stringify(transformRawJson(pick(currentTheme.value, 'basic', 'element')));
  const file = new File([data], 'theme-setting.json', { type: 'application/json' });
  const url = URL.createObjectURL(file);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'theme-setting.json';
  a.click();
}

function reloadDefault() {
  $confirm('确定后当前数据无法恢复', '是否确定恢复默认').then(close => {
    currentTheme.value = defaultTheme;
    saveCache();
    $message.success('恢复成功');
    close();
  });
}

function loadConfigFile() {
  loadFileVisible.value = true;
}

function onPickFile(files: FileList) {
  const reader = new FileReader();
  reader.onload = () => {
    loadFileContent.value = reader.result as string;
  };
  reader.readAsText(files[0]);
}

function cancelLoad() {
  loadFileContent.value = '';
}

function isNewestJson(json: unknown): json is ThemeType {
  return !(json as Record<string, string>)['brand1'];
}

function loadConfigWithinDownloadFile() {
  const json = JSON.parse(loadFileContent.value) as ThemeType | Record<string, string>;

  if (!isNewestJson(json)) {
    throw new Error(`使用了旧版本的配置文件, 请使用最新版网站生成后再导入`);
  }

  const basicKeys = Object.keys(defaultTheme.basic);
  const elementKeys = Object.keys(defaultTheme.element);

  return {
    basic: {
      ...Object.fromEntries(
        Object.entries(json)
          .filter(([key]) => basicKeys.includes(key))
          .map(([key, value]) =>
            value.includes('#') ? [key, hex2rgb(value).join(', ')] : [key, value],
          ),
      ),
    } as Pick<typeof defaultTheme, 'basic'>,
    element: {
      ...Object.fromEntries(Object.entries(json).filter(([key]) => elementKeys.includes(key))),
    } as Pick<typeof defaultTheme, 'element'>,
  };
}

function submitLoad() {
  $confirm('确定后会立即生效，原本配置文件会被覆盖并无法找回，是否确定？', '生效前确认', {
    okText: '确定并覆盖',
    cancelText: '取消操作',
  })
    .then(close => {
      try {
        const transferredContent = loadConfigWithinDownloadFile();
        window.localStorage.setItem(currentCacheKey, JSON.stringify(transferredContent));
        currentTheme.value = transferredContent as unknown as typeof defaultTheme;
        $message.success('载入配置成功');
      } catch (e) {
        $alert((e as Error).message || '载入配置文件出现问题，请检查文件是否是正确的文档');
      }
      loadFileContent.value = '';
      loadFileVisible.value = false;
      close();
    })
    .catch(() => {});
}

function onScroll(evt: Event) {
  scrollRecord.value[currentTokenCate.value] = (evt.target as HTMLElement).scrollTop;
}

// function openThemeSetting() {
//   if (localStorage.getItem('always-use-old')) {
//     visible.value = !visible.value;
//   } else {
//     window.open('https://design-system.nioint.com/horizon-web/theme/list');
//   }
// }

watch(currentTokenCate, val => {
  scrollRef.value?.scrollTo({
    top: scrollRecord.value[val],
  });
});
</script>

<template>
  <n-link @click="visible = !visible">Theme Setting</n-link>
  <n-drawer
    v-model="visible"
    size="500"
    title="Theme Setting"
    :mask="false"
    :class="classHelper.block"
  >
    <n-alert show-icon class="mb-4" :closable="false">
      推荐使用
      <n-link href="https://design-system.nioint.com/horizon-web/theme/list">设计系统</n-link>
      设计主题，本站点及换肤功能将于2023年3月31日下线
    </n-alert>
    <div :class="cls(classHelper.e('body'))">
      <div class="title flex justify-space-between align-center">
        <span>设置 Token</span>
        <span>
          <n-button :plain="true" size="medium" @click="loadConfigFile">载入</n-button>
          <n-button size="medium" @click="download">下载</n-button>
        </span>
      </div>
      <n-form>
        <n-form-item label="Token 类型" class="border--default">
          <n-select v-model="currentTokenCate" class="mb-2">
            <n-option value="basic" label="Basic Token" />
            <n-option value="element" label="Element Token" />
          </n-select>
        </n-form-item>
        <div ref="scrollRef" :class="cls(classHelper.em('body', 'setting'))" @scroll="onScroll">
          <BasicToken v-show="currentTokenCate === 'basic'" />
          <ElementToken v-show="currentTokenCate === 'element'" />
        </div>
      </n-form>
    </div>
    <template #footer>
      <div class="text-right">
        <n-button type="normal" :plain="true" size="medium" @click="reloadDefault">
          恢复默认
        </n-button>
        <n-button :plain="true" size="medium" @click="visible = false">关闭</n-button>
        <n-button type="primary" size="medium" @click="onSubmit">保存到本地</n-button>
      </div>
    </template>
  </n-drawer>
  <n-dialog
    v-model="loadFileVisible"
    title="载入配置文件"
    @primaryClick="submitLoad"
    @secondaryClick="cancelLoad"
  >
    <n-alert type="warning" size="small" :closable="false">
      请注意，确定后会立刻载入数据，当前的数据会丢失。请在载入前下载自己的配置数据
    </n-alert>
    <n-upload-area accept=".json" class="mt-8" @change="onPickFile">
      <template #icon>
        <div>
          <n-icon v-if="!loadFileContent" name="add" />
        </div>
      </template>
      <template #text>
        <div>
          {{ loadFileContent ? '已选择文件，可以点击后再次修改' : '请选择配置文件(json格式)' }}
        </div>
      </template>
    </n-upload-area>
  </n-dialog>
</template>

<style lang="scss">
@use '@nio-fe/lego/es/styles/mixins';

.lego-theme-setting {
  .n-drawer__body {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: mixins.css-variable('text-lg');
    font-weight: mixins.css-variable('weight-strong');
    margin-bottom: 10px;
  }

  &__header {
    margin-bottom: 10px;
  }

  &__body {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;

    .n-form {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;

      .lego-theme-setting__body--setting {
        flex: 1;
        overflow: auto;
      }
    }
  }
}

.border--default {
  border-bottom: 1px solid mixins.css-variable('divider-default');
}
</style>

<style lang="scss" scoped>
.n-button + .n-button {
  margin-left: 10px;
}
</style>
