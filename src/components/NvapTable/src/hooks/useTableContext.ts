/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-26 15:43:26
 * @LastEditTime: 2023-06-26 15:43:35
 * @Description: 
 */
import type { Ref } from 'vue';
import type { NvapTableProps, TableActionType } from '../types/table';
import { provide, inject, ComputedRef } from 'vue';

const key = Symbol('s-table');

type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<NvapTableProps>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
