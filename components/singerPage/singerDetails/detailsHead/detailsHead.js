// components/singerPage/singerDetails/detailsHead/detailsHead.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        singerName: {
            type: String,
            value: ""
        },
        picUrl: {
            type: String,
            value: ""
        }
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {
        isShow: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        save() {
            this.setData({
                    isShow: true
                })
                // console.log("我想保存图片");
        },
        hideView() {
            this.setData({
                isShow: false
            })
        },
        determine() {
            let imgSrc = this.properties.picUrl
            wx.downloadFile({
                url: imgSrc,
                success: function(res) {
                    // console.log(res);
                    //图片保存到本地
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function(data) {
                            // console.log(data);
                        },
                        fail: function(err) {
                            console.log(err);
                            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                console.log("用户一开始拒绝了，我们想再次发起授权")
                                console.log('打开设置窗口')
                                wx.openSetting({
                                    success(settingdata) {
                                        console.log(settingdata)
                                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                            console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                        } else {
                                            console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            })

        },
    }
})