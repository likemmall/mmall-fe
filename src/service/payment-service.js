/*
 * @Author: like 
 * @Date: 2017-09-07 15:50:54 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 16:00:54
 */

'use strict'
var _mm = require('util/mm.js')
var _payment = {
    //获取商品列表
    getPaymentInfo:function(orderNumber,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/order/pay.do'),
            data:{
                orderNo:orderNumber
            },
            method:'POST',
            success:resolve,
            error:reject
        })
    },
    // 获取订单状态
    getPaymentStatus:function(orderNumber,resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/order/query_order_pay_status.do'),
            data:{
                orderNo:orderNumber
            },
            method:'POST',
            success:resolve,
            error:reject
        })
    },
   
}

module.exports = _payment