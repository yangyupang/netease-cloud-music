// pages/login/login.js
import create from '../../utils/store/create'
import store from '../../store/index'
import api from "../../http/api"
create.Page(store, {

    /**
     * 页面的初始数据
     */
    use: ['uid'],
    data: {
        active: 0,
        phoneNumber: '',
        pass1word: '',
        emailNumber: '',
        pass2word: ''
    },
    //点击切换时 清空输入框的值
    onChange(e) {
        if (e.detail.index === 0) {
            this.setData({
                emailNumber: '',
                pass2word: ''
            })
        }
        if (e.detail.index === 1) {
            this.setData({
                phoneNumber: '',
                pass1word: ''
            })
        }
    },
    changePhone(e) {
        // console.log(e.detail);
        this.setData({
            phoneNumber: e.detail
        })
    },
    changePass1(e) {
        // console.log(e.detail);
        this.setData({
            pass1word: e.detail
        })
    },
    changeEmail(e) {
        this.setData({
            emailNumber: e.detail
        })
    },
    changePass2(e) {
        this.setData({
            pass2word: e.detail
        })
    },
    //前往注册页  清空输入框里面的值
    goToRegister() {
        wx.navigateTo({
            url: '../register/register',
        })
        this.setData({
                phoneNumber: '',
                pass1word: '',
                emailNumber: '',
                pass2word: ''
            })
            // console.log(this.data.phoneNumber);
            // console.log(this.data.pass1word);
    },
    //手机号码登录
    phoneLog() {
        var pattern = /^1[3456789]\d{9}$/
        if (this.data.phoneNumber !== '' && this.data.pass1word !== '') {
            if (pattern.test(this.data.phoneNumber)) {
                api.loginbyTel(this.data.phoneNumber, this.data.pass1word).then(res => {
                    if (res.code === 200) {
                        wx.switchTab({
                            url: `../my/my`,
                        });
                        // this.store.data.uid = res.account.id
                        wx.setStorageSync("uid", res.account.id);
                        // console.log(res.account.id);
                    } else if (res.code === 501) {
                        //账号不存在
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            phoneNumber: '',
                        })
                    } else if (res.code === 502) {
                        //密码错误
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            pass1word: ''
                        })
                    }
                }).catch(err => {
                    if (err.status === 501) {
                        wx.showToast({
                            title: '您的手机号未注册',
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            phoneNumber: '',
                        })
                    }
                    console.log(err);
                });
            } else {
                wx.showToast({
                    title: '手机号格式错误',
                    icon: 'none',
                    duration: 1500,
                });
                this.setData({
                    phoneNumber: '',
                    pass1word: ''
                })
            }

        } else {
            wx.showToast({
                title: '手机号和密码不能为空',
                icon: 'none',
                duration: 1500,
            });
        }

    },
    //邮箱登录
    emailLog() {
        var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (this.data.emailNumber !== '' && this.data.pass2word !== '') {
            if (pattern.test(this.data.emailNumber)) {
                api.loginbyEmail(this.data.emailNumber, this.data.pass2word).then(res => {
                    if (res.code === 200) {
                        wx.switchTab({
                            url: `../my/my`,
                        });
                        // this.store.data.uid = res.account.id
                        wx.setStorageSync("uid", res.account.id);
                        // console.log(res.account.id);
                    } else if (res.code === 502) {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            emailNumber: '',
                            pass2word: ''
                        })
                    }
                }).catch(err => {
                    if (err.status === 501) {
                        wx.showToast({
                            title: '您的邮箱未注册',
                            icon: 'none',
                            duration: 1500,
                        });
                        this.setData({
                            emailNumber: '',
                        })
                    }
                    console.log(err);
                });
            } else {
                wx.showToast({
                    title: '邮箱格式错误',
                    icon: 'none',
                    duration: 1500,
                });
                this.setData({
                    emailNumber: '',
                    pass2word: ''
                })
            }

        } else {
            wx.showToast({
                title: '邮箱和密码不能为空',
                icon: 'none',
                duration: 1500,
            });
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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