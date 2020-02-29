// components/homePage/card/Card.js
import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    /**
     * 组件的属性列表
     */
    // 声明依赖
    use: ['playlist'],
    properties: {
        list: {
            type: Array,
            value: []
        },
        listTwo: {
            type: Array,
            value: []
        },
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
        showIndex: '0'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseItem(e) {
            // console.log(e);
            let num = e.currentTarget.dataset.num
            this.setData({
                showIndex: num
            })
        },
        clickItem(e) {
            if (this.properties.title === 'personalized') {
                wx.navigateTo({
                    url: `/pages/recommendPlaylist/recommendPlaylist?id=${e.currentTarget.dataset.item.id}`,
                });
            } else if (this.properties.title === 'discAndSong') {
                if (this.data.showIndex === "1") {
                    wx.navigateTo({
                        url: `/pages/musicPlay/musicPlay?songId=${e.currentTarget.dataset.item.id}`,
                    });
                } else {
                    wx.navigateTo({
                        url: `/pages/newDisc/newDisc?id=${e.currentTarget.dataset.item.id}`,
                    });
                }
            } else if (this.properties.title === 'song') {
                wx.navigateTo({
                    url: `/pages/musicPlay/musicPlay?songId=${e.currentTarget.dataset.item.id}`,
                });
            } else if (this.properties.title === 'dj') {
                wx.navigateTo({
                    url: `/pages/radio/radio?id=${e.currentTarget.dataset.item.id}`,
                });
            } else if (this.properties.title === 'recommend') {
                wx.navigateTo({
                    url: `/pages/musicPlay/musicPlay?programId=${e.currentTarget.dataset.item.id}`
                });
            }
        }
    }
})