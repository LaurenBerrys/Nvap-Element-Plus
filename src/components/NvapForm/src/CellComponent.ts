/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 11:08:49
 * @LastEditTime: 2023-06-06 15:34:12
 * @Description: 
 */
import type { FunctionalComponent, defineComponent } from 'vue';
import type { ComponentType } from './types/index';
import { componentMap } from './componentMap';

export interface ComponentProps {
  is: ComponentType;
  component: ComponentType;
  rule: boolean;
  popoverVisible: boolean;
  ruleMessage: string;
}

export const CellComponent: FunctionalComponent = ({ is }: ComponentProps, { attrs }) => {
  const Comp = componentMap.get(is) as typeof defineComponent;
  const DefaultComp = h(Comp, attrs);
  return DefaultComp;
};
