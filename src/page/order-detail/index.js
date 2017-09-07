/*
 * @Author: like 
 * @Date: 2017-09-03 17:34:40 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 15:42:12
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


var page = {
    data: {
        orderNumber: _mm.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name: 'order-list'
        })
        // 加载订单列表
        this.loadDetail()
    },
    bindEvent: function () {
        var _this = this;
        // 取消订单
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm("确定要取消订单？")){
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        })
    },
    //加载订单列表
    loadDetail: function () {
        var detailHtml = '',
            _this = this,
            $content = $('.m-content')
        $content.html('<div id="m-loading"> <div id="rond"> <div id="test"></div> </div> <div id="load"> <p>loading</p>  </div> </div>')
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            _this.dataFilter(res);
            detailHtml = _mm.renderHtml(templateIndex, res)
            $content.html(detailHtml)

        }, function (errMsg) {
            $content.html('<p class = "err-tip">' + errMsg + '</p>')
        })
    },
    dataFilter: function (resData) {
        resData.needPay = resData.status == 10;
        resData.isCancelable = resData.status == 10;
    }
}
page.init()