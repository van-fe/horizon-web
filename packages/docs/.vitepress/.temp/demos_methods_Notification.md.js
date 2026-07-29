import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/methods/Notification.md","filePath":"zh/demos/methods/Notification.md"}');
const _sfc_main = { name: "demos/methods/Notification.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h2 id="basic" tabindex="-1">Basic <a class="header-anchor" href="#basic" aria-label="Permalink to &quot;Basic&quot;">​</a></h2><p>可以通过设置 <code>title</code> 和 <code>content</code> 属性来设置通知的标题和正文内容。</p><p>默认情况下，组件会自动关闭，通过<code>duration</code>属性可以设置关闭的时间间隔，接收<code>Number</code>类型，当设置<code>duration &gt; 0</code> 时，视为过相应时间自动关闭；设置为<code>duration &lt;= 0</code> 时，视为不自动关闭，需要用户自行点击 x 或者 <code>close</code> 方法去手动关闭。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">自动关闭</h-button>
    <h-button size="medium" type="primary" plain @click="open2">不自动关闭</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: '自动关闭',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
      });
    };
    const open2 = () => {
      $notify({
        title: '不自动关闭',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        duration: 0,
      });
    };
    return {
      open1,
      open2,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/basic.vue"
  }, null, _parent));
  _push(`<h2 id="content" tabindex="-1">Content <a class="header-anchor" href="#content" aria-label="Permalink to &quot;Content&quot;">​</a></h2><p><code>content</code> 支持传入 HTML 字符串来作为正文内容。 将 <code>useHTML</code> 属性设置为 true，<code>content</code> 属性就会被当作 HTML 片段处理。</p><p>当然，也可以把 <code>content</code> 传入一个 <code>render</code> 函数，就可以实现动态更新content显示。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">Use HTML</h-button>
    <h-button size="medium" type="primary" plain @click="open2">VNode</h-button>
    <h-button size="medium" type="primary" plain @click="open3">动态更新content</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: 'Use HTML',
        useHTML: true,
        content:
          '<strong>这是一段内容，可以<i>随意</i>编辑，这是一段内容，可以<i>随意</i>编辑，这是一段内容，可以<i>随意</i>编辑。</strong>',
      });
    };
    const open2 = () => {
      $notify({
        title: 'VNode',
        content: h('p', null, [
          h(
            'div',
            null,
            '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
          ),
        ]),
      });
    };
    const open3 = () => {
      const count = ref(1);
      setInterval(() => {
        count.value++;
      }, 1000);
      const options = {
        title: '动态更新content',
        content() {
          return h('p', null, [h('div', null, count.value)]);
        },
      };
      $notify(options);
    };
    return {
      open1,
      open2,
      open3,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/content.vue"
  }, null, _parent));
  _push(`<h2 id="types" tabindex="-1">Types <a class="header-anchor" href="#types" aria-label="Permalink to &quot;Types&quot;">​</a></h2><p>我们提供了五种不同类型的提醒框：normal、success、warning、info 和error。</p><p>使用 <code>type</code> 属性设置其类型， 支持五个选项：<code>normal</code>、<code>success</code>、<code>warning</code>、<code>info</code> 和 <code>error</code>， 默认为 <code>normal</code>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">normal</h-button>
    <h-button size="medium" type="primary" plain @click="open2">info</h-button>
    <h-button size="medium" type="primary" plain @click="open3">success</h-button>
    <h-button size="medium" type="primary" plain @click="open4">warning</h-button>
    <h-button size="medium" type="primary" plain @click="open5">error</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Normal',
        {
          type: 'normal',
        },
      );
    };
    const open2 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Info',
        {
          type: 'info',
        },
      );
    };
    const open3 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Success',
        {
          type: 'success',
        },
      );
    };
    const open4 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Warning',
        {
          type: 'warning',
        },
      );
    };
    const open5 = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        'Error',
        {
          type: 'error',
        },
      );
    };

    return {
      open1,
      open2,
      open3,
      open4,
      open5,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/different-types.vue"
  }, null, _parent));
  _push(`<h2 id="placement" tabindex="-1">Placement <a class="header-anchor" href="#placement" aria-label="Permalink to &quot;Placement&quot;">​</a></h2><p>Notification 可以从屏幕四角中的任意一角弹出</p><p>使用 <code>placement</code> 属性设置其弹出位置， 支持四个选项：<code>top-right</code>、<code>top-left</code>、<code>bottom-right</code> 和 <code>bottom-left</code>， 默认为 <code>top-right</code>。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">Top Right</h-button>
    <h-button size="medium" type="primary" plain @click="open2">Bottom Right</h-button>
    <h-button size="medium" type="primary" plain @click="open3">Bottom Left</h-button>
    <h-button size="medium" type="primary" plain @click="open4">Top Left</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: 'Top Right',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'top-right',
      });
    };
    const open2 = () => {
      $notify({
        title: 'Bottom Right',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'bottom-right',
      });
    };
    const open3 = () => {
      $notify({
        title: 'Bottom Left',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'bottom-left',
      });
    };
    const open4 = () => {
      $notify({
        title: 'Top Left',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        placement: 'top-left',
      });
    };
    return {
      open1,
      open2,
      open3,
      open4,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/placement.vue"
  }, null, _parent));
  _push(`<h2 id="offset" tabindex="-1">Offset <a class="header-anchor" href="#offset" aria-label="Permalink to &quot;Offset&quot;">​</a></h2><p>使用 <code>offset</code> 设置偏移量，相对屏幕顶部或底部的偏移量，使用 <code>gap</code> 设置相邻Notification实例之间的间距。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">offset</h-button>
    <h-button size="medium" type="primary" plain @click="open2">gap</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: 'Offset',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        offset: 60,
      });
    };
    const open2 = () => {
      $notify({
        title: 'Gap',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        offset: 60,
        gap: 20,
      });
    };
    return {
      open1,
      open2,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/offset.vue"
  }, null, _parent));
  _push(`<h2 id="width" tabindex="-1">Width <a class="header-anchor" href="#width" aria-label="Permalink to &quot;Width&quot;">​</a></h2><p>使用 <code>width</code> 设置自定义宽度。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open1">自定义宽度</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open1 = () => {
      $notify({
        title: '自定义宽度',
        width: '300px',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
      });
    };
    return {
      open1,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/width.vue"
  }, null, _parent));
  _push(`<h2 id="buttons" tabindex="-1">Buttons <a class="header-anchor" href="#buttons" aria-label="Permalink to &quot;Buttons&quot;">​</a></h2><p>操作按钮可以为用户提供处理通知的按钮</p><p>使用 <code>show-confirm-button</code>、<code>show-cancel-button</code>分别设置OK按钮和Cancel按钮显示，使用<code>confirmButtonProps</code>可以设置button相关属性，例如防抖操作。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open">操作按钮</h-button>
    <h-button size="medium" type="primary" plain @click="open1">防抖按钮</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify, $message } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open = () => {
      $notify(
        '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        '操作按钮',
        {
          type: 'info',
          showConfirmButton: true,
          showCancelButton: true,
          callback(action, instance) {
            console.info(action, instance);
          },
        },
      );
    };

    const open1 = () => {
      $notify({
        title: '部分导入失败',
        useHTML: true,
        duration: 0,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: '关闭',
        confirmButtonText: '下载失败报告',
        confirmButtonProps: {
          debounceType: 'loading',
          debounceFn: () => {
            console.info('clicked!');
            return new Promise((resolve) => {
              setTimeout(() => {
                $message.success('保存成功！');
                resolve(null);
              }, 2000);
            });
          },
        },
        content: '部分导入失败',
        type: 'error',
      });
    };

    return {
      open,
      open1,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/operation.vue"
  }, null, _parent));
  _push(`<h2 id="show-close" tabindex="-1">Show close <a class="header-anchor" href="#show-close" aria-label="Permalink to &quot;Show close&quot;">​</a></h2><p>通过<code>show-close</code>属性可以设置关闭按钮是否显示。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open">隐藏关闭按钮</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    const open = () => {
      $notify({
        title: '隐藏关闭按钮',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
        showClose: false,
      });
    };
    return {
      open,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/close.vue"
  }, null, _parent));
  _push(`<h2 id="close-closeall" tabindex="-1">Close/CloseAll <a class="header-anchor" href="#close-closeall" aria-label="Permalink to &quot;Close/CloseAll&quot;">​</a></h2><p>异步调用 <code>$notify</code> 会返回当前 Notification 的实例。如果需要手动关闭实例，可以调用它的 <code>close</code> 方法，也可调用 <code>closeAll</code> 方法关闭所有实例。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="demo-wrapper">
    <h-button size="medium" type="primary" plain @click="open">打开实例</h-button>
    <h-button size="medium" type="primary" plain @click="close1">关闭当前实例</h-button>
    <h-button size="medium" type="primary" plain @click="close2">关闭所有实例</h-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { $notify } from '@aurora/horizon-web';

export default defineComponent({
  setup() {
    let instance: any = null;
    const open = async () => {
      instance = await $notify({
        title: '实例',
        content:
          '这是一段内容，可以随意编辑，这是一段内容，可以随意编辑，这是一段内容，可以随意编辑。',
      });
    };

    function close1() {
      instance.close();
    }

    function close2() {
      instance.closeAll();
    }

    return {
      open,
      close1,
      close2,
    };
  },
});
<\/script>

<style scoped>
.demo-wrapper .h-button {
  margin-right: 40px;
}
</style>
`,
    path: "demos/methods/Notification/methods.vue"
  }, null, _parent));
  _push(`<h2 id="notify-重载" tabindex="-1">$notify 重载 <a class="header-anchor" href="#notify-重载" aria-label="Permalink to &quot;$notify 重载&quot;">​</a></h2><p><code>$notify</code> 包含 5 个重载方法，<code>resolve、reject</code> 会传入操作类型。</p><div class="language-ts vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $notify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> (</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $notify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> (</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> OptionsType</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $notify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> (</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $notify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> (</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">content</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">title</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}"> string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">, </span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> OptionsType</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">function</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> $notify</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}"> (</span><span style="${ssrRenderStyle({ "--shiki-light": "#E36209", "--shiki-dark": "#FFAB70" })}">options</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> OptionsType</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">)</span><span style="${ssrRenderStyle({ "--shiki-light": "#D73A49", "--shiki-dark": "#F97583" })}">:</span><span style="${ssrRenderStyle({ "--shiki-light": "#6F42C1", "--shiki-dark": "#B392F0" })}"> Promise</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&lt;</span><span style="${ssrRenderStyle({ "--shiki-light": "#005CC5", "--shiki-dark": "#79B8FF" })}">string</span><span style="${ssrRenderStyle({ "--shiki-light": "#24292E", "--shiki-dark": "#E1E4E8" })}">&gt;;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/methods/Notification.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Notification = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Notification as default
};
