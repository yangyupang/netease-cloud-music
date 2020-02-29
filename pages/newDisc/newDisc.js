// pages/newDisc/newDisc.jsv
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
        albumList: {},
        songs: [],
        ids: []
    },
    getAlbum(id) {
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        api.album(id).then(res => {
            if (res.code === 200) {
                let ids = []
                res.songs.map(item => {
                    ids.push(item.id)
                })
                this.setData({
                    albumList: res.album,
                    songs: res.songs,
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