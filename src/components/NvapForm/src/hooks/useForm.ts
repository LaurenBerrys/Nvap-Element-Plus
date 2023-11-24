/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 15:35:09
 * @LastEditTime: 2023-11-22 15:44:49
 * @Description:
 */

import type { FormProps, FormActionType, UseFormReturnType } from '../types/form';
export function useForm(props: FormProps): UseFormReturnType {
	const formRef = ref<Nullable<FormActionType>>(null);
	const loadedRef = ref<Nullable<boolean>>(false);

	async function getForm() {
		const form = unref(formRef);
		if (!form) {
			// eslint-disable-next-line no-console
			console.error('The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!');
		}
		await nextTick();
		return form as FormActionType;
	}
	function register(instance: FormActionType) {
		onUnmounted(() => {
			formRef.value = null;
			loadedRef.value = null;
		});
		if (unref(loadedRef) && instance === unref(formRef)) return;
		formRef.value = instance;
		loadedRef.value = true;
		watch(
			() => props,
			() => {
				props && instance.setProps(getDynamicProps(props));
			},
			{
				immediate: true,
				deep: true,
			}
		);
	}

	const methods: FormActionType = {
		/**
		 * @description: 设置表单
		 * @param {*} name 表单中的prop字段名
		 * @param {*} value 根据prop字段名找到对象，存入值
		 */
		setSchemas: async (name, value) => {
			const form = await getForm();
			await form.setSchemas(name, value);
		},
		/**
		 * @description: 修改useForm传入的值
		 * @param {Partial} formProps
		 */
		setProps: async (formProps: Partial<FormProps>) => {
			const form = await getForm();
			await form.setProps(formProps);
		},
		/**
		 * @description: 更新useForm传入的值
		 * @param {Partial} formProps
		 */
		updateProps: async (callback: any) => {
			const form = await getForm();
			await form.updateProps(callback);
		},
		//重置表单
		resetFields: async () => {
			getForm().then(async (form) => {
				await form.resetFields();
			});
		},

		clearValidate: async (name?: string | string[]) => {
			const form = await getForm();
			await form.clearValidate(name);
		},
		//获取表单值
		getFieldsValue: <T>() => {
			return unref(formRef)?.getFieldsValue() as T;
		},
		//设置表单值
		setFieldsValue: async <T>(values: T) => {
			const form = await getForm();
			//@ts-expect-error
			await form.setFieldsValue<T>(values);
		},
		//提交按钮
		submit: async (): Promise<any> => {
			const form = await getForm();
			return form.submit();
		},
		//验证表单
		validate: async (nameList?: any[]): Promise<Recordable> => {
			const form = await getForm();
			return form.validate(nameList);
		},
	};

	return [register, methods];
}
