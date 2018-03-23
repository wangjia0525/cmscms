/**
 * Created by wangjia on 2017/9/6.
 */
App.factory('classTeacherFactory',function(SessionService){
    //日课老师
    var getUserTeacher = function(datas, callback, failCallback) {
        return SessionService.requestGet("getUserTeacher",datas, callback, failCallback);
    };
    //日课列表
    var getTeacherCourse = function(datas, callback, failCallback) {
        return SessionService.requestGet("getTeacherCourse",datas, callback, failCallback);
    };
    //老师收入
    var getTeacherRevenue = function(datas, callback, failCallback) {
        return SessionService.requestGet("getTeacherRevenue",datas, callback, failCallback);
    };
    return {
        getTeacherRevenue:getTeacherRevenue,
        getTeacherCourse : getTeacherCourse,
        getUserTeacher : getUserTeacher
    };
})