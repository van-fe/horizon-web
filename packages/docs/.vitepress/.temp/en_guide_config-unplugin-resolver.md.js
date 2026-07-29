import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"UnpluginResolver Configuration","description":"","frontmatter":{},"headers":[],"relativePath":"en/guide/config-unplugin-resolver.md","filePath":"en/guide/config-unplugin-resolver.md"}');
const _sfc_main = { name: "en/guide/config-unplugin-resolver.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="unpluginresolver-configuration" tabindex="-1">UnpluginResolver Configuration <a class="header-anchor" href="#unpluginresolver-configuration" aria-label="Permalink to &quot;UnpluginResolver Configuration&quot;">​</a></h1><h2 id="exclude" tabindex="-1">exclude <a class="header-anchor" href="#exclude" aria-label="Permalink to &quot;exclude&quot;">​</a></h2><ul><li>Type: <code>RegExp | ((name: string) =&gt; boolean)</code></li></ul><p>Filter method/regex for component names that are not imported</p><h2 id="ssr" tabindex="-1">ssr <a class="header-anchor" href="#ssr" aria-label="Permalink to &quot;ssr&quot;">​</a></h2><ul><li>Type: <code>Boolean</code></li><li>Default: <code>false</code></li></ul><p>Whether to use <code>ssr</code> mode. After enabling, it will automatically change imports from files under <code>es</code> to <code>lib</code></p><h2 id="importstyle" tabindex="-1">importStyle <a class="header-anchor" href="#importstyle" aria-label="Permalink to &quot;importStyle&quot;">​</a></h2><ul><li>Type: <code>&#39;scss&#39; | &#39;css&#39; | false</code></li><li>Default: <code>css</code></li></ul><p>Type of style file to import</p><ul><li><code>scss</code>: Will import <code>scss</code> files. If you need to customize the namespace, you need to set this value, otherwise the custom namespace will be invalid</li><li><code>css</code>: Import static style files by default</li><li><code>false</code>: Do not import style files</li></ul><h2 id="directives" tabindex="-1">directives <a class="header-anchor" href="#directives" aria-label="Permalink to &quot;directives&quot;">​</a></h2><ul><li>Type: <code>Boolean</code></li><li>Default: <code>true</code></li></ul><p>Whether to process directives</p><h2 id="namespace" tabindex="-1">namespace <a class="header-anchor" href="#namespace" aria-label="Permalink to &quot;namespace&quot;">​</a></h2><ul><li>Type: <code>String</code></li><li>Default: <code>N</code></li></ul><p>Define namespace</p><p>If you are using the form <code>&lt;x-button&gt;...&lt;/x-button&gt;</code>, you need to set this value.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/guide/config-unplugin-resolver.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const configUnpluginResolver = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  configUnpluginResolver as default
};
