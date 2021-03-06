import fly from './index'
export default ({
    "typeList": [{
            id: '5001',
            name: '入驻歌手',
        },
        {
            id: '1001',
            name: '华语男歌手',
        },
        {
            id: '1002',
            name: '华语女歌手',
        },
        {
            id: '1003',
            name: '华语组合/乐队',
        },
        {
            id: '2001',
            name: '欧美男歌手',
        },
        {
            id: '2002',
            name: '欧美女歌手',
        },
        {
            id: '2003',
            name: '欧美组合/乐队',
        },
        {
            id: '6001',
            name: '日本男歌手',
        },
        {
            id: '6002',
            name: '日本女歌手',
        },
        {
            id: '6003',
            name: '日本组合/乐队',
        },
        {
            id: '7001',
            name: '韩国男歌手',
        },
        {
            id: '7002',
            name: '韩国女歌手',
        },
        {
            id: '7003',
            name: '韩国组合/乐队',
        },
        {
            id: '4001',
            name: '其他男歌手',
        },
        {
            id: '4002',
            name: '其他女歌手',
        },
        {
            id: '4003',
            name: '其他组合/乐队',
        },
    ],
    "initial": ["热", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    "searchType": [{
            id: 1018,
            name: "综合"
        },
        {
            id: 1,
            name: "单曲"
        },
        {
            id: 1014,
            name: "视频"
        },
        {
            id: 100,
            name: "歌手"
        },
        {
            id: 10,
            name: "专辑"
        },
        {
            id: 1000,
            name: "歌单"
        },
        {
            id: 1009,
            name: "电台"
        },
        {
            id: 1002,
            name: "用户"
        },
        {
            id: 1004,
            name: "MV"
        },
    ],

    //获取轮播图
    banner() {
        return fly.get('/banner')
    },
    //推荐歌单
    //limit 默认 30
    personalized() {
        return fly.get(`/personalized`)
    },
    //歌单详情
    //id为歌单的id
    //获取到数据时 res.playlist.tracks 为歌单里面的歌曲
    //其他可能用到 res.playlist.description（简介描述）  res.playlist.name （大标题）
    // res.playlist.backgroundCoverUrl（背景图） res.playlist.coverImgUrl（封面图）
    //res.playlist.creator.avatarUrl  res.playlist.creator.nickname
    //res.playlist.subscribedCount(收藏) res.playlist.shareCount(分享)  res.playlist.commentCount(评论)
    playlistDetail(id) {
        return fly.get(`/playlist/detail?id=${id}`)
    },
    //推荐新音乐(音乐新势力 和 新歌) 
    newSong() {
        return fly.get(`/personalized/newsong`)
    },
    //新碟
    newDisc() {
        return fly.get(`/album/newest`)
    },
    //点击新碟会跳到 ==> 专辑
    //id 新碟的 id
    //可能用到 res.album.info.commentCount(评论) res.album.info.shareCount(分享) res.album.description(描述)
    //res.songs => item.name
    album(id) {
        return fly.get(`/album/?id=${id}`)
    },

    /**
     * 推荐电台
     */
    djRecommend() {
        return fly.get(`/dj/recommend`)
    },
    /**
     * 推荐节目
     */
    programRecommend() {
        return fly.get(`/program/recommend`)
    },
    /**
     * 电台详情
     * @param {*} rid 电台id
     */
    djDetail(rid) {
        return fly.get(`/dj/detail?rid=${rid}`)
    },
    /**
     * 电台节目列表
     * @param {*} rid 电台id
     * @param {number} page 页数
     */
    programList(rid, limit) {
        return fly.get(`dj/program?rid=${rid}&limit=${limit}`)
    },
    /**
     * 节目详情
     * @param {*} id 电台节目id
     */
    programDetail(id) {
        return fly.get(`/dj/program/detail?id=${id}`)
    },
    /**
     * 电台 节目评论
     * @param {*} id 电台 节目id
     */
    programComment(id) {
        return fly.get(`/comment/dj?id=${id}&limit=20`)
    },
    //推荐电台
    // djprogram() {
    //     return fly.get(`/personalized/djprogram`)
    // },

    // //推荐节目
    // recommend() {
    //     return fly.get(`/program/recommend`)
    // },

    //电台 - 节目详情
    //id 推荐节目的 item.id
    //id 推荐电台的 item.id
    djprogramDetail(id) {
        return fly.get(`/dj/program/detail?id=${id}`)
    },
    // 电台 节目详情的精彩评论的接口
    // 返回的hotComments字段为热门评论，如果hotComments数组为空则取comments作为热门评论展示
    // PS:推荐节目中的id为对象最外层id，不要用mainSong里面提供的id(404警告)
    djproComment(id) {
        return fly.get(`/comment/dj?id=${id}`)
    },




    //音乐是否可用
    checkMusic(id) {
        return fly.get(`/check/music?id=${id}`)
    },
    //获取歌词
    //id: 音乐 id
    lyric(id) {
        return fly.get(`/lyric?id=${id}`)
    },
    //获取歌曲详情
    getSongdetail(id) {
        if ((typeof id) === 'array') {
            id = id.join(',')
        }
        return fly.get(`/song/detail?ids=${id}`)
    },
    //获取音乐 url 电台也是
    getSongUrl(ids) {
        if ((typeof ids) === 'array') {
            ids = ids.join(',')
        }
        return fly.get(`/song/url?id=${ids}`)
    },

    //获取歌手专辑 
    getAlbum(id, limit) {
        return fly.get(`/artist/album?id=${id}&limit=${limit}`)
    },
    //获取歌手歌曲和歌手信息
    getSong(id) {
        return fly.get(`/artists?id=${id}`)
    },
    //获取歌手Mv
    getMv(id, limit) {
        return fly.get(`/artist/mv?id=${id}&limit=${limit}`)
    },
    //关键字搜索
    // limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 
    // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
    // keywordSearch(keyword) {
    //     return fly.get(`/search?keywords=${keyword}`)
    // },
    keywordSearch(keyword, type = 1018, offset = 0) {
        return fly.get(`/search?keywords=${keyword}&type=${type}&offset=${offset}`)
    },
    //搜索多重匹配
    multimatch(keyword) {
        return fly.get(`/search/multimatch?keywords=${keyword}`)
    },
    //默认搜索关键词
    searchDefalut() {
        return fly.get(`/search/default`)
    },
    // 搜索联想词
    searchSuggest(keywords) {
        return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
    },
    //热搜列表(详细)
    hotSearchList() {
        return fly.get(`/search/hot/detail`)
    },
    //歌手分类列表
    artist(limit, Code, initial) {
        return fly.get(`/artist/list?limit=${limit}&cat=${Code}&initial=${initial}`)
    },



    // ? 视频播放器
    /**
     * mv
     * id mvid
     */
    getMvInfo(id) {
        return fly.get(`/mv/url?id=${id}`)
    },
    /**
     * 视频
     *  id 视频vid
     */
    getVideoInfo(id) {
        return fly.get(`/video/url?id=${id}`)
    },
    // 登录页
    // 登录页有两个接口，一个手机号，一个邮箱登录
    // 手机号登录(需传入两个参数，phone: 手机号码 password: 密码)
    loginbyTel(phone, password) {
        return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
    },
    // 邮箱登录(email: 163 网易邮箱，password: 密码)
    loginbyEmail(email, password) {
        return fly.get(`/login?email=${email}&password=${password}`)
    },
    // 注册页
    // 发送验证码(phone: 手机号码)
    sendCaptcha(phone) {
        return fly.get(`/captcha/sent?phone=${phone}`)
    },
    // 验证验证码(phone: 手机号,captcha: 验证码)
    verifyCaptcha(phone, captcha) {
        return fly.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
    },
    // 注册(captcha: 验证码,phone : 手机号码,password: 密码,nickname: 昵称)
    register(captcha, phone, password, nickname) {
        return fly.get(`/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`)
    },
    // 检测手机是否已被注册(phone: 手机号)
    checkTel(phone) {
        return fly.get(`/cellphone/existence/check?phone=${phone}`)
    },
    //获取用户信息
    userDet(id) {
        return fly.get(`/user/detail?uid=${id}`)
    },
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    userSubcount() {
        return fly.get(`/user/subcount`)
    },
    //更新用户信息
    upUserDet(gender, signature, city, nickname, birthday, province) {
        return fly.get(`/user/update?gender=${gender}&signature=${signature}&city=${city}&nickname=${nickname}&birthday=${birthday}&province=${province}`)
    },
    //退出登录
    logout() {
        return fly.get('/logout')
    },
    //登录状态
    loginStatus() {
        return fly.get('/login/status')
    }

})