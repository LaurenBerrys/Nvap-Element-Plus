/*
 * @Author: Nie Chengyong
 * @Date: 2023-02-09 09:16:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-26 14:02:42
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/components/Table/src/props.ts
 * @Description:
 *
 */
import type { PropType } from 'vue';
import { BasicColumn } from './types/table';
export const nvapProps = {
	index: {
		type: Boolean,
		default: false,
	},
	selection: {
		type: Boolean,
		default: false,
	},
	title: {
		type: String,
		default: null,
	},
	titleTooltip: {
		type: String,
		default: null,
	},
	indexFiexd: {
		type: String ,
		default: 'left',
	},
	size: {
		type: String,
		default: 'default',
	},
	dataSource: {
		type: [Object],
		default: () => [],
	},
	columns: {
		type: [Array] as PropType<BasicColumn[]>,
		default: () => [],
		required: true,
	},
	beforeRequest: {
		type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
		default: null,
	},
	request: {
		type: Function as PropType<(...arg: any[]) => Promise<any>>,
		default: null,
	},
	afterRequest: {
		type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
		default: null,
	},
	rowKey: {
		type: [String, Function] as PropType<string | ((record) => string)>,
		default: undefined,
	},
	pagination: {
		type: [Object, Boolean],
		default: () => {},
	},
	showSummary: {
		type: Boolean,
		default: false,
	},
	spanMethod:{
		type: Function,
		default: null,
	},
	summaryMethod: {
		type: Function,
		default: null,
	},
	showPagination: {
		type: Boolean,
		default: true,
	},
	actionColumn: {
		type: Object as PropType<BasicColumn>,
		default: null,
	},
	canResize: {
		type: Boolean,
		default: true,
	},
	resizeHeightOffset: {
		type: Number,
		default: 0,
	},
	maxHeight: {
		type: Number,
		default: 0,
	},
};
