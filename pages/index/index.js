//Page Object
import api from "../../http/api"
Page({
    data: {
        bannerList: [],
        searchValue: "",
        sameList: [{
                url: "../../assets/images/recommended.png",
                title: "每日推荐"
            },
            {
                url: "../../assets/images/songList.png",
                title: "歌单"
            },
            {
                url: "../../assets/images/ranking.png",
                title: "排行榜"
            },
            {
                url: "../../assets/images/radio.png",
                title: "电台"
            },
            {
                url: "../../assets/images/live.png",
                title: "直播"
            }
        ],
        //推荐歌单
        personalized: [],
        newSong: [],
        newDisc: [],
        djprogram: [],
        recommend: [],
    },
    //轮播图数据
    getBannerData() {
        api.banner().then(res => {
            if (res.code === 200) {
                this.setData({
                    bannerList: res.banners
                })
            }
            // console.log(res);
        }).catch(err => {
            console.log(err);
        });
    },
    //推荐歌单数据
    getPersonalized() {
        api.personalized().then(res => {
            if (res.code === 200) {
                this.setData({
                        personalized: res.result.slice(0, 6)
                    })
                    // console.log(this.data.personalized);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //新歌 和 音乐新势力
    getNewSong() {
        api.newSong().then(res => {
            if (res.code === 200) {
                this.setData({
                        newSong: res.result.slice(0, 6)
                    })
                    // console.log(this.data.newSong);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //新碟
    getNewDisc() {
        api.newDisc().then(res => {
            if (res.code === 200) {
                this.setData({
                        newDisc: res.albums.slice(0, 6)
                    })
                    // console.log(this.data.newDisc);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //推荐电台
    getDjprogram() {
        api.djprogram().then(res => {
            if (res.code === 200) {
                this.setData({
                        djprogram: res.result.slice(0, 6)
                    })
                    // console.log(this.data.djprogram);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //推荐节目
    getRecommend() {
        api.recommend().then(res => {
            if (res.code === 200) {
                this.setData({
                        recommend: res.programs.slice(0, 6)
                    })
                    // console.log(this.data.recommend);
            }
        }).catch(err => {
            console.log(err);
        });
    },

    //options(Object)
    onLoad: function(options) {
        this.getBannerData();
        this.getPersonalized();
        this.getNewSong();
        this.getNewDisc();
        this.getDjprogram();
        this.getRecommend();
        // this.getData()
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});