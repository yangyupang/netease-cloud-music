function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 * 时间戳转日期
 */
function formatTime(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];

    var date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}
//时间格式 转为时间戳
function forTimeStamp(times) {
    // var times = '2019-05-20 00:00:00';
    var repTime = times.replace(/-/g, '/'); //用正则主要是把“2019-05-20 00:00:00”转换成“2019/05/20 00:00:00”兼容ios
    // console.log("返回时间：" + repTime);
    var timeTamp = Date.parse(repTime);
    // console.log("返回时间戳：" + timeTamp)
    return timeTamp
}
module.exports = {
    formatTime: formatTime, // 时间戳转日期
    forTimeStamp: forTimeStamp //时间格式 转为时间戳
}