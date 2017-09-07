/*
 * @Author: like 
 * @Date: 2017-08-30 16:53:27 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-02 21:43:55
 */
'use strict'
require('./index.css')
require('page/common/m-nav-simple/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')

// 表单里的错误提示
var formError = {
    show:function(errMsg){
        $('.error-item').show().find('.err-message').text(errMsg)
    },
    hide:function(){
        $('error-item').hide()
    }
}

/**
 * 逻辑分析
 * 点击登录按钮，拿到两个输入框的信息，做验证
 * 合规提交到后端
 * 成功了把参数传到链接跳转
 * 失败了就把验证信息返回到错误提示框
 */
// page逻辑部分
var page = {
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this
        $('#submit').click(function(){
            _this.submit()
        })
        $('.user-content').keyup(function(e){
            if(e.keyCode == 13){
                _this.submit()
            }
        })
    },
    // 提交表单
    submit:function(){
        var formData = {
            'username':$.trim($('#username').val()),
            'password':$.trim($('#password').val())
        },
        //表单验证结果
        validateResult = this.formValidate(formData)
        //验证成功
        if(validateResult.status){
            //提交
            _user.login(formData,function(res){
                window.location.href = _mm.getUrlParam('redirect')||'./index.html'
            },function(errMsg){
                formError.show(errMsg)
            })
        }else{//验证失败
            //错误提示
            formError.show(validateResult.msg)
        }
    },
    formValidate:function(formData){
        var result = {
            status:false,
            msg:''
        }
        if(!_mm.validata(formData.username,'require')){
            result.msg = '用户名不能为空'
            return result;
        }
        if(!_mm.validata(formData.password,'require')){
            result.msg = '密码不能为空'
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过'
        return result
    }
}
$(function(){
    page.init()
})