<script lang="ts" setup>
import { nextTick, ref, useSlots } from 'vue';
import { version } from '@aurora/horizon-web';
import { IconApplets, IconCopy, IconFullScreen, IconJump, IconMinimize, IconRefresh } from '@aurora/icon';
import { cls, ComponentClassBlock } from '@aurora/utils';
import Prism from 'prismjs';

const darkBackground = ref(false);
const loadCode = ref(true);
const classHelper = new ComponentClassBlock('demo');
const currentRef = ref('template');
const slots = useSlots();

const codeDomRef = ref<HTMLElement>();

const decode = (str: string) => {
  return str?.replace(/\\{/g, '{').replace(/\\}/g, '}').replace(/\s/g, ' ').replace(/\\n/g, '\n');
};

const resolveCodes = (code: string, type: string) => {
  if (!code) {
    return '';
  }
  let result = '';
  // 找出类似：<style>\\n\\n</style><style>body {}</style>
  const matched = code.match(new RegExp(`<${type}[\\s\\w="]*>[\\s\\S]*<\/${type}>`, 'g'));
  if (matched && matched.length) {
    result = matched[0];
  }
  // 尝试移除那些只包含空内容的标签
  result = result.replace(new RegExp(`<${type}[\\s\\w="]*>[\\s\\\\n\\\\r]*<\/${type}>`, 'g'), '');
  return result;
};
const copy = (code: string) => {
  navigator.clipboard.writeText(unescape(code));
};
let expandRef = ref(false);

let rawCode = slots.highlight?.()[0].children as string ?? '';
const templateCode = Prism.highlight(decode(resolveCodes(rawCode, 'template')), Prism.languages.markup, 'markup');
const scriptCode = Prism.highlight(decode(resolveCodes(rawCode, 'script')), Prism.languages.markup, 'markup');
const styleCode = Prism.highlight(decode(resolveCodes(rawCode, 'style')), Prism.languages.markup, 'css');
const summaryCode = Prism.highlight(decode(rawCode), Prism.languages.markup, 'markup');

if (!templateCode) {
  currentRef.value = 'script';
}

function tryInPlayground() {
  const json = {
    'App.vue': decode(rawCode),
  };

  window.open(
    `https://fx.nioint.com/pages/sfc/?vue=latest&horizon-web=${version}#${btoa(
      unescape(encodeURIComponent(JSON.stringify(json))),
    )}`,
  );
}

function jumpToGitlab(url: string) {
  window.open(url);
}

function reload() {
  loadCode.value = false;
  nextTick(() => {
    loadCode.value = true;
  });
}
</script>

<template>
  <h-card :class="cls(classHelper.block)" :top-divider="true" :bottom-divider="!!rawCode">
    <div v-if="loadCode" :class="cls(classHelper.e('preview'), classHelper.is('dark', darkBackground))">
      <slot name="source" />
    </div>

    <template v-if="rawCode" #footer>
      <h-space class="flex justify-end pr-4" size="small">
        <h-button
          v-tooltip="`Reload`"
          type="normal"
          :text="true"
          :icon="IconRefresh"
          @click="reload"
        />
        <h-button
          v-tooltip="`Try in playground`"
          type="normal"
          :text="true"
          :icon="IconApplets"
          @click="tryInPlayground"
        />
        <h-button
          v-tooltip="`View in Gitlab`"
          type="normal"
          :icon="IconJump"
          :text="true"
          @click="jumpToGitlab(slots.gitUrl?.()[0].children as string)"
        />
        <h-button
          v-tooltip="`Copy`"
          type="normal"
          :text="true"
          :icon="IconCopy"
          @click="copy(rawCode)"
        />
        <h-button
          v-tooltip="`Toggle source`"
          type="normal"
          :icon="expandRef ? IconMinimize : IconFullScreen"
          :text="true"
          @click="expandRef = !expandRef"
        />
      </h-space>
      <template v-if="rawCode">
        <div ref="codeDomRef" :class="classHelper.e('codes')">
          <h-transition name="collapse">
            <div v-if="expandRef" style="padding: 0 20px">
              <h-tabs v-model:active-key="currentRef">
                <h-tab v-if="templateCode" label="Template" name="template" />
                <h-tab v-if="scriptCode" label="Script" name="script" />
                <h-tab v-if="styleCode" label="Style" name="style" />
                <h-tab label="All" name="all" />
              </h-tabs>
              <h-panels v-model="currentRef" class="code-area">
                <h-panel v-if="templateCode" name="template" style="padding: 0">
                  <pre><code v-html="templateCode"></code></pre>
                </h-panel>
                <h-panel v-if="scriptCode" name="script" style="padding: 0">
                  <pre><code v-html="scriptCode"></code></pre>
                </h-panel>
                <h-panel v-if="styleCode" name="style" style="padding: 0">
                  <pre><code v-html="styleCode"></code></pre>
                </h-panel>
                <h-panel name="all" style="padding: 0">
                  <pre><code v-html="summaryCode"></code></pre>
                </h-panel>
              </h-panels>
            </div>
          </h-transition>
        </div>
      </template>
    </template>
  </h-card>
</template>

<style lang="scss">
@use '@aurora/horizon-web/es/styles/mixins';

@include mixins.b('demo') {
  min-width: 500px;
  border: #{1px solid mixins.css-variable('border-default')};
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 0;

  @include mixins.e('preview') {
    padding: 24px;
    transition: background-color .2s;
  }

  @include mixins.e('codes') {
    overflow: hidden;
    .h-tabs__header {
      padding-left: 1em;
    }
    pre {
      margin: 0;

      :deep(.code-area) {
        background: mixins.css-variable('bg-secondary');
      }
    }
  }
}
</style>
