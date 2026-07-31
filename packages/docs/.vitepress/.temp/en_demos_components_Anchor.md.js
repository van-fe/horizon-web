import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Anchor.md","filePath":"en/demos/components/Anchor.md"}');
const _sfc_main = { name: "en/demos/components/Anchor.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Anchor</h1><p class="description">Through the <code>size</code> attribute, you can set the size of the component, supporting <code>&#39;medium&#39; | &#39;small&#39;</code>.</p><h2 id="set-size" tabindex="-1">Set Size <a class="header-anchor" href="#set-size" aria-label="Permalink to &quot;Set Size&quot;">​</a></h2><p>Through the <code>size</code> attribute, you can set the size of the component, supporting <code>&#39;medium&#39; | &#39;small&#39;</code>.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
const scrollContainer = top?.document.querySelector('main.VPDoc');
<\/script>

<template>
  <div class="wrapper">
    <h-anchor :scroll-container="scrollContainer" link-target="_top">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
    <h-anchor :scroll-container="scrollContainer" size="small" link-target="_top">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
`,
    path: "demos/components/Anchor/demo1.vue"
  }, null, _parent));
  _push(`<h2 id="whether-to-change-hash" tabindex="-1">Whether to Change Hash <a class="header-anchor" href="#whether-to-change-hash" aria-label="Permalink to &quot;Whether to Change Hash&quot;">​</a></h2><p>Through the <code>changeHash</code> attribute, you can set: clicking the anchor point without changing the hash value of the current URL, that is, preventing the browser from generating corresponding history records.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
const scrollContainer = top?.document.querySelector('main.VPDoc');
<\/script>

<template>
  <div class="wrapper">
    <h-anchor :scroll-container="scrollContainer" :change-hash="false" link-target="_top">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
`,
    path: "demos/components/Anchor/demo2.vue"
  }, null, _parent));
  _push(`<h2 id="custom-scroll-container" tabindex="-1">Custom Scroll Container <a class="header-anchor" href="#custom-scroll-container" aria-label="Permalink to &quot;Custom Scroll Container&quot;">​</a></h2><p>Through the <code>scrollContainer</code> attribute, you can set: the scroll container. If a nested child scroll container in the page is specified and the container does not have fixed positioning set, it needs to be used with <code>:changeHash=&quot;false&quot;</code>.</p><p>Through the <code>showTitleSuffix</code> attribute, you can set: whether to display a numeric suffix at the end of the first-level navigation&#39;s &quot;title&quot; (indicating the total number of second-level navigations below it).</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="wrapper">\n    <div class="anchor-wrap">\n      <h-anchor scroll-container="#specialOne" :change-hash="false" :show-title-suffix="true">\n        <h-anchor-link href="#sectionOne1" title="sectionOne1" />\n        <h-anchor-link href="#sectionOne2" title="sectionOne2 section section section">\n          <h-anchor-link href="#sectionOne3" title="sectionOne3" />\n          <h-anchor-link href="#sectionOne4" title="sectionOne4" />\n          <h-anchor-link href="#sectionOne5" title="sectionOne5" />\n          <h-anchor-link href="#sectionOne6" title="多行文本溢出多行文本溢出多行文本溢出" />\n        </h-anchor-link>\n        <h-anchor-link href="#sectionOne7" title="sectionOne7" />\n      </h-anchor>\n    </div>\n    <div id="specialOne" class="article-wrap">\n      <section>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum ssam\n          necessimet exercitationem nisi impedit mollitia temporibus. Voluptatum\n          nam voluptate nescn saepe mollitia dicta. Amet suscipit nemo\n          nulla delectus adipisci cum veritatis, rem similique quis auptatibus\n          vero incidunt tempora numquam velit animi provident sint deserunt\n          inventore repellat quia enim perspiciatis. Sit neque architecto omnis\n          itaque dolor, mte fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionOne1">sectionOne1</h4>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum\n          similique incidunt consequuntur dignissimos, possimus deleniti ex unde\n          natus eligendi nemo a. Quisquam! Perferendis, voluptatum explicabo?\n          Modi molestiae quam eaque consectetur sequi commodi porro neque vel et\n          iusto molestias blanditiis ipsam similique eveniet fuga repellendus\n          incidunt, eum a aliquam. Dolorum cum officiis voluptate. Animi,\n          asperiores laudantium doloremque quidem amet dolorem veniam obcaecati\n          enim quos! Voluptate explicabo eveniet qui perferendis quis. Libero\n          temporibus minima obcaecati nam, ea dicta explicabo reiciendis odio\n          iure vitae ea porro ducimus modi odio voluptas\n          aspernatur! Maxime soluta odio dolor ullam similique dolores explicabo\n          expedita rerum nam delectus tenetur et a eveniet asperiores corporis\n          repellendus libero excepturi harum quisquam facere, perferendis vitae\n          ipsam recusandae esse! Aliquam. Velit accusamus natus animi nobis\n          minus sint nam! Officia libero nihil harum, voluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionOne2">sectionOne2</h4>\n        <p>\n          voluptatibus ullam sapiente soluta aperiam ducimus, qui quasivoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n          explicabo, adipisci corrupti corporis alias consequuntur perferendis\n          et ex! Quia id tempora eum. Officiis consectetur tempore laboriosam\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionOne3">sectionOne3</h4>\n        <p>\n          veritatis. Non quisquam cum quidem corrupti alias quos adipisci\n          similique ullam quis vitae beatae fugit magnam sint, voluptates sunt\n          sit hic eligendi ipsa vero nesciunt? Natus officiis incidunt dolore\n        </p>\n        <h4 id="sectionOne4">sectionOne4</h4>\n        <p>\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionOne5">sectionOne5</h4>\n        <p>voluptatibus ullam sapievoluptatib culpa vuptatib culpa vuptatib culpa vitae impedit?nte soluta ap</p>\n        <h4 id="sectionOne6">sectionOne6</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n        <h4 id="sectionOne7">sectionOne7</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n      </section>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.wrapper {\n  display: flex;\n  justify-content: flex-start;\n}\n\n.wrapper .article-wrap {\n  order: 1;\n  height: 330px;\n  overflow: scroll;\n  hyphens: auto;\n  padding: 12px;\n  border: 1px solid #CED0D6;\n  border-radius: 4px;\n}\n\n.wrapper .anchor-wrap  {\n  flex: 0 0 140px;\n  order: 2;\n}\n</style>\n',
    path: "demos/components/Anchor/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="set-offset" tabindex="-1">Set Offset <a class="header-anchor" href="#set-offset" aria-label="Permalink to &quot;Set Offset&quot;">​</a></h2><p>Through the <code>scrollOffset</code> attribute, you can set: the scroll offset. That is, the distance from the anchor point to the top of the &quot;scroll container&quot; when the document scrolling ends.</p><p>Through the <code>boundsOffset</code> attribute, you can set: the offset of the anchor area boundary. That is, when the scroll content reaches the specified offset from the top of the &quot;scroll container&quot;, the &quot;currently highlighted Link&quot; change is triggered.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="wrapper">\n    <div class="anchor-wrap">\n      <h-anchor scroll-container="#specialTwo" :change-hash="false" scroll-offset="start" bounds-offset="center">\n        <h-anchor-link href="#sectionTwo1" title="sectionTwo1" />\n        <h-anchor-link href="#sectionTwo2" title="sectionTwo2">\n          <h-anchor-link href="#sectionTwo3" title="sectionTwo3" />\n          <h-anchor-link href="#sectionTwo4" title="sectionTwo4" />\n          <h-anchor-link href="#sectionTwo5" title="sectionTwo5" />\n          <h-anchor-link href="#sectionTwo6" title="多行文本 information 溢出 多行文本溢出多行文本溢出" />\n        </h-anchor-link>\n        <h-anchor-link href="#sectionTwo7" title="sectionTwo7" />\n      </h-anchor>\n    </div>\n    <div id="specialTwo" class="article-wrap">\n      <section>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum ssam\n          necessimet exercitationem nisi impedit mollitia temporibus. Voluptatum\n          nam voluptate nescn saepe mollitia dicta. Amet suscipit nemo\n          nulla delectus adipisci cum veritatis, rem similique quis auptatibus\n          vero incidunt tempora numquam velit animi provident sint deserunt\n          inventore repellat quia enim perspiciatis. Sit neque architecto omnis\n          itaque dolor, mte fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionTwo1">sectionTwo1</h4>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum\n          similique incidunt consequuntur dignissimos, possimus deleniti ex unde\n          natus eligendi nemo a. Quisquam! Perferendis, voluptatum explicabo?\n          Modi molestiae quam eaque consectetur sequi commodi porro neque vel et\n          iusto molestias blanditiis ipsam similique eveniet fuga repellendus\n          incidunt, eum a aliquam. Dolorum cum officiis voluptate. Animi,\n          asperiores laudantium doloremque quidem amet dolorem veniam obcaecati\n          enim quos! Voluptate explicabo eveniet qui perferendis quis. Libero\n          temporibus minima obcaecati nam, ea dicta explicabo reiciendis odio\n          iure vitae ea porro ducimus modi odio voluptas\n          aspernatur! Maxime soluta odio dolor ullam similique dolores explicabo\n          expedita rerum nam delectus tenetur et a eveniet asperiores corporis\n          repellendus libero excepturi harum quisquam facere, perferendis vitae\n          ipsam recusandae esse! Aliquam. Velit accusamus natus animi nobis\n          minus sint nam! Officia libero nihil harum, voluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionTwo2">sectionTwo2</h4>\n        <p>\n          voluptatibus ullam sapiente soluta aperiam ducimus, qui quasivoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n          explicabo, adipisci corrupti corporis alias consequuntur perferendis\n          et ex! Quia id tempora eum. Officiis consectetur tempore laboriosam\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionTwo3">sectionTwo3</h4>\n        <p>\n          veritatis. Non quisquam cum quidem corrupti alias quos adipisci\n          similique ullam quis vitae beatae fugit magnam sint, voluptates sunt\n          sit hic eligendi ipsa vero nesciunt? Natus officiis incidunt dolore\n        </p>\n        <h4 id="sectionTwo4">sectionTwo4</h4>\n        <p>\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionTwo5">sectionTwo5</h4>\n        <p>voluptatibus ullam sapievoluptatib culpa vuptatib culpa vuptatib culpa vitae impedit?nte soluta ap</p>\n        <h4 id="sectionTwo6">sectionTwo6</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n        <h4 id="sectionTwo7">sectionTwo7</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n      </section>\n    </div>\n  </div>\n</template>\n\n<script setup lang="ts">\n<\/script>\n<style scoped>\n.wrapper {\n  display: flex;\n  justify-content: flex-start;\n}\n\n.wrapper .article-wrap {\n  order: 1;\n  height: 330px;\n  overflow: scroll;\n  hyphens: auto;\n  padding: 12px;\n  border: 1px solid #CED0D6;\n  border-radius: 4px;\n}\n\n.wrapper .anchor-wrap  {\n  flex: 0 0 140px;\n  order: 2;\n}\n</style>\n',
    path: "demos/components/Anchor/demo4.vue"
  }, null, _parent));
  _push(`<h2 id="whether-to-enable-collapse-mode" tabindex="-1">Whether to Enable Collapse Mode <a class="header-anchor" href="#whether-to-enable-collapse-mode" aria-label="Permalink to &quot;Whether to Enable Collapse Mode&quot;">​</a></h2><p>Through the <code>useCollapse</code> attribute, you can set whether to enable &quot;collapse mode&quot;; through the <code>collapse</code> attribute, you can set the default &quot;collapse state&quot;; you can also listen to the component&#39;s <code>update:collapse</code> event to perform some additional operations.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
const scrollContainer = top?.document.querySelector('main.VPDoc');

const collapseUpdateHandle = (collapse: boolean) => {
  console.info('是否处于折叠状态: ', collapse);
};
<\/script>

<template>
  <div class="wrapper">
    <h-anchor :scroll-container="scrollContainer" link-target="_top" :use-collapse="true" @update:collapse="collapseUpdateHandle">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
    <div class="split"></div>
    <h-anchor :scroll-container="scrollContainer" link-target="_top" :use-collapse="true" :collapse-text="'展开全部内容'" @update:collapse="collapseUpdateHandle">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 30px;
}
.split {
  width: 60px;
}
</style>
`,
    path: "demos/components/Anchor/demo9.vue"
  }, null, _parent));
  _push(`<h2 id="whether-to-display-side-line" tabindex="-1">Whether to Display Side Line <a class="header-anchor" href="#whether-to-display-side-line" aria-label="Permalink to &quot;Whether to Display Side Line&quot;">​</a></h2><p>Through the <code>showLine</code> attribute, you can set: whether to display the side line.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<script setup lang="ts">
const scrollContainer = top?.document.querySelector('main.VPDoc');
<\/script>

<template>
  <div class="wrapper">
    <h-anchor :scroll-container="scrollContainer" :show-line="false" link-target="_top">
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
`,
    path: "demos/components/Anchor/demo5.vue"
  }, null, _parent));
  _push(`<h2 id="listen-to-custom-events" tabindex="-1">Listen to Custom Events <a class="header-anchor" href="#listen-to-custom-events" aria-label="Permalink to &quot;Listen to Custom Events&quot;">​</a></h2><p>You can listen to the component&#39;s <code>click</code> and <code>change</code> events to perform some additional operations.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <h-anchor
      :scroll-container="scrollContainer"
      link-target="_top"
      @click="clickHandle"
      @change="changeHandle"
    >
      <h-anchor-link href="#设置尺寸" title="设置尺寸" />
      <h-anchor-link href="#是否改变hash" title="是否改变hash" />
      <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
      <h-anchor-link href="#设置偏移量" title="设置偏移量" />
      <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
      <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
      <h-anchor-link href="#监听自定义事件" title="监听自定义事件" />
    </h-anchor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const clickHandle = (linkInfo: { href: string; title: string }, e: MouseEvent) => {
      console.info(linkInfo, e);
    };
    const changeHandle = (link: string, prevLink: string) => {
      console.info(link, prevLink);
    };

    const scrollContainer = top?.document.querySelector('main.VPDoc');

    return {
      scrollContainer,
      clickHandle,
      changeHandle,
    };
  },
});
<\/script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
`,
    path: "demos/components/Anchor/demo6.vue"
  }, null, _parent));
  _push(`<h2 id="additional-usage-scenarios" tabindex="-1">Additional Usage Scenarios <a class="header-anchor" href="#additional-usage-scenarios" aria-label="Permalink to &quot;Additional Usage Scenarios&quot;">​</a></h2><p>Dynamic changes: <code>size</code> | <code>maxHeight</code> | <code>showTitleSuffix</code> attributes in AnchorProps, <code>title</code> attribute in AnchorLinkProps.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <div class="control-box">
      <strong>设置 组件尺寸:</strong>
      <h-radio-group v-model="curSize">
        <h-radio v-for="item in sizeOptions" :key="item.value" :label="item.value" size="small">{{item.label}}</h-radio>
      </h-radio-group>
      <br/>
      <strong>设置 容器的最大高度(px):</strong>
      <h-input-number v-model="curMaxHeight" :precision="0" :step="50" />
      <br/><br/>
      <strong>设置 是否显示一级导航的数字后缀:</strong>
      <br/>
      <h-switch v-model="showTitleSuffix" status status-on-text="是" status-off-text="否" />
      <br/><br/>
      <strong>修改 倒数第二个导航title:</strong>
      <h-input v-model="lastSecondTitle" />
      <br/><br/>
      <strong>修改 倒数第一个导航title:</strong>
      <h-input v-model="lastFirstTitle" />
    </div>
    <div class="content-box">
      <h-anchor :scroll-container="scrollContainer" :size="curSize" :show-title-suffix="showTitleSuffix" :max-height="curMaxHeight" link-target="_top">
        <h-anchor-link href="#设置尺寸" title="设置尺寸"  />
        <h-anchor-link href="#是否改变hash" title="是否改变hash" />
        <h-anchor-link href="#自定义滚动容器" title="自定义滚动容器" />
        <h-anchor-link href="#设置偏移量" title="设置偏移量" />
        <h-anchor-link href="#是否开启折叠模式" title="是否开启折叠模式" />
        <h-anchor-link href="#是否展示侧边线" title="是否展示侧边线" />
        <h-anchor-link href="#监听自定义事件" :title="lastSecondTitle" />
        <h-anchor-link href="#额外的使用场景" :title="lastFirstTitle">
          <h-anchor-link href="#sectionOne3" title="sectionOne3" />
          <h-anchor-link href="#sectionOne4" title="sectionOne4" />
          <h-anchor-link href="#sectionOne5" title="sectionOne5" />
          <h-anchor-link href="#sectionOne6" title="多行文本溢出多行文本溢出多行文本溢出" />
        </h-anchor-link>
      </h-anchor>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const scrollContainer = top?.document.querySelector('main.VPDoc');
const curSize = ref<'medium' | 'small'>('medium');
const sizeOptions = ref([
  { label: 'medium', value: 'medium' },
  { label: 'small', value: 'small' },
]);
const curMaxHeight = ref(260);
const showTitleSuffix = ref(false);
const lastFirstTitle = ref('倒数第一个导航title');
const lastSecondTitle = ref('倒数第二个导航title');
<\/script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 300px;
  margin: 10px;
}

.wrapper::after {
  content: '';
  display: block;
  clear: both;
}

.wrapper .control-box {
  float: left;
  width: 50%;
}

.wrapper .content-box {
  float: left;
  margin-left: 30px;
}
</style>
`,
    path: "demos/components/Anchor/demo7.vue"
  }, null, _parent));
  _push(`<h2 id="auto-render" tabindex="-1">Auto Render <a class="header-anchor" href="#auto-render" aria-label="Permalink to &quot;Auto Render&quot;">​</a></h2><p>Through the <code>autoRender</code> attribute, you can enable &quot;auto render&quot; mode: after enabling, it will automatically traverse the elements inside the <code>scrollContainer</code> container and generate elevator navigation. The generation rules are detailed in the <code>autoRenderRules</code> attribute.</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="wrapper">
    <div class="anchor-wrap">
      <h-anchor class="anchor-wrap" scroll-container="#specialThree" :change-hash="false" :show-title-suffix="true" :auto-render="true" :auto-render-rules="['h4', 'h5', 'h6']" />
    </div>
    <div id="specialThree" class="article-wrap">
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          temporibus impedit alias atque praesentium deserunt minima illum ssam
          necessimet exercitatiThreem nisi impedit mollitia temporibus. Voluptatum
          nam voluptate nescn saepe mollitia dicta. Amet suscipit nemo
          nulla delectus adipisci cum veritatis, rem similique quis auptatibus
          vero incidunt tempora numquam velit animi provident sint deserunt
          inventore repellat quia enim perspiciatis. Sit neque architecto omnis
          itaque dolor, mte fugiat facere et quis ea, culpa similique quia
          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis
          repellat magnam animi ad distinctio culpa vitae impedit?
        </p>
        <h6>sectionThree1</h6>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          temporibus impedit alias atque praesentium deserunt minima illum
          similique incidunt consequuntur dignissimos, possimus deleniti ex unde
          natus eligendi nemo a. Quisquam! Perferendis, voluptatum explicabo?
          Modi molestiae quam eaque consectetur sequi commodi porro neque vel et
          iusto molestias blanditiis ipsam similique eveniet fuga repellendus
          incidunt, eum a aliquam. Dolorum cum officiis voluptate. Animi,
          asperiores laudantium doloremque quidem amet dolorem veniam obcaecati
          enim quos! Voluptate explicabo eveniet qui perferendis quis. Libero
          temporibus minima obcaecati nam, ea dicta explicabo reiciendis odio
          iure vitae ea porro ducimus modi odio voluptas
          aspernatur! Maxime soluta odio dolor ullam similique dolores explicabo
          expedita rerum nam delectus tenetur et a eveniet asperiores corporis
          repellendus libero excepturi harum quisquam facere, perferendis vitae
          ipsam recusandae esse! Aliquam. Velit accusamus natus animi nobis
          minus sint nam! Officia libero nihil harum, voluptatibus vitae atque
          quos quam magnam aliquam, illum et debitis repellendus voluptas rem
          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,
          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis
          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus
          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos
          voluptates sapiente fugiat facere et quis ea, culpa similique quia
          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis
          repellat magnam animi ad distinctio culpa vitae impedit?
        </p>
        <h4>sectionThree2</h4>
        <p>
          voluptatibus ullam sapiente soluta aperiam ducimus, qui quasivoluptatibus vitae atque
          quos quam magnam aliquam, illum et debitis repellendus voluptas rem
          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,
          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis
          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus
          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos
          voluptates sapiente fugiat facere et quis ea, culpa similique quia
          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis
          repellat magnam animi ad distinctio culpa vitae impedit?
          explicabo, adipisci corrupti corporis alias consequuntur perferendis
          et ex! Quia id tempora eum. Officiis consectetur tempore laboriosam
          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem
        </p>
        <h5>sectionThree3</h5>
        <p>
          veritatis. Non quisquam cum quidem corrupti alias quos adipisci
          similique ullam quis vitae beatae fugit magnam sint, voluptates sunt
          sit hic eligendi ipsa vero nesciunt? Natus officiis incidunt dolore
        </p>
        <h6>sectionThree4</h6>
        <p>
          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem
        </p>
        <h4>sectionThree5</h4>
        <p>voluptatibus ullam sapievoluptatib culpa vuptatib culpa vuptatib culpa vitae impedit?nte soluta ap</p>
        <h4>sectionThree6</h4>
        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque
          quos quam magnam aliquam, illum et debitis repellendus voluptas rem
          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,
          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis
          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus
          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos
          voluptates sapiente fugiat facere et quis ea, culpa similique quia
          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis
          repellat magnam animi ad distinctio culpa vitae impedit?a</p>
        <h4>sectionThree7</h4>
        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque
          quos quam magnam aliquam, illum et debitis repellendus voluptas rem
          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,
          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis
          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus
          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos
          voluptates sapiente fugiat facere et quis ea, culpa similique quia
          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis
          repellat magnam animi ad distinctio culpa vitae impedit?a</p>
        <h6>sectionThree8</h6>
        <p>
          veritatis. Non quisquam cum quidem corrupti alias quos adipisci
          similique ullam quis vitae beatae fugit magnam sint, voluptates sunt
          sit hic eligendi ipsa vero nesciunt? Natus officiis incidunt dolore
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
<\/script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: flex-start;
  .article-wrap {
    order: 1;
    height: 330px;
    overflow: scroll;
    hyphens: auto;
    padding: 12px;
    border: 1px solid #CED0D6;
    border-radius: 4px;
  }
  .anchor-wrap  {
    order: 2;
    flex: 0 0 140px;
  }
}
</style>
`,
    path: "demos/components/Anchor/demo8.vue"
  }, null, _parent));
  _push(`<h2 id="anchor-api" class="no-underline h2"><a href="#anchor-api" class="!no-underline">Anchor Api</a></h2><h3 id="anchor-props" class="no-underline h3"><a href="#anchor-props" class="!no-underline">Anchor Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>Configuration for size.</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>Configuration for max height.</td><td><code>number</code></td><td class="text-center">No</td><td>750</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">change-hash</td><td>Configuration for change hash.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-container</td><td>Configuration for scroll container.</td><td><code>string | HTMLElement | Window</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-behavior</td><td>Configuration for scroll behavior.</td><td><code>&#39;smooth&#39; | &#39;auto&#39;</code></td><td class="text-center">No</td><td>&#39;smooth&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-offset</td><td>Configuration for scroll offset.</td><td><code>&#39;start&#39; | &#39;center&#39; | &#39;end&#39; | number</code></td><td class="text-center">No</td><td>&#39;start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bounds-offset</td><td>Configuration for bounds offset.</td><td><code>&#39;start&#39; | &#39;center&#39; | &#39;end&#39; | number</code></td><td class="text-center">No</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-collapse</td><td>Configuration for use collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td>Configuration for collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-text</td><td>Configuration for collapse text.</td><td><code>string | VNode</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-line</td><td>Configuration for show line.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-highlight-line</td><td>Configuration for show highlight line.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-title-suffix</td><td>Configuration for show title suffix.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Configuration for placement.</td><td><code>&#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;right&#39; | &#39;left&#39;</code></td><td class="text-center">No</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">style</td><td>Configuration for style.</td><td><code>CSSProperties</code></td><td class="text-center">No</td><td>() =&gt; ({})</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-render</td><td>Configuration for auto render.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-render-rules</td><td>Configuration for auto render rules.</td><td><code>(string | string[])[]</code></td><td class="text-center">No</td><td>() =&gt; [&#39;h1&#39;, &#39;h2&#39;, &#39;h3&#39;, &#39;h4&#39;, &#39;h5&#39;, &#39;h6&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link-target</td><td>Configuration for link target.</td><td><code>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">No</td><td></td></tr></tbody></table><h3 id="anchor-emits" class="no-underline h3"><a href="#anchor-emits" class="!no-underline">Anchor Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="2">Emitted when click changes.</td><td rowspan="2">( linkInfo: <code>{ href: string; title: string }</code>, e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">linkInfo</td><td><code>{ href: string; title: string }</code></td><td>The link info value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>The e value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">Emitted when change changes.</td><td rowspan="2">( link: <code>string</code>, prevLink: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link</td><td><code>string</code></td><td>The link value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevLink</td><td><code>string</code></td><td>The prev link value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:collapse</td><td rowspan="1">Emitted when update:collapse changes.</td><td rowspan="1">( collapse: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td><code>boolean</code></td><td>The collapse value.</td></tr></tbody></table><h3 id="anchor-exposes" class="no-underline h3"><a href="#anchor-exposes" class="!no-underline">Anchor Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updateActiveLink</td><td rowspan="2">Controls update active link.</td><td rowspan="2">( link: <code>string</code>, needScroll: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link</td><td><code>string</code></td><td>The link value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">needScroll</td><td><code>boolean</code></td><td>The need scroll value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">refreshAnchorList</td><td rowspan="1">Controls refresh anchor list.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updateScrollContainer</td><td rowspan="1">Controls update scroll container.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getAnchorList</td><td rowspan="1">Controls get anchor list.</td><td rowspan="1">( ) =&gt; <code>AnchorListItem[]</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>AnchorListItem</code></td><td>AnchorListItem 锚点节点列表</td></tr></tbody></table><h2 id="anchorlink-api" class="no-underline h2"><a href="#anchorlink-api" class="!no-underline">AnchorLink Api</a></h2><h3 id="anchorlink-props" class="no-underline h3"><a href="#anchorlink-props" class="!no-underline">AnchorLink Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>Configuration for title.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">href</td><td>Configuration for href.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>Configuration for target.</td><td><code>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">No</td><td>&#39;_self&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Anchor.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Anchor = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Anchor as default
};
