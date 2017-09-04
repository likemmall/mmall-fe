/*
 * @Author: like 
 * @Date: 2017-08-30 16:53:27 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-03 17:21:44
 */
'use strict'
require('./index.css')
require('page/common/m-nav-simple/index.js')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-message').text(errMsg)
    },
    hide: function () {
        $('error-item').hide()
    }
}

// page逻辑部分
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadStepUsername()
    },
    bindEvent: function () {
        var _this = this
        // 输入用户名
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val())
            if (username) {
                //用户名存在
                _this.data.username = username
                _user.getQuestion(username, function (res) {
                    _this.data.question = res
                    _this.loadStepQuestion()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                // 用户名不存在
                formError.show('请输入用户名')
            }
        })
        // 输入密码提示的下一步
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val())
            if (answer) {
                //答案不为空
                _this.data.answer = answer
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: _this.data.answer
                }, function (res) {
                    _this.data.token = res
                    _this.loadStepPassword()
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                // 答案为空
                formError.show('请输入密码答案！')
            }
        })
        // 输入新密码后的按钮点击
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val())
            if (password && password.length >= 6) {
                //密码不为空
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew:password,
                    forgetToken: _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset'
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                // 用户名不存在
                formError.show('请输入不少于6位的密码')
            }
        })

    },
    // 加载输入用户名
    loadStepUsername: function () {
        $('.step-username').show()
    },
    // 加载输入密码提示问题答案
    loadStepQuestion: function () {
        //清除错误提示切换容器
        formError.hide()
        $('.step-username').hide()
        $('.step-question').show().find('.question').text(this.data.question)
    },
    // 加载输入新密码
    loadStepPassword: function () {
        formError.hide()
        $('.step-question').hide()
        $('.step-password').show()
    },
}
$(function () {
    page.init()
})