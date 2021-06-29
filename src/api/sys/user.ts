import { defHttp, TokenHttp } from '/@/utils/http/axios';
import { LoginParams, GetUserListParams, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/api/User/LoginByUserName',
  GetUserList = '/api/User/GetUserByName',
  GetPermCode = '/getPermCode',
  Token = '/authorizeserver//api/Auth/token',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  // LoginResultModel
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: Token api
 */
export function TokenApi(params) {
  return TokenHttp.post({
    url: Api.Token,
    params,
  });
}

/**
 * @description: GetUser list api
 */
export function GetUserList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetUserList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}
