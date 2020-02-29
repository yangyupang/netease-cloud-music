// pages/recommendPlaylist/recommendPlaylist.js
import create from '../../utils/store/create'
import store from '../../store/index'
import api from "../../http/api"
create.Page(store, {
    //使用共享的数据 
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
        playlist: {},
        ids: []
    },
    getPlaylistDetail(id) {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        api.playlistDetail(id).then(res => {
            if (res.code === 200) {
                let ids = []
                res.playlist.tracks.map(item => {
                    ids.push(item.id)
                })
                this.setData({
                    playlist: res.playlist,
                    ids: ids
                })
                wx.hideLoading();
            }

        }).catch(err => {
            console.log(err);
        });
    },
    chooseSong(e) {
        wx.navigateTo({
            url: `/pages/musicPlay/musicPlay?songId=${e.currentTarget.dataset.item.id}`,
        });
        // console.log(e.currentTarget.dataset.item);
        // console.log(e.currentTarget.dataset.item.id);
    },
    toplayAll() {
        wx.navigateTo({
            url: `/pages/musicPlay/musicPlay?songId=${this.data.ids[0]}&ids=${JSON.stringify(this.data.ids)}`
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getPlaylistDetail(options.id)
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