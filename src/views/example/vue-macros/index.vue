<!--
 * @Author: LaurenBerrys 949154547@qq.com
 * @Date: 2023-03-21 15:25:41
 * @LastEditTime: 2023-06-07 16:26:26
 * @Description: 
-->
<template>
  <ComponentPage>
    <template #header>
      <h2 text-22 font-normal text-hex-333 dark:text-hex-ccc>vue-macros</h2>
    </template>
    <Nvapmal :title="state.title" :visible="state.visible" :width="state.width" />
    <n-input ::value="strInput" />
    <input w-200 border-5 dark:-filter-drop-shadow :="strInput" />
  </ComponentPage>
</template>

<script setup lang="ts" name="vue-macros">
  import Nvapmal from './modal.vue';
  //演示子组件中defineProps的类型可以从外部类型导入
  const state = reactive({
    title: '123',
    visible: true,
    width: '50%',
  });
  //简写v-model
  const strInput = ref('');
</script>

<style scoped></style>
