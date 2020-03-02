// pages/musicPlay/musicPlay.js
import api from "../../http/api"
import create from '../../utils/store/create'
import store from '../../store/index'
const bgm = wx.getBackgroundAudioManager()
create.Page(store, {
    use: ['bgm', 'playlist', 'playIndex', 'playType', 'isPlay'],
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        // url: '',
        play: 1,
        isPlay: true,
        show: false,
        playlist: [],
        songDetail: {},
        starttime: '00:00', //正在播放时长
        duration: '05:20', //总时长
        imgUrl: ["/assets/images/like.png", "/assets/images/download.png", "/assets/images/comment.png", "/assets/images/point3.png"]
    },
    onClose() {
        this.setData({
            show: !this.data.show
        })
    },
    /**
     * 获取播放列表
     * id 单个id
     * ids 播放列表
     */
    getSong(id, ids) {
        //获取歌曲详情和地址并保存
        let playlist,
            displaylist = []
            //如果有多个id，则清空播放列表
        ids ? playlist = [] : playlist = this.store.data.playlist
        api.getSongdetail(ids ? ids : id).then(res => {
            if (res.code === 200) {
                let arr = []
                res.songs.map(item => {
                    if (playlist.some(i => i.id === item.id)) return
                    arr.push({
                        id: item.id,
                        title: item.name,
                        epname: item.al.name,
                        singer: item.ar[0].name,
                        coverImgUrl: item.al.picUrl,
                    })
                })
                api.getSongUrl(ids ? ids : id).then(res1 => {
                    if (res1.code === 200) {
                        arr.map(item => {
                            res1.data.map(i => {
                                if (i.id === item.id) {
                                    if (i.url) {
                                        item.src = i.url
                                        playlist.push(item)
                                    } else {
                                        displaylist.push(item.title)
                                    }
                                }
                            })
                        })
                        if (displaylist.length > 0) {
                            let temp = displaylist.join(',')
                            wx.showModal({
                                title: `以下${displaylist.length}首歌曲无法加入播放列表`,
                                content: `${temp}`,
                                success: (res => {
                                    if (playlist.length === 0) {
                                        wx.showToast({
                                            title: '没有可播放的歌曲',
                                            icon: 'none',
                                            duration: 1500,
                                            success: (result) => {
                                                setTimeout(() => {
                                                    wx.navigateBack({
                                                        delta: 1
                                                    });
                                                }, 500)
                                            }
                                        })
                                    }
                                })
                            })
                        }
                        if (playlist.length > 0) {
                            let i = 0
                            playlist.map((item, index) => {
                                    if (item.id == id) {
                                        i = index
                                    }
                                })
                                // console.log(i);
                            this.store.data.playIndex = i
                            this.store.data.playlist = playlist
                                // console.log(this.store.data.playlist);
                                //开始播放
                            this.startPlay()
                        }
                    }
                })
            }
        })
    },
    getProgram(id) {
        api.programDetail(id).then(res => {
            if (res.code === 200) {
                api.getSongUrl(res.program.mainTrackId).then(res1 => {
                    if (res1.code === 200) {
                        let playlist = this.store.data.playlist
                        if (res1.data[0].url) {
                            playlist.push({
                                id: res.program.id,
                                title: res.program.name,
                                epname: '电台',
                                singer: res.program.dj.nickname,
                                coverImgUrl: res.program.coverUrl,
                                src: res1.data[0].url
                            })
                            console.log(playlist);
                            this.store.data.playIndex = playlist.length - 1
                            this.store.data.playlist = playlist
                            this.startPlay()
                        } else {
                            wx.showToast({
                                title: '节目丢失',
                                icon: 'none',
                                duration: 1500,
                                success: (result) => {
                                    setTimeout(() => {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 500)
                                }
                            });
                        }

                    }
                })
            }
        })
    },
    /**
     * 播放上一首
     */
    playPrev() {
        if (this.data.playlist.length === 1) {
            wx.showToast({
                title: '您只有一首歌曲',
                icon: 'none',
                duration: 1500
            });
        }
        //判断当前播放状态0-随机，1-列表，2-单曲
        let type = this.store.data.playType
        if (type === 2 || this.data.playlist.length === 1) {
            this.store.data.bgm.seek(0)
        } else if (type === 1) {
            let playIndex = this.store.data.playIndex;
            if (playIndex > 0) {
                playIndex = playIndex - 1
            } else {
                playIndex = this.store.data.playlist.length - 1
                wx.showToast({
                    title: '听到了最后一首歌',
                    icon: 'none',
                    duration: 1500
                });
            }
            this.store.data.playIndex = playIndex;
        } else {
            let index = parseInt(Math.random() * (this.store.data.playlist.length - 1))
            this.store.data.playIndex = index
        }
        this.startPlay();
    },

    /**
     * 播放下一曲
     */
    playNext() {
        if (this.data.playlist.length === 1) {
            wx.showToast({
                title: '您只有一首歌曲',
                icon: 'none',
                duration: 1500
            });
        }
        //判断当前播放状态0-随机，1-列表，2-单曲
        let type = this.store.data.playType
        if (type === 2 || this.data.playlist.length === 1) {
            this.store.data.bgm.seek(0)
        } else if (type === 1) {
            let playIndex = this.store.data.playIndex;
            if (playIndex < (this.store.data.playlist.length - 1)) {
                playIndex = playIndex + 1
            } else {
                playIndex = 0
                wx.showToast({
                    title: '回到了第一首歌',
                    icon: 'none',
                    duration: 1500
                });
            }
            this.store.data.playIndex = playIndex;
        } else {
            let index = parseInt(Math.random() * (this.store.data.playlist.length - 1))
            this.store.data.playIndex = index
        }
        this.startPlay();
    },
    startPlay() {
        //获取播放歌曲
        let playNow = this.store.data.playlist[this.store.data.playIndex]
        const bgm = wx.getBackgroundAudioManager()
        bgm.title = playNow.title
        bgm.epname = playNow.epname
        bgm.singer = playNow.singer
        bgm.coverImgUrl = playNow.coverImgUrl
            // 设置了 src 之后会自动播放
        bgm.src = playNow.src
        this.store.data.bgm = bgm
            //开始监听播放状态
        this.onTimeUpdate(bgm)
    },
    playChange() {
        let num = this.data.play
        num === 2 ? num = 0 : num++
            wx.showToast({
                title: `${num===1?'列表循环':num===2?'单曲循环':'随机循环'}`,
                icon: 'none',
                duration: 1500
            });
        this.store.data.playType = num
        this.setData({
            play: num
        })
    },
    //监听播放状态
    onTimeUpdate(bgm) {
        bgm.onEnded(() => {
            this.playNext()
        })
        bgm.onNext(() => {
            this.playNext()
        })
        bgm.onPrev(() => {
            this.playPrev()
        })
        bgm.onPlay(() => {
            this.store.data.isPlay = true
            this.setData({
                isPlay: true
            })
        })
        bgm.onPause(() => {
            this.store.data.isPlay = false
            this.setData({
                isPlay: false
            })
        })
        bgm.onTimeUpdate(() => {
            var max = parseInt(bgm.duration);
            var points = parseInt(max / 60)
            var seconds = max % 60
            if (seconds < 10) {
                seconds = "0" + seconds;
            };
            if (points < 10) {
                points = "0" + points;
            }
            var currentTime = parseInt(bgm.currentTime);
            var min = parseInt(currentTime / 60);
            var sec = currentTime % 60;
            if (sec < 10) {
                sec = "0" + sec;
            };
            if (min < 10) {
                min = "0" + min;
            }
            var startTime = min + ':' + sec; /*  00:00  */
            var endTime = points + ':' + seconds;
            this.setData({
                offset: currentTime,
                starttime: startTime,
                duration: endTime,
                max: max,
                songDetail: this.store.data.playlist[this.store.data.playIndex],
            })
        })
    },
    isPlay() {
        this.data.isPlay = !this.data.isPlay
        this.setData({
            isPlay: this.data.isPlay
        })
        this.store.data.isPlay = this.data.isPlay
        if (!this.data.isPlay) {
            bgm.pause()
        } else {
            bgm.play()
        }
    },
    sliderChange(e) {
        var offset = parseInt(e.detail.value);
        if (this.data.isPlay) {
            bgm.play();
        }
        bgm.seek(offset);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        options.songId ? this.getSong(options.songId, options.ids ? JSON.parse(options.ids) : null) : options.programId ? this.getProgram(options.programId) : ''
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
        let bgm = this.store.data.bgm
        bgm ? this.onTimeUpdate(bgm) : ''
        if (this.store.data.isPlay) {
            this.setData({
                isPlay: true,
            })
        } else {
            this.setData({
                isPlay: false,
                songDetail: this.store.data.playlist[this.store.data.playIndex],
            })
        }
        this.setData({
            playlist: this.store.data.playlist
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

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