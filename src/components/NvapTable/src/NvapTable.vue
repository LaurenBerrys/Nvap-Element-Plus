<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-7-3 10:32:01
 * @LastEditTime: 2023-11-17 10:44:24
 * @Description: 表格组件
-->
<template>
	<!-- <div class="table-select"> -->
	<slot name="tableSelect"></slot>
	<!-- </div> -->
	<div class="table-toolbar" bg-red>
		<!--顶部左侧区域-->
		<div class="flex items-center table-toolbar-left">
			<slot name="tableButton"></slot>
		</div>

		<div class="flex items-center table-toolbar-right">
			<!--顶部右侧区域-->
			<slot name="toolbar"></slot>
			<!--斑马纹-->
			<el-tooltip trigger="hover">
				<template #content>
					<span>表格斑马纹</span>
				</template>
				<div class="mr-2 table-toolbar-right-icon">
					<el-switch v-model="isStriped" @change="setStriped" />
				</div>
			</el-tooltip>
			<el-divider direction="vertical" />
			<!--刷新-->
			<el-tooltip trigger="hover">
				<template #content>
					<span>刷新</span>
				</template>
				<div class="table-toolbar-right-icon" @click="reload">
					<icon-system-uicons:refresh />
				</div>
			</el-tooltip>
			<el-divider direction="vertical" />
			<!--密度-->
			<el-tooltip trigger="hover">
				<template #content>
					<span>密度</span>
				</template>
				<div class="table-toolbar-right-icon">
					<el-dropdown @command="densitySelect" trigger="click" v-model:value="tableSize">
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item v-for="item in densityOptions" :key="item.key" :command="item.key">
									{{ item.label }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
						<icon-system-uicons:expand-height />
					</el-dropdown>
				</div>
			</el-tooltip>
			<el-divider direction="vertical" />
			<!--表格设置单独抽离成组件-->
			<ColumnSetting />
		</div>
	</div>
	<div class="s-table" :style="{ height: getBindValues.Height + 'px!important' }">
		<el-table
			border
			scrollbar-always-on
			v-loading="getBindValues.loading"
			ref="NvapTabel"
			@selection-change="handleSelectionChange"
			v-bind="getBindValues"
			:stripe="isStriped"
			:cell-style="{ textAlign: 'center' }"
			:header-cell-style="{
				textAlign: 'center',
				background: 'var(--el-table-row-hover-bg-color)',
				color: 'var(--el-text-color-primary)',
			}"
		>
			<el-table-column reserve-selection :type="'selection'" fixed="left" v-if="getBindValues.selection" />
			<el-table-column
				prop="index"
				:fixed="getBindValues.indexFiexd"
				align="center"
				width="60"
				label="序号"
				v-if="getBindValues.index && getBindValues.indexFiexd != null"
			>
				<template #default="scope">
					<div v-if="!scope.row.index">
						{{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
					</div>
					<div v-else>
						{{ scope.row.index }}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="index" align="center" width="60" label="序号" v-if="getBindValues.index && getBindValues.indexFiexd == null">
				<template #default="scope">
					<div v-if="!scope.row.index">
						{{ (pagination.page - 1) * pagination.pageSize + scope.$index + 1 }}
					</div>
					<div v-else>
						{{ scope.row.index }}
					</div>
				</template>
			</el-table-column>
			<template v-for="(item, index) in getBindValues.columns" :key="item">
				<el-table-column v-if="item.type === 'dict'" v-bind="item" align="center" show-overflow-tooltip>
					<template #default="scope">
						<Dict :placeHolder="item.placeHolder" :data="scope.row[item.prop!]" :type="item.dict" />
					</template>
				</el-table-column>
				<el-table-column v-else v-bind="item" align="center" show-overflow-tooltip>
					<template #default="scope" v-if="item.ifShow && !item.children">
						<Suspense>
							<slot :name="item.slotName" :row="scope.row">
								<component v-if="item.editRender" :is="item.editRender(scope.row, scope.$index)" :key="index" />
								<component v-else-if="item.render" :is="item.render(scope.row, scope.$index)" />
								<span v-else>
									{{ scope.row[item.prop!] }}
								</span>
							</slot>
						</Suspense>
					</template>
					<template v-if="item.children">
						<el-table-column v-for="(ruse, indexs) in item.children" :key="indexs" v-bind="ruse" align="center" show-overflow-tooltip>
							<template #default="scope">
								<Suspense>
									<slot :name="ruse.slotName" :row="scope.row">
										<component v-if="ruse.editRender" :is="ruse.editRender(scope.row, scope.$index)" :key="index" />
										<component v-else-if="ruse.render" :is="ruse.render(scope.row, scope.$index)" />
										<span v-else>
											{{ scope.row[ruse.prop!] }}
										</span>
									</slot>
								</Suspense>
							</template>
						</el-table-column>
					</template>
				</el-table-column>
			</template>
			<template #append>
					<slot name="appends"></slot>
			</template>
		</el-table>
		<div  w-full flex justify-end items-center v-show="getBindValues.showPagination">
			<el-pagination
				pr-10px	
				background
				prev-text="上一页"
				next-text="下一页"
				@size-change="updatePageSize"
				@current-change="updatePage"
				:current-page="pagination.page"
				:page-size="pagination.pageSize"
				:page-sizes="pagination.pageSizes"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pagination.pageCount"
			/>
		</div>
	</div>
</template>

<script lang="ts" name="NvapTable">
import { createTableContext } from './hooks/useTableContext';
import Dict from './components/dict.vue';
import ColumnSetting from './components/settings/ColumnSetting.vue';

import { useLoading } from './hooks/useLoading';
import { useColumns } from './hooks/useColumns';
import { useDataSource } from './hooks/useDataSource';
import { usePagination } from './hooks/usePagination';

import { nvapProps } from './props';
import { NvapTableProps } from './types/table';

import { getViewportOffset } from './components/editable/domUtils';
import { useWindowSizeFn } from './hooks/useWindowSizeFn';

const densityOptions: any = [
	{
		type: 'menu',
		label: '紧凑',
		key: 'small',
	},
	{
		type: 'menu',
		label: '默认',
		key: 'default',
	},
	{
		type: 'menu',
		label: '宽松',
		key: 'large',
	},
];

export default defineComponent({
	name: 'NvapTable',
	components: {
		ColumnSetting,
		// QuestionCircleOutlined,
	},
	props: { ...nvapProps },
	emits: ['fetch-success', 'fetch-error', 'update:checked-row-keys', 'edit-end', 'edit-cancel', 'edit-row-end', 'edit-change'],
	setup(props, { emit }) {
		const deviceHeight = ref(150);
		const NvapTabel = ref<ComponentRef>(null);
		const wrapRef = ref<Nullable<HTMLDivElement>>(null);
		const isStriped = ref(false);
		const tableData = ref<Recordable[]>([]);
		const innerPropsRef = ref<Partial<NvapTableProps>>();
		const getProps = computed(() => {
			return { ...props, ...unref(innerPropsRef) } as NvapTableProps;
		});
		console.log(getProps.value, 'getPropsgetPropsgetProps');

		const { getLoading, setLoading } = useLoading(getProps);

		const { getPaginationInfo, setPagination } = usePagination(getProps);

		const { getDataSourceRef, getDataSource, getRowKey, reload, setTableData } = useDataSource(
			getProps,
			{
				getPaginationInfo,
				setPagination,
				tableData,
				setLoading,
			},
			emit
		);
		const { getPageColumns, setColumns, getColumns, getCacheColumns, setCacheColumnsField } = useColumns(getProps);
		const state = reactive({
			tableSize: unref(getProps as any).size || 'medium',
			isColumnSetting: false,
		});

		//页码切换
		function updatePage(page) {
			setPagination({ page: page });
			reload();
		}

		//分页数量切换
		function updatePageSize(size) {
			setPagination({ page: 1, pageSize: size });
			reload();
		}

		//密度切换
		function densitySelect(e) {
			state.tableSize = e;
		}

		//选中行
		function handleSelectionChange(rowKeys) {
			emit('update:checked-row-keys', unref(rowKeys));
		}
		//获取表格大小
		const getTableSize = computed(() => state.tableSize);

		//组装表格信息
		const getBindValues = computed(() => {
			const tableData = unref(getDataSourceRef);
			const maxHeight = tableData.length ? `${unref(deviceHeight)}px` : 'auto';
			return {
				...unref(getProps),
				loading: unref(getLoading),
				columns: toRaw(unref(getPageColumns)),
				rowKey: unref(getRowKey),
				data: tableData,
				size: unref(getTableSize),
				remote: true,
				'max-height': getProps.value.maxHeight || maxHeight,
			};
		});

		//获取分页信息
		const pagination: any = computed(() => toRaw(unref(getPaginationInfo)));

		function setProps(props: Partial<NvapTableProps>) {
			innerPropsRef.value = { ...unref(innerPropsRef), ...props };
		}

		const setStriped = (value: boolean) => (isStriped.value = value);

		const tableAction = {
			reload,
			setColumns,
			setLoading,
			setProps,
			getColumns,
			getPageColumns,
			getCacheColumns,
			setCacheColumnsField,
			setTableData,
			emit,
		};
		const getCanResize = computed(() => {
			const { canResize } = unref(getProps);
			return canResize;
		});
		async function computeTableHeight() {
			const table = unref(NvapTabel);
			if (!table) return;
			if (!unref(getCanResize)) return;
			const tableEl: any = table?.$el;
			const headEl = tableEl.querySelector('.el-table__header > thead');
			const { bottomIncludeBody } = getViewportOffset(headEl);
			const headerH = 64;
			let paginationH = 2;
			let marginH = getProps.value.showPagination ? 24 : -24;
			let height = bottomIncludeBody - (headerH + paginationH + marginH + (props.resizeHeightOffset || 0));
			const maxHeight = props.maxHeight;
			height = maxHeight && maxHeight < height ? maxHeight : height;
			if (height < 0) {
				setTimeout(() => {
					computeTableHeight();
				}, 200);
			} else {
				deviceHeight.value = height;
			}
		}
		useWindowSizeFn(computeTableHeight, 300, { immediate: true });
		watch(
			() => getProps.value.showPagination,
			() => {
				computeTableHeight();
			}
		);
		onMounted(async () => {
			await nextTick();
			computeTableHeight();
		});
		createTableContext({ ...tableAction, wrapRef, getBindValues });
		return {
			setTableData,
			...toRefs(state),
			NvapTabel,
			getBindValues,
			getDataSource,
			densityOptions,
			reload,
			densitySelect,
			updatePage,
			updatePageSize,
			pagination,
			tableAction,
			setStriped,
			isStriped,
			handleSelectionChange,
			getProps,
			setColumns,
		};
	},
});
</script>
<style lang="scss" scoped>
:deep(.el-table td.el-table__cell > .cell) {
	display: block;
}
:deep(.btn-prev) {
	background-color: var(--el-color-primary) !important;
	color: #fff !important;
	padding: 0 10px;
	:hover {
		color: #eee !important;
	}
}
:deep(.btn-next) {
	background-color: var(--el-color-primary) !important;
	color: #fff !important;
	padding: 0 10px;
	:hover {
		color: #eee !important;
	}
}
.table-select {
	display: flex;
	padding: 0 0 16px 0;
	flex-wrap: wrap;
	margin-bottom: 10px;
}
.table-toolbar {
	display: flex;
	justify-content: space-between;
	padding: 0 0 16px 0;

	&-left {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex: 1;

		&-title {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			font-size: 16px;
			font-weight: 600;
		}
	}

	&-right {
		display: flex;
		justify-content: flex-end;
		flex: 1;

		&-icon {
			margin-left: 12px;
			font-size: 16px;
			cursor: pointer;
			color: var(--text-color);

			:hover {
				color: #1890ff;
			}
		}
	}
}

.table-toolbar-inner-popover-title {
	padding: 2px 0;
}
.s-table {
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-bottom: 20px;
}
</style>
