/*
 * @Author: like 
 * @Date: 2017-09-03 17:34:40 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 12:11:15
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

var page = {
    init:function(){
        this.onLoad()
    },
    onLoad:function(){
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        })
        // 加载用户信息
        this.loadUserInfo()
    },
    //加载用户信息
    loadUserInfo:function(){
        var userHtml = ''
       _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res)
            $('.panel-body').html(userHtml)
       },function(errMsg){
        _mm.errorTips(errMsg)
       })
    }
}
page.init()