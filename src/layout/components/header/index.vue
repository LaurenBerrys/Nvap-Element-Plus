<!--
 * @Author: Nie Chengyong
 * @Date: 2023-02-16 11:39:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 15:29:35
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/layout/components/header/index.vue
 * @Description: 
 * 
-->
<template>
  <div flex items-center>
    <MenuCollapse />
    <BreadCrumb ml-15 hidden sm:block />
  </div>
  <div ml-auto flex items-center>
    <Settings/>
    <GlobalSearch />
    <LockScreen />
    <ThemeMode />
    <GithubSite />
    <FullScreen />
    <UserAvatar />
  </div>
</template>

<script setup>
  import Settings from './common/setting/index.vue'
  import GlobalSearch from './common/GlobalSearch/index.vue';
  import LockScreen from './components/LockScreen.vue';
  import BreadCrumb from './components/BreadCrumb.vue';
  import MenuCollapse from './components/MenuCollapse.vue';
  import FullScreen from './components/FullScreen.vue';
  import UserAvatar from './components/UserAvatar.vue';
  import GithubSite from './components/GithubSite.vue';
  import ThemeMode from './components/ThemeMode.vue';
</script>
