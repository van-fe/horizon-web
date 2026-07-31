import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Hover.md","filePath":"zh/demos/components/Hover.md"}');
const _sfc_main = { name: "demos/components/Hover.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Hover</h1><p class="description">鼠标移入容器后显示某个元素，鼠标移出容器后隐藏元素</p><h2 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-hover v-slot="{ hover }">\n    <div class="container">\n      <span>容器</span>\n      <h-button v-if="hover" size="medium">删除</h-button>\n    </div>\n  </h-hover>\n</template>\n\n<style lang="scss" scoped>\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 70px;\n  padding: 10px;\n  margin: 10px 0;\n  border-radius: 4px;\n  background-color: var(--h-bg-success-weak-activated);\n}\n</style>\n',
    path: "demos/components/Hover/hover.vue"
  }, null, _parent));
  _push(`<h2 id="禁用" tabindex="-1">禁用 <a class="header-anchor" href="#禁用" aria-label="Permalink to &quot;禁用&quot;">​</a></h2><p>设定 disabled 值为 true，即可禁用 hover 组件</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-hover v-slot="{ hover }" :disabled="true">\n    <div class="container">\n      <span>容器</span>\n      <h-button v-if="hover" size="medium">删除</h-button>\n    </div>\n  </h-hover>\n</template>\n\n<style lang="scss" scoped>\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 70px;\n  padding: 10px;\n  margin: 10px 0;\n  border-radius: 4px;\n  background-color: var(--h-bg-success-weak-activated);\n}\n</style>\n',
    path: "demos/components/Hover/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="延时出现和延时隐藏" tabindex="-1">延时出现和延时隐藏 <a class="header-anchor" href="#延时出现和延时隐藏" aria-label="Permalink to &quot;延时出现和延时隐藏&quot;">​</a></h2><p>可以设置 hoverShowDelay 的值来调整鼠标进入容器后，元素延迟出现的时长 可以设置 hoverHideDelay 的值来调整鼠标离开容器后，元素延迟隐藏的时长</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div>\n    <h-hover v-slot="{ hover }" :hover-show-delay="1000">\n      <div class="container">\n        <span>容器1 按钮延迟1000 ms 出现</span>\n        <h-button v-if="hover" size="medium">延迟出现</h-button>\n      </div>\n    </h-hover>\n    <h-hover v-slot="{ hover }" :hover-hide-delay="1000">\n      <div class="container">\n        <span>容器2 按钮延迟1000 ms 隐藏</span>\n        <h-button v-if="hover" size="medium">延迟隐藏</h-button>\n      </div>\n    </h-hover>\n  </div>\n</template>\n\n<style lang="scss" scoped>\n.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 70px;\n  padding: 10px;\n  margin: 10px 0;\n  border-radius: 4px;\n  background-color: var(--h-bg-success-weak-activated);\n}\n</style>\n',
    path: "demos/components/Hover/delay.vue"
  }, null, _parent));
  _push(`<h2 id="hover-api" class="no-underline h2"><a href="#hover-api" class="!no-underline">Hover Api</a></h2><h3 id="hover-props" class="no-underline h3"><a href="#hover-props" class="!no-underline">Hover Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标进入后，hover 延迟出现的时长</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标离开后，hover 延迟隐藏的时长</td><td><code>number</code></td><td class="text-center">否</td><td>0</td></tr></tbody></table><h3 id="hover-emits" class="no-underline h3"><a href="#hover-emits" class="!no-underline">Hover Emits</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-enter</td><td rowspan="1">鼠标进入</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-leave</td><td rowspan="1">鼠标离开</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">mouse-move</td><td rowspan="1">鼠标移动</td><td rowspan="1">( e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h3 id="hover-exposes" class="no-underline h3"><a href="#hover-exposes" class="!no-underline">Hover Exposes</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">show</td><td rowspan="1">显示</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide</td><td rowspan="1">隐藏</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Hover.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Hover = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Hover as default
};
