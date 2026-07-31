<template>
  <h-grid :gap="12">
    <h-grid-item :span="24">
      <h-form label-position="left" label-vertical-align="middle" :inline="true">
        <h-form-item label="theme:">
          <h-radio-group v-model="theme">
            <h-radio label="default">default</h-radio>
            <h-radio label="gray">gray</h-radio>
            <h-radio label="midnight">midnight</h-radio>
          </h-radio-group>
        </h-form-item>
      </h-form>
      <h-dropdown :theme="theme" @command="onCommand">
        <h-button>Grade</h-button>
        <template #dropdown>
          <h-dropdown-menu>
            <h-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label" :disabled="item.disabled ?? false">
              <h-dropdown-submenu v-for="subItem of item.children" :key="subItem.label" :title="subItem.label" :disabled="subItem.disabled ?? false">
                <h-dropdown-item v-for="child of subItem.children" :key="child.label" :command="subItem.label + child.label" :disabled="child.disabled ?? false">
                  {{ child.label }}
                </h-dropdown-item>
              </h-dropdown-submenu>
            </h-dropdown-submenu>
          </h-dropdown-menu>
        </template>
      </h-dropdown>
    </h-grid-item>
  </h-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { $message } from '@aurora/horizon-web';

const theme = ref('default');

interface ListType {
  label: string;
  children?: ListType[];
  disabled?: boolean;
}

const list: ListType[] = [{
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
}, {
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
}, {
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
}];

function onCommand(val: string) {
  $message.info(val);
}
</script>

<style scoped>
.h-dropdown {
  display: inline-flex;
}

.h-dropdown + .h-dropdown {
  margin-left: 12px;
}
</style>
