import { defHttp } from '/@/utils/http/axios';


import { ErrorMessageMode } from '/#/axios';

enum Api {
  AddTagGroup='/api/FileTag/AddTagGroup',
  UpdateTagGroupName='/api/FileTag/UpdateTagGroupName',
  DeleteTagGroup='/api/FileTag/DeleteTagGroup',
  GetAllFileTagGroup='/api/FileTag/GetAllFileTagGroup',
  AddFileTag='/api/FileTag/AddFileTag',
  UpdateFileTagName='/api/FileTag/UpdateFileTagName',
  SetFileTagOften='/api/FileTag/SetFileTagOften',
  DeleteFileTag='/api/FileTag/DeleteFileTag',
  RemoveFileTagGroup='/api/FileTag/RemoveFileTagGroup',
  SetFileTagNoGroup='/api/FileTag/SetFileTagNoGroup',
  GetFileTagQuantity='/api/FileTag/GetFileTagQuantity',
  GetTileTagList='/api/FileTag/GetTileTagList',
  GetFileTagAndGroupList='/api/FileTag/GetFileTagAndGroupList',
}

/**
 * @description: AddTagGroup api  : AddTagGroupParams
 */
export function AddTagGroup(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.AddTagGroup,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: UpdateTagGroupName api  : UpdateTagGroupNameParams
 */
export function UpdateTagGroupName(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.UpdateTagGroupName,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: DeleteTagGroup api  : DeleteTagGroupParams
 */
export function DeleteTagGroup(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.DeleteTagGroup,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetAllFileTagGroup api  : GetAllFileTagGroupParams
 */
 export function GetAllFileTagGroup(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetAllFileTagGroup,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: AddFileTag api  : AddFileTagParams
 */
 export function AddFileTag(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.AddFileTag,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: UpdateFileTagName api  : UpdateFileTagNameParams
 */
export function UpdateFileTagName(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.UpdateFileTagName,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: SetFileTagOften api  : SetFileTagOftenParams
 */
export function SetFileTagOften(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.SetFileTagOften,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: DeleteFileTag api  : DeleteFileTagParams
 */
export function DeleteFileTag(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.DeleteFileTag,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: RemoveFileTagGroup api  : RemoveFileTagGroupParams
 */
export function RemoveFileTagGroup(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.RemoveFileTagGroup,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: SetFileTagNoGroup api  : SetFileTagNoGroupParams
 */
 export function SetFileTagNoGroup(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.SetFileTagNoGroup,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFileTagQuantity api  : GetFileTagQuantityParams
 */
 export function GetFileTagQuantity(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFileTagQuantity,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetTileTagList api  : GetTileTagListParams
 */
 export function GetTileTagList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetTileTagList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: GetFileTagAndGroupList api  : GetFileTagAndGroupListParams
 */
 export function GetFileTagAndGroupList(params, mode: ErrorMessageMode = 'message') {
  return defHttp.post(
    {
      url: Api.GetFileTagAndGroupList,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}