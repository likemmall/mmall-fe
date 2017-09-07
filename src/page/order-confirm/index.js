/*
 * @Author: like 
 * @Date: 2017-09-05 14:34:17 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 10:30:44
 * detail
 */
'use strict'
require('./index.css')
require('page/common/m-header/index.js')
require('page/common/m-nav/index.js')
var _mm = require('util/mm.js')
var _address = require('service/address-service.js')
var _order = require('service/order-service.js')
var templateProduct = require('./product-list.string')
var templateAddress = require('./address-list.string')
var addressModal = require('./address-modal.js')

var page = {
    data: {
        selectAddressId: null
    },
    init: function () {
        this.onLoad()
        this.bindEvent()
    },
    onLoad: function () {
        this.loadAddressList()
        this.loadProductList()
    },
    bindEvent: function () {
        var _this = this;
        // 地址的选择
        $(document).on('click', '.address-item', function (event) {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active')
            _this.data.selectAddressId = $(this).data('id')
        })
        // 地址的添加
        $(document).on('click', '.address-add', function (event) {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList()
                }
            })
        })
        //地址的编辑
        $(document).on('click', '.address-update', function (event) {
            event.stopPropagation()
            // 读取这一条地址的信息回填到表单里
            var shippingId = $(this).parents('.address-item').data('id')
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList()
                    }
                })
            }, function (errMsg) {
                _mm.errorTips(errMsg)
            })
        })
        //地址的删除
        $(document).on('click', '.address-delete', function (event) {
            event.stopPropagation()
            var shippingId = $(this).parents('.address-item').data('id')
            if (window.confirm('确认要删除该地址吗')) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList()
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }

        })
        // 订单的提交
        $(document).on('click', '.order-submit', function (event) {
            var shippingId = _this.data.selectAddressId
            if (shippingId) {
                _order.creatOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo
                }, function (errMsg) {

                })
            } else {
                alert('请选择地址后再提交')
            }
        })
    },
    // 渲染地址列表
    loadAddressList: function () {
        // 生成html
        var _this = this,
           $addressCon = $('.address-con')
           $addressCon.html('<div id="m-loading">\
           <div id="rond">\
               <div id="test"></div>\
           </div>\
           <div id="load">\
               <p>loading</p>\
           </div>\
       </div>')
        _address.getAddressList(function (res) {
            _this.addressFilter(res)
            var addressHtml = _mm.renderHtml(templateAddress, res)
            $addressCon.html(addressHtml)
        }, function (errMsg) {
            $addressCon.html('<p class = "err-tip">地址加载失败,请刷新后重试</p>')
        })

    },
    // 处理地址列表中选中状态
    addressFilter:function(resData){
        if(this.data.selectAddressId){
            var selectAddressIdFlag = false
            resData.list.forEach(function(item){
                if(item.id == this.data.selectAddressId){
                    item.isActive = true
                    selectAddressIdFlag = true
                }
            }.bind(this))
        }
        // 如果以前选中的地址不在列表里，将其删除
        if(!selectAddressIdFlag){
            this.data.selectAddressId = null
        }
    },
    // 记载商品清单
    loadProductList: function () {
        // this.data.cartInfo = data
        // 生成html
        var $productCon = $('.product-con')
        $productCon.html('<div id="m-loading">\
        <div id="rond">\
            <div id="test"></div>\
        </div>\
        <div id="load">\
            <p>loading</p>\
        </div>\
    </div>')
        _order.getProductList(function (res) {
            var productHtml = _mm.renderHtml(templateProduct, res)
            $productCon.html(productHtml)
        }, function (errMsg) {
            $productCon.html('<p class = "err-tip">订单信息失败,请刷新后重试</p>')
        })

    }

}

$(function () {
    page.init()
})