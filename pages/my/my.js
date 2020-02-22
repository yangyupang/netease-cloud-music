// pages/my/my.js
import create from '../../utils/store/create'
import store from '../../store/index'
import api from "../../http/api"
create.Page(store, {
    use: ['uid'],
    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        level: '',
        profile: {}
    },
    goToLogin() {
        wx.navigateTo({
            url: '../../pages/login/login',
        });
        // console.log("gogo");
    },
    getUserDet() {
        api.userDet(this.data.uid).then(res => {
            //res.level 用户等级  res.profile.nickname 昵称  res.profile.avatarUrl 头像 res.profile.gender 性别
            //res.profile.signature 签名  res.profile.follows关注 res.profile.eventCount 动态 res.profile.followeds 粉丝
            if (res.code === 200) {
                this.setData({
                        level: res.level,
                        profile: res.profile
                    })
                    // console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    outLogin() {
        if (wx.getStorageSync("uid")) {
            wx.showModal({
                title: '退出提示',
                content: '您确定要退出登录吗',
                success: (res => {
                    if (res.confirm) {
                        // api.logout().then(res => {
                        //     console.log(res);
                        // }).catch(err => {
                        //     console.log(err);
                        // });
                        wx.removeStorageSync(uid);
                        // wx.clearStorageSync();
                        this.setData({
                            uid: ''
                        })
                    } else if (res.cancel) {}
                })
            })
        }

    },
    changeEditor() {
        wx.navigateTo({
            url: `../../pages/editor/editor?uid=${this.data.uid}`,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        // getUserDet(id)
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
        // console.log(this.store.data.uid);
        if (wx.getStorageSync("uid")) {
            this.setData({
                uid: wx.getStorageSync("uid")
            })
            this.getUserDet();
        }
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