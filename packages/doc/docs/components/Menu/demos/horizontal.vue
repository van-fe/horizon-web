<template>
  <n-row>
    <n-col :span="24">
      <n-form
        label-position="left"
        label-vertical-align="middle"
        label-justify-align="right"
        :inline="true"
      >
        <n-form-item label="theme:">
          <n-radio-group v-model="theme">
            <n-radio label="midnight">midnight</n-radio>
            <n-radio label="default">default</n-radio>
            <n-radio label="gray">gray</n-radio>
          </n-radio-group>
        </n-form-item>
        <!-- <n-form-item label="activeType:">
          <n-radio-group v-model="activeType">
            <n-radio label="button">button</n-radio>
            <n-radio label="link">link</n-radio>
          </n-radio-group>
        </n-form-item> -->
        <!-- <n-form-item label="submenuExpandType:">
          <n-radio-group v-model="submenuExpandType">
            <n-radio label="single">single</n-radio>
            <n-radio label="full">full</n-radio>
          </n-radio-group>
        </n-form-item> -->
      </n-form>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="24">
      <n-container>
        <n-header height="auto" style="padding: 0">
          <n-menu
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
              <n-button v-tooltip="'提醒'" type="normal" :text="true">
                <template #icon>
                  <n-icon
                    name="notice"
                    size="20"
                    :color="
                      theme === 'midnight' ? 'var(--n-text-inverse)' : 'var(--n-text-primary)'
                    "
                  ></n-icon>
                </template>
              </n-button>
              <n-popover class="avatar-popover" placement="bottom-end">
                <template #reference>
                  <n-avatar size="small" style="align-self: center" />
                </template>
                <template #popper>
                  <n-pop-content>
                    <div class="text-body-2 text-center mb-3" style="color: var(--n-text-tertiary)">
                      Dear NIOer, Welcome
                    </div>
                    <n-button type="normal" size="large" text block class="mb-2">修改密码</n-button>
                    <n-button type="normal" size="large" text block>退出登录</n-button>
                  </n-pop-content>
                </template>
              </n-popover>
            </template>
            <n-menu-item value="1">
              <template #title>一级菜单 1</template>
            </n-menu-item>
            <n-sub-menu value="2">
              <template #title>一级菜单 2</template>
              <n-sub-menu value="2-1">
                <template #title>二级菜单 1</template>
                <n-menu-item value="2-1-1">三级菜单 1</n-menu-item>
                <n-menu-item value="2-1-2">三级菜单 2</n-menu-item>
                <n-menu-item value="2-1-3">三级菜单 3</n-menu-item>
                <n-menu-item value="2-1-4">三级菜单 4</n-menu-item>
              </n-sub-menu>
              <n-sub-menu value="2-2">
                <template #title>二级菜单 2</template>
                <n-menu-item value="2-2-1">三级菜单 1</n-menu-item>
                <n-menu-item value="2-2-2">三级菜单 2</n-menu-item>
                <n-menu-item value="2-2-3">三级菜单 3</n-menu-item>
                <n-menu-item value="2-2-4">
                  三级菜单 4三级菜单 4三级菜单 4三级菜单 4三级菜单 4
                </n-menu-item>
              </n-sub-menu>
            </n-sub-menu>
            <n-sub-menu value="3" :selectable="true">
              <template #title>
                一级菜单 3 的名字超级长，可以看到 tooltip
                的显示，如果没有显示，还需要增加更多更多内容
              </template>
              <n-sub-menu value="3-1">
                <template #title>二级菜单 1</template>
                <n-menu-item value="3-1-1" disabled icon="calendar">三级菜单 1</n-menu-item>
                <n-menu-item value="3-1-2">三级菜单 2</n-menu-item>
                <n-menu-item value="3-1-3">三级菜单 3</n-menu-item>
                <n-menu-item value="3-1-4">三级菜单 4</n-menu-item>
              </n-sub-menu>
              <n-sub-menu value="3-2">
                <template #title>二级菜单 2</template>
                <n-menu-item value="3-2-1">
                  三级菜单 1三级菜单 1三级菜单 1三级菜单 1三级菜单 1
                </n-menu-item>
                <n-menu-item value="3-2-2">三级菜单 2</n-menu-item>
                <n-menu-item value="3-2-3">三级菜单 3</n-menu-item>
                <n-menu-item value="3-2-4">三级菜单 4</n-menu-item>
              </n-sub-menu>
              <n-sub-menu value="3-3" :selectable="true">
                <template #title>二级菜单 3</template>
                <n-menu-item value="3-3-1">三级菜单 1</n-menu-item>
                <n-sub-menu value="3-3-2">
                  <template #title>三级菜单 2</template>
                  <n-menu-item value="3-3-2-1">四级菜单 1</n-menu-item>
                  <n-menu-item value="3-3-2-2">四级菜单 2</n-menu-item>
                </n-sub-menu>
              </n-sub-menu>
            </n-sub-menu>
            <n-menu-item value="4">
              <template #title>一级菜单 4</template>
            </n-menu-item>
            <n-menu-item value="5">
              <template #title>一级菜单 5</template>
            </n-menu-item>
            <n-menu-item value="6">
              <template #title>一级菜单 6</template>
            </n-menu-item>
          </n-menu>
        </n-header>
        <n-main style="background: var(--n-bg-info-weak-hover); min-height: 500px"></n-main>
      </n-container>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ExtractPropTypes, ref } from 'vue';
import { NIcon } from '@nio-fe/icon';
import { NMenu, useMenuItemProps, useMenuProps, useSubMenuProps } from '@nio-fe/lego';

type menuPropType = ExtractPropTypes<typeof useMenuProps>;
type menuItemPropType = ExtractPropTypes<typeof useMenuItemProps>;
type subMenuPropType = ExtractPropTypes<typeof useSubMenuProps>;

const menuRef = ref<typeof NMenu | null>(null);
const theme = ref<menuPropType['theme']>('midnight');
const activeType = ref<menuPropType['activeType']>('button');
const submenuExpandType = ref<menuPropType['submenuExpandType']>('single');
const selectedValue = ref('3-1-2');

const onSelected = (value: string, values: (menuItemPropType | subMenuPropType)[]) => {
  selectedValue.value = value;
  console.log('selected', value, values);
};
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
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
}

.n-avatar {
  width: 28px;
  height: 28px;
}

.avatar-popover {
  display: flex;
  align-items: center;
}

.avatar-popover :deep(.n-popover__reference) {
  display: flex;
}
</style>
