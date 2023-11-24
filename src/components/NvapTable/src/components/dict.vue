<!--
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-07-06 16:47:27
 * @LastEditTime: 2023-09-05 17:56:35
 * @Description: 
-->
<template>
	<div>{{ span ? span : placeHolder }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
	data: {
		type: String,
		default: '',
	},
	type: {
		type: String,
		default: '',
	},
	placeHolder: {
		type: String,
		default: '',
	},
});
const span = ref();
const handleFinde=(list,res)=>{
	let state =false
		list.filter(item=>{
				if(item.value==res){
					span.value=item.label || item.name;
					state=true
				}else if(item.children){
					handleFinde(item.children,res)
				}
			})
			return state
}
const LabelSpan = async (type: string, row: string) => {
	const Date = useTableList();
	let state = false;
	if (row) {
		Date.list.filter((item) => {
			if (item.name == type) {
				state= handleFinde(item.data,row)
			}
		});
	} else {
		span.value = row;
		state = true;
	}
	if (!state) {
		const data = await queryDictRe(type);
		await Date.setList({ name: type, data }, type);
		state= handleFinde(data,row)
		if(!state){
			span.value = row;
		}
	}
};
watch(
	() => props.data,
	async () => {
		await LabelSpan(props.type, props.data);
	}
);
onMounted(async () => {
	await nextTick();
	await LabelSpan(props.type, props.data);
});
</script>

<style scoped></style>
