import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Popover.md","filePath":"en/demos/components/Popover.md"}');
const _sfc_main = { name: "en/demos/components/Popover.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Popover</h1><p class="description">The simplest usage, the size of the floating layer is determined by the content area.</p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2><p>The simplest usage, the size of the floating layer is determined by the content area.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<script setup lang="ts"><\/script>\n\n<template>\n  <h-popover placement="auto">\n    <template #reference>\n      <h-button>Hover me</h-button>\n    </template>\n    <template #popper>\n      <h-pop-content>\n        <div>Hello World</div>\n      </h-pop-content>\n    </template>\n  </h-popover>\n</template>',
    path: "demos/components/Popover/basic.vue"
  }, null, _parent));
  _push(`<h2 id="trigger-method" tabindex="-1">Trigger Method <a class="header-anchor" href="#trigger-method" aria-label="Permalink to &quot;Trigger Method&quot;">​</a></h2><p>There are 6 trigger methods to choose from: hover, click, click-remain, click-hide, focus, manual;</p><p>click-remain means the popper remains displayed after clicking the popper, click-hide means the popper is hidden after clicking the popper, click has the same behavior as click-hide;</p><p>focus means mouse down state</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space>
    <h-popover trigger="hover">
      <template #reference>
        <h-button>hover</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>show hello</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="click">
      <template #reference>
        <h-button>click</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>show hello</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="click-remain">
      <template #reference>
        <h-button>click-remain</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>Hello World</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="click-hide">
      <template #reference>
        <h-button>click-hide</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>Hello World</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="focus">
      <template #reference>
        <h-button>focus</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div>Hello World</div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover trigger="manual" :visible="visible">
      <template #reference>
        <h-button @click="visible = true">open</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <h-space>
            click the btn to close!
            <h-button type="danger" @click="visible = false">close</h-button>
          </h-space>
        </h-pop-content>
      </template>
    </h-popover>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
<\/script>
`,
    path: "demos/components/Popover/trigger.vue"
  }, null, _parent));
  _push(`<h2 id="position" tabindex="-1">Position <a class="header-anchor" href="#position" aria-label="Permalink to &quot;Position&quot;">​</a></h2><p>There are 15 position strategies to choose from. You can use top, bottom, left, right and auto to express the main direction of popup, plus an auxiliary flag start and end to express the alignment of the popper. For example, top-start means popup at the top, aligned to the start direction (left);</p><p>Without auxiliary alignment flags, it defaults to center alignment</p><p>The following demo sets flip: false to illustrate the position where the popper is displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="block-popover">\n    <!--top-x-->\n    <div class="item"></div>\n    <div class="item">\n      <h-popover trigger="hover" placement="top-start" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">上左</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            top-start\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item">\n      <h-popover trigger="hover" placement="top" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">上</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            top\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item">\n      <h-popover trigger="hover" placement="top-end" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">上右</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            top-end\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item"></div>\n    <!--x-start-->\n    <div class="item">\n      <h-popover trigger="hover" placement="left-start" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">左上</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            left-start\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item"></div>\n    <div class="item"></div>\n    <div class="item"></div>\n    <div class="item">\n      <h-popover trigger="hover" placement="right-start" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">右上</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            right-start\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <!--left / right-->\n    <div class="item">\n      <h-popover trigger="hover" placement="left" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">左</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            left\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item"></div>\n    <div class="item"></div>\n    <div class="item"></div>\n    <div class="item">\n      <h-popover trigger="hover" placement="right" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">右</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            right\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <!--x-end-->\n    <div class="item">\n      <h-popover trigger="hover" placement="left-end" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">左下</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            left-end\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item"></div>\n    <div class="item"></div>\n    <div class="item"></div>\n    <div class="item">\n      <h-popover trigger="hover" placement="right-end" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">右下</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            right end\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <!--bottom-x-->\n    <div class="item"></div>\n    <div class="item">\n      <h-popover\n        trigger="hover"\n        placement="bottom-start"\n        :flip="false"\n        popper-class="position_popper"\n      >\n        <template #reference>\n          <h-button :plain="true" class="btn">下左</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            bottom-start\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item">\n      <h-popover trigger="hover" placement="bottom" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">下</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            bottom\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item">\n      <h-popover trigger="hover" placement="bottom-end" :flip="false" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">下右</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            bottom-end\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item"></div>\n    <!-- auto -->\n    <div class="item"></div>\n    <div class="item">\n      <h-popover trigger="hover" placement="auto-start" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">自适应 起始</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            auto-start\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item">\n        <h-popover trigger="hover" placement="auto" popper-class="position_popper">\n          <template #reference>\n            <h-button :plain="true" class="btn">自适应</h-button>\n          </template>\n          <template #popper>\n            <h-pop-content>\n              auto\n            </h-pop-content>\n          </template>\n        </h-popover>\n    </div>\n    <div class="item">\n      <h-popover trigger="hover" placement="auto-end" popper-class="position_popper">\n        <template #reference>\n          <h-button :plain="true" class="btn">自适应 尾部</h-button>\n        </template>\n        <template #popper>\n          <h-pop-content>\n            auto-end\n          </h-pop-content>\n        </template>\n      </h-popover>\n    </div>\n    <div class="item"></div>\n  </div>\n</template>\n\n<script setup lang="ts">\n<\/script>\n\n<style>\n.block-popover {\n  width: 430px;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  grid-template-rows: repeat(6, 1fr);\n  grid-gap: 20px;\n}\n\n.block-popover .item {\n  width: 80px;\n}\n\n.block-popover .item button {\n  width: 100%;\n}\n</style>\n',
    path: "demos/components/Popover/position.vue"
  }, null, _parent));
  _push(`<h2 id="popcontent-component" tabindex="-1">PopContent Component <a class="header-anchor" href="#popcontent-component" aria-label="Permalink to &quot;PopContent Component&quot;">​</a></h2><p>The preset styles of the Popper part of Popover are attached to the PopContent component. If you need to completely customize the styles of the Popper part, you can not use the PopContent component</p><p>When completely customizing the styles of the Popper part, you need to pay attention to the styles of the small triangle. You can use CSS variables to set the color and size of the small triangle</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-popover class="mr-4" popper-class="content_popper">\n    <template #reference>\n      <h-button :plain="true">使用PopContent组件包裹内容</h-button>\n    </template>\n    <template #popper>\n      <h-pop-content>\n        <div class="popper">\n          <div class="header">内容标题</div>\n          <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>\n        </div>\n      </h-pop-content>\n    </template>\n  </h-popover>\n  <h-popover popper-class="content_popper">\n    <template #reference>\n      <h-button :plain="true">不使用PopContent组件包裹内容</h-button>\n    </template>\n    <template #popper>\n      <div class="nocontent-wrap popper">\n        <div class="header">内容标题</div>\n        <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>\n      </div>\n    </template>\n  </h-popover>\n</template>\n\n<style>\n.content_popper .popper {\n  width: 280px;\n}\n\n.content_popper .header {\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 22px;\n  margin-bottom: 4px;\n}\n\n.content_popper .content {\n  font-size: 14px;\n  line-height: 22px;\n}\n\n.content_popper .nocontent-wrap {\n  background-color: #555;\n  color: #fff;\n}\n</style>\n',
    path: "demos/components/Popover/pop-content.vue"
  }, null, _parent));
  _push(`<h2 id="popperclass-and-popperstyle" tabindex="-1">popperClass and popperStyle <a class="header-anchor" href="#popperclass-and-popperstyle" aria-label="Permalink to &quot;popperClass and popperStyle&quot;">​</a></h2><p>You can use popperClass to mount the class of the popper part, but pay attention to CSS selectors; you can also use popperStyle to mount some styles</p><p>The popper itself does not have a z-index attribute, it is entirely calculated by the fixed position, so if used in scenarios similar to dialog, you can set the toBody attribute to false to make the popper an element inside the dialog, and it will not be affected by the z-index of the dialog. You can also use z-index styles for processing</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    使用popperClass挂载样式，但是custom-style选择器写在test-wrap下面，所以没生效
  </div>
  <div class="test-wrap mb-4">
    <h-popover popper-class="custom-style">
      <template #reference>
        <h-button :plain="true">使用popperClass挂载样式</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
  </div>
  <div class="mb-4">使用popperClass挂载样式，custom-style2选择器直接写在顶层，可以生效</div>
  <div class="test-wrap mb-4">
    <h-popover class="mr-4" popper-class="custom-style2">
      <template #reference>
        <h-button :plain="true">使用popperClass挂载样式</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
  </div>
  <div class="mb-4">在Dialog中使用popover，设置toBody来处理z-index的问题</div>
  <h-button :plain="true" class="mb-4" @click="dialogShow1 = true">在Dialog中使用popover</h-button>
  <h-dialog
    v-model="dialogShow1"
    title="标题"
    @primaryClick="dialogShow1 = false"
    @secondaryClick="dialogShow1 = false"
  >
    <h-popover class="mr-4">
      <template #reference>
        <h-button :plain="true">不设置toBody</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :to-body="false">
      <template #reference>
        <h-button :plain="true">设置toBody为false</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
  </h-dialog>
  <div class="mb-4">在Dialog中使用popover，直接设置z-index</div>
  <h-button :plain="true" class="mb-4" @click="dialogShow2 = true">在Dialog中使用popover</h-button>
  <h-dialog
    v-model="dialogShow2"
    title="标题"
    @primaryClick="dialogShow2 = false"
    @secondaryClick="dialogShow2 = false"
  >
    <h-popover class="mr-4">
      <template #reference>
        <h-button :plain="true">不设置z-index</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" popper-class="custom-style3">
      <template #reference>
        <h-button :plain="true">设置z-index，注意样式如果写在scoped中可能不生效</h-button>
      </template>
      <template #popper>
        <h-pop-content>
          <div class="popper">
            <div class="header">内容标题</div>
            <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
          </div>
        </h-pop-content>
      </template>
    </h-popover>
  </h-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      dialogShow1: false,
      dialogShow2: false,
    };
  },
});
<\/script>

<style scoped>
.test-wrap .custom-style .popper {
  width: 280px;
}

.test-wrap .custom-style .header {
  color: red;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.test-wrap .custom-style .content {
  font-size: 14px;
  line-height: 22px;
}

.test-wrap .custom-style .nocontent-wrap {
  background-color: #555;
  color: #fff;
}

.custom-style2 .popper {
  width: 280px;
}

.custom-style2 .header {
  color: red;
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.custom-style2 .content {
  font-size: 14px;
  line-height: 22px;
}

.custom-style2 .nocontent-wrap {
  background-color: #555;
  color: #fff;
}
</style>

<style>
.custom-style3 {
  z-index: 1100;
}
</style>
`,
    path: "demos/components/Popover/popper-class.vue"
  }, null, _parent));
  _push(`<h2 id="delay" tabindex="-1">Delay <a class="header-anchor" href="#delay" aria-label="Permalink to &quot;Delay&quot;">​</a></h2><p>You can set the value of hoverHideDelay to adjust the delay time for the popper to hide after the mouse leaves the reference. This value will affect whether the popper will hide during the process of moving the mouse from the reference to the popper, so try not to set it too short</p><p>You can set the value of hoverShowDelay to adjust the delay time for the popper to appear after the mouse enters the reference</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    <h-popover class="mr-4" :hover-hide-delay="100" popper-class="delay_popper">
      <template #reference>
        <h-button :plain="true">hoverHideDelay: 100</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :hover-hide-delay="0" popper-class="delay_popper">
      <template #reference>
        <h-button :plain="true">hoverHideDelay: 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :hover-hide-delay="500" popper-class="delay_popper">
      <template #reference>
        <h-button :plain="true">hoverHideDelay: 500</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <div class="mb-4">
    <h-popover class="mr-4" :hover-show-delay="0" popper-class="delay_popper">
      <template #reference>
        <h-button :plain="true">hoverShowDelay: 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :hover-show-delay="100" popper-class="delay_popper">
      <template #reference>
        <h-button :plain="true">hoverShowDelay: 100</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :hover-show-delay="500" popper-class="delay_popper">
      <template #reference>
        <h-button :plain="true">hoverShowDelay: 500</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import { HPopContent } from '@aurora/horizon-web';

const DemoContent = defineComponent({
  render: () =>
    h(
      HPopContent,
      {},
      {
        default: () =>
          h(
            'div',
            {
              class: 'popper',
            },
            [
              h(
                'div',
                {
                  class: 'header',
                },
                ['内容标题'],
              ),
              h(
                'div',
                {
                  class: 'content',
                },
                ['我是气泡卡片文本描述内容, 我是气泡卡片文字链接...'],
              ),
            ],
          ),
      },
    ),
});

export default defineComponent({
  components: {
    DemoContent,
  },
});
<\/script>

<style>
.delay_popper .popper {
  width: 280px;
}

.delay_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.delay_popper .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
`,
    path: "demos/components/Popover/delay.vue"
  }, null, _parent));
  _push(`<h2 id="offset" tabindex="-1">Offset <a class="header-anchor" href="#offset" aria-label="Permalink to &quot;Offset&quot;">​</a></h2><p>You can use distance and skidding to fine-tune the popup position of the popper</p><p>distance represents the offset of the popper in the main direction. A positive value means the popper is away from the reference, and a negative value means the popper is close to the reference;</p><p>reference skidding represents the offset of the popper in the auxiliary direction. A positive value means the popper is offset in the end direction, and a negative value means the popper is offset in the start direction;</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    调整popper和reference的远近，小三角会影响 distance 的效果，这里的 demo 不使用小三角以方便展示
    distance 的效果
  </div>
  <div class="mb-4">
    <h-popover class="mr-4" :arrow="false" :distance="0" popper-class="offset_popover">
      <template #reference>
        <h-button :plain="true">distance 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :arrow="false" :distance="10" popper-class="offset_popover">
      <template #reference>
        <h-button :plain="true">distance 10</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :arrow="false" :distance="-10" popper-class="offset_popover">
      <template #reference>
        <h-button :plain="true">distance -10</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <!--  -->
  <div class="mb-4">调整popper在辅助方向上的偏移</div>
  <div class="mb-4">
    <h-popover class="mr-4" :skidding="0" placement="top" popper-class="offset_popover">
      <template #reference>
        <h-button>placement top: skidding 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="30" placement="top" popper-class="offset_popover">
      <template #reference>
        <h-button>placement top: skidding 30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="-30" placement="top" popper-class="offset_popover">
      <template #reference>
        <h-button>placement top: skidding -30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <div class="mb-4">
    <h-popover class="mr-4" :skidding="0" placement="left" popper-class="offset_popover">
      <template #reference>
        <h-button>placement left: skidding 0</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="30" placement="left" popper-class="offset_popover">
      <template #reference>
        <h-button>placement left: skidding 30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
    <h-popover class="mr-4" :skidding="-30" placement="left" popper-class="offset_popover">
      <template #reference>
        <h-button>placement left: skidding -30</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import { HPopContent } from '@aurora/horizon-web';

const DemoContent = defineComponent({
  render: () =>
    h(
      HPopContent,
      {},
      {
        default: () =>
          h(
            'div',
            {
              class: 'popper',
            },
            [
              h(
                'div',
                {
                  class: 'header',
                },
                ['内容标题'],
              ),
              h(
                'div',
                {
                  class: 'content',
                },
                ['我是气泡卡片文本描述内容, 我是气泡卡片文字链接...'],
              ),
            ],
          ),
      },
    ),
});

export default defineComponent({
  components: {
    DemoContent,
  },
});
<\/script>

<style>
.offset_popper .popper {
  width: 280px;
}

.offset_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.offset_popper .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
`,
    path: "demos/components/Popover/offset.vue"
  }, null, _parent));
  _push(`<h2 id="flip" tabindex="-1">Flip <a class="header-anchor" href="#flip" aria-label="Permalink to &quot;Flip&quot;">​</a></h2><p>When the space at the display position is insufficient, you can allow the popper to be displayed at the opposite position by setting the flip attribute. It is enabled by default. When all directions cannot be satisfied, you can prevent the popover from being cut off through <code>preventOverflow</code></p><p>You can adjust the flip position by setting fallbackPlacements. For example, if the top and bottom positions are not enough to display and you want to display on the left, you can set fallbackPlacements to [&#39;top&#39;, &#39;bottom&#39;, &#39;left&#39;]</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    <h-popover class="mr-4" popper-class="flip_popover" trigger="click" placement="top">
      <template #reference>
        <h-button :plain="true">flip top bottom</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <!--  -->
  <div class="mb-4">
    <h-popover
      class="mr-4"
      trigger="click"
      popper-class="flip_popover"
      :fallback-placements="['top', 'bottom', 'left', 'right']"
    >
      <template #reference>
        <h-button :plain="true">fallbackPlacements left right</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
  <div class="mb-4">
    <h-popover
      class="mr-4"
      trigger="click"
      popper-class="flip_popover"
      prevent-overflow
    >
      <template #reference>
        <h-button :plain="true">preventOverflow enabled</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import { HPopContent } from '@aurora/horizon-web';

const DemoContent = defineComponent({
  render: () =>
    h(
      HPopContent,
      {},
      {
        default: () =>
          h(
            'div',
            {
              class: 'popper',
            },
            [
              h(
                'div',
                {
                  class: 'header',
                },
                ['内容标题'],
              ),
              h(
                'div',
                {
                  class: 'content',
                },
                ['我是气泡卡片文本描述内容, 我是气泡卡片文字链接...'],
              ),
            ],
          ),
      },
    ),
});

export default defineComponent({
  components: {
    DemoContent,
  },
});
<\/script>

<style>
.flip_popover .popper {
  width: 280px;
}

.flip_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.flip_popover .content {
  font-size: 14px;
  line-height: 22px;
  height: 400px;
}
</style>
`,
    path: "demos/components/Popover/flip.vue"
  }, null, _parent));
  _push(`<h2 id="complex-situations-and-nesting" tabindex="-1">Complex Situations and Nesting <a class="header-anchor" href="#complex-situations-and-nesting" aria-label="Permalink to &quot;Complex Situations and Nesting&quot;">​</a></h2><p>If there are multiple layers of popover nesting, or components implemented with popover inside the popover popup layer, you should pay attention to the inner popover or component. If rendered on the body, it will scroll with the body. It is best to set to-body=false</p><p>In the following example, because the select&#39;s option responds to the mousedown event, and the option that pops up immediately disappears after mousedown is completed, the mouseup event will be triggered on the document, causing the outer popover to think that the user clicked an area outside the popover and hide the popup layer. Similar situations can set the hide-event-type event of the popover</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <div class="mb-8">
      <h-popover trigger="click-remain">
        <template #reference>
          <h-button type="secondary" class="mr-4">
            click-remain 模式，点击 popper 里面的内容，浮层会消失
          </h-button>
        </template>
        <template #popper>
          <h-pop-content>
            <h-select clearable :collapse="true" :to-body="false" v-model="categoryCode">
              <h-option v-for="el in list" :key="el" :label="el" :value="el"></h-option>
            </h-select>
          </h-pop-content>
        </template>
      </h-popover>
    </div>

    <div>
      <h-popover trigger="click-remain" hide-event-type="mousedown">
        <template #reference>
          <h-button type="secondary" class="mr-4">
            设置了hide-event-type="mousedown"，浮层会保留
          </h-button>
        </template>
        <template #popper>
          <h-pop-content>
            <h-select clearable :collapse="true" :to-body="false" v-model="categoryCode">
              <h-option v-for="el in list" :key="el" :label="el" :value="el"></h-option>
            </h-select>
          </h-pop-content>
        </template>
      </h-popover>
    </div>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  components: {},
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6],
      categoryCode: '',
    };
  },
});
<\/script>

<style>
</style>
`,
    path: "demos/components/Popover/complex.vue"
  }, null, _parent));
  _push(`<h2 id="arrow" tabindex="-1">Arrow <a class="header-anchor" href="#arrow" aria-label="Permalink to &quot;Arrow&quot;">​</a></h2><p>Do not use small triangle</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <h-popover :arrow="false" popper-class="arrow_popover">\n    <template #reference>\n      <h-button :plain="true">no arrow</h-button>\n    </template>\n    <template #popper>\n      <h-pop-content>\n        <div class="popper">\n          <div class="header">内容标题</div>\n          <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>\n        </div>\n      </h-pop-content>\n    </template>\n  </h-popover>\n</template>\n\n<style lang="scss">\n.arrow_popover .popper {\n  width: 280px;\n}\n\n.arrow_popover .header {\n  font-weight: 700;\n  font-size: 14px;\n  line-height: 22px;\n  margin-bottom: 4px;\n}\n\n.arrow_popover .content {\n  font-size: 14px;\n  line-height: 22px;\n}\n</style>\n',
    path: "demos/components/Popover/arrow.vue"
  }, null, _parent));
  _push(`<h2 id="disabled-state" tabindex="-1">Disabled State <a class="header-anchor" href="#disabled-state" aria-label="Permalink to &quot;Disabled State&quot;">​</a></h2><p>You can set <code>disabled</code> to control whether it is disabled</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb-4">
    <h-form>
      <h-form-item label="Visible">
        <h-radio-group v-model="visible" :disabled="disabled">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="Disabled">
        <h-radio-group v-model="disabled">
          <h-radio :label="true">True</h-radio>
          <h-radio :label="false">False</h-radio>
        </h-radio-group>
      </h-form-item>
    </h-form>
    <h-popover
      trigger="manual"
      popper-class="disabled_popper"
      placement="bottom"
      :visible="visible"
      :disabled="disabled"
      class="mr-4"
      @hide="onHide"
    >
      <template #reference>
        <h-button :plain="true">click is no use</h-button>
      </template>
      <template #popper>
        <h-pop-content>Content</h-pop-content>
      </template>
    </h-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const disabled = ref(false);

    return {
      visible,
      disabled,
      onHide() {
        visible.value = false;
      },
    };
  },
});
<\/script>

<style>
.disabled_popper .popper {
  width: 280px;
}

.disabled_popper .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.disabled_popper .content {
  font-size: 14px;
  line-height: 22px;
}
</style>
`,
    path: "demos/components/Popover/disabled.vue"
  }, null, _parent));
  _push(`<h2 id="mask" tabindex="-1">Mask <a class="header-anchor" href="#mask" aria-label="Permalink to &quot;Mask&quot;">​</a></h2><p>You can set <code>showWithMask</code> to set whether to display a mask when the popper is displayed</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="mb16">
    <h-popover
      class="mr16"
      popper-class="mask_popover"
      trigger="click"
      placement="top"
      :show-with-mask="maskOption"
    >
      <template #reference>
        <h-button :plain="true">show with mask</h-button>
      </template>
      <template #popper>
        <demo-content></demo-content>
      </template>
    </h-popover>
  </div>
</template>

<script>
import { defineComponent, h } from 'vue';
import { HPopContent } from '@aurora/horizon-web';

const DemoContent = defineComponent({
  render: () =>
    h(
      HPopContent,
      {},
      {
        default: () =>
          h(
            'div',
            {
              class: 'popper',
            },
            [
              h(
                'div',
                {
                  class: 'header',
                },
                ['内容标题'],
              ),
              h(
                'div',
                {
                  class: 'content',
                },
                ['我是气泡卡片文本描述内容, 我是气泡卡片文字链接...'],
              ),
            ],
          ),
      },
    ),
});

export default defineComponent({
  components: {
    DemoContent,
  },
  data() {
    return {
      maskOption: {
        enable: true,
        // class: 'mask-opacity',
        // to: document.querySelector('#app')
      },
    };
  },
});
<\/script>

<style>
.mask_popover .popper {
  width: 280px;
}

.mask_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.mask_popover .content {
  font-size: 14px;
  line-height: 22px;
}

.mask-opacity {
  opacity: 0;
}
</style>
`,
    path: "demos/components/Popover/mask.vue"
  }, null, _parent));
  _push(`<h2 id="custom-close-configuration" tabindex="-1">Custom Close Configuration <a class="header-anchor" href="#custom-close-configuration" aria-label="Permalink to &quot;Custom Close Configuration&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-space direction="vertical" block>
    <h-space>
      <div>hide event type</div>
      <h-radio v-model="hideEventType" label="click">click</h-radio>
      <h-radio v-model="hideEventType" label="mousedown">mousedown</h-radio>
      <h-radio v-model="hideEventType" label="mouseup">mouseup</h-radio>
    </h-space>
    <h-space>
      <h-popover
        trigger="click"
        :hide-event-type="hideEventType"
        popper-class="arrow_popover"
        @show="onShow"
        @onHide="onHide"
      >
        <template #reference>
          <h-button :plain="true">点击打开Popover，通过全局 {{ hideEventType }} 事件关闭</h-button>
        </template>
        <template #popper>
          <h-pop-content>
            <div class="popper">
              <div class="header">内容标题</div>
              <div class="content">我是气泡卡片文本描述内容, 我是气泡卡片文字链接...</div>
            </div>
          </h-pop-content>
        </template>
      </h-popover>
    </h-space>
    <h-space>
      <div class="block-card c1" @click.stop>
        <h-space block direction="vertical" size="4">
          <div>阻止 click 事件的冒泡</div>
          <strong v-if="show && hideEventType === 'click'">点击不能关闭</strong>
        </h-space>
      </div>
      <div class="block-card c2" @mousedown.stop>
        <h-space block direction="vertical" size="4">
          <div>阻止 mousedown 事件的冒泡</div>
          <strong v-if="show && hideEventType === 'mousedown'">点击不能关闭</strong>
        </h-space>
      </div>
      <div class="block-card c3" @mouseup.stop>
        <h-space block direction="vertical" size="4">
          <div>阻止 mouseup 事件的冒泡</div>
          <strong v-if="show && hideEventType === 'mouseup'">点击不能关闭</strong>
        </h-space>
      </div>
    </h-space>
  </h-space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const hideEventType = ref('click');
const show = ref(false);

const onShow = () => {
  show.value = true;
};

const onHide = () => {
  show.value = false;
};
<\/script>

<style lang="scss">
.arrow_popover .popper {
  width: 280px;
}

.arrow_popover .header {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.arrow_popover .content {
  font-size: 14px;
  line-height: 22px;
}

.block-card {
  width: 220px;
  height: 120px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.c1 {
  background-color: #e14cc4;
}

.c2 {
  background-color: #5ab453;
}

.c3 {
  background-color: #63aaee;
}
</style>
`,
    path: "demos/components/Popover/close-trigger.vue"
  }, null, _parent));
  _push(`<h2>Popover Api</h2><h3>Popover Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">trigger</td><td>触发方式</td><td><code>&#39;hover&#39; | &#39;click&#39; | &#39;click-hide&#39; | &#39;click-remain&#39; | &#39;focus&#39; | &#39;manual&#39;</code></td><td class="text-center">No</td><td>&#39;hover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>popper</code> 是否可见，<code>trigger</code> 为 &#39;manual&#39; 时生效</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>弹出位置</td><td><code>| &#39;auto&#39;<br>      | &#39;auto-start&#39;<br>      | &#39;auto-end&#39;<br>      | &#39;top-start&#39;<br>      | &#39;top-end&#39;<br>      | &#39;bottom-start&#39;<br>      | &#39;bottom-end&#39;<br>      | &#39;right-start&#39;<br>      | &#39;right-end&#39;<br>      | &#39;left-start&#39;<br>      | &#39;left-end&#39;<br>      | &#39;top&#39;<br>      | &#39;bottom&#39;<br>      | &#39;right&#39;<br>      | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;top&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">skidding</td><td><code>popper</code> 在辅助方向上的的偏移，正值表示 <code>popper</code> 向 <code>end</code> 方向偏移 ，负值表示 <code>popper</code> 向 <code>start</code> 方向偏移</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">distance</td><td><code>popper</code> 在主方向上的偏移，正值表示 <code>popper</code> 远离 <code>reference</code>，负值表示 <code>popper</code> 靠近 <code>reference</code></td><td><code>number</code></td><td class="text-center">No</td><td>8</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">flip</td><td>当原本的显示位置空间不够时，是否允许 <code>popper</code> 显示到对面的位置</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow</td><td>是否带小箭头</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">arrow-options</td><td>小箭头的参数</td><td><code>object</code></td><td class="text-center">No</td><td>() =&gt; {<br>      return { size: 8 };<br>    }</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-class</td><td><code>popper</code> 部分 的 <code>class</code></td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-style</td><td><code>popper</code> 部分 的 <code>style</code></td><td><code>Partial&lt;CSSProperties&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">destroy-on-hide</td><td>是否在 <code>popper</code> 隐藏后销毁 <code>popper</code> 的内容</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否将 <code>popper</code> 渲染到 <code>body</code> 上</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to</td><td><code>popper</code> 的渲染目标，参考 Teleport 的 to 取值</td><td><code>TeleportProps[&#39;to&#39;]</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize-observe</td><td>是否监听 <code>reference</code> 和 <code>popper</code> 的大小以更新位置</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference-overflow-observe</td><td>是否监听 <code>reference</code> 的溢出</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference-overflow-root</td><td>监听 <code>reference</code> 溢出的root节点</td><td><code>HTMLElement</code></td><td class="text-center">No</td><td>() =&gt; document.body</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">same-width</td><td>是否保持 <code>popper</code> 和 <code>reference</code> 宽度相等</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">set-min-width</td><td>在开启 <code>sameWidth</code> 时，是否使用 <code>minWidth</code> 去设置 <code>popper</code></td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">same-height</td><td>是否保持 <code>popper</code> 和 <code>reference</code> 高度相等</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-show-delay</td><td>鼠标进入 <code>reference</code> 后，<code>popper</code> 延迟出现的时长</td><td><code>number</code></td><td class="text-center">No</td><td>0</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hover-hide-delay</td><td>鼠标离开 <code>reference</code> 后，<code>popper</code> 延迟隐藏的时长，会影响鼠标从 <code>reference</code> 移动到 <code>popper</code> 的过程中 <code>popper</code> 是否会隐藏</td><td><code>number</code></td><td class="text-center">No</td><td>100</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">reference-class</td><td>附加给 <code>popover-reference</code> 的 <code>class</code></td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fallback-placements</td><td>与 <code>flip</code> 配合使用，如果对面与当前位置都不够，还希望能调整到其他位置时，可以设置该Name</td><td><code>Array&lt;<br>        | &#39;auto&#39;<br>        | &#39;auto-start&#39;<br>        | &#39;auto-end&#39;<br>        | &#39;top-start&#39;<br>        | &#39;top-end&#39;<br>        | &#39;bottom-start&#39;<br>        | &#39;bottom-end&#39;<br>        | &#39;right-start&#39;<br>        | &#39;right-end&#39;<br>        | &#39;left-start&#39;<br>        | &#39;left-end&#39;<br>        | &#39;top&#39;<br>        | &#39;bottom&#39;<br>        | &#39;right&#39;<br>        | &#39;left&#39;<br>      &gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">z-index</td><td>层级，会被 <code>popperStyle</code> 的 <code>z-index</code> 覆盖</td><td><code>number</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide-event-type</td><td>自定义隐藏事件</td><td><code>&#39;click&#39; | &#39;mousedown&#39; | &#39;mouseup&#39;</code></td><td class="text-center">No</td><td>&#39;click&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">transition-name</td><td>渐变动画名称</td><td><code>TransitionProps[&#39;name&#39;] | &#39;none&#39;</code></td><td class="text-center">No</td><td>&#39;fade-in&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">transition-speed</td><td>渐变动画速度</td><td><code>TransitionProps[&#39;speed&#39;]</code></td><td class="text-center">No</td><td>&#39;slow&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-with-mask</td><td>popper显示时是否带mask</td><td><code>{<br>  enable?: boolean;<br>  style?: Partial&lt;CSSProperties&gt;;<br>  class?: string;<br>  to?: string | RendererElement;<br>}</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">stop-propagation</td><td>是否在 trigger 为 <code>click</code> <code>click-remain</code> <code>click-hide</code> 时拦截冒泡</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>主题</td><td><code>&#39;light&#39; | &#39;dark&#39;</code></td><td class="text-center">No</td><td>&#39;light&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevent-overflow</td><td>是否阻止 <code>popper</code> 超出边界，即 <code>popper.js</code> 检查副轴遮挡<br>通常情况下，不会检查副轴的遮挡<br>但对于空间较小的情况下，需要设置为 true，防止被屏幕裁剪</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">main-axis-check</td><td>检查主轴遮挡<br>对于 top/bottom，检查 x轴是否有遮挡<br>对于 left/right，检查 y轴是否有遮挡</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">strategy</td><td>定位方式</td><td><code>&#39;fixed&#39; | &#39;absolute&#39;</code></td><td class="text-center">No</td><td>&#39;fixed&#39;</td></tr></tbody></table><h3>Popover Emits</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">show</td><td rowspan="1">popper 显示</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">hide</td><td rowspan="1">popper 隐藏</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">enter-reference</td><td rowspan="1">进入触发器回调</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">leave-reference</td><td rowspan="1">离开触发器回调</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击时触发</td><td rowspan="1">( evt: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">evt</td><td><code>MouseEvent</code></td><td>鼠标事件</td></tr></tbody></table><h3>Popover Exposes</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">switchVisible</td><td rowspan="1">切换显隐</td><td rowspan="1">( visible: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">visible</td><td><code>boolean</code></td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">referenceDom</td><td rowspan="1">触发器的 dom 节点</td><td rowspan="1"><code>HTMLSpanElement</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">popoverDom</td><td rowspan="1">弹出层的 dom 节点</td><td rowspan="1"><code>HTMLDivElement</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>PopContent Api</h2><h3>PopContent Props</h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>主题</td><td><code>&#39;light&#39; | &#39;dark&#39;</code></td><td class="text-center">No</td><td>&#39;light&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Popover.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Popover = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Popover as default
};
