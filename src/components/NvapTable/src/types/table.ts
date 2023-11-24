/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-02-09 09:16:58
 * @LastEditTime: 2023-10-08 15:12:30
 * @Description:
 */
// import type { Column } from 'element-plus';
import { ComponentType } from './componentType';
/**
 * @description: Column 表格列配置
 * @param {render} render 自定义渲染列，使用 Vue 函数式组件渲染方式
 * @param {editRender} editRender 自定义渲染列，使用 Vue 函数式组件渲染方式
 * @param {label} label 显示的标题
 * @param {prop} prop 列属性的 key，必填
 * @param {width} width 列宽度
 * @param {minWidth} minWidth 列最小宽度
 * @param {fixed} fixed 列是否固定在左侧或者右侧，true 表示固定在左侧
 * @param {align} align 对齐方式
 * @param {ellipsis} ellipsis 超过宽度将自动省略
 * @param {order} order 排序函数，本地排序使用一个函数即可
 * @param {customTitle} customTitle 自定义标题
 * @param {customRender} customRender  自定义渲染内容
 * @param {auth} auth 权限编码控制是否显示
 * @param {draggable} draggable 控制是否支持拖拽，默认支持
 * @param {edit} edit 是否开启编辑表格
 * @param {editRow} editRow 整行编辑，单元格是否开启编辑
 * @param {editable} editable 是否显示单元格编辑按钮
 * @param {editComponent} editComponent 单元格编辑组件
 * @param {editComponentProps} editComponentProps 单元格编辑组件props
 * @param {editRule} editRule 单元格编辑校验规则
 * @param {editValueMap} editValueMap 开启编辑时，单元格的值映射
 * @param {onEditRow} onEditRow 编辑事件
 */
export interface BasicColumn {
	render?: (...arg: any[]) => any;
	editRender?: (record: any, index: any) => any;
	tooltipOptions?: any;
	dict?: string; //字典字段
	slotName?: string;
	align?: 'left' | 'center' | 'right';
	sortable?: boolean | 'custom';
	sortMethod?: Function;
	renderHeader?: Function;
	columnKey?: string;
	type?: 'index' | 'selection' | 'expand' | 'dict';
	index?: number | ((...arg: any[]) => number);
	fixed?: boolean | 'left' | 'right';
	width?: number | string;
	minWidth?: number;
	label?: string;
	prop?: string;
	edit?: boolean;
	editRow?: boolean;
	editable?: boolean;
	editComponent?: ComponentType;
	editComponentProps?: Recordable;
	editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
	editValueMap?: (value: any) => string;
	onEditRow?: () => void;
	auth?: string[];
	ifShow?: boolean | ((column: BasicColumn) => boolean);
	draggable?: boolean;
	placeHolder?: string;
	children?: BasicColumn[];
}

export interface TableActionType {
	reload: (opt) => Promise<void>;
	emit?: any;
	getColumns: (opt?) => BasicColumn[];
	setColumns: (columns: BasicColumn[] | string[]) => void;
}

export interface NvapTableProps {
	title?: string;
	dataSource: Function;
	columns: any[];
	pagination: object;
	showPagination: boolean;
	actionColumn: any[];
	canResize: boolean;
	resizeHeightOffset: number;
	loading: boolean;
	Height?: number;
	selection?: boolean;
	index?: boolean;
	indexFiexd?: 'left' | 'right' | null;
}
