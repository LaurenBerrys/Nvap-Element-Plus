<!--
 * @Author: Nie Chengyong
 * @Date: 2023-02-16 14:18:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 15:26:20
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/layout/components/header/components/UserAvatar.vue
 * @Description: 
 * 
-->
<template>
  <el-dropdown>
    <div flex items-center cursor-pointer>
      <img v-if="avatar" :src="avatar" mr10 w-35 h-35 rounded-full />
      <icon-fluent-emoji-flat:boy-light v-else mr10 w-35 h-35 rounded-full />
      <span>{{ appStore.name }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="appStore.resetStateAndToLogin()"
          >退出登录
          <icon-mdi:exit-to-app />
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  const appStore = useAppStore();
  const { avatar = '' } = appStore.userInfo;
</script>
