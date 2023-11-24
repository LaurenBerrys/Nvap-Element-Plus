/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-26 11:29:15
 * @LastEditTime: 2023-07-18 15:11:14
 * @Description:
 */
import type { Component } from 'vue';
import { ElInput, ElSelect, ElCheckbox, ElSwitch, ElDatePicker, ElTimePicker } from 'element-plus';
import type { ComponentType } from './types/componentType';

const componentMap = new Map<ComponentType, Component>();
componentMap.set('ElInput', ElInput);
componentMap.set('ElSelect', ElSelect);
componentMap.set('ElSwitch', ElSwitch);
componentMap.set('ElCheckbox', ElCheckbox);
componentMap.set('ElDatePicker', ElDatePicker);
componentMap.set('ElTimePicker', ElTimePicker);

export enum EventEnum {
	ElInput = 'oninput',
	ElSelect = 'on-update:value',
	ElSwitch = 'on-update:value',
	ElCheckbox = 'on-update:value',
	ElDatePicker = 'on-update:value',
	ElTimePicker = 'on-update:value',
}
export function add(compName: ComponentType, component: Component) {
	componentMap.set(compName, component);
}

export function del(compName: ComponentType) {
	componentMap.delete(compName);
}

export { componentMap };
