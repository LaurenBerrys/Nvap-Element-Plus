<!--
 * @Author: Nie Chengyong
 * @Date: 2023-02-13 19:56:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-30 15:22:09
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/App.vue
 * @Description: 
 * 
-->
<template>
  <el-config-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </el-config-provider>
  <transition v-if="config.lock && $route.name !== 'login'" name="slide-up">
    <LockScreen />
  </transition>
</template>
<script setup lang="ts">
  import LockScreen from '@/components/Lockscreen/Lockscreen.vue';
  const config = useConfigStore();
  const isLock = computed(() => config.lock);
  const lockTime = computed(() => config.lockTime);
  const route = useRoute();
  let timer;
  const timekeeping = () => {
    clearInterval(timer);
    if (route.name == 'login' || isLock.value) return;
    // 设置不锁屏
    config.setLock(false);
    // 重置锁屏时间
    config.setLockTime();
    timer = setInterval(() => {
      // 锁屏倒计时递减
      config.setLockTime(lockTime.value - 1);
      if (lockTime.value <= 0) {
        // 设置锁屏
        config.setLock(true);
        return clearInterval(timer);
      }
    }, 1000);
  };

  onMounted(() => {
    document.addEventListener('mousedown', timekeeping);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', timekeeping);
  });
</script>
