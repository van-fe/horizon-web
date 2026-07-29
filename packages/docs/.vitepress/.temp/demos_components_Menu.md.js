import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"demos/components/Menu.md","filePath":"zh/demos/components/Menu.md"}');
const _sfc_main = { name: "demos/components/Menu.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Menu</h1><p class="description">多用于信息层级多、对导航效率有一定要求的后台系统页面</p><h2 id="基础使用" tabindex="-1">基础使用 <a class="header-anchor" href="#基础使用" aria-label="Permalink to &quot;基础使用&quot;">​</a></h2>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-form label-position="left" label-vertical-align="middle" :inline="true">
        <h-form-item label="theme:">
          <h-radio-group v-model="theme">
            <h-radio label="default">default</h-radio>
            <h-radio label="gray">gray</h-radio>
            <h-radio label="midnight">midnight</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="action:">
          <h-button size="small" @click="expandAll">Expand All</h-button>
          <h-button size="small" @click="collapseAll">Collapse All</h-button>
        </h-form-item>
      </h-form>
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="24">
      <h-container>
        <h-aside width="auto">
          <h-menu
            ref="menuRef"
            v-model:collapse="collapse"
            :collapse-button="true"
            :selected-value="selectedValue"
            :exclusive-expand="false"
            height="500px"
            :theme="theme"
            @selected="onSelected"
            @collapse-changed="onCollapseChanged"
            @open="onOpen"
            @close="onClose"
          >
            <template #prepend="isCollapse">
              <div class="logo">
                <div class="img">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 32 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h-transition name="collapse-horizontal">
                  <div v-show="!isCollapse.value" class="text">Aurora</div>
                </h-transition>
              </div>
            </template>
            <h-menu-item value="1" icon="matestore_filled">
              <template #title>一级菜单 1</template>
            </h-menu-item>
            <h-sub-menu value="2" icon="matestore_filled">
              <template #title>一级菜单 2</template>
              <h-menu-item value="2-1" name="二级菜单 1" />
              <h-menu-item value="2-2" name="二级菜单 2" />
            </h-sub-menu>
            <h-sub-menu value="3" icon="matestore_filled">
              <template #title>一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容</template>
              <h-sub-menu value="3-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="3-1-1" :disabled="true">三级菜单 1</h-menu-item>
                <h-menu-item value="3-1-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-1-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-1-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-2">
                <template #title>二级菜单 2</template>
                <h-menu-item value="3-2-1">三级菜单 1</h-menu-item>
                <h-menu-item value="3-2-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-2-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-2-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-3">
                <template #title>二级菜单 3</template>
                <h-menu-item value="3-3-1">三级菜单 1</h-menu-item>
                <h-sub-menu value="3-3-2">
                  <template #title>三级菜单 2</template>
                  <h-menu-item value="3-3-2-1">四级菜单 1</h-menu-item>
                  <h-sub-menu value="3-3-2-2">
                    <template #title>四级菜单 2</template>
                    <h-menu-item value="3-3-2-2-1">五级菜单 1</h-menu-item>
                    <h-menu-item value="3-3-2-2-2">五级菜单 2</h-menu-item>
                    <h-menu-item value="3-3-2-2-3">五级菜单 3</h-menu-item>
                  </h-sub-menu>
                </h-sub-menu>
              </h-sub-menu>
            </h-sub-menu>
            <h-menu-item value="4">
              <template #icon>
                <a-icon size="20" name="matestore_filled" />
              </template>
              <template #title>一级菜单 4</template>
            </h-menu-item>
            <h-sub-menu value="5" icon="matestore_filled" :disabled="true">
              <template #title>一级菜单 5</template>
              <h-sub-menu value="5-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="5-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="5-1-2">三级菜单 2</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
            <h-sub-menu value="6" :selectable="true">
              <template #icon>
                <a-icon name="matestore_filled" size="20"></a-icon>
              </template>
              <template #title>一级菜单 6</template>
              <h-sub-menu value="6-1" :selectable="true">
                <template #title>二级菜单 1</template>
                <h-menu-item value="6-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="6-1-2">三级菜单 2</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
          </h-menu>
        </h-aside>
        <h-main style="background: var(--h-bg-info-weak-hover)"></h-main>
      </h-container>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { AIcon } from '@aurora/icon';
import { HMenu, useMenuProps, useSubMenuProps } from '@aurora/horizon-web';

const menuRef = ref<typeof HMenu | null>(null);
const collapse = ref(false);
const theme = ref<ExtractPropTypes<typeof useMenuProps>['theme']>('default');
const selectedValue = ref('3-1-1');
const onSelected = (value: string, values: string[], current) => {
  selectedValue.value = value;
  console.info('selected', value, values, current);
};

const onCollapseChanged = (status: boolean) => {
  collapse.value = status;
  console.info(\`菜单目前的折叠状态为：\${status}\`);
};

const expandAll = () => {
  menuRef.value?.expandAll();
};

const collapseAll = () => {
  menuRef.value?.collapseAll();
};

function onOpen(curr: string, paths: ExtractPropTypes<typeof useSubMenuProps>[]) {
  console.info('open:', curr, paths);
}

function onClose(curr: string, paths: ExtractPropTypes<typeof useSubMenuProps>[]) {
  console.info('close:', curr, paths);
}
<\/script>

<style scoped>
.logo {
  display: flex;
  grid-column-gap: 12px;
  align-items: center;
}

.logo .img {
  flex: 0 0 36px;
  display: flex;
  align-items: center;
}

.logo .text {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}
</style>
`,
    path: "demos/components/Menu/basic.vue"
  }, null, _parent));
  _push(`<h2 id="带标题的一级菜单" tabindex="-1">带标题的一级菜单 <a class="header-anchor" href="#带标题的一级菜单" aria-label="Permalink to &quot;带标题的一级菜单&quot;">​</a></h2><p>如果希望 icon 和 标题内容一起显示，需要设置 <code>collapse-forever = true</code></p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-form label-position="left" label-vertical-align="middle" :inline="true">
        <h-form-item label="theme:">
          <h-radio-group v-model="theme">
            <h-radio label="default">default</h-radio>
            <h-radio label="gray">gray</h-radio>
            <h-radio label="midnight">midnight</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="24">
      <h-container>
        <h-aside width="auto">
          <h-menu
            ref="menuRef"
            v-model:collapse="collapse"
            :collapse-button="true"
            :selected-value="selectedValue"
            :exclusive-expand="false"
            :collapse-forever="true"
            height="500px"
            :theme="theme"
            @selected="onSelected"
            @collapse-changed="onCollapseChanged"
          >
            <template #prepend="isCollapse">
              <div class="logo">
                <div class="img">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 32 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h-transition name="collapse-horizontal">
                  <div v-show="!isCollapse.value" class="text">Aurora</div>
                </h-transition>
              </div>
            </template>
            <h-sub-menu value="1" icon="material" disabled :selectable="true">
              <template #title>总览</template>
            </h-sub-menu>
            <h-sub-menu value="2" icon="settings_two" name="设置" :selectable="true" />
            <h-sub-menu value="3" icon="friend" :selectable="true">
              <template #title>伙伴</template>
            </h-sub-menu>
            <h-sub-menu value="5" icon="operation_mgmt" :selectable="true">
              <template #title>分析</template>
            </h-sub-menu>
            <h-sub-menu value="6" icon="tires" :selectable="true">
              <template #title>保养</template>
            </h-sub-menu>
          </h-menu>
        </h-aside>
        <h-main style="background: var(--h-bg-info-weak-hover)"></h-main>
      </h-container>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HMenu } from '@aurora/horizon-web';

const menuRef = ref<typeof HMenu | null>(null);
const collapse = ref(false);
const theme = ref('default');
const selectedValue = ref('1');
const onSelected = (value: string, values: string[]) => {
  selectedValue.value = value;
  console.info('selected', value, values);
};

const onCollapseChanged = (status: boolean) => {
  collapse.value = status;
  console.info(\`菜单目前的折叠状态为：\${status}\`);
};
<\/script>

<style scoped>
.logo {
  display: flex;
  grid-column-gap: 12px;
  align-items: center;
  justify-content: center;
}

.logo .img {
  flex: 0 0 36px;
  display: flex;
  align-items: center;
}

.logo .text {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}
</style>
`,
    path: "demos/components/Menu/shrink.vue"
  }, null, _parent));
  _push(`<h2 id="横向菜单" tabindex="-1">横向菜单 <a class="header-anchor" href="#横向菜单" aria-label="Permalink to &quot;横向菜单&quot;">​</a></h2><p>设置 mode 为 <code>horizontal</code> 即可开启横向菜单</p><p>当子菜单超过三级后，<code>submenu-expand-type = &#39;full&#39;</code> 时将不会继续渲染</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-form label-position="left" label-vertical-align="middle" label-justify-align="right" :inline="true">
        <h-form-item label="theme:">
          <h-radio-group v-model="theme">
            <h-radio label="default">default</h-radio>
            <h-radio label="gray">gray</h-radio>
            <h-radio label="midnight">midnight</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="activeType:">
          <h-radio-group v-model="activeType">
            <h-radio label="button">button</h-radio>
            <h-radio label="link">link</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="submenuExpandType:">
          <h-radio-group v-model="submenuExpandType">
            <h-radio label="single">single</h-radio>
            <h-radio label="full">full</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="24">
      <h-container>
        <h-header height="auto" style="padding: 0;">
          <h-menu
            ref="menuRef"
            mode="horizontal"
            :selected-value="selectedValue"
            :theme="theme"
            :active-type="activeType"
            :submenu-expand-type="submenuExpandType"
            max-width="1200px"
            @selected="onSelected"
          >
            <template #prepend>
              <div class="logo">
                <div class="img">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 32 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div class="text">Aurora</div>
              </div>
            </template>
            <template #append>
              <h-button v-tooltip="'提醒'" type="normal" :text="true">
                <template #icon>
                  <a-icon name="notice" size="20" :color="theme === 'midnight' ? 'var(--h-text-inverse)' : 'var(--h-text-primary)'"></a-icon>
                </template>
              </h-button>
              <h-popover class="avatar-popover" placement="bottom-end">
                <template #reference>
                  <h-avatar size="small" style="align-self: center;" />
                </template>
                <template #popper>
                  <h-pop-content>
                    <div class="text-body-2 text-center mb-3" style="color: var(--h-text-tertiary)">
                      Dear Demoer, Welcome
                    </div>
                    <h-button type="normal" size="large" text block class="mb-2">修改密码</h-button>
                    <h-button type="normal" size="large" text block>退出登录</h-button>
                  </h-pop-content>
                </template>
              </h-popover>
            </template>
            <h-menu-item value="1">
              <template #title>一级菜单 1</template>
            </h-menu-item>
            <h-sub-menu value="2">
              <template #title>一级菜单 2</template>
              <h-sub-menu value="2-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="2-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="2-1-2">三级菜单 2</h-menu-item>
                <h-menu-item value="2-1-3">三级菜单 3</h-menu-item>
                <h-menu-item value="2-1-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="2-2">
                <template #title>二级菜单 2</template>
                <h-menu-item value="2-2-1">三级菜单 1</h-menu-item>
                <h-menu-item value="2-2-2">三级菜单 2</h-menu-item>
                <h-menu-item value="2-2-3">三级菜单 3</h-menu-item>
                <h-menu-item value="2-2-4">三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
            <h-sub-menu value="3" :selectable="true">
              <template #title>一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容</template>
              <h-sub-menu value="3-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="3-1-1" disabled icon="calendar">三级菜单 1</h-menu-item>
                <h-menu-item value="3-1-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-1-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-1-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-2">
                <template #title>二级菜单 2</template>
                <h-menu-item value="3-2-1">三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1</h-menu-item>
                <h-menu-item value="3-2-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-2-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-2-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-3" :selectable="true">
                <template #title>二级菜单 3</template>
                <h-menu-item value="3-3-1">三级菜单 1</h-menu-item>
                <h-sub-menu value="3-3-2">
                  <template #title>三级菜单 2</template>
                  <h-menu-item value="3-3-2-1">四级菜单 1</h-menu-item>
                  <h-menu-item value="3-3-2-2">四级菜单 2</h-menu-item>
                </h-sub-menu>
              </h-sub-menu>
            </h-sub-menu>
            <h-menu-item value="4">
              <template #title>一级菜单 4</template>
            </h-menu-item>
            <h-menu-item value="5">
              <template #title>一级菜单 5</template>
            </h-menu-item>
            <h-menu-item value="6">
              <template #title>一级菜单 6</template>
            </h-menu-item>
          </h-menu>
        </h-header>
        <h-main style="background: var(--h-bg-info-weak-hover); min-height: 500px;"></h-main>
      </h-container>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { AIcon } from '@aurora/icon';
import { HMenu , useMenuItemProps, useMenuProps, useSubMenuProps } from '@aurora/horizon-web';

type menuPropType = ExtractPropTypes<typeof useMenuProps>;
type menuItemPropType = ExtractPropTypes<typeof useMenuItemProps>;
type subMenuPropType = ExtractPropTypes<typeof useSubMenuProps>;

const menuRef = ref<typeof HMenu | null>(null);
const theme = ref<menuPropType['theme']>('default');
const activeType = ref<menuPropType['activeType']>('link');
const submenuExpandType = ref<menuPropType['submenuExpandType']>('full');
const selectedValue = ref('3-1-1');

const onSelected = (value: string, values: (menuItemPropType | subMenuPropType)[]) => {
  selectedValue.value = value;
  console.info('selected', value, values);
};
<\/script>

<style scoped>
.logo {
  display: flex;
  grid-column-gap: 12px;
  align-items: center;
}

.logo .img {
  flex: 0 0 36px;
  display: flex;
  align-items: center;
}

.logo .text {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.avatar-popover {
  display: flex;
  align-items: center;
}

.avatar-popover :deep(.h-popover__reference) {
  display: flex;
}
</style>
`,
    path: "demos/components/Menu/horizontal.vue"
  }, null, _parent));
  _push(`<h2 id="拖拽更改菜单宽度" tabindex="-1">拖拽更改菜单宽度 <a class="header-anchor" href="#拖拽更改菜单宽度" aria-label="Permalink to &quot;拖拽更改菜单宽度&quot;">​</a></h2><p>可以设置 <code>resizable = true</code> 开启拖拽改变菜单栏宽度的功能</p><p>如果不希望在拖拽的过程中折叠菜单，则可以控制 <code>resize-to-collapse = false</code> 即可</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-form label-position="left" label-vertical-align="middle" :inline="true">
        <h-form-item label="theme:">
          <h-radio-group v-model="theme">
            <h-radio label="default">default</h-radio>
            <h-radio label="gray">gray</h-radio>
            <h-radio label="midnight">midnight</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="resize-to-collapse:">
          <h-radio-group v-model="resizeToCollapse">
            <h-radio :label="true">True</h-radio>
            <h-radio :label="false">False</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
    </h-col>
  </h-row>
  <h-row>
    <h-col :span="24">
      <h-container>
        <h-aside width="auto">
          <h-menu
            ref="menuRef"
            v-model:collapse="collapse"
            :collapse-button="true"
            :exclusive-expand="false"
            height="500px"
            :theme="theme"
            resizable
            :resize-to-collapse="resizeToCollapse"
          >
            <template #prepend="isCollapse">
              <div class="logo">
                <div class="img">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 32 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h-transition name="collapse-horizontal">
                  <div v-show="!isCollapse.value" class="text">Aurora</div>
                </h-transition>
              </div>
            </template>
            <h-menu-item value="1" icon="matestore_filled">
              <template #title>一级菜单 1</template>
            </h-menu-item>
            <h-sub-menu value="2" icon="matestore_filled">
              <template #title>一级菜单 2</template>
              <h-menu-item value="2-1" name="二级菜单 1" />
              <h-menu-item value="2-2" name="二级菜单 2" />
            </h-sub-menu>
            <h-sub-menu value="3" icon="matestore_filled">
              <template #title>一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容</template>
              <h-sub-menu value="3-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="3-1-1" :disabled="true">三级菜单 1</h-menu-item>
                <h-menu-item value="3-1-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-1-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-1-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-2">
                <template #title>二级菜单 2</template>
                <h-menu-item value="3-2-1">三级菜单 1</h-menu-item>
                <h-menu-item value="3-2-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-2-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-2-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-3">
                <template #title>二级菜单 3</template>
                <h-menu-item value="3-3-1">三级菜单 1</h-menu-item>
                <h-sub-menu value="3-3-2">
                  <template #title>三级菜单 2</template>
                  <h-menu-item value="3-3-2-1">四级菜单 1</h-menu-item>
                  <h-menu-item value="3-3-2-2">四级菜单 2</h-menu-item>
                </h-sub-menu>
              </h-sub-menu>
            </h-sub-menu>
            <h-menu-item value="4">
              <template #icon>
                <a-icon size="20" name="matestore_filled" />
              </template>
              <template #title>一级菜单 4</template>
            </h-menu-item>
            <h-sub-menu value="5" icon="matestore_filled" :disabled="true">
              <template #title>一级菜单 5</template>
              <h-sub-menu value="5-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="5-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="5-1-2">三级菜单 2</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
            <h-sub-menu value="6" :selectable="true">
              <template #icon>
                <a-icon name="matestore_filled" size="20"></a-icon>
              </template>
              <template #title>一级菜单 6</template>
              <h-sub-menu value="6-1" :selectable="true">
                <template #title>二级菜单 1</template>
                <h-menu-item value="6-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="6-1-2">三级菜单 2</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
          </h-menu>
        </h-aside>
        <h-main style="background: var(--h-bg-info-weak-hover)"></h-main>
      </h-container>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { AIcon } from '@aurora/icon';
import { HMenu, useMenuProps } from '@aurora/horizon-web';

const menuRef = ref<typeof HMenu | null>(null);
const collapse = ref(false);
const theme = ref<ExtractPropTypes<typeof useMenuProps>['theme']>('default');
const resizeToCollapse = ref<boolean>(true);
<\/script>

<style scoped>
.logo {
  display: flex;
  grid-column-gap: 12px;
  align-items: center;
}

.logo .img {
  flex: 0 0 36px;
  display: flex;
  align-items: center;
}

.logo .text {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}
</style>
`,
    path: "demos/components/Menu/resizer.vue"
  }, null, _parent));
  _push(`<h2 id="拦截点选" tabindex="-1">拦截点选 <a class="header-anchor" href="#拦截点选" aria-label="Permalink to &quot;拦截点选&quot;">​</a></h2><p>设置 <code>before-select</code>，可以拦截用户点选菜单的操作</p>`);
  _push(ssrRenderComponent(_component_demo_block, {
    source: `<template>
  <h-row>
    <h-col :span="24">
      <h-container>
        <h-aside width="auto">
          <h-menu
            ref="menuRef"
            v-model:collapse="collapse"
            :collapse-button="true"
            :selected-value="selectedValue"
            :exclusive-expand="false"
            height="500px"
            :before-select="onBeforeSelect"
            @selected="onSelected"
            @collapse-changed="onCollapseChanged"
            @open="onOpen"
            @close="onClose"
          >
            <template #prepend="isCollapse">
              <div class="logo">
                <div class="img">
                  <svg
                    width="36"
                    height="26"
                    viewBox="0 0 32 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.405 18.4413L21.7817 3.52064C20.8864 1.97192 19.4675 0.842547 17.7659 0.317556C17.762 0.316275 17.7582 0.314995 17.7543 0.314354C17.7159 0.30219 17.6768 0.290666 17.6383 0.279782C17.5941 0.266977 17.5499 0.254813 17.5057 0.242648H17.5031C16.9526 0.0921936 16.3867 0.0115242 15.8163 0.000640233C15.8009 0.000640233 15.7855 0 15.7701 0C15.74 0 15.7099 0 15.6798 0C15.6458 0 15.6112 0 15.5772 0C15.5657 0 15.5548 0 15.5432 0.000640233C14.9235 0.0115242 14.3082 0.105638 13.7122 0.279782C13.6744 0.290666 13.6372 0.30219 13.6 0.313074C13.5949 0.314354 13.5898 0.316275 13.5847 0.317556C11.8837 0.842547 10.4654 1.97128 9.57009 3.52L0.946819 18.4413C0.00598254 20.0694 -0.243967 21.9658 0.243114 23.7815C0.730196 25.5972 1.89599 27.1145 3.52515 28.0544C4.61083 28.6805 5.81507 29 7.03598 29C7.64804 29 8.26394 28.92 8.87087 28.7573C10.6885 28.2708 12.2074 27.1062 13.1482 25.4787L15.6766 21.1066L18.2036 25.4787C19.1445 27.1068 20.6634 28.2708 22.481 28.7573C23.0879 28.92 23.7038 29 24.3158 29C25.5368 29 26.741 28.6799 27.8267 28.0544C29.4565 27.1145 30.6216 25.5972 31.1087 23.7815C31.5958 21.9658 31.3458 20.0694 30.405 18.4413ZM27.3941 22.7872C27.173 23.6118 26.6436 24.3007 25.9034 24.7277C25.1631 25.1548 24.3011 25.2681 23.4756 25.0472C22.6502 24.8263 21.9606 24.2975 21.5331 23.558L17.8973 17.2664C18.1216 16.8791 18.2742 16.5981 18.8523 15.6C19.8104 13.9456 19.1003 11.345 17.4398 10.3847L14.7088 15.1172L14.6992 15.1108L9.81683 23.558C9.38936 24.2975 8.69975 24.8263 7.87428 25.0472C7.0488 25.2681 6.18679 25.1548 5.44656 24.7277C4.70632 24.3007 4.17694 23.6118 3.95583 22.7872C3.73472 21.9626 3.84816 21.1014 4.27564 20.362L12.9008 5.44134C13.0002 5.26976 13.1142 5.1097 13.2405 4.96181L13.2431 4.96821C13.4776 4.69355 13.7596 4.45794 14.082 4.27164C14.4518 4.05844 14.8517 3.92335 15.2619 3.86957C15.4003 3.85164 15.5388 3.84268 15.6766 3.84204C15.8143 3.84204 15.9528 3.851 16.0912 3.86893C16.502 3.92335 16.902 4.05844 17.2717 4.271C17.7351 4.53797 18.1158 4.90867 18.3901 5.35043L18.3952 5.34787C18.4145 5.3786 18.4337 5.40933 18.4523 5.4407L27.0762 20.362C27.5037 21.1014 27.6171 21.9626 27.396 22.7872H27.3941Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h-transition name="collapse-horizontal">
                  <div v-show="!isCollapse.value" class="text">Aurora</div>
                </h-transition>
              </div>
            </template>
            <h-menu-item value="1" icon="matestore_filled">
              <template #title>一级菜单 1</template>
            </h-menu-item>
            <h-sub-menu value="2" icon="matestore_filled">
              <template #title>一级菜单 2</template>
              <h-menu-item value="2-1" name="二级菜单 1" />
              <h-menu-item value="2-2" name="二级菜单 2" />
            </h-sub-menu>
            <h-sub-menu value="3" icon="matestore_filled">
              <template #title>一级菜单 3 的名字超级长，可以看到 tooltip 的显示，如果没有显示，还需要增加更多更多内容</template>
              <h-sub-menu value="3-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="3-1-1" :disabled="true">三级菜单 1</h-menu-item>
                <h-menu-item value="3-1-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-1-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-1-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-2">
                <template #title>二级菜单 2</template>
                <h-menu-item value="3-2-1">三级菜单 1</h-menu-item>
                <h-menu-item value="3-2-2">三级菜单 2</h-menu-item>
                <h-menu-item value="3-2-3">三级菜单 3</h-menu-item>
                <h-menu-item value="3-2-4">三级菜单 4</h-menu-item>
              </h-sub-menu>
              <h-sub-menu value="3-3">
                <template #title>二级菜单 3</template>
                <h-menu-item value="3-3-1">三级菜单 1</h-menu-item>
                <h-sub-menu value="3-3-2">
                  <template #title>三级菜单 2</template>
                  <h-menu-item value="3-3-2-1">四级菜单 1</h-menu-item>
                  <h-sub-menu value="3-3-2-2">
                    <template #title>四级菜单 2</template>
                    <h-menu-item value="3-3-2-2-1">五级菜单 1</h-menu-item>
                    <h-menu-item value="3-3-2-2-2">五级菜单 2</h-menu-item>
                    <h-menu-item value="3-3-2-2-3">五级菜单 3</h-menu-item>
                  </h-sub-menu>
                </h-sub-menu>
              </h-sub-menu>
            </h-sub-menu>
            <h-menu-item value="4">
              <template #icon>
                <a-icon size="20" name="matestore_filled" />
              </template>
              <template #title>一级菜单 4</template>
            </h-menu-item>
            <h-sub-menu value="5" icon="matestore_filled" :disabled="true">
              <template #title>一级菜单 5</template>
              <h-sub-menu value="5-1">
                <template #title>二级菜单 1</template>
                <h-menu-item value="5-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="5-1-2">三级菜单 2</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
            <h-sub-menu value="6" :selectable="true">
              <template #icon>
                <a-icon name="matestore_filled" size="20"></a-icon>
              </template>
              <template #title>一级菜单 6</template>
              <h-sub-menu value="6-1" :selectable="true">
                <template #title>二级菜单 1</template>
                <h-menu-item value="6-1-1">三级菜单 1</h-menu-item>
                <h-menu-item value="6-1-2">三级菜单 2</h-menu-item>
              </h-sub-menu>
            </h-sub-menu>
          </h-menu>
        </h-aside>
        <h-main style="background: var(--h-bg-info-weak-hover)"></h-main>
      </h-container>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import { AIcon } from '@aurora/icon';
import { $confirm, HMenu } from '@aurora/horizon-web';
import type { MenuItemProps, SubMenuProps } from '@aurora/horizon-web';

const menuRef = ref<typeof HMenu | null>(null);
const collapse = ref(false);
const selectedValue = ref('3-1-1');
const onSelected = (value: string, values: Array<MenuItemProps | SubMenuProps>, current: MenuItemProps | SubMenuProps) => {
  selectedValue.value = value;
  console.info('selected', value, values, current);
};

const onCollapseChanged = (status: boolean) => {
  collapse.value = status;
  console.info(\`菜单目前的折叠状态为：\${status}\`);
};

function onOpen(curr: string, paths: SubMenuProps[]) {
  console.info('open:', curr, paths);
}

function onClose(curr: string, paths: SubMenuProps[]) {
  console.info('close:', curr, paths);
}

function onBeforeSelect(value: string, props:  MenuItemProps | SubMenuProps) {
  return new Promise<boolean>((resolve, reject) => {
    console.info(props);
    $confirm(\`是否跳转到\${value}\`, '提示').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      reject();
    });
  });
}
<\/script>

<style scoped>
.logo {
  display: flex;
  grid-column-gap: 12px;
  align-items: center;
}

.logo .img {
  flex: 0 0 36px;
  display: flex;
  align-items: center;
}

.logo .text {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}
</style>
`,
    path: "demos/components/Menu/before-select.vue"
  }, null, _parent));
  _push(`<h2>Menu Api</h2><h3>Menu Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-value</td><td>选中菜单值</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td>菜单展示形式</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">否</td><td>&#39;vertical&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>主题</td><td><code>&#39;default&#39; | &#39;gray&#39; | &#39;midnight&#39;</code></td><td class="text-center">否</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td>菜单是否折叠，只在 <code>mode = &#39;vertical&#39;</code> 时可用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ellipsis</td><td>是否省略多余的子项，只有在 <code>mode = &#39;horizontal&#39;</code> 时可用</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-button</td><td>是否显示折叠按钮，只在 <code>mode = &#39;vertical&#39;</code> 时可用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-forever</td><td>一级菜单带标题的永久折叠</td><td><code>boolean</code></td><td class="text-center">否</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-show-title</td><td>折叠显示标题</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">exclusive-expand</td><td>菜单展开是否互斥</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">menu-trigger</td><td>子菜单打开的方式，只有在 <code>mode = &#39;horizontal&#39;</code> 时可用</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">否</td><td>&#39;hover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">router</td><td>是否使用 <code>vue-router</code> 模式导航。<br>启用后会根据子菜单的 <code>value</code> 或 <code>index</code> 作为路由 <code>path</code> 跳转</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-transition</td><td>是否启用折叠动画</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>高度，如果是 Number，会自动加上单位 px<br><code>mode = &#39;vertical&#39;</code> 时默认 <code>100%</code></td><td><code>number | string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-type</td><td>激活态样式<br><code>mode = &#39;vertical&#39;</code> 只提供 <code>button</code> 样式<br><code>mode = &#39;horizontal&#39;</code> 默认 <code>link</code> 样式</td><td><code>&#39;button&#39; | &#39;link&#39;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-width</td><td>容器的最大宽度，只对 <code>mode = &#39;horizontal&#39;</code> 有效</td><td><code>string | number</code></td><td class="text-center">否</td><td>&#39;100%&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">submenu-expand-type</td><td>子菜单展开的模式，仅对 <code>mode = &#39;horizontal&#39;</code> 有效<br><code>single</code>: 只会对当前鼠标悬浮的菜单弹出弹窗<br><code>full</code>: 只要悬浮在菜单任意位置，会把所有子菜单都展示出来</td><td><code>&#39;single&#39; | &#39;full&#39;</code></td><td class="text-center">否</td><td>&#39;single&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>宽度<br>需要设置在 160 - 240 之间<br>仅在 <code>mode = vertical</code> 时有效</td><td><code>string | number</code></td><td class="text-center">否</td><td>240</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resizable</td><td>是否可以拖拽调整大小</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize-to-collapse</td><td>是否允许在拖拽到一定程度后收起菜单栏</td><td><code>boolean</code></td><td class="text-center">否</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tag</td><td>使用哪种原生标签渲染</td><td><code>&#39;div&#39; | &#39;a&#39;</code></td><td class="text-center">否</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-select</td><td>选择前函数钩子<br>如果希望控制用户是否可以选择该菜单，可以传入函数判断，并返回一个 <code>boolean</code> 值告知是否可选择</td><td><code>(value: string, props: MenuItemProps | SubMenuProps) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-dropdown-level</td><td>在第几层级后开始使用 <code>dropdown</code> 展示子层级 （从 <code>0</code> 开始计数）</td><td><code>number</code></td><td class="text-center">否</td><td>2</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-default-expand-all</td><td>是否默认展开全部<br>只有在第一次挂载时有效，后期层级有变动请使用 <code>expandAll</code> 方法</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>Menu Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-changed`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>update:collapse</code> 获取折叠状态的变更" }, null, _parent));
  _push(`</td><td rowspan="1">当菜单折叠打开后通知</td><td rowspan="1">( status: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>boolean</code></td><td>折叠状态</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:collapse</td><td rowspan="1">当菜单折叠打开后通知</td><td rowspan="1">( value: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>boolean</code></td><td>是否折叠</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "selected" }, null, _parent));
  _push(`</td><td rowspan="3">选择了某菜单的回调</td><td rowspan="3">( currentValue: <code>string</code>, paths: <code>(MenuItemProps | SubMenuProps)[]</code>, current: <code>MenuItemProps | SubMenuProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>当前菜单项的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>(MenuItemProps | SubMenuProps)[]</code></td><td>菜单项到顶级的数组</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>MenuItemProps | SubMenuProps</code></td><td>当前菜单项</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td rowspan="3">选择了某菜单的回调</td><td rowspan="3">( currentValue: <code>string</code>, paths: <code>(MenuItemProps | SubMenuProps)[]</code>, current: <code>MenuItemProps | SubMenuProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>当前菜单项的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>(MenuItemProps | SubMenuProps)[]</code></td><td>菜单项到顶级的数组</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>MenuItemProps | SubMenuProps</code></td><td>当前菜单项</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">open</td><td rowspan="2"><code>sub-menu</code> 展开的回调</td><td rowspan="2">( currentValue: <code>string</code>, paths: <code>SubMenuProps[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>当前 sub-menu 的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>SubMenuProps[]</code></td><td>菜单项到顶级的数组</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="2"><code>sub-menu</code> 收起的回调</td><td rowspan="2">( currentValue: <code>string</code>, paths: <code>SubMenuProps[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>当前 sub-menu 的 value</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>SubMenuProps[]</code></td><td>菜单项到顶级的数组</td></tr></tbody></table><h3>Menu Exposes</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>入参/出参名</th><th>入参/出参类型</th><th>入参/出参说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expandAll</td><td rowspan="1">全部展开</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapseAll</td><td rowspan="1">全部收起</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td rowspan="2">展开传入的菜单</td><td rowspan="2">( values: <code>string[]</code>, replace: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>string[]</code></td><td><code>subMenu</code> 的唯一 <code>value</code></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td><code>boolean</code></td><td>是否替换，默认 <code>true</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td rowspan="1">收起传入的菜单</td><td rowspan="1">( values: <code>string[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>string[]</code></td><td><code>subMenu</code> 的唯一 <code>value</code></td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollToActive</td><td rowspan="1">滚动到激活的菜单处<br>需要注意的是，如果菜单本身不可见（被折叠），可能无法滚动</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expandMenus</td><td rowspan="1">展开的菜单列表</td><td rowspan="1"><code>ComputedRef&lt;string[]&gt;</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2>MenuItem Api</h2><h3>MenuItem Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>字体图标名称或对象</td><td><code>string | Component</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>菜单名称</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>组件值，可以在 <code>menu.router</code> 开启后作为 <code>path</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active</td><td>是否激活</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr></tbody></table><h3>MenuItem Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">menu-item-active`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>click</code>" }, null, _parent));
  _push(`</td><td rowspan="1">当选择了当前菜单后触发</td><td rowspan="1">( prop: <code>MenuItemProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>MenuItemProps</code></td><td>menu-item 的 prop</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击了当前菜单后触发</td><td rowspan="1">( prop: <code>MenuItemProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>MenuItemProps</code></td><td>menu-item 的 prop</td></tr></tbody></table><h2>SubMenu Api</h2><h3>SubMenu Props</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">必填</th><th>默认值</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>字体图标名称或对象</td><td><code>string | Component</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>唯一标识，可以作为 <code>vue-router</code> 模式下的路由导航的 <code>path</code></td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>名称，与 <code>slots.title</code> 相同，优先级比 <code>slots.title</code> 低</td><td><code>string</code></td><td class="text-center">否</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>是否禁用</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectable</td><td>是否可选中</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>是否将 <code>dropdown</code> 元素发送到 <code>body</code> 上</td><td><code>boolean</code></td><td class="text-center">否</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-offset</td><td><code>popper</code> 的偏移量</td><td><code>number</code></td><td class="text-center">否</td><td>6</td></tr></tbody></table><h3>SubMenu Emits</h3><table class="md-table"><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>参数名</th><th>参数类型</th><th>参数说明</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">点击了当前菜单后触发</td><td rowspan="1">( prop: <code>SubMenuProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>SubMenuProps</code></td><td>sub-menu 的 prop</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("zh/demos/components/Menu.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Menu as default
};
