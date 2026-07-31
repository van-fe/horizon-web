import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Avatar.md","filePath":"zh/demos/components/Avatar.md"}');
const _sfc_main = { name: "demos/components/Avatar.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Avatar</h1><p class="description">返回页面顶部按钮</p><h2 id="默认图片头像" tabindex="-1">默认图片头像 <a class="header-anchor" href="#默认图片头像" aria-label="Permalink to &quot;默认图片头像&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="h-demo">
    <div class="h-demo__container">
      <div class="h-demo__title">默认随机图片头像</div>
      <h-avatar />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(1个人)</div>
      <h-avatar :src="src_url_1" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(2个人)</div>
      <h-avatar :src="src_url_2" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">群拼接头像(3个及以上)</div>
      <h-avatar :src="src_url_3" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const src_url_1 = [
      '/demo-assets/avatar-coral.svg',
    ];
    const src_url_2 = [
      '/demo-assets/avatar-coral.svg',
      '/demo-assets/avatar-indigo.svg',
    ];
    const src_url_3 = [
      '/demo-assets/avatar-coral.svg',
      '/demo-assets/avatar-indigo.svg',
      '/demo-assets/avatar-cyan.svg',
    ];
    return {
      src_url_1,
      src_url_2,
      src_url_3,
    };
  },
});
<\/script>
<style scoped>
.h-demo__container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.h-demo__title {
  margin-right: 20px;
}
</style>
`,
    path: "demos/components/Avatar/normal.vue"
  }, null, _parent));
  _push(`<h2 id="属性设置" tabindex="-1">属性设置 <a class="header-anchor" href="#属性设置" aria-label="Permalink to &quot;属性设置&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="h-demo">\n    <div class="h-demo__container">\n      <div class="h-demo__title">通过 size 设置形状</div>\n      <h-avatar class="avatar" size="mini" />\n      <h-avatar class="avatar" size="small" />\n      <h-avatar class="avatar" size="smedium" />\n      <h-avatar class="avatar" />\n      <h-avatar class="avatar" size="large" />\n    </div>\n    <div class="h-demo__container">\n      <div class="h-demo__title">通过 src 自定义头像资源</div>\n      <h-avatar class="avatar" src="/demo-assets/avatar-coral.svg" />\n    </div>\n    <div class="h-demo__container">\n      <div class="h-demo__title">通过 fit 设置适应容器,同原生 object-fit</div>\n      <h-avatar\n        class="avatar"\n        src="/demo-assets/avatar-cyan.svg"\n        fit="contain"\n      />\n      <h-avatar\n        class="avatar"\n        src="/demo-assets/avatar-cyan.svg"\n      />\n      <h-avatar\n        class="avatar"\n        src="/demo-assets/avatar-cyan.svg"\n        fit="cover"\n      />\n      <h-avatar\n        class="avatar"\n        src="/demo-assets/avatar-cyan.svg"\n        fit="none"\n      />\n      <h-avatar\n        class="avatar"\n        src="/demo-assets/avatar-cyan.svg"\n        fit="scale-down"\n      />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.avatar + .avatar {\n  margin-left: 20px;\n}\n\n.h-demo__container {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n}\n\n.h-demo__title {\n  margin-right: 20px;\n}\n</style>\n',
    path: "demos/components/Avatar/type.vue"
  }, null, _parent));
  _push(`<h2 id="文字头像" tabindex="-1">文字头像 <a class="header-anchor" href="#文字头像" aria-label="Permalink to &quot;文字头像&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="h-demo">\n    <div class="h-demo__container">\n      <div class="h-demo__title">通过 type 设置类型</div>\n      <h-avatar class="avatar" icon="friend" type="work" size="mini" />\n      <h-avatar class="avatar" icon="friend" type="work" size="small" />\n      <h-avatar class="avatar" icon="friend" type="work" size="smedium" />\n      <h-avatar class="avatar" icon="friend" type="work" />\n      <h-avatar class="avatar" icon="friend" type="work" size="large" />\n    </div>\n    <div class="h-demo__container">\n      <div class="h-demo__title">自定义颜色</div>\n      <h-avatar class="avatar" icon="friend" type="work" style="color: #178ca6; border-color: #178ca6" />\n      <h-avatar class="avatar" icon="friend" type="work" style="color: #0ba1d6; border-color: #0ba1d6" />\n      <h-avatar class="avatar" icon="friend" type="work" style="color: #00bebe; border-color: #00bebe" />\n      <h-avatar class="avatar" icon="friend" type="work" style="color: #e56c25; border-color: #e56c25" />\n    </div>\n    <div class="h-demo__container">\n      <div class="h-demo__title">通过 src 设置文字</div>\n      <h-avatar class="avatar" src="Design" type="work" size="mini" />\n      <h-avatar class="avatar" src="Design" type="work" size="small" />\n      <h-avatar class="avatar" src="Design" type="work" size="smedium" />\n      <h-avatar class="avatar" src="Design" type="work" />\n      <h-avatar class="avatar" src="Design" type="work" size="large" />\n      <h-avatar class="avatar" src="平台设计" type="work" size="mini" />\n      <h-avatar class="avatar" src="平台设计" type="work" size="small" />\n      <h-avatar class="avatar" src="平台设计" type="work" size="smedium" />\n      <h-avatar class="avatar" src="平台设计" type="work" />\n      <h-avatar class="avatar" src="平台设计" type="work" size="large" />\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.avatar + .avatar {\n  margin-left: 20px;\n}\n\n.h-demo__container {\n  display: flex;\n  align-items: center;\n  margin-bottom: 20px;\n}\n\n.h-demo__title {\n  margin-right: 20px;\n}\n</style>\n',
    path: "demos/components/Avatar/work.vue"
  }, null, _parent));
  _push(`<h2 id="fallback" tabindex="-1">Fallback <a class="header-anchor" href="#fallback" aria-label="Permalink to &quot;Fallback&quot;">​</a></h2><p>当展示类型为图片的时候，图片加载失败的 fallback 行为</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="h-demo">
    <div class="h-demo__container">
      <div class="h-demo__title">通过加载图片失败默认处理</div>
      <h-avatar size="large" :src="src1" @error="errorHandler1" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">通过 error 方法自定义处理加载图片失败情况</div>
      <h-avatar size="large" :src="src" @error="errorHandler" />
    </div>
    <div class="h-demo__container">
      <div class="h-demo__title">通过插槽自定义加载图片失败情况</div>
      <h-avatar size="large" :src="src2">
        <template #error>
          <div>失败了</div>
        </template>
      </h-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    let src = ref('https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg');
    let src2 = ref('https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg');
    let src1 = ref('https://cdn-app.example.com/us/2022/3/1/61e23a30-bf79-4479-b084-27a36adb8334.jpg');
    const errorHandler = () => {
      src.value = '/demo-assets/avatar-cyan.svg';
    };
    const errorHandler1 = () => {
      console.info('图片加载失败了');
    };
    return {
      errorHandler,
      errorHandler1,
      src,
      src1,
      src2,
    };
  },
});
<\/script>

<style scoped lang="scss">
.h-avatar {
  margin-right: 20px;
  &--error {
    background-color: #000;
    color: #fff;
  }
}

.h-demo__container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.h-demo__title {
  margin-right: 20px;
}
</style>
`,
    path: "demos/components/Avatar/error.vue"
  }, null, _parent));
  _push(`<h2 id="avatar-api" class="no-underline h2"><a href="#avatar-api" class="!no-underline">Avatar Api</a></h2><h3 id="avatar-props" class="no-underline h3"><a href="#avatar-props" class="!no-underline">Avatar Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>设置头像的大小</td><td><code>&#39;mini&#39; | &#39;small&#39; | &#39;smedium&#39; | &#39;medium&#39; | &#39;large&#39; | number</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>设置头像的图标类型，参考 Icon 组件</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">src</td><td>图片头像资源<br>当type是work时，为文字头像内容</td><td><code>string | string[]</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fit</td><td>当展示类型为图片的时候，设置图片如何适应容器框<br>object-fit属性值</td><td><code>&#39;fill&#39; | &#39;contain&#39; | &#39;cover&#39; | &#39;none&#39; | &#39;scale-down&#39;</code></td><td class="text-center">否</td><td>&#39;fill&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>头像类型</td><td><code>&#39;normal&#39; | &#39;work&#39;</code></td><td class="text-center">否</td><td>&#39;normal&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">random-src</td><td>未设置src时，随机头像组</td><td><code>string[]</code></td><td class="text-center">否</td><td>() =&gt; []</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td>兜底默认头像</td><td><code>string</code></td><td class="text-center">否</td><td>&#39;https://cdn-app.example.com/horizon-web/defaultAvatar.jpg&#39;</td></tr></tbody></table><h3 id="avatar-emits" class="no-underline h3"><a href="#avatar-emits" class="!no-underline">Avatar Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">error</td><td rowspan="1">图片类头像加载失败的回调， 返回 false 会关闭组件默认的 fallback 行为</td><td rowspan="1">( evt: <code>Event</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>Event</code></td><td>Img标签 onError 原生事件</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Avatar.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Avatar = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Avatar as default
};
