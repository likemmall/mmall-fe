/*
 * @Author: like 
 * @Date: 2017-08-30 16:54:15 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 21:56:35
 * index
 */
'use strict'
require('./index.css')
require('page/common/m-nav/index.js')
require('page/common/m-header/index.js')
require('util/slider/index.js')
var navSide = require('page/common/m-nav-side/index.js')
var _mm = require('util/mm.js')
var templateBanner = require('./index.string')
$(function () {
    // 渲染banner的html
    var banerHtml = _mm.renderHtml(templateBanner)
    $('.banner-con').html(banerHtml)
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true,
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next'
        $slider.data('unslider')[forward]()
    })
});