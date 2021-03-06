// pages/radio/radio.js
import api from "../../http/api"
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['playlist'],
    computed: {
        length() {
            return this.playlist.length
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        //其他乱七八糟的
        djRadio: [],
        //电台节目
        songs: [],
        //电台简介
        radio: [],
        //主播
        dj: {},
        comments: [],
        activeIndex: 0,
        id: '',
        limit: 0,
        playlistLength: 0
    },
    getDjprogramDetail(id) {
        api.djDetail(id).then(res => {
            if (res.code === 200) {
                this.setData({
                    djRadio: res.djRadio,
                    dj: res.djRadio.dj,
                    limit: res.djRadio.programCount,
                    comments: res.djRadio.commentDatas
                })
                this.programList(this.data.limit)
            }
        }).catch(err => {
            console.log(err);
        });
    },
    programList(lim) {
        api.programList(this.data.id, lim).then(res => {
            if (res.code === 200) {
                this.setData({
                    songs: res.programs
                })
            }
            // console.log(res);
        }).catch(err => {
            console.log(err);
        });
    },
    choose(e) {
        this.setData({
            activeIndex: e.currentTarget.dataset.index
        })
    },
    chooseSong(e) {
        wx.navigateTo({
            url: `../../pages/musicPlay/musicPlay?programId=${e.currentTarget.dataset.item.id}`
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options.id);
        this.setData({
            id: options.id
        })
        this.getDjprogramDetail(options.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({
            playlistLength: this.store.data.playlist.length
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})