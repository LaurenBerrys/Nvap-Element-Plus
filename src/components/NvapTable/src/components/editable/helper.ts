import { ComponentType } from '../../types/componentType';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'ElInput') return '请输入';
  if (
    ['ElPicker', 'ElSelect', 'ElCheckbox', 'ElRadio', 'ElSwitch', 'ElDatePicker', 'ElTimePicker'].includes(
      component
    )
  )
    return '请选择';
  return '';
}
