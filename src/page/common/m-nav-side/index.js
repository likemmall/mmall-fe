/*
 * @Author: like 
 * @Date: 2017-09-01 20:57:06 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-04 10:17:07
 */
'use-strict'
require('./index.css')


var _mm = require('util/mm.js')
var templeIndex = require('./index.string')
//侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            { name: 'user-center', desc: '个人中心', href: './user-center.html' },
            { name: 'order-list', desc: '我的订单', href: './order-list.html' },
            { name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html' },
            { name: 'about', desc: '关于MMall', href: './about.html' }
        ]
    },
    init: function (option) {
        //合并选项
        $.extend(this.option, option)
        this.renderNav()
    },
    //渲染导航菜单
    renderNav: function () {
        //计算active数据
        this.option.navList.forEach(function (element) {
            if (element.name === this.option.name) {
                element.isActive = true
            }
        }, this)
        //渲染list数据
        var navHtml = _mm.renderHtml(templeIndex, {
            navList: this.option.navList
        })
        //把html放入容器
        $('.m-nav-side').html(navHtml)
    }

}
module.exports = navSide
