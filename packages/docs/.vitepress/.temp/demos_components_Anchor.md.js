import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Anchor.md","filePath":"zh/demos/components/Anchor.md"}');
const _sfc_main = { name: "demos/components/Anchor.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Anchor</h1><p class="description">电梯导航用来展示当前页面中，有哪些具体内容，并可以快速定位</p><h2 id="设置尺寸" tabindex="-1">设置尺寸 <a class="header-anchor" href="#设置尺寸" aria-label="Permalink to &quot;设置尺寸&quot;">​</a></h2><p>通过<code>size</code>属性可以设置：组件的尺寸，支持 <code>&#39;medium&#39; | &#39;small&#39;</code>。</p>`);
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
  _push(`<h2 id="是否改变hash" tabindex="-1">是否改变hash <a class="header-anchor" href="#是否改变hash" aria-label="Permalink to &quot;是否改变hash&quot;">​</a></h2><p>通过<code>changeHash</code>属性可以设置：点击锚点，而不改变当前URL的hash值，即让浏览器不产生对应的历史记录。</p>`);
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
  _push(`<h2 id="自定义滚动容器" tabindex="-1">自定义滚动容器 <a class="header-anchor" href="#自定义滚动容器" aria-label="Permalink to &quot;自定义滚动容器&quot;">​</a></h2><p>通过<code>scrollContainer</code>属性可以设置：滚动的容器。若指定了页面中嵌套的子滚动容器，并且该容器没有设置fixed定位，需配合<code>:changeHash=&quot;false&quot;</code>使用。</p><p>通过<code>showTitleSuffix</code>属性可以设置：一级导航的“title”末尾是否展示数字后缀（表示其下面的二级导航的总个数）。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="wrapper">\n    <div class="anchor-wrap">\n      <h-anchor scroll-container="#specialOne" :change-hash="false" :show-title-suffix="true">\n        <h-anchor-link href="#sectionOne1" title="sectionOne1" />\n        <h-anchor-link href="#sectionOne2" title="sectionOne2 section section section">\n          <h-anchor-link href="#sectionOne3" title="sectionOne3" />\n          <h-anchor-link href="#sectionOne4" title="sectionOne4" />\n          <h-anchor-link href="#sectionOne5" title="sectionOne5" />\n          <h-anchor-link href="#sectionOne6" title="多行文本溢出多行文本溢出多行文本溢出" />\n        </h-anchor-link>\n        <h-anchor-link href="#sectionOne7" title="sectionOne7" />\n      </h-anchor>\n    </div>\n    <div id="specialOne" class="article-wrap">\n      <section>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum ssam\n          necessimet exercitationem nisi impedit mollitia temporibus. Voluptatum\n          nam voluptate nescn saepe mollitia dicta. Amet suscipit nemo\n          nulla delectus adipisci cum veritatis, rem similique quis auptatibus\n          vero incidunt tempora numquam velit animi provident sint deserunt\n          inventore repellat quia enim perspiciatis. Sit neque architecto omnis\n          itaque dolor, mte fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionOne1">sectionOne1</h4>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum\n          similique incidunt consequuntur dignissimos, possimus deleniti ex unde\n          natus eligendi nemo a. Quisquam! Perferendis, voluptatum explicabo?\n          Modi molestiae quam eaque consectetur sequi commodi porro neque vel et\n          iusto molestias blanditiis ipsam similique eveniet fuga repellendus\n          incidunt, eum a aliquam. Dolorum cum officiis voluptate. Animi,\n          asperiores laudantium doloremque quidem amet dolorem veniam obcaecati\n          enim quos! Voluptate explicabo eveniet qui perferendis quis. Libero\n          temporibus minima obcaecati nam, ea dicta explicabo reiciendis odio\n          iure vitae ea porro ducimus modi odio voluptas\n          aspernatur! Maxime soluta odio dolor ullam similique dolores explicabo\n          expedita rerum nam delectus tenetur et a eveniet asperiores corporis\n          repellendus libero excepturi harum quisquam facere, perferendis vitae\n          ipsam recusandae esse! Aliquam. Velit accusamus natus animi nobis\n          minus sint nam! Officia libero nihil harum, voluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionOne2">sectionOne2</h4>\n        <p>\n          voluptatibus ullam sapiente soluta aperiam ducimus, qui quasivoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n          explicabo, adipisci corrupti corporis alias consequuntur perferendis\n          et ex! Quia id tempora eum. Officiis consectetur tempore laboriosam\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionOne3">sectionOne3</h4>\n        <p>\n          veritatis. Non quisquam cum quidem corrupti alias quos adipisci\n          similique ullam quis vitae beatae fugit magnam sint, voluptates sunt\n          sit hic eligendi ipsa vero nesciunt? Natus officiis incidunt dolore\n        </p>\n        <h4 id="sectionOne4">sectionOne4</h4>\n        <p>\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionOne5">sectionOne5</h4>\n        <p>voluptatibus ullam sapievoluptatib culpa vuptatib culpa vuptatib culpa vitae impedit?nte soluta ap</p>\n        <h4 id="sectionOne6">sectionOne6</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n        <h4 id="sectionOne7">sectionOne7</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n      </section>\n    </div>\n  </div>\n</template>\n\n<style scoped>\n.wrapper {\n  display: flex;\n  justify-content: flex-start;\n}\n\n.wrapper .article-wrap {\n  order: 1;\n  height: 330px;\n  overflow: scroll;\n  hyphens: auto;\n  padding: 12px;\n  border: 1px solid #CED0D6;\n  border-radius: 4px;\n}\n\n.wrapper .anchor-wrap  {\n  flex: 0 0 140px;\n  order: 2;\n}\n</style>\n',
    path: "demos/components/Anchor/demo3.vue"
  }, null, _parent));
  _push(`<h2 id="设置偏移量" tabindex="-1">设置偏移量 <a class="header-anchor" href="#设置偏移量" aria-label="Permalink to &quot;设置偏移量&quot;">​</a></h2><p>通过<code>scrollOffset</code>属性可以设置：滚动的偏移量。即文档滚动结束时，锚点距离“滚动容器”顶部的距离。</p><p>通过<code>boundsOffset</code>属性可以设置：锚点区域边界的偏移量。即滚动内容距离“滚动容器”顶部达到指定偏移量时触发“当前高亮的Link”改变。</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: '<template>\n  <div class="wrapper">\n    <div class="anchor-wrap">\n      <h-anchor scroll-container="#specialTwo" :change-hash="false" scroll-offset="start" bounds-offset="center">\n        <h-anchor-link href="#sectionTwo1" title="sectionTwo1" />\n        <h-anchor-link href="#sectionTwo2" title="sectionTwo2">\n          <h-anchor-link href="#sectionTwo3" title="sectionTwo3" />\n          <h-anchor-link href="#sectionTwo4" title="sectionTwo4" />\n          <h-anchor-link href="#sectionTwo5" title="sectionTwo5" />\n          <h-anchor-link href="#sectionTwo6" title="多行文本 information 溢出 多行文本溢出多行文本溢出" />\n        </h-anchor-link>\n        <h-anchor-link href="#sectionTwo7" title="sectionTwo7" />\n      </h-anchor>\n    </div>\n    <div id="specialTwo" class="article-wrap">\n      <section>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum ssam\n          necessimet exercitationem nisi impedit mollitia temporibus. Voluptatum\n          nam voluptate nescn saepe mollitia dicta. Amet suscipit nemo\n          nulla delectus adipisci cum veritatis, rem similique quis auptatibus\n          vero incidunt tempora numquam velit animi provident sint deserunt\n          inventore repellat quia enim perspiciatis. Sit neque architecto omnis\n          itaque dolor, mte fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionTwo1">sectionTwo1</h4>\n        <p>\n          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse\n          temporibus impedit alias atque praesentium deserunt minima illum\n          similique incidunt consequuntur dignissimos, possimus deleniti ex unde\n          natus eligendi nemo a. Quisquam! Perferendis, voluptatum explicabo?\n          Modi molestiae quam eaque consectetur sequi commodi porro neque vel et\n          iusto molestias blanditiis ipsam similique eveniet fuga repellendus\n          incidunt, eum a aliquam. Dolorum cum officiis voluptate. Animi,\n          asperiores laudantium doloremque quidem amet dolorem veniam obcaecati\n          enim quos! Voluptate explicabo eveniet qui perferendis quis. Libero\n          temporibus minima obcaecati nam, ea dicta explicabo reiciendis odio\n          iure vitae ea porro ducimus modi odio voluptas\n          aspernatur! Maxime soluta odio dolor ullam similique dolores explicabo\n          expedita rerum nam delectus tenetur et a eveniet asperiores corporis\n          repellendus libero excepturi harum quisquam facere, perferendis vitae\n          ipsam recusandae esse! Aliquam. Velit accusamus natus animi nobis\n          minus sint nam! Officia libero nihil harum, voluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n        </p>\n        <h4 id="sectionTwo2">sectionTwo2</h4>\n        <p>\n          voluptatibus ullam sapiente soluta aperiam ducimus, qui quasivoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?\n          explicabo, adipisci corrupti corporis alias consequuntur perferendis\n          et ex! Quia id tempora eum. Officiis consectetur tempore laboriosam\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionTwo3">sectionTwo3</h4>\n        <p>\n          veritatis. Non quisquam cum quidem corrupti alias quos adipisci\n          similique ullam quis vitae beatae fugit magnam sint, voluptates sunt\n          sit hic eligendi ipsa vero nesciunt? Natus officiis incidunt dolore\n        </p>\n        <h4 id="sectionTwo4">sectionTwo4</h4>\n        <p>\n          mollitia quisquam pariatur deleniti, quo obcaecati voluptatibus quidem\n        </p>\n        <h4 id="sectionTwo5">sectionTwo5</h4>\n        <p>voluptatibus ullam sapievoluptatib culpa vuptatib culpa vuptatib culpa vitae impedit?nte soluta ap</p>\n        <h4 id="sectionTwo6">sectionTwo6</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n        <h4 id="sectionTwo7">sectionTwo7</h4>\n        <p>voluptatibus ullam sapiente solutvoluptatibus vitae atque\n          quos quam magnam aliquam, illum et debitis repellendus voluptas rem\n          dignissimos ea quae maiores excepturi? Dicta, dignissimos. Quibusdam,\n          aliquam quas. Quasi rem cumque architecto vitae excepturi, officiis\n          culpa doloremque ab eius, voluptate quidem cum? Omnis ex voluptatibus\n          molestiae quis ea, dicta tempore fugiat quidem quas! Ipsam eos\n          voluptates sapiente fugiat facere et quis ea, culpa similique quia\n          vitae, soluta hic maiores nobis provident ab modi porro? Perspiciatis\n          repellat magnam animi ad distinctio culpa vitae impedit?a</p>\n      </section>\n    </div>\n  </div>\n</template>\n\n<script setup lang="ts">\n<\/script>\n<style scoped>\n.wrapper {\n  display: flex;\n  justify-content: flex-start;\n}\n\n.wrapper .article-wrap {\n  order: 1;\n  height: 330px;\n  overflow: scroll;\n  hyphens: auto;\n  padding: 12px;\n  border: 1px solid #CED0D6;\n  border-radius: 4px;\n}\n\n.wrapper .anchor-wrap  {\n  flex: 0 0 140px;\n  order: 2;\n}\n</style>\n',
    path: "demos/components/Anchor/demo4.vue"
  }, null, _parent));
  _push(`<h2 id="是否开启折叠模式" tabindex="-1">是否开启折叠模式 <a class="header-anchor" href="#是否开启折叠模式" aria-label="Permalink to &quot;是否开启折叠模式&quot;">​</a></h2><p>通过<code>useCollapse</code>属性可以设置是否开启“折叠模式”；通过<code>collapse</code>属性可以设置默认的“折叠状态”；也可以监听组件的<code>update:collapse</code>事件，从而做一些额外的操作。</p>`);
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
  _push(`<h2 id="是否展示侧边线" tabindex="-1">是否展示侧边线 <a class="header-anchor" href="#是否展示侧边线" aria-label="Permalink to &quot;是否展示侧边线&quot;">​</a></h2><p>通过<code>showLine</code>属性可以设置：是否展示侧边线。</p>`);
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
  _push(`<h2 id="监听自定义事件" tabindex="-1">监听自定义事件 <a class="header-anchor" href="#监听自定义事件" aria-label="Permalink to &quot;监听自定义事件&quot;">​</a></h2><p>可以监听组件的<code>click</code>和<code>change</code>事件，从而做一些额外的操作。</p>`);
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
  _push(`<h2 id="额外的使用场景" tabindex="-1">额外的使用场景 <a class="header-anchor" href="#额外的使用场景" aria-label="Permalink to &quot;额外的使用场景&quot;">​</a></h2><p>动态变化：AnchorProps中的 <code>size</code> | <code>maxHeight</code> | <code>showTitleSuffix</code> 属性、AnchorLinkProps中的 <code>title</code> 属性。</p>`);
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
  _push(`<h2 id="自动渲染" tabindex="-1">自动渲染 <a class="header-anchor" href="#自动渲染" aria-label="Permalink to &quot;自动渲染&quot;">​</a></h2><p>通过<code>autoRender</code>属性可以开启“自动渲染”模式：开启后，将会自动遍历<code>scrollContainer</code>容器内部的元素并生成电梯导航，生成规则详见<code>autoRenderRules</code>属性。</p>`);
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
  _push(`<h2>Anchor Api</h2><h3>Anchor Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>组件尺寸<br><br>medium：文字14px，导航整体宽度140px。距上24px，距左32px<br>small：文字12px，导航整体宽度120px。距上24px，距左32px</td><td><code>&#39;medium&#39; | &#39;small&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-height</td><td>导航容器的最大高度，超出时会显示滚动条（优先级较高，单位为“px”，不包含margin）</td><td><code>number</code></td><td class="text-center">否</td><td>750</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">change-hash</td><td>是否改变 <code>hash</code></td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-container</td><td>指定滚动容器</td><td><code>string | HTMLElement | Window</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-behavior</td><td>滚动行为的“平滑程度”（和 MDN文档 保持一致）</td><td><code>&#39;smooth&#39; | &#39;auto&#39;</code></td><td class="text-center">否</td><td>&#39;smooth&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">scroll-offset</td><td>滚动的偏移量。即文档滚动结束时，锚点距离“滚动容器”顶部的距离。<br>该值的类型为<code>number</code>时，单位固定为“px”，相对于“滚动容器”的顶部。（默认为：&#39;start&#39;，即 0 ）</td><td><code>&#39;start&#39; | &#39;center&#39; | &#39;end&#39; | number</code></td><td class="text-center">否</td><td>&#39;start&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">bounds-offset</td><td>锚点区域边界的偏移量。即滚动内容距离“滚动容器”顶部达到指定偏移量时触发“当前高亮的Link”改变。<br>该值的类型为<code>number</code>时，单位固定为“px”，相对于“滚动容器”的顶部。（默认为：5 ）</td><td><code>&#39;start&#39; | &#39;center&#39; | &#39;end&#39; | number</code></td><td class="text-center">否</td><td>5</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-collapse</td><td>是否开启折叠模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td>默认的折叠状态（仅在折叠模式下生效，默认处于非折叠状态）</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-text</td><td>收起时的提示文本<br>默认使用国际化</td><td><code>string | VNode</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-line</td><td>是否显示左侧边线</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-highlight-line</td><td>是否显示左侧边线上的“高亮”部分</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">show-title-suffix</td><td>一级导航的“title”末尾是否展示数字后缀（表示其下面的二级导航的总个数）</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>Tooltip的弹出方向（导航title溢出打点展示时，若处于hover状态则会弹出）</td><td><code>&#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39; | &#39;top&#39; | &#39;bottom&#39; | &#39;right&#39; | &#39;left&#39;</code></td><td class="text-center">否</td><td>&#39;left&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">style</td><td>导航容器的样式对象（Anchor组件的默认定位方式为<code>relative</code>，通过该属性可自定义它的定位方式）</td><td><code>CSSProperties</code></td><td class="text-center">否</td><td>() =&gt; ({})</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-render</td><td>是否开启“自动渲染”模式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">auto-render-rules</td><td>自动渲染规则（数组索引表示导航级别，默认支持6级，也支持无限叠加）<br>各级规则可以配置为字符串数组（该处的字符串实则为“CSS选择器”），例如: [[&#39;h1&#39;, &#39;h2&#39;], &#39;h3&#39;, &#39;h4&#39;, &#39;h5&#39;]</td><td><code>(string | string[])[]</code></td><td class="text-center">否</td><td>() =&gt; [&#39;h1&#39;, &#39;h2&#39;, &#39;h3&#39;, &#39;h4&#39;, &#39;h5&#39;, &#39;h6&#39;]</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link-target</td><td>可以覆盖 <code>n-anchor-link</code> 的 <code>target</code></td><td><code>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">否</td><td></td></tr></tbody></table><h3>Anchor Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="2">click事件</td><td rowspan="2">( linkInfo: <code>{ href: string; title: string }</code>, e: <code>MouseEvent</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">linkInfo</td><td><code>{ href: string; title: string }</code></td><td>被点击的锚点的相关信息（子属性<code>href</code>和<code>title</code>均为使用组件时传递的属性）</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">e</td><td><code>MouseEvent</code></td><td>原生的点击事件对象</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">change</td><td rowspan="2">change事件</td><td rowspan="2">( link: <code>string</code>, prevLink: <code>string</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link</td><td><code>string</code></td><td>改变之后的锚点href</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prevLink</td><td><code>string</code></td><td>改变之前的锚点href</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:collapse</td><td rowspan="1">collapse 改变后的通知</td><td rowspan="1">( collapse: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td><code>boolean</code></td><td>改变之后是否为“折叠”状态</td></tr></tbody></table><h3>Anchor Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updateActiveLink</td><td rowspan="2">更新当前活动的链接</td><td rowspan="2">( link: <code>string</code>, needScroll: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">link</td><td><code>string</code></td><td>当前锚点</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">needScroll</td><td><code>boolean</code></td><td>是否需要滚动到对应位置</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">refreshAnchorList</td><td rowspan="1">重新获取锚点节点（用于在“自动渲染”模式下重新获取锚点节点）</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">updateScrollContainer</td><td rowspan="1">重新获取 <code>props.scrollContainer</code> 所标记的对象<br>仅对于 <code>props.scrollContainer</code> 是字符串时需要使用，且如果 <code>anchor</code> 挂载早于 <code>props.scrollContainer</code> 时，则需要使用此方法重新获取</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">getAnchorList</td><td rowspan="1">获取锚点列表<br>在使用自动渲染时，可以使用这个方法获取锚点节点列表</td><td rowspan="1">( ) =&gt; <code>AnchorListItem[]</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">default</td><td><code>AnchorListItem</code></td><td>AnchorListItem 锚点节点列表</td></tr></tbody></table><h2>AnchorLink Api</h2><h3>AnchorLink Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">title</td><td>描述内容</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">href</td><td>锚点链接</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">target</td><td>该属性指定在何处显示链接的资源（和 MDN文档 保持一致）</td><td><code>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</code></td><td class="text-center">否</td><td>&#39;_self&#39;</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Anchor.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Anchor = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Anchor as default
};
