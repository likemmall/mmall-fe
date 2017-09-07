/*
 * @Author: like 
 * @Date: 2017-09-03 17:34:40 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 15:09:27
 * userCenter
 */
'use strict'
require('./index.css')
require('page/common/m-nav/index.js')
require('page/common/m-header/index.js')
var navSide = require('page/common/m-nav-side/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var templateIndex = require('./index.string')

// 表单里的错误提示
var formError = {
    show:function(errMsg){
        $('.error-item').show().find('.err-message').text(errMsg)
    },
    hide:function(){
        $('error-item').hide()
    }
}

var page = {
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'user-pass-update'
        })
        // 加载用户信息
        this.loadUserInfo()
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = ''
        _user.getUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res)
            $('.panel-body').html(userHtml)
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    bindEvent: function () {
        var _this = this
        $(document).on('click', '#btn-submit', function () {
            var formData = {
                passwordOld: $.trim($('#passwordOld').val()),
                passwordNew: $.trim($('#passwordNew').val())
            }
            var valiResult = _this.validateForm(formData)
            console.log(valiResult.status)
            if(valiResult.status){
                 formError.hide()
                _user.resetPass(formData, function (res) {
                    _mm.successTips(res.msg)
                    window.location.href = './user-login.html'
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }else{
                formError.show(valiResult.msg)
            }
        })
    },
    //验证用户输入信息
    validateForm:function(formData){
        var passwordNewConfirm =  $.trim($('#passwordNewConfirm').val())
        console.log(passwordNewConfirm)
        console.log(formData.passwordNew)
        var result = {
            status:false,
            msg:''
        }
        //验证密保问题的答案是否为空
        if(!_mm.validata(formData.passwordNew,'require') ||formData.passwordNew.length<6){
            result.msg='新密码不能少于6位数！'
            return result
        }
        if(!_mm.validata(formData.passwordOld,'require')){
            result.msg='请输入旧密码！'
            return result
        }
        if( passwordNewConfirm !=formData.passwordNew){
            result.msg='两次输入的密码不一致！'
            return result
        }
        result.status = true
        result.msg = '修改成功'
        return result

    }
}
page.init()