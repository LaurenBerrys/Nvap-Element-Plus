/*
 * @Editors: Nie Chengyong
 * @Date: 2023-02-09 09:16:58
 * @LastEditTime: 2023-06-26 14:41:43
 * @Description:
 */
import { ElButton } from 'element-plus';
import type { Component } from 'vue';
export interface PermissionsEnum {
  value: string;
  label: string;
}
export interface ActionItem extends Partial<InstanceType<typeof ElButton>> {
  onClick?: Fn;
  label?: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
  // 设定 color 后会覆盖 type 的样式
  color?: string;
  icon?: Component;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: PermissionsEnum | PermissionsEnum[] | string | string[];
  // 业务控制是否显示
  // eslint-disable-next-line no-unused-vars
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: Component;
}

