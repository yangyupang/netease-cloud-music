// pages/radio/radio.js
import api from "../../http/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //其他乱七八糟的
        program: [],
        //电台节目
        songs: [],
        //电台简介
        radio: [],
        //主播
        dj: {},
        comments: [],
        activeIndex: 1,
    },
    getDjprogramDetail(id) {
        api.djprogramDetail(id).then(res => {
            if (res.code === 200) {
                if (res.program.songs.length === 0) {
                    this.data.songs[0] = res.program.mainSong
                    this.setData({
                        songs: this.data.songs
                    })
                } else {
                    this.setData({
                        songs: res.program.songs
                    })
                }
                this.setData({
                    radio: res.program.radio,
                    dj: res.program.dj,
                    program: res.program
                })
            }
        }).catch(err => {
            console.log(err);
        });
    },
    getDjproComment(id) {
        api.djproComment(id).then(res => {
            if (res.code === 200) {
                this.setData({
                    comments: res.comments
                })
            }
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
        console.log(e.currentTarget.dataset.item);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options.id);
        this.getDjprogramDetail(options.id)
        this.getDjproComment(options.id)

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