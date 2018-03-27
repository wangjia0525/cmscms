App.factory('CoursesFactory', function (SessionService) {
    //修改课时接口
    var updateLesson = function (params, callback, failCallback) {
        return SessionService.requestPost("course/updateLesson", params, callback, failCallback);
    };
    //修改课程接口
    var updateCourse = function (params, callback, failCallback) {
        return SessionService.requestPostQ("course/updateCourse", params, callback, failCallback);
    };
    //创建课程
    var insertcourse = function (params, callback, failCallback) {
        return SessionService.requestPostQ("course/insertcourse", params, callback, failCallback);
    };
    //删除课时
    var delLesson = function (params, callback, failCallback) {
        return SessionService.requestPost("course/delLesson", params, callback, failCallback);
    };
    //添加课时
    var insertLesson = function (params, callback, failCallback) {
        return SessionService.requestPost("course/insertLesson", params, callback, failCallback);
    };
    //获取头像/封面token
    var getImageToken = function (params, callback, failCallback) {
        return SessionService.requestPost("course/getImageToken", params, callback, failCallback);
    };
    //获取课的音频token
    var getmp3Token = function (params, callback, failCallback) {
        return SessionService.requestPost("course/getmp3Token", params, callback, failCallback);
    };
    //获取课程下的课的列表
    var getLessonList = function (params, callback, failCallback) {
        return SessionService.requestPost("course/getLessonList", params, callback, failCallback);
    };
    //获取课程信息
    var getCourse = function (params, callback, failCallback) {
        return SessionService.requestPost("course/getCourse", params, callback, failCallback);
    };
    //获取课程列表
    var getCourseList = function (params, callback, failCallback) {
        return SessionService.requestPost("course/getCourseList", params, callback, failCallback);
    };
    //调换课时顺序
    var updateLessonOrder = function (params, callback, failCallback) {
        return SessionService.requestPost("course/updateLessonOrder", params, callback, failCallback);
    };
    //调整课程顺序
    var updataCourseOrder = function (params, callback, failCallback) {
        return SessionService.requestPost("course/updataCourseOrder", params, callback, failCallback);
    };
    //置顶
    var updateLessonOrderTop = function (params, callback, failCallback) {
        return SessionService.requestPost("course/updateLessonOrderTop", params, callback, failCallback);
    };

    return {
        updateLesson: updateLesson,
        updateLessonOrderTop: updateLessonOrderTop,//置顶
        updateCourse: updateCourse,
        insertcourse: insertcourse,
        delLesson: delLesson,
        insertLesson: insertLesson,
        getImageToken: getImageToken,
        getmp3Token: getmp3Token,
        getLessonList: getLessonList,
        getCourse: getCourse,
        getCourseList: getCourseList,
        updateLessonOrder: updateLessonOrder,
        updataCourseOrder: updataCourseOrder
    };

});