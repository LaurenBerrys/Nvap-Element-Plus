<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-07-05 17:41:20
 * @LastEditTime: 2023-07-06 17:19:22
 * @Description: 
-->
<template>
	<el-select v-bind="$attrs" :model-value="modelValue" @change="handleChange" filterable clearable>
		<el-option v-for="item in fetchOptions" :key="item.value" :label="item.label" :value="item.value" />
	</el-select>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchItemTree } from '@/api/admin/dict';
const prop = defineProps({
	modelValue: {
		default: () => {},
	},
	type: {
		type: String,
		default: '',
	},
});
const fetchOptions: any = ref();
// 设置数据字典默认的请求函数
const queryDictRe = async (type) => {
	return fetchItemTree({ dictType: type, size: 1000 }).then((res) => {
		const setLabelFuc = (listData) => {
			listData.forEach((item) => {
				item.label = item.name;
				if (Array.isArray(item.children)) {
					setLabelFuc(item.children);
				}
			});
		};
		const rtList = res?.data || [];
		setLabelFuc(rtList);
		return rtList;
	});
};
const emits = defineEmits(['update:modelValue', 'change']);
const handleChange = (value) => {
	emits('update:modelValue', value);
	emits('change', value);
};
onMounted(async () => {
	const data = await queryDictRe(prop.type);
	fetchOptions.value = data;
});
</script>

<style scoped></style>
