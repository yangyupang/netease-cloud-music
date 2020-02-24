// components/singerPage/singerList/singerList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        singerList: {
            type: Array,
            value: []
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        add() {
            this.properties.limit += 30
            this.setData({
                limit: this.properties.limit
            })
            this.triggerEvent('newLimit', this.properties.limit)
        },
        chooseItem(e) {
            wx.navigateTo({
                url: `../../pages/singerDetails/singerDetails?id=${e.currentTarget.dataset.item.id}`,
            });
            // console.log(e.currentTarget.dataset.item.id);

        }
    }
})