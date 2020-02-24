// pages/singerDetails/singerDetails.js
import api from "../../http/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        singerName: '',
        briefDesc: '',
        picUrl: '',
        hotSongs: [],
        topFiveSongs: [],
        someHotSongs: [],
        // 专辑数量
        albumSize: 0,
        //mv数量
        mvSize: 0,
        limit: 20,
        hotAlbums: [],
        mvs: [],
        fromTop: 0,
        id: '',
    },
    getSong(id) {
        api.getSong(id).then(res => {
            if (res.code === 200) {
                this.setData({
                    singerName: res.artist.name,
                    briefDesc: res.artist.briefDesc,
                    picUrl: res.artist.picUrl,
                    albumSize: res.artist.albumSize,
                    mvSize: res.artist.mvSize,
                    hotSongs: res.hotSongs,
                    topFiveSongs: res.hotSongs.slice(0, 5),
                    someHotSongs: res.hotSongs.slice(0, 20),
                })
                wx.hideLoading();
                // console.log(this.data.singerName);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //专辑
    getAlbum(id) {
        api.getAlbum(id, this.data.limit).then(res => {
            if (res.code === 200) {
                this.setData({
                    hotAlbums: res.hotAlbums,
                })
                wx.hideLoading();
            }
        }).catch(err => {
            console.log(err);
        });
    },
    getMv(id) {
        api.getMv(id, this.data.limit).then(res => {
            if (res.code === 200) {
                this.setData({
                    mvs: res.mvs,
                })
                wx.hideLoading();
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //触底 limit + 20 返回重新加载
    newLimit(e) {
        this.data.limit = e.detail
        this.setData({
            limit: this.data.limit,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        this.setData({
            id: options.id
        })
        this.getSong(options.id);
        this.getAlbum(options.id)
        this.getMv(options.id)

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
        wx.showLoading({
            title: '加载中...',
        });
        this.selectComponent("#singerDetail").add();
        setTimeout(() => {
            this.getAlbum(this.data.id)
            this.getMv(this.data.id)
        }, 200);
        // console.log(this.data.limit);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    onPageScroll: function(e) {
        this.setData({
                fromTop: (e.scrollTop).toFixed(0)
            })
            // console.log(this.data.fromTop);
    }
})