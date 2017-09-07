/*
 * @Author: like 
 * @Date: 2017-09-03 17:34:40 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 14:51:36
 * order-list
 */
'use strict'
require('./index.css')
require('page/common/m-nav/index.js')
require('page/common/m-header/index.js')
var navSide = require('page/common/m-nav-side/index.js')
var _mm = require('util/mm.js')
var _order = require('service/order-service.js')
var templateIndex = require('./index.string')
var Pagination = require('util/pagination/index.js')


var page = {
    data: {
        listParam: {
            pageNum: 1,  //当前页
            pageSize: 10 //一页的显示的个数
        }
    },
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'order-list'
        })
        // 加载订单列表
        this.loadOrderList()
    },
    //加载订单列表
    loadOrderList: function () {
        var orderListHtml = '',
            _this = this
            $('.order-list-con').html('   <div id="m-loading"> <div id="rond"> <div id="test"></div> </div> <div id="load"> <p>loading</p>  </div> </div>')
        _order.getListInfo(this.data.listParam, function (res) {
            orderListHtml = _mm.renderHtml(templateIndex, res)
            $('.order-list-con').html(orderListHtml)
            _this.loadPagination({
                "pageNum": res.pageNum,
                "pages": res.pages,
                "prePage": res.prePage,
                "nextPage": res.nextPage,
                "hasPreviousPage": res.hasPreviousPage,
                "hasNextPage": res.hasNextPage,
            })
        }, function (errMsg) {
            $('.order-list-con').html('<p class = "err-tip">加载订单失败，请刷新后重试</p>')
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
                _this.loadOrderList()
            }
        }))
    }
}
page.init()