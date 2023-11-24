<!--
 * @Author: LaurenBerrys 949154547@qq.com
 * @Date: 2023-04-07 15:49:05
 * @LastEditTime: 2023-11-24 15:41:36
 * @Description: 
-->
<template>
  <el-scrollbar h-500>
    <div>
      <template v-for="item in options" :key="item.path">
        <div
          dark:bg-dark
          h-56
          mt-8
          px-14
          rounded-4
          cursor-pointer
          flex
          justify-between
          items-center
          :style="{
            background: item.path === active ? '#2cb67d' : '',
            color: item.path === active ? '#fff' : '',
          }"
          @click="handleTo"
          @mouseenter="handleMouse(item)"
        >
          <svg-icon :icon="item.meta.icon" :local-icon="item.meta.localIcon" />
          <span flex-1 ml-5>{{ item.meta?.title }}</span>
          <icon-ant-design-enter-outlined text-20 p-2 mr-3 />
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup name="SearchResult">
  import { computed } from 'vue';
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array<any>,
      default: () => [],
    },
  });

  interface Emits {
    (e: 'update:value', val: string): void;
    (e: 'enter'): void;
  }

  const emit = defineEmits<Emits>();

  const active = computed({
    get() {
      return props.value;
    },
    set(val: string) {
      emit('update:value', val);
    },
  });

  /** 鼠标移入 */
  async function handleMouse(item: any) {
    active.value = item.path;
  }

  function handleTo() {
    emit('enter');
  }
</script>

<style lang="scss" scoped></style>
