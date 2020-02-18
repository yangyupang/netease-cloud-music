import fly from './index'
export default ({
    //获取轮播图
    hotWord() {
        return fly.get('/book/hot-word')
    },
})