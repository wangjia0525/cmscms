/**
 * Created by wangjia on 2017/9/6.
 */
App.factory('memberManageFactory',function(SessionService){
    //获取数据
    var getMembersInstruction = function(datas, callback, failCallback) {
        return SessionService.requestGet("getMembersInstruction",datas, callback, failCallback);
    };
    //更新数据
    var updateMembersInstruction = function(datas, callback, failCallback) {
        return SessionService.requestGet("updateMembersInstruction",datas, callback, failCallback);
    };
    return {
        updateMembersInstruction : updateMembersInstruction,
        getMembersInstruction : getMembersInstruction
    };
})