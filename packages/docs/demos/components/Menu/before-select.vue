<template>
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
import { $confirm, NMenu } from '@aurora/horizon-web';
import type { MenuItemProps, SubMenuProps } from '@aurora/horizon-web';

const menuRef = ref<typeof NMenu | null>(null);
const collapse = ref(false);
const selectedValue = ref('3-1-1');
const onSelected = (value: string, values: Array<MenuItemProps | SubMenuProps>, current: MenuItemProps | SubMenuProps) => {
  selectedValue.value = value;
  console.info('selected', value, values, current);
};

const onCollapseChanged = (status: boolean) => {
  collapse.value = status;
  console.info(`菜单目前的折叠状态为：${status}`);
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
    $confirm(`是否跳转到${value}`, '提示').then((close) => {
      resolve(true);
      close();
    }).catch(() => {
      reject();
    });
  });
}
</script>

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
