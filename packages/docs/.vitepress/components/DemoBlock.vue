<script setup lang="ts">
import { ref, useSlots, watch, createApp, onMounted, defineComponent } from 'vue';
import compileVueString from './compileVueString';
import { $message, default as HorizonWeb } from '@aurora/horizon-web';
import CodeEditor from './CodeEditor.vue';
import { customAlphabet } from 'nanoid';

const componentId = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)();

const props = defineProps({
  source: {
    type: String,
    required: true,
  }
});

const previewRef = ref<HTMLDivElement>(null);

let appInstance: App | null = null;

const code = ref(props.source);

watch(() => props.source, val => {
  code.value = val;
});

const visible = ref(false);

const slots = useSlots();

function copyCode() {
  navigator.clipboard.writeText(unescape(props.source));
  $message.success('success');
}

function toggleCode() {
  visible.value = !visible.value;
}
</script>

<template>
  <div class="demo-block">
    <div :id="componentId" class="preview">
      <demo-render :content="code" />
    </div>
    <div class="tools">
      <h-space :size="8">
        <h-button v-tooltip="'复制代码'" size="mini" icon="copy" :icon-size="14" :text="true" type="normal" @click="copyCode" />
        <h-button v-tooltip="'查看/编辑代码'" size="mini" icon="record" :icon-size="14" :text="true" type="normal" @click="toggleCode" />
      </h-space>
    </div>
    <h-transition name="collapse">
      <div v-if="visible">
        <code-editor v-model:code="code" />
      </div>
    </h-transition>
  </div>
</template>

<style lang="scss" scoped>
@use "@aurora/horizon-web/es/styles/mixins";

.demo-block {
  border: 1px solid mixins.css-variable('border-default');
  padding: mixins.css-variable('spacing-3');
  border-radius: mixins.css-variable('radius-m');

  .tools {
    text-align: right;
  }
}
</style>