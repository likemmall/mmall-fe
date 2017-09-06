/*
 * @Author: like 
 * @Date: 2017-09-05 14:34:17 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-06 15:02:48
 * detail
 */
'use strict'
require('./index.css')
require('page/common/m-header/index.js')
var nav = require('page/common/m-nav/index.js')
var _mm = require('util/mm.js')
var _product = require('service/product-service.js')
var _cart = require('service/cart-service.js')
var templateIndex = require('./index.string')

var page = {
    data: {

    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {

        this.loadCart()
    },
    bindEvent: function () {
        var _this = this;
        // 商品的选择/取消选择
        $(document).on('click', '.cart-select', function (event) {
            event.preventDefault();
            var $this = $(this),
                productId = $this.parents('.cart-list').data('product-id')
            //选中
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError()
                })
            } else {//取消选中
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError()
                })
            }
        })
        // 商品的全选/取消全选
        $(document).on('click', '.cart-select-all', function (event) {
            event.preventDefault();
            var $this = $(this)
            //全选
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError()
                })
            } else {//取消全选
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res)
                }, function (errMsg) {
                    _this.showCartError()
                })
            }

        })

        // 商品数量的变化
        $(document).on('click', '.count', function (event) {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currentCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-list').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0
            if (type === 'plus') {
                if (currentCount >= maxCount) {
                    _mm.errorTips('商品数量已达到上限')
                    return
                }
                newCount = currentCount + 1
            } else if (type === 'minus') {
                if (currentCount <= minCount) {
                    _mm.errorTips('不能再少了')
                    return
                }
                newCount = currentCount - 1
            }
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res)
            }, function (errMsg) {
                _this.showCartError()
            })

        })
        // 删除单个商品
        $(document).on('click', '.cart-delete', function (event) {
            // event.preventDefault();

            if (window.confirm('确认要删除该商品吗')) {
                var productId = $(this).parents('.cart-list').data('product-id')
                _this.deleteCartProduct(productId)
            }
        })
        // 删除选中
        $(document).on('click', '.del-sel', function (event) {

            var arrProductIds = [],
                $selectedItem = $('.cart-select:checked')
            for (var i = 0, iLength = $selectedItem.length; i < iLength; i++) {
                arrProductIds.push($($selectedItem[i])
                    .parents('.cart-list').data('product-id'))
            }
            if (arrProductIds.length) {
                if (window.confirm('确认要删除选中的商品吗')) {
                    _this.deleteCartProduct(arrProductIds.join(','))
                }
            } else {
                _mm.errorTips('您还没有选中要删除的商品')
            }

        })
        // 提交购物车
        $(document).on('click', '.btn-submit', function (event) {
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './confirm.html'
            }else{
                _mm.errorTips('请选择商品后再提交')
            }
        })
    },
    // 加载购物车信息
    loadCart: function () {
        var _this = this
        // 获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            _this.showCartError()
        })
    },
    // 渲染购物车
    renderCart: function (data) {
        this.filter(data)
        // 缓存购物车信息
        this.data.cartInfo = data
        // 生成html
        var cartHtml = _mm.renderHtml(templateIndex, data)
        $('.page-wrap').html(cartHtml)
        // 通知导航的购物车更新数量
        nav.loadCartCount()
    },
    filter: function (data) {
        data.notEmpty = !!data.cartProductVoList.length
    },
    // 删除指定商品，支持批量，producId用逗号分割
    deleteCartProduct: function (productIds) {
        var _this = this
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res)
        }, function (errMsg) {
            _this.showCartError()
        })
    },
    showCartError: function () {
        $('.page-wrap').html('<p class = "errTips">哪里不对了，刷新下试试吧</p>')
    }

}

$(function () {
    page.init()
})