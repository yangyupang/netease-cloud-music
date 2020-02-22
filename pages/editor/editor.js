// pages/editor/editor.js
import api from "../../http/api"
import area from "../../assets/js/area";
var time = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        nickname: '',
        birthday: '',
        birthdayNum: '',
        gender: "秘密",
        genderList: ["秘密", "男", "女"],
        genderNum: 0,
        province: '',
        city: '',
        provinceNum: '',
        cityNum: '',
        address: '',
        signature: '',
        areaList: area,
        currentDate: "",
        maxDate: new Date().getTime(),
        minDate: new Date(1960, 1, 1).getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            } else if (type === 'day') {
                return `${value}日`;
            }
            return value;
        },
        showDate: false,
        showArea: false,
        showGender: false,

    },
    onInput(event) {
        this.setData({
            currentDate: event.detail
        });
    },
    getUserDet() {
        api.userDet(this.data.uid).then(res => {
            // res.profile.nickname 昵称  res.profile.gender 性别   res.profile.signature 签名
            //res.profile.birthday 生日   res.profile.province 省份  res.profile.city 城市
            if (res.code === 200) {
                this.setData({
                    nickname: res.profile.nickname,
                    genderNum: res.profile.gender,
                    signature: res.profile.signature,
                    cityNum: res.profile.city,
                    provinceNum: res.profile.province,
                })
                if (res.profile.birthday > 0) {
                    this.setData({
                        birthday: time.formatTime(res.profile.birthday, 'Y/M/D'),
                        currentDate: res.profile.birthday,
                        birthdayNum: res.profile.birthday,
                    })
                } else if (res.profile.birthday < 0) {
                    this.setData({
                        currentDate: new Date().getTime(),
                        birthdayNum: res.profile.birthday,
                    })
                }
                //存在省份
                if (res.profile.province > 0) {
                    for (let i in this.data.areaList.province_list) {
                        if (i == res.profile.province) {
                            this.setData({
                                province: this.data.areaList.province_list[i]
                            })
                        }
                    }
                }
                //存在城市
                if (res.profile.city > 0) {
                    for (let j in this.data.areaList.city_list) {
                        if (j == res.profile.city) {
                            this.setData({
                                city: this.data.areaList.city_list[j]
                            })
                        }
                    }
                }
                this.setData({
                    address: this.data.province + this.data.city
                })
                wx.hideLoading();
                // console.log(this.data.address);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    changeNickName(e) {
        this.setData({
            nickname: e.detail
        })
    },
    changeGender(e) {
        if (e.detail === "秘密") {
            this.setData({
                gender: 0
            })
        } else if (e.detail === "男") {
            this.setData({
                gender: 1
            })
        } else if (e.detail === "女") {
            this.setData({
                gender: 2
            })
        }
    },
    changeBirthday(e) {
        // this.setData({
        //     birthday: time.forTimeStamp(e.detail)
        // })
    },
    changeAddress(e) {

    },
    changeSignature(e) {
        this.setData({
            signature: e.detail
        })

    },
    // 点击设置性别
    genderArrow() {
        this.setData({
            showGender: true
        })
        if (this.data.showArea || this.data.showGender) {
            this.setData({
                showArea: false,
                showDate: false,
            })
        }
    },
    //点击设置生日
    birthdayArrow() {
        this.setData({
            showDate: true
        })
        if (this.data.showArea || this.data.showGender) {
            this.setData({
                showArea: false,
                showGender: false,
            })
        }
    },
    //点击设置地址
    addressArrow() {
        this.setData({
            showArea: true
        })
        if (this.data.showDate || this.data.showGender) {
            this.setData({
                showDate: false,
                showGender: false,
            })
        }
    },
    areaCancel() {
        this.setData({
                showArea: false
            })
            // console.log("点击了取消设置地址");
    },
    areaConfirm(e) {
        // console.log(e);
        this.setData({
            address: e.detail.values[0].name + e.detail.values[1].name,
            provinceNum: e.detail.values[0].code,
            cityNum: e.detail.values[1].code,
            showArea: false
        })
    },
    //确认生日
    dateConfirm(e) {
        this.setData({
            birthday: time.formatTime(e.detail, 'Y/M/D'),
            birthdayNum: e.detail,
            showDate: false
        })
    },
    dateCancel() {
        this.setData({
                showDate: false
            })
            // console.log("点击了取消设置生日");
    },
    genderConfirm(e) {
        this.setData({
            gender: e.detail.value,
            genderNum: e.detail.index,
            showGender: false
        })
    },
    genderCancel() {
        this.setData({
            showGender: false
        })
    },
    sure() {
        let myInformation = {
            nickname: this.data.nickname,
            genderNum: this.data.genderNum,
            signature: this.data.signature,
            provinceNum: this.data.provinceNum,
            cityNum: this.data.cityNum,
            birthdayNum: this.data.birthdayNum,
        }
        let key = this.data.uid + '_message'
        wx.setStorageSync(key, JSON.stringify(myInformation));
        wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1500,
        });
        // api.upUserDet(this.data.genderNum, this.data.signature, this.data.cityNum, this.data.nickname, this.data.birthdayNum, this.data.provinceNum).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            uid: options.uid
        })
        let key = options.uid + '_message'
        if (wx.getStorageSync(key)) {
            this.setData({
                nickname: JSON.parse(wx.getStorageSync(key)).nickname,
                genderNum: JSON.parse(wx.getStorageSync(key)).genderNum,
                signature: JSON.parse(wx.getStorageSync(key)).signature,
                cityNum: JSON.parse(wx.getStorageSync(key)).cityNum,
                provinceNum: JSON.parse(wx.getStorageSync(key)).provinceNum,
            })
            if (Number(JSON.parse(wx.getStorageSync(key)).birthdayNum) > 0) {
                this.setData({
                    birthday: time.formatTime(JSON.parse(wx.getStorageSync(key)).birthdayNum, 'Y/M/D'),
                    currentDate: JSON.parse(wx.getStorageSync(key)).birthdayNum,
                    birthdayNum: JSON.parse(wx.getStorageSync(key)).birthdayNum,
                })
            } else if (Number(JSON.parse(wx.getStorageSync(key)).birthdayNum) < 0) {
                this.setData({
                    currentDate: new Date().getTime(),
                    birthdayNum: JSON.parse(wx.getStorageSync(key)).birthdayNum,
                })
            }
            //存在省份
            for (let i in this.data.areaList.province_list) {
                // console.log(object);
                if (i == JSON.parse(wx.getStorageSync(key)).provinceNum) {
                    this.setData({
                        province: this.data.areaList.province_list[i]
                    })
                }
            }
            //存在城市
            for (let j in this.data.areaList.city_list) {
                if (j == JSON.parse(wx.getStorageSync(key)).cityNum) {
                    this.setData({
                        city: this.data.areaList.city_list[j]
                    })
                }
            }
            this.setData({
                    address: this.data.province + this.data.city
                })
                // wx.hideLoading();
        } else {
            this.getUserDet();
        }
        if (this.data.genderNum === 0) {
            this.setData({
                gender: "秘密"
            })
        } else if (this.data.genderNum === 1) {
            this.setData({
                gender: "男"
            })
        } else if (this.data.genderNum === 2) {
            this.setData({
                gender: "女"
            })
        }
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
        // wx.showLoading({
        //     title: "加载中...",
        //     mask: true,
        // });
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