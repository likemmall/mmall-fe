/*
 * @Author: like 
 * @Date: 2017-08-30 16:53:27 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-03 11:06:44
 */
'use strict'
require('./index.css')
require('page/common/m-nav-simple/index.js')
var _user = require('service/user-service.js')
var _mm = require('util/mm.js')


// 表单里的错误提示
var formError = {
    show:function(errMsg){
        $('.error-item').show().find('.err-message').text(errMsg)
    },
    hide:function(){
        $('.error-item').hide().find('.err-message').text('');
    }
}

// page逻辑部分
var page = {
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this
        // 验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val())
            //如果用户名为空，不做验证
            if(!username){ 
                return}
            //异步验证用户名是否存在
            _user.checkUsername(username,function(res){
                formError.hide()
            },function(errMsg){
                formError.show(errMsg)
            })
        })
        // 点击注册按钮
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
            'password':$.trim($('#password').val()),
            'passwordConfirm':$.trim($('#password-confirm').val()),
            'phone':$.trim($('#phone').val()),
            'email':$.trim($('#email').val()),
            'question':$.trim($('#question').val()),
            'answer':$.trim($('#answer').val())
        },
        //表单验证结果
        validateResult = this.formValidate(formData)
        //验证成功
        if(validateResult.status){
            //提交
            _user.register(formData,function(res){
                console.log()
                window.location.href ='./result.html?type=register'
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
        // 验证用户名是否为空
        if(!_mm.validata(formData.username,'require')){
            result.msg = '用户名不能为空'
            return result;
        }
        //验证密码是否为空
        if(!_mm.validata(formData.password,'require')){
            result.msg = '密码不能为空'
            return result;
        }
        // 验证密码的长度
        if(formData.password.length<6){
            result.msg = '密码长度不能少于6位'
            return result;
        }
        // 验证两次输入的密码是否一直
        if(formData.password !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致'
            return result;
        }
        // 验证手机号
        if(!_mm.validata(formData.phone,'phone')){
            result.msg = '手机格式不正确'
            return result;
        }
        // 验证邮箱
        if(!_mm.validata(formData.email,'email')){
            result.msg = '邮箱格式不正确'
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validata(formData.question,'require')){
            result.msg = '密码提示问题不能为空'
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validata(formData.answer,'require')){
            result.msg = '密码提示问题的答案不能为空'
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '注册成功'
        return result
    }
}
$(function(){
    page.init()
})