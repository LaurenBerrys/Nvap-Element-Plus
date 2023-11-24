<template>
  <el-menu
    ref="menu"
    router
    :default-active="activeKey"
    :ellipsis="false"
    background-color="transparent"
    mode="vertical"
    :collapse="configStore.collapsed"
  >
    <template v-for="val in menuOptions">
      <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
        <template #title>
          <the-icon :icon="val.icon" />
          <span>{{ val.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="item in val.children" :key="item" @click="handleMenuSelect(item)">
            <the-icon :icon="item.icon" />
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item :index="val.path" v-else :key="val.path" @click="handleMenuSelect(item)">
        <the-icon :icon="val.icon" />
        <span>{{ val.label }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
  import { renderCustomIcon, renderIcon } from '@/utils/icon';
  import { isExternal } from '@/utils/is';
  const router = useRouter();
  const curRoute = useRoute();
  const appStore = useAppStore();
  const configStore = useConfigStore();

  //当前激活的菜单
  const activeKey: any = computed(() => curRoute.meta?.activeMenu || curRoute.name);

  //返回菜单
  const menuOptions = computed(() => {
    return appStore
      .menus()
      .map((item) => getMenuItem(item))
      .sort((a, b) => a.order - b.order);
  });
  const menu: any = ref(null);
  watch(curRoute, async () => {
    await nextTick();
    menu.value?.showOption();
  });
  function resolvePath(basePath, path) {
    if (isExternal(path)) return path;
    return (
      '/' +
      [basePath, path]
        .filter((path) => !!path && path !== '/')
        .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
        .join('/')
    );
  }

  function getMenuItem(route, basePath = '') {
    let menuItem: any = {
      label: (route.meta && route.meta.title) || route.name,
      key: route.name,
      path: resolvePath(basePath, route.path),
      icon: getIcon(route.meta),
      order: route.meta?.order || 0,
    };

    const visibleChildren = route.children
      ? route.children.filter((item) => item.name && !item.hidden)
      : [];

    if (!visibleChildren.length) return menuItem;

    if (visibleChildren.length === 1) {
      // 单个子路由处理
      const singleRoute = visibleChildren[0];
      menuItem = {
        ...menuItem,
        label: singleRoute.meta?.title || singleRoute.name,
        key: singleRoute.name,
        path: resolvePath(menuItem.path, singleRoute.path),
        icon: getIcon(singleRoute.meta),
      };
      // 如果单个子路由还有子路由，那么就把子路由的子路由作为当前菜单的子路由
      const visibleItems = singleRoute.children
        ? singleRoute.children.filter((item) => item.name && !item.hidden)
        : [];
      if (visibleItems.length === 1) {
        menuItem = getMenuItem(visibleItems[0], menuItem.path);
      } else if (visibleItems.length > 1) {
        menuItem.children = visibleItems
          .map((item) => getMenuItem(item, menuItem.path))
          .sort((a, b) => a.order - b.order);
      }
    } else {
      // 多个子路由处理
      menuItem.children = visibleChildren
        .map((item) => getMenuItem(item, menuItem.path))
        .sort((a, b) => a.order - b.order);
    }
    return menuItem;
  }

  function getIcon(meta) {
    if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 });
    if (meta?.icon) return renderIcon(meta.icon, { size: 18 });
    return null;
  }

  function handleMenuSelect(item) {
    if (isExternal(item.path)) {
      window.open(item.path);
    } else {
      if (item.path === curRoute.path) {
        appStore.reloadPage();
      } else {
        //路由跳转
        router.push(item.path);
      }
    }
  }
</script>

<style lang="scss">
  .side-menu:not(.n-menu--collapsed) {
    .n-menu-item-content {
      &::before {
        left: 5px;
        right: 5px;
      }
      &.n-menu-item-content--selected,
      &:hover {
        &::before {
          border-left: 4px solid var(--primary-color);
        }
      }
    }
  }
</style>
