/*
 * @Author: like 
 * @Date: 2017-09-01 15:04:58 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 12:38:20
 */

'use-strict'
var _mm = require('util/mm.js')
var _user = {
    //登录
    login:function(userInfo,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/user/login.do'),
            data:userInfo,
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    //退出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //用户注册时候的用户名检测
    checkUsername:function(username,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data:{
                type:'username',
                str:username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 用户注册
    register:function(userInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 获取用户密码提示问题
    getQuestion:function(username,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_get_question.do'),
            data:{
                username:username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 获取用户密码提示问题的答案
    checkAnswer:function(userInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_check_answer.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 设置新密码
    resetPassword:function(userInfo,resolve,reject){
        _mm.request({
            url: _mm.getServerUrl('/user/forget_reset_password.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //检查登录状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //获取当前登录用户的详细信息，并强制登录
    getUserInfo: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //.登录状态更新个人信息 
    updateInfo: function (userInfo,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/update_information.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //.登录中状态重置密码 
    resetPass: function (userInfo,resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/reset_password.do'),
            data:userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },


}

module.exports = _user