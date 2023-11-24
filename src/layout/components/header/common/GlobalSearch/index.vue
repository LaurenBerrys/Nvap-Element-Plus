<!--
 * @Author: LaurenBerrys 949154547@qq.com
 * @Date: 2023-04-07 15:41:48
 * @LastEditTime: 2023-11-24 16:11:19
 * @Description: 
-->
<template>
  <el-tooltip>
    <el-icon mr-20 size="18" style="cursor: pointer" @click="handleLinkClick">
      <icon-flat-color-icons:search />
    </el-icon>
    <template #content>
      <span>搜索</span>
    </template>
  </el-tooltip>
  <search-modal ::value="show" />
</template>

<script setup lang="ts">
  import { SearchModal } from './components';
  const show = ref(false);
  function handleLinkClick() {
    show.value = true;
  }
</script>

<style lang="scss" scoped></style>
