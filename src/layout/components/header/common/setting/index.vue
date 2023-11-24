<!--
 * @Author: LaurenBerrys 949154547@qq.com
 * @Date: 2023-04-07 15:41:48
 * @LastEditTime: 2023-11-24 16:12:59
 * @Description: 
-->
<template>
  <el-tooltip>
    <el-icon mr-20 size="18" style="cursor: pointer" @click="handleLinkClick">
      <icon-flat-color-icons:settings />
    </el-icon>
    <template #content>
      <span>主题设置</span>
    </template>
  </el-tooltip>
  <Tema v-model="show" placement="right" />
</template>

<script setup lang="ts">
  import Tema from './components/Tema.vue';
  const show = ref(false);
  function handleLinkClick() {
    show.value = true;
  }
</script>

<style lang="scss" scoped></style>
