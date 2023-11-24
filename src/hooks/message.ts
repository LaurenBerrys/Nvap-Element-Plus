/*
 * @Author: LaurenBerrys && 949154547@qq.com
 * @Date: 2023-11-23 17:02:54
 * @LastEditTime: 2023-11-23 17:05:17
 * @Description: 
 */
import { ElMessage, ElMessageBox } from 'element-plus';

interface MessageImplements {
	info(title: string): void;
	warning(title: string): void;
	success(title: string): void;
	error(title: string): void;
}

export function useMessage() {
	class MessageClass implements MessageImplements {
		// 普通提示
		info(title: string): void {
			ElMessage.info(title);
		}

		// 警告提示
		warning(title: string): void {
			ElMessage.warning(title);
		}

		// 成功提示
		success(title: string): void {
			ElMessage.success(title);
		}

		// 错误提示
		error(title: string): void {
			ElMessage.error(title);
		}
	}

	return new MessageClass();
}

export function useMessageBox() {
	class MessageBoxClass implements MessageImplements {
		// 普通提示
		info(msg: string): void {
			ElMessageBox.alert(msg, '系统提示');
		}

		// 警告提示
		warning(msg: string): void {
			ElMessageBox.alert(msg, '系统提示', { type: 'warning' });
		}

		// 成功提示
		success(msg: string): void {
			ElMessageBox.alert(msg, '系统提示', { type: 'success' });
		}

		// 错误提示
		error(msg: string): void {
			ElMessageBox.alert(msg, '系统提示', { type: 'error' });
		}

		// 确认窗体
		confirm(msg: string) {
			return ElMessageBox.confirm(msg, '系统提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			});
		}
		// 提交内容
		prompt(msg: string) {
			return ElMessageBox.prompt(msg,'系统提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			});
		}
	}

	return new MessageBoxClass();
}
