import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"UnpluginResolver 配置","description":"","frontmatter":{},"headers":[],"relativePath":"guide/config-unplugin-resolver.md","filePath":"zh/guide/config-unplugin-resolver.md"}');
const _sfc_main = { name: "guide/config-unplugin-resolver.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="unpluginresolver-配置" tabindex="-1">UnpluginResolver 配置 <a class="header-anchor" href="#unpluginresolver-配置" aria-label="Permalink to &quot;UnpluginResolver 配置&quot;">​</a></h1><h2 id="exclude" tabindex="-1">exclude <a class="header-anchor" href="#exclude" aria-label="Permalink to &quot;exclude&quot;">​</a></h2><ul><li>类型: <code>RegExp | ((name: string) =&gt; boolean)</code></li></ul><p>不进行引入的组件名称的过滤方法/正则</p><h2 id="ssr" tabindex="-1">ssr <a class="header-anchor" href="#ssr" aria-label="Permalink to &quot;ssr&quot;">​</a></h2><ul><li>类型: <code>Boolean</code></li><li>默认: <code>false</code></li></ul><p>是否使用 <code>ssr</code> 模式。启用后，会自动从 <code>es</code> 下的文件的引入改为 <code>lib</code></p><h2 id="importstyle" tabindex="-1">importStyle <a class="header-anchor" href="#importstyle" aria-label="Permalink to &quot;importStyle&quot;">​</a></h2><ul><li>类型: <code>&#39;scss&#39; | &#39;css&#39; | false</code></li><li>默认: <code>css</code></li></ul><p>引入样式文件的类型</p><ul><li><code>scss</code>: 会引入 <code>scss</code> 文件，如果需要自定义命名空间的话，需要设置为此值，否则自定义命名空间将无效</li><li><code>css</code>: 默认引入静态样式文件</li><li><code>false</code>: 不引入样式文件</li></ul><h2 id="directives" tabindex="-1">directives <a class="header-anchor" href="#directives" aria-label="Permalink to &quot;directives&quot;">​</a></h2><ul><li>类型: <code>Boolean</code></li><li>默认: <code>true</code></li></ul><p>是否处理指令</p><h2 id="namespace" tabindex="-1">namespace <a class="header-anchor" href="#namespace" aria-label="Permalink to &quot;namespace&quot;">​</a></h2><ul><li>类型: <code>String</code></li><li>默认: <code>N</code></li></ul><p>定义命名空间</p><p>如果你使用的是 <code>&lt;x-button&gt;...&lt;/x-button&gt;</code> 的形式，则需要设置此值。</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/guide/config-unplugin-resolver.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const configUnpluginResolver = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  configUnpluginResolver as default
};
