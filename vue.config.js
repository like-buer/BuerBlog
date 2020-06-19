module.exports = {
    configureWebpack: {
        devServer: {
            proxy: "http://localhost/"


            // proxy: {
            //     // 获取网站信息
            //     '/blogserverinfo':{
            //         target: "http://localhost/"
            //     },
            //     // 首次加载查询（全部软件）
            //     '/getoverresource': {
            //         target: "http://localhost/"
            //     },
            //     // 取三条数据
            //     '/querythreeresource': {
            //         target: "http://localhost/"
            //     },
            //     // 获取资源列表
            //     '/getresourcetype': {
            //         target: "http://localhost/"
            //     },
            //     // 获取博客总数量
            //     '/getblognums': {
            //         target: "http://localhost/"
            //     },
            //     // 当前页面博文
            //     '/saveblog': {
            //         target: "http://localhost/"
            //     },
            //     // 当前页面博文
            //     '/getpageblog': {
            //         target: "http://localhost/"
            //     },
            //     // 获取当前博文
            //     '/getblog': {
            //         target: "http://localhost/"
            //     },
            //     // 获取博客分类
            //     '/getblogtype': {
            //         target: "http://localhost/"
            //     },
            //     // 获取留言信息
            //     '/getmessage': {
            //         target: "http://localhost/"
            //     },
            //     // bing图片接口
            //     '/getbing': {
            //         target: "https://localhost/"
            //     }
            // }
        }
    }
}