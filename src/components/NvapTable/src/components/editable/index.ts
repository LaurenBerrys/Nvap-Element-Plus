/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-06-26 15:16:16
 * @LastEditTime: 2023-07-18 14:58:14
 * @Description:
 */
import type { BasicColumn } from '@/components/NvapTable/src/types/table';
import { h, Ref } from 'vue';

import EditableCell from './EditableCell.vue';

export function renderEditCell(column: BasicColumn) {
	return (record: any, index) => {
		const _key: any = column.prop;
		const value = record[_key];
		if (!record.onEdit) {
			record.onEdit = async (edit: boolean, submit = false) => {
				if (!submit) {
					record.editable = edit;
				}

				if (!edit && submit) {
					const res = await record.onSubmitEdit?.();
					if (res) {
						record.editable = false;
						return true;
					}
					return false;
				}
				// cancel
				if (!edit && !submit) {
					record.onCancelEdit?.();
				}
				return true;
			};
		}
		return h(EditableCell, {
			value,
			record,
			column,
			index,
		});
	};
}

export type EditRecordRow<T = Recordable> = Partial<
	{
		onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>;
		editable: boolean;
		onCancel: Fn;
		onSubmit: Fn;
		submitCbs: Fn[];
		cancelCbs: Fn[];
		validCbs: Fn[];
		editValueRefs: Recordable<Ref>;
	} & T
>;
