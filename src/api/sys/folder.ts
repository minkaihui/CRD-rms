import { defHttp } from '/@/utils/http/axios';
import {
  //传参
  AddPrivateFolderParams,
  AddFolderParams,
  DeleteFolderParams,
  UpdateFolderNameParams,
  UpdateFolderParams,
  GetFolderInfoParams,
  GetUserPrivateFolderParams,
  GetUserPublicFolderParams,
  // 返回值
  AddPrivateFolderResultModel,
  AddFolderResultModel,
  DeleteFolderResultModel,
  UpdateFolderNameResultModel,
  UpdateFolderResultModel,
  GetFolderInfoResultModel,
  GetUserPrivateFolderResultModel,
  GetUserPublicFolderResultModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  AddPrivateFolder = '/api/Folder/AddPrivateFolder',
  AddFolder = '/api/Folder/AddFolder',
  DeleteFolder = '/api/Folder/DeleteFolder',
  UpdateFolderName = '/api/Folder/UpdateFolderName',
  UpdateFolder ='/api/Folder/UpdateFolder',
  GetFolderInfo ='/api/Folder/GetFolderInfo',
  GetUserPrivateFolder ='/api/Folder/GetUserPrivateFolder',
  GetUserPublicFolder ='/api/Folder/GetUserPublicFolder'
}

/**
 * @description: AddPrivateFolder api  : AddPrivateFolderParams
 */
export function AddPrivateFolder(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.AddPrivateFolder,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: AddFolder api  : AddFolderParams
 */
 export function AddFolder(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.AddFolder,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: DeleteFolder api  : DeleteFolderParams
 */
 export function DeleteFolder(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.DeleteFolder,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: UpdateFolderName api  : UpdateFolderNameParams
 */
 export function UpdateFolderName(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.UpdateFolderName,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: UpdateFolder api  : UpdateFolderParams
 */
 export function UpdateFolder(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.UpdateFolder,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFolderInfo api  : GetFolderInfoParams
 */
 export function GetFolderInfo(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFolderInfo,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetUserPrivateFolder api  : GetUserPrivateFolderParams
 */
 export function GetUserPrivateFolder(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetUserPrivateFolder,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetUserPublicFolder api  : GetUserPublicFolderParams
 */
 export function GetUserPublicFolder(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetUserPublicFolder,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}