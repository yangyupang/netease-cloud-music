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
        gotoArtist() {
            wx.navigateTo({
                url: `/pages/singerDetails/singerDetails?id=${this.properties.item.id}`
            });
        }
    },
    ready() {}
})