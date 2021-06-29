/* eslint-disable prettier/prettier */
class cacheManager {
	constructor(cachePrefix: string) {
		this._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
		this._cachePrefix = '';
		this._defaultSerializer = {
			serialize: function(item) {
				return JSON.stringify(item);
			},
			// fix for "illegal access" error on Android when JSON.parse is
			// passed null
			deserialize: function(data) {
				return data && JSON.parse(data);
			}
		};
		this._cachePrefix = cachePrefix;
	}

	_maxExpireDate: Date;

	_cachePrefix: string;

	_defaultSerializer: {
		serialize: (item: any) => string;
		deserialize: (data: string | null) => any;
	};

	isValidDate(date: any) {
		return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
	}
	getExpiresDate(expires: any, now: Date) {
		now = now || new Date();
		if (typeof expires === 'number') {
			expires = expires === Infinity ? this._maxExpireDate : new Date(now.getTime() + expires * 1000);
		} else if (typeof expires === 'string') {
			expires = new Date(expires);
		}
		if (expires && !this.isValidDate(expires)) {
			throw new Error('`expires` parameter cannot be converted to a valid Date instance');
		}
		return expires;
	}
	isCacheItem(item: any) {
		if (typeof item !== 'object') {
			return false;
		}
		if (item) {
			if ('c' in item && 'exp' in item && 'v' in item) {
				return true;
			}
		}
		return false;
	}
	checkCacheItemIfEffective(cacheItem: any) {
		const timeNow = new Date().getTime();
		return timeNow < cacheItem.exp;
	}
	setCache(key: string, value: any, exp: any) {
		const now:any = new Date().getTime();
		var exp:any = exp || 7000;
		const expires = this.getExpiresDate(exp, new Date());
		const cacheItem = {
			v: this._defaultSerializer.serialize(value),
			exp: expires.getTime(),
			c: now
		};
		sessionStorage.setItem(this._cachePrefix + key, this._defaultSerializer.serialize(cacheItem));
	}
	deleteCache(key: string) {
		sessionStorage.removeItem(this._cachePrefix + key);
		return key;
	}
	getTokenCache(key: string) {
		let cacheItem: {
			v: string;
		} | null = null;
		try {
			cacheItem = this._defaultSerializer.deserialize(sessionStorage.getItem(this._cachePrefix + key));
		} catch (e) {
			return null;
		}
		if (cacheItem != null && this.isCacheItem(cacheItem)) {
			const value = this._defaultSerializer.deserialize(cacheItem.v);
			if (this.checkCacheItemIfEffective(cacheItem)) {
				return value;
			} else {
				value.AccessToken = null;
			}
		}
		return null;
	}
}
class requestHelper {
	constructor(prefix: string) {
		this._tokenoption = new tokenOption();
		this._config = {
			v: '2.0',
			format: 'json',
			app_key: '',
			authorizetype: 'Code',
			sign: '',
			timestamp: '',
			sdkversion: 'h-sdk-net-20180201'
		};
		this._cache = new cacheManager(prefix);
	}

	_tokenoption: tokenOption;

	_config: {
		v: string;
		format: string;
		app_key: string;
		authorizetype: string;
		sign: string;
		timestamp: string;
		sdkversion: string;
	};

	_cache: cacheManager;

	//创建请求
	createXHR() {
		let xhr = new XMLHttpRequest();
		if (xhr == null) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		return xhr;
	}
	getAuthHeaders(token: string) {
		const auth = 'Bearer ' + token;
		return {
			Authorization: auth
		};
	}
	//格式化参数
	formatFormParams(data: any) {
		const arr: Array<string> = [];
		for (const name in data) {
			arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
		}
		arr.push(('v=' + Math.random()).replace('.', ''));
		return arr.join('&');
	}
	request(url: string, options: any, isform: boolean) {
		console.log(url)
		return new Promise((resolve, reject) => {
			const xhr = this.createXHR();
			xhr.open(options.method, url);
			if (options.onCreate) {
				options.onCreate(xhr);
			}
			if (options.headers) {
				Object.keys(options.headers).forEach((k) => xhr.setRequestHeader(k, options.headers[k]));
			}
			xhr.upload.addEventListener('progress', (evt) => {
				if (evt.lengthComputable && options.onProgress) {
					options.onProgress({
						loaded: evt.loaded,
						total: evt.total
					});
				}
			});
			xhr.onreadystatechange = () => {
				const responseText = xhr.responseText;
				if (xhr.readyState !== 4) {
					return;
				}
				const reqId = ''; //xhr.getResponseHeader("x-reqId") || "";
				if (xhr.status !== 200) {
					let message = `xhr request failed, code: ${xhr.status};`;
					if (responseText) {
						message = message + ` response: ${responseText}`;
					}
					reject({
						code: xhr.status,
						message: message,
						reqId: reqId,
						isRequestError: true
					});
				}
				try {
					resolve({
						data: JSON.parse(responseText),
						reqId: reqId
					});
				} catch (err) {
					reject({
						code: '-1',
						message: err.message,
						reqId: reqId,
						isRequestError: true
					});
				}
			};
			if (isform) {
				xhr.send(this.formatFormParams(options.data));
			} else {
				xhr.send(JSON.stringify(options.data));
			}
		});
	}
	getToken(refresh = false) {
		let tokeninfo = this._cache.getTokenCache('token');
		//获取token,并进行缓存
		const header = {
			'Content-Type': 'application/json; charset=utf-8'
		};
		return new Promise((resolve, reject) => {
			if (tokeninfo == null) {
				console.log('请求token');
				return this.request(
					this._tokenoption.tokenurl + '/api/Auth/token',
					{
						headers: header,
						method: 'POST',
						data: {
							AppId: this._config.app_key,
							AuthorizeType: this._config.authorizetype,
							UserId: this._tokenoption.userid,
							Password: this._tokenoption.password,
							Code: this._tokenoption.code
						}
					},
					false
				).then(
					(res: any) => {
						const result = res.data;
						if (result.IsSuccess) {
							const data = result.Data;
							
							tokeninfo = {
								accesstoken: data.AccessToken,
								refreshtoken: data.RefreshToken
							};
							this._cache.setCache('token', tokeninfo, 7000);
							resolve(tokeninfo);
							// return tokeninfo;
						} else {
							reject(result.ErrorMessage);
							// throw result.ErrorMessage;
						}
					},
					(err) => {
						//其他错误信息
						reject(err);
						// return {
						//     Success: false,
						//     Data: err
						// };
					}
				);
			} else if (tokeninfo != null && tokeninfo.refreshtoken && refresh) {
				//通过RefreshToken,获取accesstoken
				console.log('通过刷新请求token');
				return this.request(
					this._tokenoption.tokenurl +
						'/api/Auth/refreshtoken?refreshToken=' +
						encodeURIComponent(tokeninfo.refreshtoken),
					{
						headers: header,
						method: 'POST'
					},
					false
				).then(
					(res: any) => {
						const result = res.data;
						if (result.IsSuccess) {
							const data = result.Data;
							tokeninfo = {
								accesstoken: data.AccessToken,
								refreshtoken: data.RefreshToken
							};
							this._cache.setCache('token', tokeninfo, 7000);
							resolve(tokeninfo);
							// return tokeninfo;
						} else {
							reject(result.ErrorMessage);
							// throw result.ErrorMessage;
						}
					},
					(err) => {
						//其他错误信息
						reject(err);
						// return {
						//     Success: false,
						//     Data: err
						// };
					}
				);
			} else {
				return resolve(tokeninfo);
			}
		});
	}
	setParam(inputs: any, tables = []) {
		const hrequest: {
			input: Array<any>;
			tables: any;
		} = {
			input: [],
			tables: []
		};
		for (const i in inputs) {
			if (inputs.hasOwnProperty(i) && typeof inputs[i] !== 'function') {
				hrequest.input.push({
					name: i,
					value: inputs[i]
				});
			}
		}
		const paramStr = JSON.stringify(hrequest);
		const tokeninfo = this._cache.getTokenCache('token');
		const params = Object.assign({}, this._config, {
			param: paramStr,
			token: tokeninfo.accesstoken
		});
		return params;
	}
	convertOutput(result: { output: any }) {
		const output: any = {};
		for (const i in result.output) {
			const item = result.output[i];
			if (item.Name) {
				output[item.Name] = item.value;
			} else if (item.name) {
				output[item.name] = item.value;
			}
		}
		return output;
	}
	//通过用户名模式获取token
	settokenbyuser(userid: string, password: string) {
		this._cache.deleteCache('token');
		this._tokenoption.userid = userid;
		this._tokenoption.password = password;
		this.getToken(false)
			.then((res: any) => {
				console.log(res.accesstoken);
			})
			.catch((reject) => {
				console.log(reject);
			});
	}
	//通过Code模式获取token
	settokenbycode(code: string) {
		this._cache.deleteCache('token');
		this._tokenoption.code = code;
		this.getToken(false)
			.then((res: any) => {
				console.log(res.accesstoken);
			})
			.catch((reject) => {
				console.log(reject);
			});
	}
	init(options: any, tokenoption: any) {
		Object.assign(this._config, options);
		Object.assign(this._tokenoption, tokenoption);
		//this._tokenoption = tokenoption;
	}
}
class tokenOption {
	constructor() {
		this.tokenurl = '';
		this.authorizetype = 'Code'; // 必填，授权类型UserName,Code
		this.userid = '';
		this.password = '';
		this.code = '';
	}

	tokenurl: string;
	authorizetype: string; // 必填，授权类型UserName,Code
	userid: string;
	password: string;
	code: string;
}

export class hsdk {
	constructor(prefix: string) {
		this._requestHelper = new requestHelper(prefix);
	}

	_requestHelper: requestHelper;

	config(options: any, tokenoption: any) {
		this._requestHelper.init(options, tokenoption);
	}
	async request(url: string, inputs = {}, tables = []) {
		const header = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		const tokeninfo = await this._requestHelper.getToken();
		//请求数据
		console.log(inputs,tables,this._requestHelper.setParam(inputs, tables))
		return this._requestHelper
			.request(
				url,
				{
					headers: header,
					method: 'POST',
					data: this._requestHelper.setParam(inputs, tables)
				},
				true
			)
			.then(
				(res: any) => {
					const result = res.data;
					if (result.ErrorCode == 0) {
						const output = this._requestHelper.convertOutput(result);
						return {
							Success: true,
							Message: result.ErrorMessage,
							Data: output
						};
					}
					if (result.ErrorCode == 3012) {
						//token过期,需要通过refreshtoken重新获取
						this._requestHelper
							.getToken(true)
							.then((res: any) => {
								console.log(res.accesstoken);
							})
							.catch((reject) => {
								console.log(reject);
							});
					} else {
						//其他错误信息
						return {
							Success: false,
							Message: result.ErrorMessage,
							Code: result.ErrorCode
						};
					}
				},
				(err) => {
					//其他错误信息
					return {
						Success: false,
						Data: err
					};
				}
			);
	}
	//通过用户名模式获取token
	settokenbyuser(userid: string, password: string) {
		this._requestHelper.settokenbyuser(userid, password);
	}
	//通过Code模式获取token
	settokenbycode(code: string) {
		this._requestHelper.settokenbycode(code);
	}
	getToken() {
		this._requestHelper.getToken();
	}
	//通过refreshToken模式获取token
	settokenbyrefresh() {
		this._requestHelper
			.getToken(true)
			.then((res: any) => {
				console.log(res.accesstoken);
			})
			.catch((reject) => {
				console.log(reject);
			});
	}
	getparam(inputs = {}, tables = []) {
		return this._requestHelper.setParam(inputs, tables);
	}
	getoutput(result: any) {
		return this._requestHelper.convertOutput(result);
	}
}
const hsdk1 = new hsdk('');
export default hsdk1;
const w: any = window;
if (!w.hsdk) {
	w.hsdk = new hsdk('sdk');
}
