/*
 * @Author: like 
 * @Date: 2017-09-01 15:28:38 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-01 16:58:47
 */
'use strict'
var _mm = require('util/mm.js')
var _cart = {
    //获取购物车数量
    getCartCount:function(resolve, reject){
        _mm.request({
            url:_mm.getServerUrl("/cart/cart/get_cart_product_count.do"),
            success:resolve,
            error:reject

        })
    }
}
module.exports = _cart