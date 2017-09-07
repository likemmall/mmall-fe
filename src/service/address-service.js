/*
 * @Author: like 
 * @Date: 2017-09-01 15:28:38 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 10:05:27
 */
'use strict'
var _mm = require('util/mm.js')
var _address = {
    //获取购物车数量
    getAddressList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/shipping/list.do"),
            data: {
                pageSize: 20
            },
            success: resolve,
            error: reject

        })
    },
    //保存新地址
    save: function (addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/shipping/add.do"),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },
    //选中查看具体的地址
    getAddress: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/shipping/select.do"),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    },
    // 更新地址
    update: function (addressInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/shipping/update.do"),
            data: addressInfo,
            success: resolve,
            error: reject

        })
    },
    // 删除地址
    deleteAddress: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl("/shipping/del.do"),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        })
    },
}
module.exports = _address