import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Timeline.md","filePath":"zh/demos/components/Timeline.md"}');
const _sfc_main = { name: "demos/components/Timeline.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Timeline</h1><p class="description">垂直展示的时间流信息，例如对任务跟踪、操作历史的回顾</p><h2 id="何时使用" tabindex="-1">何时使用 <a class="header-anchor" href="#何时使用" aria-label="Permalink to &quot;何时使用&quot;">​</a></h2><ul><li>当有一系列信息需按时间排列时，可正序和倒序；</li><li>需要有一条时间轴进行视觉上的串联时。</li></ul><h2 id="基本样式" tabindex="-1">基本样式 <a class="header-anchor" href="#基本样式" aria-label="Permalink to &quot;基本样式&quot;">​</a></h2><p>时间轴包含节点、时间线、节点名称、时间日期、描述等基本信息，此外可附加Icon、描述、操作记录、评论等；</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div class="container">
    <div class="container__block">
      <div class="container__title">small大小</div>
      <h-timeline>
        <h-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
          size="small"
        />
      </h-timeline>
    </div>
    <div class="container__block">
      <div class="container__title">默认大小(medium)</div>
      <h-timeline>
        <h-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
        />
      </h-timeline>
    </div>
    <div class="container__block">
      <div class="container__title">large大小</div>
      <h-timeline>
        <h-timeline-item
          v-for="(item, index) in timelineData"
          :key="index"
          :name="item.name"
          :tail="item.tail"
          :timestamp="item.time"
          size="large"
        />
      </h-timeline>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const timelineData = ref([
      {
        name: 'milestone 2022-03-01',
        time: '03/01/2022',
      },
      {
        name: 'milestone 2022-03-02',
        time: '03/02/2022',
      },
      {
        name: 'milestone 2022-02-02',
        time: '02/02/2022',
      },
      {
        name: 'milestone 2022-02-01',
        time: '02/01/2022',
        tail: false,
      },
    ]);
    return {
      timelineData,
    };
  },
});
<\/script>

<style scoped>
.container {
  display: flex;
}

.container__title {
  margin-bottom: 20px;
}

.container__block {
  margin-right: 50px;
}
</style>
`,
    path: "demos/components/Timeline/basic.vue"
  }, null, _parent));
  _push(`<h2 id="可附加属性" tabindex="-1">可附加属性 <a class="header-anchor" href="#可附加属性" aria-label="Permalink to &quot;可附加属性&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <div>
    <div class="container">
      <div class="container__block">
        <div class="container__title">
          添加描述信息
          <div>可根据节点内容，自定义节点文本内容；</div>
        </div>
        <!-- 手动设置style="width: 270px"是为了desc换行 -->
        <h-timeline :first="{ color: 'var(--h-bg-brand-default)' }" style="width: 270px">
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            desc="Demo installed its 700th battery swap station in China, hitting its annual target ahead of schedule."
          />
          <h-timeline-item name="The third milestone" timestamp="03/02/2021" />
          <h-timeline-item name="The second milestone" timestamp="03/02/2021" />
          <h-timeline-item name="The first milestone" timestamp="03/02/2021" :tail="false" />
        </h-timeline>
      </div>
      <div class="container__block">
        <div class="container__title">
          ⾃定义时间戳
          <div>
            时间有三种排列方式：置顶、置右、置下
            <br />
            可以将时间格式化
          </div>
        </div>
        <div class="container">
          <h-timeline>
            <h-timeline-item
              name="The third milestone"
              timestamp="03/02/2021 14:32"
              placement="top"
            />
            <h-timeline-item name="The second milestone" timestamp="03/02/2021 14:32" />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021 14:32"
              placement="right"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021 14:32"
              placement="right"
              format="mm/dd/yyyy h:i"
              :tail="false"
            />
          </h-timeline>
        </div>
      </div>
      <div class="container__block">
        <div class="container__title">
          自定义时间顺序
          <div>可以按照时间顺序/逆序展示</div>
        </div>
        <div class="container">
          <h-timeline sort="order" :first="{ color: 'var(--h-bg-brand-default)' }">
            <h-timeline-item
              name="Current milestone"
              timestamp="03/05/2021"
              placement="top"
              :tail="false"
            />
            <h-timeline-item name="The first milestone" timestamp="03/02/2021" placement="top" />
            <h-timeline-item name="The second milestone" timestamp="03/03/2021" placement="top" />
            <h-timeline-item name="The third milestone" timestamp="03/04/2021" placement="top" />
          </h-timeline>
          <h-timeline sort="reverse" :first="{ color: 'var(--h-bg-brand-default)' }">
            <h-timeline-item name="Current milestone" timestamp="03/05/2021" placement="top" />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021"
              placement="top"
              :tail="false"
            />
            <h-timeline-item name="The second milestone" timestamp="03/03/2021" placement="top" />
            <h-timeline-item name="The third milestone" timestamp="03/04/2021" placement="top" />
          </h-timeline>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="container__block">
        <div class="container__title">
          自定义节点样式
          <div>可根据实际业务情况，自定义节点内容，如错误、预警、成功签收等状态；</div>
        </div>
        <div class="container">
          <h-timeline>
            <h-timeline-item
              name="Current milestone"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-brand-default)"
            />
            <h-timeline-item
              name="An unknown error has occurred"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-error-default)"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-warning-default)"
            />
            <h-timeline-item
              name="The second milestone"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-success-default)"
            />
            <h-timeline-item
              name="The first milestone"
              timestamp="03/02/2021"
              placement="top"
              :tail="false"
            />
          </h-timeline>
          <h-timeline>
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-brand-default)"
              icon="email"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-error-default)"
              icon="close"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-warning-default)"
              icon="light_on"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="var(--h-bg-success-default)"
              icon="check"
              offset="8"
            />
            <h-timeline-item
              name="Current milestone"
              size="large"
              timestamp="03/02/2021"
              placement="top"
              color="#242629"
              icon="check"
              type="circle"
              offset="8"
              :tail="false"
            />
          </h-timeline>
        </div>
      </div>
      <div class="container__block">
        <div class="container__title">
          自定义节点内容
          <div>可根据实际业务情况，自定义节点内容，如内文、图片、回复等；</div>
        </div>
        <h-timeline class="timeline-slot">
          <h-timeline-item placement="top" timestamp="03/02/2021" color="var(--h-bg-brand-default)">
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag type="hollow" color="#242629" major size="small">Fellow</h-tag>
              </div>
            </template>
            <template #desc>
              <div>
                Demo installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
              <div style="display: flex">
                <h-image
                  src="/demo-assets/scene-aurora.svg"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
                <h-image
                  src="/demo-assets/scene-coast.svg"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
                <h-image
                  src="/demo-assets/scene-city.svg"
                  class="mr-1 mt-2"
                  :width="40"
                  :height="40"
                />
              </div>
            </template>
          </h-timeline-item>
          <h-timeline-item placement="top" timestamp="03/02/2021">
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag type="hollow" color="#242629" major size="small">Fellow</h-tag>
              </div>
            </template>
            <template #desc>
              <div>
                Demo installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
            </template>
          </h-timeline-item>
          <h-timeline-item
            placement="right"
            timestamp="03/02/2021"
            color="var(--h-bg-brand-default)"
            :tail="false"
          >
            <template #name>
              <div class="timeline-title-slot">
                <h-avatar size="mini" />
                <div class="timeline-title-slot__name">Wanqi peng</div>
                <h-tag type="hollow" color="#242629" major size="small">Fellow</h-tag>
                <div class="timeline-title-slot__action">Add follow-up note</div>
              </div>
            </template>
            <template #desc>
              <div>
                Demo installed its 700th battery swap station in China,
                <br />
                hitting its annual target ahead of schedule.
              </div>
            </template>
          </h-timeline-item>
        </h-timeline>
      </div>
      <div class="container__block">
        <div class="container__title">
          表达步骤感的混合时间轴
          <div>
            实线显示已发生的时间节点，虚线显示未发生的时间节点。一般已经发生的步骤再上，步骤过多，可折叠。
          </div>
        </div>
        <h-timeline>
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            icon="check"
            type="circle"
            desc="you can fold the dot"
            :fold-config="foldConfig"
          />
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            placement="top"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            icon="check"
            type="circle"
          />
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            placement="top"
            color="var(--h-bg-brand-default)"
            border-color="var(--h-bg-brand-default)"
            icon="check"
            type="circle"
          />
          <h-timeline-item
            name="Current milestone"
            size="large"
            timestamp="03/02/2021"
            placement="top"
            color="var(--h-bg-brand-default)"
            dashed
            offset="0"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            placement="top"
            dashed
            offset="0"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            placement="top"
            dashed
            offset="0"
          />
          <h-timeline-item
            name="Current milestone"
            timestamp="03/02/2021"
            placement="top"
            dashed
            offset="0"
          />
        </h-timeline>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const timelineData = ref([
      {
        name: 'Current milestone',
        time: '03/02/2021',
      },
      {
        name: 'The third milestone',
        time: '03/02/2021',
      },
      {
        name: 'The second milestone',
        time: '03/02/2021',
      },
      {
        name: 'The first milestone',
        time: '03/02/2021',
      },
    ]);
    const foldConfig = ref({
      number: 2,
      content: 'Show hidden events （2）',
      dot: {
        type: 'circle',
        icon: 'arrow_down',
        color: '#242629',
        borderColor: '#E9EAEC',
      },
    });
    return {
      timelineData,
      foldConfig,
    };
  },
});
<\/script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.container__title {
  margin-bottom: 20px;
}

.container__block {
  margin-right: 50px;
}

.h-timeline {
  margin-right: 50px;
}

.timeline-title-slot {
  display: flex;
  align-items: center;
}

.timeline-title-slot__name {
  margin: 0 8px;
}

.timeline-title-slot__action {
  margin-left: 8px;
  font-weight: bold;
}

.timeline-title-slot .h-tag {
  font-weight: bold;
}
</style>

<style>
.timeline__name--bold .h-timeline-item__name--content {
  font-weight: bold;
}

.timeline__name--bold-big .h-timeline-item__name--content {
  font-weight: bold;
  font-size: 16px;
}

.timeline-slot .h-timeline-item__name {
  margin-bottom: 8px;
}

.timeline-slot .h-timeline-item__timestamp--top {
  margin-bottom: 12px;
}
</style>
`,
    path: "demos/components/Timeline/prop.vue"
  }, null, _parent));
  _push(`<h2 id="format-值的说明" tabindex="-1"><code>format</code> 值的说明 <a class="header-anchor" href="#format-值的说明" aria-label="Permalink to &quot;\`format\` 值的说明&quot;">​</a></h2><ol><li><code>format</code> 当前版本开始将作为 <code>dayjs</code> 的参数进行格式化</li><li>为兼容较前版本，将会做以下匹配替换并产生相应副作用，若开启TimeLine v2属性，则直接按照day.js格式化，不会进行下面的匹配替换</li></ol><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">/**</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * y+ -&gt; Y+</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * m+ -&gt; M+ ---- dayjs中m无用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * d -&gt; D</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * dd -&gt; DD</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * h+ -&gt; H+ ---- dayjs中h无用</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * i+ -&gt; m+</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * s -&gt; s</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * ss -&gt; ss</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * ms -&gt; SSS</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * t+ -&gt; A+ ---- dayjs中A会有更细分凌晨、上午、中午……</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * w -&gt; dddd</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}">  * q -&gt; Q ---- LocaleSupportLang.ZH_CN ? \`第\${Q}季度\` : \`Q\${Q}\`</span></span>
<span class="line"><span style="${ssrRenderStyle({ "--shiki-light": "#6A737D", "--shiki-dark": "#6A737D" })}"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ol start="3"><li>更多可用格式，请查看 <a href="https://day.js.org/docs/zh-CN/display/format" target="_blank" rel="noreferrer">Day.js Format 文档</a></li></ol><h2 id="timeline-api" class="no-underline h2"><a href="#timeline-api" class="!no-underline">Timeline Api</a></h2><h3 id="timeline-props" class="no-underline h3"><a href="#timeline-props" class="!no-underline">Timeline Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">sort</td><td>指定节点排序方向</td><td><code>&#39;order&#39; | &#39;reverse&#39;</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">first</td><td>第一个节点属性</td><td><code>TimelineItemDotType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">last</td><td>最后一个节点属性</td><td><code>TimelineItemDotType</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">v2</td><td>是否使用day.js格式化方式</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h2 id="timelineitem-api" class="no-underline h2"><a href="#timelineitem-api" class="!no-underline">TimelineItem Api</a></h2><h3 id="timelineitem-props" class="no-underline h3"><a href="#timelineitem-props" class="!no-underline">TimelineItem Props</a></h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">timestamp</td><td>时间戳</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">format</td><td>时间戳格式</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">placement</td><td>时间戳位置</td><td><code>&#39;top&#39; | &#39;bottom&#39; | &#39;right&#39;</code></td><td class="text-center">否</td><td>&#39;bottom&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">offset</td><td>时间线偏移</td><td><code>string | number</code></td><td class="text-center">否</td><td>4</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">type</td><td>节点类型</td><td><code>&#39;disc&#39; | &#39;circle&#39;</code></td><td class="text-center">否</td><td>&#39;disc&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">color</td><td>节点颜色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">border-color</td><td>节点边框颜色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tail-color</td><td>线条颜色</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">size</td><td>节点尺寸</td><td><code>&#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>节点图标</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>名称</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">desc</td><td>描述</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">dashed</td><td>使用虚拟线</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">fold-config</td><td>折叠节点配置</td><td><code>FoldConfig</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tail</td><td>使用线条</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Timeline.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Timeline = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Timeline as default
};
