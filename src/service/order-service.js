/*
 * @Author: like 
 * @Date: 2017-09-01 15:28:38 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 15:43:21
 */
'use strict'
var _mm = require('util/mm.js')
var _order = {
    //获取购物车数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/cart/get_cart_product_count.do"),
            success: resolve,
            error: reject
        })
    },
    //获取商品清单
    getProductList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/order/get_order_cart_product.do"),
            success: resolve,
            error: reject
        })
    },
    //提交订单信息
    creatOrder: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/order/create.do"),
            data: shippingId,
            success: resolve,
            error: reject
        })
    },
    //获取用户订单列表
    getListInfo: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/order/list.do"),
            data: listParam,
            success: resolve,
            error: reject
        })
    },
    //获取订单详情信息
    getOrderDetail: function (orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/order/detail.do"),
            data: {
                orderNo:orderNumber
            },
            success: resolve,
            error: reject
        })
    },
    //取消订单
    cancelOrder: function (orderNumber, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/order/cancel.do"),
            data: {
                orderNo:orderNumber
            },
            success: resolve,
            error: reject
        })
    },

}
module.exports = _order