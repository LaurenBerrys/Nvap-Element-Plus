/*
 * @Author: Nie Chengyong
 * @Date: 2023-03-01 16:13:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-24 15:58:44
 * @FilePath: /nestjs-ts-vue3-vite/vue3/src/views/system/user/userColumns.ts
 * @Description:
 *
 */
import { FormSchema } from '@/components/NvapForm/index';
import { TableAction } from '@/components/NvapTable';
export const columns = [
  {
    label: 'id',
    prop: 'id',
  },
  {
    label: '用户名称',
    prop: 'name',
  },
  {
    label: '角色',
    prop: 'roles',
  },
];
export const action = (handeone, hand) => {
  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: [
          {
            label: '配置角色',
            onClick: handeone.bind(null, record),
            ifShow: () => {
              return true;
            },
            // auth: ["basic_list"],
          },
          {
            label: '删除',
            onClick: hand.bind(null, record),
            ifShow: () => {
              return true;
            },
            // auth: ["basic_list"],
          },
        ],
      });
    },
  });
  return actionColumn;
};

export const schemas: FormSchema[] = [
  {
    prop: 'name',
    component: 'ElInput',
    label: '账户名',
    labelMessage: '请输入账户名',
    componentProps: {
      placeholder: '请输入账户名',
      onInput: () => {},
    },
    rules: [{ required: true, message: '请输入账户名', trigger: ['blur'] }],
  },
  {
    prop: 'realName',
    component: 'ElInput',
    label: '昵称',
    labelMessage: '请输入昵称',
    componentProps: {
      placeholder: '请输入昵称',
      onInput: () => {},
    },
    rules: [{ required: true, message: '请输入昵称', trigger: ['blur'] }],
  },
  {
    prop: 'password',
    component: 'ElInput',
    label: '密码',
    labelMessage: '请输入密码',
    componentProps: {
      placeholder: '请输入密码',
      onInput: () => {},
    },
    rules: [{ required: true, message: '密码不能为空', trigger: ['blur'] }],
  },
  {
    prop: 'repassed',
    component: 'ElInput',
    label: '确认密码',
    labelMessage: '请输入确认密码',
    componentProps: {
      placeholder: '请输入确认密码',
      onInput: () => {},
    },
    rules: [{ required: true, message: '确认密码不能为空', trigger: ['blur'] }],
  },
];
