// components/navCustom/navCustom.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ""
        }
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        back() {
            wx.navigateBack()
        },
    }
})