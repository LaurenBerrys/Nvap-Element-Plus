<!--
 * @Author: Nie Chengyong
 * @Date: 2023-03-06 10:18:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 16:00:27
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/views/system/user/assignRoles/index.vue
 * @Description: 
 * 
-->
<template>
  <el-dialog>
    <template #default>
      <el-select v-model:value="roles" multiple>
        <el-option v-for="item in options" :key="item">
          {{ item.label }}
        </el-option>
      </el-select>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="assignRoles">
  // import { useModal } from '@/components/Modal/src/hooks/useModal';
  // const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
  //   title: '分配角色',
  // });
  const roles: any = ref([]);
  const options = ref([]);
  const user: any = ref({});
  const open = async (use, data, option) => {
    user.value = use;
    roles.value = data;
    options.value = option;
    // openModal();
  };
  defineExpose({
    open,
  });

  const okModal = async () => {
    const data = await updateUser(user.value.id, { roles: roles.value });
    if (data.code == 200) {
      // closeModal();
      window.$message.success('分配成功');
    } else {
      window.$message.error('分配失败');
      // setSubLoading(false);
    }
  };
</script>

<style scoped></style>
