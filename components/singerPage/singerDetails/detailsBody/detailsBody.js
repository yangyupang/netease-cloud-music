// components/singerPage/singerDetails/detailsBody/detailsBody.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        singerName: {
            type: String,
            value: ""
        },
        briefDesc: {
            type: String,
            value: ""
        },
        albumSize: {
            type: Number,
            value: 0
        },
        mvSize: {
            type: Number,
            value: 0
        },
        hotSongs: {
            type: Array,
            value: []
        },
        topFiveSongs: {
            type: Array,
            value: []
        },
        someHotSongs: {
            type: Array,
            value: []
        },
        hotAlbums: {
            type: Array,
            value: []
        },
        mvs: {
            type: Array,
            value: []
        },
        fromTop: {
            type: String,
            value: ""
        },
        limit: {
            type: Number,
            value: 0
        }
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {
        activeIndex: 0,
        showAll: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseItem(e) {
            this.setData({
                activeIndex: e.currentTarget.dataset.index,
                limit: 20
            })
            this.triggerEvent('newLimit', this.properties.limit)
                // console.log(e.currentTarget.dataset.index);
        },
        moreSong() {
            this.setData({
                activeIndex: 1,
            })

        },
        chooseSong(e) {
            console.log(e.currentTarget.dataset.item);
        },
        chooseAlbums(e) {
            console.log(e.currentTarget.dataset.item);
        },
        chooseMv(e) {
            console.log(e.currentTarget.dataset.item);
        },
        showAll() {
            this.setData({
                showAll: true
            })
        },
        add() {
            this.properties.limit += 20
            this.setData({
                limit: this.properties.limit
            })
            this.triggerEvent('newLimit', this.properties.limit)
        }
    }
})