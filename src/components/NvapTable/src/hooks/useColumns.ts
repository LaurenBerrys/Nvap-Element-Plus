import { ref, Ref, ComputedRef, unref, computed, watch, toRaw, h } from 'vue';
import type { BasicColumn, NvapTableProps } from '../types/table';
import { isEqual, cloneDeep } from 'lodash-es';
import { isArray, isString, isBoolean, isFunction } from '@/utils/is';
import { usePermission } from '@/hooks/web/usePermission';
import { ActionItem } from '@/components/NvapTable/index';
import { renderEditCell } from '../components/editable';
import { ElTooltip, ElIcon } from 'element-plus';
import TheIconVue from '@/components/icon/TheIcon.vue';

export function useColumns(propsRef: ComputedRef<NvapTableProps>) {
	const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
	let cacheColumns = unref(propsRef).columns;

	const getColumnsRef = computed(() => {
		const columns = cloneDeep(unref(columnsRef));

		handleActionColumn(propsRef, columns);
		if (!columns) return [];
		return columns;
	});

	const { hasPermission } = usePermission();

	function isIfShow(action: ActionItem): boolean {
		const ifShow: any = action.ifShow;

		let isIfShow = true;

		if (isBoolean(ifShow)) {
			isIfShow = ifShow;
		}
		if (isFunction(ifShow)) {
			isIfShow = ifShow(action);
		}
		return isIfShow;
	}

	const renderTooltip = (trigger, content) => {
		return h(
			ElTooltip,
			{
				content: content,
			},
			{
				default: () => trigger,
			}
		);
	};

	const getPageColumns = computed(() => {
		const pageColumns = unref(getColumnsRef);
		const columns = cloneDeep(pageColumns);
		return columns
			.filter((column) => {
				//@ts-ignore
				return hasPermission(column.auth as string[]) && isIfShow(column);
			})
			.map((column) => {
				if (!column.ifShow) column.ifShow = true;
				const { edit } = column;
				if (edit) {
					column.editRender = renderEditCell(column);
					if (edit) {
						const title: any = column.label;
						column.renderHeader = () => {
							return renderTooltip(
								h('span', {}, [
									h('span', { style: { 'margin-right': '5px' } }, title),
									h(
										ElIcon,
										{
											size: 12,
										},
										{
											default: () => h(TheIconVue, { icon: 'system-uicons:create', size: 12 }),
										}
									),
								]),
								'该列可编辑'
							);
						};
					}
				}
				return column;
			});
	});

	watch(
		() => unref(propsRef).columns,
		(columns) => {
			columnsRef.value = columns;
			cacheColumns = columns;
		}
	);

	function handleActionColumn(propsRef: ComputedRef<NvapTableProps>, columns: BasicColumn[]) {
		const { actionColumn } = unref(propsRef);
		if (!actionColumn) return;
		!columns.find((col) => col.prop === 'action') &&
			columns.push({
				...(actionColumn as any),
			});
	}

	//设置
	function setColumns(columnList: string[]) {
		const columns: any[] = cloneDeep(columnList);
		if (!isArray(columns)) return;

		if (!columns.length) {
			columnsRef.value = [];
			return;
		}
		const cacheKeys = cacheColumns.map((item) => item.prop);
		//针对拖拽排序
		if (!isString(columns[0])) {
			columnsRef.value = columns;
		} else {
			const newColumns: any[] = [];
			cacheColumns.forEach((item) => {
				if (columnList.includes(item.prop)) {
					newColumns.push({ ...item });
				}
			});
			if (!isEqual(cacheKeys, columns)) {
				newColumns.sort((prev, next) => {
					return cacheKeys.indexOf(prev.prop) - cacheKeys.indexOf(next.prop);
				});
			}
			columnsRef.value = newColumns;
		}
	}

	//获取
	function getColumns(): BasicColumn[] {
		const columns = toRaw(unref(getColumnsRef));
		return columns.map((item) => {
			return {
				...item,
				label: item.label,
				prop: item.prop,
				fixed: item.fixed || undefined,
			};
		});
	}

	//获取原始
	function getCacheColumns(isKey?: boolean): any[] {
		return isKey ? cacheColumns.map((item) => item.prop) : cacheColumns;
	}

	//更新原始数据单个字段
	function setCacheColumnsField(key: string | undefined, value: Partial<BasicColumn>) {
		if (!key || !value) {
			return;
		}
		cacheColumns.forEach((item) => {
			if (item.prop === key) {
				Object.assign(item, value);
				return;
			}
		});
	}

	return {
		getColumnsRef,
		getCacheColumns,
		setCacheColumnsField,
		setColumns,
		getColumns,
		getPageColumns,
	};
}
