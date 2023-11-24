/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 11:08:58
 * @LastEditTime: 2023-06-06 15:34:23
 * @Description:
 */

import type { Component } from 'vue';
import {
	ElButton,
	ElInput,
	ElInputNumber,
	ElSelect,
	ElRadio,
	ElCheckbox,
	ElSwitch,
	ElSlider,
	ElDatePicker,
	ElTimePicker,
	ElRate,
	ElColorPicker,
	ElCascader,
	ElTag,
} from 'element-plus';

import type { ComponentType } from './types/index';
const componentMap = new Map<ComponentType, Component>();
componentMap.set('ElButton', ElButton);
componentMap.set('ElInput', ElInput);
componentMap.set('ElInputNumber', ElInputNumber);
componentMap.set('ElSelect', ElSelect);
componentMap.set('ElRadio', ElRadio);
componentMap.set('ElCheckbox', ElCheckbox);
componentMap.set('ElSwitch', ElSwitch);
componentMap.set('ElSlider', ElSlider);
componentMap.set('ElDatePicker', ElDatePicker);
componentMap.set('ElTimePicker', ElTimePicker);
componentMap.set('ElRate', ElRate);
componentMap.set('ElColorPicker', ElColorPicker);
componentMap.set('ElCascader', ElCascader);
componentMap.set('ElTag', ElTag);

export function add(compName: ComponentType, component: Component) {
	componentMap.set(compName, component);
}
export function del(compName: ComponentType) {
	componentMap.delete(compName);
}

export { componentMap };
