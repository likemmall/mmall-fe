/*
 * @Author: like 
 * @Date: 2017-09-01 20:00:20 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-01 20:32:48
 */
'use strict'
require('./index.css')

var _mm = require('util/mm.js')
//通用页面头部
var header = {
    init:function(){
        this.bindEvent()
    },
    /*加载搜索框的时候，检查url是否带有keyword参数，如果有，就
    把搜索框里内容设为keyword*/
    onLoad:function(){
        var keyword = _mm.getUrlParam('keyword')
        if(keyword){
            $('#earch-input').val(keyword)
        }
    },
    bindEvent:function(){
        var _this = this
        //点击搜索按钮，做搜索提交
        $('#search-btn').click(function(e){
            _this.searchSubmit()
        })
        //输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode == 13){
                _this.searchSubmit()
            }
        })
    },
    //搜索的提交
    searchSubmit:function(){
        var keyword = $.trim($('#search-input').val())
        //如果提交的时候有keyword，正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword='+keyword
        }else{
            //如果keyword为空，直接返回首页
            _mm.goHome()
        }
    }
}
header.init()