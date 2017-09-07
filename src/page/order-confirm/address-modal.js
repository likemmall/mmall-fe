/*
 * @Author: like 
 * @Date: 2017-09-05 14:34:17 
 * @Last Modified by: like
 * @Last Modified time: 2017-09-07 09:57:10
 * detail
 */
'use strict'
var _mm = require('util/mm.js')
var _address = require('service/address-service.js')
var _cities = require('util/cities/index.js')
var templateAddressModal = require('./address-modal.string')

var addressModal = {
    show: function (option) {
        // option绑定
        this.option = option
        this.option.data = option.data || {}
        this.$modalWrap = $('.modal-wrap')
        // 渲染页面
        this.loadModal()
        // 绑定事件
        this.bindEvent()
    },
    // 关闭弹窗
    hide: function () {
        this.$modalWrap.empty()
    },
    bindEvent: function () {
        var _this = this
        //  省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val()
            _this.loadCities(selectedProvince)
        })
        // 提交收货地址
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate
            //使用新地址且验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.save(receiverInfo.data, function (res) {
                    _mm.successTips('地址添加成功')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res)
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
            //更新收件人，并且验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.update(receiverInfo.data, function (res) {
                    _mm.successTips('地址修改成功')
                    _this.hide()
                    typeof _this.option.onSuccess === 'function'
                    && _this.option.onSuccess(res)
                }, function (errMsg) {
                    _mm.errorTips(errMsg)
                })
            }
            //验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了')
            }

        })
        // 点击叉号关闭弹窗
        this.$modalWrap.find('.close').click(function (ev) {
            _this.hide()
        })
        this.$modalWrap.find('.modal-container').click(function (ev) {
            ev.stopPropagation()
        })
    },
    // 加载弹出框
    loadModal: function () {
        var addressModalHtml = _mm.renderHtml(templateAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        })
        this.$modalWrap.html(addressModalHtml)
        // 加载省份
        this.loadProvince()
        // 加载城市
        // this.loadCities()
    },
    // 加载省份
    loadProvince: function () {
        var isUpdate = this.option.isUpdate,
            provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province')
        $provinceSelect.html(this.getSelectOptions(provinces))
        // 如果是更新地址，并且有省份的信息，做省份回填
        var $province = this.option.data.receiverProvince
        if(isUpdate && $province){
            $provinceSelect.val($province)
        }
        this.loadCities($province)
    },

    // 加载城市
    loadCities: function (provinceName) {
        var cities = _cities.getCities(provinceName) || [],
            isUpdate = this.option.isUpdate,
            $citySelect = this.$modalWrap.find('#receiver-city')
        $citySelect.html(this.getSelectOptions(cities))

        // 如果是更新地址，并且有城市的信息，做城市回填
        if(isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity)
        }
    },
    // 获取表单里收件人信息，并做表单的验证
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = { status: false }
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val())
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val())
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val())
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val())
        receiverInfo.receiverMobile = $.trim(this.$modalWrap.find('#receiver-phone').val())
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val())

        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val()
        }
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名'

        }
        else if (!receiverInfo.receiverProvince || receiverInfo.receiverProvince==="请选择" ) {
            result.errMsg = '请选择收件所在省份'

        }
        else if (!receiverInfo.receiverCity || receiverInfo.receiverCity==="请选择") {
            result.errMsg = '请选择收件人所在城市'

        }
        else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址'

        }
        else if (!receiverInfo.receiverMobile) {
            result.errMsg = '请输入收件人手机号'

        }

        else {
            result.status = true
            result.data = receiverInfo
        }
        return result
    },
    // 获取select框的选项，输入：array,输出HTML
    getSelectOptions: function (optionArray) {
        var html = '<option>请选择</option>'
        for (var i = 0, len = optionArray.length; i < len; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html
    }
}

module.exports = addressModal