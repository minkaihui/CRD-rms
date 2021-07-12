import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, TOKEN_EXPIRE } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { getUserInfo, loginApi, TokenApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';

interface UserState {
  userInfo?: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  tokenExpire?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // token 失效时间
    tokenExpire: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getTokenExpire(): string {
      return this.tokenExpire || getAuthCache<string>(TOKEN_EXPIRE);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setTokenExpire(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_EXPIRE, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<GetUserInfoModel | null> {
      //
      try {
        const { goHome = true, mode, ...loginParams } = params;
        //token
        const Data = await TokenApi({
          AppId: '123456',
          AuthorizeType: 'UserName',
          Code: '',
          Password: '123',
          UserId: '123',
        });

        // save token
        this.setToken(Data.AccessToken);

        this.setTokenExpire(Data.Expire * 1000 + '');

        const userInfo = await loginApi(loginParams, mode);
        // get user info
        // const userInfo = await this.getUserInfoAction({userId});

        const sessionTimeout = this.sessionTimeout;
        sessionTimeout && this.setSessionTimeout(false);
        !sessionTimeout && goHome && (await router.replace(PageEnum.BASE_HOME));
        this.setUserInfo(userInfo);
        this.setRoleList(userInfo);
        return userInfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserInfoAction() {
      // const userInfo = await getUserInfo();
      // const { roles } = userInfo;
      // const roleList = roles.map((item) => item.value) as RoleEnum[];
      // this.setUserInfo(userInfo);
      // this.setRoleList(roleList);
      // return userInfo;
    },
    /**
     * @description: logout
     */
    logout(goLogin = false) {
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
