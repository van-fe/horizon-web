<template>
  <n-row>
    <n-col :span="24" @click="onClick">
      <n-dropdown :size="size" @visible-change="v => (visible1 = v)" @command="onCommand">
        <n-button>
          Grade (hover)
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible1 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label">
              <n-dropdown-submenu
                v-for="subItem of item.children"
                :key="subItem.label"
                :title="subItem.label"
              >
                <n-dropdown-item
                  v-for="child of subItem.children"
                  :key="child.label"
                  :command="subItem.label + child.label"
                >
                  {{ child.label }}
                </n-dropdown-item>
              </n-dropdown-submenu>
            </n-dropdown-submenu>
          </n-dropdown-menu>
        </template>
      </n-dropdown>

      <n-dropdown
        :size="size"
        trigger="click"
        @visible-change="v => (visible2 = v)"
        @command="onCommand"
      >
        <n-button>
          Grade (click)
          <template #suffix>
            <IconArrowDown size="14" :rotate="visible2 ? 180 : 0" class="dropdown-icon" />
          </template>
        </n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-submenu
              v-for="item of list"
              :key="item.label"
              :title="item.label"
              trigger="click"
            >
              <n-dropdown-submenu
                v-for="subItem of item.children"
                :key="subItem.label"
                :title="subItem.label"
                trigger="click"
              >
                <n-dropdown-item
                  v-for="child of subItem.children"
                  :key="child.label"
                  :command="subItem.label + child.label"
                >
                  {{ child.label }}
                </n-dropdown-item>
              </n-dropdown-submenu>
            </n-dropdown-submenu>
          </n-dropdown-menu>
        </template>
      </n-dropdown>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';
import { IconArrowDown } from '@aurora/icon';
import type { DropdownProps } from '@aurora/horizon-web';

const visible1 = ref(false);
const visible2 = ref(false);
const size = ref<DropdownProps['size']>('medium');

const list = [
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
            label: '1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班1班',
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

function onClick() {
  $message.warning('click 事件外部冒泡');
}
</script>

<style scoped>
.n-dropdown {
  display: inline-flex;


  :deep(.n-button__suffix) {
    display: inline-flex;
    align-items: center;
  }
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}

.dropdown-icon {
  transition: transform .2s;
  margin-left: 6px;
}
</style>