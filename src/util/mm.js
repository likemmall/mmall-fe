/*
 * @Author: like 
 * @Date: 2017-08-31 12:40:32 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-02 15:45:49
 */
'use strict'
var Hogan = require('hogan')
var conf = {
    serverHost: ''
}
var _mm = {
    //数据请求
    request: function (param) {
        var _this = this
        $.ajax({
            type: param.method || "get",
            url: param.url || "",
            dataType: param.type || "json",
            data: param.data || "",
            success: function (res) {
                //规定请求地址成功之后，状态码为0时，请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //规定请求成功之后，状态码为10时，没有登录状态，需要强登录
                else if (res.status === 10) {
                    _this.doLogin()
                }
                //规定请求地址成功之后，状态码为1时，请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path
    },
    //获取url的参数
    getUrlParam: function (name) {
        //正则匹配key=value，返回数组[key,=,value]
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var result = window.location.search.substring(1).match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    //渲染html,讲传入的数据和模板进行拼接
    renderHtml:function(htmlTemple,data){
        // 先编译再渲染
        var temple = Hogan.compile(htmlTemple),
            result = temple.render(data)
        return result
    },
    //成功提示
    successTips:function(msg){
        alert(msg||'操作成功！')
    },
    //错误提示
    errorTips:function(msg){
        alert(msg||'哪里不对了吧~')
    },
    //表单验证,是非空判断、手机、邮箱
    vaildate:function(value,type){
        var value= $.trim(value);//去掉空格并转成字符串
        if( type === 'require'){
            //是否为必须的字段
            return !!value // 把value转为布尔值
        }
        //手机号验证
        if(type == 'phone'){
            return /^1\d{10}$/.test(value)
        }
        //邮箱格式验证
        if(type == 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }
    },
    
    //统一登录
    doLogin: function () {
        //登录之后跳转回之前的页面
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    //跳转到主页
    goHome:function(){
        window.location.href = './index.html'
    }

}
module.exports = _mm