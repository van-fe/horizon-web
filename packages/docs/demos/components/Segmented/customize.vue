<template>
  <h-space direction="vertical">
    <h-segmented default-active-key="user">
      <h-segmented-item key="user">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <h-avatar size="small" />
            <h-tag type="info" :clickable="false">User</h-tag>
          </h-space>
        </template>
      </h-segmented-item>
      <h-segmented-item key="employee">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <h-avatar size="small" />
            <h-tag :clickable="false">Emp</h-tag>
          </h-space>
        </template>
      </h-segmented-item>
      <h-segmented-item key="lv">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <h-avatar size="small" />
            <h-tag type="success" :clickable="false">LV</h-tag>
          </h-space>
        </template>
      </h-segmented-item>
    </h-segmented>

    <h-segmented default-active-key="spring">
      <h-segmented-item key="spring">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <div>Spring</div>
            <div>Jan-Mar</div>
          </h-space>
        </template>
      </h-segmented-item>
      <h-segmented-item key="summer">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <div>Summer</div>
            <div>Apr-Jun</div>
          </h-space>
        </template>
      </h-segmented-item>
      <h-segmented-item key="fall">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <div>Fall</div>
            <div>Jul-Sep</div>
          </h-space>
        </template>
      </h-segmented-item>
      <h-segmented-item key="winter">
        <template #default>
          <h-space size="small" direction="vertical" align="center">
            <div>Winter</div>
            <div>Oct-Dec</div>
          </h-space>
        </template>
      </h-segmented-item>
    </h-segmented>
  </h-space>
</template>

<script setup lang="ts"></script>

<style scoped></style>
