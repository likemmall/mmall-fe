/*
 * @Author: like 
 * @Date: 2017-09-01 14:26:45 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-01 17:26:22
 */
'use-strict'
require('./index.css')
var _mm = require('util/mm.js')
var _user = require('service/user-service.js')
var _cart = require('service/cart-service.js')
var nav = {
    init:function(){
        this.bindEvent()
        this.loadCartCount()
        this.loadUserInfo()
        return this
    },
    bindEvent:function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin()
        })
        //注册点击事件
        $('.js-register').click(function(){
           window.location.href = './register.html'
        })
        //退出点击事件，请求到后端，让后端把登录状态删掉
        $('.js-logout').click(function(){
            _user.logout(function(res){
                //退出成功后刷新页面
                window.location.reload()
            },function(errMsg){
                _mm.errorTips(errMsg)
            })
        })
    },
    //加载用户信息
    loadUserInfo:function(){
        _user.checkLogin(function(res){
           
          $('.user.not-login').hide()
          $('.user.is-login').show().find('.username').text(res.username)
        },function(errMsg){
           //doNothing
        })
    },
    //加载购物车数量
    loadCartCount:function(){
        _cart.getCartCount(function(res){
            $('.m-nav .cart-count').text(res || 0)
        },function(errMsg){
            $('.m-nav .cart-count').text(0)
        })
    }
}

module.exports = nav.init()