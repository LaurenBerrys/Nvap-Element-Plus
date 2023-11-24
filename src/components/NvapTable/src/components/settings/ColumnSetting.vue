<template>
  <el-tooltip trigger="hover">
    <template #content>
      <span>列设置</span>
    </template>
    <div class="cursor-pointer table-toolbar-right-icon">
      <el-popover trigger="click" :width="230" class="toolbar-popover" placement="bottom-end">
        <template #reference>
          <icon-system-uicons:settings />
        </template>
        <div class="table-toolbar-inner-popover-title">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="onCheckAll"
            >列展示</el-checkbox
          >
          <!-- <el-checkbox v-model="selection" @change="onSelection">勾选列</el-checkbox> -->
          <!-- <el-button ml-5 mb-1 type="primary" size="small" @click="resetColumns">重置</el-button> -->
        </div>
        <div class="table-toolbar-inner" style="height: 350px; overflow-y: scroll">
          <el-checkbox-group h-full v-model:model-value="checkList" @change="onChange">
            <Draggable
              style="height: 100%"
              v-model="columnsList"
              animation="300"
              item-key="key"
              filter=".no-draggable"
              :move="onMove"
              @end="draggableEnd"
            >
              <template #item="{ element }">
                <div
                  class="table-toolbar-inner-checkbox"
                  :class="{
                    'no-draggable': element.draggable === false,
                  }"
                >
                  <icon-system-uicons:move
                    w-5
                    h-5
                    class="drag-icon"
                    :class="{
                      'drag-icon-hidden': element.draggable === false,
                    }"
                  />
                  <el-checkbox :label="element.prop">
                    {{ element.label }}
                  </el-checkbox>
                  <div class="fixed-item">
                    <el-tooltip trigger="hover" placement="bottom">
                      <template #content>
                        <span>固定到左侧</span>
                      </template>
                      <icon-system-uicons:push-left
                        w-5
                        h-5
                        :color="element.fixed === 'left' ? '#2080f0' : undefined"
                        class="cursor-pointer"
                        @click="fixedColumn(element, 'left')"
                      />
                    </el-tooltip>
                    <el-divider direction="vertical" />
                    <el-tooltip trigger="hover" placement="bottom">
                      <template #content>
                        <span>固定到右侧</span>
                      </template>
                      <icon-system-uicons:push-right
                        w-5
                        h-5
                        :color="element.fixed === 'right' ? '#2080f0' : undefined"
                        class="cursor-pointer"
                        @click="fixedColumn(element, 'right')"
                      />
                    </el-tooltip>
                  </div>
                </div>
              </template>
            </Draggable>
          </el-checkbox-group>
        </div>
      </el-popover>
    </div>
  </el-tooltip>
</template>

<script lang="ts">
  import { useTableContext } from '../../hooks/useTableContext';
  import Draggable from 'vuedraggable';

  interface Options {
    title: string;
    key: string;
    fixed?: boolean | 'left' | 'right';
  }

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      Draggable,
    },
    setup() {
      const isIndeterminate = ref(true);
      const table: any = useTableContext();
      const columnsList = ref<Options[]>([]);
      const cacheColumnsList = ref<Options[]>([]);

      const state = reactive({
        selection: false,
        checkAll: true,
        checkList: [],
        defaultCheckList: [],
      });

      const getSelection = computed(() => {
        return state.selection;
      });

      watchEffect(() => {
        const columns = table.getColumns();
        if (columns.length) {
          init();
        }
      });

      //初始化
      function init() {
        const columns: any[] = getColumns();
        const checkList: any = columns.map((item) => item.prop);
        state.checkList = checkList;
        state.defaultCheckList = checkList;
        const newColumns = columns;
        if (!columnsList.value.length) {
          columnsList.value = cloneDeep(newColumns);
          cacheColumnsList.value = cloneDeep(newColumns);
        }
      }
      //切换
      function onChange(checkList) {
        if (state.selection) {
          checkList.unshift('selection');
        }
        setColumns(checkList);
      }

      //设置
      function setColumns(columns) {
        table.setColumns(columns);
      }

      //获取
      function getColumns() {
        let newRet: any[] = [];
        table.getColumns().forEach((item) => {
          newRet.push({ ...item });
        });
        return newRet;
      }

      //重置
      function resetColumns() {
        state.checkList = [...state.defaultCheckList];
        state.checkAll = true;
        let cacheColumnsKeys: any[] = table.getCacheColumns();
        let newColumns = cacheColumnsKeys.map((item) => {
          return {
            ...item,
            fixed: undefined,
          };
        });
        setColumns(newColumns);
        columnsList.value = newColumns;
      }

      //全选
      function onCheckAll(e) {
        isIndeterminate.value = false;
        let checkList = table.getCacheColumns(true);
        if (e) {
          setColumns(checkList);
          state.checkList = checkList;
        } else {
          setColumns([]);
          state.checkList = [];
        }
      }

      //拖拽排序
      function draggableEnd() {
        const newColumns = toRaw(unref(columnsList));
        // newColumns.push({
        // 	prop: 'action',
        // 	label: '操作',
        // })
        columnsList.value = newColumns;
        setColumns(newColumns);
      }

      //勾选列
      function onSelection() {
        // table.getBindValues.selection = e;
      }

      function onMove(e) {
        if (e.draggedContext.element.draggable === false) return false;
        return true;
      }

      //固定
      function fixedColumn(item: any, fixed) {
        //@ts-ignore
        if (!state.checkList.includes(item.prop)) return;
        let columns = getColumns();
        const isFixed = item.fixed === fixed ? undefined : fixed;
        let index = columns.findIndex((res) => res.prop === item.prop);
        if (index !== -1) {
          columns[index].fixed = isFixed;
        }
        table.setCacheColumnsField(item.prop, { fixed: isFixed });
        columnsList.value[index].fixed = isFixed;
        setColumns(columns);
      }

      return {
        isIndeterminate,
        ...toRefs(state),
        columnsList,
        onChange,
        onCheckAll,
        onSelection,
        onMove,
        resetColumns,
        fixedColumn,
        draggableEnd,
        getSelection,
      };
    },
  });
</script>

<style lang="scss">
  .table-toolbar {
    &-inner-popover-title {
      padding: 3px 0;
    }

    &-right {
      &-icon {
        margin-left: 12px;
        font-size: 16px;
        color: var(--text-color);
        cursor: pointer;

        :hover {
          color: #1890ff;
        }
      }
    }
  }

  .table-toolbar-inner {
    &-checkbox {
      display: flex;
      align-items: center;
      padding: 10px 14px;

      &:hover {
        background: #e6f7ff;
      }

      .drag-icon {
        display: inline-flex;
        margin-right: 8px;
        cursor: move;
        &-hidden {
          visibility: hidden;
          cursor: default;
        }
      }

      .fixed-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
      }

      .ant-checkbox-wrapper {
        flex: 1;

        &:hover {
          color: #1890ff !important;
        }
      }
    }

    &-checkbox-dark {
      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }
    }
  }

  .toolbar-popover {
    .n-popover__content {
      padding: 0;
    }
  }
</style>
