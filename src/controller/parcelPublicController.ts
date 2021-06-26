import { storageKey, globalConfig } from '@/myBaseConfig';
import { QueryDataTable } from '@/models/queryDataTable';
import { PaginationModel, QueryConditionModel } from '@/models/pagination/paginationModel';
import baseApi from '@/api/common/baseApi';
import util from '@/js/util';
import { Result } from '@/models/result';
import commonConfig from '@/api/config';
import mutationType from '@/store/mutationType';
import bus from '@/js/Bus';
export default {
    /**
     * 提交到SPS获取凭证号
     * @param context 
     */
    async submitSPS(context: any) {
        if (context.selectedList[0].CertNo) {
            context.$store.commit("setMessage", {
                type: "warning",
                message: "已生成凭证号，请勿重复提交！"
            });
            return;
        }

        var res: any = await context.$API.apiPublic(
            "SubmitSPS",
            {
                certID: context.selectedList[0].ID, //id
                operatorID: context.userInfo.UserID,
                operatorName: context.userInfo.UserName,
            },
            "提交SPS中..."
        );
        if (res.Success) {
            context.$store.commit("setMessage", {
                type: "success",
                message: "提交SPS成功！"
            });
            context.getDataList(true);
        }
    },

    /**
     * 编辑是否需要邮寄
     * @param context 
     * @param isMail 
     * @param operationType 
     */
    async editIsNeedMail(context: any, certNos: string, isMail: boolean,) {
        var res: any = await context.$API.apiPublic(
            "SaveIsNeedPost",
            {
                isNeetPost: isMail,
                certNos: certNos,
                operatorID: context.userInfo.UserID,
                operatorName: context.userInfo.UserName,
            },
            "编辑中..."
        );
        if (res.Success) {
            context.$store.commit("setMessage", {
                type: "success",
                message: "编辑成功！"
            });
            context.getDataList(true);
        }
    },
    /**
     *  批量编辑包裹信息
     * @param context 
     * @param routerName 
     */
    async editGroupManagement(context: any, routerName: string) {
        if (!context.listTableInfo.tableData || context.listTableInfo.tableData.length == 0) {
            context.$store.commit("setMessage", {
                type: "warning",
                message: "没有数据编辑！"
            });
            return
        }
        var boxsList = util.grep(context.listTableInfo.tableData, function (item: any) {
            return !item.GroupBoxes
        })
        if (boxsList && boxsList.length > 0) {
            context.$store.commit("setMessage", {
                type: "warning",
                message: "盒数为0不能保存！"
            });
            return
        }
        // var groupInsureCostList = util.grep(context.listTableInfo.tableData, function (item: any) {
        //     return !item.GroupInsureCost
        // })
        // if (groupInsureCostList && groupInsureCostList.length > 0) {
        //     context.$store.commit("setMessage", {
        //         type: "warning",
        //         message: "投保金额为0不能保存！"
        //     });
        //     return
        // }
        var res: any = await context.$API.apiPublic(
            "EditGroupManagement",
            {
                operatorID: context.userInfo.UserID,
                operatorName: context.userInfo.UserName,
                list: context.listTableInfo.tableData
            },
            "保存中..."
        );
        if (res.Success) {
            context.$store.commit("setMessage", {
                type: "success",
                message: "保存成功！"
            });
            //关闭当前的页面
            bus.$emit('closeTagItem', {
                route: context.$route,
                isAutoToNextTag: false
            })
            context.$router.push({
                name: routerName,
                params: { isUpDate: true }
            })
        }
    },

    /**
     * 批量编辑录入快递费用
     * @param context 
     * @param routerName  //保存成功后跳转界面路由名称
     */
    async editExpressFreight(context: any, routerName: string) {
        if (!context.listTableInfo.tableData || context.listTableInfo.tableData.length == 0) {
            context.$store.commit("setMessage", {
                type: "warning",
                message: "没有数据编辑！"
            });
            return
        }
        var FreightList = util.grep(context.listTableInfo.tableData, function (item: any) {
            return !item.Freight
        })
        if (FreightList && FreightList.length > 0) {
            context.$store.commit("setMessage", {
                type: "warning",
                message: "运费为0不能保存！"
            });
            return
        }
        var obj = {
            ExpressID: '',
            Freight: '',
            Insured: '',
            ExpressCost: '',
        }
        var list: any = []
        context.listTableInfo.tableData.forEach((item: any) => {
            obj = JSON.parse(JSON.stringify(obj))
            obj.ExpressID = item.ExpressID;
            obj.Freight = item.Freight;
            obj.Insured = item.Insured;
            obj.ExpressCost = item.ExpressCost;
            list.push(obj)
        })
        var res: any = await context.$API.apiPublic(
            "EditExpressFreight",
            {
                operatorID: context.userInfo.UserID,
                operatorName: context.userInfo.UserName,
                list: list
            },
            "保存中..."
        );
        if (res.Success) {
            context.$store.commit("setMessage", {
                type: "success",
                message: "保存成功！"
            });
            //关闭当前的页面
            bus.$emit('closeTagItem', {
                route: context.$route,
                isAutoToNextTag: false
            })
            context.$router.push({
                name: routerName,
                params: { isUpDate: true }
            })
        }
    },
    /**
     * 校验选择(单选或多选)
     * @param context 
     * @param isRadio 是否只能选择一行
     */
    CheckSelected(context: any, isRadio: boolean = false,) {
        if (isRadio) {
            if (!context.selectedList || (!!context.selectedList && context.selectedList.length != 1)) {
                context.$store.commit("setMessage", {
                    type: "warning",
                    message: '请选中一行！'
                });
                return false
            } else {
                return true
            }
        } else {
            if (!context.selectedList || context.selectedList.length == 0) {
                context.$store.commit("setMessage", {
                    type: "warning",
                    message: '请选择数据！'
                });
                return false
            } else {
                return true
            }
        }

    },
    /**
     * 校验非货品发出添加快递录入
     * @param context 
     * @param param 
     * @param isBatchAdd  是否批量添加
     */
    verificationInput(context: any, param: any, isBatchAdd: boolean = false) {
        var isPass: boolean = false,
            msg: string = ''
        if (!!param.SendTypeCode) {
            debugger;
            // 如果是货品邮寄，判断必填条件
            if (param.SendTypeCode.indexOf('HPYJ') > -1) {
                var list1 = util.grep(param.List, function (item: any) {
                    return !item.ReceiveAddrCode ||
                        !item.ReceiveUserName ||
                        !item.CostAttrCode ||
                        !item.CouriderNo ||
                        !item.PolicyNo ||
                        item.PolicyNo.length != 20 ||
                        item.Freight * 1 == 0 ||
                        !item.Freight ||
                        !item.Quantity ||
                        item.Quantity * 1 == 0
                })
                if (!!list1 && list1.length > 0 ||
                    (!param.CategoryCode ||
                        !param.TypeCode ||
                        !param.SendAddrCode ||
                        !param.FreightPayMent ||
                        !param.Amount ||
                        param.Amount * 1 == 0 ||
                        !param.InsureAmount ||
                        param.InsureAmount * 1 == 0 ||
                        // !param.Quantity ||
                        // param.Quantity * 1 == 0 ||
                        !param.Premium ||
                        param.Premium * 1 == 0)) {
                    isPass = false
                    msg = '请先完善快递信息！'
                } else {
                    isPass = true
                }
            } else {
                var list2 = util.grep(param.List, function (item: any) {
                    return (!item.ReceiveAddrCode ||
                        !item.ReceiveUserName ||
                        !item.CostAttrCode ||
                        !item.CouriderNo ||
                        (!isBatchAdd && (item.Freight * 1 == 0 ||
                            !item.Freight)) ||
                        !item.Quantity ||
                        item.Quantity * 1 == 0
                    )
                })
                if (!!list2 && list2.length > 0 ||
                    (!param.CategoryCode ||
                        !param.TypeCode ||
                        !param.SendAddrCode ||
                        !param.FreightPayMent
                        // !param.Quantity ||
                        // param.Quantity * 1 == 0
                    )) {
                    isPass = false
                    msg = '请先完善快递信息！'
                } else {
                    isPass = true
                }
            }
        } else {
            isPass = false
            msg = '请先完善快递信息！'
        }
        if (msg) {
            context.$store.commit('setMessage', { type: 'warning', message: msg })
        }
        return isPass
    },
    /**
     * 计算投保金额
     * @param context 
     * @param item  //选中的货品行
     */
    async caculateInsuredAmount(context: any, item: any) {
        var res: any = await context.$API.apiPublic(
            "CaculateInsuredAmount",
            {
                dto: item
            },
            "计算投保金额中..."
        );
        if (res.Success) {
            return res.Data.Data;
        }
    },

    /**
     * 删除(支持多个删除)
     * @param context 
     * @param key   删除比较的key值
     * @param selectedList  //选中需要删除的列表
     * @param tableData    //数据源
     */
    async deleteItems(
        context: any,
        key: string,
        selectedList: Array<any>,
        tableData: Array<any>
    ) {
        var list: any = []
        // 选中校验
        if (!this.CheckSelected(context)) {
            return;
        }
        await context
            .$confirm(
                "是否将选中的数据删除？",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }
            )
            .then(() => {
                var selectedArr: any = [];
                selectedList.forEach((ele: any) => {
                    selectedArr.push(ele[key]);
                });
                // 返回删除后的数据
                list = tableData.filter(function (item: any) {
                    return selectedArr.indexOf(item[key]) < 0;
                });
            })
        return list


    }
    ,
    /**
     * 校验快递单号是否准确
     * @param expressTypeCode  快递类型
     * @param expressNo   快递单号
     */
    async checkExpressNo(expressTypeCode: string, expressNo: string) {
        let errorMsg = "";
        if (!expressTypeCode || !expressNo) {
            return "快递类型或快递单号不能为空！";
        }
        let list: any = JSON.parse(localStorage.getItem(storageKey.expressCheckInfoKey) || "[]");
        if (!list || list.length == 0) {

            let query = new QueryDataTable();
            query.TableName = 'MS_BaseExpressCheckInfo';
            query.Fields = '*';
            query.Where = " Status=1 ";
            query.OrderBy = ' ExpressTypeCode';
            list = await baseApi.GetDataTable(query);
            localStorage.setItem(storageKey.expressCheckInfoKey, JSON.stringify(list));
        }
        var existList = util.grep(list, function (item: any, index: number) {
            return item.ExpressTypeCode == expressTypeCode;
        })
        if (existList.length > 0) {
            //满足条件的数据
            let validateList = util.grep(existList, function (item: any, index: number) {
                return ((!!item.StartWith && !!expressNo.startsWith(item.StartWith)) || !item.StartWith)
                    && ((item.Length > 0 && expressNo.length - item.Length == 0) || item.Length == 0)
            });
            if (!!validateList && validateList.length > 0) {

                return "";
            }

            else {

                let listTip: any = [];


                util.each(existList, function (index: number, item: any) {

                    let itemTip = '';
                    if (!!item.StartWith && !expressNo.startsWith(item.StartWith) && !expressNo.startsWith(item.StartWith)) {
                        itemTip += '以【' + item.StartWith + '】开头'
                    }
                    if (item.Length > 0 && expressNo.length - item.Length != 0) {
                        itemTip += (itemTip.length > 0 ? '且长度为【' : "长度为【") + item.Length + '】';
                    }
                    listTip.push(util.clone(itemTip));
                })
                if (listTip.length > 0) {
                    return '格式错误：' + listTip.toString().replace(',', '或')
                }
            }

        }
        return errorMsg;

    },
    /**
     * 取消快递
     * @param context 
     * @param apiUrlName  取消快递API 物流=CancelLogisticsExpress  门店=CancelShopExpress
     */
    async cancelSendExpress(context: any, apiUrlName: string) {
        context
            .$confirm("是否取消并删除选中快递?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                var expressIds = "";
                context.selectedList.forEach((item: any) => {
                    expressIds += "," + item.ExpressID;
                });
                context.$API
                    .apiPublic(
                        apiUrlName,
                        {
                            expressIds: expressIds.substr(1),
                            reasons: "", //备注
                            operatorID: context.userInfo.UserID,
                            operatorName: context.userInfo.UserName,
                        },
                        "取消快递中..."
                    )
                    .then((res: any) => {
                        if (res.Success) {
                            context.$store.commit("setMessage", {
                                type: "success",
                                message: "取消快递成功！",
                            });
                            context.getDataList(true);
                        }
                    });
            })
            .catch(() => { });
    }
};
