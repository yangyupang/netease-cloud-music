// components/homePage/card/Card.js
Component({
    /**
     * 组件的属性列表
     */
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
                // console.log(e.currentTarget.dataset.item.id);                // console.log("我被点了");
            } else if (this.properties.title === 'discAndSong') {
                if (this.data.showIndex === "1") {
                    console.log("新歌");
                    console.log(e.currentTarget.dataset.item);
                } else {
                    wx.navigateTo({
                        url: `/pages/newDisc/newDisc?id=${e.currentTarget.dataset.item.id}`,
                    });
                    // console.log("新碟");
                    // console.log(e.currentTarget.dataset.item.id);
                }
            } else if (this.properties.title === 'song') {
                console.log("音乐新势力");
            } else if (this.properties.title === 'dj') {
                wx.navigateTo({
                    url: `/pages/radio/radio?id=${e.currentTarget.dataset.item.id}`,
                });
                // console.log(e.currentTarget.dataset.item.id);
            } else if (this.properties.title === 'recommend') {
                wx.navigateTo({
                    url: `/pages/program/program?id=${e.currentTarget.dataset.item.id}`,
                });
                // console.log(e.currentTarget.dataset.item.id);
            }
            // console.log(e.currentTarget.dataset.item);
            // let item =
        }
    }
})