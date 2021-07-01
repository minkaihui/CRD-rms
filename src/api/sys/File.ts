import { defHttp } from '/@/utils/http/axios';


import { ErrorMessageMode } from '/#/axios';

enum Api {
  GetAllFileFormatList='/api/File/GetAllFileFormatList',
  GetFileFormatTypeList='/api/File/GetFileFormatTypeList',
  GetFileCategoryList='/api/File/GetFileCategoryList',
  AddFile='/api/File/AddFile',
  UpdateFileBasicInfo='/api/File/UpdateFileBasicInfo',
  UpdateFileName='/api/File/UpdateFileName',
  CopyFile='/api/File/CopyFile',
  MoveFile='/api/File/MoveFile',
  DeleteFile='/api/File/DeleteFile',
  GetFile='/api/File/GetFile',
  GetFileList='/api/File/GetFileList',
  GetFileApprovalList='/api/File/GetFileApprovalList',
  ApprovalFile='/api/File/ApprovalFile',
  DeleteReceiveStoreFile='/api/File/DeleteReceiveStoreFile',
  ClearReceiveStore='/api/File/ClearReceiveStore',
}

/**
 * @description: GetAllFileFormatList api  : GetAllFileFormatListParams
 */
export function GetAllFileFormatList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetAllFileFormatList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFileFormatTypeList api  : GetFileFormatTypeListParams
 */
export function GetFileFormatTypeList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFileFormatTypeList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFileCategoryList api  : GetFileCategoryListParams
 */
 export function GetFileCategoryList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFileCategoryList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: AddFile api  : AddFileParams
 */
export function AddFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.AddFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: UpdateFileBasicInfo api  : UpdateFileBasicInfoParams
 */
export function UpdateFileBasicInfo(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.UpdateFileBasicInfo,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: UpdateFileName api  : UpdateFileNameParams
 */
export function UpdateFileName(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.UpdateFileName,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: CopyFile api  : CopyFileParams
 */
export function CopyFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.CopyFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: MoveFile api  : MoveFileParams
 */
export function MoveFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.MoveFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: DeleteFile api  : DeleteFileParams
 */
export function DeleteFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.DeleteFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFile api  : GetFileParams
 */
 export function GetFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFileList api  : GetFileListParams
 */
 export function GetFileList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFileList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFileApprovalList api  : GetFileApprovalListParams
 */
 export function GetFileApprovalList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFileApprovalList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: ApprovalFile api  : ApprovalFileParams
 */
 export function ApprovalFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.ApprovalFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: DeleteReceiveStoreFile api  : DeleteReceiveStoreFileParams
 */
 export function DeleteReceiveStoreFile(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.DeleteReceiveStoreFile,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: ClearReceiveStore api  : ClearReceiveStoreParams
 */
 export function ClearReceiveStore(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.ClearReceiveStore,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}