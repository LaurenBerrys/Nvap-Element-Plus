/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 10:32:38
 * @LastEditTime: 2023-10-11 16:54:45
 * @Description:
 */
import { StyleValue } from 'vue';
import { ComponentType } from './index';
import { Position, TipsPosition, ThemeType } from '@/enums';
/**
 * @description: 表单item
 * @param prop //字段名
 * @param label //标签名
 * @param labelMessage //标签名的提示信息
 * @param labelMessageStyle //标签名的提示信息的样式
 * @param placeholder //默认提示信息
 * @param defaultValue //默认值
 * @param component //组件名
 * @param componentProps //组件的属性
 * @param slot //插槽
 * @param rules //校验规则
 * @param suffix //组件后面跟着的插槽
 *
 * @return {*}
 */
export interface FormSchema {
	type?: string;
	disabled?: boolean;
	buttonLayout?: string;
	key?: string;
	prop: string;
	label?: string;
	labelMessage?: string;
	labelMessageStyle?: StyleValue;
	labelPosition?: Position;
	span?: number;
	defaultValue?: any;
	component?: ComponentType;
	componentProps?: object | any;
	itemShow?: boolean;
	slot?: string;
	rules?: object | object[];
	labelWidth?: number | string;
	required?: boolean;
	showMessage?: boolean;
	validateStatus?: '' | 'error' | 'validating' | 'success';
}

/**
 * @param model //表单的值
 * @param labelWidth //label宽度
 * @param schemas //配置表单
 * @param inline  //boolean 是否展示为行内表单
 * @param size //表单大小
 * @param offset 按钮位置 true在最后，false在最前面
 * @param labelPosition //表单标签的位置
 * @param showResetButton 是否显示重置按钮
 * @param showSubmitButton 是否显示提交按钮
 * @param submitButtonText 提交按钮名称
 * @param resetButtonText 重置按钮名称
 * @param disabled 是否禁用所有组件
 * @param hideRequiredAsterisk  是否显示必填字段的标签旁边的红色星号
 * @param requireAsteriskPosition 必填字段的标签旁边的红色星号的位置
 * @param showMessage 是否显示校验错误信息
 * @param validateOnRuleChange 是否在rules改变时立即校验
 * @param statusIcon 是否在输入框中显示校验结果反馈图标
 */
export interface FormProps {
	submitButtonType?: ThemeType;
	resetButtonType?: ThemeType;
	submitIcon?: string;
	resetIcon?: string;
	colShows?: number | null;
	buttonLayout?: Position;
	model?: Recordable;
	labelWidth?: number | string;
	schemas?: FormSchema[];
	size?: string;
	inline?: boolean;
	labelPosition?: Position;
	offset?: boolean;
	showResetButton?: boolean;
	showSubmitButton?: boolean;
	submitButtonText?: string;
	resetButtonText?: string;
	resetFunc?: () => Promise<void>;
	submitFunc?: () => Promise<void>;
	submitOnReset?: boolean;
	disabled?: boolean;
	notPlaceholder?: boolean;
	hideRequiredAsterisk?: boolean;
	requireAsteriskPosition?: TipsPosition;
	showMessage?: boolean;
	validateOnRuleChange?: boolean;
	statusIcon?: boolean;
	buttonSpan?: number;
	operation?: Operation[];
}

/**
 * @description: useForm的返回值
 * @param {*} setSchemas 设置表单
 * @param {*} submit 提交表单
 * @param {*} setProps 设置表单属性
 * @param {*} setFieldsValue 设置表单值
 * @param {*} clearValidate 清除表单验证
 * @param {*} getFieldsValue 获取表单值
 * @param {*} resetFields 重置表单
 * @param {*} validate 验证表单
 * @return {setSchemas,submit,setProps,setFieldsValue,clearValidate,getFieldsValue,resetFields,validate}
 */
export interface FormActionType {
	setSchemas: (name: string, value: any) => Promise<void>;
	submit: () => Promise<any>;
	setProps: (formProps: Partial<FormProps>) => Promise<void>;
	updateProps: (callback: any) => Promise<void>;
	setFieldsValue: (values: Recordable) => Promise<void>;
	clearValidate: (name?: string | string[]) => Promise<void>;
	getFieldsValue: () => Recordable;
	resetFields: () => Promise<void>;
	validate: (nameList?: any[]) => Promise<any>;
	operation?: Operation[];
}
/**
 * @description: 搜索扩展按钮配置
 * @param {*} label 按钮名称
 * @param {*} icon 按钮图标
 * @param {*} location 按钮位置
 * @param {*} loading 是否加载中
 * @param {*} disabled 是否禁用
 * @param {*} method 点击事件
 * @return { label,icon,location,disabled,method }
 */
export interface Operation {
	label: string;
	icon?: string;
	location?: 'prefix' | 'suffix';
	loading?: boolean;
	disabled?: boolean;
	type?: ThemeType;
	auth?: string;
	method?: () => any;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
