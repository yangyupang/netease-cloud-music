Component({
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        }
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
        gotoRadio() {
            wx.navigateTo({
                url: `/pages/radio/radio?id=${this.properties.item.id}`
            });
        }
    }
})