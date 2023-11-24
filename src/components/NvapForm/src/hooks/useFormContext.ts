/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-06 15:43:33
 * @LastEditTime: 2023-06-06 15:43:39
 * @Description: 
 */
const key = Symbol('formElRef');
export function createFormContext(instance) {
  provide(key, instance);
}
export function useFormContext() {
  return inject(key);
}