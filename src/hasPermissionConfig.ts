import apiPackage from '@/api/apiPackage'
import store from "@/store/index";
export default {
    /**
     * 遍历按钮数组，根据权限返回权限为ture的按钮列表
     * @param moduleCode //模块编号
     * @param btnList     //按钮列表
     */
    eachBtnList(moduleCode: string, btnList: Array<any>) {
        var returnList: any = []
        var self = this
        if (btnList && btnList.length > 0) {
            btnList.forEach((item: any) => {
                if (item.permission) {
                    if (item.permission == 'permission') {
                        // permission - 不需要校验权限
                        returnList.push(item)
                    } else {
                        var res: any = self.hasPermission(moduleCode, item.permission)
                        if (res) {
                            returnList.push(item)
                        }
                    }
                }
            })
        }
        return returnList
    },
    /**
* 权限配置
* @param moduleCode //模块编号
* @param functionCode  //方法编号
*/
    hasPermission(moduleCode: string, functionCode: string) {
        return store.getters.hasPermission(
            moduleCode, functionCode
        );
    }

}