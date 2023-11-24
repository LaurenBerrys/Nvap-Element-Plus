<!--
 * @Author: Nie Chengyong
 * @Date: 2023-02-16 16:03:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 15:26:55
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/layout/components/header/components/GithubSite.vue
 * @Description: 
 * 
-->
<template>
  <el-icon mr-20 size="18" style="cursor: pointer" @click="handleLinkClick">
    <icon-mdi:github />
  </el-icon>
</template>

<script setup>
  function handleLinkClick() {
    window.open('https://github.com/supercode-peter/nestjs-ts-vue3-vite.git');
  }
</script>
