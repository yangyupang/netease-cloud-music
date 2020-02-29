// components/common/playBox/playBox.js
import create from '../../../utils/store/create'
import store from '../../../store/index'
create.Component(store, {
    /**
     * 组件的属性列表
     */
    // 声明依赖
    use: ['bgm', 'playlist', 'playIndex', 'playType', 'isPlay'],
    options: {
        addGlobalClass: true
    },
    properties: {

    },
    computed: {},
    /**
     * 组件的初始数据
     */
    data: {
        // show: this.playlist[0]
        isPlay: true,
        showData: {},
        show: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goToMusic() {
            wx.navigateTo({
                url: `/pages/musicPlay/musicPlay`,
            });
        },
        isPlay() {
            this.data.isPlay = !this.data.isPlay
            this.setData({
                isPlay: this.data.isPlay
            })
            this.store.data.isPlay = this.data.isPlay
            if (!this.data.isPlay) {
                this.store.data.bgm.pause()
            } else {
                this.store.data.bgm.play()
            }
        },
        onClose() {
            this.setData({
                show: !this.data.show
            })
        },
        /**
         * 播放下一曲
         */
        playNext() {
            if (this.store.data.playlist.length === 1) {
                wx.showToast({
                    title: '您只有一首歌曲',
                    icon: 'none',
                    duration: 1500
                });
            }
            //判断当前播放状态0-随机，1-列表，2-单曲
            let type = this.store.data.playType
            console.log(type, this.data.playlist.length);
            if (type === 2 || this.data.playlist.length === 1) {

                this.store.data.bgm.seek(0)
            } else if (type === 1) {
                let playIndex = this.store.data.playIndex;
                if (playIndex < (this.store.data.playlist.length - 1)) {
                    playIndex = playIndex + 1
                } else {
                    playIndex = 0
                    wx.showToast({
                        title: '滚到第一曲',
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
            console.log(this.store.data.playlist);
            console.log(this.store.data.playIndex);
            let playNow = this.store.data.playlist[this.store.data.playIndex]
            let bgm = this.store.data.bgm
            bgm.title = playNow.title
            bgm.epname = playNow.epname
            bgm.singer = playNow.singer
            bgm.coverImgUrl = playNow.coverImgUrl
                // 设置了 src 之后会自动播放
            bgm.src = playNow.src
            this.store.data.bgm = bgm
                //开始监听播放状态
        },
    },
    pageLifetimes: {
        show() {
            if (this.store.data.isPlay) {
                this.setData({
                    isPlay: true
                })
            } else {
                this.setData({
                    isPlay: false
                })
            }
            setTimeout(() => {
                this.setData({
                    showData: this.store.data.playlist[this.store.data.playIndex],
                })
            }, 200)
            let bgm = this.store.data.bgm
            bgm.onEnded(() => {
                this.playNext()
            })
            bgm.onTimeUpdate(() => {
                this.setData({
                    showData: this.store.data.playlist[this.store.data.playIndex],
                    play: !bgm.paused
                })
            })
        }
    }
})