/*
 * @Author: like 
 * @Date: 2017-09-04 22:00:34 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-05 14:38:21
 * list
 */
'use strict'
require('./index.css')
require('page/common/m-nav/index.js')
require('page/common/m-header/index.js')
var _mm = require('util/mm.js')
var _product = require('service/product-service.js')
var templateIndex = require('./index.string')
var Pagination = require('util/pagination/index.js')

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            orderBy: _mm.getUrlParam('orderBy') || '',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadList()
    },
    bindEvent: function () {
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function () {
            var $this = $(this)
            _this.data.listParam.orderBy = 1
            // 默认排序
            if ($this.data('type') === 'default' && $this.hasClass('active')) {
                return
            } else {
                $this.addClass('active')
                    .siblings('.sort-item')
                    .removeClass('active asc desc')
                _this.data.listParam.orderBy = 'default'
            }
            // 价格排序
            if ($this.data('type') === 'price') {
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active')
                // 升序降序
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc')
                    _this.data.listParam.orderBy = 'price_asc'
                } else {
                    $this.addClass('desc').removeClass('asc')
                    _this.data.listParam.orderBy = 'price_desc'
                }
            }
            // 重新加载列表
            _this.loadList()
        })
    },
    //加载list数据
    loadList: function () {
        var _this = this,
            listParam = this.data.listParam,
            listHtml = '',
            $pListCon = $('.p-list-con')
            $pListCon.html('   <div id="m-loading"> <div id="rond"> <div id="test"></div> </div> <div id="load"> <p>loading</p>  </div> </div>')
            // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId)
            // 请求接口
        _product.getProductList(listParam, function (res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            })
            $pListCon.html(listHtml)
            _this.loadPagination({
                "pageNum": res.pageNum,
                "pages": res.pages,
                "prePage": res.prePage,
                "nextPage": res.nextPage,
                "hasPreviousPage": res.hasPreviousPage,
                "hasNextPage": res.hasNextPage,
            })
        }, function (errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container:$('.pagination'),
            onSelectPage:function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList()
            }
        }))
    }
}

$(function () {
    page.init()
})