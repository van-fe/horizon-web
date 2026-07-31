import { resolveComponent, withCtx, createTextVNode, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/methods/MessageBox.md","filePath":"zh/demos/methods/MessageBox.md"}');
const _sfc_main = { name: "demos/methods/MessageBox.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_h_link = resolveComponent("h-link");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>MessageBox</h1><p class="description">用于信息提示或确认，会中断用户当前的任务流程。想避免对用户的干扰，可考虑 <code>Message</code> 等组件；如果想要更强的定制能力，请使用 <code>Dialog</code> 组件</p><h2 id="提示框" tabindex="-1">提示框 <a class="header-anchor" href="#提示框" aria-label="Permalink to &quot;提示框&quot;">​</a></h2><p>只有一个按钮，点击按钮后会自动关闭弹窗，你可以在 Promise.resolve 中执行回调函数。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button class="mr-2" @click="showAlert()">Alert</h-button>
  <h-button class="mr-2" @click="showAlert('info')">Info</h-button>
  <h-button class="mr-2" @click="showAlert('success')">Success</h-button>
  <h-button class="mr-2" @click="showAlert('warning')">Warning</h-button>
  <h-button class="mr-2" @click="showAlert('error')">Error</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $alert } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const showAlert = (type?: 'info' | 'success' | 'warning' | 'error') => {
      $alert('这是一段文本', '提示', {
        type,
      }).then(() => {
        console.info('OK clicked!');
      }).catch(() => {
        console.info('Close clicked!');
      });
    };
    return {
      showAlert,
    };
  },
});
<\/script>
`,
    path: "demos/methods/MessageBox/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="确认框" tabindex="-1">确认框 <a class="header-anchor" href="#确认框" aria-label="Permalink to &quot;确认框&quot;">​</a></h2><p>会有确定和取消两个按钮，点击确定<strong>不会</strong>自动关闭弹窗，你可以在 Promise.resolve 的回调函数中调用接收到的 <code>close</code> 方法来关闭弹窗；点击取消会自动关闭弹窗，你可以在 Promise.reject 中执行回调函数。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button class="mr-2" @click="showConfirm()">Confirm</h-button>
  <h-button class="mr-2" @click="showConfirm('info')">Info</h-button>
  <h-button class="mr-2" @click="showConfirm('success')">Success</h-button>
  <h-button class="mr-2" @click="showConfirm('warning')">Warning</h-button>
  <h-button class="mr-2" @click="showConfirm('error')">Error</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $confirm } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const showConfirm = (type?: 'info' | 'success' | 'warning' | 'error') => {
      $confirm('这是一段文本', '提示', {
        type,
      })
        .then(close => {
          console.info('Confirmed!');
          close();
        })
        .catch(() => {
          console.info('Cancelled!');
        });
    };
    return {
      showConfirm,
    };
  },
});
<\/script>
`,
    path: "demos/methods/MessageBox/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="个性化" tabindex="-1">个性化 <a class="header-anchor" href="#个性化" aria-label="Permalink to &quot;个性化&quot;">​</a></h2><p>你可以传入一个配置对象来个性化弹窗。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button class="mr-2" @click="showAlert">Alert</h-button>
  <h-button class="mr-2" @click="showConfirm">Confirm</h-button>
  <h-button class="mr-2" @click="showNoClose">No Close</h-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $alert, $confirm } from '@aurora/horizon-web';
export default defineComponent({
  setup() {
    const showAlert = () => {
      $alert('这是一段文本', '提示', {
        iconName: 'light_on',
        iconSize: '22',
        maskClose: true,
        escClose: true,
        okText: '我知道了',
        okButtonProps: {
          type: 'text',
        },
      }).then(() => {
        console.info('OK clicked!');
      });
    };
    const showConfirm = () => {
      $confirm('这是一段文本', '提示', {
        iconName: 'time',
        iconSize: '22',
        maskClose: true,
        escClose: true,
        okText: '确认提交',
        okButtonProps: {
          type: 'primary',
          kind: 'negative',
        },
        cancelText: '返回修改',
        cancelButtonProps: {
          type: 'text',
          kind: 'neutral',
        },
      })
        .then(() => {
          console.info('Confirmed!');
        })
        .catch(() => {
          console.info('Cancelled!');
        });
    };
    const showNoClose = ()=>{
      $alert('这是一段文本', '提示', {
        iconName: 'time',
        iconSize: '22',
        maskClose: true,
        escClose: true,
        okText: '确认提交',
        closeButton: false,
        okButtonProps: {
          type: 'primary',
          kind: 'negative',
        },
        cancelText: '返回修改',
        cancelButtonProps: {
          type: 'text',
          kind: 'neutral',
        },
      })
          .then(() => {
            console.info('Confirmed!');
          })
          .catch(() => {
            console.info('Cancelled!');
          });
    };
    return {
      showAlert,
      showConfirm,
      showNoClose,
    };
  },
});
<\/script>
`,
    path: "demos/methods/MessageBox/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="与-button-的防抖函数联合使用" tabindex="-1">与 Button 的防抖函数联合使用 <a class="header-anchor" href="#与-button-的防抖函数联合使用" aria-label="Permalink to &quot;与 Button 的防抖函数联合使用&quot;">​</a></h2><p>可以给 <code>okButtonProps</code> <code>cancelButtonProps</code> 传入 <code>debounceType</code> <code>debounceFn</code> 来开启防抖的监听</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-button class="mr-2" @click="showAlert">Alert</h-button>
  <h-button class="mr-2" @click="showConfirm">Confirm</h-button>
</template>

<script setup lang="ts">
import { $alert, $confirm, $message } from '@aurora/horizon-web';

const showAlert = () => {
  $alert('这是一段文本', '提示', {
    maskClose: true,
    escClose: true,
    okText: '我知道了',
    okButtonProps: {
      debounceType: 'loading',
      debounceFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            $message.success('finished!');
            resolve(void 0);
          }, 2000);
        });
      },
    },
  }).then(() => {
    console.info('OK clicked!');
  });
};
const showConfirm = () => {
  $confirm('这是一段文本', '提示', {
    maskClose: true,
    escClose: true,
    okText: '确认提交',
    okButtonProps: {
      debounceType: 'loading',
      debounceFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            $message.success('finished!');
            resolve(void 0);
          }, 2000);
        });
      },
    },
    cancelButtonProps: {
      debounceType: 'loading',
      debounceFn: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            $message.warning('cancel!');
            resolve(void 0);
          }, 2000);
        });
      },
    },
  })
    .then(close => {
      console.info('Confirmed!');
      close();
    })
    .catch(() => {
      console.info('Cancelled!');
    });
};
<\/script>
`,
    path: "demos/methods/MessageBox/debounce-fn.vue"
  }, null, _parent));
  _push(`<h2 id="alert-重载" tabindex="-1">$alert 重载 <a class="header-anchor" href="#alert-重载" aria-label="Permalink to &quot;$alert 重载&quot;">​</a></h2><p><code>$alert</code> 包含 5 个重载方法。</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $alert</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $alert</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MsgBoxAlertProps</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $alert</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $alert</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MsgBoxAlertProps</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $alert</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MsgBoxAlertProps</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="confirm-重载" tabindex="-1">$confirm 重载 <a class="header-anchor" href="#confirm-重载" aria-label="Permalink to &quot;$confirm 重载&quot;">​</a></h2><p><code>$confirm</code> 包含 5 个重载方法，<code>resolve</code> 会传入一个关闭函数，执行该函数可以关闭弹窗。</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $confirm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $confirm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MsgBoxConfirmProps</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $confirm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $confirm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MsgBoxConfirmProps</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $confirm</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">(</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> MsgBoxConfirmProps</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;() </span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">=&gt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> void</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="alert-api" class="no-underline h2"><a href="#alert-api" class="!no-underline">Alert Api</a></h2><h3 id="alert-options" class="no-underline h3"><a href="#alert-options" class="!no-underline">Alert Options</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>是否必填</th><th>默认值</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td rowspan="1">提示框标题</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td rowspan="1">提示框内容</td><td rowspan="1">是</td><td rowspan="1">-</td><td rowspan="1"><code> string | VNode</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td rowspan="1">提示框类型</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> &#39;info&#39; | &#39;success&#39; | &#39;warning&#39; | &#39;error&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconName</td><td rowspan="1">自定义图标名称</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconSize</td><td rowspan="1">自定义图标大小</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconColor</td><td rowspan="1">自定义图标颜色</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">maskClose</td><td rowspan="1">点击蒙层是否关闭提示框</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">escClose</td><td rowspan="1">按下 ESC 键是否关闭提示框</td><td rowspan="1">否</td><td rowspan="1">false</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">okText</td><td rowspan="1">按钮文本</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">okButtonProps</td><td rowspan="1">按钮的 props，传入一个对象，详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "button#Button%20Props" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button Props`);
      } else {
        return [
          createTextVNode("Button Props")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> Object as PropType&lt;Partial&lt;ButtonProps&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">zIndex</td><td rowspan="1">CSS 层级</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">closeButton</td><td rowspan="1">是否显示关闭按钮</td><td rowspan="1">否</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="confirm-api" class="no-underline h2"><a href="#confirm-api" class="!no-underline">Confirm Api</a></h2><h3 id="confirm-options" class="no-underline h3"><a href="#confirm-options" class="!no-underline">Confirm Options</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>是否必填</th><th>默认值</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td rowspan="1">确认框标题</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">content</td><td rowspan="1">确认框内容</td><td rowspan="1">是</td><td rowspan="1">-</td><td rowspan="1"><code> string | VNode</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td rowspan="1">确认框类型</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> &#39;info&#39; | &#39;success&#39; | &#39;warning&#39; | &#39;error&#39;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconName</td><td rowspan="1">自定义图标名称</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconSize</td><td rowspan="1">自定义图标大小</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">iconColor</td><td rowspan="1">自定义图标颜色</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">maskClose</td><td rowspan="1">点击蒙层是否关闭确认框</td><td rowspan="1">否</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">escClose</td><td rowspan="1">按下 ESC 键是否关闭确认框</td><td rowspan="1">否</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">okText</td><td rowspan="1">确定按钮文本</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">okButtonProps</td><td rowspan="1">确定按钮的 props，传入一个对象，详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "button#Button%20Props" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button Props`);
      } else {
        return [
          createTextVNode("Button Props")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> Object as PropType&lt;Partial&lt;ButtonProps&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelText</td><td rowspan="1">取消按钮文本</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> string</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">cancelButtonProps</td><td rowspan="1">取消按钮的 props，传入一个对象，详见 `);
  _push(ssrRenderComponent(_component_h_link, { href: "button#Button%20Props" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Button Props`);
      } else {
        return [
          createTextVNode("Button Props")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> Object as PropType&lt;Partial&lt;ButtonProps&gt;&gt;</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">zIndex</td><td rowspan="1">CSS 层级</td><td rowspan="1">否</td><td rowspan="1">-</td><td rowspan="1"><code> number</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">closeButton</td><td rowspan="1">是否显示关闭按钮</td><td rowspan="1">否</td><td rowspan="1">true</td><td rowspan="1"><code> boolean</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/methods/MessageBox.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const MessageBox = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  MessageBox as default
};
