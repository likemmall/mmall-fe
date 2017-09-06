/*
 * @Author: like 
 * @Date: 2017-09-01 15:28:38 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-06 14:38:18
 */
'use strict'
var _mm = require('util/mm.js')
var _cart = {
    //获取购物车数量
    getCartCount:function(resolve, reject){
        _mm.request({
            url:_mm.getServerUrl("/cart/get_cart_product_count.do"),
            success:resolve,
            error:reject

        })
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取购物车信息
    getCartList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消选择
    selectProduct : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data:{
                productId:productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 选择购物车商品
    unselectProduct : function(productId,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data:{
                productId:productId
            },
            success : resolve,
            error   : reject
        });
    },
    // 全选
    selectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 取消全选
    unselectAllProduct : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : resolve,
            error   : reject
        });
    },
    // 更新购物车数量
    updateProduct : function(cartInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : cartInfo,
            success : resolve,
            error   : reject
        });
    },
    // 移除购物车某个产品
    deleteProduct : function(productIds,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    :{ productIds:productIds},
            success : resolve,
            error   : reject
        });
    },
   
}
module.exports = _cart