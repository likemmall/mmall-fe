/*
 * @Author: like 
 * @Date: 2017-09-05 12:21:43 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-05 14:00:35
 */
'use strict'
require('./index.css')
var _mm = require('util/mm.js')
var templePagination = require('./index.string')

var Pagination = function () {
    var _this = this
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    }
    $(document).on('click','.pg-item',function(){
        var $this = $(this)
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')):''
    })
}
//渲染分页组件
Pagination.prototype.render = function(userOption){
    this.option = $.extend({},this.defaultOption,userOption)
    // 判断容器是否为合法的jQuery对象
    if(!(this.option.container instanceof jQuery)){
        return
    }
    // 判断是否只有一页
    if(this.option.pages <= 1){
        return
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml())
}
// 获取分页的html
Pagination.prototype.getPaginationHtml = function(){
    var pageArray = [],
        option = this.option,
        start = option.pageNum - option.pageRange>0?option.pageNum - option.pageRange:1,
        end = option.pageNum + option.pageRange<option.pages?option.pageNum + option.pageRang:option.pages
    pageArray.push({
        name:'上一页',
        value:this.option.prePage,
        disabled:!this.option.hasPreviousPage
    })
    // 数字按钮的处理
    for (var i=start;i<=end;i++){
        pageArray.push({
            name:i,
            value:i,
            active:(i===option.pageNum)
        })
    }
    pageArray.push({
        name:'下一页',
        value:option.nextPage,
        disabled:!option.hasNextPage

    })
    var html = _mm.renderHtml(templePagination,{
        pageArray:pageArray,
        pageNum:option.pageNum,
        pages:option.pages
    })
    return html
} 

module.exports = Pagination