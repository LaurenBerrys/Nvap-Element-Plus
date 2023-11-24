/*
 * @Author: Nie Chengyong
 * @Date: 2023-02-09 09:16:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-22 15:25:50
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/components/Table/src/components/editable/CellComponent.ts
 * @Description:
 *
 */
import type { FunctionalComponent, defineComponent } from 'vue';
import type { ComponentType } from '../../types/componentType';
import { componentMap } from '@/components/NvapTable/src/componentMap';

export interface ComponentProps {
	component: ComponentType & string;
	rule: boolean;
	popoverVisible: boolean;
	ruleMessage: string;
}

export const CellComponent: FunctionalComponent = ({ component = 'ElInput', rule = true, ruleMessage }: ComponentProps, { attrs }) => {
	const Comp = componentMap.get(component) as typeof defineComponent;
	const DefaultComp = h(Comp, attrs);
	if (!rule) {
		return DefaultComp;
	}
	return h(DefaultComp, {
		default: () =>
			h(
				'span',
				{
					style: {
						color: 'red',
						width: '90px',
						display: 'inline-block',
					},
				},
				{
					default: () => ruleMessage,
				}
			),
	});
};
