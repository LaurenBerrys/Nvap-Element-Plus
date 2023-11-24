<!--
 * @Author: Nie Chengyong
 * @Date: 2023-03-07 16:46:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 16:11:47
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/layout/components/header/components/LockScreen.vue
 * @Description: 
 * 
-->
<template>
  <el-tooltip>
    <el-icon mr-20 size="18" style="cursor: pointer" @click="Store.setLock(true)">
        <icon-flat-color-icons:lock />
      </el-icon>
    <template #content>
      <span>锁屏</span>
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
  const Store = useConfigStore();
  //锁屏
</script>

<style scoped></style>
