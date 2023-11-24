/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 17:20:47
 * @LastEditTime: 2023-06-06 17:22:05
 * @Description: 
 */
import { ComponentType } from './types/index';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
	if (component === 'ElInput') return '请输入';
	if ([
        'ElButton',
        'ElInputNumber',
        'ElSelect',
        'ElRadio',
        'ElCheckbox',
        'ElSwitch',
        'ElSlider',
        'ElDatePicker',
        'ElTimePicker',
        'ElRate',
        'ElColorPicker',
        'ElCascader',
        'ElTag',
    ].includes(component)) return '请选择';
	return '';
}

