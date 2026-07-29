import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Card.md","filePath":"en/demos/components/Card.md"}');
const _sfc_main = { name: "en/demos/components/Card.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Card</h1><p class="description">卡片组件</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <ul>
    <li>
      <h-input size="small" v-model="title" placeholder="请输入"></h-input>
    </li>
    <li><h-checkbox v-model="topDivider" label="上分割线" /></li>
    <li><h-checkbox v-model="bottomDivider" label="下分割线" /></li>
    <li><h-checkbox v-model="border" label="边框" /></li>
    <li class="flex">
      <span>圆角：</span>
      <h-radio-group v-if="border" v-model="radius">
        <h-radio label="none" v-model="radius">none</h-radio>
        <h-radio label="small" v-model="radius">small</h-radio>
        <h-radio label="medium" v-model="radius">medium</h-radio>
        <h-radio label="large" v-model="radius">large</h-radio>
      </h-radio-group>
    </li>
  </ul>
  <h-card
      :title="title"
      :top-divider="topDivider"
      :bottom-divider="bottomDivider"
      :radius="radius"
      :border="border"
  >
    {{ text }}
    <template #footer>
      <div class="custom-footer">
        <h-button type="normal" size="small">Default</h-button>
        <h-button size="small">Default</h-button>
      </div>
    </template>
  </h-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('我是标题');
const radius = ref('small');
const topDivider = ref(false);
const bottomDivider = ref(false);
const border = ref(true);
const text =
    '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案';
<\/script>

<style lang="scss" scoped>
.custom-footer {
  display: flex;
  justify-content: flex-end;
}
ul{
  display: flex;
  flex-direction: column;
  row-gap: 8px;
}
</style>
`,
    path: "demos/components/Card/basic.vue"
  }, null, _parent));
  _push(`<h2 id="custom-header" tabindex="-1">Custom Header <a class="header-anchor" href="#custom-header" aria-label="Permalink to &quot;Custom Header&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <ul>
    <li>
      <p>带操作</p>
      <h-card top-divider>
        <template #header>
          <div class="header">
            卡片标题
            <a>操作</a>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
    <li>
      <p>checkbox</p>
      <h-card top-divider>
        <template #header>
          <div class="header2">
            <h-checkbox v-model="checkbox">卡片标题</h-checkbox>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
    <li>
      <p>带标签</p>
      <h-card top-divider>
        <template #header>
          <div class="header3">
            <div>
              <h-tag size="medium">标签</h-tag>
            </div>
            <span class="title">卡片标题</span>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
    <li>
      <p>带图标</p>
      <h-card top-divider>
        <template #header>
          <div class="header4">
            <svg
              t="1671430836155"
              class="icon"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2785"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="200"
              height="200"
            >
              <path
                fill="currentColor"
                d="M512.042667 682.666667c-94.122667 0-170.666667-76.544-170.666667-170.666667s76.544-170.666667 170.666667-170.666667 170.666667 76.544 170.666666 170.666667-76.586667 170.666667-170.666666 170.666667z m0-298.666667c-70.570667 0-128 57.429333-128 128s57.429333 128 128 128 128-57.429333 128-128-57.429333-128-128-128z"
                p-id="2786"
              ></path>
              <path
                fill="currentColor"
                d="M512.042667 810.666667C267.989333 810.666667 66.56 603.562667 10.666667 540.074667a42.922667 42.922667 0 0 1-0.085334-56.106667C66.517333 420.48 267.989333 213.333333 512.042667 213.333333c243.797333 0 445.098667 206.72 501.205333 270.378667l0.256 0.298667c13.866667 15.957333 13.866667 40.021333 0 55.978666C957.525333 603.52 756.053333 810.666667 512.042667 810.666667z m0-554.666667C285.909333 256 95.573333 452.010667 42.666667 512.128 95.616 571.989333 285.866667 768 512.042667 768c226.133333 0 416.426667-196.010667 469.376-256.128C928.426667 452.010667 738.133333 256 512.042667 256z"
                p-id="2787"
              ></path>
            </svg>
            <p>DD UED TEAM</p>
            <p style="color:#868a9a;font-weight:400">描述文案描述文案描述文案描述文案</p>
          </div>
        </template>
        {{ content }}
      </h-card>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(false);
const content = ref(
  '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案',
);
<\/script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 16px;

  a {
    color: #00bebe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
  }
}

.header2 {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;

  .checkbox {
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 1px solid #9b9da9;
    border-radius: 4px;
    margin-right: 12px;
  }
}
.header3 {
  .title {
    margin-top: 12px;
    display: block;
    color: #040b29;
    line-height: 24px;
    font-weight: 700;
    font-size: 16px;
  }
}
.header4 {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 16px;

  svg {
    width: 28px;
    height: 28px;
    color: #00b3be;
  }
  p {
    margin: 0;
    &:first-of-type {
      margin: 12px 0 4px;
      font-size: 16px;
      color: #040b29;
    }
    &:last-of-type {
      color: #6f7385;
      font-size: 12px;
    }
  }
}
p {
  margin: 20px 0;
}
ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 12px;
}
</style>
`,
    path: "demos/components/Card/header.vue"
  }, null, _parent));
  _push(`<h2 id="custom-content" tabindex="-1">Custom Content <a class="header-anchor" href="#custom-content" aria-label="Permalink to &quot;Custom Content&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="content">
    <h-card title="标题">
      <img
          class="content-img"
          src="https://static.example.com/fx-static/card-component/clbu60ecm0000072w2izw1wsp/img.png"
          alt=""
      />
    </h-card>
    <h-card>
      <ul class="list">
        <li :key="item" v-for="item in 3">
          <h4>标题</h4>
          <p>
            卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。
          </p>
        </li>
      </ul>
    </h-card>
    <h-card>
      <template #header>
        <h-tabs size="medium" v-model="tab">
          <h-tab label="标签一" name="label1"></h-tab>
          <h-tab label="标签二" name="label2"></h-tab>
          <h-tab label="标签三" name="label3"></h-tab>
        </h-tabs>
      </template>
      <p>
        这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段长很长很长很长很长很长很的内容文案
      </p>
    </h-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('label1');
<\/script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
}
.content-img {
  width: 100%;
  object-fit: contain;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;

  li + li {
    margin-top: 24px;
    font-family: 'Blue Sky Noto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }
  h4 {
    font-weight: 400;
    color: #868A9A;
    margin-bottom: 4px;
  }
  p {
    color: #040b29;
  }
}
</style>
`,
    path: "demos/components/Card/content.vue"
  }, null, _parent));
  _push(`<h2 id="custom-footer-with-status" tabindex="-1">Custom Footer with Status <a class="header-anchor" href="#custom-footer-with-status" aria-label="Permalink to &quot;Custom Footer with Status&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h3>带状态</h3>\n  <h-card bottom-divider>\n    <p>\n      内容区域的卡片形式。卡片内容区域可以是文字、图片、表单、表格等形式信息内容。可使用大中小不同的卡片尺寸，按业务需求进行呈现。\n    </p>\n    <template #footer>\n      <footer class="footer-1">\n        <span>2018-06-15</span>\n        <svg\n            t="1671430836155"\n            class="icon"\n            viewBox="0 0 1024 1024"\n            version="1.1"\n            xmlns="http://www.w3.org/2000/svg"\n            p-id="2785"\n            xmlns:xlink="http://www.w3.org/1999/xlink"\n            width="200"\n            height="200"\n        >\n          <path\n              d="M512.042667 682.666667c-94.122667 0-170.666667-76.544-170.666667-170.666667s76.544-170.666667 170.666667-170.666667 170.666667 76.544 170.666666 170.666667-76.586667 170.666667-170.666666 170.666667z m0-298.666667c-70.570667 0-128 57.429333-128 128s57.429333 128 128 128 128-57.429333 128-128-57.429333-128-128-128z"\n              p-id="2786"\n          ></path>\n          <path\n              d="M512.042667 810.666667C267.989333 810.666667 66.56 603.562667 10.666667 540.074667a42.922667 42.922667 0 0 1-0.085334-56.106667C66.517333 420.48 267.989333 213.333333 512.042667 213.333333c243.797333 0 445.098667 206.72 501.205333 270.378667l0.256 0.298667c13.866667 15.957333 13.866667 40.021333 0 55.978666C957.525333 603.52 756.053333 810.666667 512.042667 810.666667z m0-554.666667C285.909333 256 95.573333 452.010667 42.666667 512.128 95.616 571.989333 285.866667 768 512.042667 768c226.133333 0 416.426667-196.010667 469.376-256.128C928.426667 452.010667 738.133333 256 512.042667 256z"\n              p-id="2787"\n          ></path>\n        </svg>\n        <span>2919</span>\n        <svg\n            t="1671430836155"\n            class="icon"\n            viewBox="0 0 1024 1024"\n            version="1.1"\n            xmlns="http://www.w3.org/2000/svg"\n            p-id="2785"\n            xmlns:xlink="http://www.w3.org/1999/xlink"\n            width="200"\n            height="200"\n        >\n          <path\n              d="M512.042667 682.666667c-94.122667 0-170.666667-76.544-170.666667-170.666667s76.544-170.666667 170.666667-170.666667 170.666667 76.544 170.666666 170.666667-76.586667 170.666667-170.666666 170.666667z m0-298.666667c-70.570667 0-128 57.429333-128 128s57.429333 128 128 128 128-57.429333 128-128-57.429333-128-128-128z"\n              p-id="2786"\n          ></path>\n          <path\n              d="M512.042667 810.666667C267.989333 810.666667 66.56 603.562667 10.666667 540.074667a42.922667 42.922667 0 0 1-0.085334-56.106667C66.517333 420.48 267.989333 213.333333 512.042667 213.333333c243.797333 0 445.098667 206.72 501.205333 270.378667l0.256 0.298667c13.866667 15.957333 13.866667 40.021333 0 55.978666C957.525333 603.52 756.053333 810.666667 512.042667 810.666667z m0-554.666667C285.909333 256 95.573333 452.010667 42.666667 512.128 95.616 571.989333 285.866667 768 512.042667 768c226.133333 0 416.426667-196.010667 469.376-256.128C928.426667 452.010667 738.133333 256 512.042667 256z"\n              p-id="2787"\n          ></path>\n        </svg>\n        <span>2919</span>\n      </footer>\n    </template>\n  </h-card>\n  <h3 style="marginTop:2em">带输入</h3>\n  <h-card bottom-divider>\n    这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很的内容文案\n    <template #footer>\n      <footer class="footer-2">\n        <h-input type="textarea" placeholder="请输入" />\n      </footer>\n    </template>\n  </h-card>\n</template>\n\n<script setup lang="ts"><\/script>\n\n<style lang="scss" scoped>\n.footer-1 {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #6f7385;\n  font-weight: 400;\n  font-size: 14px;\n  line-height: 22px;\n  .icon {\n    width: 15px;\n    height: 15px;\n    margin-right: 4px;\n    margin-left: 18px;\n    &:first-of-type {\n      margin-left: auto;\n    }\n  }\n}\np {\n  margin: 0;\n}\n</style>\n',
    path: "demos/components/Card/footer.vue"
  }, null, _parent));
  _push(`<h2 id="other-scenarios" tabindex="-1">Other Scenarios <a class="header-anchor" href="#other-scenarios" aria-label="Permalink to &quot;Other Scenarios&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="flex">
    <h-card
      draggable="true"
      :class="[
        'drag',
        'hover',
        {
          dragging: dragging,
        },
      ]"
      title="可拖拽"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      {{ text }}
    </h-card>
    <h-card
        draggable="true"
        class='hover'
        title="悬浮阴影"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
    >
      {{ text }}
    </h-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = '这是一段很长很长很长很长很长很长很长很长很长很';
const dragging = ref(false);
const handleDragStart = () => {
  dragging.value = true;
};

const handleDragEnd = () => {
  dragging.value = false;
};
<\/script>

<style lang="scss" scoped>
.flex {
  display: flex;
  column-gap: 20px;
}
.drag {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.dragging {
  opacity: 0.5; // 或其他你想要的样式
  cursor: grabbing!important;
}
.hover{
  &:hover{
    transition: .3s ease-in-out;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.06), 0px 5px 12px 4px rgba(0, 0, 0, 0.04);
  }
}
</style>
`,
    path: "demos/components/Card/other.vue"
  }, null, _parent));
  _push(`<h2>Card Api</h2><h3>Card Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>默认文字标题</td><td><code>string</code></td><td class="text-center">No</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">top-divider</td><td>是否有上分割线</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bottom-divider</td><td>是否有下分割线</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">radius</td><td>卡片圆角尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39; | &#39;none&#39;</code></td><td class="text-center">No</td><td>&#39;medium&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border</td><td>是否有边框</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Card.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Card = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Card as default
};
