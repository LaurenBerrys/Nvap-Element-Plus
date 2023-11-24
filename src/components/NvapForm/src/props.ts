/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 10:32:16
 * @LastEditTime: 2023-09-26 14:10:17
 * @Description:
 */
import type { PropType } from 'vue';
import { FormSchema } from './types/form';
export const nvapProps = {
	// 标签宽度  固定宽度
	labelWidth: {
		type: [Number, String] as PropType<number | string>,
		default: null,
	},
	// 表单配置规则
	schemas: {
		type: [Array] as PropType<FormSchema[]>,
		default: () => [],
	},
	// 表单大小
	size: {
		type: String as PropType<string>,
		default: 'default',
	},
	// 表单标签的位置
	labelPotions: {
		type: String as PropType<string>,
	},
	// 是否展示为行内表单
	inline: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	// 按钮位置 true在最后，false在最前面
	offset: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	// 是否显示重置按钮
	showResetButton: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	// 是否显示提交按钮
	showSubmitButton: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	// 提交按钮名称
	submitButtonText: {
		type: String as PropType<string>,
		default: '查询',
	},
	// 重置按钮名称
	resetButtonText: {
		type: String as PropType<string>,
		default: '重置',
	},
	// 是否禁用所有组件
	disabled: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	// 是否显示必填字段的标签旁边的红色星号
	hideRequiredAsterisk: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	// 必填字段的标签旁边的红色星号的位置
	requireAsteriskPosition: {
		type: String as PropType<string>,
		default: 'right',
	},
	// 是否显示校验错误信息
	showMessage: {
		type: Boolean as PropType<boolean>,
		default: true,
	},
	// 是否在rules改变时立即校验
	validateOnRuleChange: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	// 是否在输入框中显示校验结果反馈图标
	statusIcon: {
		type: Boolean as PropType<boolean>,
		default: false,
	},
	buttonLayout: {
		type: String as PropType<string>,
		default: 'right',
	},
	colShows: {
		type: String as PropType<string>,
		default: null,
	},
	submitIcon: {
		type: String as PropType<string>,
		// default: 'ep:search',
		default:''
	},
	resetIcon: {
		type: String as PropType<string>,
		// default: 'ep:refresh',
		default:''
	},
	buttonSpan: {
		type: Number as PropType<number>,
		default: 24,
	},
	submitButtonType: {
		type: String as PropType<string>,
		default: ThemeType.primary,
	},
	resetButtonType: {
		type: String as PropType<string>,
		default: undefined,
	},
};
