<template>
  <n-space direction="vertical">
    <n-segmented default-active-key="user">
      <n-segmented-item key="user">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <n-avatar size="small" />
            <n-tag type="info" :clickable="false">User</n-tag>
          </n-space>
        </template>
      </n-segmented-item>
      <n-segmented-item key="employee">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <n-avatar size="small" />
            <n-tag :clickable="false">Emp</n-tag>
          </n-space>
        </template>
      </n-segmented-item>
      <n-segmented-item key="lv">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <n-avatar size="small" />
            <n-tag type="success" :clickable="false">LV</n-tag>
          </n-space>
        </template>
      </n-segmented-item>
    </n-segmented>

    <n-segmented default-active-key="spring">
      <n-segmented-item key="spring">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <div>Spring</div>
            <div>Jan-Mar</div>
          </n-space>
        </template>
      </n-segmented-item>
      <n-segmented-item key="summer">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <div>Summer</div>
            <div>Apr-Jun</div>
          </n-space>
        </template>
      </n-segmented-item>
      <n-segmented-item key="fall">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <div>Fall</div>
            <div>Jul-Sep</div>
          </n-space>
        </template>
      </n-segmented-item>
      <n-segmented-item key="winter">
        <template #default>
          <n-space size="small" direction="vertical" align="center">
            <div>Winter</div>
            <div>Oct-Dec</div>
          </n-space>
        </template>
      </n-segmented-item>
    </n-segmented>
  </n-space>
</template>

<script setup lang="ts"></script>

<style scoped></style>
