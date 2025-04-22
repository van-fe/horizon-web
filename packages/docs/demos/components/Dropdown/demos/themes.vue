<template>
  <n-row>
    <n-col :span="24">
      <n-form label-position="left" label-vertical-align="middle" :inline="true">
        <n-form-item label="theme:">
          <n-radio-group v-model="theme">
            <n-radio label="default">default</n-radio>
            <n-radio label="gray">gray</n-radio>
            <n-radio label="midnight">midnight</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-form>
      <n-dropdown :theme="theme" @command="onCommand">
        <n-button>Grade</n-button>
        <template #dropdown>
          <n-dropdown-menu>
            <n-dropdown-submenu v-for="item of list" :key="item.label" :title="item.label" :disabled="item.disabled ?? false">
              <n-dropdown-submenu v-for="subItem of item.children" :key="subItem.label" :title="subItem.label" :disabled="subItem.disabled ?? false">
                <n-dropdown-item v-for="child of subItem.children" :key="child.label" :command="subItem.label + child.label" :disabled="child.disabled ?? false">
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
import { $message } from '@nio-fe/lego';

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
.n-dropdown {
  display: inline-flex;
}

.n-dropdown + .n-dropdown {
  margin-left: 12px;
}
</style>
