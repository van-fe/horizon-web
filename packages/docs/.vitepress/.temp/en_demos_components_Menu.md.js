import { resolveComponent, useSSRContext } from "vue/dist/vue.esm-bundler.js";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from "vue/server-renderer";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en/demos/components/Menu.md","filePath":"en/demos/components/Menu.md"}');
const _sfc_main = { name: "en/demos/components/Menu.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_demo_block = resolveComponent("demo-block");
  const _component_deprecated_tips = resolveComponent("deprecated-tips");
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Menu</h1><p class="description">If you want the icon and title content to be displayed together, you need to set <code>collapse-forever = true</code></p><h2 id="basic-usage" tabindex="-1">Basic Usage <a class="header-anchor" href="#basic-usage" aria-label="Permalink to &quot;Basic Usage&quot;">​</a></h2>`);
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
  _push(`<h2 id="first-level-menu-with-title" tabindex="-1">First-level Menu with Title <a class="header-anchor" href="#first-level-menu-with-title" aria-label="Permalink to &quot;First-level Menu with Title&quot;">​</a></h2><p>If you want the icon and title content to be displayed together, you need to set <code>collapse-forever = true</code></p>`);
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
  _push(`<h2 id="horizontal-menu" tabindex="-1">Horizontal Menu <a class="header-anchor" href="#horizontal-menu" aria-label="Permalink to &quot;Horizontal Menu&quot;">​</a></h2><p>Set mode to <code>horizontal</code> to enable horizontal menu</p><p>When submenus exceed three levels, they will not continue to render when <code>submenu-expand-type = &#39;full&#39;</code></p>`);
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
  _push(`<h2 id="drag-to-change-menu-width" tabindex="-1">Drag to Change Menu Width <a class="header-anchor" href="#drag-to-change-menu-width" aria-label="Permalink to &quot;Drag to Change Menu Width&quot;">​</a></h2><p>You can set <code>resizable = true</code> to enable the function of dragging to change the menu bar width</p><p>If you don&#39;t want the menu to collapse during dragging, you can control <code>resize-to-collapse = false</code></p>`);
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
  _push(`<h2 id="intercept-selection" tabindex="-1">Intercept Selection <a class="header-anchor" href="#intercept-selection" aria-label="Permalink to &quot;Intercept Selection&quot;">​</a></h2><p>Set <code>before-select</code> to intercept user menu selection operations</p>`);
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
  _push(`<h2 id="menu-api" class="no-underline h2"><a href="#menu-api" class="!no-underline">Menu Api</a></h2><h3 id="menu-props" class="no-underline h3"><a href="#menu-props" class="!no-underline">Menu Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected-value</td><td>Configuration for selected value.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">mode</td><td>Configuration for mode.</td><td><code>&#39;horizontal&#39; | &#39;vertical&#39;</code></td><td class="text-center">No</td><td>&#39;vertical&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">theme</td><td>Configuration for theme.</td><td><code>&#39;default&#39; | &#39;gray&#39; | &#39;midnight&#39;</code></td><td class="text-center">No</td><td>&#39;default&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td>Configuration for collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">ellipsis</td><td>Configuration for ellipsis.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-button</td><td>Configuration for collapse button.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-forever</td><td>Configuration for collapse forever.</td><td><code>boolean</code></td><td class="text-center">No</td><td>undefined</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-show-title</td><td>Configuration for collapse show title.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">exclusive-expand</td><td>Configuration for exclusive expand.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">menu-trigger</td><td>Configuration for menu trigger.</td><td><code>&#39;hover&#39; | &#39;click&#39;</code></td><td class="text-center">No</td><td>&#39;hover&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">router</td><td>Configuration for router.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-transition</td><td>Configuration for collapse transition.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">height</td><td>Configuration for height.</td><td><code>number | string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active-type</td><td>Configuration for active type.</td><td><code>&#39;button&#39; | &#39;link&#39;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">max-width</td><td>Configuration for max width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>&#39;100%&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">submenu-expand-type</td><td>Configuration for submenu expand type.</td><td><code>&#39;single&#39; | &#39;full&#39;</code></td><td class="text-center">No</td><td>&#39;single&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">width</td><td>Configuration for width.</td><td><code>string | number</code></td><td class="text-center">No</td><td>240</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resizable</td><td>Configuration for resizable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">resize-to-collapse</td><td>Configuration for resize to collapse.</td><td><code>boolean</code></td><td class="text-center">No</td><td>true</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">tag</td><td>Configuration for tag.</td><td><code>&#39;div&#39; | &#39;a&#39;</code></td><td class="text-center">No</td><td>&#39;div&#39;</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">before-select</td><td>Configuration for before select.</td><td><code>(value: string, props: MenuItemProps | SubMenuProps) =&gt; Promisable&lt;boolean&gt;</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">use-dropdown-level</td><td>Configuration for use dropdown level.</td><td><code>number</code></td><td class="text-center">No</td><td>2</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">is-default-expand-all</td><td>Configuration for is default expand all.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="menu-emits" class="no-underline h3"><a href="#menu-emits" class="!no-underline">Menu Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse-changed`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>update:collapse</code> 获取折叠状态的变更" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when collapse changed changes.</td><td rowspan="1">( status: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">status</td><td><code>boolean</code></td><td>The status value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">update:collapse</td><td rowspan="1">Emitted when update:collapse changes.</td><td rowspan="1">( value: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td><code>boolean</code></td><td>The value value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">select`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "selected" }, null, _parent));
  _push(`</td><td rowspan="3">Emitted when select changes.</td><td rowspan="3">( currentValue: <code>string</code>, paths: <code>(MenuItemProps | SubMenuProps)[]</code>, current: <code>MenuItemProps | SubMenuProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>The current value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>(MenuItemProps | SubMenuProps)[]</code></td><td>The paths value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>MenuItemProps | SubMenuProps</code></td><td>The current value.</td></tr><tr><td rowspan="3" style="${ssrRenderStyle({ "word-break": "keep-all" })}">selected</td><td rowspan="3">Emitted when selected changes.</td><td rowspan="3">( currentValue: <code>string</code>, paths: <code>(MenuItemProps | SubMenuProps)[]</code>, current: <code>MenuItemProps | SubMenuProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>The current value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>(MenuItemProps | SubMenuProps)[]</code></td><td>The paths value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">current</td><td><code>MenuItemProps | SubMenuProps</code></td><td>The current value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">open</td><td rowspan="2">Emitted when open changes.</td><td rowspan="2">( currentValue: <code>string</code>, paths: <code>SubMenuProps[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>The current value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>SubMenuProps[]</code></td><td>The paths value.</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">close</td><td rowspan="2">Emitted when close changes.</td><td rowspan="2">( currentValue: <code>string</code>, paths: <code>SubMenuProps[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">currentValue</td><td><code>string</code></td><td>The current value value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">paths</td><td><code>SubMenuProps[]</code></td><td>The paths value.</td></tr></tbody></table><h3 id="menu-exposes" class="no-underline h3"><a href="#menu-exposes" class="!no-underline">Menu Exposes</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Input/Output</th><th>Input/Output Type</th><th>Input/Output Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expandAll</td><td rowspan="1">Controls expand all.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapseAll</td><td rowspan="1">Controls collapse all.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="2" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expand</td><td rowspan="2">Controls expand.</td><td rowspan="2">( values: <code>string[]</code>, replace: <code>boolean</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>string[]</code></td><td>The values value.</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">replace</td><td><code>boolean</code></td><td>The replace value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">collapse</td><td rowspan="1">Controls collapse.</td><td rowspan="1">( values: <code>string[]</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">values</td><td><code>string[]</code></td><td>The values value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">scrollToActive</td><td rowspan="1">Controls scroll to active.</td><td rowspan="1">( ) =&gt; <code>void</code></td><td>-</td><td>-</td><td>-</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">expandMenus</td><td rowspan="1">Controls expand menus.</td><td rowspan="1"><code>ComputedRef&lt;string[]&gt;</code></td><td>-</td><td>-</td><td>-</td></tr></tbody></table><h2 id="menuitem-api" class="no-underline h2"><a href="#menuitem-api" class="!no-underline">MenuItem Api</a></h2><h3 id="menuitem-props" class="no-underline h3"><a href="#menuitem-props" class="!no-underline">MenuItem Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>Configuration for icon.</td><td><code>string | Component</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>Configuration for value.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">active</td><td>Configuration for active.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr></tbody></table><h3 id="menuitem-emits" class="no-underline h3"><a href="#menuitem-emits" class="!no-underline">MenuItem Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">menu-item-active`);
  _push(ssrRenderComponent(_component_deprecated_tips, { name: "<code>click</code>" }, null, _parent));
  _push(`</td><td rowspan="1">Emitted when menu item active changes.</td><td rowspan="1">( prop: <code>MenuItemProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>MenuItemProps</code></td><td>The prop value.</td></tr><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( prop: <code>MenuItemProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>MenuItemProps</code></td><td>The prop value.</td></tr></tbody></table><h2 id="submenu-api" class="no-underline h2"><a href="#submenu-api" class="!no-underline">SubMenu Api</a></h2><h3 id="submenu-props" class="no-underline h3"><a href="#submenu-props" class="!no-underline">SubMenu Props</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th style="${ssrRenderStyle({ "min-width": "50px" })}" class="text-center">Required</th><th>Default</th></tr></thead><tbody><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">icon</td><td>Configuration for icon.</td><td><code>string | Component</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">value</td><td>Configuration for value.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">name</td><td>Configuration for name.</td><td><code>string</code></td><td class="text-center">No</td><td></td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">disabled</td><td>Configuration for disabled.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">selectable</td><td>Configuration for selectable.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">to-body</td><td>Configuration for to body.</td><td><code>boolean</code></td><td class="text-center">No</td><td>false</td></tr><tr><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">popper-offset</td><td>Configuration for popper offset.</td><td><code>number</code></td><td class="text-center">No</td><td>6</td></tr></tbody></table><h3 id="submenu-emits" class="no-underline h3"><a href="#submenu-emits" class="!no-underline">SubMenu Emits</a></h3><table class="md-table"><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Parameter</th><th>Parameter Type</th><th>Parameter Description</th></tr></thead><tbody><tr><td rowspan="1" style="${ssrRenderStyle({ "word-break": "keep-all" })}">click</td><td rowspan="1">Emitted when click changes.</td><td rowspan="1">( prop: <code>SubMenuProps</code> ) =&gt; <code>void</code></td><td style="${ssrRenderStyle({ "word-break": "keep-all" })}">prop</td><td><code>SubMenuProps</code></td><td>The prop value.</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("en/demos/components/Menu.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  Menu as default
};
