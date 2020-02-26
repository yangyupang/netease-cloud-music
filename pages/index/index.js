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
        //搜索数据
        searchFlag: false,
        keywords: {},
        value: "",
        result: null,
        suggest: [],
        sugFlag: false,
        hotList: [],
        histories: [],
        scrollTop: '',
        page: 1
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
        api.djRecommend().then(res => {
            if (res.code === 200) {
                this.setData({
                        djprogram: res.djRadios.slice(0, 6)
                    })
                    // console.log(res);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //推荐节目
    getRecommend() {
        api.programRecommend().then(res => {
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
    //进入/离开搜索页面/清除搜索
    goSearch() {
        if (this.data.result !== null) {
            this.setData({
                result: null,
                value: ''
            })
            wx.showLoading({
                title: "加载中...",
                mask: true,
            });
            this.getSearchDefalut()
        } else {
            this.setData({
                searchFlag: !this.data.searchFlag
            })
        }
    },
    bindinput(e) {
        this.setData({
            value: e.detail.value,
            sugFlag: true
        })
        if (e.detail.value.trim() !== '') {
            api.searchSuggest(e.detail.value).then(res => {
                if (res.code === 200) {
                    this.setData({
                        suggest: res.result.allMatch
                    })
                }
            })
        } else {
            this.setData({
                suggest: []
            })
        }

    },
    //点击搜索
    SearchNow(e) {
        //搜索框
        let keyword = e.detail.value
        if (e.currentTarget.dataset.sug) {
            //搜索推荐
            keyword = e.currentTarget.dataset.sug
                // console.log('搜索推荐');
        } else if (typeof(e.detail) === 'string') {
            //热搜
            keyword = e.detail
                // console.log('热搜');
        } else if (e.detail.value === '') {
            //默认值搜索
            // console.log('默认值搜索');
            keyword = this.data.keywords.realkeyword
        }
        let histories = this.data.histories
        histories = histories.filter(item => item !== keyword)
        histories.unshift(keyword)
        wx.setStorageSync("histories", JSON.stringify(histories));
        this.setData({
            value: keyword,
            histories: histories
        })
        this.getResult()
    },
    //搜索之后
    getResult(e) {
        wx.showLoading({
            title: "加载中...",
            mask: true,
        });
        let keyword = this.data.value
        let searchType = 1018
        if (e) {
            searchType = e.detail
        }
        api.keywordSearch(keyword, searchType, 0).then(res => {
            if (res.code === 200) {
                this.setData({
                    result: res.result,
                    sugFlag: false,
                    scrollTop: 0
                })
                wx.hideLoading();
            }
        })
    },
    //上拉加载
    pullUp(e) {
        wx.showLoading({
            title: "加载中...",
            mask: true,
        });
        let info = e.detail
        let keyword = this.data.value
        let result = this.data.result
        api.keywordSearch(keyword, info.id, info.count).then(res => {
            if (res.code === 200) {
                info.id === 1 ? result.songs.push(...res.result.songs) :
                    info.id === 1014 ? result.videos.push(...res.result.videos) :
                    info.id === 100 ? result.artists.push(...res.result.artists) :
                    info.id === 10 ? result.albums.push(...res.result.albums) :
                    info.id === 1000 ? result.playlists.push(...res.result.playlists) :
                    info.id === 1009 ? result.djRadios.push(...res.result.djRadios) :
                    info.id === 1002 ? result.userprofiles.push(...res.result.userprofiles) :
                    info.id === 1004 ? result.mvs.push(...res.result.mvs) : ''
                this.setData({
                        result: result
                    })
                    // console.log(result);
                wx.hideLoading();
            }
        })
    },
    showSug() {
        if (this.data.value !== '') {
            this.setData({
                sugFlag: true
            })
        }
    },
    closeSug() {
        this.setData({
            sugFlag: false
        })
    },
    clearKeywords() {
        this.setData({
            value: '',
            suggest: [],
            sugFlag: false
        })
        this.getSearchDefalut();
    },
    getSearchHot() {
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        api.hotSearchList().then(res => {
            if (res.code === 200) {
                this.getSearchDefalut()
                this.setData({
                    hotList: res.data
                })
                wx.hideLoading();
            }
        })
    },
    getSearchDefalut() {
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        api.searchDefalut().then(res => {
            if (res.code === 200) {
                this.setData({
                    keywords: res.data
                })
                wx.hideLoading();
            }
        })
    },

    //options(Object)
    onLoad: function(options) {
        this.getBannerData();
        this.getPersonalized();
        this.getNewSong();
        this.getNewDisc();
        this.getDjprogram();
        this.getRecommend();
        this.getSearchHot();
        this.getSearchDefalut();
        // this.getData()
    },
    onReady: function() {

    },
    onShow: function() {
        this.getStorge()
    },
    getStorge() {
        if (wx.getStorageSync('histories')) {
            this.setData({
                histories: JSON.parse(wx.getStorageSync('histories'))
            })
        } else {
            this.setData({
                histories: []
            })
        }
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