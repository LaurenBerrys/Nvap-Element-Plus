<!--
 * @Author: Nie Chengyong
 * @Date: 2023-02-16 11:18:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 15:13:53
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/layout/index.vue
 * @Description: 
 * 
-->
<template>
  <div wh-full flex>
    <el-scrollbar ref="elMenuHorizontalScrollRef" w-220px>
      <SideBar />
    </el-scrollbar>
    <div flex-1 flex flex-col>
      <article flex-1 flex-col overflow-hidden>
        <header
          class="bg-white px-15 border-b bc-eee flex items-center"
          dark="bg-dark border-0"
          :style="`height: ${settings.headHight}px`"
        >
          <AppHeader />
        </header>
        <section v-if="settings.tagsView" border-b bc-eee dark:border-0 hidden sm:block>
          <AppTags :style="{ height: `${settings.tagsHeight}px` }" />
        </section>
        <section flex-1 overflow-hidden bg-hex-f5f6fb dark:bg-hex-101014>
          <AppMain />
        </section>
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
  import AppHeader from './components/header/index.vue';
  import SideBar from './components/sidebar/index.vue';
  import AppMain from './components/AppMain.vue';
  import AppTags from './components/tags/index.vue';
  import settings from '@/settings/SystemSettings';
</script>
