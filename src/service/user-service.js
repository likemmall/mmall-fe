/*
 * @Author: like 
 * @Date: 2017-09-01 15:04:58 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-01 17:21:41
 */

'use-strict'
var _mm = require('util/mm.js')
var _user = {
    //退出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            succcess: resolve,
            error: reject
        })
    },
    //检查登录状态
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            succcess: resolve,
            error: reject
        })
    }
}

module.exports = _user