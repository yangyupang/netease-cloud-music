// pages/newDisc/newDisc.jsv
import api from "../../http/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        albumList: {},
        songs: []
    },
    getAlbum(id) {
        api.album(id).then(res => {
            if (res.code === 200) {
                this.setData({
                    albumList: res.album,
                    songs: res.songs
                })
                console.log(res.album);
                console.log(res.songs);
            }

        }).catch(err => {
            console.log(err);
        });
    },
    chooseSong(e) {
        console.log(e.currentTarget.dataset.item.id);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getAlbum(options.id)
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})