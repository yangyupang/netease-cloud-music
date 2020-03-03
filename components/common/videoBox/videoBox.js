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
        choose(e) {
            wx.navigateTo({
                url: `/pages/videoPlayer/videoPlayer?vid=${e.currentTarget.dataset.item.vid}`
            });
        }
    }
})