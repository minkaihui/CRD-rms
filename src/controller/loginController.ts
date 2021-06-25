import store from '@/store/index';
import commonController from "@/controller/commonController";
import italkSdk from "@/js/italkSdk";
import mutationType from "@/store/mutationType";
import { storageKey } from "@/myBaseConfig";
import httpclient from "@/api/httpClient";
import { QueryDataTable } from '@/models/queryDataTable';
import baseApi from '@/api/common/baseApi';
export default {
	/**
	 * 登录前的操作
	 * @param context 
	 * @param isClearLogin //是否清楚登录信息
	 */
	async HandleBeforeLogin(context: any, isClearLogin: boolean = true) {
		commonController.clearStorageByKeyPrefx("LSS", isClearLogin);
		context.$store.commit("setLockScreen", false); //登录前，初始化锁频
		context.$store.commit(mutationType.BASE_LSS_MENU_PERMISSION_CONFIG, null);
	},
	/**
	 * 登录后操作
	 * @param context 
	 * @param userID 
	 * @param userName 
	 * @param shopCode 
	 */
	async HandleAfterLogin(context: any, userID: string, userName: string, shopCode: string) {
		context.loading = true;
		context.loadingText = "正在加载菜单";
		var b = await commonController.getRtsMenuPermission(
			context,
			userID,
			shopCode,
		);
		if (!b) {
			context.loading = false;
			return;
		}
		// 获取超级管理员
		var superAdministratorKey = localStorage.getItem(
			storageKey.superAdministratorKey
		);
		if (superAdministratorKey) {
			//设置水印
			await italkSdk.showWaterMark("超级管理员", superAdministratorKey);
		} else {
			//设置水印

			await italkSdk.showWaterMark(userID, userName);

		}
		context.loading = false;
		// 如果不是多加盟店老板帐号登录，则直接跳转
		if (!context.isOfficeAdminLogin) {
			context.$router.push("/home");
		}
	},


	/**
	 * 用户名登录
	 * @param context  用户名登录
	 * @param username 
	 * @param isClearSuperManager   是否超级管理员登录
	 * @param isSuperManagerChangeShopCode 是否超级管理员切换门店
	 * @param isJumpAdmin  是否跳过管理员
	 */
	async GetRtsUserInfoByName(context: any, username: string, isClearSuperManager: boolean, isSuperManagerChangeShopCode: boolean = false, isJumpAdmin: boolean = false) {
		if (context.loading) {
			return;
		}
		if (username === "") {
			context.$store.commit("setMessage", {
				message: "账号不能为空",
				type: "warning"
			});
			return;
		}
		context.loading = true;
		await this.HandleBeforeLogin(context);
		context.loadingText = "正在获取账户信息";

		// 如果超级管理员存在，并且不是切换门店，则初始化超级管理员
		if ((isClearSuperManager && !isSuperManagerChangeShopCode) || isJumpAdmin === true) {
			localStorage.removeItem(storageKey.superAdministratorKey);
		}
		var r = await httpclient.GetRtsUserInfoByName(context, username, isJumpAdmin);
		context.loading = false;
		if (r.Success) {
			var userID = JSON.parse(r.Data.Data).UserID;
			var userName = JSON.parse(r.Data.Data).UserName;
			var shopCode = JSON.parse(r.Data.Data).ShopCode;
			this.HandleAfterLogin(context, userID, userName, shopCode);
		} else {
			//超级管理员登录成功
			if (r.Code == 9999) {
				debugger
				//超级管理员登录成功，弹出选择门店和账户的界面
				// alert("超级管理员登录成功，接下来可以选择门店和用户了");
				// context.isSuperAdministrator = true;
				// localStorage.setItem(
				// 	storageKey.superAdministratorKey,
				// 	context.loginForm.username
				// );
				context.isStopGetScanResult = true;//停止刷新二维码
				await context
					.$confirm("选择登录方式？", "提示", {
						confirmButtonText: "管理员登录",
						cancelButtonText: "普通角色登录",
						type: "warning",
						closeOnClickModal: false,
					})
					.then(() => {
						//超级管理员登录成功，弹出选择门店和账户的界面
						context.isSuperAdministrator = true;
						localStorage.setItem(
							storageKey.superAdministratorKey,
							username
						);
					})
					.catch(async (r: any) => {
						localStorage.removeItem(storageKey.superAdministratorKey);
						await this.GetRtsUserInfoByName(context, username, false, false, true);
					});
			} else {
				context.$store.commit("setMessage", {
					message: r.Message,
					type: "error"
				});
				return;
			}
		}
	},
	/**
	 * 物流超级的超级管理员获取选择人员信息
	 */
	async GetEmpForLogisticsSuperAdmin() {
		let query = new QueryDataTable();
		query.TableName = 'MS_LogisticsUserForAdmin';
		query.Fields = '*';
		query.Where = 'Status=1  ';
		query.OrderBy = ' ECode ';
		return await baseApi.GetDataTable(query);
	}
};
