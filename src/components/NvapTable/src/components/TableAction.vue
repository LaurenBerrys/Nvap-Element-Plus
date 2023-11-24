<template>
	<div class="tableAction">
		<div class="flex items-center justify-center">
			<template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
				<el-button v-bind="action" class="mx-2">
					{{ action.label }}
					<template #icon v-if="action.hasOwnProperty('icon')">
						<the-icon :icon="action.icon" />
					</template>
				</el-button>
			</template>
			<el-dropdown v-if="dropDownActions && getDropdownList.length" trigger="hover" :options="getDropdownList" @select="select">
				<el-button v-bind="getMoreProps" class="mx-2" v-if="!$slots.more" icon-placement="right">
					<div class="flex items-center">
						<span>更多</span>
						<icon-system-uicons:chevron-down />
					</div>
				</el-button>
			</el-dropdown>
		</div>
	</div>
</template>

<script lang="ts" name="TableAction">
import { ActionItem } from '@/components/Table';
import { usePermission } from '@/hooks/web/usePermission';
import { isBoolean, isFunction } from '@/utils/is';
import { PropType } from 'vue';
export default defineComponent({
	name: 'TableAction',
	props: {
		actions: {
			type: Array as PropType<ActionItem[]>,
			default: null,
			required: true,
		},
		dropDownActions: {
			type: Array as PropType<ActionItem[]>,
			default: null,
		},
		// eslint-disable-next-line vue/no-reserved-props
		style: {
			type: String as PropType<String>,
			default: 'button',
		},
		select: {
			type: Function as PropType<Function> | any,
			default: () => {},
		},
	},
	setup(props) {
		const { hasPermission } = usePermission();

		const actionType = props.style === 'button' ? 'default' : props.style === 'text' ? 'primary' : 'default';
		const actionText = props.style === 'button' ? undefined : props.style === 'text' ? true : undefined;

		const getMoreProps: any = computed(() => {
			return {
				text: actionText,
				type: actionType,
				size: 'small',
			};
		});

		const getDropdownList: any = computed(() => {
			return (toRaw(props.dropDownActions) || [])
				.filter((action) => {
					return hasPermission(action.auth as string[]) && isIfShow(action);
				})
				.map((action) => {
					const { popConfirm } = action;
					return {
						size: 'small',
						text: actionText,
						type: actionType,
						...action,
						...popConfirm,
						onConfirm: popConfirm?.confirm,
						onCancel: popConfirm?.cancel,
					};
				});
		});

		function isIfShow(action: ActionItem): boolean {
			const ifShow: any = action.ifShow;
			let isIfShow = true;

			if (isBoolean(ifShow)) {
				isIfShow = ifShow;
			}
			if (isFunction(ifShow)) {
				isIfShow = ifShow(action);
			}
			return isIfShow;
		}

		const getActions: any = computed(() => {
			return (toRaw(props.actions) || [])
				.filter((action) => {
					return hasPermission(action.auth as string[]) && isIfShow(action);
				})
				.map((action) => {
					const { popConfirm } = action;
					//需要展示什么风格，自己修改一下参数
					return {
						size: 'small',
						text: actionText,
						type: actionType,
						...action,
						...(popConfirm || {}),
						onConfirm: popConfirm?.confirm,
						onCancel: popConfirm?.cancel,
						enable: !!popConfirm,
					};
				});
		});

		return {
			getActions,
			getDropdownList,
			getMoreProps,
		};
	},
});
</script>
@/components/NvapTable