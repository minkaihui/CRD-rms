import { getToken } from '/@/utils/auth';

export function requestData(Data) {
    let param= Array();
    
    for( let key in Data ){
        let obj={'name':key,'value':Data[key]}
        param.push(obj)
    }
    let str={
        v: 2.0,
        format: 'json',
        app_key: 123456,
        authorizetype:'UserName',
        sign: '',
        timestamp: '',
        sdkversion: 'h-sdk-net-20180201',
        param:`{"input":${JSON.stringify(param)},"tables":[]}`,
        token: getToken(),
    }
    return  str
}