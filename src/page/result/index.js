/*
 * @Author: like 
 * @Date: 2017-09-02 12:04:19 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-02 15:47:32
 */
'use strict'
require('./index.css')
require('page/common/m-nav-simple/index.js')
var _mm = require('util/mm.js')

$(function () {
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success')
    //显示对应的提示元素
    $element.show()
    
})