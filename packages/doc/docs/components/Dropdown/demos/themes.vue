<template>
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
      <h-dropdown
        :theme="theme"
        :popover-options="{ sameWidth: true }"
        @visible-change="v => (visible1 = v)"
        @command="onCommand"
      >
        <h-button>
          Grade
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdowh-icon" />
          </template>
        </h-button>
        <template #dropdown>
          <h-dropdowh-menu>
            <h-dropdowh-submenu
              v-for="item of list"
              :key="item.label"
              :title="item.label"
              :disabled="item.disabled ?? false"
            >
              <h-dropdowh-submenu
                v-for="subItem of item.children"
                :key="subItem.label"
                :title="subItem.label"
                :disabled="subItem.disabled ?? false"
              >
                <h-dropdowh-item
                  v-for="child of subItem.children"
                  :key="child.label"
                  :command="subItem.label + child.label"
                  :disabled="child.disabled ?? false"
                >
                  {{ child.label }}
                </h-dropdowh-item>
              </h-dropdowh-submenu>
            </h-dropdowh-submenu>
          </h-dropdowh-menu>
        </template>
      </h-dropdown>
    </h-col>
  </h-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';
import { IconArrowDown } from '@aurora/icon';
import type { DropdownProps } from '@aurora/horizon-web';

const visible1 = ref(false);
const theme = ref<DropdownProps['theme']>('default');

interface ListType {
  label: string;
  children?: ListType[];
  disabled?: boolean;
}

const list: ListType[] = [
  {
    label: '小学',
    children: [
      {
        label: '一年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
            disabled: true,
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
      {
        label: '二年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
      {
        label: '三年级',
        disabled: true,
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
      {
        label: '四年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
      {
        label: '五年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
      {
        label: '六年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
    ],
  },
  {
    label: '初中',
    children: [
      {
        label: '七年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
          {
            label: '5班',
          },
          {
            label: '6班',
          },
          {
            label: '7班',
          },
          {
            label: '8班',
          },
          {
            label: '9班',
          },
          {
            label: '10班',
          },
        ],
      },
      {
        label: '八年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
          {
            label: '5班',
          },
          {
            label: '6班',
          },
          {
            label: '7班',
          },
          {
            label: '8班',
          },
          {
            label: '9班',
          },
          {
            label: '10班',
          },
        ],
      },
      {
        label: '九年级',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
          {
            label: '5班',
          },
          {
            label: '6班',
          },
          {
            label: '7班',
          },
          {
            label: '8班',
          },
          {
            label: '9班',
          },
          {
            label: '10班',
          },
        ],
      },
    ],
  },
  {
    label: '高中',
    children: [
      {
        label: '高一',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
          {
            label: '5班',
          },
          {
            label: '6班',
          },
          {
            label: '7班',
          },
          {
            label: '8班',
          },
          {
            label: '9班',
          },
          {
            label: '10班',
          },
        ],
      },
      {
        label: '高二',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
      {
        label: '高三',
        children: [
          {
            label: '1班',
          },
          {
            label: '2班',
          },
          {
            label: '3班',
          },
          {
            label: '4班',
          },
        ],
      },
    ],
  },
];

function onCommand(val: unknown) {
  $message.info(val as string);
}
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;


  :deep(.h-button__suffix) {
    display: inline-flex;
    aligh-items: center;
  }
}

.h-dropdown + .h-dropdown {
  margih-left: 12px;
}

.dropdowh-icon {
  transition: transform .2s;
  margih-left: 6px;
}
</style>
