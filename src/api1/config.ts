/* eslint-disable prettier/prettier */
/*基础配置 */
var config = {
	//HSDK版本
	HSDKVersion: 'h-sdk-net-20180201',
	//token URL
	TokenHost: 'http://121.201.110.194:16180/authorizeserver/',
	// RTS接口
	RtsHost: 'http://rms-qas.hone.cn/',
	//OMS接口
	OmsHost: 'http://homs.api.hone.cn:9725/',
	//MGS接口
	MgsHost: 'http://hmgs.api.hone.cn:9723/',
	//WMS接口
	WmsHost: 'http://hwms.api.hone.cn:9726/',
	//report接口
	ReportHost: 'http://121.201.110.194:9728/',
	// //MS接口（邮包）
	MsHost: 'http://121.201.110.194:9729/',
	// MsHost: 'http://172.16.78.66:8085/', // MS接口（邮包）唐远生本地调试

	//扫码授权基础url
	ScanAuthorizeHost: 'http://www.hone.cn:6500/',
	//应用ID
	AppID: 'old8p63jjts972u5kavwc',

	/*百度云配置 begin */
	bcebosEndPoint: 'https://hone-rts-new.gz.bcebos.com', //百度云url
	bcebosDownUrl: 'https://hone-rts-new.cdn.bcebos.com', //百度云下载查看url（cdn）
	baiduAccessKey: '8761034e71ca4b77be09c022394d43d1', //授权账号
	baiduSecretKey: 'b412a03e8e6942fdadc4cd87b605748d', //百度云授权密码
	bcebosBucket: 'hone-rts-new', //百度云RTS上传的域名
	/*百度云配置 end */
};

//拆分数据库版本
// config.MsHost = 'http://121.201.110.194:9734/';

//开发环境配置
// config.HSDKVersion = 'h-sdk-net-20180201';
// config.TokenHost = 'http://121.201.110.194:16180/authorizeserver/';
// config.RtsHost = 'http://hrts.api.crd.cn/';
// config.OmsHost = 'http://homs.api.crd.cn/';
// config.MgsHost = 'http://hmgs.api.crd.cn/';
// config.WmsHost = 'http://hwms.api.crd.cn/';
// config.ReportHost = 'http://hrep.api.crd.cn/';
// config.MsHost = 'http://htms.api.crd.cn/';


//正式环境配置
// config.HSDKVersion = 'h-sdk-net-20180201';
// config.TokenHost = 'http://121.201.110.194:16180/authorizeserver/';
// config.RtsHost = 'https://newrtsapi.hone.cn/';
// config.OmsHost = 'https://omsapi.hone.cn/';
// config.MgsHost = 'https://mgsapi.hone.cn/';
// config.WmsHost = getWmsHost();
// config.ReportHost = 'https://rptapi.hone.cn/';
// config.MsHost = 'https://tmsapi.hone.cn/';
// config.ScanAuthorizeHost = 'http://weixin.hr.hone.cn/';
// config.AppID = 'kld8p63jjts972u5kavwc';

//正式环境配置（主站点）
// config.HSDKVersion = 'h-sdk-net-20180201';
// config.TokenHost = 'http://121.201.110.194:16180/authorizeserver/';
// config.RtsHost = 'https://newrtsapi3.hone.cn/';
// config.OmsHost = 'https://omsapi3.hone.cn/';
// config.MgsHost = 'https://mgsapi3.hone.cn/';
// config.WmsHost ="https://wmsapi3.hone.cn/" ;
// config.ReportHost = 'https://rptapi3.hone.cn/';
// config.MsHost = 'https://tmsapi3.hone.cn/';
// config.ScanAuthorizeHost = 'https://qyweixin2.hone.cn/';
// config.AppID = 'kld8p63jjts972u5kavwc';


export default config;


function getWmsHost() {

	return new Date().getTime() % 2 == 0 ? "https://wmsapi.hone.cn/" : "https://wmsapi2.hone.cn/"
}