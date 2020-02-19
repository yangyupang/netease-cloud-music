// components/homePage/card/Card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: {
            type: Array,
            value: []
        },
        listTwo: {
            type: Array,
            value: []
        },
        title: {
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
        showIndex: '0'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseItem(e) {
            // console.log(e);
            let num = e.currentTarget.dataset.num
            this.setData({
                showIndex: num
            })
        },
        clickItem(e) {
            console.log(e.currentTarget.dataset.item);
            // let item =
        }
    }
})