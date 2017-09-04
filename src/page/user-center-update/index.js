/*
 * @Author: like 
 * @Date: 2017-09-03 17:34:40 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 13:28:23
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
            name: 'user-center'
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
                email: $.trim($('#email').val()),
                phone: $.trim($('#phone').val()),
                question: $.trim($('#question').val()),
                answer: $.trim($('#answer').val())
            }
            var valiResult = _this.validateForm(formData)
            if(valiResult.status){
                 formError.hide()
                _user.updateInfo(formData, function (res) {
                    _mm.successTips(res.msg)
                    window.location.href = './user-center.html'
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
        var result = {
            status:false,
            msg:''
        }

        //验证邮箱
        if(!_mm.validata(formData.email,'email')){
            result.msg='邮箱格式不正确'
            return result
        }
        //验证手机
        if(!_mm.validata(formData.phone,'phone')){
            result.msg='手机号格式不正确'
            return result
        }
        //验证密保问题是否为空
        if(!_mm.validata(formData.question,'require')){
            result.msg='问题不能为空'
            return result
        }
        //验证密保问题的答案是否为空
        if(!_mm.validata(formData.answer,'require')){
            result.msg='答案不能为空'
            return result
        }
        result.status = true
        result.status = '通过验证'
        return result

    }
}
page.init()