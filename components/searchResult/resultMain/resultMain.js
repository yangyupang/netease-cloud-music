Component({
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
        result: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        artists: []
    },

    /**
     * 组件的方法列表
     */
    methods: {},
    ready() {
        // console.log(this.properties.result);
    }
})