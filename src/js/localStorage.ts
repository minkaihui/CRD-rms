/* eslint-disable prettier/prettier */
export default {
	//设置缓存
	setItem(nameKey: string, params: any) {
		if (!!params) {
			if (typeof params == 'string') {
				localStorage.setItem(nameKey, params);
			} else {
				// typeof params == 'object' || typeof params == 'array' || typeof params == 'boolean'
				localStorage.setItem(nameKey, JSON.stringify(params));
			}
		} else {
			localStorage.setItem(nameKey, '');
		}
	},
	// 获取缓存
	getItem(nameKey: string) {
		var resStr = localStorage.getItem(nameKey);
		if (resStr) {
			return JSON.parse(resStr);
		} else {
			return null;
		}
	},
	// 移除缓存
	removeItem(nameKey: string) {
		localStorage.removeItem(nameKey);
	}
};
