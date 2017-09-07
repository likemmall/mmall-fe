/*
 * @Author: like 
 * @Date: 2017-09-07 15:49:30 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 17:38:33
 */
'use strict'
require('./index.css')
require('page/common/m-nav/index.js')
require('page/common/m-header/index.js')
var _mm = require('util/mm.js')
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string')

var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber') //订单号
    },
    init: function () {
        this.onLoad()
    },
    onLoad: function () {
        //  加载detail数据
        this.loadPaymentInfo();
    },
    
    // 加载detail数据
    loadPaymentInfo: function () {
        var html = '',
            _this = this,
            $pageWrap = $('.page-wrap')
            $pageWrap.html('   <div id="m-loading"> <div id="rond"> <div id="test"></div> </div> <div id="load"> <p>loading</p>  </div> </div>')
            _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            // 渲染html
            html = _mm.renderHtml(templateIndex, res)
            $pageWrap.html(html)
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        })

    },
    // 监听订单状态
    listenOrderStatus:function(){
        var _this = this
        this.paymentTimer = window.setInterval(function(){
            _payment.getPaymentStatus(_this.data.orderNumber,function(res){
                if(res == true){
                    window.location.href 
                        ='./result.html?type=payment&orderNumber='+_this.data.orderNumber
                }
            })
        },5e3)
    }

}

$(function () {
    page.init()
})