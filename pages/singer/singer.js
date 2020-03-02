import api from "../../http/api" // pages/singer/singer.js
var time = require('../../utils/util.js');
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
        typeList: [],
        initial: [],
        limit: 30,
        code: 5001,
        letter: '',
        artists: [],
        showLetter: 0,
        chooseLetter: 0,
        chooseType: 0,
    },
    // getTypeList(){
    //   api.typeList
    // },

    //选择歌手
    clickItem(e) {
        wx.showLoading({
            title: '加载中...',
        });
        let index = e.currentTarget.dataset.index
        let item = e.currentTarget.dataset.item
        this.setData({
            showLetter: index,
            chooseType: index,
            chooseLetter: 0,
            code: item.id,
            letter: '',
            limit: 30
        })
        this.getArtist()
    },
    clickLetter(e) {
        wx.showLoading({
            title: '加载中...',
        });
        let index = e.currentTarget.dataset.index
        let item = e.currentTarget.dataset.item
        this.setData({
            chooseLetter: index,
            letter: item
        })
        if (this.data.letter === "热") {
            this.setData({
                letter: ''
            })
            this.getArtist()
        } else {
            this.getArtist()
        }
    },
    getArtist() {
        api.artist(this.data.limit, this.data.code, this.data.letter).then(res => {
            if (res.code === 200) {
                this.setData({
                    artists: res.artists
                })
                wx.hideLoading();
            }
            // console.log(this.data.artists);
        }).catch(res => {
            console.log(re);
        });
    },
    //触底 limit + 30 返回重新加载
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
            typeList: api.typeList,
            initial: api.initial
        })
        this.getArtist()

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
        this.selectComponent("#enter").add();
        this.getArtist();
        // this.data.limit += 30
        // this.setData({
        //     limit: this.data.limit
        // })
        // console.log(this.data.limit);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})