<template>
  <el-dropdown
    v-show="show"
    :options="options"
    :x="x"
    :y="y"
    placement="bottom-start"
    @clickoutside="handleHideDropdown"
  >
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          @click="handleSelect(item.key)"
          v-for="item in options"
          :key="item.key"
          :disabled="item.disabled"
          :icon="item.icon"
        >
          <span>{{ item.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { renderIcon } from '@/utils/icon';
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    currentPath: {
      type: String,
      default: '',
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
  });

  const emit = defineEmits(['update:show']);

  const tagsStore = useTagsStore();
  const appStore = useAppStore();

  const options = computed(() => [
    {
      label: '重新加载',
      key: 'reload',
      disabled: props.currentPath !== tagsStore.activeTag,
      icon: renderIcon('mdi:refresh', { size: 14 }),
    },
    {
      label: '关闭',
      key: 'close',
      disabled: tagsStore.tags.length <= 1,
      icon: renderIcon('mdi:close', { size: 14 }),
    },
    {
      label: '关闭其他',
      key: 'close-other',
      disabled: tagsStore.tags.length <= 1,
      icon: renderIcon('mdi:arrow-expand-horizontal', { size: 14 }),
    },
    {
      label: '关闭左侧',
      key: 'close-left',
      disabled: tagsStore.tags.length <= 1 || props.currentPath === tagsStore.tags[0].path,
      icon: renderIcon('mdi:arrow-expand-left', { size: 14 }),
    },
    {
      label: '关闭右侧',
      key: 'close-right',
      disabled:
        tagsStore.tags.length <= 1 ||
        props.currentPath === tagsStore.tags[tagsStore.tags.length - 1].path,
      icon: renderIcon('mdi:arrow-expand-right', { size: 14 }),
    },
  ]);

  const route = useRoute();
  const actionMap = new Map([
    [
      'reload',
      () => {
        if (route.meta?.keepAlive) {
          // 重置keepAlive
          appStore.setAliveKeys(route.name, new Date());
        }
        appStore.reloadPage();
      },
    ],
    [
      'close',
      () => {
        tagsStore.removeTag(props.currentPath);
      },
    ],
    [
      'close-other',
      () => {
        tagsStore.removeOther(props.currentPath);
      },
    ],
    [
      'close-left',
      () => {
        tagsStore.removeLeft(props.currentPath);
      },
    ],
    [
      'close-right',
      () => {
        tagsStore.removeRight(props.currentPath);
      },
    ],
  ]);

  function handleHideDropdown() {
    emit('update:show', false);
  }

  function handleSelect(key) {
    const actionFn = actionMap.get(key);
    actionFn && actionFn();
    handleHideDropdown();
  }
</script>
